import { NextResponse } from 'next/server';
import EmailService from '../../../services/emailService';
import PDFService from '../../../services/pdfService';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { emailConfig, pdfConfig } = await request.json();

    // Initialize services
    const emailService = new EmailService(emailConfig);
    const pdfService = new PDFService(pdfConfig);

    // Connect to email server
    await emailService.connect();

    // Check for new emails with PDF attachments
    const emails = await emailService.checkNewEmails();
    
    if (!emails.length) {
      return NextResponse.json({ 
        message: 'No new PDF attachments found',
        status: 'success'
      });
    }

    const results = [];
    const db = await connectToDatabase();

    // Process each email
    for (const email of emails) {
      try {
        // Download PDF attachments
        for (const attachment of email.attachments) {
          const pdfPath = await emailService.downloadAttachment(email, attachment);
          
          // Extract images from PDF
          const images = await pdfService.extractImages(pdfPath);
          
          if (!images.length) {
            // Log warning if no images found
            await db.collection('warnings').insertOne({
              type: 'no_images',
              pdfPath,
              emailSubject: email.subject,
              timestamp: new Date()
            });
            continue;
          }

          // Process each image
          const processedImages = [];
          for (const image of images) {
            const processedImagePath = await pdfService.processImage(
              image,
              path.join(process.cwd(), 'uploads', 'processed')
            );
            processedImages.push(processedImagePath);
          }

          // Generate report
          const reportPath = await pdfService.generateReport(processedImages, {
            title: email.subject,
            author: email.from,
            date: email.date
          });

          // Save to database
          await db.collection('reports').insertOne({
            emailSubject: email.subject,
            emailFrom: email.from,
            emailDate: email.date,
            pdfPath,
            reportPath,
            processedImages,
            status: 'completed',
            createdAt: new Date()
          });

          results.push({
            emailSubject: email.subject,
            reportPath,
            status: 'success'
          });
        }
      } catch (error) {
        // Log error to database
        await db.collection('errors').insertOne({
          type: 'processing_error',
          emailSubject: email.subject,
          error: error.message,
          timestamp: new Date()
        });

        results.push({
          emailSubject: email.subject,
          error: error.message,
          status: 'error'
        });
      }
    }

    // Disconnect from email server
    emailService.disconnect();

    return NextResponse.json({
      message: 'Processing completed',
      results,
      status: 'success'
    });

  } catch (error) {
    console.error('Error processing PDFs:', error);
    return NextResponse.json({
      message: 'Error processing PDFs',
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
} 