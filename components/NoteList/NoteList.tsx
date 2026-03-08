'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/notes';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.noteList}>
      {notes.map((note) => (
        <li key={note.id} className={css.noteItem}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <footer>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </footer>
        </li>
      ))}
    </ul>
  );
}
