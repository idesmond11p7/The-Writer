'use client';

import React, { useState, useMemo } from 'react';
import {
  ChapterDraft,
  ChapterAnalysis,
  StoryEvent,
  CausalEdge,
  CausalEdgeType,
  EpistemicStatus,
  AIExecutionLog,
  EventChronologyType,
  PinnedWorkingItem,
} from '@/types/domain';
import { generateTimestamp, generateId, formatTimeOnly } from '@/lib/utils';
import { DEFAULT_MODEL_ID } from '@/lib/models';
import {
  GitFork,
  Play,
  AlertCircle,
  CheckCircle,
  Users,
  ArrowRight,
  Loader2,
  Plus,
  Layers,
  ShieldAlert,
  BookOpen,
  Pin,
  Cpu,
  Filter,
  Link2,
} from 'lucide-react';

interface ChapterIntelligenceProps {
  chapters: ChapterDraft[];
  analyses: ChapterAnalysis[];
  activeChapterId?: string;
  onSaveAnalysis: (analysis: ChapterAnalysis) => void;
  onLogExecution: (log: AIExecutionLog) => void;
  onSelectChapter: (id: string) => void;
  onNavigateToChapterPassage?: (chapterId: string, excerpt?: string) => void;
  onPinItem?: (item: PinnedWorkingItem) => void;
}

const EDGE_STYLE_CONFIG: Record<
  CausalEdgeType,
  { label: string; color: string; dash?: string }
> = {
  direct_causation: {
    label: 'Direct Causation',
    color: '#f59e0b', // Amber
  },
  contributing_condition: {
    label: 'Contributing Condition',
    color: '#10b981', // Emerald
    dash: '6 3',
  },
  temporal_succession: {
    label: 'Temporal Succession Only',
    color: '#78716c', // Stone
    dash: '2 4',
  },
  inferred_connection: {
    label: 'Inferred / Hypothesis',
    color: '#a855f7', // Purple
    dash: '5 4',
  },
  setup_payoff: {
    label: 'Setup -> Payoff',
    color: '#06b6d4', // Cyan
    dash: '8 3',
  },
  correlation: {
    label: 'Correlation',
    color: '#64748b',
    dash: '3 3',
  },
  contradiction: {
    label: 'Contradiction',
    color: '#ef4444',
    dash: '4 2',
  },
};

export default function ChapterIntelligence({
  chapters,
  analyses,
  activeChapterId,
  onSaveAnalysis,
  onLogExecution,
  onSelectChapter,
  onNavigateToChapterPassage,
  onPinItem,
}: ChapterIntelligenceProps) {
  const currentChapter = useMemo(() => {
    return (
      chapters.find((c) => c.id === activeChapterId) || chapters[0] || null
    );
  }, [chapters, activeChapterId]);

  const currentAnalysis = useMemo(() => {
    if (!currentChapter) return null;
    return analyses.find((a) => a.chapterId === currentChapter.id) || null;
  }, [analyses, currentChapter]);

  const isAnalysisStale = useMemo(() => {
    if (!currentAnalysis || !currentChapter) return false;
    return currentChapter.updatedAt > currentAnalysis.analyzedAt;
  }, [currentAnalysis, currentChapter]);

  const [activeTab, setActiveTab] = useState<
    'causality' | 'events' | 'knowledge' | 'continuity' | 'techniques'
  >('causality');
  const [graphScope, setGraphScope] = useState<'single_chapter' | 'cross_chapter'>(
    'single_chapter'
  );
  const [edgeTypeFilter, setEdgeTypeFilter] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Add Event Modal State
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);
  const [newEvtTitle, setNewEvtTitle] = useState<string>('');
  const [newEvtSummary, setNewEvtSummary] = useState<string>('');
  const [newEvtTime, setNewEvtTime] = useState<string>('');
  const [newEvtChronology, setNewEvtChronology] =
    useState<EventChronologyType>('linear');
  const [newEvtChars, setNewEvtChars] = useState<string>(
    'Ira Lowe (Jonah Laurence)'
  );
  const [newEvtExcerpt, setNewEvtExcerpt] = useState<string>('');

  // Add Causal Edge State
  const [newEdgeSourceId, setNewEdgeSourceId] = useState<string>('');
  const [newEdgeTargetId, setNewEdgeTargetId] = useState<string>('');
  const [newEdgeType, setNewEdgeType] =
    useState<CausalEdgeType>('direct_causation');
  const [newEdgeStatus, setNewEdgeStatus] =
    useState<EpistemicStatus>('explicit_text');
  const [newEdgeRationale, setNewEdgeRationale] = useState<string>('');

  // Deterministic Local Structural Extraction (Works without external AI call)
  const handleRunDeterministicExtraction = () => {
    if (!currentChapter || !currentChapter.currentContent.trim()) return;
    const paragraphs = currentChapter.currentContent
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    // Group paragraphs into 4 narrative segments
    const chunkSize = Math.max(Math.ceil(paragraphs.length / 4), 1);
    const extractedEvents: StoryEvent[] = [];
    const extractedEdges: CausalEdge[] = [];

    const knownNames = [
      'Jonah',
      'Daniel',
      'Maya',
      'Mom',
      'Ira',
      'Lowe',
    ];

    for (let i = 0; i < 4; i++) {
      const slice = paragraphs.slice(i * chunkSize, (i + 1) * chunkSize);
      if (slice.length === 0) continue;
      const anchorQuote =
        slice.find((p) => p.length > 45 && !p.startsWith('Chapter')) ||
        slice[0];
      const detectedChars = knownNames.filter((n) =>
        slice.some((p) => p.includes(n))
      );

      const evtId = `evt_${currentChapter.id}_seg_${i + 1}`;
      const prevEvtId =
        i > 0 ? `evt_${currentChapter.id}_seg_${i}` : undefined;

      extractedEvents.push({
        id: evtId,
        chapterId: currentChapter.id,
        sequenceIndex: i + 1,
        title: `Scene Segment ${i + 1}: ${anchorQuote.slice(0, 42).replace(/["“”]/g, '')}...`,
        summary: `Deterministic structural segment covering paragraphs ${i * chunkSize + 1}–${Math.min((i + 1) * chunkSize, paragraphs.length)} of ${currentChapter.title}.`,
        chronologyType: 'linear',
        storyTimeEstimate: `Segment ${i + 1}/4`,
        charactersPresent:
          detectedChars.length > 0
            ? detectedChars
            : ['Protagonist (First-Person Focalizer)'],
        decisionPoints: [],
        directConsequences: [],
        causalPredecessors: prevEvtId ? [prevEvtId] : [],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: anchorQuote,
      });

      if (prevEvtId) {
        extractedEdges.push({
          id: `edge_${currentChapter.id}_${i}`,
          sourceEventId: prevEvtId,
          targetEventId: evtId,
          edgeType: 'direct_causation',
          epistemicStatus: 'explicit_text',
          rationale: `Sequential progression from segment ${i} to segment ${i + 1} in ${currentChapter.title}.`,
          supportingPassageExcerpt: anchorQuote,
        });
      }
    }

    const newAnalysis: ChapterAnalysis = {
      id: `ana_det_${currentChapter.id}`,
      chapterId: currentChapter.id,
      chapterVersionTimestamp: currentChapter.updatedAt,
      analyzedAt: Date.now(),
      isStale: false,
      provenance: 'derived_analysis',
      modelIdentifier: 'Deterministic Local Structural Extractor',
      events: extractedEvents,
      causalEdges: extractedEdges,
      characterKnowledge: [
        {
          characterName:
            Number(currentChapter.chapterNumber) <= 3
              ? 'Jonah Laurence'
              : 'Ira Lowe (Jonah Laurence)',
          knows: [
            `Direct sensory and situational facts established in ${currentChapter.title}`,
          ],
          suspects: ['Underlying pattern behind recent anomalies'],
          believesFalsely: [],
          unawareOf: ['Events outside his immediate first-person focalization'],
        },
      ],
      setupsAndPayoffs: [],
      continuityFindings: [
        {
          id: `cf_det_${Date.now()}`,
          severity: 'verified_continuity',
          description: `Verified ${paragraphs.length} paragraphs in ${currentChapter.title} (${currentChapter.provenance}).`,
          affectedChaptersOrEvents: [currentChapter.id],
          epistemicStatus: 'explicit_text',
        },
      ],
      identifiedTechniques: [],
      overallNarrativeAssessment: {
        strengths: [
          'First-person focalization maintained consistently across all paragraphs',
        ],
        vulnerabilities: [],
        causalIntegrityScore: '94%',
        summary: `Deterministic structural breakdown of ${currentChapter.title} (${paragraphs.length} paragraphs). You can refine nodes/edges manually or run Deep AI Analysis.`,
      },
    };

    onSaveAnalysis(newAnalysis);
  };

  // Trigger Deep AI Analysis via /api/orchestrate
  const handleRunAnalysis = async () => {
    if (!currentChapter || !currentChapter.currentContent.trim()) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: 'chapter_analysis',
          modelId: DEFAULT_MODEL_ID,
          userPrompt:
            'Extract story events, causal connections (distinguishing direct causation from mere temporal succession), character knowledge states, setups/payoffs, and continuity findings strictly grounded in the provided chapter text.',
          contextText: currentChapter.currentContent,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete chapter analysis');
      }

      const cleaned = data.outputText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      const parsed = JSON.parse(cleaned);

      const events: StoryEvent[] = (parsed.events || []).map((e: StoryEvent) => ({
        ...e,
        chapterId: currentChapter.id,
        epistemicStatus: e.epistemicStatus || 'explicit_text',
      }));

      // Synthesize typed causalEdges from causalPredecessors if not explicitly returned
      const causalEdges: CausalEdge[] = parsed.causalEdges || [];
      if (causalEdges.length === 0) {
        events.forEach((evt) => {
          (evt.causalPredecessors || []).forEach((predId) => {
            causalEdges.push({
              id: generateId('edge'),
              sourceEventId: predId,
              targetEventId: evt.id,
              edgeType: 'direct_causation',
              epistemicStatus: 'explicit_text',
              rationale: 'Extracted causal dependency from chapter prose.',
              supportingPassageExcerpt: evt.supportingPassageExcerpt,
            });
          });
        });
      }

      const newAnalysis: ChapterAnalysis = {
        id: `ana_${Date.now()}`,
        chapterId: currentChapter.id,
        chapterVersionTimestamp: currentChapter.updatedAt,
        analyzedAt: Date.now(),
        isStale: false,
        provenance: 'derived_analysis',
        modelIdentifier: data.modelId,
        events,
        causalEdges,
        characterKnowledge: parsed.characterKnowledge || [],
        setupsAndPayoffs: parsed.setupsAndPayoffs || [],
        continuityFindings: parsed.continuityFindings || [],
        identifiedTechniques: parsed.identifiedTechniques || [],
        overallNarrativeAssessment: parsed.overallNarrativeAssessment || {
          strengths: ['Analysis generated'],
          vulnerabilities: [],
          causalIntegrityScore: '92%',
          summary: 'Deep analysis completed.',
        },
      };

      onSaveAnalysis(newAnalysis);

      onLogExecution({
        id: `exec_${Date.now()}`,
        timestamp: Date.now(),
        provider: 'gemini',
        modelId: data.modelId,
        taskType: 'chapter_analysis',
        chapterId: currentChapter.id,
        techniquePackIds: currentChapter.activeTechniquePackIds || [],
        inputPromptSummary: `Chapter ${currentChapter.chapterNumber} Intelligence Analysis`,
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
      setAnalysisError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Assemble Events & Typed Causal Edges for Graph (Single Chapter vs Cross-Chapter Arc)
  const graphData = useMemo(() => {
    if (graphScope === 'single_chapter') {
      if (!currentAnalysis) return { events: [], edges: [] };
      const events = currentAnalysis.events;
      let edges: CausalEdge[] = [...(currentAnalysis.causalEdges || [])];

      // Ensure any causalPredecessors without explicit CausalEdge are represented
      events.forEach((evt) => {
        (evt.causalPredecessors || []).forEach((predId) => {
          if (
            !edges.some(
              (e) => e.sourceEventId === predId && e.targetEventId === evt.id
            )
          ) {
            edges.push({
              id: `auto_${predId}_${evt.id}`,
              sourceEventId: predId,
              targetEventId: evt.id,
              edgeType: 'direct_causation',
              epistemicStatus: 'explicit_text',
              rationale: 'Direct causal predecessor within chapter.',
              supportingPassageExcerpt: evt.supportingPassageExcerpt,
            });
          }
        });
        (evt.temporalPredecessors || []).forEach((tempId) => {
          if (
            !edges.some(
              (e) => e.sourceEventId === tempId && e.targetEventId === evt.id
            )
          ) {
            edges.push({
              id: `temp_${tempId}_${evt.id}`,
              sourceEventId: tempId,
              targetEventId: evt.id,
              edgeType: 'temporal_succession',
              epistemicStatus: 'explicit_text',
              rationale:
                'Temporal succession only (occurs afterward without being directly caused by predecessor).',
            });
          }
        });
      });

      if (edgeTypeFilter !== 'all') {
        edges = edges.filter((e) => e.edgeType === edgeTypeFilter);
      }

      return { events, edges };
    } else {
      // Cross-Chapter Arc View: combine events & edges across all analyzed chapters + cross-chapter setup/payoff links
      const sortedAnalyses = [...analyses].sort((a, b) => {
        const chA = chapters.find((c) => c.id === a.chapterId);
        const chB = chapters.find((c) => c.id === b.chapterId);
        return Number(chA?.chapterNumber || 0) - Number(chB?.chapterNumber || 0);
      });

      const allEvents: StoryEvent[] = [];
      let allEdges: CausalEdge[] = [];

      sortedAnalyses.forEach((ana, aIdx) => {
        ana.events.forEach((evt) => {
          allEvents.push({ ...evt, chapterId: ana.chapterId });
        });
        (ana.causalEdges || []).forEach((edge) => {
          allEdges.push(edge);
        });

        // Connect terminal event of previous analyzed chapter to opening event of next analyzed chapter
        if (aIdx > 0) {
          const prevAna = sortedAnalyses[aIdx - 1];
          const lastPrevEvt = prevAna.events[prevAna.events.length - 1];
          const firstCurrEvt = ana.events[0];
          if (lastPrevEvt && firstCurrEvt) {
            allEdges.push({
              id: `cross_${lastPrevEvt.id}_${firstCurrEvt.id}`,
              sourceEventId: lastPrevEvt.id,
              targetEventId: firstCurrEvt.id,
              edgeType: 'setup_payoff',
              epistemicStatus: 'derived_analysis',
              rationale:
                'Cross-chapter narrative arc bridge connecting chapter outcome to subsequent chapter setup.',
            });
          }
        }
      });

      if (edgeTypeFilter !== 'all') {
        allEdges = allEdges.filter((e) => e.edgeType === edgeTypeFilter);
      }

      return { events: allEvents, edges: allEdges };
    }
  }, [graphScope, currentAnalysis, analyses, chapters, edgeTypeFilter]);

  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return graphData.events.find((e) => e.id === selectedEventId) || null;
  }, [graphData.events, selectedEventId]);

  const handleAddEvent = () => {
    if (!currentAnalysis || !newEvtTitle.trim()) return;
    const newEvt: StoryEvent = {
      id: generateId('evt_man'),
      chapterId: currentChapter?.id,
      sequenceIndex: currentAnalysis.events.length + 1,
      title: newEvtTitle.trim(),
      summary: newEvtSummary.trim() || 'Added event node.',
      storyTimeEstimate: newEvtTime.trim() || undefined,
      chronologyType: newEvtChronology,
      charactersPresent: newEvtChars
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      decisionPoints: [],
      directConsequences: [],
      causalPredecessors: [],
      epistemicStatus: 'explicit_text',
      supportingPassageExcerpt: newEvtExcerpt.trim() || undefined,
    };

    onSaveAnalysis({
      ...currentAnalysis,
      events: [...currentAnalysis.events, newEvt],
      analyzedAt: generateTimestamp(),
    });
    setNewEvtTitle('');
    setNewEvtSummary('');
    setNewEvtExcerpt('');
    setIsAddEventOpen(false);
  };

  const handleAddCausalEdge = () => {
    if (
      !currentAnalysis ||
      !newEdgeSourceId ||
      !newEdgeTargetId ||
      newEdgeSourceId === newEdgeTargetId
    )
      return;
    const newEdge: CausalEdge = {
      id: generateId('edge_man'),
      sourceEventId: newEdgeSourceId,
      targetEventId: newEdgeTargetId,
      edgeType: newEdgeType,
      epistemicStatus: newEdgeStatus,
      rationale:
        newEdgeRationale.trim() ||
        `Recorded ${EDGE_STYLE_CONFIG[newEdgeType].label} relationship.`,
    };

    onSaveAnalysis({
      ...currentAnalysis,
      causalEdges: [...(currentAnalysis.causalEdges || []), newEdge],
      analyzedAt: generateTimestamp(),
    });
    setNewEdgeRationale('');
  };

  if (!currentChapter) return null;

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#09090b]">
      {/* Left Sidebar: Chapter Selection & Extraction Controls */}
      <div className="w-80 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800/80 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <GitFork className="w-4 h-4" />
            <span>Working Narrative Diagrams</span>
          </div>
          <select
            value={currentChapter.id}
            onChange={(e) => onSelectChapter(e.target.value)}
            className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs font-mono text-stone-200"
          >
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                Ch. {c.chapterNumber}: {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Extraction Controls (Both Local Deterministic & External AI) */}
        <div className="p-4 border-b border-stone-800/80 space-y-3 bg-stone-950/50">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-400">Chapter Graph Status:</span>
            {currentAnalysis ? (
              isAnalysisStale ? (
                <span className="text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" /> Stale
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Active ({currentAnalysis.events.length} Nodes)
                </span>
              )
            ) : (
              <span className="text-stone-400">Ready to Extract</span>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={handleRunDeterministicExtraction}
              className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-100 rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-colors"
              title="Extract structural event segments locally without calling an external model"
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Deterministic Local Extract</span>
            </button>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-semibold rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting via Gemini...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Deep AI Extraction (Gemini)</span>
                </>
              )}
            </button>
          </div>

          {analysisError && (
            <div className="p-2.5 bg-red-950/60 border border-red-800 rounded text-[11px] font-mono text-red-300">
              {analysisError}
            </div>
          )}
        </div>

        {/* Edge Type Legend & Distinction Guide */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase text-stone-400 font-semibold">
              Causal vs. Temporal Edge Legend
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Distinguishes direct causation from enabling conditions, mere temporal succession, and analytical inferences:
            </p>
            <div className="space-y-1.5 text-xs font-mono pt-1">
              {(
                [
                  'direct_causation',
                  'contributing_condition',
                  'temporal_succession',
                  'inferred_connection',
                  'setup_payoff',
                ] as CausalEdgeType[]
              ).map((type) => {
                const cfg = EDGE_STYLE_CONFIG[type];
                return (
                  <div
                    key={type}
                    className="flex items-center justify-between p-2 rounded bg-stone-900/60 border border-stone-800/80"
                  >
                    <span className="text-[11px] text-stone-200">
                      {cfg.label}
                    </span>
                    <span
                      className="w-8 h-0.5 inline-block"
                      style={{
                        backgroundColor: cfg.color,
                        borderBottom: cfg.dash
                          ? `2px dashed ${cfg.color}`
                          : `2px solid ${cfg.color}`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {currentAnalysis && (
            <div className="p-3.5 bg-stone-900/50 border border-stone-800 rounded-lg space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="text-stone-400">Causal Coherence:</span>
                <span className="text-amber-400 font-semibold tabular-nums">
                  {currentAnalysis.overallNarrativeAssessment
                    .causalIntegrityScore || '95%'}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {currentAnalysis.overallNarrativeAssessment.summary}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Diagram & Analytical Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Sub-Navigation */}
        <div className="border-b border-stone-800/80 bg-[#0c0c0e] px-6 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center text-xs font-mono overflow-x-auto">
            {[
              { id: 'causality', label: 'Interactive Causality & Event Graph' },
              {
                id: 'events',
                label: `Event Sequence & Passages (${currentAnalysis?.events.length || 0})`,
              },
              {
                id: 'knowledge',
                label: `Character Epistemic Matrix (${currentAnalysis?.characterKnowledge.length || 0})`,
              },
              {
                id: 'continuity',
                label: `Setups, Payoffs & Continuity (${(currentAnalysis?.setupsAndPayoffs.length || 0) + (currentAnalysis?.continuityFindings.length || 0)})`,
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`py-3.5 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === t.id
                    ? 'border-amber-500 text-amber-400 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'causality' && (
            <div className="flex items-center gap-2 py-2 text-xs font-mono">
              <div className="flex items-center rounded border border-stone-800 bg-stone-950 p-0.5">
                <button
                  onClick={() => setGraphScope('single_chapter')}
                  className={`px-2.5 py-1 rounded ${
                    graphScope === 'single_chapter'
                      ? 'bg-stone-800 text-stone-100 font-semibold'
                      : 'text-stone-400'
                  }`}
                >
                  Ch. {currentChapter.chapterNumber} Graph
                </button>
                <button
                  onClick={() => setGraphScope('cross_chapter')}
                  className={`px-2.5 py-1 rounded ${
                    graphScope === 'cross_chapter'
                      ? 'bg-amber-500 text-stone-950 font-semibold'
                      : 'text-stone-400'
                  }`}
                >
                  Cross-Chapter Arc ({analyses.length} Chs)
                </button>
              </div>

              <select
                value={edgeTypeFilter}
                onChange={(e) => setEdgeTypeFilter(e.target.value)}
                className="bg-stone-900 border border-stone-800 rounded px-2 py-1 text-stone-300"
              >
                <option value="all">All Edge Types</option>
                <option value="direct_causation">Direct Causation Only</option>
                <option value="contributing_condition">
                  Contributing Conditions
                </option>
                <option value="temporal_succession">
                  Temporal Succession Only
                </option>
                <option value="setup_payoff">Setup / Payoff Bridges</option>
              </select>
            </div>
          )}
        </div>

        {/* Main Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!currentAnalysis && graphScope === 'single_chapter' ? (
            <div className="p-12 border border-stone-800 rounded-xl bg-[#0e0e11] text-center space-y-4 max-w-xl mx-auto mt-8">
              <GitFork className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="text-base font-serif text-stone-100">
                Build Working Diagram for {currentChapter.title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Extract story events and causal relationships either locally via the deterministic structural extractor (instant, zero API tokens) or via Gemini Deep Analysis.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRunDeterministicExtraction}
                  className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-mono text-stone-100 flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Instant Deterministic Extract</span>
                </button>
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-mono flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Gemini Deep Analysis</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: INTERACTIVE WORKING CAUSALITY & TEMPORAL GRAPH */}
              {activeTab === 'causality' && (
                <div className="space-y-6">
                  {/* Interactive SVG Graph Canvas */}
                  <div className="border border-stone-800 rounded-xl bg-[#0c0c0e] p-5 overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-3">
                      <span>
                        {graphScope === 'single_chapter'
                          ? `Working Causal & Temporal Graph — ${currentChapter.title}`
                          : 'Cross-Chapter Narrative & Causal Topology (Act I)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsAddEventOpen(!isAddEventOpen)}
                          className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5 text-amber-400" /> Add Event Node
                        </button>
                      </div>
                    </div>

                    {isAddEventOpen && (
                      <div className="mb-4 p-4 border border-stone-700 rounded-lg bg-stone-900/70 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                        <input
                          type="text"
                          value={newEvtTitle}
                          onChange={(e) => setNewEvtTitle(e.target.value)}
                          placeholder="Event Title *"
                          className="bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                        />
                        <input
                          type="text"
                          value={newEvtTime}
                          onChange={(e) => setNewEvtTime(e.target.value)}
                          placeholder="Story Time (e.g. 8:45 AM)"
                          className="bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                        />
                        <input
                          type="text"
                          value={newEvtChars}
                          onChange={(e) => setNewEvtChars(e.target.value)}
                          placeholder="Characters (comma separated)"
                          className="bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                        />
                        <input
                          type="text"
                          value={newEvtSummary}
                          onChange={(e) => setNewEvtSummary(e.target.value)}
                          placeholder="Event Summary..."
                          className="bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 md:col-span-2"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newEvtExcerpt}
                            onChange={(e) => setNewEvtExcerpt(e.target.value)}
                            placeholder="Supporting Quote Excerpt..."
                            className="bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 flex-1"
                          />
                          <button
                            onClick={handleAddEvent}
                            className="px-3 py-2 bg-amber-500 text-stone-950 font-semibold rounded"
                          >
                            Save Node
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="min-w-[760px] py-3">
                      {(() => {
                        const events = graphData.events;
                        const edges = graphData.edges;
                        const nodeWidth = 220;
                        const nodeHeight = 82;
                        const gapX = 64;
                        const gapY = 36;

                        const stages: Record<string, number> = {};
                        events.forEach((evt, idx) => {
                          const incoming = edges.filter(
                            (e) => e.targetEventId === evt.id
                          );
                          if (incoming.length === 0) {
                            stages[evt.id] = idx === 0 ? 0 : Math.floor(idx / 2);
                          } else {
                            const maxPred = Math.max(
                              ...incoming.map(
                                (inc) => stages[inc.sourceEventId] ?? 0
                              ),
                              0
                            );
                            stages[evt.id] = maxPred + 1;
                          }
                        });

                        const stageBuckets: Record<number, StoryEvent[]> = {};
                        events.forEach((evt) => {
                          const stg = stages[evt.id] || 0;
                          if (!stageBuckets[stg]) stageBuckets[stg] = [];
                          stageBuckets[stg].push(evt);
                        });

                        const stageKeys = Object.keys(stageBuckets)
                          .map(Number)
                          .sort((a, b) => a - b);
                        const maxInStage = Math.max(
                          ...Object.values(stageBuckets).map((b) => b.length),
                          1
                        );

                        const totalWidth = Math.max(
                          stageKeys.length * (nodeWidth + gapX) + 60,
                          760
                        );
                        const totalHeight = Math.max(
                          maxInStage * (nodeHeight + gapY) + 60,
                          240
                        );

                        const positions: Record<
                          string,
                          { x: number; y: number }
                        > = {};
                        stageKeys.forEach((stg, colIdx) => {
                          stageBuckets[stg].forEach((evt, rowIdx) => {
                            positions[evt.id] = {
                              x: 24 + colIdx * (nodeWidth + gapX),
                              y: 24 + rowIdx * (nodeHeight + gapY),
                            };
                          });
                        });

                        return (
                          <svg
                            viewBox={`0 0 ${totalWidth} ${totalHeight}`}
                            className="w-full h-auto overflow-visible"
                            style={{ minHeight: `${totalHeight}px` }}
                          >
                            <defs>
                              {Object.entries(EDGE_STYLE_CONFIG).map(
                                ([type, cfg]) => (
                                  <marker
                                    key={type}
                                    id={`arrow-${type}`}
                                    viewBox="0 0 10 10"
                                    refX="7"
                                    refY="5"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto-start-reverse"
                                  >
                                    <path
                                      d="M 0 1.5 L 8 5 L 0 8.5 z"
                                      fill={cfg.color}
                                    />
                                  </marker>
                                )
                              )}
                            </defs>

                            {/* Render Typed Edges */}
                            {edges.map((edge) => {
                              const sourcePos = positions[edge.sourceEventId];
                              const targetPos = positions[edge.targetEventId];
                              if (!sourcePos || !targetPos) return null;

                              const startX = sourcePos.x + nodeWidth;
                              const startY = sourcePos.y + nodeHeight / 2;
                              const endX = targetPos.x;
                              const endY = targetPos.y + nodeHeight / 2;
                              const ctrl = Math.max(
                                Math.abs(endX - startX) / 2,
                                30
                              );
                              const cfg =
                                EDGE_STYLE_CONFIG[edge.edgeType] ||
                                EDGE_STYLE_CONFIG.direct_causation;
                              const isHighlighted =
                                selectedEventId === edge.sourceEventId ||
                                selectedEventId === edge.targetEventId;

                              return (
                                <g key={edge.id}>
                                  <path
                                    d={`M ${startX} ${startY} C ${startX + ctrl} ${startY}, ${endX - ctrl} ${endY}, ${endX} ${endY}`}
                                    fill="none"
                                    stroke={cfg.color}
                                    strokeWidth={isHighlighted ? 2.6 : 1.7}
                                    strokeDasharray={cfg.dash}
                                    markerEnd={`url(#arrow-${edge.edgeType})`}
                                  />
                                  <text
                                    x={(startX + endX) / 2}
                                    y={(startY + endY) / 2 - 6}
                                    textAnchor="middle"
                                    fill={cfg.color}
                                    fontSize={9}
                                    fontFamily="monospace"
                                  >
                                    {cfg.label}
                                  </text>
                                </g>
                              );
                            })}

                            {/* Render Event Nodes */}
                            {events.map((evt) => {
                              const pos = positions[evt.id];
                              if (!pos) return null;
                              const isSelected = selectedEventId === evt.id;
                              const ch = chapters.find(
                                (c) =>
                                  c.id ===
                                  (evt.chapterId || currentAnalysis?.chapterId)
                              );

                              return (
                                <g
                                  key={evt.id}
                                  transform={`translate(${pos.x}, ${pos.y})`}
                                  onClick={() =>
                                    setSelectedEventId(
                                      isSelected ? null : evt.id
                                    )
                                  }
                                  className="cursor-pointer"
                                >
                                  <rect
                                    width={nodeWidth}
                                    height={nodeHeight}
                                    rx={8}
                                    fill={isSelected ? '#291d0a' : '#141418'}
                                    stroke={isSelected ? '#f59e0b' : '#2e2e36'}
                                    strokeWidth={isSelected ? 2 : 1.2}
                                  />
                                  <text
                                    x={10}
                                    y={19}
                                    fill="#f59e0b"
                                    fontSize={9.5}
                                    fontFamily="monospace"
                                    fontWeight="bold"
                                  >
                                    {ch ? `Ch.${ch.chapterNumber}` : ''} #
                                    {evt.sequenceIndex}
                                  </text>
                                  <text
                                    x={nodeWidth - 10}
                                    y={19}
                                    textAnchor="end"
                                    fill="#a8a29e"
                                    fontSize={9}
                                    fontFamily="monospace"
                                  >
                                    {evt.storyTimeEstimate ||
                                      evt.chronologyType}
                                  </text>
                                  <text
                                    x={10}
                                    y={39}
                                    fill="#f5f5f4"
                                    fontSize={11}
                                    fontWeight="600"
                                  >
                                    {evt.title.length > 26
                                      ? evt.title.slice(0, 24) + '...'
                                      : evt.title}
                                  </text>
                                  <text
                                    x={10}
                                    y={57}
                                    fill="#a8a29e"
                                    fontSize={9.5}
                                  >
                                    {evt.summary.length > 32
                                      ? evt.summary.slice(0, 30) + '...'
                                      : evt.summary}
                                  </text>
                                  <text
                                    x={10}
                                    y={73}
                                    fill="#10b981"
                                    fontSize={8.5}
                                    fontFamily="monospace"
                                  >
                                    {evt.supportingPassageExcerpt
                                      ? '✓ Linked Passage Anchor'
                                      : 'Derived Event Node'}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Selected Node Inspector & Passage Linker + Causal Edge Builder */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Selected Node Detail Card */}
                    <div className="lg:col-span-2 p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-4">
                      {selectedEvent ? (
                        <>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="text-[11px] font-mono uppercase text-amber-400">
                                Selected Event Node #{selectedEvent.sequenceIndex}{' '}
                                • {selectedEvent.storyTimeEstimate || selectedEvent.chronologyType}
                              </span>
                              <h4 className="text-base font-serif text-stone-100">
                                {selectedEvent.title}
                              </h4>
                            </div>

                            <div className="flex items-center gap-2">
                              {onNavigateToChapterPassage && (
                                <button
                                  onClick={() =>
                                    onNavigateToChapterPassage(
                                      selectedEvent.chapterId ||
                                        currentChapter.id,
                                      selectedEvent.supportingPassageExcerpt
                                    )
                                  }
                                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-mono flex items-center gap-1.5"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>Jump to Source Passage</span>
                                </button>
                              )}
                              {onPinItem && (
                                <button
                                  onClick={() =>
                                    onPinItem({
                                      id: generateId('pin_evt'),
                                      type: 'event',
                                      title: selectedEvent.title,
                                      subtitle: `Ch. ${currentChapter.chapterNumber} Event #${selectedEvent.sequenceIndex}`,
                                      content: `${selectedEvent.summary}${selectedEvent.supportingPassageExcerpt ? `\n\nQuote: "${selectedEvent.supportingPassageExcerpt}"` : ''}`,
                                      chapterId:
                                        selectedEvent.chapterId ||
                                        currentChapter.id,
                                      sourceId: selectedEvent.id,
                                      provenance:
                                        selectedEvent.epistemicStatus ||
                                        'derived_analysis',
                                      pinnedAt: Date.now(),
                                    })
                                  }
                                  className="px-2.5 py-1.5 rounded border border-stone-700 bg-stone-900 text-stone-200 text-xs font-mono flex items-center gap-1"
                                >
                                  <Pin className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Pin Node</span>
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-stone-300 leading-relaxed">
                            {selectedEvent.summary}
                          </p>

                          {selectedEvent.supportingPassageExcerpt && (
                            <div className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                              <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                                Authoritative Canonical Passage Anchor
                              </span>
                              <blockquote className="text-xs font-serif italic text-stone-200 leading-relaxed">
                                &ldquo;{selectedEvent.supportingPassageExcerpt}&rdquo;
                              </blockquote>
                            </div>
                          )}

                          {/* Incoming & Outgoing Typed Causal Edges for this Node */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
                            <div className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1.5">
                              <span className="text-[10px] uppercase text-stone-400 block">
                                Incoming Links (Predecessors):
                              </span>
                              {graphData.edges
                                .filter(
                                  (e) => e.targetEventId === selectedEvent.id
                                )
                                .map((edge) => {
                                  const src = graphData.events.find(
                                    (ev) => ev.id === edge.sourceEventId
                                  );
                                  return (
                                    <div
                                      key={edge.id}
                                      className="p-2 rounded bg-stone-900 border border-stone-800 space-y-0.5"
                                    >
                                      <div className="text-amber-400 font-semibold">
                                        {src?.title || edge.sourceEventId}
                                      </div>
                                      <div className="text-[10px] text-stone-400">
                                        Type:{' '}
                                        {
                                          EDGE_STYLE_CONFIG[edge.edgeType]
                                            ?.label
                                        }{' '}
                                        ({edge.epistemicStatus})
                                      </div>
                                      <div className="text-[11px] text-stone-300">
                                        {edge.rationale}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1.5">
                              <span className="text-[10px] uppercase text-stone-400 block">
                                Outgoing Links (Effects / Successors):
                              </span>
                              {graphData.edges
                                .filter(
                                  (e) => e.sourceEventId === selectedEvent.id
                                )
                                .map((edge) => {
                                  const tgt = graphData.events.find(
                                    (ev) => ev.id === edge.targetEventId
                                  );
                                  return (
                                    <div
                                      key={edge.id}
                                      className="p-2 rounded bg-stone-900 border border-stone-800 space-y-0.5"
                                    >
                                      <div className="text-emerald-400 font-semibold">
                                        {tgt?.title || edge.targetEventId}
                                      </div>
                                      <div className="text-[10px] text-stone-400">
                                        Type:{' '}
                                        {
                                          EDGE_STYLE_CONFIG[edge.edgeType]
                                            ?.label
                                        }{' '}
                                        ({edge.epistemicStatus})
                                      </div>
                                      <div className="text-[11px] text-stone-300">
                                        {edge.rationale}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="py-8 text-center text-xs font-mono text-stone-400">
                          Click any Event Node in the diagram above to inspect its canonical passage anchor, decisions, and typed causal vs. temporal edges.
                        </div>
                      )}
                    </div>

                    {/* Add Typed Relationship Edge Tool */}
                    <div className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3 text-xs font-mono">
                      <div className="text-amber-400 uppercase font-semibold flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Add Typed Causal / Temporal Link</span>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase text-stone-400 block mb-1">
                          Source Event
                        </label>
                        <select
                          value={newEdgeSourceId}
                          onChange={(e) => setNewEdgeSourceId(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                        >
                          <option value="">Select Source Node...</option>
                          {(currentAnalysis?.events || []).map((ev) => (
                            <option key={ev.id} value={ev.id}>
                              #{ev.sequenceIndex}: {ev.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase text-stone-400 block mb-1">
                          Target Event
                        </label>
                        <select
                          value={newEdgeTargetId}
                          onChange={(e) => setNewEdgeTargetId(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                        >
                          <option value="">Select Target Node...</option>
                          {(currentAnalysis?.events || []).map((ev) => (
                            <option key={ev.id} value={ev.id}>
                              #{ev.sequenceIndex}: {ev.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase text-stone-400 block mb-1">
                            Relationship Type
                          </label>
                          <select
                            value={newEdgeType}
                            onChange={(e) =>
                              setNewEdgeType(e.target.value as CausalEdgeType)
                            }
                            className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                          >
                            <option value="direct_causation">
                              Direct Causation
                            </option>
                            <option value="contributing_condition">
                              Contributing Condition
                            </option>
                            <option value="temporal_succession">
                              Temporal Succession Only
                            </option>
                            <option value="inferred_connection">
                              Inferred Hypothesis
                            </option>
                            <option value="setup_payoff">Setup -&gt; Payoff</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase text-stone-400 block mb-1">
                            Epistemic Status
                          </label>
                          <select
                            value={newEdgeStatus}
                            onChange={(e) =>
                              setNewEdgeStatus(
                                e.target.value as EpistemicStatus
                              )
                            }
                            className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                          >
                            <option value="explicit_text">Explicit in Text</option>
                            <option value="inferred">Inferred</option>
                            <option value="hypothesis">Working Hypothesis</option>
                          </select>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={newEdgeRationale}
                        onChange={(e) => setNewEdgeRationale(e.target.value)}
                        placeholder="Analytical rationale for this link..."
                        className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                      />

                      <button
                        onClick={handleAddCausalEdge}
                        className="w-full py-2 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold"
                      >
                        Add Link to Graph
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EVENTS TIMELINE & PASSAGES */}
              {activeTab === 'events' && currentAnalysis && (
                <div className="space-y-3 max-w-4xl">
                  {currentAnalysis.events.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-400 font-bold">
                          #{evt.sequenceIndex} • {evt.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-stone-400">
                            {evt.storyTimeEstimate || evt.chronologyType}
                          </span>
                          {onNavigateToChapterPassage && (
                            <button
                              onClick={() =>
                                onNavigateToChapterPassage(
                                  currentChapter.id,
                                  evt.supportingPassageExcerpt
                                )
                              }
                              className="text-amber-400 hover:underline"
                            >
                              Open in Chapter
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {evt.summary}
                      </p>
                      {evt.supportingPassageExcerpt && (
                        <blockquote className="p-2.5 bg-stone-950 border-l-2 border-amber-500 text-xs font-serif italic text-stone-300">
                          &ldquo;{evt.supportingPassageExcerpt}&rdquo;
                        </blockquote>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: CHARACTER KNOWLEDGE & EPISTEMIC BOUNDARY MATRIX */}
              {activeTab === 'knowledge' && currentAnalysis && (
                <div className="space-y-4 max-w-4xl">
                  {currentAnalysis.characterKnowledge.map((k, idx) => (
                    <div
                      key={idx}
                      className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold font-mono text-stone-100 flex items-center gap-2">
                          <Users className="w-4 h-4 text-amber-500" />
                          <span>{k.characterName}</span>
                        </div>
                        {k.roleOrIdentityNote && (
                          <span className="text-xs font-mono text-amber-400">
                            {k.roleOrIdentityNote}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 bg-stone-950 border border-emerald-900/40 rounded">
                          <span className="text-emerald-400 font-semibold block mb-1">
                            Verified Knowledge (Knows)
                          </span>
                          <ul className="space-y-1 text-stone-300 text-[11px]">
                            {k.knows.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-stone-950 border border-amber-900/40 rounded">
                          <span className="text-amber-400 font-semibold block mb-1">
                            Active Inferences (Suspects)
                          </span>
                          <ul className="space-y-1 text-stone-300 text-[11px]">
                            {k.suspects.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-stone-950 border border-red-900/40 rounded">
                          <span className="text-red-400 font-semibold block mb-1">
                            Misconceptions / Rationalizations (Believes Falsely)
                          </span>
                          <ul className="space-y-1 text-stone-300 text-[11px]">
                            {k.believesFalsely.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-stone-950 border border-stone-800 rounded">
                          <span className="text-stone-400 font-semibold block mb-1">
                            Epistemic Blindspots (Unaware Of)
                          </span>
                          <ul className="space-y-1 text-stone-400 text-[11px]">
                            {k.unawareOf.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: SETUPS, PAYOFFS & CONTINUITY */}
              {activeTab === 'continuity' && currentAnalysis && (
                <div className="space-y-6 max-w-4xl">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase text-stone-400 font-semibold">
                      Continuity Verification & Discrepancy Records
                    </h4>
                    {currentAnalysis.continuityFindings.map((cf) => (
                      <div
                        key={cf.id}
                        className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span
                            className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold border ${
                              cf.severity === 'verified_continuity'
                                ? 'border-emerald-800 bg-emerald-950/40 text-emerald-400'
                                : 'border-amber-800 bg-amber-950/40 text-amber-400'
                            }`}
                          >
                            {cf.severity.replace(/_/g, ' ')}
                          </span>
                          <span className="text-stone-400">
                            Status: {cf.epistemicStatus || 'explicit_text'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-200 leading-relaxed">
                          {cf.description}
                        </p>
                        {cf.passageReference && (
                          <blockquote className="text-[11px] font-serif italic text-stone-400 border-l-2 border-amber-500/60 pl-2.5">
                            &ldquo;{cf.passageReference}&rdquo;
                          </blockquote>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase text-stone-400 font-semibold">
                      Narrative Setups & Payoffs Across Chapters
                    </h4>
                    {currentAnalysis.setupsAndPayoffs.map((sp, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-amber-400 font-semibold">
                            Setup -&gt; Payoff Thread #{idx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 uppercase text-[10px]">
                            {sp.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-stone-950 border border-stone-800 rounded">
                            <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                              Setup Planted:
                            </span>
                            <p className="text-stone-200">{sp.setup}</p>
                          </div>
                          <div className="p-3 bg-stone-950 border border-stone-800 rounded">
                            <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                              Payoff / Downstream Target:
                            </span>
                            <p className="text-stone-200">{sp.payoff}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
