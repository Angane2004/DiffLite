import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// TEMPORARILY DISABLED - Add CLERK_SECRET_KEY to Netlify env vars, then uncomment
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// const isProtectedRoute = createRouteMatcher(['/chat(.*)']);
// export default clerkMiddleware(async (auth, req) => {
//     if (isProtectedRoute(req)) {
//         await auth.protect();
//     }
// });

// Temporary passthrough middleware
export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
