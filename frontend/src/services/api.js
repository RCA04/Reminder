import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const wordsService = {
  getAll: () => api.get('/words'),
  create: (data) => api.post('/newWord', data),
  update: (id, data) => api.put(`/words/${id}`, data),
  remove: (id) => api.delete(`/words/${id}`),
};

export const authService = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
};

export default api;

