import { NextRequest, NextResponse } from 'next/server';

/**
 * DEMO: Track a page view
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(`[Demo Analytics] Page view: ${body.url || 'unknown'}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true }); // Always succeed for analytics
  }
}
