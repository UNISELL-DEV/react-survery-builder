import { NextRequest, NextResponse } from 'next/server';
import { DEMO_OTP, DEMO_TOKEN, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Send OTP to patient email/phone
 * Accepts any email. Returns first-time user flow for non-demo emails.
 * OTP code is always: 123456
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone } = body;
    const identifier = email || phone;

    if (!identifier) {
      return NextResponse.json(
        { success: false, error: 'Email or phone is required' },
        { status: 400 },
      );
    }

    // Simulate first-time user for non-demo emails
    if (email && email !== 'demo@example.com') {
      const patient = { ...demoStore.getPatient(), email };
      return NextResponse.json({
        success: true,
        isFirstTimeUser: true,
        token: DEMO_TOKEN,
        patient,
      });
    }

    // Returning user - OTP "sent"
    console.log(`[Demo] OTP ${DEMO_OTP} sent to ${identifier}`);
    return NextResponse.json({
      success: true,
      message: `OTP sent to ${identifier}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
