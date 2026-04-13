'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { registerBlock } from '@/packages/survey-form-package/src';
import { EnrollmentModule } from '@/lib/enrollment-wrapper';
import { EmrCustomBlocks, getSystemBlocks } from '../emr-demo/custom-blocks';
import {
  StandardBlocks,
  StandardNodes,
  SurveyBuilder,
} from '@/packages/survey-form-package/src/builder';
import { sampleIntake } from '../emr-demo/emr-intake';

// Dynamic import of SurveyForm (SSR disabled to avoid dagre dependency)
const SurveyForm = dynamic(
  () =>
    import('@/packages/survey-form-package/src/renderer/SurveyForm').then(
      (mod) => mod.SurveyForm,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    ),
  },
);

/**
 * Default sample survey with EMR custom blocks.
 * Used when no JSON is uploaded via the dev sheet.
 */
const emrDemoSurvey = sampleIntake;

function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <Alert className="max-w-lg bg-red-50 border-red-200">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">
          Failed to load treatment plan
        </AlertTitle>
        <AlertDescription className="text-red-700">{message}</AlertDescription>
      </Alert>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Retry
        </Button>
      )}
    </div>
  );
}

function EmrDemoContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || 'weight-loss-program';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<any>(null);
  const [currentSurvey, setCurrentSurvey] = useState<any>(emrDemoSurvey);
  const [blocksRegistered, setBlocksRegistered] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // JSON upload state
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Register EMR custom blocks on mount
  useEffect(() => {
    EmrCustomBlocks.forEach((block) => registerBlock(block));
    setBlocksRegistered(true);
  }, []);

  // Fetch treatment plan data from Laravel API via proxy
  const fetchPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/emr/treatment-json/${slug}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || `Failed to fetch treatment plan (${res.status})`,
        );
      }
      const data = await res.json();
      setPlanData(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to load treatment plan',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [slug]);

  // Create EnrollmentModule when plan data is available
  const enrollmentModule = useMemo(() => {
    if (!planData) return null;
    return new EnrollmentModule({
      providerType: 'emr',
      plan: planData.plan,
      merchant: planData.merchant,
      slug: planData.slug || slug,
    });
  }, [planData]);

  const handleSubmit = (data: Record<string, any>) => {
    console.log('[EMR Demo] Survey submitted:', data);
  };

  // JSON upload handlers
  const validateAndLoadJson = () => {
    try {
      setJsonError('');
      const parsedJson = JSON.parse(jsonInput);

      if (
        !parsedJson.rootNode ||
        !parsedJson.rootNode.type ||
        !parsedJson.rootNode.items
      ) {
        setJsonError(
          'Invalid survey format. Must contain rootNode with type and items.',
        );
        return;
      }

      setCurrentSurvey(parsedJson);
      setJsonInput('');
      setIsSheetOpen(false);
    } catch {
      setJsonError('Invalid JSON format. Please check your syntax.');
    }
  };

  const loadSampleJson = () => {
    setJsonInput(JSON.stringify(currentSurvey, null, 2));
    setJsonError('');
  };

  // Render guards
  if (loading) return <LoadingSpinner message="Loading treatment plan..." />;
  if (error) return <ErrorState message={error} onRetry={fetchPlan} />;
  if (!blocksRegistered || !enrollmentModule)
    return <LoadingSpinner message="Initializing..." />;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm max-w-md">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Enrollment Submitted!
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Your enrollment has been submitted successfully. Check the browser
            console for the full submission data.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen flex flex-col">
      <SurveyBuilder
        blockDefinitions={[...StandardBlocks, ...getSystemBlocks()]}
        nodeDefinitions={StandardNodes}
        initialData={currentSurvey}
        onDataChange={handleSubmit}
        customData={{ enrollmentModule }}
      />

      {/* Floating JSON upload button for dev/testing */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
            size="icon"
          >
            <Upload className="h-5 w-5 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto px-4">
          <SheetHeader>
            <SheetTitle>Load Survey Configuration</SheetTitle>
            <SheetDescription>
              Paste your survey JSON to load a different survey configuration.
              The EMR custom blocks (variant-selection, unifiedCheckout) are
              available.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="json-input">Survey JSON Configuration</Label>
              <Textarea
                id="json-input"
                placeholder="Paste your survey JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </div>

            {jsonError && (
              <Alert className="bg-red-50 text-red-800 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{jsonError}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-2">
              <Button onClick={validateAndLoadJson}>Load Survey</Button>
              <Button variant="outline" onClick={loadSampleJson}>
                Load Current Config
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setJsonInput('');
                  setJsonError('');
                }}
              >
                Clear
              </Button>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <strong>Slug:</strong> {slug}
              </p>
              <p>
                <strong>Plan:</strong> {planData?.plan?.name || 'N/A'}
              </p>
              <p>
                <strong>Merchant:</strong> {planData?.merchant?.name || 'N/A'}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function EmrDemoPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EmrDemoContent />
    </Suspense>
  );
}
