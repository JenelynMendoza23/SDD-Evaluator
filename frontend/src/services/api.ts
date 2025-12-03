import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, Evaluation, EvaluationRequest } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};

// Evaluation API
export const evaluationAPI = {
  uploadFile: async (file: File): Promise<Evaluation> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<Evaluation>('/evaluations/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  evaluateDriveFile: async (data: EvaluationRequest): Promise<Evaluation> => {
    const response = await api.post<Evaluation>('/evaluations/drive', data);
    return response.data;
  },

  getHistory: async (): Promise<Evaluation[]> => {
    const response = await api.get<Evaluation[]>('/evaluations/history');
    return response.data;
  },
};

export default api;
