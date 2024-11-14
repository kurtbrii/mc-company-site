// import { getServerSession } from "next-auth";
import { authOptions } from "./server/auth"; // Adjust the path as necessary
import { type NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { getServerAuthSession } from "./server/auth";
import { getSession } from "next-auth/react";

export async function middleware(req: NextRequest, res: NextResponse) {
  //! solution from https://github.com/nextauthjs/next-auth/issues/4467
  const requestForNextAuth: object = {
    headers: {
      cookie: req.headers.get('cookie'),
    },
  };

  const session = await getSession({ req: requestForNextAuth });
  const user = session?.user

  // ! only logged in users can access (which is basically everything)
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ! current user in session (own time in, own bonus sheet and is not the CEO);
  const currentURL = req.nextUrl.pathname

  const notMyTimeInDetails = currentURL.startsWith('/time-in/') && currentURL.split('/')[2] !== user?.id // user navigates to time in details of other members
  const notMyBonusDetails = currentURL.startsWith('/bonus-sheet/') && currentURL.split('/')[3] !== user?.id // user navigates to bonus sheet details of other members

  const ceoURLs = [`/time-in`, '/bonus-sheet'] // paths that are only accessible to the CEO
  const isUrlProtected = ceoURLs.includes(req.nextUrl.pathname)

  if (user?.role !== 'CEO') {
    if (notMyTimeInDetails || notMyBonusDetails || isUrlProtected) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    "/dashboard/:path*",
    '/profile/:path*',
    "/bonus-sheet/:path*",
    '/my-team',
    '/time-in/:path*',
    '/bonus-sheet-form/:path*',
    '/monthly-survey/:path*'
  ]
};
