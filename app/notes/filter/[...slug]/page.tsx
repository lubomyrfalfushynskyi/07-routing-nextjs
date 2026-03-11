import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import { AllowedTag } from '@/types/note';
import NotesClient from './Notes.client';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || 'all';
  const title = tag === 'all' ? 'All Notes' : `${tag} Notes`;
  
  return {
    title: `${title} | NoteHub`,
    description: `View ${title.toLowerCase()} in NoteHub`,
    openGraph: {
      title: `${title} | NoteHub`,
      description: `View ${title.toLowerCase()} in NoteHub`,
      url: `https://notehub.vercel.app/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilterPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag = slug?.[0] ? decodeURIComponent(slug[0]) : 'all';
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () => fetchNotes({ tag: tag === 'all' ? undefined : tag as AllowedTag, search: '', page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag as AllowedTag | 'all'} />
    </HydrationBoundary>
  );
}
