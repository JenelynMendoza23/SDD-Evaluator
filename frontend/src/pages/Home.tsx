import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="main-content">
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '1rem' }}>
          SDD Evaluator
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#7f8c8d', marginBottom: '2rem' }}>
          An intelligent document evaluation tool that simplifies the process of reviewing Software Design Descriptions
        </p>
        <p style={{ fontSize: '1.1rem', color: '#7f8c8d', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          Powered by AI, the system analyzes structure, completeness, and quality, while supporting seamless file uploads and Google Drive integration.
        </p>
        {!isAuthenticated ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register">
              <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Login
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/dashboard">
            <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Go to Dashboard
            </button>
          </Link>
        )}

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '4rem auto 0' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>AI-Powered Analysis</h3>
            <p style={{ color: '#7f8c8d' }}>Get comprehensive evaluation scores and detailed feedback on your documents</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Multiple Input Options</h3>
            <p style={{ color: '#7f8c8d' }}>Upload files directly or fetch documents from Google Drive</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Track Progress</h3>
            <p style={{ color: '#7f8c8d' }}>View your evaluation history and track improvements over time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
