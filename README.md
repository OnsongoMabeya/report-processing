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
- GitHub account (for CI/CD)

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
- `npm test` - Run tests

### Code Style

- Follow ESLint configuration
- Use Prettier for code formatting
- Follow Next.js 14 best practices
- Use TypeScript for type safety

### Continuous Integration/Deployment

The project uses GitHub Actions for CI/CD. The workflow includes:

- Automated testing on push and pull requests
- Linting and code style checks
- Build verification
- Automated deployment to production (main branch)
- MongoDB service container for testing

#### CI/CD Pipeline Steps

1. **Test Job**
   - Sets up Node.js environment
   - Installs dependencies
   - Runs linting
   - Executes tests with MongoDB service
   - Verifies build process

2. **Deploy Job** (main branch only)
   - Builds the project
   - Deploys to production environment
   - Requires successful test job completion

#### Required Secrets

For deployment, the following secrets need to be configured in GitHub:

- `VERCEL_TOKEN` - Vercel deployment token
- `ORG_ID` - Vercel organization ID
- `PROJECT_ID` - Vercel project ID

To set up secrets:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the required secrets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please refer to:

- MongoDB setup guide: `docs/mongodb-setup.md`
- Email configuration guide: `docs/email-setup.md`
- Report processing guide: `docs/report-processing.md`
- CI/CD setup guide: `docs/ci-cd-setup.md`

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Sharp for image processing
- GitHub Actions for CI/CD automation
- All contributors and maintainers
