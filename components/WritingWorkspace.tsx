'use client';

import React, { useState, useMemo } from 'react';
import {
  ChapterDraft,
  Revision,
  TechniquePack,
  SchemeOfWork,
  AIExecutionLog,
  ProvenanceType,
  PassageAnnotation,
  PinnedWorkingItem,
} from '@/types/domain';
import {
  generateTimestamp,
  generateId,
  formatTimestamp,
  formatTimeOnly,
} from '@/lib/utils';
import { compileTechniquePacks } from '@/lib/techniqueCompiler';
import { DEFAULT_MODEL_ID, SUPPORTED_MODELS } from '@/lib/models';
import { exportChapterToMarkdown } from '@/lib/storage';
import {
  BookOpen,
  Plus,
  Save,
  Download,
  Sparkles,
  History,
  Columns,
  Layers,
  X,
  Eye,
  Loader2,
  Target,
  Upload,
  GitBranch,
  Pin,
  FlaskConical,
  ShieldCheck,
  MessageSquarePlus,
} from 'lucide-react';

interface WritingWorkspaceProps {
  chapters: ChapterDraft[];
  techniquePacks: TechniquePack[];
  schemesOfWork: SchemeOfWork[];
  activeChapterId?: string;
  highlightedExcerpt?: string;
  pinnedItems?: PinnedWorkingItem[];
  onUpdateChapter: (chapter: ChapterDraft) => void;
  onCreateChapter: (chapter: ChapterDraft) => void;
  onDeleteChapter: (chapterId: string) => void;
  onLogExecution: (log: AIExecutionLog) => void;
  onSelectChapter: (id: string) => void;
  onPinItem?: (item: PinnedWorkingItem) => void;
  onSendPassageToTechniqueWorkbench?: (passage: string, packId?: string) => void;
}

export default function WritingWorkspace({
  chapters,
  techniquePacks,
  schemesOfWork,
  activeChapterId,
  highlightedExcerpt,
  pinnedItems = [],
  onUpdateChapter,
  onCreateChapter,
  onLogExecution,
  onSelectChapter,
  onPinItem,
  onSendPassageToTechniqueWorkbench,
}: WritingWorkspaceProps) {
  const currentChapter = useMemo(() => {
    return (
      chapters.find((c) => c.id === activeChapterId) || chapters[0] || null
    );
  }, [chapters, activeChapterId]);

  const [content, setContent] = useState<string>(
    currentChapter?.currentContent || ''
  );
  const [title, setTitle] = useState<string>(currentChapter?.title || '');
  const [chapterNumber, setChapterNumber] = useState<string | number>(
    currentChapter?.chapterNumber || '1'
  );
  const [notes, setNotes] = useState<string>(currentChapter?.notes || '');
  const [targetPlanId, setTargetPlanId] = useState<string>(
    currentChapter?.targetPlanId || ''
  );
  const [activePackIds, setActivePackIds] = useState<string[]>(
    currentChapter?.activeTechniquePackIds || []
  );
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    'editor' | 'passages' | 'history' | 'diff' | 'notes'
  >(highlightedExcerpt ? 'passages' : 'editor');

  // Selected passage for investigation / annotation / focused revision
  const [selectedPassageText, setSelectedPassageText] = useState<string>(
    highlightedExcerpt || ''
  );
  const [newAnnotationNote, setNewAnnotationNote] = useState<string>('');
  const [newAnnotationCat, setNewAnnotationCat] =
    useState<PassageAnnotation['category']>('technique_evidence');

  // Diff viewer state
  const [selectedRevisionForDiff, setSelectedRevisionForDiff] =
    useState<Revision | null>(currentChapter?.revisions?.[0] || null);
  const [diffViewMode, setDiffViewMode] = useState<'split' | 'unified'>(
    'split'
  );

  // Import chapter modal
  const [isImportChapterModalOpen, setIsImportChapterModalOpen] =
    useState<boolean>(false);
  const [importChapterNumber, setImportChapterNumber] = useState<string>('9');
  const [importChapterTitle, setImportChapterTitle] = useState<string>('');
  const [importChapterProvenance, setImportChapterProvenance] =
    useState<ProvenanceType>('local_working_draft');
  const [importChapterSourceId, setImportChapterSourceId] =
    useState<string>('');
  const [importChapterContent, setImportChapterContent] = useState<string>('');

  // AI Orchestration Panel state
  const [isAiPanelOpen, setIsAiPanelOpen] = useState<boolean>(false);
  const [taskType, setTaskType] = useState<
    'draft_generation' | 'prose_revision'
  >('prose_revision');
  const [aiScope, setAiScope] = useState<'selected_passage' | 'full_chapter'>(
    'selected_passage'
  );
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL_ID);
  const [aiDirectives, setAiDirectives] = useState<string>('');
  const [showPromptInspection, setShowPromptInspection] =
    useState<boolean>(false);
  const [isExecutingAi, setIsExecutingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<{
    text: string;
    modelId: string;
    latencyMs: number;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCostUsd: number;
    rawInputSummary: string;
  } | null>(null);

  // Sync state when active chapter changes
  const [prevChapterId, setPrevChapterId] = useState<string | undefined>(
    currentChapter?.id
  );
  if (currentChapter && currentChapter.id !== prevChapterId) {
    setPrevChapterId(currentChapter.id);
    setContent(currentChapter.currentContent);
    setTitle(currentChapter.title);
    setChapterNumber(currentChapter.chapterNumber);
    setNotes(currentChapter.notes);
    setTargetPlanId(currentChapter.targetPlanId || '');
    setActivePackIds(currentChapter.activeTechniquePackIds || []);
    setIsSaved(true);
    setSelectedRevisionForDiff(currentChapter.revisions?.[0] || null);
  }

  // Sync highlightedExcerpt when navigated from Investigation Hub or Causality Graph
  const [prevHighlight, setPrevHighlight] = useState<string | undefined>(
    highlightedExcerpt
  );
  if (highlightedExcerpt && highlightedExcerpt !== prevHighlight) {
    setPrevHighlight(highlightedExcerpt);
    setSelectedPassageText(highlightedExcerpt);
    setActiveTab('passages');
  }

  const wordCount = useMemo(() => {
    const trimmed = content.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [content]);

  const charCount = useMemo(() => content.length, [content]);

  const paragraphs = useMemo(() => {
    return content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [content]);

  const isAuthoritativeLedger =
    currentChapter?.provenance === 'ledger_authoritative';

  // Fork an Authoritative Ledger Chapter into a Linked Working Draft
  const handleForkWorkingDraft = (overrideContent?: string, forkReason?: string) => {
    if (!currentChapter) return;
    const now = generateTimestamp();
    const targetContent =
      overrideContent !== undefined ? overrideContent : content;
    const forkedDraft: ChapterDraft = {
      id: generateId(`draft_ch${currentChapter.chapterNumber}`),
      title: `${currentChapter.title} (Working Draft)`,
      chapterNumber: currentChapter.chapterNumber,
      provenance: 'local_working_draft',
      sourceIdentifier: `Forked from ${currentChapter.sourceIdentifier || currentChapter.id}`,
      parentLedgerChapterId: currentChapter.id,
      currentContent: targetContent,
      notes: `${currentChapter.notes}\n\n[Forked Working Draft]: Created to revise and experiment while preserving the authoritative Ledger snapshot (${currentChapter.id}).`,
      writingObjectives: [...currentChapter.writingObjectives],
      constraints: [...currentChapter.constraints],
      targetPlanId: targetPlanId || currentChapter.targetPlanId,
      activeTechniquePackIds:
        activePackIds.length > 0
          ? activePackIds
          : techniquePacks.slice(0, 2).map((p) => p.id),
      annotations: [...(currentChapter.annotations || [])],
      revisions: [
        {
          id: generateId('rev_fork'),
          timestamp: now,
          author: 'user',
          notes:
            forkReason ||
            `Forked working draft from authoritative Ledger Ch. ${currentChapter.chapterNumber}`,
          content: targetContent,
          wordCount: targetContent.trim()
            ? targetContent.trim().split(/\s+/).length
            : 0,
          techniquePackIds: activePackIds,
        },
        ...currentChapter.revisions,
      ],
      createdAt: now,
      updatedAt: now,
    };

    onCreateChapter(forkedDraft);
    onSelectChapter(forkedDraft.id);
    setIsSaved(true);
  };

  // Save draft (automatically forks if attempting to overwrite an authoritative Ledger text)
  const handleSaveDraft = (
    createRevision = false,
    revNotes = 'Manual snapshot'
  ) => {
    if (!currentChapter) return;

    // If user modified prose on a ledger_authoritative record, fork into a working draft to protect the Ledger boundary
    if (
      currentChapter.provenance === 'ledger_authoritative' &&
      content !== currentChapter.currentContent
    ) {
      handleForkWorkingDraft(
        content,
        'Auto-forked working draft to preserve authoritative Ledger chapter'
      );
      return;
    }

    let updatedRevisions = [...currentChapter.revisions];
    if (createRevision || updatedRevisions.length === 0) {
      const newRev: Revision = {
        id: generateId('rev'),
        timestamp: generateTimestamp(),
        author: 'user',
        notes: revNotes,
        content,
        wordCount,
        techniquePackIds: activePackIds,
      };
      updatedRevisions = [newRev, ...updatedRevisions];
    }

    const updatedChapter: ChapterDraft = {
      ...currentChapter,
      title,
      chapterNumber,
      notes,
      targetPlanId: targetPlanId || undefined,
      activeTechniquePackIds: activePackIds,
      currentContent: content,
      revisions: updatedRevisions,
      updatedAt: generateTimestamp(),
    };

    onUpdateChapter(updatedChapter);
    setIsSaved(true);
  };

  // Create new Chapter (e.g. Chapter 9 continuation)
  const handleCreateNewChapter = () => {
    const newChapNum = chapters.length + 1;
    const now = generateTimestamp();
    const newChap: ChapterDraft = {
      id: generateId('chap_user'),
      title: `Chapter ${newChapNum} — The Minami-Kuoh Inquiry`,
      chapterNumber: newChapNum,
      provenance: 'local_working_draft',
      currentContent: '',
      notes:
        'Continuation from Chapter 8: Verify the Kanagawa Prefectural Educational Development Association (Minami-Kuoh administrative annex) via the public library directory before traveling.',
      writingObjectives: [
        'Verify the Minami-Kuoh annex address in a municipal or library directory',
        'Maintain somatic-cognitive duality and 2005 Japanese environmental grounding',
      ],
      constraints: [
        'First-person focalization (Ira Lowe / Jonah Laurence)',
        'Preserve strict boundary between procedural fluency and absent episodic recall',
      ],
      targetPlanId: schemesOfWork[0]?.id,
      activeTechniquePackIds: techniquePacks.slice(0, 2).map((p) => p.id),
      revisions: [],
      annotations: [],
      createdAt: now,
      updatedAt: now,
    };
    onCreateChapter(newChap);
    onSelectChapter(newChap.id);
  };

  const handleAddAnnotation = () => {
    if (!currentChapter || !selectedPassageText.trim() || !newAnnotationNote.trim())
      return;
    const newAnn: PassageAnnotation = {
      id: generateId('ann'),
      chapterId: currentChapter.id,
      excerpt: selectedPassageText.trim(),
      note: newAnnotationNote.trim(),
      category: newAnnotationCat,
      epistemicStatus: 'derived_analysis',
      createdAt: generateTimestamp(),
    };
    const updatedChapter: ChapterDraft = {
      ...currentChapter,
      annotations: [newAnn, ...(currentChapter.annotations || [])],
      updatedAt: generateTimestamp(),
    };
    onUpdateChapter(updatedChapter);
    setNewAnnotationNote('');
  };

  // Compile active technique packs + pinned context for inspection or execution
  const compiledInstruction = useMemo(() => {
    const selectedPacks = techniquePacks.filter((p) =>
      activePackIds.includes(p.id)
    );
    const versionMap: Record<string, string> = {};
    selectedPacks.forEach((p) => {
      versionMap[p.id] = p.currentVersion;
    });
    return compileTechniquePacks(
      selectedPacks,
      versionMap,
      taskType === 'draft_generation'
        ? 'Scene Drafting'
        : 'Targeted Passage / Prose Revision',
      currentChapter?.constraints || []
    );
  }, [techniquePacks, activePackIds, taskType, currentChapter?.constraints]);

  // Execute AI Model Task
  const handleExecuteAi = async () => {
    if (!currentChapter) return;
    setIsExecutingAi(true);
    setAiError(null);
    setGeneratedOutput(null);

    try {
      const targetPlan = schemesOfWork.find((s) => s.id === targetPlanId);
      const planMilestones = targetPlan?.milestones
        .map(
          (m) =>
            `[Milestone: ${m.title}]\nIntended: ${m.intendedEvents.join(', ')}`
        )
        .join('\n\n');

      const pinnedContextBlock =
        pinnedItems.length > 0
          ? `\n\n[PINNED INVESTIGATION CONTEXT]\n${pinnedItems.map((pi) => `- ${pi.title}: ${pi.content}`).join('\n')}`
          : '';

      const targetContextText =
        aiScope === 'selected_passage' && selectedPassageText.trim()
          ? selectedPassageText
          : content;

      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType,
          modelId: selectedModel,
          userPrompt:
            aiDirectives ||
            (taskType === 'draft_generation'
              ? 'Continue the scene following the active objectives and Technique Pack procedures.'
              : 'Revise the selected passage according to the compiled Technique Pack procedures and constraints.'),
          contextText: `${targetContextText}${pinnedContextBlock}`,
          compiledTechniquePrompt: compiledInstruction.systemPromptBlock,
          planContext: planMilestones,
          constraints: currentChapter.constraints || [],
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete model execution');
      }

      setGeneratedOutput({
        text: data.outputText,
        modelId: data.modelId,
        latencyMs: data.latencyMs,
        promptTokens: data.promptTokens,
        completionTokens: data.completionTokens,
        totalTokens: data.totalTokens,
        estimatedCostUsd: data.estimatedCostUsd,
        rawInputSummary: data.rawInputSummary,
      });

      onLogExecution({
        id: generateId('exec'),
        timestamp: generateTimestamp(),
        provider: 'gemini',
        modelId: data.modelId,
        requestedModelId: data.requestedModelId,
        fallbackTriggered: data.fallbackTriggered,
        fallbackReason: data.fallbackReason,
        taskType,
        chapterId: currentChapter.id,
        techniquePackIds: activePackIds,
        inputPromptSummary: aiDirectives || `Task: ${taskType} (${aiScope})`,
        rawInputPrompt: data.rawInputSummary,
        rawOutputText: data.outputText,
        status: 'success',
        latencyMs: data.latencyMs,
        promptTokens: data.promptTokens,
        completionTokens: data.completionTokens,
        totalTokens: data.totalTokens,
        estimatedCostUsd: data.estimatedCostUsd,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setAiError(msg);
    } finally {
      setIsExecutingAi(false);
    }
  };

  // Accept AI Output (replaces selected passage or full draft, forking if on a Ledger snapshot)
  const handleAcceptAiOutput = (
    mode: 'replace_passage' | 'replace_all' | 'append'
  ) => {
    if (!generatedOutput || !currentChapter) return;

    let newContent = content;
    if (
      mode === 'replace_passage' &&
      selectedPassageText &&
      content.includes(selectedPassageText)
    ) {
      newContent = content.replace(selectedPassageText, generatedOutput.text);
    } else if (mode === 'replace_all') {
      newContent = generatedOutput.text;
    } else {
      newContent = content
        ? `${content}\n\n${generatedOutput.text}`
        : generatedOutput.text;
    }

    if (currentChapter.provenance === 'ledger_authoritative') {
      handleForkWorkingDraft(
        newContent,
        `AI ${taskType} accepted (${mode}) using ${generatedOutput.modelId}`
      );
      setGeneratedOutput(null);
      setIsAiPanelOpen(false);
      return;
    }

    setContent(newContent);
    const newRev: Revision = {
      id: generateId('rev_ai'),
      timestamp: generateTimestamp(),
      author: 'model',
      modelId: generatedOutput.modelId,
      notes: `AI ${taskType} accepted (${mode})`,
      content: newContent,
      wordCount: newContent.trim().split(/\s+/).length,
      techniquePackIds: activePackIds,
    };

    onUpdateChapter({
      ...currentChapter,
      currentContent: newContent,
      revisions: [newRev, ...currentChapter.revisions],
      updatedAt: generateTimestamp(),
    });
    setGeneratedOutput(null);
    setIsAiPanelOpen(false);
  };

  if (!currentChapter) return null;

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#09090b]">
      {/* Left Column: Chapters & Working Forks List */}
      <div className="w-68 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800/80 flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Chapters & Drafts</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsImportChapterModalOpen(true)}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              title="Import Chapter Text"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={handleCreateNewChapter}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              title="Create Chapter 9 Draft"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          {chapters.map((chap) => {
            const isSelected = chap.id === currentChapter.id;
            const wCount = chap.currentContent.trim()
              ? chap.currentContent.trim().split(/\s+/).length
              : 0;
            return (
              <div
                key={chap.id}
                onClick={() => onSelectChapter(chap.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-stone-900 border-amber-500/70 text-stone-100'
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-amber-400 font-semibold">
                    Ch. {chap.chapterNumber}
                  </span>
                  <span className="text-stone-400 text-[10px] tabular-nums">
                    {wCount.toLocaleString()} words
                  </span>
                </div>
                <div className="text-xs font-medium truncate text-stone-200 font-serif">
                  {chap.title}
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase border ${
                      chap.provenance === 'ledger_authoritative'
                        ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-400'
                        : 'border-amber-800/80 bg-amber-950/40 text-amber-300'
                    }`}
                  >
                    {chap.provenance === 'ledger_authoritative'
                      ? 'Ledger Canon'
                      : 'Working Draft'}
                  </span>
                  {(chap.annotations || []).length > 0 && (
                    <span className="text-[10px] font-mono text-stone-400">
                      {(chap.annotations || []).length} notes
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Column: Connected Reader, Passage Workbench & Editor */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Authoritative Ledger Protection Banner */}
        {isAuthoritativeLedger && (
          <div className="px-6 py-2.5 bg-emerald-950/25 border-b border-emerald-900/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                Authoritative Ledger Record (
                <span className="text-stone-300">
                  {currentChapter.sourceIdentifier}
                </span>
                ) — Canonical text is protected.
              </span>
            </div>
            <button
              onClick={() => handleForkWorkingDraft()}
              className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Fork Working Draft for Revision</span>
            </button>
          </div>
        )}

        {/* Top Toolbar */}
        <div className="p-4 border-b border-stone-800/80 bg-[#0c0c0e] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[260px]">
            <span className="font-mono text-xs text-amber-500 font-semibold">
              CH. {chapterNumber}
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsSaved(false);
              }}
              className="bg-transparent border-b border-stone-700 focus:border-amber-500 px-1 py-0.5 text-sm font-serif font-medium text-stone-100 focus:outline-none w-full max-w-md"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Tabs */}
            <div className="flex items-center rounded-lg border border-stone-800 bg-stone-950 p-0.5 text-xs font-mono">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'editor'
                    ? 'bg-stone-800 text-stone-100 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Manuscript
              </button>
              <button
                onClick={() => setActiveTab('passages')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'passages'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-amber-400 hover:bg-stone-900'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Passage Workbench ({paragraphs.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'history'
                    ? 'bg-stone-800 text-stone-100 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <History className="w-3 h-3" />
                <span>Revisions ({currentChapter.revisions.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('diff')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'diff'
                    ? 'bg-stone-800 text-stone-100 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Columns className="w-3 h-3" />
                <span>Diff</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'notes'
                    ? 'bg-stone-800 text-stone-100 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Target className="w-3 h-3" />
                <span>Notes & Plan</span>
              </button>
            </div>

            <button
              onClick={() => handleSaveDraft(true, 'Manual revision checkpoint')}
              className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'border border-stone-800 text-stone-300 bg-stone-900 hover:bg-stone-800'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>
                {isSaved
                  ? 'Saved'
                  : isAuthoritativeLedger
                  ? 'Save as Working Fork*'
                  : 'Save Draft*'}
              </span>
            </button>

            <button
              onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
              className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                isAiPanelOpen
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'bg-stone-900 border border-stone-700 text-amber-400 hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Orchestrator</span>
            </button>

            <button
              onClick={() =>
                exportChapterToMarkdown(title, chapterNumber, content)
              }
              className="p-1.5 rounded border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-stone-200"
              title="Export Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Passage Action Bar (Visible whenever a passage is selected) */}
        {selectedPassageText && (
          <div className="px-6 py-2.5 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 truncate max-w-xl">
              <span className="text-amber-400 uppercase font-semibold flex-shrink-0">
                Active Passage:
              </span>
              <span className="text-stone-300 font-serif italic truncate">
                &ldquo;{selectedPassageText}&rdquo;
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onPinItem && (
                <button
                  onClick={() =>
                    onPinItem({
                      id: generateId('pin_pass'),
                      type: 'passage',
                      title: `Ch. ${currentChapter.chapterNumber} Passage`,
                      subtitle: currentChapter.title,
                      content: selectedPassageText,
                      chapterId: currentChapter.id,
                      provenance: currentChapter.provenance,
                      pinnedAt: Date.now(),
                    })
                  }
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 flex items-center gap-1"
                >
                  <Pin className="w-3 h-3 text-amber-400" />
                  <span>Pin to Context</span>
                </button>
              )}

              {onSendPassageToTechniqueWorkbench && (
                <button
                  onClick={() =>
                    onSendPassageToTechniqueWorkbench(
                      selectedPassageText,
                      activePackIds[0]
                    )
                  }
                  className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 flex items-center gap-1"
                >
                  <FlaskConical className="w-3 h-3" />
                  <span>Test Technique on Passage</span>
                </button>
              )}

              <button
                onClick={() => {
                  setAiScope('selected_passage');
                  setTaskType('prose_revision');
                  setIsAiPanelOpen(true);
                }}
                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Stage AI Revision</span>
              </button>

              <button
                onClick={() => setSelectedPassageText('')}
                className="p-1 text-stone-400 hover:text-stone-200"
                title="Clear Selection"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Workspace Body */}
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 flex flex-col h-full overflow-hidden p-6">
            {activeTab === 'editor' && (
              <div className="flex-1 flex flex-col h-full">
                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setIsSaved(false);
                  }}
                  onSelect={(e) => {
                    const target = e.currentTarget;
                    const sel = target.value
                      .substring(target.selectionStart, target.selectionEnd)
                      .trim();
                    if (sel.length > 15) {
                      setSelectedPassageText(sel);
                    }
                  }}
                  placeholder="Begin drafting chapter prose here... Select any passage with your cursor to pin it, test a Technique Pack, or stage a targeted revision."
                  className="flex-1 w-full bg-stone-950 text-stone-200 font-serif text-base leading-relaxed p-5 border border-stone-800 rounded-xl focus:border-stone-700 focus:outline-none resize-none selection:bg-amber-500/30"
                  spellCheck="false"
                />
                <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-stone-400 px-1 tabular-nums">
                  <div className="flex items-center gap-4">
                    <span>{wordCount.toLocaleString()} words</span>
                    <span>{charCount.toLocaleString()} characters</span>
                    <span>{paragraphs.length} paragraphs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Provenance:</span>
                    <span className="text-amber-400 font-semibold uppercase">
                      {currentChapter.provenance.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ANNOTATED PASSAGE & PARAGRAPH WORKBENCH */}
            {activeTab === 'passages' && (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
                <div className="lg:col-span-2 overflow-y-auto pr-2 space-y-3">
                  <div className="text-xs font-mono text-stone-400 mb-2">
                    Click any paragraph below to select it for technique testing, annotation, pinning, or targeted revision:
                  </div>
                  {paragraphs.map((para, idx) => {
                    const isHighlighted =
                      selectedPassageText &&
                      (para.includes(selectedPassageText) ||
                        selectedPassageText.includes(para));
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedPassageText(para)}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all font-serif text-sm leading-relaxed ${
                          isHighlighted
                            ? 'border-amber-500 bg-amber-950/20 text-stone-100 shadow-md'
                            : 'border-stone-800/70 bg-[#0e0e11] hover:border-stone-700 text-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-1">
                          <span>Paragraph #{idx + 1}</span>
                          {isHighlighted && (
                            <span className="text-amber-400 font-semibold">
                              Selected Passage
                            </span>
                          )}
                        </div>
                        <p>{para}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Passage Annotations & Analytical Notes Column */}
                <div className="border-l border-stone-800 pl-6 flex flex-col overflow-hidden space-y-4">
                  <div className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>Passage Annotations & Evidence Notes</span>
                  </div>

                  {selectedPassageText ? (
                    <div className="p-3.5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-2.5 text-xs font-mono">
                      <div className="text-[10px] uppercase text-stone-400">
                        Annotate Selected Passage:
                      </div>
                      <blockquote className="text-xs font-serif italic text-stone-300 line-clamp-3 border-l-2 border-amber-500 pl-2">
                        &ldquo;{selectedPassageText}&rdquo;
                      </blockquote>
                      <select
                        value={newAnnotationCat}
                        onChange={(e) =>
                          setNewAnnotationCat(
                            e.target.value as PassageAnnotation['category']
                          )
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded p-1.5 text-stone-200"
                      >
                        <option value="technique_evidence">
                          Technique Execution Evidence
                        </option>
                        <option value="causal_anchor">Causal Event Anchor</option>
                        <option value="continuity_flag">Continuity Note</option>
                        <option value="character_psychology">
                          Character Psychology / Epistemic State
                        </option>
                        <option value="open_question">Open Question</option>
                      </select>
                      <textarea
                        rows={2}
                        value={newAnnotationNote}
                        onChange={(e) => setNewAnnotationNote(e.target.value)}
                        placeholder="Record analytical observation on this passage..."
                        className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                      />
                      <button
                        onClick={handleAddAnnotation}
                        className="w-full py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold"
                      >
                        Save Passage Annotation
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 border border-stone-800/60 rounded-lg bg-stone-900/20 text-xs font-mono text-stone-400">
                      Click any paragraph on the left to attach an analytical annotation or send it to the Technique Workbench.
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto space-y-2.5">
                    {(currentChapter.annotations || []).map((ann) => (
                      <div
                        key={ann.id}
                        onClick={() => setSelectedPassageText(ann.excerpt)}
                        className="p-3 border border-stone-800 rounded-lg bg-[#0e0e11] cursor-pointer space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-amber-400 uppercase">
                            {ann.category.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <blockquote className="text-[11px] font-serif italic text-stone-400 line-clamp-2">
                          &ldquo;{ann.excerpt}&rdquo;
                        </blockquote>
                        <p className="text-xs text-stone-200">{ann.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: REVISIONS */}
            {activeTab === 'history' && (
              <div className="flex-1 overflow-y-auto space-y-3">
                {currentChapter.revisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 border border-stone-800 bg-[#0e0e11] rounded-xl flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="px-2 py-0.5 rounded bg-stone-800 text-amber-400 uppercase text-[10px] font-bold">
                          {rev.author === 'model'
                            ? `AI (${rev.modelId || 'Gemini'})`
                            : 'Snapshot'}
                        </span>
                        <span className="text-stone-400">
                          {formatTimestamp(rev.timestamp)}
                        </span>
                        <span className="text-stone-400 tabular-nums">
                          • {rev.wordCount.toLocaleString()} words
                        </span>
                      </div>
                      <p className="text-xs text-stone-200 font-medium">
                        {rev.notes}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <button
                        onClick={() => {
                          setSelectedRevisionForDiff(rev);
                          setActiveTab('diff');
                        }}
                        className="px-2.5 py-1 border border-stone-700 hover:bg-stone-800 rounded text-stone-300"
                      >
                        Compare Diff
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: DIFF */}
            {activeTab === 'diff' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-3 text-xs font-mono text-stone-400">
                  <div className="flex items-center gap-2">
                    <span>Baseline Snapshot:</span>
                    <select
                      value={selectedRevisionForDiff?.id || ''}
                      onChange={(e) => {
                        const target = currentChapter.revisions.find(
                          (r) => r.id === e.target.value
                        );
                        setSelectedRevisionForDiff(target || null);
                      }}
                      className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-stone-200"
                    >
                      {currentChapter.revisions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {formatTimeOnly(r.timestamp)} ({r.notes})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDiffViewMode('split')}
                      className={`px-2 py-1 rounded ${
                        diffViewMode === 'split'
                          ? 'bg-stone-800 text-stone-100'
                          : 'text-stone-400'
                      }`}
                    >
                      Side-by-Side
                    </button>
                    <button
                      onClick={() => setDiffViewMode('unified')}
                      className={`px-2 py-1 rounded ${
                        diffViewMode === 'unified'
                          ? 'bg-stone-800 text-stone-100'
                          : 'text-stone-400'
                      }`}
                    >
                      Unified Lines
                    </button>
                  </div>
                </div>

                {diffViewMode === 'split' ? (
                  <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
                    <div className="flex flex-col border border-stone-800 rounded-xl bg-stone-950 overflow-hidden">
                      <div className="p-2.5 border-b border-stone-800 bg-stone-900/60 text-xs font-mono text-stone-400">
                        Baseline ({selectedRevisionForDiff?.notes || 'Snapshot'})
                      </div>
                      <div className="p-4 overflow-y-auto flex-1 font-serif text-sm text-stone-400 whitespace-pre-wrap leading-relaxed">
                        {selectedRevisionForDiff?.content || ''}
                      </div>
                    </div>
                    <div className="flex flex-col border border-stone-800 rounded-xl bg-stone-950 overflow-hidden">
                      <div className="p-2.5 border-b border-stone-800 bg-stone-900/60 text-xs font-mono text-amber-400">
                        Working Buffer ({wordCount.toLocaleString()} words)
                      </div>
                      <div className="p-4 overflow-y-auto flex-1 font-serif text-sm text-stone-200 whitespace-pre-wrap leading-relaxed">
                        {content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 border border-stone-800 rounded-xl bg-stone-950 overflow-y-auto p-4 font-serif text-xs space-y-1">
                    {content.split('\n').map((line, i) => (
                      <div key={i} className="text-stone-300">
                        {line || '\u00A0'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: NOTES & SCHEME OF WORK LINKAGE */}
            {activeTab === 'notes' && (
              <div className="flex-1 overflow-y-auto space-y-6 max-w-3xl">
                <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-amber-400 font-semibold">
                    Linked Scheme of Work
                  </h4>
                  <select
                    value={targetPlanId}
                    onChange={(e) => {
                      setTargetPlanId(e.target.value);
                      setIsSaved(false);
                    }}
                    className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-xs text-stone-200 font-mono"
                  >
                    <option value="">No Plan Linked</option>
                    {schemesOfWork.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.scope})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-stone-300 font-semibold">
                    Chapter Notes & Provenance Record
                  </h4>
                  <textarea
                    rows={6}
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      setIsSaved(false);
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-xs font-mono text-stone-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Drawer: Context-Rich AI Orchestrator */}
          {isAiPanelOpen && (
            <div className="w-96 border-l border-stone-800 bg-[#0c0c0e] flex flex-col h-full overflow-hidden flex-shrink-0">
              <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Context-Rich AI Orchestrator</span>
                </div>
                <button
                  onClick={() => setIsAiPanelOpen(false)}
                  className="p-1 hover:bg-stone-800 rounded text-stone-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTaskType('prose_revision')}
                    className={`p-2 rounded border text-left ${
                      taskType === 'prose_revision'
                        ? 'border-amber-500 bg-amber-950/30 text-amber-300'
                        : 'border-stone-800 bg-stone-900/40 text-stone-400'
                    }`}
                  >
                    Revise Prose
                  </button>
                  <button
                    onClick={() => setTaskType('draft_generation')}
                    className={`p-2 rounded border text-left ${
                      taskType === 'draft_generation'
                        ? 'border-amber-500 bg-amber-950/30 text-amber-300'
                        : 'border-stone-800 bg-stone-900/40 text-stone-400'
                    }`}
                  >
                    Continue Scene
                  </button>
                </div>

                {/* Target Scope */}
                <div>
                  <label className="text-[10px] uppercase text-stone-400 block mb-1">
                    Context Scope
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAiScope('selected_passage')}
                      className={`p-2 rounded border text-[11px] ${
                        aiScope === 'selected_passage'
                          ? 'border-amber-500/80 bg-stone-900 text-stone-100'
                          : 'border-stone-800 text-stone-400'
                      }`}
                    >
                      Selected Passage ({selectedPassageText ? 'Active' : 'None'})
                    </button>
                    <button
                      onClick={() => setAiScope('full_chapter')}
                      className={`p-2 rounded border text-[11px] ${
                        aiScope === 'full_chapter'
                          ? 'border-amber-500/80 bg-stone-900 text-stone-100'
                          : 'border-stone-800 text-stone-400'
                      }`}
                    >
                      Full Chapter
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-stone-400 block mb-1">
                    Target Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-stone-200"
                  >
                    {SUPPORTED_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.displayName} ({m.tier})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Technique Packs */}
                <div>
                  <label className="text-[10px] uppercase text-stone-400 block mb-1">
                    Compiled Technique Packs ({activePackIds.length})
                  </label>
                  <div className="space-y-1.5 p-2.5 bg-stone-950 border border-stone-800 rounded">
                    {techniquePacks.map((pack) => {
                      const isChecked = activePackIds.includes(pack.id);
                      return (
                        <label
                          key={pack.id}
                          className="flex items-center gap-2 text-stone-300 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setActivePackIds([...activePackIds, pack.id]);
                              } else {
                                setActivePackIds(
                                  activePackIds.filter((id) => id !== pack.id)
                                );
                              }
                            }}
                          />
                          <span className="truncate">{pack.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-stone-400 block mb-1">
                    Specific Directives
                  </label>
                  <textarea
                    rows={3}
                    value={aiDirectives}
                    onChange={(e) => setAiDirectives(e.target.value)}
                    placeholder={
                      taskType === 'draft_generation'
                        ? 'E.g. Draft Ira arriving at the Minami-Kuoh municipal library to verify the Kanagawa Prefectural Educational Development Association address...'
                        : 'E.g. Sharpen the somatic-cognitive duality and remove filter verbs in this passage...'
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                  />
                </div>

                <button
                  onClick={() => setShowPromptInspection(!showPromptInspection)}
                  className="w-full py-1.5 border border-stone-800 rounded text-[11px] text-stone-400 hover:text-stone-200 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {showPromptInspection
                      ? 'Hide Compiled Prompt'
                      : 'Inspect Assembled Context & Prompt'}
                  </span>
                </button>

                {showPromptInspection && (
                  <pre className="p-3 bg-stone-950 border border-stone-800 rounded max-h-40 overflow-y-auto text-[10px] text-stone-400 whitespace-pre-wrap">
                    {compiledInstruction.systemPromptBlock}
                  </pre>
                )}

                {aiError && (
                  <div className="p-3 bg-red-950/60 border border-red-800 rounded text-red-300">
                    {aiError}
                  </div>
                )}

                <button
                  onClick={handleExecuteAi}
                  disabled={isExecutingAi}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-semibold rounded flex items-center justify-center gap-2"
                >
                  {isExecutingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Execute Task</span>
                    </>
                  )}
                </button>

                {generatedOutput && (
                  <div className="p-3.5 border border-amber-500/60 bg-amber-950/10 rounded-lg space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-amber-400">
                      <span>Model: {generatedOutput.modelId}</span>
                      <span>{generatedOutput.latencyMs}ms</span>
                    </div>
                    <div className="p-3 bg-stone-950 border border-stone-800 rounded font-serif text-xs text-stone-100 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                      {generatedOutput.text}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPassageText && (
                        <button
                          onClick={() => handleAcceptAiOutput('replace_passage')}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-semibold rounded text-[11px]"
                        >
                          Replace Passage
                        </button>
                      )}
                      <button
                        onClick={() => handleAcceptAiOutput('append')}
                        className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-[11px]"
                      >
                        Append to Draft
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Import Chapter Modal */}
      {isImportChapterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl max-w-lg w-full p-6 space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-stone-100 font-semibold">
                Import Chapter Manuscript
              </span>
              <button
                onClick={() => setIsImportChapterModalOpen(false)}
                className="text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={importChapterNumber}
                onChange={(e) => setImportChapterNumber(e.target.value)}
                placeholder="Ch #"
                className="bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
              />
              <input
                type="text"
                value={importChapterTitle}
                onChange={(e) => setImportChapterTitle(e.target.value)}
                placeholder="Chapter Title *"
                className="col-span-2 bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
              />
            </div>
            <select
              value={importChapterProvenance}
              onChange={(e) =>
                setImportChapterProvenance(e.target.value as ProvenanceType)
              }
              className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
            >
              <option value="local_working_draft">Local Working Draft</option>
              <option value="imported_external">Imported External Source</option>
              <option value="ledger_authoritative">
                Authoritative Ledger Record
              </option>
            </select>
            <input
              type="text"
              value={importChapterSourceId}
              onChange={(e) => setImportChapterSourceId(e.target.value)}
              placeholder="Source Identifier / Commit SHA (Optional)"
              className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-stone-200"
            />
            <textarea
              rows={8}
              value={importChapterContent}
              onChange={(e) => setImportChapterContent(e.target.value)}
              placeholder="Paste full chapter prose..."
              className="w-full bg-stone-900 border border-stone-800 rounded p-2 font-serif text-stone-200"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsImportChapterModalOpen(false)}
                className="px-3 py-1.5 border border-stone-800 rounded text-stone-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!importChapterTitle.trim()) return;
                  const now = generateTimestamp();
                  const newChap: ChapterDraft = {
                    id: generateId('chap_imp'),
                    title: importChapterTitle.trim(),
                    chapterNumber: importChapterNumber || chapters.length + 1,
                    provenance: importChapterProvenance,
                    sourceIdentifier: importChapterSourceId || undefined,
                    currentContent: importChapterContent,
                    notes: `Imported chapter (${importChapterProvenance}).`,
                    writingObjectives: ['Audit against active scheme of work'],
                    constraints: ['Preserve canonical continuity'],
                    activeTechniquePackIds: [],
                    revisions: [
                      {
                        id: generateId('rev_imp'),
                        timestamp: now,
                        author: 'user',
                        notes: 'Initial import snapshot',
                        content: importChapterContent,
                        wordCount: importChapterContent.trim()
                          ? importChapterContent.trim().split(/\s+/).length
                          : 0,
                      },
                    ],
                    createdAt: now,
                    updatedAt: now,
                  };
                  onCreateChapter(newChap);
                  onSelectChapter(newChap.id);
                  setIsImportChapterModalOpen(false);
                }}
                className="px-4 py-1.5 bg-amber-500 text-stone-950 font-semibold rounded"
              >
                Import Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
