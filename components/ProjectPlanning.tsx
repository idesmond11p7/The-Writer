'use client';

import React, { useState, useMemo } from 'react';
import { 
  SchemeOfWork, 
  PlanMilestone, 
  ChapterDraft 
} from '@/types/domain';
import { generateTimestamp, generateId } from '@/lib/utils';
import { 
  Compass, 
  Plus, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Users, 
  Clock, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Upload,
  X,
  GitFork
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
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(schemesOfWork[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'milestones' | 'graph' | 'discrepancies' | 'characters'>('milestones');
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importTitle, setImportTitle] = useState<string>('');
  const [importScope, setImportScope] = useState<string>('');
  const [importProvenance, setImportProvenance] = useState<string>('Legacy Outline (Pre-App Archive)');
  const [importOverview, setImportOverview] = useState<string>('');
  const [importEventsRaw, setImportEventsRaw] = useState<string>('');

  const activeScheme = useMemo(() => {
    return schemesOfWork.find((s) => s.id === selectedSchemeId) || schemesOfWork[0] || null;
  }, [schemesOfWork, selectedSchemeId]);

  const handleImportPlanSubmit = () => {
    if (!importTitle.trim()) {
      alert('Please provide a title for the imported plan.');
      return;
    }

    const newId = generateId('sow_imported');
    const now = generateTimestamp();
    const eventLines = importEventsRaw.split('\n').map((l) => l.trim()).filter(Boolean);

    const newScheme: SchemeOfWork = {
      id: newId,
      title: importTitle,
      scope: importScope || 'Imported Arc Plan',
      originalSource: importProvenance || 'External Plan Document',
      overview: importOverview || 'Imported planning document preserving original structure and provenance.',
      charactersInvolved: ['Issei Hyoudou', 'Raynare', 'Rias Gremory'],
      milestones: [
        {
          id: generateId('m_imp'),
          title: 'Imported Intended Milestones',
          targetChapterNumber: 1,
          intendedEvents: eventLines.length > 0 ? eventLines : ['Initial imported event sequence'],
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

  // Create new Scheme of Work
  const handleCreateScheme = () => {
    const newId = generateId('sow_user');
    const now = generateTimestamp();
    const newScheme: SchemeOfWork = {
      id: newId,
      title: 'New Scheme of Work / Act Outline',
      scope: 'Arc or Act Scope Definition',
      originalSource: 'Imported from Author Outline / Workstream Notes',
      overview: 'Summary of the thematic trajectory, intended narrative arcs, and critical milestones.',
      charactersInvolved: ['Issei Hyoudou', 'Raynare'],
      milestones: [
        {
          id: generateId('m'),
          title: 'Opening Inciting Breach',
          targetChapterNumber: 1,
          intendedEvents: ['Initial anomalous disturbance', 'Encounter at the perimeter'],
          characterBeats: ['Sensory disorientation', 'Reluctance to accept reality shift'],
          thematicGoals: ['Mundane vulnerability before the supernatural'],
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

  // Add milestone
  const handleAddMilestone = () => {
    if (!activeScheme) return;
    const newMilestone: PlanMilestone = {
      id: generateId('m'),
      title: 'New Planned Milestone',
      targetChapterNumber: activeScheme.milestones.length + 1,
      intendedEvents: ['Event A', 'Event B'],
      characterBeats: ['Character shift'],
      thematicGoals: ['Thematic resonance'],
      status: 'planned',
    };
    const updated = {
      ...activeScheme,
      milestones: [...activeScheme.milestones, newMilestone],
      updatedAt: generateTimestamp(),
    };
    onUpdateScheme(updated);
  };

  // Add Discrepancy
  const handleAddDiscrepancy = (chapterId: string, desc: string, action: string) => {
    if (!activeScheme) return;
    const newDisc = {
      chapterId,
      description: desc,
      actionRequired: action,
      resolved: false,
    };
    const updated = {
      ...activeScheme,
      discrepancies: [...activeScheme.discrepancies, newDisc],
      updatedAt: generateTimestamp(),
    };
    onUpdateScheme(updated);
  };

  // Toggle Discrepancy Resolution
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
    <div className="flex h-full w-full overflow-hidden">
      {/* Plans Sidebar */}
      <div className="w-80 border-r border-stone-800 bg-stone-950 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Schemes of Work</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200 transition-colors"
              title="Import Existing Plan Document"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={handleCreateScheme}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200 transition-colors"
              title="Create Scheme of Work"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {schemesOfWork.map((s) => {
            const isSelected = s.id === activeScheme?.id;
            const openDiscs = s.discrepancies.filter((d) => !d.resolved).length;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedSchemeId(s.id)}
                className={`p-3 rounded border text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-stone-900 border-stone-700 text-stone-100'
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-medium text-stone-200 truncate">{s.title}</div>
                <div className="text-[11px] font-mono text-amber-500/90 mt-0.5 truncate">{s.scope}</div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-stone-500">
                  <span>{s.milestones.length} milestones</span>
                  {openDiscs > 0 && (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {openDiscs} deviations
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Pane */}
      {activeScheme ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-stone-950">
          {/* Header */}
          <div className="p-4 border-b border-stone-800 bg-stone-900/40 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <input
                type="text"
                value={activeScheme.title}
                onChange={(e) =>
                  onUpdateScheme({ ...activeScheme, title: e.target.value, updatedAt: Date.now() })
                }
                className="bg-transparent border-b border-transparent hover:border-stone-700 focus:border-amber-500 text-base font-serif font-medium text-stone-100 focus:outline-none"
              />
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span className="text-amber-500">{activeScheme.scope}</span>
                <span>•</span>
                <span className="text-stone-500">Source: {activeScheme.originalSource}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddMilestone}
                className="px-3 py-1.5 text-xs font-mono bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 rounded flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Milestone
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-stone-800 bg-stone-900/30 px-4 text-xs font-mono">
            <button
              onClick={() => setActiveTab('milestones')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'milestones'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>Intended Milestones ({activeScheme.milestones.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('graph')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'graph'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Planning Graph & Flow</span>
            </button>
            <button
              onClick={() => setActiveTab('discrepancies')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'discrepancies'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Plan vs Chapter Deviations ({activeScheme.discrepancies.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'characters'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Dramatis Personae</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 max-w-4xl space-y-6">
            {activeTab === 'graph' && (
              <div className="space-y-6">
                <div className="p-4 bg-stone-900/40 border border-stone-800 rounded text-xs text-stone-400">
                  <span className="font-mono text-amber-400 font-semibold block mb-0.5">
                    Scheme-of-Work Flow & Milestone Topology
                  </span>
                  Visualizes intended narrative milestones in chronological order, connecting planned arc beats to actual drafted chapter workspace records.
                </div>

                <div className="border border-stone-800 rounded-lg bg-stone-950 p-6 overflow-x-auto">
                  <div className="text-xs font-mono text-stone-400 mb-4 flex items-center justify-between">
                    <span>Milestone Dependency Graph ({activeScheme.milestones.length} Nodes)</span>
                    <span className="text-[11px] text-stone-500">Chronological Flow & Chapter Links</span>
                  </div>

                  <div className="min-w-[620px] space-y-4 py-2">
                    {activeScheme.milestones.map((m, idx) => {
                      const linkedChapter = chapters.find((c) => String(c.chapterNumber) === String(m.targetChapterNumber));
                      return (
                        <div key={m.id} className="relative flex items-stretch gap-4">
                          {/* Node Step Column */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-stone-900 border-2 border-amber-500/80 flex items-center justify-center text-xs font-mono font-bold text-amber-400 z-10 shadow-sm">
                              0{idx + 1}
                            </div>
                            {idx < activeScheme.milestones.length - 1 && (
                              <div className="w-0.5 flex-1 bg-stone-800 my-1" />
                            )}
                          </div>

                          {/* Node Card */}
                          <div className="flex-1 p-4 border border-stone-800 bg-stone-900/30 rounded-lg space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-serif font-semibold text-stone-100">
                                {m.title}
                              </span>
                              <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-stone-400">Target: Ch. {m.targetChapterNumber}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                  m.status === 'completed'
                                    ? 'border-emerald-800 bg-emerald-950/40 text-emerald-400'
                                    : m.status === 'drafted'
                                    ? 'border-blue-800 bg-blue-950/40 text-blue-400'
                                    : m.status === 'diverged'
                                    ? 'border-amber-800 bg-amber-950/40 text-amber-400'
                                    : 'border-stone-700 bg-stone-800 text-stone-300'
                                }`}>
                                  {m.status}
                                </span>
                              </div>
                            </div>

                            <div className="text-xs text-stone-300 font-mono space-y-1">
                              <span className="text-stone-500 block text-[10px] uppercase">Intended Events:</span>
                              <ul className="space-y-0.5 pl-3">
                                {m.intendedEvents.map((ev, i) => (
                                  <li key={i} className="list-disc text-stone-300">{ev}</li>
                                ))}
                              </ul>
                            </div>

                            {linkedChapter ? (
                              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
                                <span className="text-emerald-400 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Drafted in Workspace: {linkedChapter.title}</span>
                                </span>
                                <button
                                  onClick={() => onNavigateToChapter(linkedChapter.id)}
                                  className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
                                >
                                  <span>Open Chapter</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="pt-2 border-t border-stone-800/80 text-xs font-mono text-stone-500">
                                <span>Status: Planned / Awaiting Draft Allocation</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'milestones' && (
              <div className="space-y-4">
                <div className="p-3 bg-stone-900/40 border border-stone-800 rounded text-xs text-stone-400">
                  <span className="font-mono text-amber-400 font-semibold block mb-0.5">
                    Plan Preservation Principle
                  </span>
                  Planning materials represent deliberate narrative architecture. If generated chapter prose diverges from an established milestone, the discrepancy is logged for coordinator audit—the plan is never silently overwritten.
                </div>

                {activeScheme.milestones.map((m, idx) => {
                  const linkedChapter = chapters.find((c) => String(c.chapterNumber) === String(m.targetChapterNumber));
                  return (
                    <div
                      key={m.id}
                      className="p-5 border border-stone-800 rounded bg-stone-900/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-500">
                            Milestone 0{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-stone-500">
                            (Target: Ch. {m.targetChapterNumber})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                            m.status === 'completed'
                              ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-400'
                              : m.status === 'drafted'
                              ? 'border-blue-800/80 bg-blue-950/40 text-blue-400'
                              : m.status === 'diverged'
                              ? 'border-amber-800/80 bg-amber-950/40 text-amber-400'
                              : 'border-stone-700 bg-stone-800 text-stone-400'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-stone-200">
                        {m.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-1">
                        <div className="p-3 bg-stone-950 border border-stone-800 rounded">
                          <span className="text-stone-400 block font-semibold mb-1">Intended Story Events</span>
                          <ul className="space-y-1 text-stone-300">
                            {m.intendedEvents.map((evt, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-amber-500">•</span>
                                <span>{evt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-stone-950 border border-stone-800 rounded">
                          <span className="text-stone-400 block font-semibold mb-1">Character Beats & Thematic Intent</span>
                          <ul className="space-y-1 text-stone-300">
                            {m.characterBeats.map((beat, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-stone-500">•</span>
                                <span>{beat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Linked Chapter Shortcut */}
                      {linkedChapter && (
                        <div className="pt-2 flex items-center justify-between border-t border-stone-800/80 text-xs">
                          <span className="text-stone-400 font-mono text-[11px]">
                            Associated Chapter in Workspace: <span className="text-stone-200 font-medium">{linkedChapter.title}</span>
                          </span>
                          <button
                            onClick={() => onNavigateToChapter(linkedChapter.id)}
                            className="text-amber-400 hover:text-amber-300 text-xs font-mono flex items-center gap-1"
                          >
                            <span>Open Chapter Draft</span>
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
                  <div className="text-xs text-stone-400">
                    Audit of deviations between intended planning objectives and actual drafted prose.
                  </div>
                  <button
                    onClick={() => {
                      const desc = prompt('Describe the discrepancy between plan and chapter:');
                      if (desc) {
                        const act = prompt('Recommended action / review resolution:') || 'Coordinator review required';
                        handleAddDiscrepancy(chapters[0]?.id || 'chap_unknown', desc, act);
                      }
                    }}
                    className="px-2.5 py-1 text-xs font-mono bg-stone-800 hover:bg-stone-700 text-stone-200 rounded flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Log Discrepancy
                  </button>
                </div>

                {activeScheme.discrepancies.length === 0 ? (
                  <div className="p-6 border border-stone-800 rounded bg-stone-900/20 text-center text-xs text-stone-500 font-mono">
                    No discrepancies currently recorded. Planned milestones align with drafted developments.
                  </div>
                ) : (
                  activeScheme.discrepancies.map((d, idx) => (
                    <div
                      key={idx}
                      className={`p-4 border rounded space-y-2 transition-colors ${
                        d.resolved
                          ? 'border-stone-800/60 bg-stone-950/50 opacity-60'
                          : 'border-amber-900/60 bg-amber-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-3.5 h-3.5 ${d.resolved ? 'text-stone-500' : 'text-amber-500'}`} />
                          <span className="text-xs font-mono font-semibold text-stone-300">
                            Discrepancy #{idx + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleDiscrepancy(idx)}
                          className={`text-xs font-mono px-2 py-0.5 rounded border ${
                            d.resolved
                              ? 'border-stone-700 text-stone-400 hover:text-stone-200'
                              : 'border-amber-700 bg-amber-900/40 text-amber-300'
                          }`}
                        >
                          {d.resolved ? 'Resolved' : 'Mark Resolved'}
                        </button>
                      </div>

                      <p className="text-xs text-stone-200 font-medium leading-relaxed">
                        {d.description}
                      </p>

                      <div className="text-[11px] font-mono text-stone-400 bg-stone-900/80 p-2 rounded border border-stone-800">
                        <span className="text-amber-500 font-semibold">Action Required:</span> {d.actionRequired}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'characters' && (
              <div className="space-y-4">
                <div className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-3">
                  <h4 className="text-xs font-mono uppercase text-stone-300 font-semibold">
                    Characters Participating in this Arc
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeScheme.charactersInvolved.map((char, i) => (
                      <span key={i} className="px-3 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200 font-mono">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {/* Import Plan Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 rounded-lg max-w-lg w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-200">
                <Upload className="w-4 h-4 text-amber-500" />
                <span className="font-semibold">Import Existing Plan Document</span>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono overflow-y-auto max-h-[75vh]">
              <div className="p-3 bg-stone-900/40 border border-stone-800 rounded text-stone-400 text-[11px] font-sans">
                Import schemes of work, arc outlines, or chapter plans that predate this application. Provenance and original content are strictly preserved without forcing structural alterations.
              </div>

              <div>
                <label className="text-stone-300 block mb-1 uppercase text-[10px]">Plan / Arc Title *</label>
                <input
                  type="text"
                  value={importTitle}
                  onChange={(e) => setImportTitle(e.target.value)}
                  placeholder="E.g., Act I: The Grigori Incursion"
                  className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 uppercase text-[10px]">Scope / Coverage</label>
                  <input
                    type="text"
                    value={importScope}
                    onChange={(e) => setImportScope(e.target.value)}
                    placeholder="Chapters 1 to 5"
                    className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 uppercase text-[10px]">Source Provenance</label>
                  <input
                    type="text"
                    value={importProvenance}
                    onChange={(e) => setImportProvenance(e.target.value)}
                    placeholder="Legacy Outline Archive"
                    className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-300 block mb-1 uppercase text-[10px]">Plan Overview / Synopsis</label>
                <textarea
                  rows={3}
                  value={importOverview}
                  onChange={(e) => setImportOverview(e.target.value)}
                  placeholder="Summary of overarching narrative direction..."
                  className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-stone-300 block mb-1 uppercase text-[10px]">Intended Events (One per line)</label>
                <textarea
                  rows={4}
                  value={importEventsRaw}
                  onChange={(e) => setImportEventsRaw(e.target.value)}
                  placeholder="Event 1: Issei observes water lag at the canal&#10;Event 2: Atmospheric barrier prevents cell reception&#10;Event 3: First sighting of human-form Raynare"
                  className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 border-t border-stone-800 bg-stone-900/40 flex justify-end gap-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-3 py-1.5 rounded border border-stone-800 hover:bg-stone-800 text-stone-400 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleImportPlanSubmit}
                className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono"
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
