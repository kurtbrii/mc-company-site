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

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next()


}

// Define the paths that the middleware applies to
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
