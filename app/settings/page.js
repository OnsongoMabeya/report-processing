'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Email Settings
    emailHost: 'imap.gmail.com',
    emailPort: '993',
    emailUser: '',
    emailPassword: '',
    allowedSenders: '',
    checkInterval: '5',
    
    // PDF Processing Settings
    maxImageSize: '800',
    imageQuality: 'high',
    cropBorders: true,
    
    // Report Generation Settings
    reportLogo: true,
    reportTitle: 'Generated Report',
    pageSize: 'A4',
    includeMetadata: true,
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save successful
      setSaveMessage('Settings saved successfully!');
      setIsSaving(false);
    } catch (error) {
      setSaveMessage(`Error saving settings: ${error.message}`);
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-navy">Settings</h2>
        <button className="btn-primary" onClick={() => router.push('/')}>
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Email Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="emailHost" className="block mb-2 text-sm font-medium">
                Email Host
              </label>
              <input
                type="text"
                id="emailHost"
                name="emailHost"
                value={formData.emailHost}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label htmlFor="emailPort" className="block mb-2 text-sm font-medium">
                Email Port
              </label>
              <input
                type="text"
                id="emailPort"
                name="emailPort"
                value={formData.emailPort}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label htmlFor="emailUser" className="block mb-2 text-sm font-medium">
                Email User
              </label>
              <input
                type="email"
                id="emailUser"
                name="emailUser"
                value={formData.emailUser}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="your-email@gmail.com"
              />
            </div>
            
            <div>
              <label htmlFor="emailPassword" className="block mb-2 text-sm font-medium">
                Email Password/App Password
              </label>
              <input
                type="password"
                id="emailPassword"
                name="emailPassword"
                value={formData.emailPassword}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="••••••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="allowedSenders" className="block mb-2 text-sm font-medium">
                Allowed Senders (comma separated)
              </label>
              <input
                type="text"
                id="allowedSenders"
                name="allowedSenders"
                value={formData.allowedSenders}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="sender1@example.com, sender2@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="checkInterval" className="block mb-2 text-sm font-medium">
                Check Interval (minutes)
              </label>
              <input
                type="number"
                id="checkInterval"
                name="checkInterval"
                value={formData.checkInterval}
                onChange={handleChange}
                className="input-field w-full"
                min="1"
                max="60"
              />
            </div>
          </div>
        </div>
        
        {/* PDF Processing Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">PDF Processing Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="maxImageSize" className="block mb-2 text-sm font-medium">
                Max Image Size (pixels)
              </label>
              <input
                type="number"
                id="maxImageSize"
                name="maxImageSize"
                value={formData.maxImageSize}
                onChange={handleChange}
                className="input-field w-full"
                min="100"
                max="2000"
              />
            </div>
            
            <div>
              <label htmlFor="imageQuality" className="block mb-2 text-sm font-medium">
                Image Quality
              </label>
              <select
                id="imageQuality"
                name="imageQuality"
                value={formData.imageQuality}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cropBorders"
                name="cropBorders"
                checked={formData.cropBorders}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="cropBorders" className="text-sm font-medium">
                Automatically crop borders
              </label>
            </div>
          </div>
        </div>
        
        {/* Report Generation Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Report Generation Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="reportLogo"
                name="reportLogo"
                checked={formData.reportLogo}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="reportLogo" className="text-sm font-medium">
                Include logo in reports
              </label>
            </div>
            
            <div>
              <label htmlFor="reportTitle" className="block mb-2 text-sm font-medium">
                Default Report Title
              </label>
              <input
                type="text"
                id="reportTitle"
                name="reportTitle"
                value={formData.reportTitle}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label htmlFor="pageSize" className="block mb-2 text-sm font-medium">
                Page Size
              </label>
              <select
                id="pageSize"
                name="pageSize"
                value={formData.pageSize}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
                <option value="Legal">Legal</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeMetadata"
                name="includeMetadata"
                checked={formData.includeMetadata}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="includeMetadata" className="text-sm font-medium">
                Include email metadata in reports
              </label>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          {saveMessage && (
            <p className={`mr-4 my-auto ${saveMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {saveMessage}
            </p>
          )}
          <button
            type="submit"
            className="btn-primary"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
} 