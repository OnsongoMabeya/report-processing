'use client';

import { useState, useEffect } from 'react';

export default function ProcessingStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      
      if (data.status === 'success') {
        setStatus(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error fetching status');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <div className="space-y-1">
            <p>Total: {status.stats.totalReports}</p>
            <p className="text-green-600">Completed: {status.stats.completedReports}</p>
            <p className="text-red-600">Failed: {status.stats.failedReports}</p>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Warnings</h3>
          <p className="text-yellow-600">Total: {status.stats.totalWarnings}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Errors</h3>
          <p className="text-red-600">Total: {status.stats.totalErrors}</p>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-4">
          {status.reports.map((report) => (
            <div key={report._id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{report.emailSubject}</h4>
                  <p className="text-sm text-gray-500">
                    From: {report.emailFrom}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(report.emailDate).toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Warnings */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Warnings</h3>
        <div className="space-y-4">
          {status.warnings.map((warning) => (
            <div key={warning._id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{warning.type}</p>
                <p className="text-sm text-gray-500">
                  Subject: {warning.emailSubject}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(warning.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Errors */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Errors</h3>
        <div className="space-y-4">
          {status.errors.map((error) => (
            <div key={error._id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{error.type}</p>
                <p className="text-sm text-gray-500">
                  Subject: {error.emailSubject}
                </p>
                <p className="text-sm text-red-600">{error.error}</p>
                <p className="text-sm text-gray-500">
                  {new Date(error.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 