# Report Processing System

A web-based system for processing PDF reports, extracting images, and generating formatted reports with automatic captions. Built with Next.js 14, MongoDB, and modern web technologies.

## Features

- **Email Integration**
  - Gmail support for PDF retrieval
  - Configurable email settings
  - Automatic email checking and processing
  - Support for multiple sender addresses

- **PDF Processing**
  - PDF parsing and text extraction
  - Image extraction from PDFs
  - Image preprocessing with Sharp
  - Configurable image quality and size settings

- **Report Generation**
  - Interactive report creation interface
  - Automatic caption generation
  - Customizable report templates
  - Support for multiple page sizes
  - Email metadata inclusion options

- **Dashboard & Monitoring**
  - Real-time processing status updates
  - Processing queue management
  - Error tracking and reporting
  - System health monitoring

- **Reports Management**
  - List all processed reports
  - View report details and status
  - Track image extraction results
  - Filter and search capabilities

- **System Configuration**
  - Email server settings
  - PDF processing parameters
  - Report generation options
  - System preferences

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v7.0 or higher)
- Python (v3.8 or higher, for YOLOv8 integration)
- npm or yarn package manager

## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/OnsongoMabeya/report-processing
   cd report-processing
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. **MongoDB Setup**
   - Follow the steps in `docs/mongodb-setup.md` for detailed MongoDB installation and configuration

   - Start MongoDB service:

     ```bash
     brew services start mongodb-community
     ```

   - Create database and user:

     ```bash
     mongosh
     use report-processing
     db.createUser({
       user: "admin",
       pwd: "admin",
       roles: [{ role: "readWrite", db: "report-processing" }]
     })
     ```

4. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:

   ```env
   MONGODB_URI=mongodb://admin:admin@localhost:27017/report-processing
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ALLOWED_SENDERS=email1@example.com,email2@example.com
   CHECK_INTERVAL=300000
   ```

5. **Verify Setup**
   Run the MongoDB setup verification script:

   ```bash
   npm run setup:mongodb
   ```

6. **Start Development Server**

   ```bash
   npm run dev
   ```

## Project Structure

```bash
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── reports/       # Report-related endpoints
│   │   └── status/        # Processing status endpoints
│   ├── components/        # React components
│   │   └── ProcessingStatus.js
│   ├── reports/          # Reports page
│   │   └── page.js
│   └── settings/         # Settings page
│       └── page.js
├── lib/                   # Utility functions
│   ├── mongodb.js        # MongoDB connection utility
│   └── email.js          # Email processing utilities
├── models/               # Database models
│   ├── Report.js         # Report schema
│   └── ProcessingStatus.js
├── public/               # Static assets
└── services/            # Business logic
    ├── emailService.js   # Email processing service
    ├── pdfService.js     # PDF processing service
    └── reportService.js  # Report generation service
```

## API Endpoints

- `GET /api/status` - Get current processing status
- `GET /api/reports` - List all processed reports
- `POST /api/reports` - Create a new report
- `GET /api/reports/[id]` - Get report details
- `PUT /api/reports/[id]` - Update report
- `DELETE /api/reports/[id]` - Delete report

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run setup:mongodb` - Verify MongoDB setup
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Style

- Follow ESLint configuration
- Use Prettier for code formatting
- Follow Next.js 14 best practices
- Use TypeScript for type safety

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please refer to:

- MongoDB setup guide: `docs/mongodb-setup.md`
- Email configuration guide: `docs/email-setup.md`
- Report processing guide: `docs/report-processing.md`

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Sharp for image processing
- All contributors and maintainers
