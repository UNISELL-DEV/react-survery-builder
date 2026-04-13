import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateDemoAuth, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Create a real Stripe SetupIntent for the payment element UI.
 * Requires STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env
 */
export async function POST(request: NextRequest) {
  if (!validateDemoAuth(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!secretKey || !publishableKey) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Stripe keys not configured. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env',
      },
      { status: 503 },
    );
  }

  try {
    const stripe = new Stripe(secretKey);

    // Reuse or create a Stripe customer for demo
    let customerId = demoStore.getStripeCustomerId();
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: 'demo@example.com',
        name: 'Demo Patient',
        metadata: { demo: 'true' },
      });
      customerId = customer.id;
      demoStore.setStripeCustomerId(customerId);
    }

    // Parse body (force_new is accepted but not used in demo - always creates new)
    await request.json().catch(() => ({}));

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      usage: 'off_session',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      success: true,
      setup_intent: {
        id: setupIntent.id,
        client_secret: setupIntent.client_secret,
        customer_id: customerId,
        stripe_account: '', // empty for direct account (not Stripe Connect)
        publishable_key: publishableKey,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create setup intent';
    console.error('[Demo] Stripe setup-intent error:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
