'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // In the future, this will fetch from the real API
      // For now, we'll use mock data
      setReports([
        {
          id: '1',
          emailSubject: 'Financial Report Q1 2023',
          emailFrom: 'financial@example.com',
          createdAt: new Date('2023-04-01T12:30:00'),
          status: 'completed',
          imageCount: 12
        },
        {
          id: '2',
          emailSubject: 'Marketing Campaign Results',
          emailFrom: 'marketing@example.com',
          createdAt: new Date('2023-03-28T09:15:00'),
          status: 'completed',
          imageCount: 5
        },
        {
          id: '3',
          emailSubject: 'Product Analysis PDF',
          emailFrom: 'product@example.com',
          createdAt: new Date('2023-03-25T14:45:00'),
          status: 'error',
          imageCount: 0
        }
      ]);
      setLoading(false);
    } catch (err) {
      setError('Error fetching reports');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  const viewReport = (id) => {
    // This will navigate to the report details page in the future
    console.log(`Viewing report ${id}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading reports...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-navy">Reports</h2>
        <button className="btn-primary" onClick={() => router.push('/')}>
          Back to Dashboard
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Subject</th>
                <th className="py-3 px-4 text-left font-semibold">From</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">Images</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{report.emailSubject}</td>
                  <td className="py-3 px-4">{report.emailFrom}</td>
                  <td className="py-3 px-4">{report.createdAt.toLocaleString()}</td>
                  <td className="py-3 px-4">{report.imageCount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => viewReport(report.id)}
                      className="text-navy hover:text-navy-light underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 