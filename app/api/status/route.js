import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Report, Warning, Error } from '../../../lib/mongodb';

export async function GET(request) {
  try {
    const db = await connectToDatabase();

    // Get recent reports
    const recentReports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Get recent warnings
    const recentWarnings = await Warning.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .lean();

    // Get recent errors
    const recentErrors = await Error.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .lean();

    // Get processing statistics
    const stats = {
      totalReports: await Report.countDocuments(),
      completedReports: await Report.countDocuments({ status: 'completed' }),
      failedReports: await Report.countDocuments({ status: 'error' }),
      totalWarnings: await Warning.countDocuments(),
      totalErrors: await Error.countDocuments()
    };

    return NextResponse.json({
      status: 'success',
      data: {
        reports: recentReports,
        warnings: recentWarnings,
        errors: recentErrors,
        stats
      }
    });

  } catch (error) {
    console.error('Error fetching status:', error);
    return NextResponse.json({
      message: 'Error fetching status',
      error: error.message,
      status: 'error'
    }, { status: 500 });
  }
} 