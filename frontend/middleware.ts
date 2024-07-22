import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
  userRoutes
} from './routes';
import { getCurrentRole } from "./lib/auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = await getCurrentRole() || 'user'; // Default to 'user' if role is not set

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.some(route => nextUrl.pathname.startsWith(route));
  const isUserRoute = userRoutes.some(route => nextUrl.pathname.startsWith(route));  
  // Allow API authentication routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect logged-in users from auth routes to default redirect
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Protect non-public routes
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = nextUrl.pathname;
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl));
  }

  // Handle admin routes
  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  // Handle user routes
  if (isUserRoute && role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


