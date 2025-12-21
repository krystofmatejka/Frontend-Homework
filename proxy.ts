import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const languages = ['en', 'de', 'cs'];
const defaultLanguage = 'en';
const cookieName = 'preferred-language';
 
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  const hasLangInPath = languages.includes(firstSegment);
  const cookieLang = request.cookies.get(cookieName)?.value;

  // If path is just '/', redirect to /home with language
  if (pathname === '/') {
    const lang = cookieLang && languages.includes(cookieLang) ? cookieLang : defaultLanguage;
    const url = new URL(`/${lang}/home${request.nextUrl.search}`, request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set(cookieName, lang, { path: '/', maxAge: 60 * 60 * 24 * 365 }); // 1 year
    return response;
  }

  // If no language in path
  if (!hasLangInPath) {
    // Use cookie language or default
    const lang = cookieLang && languages.includes(cookieLang) ? cookieLang : defaultLanguage;
    const url = new URL(`/${lang}${pathname}${request.nextUrl.search}`, request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set(cookieName, lang, { path: '/', maxAge: 60 * 60 * 24 * 365 }); // 1 year
    return response;
  }

  // Language is in path, set/update cookie
  const response = NextResponse.next();
  response.cookies.set(cookieName, firstSegment, { path: '/', maxAge: 60 * 60 * 24 * 365 }); // 1 year
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next|api|.*\\.).*)',
  ],
}