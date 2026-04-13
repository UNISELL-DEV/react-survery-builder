import { NextRequest, NextResponse } from 'next/server';

/**
 * DEMO: Submit EMR enrollment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const formData = await request.formData();

    console.log(`[Demo] EMR enrollment submitted for: ${slug}`);
    console.log(
      '[Demo] Form responses:',
      formData.get('form_responses')?.toString()?.slice(0, 200) + '...',
    );

    return NextResponse.json({
      success: true,
      redirect_url: null,
    });
  } catch (error) {
    console.error('[Demo] EMR enrollment error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      {
        success: false,
        errors: { error: 'An error occurred while submitting enrollment.' },
      },
      { status: 500 },
    );
  }
}
