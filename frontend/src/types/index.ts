export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface Evaluation {
  id: number;
  documentName: string;
  documentSource: string;
  evaluationScore: number;
  evaluationFeedback: string;
  structureScore: number;
  completenessScore: number;
  qualityScore: number;
  evaluatedAt: string;
  createdAt: string;
}

export interface EvaluationRequest {
  driveLink: string;
}
