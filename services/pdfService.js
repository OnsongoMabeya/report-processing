const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
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
    new winston.transports.File({ filename: 'logs/pdf-service.log' }),
    new winston.transports.Console()
  ]
});

class PDFService {
  constructor(config) {
    this.config = config;
  }

  async extractImages(pdfPath) {
    try {
      const pdfBytes = await fs.promises.readFile(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const images = [];

      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();

        // Extract images from the page
        const { images: pageImages } = await page.node.Resources().lookup(PDFName.of('XObject'));
        if (pageImages) {
          for (const [name, image] of pageImages.dict.entries()) {
            if (image instanceof PDFStream) {
              const imageBytes = await image.decode();
              const imageType = image.dict.lookup(PDFName.of('Subtype')).toString();
              
              if (imageType === 'Image') {
                const imageData = {
                  bytes: imageBytes,
                  type: imageType,
                  width: image.dict.lookup(PDFName.of('Width')).number,
                  height: image.dict.lookup(PDFName.of('Height')).number
                };

                images.push(imageData);
              }
            }
          }
        }
      }

      logger.info(`Extracted ${images.length} images from PDF: ${pdfPath}`);
      return images;
    } catch (error) {
      logger.error(`Error extracting images from PDF: ${error}`);
      throw error;
    }
  }

  async processImage(imageData, outputDir) {
    try {
      const imageBuffer = Buffer.from(imageData.bytes);
      const outputPath = path.join(outputDir, `image_${Date.now()}.png`);

      // Process image with sharp
      await sharp(imageBuffer)
        .resize({
          width: 800, // Max width for A4
          height: 1000, // Max height for A4
          fit: 'inside',
          withoutEnlargement: true
        })
        .normalize() // Normalize contrast
        .toFile(outputPath);

      logger.info(`Processed image saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      logger.error(`Error processing image: ${error}`);
      throw error;
    }
  }

  async generateReport(images, metadata) {
    try {
      const pdfDoc = await PDFDocument.create();
      
      // Add metadata
      pdfDoc.setTitle(metadata.title || 'Generated Report');
      pdfDoc.setAuthor(metadata.author || 'System');
      pdfDoc.setCreationDate(new Date());

      // Add header with logo
      const logoPath = path.join(process.cwd(), 'public', 'logo.png');
      if (fs.existsSync(logoPath)) {
        const logoBytes = await fs.promises.readFile(logoPath);
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoDims = logoImage.scale(0.5);
        
        const page = pdfDoc.addPage();
        page.drawImage(logoImage, {
          x: 50,
          y: page.getHeight() - 100,
          width: logoDims.width,
          height: logoDims.height
        });
      }

      // Add images with captions
      for (const imagePath of images) {
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        
        // Load and embed the processed image
        const imageBytes = await fs.promises.readFile(imagePath);
        const image = await pdfDoc.embedPng(imageBytes);
        
        // Calculate dimensions to fit on A4
        const scale = Math.min(
          (width - 100) / image.width,
          (height - 150) / image.height
        );
        
        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;
        
        // Draw image
        page.drawImage(image, {
          x: (width - scaledWidth) / 2,
          y: height - scaledHeight - 50,
          width: scaledWidth,
          height: scaledHeight
        });

        // Add caption
        const caption = `Image ${path.basename(imagePath)}`;
        page.drawText(caption, {
          x: 50,
          y: 30,
          size: 12,
          color: PDFLib.rgb(0, 0, 0)
        });
      }

      // Save the final PDF
      const outputPath = path.join(process.cwd(), 'output', `report_${Date.now()}.pdf`);
      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
      const pdfBytes = await pdfDoc.save();
      await fs.promises.writeFile(outputPath, pdfBytes);

      logger.info(`Generated report saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      logger.error(`Error generating report: ${error}`);
      throw error;
    }
  }
}

module.exports = PDFService; 