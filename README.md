# Report Processing System

A web-based system for processing PDF reports, extracting images, and generating formatted reports with automatic captions.

## Features

- Email integration for PDF retrieval
- PDF processing and image extraction
- Image preprocessing with Sharp
- Automatic caption generation
- Interactive report generation
- Real-time dashboard monitoring

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Python (for YOLOv8 integration)

## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/OnsongoMabeya/report-processing
   cd report-processing-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **MongoDB Local Setup** (if using local MongoDB):

   - Follow the steps in `docs/mongodb-setup.md` to install and configure MongoDB.

   - Start the MongoDB service:

     ```bash
     brew services start mongodb-community
     ```

   - Create the database and user:

     ```bash
     mongosh
     use report-processing
     db.createUser({
       user: "admin",
       pwd: "admin",
       roles: [{ role: "readWrite", db: "report-processing" }]
     })
     ```

   - Update your `.env` file with the MongoDB connection string:

     ```bash
     MONGODB_URI=mongodb://admin:admin@localhost:27017/report-processing
     ```

4. Run the setup script to verify MongoDB installation and configuration:

   ```bash
   npm run setup:mongodb
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

## Project Structure

```bash
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ ├── components/ # React components
│ └── pages/ # Page components
├── lib/ # Utility functions and shared code
├── models/ # Database models
├── public/ # Static assets
└── services/ # Business logic services
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
