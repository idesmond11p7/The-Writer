'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router uncaught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-rose-400" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-stone-100 mb-2">Workspace Encountered an Anomaly</h2>
      <p className="text-sm text-stone-400 max-w-md mb-6">
        {error.message || 'An unexpected state occurred while processing writing instructions or telemetry.'}
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold uppercase tracking-wider transition-colors border border-stone-700 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" /> Reset Workspace State
      </button>
    </div>
  );
}
