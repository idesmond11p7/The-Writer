'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { 
  WorkspaceState, 
  ChapterDraft, 
  TechniquePack, 
  SchemeOfWork, 
  ChapterAnalysis, 
  EvaluationRecord, 
  AIExecutionLog 
} from '@/types/domain';
import { 
  getWorkspaceSnapshot, 
  getServerWorkspaceSnapshot, 
  subscribeWorkspace, 
  updateWorkspaceState, 
  setWorkspaceStateDirect, 
  resetWorkspaceToSeed 
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
  Clock, 
  Save, 
  HardDrive,
  Plus,
  ArrowUpRight,
  FileText
} from 'lucide-react';

import WritingWorkspace from '@/components/WritingWorkspace';
import TechniquePackStudio from '@/components/TechniquePackStudio';
import ProjectPlanning from '@/components/ProjectPlanning';
import ChapterIntelligence from '@/components/ChapterIntelligence';
import EvaluationStudio from '@/components/EvaluationStudio';
import AIUsageMetrics from '@/components/AIUsageMetrics';
import LedgerBoundaryModal from '@/components/LedgerBoundaryModal';

type SectionId = 'overview' | 'writing' | 'techniques' | 'planning' | 'analysis' | 'evaluation' | 'usage';

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Studio Overview', icon: Compass, description: 'Workstation summary & quick navigation' },
  { id: 'writing', label: 'Writing Workspace', icon: BookOpen, description: 'Long-form drafting & AI orchestration' },
  { id: 'techniques', label: 'Technique Packs', icon: Layers, description: 'Methodology authoring & compiler' },
  { id: 'planning', label: 'Project Planning', icon: Target, description: 'Schemes of work & milestone tracking' },
  { id: 'analysis', label: 'Chapter Intelligence', icon: GitFork, description: 'Event timeline & causality graphs' },
  { id: 'evaluation', label: 'Evaluation Studio', icon: CheckSquare, description: 'Independent quality audits' },
  { id: 'usage', label: 'AI Usage & Metrics', icon: Activity, description: 'Token consumption & latency telemetry' },
];

export default function WriterAppShell() {
  const state = useSyncExternalStore(
    subscribeWorkspace,
    getWorkspaceSnapshot,
    getServerWorkspaceSnapshot
  );
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState<boolean>(false);

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
      schemesOfWork: prev.schemesOfWork.map((s) => (s.id === updatedScheme.id ? updatedScheme : s)),
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

  // Reset to Seed
  const handleResetToSeed = () => {
    resetWorkspaceToSeed();
  };

  // Navigation shortcut
  const handleNavigateToChapter = (chapterId: string) => {
    updateWorkspaceState((prev) => ({ ...prev, activeChapterId: chapterId }));
    setActiveSection('writing');
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#09090b] text-stone-400 font-mono text-xs">
        Loading Apocrypha DXD: ForeverWorlds Writer Studio...
      </div>
    );
  }

  const activeChapter = state.chapters.find((c) => c.id === state.activeChapterId) || state.chapters[0];

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-stone-100 overflow-hidden font-sans antialiased">
      {/* Sleek Minimalist Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col justify-between select-none">
        <div>
          {/* Brand & Studio Title */}
          <div className="p-6 border-b border-stone-800/60">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-amber-500 uppercase font-medium">
              <span>Ur-Verse Studio</span>
              <span className="text-stone-700">/</span>
              <span>Writer</span>
            </div>
            <h1 className="text-sm font-semibold text-stone-100 mt-1.5 tracking-tight font-serif">
              Apocrypha DXD: ForeverWorlds
            </h1>
            <p className="text-[11px] text-stone-400 mt-1 font-mono">
              Artist-Friendly Workstation
            </p>
          </div>

          {/* Quick Chapter Selector */}
          {state.chapters.length > 0 && (
            <div className="px-4 py-3 border-b border-stone-800/50 bg-stone-900/20">
              <div className="text-[10px] font-mono uppercase text-stone-400 mb-1.5 px-1">
                Active Draft
              </div>
              <select
                value={activeChapter?.id || ''}
                onChange={(e) => {
                  updateWorkspaceState((prev) => ({ ...prev, activeChapterId: e.target.value }));
                  setActiveSection('writing');
                }}
                className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:outline-none focus:border-amber-500/80 truncate"
              >
                {state.chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Ch. {c.chapterNumber}: {c.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Navigation Modules */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-stone-400">
              Navigation
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              let countBadge: string | number | undefined;
              if (item.id === 'writing') countBadge = state.chapters.length;
              if (item.id === 'techniques') countBadge = state.techniquePacks.length;
              if (item.id === 'planning') countBadge = state.schemesOfWork.length;
              if (item.id === 'analysis') countBadge = state.analyses.length;
              if (item.id === 'evaluation') countBadge = state.evaluations.length;
              if (item.id === 'usage') countBadge = state.executionLogs.length;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-left transition-all text-xs font-medium group ${
                    isActive
                      ? 'bg-stone-800/90 text-stone-100 border border-stone-700/60 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-amber-400' : 'text-stone-400 group-hover:text-stone-300'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {countBadge !== undefined && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800/80 text-stone-400 tabular-nums">
                      {countBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Ledger Boundary Footer Widget */}
        <div className="p-3.5 m-3 border border-stone-800/80 rounded-lg bg-[#070708] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-stone-300 font-medium text-xs">
              <Database className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono text-[11px]">Ledger Sync</span>
            </div>
            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className="text-[10px] font-mono text-amber-400 hover:text-amber-300 transition-colors underline"
            >
              Backups
            </button>
          </div>
          <p className="text-[10px] leading-relaxed text-stone-400 font-mono">
            Authoritative canon repository active. Working drafts remain safely isolated.
          </p>
        </div>
      </aside>

      {/* Main Work Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#09090b]">
        {/* Sleek Top Header */}
        <header className="h-14 border-b border-stone-800/80 px-6 flex items-center justify-between bg-[#0c0c0e]/80 backdrop-blur flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <span className="text-stone-400">Studio</span>
            <span className="text-stone-600">/</span>
            <span className="text-stone-200 font-semibold capitalize">
              {NAV_ITEMS.find((item) => item.id === activeSection)?.label}
            </span>
            {activeChapter && activeSection !== 'overview' && (
              <>
                <span className="text-stone-600">/</span>
                <span className="text-amber-400 font-medium truncate max-w-xs font-serif">
                  Ch. {activeChapter.chapterNumber}: {activeChapter.title}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 text-stone-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Storage Connected</span>
            </div>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className="px-3 py-1 rounded bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span>Data & Settings</span>
            </button>
          </div>
        </header>

        {/* Dynamic Section Viewport */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeSection === 'overview' && (
            <OverviewSection
              state={state}
              onNavigate={(id) => setActiveSection(id)}
              onOpenLedgerModal={() => setIsLedgerModalOpen(true)}
              onSelectChapter={handleNavigateToChapter}
            />
          )}

          {activeSection === 'writing' && (
            <WritingWorkspace
              chapters={state.chapters}
              techniquePacks={state.techniquePacks}
              schemesOfWork={state.schemesOfWork}
              activeChapterId={state.activeChapterId}
              onUpdateChapter={handleUpdateChapter}
              onCreateChapter={handleCreateChapter}
              onDeleteChapter={handleDeleteChapter}
              onLogExecution={handleLogExecution}
              onSelectChapter={(id) => updateWorkspaceState((prev) => ({ ...prev, activeChapterId: id }))}
            />
          )}

          {activeSection === 'techniques' && (
            <TechniquePackStudio
              packs={state.techniquePacks}
              onUpdatePack={handleUpdatePack}
              onCreatePack={handleCreatePack}
              onDeletePack={handleDeletePack}
            />
          )}

          {activeSection === 'planning' && (
            <ProjectPlanning
              schemesOfWork={state.schemesOfWork}
              chapters={state.chapters}
              onUpdateScheme={handleUpdateScheme}
              onCreateScheme={handleCreateScheme}
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
              onSelectChapter={(id) => updateWorkspaceState((prev) => ({ ...prev, activeChapterId: id }))}
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

          {activeSection === 'usage' && (
            <AIUsageMetrics logs={state.executionLogs} />
          )}
        </div>
      </main>

      {/* Ledger Boundary Modal */}
      <LedgerBoundaryModal
        state={state}
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        onStateImported={(newState) => setWorkspaceStateDirect(newState)}
        onResetToSeed={handleResetToSeed}
      />
    </div>
  );
}

// Artist-Friendly Minimalist Overview Hub
function OverviewSection({
  state,
  onNavigate,
  onOpenLedgerModal,
  onSelectChapter,
}: {
  state: WorkspaceState;
  onNavigate: (id: SectionId) => void;
  onOpenLedgerModal: () => void;
  onSelectChapter: (id: string) => void;
}) {
  const totalWords = state.chapters.reduce(
    (acc, c) => acc + (c.currentContent.trim() ? c.currentContent.trim().split(/\s+/).length : 0),
    0
  );

  const activeChapter = state.chapters.find((c) => c.id === state.activeChapterId) || state.chapters[0];

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 max-w-6xl mx-auto space-y-10">
      {/* Hero Header */}
      <div className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-8 sm:p-10 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono text-amber-400 uppercase tracking-widest">
            <span>Ur-Verse Project Studio</span>
            <span>·</span>
            <span>Apocrypha DXD</span>
          </div>
          <button
            onClick={() => onNavigate('writing')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg text-xs font-mono transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Writing Workspace</span>
          </button>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-100">
            Literary Intelligence & Narrative Workstation
          </h2>
          <p className="text-sm text-stone-400 leading-relaxed font-sans">
            Designed for artists and writers. Seamlessly coordinate chapter drafting, rigorous Technique Pack compilations, event causality extraction, and model orchestration with zero friction.
          </p>
        </div>

        {/* Key Studio Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800/80 font-mono">
          <div className="p-4 bg-stone-950/80 border border-stone-800/60 rounded-xl">
            <span className="text-stone-400 block text-[11px] mb-1">Total Manuscript Words</span>
            <span className="text-xl font-bold text-stone-100 tabular-nums">{totalWords.toLocaleString()}</span>
          </div>
          <div className="p-4 bg-stone-950/80 border border-stone-800/60 rounded-xl">
            <span className="text-stone-400 block text-[11px] mb-1">Active Chapters</span>
            <span className="text-xl font-bold text-amber-400 tabular-nums">{state.chapters.length}</span>
          </div>
          <div className="p-4 bg-stone-950/80 border border-stone-800/60 rounded-xl">
            <span className="text-stone-400 block text-[11px] mb-1">Technique Packs</span>
            <span className="text-xl font-bold text-stone-100 tabular-nums">{state.techniquePacks.length}</span>
          </div>
          <div className="p-4 bg-stone-950/80 border border-stone-800/60 rounded-xl">
            <span className="text-stone-400 block text-[11px] mb-1">AI Operations</span>
            <span className="text-xl font-bold text-stone-100 tabular-nums">{state.executionLogs.length}</span>
          </div>
        </div>
      </div>

      {/* Quick Access to Chapters */}
      {state.chapters.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400">
              Recent Chapter Drafts
            </h3>
            <button
              onClick={() => onNavigate('writing')}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>View all chapters</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.chapters.slice(0, 3).map((chap) => {
              const chapWords = chap.currentContent.trim() ? chap.currentContent.trim().split(/\s+/).length : 0;
              return (
                <div
                  key={chap.id}
                  onClick={() => onSelectChapter(chap.id)}
                  className="group border border-stone-800/80 hover:border-amber-500/50 bg-[#0e0e11] hover:bg-[#121216] rounded-xl p-5 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-amber-400 font-semibold">Ch. {chap.chapterNumber}</span>
                      <span className="text-stone-400 tabular-nums">{chapWords} words</span>
                    </div>
                    <h4 className="text-sm font-serif font-medium text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                      {chap.title}
                    </h4>
                    <p className="mt-2 text-xs text-stone-400 font-serif line-clamp-2 leading-relaxed">
                      {chap.currentContent || 'Empty draft. Click to begin writing.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800">
                      {chap.provenance.replace('_', ' ')}
                    </span>
                    <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Edit Draft <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Grid of All Modules */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400">
          Studio Modules & Workspaces
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_ITEMS.filter((i) => i.id !== 'overview').map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group border border-stone-800/80 hover:border-stone-700 bg-[#0e0e11] hover:bg-[#141418] rounded-xl p-5 transition-all cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 group-hover:text-stone-300 flex items-center gap-1">
                      Open <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-200 group-hover:text-white transition-colors">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-xs text-stone-400 leading-relaxed">
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
