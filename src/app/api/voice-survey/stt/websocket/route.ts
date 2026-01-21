import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * AWS Transcribe Streaming WebSocket URL Generator
 *
 * Generates a pre-signed WebSocket URL for AWS Transcribe Streaming.
 * The client can connect directly to this URL to stream audio and receive transcripts.
 *
 * Environment variables required:
 * - AWS_REGION (default: us-east-1)
 * - AWS_LOCAL_ACCESS_KEY_ID
 * - AWS_LOCAL_SECRET_ACCESS_KEY
 */

const SUPPORTED_LANGUAGES: Record<string, string> = {
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'en-AU': 'en-AU',
  'es-ES': 'es-ES',
  'es-US': 'es-US',
  'fr-FR': 'fr-FR',
  'fr-CA': 'fr-CA',
  'de-DE': 'de-DE',
  'it-IT': 'it-IT',
  'pt-BR': 'pt-BR',
  'ja-JP': 'ja-JP',
  'ko-KR': 'ko-KR',
  'zh-CN': 'zh-CN',
};

/**
 * Generate AWS Signature V4 for WebSocket URL
 *
 * AWS Transcribe Streaming WebSocket requires a specific signing process.
 * See: https://docs.aws.amazon.com/transcribe/latest/dg/websocket.html
 */
function createPresignedUrl(
  region: string,
  accessKeyId: string,
  secretAccessKey: string,
  languageCode: string,
  sampleRate: number = 16000,
  mediaEncoding: string = 'pcm'
): string {
  const host = `transcribestreaming.${region}.amazonaws.com`;
  const port = '8443';
  const endpoint = `wss://${host}:${port}/stream-transcription-websocket`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);

  const method = 'GET';
  const service = 'transcribe';
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  // Query string parameters (must be sorted alphabetically by key name)
  // Note: AWS expects URI encoding to use uppercase hex digits
  const queryParams: Record<string, string> = {
    'X-Amz-Algorithm': algorithm,
    'X-Amz-Credential': `${accessKeyId}/${credentialScope}`,
    'X-Amz-Date': amzDate,
    'X-Amz-Expires': '300',
    'X-Amz-SignedHeaders': 'host',
    'language-code': languageCode,
    'media-encoding': mediaEncoding,
    'sample-rate': sampleRate.toString(),
  };

  // Build canonical query string (sorted by key)
  // Must use uppercase hex encoding for special characters
  const sortedKeys = Object.keys(queryParams).sort();
  const canonicalQueryString = sortedKeys
    .map((key) => `${uriEncode(key)}=${uriEncode(queryParams[key])}`)
    .join('&');

  // Create canonical request
  // Host header MUST include the port for WebSocket connections
  // CanonicalHeaders ends with \n, then there's a blank line before SignedHeaders
  const canonicalHeaders = `host:${host}:${port}\n`;
  const signedHeaders = 'host';
  const payloadHash = crypto.createHash('sha256').update('').digest('hex');

  // Canonical request format (from AWS docs):
  // HTTPRequestMethod + '\n' +
  // CanonicalURI + '\n' +
  // CanonicalQueryString + '\n' +
  // CanonicalHeaders + '\n' +  <-- Note: headers already end with \n, this adds blank line
  // SignedHeaders + '\n' +
  // HashedPayload
  const canonicalRequest =
    method + '\n' +
    '/stream-transcription-websocket' + '\n' +
    canonicalQueryString + '\n' +
    canonicalHeaders + '\n' +  // canonicalHeaders ends with \n, this adds the required blank line
    signedHeaders + '\n' +
    payloadHash;

  // Create string to sign
  const stringToSign = [
    algorithm,
    amzDate,
    credentialScope,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n');

  // Calculate signature
  const signingKey = getSignatureKey(secretAccessKey, dateStamp, region, service);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  // Build final URL
  return `${endpoint}?${canonicalQueryString}&X-Amz-Signature=${signature}`;
}

/**
 * URI encode with uppercase hex digits (AWS requirement)
 * encodeURIComponent uses lowercase, AWS requires uppercase
 */
function uriEncode(str: string): string {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
    .replace(/%([0-9a-f]{2})/gi, (_, hex) => `%${hex.toUpperCase()}`);
}

/**
 * Generate AWS signing key
 */
function getSignatureKey(
  key: string,
  dateStamp: string,
  regionName: string,
  serviceName: string
): Buffer {
  const kDate = crypto.createHmac('sha256', `AWS4${key}`).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
  return kSigning;
}

/**
 * GET /api/voice-survey/stt/websocket
 * Generate a pre-signed WebSocket URL for AWS Transcribe Streaming
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language') || 'en-US';
  const sampleRate = parseInt(searchParams.get('sampleRate') || '16000', 10);

  // Validate language
  const languageCode = SUPPORTED_LANGUAGES[language];
  if (!languageCode) {
    return NextResponse.json(
      {
        success: false,
        error: `Unsupported language: ${language}. Supported: ${Object.keys(SUPPORTED_LANGUAGES).join(', ')}`,
      },
      { status: 400 }
    );
  }

  // Check for AWS credentials
  const accessKeyId = process.env.AWS_LOCAL_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_LOCAL_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'us-east-1';

  if (!accessKeyId || !secretAccessKey) {
    return NextResponse.json(
      {
        success: false,
        error: 'AWS credentials not configured',
        useBrowserSTT: true,
      },
      { status: 503 }
    );
  }

  try {
    const websocketUrl = createPresignedUrl(
      region,
      accessKeyId,
      secretAccessKey,
      languageCode,
      sampleRate,
      'pcm'
    );

    return NextResponse.json({
      success: true,
      websocketUrl,
      languageCode,
      sampleRate,
      mediaEncoding: 'pcm',
      expiresIn: 300, // seconds
    });
  } catch (error) {
    console.error('Error generating WebSocket URL:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate WebSocket URL',
        useBrowserSTT: true,
      },
      { status: 500 }
    );
  }
}
