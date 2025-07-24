import React, { useState } from 'react';
import { Upload, Loader, Shield } from 'lucide-react';
import GlassContainer from '../../../ui-custom/GlassContainer';
import axios from 'axios';
import AnalysisResults from './AnalysisResults';

const UploadTab: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  // Handler for file selection
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadSuccess(false); // Reset previous success
      setAnalysisResults([]);  // Clear previous results
    }
  };

  // Function to upload file and fetch analysis results from the backend
  const handleFileUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Analysis results:', response.data.anomalies);
      // Set analysisResults to the anomalies array if present, otherwise to an empty array
      setAnalysisResults(response.data.anomalies || []);
      setUploadSuccess(true);
    } catch (error: any) {
      console.error('Error during file upload:', error.message);
      setUploadSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassContainer className="p-6">
      <div className="text-center max-w-md mx-auto py-8">
        <div className="w-16 h-16 bg-cybershield-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-cybershield-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">Analyze Windows Event Logs</h3>
        <p className="text-cybershield-400 text-sm mb-6">
          Upload exported Windows Event Logs (JSON format) for security analysis and anomaly detection.
        </p>
        
        <div className="border-2 border-dashed border-cybershield-100 rounded-lg p-8 mb-4 text-center">
          <input 
            type="file" 
            className="hidden" 
            id="log-file-input" 
            accept=".json" 
            onChange={onFileChange} 
          />
          <label htmlFor="log-file-input" className="cursor-pointer block">
            <div className="text-sm text-cybershield-400 mb-2">
              Drag and drop JSON event logs here, or click to browse
            </div>
            <div className="text-xs text-cybershield-300">
              Supported format: JSON exports from Windows Event Viewer
            </div>
          </label>
        </div>
        
        <button
          onClick={handleFileUpload}
          disabled={isLoading}
          className="cybershield-button w-full flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload & Analyze
            </>
          )}
        </button>
        
        {uploadSuccess && (
          <div className="mt-4 text-cybershield-success text-sm flex items-center justify-center animate-fade-in">
            <Shield className="w-4 h-4 mr-2" />
            Log file processed successfully. View results below.
          </div>
        )}
        
        <div className="mt-8 text-sm text-cybershield-400">
          <h4 className="font-medium mb-2">Note:</h4>
          <p>
            Upload JSON exports of Windows Security logs containing events like logons,
            account changes, and privileged actions. Our ML model analyzes 20+ event types
            for suspicious patterns.
          </p>
        </div>

        {/* Display analysis results using AnalysisResults component */}
        {analysisResults && analysisResults.length > 0 && (
          <AnalysisResults anomalies={analysisResults} />
        )}
      </div>
    </GlassContainer>
  );
};

export default UploadTab;
