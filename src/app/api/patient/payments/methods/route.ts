import { NextRequest, NextResponse } from 'next/server';
import { validateDemoAuth, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Fetch saved payment methods for a patient
 */
export async function GET(request: NextRequest) {
  if (!validateDemoAuth(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  return NextResponse.json({
    success: true,
    payment_methods: demoStore.getPaymentMethods(),
  });
}
