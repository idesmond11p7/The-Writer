'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import {
  WorkspaceState,
  ChapterDraft,
  TechniquePack,
  SchemeOfWork,
  ChapterAnalysis,
  EvaluationRecord,
  AIExecutionLog,
  InvestigationQuestion,
  PinnedWorkingItem,
} from '@/types/domain';
import {
  getWorkspaceSnapshot,
  getServerWorkspaceSnapshot,
  subscribeWorkspace,
  updateWorkspaceState,
  setWorkspaceStateDirect,
  resetWorkspaceToSeed,
} from '@/lib/storage';
import {
  BookOpen,
  Layers,
  GitFork,
  Activity,
  Compass,
  Database,
  CheckSquare,
  Target,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  HardDrive,
  ArrowUpRight,
  Search,
  Pin,
  HelpCircle,
  X,
  Cpu,
  FlaskConical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import InvestigationHub from '@/components/InvestigationHub';
import WritingWorkspace from '@/components/WritingWorkspace';
import TechniquePackStudio from '@/components/TechniquePackStudio';
import ProjectPlanning from '@/components/ProjectPlanning';
import ChapterIntelligence from '@/components/ChapterIntelligence';
import EvaluationStudio from '@/components/EvaluationStudio';
import AIUsageMetrics from '@/components/AIUsageMetrics';
import LedgerBoundaryModal from '@/components/LedgerBoundaryModal';

type SectionId =
  | 'overview'
  | 'investigation'
  | 'writing'
  | 'techniques'
  | 'analysis'
  | 'planning'
  | 'evaluation'
  | 'usage';

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    label: 'Workstation Overview',
    icon: Compass,
    description: 'Active inquiries, canonical status & quick jumps',
  },
  {
    id: 'investigation',
    label: 'Investigation & Search',
    icon: Search,
    description: 'Contextual search, entity web, hypotheses & passage diff',
  },
  {
    id: 'writing',
    label: 'Chapter & Draft Studio',
    icon: BookOpen,
    description: 'Protected Ledger texts, working forks & passage workbench',
  },
  {
    id: 'techniques',
    label: 'Operational Techniques',
    icon: Layers,
    description: '5-question architecture, mechanism flows & live testing',
  },
  {
    id: 'analysis',
    label: 'Causal & Arc Diagrams',
    icon: GitFork,
    description: 'Typed causal vs. temporal edges & cross-chapter graphs',
  },
  {
    id: 'planning',
    label: 'Scheme of Work',
    icon: Target,
    description: 'Act I milestone dependency graph & canon reconciliation',
  },
  {
    id: 'evaluation',
    label: 'Evaluation Studio',
    icon: CheckSquare,
    description: 'Deterministic rubric checks & independent Gemini audits',
  },
  {
    id: 'usage',
    label: 'AI Telemetry & Cost',
    icon: Activity,
    description: 'Execution history, fallback logs & token cost ledger',
  },
];

export default function WriterAppShell() {
  const state = useSyncExternalStore(
    subscribeWorkspace,
    getWorkspaceSnapshot,
    getServerWorkspaceSnapshot
  );
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState<boolean>(false);
  const [isPinTrayExpanded, setIsPinTrayExpanded] = useState<boolean>(false);

  // Cross-module deep link state
  const [highlightedExcerpt, setHighlightedExcerpt] = useState<string | null>(null);
  const [workbenchPassagePayload, setWorkbenchPassagePayload] = useState<{
    passage: string;
    chapterId: string;
    packId?: string;
  } | null>(null);

  // Server-side API configuration readiness
  const [apiStatus, setApiStatus] = useState<{
    configured: boolean;
    status: string;
    defaultModelId: string;
    fallbackModelId: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/orchestrate')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setApiStatus({
            configured: Boolean(data.configured),
            status: data.status || 'unknown',
            defaultModelId: data.defaultModelId || 'gemini-3.8-flash',
            fallbackModelId: data.fallbackModelId || 'gemini-3.1-flash-lite',
          });
        }
      })
      .catch(() => {
        // Ignore network errors during initial status check
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Chapter Handlers
  const handleUpdateChapter = (updatedChapter: ChapterDraft) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      chapters: prev.chapters.map((c) => (c.id === updatedChapter.id ? updatedChapter : c)),
      activeChapterId: updatedChapter.id,
    }));
  };

  const handleCreateChapter = (newChapter: ChapterDraft) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      chapters: [newChapter, ...prev.chapters],
      activeChapterId: newChapter.id,
    }));
  };

  const handleDeleteChapter = (chapterId: string) => {
    updateWorkspaceState((prev) => {
      const remaining = prev.chapters.filter((c) => c.id !== chapterId);
      return {
        ...prev,
        chapters: remaining,
        activeChapterId: remaining[0]?.id || undefined,
      };
    });
  };

  // Technique Pack Handlers
  const handleUpdatePack = (updatedPack: TechniquePack) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      techniquePacks: prev.techniquePacks.map((p) => (p.id === updatedPack.id ? updatedPack : p)),
    }));
  };

  const handleCreatePack = (newPack: TechniquePack) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      techniquePacks: [newPack, ...prev.techniquePacks],
    }));
  };

  const handleDeletePack = (packId: string) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      techniquePacks: prev.techniquePacks.filter((p) => p.id !== packId),
    }));
  };

  // Scheme of Work Handlers
  const handleUpdateScheme = (updatedScheme: SchemeOfWork) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      schemesOfWork: prev.schemesOfWork.map((s) =>
        s.id === updatedScheme.id ? updatedScheme : s
      ),
    }));
  };

  const handleCreateScheme = (newScheme: SchemeOfWork) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      schemesOfWork: [newScheme, ...prev.schemesOfWork],
    }));
  };

  // Analysis Handler
  const handleSaveAnalysis = (newAnalysis: ChapterAnalysis) => {
    updateWorkspaceState((prev) => {
      const filtered = prev.analyses.filter((a) => a.chapterId !== newAnalysis.chapterId);
      return {
        ...prev,
        analyses: [newAnalysis, ...filtered],
      };
    });
  };

  // Evaluation Handler
  const handleSaveEvaluation = (newEval: EvaluationRecord) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      evaluations: [newEval, ...prev.evaluations],
    }));
  };

  // Execution Log Handler
  const handleLogExecution = (log: AIExecutionLog) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      executionLogs: [log, ...prev.executionLogs],
    }));
  };

  // Investigation & Pin Handlers
  const handleUpdateInvestigations = (investigations: InvestigationQuestion[]) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      investigations,
    }));
  };

  const handlePinItem = (item: PinnedWorkingItem) => {
    updateWorkspaceState((prev) => {
      const current = prev.pinnedItems || [];
      const exists = current.some(
        (p) => p.title === item.title && p.content === item.content
      );
      if (exists) return prev;
      return {
        ...prev,
        pinnedItems: [item, ...current],
      };
    });
  };

  const handleUnpinItem = (id: string) => {
    updateWorkspaceState((prev) => ({
      ...prev,
      pinnedItems: (prev.pinnedItems || []).filter((p) => p.id !== id),
    }));
  };

  // Cross-module navigation shortcuts
  const handleNavigateToChapter = (chapterId: string, excerpt?: string) => {
    updateWorkspaceState((prev) => ({ ...prev, activeChapterId: chapterId }));
    setHighlightedExcerpt(excerpt || null);
    setActiveSection('writing');
  };

  const handleNavigateToTechnique = (packId: string) => {
    setWorkbenchPassagePayload((prev) =>
      prev ? { ...prev, packId } : { passage: '', chapterId: state?.activeChapterId || '', packId }
    );
    setActiveSection('techniques');
  };

  const handleSendPassageToTechniqueWorkbench = (
    passage: string,
    chapterId: string,
    packId?: string
  ) => {
    setWorkbenchPassagePayload({ passage, chapterId, packId });
    setActiveSection('techniques');
  };

  const handleResetToSeed = () => {
    resetWorkspaceToSeed();
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#09090b] text-stone-400 font-mono text-xs">
        Loading Apocrypha DXD: ForeverWorlds Intellectual Workstation...
      </div>
    );
  }

  const activeChapter =
    state.chapters.find((c) => c.id === state.activeChapterId) || state.chapters[0];
  const pinnedItems = state.pinnedItems || [];
  const investigations = state.investigations || [];

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-stone-100 overflow-hidden font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col justify-between select-none">
        <div className="overflow-y-auto">
          {/* Brand & Studio Title */}
          <div className="p-5 border-b border-stone-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-amber-500 uppercase font-medium">
                <span>Ur-Verse</span>
                <span className="text-stone-700">/</span>
                <span>The Writer</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-800/50 text-amber-300">
                v2.0
              </span>
            </div>
            <h1 className="text-sm font-semibold text-stone-100 mt-1.5 tracking-tight font-serif">
              Apocrypha DXD: ForeverWorlds
            </h1>
            <p className="text-[11px] text-stone-400 mt-0.5 font-mono">
              Literary Reasoning & Technique Lab
            </p>
          </div>

          {/* Quick Chapter Selector */}
          {state.chapters.length > 0 && (
            <div className="px-4 py-3 border-b border-stone-800/50 bg-stone-900/20">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-400 mb-1.5 px-0.5">
                <span>Active Chapter Context</span>
                {activeChapter?.provenance === 'ledger_authoritative' ? (
                  <span className="text-emerald-400">Canon</span>
                ) : (
                  <span className="text-amber-400">Working Fork</span>
                )}
              </div>
              <select
                value={activeChapter?.id || ''}
                onChange={(e) => {
                  updateWorkspaceState((prev) => ({
                    ...prev,
                    activeChapterId: e.target.value,
                  }));
                }}
                className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:outline-none focus:border-amber-500/80 truncate"
              >
                {state.chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Ch. {c.chapterNumber}: {c.title}{' '}
                    {c.provenance === 'ledger_authoritative' ? '(Ledger)' : '(Fork)'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Navigation Modules */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-stone-400">
              Intellectual Workspaces
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              let countBadge: string | number | undefined;
              if (item.id === 'investigation') countBadge = investigations.length;
              if (item.id === 'writing') countBadge = state.chapters.length;
              if (item.id === 'techniques') countBadge = state.techniquePacks.length;
              if (item.id === 'analysis') countBadge = state.analyses.length;
              if (item.id === 'planning')
                countBadge = state.schemesOfWork[0]?.milestones.length || 0;
              if (item.id === 'evaluation') countBadge = state.evaluations.length;
              if (item.id === 'usage') countBadge = state.executionLogs.length;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-all text-xs font-medium group ${
                    isActive
                      ? 'bg-stone-800/90 text-stone-100 border border-stone-700/60 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive
                          ? 'text-amber-400'
                          : 'text-stone-400 group-hover:text-stone-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {countBadge !== undefined && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800/80 text-stone-400 tabular-nums">
                      {countBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Ledger Boundary Footer Widget */}
        <div className="p-3.5 m-3 border border-stone-800/80 rounded-lg bg-[#070708] space-y-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-stone-300 font-medium text-xs">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]">The Ledger Canon</span>
            </div>
            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className="text-[10px] font-mono text-amber-400 hover:text-amber-300 transition-colors underline"
            >
              Inspect
            </button>
          </div>
          <p className="text-[10px] leading-relaxed text-stone-400 font-mono">
            8 canonical chapters verified (`7720d50`–`f9fb939`). Working drafts fork cleanly without mutating canon.
          </p>
        </div>
      </aside>

      {/* Main Work Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#09090b]">
        {/* Top Header */}
        <header className="h-14 border-b border-stone-800/80 px-6 flex items-center justify-between bg-[#0c0c0e]/90 backdrop-blur flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 min-w-0">
            <span className="text-stone-500">The Writer</span>
            <span className="text-stone-700">/</span>
            <span className="text-stone-200 font-semibold truncate">
              {NAV_ITEMS.find((item) => item.id === activeSection)?.label}
            </span>
            {activeChapter && activeSection !== 'overview' && (
              <>
                <span className="text-stone-700">/</span>
                <button
                  onClick={() => setActiveSection('writing')}
                  className="text-amber-400 hover:text-amber-300 font-medium truncate max-w-xs font-serif flex items-center gap-1"
                  title="Jump to active chapter in Writing Studio"
                >
                  <span>
                    Ch. {activeChapter.chapterNumber}: {activeChapter.title}
                  </span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono flex-shrink-0">
            {/* Pinned Working Context Tray Toggle */}
            <button
              onClick={() => setIsPinTrayExpanded((prev) => !prev)}
              className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-colors flex items-center gap-1.5 ${
                isPinTrayExpanded || pinnedItems.length > 0
                  ? 'bg-amber-950/30 border-amber-800/70 text-amber-300 hover:bg-amber-900/40'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title="Toggle Active Working Context & Pinned Evidence Tray"
            >
              <Pin className="w-3 h-3" />
              <span>Working Context ({pinnedItems.length})</span>
              {isPinTrayExpanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>

            {/* AI Model Status Pill */}
            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 text-[11px] hover:border-stone-700 transition-colors"
              title="Inspect server-side Gemini API & model configuration"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  apiStatus?.configured ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span>{apiStatus?.defaultModelId || 'gemini-3.8-flash'}</span>
            </button>

            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className="px-3 py-1 rounded bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Ledger & Data</span>
            </button>
          </div>
        </header>

        {/* Collapsible Pinned Working Context Bar */}
        {isPinTrayExpanded && (
          <div className="border-b border-stone-800 bg-stone-950/95 px-6 py-3 flex-shrink-0 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Pin className="w-3.5 h-3.5" />
                <span>
                  Active Working Context Tray — Available Across Search, Technique Testing & AI Orchestration
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsPinTrayExpanded(false);
                    setActiveSection('investigation');
                  }}
                  className="text-stone-400 hover:text-amber-300 underline"
                >
                  Open Investigation Hub
                </button>
                <button
                  onClick={() => setIsPinTrayExpanded(false)}
                  className="text-stone-400 hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {pinnedItems.length === 0 ? (
              <div className="text-xs text-stone-500 font-mono py-2">
                No items pinned yet. Select any passage in the Chapter Studio or click &ldquo;Pin to Context&rdquo; in Investigation & Search to keep key evidence at hand.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 max-h-40 overflow-y-auto pr-1">
                {pinnedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded border border-stone-800 bg-stone-900/70 flex flex-col justify-between gap-1.5 text-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                        <span className="uppercase px-1.5 py-0.5 rounded bg-amber-950/50 border border-amber-800/60 text-amber-300">
                          {item.type}
                        </span>
                        <button
                          onClick={() => handleUnpinItem(item.id)}
                          className="text-stone-500 hover:text-red-400"
                          title="Unpin from working context"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="font-semibold text-stone-200 mt-1 truncate">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-stone-400 font-serif line-clamp-2 mt-0.5">
                        {item.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-stone-800/70 text-[10px] font-mono">
                      {item.chapterId ? (
                        <button
                          onClick={() =>
                            handleNavigateToChapter(item.chapterId!, item.content.slice(0, 120))
                          }
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                          <span>Inspect in Chapter</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </button>
                      ) : (
                        <span className="text-stone-500">Workspace Note</span>
                      )}
                      {item.type === 'passage' && item.chapterId && (
                        <button
                          onClick={() =>
                            handleSendPassageToTechniqueWorkbench(
                              item.content,
                              item.chapterId!
                            )
                          }
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                        >
                          <FlaskConical className="w-2.5 h-2.5" />
                          <span>Test Technique</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Section Viewport */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeSection === 'overview' && (
            <OverviewSection
              state={state}
              apiStatus={apiStatus}
              onNavigate={(id) => setActiveSection(id)}
              onOpenLedgerModal={() => setIsLedgerModalOpen(true)}
              onSelectChapter={(id, excerpt) => handleNavigateToChapter(id, excerpt)}
              onSelectTechnique={(packId) => handleNavigateToTechnique(packId)}
            />
          )}

          {activeSection === 'investigation' && (
            <InvestigationHub
              state={state}
              onUpdateInvestigations={handleUpdateInvestigations}
              onPinItem={handlePinItem}
              onUnpinItem={handleUnpinItem}
              onNavigateToChapter={handleNavigateToChapter}
              onNavigateToTechnique={handleNavigateToTechnique}
              onNavigateToAnalysis={(chapterId) => {
                updateWorkspaceState((prev) => ({ ...prev, activeChapterId: chapterId }));
                setActiveSection('analysis');
              }}
            />
          )}

          {activeSection === 'writing' && (
            <WritingWorkspace
              chapters={state.chapters}
              techniquePacks={state.techniquePacks}
              schemesOfWork={state.schemesOfWork}
              activeChapterId={state.activeChapterId}
              pinnedItems={pinnedItems}
              highlightedExcerpt={highlightedExcerpt || undefined}
              onUpdateChapter={handleUpdateChapter}
              onCreateChapter={handleCreateChapter}
              onDeleteChapter={handleDeleteChapter}
              onLogExecution={handleLogExecution}
              onSelectChapter={(id) =>
                updateWorkspaceState((prev) => ({ ...prev, activeChapterId: id }))
              }
              onPinItem={handlePinItem}
              onSendPassageToTechniqueWorkbench={(passage, packId) =>
                handleSendPassageToTechniqueWorkbench(
                  passage,
                  state.activeChapterId || state.chapters[0]?.id || '',
                  packId
                )
              }
            />
          )}

          {activeSection === 'techniques' && (
            <TechniquePackStudio
              packs={state.techniquePacks}
              chapters={state.chapters}
              initialSelectedPackId={workbenchPassagePayload?.packId}
              initialPassageForWorkbench={workbenchPassagePayload?.passage}
              onUpdatePack={handleUpdatePack}
              onCreatePack={handleCreatePack}
              onDeletePack={handleDeletePack}
              onLogExecution={handleLogExecution}
              onNavigateToChapter={handleNavigateToChapter}
            />
          )}

          {activeSection === 'analysis' && (
            <ChapterIntelligence
              chapters={state.chapters}
              analyses={state.analyses}
              activeChapterId={state.activeChapterId}
              onSaveAnalysis={handleSaveAnalysis}
              onLogExecution={handleLogExecution}
              onSelectChapter={(id) =>
                updateWorkspaceState((prev) => ({ ...prev, activeChapterId: id }))
              }
              onNavigateToChapterPassage={handleNavigateToChapter}
              onPinItem={handlePinItem}
            />
          )}

          {activeSection === 'planning' && (
            <ProjectPlanning
              schemesOfWork={state.schemesOfWork}
              chapters={state.chapters}
              onUpdateScheme={handleUpdateScheme}
              onCreateScheme={handleCreateScheme}
              onNavigateToChapter={(id) => handleNavigateToChapter(id)}
            />
          )}

          {activeSection === 'evaluation' && (
            <EvaluationStudio
              chapters={state.chapters}
              techniquePacks={state.techniquePacks}
              evaluations={state.evaluations}
              activeChapterId={state.activeChapterId}
              onSaveEvaluation={handleSaveEvaluation}
              onLogExecution={handleLogExecution}
            />
          )}

          {activeSection === 'usage' && <AIUsageMetrics logs={state.executionLogs} />}
        </div>
      </main>

      {/* Ledger Boundary Modal */}
      <LedgerBoundaryModal
        state={state}
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        onStateImported={(newState) => setWorkspaceStateDirect(newState)}
        onResetToSeed={handleResetToSeed}
        apiStatus={apiStatus}
      />
    </div>
  );
}

function OverviewSection({
  state,
  apiStatus,
  onNavigate,
  onOpenLedgerModal,
  onSelectChapter,
  onSelectTechnique,
}: {
  state: WorkspaceState;
  apiStatus: {
    configured: boolean;
    status: string;
    defaultModelId: string;
    fallbackModelId: string;
  } | null;
  onNavigate: (id: SectionId) => void;
  onOpenLedgerModal: () => void;
  onSelectChapter: (id: string, excerpt?: string) => void;
  onSelectTechnique: (packId: string) => void;
}) {
  const totalWords = state.chapters.reduce(
    (acc, c) =>
      acc + (c.currentContent.trim() ? c.currentContent.trim().split(/\s+/).length : 0),
    0
  );

  const canonChapters = state.chapters.filter((c) => c.provenance === 'ledger_authoritative');
  const workingForks = state.chapters.filter((c) => c.provenance !== 'ledger_authoritative');
  const totalCausalEdges = state.analyses.reduce(
    (acc, a) => acc + (a.causalEdges?.length || 0),
    0
  );
  const investigations = state.investigations || [];

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono text-amber-400 uppercase tracking-widest">
            <span>Apocrypha DXD: ForeverWorlds</span>
            <span>·</span>
            <span>Intellectual & Narrative Workstation</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('investigation')}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 font-medium rounded-lg text-xs font-mono transition-colors flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Investigate Corpus</span>
            </button>
            <button
              onClick={() => onNavigate('techniques')}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 font-medium rounded-lg text-xs font-mono transition-colors flex items-center gap-2"
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
              <span>Technique Lab</span>
            </button>
            <button
              onClick={() => onNavigate('writing')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg text-xs font-mono transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Chapter Studio</span>
            </button>
          </div>
        </div>

        <div className="space-y-2.5 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-stone-100">
            Extend Narrative Reasoning Across Canon, Technique & Causality
          </h2>
          <p className="text-sm text-stone-400 leading-relaxed font-sans">
            Grounded in the 8 authoritative Ledger chapters following <strong>Jonah Laurence</strong> (Ch. 1–3) and his awakening in 2005 Kuoh as <strong>Ira Lowe</strong> (Ch. 4–8, Applicant No. 1044). Search passages in full paragraph context, test operational Technique Packs on real prose, inspect typed causal vs. temporal graphs, and fork working drafts without mutating canonical Ledger records.
          </p>
        </div>

        {/* Key Studio Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-stone-800/80 font-mono">
          <div
            onClick={() => onNavigate('writing')}
            className="p-3.5 bg-stone-950/80 hover:bg-stone-900/80 border border-stone-800/60 rounded-xl cursor-pointer transition-colors"
          >
            <span className="text-stone-400 block text-[10px] uppercase mb-1">
              Ledger Canon / Forks
            </span>
            <span className="text-lg font-bold text-emerald-400 tabular-nums">
              {canonChapters.length} Canon{' '}
              <span className="text-stone-400 text-xs font-normal">
                ({workingForks.length} forks)
              </span>
            </span>
          </div>
          <div
            onClick={() => onNavigate('investigation')}
            className="p-3.5 bg-stone-950/80 hover:bg-stone-900/80 border border-stone-800/60 rounded-xl cursor-pointer transition-colors"
          >
            <span className="text-stone-400 block text-[10px] uppercase mb-1">
              Corpus Word Count
            </span>
            <span className="text-lg font-bold text-stone-100 tabular-nums">
              {totalWords.toLocaleString()}
            </span>
          </div>
          <div
            onClick={() => onNavigate('techniques')}
            className="p-3.5 bg-stone-950/80 hover:bg-stone-900/80 border border-stone-800/60 rounded-xl cursor-pointer transition-colors"
          >
            <span className="text-stone-400 block text-[10px] uppercase mb-1">
              Operational Packs
            </span>
            <span className="text-lg font-bold text-amber-400 tabular-nums">
              {state.techniquePacks.length} Packs
            </span>
          </div>
          <div
            onClick={() => onNavigate('analysis')}
            className="p-3.5 bg-stone-950/80 hover:bg-stone-900/80 border border-stone-800/60 rounded-xl cursor-pointer transition-colors"
          >
            <span className="text-stone-400 block text-[10px] uppercase mb-1">
              Typed Causal Edges
            </span>
            <span className="text-lg font-bold text-purple-400 tabular-nums">
              {totalCausalEdges} Links
            </span>
          </div>
          <div
            onClick={() => onNavigate('investigation')}
            className="p-3.5 bg-stone-950/80 hover:bg-stone-900/80 border border-stone-800/60 rounded-xl cursor-pointer transition-colors"
          >
            <span className="text-stone-400 block text-[10px] uppercase mb-1">
              Active Investigations
            </span>
            <span className="text-lg font-bold text-sky-400 tabular-nums">
              {investigations.length} Threads
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Intellectual Workbench Preview: Active Investigations & Operational Techniques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Investigation Threads */}
        <div className="border border-stone-800/80 bg-[#0e0e11] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                <HelpCircle className="w-4 h-4" />
                <span>Open Narrative Investigations & Epistemic Threads</span>
              </div>
              <button
                onClick={() => onNavigate('investigation')}
                className="text-xs font-mono text-stone-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Explore all</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {investigations.slice(0, 3).map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => onNavigate('investigation')}
                  className="p-3.5 rounded-lg border border-stone-800/80 hover:border-amber-500/50 bg-stone-950/60 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/60 text-amber-300 uppercase">
                      {inv.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-stone-500">
                      {inv.competingHypotheses.length} competing hypotheses · {inv.linkedChapterIds.length} chapters
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-stone-100 leading-snug">
                    {inv.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 font-sans">
                    {inv.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span>Distinguishes explicit text from inference & hypothesis</span>
            <button
              onClick={() => onNavigate('investigation')}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Open Investigation Hub</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Operational Technique Packs */}
        <div className="border border-stone-800/80 bg-[#0e0e11] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
                <Layers className="w-4 h-4" />
                <span>Operational Technique Packs (5-Question Architecture)</span>
              </div>
              <button
                onClick={() => onNavigate('techniques')}
                className="text-xs font-mono text-stone-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Open Workbench</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {state.techniquePacks.slice(0, 3).map((pack) => {
                const activeVersion = pack.versions[pack.currentVersion];
                const stepCount = activeVersion?.componentB.mechanismSteps?.length || 0;
                const checkCount = activeVersion?.componentE.evaluationTests.length || 0;
                return (
                  <div
                    key={pack.id}
                    onClick={() => onSelectTechnique(pack.id)}
                    className="p-3.5 rounded-lg border border-stone-800/80 hover:border-emerald-500/50 bg-stone-950/60 cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="text-emerald-400 font-semibold">{pack.name}</span>
                      <span className="text-stone-500">
                        {stepCount} mechanism steps · {checkCount} checks
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 line-clamp-2 font-sans">
                      {pack.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span>Includes live passage application & diagnostic verification</span>
            <button
              onClick={() => onNavigate('techniques')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Test on Passage</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Canonical Ledger Chapters (Ch 1 - 8) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-300">
              Canonical Ledger Corpus (Chapters 1–8) & Working Forks
            </h3>
            <p className="text-[11px] text-stone-500 font-mono mt-0.5">
              Click any chapter to inspect its text, annotations, or fork a working draft for revision.
            </p>
          </div>
          <button
            onClick={() => onNavigate('writing')}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <span>Open Chapter Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {state.chapters.map((chap) => {
            const chapWords = chap.currentContent.trim()
              ? chap.currentContent.trim().split(/\s+/).length
              : 0;
            const isCanon = chap.provenance === 'ledger_authoritative';
            return (
              <div
                key={chap.id}
                onClick={() => onSelectChapter(chap.id)}
                className="group border border-stone-800/80 hover:border-amber-500/50 bg-[#0e0e11] hover:bg-[#121216] rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="text-amber-400 font-semibold">
                      Ch. {chap.chapterNumber}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        isCanon
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                          : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
                      }`}
                    >
                      {isCanon ? 'Ledger Canon' : 'Working Fork'}
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-medium text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                    {chap.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-stone-400 font-serif line-clamp-2 leading-relaxed">
                    {chap.currentContent}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>{chapWords.toLocaleString()} words</span>
                  <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Inspect <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workstation Architecture & All Modules */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400">
            All Workstation Modules
          </h3>
          <button
            onClick={onOpenLedgerModal}
            className="text-xs font-mono text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>
              AI Orchestration:{' '}
              {apiStatus?.configured
                ? `${apiStatus.defaultModelId} Ready`
                : 'Local Tools Active'}
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {NAV_ITEMS.filter((i) => i.id !== 'overview').map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group border border-stone-800/80 hover:border-stone-700 bg-[#0e0e11] hover:bg-[#141418] rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-stone-400 group-hover:text-stone-200 flex items-center gap-1">
                      Open <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-stone-200 group-hover:text-white transition-colors">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
