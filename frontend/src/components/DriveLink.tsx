import React, { useState } from 'react';
import { evaluationAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const DriveLink: React.FC = () => {
  const [driveLink, setDriveLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!driveLink.trim()) {
      setError('Please enter a Google Drive link');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await evaluationAPI.evaluateDriveFile({ driveLink });
      navigate('/results', { state: { evaluation: result } });
    } catch (err: any) {
      setError(err.response?.data || 'Failed to fetch Google Drive file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Google Drive Link</h2>
      <form className="card-content" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Google Drive Document Link</label>
          <input
            type="text"
            className="form-input"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="https://drive.google.com/file/d/..."
            disabled={loading}
          />
          <small style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
            Paste the shareable link of your document from Google Drive
          </small>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          disabled={!driveLink.trim() || loading}
          className="btn-primary"
        >
          {loading ? 'Fetching & Evaluating...' : 'Evaluate from Drive'}
        </button>
      </form>
    </div>
  );
};

export default DriveLink;
