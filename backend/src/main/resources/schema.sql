-- PostgreSQL Database Schema for SDD Evaluator

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Evaluations Table
CREATE TABLE IF NOT EXISTS evaluations (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_source VARCHAR(50) NOT NULL,
    file_path VARCHAR(500),
    drive_link VARCHAR(500),
    content TEXT,
    evaluation_score DOUBLE PRECISION,
    evaluation_feedback TEXT,
    structure_score DOUBLE PRECISION,
    completeness_score DOUBLE PRECISION,
    quality_score DOUBLE PRECISION,
    evaluated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_created_at ON evaluations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
