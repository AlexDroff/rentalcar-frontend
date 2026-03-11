// Middleware proxy - currently not needed for car rental app
// Can be extended if authentication is added in the future

import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  // Pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
