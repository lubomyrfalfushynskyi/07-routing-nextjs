import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto, AllowedTag, NotesResponse } from '@/types/note';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
  // For client-side, use relative /api path if baseURL is configured to a full URL
  if (typeof window !== 'undefined' && config.baseURL === API_BASE_URL) {
    config.baseURL = '/api';
  }
  
  if (API_TOKEN) {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
  }
  return config;
});


export const fetchNotes = async (params?: { search?: string; tag?: AllowedTag; page?: number }): Promise<Note[]> => {
  const { data } = await api.get<Note[]>(`/notes`, { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>(`/notes`, noteData);
  return data;
};

export const updateNote = async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
  const { data } = await api.patch<Note>(`/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
