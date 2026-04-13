import { NextRequest, NextResponse } from 'next/server';
import { validateDemoAuth, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Update an existing vital record
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!validateDemoAuth(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const data = await request.json();
    const updated = demoStore.updateVital(parseInt(id), data);

    if (!updated) {
      // If vital doesn't exist, create it with this ID
      demoStore.createVital({ ...data, id: parseInt(id) });
    }

    console.log('[Demo] Vital updated:', id, data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
