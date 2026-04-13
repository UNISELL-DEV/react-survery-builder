import { NextRequest, NextResponse } from 'next/server';
import { validateDemoAuth, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Save a payment method after Stripe confirmation
 */
export async function POST(request: NextRequest) {
  if (!validateDemoAuth(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { payment_method_id, set_as_default } = body;

    // Extract last4 from payment method ID or use default
    const last4 = payment_method_id?.slice(-4) || '0000';

    demoStore.addPaymentMethod({
      type: 'card',
      brand: 'visa',
      last4,
      is_default: set_as_default ?? true,
      display_name: `Card ending in ${last4}`,
    });

    console.log('[Demo] Payment method saved:', payment_method_id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
