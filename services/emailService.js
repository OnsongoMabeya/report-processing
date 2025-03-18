const Imap = require('imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/email-service.log' }),
    new winston.transports.Console()
  ]
});

class EmailService {
  constructor(config) {
    this.config = config;
    this.imap = new Imap({
      user: config.emailUser,
      password: config.emailPassword,
      host: config.emailHost,
      port: config.emailPort || 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        logger.info('Connected to email server');
        resolve();
      });

      this.imap.once('error', (err) => {
        logger.error('Email connection error:', err);
        reject(err);
      });

      this.imap.once('end', () => {
        logger.info('Email connection ended');
      });

      this.imap.connect();
    });
  }

  async checkNewEmails() {
    return new Promise((resolve, reject) => {
      this.imap.openBox('INBOX', false, (err, box) => {
        if (err) {
          logger.error('Error opening inbox:', err);
          reject(err);
          return;
        }

        const searchCriteria = [
          ['UNSEEN'],
          ['FROM', this.config.allowedSenders]
        ];

        this.imap.search(searchCriteria, (err, results) => {
          if (err) {
            logger.error('Error searching emails:', err);
            reject(err);
            return;
          }

          if (!results.length) {
            logger.info('No new emails found');
            resolve([]);
            return;
          }

          const f = this.imap.fetch(results, {
            bodies: '',
            struct: true
          });

          const emails = [];

          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, async (err, parsed) => {
                if (err) {
                  logger.error('Error parsing email:', err);
                  return;
                }

                const attachments = parsed.attachments.filter(att => 
                  att.contentType.includes('pdf')
                );

                if (attachments.length) {
                  const emailData = {
                    subject: parsed.subject,
                    from: parsed.from.text,
                    date: parsed.date,
                    attachments: attachments.map(att => ({
                      filename: att.filename,
                      contentType: att.contentType
                    }))
                  };

                  emails.push(emailData);
                }
              });
            });
          });

          f.once('error', (err) => {
            logger.error('Error fetching emails:', err);
            reject(err);
          });

          f.once('end', () => {
            logger.info('Finished fetching emails');
            resolve(emails);
          });
        });
      });
    });
  }

  async downloadAttachment(message, attachment) {
    return new Promise((resolve, reject) => {
      const outputDir = path.join(process.cwd(), 'uploads', 'pdfs');
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, attachment.filename);
      const writeStream = fs.createWriteStream(outputPath);

      message.on('body', (stream) => {
        stream.pipe(writeStream);
      });

      writeStream.on('finish', () => {
        logger.info(`Downloaded attachment: ${attachment.filename}`);
        resolve(outputPath);
      });

      writeStream.on('error', (err) => {
        logger.error(`Error downloading attachment: ${err}`);
        reject(err);
      });
    });
  }

  disconnect() {
    this.imap.end();
  }
}

module.exports = EmailService; 