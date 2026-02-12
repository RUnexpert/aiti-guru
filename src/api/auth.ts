import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/auth.ts';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};
