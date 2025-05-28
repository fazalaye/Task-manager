import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const auth = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
};

// Tasks API
export const tasks = {
  getAll: () => api.get('/tasks'),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (task: any) => api.post('/tasks', task),
  update: (id: string, task: any) => api.patch(`/tasks/${id}`, task),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

export default api; 