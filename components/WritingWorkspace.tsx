'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ChapterDraft, 
  Revision, 
  TechniquePack, 
  SchemeOfWork, 
  AIExecutionLog,
  ProvenanceType 
} from '@/types/domain';
import { generateTimestamp, generateId, formatTimestamp, formatTimeOnly } from '@/lib/utils';
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
  FileCheck, 
  AlertCircle, 
  Layers, 
  Check, 
  X, 
  Clock, 
  Copy, 
  Eye, 
  Send,
  Loader2,
  Trash2,
  ExternalLink,
  Target,
  Upload
} from 'lucide-react';

interface WritingWorkspaceProps {
  chapters: ChapterDraft[];
  techniquePacks: TechniquePack[];
  schemesOfWork: SchemeOfWork[];
  activeChapterId?: string;
  onUpdateChapter: (chapter: ChapterDraft) => void;
  onCreateChapter: (chapter: ChapterDraft) => void;
  onDeleteChapter: (chapterId: string) => void;
  onLogExecution: (log: AIExecutionLog) => void;
  onSelectChapter: (id: string) => void;
}

export default function WritingWorkspace({
  chapters,
  techniquePacks,
  schemesOfWork,
  activeChapterId,
  onUpdateChapter,
  onCreateChapter,
  onDeleteChapter,
  onLogExecution,
  onSelectChapter,
}: WritingWorkspaceProps) {
  // Current active chapter
  const currentChapter = useMemo(() => {
    return chapters.find((c) => c.id === activeChapterId) || chapters[0] || null;
  }, [chapters, activeChapterId]);

  // Local draft state for editing
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [chapterNumber, setChapterNumber] = useState<string | number>('1');
  const [notes, setNotes] = useState<string>('');
  const [targetPlanId, setTargetPlanId] = useState<string>('');
  const [activePackIds, setActivePackIds] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'history' | 'diff' | 'notes'>('editor');
  
  // Diff viewer state
  const [selectedRevisionForDiff, setSelectedRevisionForDiff] = useState<Revision | null>(null);
  const [diffViewMode, setDiffViewMode] = useState<'split' | 'unified'>('split');

  // Chapter Import modal state
  const [isImportChapterModalOpen, setIsImportChapterModalOpen] = useState<boolean>(false);
  const [importChapterNumber, setImportChapterNumber] = useState<string>('2');
  const [importChapterTitle, setImportChapterTitle] = useState<string>('');
  const [importChapterProvenance, setImportChapterProvenance] = useState<ProvenanceType>('imported_external');
  const [importChapterSourceId, setImportChapterSourceId] = useState<string>('');
  const [importChapterContent, setImportChapterContent] = useState<string>('');

  // AI Orchestration Panel state
  const [isAiPanelOpen, setIsAiPanelOpen] = useState<boolean>(false);
  const [taskType, setTaskType] = useState<'draft_generation' | 'prose_revision'>('draft_generation');
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL_ID);
  const [aiDirectives, setAiDirectives] = useState<string>('');
  const [showPromptInspection, setShowPromptInspection] = useState<boolean>(false);
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

  // Track active chapter id to reset local editor state during switch
  const [prevChapterId, setPrevChapterId] = useState<string | undefined>(currentChapter?.id);

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

  // Word count & paragraph calculations
  const wordCount = useMemo(() => {
    const trimmed = content.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [content]);

  const charCount = useMemo(() => content.length, [content]);

  // Handle changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  // Save changes
  const handleSaveDraft = (createRevision = false, revNotes = 'Manual save') => {
    if (!currentChapter) return;

    let updatedRevisions = [...currentChapter.revisions];
    if (createRevision || updatedRevisions.length === 0) {
      const newRev: Revision = {
        id: generateId('rev'),
        timestamp: generateTimestamp(),
        author: 'user',
        notes: revNotes,
        content: content,
        wordCount: wordCount,
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

  // Create new chapter
  const handleCreateNewChapter = () => {
    const newChapNum = chapters.length + 1;
    const now = generateTimestamp();
    const newChap: ChapterDraft = {
      id: generateId('chap_user'),
      title: `Chapter ${newChapNum}: Untitled Draft`,
      chapterNumber: newChapNum,
      provenance: 'local_working_draft',
      currentContent: '',
      notes: '',
      writingObjectives: ['Draft initial scene opening', 'Apply selected technique discipline'],
      constraints: ['Third-person focalization'],
      targetPlanId: schemesOfWork[0]?.id,
      activeTechniquePackIds: techniquePacks[0] ? [techniquePacks[0].id] : [],
      revisions: [],
      createdAt: now,
      updatedAt: now,
    };
    onCreateChapter(newChap);
    onSelectChapter(newChap.id);
  };

  // Import existing chapter text
  const handleImportChapterSubmit = () => {
    if (!importChapterTitle.trim()) {
      alert('Please provide a title for the imported chapter.');
      return;
    }
    const newId = generateId('chap_imp');
    const now = generateTimestamp();
    const newChap: ChapterDraft = {
      id: newId,
      title: importChapterTitle,
      chapterNumber: importChapterNumber || String(chapters.length + 1),
      provenance: importChapterProvenance,
      sourceIdentifier: importChapterSourceId || undefined,
      currentContent: importChapterContent,
      notes: `Imported chapter source. Retains provenance: ${importChapterProvenance}.`,
      writingObjectives: ['Preserve imported canon text', 'Audit against active plans'],
      constraints: ['Respect canonical source bounds'],
      targetPlanId: schemesOfWork[0]?.id,
      activeTechniquePackIds: techniquePacks[0] ? [techniquePacks[0].id] : [],
      revisions: [
        {
          id: generateId('rev_imp'),
          timestamp: now,
          author: 'user',
          notes: `Imported initial text (${importChapterProvenance})`,
          content: importChapterContent,
          wordCount: importChapterContent.trim() ? importChapterContent.trim().split(/\s+/).length : 0,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    onCreateChapter(newChap);
    onSelectChapter(newChap.id);
    setIsImportChapterModalOpen(false);
    setImportChapterTitle('');
    setImportChapterContent('');
    setImportChapterSourceId('');
  };

  // Compile active technique packs for inspection or execution
  const compiledInstruction = useMemo(() => {
    const selectedPacks = techniquePacks.filter((p) => activePackIds.includes(p.id));
    const versionMap: Record<string, string> = {};
    selectedPacks.forEach((p) => {
      versionMap[p.id] = p.currentVersion;
    });
    return compileTechniquePacks(
      selectedPacks,
      versionMap,
      taskType === 'draft_generation' ? 'Scene Drafting' : 'Prose Revision',
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
        .map((m) => `[Milestone: ${m.title}]\nIntended: ${m.intendedEvents.join(', ')}`)
        .join('\n\n');

      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType,
          modelId: selectedModel,
          userPrompt: aiDirectives || (taskType === 'draft_generation' ? 'Continue this chapter scene.' : 'Enhance prose cadence and psychological resonance.'),
          contextText: content,
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

      // Log execution
      const logEntry: AIExecutionLog = {
        id: generateId('exec'),
        timestamp: generateTimestamp(),
        provider: 'gemini',
        modelId: data.modelId,
        taskType: taskType,
        chapterId: currentChapter.id,
        techniquePackIds: activePackIds,
        inputPromptSummary: aiDirectives || `Task: ${taskType}`,
        rawInputPrompt: data.rawInputSummary,
        rawOutputText: data.outputText,
        status: 'success',
        latencyMs: data.latencyMs,
        promptTokens: data.promptTokens,
        completionTokens: data.completionTokens,
        totalTokens: data.totalTokens,
        estimatedCostUsd: data.estimatedCostUsd,
      };
      onLogExecution(logEntry);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setAiError(msg);

      // Log failure
      const failLog: AIExecutionLog = {
        id: generateId('exec_fail'),
        timestamp: generateTimestamp(),
        provider: 'gemini',
        modelId: selectedModel,
        taskType: taskType,
        chapterId: currentChapter?.id,
        techniquePackIds: activePackIds,
        inputPromptSummary: aiDirectives || `Task: ${taskType} (Failed)`,
        status: 'failed',
        errorMessage: msg,
        latencyMs: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        estimatedCostUsd: 0,
      };
      onLogExecution(failLog);
    } finally {
      setIsExecutingAi(false);
    }
  };

  // Accept AI generated proposal
  const handleAcceptAiOutput = (mode: 'replace' | 'append') => {
    if (!generatedOutput || !currentChapter) return;

    let newContent = '';
    if (mode === 'replace') {
      newContent = generatedOutput.text;
    } else {
      newContent = content ? `${content}\n\n${generatedOutput.text}` : generatedOutput.text;
    }

    setContent(newContent);
    setIsSaved(false);

    // Save as explicit revision with model attribution
    const newRev: Revision = {
      id: generateId('rev_ai'),
      timestamp: generateTimestamp(),
      author: 'model',
      modelId: generatedOutput.modelId,
      notes: `AI ${taskType === 'draft_generation' ? 'Generation' : 'Revision'} accepted (${mode})`,
      content: newContent,
      wordCount: newContent.trim().split(/\s+/).length,
      techniquePackIds: activePackIds,
    };

    const updatedChapter: ChapterDraft = {
      ...currentChapter,
      currentContent: newContent,
      revisions: [newRev, ...currentChapter.revisions],
      updatedAt: generateTimestamp(),
    };

    onUpdateChapter(updatedChapter);
    setGeneratedOutput(null);
    setIsAiPanelOpen(false);
  };

  // Restore previous revision
  const handleRestoreRevision = (rev: Revision) => {
    if (confirm(`Restore revision from ${formatTimeOnly(rev.timestamp)}? Current unsaved edits will be preserved in a new revision.`)) {
      handleSaveDraft(true, 'Checkpoint before revision restore');
      setContent(rev.content);
      setIsSaved(false);
      setActiveTab('editor');
    }
  };

  if (!currentChapter) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-400 p-8 space-y-4">
        <BookOpen className="w-12 h-12 text-stone-600" />
        <h3 className="text-lg font-medium text-stone-200">No Chapters in Workspace</h3>
        <p className="text-xs text-stone-500 max-w-sm text-center">
          Begin drafting by creating your first chapter entry or importing an existing manuscript.
        </p>
        <button
          onClick={handleCreateNewChapter}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold rounded text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Chapter 1
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Chapter Navigation Column */}
      <div className="w-64 border-r border-stone-800 bg-stone-950 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Chapter Drafts</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsImportChapterModalOpen(true)}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200 transition-colors"
              title="Import Chapter Text"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={handleCreateNewChapter}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200 transition-colors"
              title="Create New Chapter"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chapters.map((chap) => {
            const isSelected = chap.id === currentChapter.id;
            return (
              <div
                key={chap.id}
                onClick={() => onSelectChapter(chap.id)}
                className={`p-3 rounded border text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-stone-900 border-stone-700 text-stone-100'
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-amber-500/90 font-medium">Ch. {chap.chapterNumber}</span>
                  <span className="text-stone-500 text-[10px]">
                    {chap.currentContent.trim() ? `${chap.currentContent.trim().split(/\s+/).length} words` : '0 words'}
                  </span>
                </div>
                <div className="text-xs font-medium truncate text-stone-200">
                  {chap.title}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase border ${
                    chap.provenance === 'ledger_authoritative' 
                      ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-400'
                      : chap.provenance === 'imported_external'
                      ? 'border-blue-800/80 bg-blue-950/40 text-blue-400'
                      : 'border-stone-700 bg-stone-900 text-stone-400'
                  }`}>
                    {chap.provenance.replace('_', ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Editor & Work Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-stone-950">
        {/* Editor Sub-Header Toolbar */}
        <div className="p-4 border-b border-stone-800 bg-stone-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <span className="font-mono text-xs text-amber-500 font-semibold flex-shrink-0">
              CH. {chapterNumber}
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsSaved(false);
              }}
              placeholder="Chapter Title..."
              className="bg-transparent border-b border-stone-700 focus:border-amber-500 px-1 py-0.5 text-sm font-serif font-medium text-stone-100 focus:outline-none w-full max-w-md"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* View Tabs */}
            <div className="flex items-center rounded border border-stone-800 bg-stone-900 p-0.5 text-xs font-mono">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'editor' ? 'bg-stone-800 text-stone-100 font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'history' ? 'bg-stone-800 text-stone-100 font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <History className="w-3 h-3" />
                <span>Revisions ({currentChapter.revisions.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('diff')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'diff' ? 'bg-stone-800 text-stone-100 font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Columns className="w-3 h-3" />
                <span>Diff</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'notes' ? 'bg-stone-800 text-stone-100 font-medium' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Target className="w-3 h-3" />
                <span>Notes & Plan</span>
              </button>
            </div>

            {/* Save Status & Action */}
            <button
              onClick={() => handleSaveDraft(true, 'Manual snapshot revision')}
              className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'border border-stone-800 text-stone-400 bg-stone-900/60 hover:bg-stone-800'
                  : 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved Snapshot' : 'Save Draft*'}</span>
            </button>

            {/* AI Orchestrator Toggle Button */}
            <button
              onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
              className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                isAiPanelOpen 
                  ? 'bg-amber-500 text-stone-950 font-semibold' 
                  : 'bg-stone-800 border border-stone-700 text-amber-400 hover:bg-stone-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Orchestrator</span>
            </button>

            {/* Export Markdown */}
            <button
              onClick={() => exportChapterToMarkdown(title, chapterNumber, content)}
              className="p-1.5 rounded border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
              title="Export as Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body Based on Tab */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main Editing / Viewing Pane */}
          <div className="flex-1 flex flex-col h-full overflow-hidden p-6">
            {activeTab === 'editor' && (
              <div className="flex-1 flex flex-col h-full">
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Begin drafting chapter prose here... Unicode, dialogue formatting, and paragraph rhythm will be strictly preserved."
                  className="flex-1 w-full bg-stone-950 text-stone-200 font-serif text-base leading-relaxed p-4 border border-stone-800 rounded focus:border-stone-700 focus:outline-none resize-none placeholder:text-stone-600 placeholder:font-sans selection:bg-stone-800"
                  spellCheck="false"
                />
                {/* Word & Metrics Footer */}
                <div className="mt-2 flex items-center justify-between text-xs font-mono text-stone-500 px-1">
                  <div className="flex items-center gap-4">
                    <span>{wordCount.toLocaleString()} words</span>
                    <span>{charCount.toLocaleString()} characters</span>
                    <span>{content.split(/\n\s*\n/).filter(Boolean).length} paragraphs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-600">Provenance:</span>
                    <span className="text-stone-400 font-semibold uppercase">{currentChapter.provenance}</span>
                    {currentChapter.sourceIdentifier && (
                      <span className="text-stone-600">({currentChapter.sourceIdentifier})</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="flex-1 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-mono uppercase text-stone-300">
                    Revision Audit Trail ({currentChapter.revisions.length} Snapshots)
                  </h3>
                  <button
                    onClick={() => handleSaveDraft(true, 'Manual revision checkpoint')}
                    className="text-xs px-2.5 py-1 bg-stone-800 border border-stone-700 text-stone-300 hover:text-white rounded flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create New Snapshot
                  </button>
                </div>

                {currentChapter.revisions.length === 0 ? (
                  <p className="text-xs text-stone-500">No previous revisions recorded yet. Save snapshots as you write.</p>
                ) : (
                  currentChapter.revisions.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 border border-stone-800 bg-stone-900/30 rounded flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                            rev.author === 'model'
                              ? 'bg-amber-950/80 text-amber-400 border border-amber-800/80'
                              : 'bg-stone-800 text-stone-300'
                          }`}>
                            {rev.author === 'model' ? `AI (${rev.modelId || 'Gemini'})` : 'Author'}
                          </span>
                          <span className="text-stone-400">
                            {formatTimestamp(rev.timestamp)}
                          </span>
                          <span className="text-stone-500">• {rev.wordCount} words</span>
                        </div>
                        <p className="text-xs text-stone-300 font-medium">{rev.notes || 'No description'}</p>
                        <p className="text-[11px] text-stone-500 font-mono line-clamp-2 max-w-2xl">
                          {rev.content.substring(0, 180)}...
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedRevisionForDiff(rev);
                            setActiveTab('diff');
                          }}
                          className="px-2.5 py-1 text-xs font-mono border border-stone-700 hover:bg-stone-800 rounded text-stone-300"
                        >
                          Compare
                        </button>
                        <button
                          onClick={() => handleRestoreRevision(rev)}
                          className="px-2.5 py-1 text-xs font-mono bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium rounded"
                        >
                          Restore
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'diff' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-stone-800 mb-3 text-xs font-mono text-stone-400 gap-2">
                  <div className="flex items-center gap-2">
                    <span>Comparing with:</span>
                    <select
                      value={selectedRevisionForDiff?.id || ''}
                      onChange={(e) => {
                        const target = currentChapter.revisions.find((r) => r.id === e.target.value);
                        setSelectedRevisionForDiff(target || null);
                      }}
                      className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200"
                    >
                      {currentChapter.revisions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {formatTimeOnly(r.timestamp)} ({r.author} - {r.wordCount} words)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded border border-stone-800 bg-stone-900 p-0.5 text-[11px]">
                      <button
                        onClick={() => setDiffViewMode('split')}
                        className={`px-2 py-0.5 rounded ${diffViewMode === 'split' ? 'bg-stone-800 text-stone-100 font-semibold' : 'text-stone-400'}`}
                      >
                        Side-by-Side
                      </button>
                      <button
                        onClick={() => setDiffViewMode('unified')}
                        className={`px-2 py-0.5 rounded ${diffViewMode === 'unified' ? 'bg-stone-800 text-stone-100 font-semibold' : 'text-stone-400'}`}
                      >
                        Line Changes
                      </button>
                    </div>

                    <span>
                      Delta: {wordCount - (selectedRevisionForDiff?.wordCount || 0)} words
                    </span>
                  </div>
                </div>

                {diffViewMode === 'split' ? (
                  <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
                    <div className="flex flex-col border border-stone-800 rounded bg-stone-950 overflow-hidden">
                      <div className="p-2 border-b border-stone-800 bg-stone-900/60 text-xs font-mono text-stone-400">
                        Baseline Snapshot ({selectedRevisionForDiff ? formatTimeOnly(selectedRevisionForDiff.timestamp) : 'None'})
                      </div>
                      <div className="p-4 overflow-y-auto flex-1 font-serif text-sm text-stone-400 whitespace-pre-wrap leading-relaxed">
                        {selectedRevisionForDiff?.content || 'Select a revision above to compare.'}
                      </div>
                    </div>

                    <div className="flex flex-col border border-stone-800 rounded bg-stone-950 overflow-hidden">
                      <div className="p-2 border-b border-stone-800 bg-stone-900/60 text-xs font-mono text-amber-400">
                        Current Working Draft ({wordCount} words)
                      </div>
                      <div className="p-4 overflow-y-auto flex-1 font-serif text-sm text-stone-200 whitespace-pre-wrap leading-relaxed">
                        {content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 border border-stone-800 rounded bg-stone-950 overflow-y-auto p-4 font-mono text-xs space-y-1">
                    {(() => {
                      const baseLines = (selectedRevisionForDiff?.content || '').split('\n');
                      const currLines = content.split('\n');
                      const maxLines = Math.max(baseLines.length, currLines.length);
                      const rows = [];
                      for (let i = 0; i < maxLines; i++) {
                        const b = baseLines[i];
                        const c = currLines[i];
                        if (b === c) {
                          rows.push(
                            <div key={i} className="flex gap-3 text-stone-500 py-0.5 font-serif">
                              <span className="w-8 select-none text-[10px] text-stone-600 font-mono">{i + 1}</span>
                              <span className="w-4 select-none text-stone-600 font-mono"> </span>
                              <span className="text-stone-300">{c || '\u00A0'}</span>
                            </div>
                          );
                        } else {
                          if (b !== undefined) {
                            rows.push(
                              <div key={`del-${i}`} className="flex gap-3 bg-red-950/40 text-red-300 border-l-2 border-red-500 px-1 py-0.5 font-serif">
                                <span className="w-8 select-none text-[10px] text-red-500/70 font-mono">{i + 1}</span>
                                <span className="w-4 select-none font-bold text-red-400 font-mono">-</span>
                                <span>{b || '\u00A0'}</span>
                              </div>
                            );
                          }
                          if (c !== undefined) {
                            rows.push(
                              <div key={`add-${i}`} className="flex gap-3 bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 px-1 py-0.5 font-serif">
                                <span className="w-8 select-none text-[10px] text-emerald-500/70 font-mono">{i + 1}</span>
                                <span className="w-4 select-none font-bold text-emerald-400 font-mono">+</span>
                                <span>{c || '\u00A0'}</span>
                              </div>
                            );
                          }
                        }
                      }
                      return rows;
                    })()}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="flex-1 overflow-y-auto space-y-6 max-w-3xl">
                {/* Scheme of Work Linkage */}
                <div className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-amber-500 font-semibold flex items-center gap-2">
                    <Target className="w-3.5 h-3.5" />
                    <span>Linked Scheme of Work / Chapter Plan</span>
                  </h4>
                  <select
                    value={targetPlanId}
                    onChange={(e) => {
                      setTargetPlanId(e.target.value);
                      setIsSaved(false);
                    }}
                    className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">No Plan Linked</option>
                    {schemesOfWork.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.scope})
                      </option>
                    ))}
                  </select>
                  {targetPlanId && (
                    <div className="text-xs text-stone-400 pt-2 font-mono">
                      Milestone beats from this plan will be automatically included in AI context when drafting.
                    </div>
                  )}
                </div>

                {/* Chapter Objectives */}
                <div className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-stone-300 font-semibold">
                    Writing Objectives
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-400 font-mono">
                    {currentChapter.writingObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Internal Chapter Notes */}
                <div className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-stone-300 font-semibold">
                    Scene Notes & Continuity Constraints
                  </h4>
                  <textarea
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      setIsSaved(false);
                    }}
                    placeholder="Record notes on character positioning, unrevealed lore, or specific dialogue constraints..."
                    rows={6}
                    className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-xs text-stone-300 focus:outline-none focus:border-stone-700 font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* AI Orchestrator Drawer / Side-Panel */}
          {isAiPanelOpen && (
            <div className="w-96 border-l border-stone-800 bg-stone-950 flex flex-col h-full overflow-hidden flex-shrink-0 animate-in slide-in-from-right duration-200">
              {/* Header */}
              <div className="p-4 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Orchestrator</span>
                </div>
                <button
                  onClick={() => setIsAiPanelOpen(false)}
                  className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Task Selection */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1.5">
                    Orchestration Task
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTaskType('draft_generation')}
                      className={`p-2 rounded text-xs font-mono border text-left ${
                        taskType === 'draft_generation'
                          ? 'border-amber-500 bg-amber-950/30 text-amber-300'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      Draft Scene
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaskType('prose_revision')}
                      className={`p-2 rounded text-xs font-mono border text-left ${
                        taskType === 'prose_revision'
                          ? 'border-amber-500 bg-amber-950/30 text-amber-300'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      Revise Prose
                    </button>
                  </div>
                </div>

                {/* Model Selection */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1.5">
                    Target AI Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-xs font-mono text-stone-200"
                  >
                    {SUPPORTED_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.displayName} ({m.tier})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active Technique Packs */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase text-stone-400">
                      Active Technique Packs
                    </label>
                    <span className="text-[10px] font-mono text-amber-500">
                      {activePackIds.length} attached
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto p-2 bg-stone-900/40 border border-stone-800 rounded">
                    {techniquePacks.map((pack) => {
                      const isChecked = activePackIds.includes(pack.id);
                      return (
                        <label
                          key={pack.id}
                          className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer hover:text-white"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setActivePackIds([...activePackIds, pack.id]);
                              } else {
                                setActivePackIds(activePackIds.filter((id) => id !== pack.id));
                              }
                              setIsSaved(false);
                            }}
                            className="rounded border-stone-700 text-amber-500 focus:ring-0 bg-stone-800"
                          />
                          <span className="truncate">{pack.name}</span>
                          <span className="text-[10px] font-mono text-stone-500 ml-auto">v{pack.currentVersion}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Prompt Directives */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1.5">
                    Directives / Scene Focus
                  </label>
                  <textarea
                    value={aiDirectives}
                    onChange={(e) => setAiDirectives(e.target.value)}
                    placeholder={taskType === 'draft_generation' ? 'E.g., Write the next 400 words as Issei steps under the bridge. Focus on sensory drop...' : 'E.g., Intensify the somatic sensory distortion in paragraphs 2-4.'}
                    rows={3}
                    className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                {/* Inspect Compiled Instructions Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPromptInspection(!showPromptInspection)}
                    className="w-full py-1.5 px-2 border border-stone-800 rounded text-[11px] font-mono text-stone-400 hover:text-stone-200 hover:bg-stone-900 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showPromptInspection ? 'Hide Compiled Prompt' : 'Inspect Compiled Instructions'}</span>
                  </button>
                  {showPromptInspection && (
                    <div className="mt-2 p-3 bg-stone-900 border border-stone-800 rounded max-h-48 overflow-y-auto text-[10px] font-mono text-stone-400 whitespace-pre-wrap">
                      {compiledInstruction.systemPromptBlock}
                    </div>
                  )}
                </div>

                {/* Error Banner */}
                {aiError && (
                  <div className="p-3 bg-red-950/60 border border-red-800/80 rounded text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                    <span className="leading-tight">{aiError}</span>
                  </div>
                )}

                {/* Execute Button */}
                <button
                  type="button"
                  disabled={isExecutingAi}
                  onClick={handleExecuteAi}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-semibold rounded text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  {isExecutingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Executing Model Task...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Execute {selectedModel.split('-')[1]?.toUpperCase() || 'Model'}</span>
                    </>
                  )}
                </button>

                {/* Output Review Card */}
                {generatedOutput && (
                  <div className="p-4 border border-amber-800/80 bg-amber-950/20 rounded space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-amber-400">
                        Generated Proposal Review
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {generatedOutput.totalTokens} tokens ({generatedOutput.latencyMs}ms)
                      </span>
                    </div>

                    <div className="p-3 bg-stone-950 border border-stone-800 rounded max-h-60 overflow-y-auto font-serif text-xs text-stone-200 leading-relaxed whitespace-pre-wrap">
                      {generatedOutput.text}
                    </div>

                    <div className="text-[10px] font-mono text-stone-500">
                      Est. Cost: ${generatedOutput.estimatedCostUsd} • Model will NOT silently overwrite user text.
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAcceptAiOutput('append')}
                        className="py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-mono flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Append to Draft
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAcceptAiOutput('replace')}
                        className="py-1.5 px-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold rounded text-xs font-mono flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Replace Selection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Chapter Import Modal */}
      {isImportChapterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 rounded-lg max-w-xl w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-200">
                <Upload className="w-4 h-4 text-amber-500" />
                <span className="font-semibold">Import Chapter Draft / Source Text</span>
              </div>
              <button
                onClick={() => setIsImportChapterModalOpen(false)}
                className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono overflow-y-auto max-h-[75vh]">
              <div className="p-3 bg-stone-900/40 border border-stone-800 rounded text-stone-400 text-[11px] font-sans">
                Import complete chapters or external drafts directly. Explicitly specify the provenance type and source identifier to prevent working material from being confused with Ledger canonical text.
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 uppercase text-[10px]">Chapter Number</label>
                  <input
                    type="text"
                    value={importChapterNumber}
                    onChange={(e) => setImportChapterNumber(e.target.value)}
                    placeholder="E.g., 2"
                    className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-stone-300 block mb-1 uppercase text-[10px]">Chapter Title *</label>
                  <input
                    type="text"
                    value={importChapterTitle}
                    onChange={(e) => setImportChapterTitle(e.target.value)}
                    placeholder="Chapter Title..."
                    className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 uppercase text-[10px]">Provenance Classification</label>
                  <select
                    value={importChapterProvenance}
                    onChange={(e) => setImportChapterProvenance(e.target.value as ProvenanceType)}
                    className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none"
                  >
                    <option value="imported_external">Imported External Source</option>
                    <option value="ledger_authoritative">Ledger Authoritative (Verified)</option>
                    <option value="local_working_draft">Local Working Draft</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 uppercase text-[10px]">Source Identifier / Ref</label>
                  <input
                    type="text"
                    value={importChapterSourceId}
                    onChange={(e) => setImportChapterSourceId(e.target.value)}
                    placeholder="E.g., LEDGER-DXD-002"
                    className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-300 block mb-1 uppercase text-[10px]">Prose Content *</label>
                <textarea
                  rows={8}
                  value={importChapterContent}
                  onChange={(e) => setImportChapterContent(e.target.value)}
                  placeholder="Paste long-form chapter prose here..."
                  className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="p-4 border-t border-stone-800 bg-stone-900/40 flex justify-end gap-2">
              <button
                onClick={() => setIsImportChapterModalOpen(false)}
                className="px-3 py-1.5 rounded border border-stone-800 hover:bg-stone-800 text-stone-400 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleImportChapterSubmit}
                className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono"
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
