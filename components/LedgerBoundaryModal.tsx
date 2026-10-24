'use client';

import React, { useRef } from 'react';
import { WorkspaceState } from '@/types/domain';
import { exportWorkspaceToJson, resetWorkspaceToSeed } from '@/lib/storage';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  X, 
  ExternalLink 
} from 'lucide-react';

interface LedgerBoundaryModalProps {
  state: WorkspaceState;
  isOpen: boolean;
  onClose: () => void;
  onStateImported: (newState: WorkspaceState) => void;
  onResetToSeed: () => void;
}

export default function LedgerBoundaryModal({
  state,
  isOpen,
  onClose,
  onStateImported,
  onResetToSeed,
}: LedgerBoundaryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          alert('Invalid workspace backup format.');
          return;
        }
        onStateImported(parsed);
        alert('Workspace restored successfully from backup.');
        onClose();
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-stone-950 border border-stone-800 rounded-lg max-w-xl w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-200">
            <Database className="w-4 h-4 text-amber-500" />
            <span className="font-semibold">Ledger Architecture & Data Management</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs font-mono">
          {/* Architectural Separation Card */}
          <div className="p-4 bg-stone-900/40 border border-stone-800 rounded space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Boundary: Ledger vs. Writer App</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
              The Ledger is a separate system intended as the authoritative library for canonical chapter texts, research, and source provenance. The Writer App maintains working drafts, Technique Packs, event graphs, and operational records.
            </p>
            <div className="pt-2 text-[10px] text-stone-500 border-t border-stone-800/80">
              Current Connection Mode: <span className="text-stone-300">Standalone (Unconnected — Operating via Version Identifiers)</span>
            </div>
          </div>

          {/* Backup & Restore */}
          <div className="space-y-3">
            <div className="text-stone-400 uppercase text-[11px] font-semibold">
              Workspace Persistence & Portability
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => exportWorkspaceToJson(state)}
                className="p-3 border border-stone-800 hover:border-stone-700 bg-stone-900/50 hover:bg-stone-900 rounded flex flex-col items-center justify-center gap-2 text-stone-200 transition-colors"
              >
                <Download className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-semibold">Export Workspace JSON</span>
                <span className="text-[10px] text-stone-500">Download all drafts, packs & logs</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 border border-stone-800 hover:border-stone-700 bg-stone-900/50 hover:bg-stone-900 rounded flex flex-col items-center justify-center gap-2 text-stone-200 transition-colors"
              >
                <Upload className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-semibold">Restore from JSON</span>
                <span className="text-[10px] text-stone-500">Import backup file</span>
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

          {/* Reset Workspace */}
          <div className="p-4 border border-red-950/80 bg-red-950/20 rounded space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>Reset Workspace to Seed Data</span>
            </div>
            <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
              Resets all chapters, Technique Packs, analyses, and execution logs to the verified canonical seed state for Apocrypha DXD: ForeverWorlds.
            </p>
            <button
              onClick={() => {
                if (confirm('Reset entire workspace to canonical seed data? Unsaved custom drafts will be replaced.')) {
                  onResetToSeed();
                  onClose();
                }
              }}
              className="mt-1 px-3 py-1.5 bg-red-900/40 hover:bg-red-800/60 border border-red-800 text-red-200 rounded text-xs"
            >
              Reset to Canonical Seed
            </button>
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
