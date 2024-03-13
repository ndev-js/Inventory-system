import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function Middleware(request: NextRequest) {
  console.log(request.method, "hello from the request middleware");
  return NextResponse.next(); // Pass control to the next Middleware or route handler
}

export const config = {
  matcher: ["/store"],
};
