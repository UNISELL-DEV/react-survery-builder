import { NextRequest, NextResponse } from 'next/server';

/**
 * DEMO: Track an analytics event
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = body.event;

    console.log(
      `[Demo Analytics] Track: ${event?.action || 'unknown'}`,
      event?.category || '',
      event?.label || '',
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true }); // Always succeed for analytics
  }
}
