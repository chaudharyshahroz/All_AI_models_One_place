import { NextRequest, NextResponse } from "next/server";

/**
 * Subdomain routing middleware.
 *
 * all ai models .app      → public marketing site + user app
 * admin.all ai models .app → admin panel only (marketing + user app blocked)
 *
 * The admin subdomain allows:
 *   - /admin/*         — the admin dashboard
 *   - /api/auth/*      — NextAuth (sign-in/out)
 *   - /api/health      — health check
 *   - /sign-in         — sign-in (admins need to log in)
 *   - /_next/*, /favicon.ico, /uploads/* — static assets
 *
 * Anything else on admin.all ai models .app redirects to /admin.
 */

const ADMIN_HOSTS = new Set([
  "admin.all ai models .app",
  // Add more admin subdomains here if you set up env-specific deployments
  "admin.staging.all ai models .app",
  "admin.localhost",
]);

const ADMIN_ALLOW_PREFIXES = [
  "/admin",
  "/api/auth",
  "/api/health",
  "/sign-in",
  "/_next",
  "/favicon",
  "/uploads",
  "/images",
  "/icons",
  "/fonts",
];

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase().split(":")[0]; // strip port
  const isAdminSub = ADMIN_HOSTS.has(host);
  if (!isAdminSub) return NextResponse.next();

  const { pathname } = req.nextUrl;
  const allowed = ADMIN_ALLOW_PREFIXES.some((p) => pathname.startsWith(p));
  if (allowed) return NextResponse.next();

  // Block the public app + marketing on the admin subdomain by redirecting to /admin.
  // If the user is unauthenticated, /admin will redirect to /sign-in, which IS allowed.
  const url = req.nextUrl.clone();
  url.pathname = "/admin";
  url.search = "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Run on every path except Next.js internals, the favicon, and static files in /public.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
