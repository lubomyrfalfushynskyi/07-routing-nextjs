'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => fetchNotes({ tag: tag === 'all' ? undefined : tag, search: debouncedSearch }),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ flex: 1 }}>
      <h1>Notes {tag !== 'all' ? `- ${tag}` : ''}</h1>
      <SearchBox value={search} onChange={setSearch} />
      <button onClick={() => setIsModalOpen(true)}>Add Note</button>
      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
          <Pagination currentPage={page} totalPages={1} onPageChange={setPage} />
        </>
      ) : (
        <p>No notes found</p>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
