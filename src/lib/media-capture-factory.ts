/**
 * Cross-Platform Media Capture Factory
 *
 * Creates a MediaCaptureSession that works reliably across platforms including iOS.
 * This implementation addresses common issues with audio capture on mobile devices:
 * - iOS AudioContext suspension
 * - Proper getUserMedia constraint handling
 * - Volume monitoring for visualization
 * - Clean resource management
 *
 * Outputs raw PCM Int16 audio suitable for streaming STT services like AWS Transcribe.
 */

import type {
  MediaCaptureFactory,
  MediaCaptureSession,
} from '@/packages/survey-form-package/src/renderer/layouts/VoiceLayout/types';

/**
 * Configuration for the media capture factory
 */
interface MediaCaptureFactoryConfig {
  /** Default sample rate (default: 16000 for AWS Transcribe) */
  sampleRate?: number;
  /** Chunk size in samples (default: 4096) */
  chunkSize?: number;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Convert Float32Array to Int16Array (PCM 16-bit)
 * AWS Transcribe expects signed 16-bit PCM
 */
function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    // Clamp to [-1, 1] and convert to 16-bit
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output.buffer;
}

/**
 * Downsample audio from source sample rate to target sample rate
 */
function downsample(
  buffer: Float32Array,
  sourceSampleRate: number,
  targetSampleRate: number
): Float32Array {
  if (sourceSampleRate === targetSampleRate) {
    return buffer;
  }

  const sampleRateRatio = sourceSampleRate / targetSampleRate;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Float32Array(newLength);

  let offsetResult = 0;
  let offsetBuffer = 0;

  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0;
    let count = 0;

    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }

    result[offsetResult] = accum / count;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }

  return result;
}

/**
 * Calculate volume level from audio data (0-1)
 */
function calculateVolume(dataArray: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i] * dataArray[i];
  }
  const rms = Math.sqrt(sum / dataArray.length);
  // Normalize to 0-1 range with some amplification
  return Math.min(1, rms * 5);
}

/**
 * Create a cross-platform media capture factory
 *
 * This factory creates MediaCaptureSession instances that work reliably on:
 * - Desktop browsers (Chrome, Firefox, Safari, Edge)
 * - Android browsers
 * - iOS Safari (handles AudioContext suspension and getUserMedia quirks)
 *
 * @example
 * ```typescript
 * const mediaCaptureFactory = createMediaCaptureFactory({ sampleRate: 16000 });
 *
 * // Use in VoiceLayout customData
 * <SurveyForm
 *   layout="voice"
 *   customData={{
 *     mediaCaptureFactory,
 *     sttSessionFactory,
 *   }}
 * />
 * ```
 */
export function createMediaCaptureFactory(
  factoryConfig: MediaCaptureFactoryConfig = {}
): MediaCaptureFactory {
  const {
    sampleRate: defaultSampleRate = 16000,
    chunkSize = 4096,
    debug = false,
  } = factoryConfig;

  const log = debug ? console.log.bind(console, '[MediaCapture]') : () => {};

  return (onAudioChunk, config, onError) => {
    const targetSampleRate = config?.sampleRate ?? defaultSampleRate;
    const echoCancellation = config?.echoCancellation ?? true;
    const noiseSuppression = config?.noiseSuppression ?? true;
    const autoGainControl = config?.autoGainControl ?? true;

    // State
    let isCapturing = false;
    let volume = 0;
    let audioContext: AudioContext | null = null;
    let mediaStream: MediaStream | null = null;
    let sourceNode: MediaStreamAudioSourceNode | null = null;
    let analyserNode: AnalyserNode | null = null;
    let processorNode: ScriptProcessorNode | null = null;
    let volumeInterval: number | null = null;

    const session: MediaCaptureSession = {
      get isCapturing() {
        return isCapturing;
      },
      get volume() {
        return volume;
      },

      async start() {
        if (isCapturing) {
          log('Already capturing, ignoring start()');
          return;
        }

        log('Starting media capture...');

        try {
          // Request microphone access with iOS-compatible constraints
          // iOS Safari has issues with some constraints, so we use a minimal set
          const constraints: MediaStreamConstraints = {
            audio: {
              // Core constraints that work across platforms
              echoCancellation,
              noiseSuppression,
              autoGainControl,
              // Mono audio for STT
              channelCount: 1,
            },
            video: false,
          };

          log('Requesting getUserMedia with constraints:', constraints);

          try {
            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          } catch (initialError) {
            // If the initial request fails (e.g., on some iOS versions),
            // try with minimal constraints
            log('Initial getUserMedia failed, trying minimal constraints:', initialError);
            mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
          }

          log('Got media stream:', mediaStream.getAudioTracks().map(t => ({
            label: t.label,
            settings: t.getSettings(),
          })));

          // Create AudioContext - iOS requires this to be created after a user gesture
          // The gesture should have already happened (e.g., clicking start button)
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioContextClass) {
            throw new Error('Web Audio API not supported');
          }

          audioContext = new AudioContextClass();
          log('Created AudioContext with sample rate:', audioContext.sampleRate);

          // iOS Safari may start AudioContext in suspended state
          // We need to resume it after user gesture
          if (audioContext.state === 'suspended') {
            log('AudioContext is suspended, attempting to resume...');
            await audioContext.resume();
            log('AudioContext resumed, state:', audioContext.state);
          }

          // Create source from microphone stream
          sourceNode = audioContext.createMediaStreamSource(mediaStream);

          // Create analyser for volume monitoring
          analyserNode = audioContext.createAnalyser();
          analyserNode.fftSize = 256;
          sourceNode.connect(analyserNode);

          // Create ScriptProcessorNode for audio processing
          // Note: ScriptProcessorNode is deprecated but has better cross-platform support
          // AudioWorklet is more modern but requires separate worklet file setup
          processorNode = audioContext.createScriptProcessor(chunkSize, 1, 1);

          processorNode.onaudioprocess = (event) => {
            if (!isCapturing) return;

            const inputData = event.inputBuffer.getChannelData(0);
            const sourceSampleRate = audioContext!.sampleRate;

            // Downsample if needed
            const processedData = sourceSampleRate !== targetSampleRate
              ? downsample(inputData, sourceSampleRate, targetSampleRate)
              : new Float32Array(inputData);

            // Convert to 16-bit PCM
            const pcmData = floatTo16BitPCM(processedData);

            // Send to callback
            onAudioChunk(pcmData);
          };

          // Connect nodes
          sourceNode.connect(processorNode);
          // ScriptProcessorNode must be connected to destination to work
          processorNode.connect(audioContext.destination);

          // Start volume monitoring
          const analyserDataArray = new Float32Array(analyserNode.fftSize);
          volumeInterval = window.setInterval(() => {
            if (analyserNode && isCapturing) {
              analyserNode.getFloatTimeDomainData(analyserDataArray);
              volume = calculateVolume(analyserDataArray);
            }
          }, 100);

          isCapturing = true;
          log('Media capture started successfully');

        } catch (error) {
          log('Error starting media capture:', error);
          const errorMessage = error instanceof Error ? error.message : 'Failed to start audio capture';

          // Provide user-friendly error messages
          let friendlyError = errorMessage;
          if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
            friendlyError = 'Microphone access denied. Please allow microphone access and try again.';
          } else if (errorMessage.includes('NotFoundError') || errorMessage.includes('DevicesNotFoundError')) {
            friendlyError = 'No microphone found. Please connect a microphone and try again.';
          } else if (errorMessage.includes('NotReadableError') || errorMessage.includes('TrackStartError')) {
            friendlyError = 'Microphone is in use by another application. Please close other apps and try again.';
          }

          onError?.(friendlyError);
          throw error;
        }
      },

      stop() {
        log('Stopping media capture...');

        isCapturing = false;
        volume = 0;

        // Stop volume monitoring
        if (volumeInterval !== null) {
          clearInterval(volumeInterval);
          volumeInterval = null;
        }

        // Disconnect and clean up processor
        if (processorNode) {
          processorNode.disconnect();
          processorNode.onaudioprocess = null;
          processorNode = null;
        }

        // Disconnect source
        if (sourceNode) {
          sourceNode.disconnect();
          sourceNode = null;
        }

        // Clean up analyser
        if (analyserNode) {
          analyserNode.disconnect();
          analyserNode = null;
        }

        // Close audio context
        if (audioContext && audioContext.state !== 'closed') {
          audioContext.close().catch((err) => {
            log('Error closing AudioContext:', err);
          });
          audioContext = null;
        }

        // Stop all tracks in the media stream
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => {
            track.stop();
            log('Stopped track:', track.label);
          });
          mediaStream = null;
        }

        log('Media capture stopped');
      },
    };

    return session;
  };
}

export type { MediaCaptureFactoryConfig };
