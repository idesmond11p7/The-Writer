import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-amber-400" />
      </div>
      <h1 className="text-3xl font-serif font-bold text-stone-100 mb-2">404 — Page Not Found</h1>
      <p className="text-sm text-stone-400 max-w-md mb-8">
        The requested chapter, artifact, or workspace view does not exist in this realm of Apocrypha DXD: ForeverWorlds.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        Return to Workspace
      </Link>
    </div>
  );
}
