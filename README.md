# Report Processing System

A web-based system for processing PDF reports, extracting images, and generating formatted reports with automatic captions.

## Features

- Email integration for PDF retrieval
- PDF processing and image extraction
- Image preprocessing with YOLOv8
- Automatic caption generation
- Interactive report generation
- Real-time dashboard monitoring

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Python (for YOLOv8 integration)

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```bash
   MONGODB_URI=your_mongodb_uri
   EMAIL_HOST=your_email_host
   EMAIL_USER=your_email_user
   EMAIL_PASSWORD=your_email_password
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## Project Structure

```bash
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── pages/            # Page components
├── lib/                   # Utility functions and shared code
├── models/               # Database models
├── public/               # Static assets
└── services/             # Business logic services
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
