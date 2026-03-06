import { NextRequest, NextResponse } from 'next/server';

const mockNotes = [
  { id: '1', title: 'Work Meeting', content: 'Discuss Q1 goals', tag: 'Work', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', title: 'Shopping List', content: 'Buy groceries', tag: 'Personal', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', title: 'Project Idea', content: 'Build a notes app', tag: 'Ideas', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', title: 'Fix Bug', content: 'Resolve CORS issue', tag: 'Todo', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const note = mockNotes.find(n => n.id === id);
  return NextResponse.json(note || { error: 'Not found' });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  return NextResponse.json({ id, ...body, updatedAt: new Date().toISOString() });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json({ success: true });
}
