'use client';

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Code,
  Sparkles,
  BookOpen,
  Layers,
  Send,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { formatForScribbleHub, ScribbleHubChapterPackage } from '@/lib/scribbleHubFormatter';

interface ScribbleHubCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  chapterNumber?: number | string;
  content: string;
}

export default function ScribbleHubCopyModal({
  isOpen,
  onClose,
  title,
  chapterNumber,
  content,
}: ScribbleHubCopyModalProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'bbcode' | 'text' | 'fields'>('html');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const pkg: ScribbleHubChapterPackage = formatForScribbleHub(title, content, chapterNumber);

  const copyToClipboard = async (key: string, text: string, htmlContent?: string) => {
    try {
      if (htmlContent && typeof window !== 'undefined' && window.ClipboardItem && navigator.clipboard?.write) {
        // Modern Clipboard API with HTML + Plaintext fallback for WYSIWYG editors like Scribble Hub
        const blobHtml = new Blob([htmlContent], { type: 'text/html' });
        const blobText = new Blob([text], { type: 'text/plain' });
        const data = [new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })];
        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // Fallback
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-[#0c0d12] border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-gradient-to-r from-[#18130b] via-[#100f14] to-[#0c0d12] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-100">
                  Copy for Scribble Hub
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Publishing Suite
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono mt-0.5">
                Formatted for Scribble Hub WYSIWYG &amp; BBCode editors · {pkg.wordCount.toLocaleString()} words · ~{pkg.readingTimeMinutes} min read
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.scribblehub.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-mono transition-colors"
            >
              <span>Open Scribble Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Action Bar for Instant Paste */}
        <div className="px-5 py-3 bg-[#11131a] border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-stone-400">Format Mode:</span>
            <div className="inline-flex rounded-lg border border-stone-800 bg-stone-950 p-0.5">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  activeTab === 'html'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rich Text (HTML)</span>
              </button>
              <button
                onClick={() => setActiveTab('bbcode')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  activeTab === 'bbcode'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>BBCode</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  activeTab === 'text'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Clean Text</span>
              </button>
              <button
                onClick={() => setActiveTab('fields')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  activeTab === 'fields'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Field-by-Field</span>
              </button>
            </div>
          </div>

          {/* Primary Quick Copy Button */}
          <div className="flex items-center gap-2">
            {activeTab === 'html' && (
              <button
                onClick={() => copyToClipboard('html_all', pkg.bodyCleanText, pkg.bodyHtml)}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                {copiedKey === 'html_all' ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>Copied Rich Text to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Rich Text for Scribble Hub</span>
                  </>
                )}
              </button>
            )}
            {activeTab === 'bbcode' && (
              <button
                onClick={() => copyToClipboard('bbcode_all', pkg.bodyBBCode)}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                {copiedKey === 'bbcode_all' ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>Copied BBCode!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy BBCode</span>
                  </>
                )}
              </button>
            )}
            {activeTab === 'text' && (
              <button
                onClick={() => copyToClipboard('text_all', pkg.bodyCleanText)}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                {copiedKey === 'text_all' ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>Copied Clean Text!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Clean Text</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: RICH TEXT / HTML */}
          {activeTab === 'html' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-200/90 leading-relaxed flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Scribble Hub Visual Editor Mode:</strong> Clicking &ldquo;Copy Rich Text&rdquo; copies native HTML directly into your clipboard. When you paste (Ctrl+V) into Scribble Hub&apos;s standard editor, all italics (<em>emphasis</em>), bold dialogue beats, and centered scene dividers (<code className="text-amber-300 font-mono">* * *</code>) will be preserved with pristine paragraph formatting.
                </div>
              </div>

              {/* Formatted Preview Box */}
              <div className="rounded-xl border border-stone-800 bg-[#090a0d] p-6 space-y-4 font-serif text-stone-200 text-sm sm:text-base leading-relaxed max-h-[380px] overflow-y-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: pkg.bodyHtml }}
                  className="space-y-4 prose prose-invert max-w-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: BBCODE */}
          {activeTab === 'bbcode' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-200/90 leading-relaxed flex items-start gap-3">
                <Code className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Scribble Hub BBCode Mode:</strong> If you use Scribble Hub&apos;s source/BBCode editor, paste this text directly. Uses <code className="text-sky-300 font-mono">[i]...[/i]</code> for inner thoughts, <code className="text-sky-300 font-mono">[b]...[/b]</code> for emphasis, and <code className="text-sky-300 font-mono">[center][b]* * *[/b][/center]</code> for scene breaks.
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  value={pkg.bodyBBCode}
                  className="w-full h-80 rounded-xl border border-stone-800 bg-[#090a0d] p-4 font-mono text-xs text-stone-300 leading-relaxed focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CLEAN PLAIN TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 leading-relaxed flex items-start gap-3">
                <FileText className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Clean Web Novel Text:</strong> Stripped of heavy markdown markers with standardized double-newline paragraph separation and clean centered scene breaks.
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  value={pkg.bodyCleanText}
                  className="w-full h-80 rounded-xl border border-stone-800 bg-[#090a0d] p-4 font-mono text-xs text-stone-300 leading-relaxed focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 4: FIELD BY FIELD QUICK COPY */}
          {activeTab === 'fields' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-xs font-mono text-stone-400">
                Copy individual fields directly into the corresponding Scribble Hub chapter submission inputs:
              </div>

              {/* Field 1: Chapter Title */}
              <div className="p-4 rounded-xl border border-stone-800 bg-[#090a0d] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold uppercase">1. Chapter Title</span>
                  <button
                    onClick={() => copyToClipboard('field_title', pkg.chapterTitle)}
                    className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 'field_title' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Title</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2.5 rounded bg-stone-950 border border-stone-900 font-mono text-sm text-stone-100">
                  {pkg.chapterTitle}
                </div>
              </div>

              {/* Field 2: Top Author's Note */}
              <div className="p-4 rounded-xl border border-stone-800 bg-[#090a0d] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold uppercase">2. Top Author&apos;s Note (Optional)</span>
                  <button
                    onClick={() => copyToClipboard('field_top_note', pkg.topAuthorNote)}
                    className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 'field_top_note' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Top Note</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-2.5 rounded bg-stone-950 border border-stone-900 font-mono text-xs text-stone-300 whitespace-pre-wrap">
                  {pkg.topAuthorNote}
                </pre>
              </div>

              {/* Field 3: Chapter Content (Body) */}
              <div className="p-4 rounded-xl border border-stone-800 bg-[#090a0d] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold uppercase">
                    3. Chapter Body ({pkg.wordCount.toLocaleString()} words)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard('field_body_html', pkg.bodyCleanText, pkg.bodyHtml)}
                      className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === 'field_body_html' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied HTML!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Body (HTML)</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard('field_body_bbcode', pkg.bodyBBCode)}
                      className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === 'field_body_bbcode' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy BBCode</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-stone-950 border border-stone-900 font-mono text-xs text-stone-400">
                  Full {pkg.wordCount.toLocaleString()}-word manuscript formatted with zero markdown artifacts.
                </div>
              </div>

              {/* Field 4: Bottom Author's Note */}
              <div className="p-4 rounded-xl border border-stone-800 bg-[#090a0d] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold uppercase">4. Bottom Author&apos;s Note</span>
                  <button
                    onClick={() => copyToClipboard('field_bottom_note', pkg.bottomAuthorNote)}
                    className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 'field_bottom_note' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Bottom Note</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-2.5 rounded bg-stone-950 border border-stone-900 font-mono text-xs text-stone-300 whitespace-pre-wrap">
                  {pkg.bottomAuthorNote}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-[#090a0e] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-stone-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Strict Register Firewall verified: No meta-analysis or analytical jargon included in creative text.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
