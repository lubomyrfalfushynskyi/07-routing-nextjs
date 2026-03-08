export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateNoteDto {
    title: string;
    content: string;
    tag: string;
}

export interface UpdateNoteDto {
    title?: string;
    content?: string;
    tag?: string;
}

export type AllowedTag = 'All notes' | 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface NotesResponse {
    notes: Note[];
    totalPages: number;
}
