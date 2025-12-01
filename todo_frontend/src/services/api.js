import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const todoService = {
  getAllTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodo: async (task) => {
    const response = await api.post('/todos', { task });
    return response.data;
  },

  updateTodo: async (id, task) => {
    const response = await api.put(`/todos/${id}`, { task });
    return response.data;
  },

  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  }
};

export default api;


