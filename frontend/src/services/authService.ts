import api from './api';
import { ApiResponse, AuthResponse } from '../types';
export const authService = {
  register: async (name: string, username: string, email: string, password: string, role: string) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', {
      name,
      username,
      email,
      password,
      role,
    });
    return response.data.data;
  },
  login: async (identifier: string, password: string) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', {
      identifier,
      password,
    });
    return response.data.data;
  },
  getProfile: async () => {
    const response = await api.get<ApiResponse<{ user: AuthResponse['user'] }>>('/auth/me');
    return response.data.data.user;
  },
};
