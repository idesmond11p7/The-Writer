'use client';

import React, { useState, useMemo } from 'react';
import { SchemeOfWork, PlanMilestone, ChapterDraft } from '@/types/domain';
import { generateTimestamp, generateId } from '@/lib/utils';
import {
  Compass,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Users,
  ArrowRight,
  ShieldAlert,
  Upload,
  X,
  GitFork,
} from 'lucide-react';

interface ProjectPlanningProps {
  schemesOfWork: SchemeOfWork[];
  chapters: ChapterDraft[];
  onUpdateScheme: (scheme: SchemeOfWork) => void;
  onCreateScheme: (scheme: SchemeOfWork) => void;
  onNavigateToChapter: (chapterId: string) => void;
}

export default function ProjectPlanning({
  schemesOfWork,
  chapters,
  onUpdateScheme,
  onCreateScheme,
  onNavigateToChapter,
}: ProjectPlanningProps) {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(
    schemesOfWork[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<
    'graph' | 'milestones' | 'discrepancies' | 'characters'
  >('graph');
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importTitle, setImportTitle] = useState<string>('');
  const [importScope, setImportScope] = useState<string>('');
  const [importProvenance, setImportProvenance] = useState<string>(
    'Author Arc Architecture'
  );
  const [importOverview, setImportOverview] = useState<string>('');
  const [importEventsRaw, setImportEventsRaw] = useState<string>('');

  // Inline Discrepancy Form State (replaces window.prompt)
  const [isNewDiscOpen, setIsNewDiscOpen] = useState<boolean>(false);
  const [newDiscChapterId, setNewDiscChapterId] = useState<string>(
    chapters[7]?.id || chapters[0]?.id || ''
  );
  const [newDiscDesc, setNewDiscDesc] = useState<string>('');
  const [newDiscAction, setNewDiscAction] = useState<string>('');

  const activeScheme = useMemo(() => {
    return (
      schemesOfWork.find((s) => s.id === selectedSchemeId) ||
      schemesOfWork[0] ||
      null
    );
  }, [schemesOfWork, selectedSchemeId]);

  const handleImportPlanSubmit = () => {
    if (!importTitle.trim()) return;
    const newId = generateId('sow_imported');
    const now = generateTimestamp();
    const eventLines = importEventsRaw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const newScheme: SchemeOfWork = {
      id: newId,
      title: importTitle.trim(),
      scope: importScope || 'Imported Arc Plan',
      originalSource: importProvenance || 'External Plan Document',
      overview:
        importOverview ||
        'Imported planning document preserving original structure and provenance.',
      charactersInvolved: [
        'Ira Lowe (Jonah Laurence)',
        'Violet-Eyed Student Council Figure',
      ],
      milestones: [
        {
          id: generateId('m_imp'),
          title: 'Imported Intended Milestones',
          targetChapterNumber: chapters.length + 1,
          intendedEvents:
            eventLines.length > 0
              ? eventLines
              : ['Initial imported event sequence'],
          characterBeats: ['Preserve character intention from source plan'],
          thematicGoals: ['Preserve original thematic scope'],
          status: 'planned',
        },
      ],
      discrepancies: [],
      createdAt: now,
      updatedAt: now,
    };

    onCreateScheme(newScheme);
    setSelectedSchemeId(newId);
    setIsImportModalOpen(false);
    setImportTitle('');
    setImportScope('');
    setImportOverview('');
    setImportEventsRaw('');
  };

  const handleCreateScheme = () => {
    const newId = generateId('sow_user');
    const now = generateTimestamp();
    const newScheme: SchemeOfWork = {
      id: newId,
      title: 'Act II: The Minami-Kuoh Dossier Investigation (Ch. 9+)',
      scope: 'Chapters 9 to 14 — Post-Exam Investigation Arc',
      originalSource: 'Writer Studio Forward Planning',
      overview:
        'Following the discovery of the Kanagawa Prefectural Educational Development Association address in Chapter 8, Ira verifies the directory listing at the municipal library and travels to the Minami-Kuoh annex while awaiting Friday’s registered-post examination results from Kuoh Academy.',
      charactersInvolved: [
        'Ira Lowe (Jonah Laurence)',
        'Violet-Eyed Student Council Figure (Kuoh)',
        'Minami-Kuoh Annex Personnel',
      ],
      milestones: [
        {
          id: generateId('m'),
          title: 'M9: Public Library Directory Verification & Route Planning',
          targetChapterNumber: 9,
          intendedEvents: [
            'Ira visits the local library to check the telephone directory for the Kanagawa Prefectural Educational Development Association',
            'Maps the bus/train route to the Minami-Kuoh administrative annex',
          ],
          characterBeats: [
            'Disciplined adherence to empirical verification rather than conversational guessing',
          ],
          thematicGoals: [
            'Investigate the machinery that constructed the life of "Ira Lowe"',
          ],
          status: 'planned',
        },
      ],
      discrepancies: [],
      createdAt: now,
      updatedAt: now,
    };
    onCreateScheme(newScheme);
    setSelectedSchemeId(newId);
  };

  const handleAddMilestone = () => {
    if (!activeScheme) return;
    const prevMilestone =
      activeScheme.milestones[activeScheme.milestones.length - 1];
    const newMilestone: PlanMilestone = {
      id: generateId('m'),
      title: `M${activeScheme.milestones.length + 1}: New Planned Milestone`,
      targetChapterNumber: activeScheme.milestones.length + 1,
      intendedEvents: [
        'Primary narrative action beat',
        'Secondary investigative discovery',
      ],
      characterBeats: ['Epistemic or psychological shift'],
      thematicGoals: ['Core thematic development'],
      status: 'planned',
      dependsOnMilestoneIds: prevMilestone ? [prevMilestone.id] : [],
    };
    onUpdateScheme({
      ...activeScheme,
      milestones: [...activeScheme.milestones, newMilestone],
      updatedAt: generateTimestamp(),
    });
  };

  const handleAddDiscrepancySubmit = () => {
    if (!activeScheme || !newDiscDesc.trim()) return;
    const newDisc = {
      chapterId: newDiscChapterId,
      description: newDiscDesc.trim(),
      actionRequired:
        newDiscAction.trim() ||
        'Preserve canonical Ledger text and document divergence in plan.',
      resolved: false,
    };
    onUpdateScheme({
      ...activeScheme,
      discrepancies: [...activeScheme.discrepancies, newDisc],
      updatedAt: generateTimestamp(),
    });
    setNewDiscDesc('');
    setNewDiscAction('');
    setIsNewDiscOpen(false);
  };

  const handleToggleDiscrepancy = (idx: number) => {
    if (!activeScheme) return;
    const updatedDiscs = [...activeScheme.discrepancies];
    updatedDiscs[idx].resolved = !updatedDiscs[idx].resolved;
    onUpdateScheme({
      ...activeScheme,
      discrepancies: updatedDiscs,
      updatedAt: generateTimestamp(),
    });
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#09090b]">
      {/* Left Sidebar: Schemes of Work */}
      <div className="w-80 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800/80 flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Schemes of Work</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              title="Import Plan Document"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={handleCreateScheme}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              title="Create Act II Scheme of Work"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {schemesOfWork.map((s) => {
            const isSelected = s.id === activeScheme?.id;
            const openDiscs = s.discrepancies.filter((d) => !d.resolved).length;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedSchemeId(s.id)}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-stone-900 border-amber-500/70 text-stone-100'
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-semibold text-stone-100 truncate">
                  {s.title}
                </div>
                <div className="text-[11px] font-mono text-amber-400 mt-0.5 truncate">
                  {s.scope}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>{s.milestones.length} milestones</span>
                  {openDiscs > 0 && (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {openDiscs} notes
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {activeScheme ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="p-5 border-b border-stone-800/80 bg-[#0c0c0e] flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1 flex-1 min-w-[280px]">
              <input
                type="text"
                value={activeScheme.title}
                onChange={(e) =>
                  onUpdateScheme({
                    ...activeScheme,
                    title: e.target.value,
                    updatedAt: Date.now(),
                  })
                }
                className="bg-transparent border-b border-transparent hover:border-stone-700 focus:border-amber-500 text-lg font-serif font-medium text-stone-100 focus:outline-none w-full max-w-xl"
              />
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span className="text-amber-400">{activeScheme.scope}</span>
                <span>•</span>
                <span>Source: {activeScheme.originalSource}</span>
              </div>
            </div>

            <button
              onClick={handleAddMilestone}
              className="px-3 py-1.5 text-xs font-mono bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Milestone Node
            </button>
          </div>

          <div className="flex items-center border-b border-stone-800/80 bg-stone-950 px-6 text-xs font-mono">
            {[
              {
                id: 'graph',
                label: `Scheme-of-Work Dependency Graph (${activeScheme.milestones.length})`,
              },
              {
                id: 'milestones',
                label: `Detailed Milestones & Chapter Links`,
              },
              {
                id: 'discrepancies',
                label: `Plan vs. Ledger Discrepancies (${activeScheme.discrepancies.length})`,
              },
              {
                id: 'characters',
                label: `Dramatis Personae (${activeScheme.charactersInvolved.length})`,
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`py-3 px-3.5 border-b-2 transition-colors ${
                  activeTab === t.id
                    ? 'border-amber-500 text-amber-400 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 max-w-5xl space-y-6">
            {activeTab === 'graph' && (
              <div className="space-y-6">
                <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] text-xs text-stone-300 leading-relaxed">
                  <span className="text-[11px] font-mono uppercase text-amber-400 font-semibold block mb-1">
                    Arc Overview & Structural Topology
                  </span>
                  {activeScheme.overview}
                </div>

                {/* Interactive SVG Arc Topology */}
                <div className="p-5 border border-stone-800 rounded-xl bg-[#0c0c0e] overflow-x-auto">
                  <div className="text-xs font-mono text-stone-400 mb-3 flex items-center justify-between">
                    <span>
                      Interactive Scheme-of-Work Graph (Click any node to open its Chapter)
                    </span>
                    <span className="text-emerald-400">
                      {
                        activeScheme.milestones.filter(
                          (m) => m.status === 'completed'
                        ).length
                      }{' '}
                      / {activeScheme.milestones.length} Milestones Realized in Canon
                    </span>
                  </div>

                  <div className="min-w-[740px] py-2">
                    {(() => {
                      const ms = activeScheme.milestones;
                      const cols = 4;
                      const nodeW = 195;
                      const nodeH = 86;
                      const gapX = 36;
                      const gapY = 44;
                      const rows = Math.ceil(ms.length / cols);
                      const svgW = cols * (nodeW + gapX) + 20;
                      const svgH = Math.max(rows * (nodeH + gapY) + 20, 140);

                      const coords = ms.map((m, i) => {
                        const row = Math.floor(i / cols);
                        const col = i % cols;
                        return {
                          id: m.id,
                          x: 16 + col * (nodeW + gapX),
                          y: 16 + row * (nodeH + gapY),
                        };
                      });

                      return (
                        <svg
                          viewBox={`0 0 ${svgW} ${svgH}`}
                          className="w-full h-auto"
                        >
                          <defs>
                            <marker
                              id="plan-arrow"
                              viewBox="0 0 10 10"
                              refX="7"
                              refY="5"
                              markerWidth="6"
                              markerHeight="6"
                              orient="auto-start-reverse"
                            >
                              <path
                                d="M 0 1.5 L 8 5 L 0 8.5 z"
                                fill="#f59e0b"
                              />
                            </marker>
                          </defs>

                          {ms.map((m, idx) => {
                            if (idx === 0) return null;
                            const prev = coords[idx - 1];
                            const curr = coords[idx];
                            if (!prev || !curr) return null;
                            const sameRow = prev.y === curr.y;
                            const d = sameRow
                              ? `M ${prev.x + nodeW} ${prev.y + nodeH / 2} L ${curr.x} ${curr.y + nodeH / 2}`
                              : `M ${prev.x + nodeW / 2} ${prev.y + nodeH} C ${prev.x + nodeW / 2} ${prev.y + nodeH + 22}, ${curr.x + nodeW / 2} ${curr.y - 22}, ${curr.x + nodeW / 2} ${curr.y}`;

                            return (
                              <path
                                key={`edge_${m.id}`}
                                d={d}
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth={1.6}
                                strokeDasharray="5 3"
                                markerEnd="url(#plan-arrow)"
                              />
                            );
                          })}

                          {ms.map((m, idx) => {
                            const c = coords[idx];
                            const linkedChap = chapters.find(
                              (ch) =>
                                String(ch.chapterNumber) ===
                                String(m.targetChapterNumber)
                            );
                            return (
                              <g
                                key={m.id}
                                transform={`translate(${c.x}, ${c.y})`}
                                onClick={() => {
                                  if (linkedChap)
                                    onNavigateToChapter(linkedChap.id);
                                }}
                                className="cursor-pointer"
                              >
                                <rect
                                  width={nodeW}
                                  height={nodeH}
                                  rx={8}
                                  fill="#141418"
                                  stroke={
                                    m.status === 'completed'
                                      ? '#10b981'
                                      : '#f59e0b'
                                  }
                                  strokeWidth={1.5}
                                />
                                <text
                                  x={10}
                                  y={20}
                                  fill="#f59e0b"
                                  fontSize={9.5}
                                  fontFamily="monospace"
                                  fontWeight="bold"
                                >
                                  Ch. {m.targetChapterNumber}
                                </text>
                                <text
                                  x={nodeW - 10}
                                  y={20}
                                  textAnchor="end"
                                  fill={
                                    m.status === 'completed'
                                      ? '#10b981'
                                      : '#a8a29e'
                                  }
                                  fontSize={9}
                                  fontFamily="monospace"
                                >
                                  {m.status.toUpperCase()}
                                </text>
                                <text
                                  x={10}
                                  y={41}
                                  fill="#f5f5f4"
                                  fontSize={10.5}
                                  fontWeight="600"
                                >
                                  {m.title.length > 25
                                    ? m.title.slice(0, 23) + '...'
                                    : m.title}
                                </text>
                                <text
                                  x={10}
                                  y={60}
                                  fill="#a8a29e"
                                  fontSize={9}
                                >
                                  {(m.intendedEvents[0] || '').slice(0, 28)}...
                                </text>
                                <text
                                  x={10}
                                  y={76}
                                  fill="#38bdf8"
                                  fontSize={8.5}
                                  fontFamily="monospace"
                                >
                                  {linkedChap
                                    ? '→ Open Ledger Chapter'
                                    : 'Awaiting Draft'}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'milestones' && (
              <div className="space-y-4">
                {activeScheme.milestones.map((m, idx) => {
                  const linkedChapter = chapters.find(
                    (c) =>
                      String(c.chapterNumber) === String(m.targetChapterNumber)
                  );
                  return (
                    <div
                      key={m.id}
                      className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-400 font-bold">
                          Milestone 0{idx + 1} (Target: Ch.{' '}
                          {m.targetChapterNumber})
                        </span>
                        <select
                          value={m.status}
                          onChange={(e) => {
                            const nextMs = [...activeScheme.milestones];
                            nextMs[idx] = {
                              ...m,
                              status: e.target.value as PlanMilestone['status'],
                            };
                            onUpdateScheme({
                              ...activeScheme,
                              milestones: nextMs,
                              updatedAt: Date.now(),
                            });
                          }}
                          className="bg-stone-900 border border-stone-700 rounded px-2 py-0.5 text-stone-200 uppercase text-[10px]"
                        >
                          <option value="planned">Planned</option>
                          <option value="drafted">Drafted</option>
                          <option value="diverged">Diverged</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <h4 className="text-sm font-serif font-semibold text-stone-100">
                        {m.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1">
                          <span className="text-stone-400 uppercase text-[10px] block">
                            Intended Events:
                          </span>
                          <ul className="space-y-1 text-stone-300 pl-3 list-disc">
                            {m.intendedEvents.map((ev, i) => (
                              <li key={i}>{ev}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1">
                          <span className="text-stone-400 uppercase text-[10px] block">
                            Character & Thematic Beats:
                          </span>
                          <ul className="space-y-1 text-stone-300 pl-3 list-disc">
                            {m.characterBeats.map((cb, i) => (
                              <li key={i}>{cb}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {linkedChapter && (
                        <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                              Linked Chapter: {linkedChapter.title} (
                              {linkedChapter.provenance})
                            </span>
                          </span>
                          <button
                            onClick={() =>
                              onNavigateToChapter(linkedChapter.id)
                            }
                            className="text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <span>Open in Workspace</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'discrepancies' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone-400">
                    Records divergences or title/timeline notes between planning documents and canonical Ledger chapters without overwriting either source.
                  </p>
                  <button
                    onClick={() => setIsNewDiscOpen(!isNewDiscOpen)}
                    className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-200 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" /> Log Discrepancy
                  </button>
                </div>

                {isNewDiscOpen && (
                  <div className="p-4 border border-stone-700 rounded-xl bg-stone-900/60 space-y-3 text-xs font-mono">
                    <select
                      value={newDiscChapterId}
                      onChange={(e) => setNewDiscChapterId(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                    >
                      {chapters.map((c) => (
                        <option key={c.id} value={c.id}>
                          Ch. {c.chapterNumber}: {c.title}
                        </option>
                      ))}
                    </select>
                    <textarea
                      rows={2}
                      value={newDiscDesc}
                      onChange={(e) => setNewDiscDesc(e.target.value)}
                      placeholder="Describe the discrepancy or divergence..."
                      className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                    />
                    <input
                      type="text"
                      value={newDiscAction}
                      onChange={(e) => setNewDiscAction(e.target.value)}
                      placeholder="Recommended resolution or note..."
                      className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsNewDiscOpen(false)}
                        className="px-3 py-1 text-stone-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddDiscrepancySubmit}
                        className="px-3 py-1 bg-amber-500 text-stone-950 font-semibold rounded"
                      >
                        Save Discrepancy
                      </button>
                    </div>
                  </div>
                )}

                {activeScheme.discrepancies.map((d, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border rounded-xl space-y-2 ${
                      d.resolved
                        ? 'border-stone-800 bg-stone-950/60 opacity-75'
                        : 'border-amber-800/70 bg-amber-950/15'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-semibold">
                        Discrepancy Record #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleToggleDiscrepancy(idx)}
                        className="px-2 py-0.5 rounded border border-stone-700 text-stone-300"
                      >
                        {d.resolved ? 'Resolved' : 'Mark Resolved'}
                      </button>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {d.description}
                    </p>
                    <div className="p-2.5 bg-stone-950 border border-stone-800 rounded text-[11px] font-mono text-stone-400">
                      <span className="text-amber-400 font-semibold">
                        Action / Protocol:
                      </span>{' '}
                      {d.actionRequired}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'characters' && (
              <div className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3">
                <h4 className="text-xs font-mono uppercase text-stone-300 font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>Characters & Figures Participating in this Arc</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeScheme.charactersInvolved.map((char, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 font-mono"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl max-w-lg w-full p-6 space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-stone-100 font-semibold">
                Import Plan / Scheme of Work
              </span>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={importTitle}
              onChange={(e) => setImportTitle(e.target.value)}
              placeholder="Plan / Arc Title *"
              className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={importScope}
                onChange={(e) => setImportScope(e.target.value)}
                placeholder="Scope (e.g. Chapters 9-12)"
                className="bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
              />
              <input
                type="text"
                value={importProvenance}
                onChange={(e) => setImportProvenance(e.target.value)}
                placeholder="Source Provenance"
                className="bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
              />
            </div>
            <textarea
              rows={3}
              value={importOverview}
              onChange={(e) => setImportOverview(e.target.value)}
              placeholder="Arc Overview..."
              className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
            />
            <textarea
              rows={4}
              value={importEventsRaw}
              onChange={(e) => setImportEventsRaw(e.target.value)}
              placeholder="Intended Milestones / Events (one per line)..."
              className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-3 py-1.5 border border-stone-800 rounded text-stone-400"
              >
                Cancel
              </button>
              <button
                onClick={handleImportPlanSubmit}
                className="px-4 py-1.5 bg-amber-500 text-stone-950 font-semibold rounded"
              >
                Import Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
