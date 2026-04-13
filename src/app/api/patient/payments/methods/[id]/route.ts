import { NextRequest, NextResponse } from 'next/server';
import { validateDemoAuth, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Delete a saved payment method
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!validateDemoAuth(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const { id } = await params;
  const deleted = demoStore.deletePaymentMethod(parseInt(id));

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: 'Payment method not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
