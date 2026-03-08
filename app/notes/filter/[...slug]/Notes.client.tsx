'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import { AllowedTag } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface NotesClientProps {
  tag?: AllowedTag | 'all';
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => fetchNotes({ tag: tag === 'All notes' ? undefined : tag, search: debouncedSearch, page }),
  });
  
  // Temporarily hardcode totalPages as we're not getting it from the API now
  const totalPages = 1;   if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ flex: 1 }}>
      <h1>Notes {tag && tag !== 'All notes' ? `- ${tag}` : ''}</h1>
                <SearchBox
                  value={search}
                  onChange={(value) => {
                    setSearch(value);
                    setPage(1); // Reset page to 1 on search change
                  }}
                />
                <button onClick={() => setIsModalOpen(true)}>Add Note</button>
                {notes.length > 0 ? (
                  <>
                    <NoteList notes={notes} />
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                  </>
                ) : (
                  <p>No notes found</p>
                )}      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
