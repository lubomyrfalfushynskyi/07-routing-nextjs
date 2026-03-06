import type { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';

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
  const tag = slug?.[0] || 'all';
  const notes = await fetchNotes({ tag: tag === 'all' ? undefined : tag });

  return (
    <div style={{ flex: 1 }}>
      <h1>Notes {tag !== 'all' ? `- ${tag}` : ''}</h1>
      <NoteList notes={notes} />
    </div>
  );
}
