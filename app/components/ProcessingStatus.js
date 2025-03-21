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

  if (!status) {
    return <div className="text-center py-4">No status available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Processing Status */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Processing Status</h3>
        <div className="space-y-1">
          <p>Status: {status.isProcessing ? 'Processing' : 'Idle'}</p>
          {status.currentFile && (
            <p>Current File: {status.currentFile}</p>
          )}
          {status.progress !== undefined && (
            <p>Progress: {status.progress}%</p>
          )}
          {status.queue !== undefined && (
            <p>{status.queue} files in queue</p>
          )}
          {status.lastProcessed && (
            <p>Last Processed: {new Date(status.lastProcessed).toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  );
} 