import { NextRequest, NextResponse } from 'next/server';
import { DEMO_TOKEN, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Validate an existing auth token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (token !== DEMO_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      patient: demoStore.getPatient(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
