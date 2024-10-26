import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./server/auth"; // Adjust the path as necessary
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Retrieve the session based on the request
  // const session = await getServerSession(); // Pass req correctly
  // console.log("session", session);

  // If there is no session, redirect to the sign-in page
  // if (!session) {
  // return NextResponse.redirect(new URL("/", req.url));
  // }

  // Allow authenticated users to proceed
  return NextResponse.next();
}

// Export config if needed for route matching
export const config = {
  matcher: ["/dashboard"], // Adjust the matcher if necessary
};
