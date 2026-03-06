import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchNotes = async (params?: { search?: string; tag?: string }): Promise<Note[]> => {
  const { data } = await api.get<Note[]>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
};

export const updateNote = async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
  const { data } = await api.put<Note>(`/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
