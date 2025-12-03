import React from 'react';
import FileUpload from '../components/FileUpload';
import DriveLink from '../components/DriveLink';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="main-content">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome, {user?.username}!</h1>
          <p className="dashboard-subtitle">
            Upload your Software Design Description or provide a Google Drive link to get started
          </p>
        </div>

        <div className="dashboard-grid">
          <FileUpload />
          <DriveLink />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
