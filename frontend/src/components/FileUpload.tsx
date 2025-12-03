import React, { useState, useRef } from 'react';
import { evaluationAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const result = await evaluationAPI.uploadFile(selectedFile);
      navigate('/results', { state: { evaluation: result } });
    } catch (err: any) {
      setError(err.response?.data || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Upload Document</h2>
      <div className="card-content">
        <div
          className={`file-upload-area ${dragOver ? 'drag-over' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📄</div>
          <p className="upload-text">
            {selectedFile
              ? `Selected: ${selectedFile.name}`
              : 'Click to select or drag & drop a file'}
          </p>
          <p className="upload-text" style={{ fontSize: '0.9rem' }}>
            Supported formats: PDF, TXT, DOCX
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            onChange={handleFileSelect}
            accept=".pdf,.txt,.doc,.docx"
          />
        </div>

        {selectedFile && (
          <div className="file-info">
            <strong>File:</strong> {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="btn-primary"
        >
          {uploading ? 'Evaluating...' : 'Upload & Evaluate'}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
