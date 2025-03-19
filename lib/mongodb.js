import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectWithRetry = async (retries = 5, interval = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      if (cached.conn) {
        return cached.conn;
      }

      if (!cached.promise) {
        const opts = {
          bufferCommands: false,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
          console.log('MongoDB connected successfully');
          return mongoose;
        });
      }

      cached.conn = await cached.promise;
      return cached.conn;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
};

export async function connectToDatabase() {
  try {
    return await connectWithRetry();
  } catch (error) {
    console.error('Failed to connect to MongoDB after multiple attempts:', error);
    throw new Error('Database connection failed. Please ensure MongoDB is running locally.');
  }
}

// Define schemas
const ReportSchema = new mongoose.Schema({
  emailSubject: String,
  emailFrom: String,
  emailDate: Date,
  pdfPath: String,
  reportPath: String,
  processedImages: [String],
  status: String,
  createdAt: Date
});

const WarningSchema = new mongoose.Schema({
  type: String,
  pdfPath: String,
  emailSubject: String,
  timestamp: Date
});

const ErrorSchema = new mongoose.Schema({
  type: String,
  emailSubject: String,
  error: String,
  timestamp: Date
});

// Create models
export const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema);
export const Warning = mongoose.models.Warning || mongoose.model('Warning', WarningSchema);
export const Error = mongoose.models.Error || mongoose.model('Error', ErrorSchema); 