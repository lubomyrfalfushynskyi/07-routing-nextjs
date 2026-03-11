import { NextRequest, NextResponse } from 'next/server';

const mockNotes = [
  { id: '1', title: 'Work Meeting', content: 'Discuss Q1 goals', tag: 'Work', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', title: 'Shopping List', content: 'Buy groceries', tag: 'Shopping', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', title: 'Personal Project', content: 'Build a notes app', tag: 'Personal', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', title: 'Fix Bug', content: 'Resolve CORS issue', tag: 'Todo', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', title: 'Team Meeting', content: 'Sync with frontend devs', tag: 'Meeting', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 2;

  let filtered = mockNotes;
  if (tag) {
    filtered = filtered.filter(n => n.tag === tag);
  }
  if (search) {
    filtered = filtered.filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.content.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filtered.length / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedNotes = filtered.slice(start, end);

  return NextResponse.json({
    notes: paginatedNotes,
    totalPages: totalPages || 1
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newNote = { 
    id: String(Date.now()), 
    ...body, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  };
  return NextResponse.json(newNote);
}
