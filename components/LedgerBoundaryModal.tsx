'use client';

import React, { useRef, useState } from 'react';
import { WorkspaceState } from '@/types/domain';
import { exportWorkspaceToJson } from '@/lib/storage';
import { importLedgerChapterSnapshot } from '@/lib/ledgerChapterImport';
import {
  Database,
  BookOpen,
  Download,
  Upload,
  ShieldCheck,
  AlertTriangle,
  X,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface LedgerBoundaryModalProps {
  state: WorkspaceState;
  isOpen: boolean;
  onClose: () => void;
  onStateImported: (newState: WorkspaceState) => void;
  onResetToSeed: () => void;
  apiStatus?: {
    configured: boolean;
    status: string;
    defaultModelId: string;
    fallbackModelId: string;
  } | null;
}

export default function LedgerBoundaryModal({
  state,
  isOpen,
  onClose,
  onStateImported,
  onResetToSeed,
  apiStatus,
}: LedgerBoundaryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content) as WorkspaceState;
        if (!parsed.chapters || !parsed.techniquePacks) {
          setStatusMessage({
            type: 'error',
            text: 'Invalid workspace backup format: missing chapters or techniquePacks array.',
          });
          return;
        }
        onStateImported(parsed);
        setStatusMessage({
          type: 'success',
          text: 'Workspace restored from backup JSON.',
        });
      } catch {
        setStatusMessage({
          type: 'error',
          text: 'Failed to parse backup JSON file.',
        });
      }
    };
    reader.readAsText(file);
  };

  const authoritativeCount = state.chapters.filter((c) => c.provenance === 'ledger_authoritative').length;
  const workingCount = state.chapters.length - authoritativeCount;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-stone-950 border border-stone-800 rounded-xl max-w-xl w-full flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-200">
            <Database className="w-4 h-4 text-amber-500" />
            <span className="font-semibold">Ledger Architecture, AI Readiness & Workspace Data</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs font-mono max-h-[80vh] overflow-y-auto">
          {statusMessage && (
            <div
              className={`p-3 rounded border flex items-center justify-between text-xs ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
                  : statusMessage.type === 'error'
                  ? 'bg-red-950/30 border-red-800/80 text-red-300'
                  : 'bg-amber-950/30 border-amber-800/80 text-amber-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{statusMessage.text}</span>
              </div>
              <button
                onClick={() => setStatusMessage(null)}
                className="text-stone-400 hover:text-stone-200 ml-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Architectural Separation Card */}
          <div className="p-4 bg-stone-900/40 border border-stone-800 rounded-lg space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Architectural Boundary: The Ledger vs. The Writer</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-[10px]">
                {authoritativeCount} Canon / {workingCount} Working
              </span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
              <strong>The Ledger</strong> (`idesmond11p7/The-Ledger`) is the authoritative source of canonical chapter texts, research, and provenance hashes. <strong>The Writer</strong> is the active analytical and drafting workstation for working forks, Technique Packs, causal graphs, and investigation threads. Authoritative Ledger records are protected against accidental overwrite; fork a working draft to revise prose.
            </p>
            <div className="pt-2 text-[10px] text-stone-400 border-t border-stone-800/80 flex items-center justify-between">
              <span>Bundled Snapshot: 8 Canonical Chapters (`7720d50` .. `f9fb939`)</span>
              <span className="text-stone-500">Isolates Working Revisions</span>
            </div>
          </div>

          {/* Server-Side AI Configuration Status */}
          {apiStatus && (
            <div className="p-4 bg-stone-900/40 border border-stone-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-200 font-semibold text-xs">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Server-Side Gemini Orchestration</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] border ${
                    apiStatus.configured
                      ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                      : 'bg-red-950/50 border-red-800 text-red-300'
                  }`}
                >
                  {apiStatus.configured ? 'GEMINI_API_KEY Ready' : 'Missing Key'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-400 pt-1">
                <div>
                  Primary Default: <span className="text-stone-200">{apiStatus.defaultModelId}</span>
                </div>
                <div>
                  Transient Fallback: <span className="text-stone-200">{apiStatus.fallbackModelId}</span>
                </div>
              </div>
              <p className="text-[10px] text-stone-500 font-sans">
                All local analytical tools (contextual search, relationship graphs, deterministic causal extraction, and rubric diagnostics) operate with zero external latency even without an external model call.
              </p>
            </div>
          )}

          {/* Backup & Restore */}
          <div className="space-y-2.5">
            <div className="text-stone-400 uppercase text-[11px] font-semibold">
              Workspace Persistence & Portability
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  exportWorkspaceToJson(state);
                  setStatusMessage({
                    type: 'info',
                    text: 'Exported workspace JSON snapshot to downloads.',
                  });
                }}
                className="p-3 border border-stone-800 hover:border-stone-700 bg-stone-900/50 hover:bg-stone-900 rounded-lg flex flex-col items-center justify-center gap-1.5 text-stone-200 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold">Export Workspace JSON</span>
                <span className="text-[10px] text-stone-500">Drafts, packs, graphs & pins</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 border border-stone-800 hover:border-stone-700 bg-stone-900/50 hover:bg-stone-900 rounded-lg flex flex-col items-center justify-center gap-1.5 text-stone-200 transition-colors"
              >
                <Upload className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold">Restore from JSON</span>
                <span className="text-[10px] text-stone-500">Import saved workspace file</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>

          {/* Canonical Ledger Snapshot Sync */}
          <div className="p-4 border border-emerald-950/80 bg-emerald-950/10 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Re-Verify Canonical Ledger Snapshot (Chapters 1–8)</span>
            </div>
            <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
              Ensures all eight canonical chapter records from the bundled Ledger snapshot are present with exact git blob hashes and source paths without overwriting any forked working drafts.
            </p>
            <button
              onClick={() => {
                const nextState = importLedgerChapterSnapshot(state);
                const added = nextState.chapters.length - state.chapters.length;
                onStateImported(nextState);
                setStatusMessage({
                  type: 'success',
                  text:
                    added > 0
                      ? `Synchronized ${added} canonical Ledger chapter record(s).`
                      : 'All 8 canonical Ledger chapters are already synchronized and intact.',
                });
              }}
              className="mt-1 px-3 py-1.5 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-800 text-emerald-100 rounded text-xs transition-colors"
            >
              Verify 8 Ledger Chapters
            </button>
          </div>

          {/* Reset Workspace */}
          <div className="p-4 border border-red-950/80 bg-red-950/15 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>Reset Workspace to Canonical Baseline</span>
            </div>
            <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
              Restores the workspace to the clean canonical baseline (8 Ledger chapters, 4 operational Technique Packs, canonical causal analyses, and starter investigation threads).
            </p>
            {!confirmingReset ? (
              <button
                onClick={() => setConfirmingReset(true)}
                className="mt-1 px-3 py-1.5 bg-red-900/40 hover:bg-red-800/60 border border-red-800 text-red-200 rounded text-xs transition-colors"
              >
                Reset to Canonical Baseline...
              </button>
            ) : (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onResetToSeed();
                    setConfirmingReset(false);
                    setStatusMessage({
                      type: 'info',
                      text: 'Workspace reset to canonical baseline.',
                    });
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded text-xs transition-colors"
                >
                  Confirm Reset Now
                </button>
                <button
                  onClick={() => setConfirmingReset(false)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-mono"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
