import { NextRequest, NextResponse } from 'next/server';
import { validateDemoAuth, DEMO_ADDRESSES } from '@/lib/demo-data';

/**
 * DEMO: Fetch patient addresses
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
    addresses: DEMO_ADDRESSES,
  });
}
