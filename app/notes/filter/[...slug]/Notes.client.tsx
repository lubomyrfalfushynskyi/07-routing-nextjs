'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ tag: tag === 'all' ? undefined : tag }),
  });

  if (isLoading) return <div>Loading...</div>;

  return <NoteList notes={notes} />;
}
