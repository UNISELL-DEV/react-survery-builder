import { NextRequest, NextResponse } from 'next/server';
import { demoStore } from '@/lib/demo-data';

/**
 * DEMO: Update patient profile fields
 * Merges provided fields into the demo patient data.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const patient = demoStore.updatePatient(body);

    return NextResponse.json({
      success: true,
      patient,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
