import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Evaluation } from '../types';
import ReactMarkdown from 'react-markdown';

const Results: React.FC = () => {
  const location = useLocation();
  const evaluation = location.state?.evaluation as Evaluation | undefined;

  if (!evaluation) {
    return (
      <div className="main-content">
        <div className="card">
          <h2 className="card-title">No Results Found</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
            No evaluation results available. Please evaluate a document first.
          </p>
          <Link to="/dashboard">
            <button className="btn-primary">Go to Dashboard</button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="main-content">
      <div className="results-container">
        <div className="results-header">
          <h1 className="results-title">{evaluation.documentName}</h1>
          <div className="results-meta">
            <p>Source: {evaluation.documentSource}</p>
            <p>Evaluated on: {formatDate(evaluation.evaluatedAt)}</p>
          </div>
        </div>

        <div className="score-grid">
          <div className="score-card overall">
            <div className="score-label">Overall Score</div>
            <div className="score-value">
              {evaluation.evaluationScore?.toFixed(1) || 'N/A'}
            </div>
          </div>
          <div className="score-card structure">
            <div className="score-label">Structure</div>
            <div className="score-value">
              {evaluation.structureScore?.toFixed(1) || 'N/A'}
            </div>
          </div>
          <div className="score-card completeness">
            <div className="score-label">Completeness</div>
            <div className="score-value">
              {evaluation.completenessScore?.toFixed(1) || 'N/A'}
            </div>
          </div>
          <div className="score-card quality">
            <div className="score-label">Quality</div>
            <div className="score-value">
              {evaluation.qualityScore?.toFixed(1) || 'N/A'}
            </div>
          </div>
        </div>

        <div className="feedback-section">
          <h2 className="feedback-title">Detailed Feedback</h2>
          <div className="feedback-content">
            <ReactMarkdown>{evaluation.evaluationFeedback}</ReactMarkdown>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <Link to="/dashboard">
            <button className="btn-primary">Evaluate Another Document</button>
          </Link>
          <Link to="/history">
            <button className="btn-secondary">View History</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
