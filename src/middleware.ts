import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./server/auth"; // Adjust the path as necessary
import { NextRequest } from "next/server";

const loggedIn = true;


export async function middleware(req: NextRequest) {


  if (loggedIn) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', req.url))

}

export const config = {
  matcher: ["/dashboard"],
};
