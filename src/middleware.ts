import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  console.log('Current user', cookies().get('current-user'))
  if (!cookies().has('current-user')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: '/admin/:path*'
}