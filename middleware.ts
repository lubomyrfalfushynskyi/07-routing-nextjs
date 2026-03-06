import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/notes') {
    return NextResponse.redirect(new URL('/notes/filter/all', request.url));
  }
}

export const config = {
  matcher: '/notes',
};
