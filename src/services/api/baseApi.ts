import axios, { AxiosInstance, AxiosError } from 'axios';
import { getStoreDomain } from '../domainService';

export interface ApiResponse<T> {
  data: T;
  status: boolean;
  detail: string | null;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  next: number | null;
  previous: number | null;
  count: number;
}

const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: getStoreDomain(),
  });

  api.interceptors.request.use((config) => {
    config.baseURL = getStoreDomain();
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const branchId = user.branches?.[0]?.id;
    
    if (!config.url?.startsWith('/auth/')) {
      if (!branchId) {
        window.location.href = '/select-branch';
        throw new Error('No branch selected');
      }
      config.headers['x-branch-id'] = branchId;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.branches?.[0]?.id) {
          window.location.href = '/select-branch';
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApi();