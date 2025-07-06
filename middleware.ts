// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware logic to run on protected routes
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log("Middleware check — Token:", token);
  // console.log("Middleware check — Path:", req.nextUrl.pathname);

  // If no token, block access
  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Unauthorized: Please log in" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return NextResponse.next(); // allow to proceed
}
// This should be at the bottom of the same `middleware.ts` file
export const config = {
  matcher: ["/api/vendors/:path*"], // Protects all sub-routes under /api/vendors
};
