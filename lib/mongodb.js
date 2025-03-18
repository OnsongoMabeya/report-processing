import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
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