'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  Sparkles,
  Sun,
  Eye,
  Compass,
  Check,
  Copy,
  Send,
  Layers,
  MapPin,
  Clock,
  CheckCircle2,
  AlertOctagon,
  User,
} from 'lucide-react';
import {
  CHAPTER_5_METADATA,
  CHAPTER_5_FULL_TEXT,
  CHAPTER_5_SECTIONS,
} from '@/lib/chapter5Text';
import ScribbleHubCopyModal from './ScribbleHubCopyModal';

const TECHNIQUE_MODULES = [
  {
    id: 'experiential_narration',
    name: 'Experiential Narration (No Meta-Commentary)',
    packId: 'prose_philosophy_experiential_narration',
    accent: 'text-emerald-300 border-emerald-500/30 bg-emerald-950/20',
    summary:
      'Every realization is rendered strictly inside physical and sensory friction—cold tile, salt drying on skin, hair snagging on shoulders. All meme slang, genre labels, external thesis declarations, and anaphora crying lists are purged.',
  },
  {
    id: 'wraytracing',
    name: 'W-Raytracing Optical Clock',
    packId: 'technique_pack_wraytracing',
    accent: 'text-amber-300 border-amber-500/30 bg-amber-950/20',
    summary:
      'Directional light marks time across the entire chapter: pre-dawn grey along the blind edge -> direct afternoon sun turning frosted bathroom glass golden -> windshield glare and silver hairline scratches in train glass -> late-afternoon gold-white flare off Soma Academy windows.',
  },
  {
    id: 'embodied_duration',
    name: 'Embodied Metacognitive Duration',
    packId: 'technique_embodied_metacognitive_duration',
    accent: 'text-sky-300 border-sky-500/30 bg-sky-950/20',
    summary:
      'Grief regulation happens through concrete bodily time: breath tightening against ribs, shower steam misting white tile, wet black-and-teal hair dragging along shoulder blades, and flattening the stiff creased transit map.',
  },
  {
    id: 'material_realism_2005',
    name: 'Camera Eye & 2005 Material Realism',
    packId: 'technique_pack_camera_eye',
    accent: 'text-purple-300 border-purple-500/30 bg-purple-950/20',
    summary:
      'Strictly grounded in 2005 tactile artifacts: worn black leather wallet, banknotes and coins, dead silver Panasonic flip phone, magnetic paper train ticket, scratched clerk acrylic, and folded paper map.',
  },
];

const GUARDRAIL_CHECKS = [
  {
    label: 'Soma Geography Lock (Zero Kuoh)',
    detail: 'All institutional and transit references updated to Soma, Soma Station, and Soma Academy.',
  },
  {
    label: 'Body Schema vs. Body Image (GAISCB1)',
    detail: '5\u20196\u201d frame, lower center of gravity, and natural kanji reading grounded as somatic familiarity—no trained-system or combat tropes.',
  },
  {
    label: 'Restrained Mirror Ego & Clinical Confirmation',
    detail: 'Masculine-ego annoyance at looking non-threatening replaces modern meme slang; anatomy confirmed concisely without farce.',
  },
  {
    label: 'Purged Meta-Commentary & Anaphora',
    detail: 'Removed explanatory thesis lines, anaphora crying lists, and city proportion jokes while retaining warm neighborhood energy.',
  },
  {
    label: 'Strict Simile Ceiling (\u2264 1 per 500 words)',
    detail: 'Prefers direct physical verbs, light behavior, and acoustic observation over decorative similes.',
  },
  {
    label: 'Continuity Seams (Ch. 4 \u2192 Ch. 5 \u2192 Ch. 6)',
    detail: 'Opens at the bathroom sink mirror from Ch. 4 and hands off cleanly to the 6:30 AM exam morning in Ch. 6 (Applicant No. 1044).',
  },
];

const CONTINUITY_TIMELINE = [
  {
    beat: 'Beat 1 \u00b7 Pre-Dawn Sink & Closet Mirror',
    light: 'Thin, cold pre-dawn grey along blind gap & wet tile',
    artifacts: 'Cream walls, scratched floorboards, Japanese notebooks, oversized grey shirt',
    shift: 'Picks up seamlessly from Chapter 4\u2019s final line; tests voice, recognizes natural Japanese script reading, collapses under grief for home & Daniel.',
  },
  {
    beat: 'Beat 2 \u00b7 Midday Sun & Frosted Gold Shower',
    light: 'Direct afternoon sunbars with floating dust; frosted glass turned golden',
    artifacts: 'Porcelain sink, chrome mixer tap, white towels, dark trousers & sweater',
    shift: 'Registers lighter 5\u20196\u201d balance and low hunger urgency; confirms male anatomy quietly; down-regulates inside warm shower steam.',
  },
  {
    beat: 'Beat 3 \u00b7 Desk Evidence & Departure Drive',
    light: 'Sunbeam straight across desktop plaster dust',
    artifacts: 'Worn black leather wallet, Ira Lowe ID (16), dead silver Panasonic flip phone, Soma Academy notice (#1044), creased paper map',
    shift: 'Refuses to sit trapped inside empty apartment walls with grief waiting; locks onto exam rules and steps out into Soma.',
  },
  {
    beat: 'Beat 4 \u00b7 Vending Machine & Neighborhood Help',
    light: 'Sharp white glare bouncing off windshields and sidewalk concrete',
    artifacts: 'Red beverage vending machine, folded paper transit map, bakery/pharmacy landmarks',
    shift: 'Gets turned around completely backward until the woman in the yellow cardigan with two grocery bags points him toward the station.',
  },
  {
    beat: 'Beat 5 \u00b7 Local Clerk & Tunnel Reflection',
    light: 'Fluorescent concourse glare, scratched ticket acrylic, dark tunnel mirror',
    artifacts: 'Thousand-yen bill, blue-stamped magnetic paper ticket, cold brushed-steel carriage pole',
    shift: 'Clerk looks twice at his face and soft chest voice; tunnel turns glass into a mirror, hardening resolve (\u201cNot today\u201d).',
  },
  {
    beat: 'Beat 6 \u00b7 Soma Station & Soma Academy Gates',
    light: 'Deep awning shadow vs. blazing afternoon sun; golden-white pane flare',
    artifacts: 'Briefcase bump, cyclist\u2019s green-awned bakery directions, cold canned peach tea, twin stone gateposts',
    shift: 'Navigates bicycle directions past vibrant afternoon Soma streets; hears campus bell ring; folds map cleanly for tomorrow\u2019s Ch. 6 exam.',
  },
];

export default function Chapter5Studio() {
  const [activeTab, setActiveTab] = useState<'manuscript' | 'audit' | 'continuity'>('manuscript');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isScribbleHubModalOpen, setIsScribbleHubModalOpen] = useState<boolean>(false);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#09090b] text-stone-200">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        {/* Master Header Card */}
        <div className="border border-emerald-500/30 bg-gradient-to-br from-[#0c1614] via-[#0d1115] to-[#0a0a0f] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-emerald-400">
              <Sun className="w-4 h-4" />
              <span>Chapter 5 · Soma Revision Execution Studio</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>2005 Soma Canon Locked</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>GAISCB1 Guardrails Active</span>
              </span>
              <button
                onClick={() => setIsScribbleHubModalOpen(true)}
                className="px-3.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Copy for Scribble Hub</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-tight">
              Chapter 5 — A Second Morning (Soma Revision)
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              Revised manuscript for early-spring 2005 Soma, executing Experiential Narration, W-Raytracing optical time progression, Embodied Metacognitive Duration, and psychological realism between Chapter 4&apos;s mirror shock and Chapter 6&apos;s exam morning.
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80 font-mono text-xs">
            <button
              onClick={() => setActiveTab('manuscript')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'manuscript'
                  ? 'bg-emerald-400 text-stone-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                Full Manuscript ({CHAPTER_5_METADATA.wordCount.toLocaleString()} words · Soma Canon)
              </span>
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Technique Packs &amp; Craft Audit</span>
            </button>
            <button
              onClick={() => setActiveTab('continuity')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'continuity'
                  ? 'bg-sky-500 text-stone-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Optical Clock &amp; 2005 Continuity</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FULL MANUSCRIPT */}
        {activeTab === 'manuscript' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-amber-500/35 bg-gradient-to-br from-[#16130b] via-[#101014] to-[#0a0a0f] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Soma Revision Canon</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-stone-900 text-stone-300 border border-stone-800">
                      Author: {CHAPTER_5_METADATA.author}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif text-stone-100">
                      {CHAPTER_5_METADATA.title}
                    </h2>
                  </div>
                  <p className="text-xs text-stone-400 font-mono">
                    {CHAPTER_5_METADATA.wordCount.toLocaleString()} words · {CHAPTER_5_METADATA.readingTime} · {CHAPTER_5_METADATA.pov}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsScribbleHubModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono transition-colors flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Copy for Scribble Hub</span>
                  </button>
                  <button
                    onClick={() => handleCopy('ch5_full_text', CHAPTER_5_FULL_TEXT)}
                    className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {copiedId === 'ch5_full_text' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Full Text</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Full Chapter</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex items-center gap-2.5 text-xs font-mono text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Soma Directive Verified:</strong> Zero Kuoh references, zero meta-commentary, W-Raytracing light progression locked, and formatted cleanly for one-click Scribble Hub pasting (Rich Text HTML, BBCode, Clean Text, or Field-by-Field).
                </span>
              </div>

              {/* Jump Links */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-stone-500 text-[11px] uppercase mr-1">Jump to Scene:</span>
                {CHAPTER_5_SECTIONS.map((sec) => (
                  <a
                    key={sec.partNumber}
                    href={`#ch5-part-${sec.partNumber}`}
                    className="px-2.5 py-1 rounded bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[11px] transition-colors"
                  >
                    Part {sec.partNumber}: {sec.title.split(':')[1]?.trim() || `Scene ${sec.partNumber}`}
                  </a>
                ))}
              </div>
            </div>

            {/* Prose Container */}
            <div className="space-y-8 bg-[#0c0d11] p-6 sm:p-10 rounded-2xl border border-stone-800 font-serif text-base sm:text-[17px] leading-relaxed text-stone-200">
              {CHAPTER_5_SECTIONS.map((sec) => (
                <article
                  key={sec.partNumber}
                  id={`ch5-part-${sec.partNumber}`}
                  className="space-y-4 pt-6 first:pt-0 border-t first:border-t-0 border-stone-800/80"
                >
                  <div className="space-y-1 font-sans border-b border-stone-800/50 pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider">
                        {sec.title}
                      </span>
                      <span className="text-stone-500">
                        {sec.wordCount.toLocaleString()} words · {sec.eventAnchors}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">{sec.subtitle}</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {sec.text.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TECHNIQUE PACKS & CRAFT AUDIT */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECHNIQUE_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  className={`p-5 rounded-xl border space-y-2 ${mod.accent}`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold uppercase tracking-wide">{mod.name}</span>
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px]">
                      {mod.packId}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                    {mod.summary}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-stone-800 bg-[#0d0e13] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 border-b border-stone-800 pb-3">
                <AlertOctagon className="w-4 h-4" />
                <span>Guardrails &amp; Purged Slop Verification</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {GUARDRAIL_CHECKS.map((chk) => (
                  <div
                    key={chk.label}
                    className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{chk.label}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {chk.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OPTICAL CLOCK & 2005 CONTINUITY */}
        {activeTab === 'continuity' && (
          <div className="space-y-4">
            {CONTINUITY_TIMELINE.map((item) => (
              <div
                key={item.beat}
                className="p-5 rounded-xl border border-stone-800 bg-[#0d0e13] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                  <span className="text-sm font-mono font-bold text-emerald-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.beat}</span>
                  </span>
                  <span className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{item.light}</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800/80 space-y-1">
                    <span className="font-mono uppercase text-[10px] text-sky-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>2005 Materiality &amp; Props</span>
                    </span>
                    <p className="text-stone-300 font-sans leading-relaxed">{item.artifacts}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800/80 space-y-1">
                    <span className="font-mono uppercase text-[10px] text-purple-400">
                      Psychological &amp; Continuity Progression
                    </span>
                    <p className="text-stone-300 font-sans leading-relaxed">{item.shift}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scribble Hub Publishing & Formatting Modal */}
      <ScribbleHubCopyModal
        isOpen={isScribbleHubModalOpen}
        onClose={() => setIsScribbleHubModalOpen(false)}
        title={CHAPTER_5_METADATA.title}
        chapterNumber={5}
        content={CHAPTER_5_FULL_TEXT}
      />
    </div>
  );
}
