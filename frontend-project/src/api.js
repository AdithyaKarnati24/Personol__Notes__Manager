import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/notes' });

export const fetchNotes = (query = '') => API.get(`/?${query}`);
export const createNote = (noteData) => API.post('/', noteData);
export const updateNote = (id, noteData) => API.put(`/${id}`, noteData);
export const deleteNote = (id) => API.delete(`/${id}`);
