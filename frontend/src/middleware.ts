import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/chat(.*)']);

// Check if Clerk is properly configured
const isClerkConfigured = () => {
    return !!(
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
        process.env.CLERK_SECRET_KEY
    );
};

// Production-ready middleware with graceful fallback
export default function middleware(request: NextRequest) {
    // If Clerk is not configured, allow all requests through
    if (!isClerkConfigured()) {
        console.warn('⚠️ Clerk not configured - authentication disabled');
        return NextResponse.next();
    }

    // Use Clerk middleware when properly configured
    return clerkMiddleware(async (auth, req) => {
        if (isProtectedRoute(req)) {
            await auth.protect();
        }
    })(request, {} as any);
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

