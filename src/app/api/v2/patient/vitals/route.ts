import { NextRequest, NextResponse } from 'next/server';
import { validateDemoAuth, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Create a new vital record
 */
export async function POST(request: NextRequest) {
  if (!validateDemoAuth(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const data = await request.json();
    const result = demoStore.createVital(data);

    console.log('[Demo] Vital created:', result.id, data);
    return NextResponse.json({
      success: true,
      data: { id: result.id },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
