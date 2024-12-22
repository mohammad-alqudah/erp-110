import axios from 'axios';

export const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  const domain = localStorage.getItem('apiDomain') || 'https://demo.s3r.store';
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const branchId = user.branches?.[0]?.id;
  
  config.baseURL = domain;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add branch ID header for non-auth endpoints
  if (!config.url?.startsWith('/auth/') && branchId) {
    config.headers['x-branch-id'] = branchId;
  }

  return config;
});

// File Processing API
export const extractHeaders = async (file: File, skippedRows: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('skipped_rows', skippedRows.toString());
  
  const response = await api.post('/products/extract-headers/', formData);
  return response.data;
};

export const importProducts = async (
  file: File,
  mappings: {
    name: string;
    barcode: string;
    quantity?: string;
    price?: string;
  },
  skippedRows: number
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('skipped_rows', skippedRows.toString());
  
  // Only append non-empty mappings
  Object.entries(mappings).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });
  
  const response = await api.post('/products/import-products/', formData);
  return response.data;
};