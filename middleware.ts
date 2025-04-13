
export default function middleware(){
    // connectToDatabase()
}

// // middleware.js
// import { NextResponse } from 'next/server';
// import { verifyToken } from './lib/auth';

// export async function middleware(request) {
//   // Skip middleware for shortcode redirects and public paths
//   const { pathname } = request.nextUrl;
  
//   // Allow direct access to short URLs
//   if (pathname.split('/').length === 2 && pathname !== '/login' && pathname !== '/' && !pathname.startsWith('/api/')) {
//     return NextResponse.next();
//   }
  
//   // Check for protected routes
//   const protectedPaths = ['/dashboard', '/api/url'];
//   const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
//   if (isProtectedPath) {
//     const token = request.cookies.get('auth_token')?.value;
    
//     if (!token || !(await verifyToken(token))) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   }
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/api/url/:path*',
//     '/:shortcode',
//   ],
// };