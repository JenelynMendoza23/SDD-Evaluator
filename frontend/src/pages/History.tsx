import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { evaluationAPI } from '../services/api';
import { Evaluation } from '../types';

const History: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await evaluationAPI.getHistory();
      setEvaluations(data);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleItemClick = (evaluation: Evaluation) => {
    navigate('/results', { state: { evaluation } });
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Evaluation History</h1>
          <p className="dashboard-subtitle">
            View all your previous document evaluations
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {evaluations.length === 0 ? (
          <div className="no-history">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
            <h2>No Evaluations Yet</h2>
            <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              You haven't evaluated any documents yet. Start by uploading a document or providing a Google Drive link.
            </p>
            <Link to="/dashboard">
              <button className="btn-primary">Go to Dashboard</button>
            </Link>
          </div>
        ) : (
          <div className="history-list">
            {evaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="history-item"
                onClick={() => handleItemClick(evaluation)}
              >
                <div className="history-item-header">
                  <div>
                    <div className="history-item-title">
                      {evaluation.documentName}
                    </div>
                    <div className="history-item-date">
                      {formatDate(evaluation.evaluatedAt)}
                    </div>
                  </div>
                  <div style={{ 
                    background: '#3498db', 
                    color: 'white', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}>
                    {evaluation.documentSource}
                  </div>
                </div>

                <div className="history-item-scores">
                  <div className="history-score">
                    <div className="history-score-label">Overall</div>
                    <div className="history-score-value">
                      {evaluation.evaluationScore?.toFixed(1) || 'N/A'}
                    </div>
                  </div>
                  <div className="history-score">
                    <div className="history-score-label">Structure</div>
                    <div className="history-score-value">
                      {evaluation.structureScore?.toFixed(1) || 'N/A'}
                    </div>
                  </div>
                  <div className="history-score">
                    <div className="history-score-label">Completeness</div>
                    <div className="history-score-value">
                      {evaluation.completenessScore?.toFixed(1) || 'N/A'}
                    </div>
                  </div>
                  <div className="history-score">
                    <div className="history-score-label">Quality</div>
                    <div className="history-score-value">
                      {evaluation.qualityScore?.toFixed(1) || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
