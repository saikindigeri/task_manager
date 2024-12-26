import axios from 'axios';

const API = axios.create({ baseURL: 'https://task-manager-8isc.onrender.com' });

export const fetchTasks = () => API.get('/tasks');
export const createTask = (task) => API.post('/tasks', task);
export const updateTask = (id, updatedTask) => API.patch(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);