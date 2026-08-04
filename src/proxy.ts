import { NextResponse } from "next/server";

// The Payload admin + REST API only run locally: production builds ship a
// read-only snapshot of payload.db, so any write there would be lost.
export function proxy() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
