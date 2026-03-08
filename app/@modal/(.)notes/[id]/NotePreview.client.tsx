'use client';

import { useRouter, useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';
import css from '@/components/NotePreview/NotePreview.module.css';

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div>Loading...</div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div>Error: {error instanceof Error ? error.message : 'Failed to load note'}</div>
        <button onClick={handleClose}>Close</button>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div>Note not found</div>
        <button onClick={handleClose}>Close</button>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2 className={css.title}>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>Tag: {note.tag}</p>
          <p className={css.date}>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
          <button onClick={handleClose} className={css.backBtn}>Close</button>
        </div>
      </div>
    </Modal>
  );
}
