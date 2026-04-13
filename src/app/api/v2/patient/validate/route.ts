import { NextRequest, NextResponse } from 'next/server';
import { DEMO_OTP, DEMO_TOKEN, demoStore } from '@/lib/demo-data';

/**
 * DEMO: Validate patient OTP or password
 * Accepts OTP "123456" or any password.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { otp } = body;

    // Validate OTP if provided (must be "123456"); any password is accepted
    if (otp && otp !== DEMO_OTP) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP. Use 123456 for demo.' },
        { status: 401 },
      );
    }

    // Password auth: accept any password
    // OTP auth: already validated above

    const patient = demoStore.getPatient();
    if (body.email) {
      patient.email = body.email;
    }

    return NextResponse.json({
      success: true,
      patient,
      token: DEMO_TOKEN,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
