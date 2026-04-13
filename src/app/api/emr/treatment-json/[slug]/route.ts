import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_BASE_URL = process.env.LARAVEL_API_URL || 'https://my.ivyrx.com';

/**
 * Proxy to Laravel backend for EMR treatment plan data.
 * Avoids CORS issues when fetching from the client.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const response = await fetch(
      `${LARAVEL_BASE_URL}/emr/treatment-json/${slug}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch treatment plan: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[EMR Proxy] Error fetching treatment plan:', error);
    return NextResponse.json(
      {
        error:
          'Failed to connect to backend API. Is the Laravel server running?',
      },
      { status: 502 },
    );
  }
}
