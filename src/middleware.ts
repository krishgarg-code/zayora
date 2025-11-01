import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/ranges/(.*)',
  '/api/webhooks/(.*)',
  '/auth(.*)',
  '/sso-callback(.*)',
  '/product/(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // For protected routes, redirect to our custom auth page instead of Clerk's default
    await auth.protect();
  }
}, {
  // Configure Clerk to use our custom auth page for sign in/sign up
  signInUrl: '/auth',
  signUpUrl: '/auth/sign-up',
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|otf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};