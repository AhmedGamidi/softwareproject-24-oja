import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

const isIgnoredRoute = createRouteMatcher([
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;

  // Check if the route is an ignored route
  if (isIgnoredRoute(req)) {
    return;
  }

  // If the route is not ignored and is not public, protect it
  if (!isPublicRoute(req)) {
    auth().protect();
  }

});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
