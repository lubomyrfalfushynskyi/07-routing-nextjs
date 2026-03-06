'use client';

import { useRouter, useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Modal isOpen={true} onClose={() => router.back()}><div>Loading...</div></Modal>;
  if (!note) return <Modal isOpen={true} onClose={() => router.back()}><div>Note not found</div></Modal>;

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </Modal>
  );
}
