import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note';

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return '/api';
  }
  return 'http://localhost:3000/api';
};

export const fetchNotes = async (params?: { search?: string; tag?: string }): Promise<Note[]> => {
  const { data } = await axios.get<Note[]>(`${getBaseURL()}/notes`, { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`${getBaseURL()}/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const { data } = await axios.post<Note>(`${getBaseURL()}/notes`, noteData);
  return data;
};

export const updateNote = async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
  const { data } = await axios.put<Note>(`${getBaseURL()}/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${getBaseURL()}/notes/${id}`);
};
