'use client';

import React, { useState, useMemo } from 'react';
import {
  TechniquePack,
  TechniquePackVersion,
  TechniquePackExample,
  TechniqueApplicationRecord,
  ChapterDraft,
  AIExecutionLog,
} from '@/types/domain';
import { compileTechniquePacks } from '@/lib/techniqueCompiler';
import { generateTimestamp, generateId } from '@/lib/utils';
import { DEFAULT_MODEL_ID } from '@/lib/models';
import {
  Layers,
  Plus,
  Copy,
  Check,
  AlertTriangle,
  BookOpen,
  Cpu,
  History,
  FileCode,
  Sparkles,
  Trash2,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Loader2,
  Play,
} from 'lucide-react';

interface TechniquePackStudioProps {
  packs: TechniquePack[];
  chapters?: ChapterDraft[];
  initialSelectedPackId?: string;
  initialPassageForWorkbench?: string;
  onUpdatePack: (pack: TechniquePack) => void;
  onCreatePack: (pack: TechniquePack) => void;
  onDeletePack: (packId: string) => void;
  onNavigateToChapter?: (chapterId: string, excerpt?: string) => void;
  onLogExecution?: (log: AIExecutionLog) => void;
}

type StudioSection =
  | 'q1_what'
  | 'q2_how'
  | 'q3_support'
  | 'q4_apply'
  | 'q5_verify'
  | 'workbench';

export default function TechniquePackStudio({
  packs,
  chapters = [],
  initialSelectedPackId,
  initialPassageForWorkbench,
  onUpdatePack,
  onCreatePack,
  onDeletePack,
  onNavigateToChapter,
  onLogExecution,
}: TechniquePackStudioProps) {
  const [selectedPackId, setSelectedPackId] = useState<string>(
    initialSelectedPackId || packs[0]?.id || ''
  );
  const [activeQuestionTab, setActiveQuestionTab] =
    useState<StudioSection>('q1_what');
  const [viewMode, setViewMode] = useState<'authoring' | 'workbench' | 'compiler'>(
    initialPassageForWorkbench ? 'workbench' : 'authoring'
  );

  // Sync if parent passes a new initialSelectedPackId
  const [prevInitialPackId, setPrevInitialPackId] = useState<string | undefined>(
    initialSelectedPackId
  );
  if (initialSelectedPackId && initialSelectedPackId !== prevInitialPackId) {
    setPrevInitialPackId(initialSelectedPackId);
    setSelectedPackId(initialSelectedPackId);
  }

  // Compiler sandbox state
  const [selectedCompilerPackIds, setSelectedCompilerPackIds] = useState<string[]>(
    packs.slice(0, 2).map((p) => p.id)
  );
  const [compilerTaskContext, setCompilerTaskContext] = useState<string>(
    'Prose Revision & Scene Framing'
  );
  const [compilerCustomConstraints, setCompilerCustomConstraints] =
    useState<string>(
      'Maintain strict limited focalization\nAvoid omniscient lore leaks'
    );
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Live Passage Application Workbench state
  const [wbChapterId, setWbChapterId] = useState<string>(
    chapters[5]?.id || chapters[0]?.id || ''
  );
  const [wbOriginalPassage, setWbOriginalPassage] = useState<string>(
    initialPassageForWorkbench ||
      'For half a heartbeat, the dark shape cast by her hem and shoulders reached five or six inches past where the geometry of the window mullions should have allowed—a sharp, heavy blade of grey that seemed to cling to the timber with an unnatural density.'
  );
  const [wbRevisedPassage, setWbRevisedPassage] = useState<string>('');
  const [wbCheckedProcedures, setWbCheckedProcedures] = useState<string[]>([]);
  const [wbOutcomeStatus, setWbOutcomeStatus] =
    useState<TechniqueApplicationRecord['outcomeStatus']>('effective');
  const [wbObservedNotes, setWbObservedNotes] = useState<string>('');
  const [isRunningAiBench, setIsRunningAiBench] = useState<boolean>(false);
  const [aiBenchError, setAiBenchError] = useState<string | null>(null);

  const activePack = useMemo(() => {
    return packs.find((p) => p.id === selectedPackId) || packs[0] || null;
  }, [packs, selectedPackId]);

  const [selectedVersionNum, setSelectedVersionNum] = useState<string>(
    activePack?.currentVersion || '1.0.0'
  );

  const activeVersion: TechniquePackVersion | null = useMemo(() => {
    if (!activePack) return null;
    return (
      activePack.versions[selectedVersionNum] ||
      activePack.versions[activePack.currentVersion] ||
      null
    );
  }, [activePack, selectedVersionNum]);

  const handleCreateNewPack = () => {
    const newId = generateId('tp_custom');
    const now = generateTimestamp();
    const initialVer = '1.0.0';
    const newPack: TechniquePack = {
      id: newId,
      name: 'New Operational Technique Pack',
      category: 'narrative',
      description:
        'Operational methodology defining principles, causal mechanisms, procedures, and falsifiable prose tests.',
      currentVersion: initialVer,
      tags: ['custom', 'methodology'],
      createdAt: now,
      updatedAt: now,
      applicationRecords: [],
      versions: {
        [initialVer]: {
          versionNumber: initialVer,
          updatedAt: now,
          changelog: 'Initial operational structure created.',
          componentA: {
            principles: 'State the foundational narrative or cognitive principle.',
            formalRepresentation: 'Stimulus(X) -> Mechanism(Y) -> Reader_Effect(Z)',
            coreAssumptions: 'Core assumptions regarding focalizer cognition and reader inference.',
            methodologicalStatus: 'experimental_hypothesis',
          },
          componentB: {
            mechanisms: 'Explain how the technique operates on attention, syntax, or epistemic state.',
            intendedEffects: 'Specific observable impact on tension, pacing, or clarity.',
            psychologicalPhilosophicalRationale: 'Cognitive or literary rationale.',
            limitationsAndRisks: 'Identify where over-application degrades prose.',
            evidenceBase: 'Distinguish documented textual evidence from working hypotheses.',
            mechanismSteps: [
              {
                stepNumber: 1,
                phase: 'Setup Baseline',
                InputState: 'Initial scene state',
                operation: 'Establish concrete sensory/epistemic baseline',
                observableOutput: 'Grounded reader orientation',
              },
              {
                stepNumber: 2,
                phase: 'Operational Shift',
                InputState: 'Target beat or stimulus',
                operation: 'Apply structural or syntactic transformation',
                observableOutput: 'Intended narrative/psychological effect',
              },
            ],
          },
          componentC: {
            sources: ['Documented literary or cognitive reference'],
            historicalContext: 'Lineage of the technique.',
            documentedLiteraryPrecedents: 'Canonical examples in literature.',
            attribution: 'Project adaptation or documented theory.',
            linkedCanonicalChapterIds: [],
          },
          componentD: {
            examples: [
              {
                title: 'Baseline Worked Example',
                excerpt: 'Provide a concrete passage illustrating the technique in action.',
                annotation: 'Explain why this passage satisfies the decision rules.',
                type: 'effective',
                criterionAnalysis: 'Passes operational evaluation tests.',
              },
            ],
          },
          componentE: {
            practicalProcedures: [
              '1. Step one of applying the technique to a passage',
              '2. Step two of verifying structural alignment',
            ],
            decisionRules: ['IF condition X holds THEN apply rule Y'],
            constraints: ['Do not violate character epistemic boundaries'],
            commonErrorsToAvoid: ['Over-explaining the mechanism inside narrator monologue'],
            evaluationTests: ['Test 1: Can the effect be verified directly in the prose?'],
          },
        },
      },
    };
    onCreatePack(newPack);
    setSelectedPackId(newId);
    setSelectedVersionNum(initialVer);
  };

  const handleForkVersion = () => {
    if (!activePack || !activeVersion) return;
    const parts = activeVersion.versionNumber.split('.').map(Number);
    const nextVer = `${parts[0] || 1}.${(parts[1] || 0) + 1}.0`;
    const now = generateTimestamp();
    const forkedVersion: TechniquePackVersion = {
      ...JSON.parse(JSON.stringify(activeVersion)),
      versionNumber: nextVer,
      updatedAt: now,
      changelog: `Forked from v${activeVersion.versionNumber} for methodology refinement.`,
    };
    const updatedPack: TechniquePack = {
      ...activePack,
      currentVersion: nextVer,
      updatedAt: now,
      versions: {
        ...activePack.versions,
        [nextVer]: forkedVersion,
      },
    };
    onUpdatePack(updatedPack);
    setSelectedVersionNum(nextVer);
  };

  const updateCurrentVersionData = (
    updater: (ver: TechniquePackVersion) => TechniquePackVersion
  ) => {
    if (!activePack || !activeVersion) return;
    const updatedVer = updater(activeVersion);
    const updatedPack: TechniquePack = {
      ...activePack,
      updatedAt: generateTimestamp(),
      versions: {
        ...activePack.versions,
        [activeVersion.versionNumber]: updatedVer,
      },
    };
    onUpdatePack(updatedPack);
  };

  // Live Deterministic Diagnostic on Workbench Passage
  const workbenchDiagnostics = useMemo(() => {
    const targetText = (wbRevisedPassage.trim() || wbOriginalPassage).trim();
    const sentences = targetText
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const words = targetText ? targetText.split(/\s+/) : [];
    const avgSentenceWords =
      sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;
    const paragraphs = targetText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const filterVerbs = [
      'i noticed',
      'i realized',
      'it seemed',
      'i felt',
      'i saw',
      'i heard',
    ];
    const detectedFilterVerbs = filterVerbs.filter((fv) =>
      targetText.toLowerCase().includes(fv)
    );

    const prematureLoreTerms = [
      'demonic aura',
      'peerage',
      'sacred gear',
      'mana',
      'magic power',
    ];
    const detectedLoreLeaks = prematureLoreTerms.filter((lt) =>
      targetText.toLowerCase().includes(lt)
    );

    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      avgSentenceWords,
      detectedFilterVerbs,
      detectedLoreLeaks,
    };
  }, [wbOriginalPassage, wbRevisedPassage]);

  // Execute AI-assisted Technique Application on the selected passage
  const handleRunAiPassageApplication = async () => {
    if (!activePack || !activeVersion || !wbOriginalPassage.trim()) return;
    setIsRunningAiBench(true);
    setAiBenchError(null);

    try {
      const compiled = compileTechniquePacks(
        [activePack],
        { [activePack.id]: activeVersion.versionNumber },
        'Targeted Passage Technique Application',
        activeVersion.componentE.constraints
      );

      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: 'prose_revision',
          modelId: DEFAULT_MODEL_ID,
          userPrompt: `Apply the Technique Pack "${activePack.name}" (v${activeVersion.versionNumber}) to this passage.\nSelected Procedures:\n${(wbCheckedProcedures.length > 0 ? wbCheckedProcedures : activeVersion.componentE.practicalProcedures).join('\n')}\n\nReturn ONLY the revised passage prose.`,
          contextText: wbOriginalPassage,
          compiledTechniquePrompt: compiled.systemPromptBlock,
          constraints: activeVersion.componentE.constraints,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to apply technique via model');
      }

      setWbRevisedPassage(data.outputText);

      if (onLogExecution) {
        onLogExecution({
          id: generateId('exec_tp'),
          timestamp: generateTimestamp(),
          provider: 'gemini',
          modelId: data.modelId,
          taskType: 'prose_revision',
          chapterId: wbChapterId || undefined,
          techniquePackIds: [activePack.id],
          inputPromptSummary: `Technique Workbench Application: ${activePack.name}`,
          rawInputPrompt: data.rawInputSummary,
          rawOutputText: data.outputText,
          status: 'success',
          latencyMs: data.latencyMs,
          promptTokens: data.promptTokens,
          completionTokens: data.completionTokens,
          totalTokens: data.totalTokens,
          estimatedCostUsd: data.estimatedCostUsd,
        });
      }
    } catch (err: unknown) {
      setAiBenchError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsRunningAiBench(false);
    }
  };

  // Save Application Record to the Technique Pack
  const handleRecordApplicationOutcome = () => {
    if (!activePack || !activeVersion) return;
    const newRec: TechniqueApplicationRecord = {
      id: generateId('app_rec'),
      timestamp: generateTimestamp(),
      techniquePackId: activePack.id,
      techniqueVersion: activeVersion.versionNumber,
      chapterId: wbChapterId || 'workspace_passage',
      originalPassage: wbOriginalPassage,
      revisedPassage: wbRevisedPassage || wbOriginalPassage,
      appliedProcedures:
        wbCheckedProcedures.length > 0
          ? wbCheckedProcedures
          : activeVersion.componentE.practicalProcedures.slice(0, 2),
      outcomeStatus: wbOutcomeStatus,
      observedEffectNotes:
        wbObservedNotes.trim() ||
        'Evaluated passage against Technique Pack procedures and evaluation criteria.',
      methodUsed: wbRevisedPassage ? 'model_assisted' : 'manual_workbench',
    };

    const updatedPack: TechniquePack = {
      ...activePack,
      updatedAt: generateTimestamp(),
      applicationRecords: [newRec, ...(activePack.applicationRecords || [])],
    };
    onUpdatePack(updatedPack);
    setWbObservedNotes('');
    setActiveQuestionTab('q5_verify');
    setViewMode('authoring');
  };

  // Compiled result for Compiler View
  const compiledSandboxResult = useMemo(() => {
    const selectedPacks = packs.filter((p) =>
      selectedCompilerPackIds.includes(p.id)
    );
    const verMap: Record<string, string> = {};
    selectedPacks.forEach((p) => {
      verMap[p.id] = p.currentVersion;
    });
    const customList = compilerCustomConstraints
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    return compileTechniquePacks(
      selectedPacks,
      verMap,
      compilerTaskContext,
      customList
    );
  }, [
    packs,
    selectedCompilerPackIds,
    compilerTaskContext,
    compilerCustomConstraints,
  ]);

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#09090b]">
      {/* Left Sidebar: Technique Pack Library & Mode Switcher */}
      <div className="w-80 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Operational Techniques</span>
            </div>
            <button
              onClick={handleCreateNewPack}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200 transition-colors"
              title="Create New Technique Pack"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* 3-Mode Toggle: 5-Question Studio / Live Passage Workbench / Multi-Pack Compiler */}
          <div className="grid grid-cols-3 gap-1 rounded-lg border border-stone-800 bg-stone-950 p-1 text-[11px] font-mono">
            <button
              onClick={() => setViewMode('authoring')}
              className={`py-1.5 rounded transition-colors ${
                viewMode === 'authoring'
                  ? 'bg-stone-800 text-stone-100 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              5 Questions
            </button>
            <button
              onClick={() => setViewMode('workbench')}
              className={`py-1.5 rounded transition-colors flex items-center justify-center gap-1 ${
                viewMode === 'workbench'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'text-amber-400 hover:bg-stone-900'
              }`}
            >
              <FlaskConical className="w-3 h-3" />
              <span>Apply</span>
            </button>
            <button
              onClick={() => setViewMode('compiler')}
              className={`py-1.5 rounded transition-colors flex items-center justify-center gap-1 ${
                viewMode === 'compiler'
                  ? 'bg-stone-800 text-stone-100 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Compiler</span>
            </button>
          </div>
        </div>

        {/* Pack List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {packs.map((pack) => {
            const isSelected = pack.id === activePack?.id;
            const ver = pack.versions[pack.currentVersion];
            const status =
              ver?.componentA.methodologicalStatus || 'documented_principle';
            return (
              <div
                key={pack.id}
                onClick={() => {
                  setSelectedPackId(pack.id);
                  setSelectedVersionNum(pack.currentVersion);
                }}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-stone-900 border-amber-500/70 text-stone-100 shadow-sm'
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="uppercase px-1.5 py-0.5 rounded bg-stone-800 text-amber-400 font-semibold">
                    {pack.category}
                  </span>
                  <span className="text-stone-400">v{pack.currentVersion}</span>
                </div>
                <div className="text-xs font-semibold text-stone-100">
                  {pack.name}
                </div>
                <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                  {pack.description}
                </p>
                <div className="mt-2 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>{status.replace(/_/g, ' ')}</span>
                  <span>
                    {(pack.applicationRecords || []).length} recorded runs
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'authoring' && activePack && activeVersion ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#09090b]">
          {/* Pack Top Bar */}
          <div className="p-5 border-b border-stone-800/80 bg-[#0c0c0e] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 flex-1 min-w-[280px]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={activePack.name}
                  onChange={(e) =>
                    onUpdatePack({
                      ...activePack,
                      name: e.target.value,
                      updatedAt: Date.now(),
                    })
                  }
                  className="bg-transparent border-b border-transparent hover:border-stone-700 focus:border-amber-500 text-lg font-serif font-medium text-stone-100 focus:outline-none w-full max-w-lg"
                />
                <select
                  value={activePack.category}
                  onChange={(e) =>
                    onUpdatePack({
                      ...activePack,
                      category: e.target.value as TechniquePack['category'],
                    })
                  }
                  className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-xs font-mono text-amber-400 uppercase"
                >
                  <option value="narrative">Narrative</option>
                  <option value="psychology">Psychology</option>
                  <option value="prose">Prose</option>
                  <option value="structure">Structure</option>
                  <option value="thematic">Thematic</option>
                </select>
              </div>
              <input
                type="text"
                value={activePack.description}
                onChange={(e) =>
                  onUpdatePack({
                    ...activePack,
                    description: e.target.value,
                    updatedAt: Date.now(),
                  })
                }
                className="w-full bg-transparent text-xs text-stone-400 focus:text-stone-200 focus:outline-none"
              />
            </div>

            {/* Version & Quick Apply Controls */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-2.5 py-1.5 rounded">
                <History className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-stone-400">Ver:</span>
                <select
                  value={selectedVersionNum}
                  onChange={(e) => setSelectedVersionNum(e.target.value)}
                  className="bg-transparent text-stone-200 font-semibold focus:outline-none"
                >
                  {Object.keys(activePack.versions).map((v) => (
                    <option key={v} value={v} className="bg-stone-900">
                      v{v} {v === activePack.currentVersion ? '(Active)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleForkVersion}
                className="px-2.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 flex items-center gap-1 transition-colors"
                title="Fork a new version to experiment with methodology changes"
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                <span>Fork Version</span>
              </button>

              <button
                onClick={() => setViewMode('workbench')}
                className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Apply to Passage</span>
              </button>
            </div>
          </div>

          {/* The 5 Operational Questions Navigation Bar */}
          <div className="flex items-center border-b border-stone-800/80 bg-stone-950 px-6 text-xs font-mono overflow-x-auto flex-shrink-0">
            {[
              { id: 'q1_what', num: '01', label: 'What is it? (Principles & Notation)' },
              { id: 'q2_how', num: '02', label: 'How does it work? (Mechanism & Flow)' },
              { id: 'q3_support', num: '03', label: 'What supports it? (Canon & Precedents)' },
              { id: 'q4_apply', num: '04', label: 'How do I apply it? (Rules & Examples)' },
              {
                id: 'q5_verify',
                num: '05',
                label: `How do I know it worked? (Tests & ${(activePack.applicationRecords || []).length} Runs)`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveQuestionTab(tab.id as StudioSection)}
                className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeQuestionTab === tab.id
                    ? 'border-amber-500 text-amber-400 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                  {tab.num}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Question Content Viewport */}
          <div className="flex-1 overflow-y-auto p-6 max-w-5xl space-y-6">
            {/* QUESTION 1: WHAT IS THE TECHNIQUE? */}
            {activeQuestionTab === 'q1_what' && (
              <div className="space-y-6">
                <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-amber-400 block">
                      Question 01 — Identity & Epistemic Status
                    </span>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Define the technique in whichever representation is clearest—prose principles, formal causal/structural notation, or underlying assumptions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-stone-400">Status:</span>
                    <select
                      value={
                        activeVersion.componentA.methodologicalStatus ||
                        'documented_principle'
                      }
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentA: {
                            ...v.componentA,
                            methodologicalStatus: e.target.value as
                              | 'documented_principle'
                              | 'project_adaptation'
                              | 'experimental_hypothesis',
                          },
                        }))
                      }
                      className="bg-stone-900 border border-stone-700 rounded px-2.5 py-1 text-amber-400"
                    >
                      <option value="documented_principle">
                        Documented Literary/Cognitive Principle
                      </option>
                      <option value="project_adaptation">
                        Apocrypha DXD Project Adaptation
                      </option>
                      <option value="experimental_hypothesis">
                        Experimental Writing Hypothesis
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-stone-300 font-semibold block">
                    Core Principle & Definition
                  </label>
                  <textarea
                    rows={4}
                    value={activeVersion.componentA.principles}
                    onChange={(e) =>
                      updateCurrentVersionData((v) => ({
                        ...v,
                        componentA: { ...v.componentA, principles: e.target.value },
                      }))
                    }
                    className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-stone-300 font-semibold block">
                    Formal, Structural, or Causal Representation
                  </label>
                  <textarea
                    rows={3}
                    value={activeVersion.componentA.formalRepresentation}
                    onChange={(e) =>
                      updateCurrentVersionData((v) => ({
                        ...v,
                        componentA: {
                          ...v.componentA,
                          formalRepresentation: e.target.value,
                        },
                      }))
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3.5 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-stone-300 font-semibold block">
                    Core Cognitive & Narrative Assumptions
                  </label>
                  <textarea
                    rows={3}
                    value={activeVersion.componentA.coreAssumptions}
                    onChange={(e) =>
                      updateCurrentVersionData((v) => ({
                        ...v,
                        componentA: {
                          ...v.componentA,
                          coreAssumptions: e.target.value,
                        },
                      }))
                    }
                    className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* QUESTION 2: HOW DOES IT WORK? (WITH INTERACTIVE MECHANISM DIAGRAM) */}
            {activeQuestionTab === 'q2_how' && (
              <div className="space-y-6">
                {/* Interactive Mechanism Flow Diagram */}
                <div className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-amber-400 block">
                        Operational Mechanism Flow Diagram
                      </span>
                      <h4 className="text-sm font-serif text-stone-100">
                        Step-by-Step Causal Transformation Pipeline
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        const currentSteps =
                          activeVersion.componentB.mechanismSteps || [];
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentB: {
                            ...v.componentB,
                            mechanismSteps: [
                              ...currentSteps,
                              {
                                stepNumber: currentSteps.length + 1,
                                phase: 'New Mechanism Phase',
                                InputState: 'Scene input state',
                                operation: 'Prose / cognitive operation',
                                observableOutput: 'Reader / narrative output',
                              },
                            ],
                          },
                        }));
                      }}
                      className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-mono text-stone-200 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" /> Add Phase Node
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {(activeVersion.componentB.mechanismSteps || []).map(
                      (step, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg border border-stone-800 bg-stone-950 space-y-2.5 relative"
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/80 text-amber-400 font-bold">
                              Phase 0{step.stepNumber}
                            </span>
                            {idx <
                              (activeVersion.componentB.mechanismSteps || [])
                                .length -
                                1 && (
                              <ArrowRight className="w-4 h-4 text-stone-500 hidden md:block" />
                            )}
                          </div>
                          <input
                            type="text"
                            value={step.phase}
                            onChange={(e) => {
                              const next = [
                                ...(activeVersion.componentB.mechanismSteps || []),
                              ];
                              next[idx] = { ...step, phase: e.target.value };
                              updateCurrentVersionData((v) => ({
                                ...v,
                                componentB: {
                                  ...v.componentB,
                                  mechanismSteps: next,
                                },
                              }));
                            }}
                            className="w-full bg-transparent text-xs font-semibold text-stone-100 border-b border-stone-800 focus:border-amber-500 focus:outline-none pb-1"
                          />
                          <div className="text-[11px] font-mono space-y-1.5">
                            <div>
                              <span className="text-stone-500 uppercase text-[10px] block">
                                Input State:
                              </span>
                              <span className="text-stone-300">{step.InputState}</span>
                            </div>
                            <div>
                              <span className="text-amber-500/90 uppercase text-[10px] block">
                                Operation:
                              </span>
                              <span className="text-stone-200">{step.operation}</span>
                            </div>
                            <div>
                              <span className="text-emerald-400 uppercase text-[10px] block">
                                Observable Effect:
                              </span>
                              <span className="text-stone-300">
                                {step.observableOutput}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold">
                      Cognitive & Narrative Mechanisms
                    </label>
                    <textarea
                      rows={4}
                      value={activeVersion.componentB.mechanisms}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentB: {
                            ...v.componentB,
                            mechanisms: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold">
                      Intended Effects on Reader & Scene
                    </label>
                    <textarea
                      rows={4}
                      value={activeVersion.componentB.intendedEffects}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentB: {
                            ...v.componentB,
                            intendedEffects: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold">
                      Psychological / Philosophical Rationale
                    </label>
                    <textarea
                      rows={4}
                      value={
                        activeVersion.componentB.psychologicalPhilosophicalRationale
                      }
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentB: {
                            ...v.componentB,
                            psychologicalPhilosophicalRationale: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-amber-400 font-semibold">
                      Failure Modes, Limitations & Overuse Risks
                    </label>
                    <textarea
                      rows={4}
                      value={activeVersion.componentB.limitationsAndRisks}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentB: {
                            ...v.componentB,
                            limitationsAndRisks: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-amber-900/50 rounded-lg p-3 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* QUESTION 3: WHAT SUPPORTS IT? (CANON LINKS & SOURCES) */}
            {activeQuestionTab === 'q3_support' && (
              <div className="space-y-6">
                {/* Linked Canonical Ledger Chapters */}
                <div className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3">
                  <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                    Linked Canonical Chapters in Apocrypha DXD (1–8)
                  </div>
                  <p className="text-xs text-stone-400">
                    Chapters where this technique is actively demonstrated or anchored in the authoritative Ledger text:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {chapters.map((ch) => {
                      const isLinked = (
                        activeVersion.componentC.linkedCanonicalChapterIds || []
                      ).includes(ch.id);
                      return (
                        <div
                          key={ch.id}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 ${
                            isLinked
                              ? 'border-amber-500/70 bg-amber-950/20 text-stone-100'
                              : 'border-stone-800 bg-stone-950 text-stone-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isLinked}
                            onChange={(e) => {
                              const current =
                                activeVersion.componentC
                                  .linkedCanonicalChapterIds || [];
                              const next = e.target.checked
                                ? [...current, ch.id]
                                : current.filter((id) => id !== ch.id);
                              updateCurrentVersionData((v) => ({
                                ...v,
                                componentC: {
                                  ...v.componentC,
                                  linkedCanonicalChapterIds: next,
                                },
                              }));
                            }}
                          />
                          <span>
                            Ch. {ch.chapterNumber}: {ch.title}
                          </span>
                          {isLinked && onNavigateToChapter && (
                            <button
                              onClick={() => onNavigateToChapter(ch.id)}
                              className="text-amber-400 hover:underline ml-1"
                            >
                              Open
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-stone-300 font-semibold block">
                    Evidence Base (Documented Evidence vs. Working Hypotheses)
                  </label>
                  <textarea
                    rows={3}
                    value={activeVersion.componentB.evidenceBase}
                    onChange={(e) =>
                      updateCurrentVersionData((v) => ({
                        ...v,
                        componentB: {
                          ...v.componentB,
                          evidenceBase: e.target.value,
                        },
                      }))
                    }
                    className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-stone-300 font-semibold block">
                    Sources, Scholarship & Canonical References (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={activeVersion.componentC.sources.join('\n')}
                    onChange={(e) =>
                      updateCurrentVersionData((v) => ({
                        ...v,
                        componentC: {
                          ...v.componentC,
                          sources: e.target.value.split('\n'),
                        },
                      }))
                    }
                    className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs font-mono text-stone-200 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold block">
                      Documented Literary Precedents
                    </label>
                    <textarea
                      rows={3}
                      value={activeVersion.componentC.documentedLiteraryPrecedents}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentC: {
                            ...v.componentC,
                            documentedLiteraryPrecedents: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold block">
                      Attribution & Provenance
                    </label>
                    <textarea
                      rows={3}
                      value={activeVersion.componentC.attribution}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentC: {
                            ...v.componentC,
                            attribution: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* QUESTION 4: HOW DO I APPLY IT? (PROCEDURES, DECISION RULES & WORKED EXAMPLES) */}
            {activeQuestionTab === 'q4_apply' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-amber-400 font-semibold">
                      Step-by-Step Practical Procedures (One per line)
                    </label>
                    <textarea
                      rows={5}
                      value={activeVersion.componentE.practicalProcedures.join(
                        '\n'
                      )}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentE: {
                            ...v.componentE,
                            practicalProcedures: e.target.value.split('\n'),
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs font-mono text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-amber-400 font-semibold">
                      IF/THEN Decision Rules (One per line)
                    </label>
                    <textarea
                      rows={5}
                      value={activeVersion.componentE.decisionRules.join('\n')}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentE: {
                            ...v.componentE,
                            decisionRules: e.target.value.split('\n'),
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs font-mono text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-red-400 font-semibold">
                      Hard Constraints (Never Violate)
                    </label>
                    <textarea
                      rows={4}
                      value={activeVersion.componentE.constraints.join('\n')}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentE: {
                            ...v.componentE,
                            constraints: e.target.value.split('\n'),
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-red-900/40 rounded-lg p-3 text-xs font-mono text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold">
                      Common Errors to Avoid
                    </label>
                    <textarea
                      rows={4}
                      value={activeVersion.componentE.commonErrorsToAvoid.join(
                        '\n'
                      )}
                      onChange={(e) =>
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentE: {
                            ...v.componentE,
                            commonErrorsToAvoid: e.target.value.split('\n'),
                          },
                        }))
                      }
                      className="w-full bg-[#0e0e11] border border-stone-800 rounded-lg p-3 text-xs font-mono text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Worked Examples & Counterexamples */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-300 font-semibold">
                      Annotated Worked Examples & Counterexamples ({activeVersion.componentD.examples.length})
                    </h4>
                    <button
                      onClick={() => {
                        const newEx: TechniquePackExample = {
                          title: 'New Annotated Passage Example',
                          excerpt: 'Insert canonical or experimental passage excerpt...',
                          annotation: 'Explain how the mechanism operates in this passage...',
                          type: 'effective',
                          criterionAnalysis: 'Specify which evaluation criteria this satisfies or violates.',
                        };
                        updateCurrentVersionData((v) => ({
                          ...v,
                          componentD: {
                            examples: [...v.componentD.examples, newEx],
                          },
                        }));
                      }}
                      className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-200 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" /> Add Example
                    </button>
                  </div>

                  {activeVersion.componentD.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={ex.title}
                          onChange={(e) => {
                            const next = [...activeVersion.componentD.examples];
                            next[idx] = { ...ex, title: e.target.value };
                            updateCurrentVersionData((v) => ({
                              ...v,
                              componentD: { examples: next },
                            }));
                          }}
                          className="bg-transparent text-xs font-semibold text-stone-100 border-b border-stone-800 focus:border-amber-500 focus:outline-none flex-1"
                        />
                        <div className="flex items-center gap-2">
                          {ex.sourceChapterId && onNavigateToChapter && (
                            <button
                              onClick={() =>
                                onNavigateToChapter(ex.sourceChapterId!, ex.excerpt)
                              }
                              className="text-[11px] font-mono text-amber-400 hover:underline"
                            >
                              View in Ledger Chapter
                            </button>
                          )}
                          <select
                            value={ex.type}
                            onChange={(e) => {
                              const next = [...activeVersion.componentD.examples];
                              next[idx] = {
                                ...ex,
                                type: e.target.value as TechniquePackExample['type'],
                              };
                              updateCurrentVersionData((v) => ({
                                ...v,
                                componentD: { examples: next },
                              }));
                            }}
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                              ex.type === 'effective'
                                ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400'
                                : 'bg-red-950/50 border-red-800 text-red-400'
                            }`}
                          >
                            <option value="effective">Effective Example</option>
                            <option value="ineffective">Counterexample (Ineffective)</option>
                            <option value="contrast">Contrast Pair</option>
                          </select>
                        </div>
                      </div>

                      <textarea
                        rows={3}
                        value={ex.excerpt}
                        onChange={(e) => {
                          const next = [...activeVersion.componentD.examples];
                          next[idx] = { ...ex, excerpt: e.target.value };
                          updateCurrentVersionData((v) => ({
                            ...v,
                            componentD: { examples: next },
                          }));
                        }}
                        className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-xs font-serif italic text-stone-200 leading-relaxed"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 block mb-1">
                            Analytical Annotation:
                          </span>
                          <input
                            type="text"
                            value={ex.annotation}
                            onChange={(e) => {
                              const next = [...activeVersion.componentD.examples];
                              next[idx] = { ...ex, annotation: e.target.value };
                              updateCurrentVersionData((v) => ({
                                ...v,
                                componentD: { examples: next },
                              }));
                            }}
                            className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-stone-300"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 block mb-1">
                            Criterion Verification:
                          </span>
                          <input
                            type="text"
                            value={ex.criterionAnalysis}
                            onChange={(e) => {
                              const next = [...activeVersion.componentD.examples];
                              next[idx] = {
                                ...ex,
                                criterionAnalysis: e.target.value,
                              };
                              updateCurrentVersionData((v) => ({
                                ...v,
                                componentD: { examples: next },
                              }));
                            }}
                            className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-stone-300"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUESTION 5: HOW DO I KNOW IF IT WORKED? (EVALUATION TESTS & RECORDED OUTCOMES) */}
            {activeQuestionTab === 'q5_verify' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-emerald-400 font-semibold block">
                    Falsifiable Evaluation Tests (How to verify the technique succeeded in prose)
                  </label>
                  <textarea
                    rows={4}
                    value={activeVersion.componentE.evaluationTests.join('\n')}
                    onChange={(e) =>
                      updateCurrentVersionData((v) => ({
                        ...v,
                        componentE: {
                          ...v.componentE,
                          evaluationTests: e.target.value.split('\n'),
                        },
                      }))
                    }
                    className="w-full bg-[#0e0e11] border border-emerald-900/50 rounded-lg p-3.5 text-xs font-mono text-stone-200 focus:outline-none"
                  />
                </div>

                {/* Recorded Application Runs & Empirical Outcomes */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-300 font-semibold">
                      Recorded Passage Application Runs & Empirical Outcomes ({(activePack.applicationRecords || []).length})
                    </h4>
                    <button
                      onClick={() => setViewMode('workbench')}
                      className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-mono flex items-center gap-1.5"
                    >
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>Run New Passage Experiment</span>
                    </button>
                  </div>

                  {(activePack.applicationRecords || []).length === 0 ? (
                    <div className="p-8 border border-stone-800/80 rounded-xl bg-[#0e0e11] text-center space-y-2">
                      <FlaskConical className="w-6 h-6 text-stone-600 mx-auto" />
                      <p className="text-xs font-mono text-stone-400">
                        No passage application outcomes recorded for this pack yet. Open the Live Passage Workbench to apply this technique to a passage and record what worked or failed.
                      </p>
                    </div>
                  ) : (
                    (activePack.applicationRecords || []).map((rec) => {
                      const ch = chapters.find((c) => c.id === rec.chapterId);
                      return (
                        <div
                          key={rec.id}
                          className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3"
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold border ${
                                  rec.outcomeStatus === 'effective'
                                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                                    : rec.outcomeStatus === 'partial'
                                    ? 'bg-amber-950/60 border-amber-800 text-amber-400'
                                    : 'bg-red-950/60 border-red-800 text-red-400'
                                }`}
                              >
                                Outcome: {rec.outcomeStatus}
                              </span>
                              <span className="text-stone-400">
                                {ch
                                  ? `Ch. ${ch.chapterNumber}: ${ch.title}`
                                  : rec.chapterId}
                              </span>
                            </div>
                            <span className="text-stone-500">
                              v{rec.techniqueVersion} •{' '}
                              {rec.methodUsed.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1">
                              <span className="text-[10px] font-mono uppercase text-stone-400 block">
                                Baseline Passage
                              </span>
                              <p className="text-xs font-serif text-stone-400 leading-relaxed">
                                {rec.originalPassage}
                              </p>
                            </div>
                            <div className="p-3 bg-stone-950 border border-emerald-900/50 rounded space-y-1">
                              <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                                Post-Application Passage
                              </span>
                              <p className="text-xs font-serif text-stone-100 leading-relaxed">
                                {rec.revisedPassage}
                              </p>
                            </div>
                          </div>

                          <div className="p-3 bg-stone-900/60 border border-stone-800 rounded text-xs font-mono text-stone-300">
                            <span className="text-amber-400 font-semibold">
                              Observed Effect & Diagnostic Notes:
                            </span>{' '}
                            {rec.observedEffectNotes}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : viewMode === 'workbench' && activePack && activeVersion ? (
        /* MODE 2: LIVE PASSAGE APPLICATION & OUTCOME WORKBENCH */
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                <FlaskConical className="w-4 h-4" />
                <span>Live Technique Application & Verification Workbench</span>
              </div>
              <h2 className="text-lg font-serif text-stone-100 mt-0.5">
                Applying &ldquo;{activePack.name}&rdquo; (v{activeVersion.versionNumber}) to a Target Passage
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-stone-400">Load Passage From:</span>
              <select
                value={wbChapterId}
                onChange={(e) => {
                  const cid = e.target.value;
                  setWbChapterId(cid);
                  const found = chapters.find((c) => c.id === cid);
                  if (found) {
                    const paras = found.currentContent
                      .split(/\n\s*\n/)
                      .map((p) => p.trim())
                      .filter(Boolean);
                    setWbOriginalPassage(
                      paras.slice(1, 4).join('\n\n') || paras[0] || ''
                    );
                  }
                }}
                className="bg-stone-900 border border-stone-700 rounded px-2.5 py-1.5 text-stone-200"
              >
                {chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Ch. {c.chapterNumber}: {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1: Active Operational Checklist */}
            <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-4">
              <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                1. Operational Procedures Checklist
              </div>
              <div className="space-y-2 text-xs font-mono">
                {activeVersion.componentE.practicalProcedures.map((proc, i) => {
                  const checked = wbCheckedProcedures.includes(proc);
                  return (
                    <label
                      key={i}
                      className="flex items-start gap-2 p-2 rounded bg-stone-950 border border-stone-800/80 cursor-pointer text-stone-300 hover:text-stone-100"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setWbCheckedProcedures([
                              ...wbCheckedProcedures,
                              proc,
                            ]);
                          } else {
                            setWbCheckedProcedures(
                              wbCheckedProcedures.filter((p) => p !== proc)
                            );
                          }
                        }}
                        className="mt-0.5"
                      />
                      <span className="leading-relaxed">{proc}</span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-1.5 text-xs font-mono">
                <div className="text-emerald-400 uppercase text-[10px] font-semibold">
                  Evaluation Tests to Satisfy:
                </div>
                {activeVersion.componentE.evaluationTests.map((t, i) => (
                  <div key={i} className="text-[11px] text-stone-300">
                    • {t}
                  </div>
                ))}
              </div>

              {/* Deterministic Prose Telemetry */}
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-2 text-xs font-mono">
                <div className="text-stone-400 uppercase text-[10px] font-semibold">
                  Live Deterministic Passage Diagnostic
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    Words:{' '}
                    <span className="text-stone-100 tabular-nums">
                      {workbenchDiagnostics.wordCount}
                    </span>
                  </div>
                  <div>
                    Avg Sent. Len:{' '}
                    <span className="text-amber-400 tabular-nums">
                      {workbenchDiagnostics.avgSentenceWords} wds
                    </span>
                  </div>
                  <div>
                    Filter Verbs:{' '}
                    <span
                      className={
                        workbenchDiagnostics.detectedFilterVerbs.length === 0
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }
                    >
                      {workbenchDiagnostics.detectedFilterVerbs.length === 0
                        ? '0 (Clean)'
                        : workbenchDiagnostics.detectedFilterVerbs.join(', ')}
                    </span>
                  </div>
                  <div>
                    Lore Leaks:{' '}
                    <span
                      className={
                        workbenchDiagnostics.detectedLoreLeaks.length === 0
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }
                    >
                      {workbenchDiagnostics.detectedLoreLeaks.length === 0
                        ? '0 (Clean)'
                        : workbenchDiagnostics.detectedLoreLeaks.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 & 3: Baseline vs. Applied Passage & Outcome Recording */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-stone-400">
                    2. Source / Baseline Passage
                  </label>
                  <textarea
                    rows={8}
                    value={wbOriginalPassage}
                    onChange={(e) => setWbOriginalPassage(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3.5 text-xs font-serif text-stone-300 leading-relaxed focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-amber-400">
                      3. Technique-Applied Revision (Manual or AI)
                    </label>
                    <button
                      onClick={handleRunAiPassageApplication}
                      disabled={isRunningAiBench}
                      className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-semibold text-[11px] font-mono flex items-center gap-1"
                    >
                      {isRunningAiBench ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Applying...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          <span>Generate Candidate with AI</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={wbRevisedPassage}
                    onChange={(e) => setWbRevisedPassage(e.target.value)}
                    placeholder="Write or refine the passage applying the checked procedures, or click 'Generate Candidate with AI' above..."
                    className="w-full bg-stone-950 border border-amber-500/40 rounded-lg p-3.5 text-xs font-serif text-stone-100 leading-relaxed focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {aiBenchError && (
                <div className="p-3 bg-red-950/60 border border-red-800 rounded text-xs font-mono text-red-300">
                  {aiBenchError}
                </div>
              )}

              {/* Step 4: Record Empirical Outcome */}
              <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3 text-xs font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="uppercase text-stone-300 font-semibold">
                    4. Record Empirical Outcome to Technique Pack History
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400">Outcome Verdict:</span>
                    <select
                      value={wbOutcomeStatus}
                      onChange={(e) =>
                        setWbOutcomeStatus(
                          e.target
                            .value as TechniqueApplicationRecord['outcomeStatus']
                        )
                      }
                      className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-stone-200"
                    >
                      <option value="effective">Effective (Achieved Intended Effect)</option>
                      <option value="partial">Partial (Needs Procedure Adjustment)</option>
                      <option value="counterproductive">
                        Counterproductive (Triggered Failure Mode)
                      </option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={wbObservedNotes}
                  onChange={(e) => setWbObservedNotes(e.target.value)}
                  placeholder="Document what worked, what failed, or how the passage satisfied the evaluation criteria..."
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleRecordApplicationOutcome}
                    className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-semibold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Outcome to Technique Pack</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 3: MULTI-PACK COMPILER & CONFLICT DETECTION SANDBOX */
        <div className="flex-1 overflow-y-auto p-8 max-w-5xl space-y-6 bg-[#09090b]">
          <div className="border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">
              <Cpu className="w-4 h-4" />
              <span>Multi-Pack Rule Compiler & Conflict Detector</span>
            </div>
            <h2 className="text-xl font-serif text-stone-100">
              Compile Operational Technique Packs into Executable Directives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3">
              <h4 className="text-xs font-mono uppercase text-stone-300 font-semibold">
                1. Select Technique Packs to Combine
              </h4>
              <div className="space-y-2">
                {packs.map((pack) => {
                  const isChecked = selectedCompilerPackIds.includes(pack.id);
                  return (
                    <label
                      key={pack.id}
                      className={`flex items-start gap-2.5 p-2.5 rounded border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-stone-900 border-amber-500/50 text-stone-100'
                          : 'bg-stone-950 border-stone-800 text-stone-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCompilerPackIds([
                              ...selectedCompilerPackIds,
                              pack.id,
                            ]);
                          } else {
                            setSelectedCompilerPackIds(
                              selectedCompilerPackIds.filter(
                                (id) => id !== pack.id
                              )
                            );
                          }
                        }}
                        className="mt-0.5"
                      />
                      <div className="text-xs">
                        <div className="font-medium text-stone-200">
                          {pack.name} (v{pack.currentVersion})
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {pack.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-stone-300 font-semibold block mb-1.5">
                  2. Target Task Context
                </label>
                <input
                  type="text"
                  value={compilerTaskContext}
                  onChange={(e) => setCompilerTaskContext(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-xs font-mono text-stone-200"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-stone-300 font-semibold block mb-1.5">
                  3. Additional Scene Constraints (One per line)
                </label>
                <textarea
                  rows={4}
                  value={compilerCustomConstraints}
                  onChange={(e) => setCompilerCustomConstraints(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-xs font-mono text-stone-200"
                />
              </div>
            </div>
          </div>

          {compiledSandboxResult.conflictWarnings.length > 0 && (
            <div className="p-4 bg-amber-950/30 border border-amber-700/80 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Detected Methodological Tensions / Conflicts</span>
              </div>
              <ul className="space-y-1 text-xs font-mono text-amber-200/90 pl-5 list-disc">
                {compiledSandboxResult.conflictWarnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-stone-400">
                Compiled System Directive Block ({compiledSandboxResult.ruleList.length} Active Rules)
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    compiledSandboxResult.systemPromptBlock
                  );
                  setCopiedPrompt(true);
                  setTimeout(() => setCopiedPrompt(false), 2000);
                }}
                className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono flex items-center gap-1.5"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Directives</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-5 bg-stone-950 border border-stone-800 rounded-xl text-xs font-mono text-stone-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {compiledSandboxResult.systemPromptBlock}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
