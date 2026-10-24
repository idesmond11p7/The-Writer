'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChapterDraft, 
  ChapterAnalysis, 
  StoryEvent, 
  CharacterKnowledgeState, 
  ContinuityFinding,
  AIExecutionLog,
  EventChronologyType
} from '@/types/domain';
import { generateTimestamp, generateId, formatTimeOnly } from '@/lib/utils';
import { DEFAULT_MODEL_ID } from '@/lib/models';
import { 
  GitFork, 
  Play, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  Plus, 
  Layers, 
  FileText, 
  ChevronRight, 
  ShieldAlert, 
  HelpCircle, 
  Eye, 
  X 
} from 'lucide-react';

interface ChapterIntelligenceProps {
  chapters: ChapterDraft[];
  analyses: ChapterAnalysis[];
  activeChapterId?: string;
  onSaveAnalysis: (analysis: ChapterAnalysis) => void;
  onLogExecution: (log: AIExecutionLog) => void;
  onSelectChapter: (id: string) => void;
}

export default function ChapterIntelligence({
  chapters,
  analyses,
  activeChapterId,
  onSaveAnalysis,
  onLogExecution,
  onSelectChapter,
}: ChapterIntelligenceProps) {
  const currentChapter = useMemo(() => {
    return chapters.find((c) => c.id === activeChapterId) || chapters[0] || null;
  }, [chapters, activeChapterId]);

  // Find analysis for this chapter
  const currentAnalysis = useMemo(() => {
    if (!currentChapter) return null;
    return analyses.find((a) => a.chapterId === currentChapter.id) || null;
  }, [analyses, currentChapter]);

  // Check if stale (chapter updated after analysis)
  const isAnalysisStale = useMemo(() => {
    if (!currentAnalysis || !currentChapter) return false;
    return currentChapter.updatedAt > currentAnalysis.analyzedAt;
  }, [currentAnalysis, currentChapter]);

  const [activeTab, setActiveTab] = useState<'events' | 'causality' | 'knowledge' | 'continuity' | 'techniques' | 'narrative'>('events');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Selected event for detail inspection
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Manual event addition state
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>('');
  const [newEventSummary, setNewEventSummary] = useState<string>('');
  const [newEventLocation, setNewEventLocation] = useState<string>('');
  const [newEventTime, setNewEventTime] = useState<string>('');
  const [newEventChronology, setNewEventChronology] = useState<EventChronologyType>('linear');
  const [newEventCharacters, setNewEventCharacters] = useState<string>('Issei Hyoudou');
  const [newEventPredecessors, setNewEventPredecessors] = useState<string[]>([]);
  const [newEventExcerpt, setNewEventExcerpt] = useState<string>('');

  const handleManualAddEvent = () => {
    if (!currentAnalysis || !newEventTitle.trim()) {
      alert('Please enter an event title.');
      return;
    }
    const newEvt: StoryEvent = {
      id: generateId('evt_man'),
      sequenceIndex: currentAnalysis.events.length + 1,
      title: newEventTitle,
      summary: newEventSummary,
      sceneLocation: newEventLocation || undefined,
      storyTimeEstimate: newEventTime || undefined,
      chronologyType: newEventChronology,
      charactersPresent: newEventCharacters.split(',').map((c) => c.trim()).filter(Boolean),
      decisionPoints: [],
      directConsequences: [],
      causalPredecessors: newEventPredecessors,
      supportingPassageExcerpt: newEventExcerpt || undefined,
    };
    const updatedAnalysis: ChapterAnalysis = {
      ...currentAnalysis,
      events: [...currentAnalysis.events, newEvt],
      analyzedAt: generateTimestamp(),
    };
    onSaveAnalysis(updatedAnalysis);
    setIsAddEventModalOpen(false);
    setNewEventTitle('');
    setNewEventSummary('');
    setNewEventExcerpt('');
    setNewEventPredecessors([]);
  };

  // Trigger real AI analysis via /api/orchestrate
  const handleRunAnalysis = async () => {
    if (!currentChapter || !currentChapter.currentContent.trim()) {
      alert('Chapter has no text to analyze. Please write or import chapter prose first.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: 'chapter_analysis',
          modelId: DEFAULT_MODEL_ID,
          userPrompt: 'Extract story events, causal connections, character knowledge states, setups/payoffs, and continuity verification strictly based on the provided text.',
          contextText: currentChapter.currentContent,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete chapter analysis');
      }

      // Parse JSON from model
      let parsed: any;
      try {
        const cleaned = data.outputText
          .replace(/```json/gi, '')
          .replace(/```/g, '')
          .trim();
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        console.error('Failed to parse analysis JSON:', parseErr, data.outputText);
        throw new Error('Model produced non-JSON format. Raw text preserved in logs.');
      }

      const newAnalysis: ChapterAnalysis = {
        id: `ana_${Date.now()}`,
        chapterId: currentChapter.id,
        chapterVersionTimestamp: currentChapter.updatedAt,
        analyzedAt: Date.now(),
        isStale: false,
        modelIdentifier: data.modelId,
        events: parsed.events || [],
        characterKnowledge: parsed.characterKnowledge || [],
        setupsAndPayoffs: parsed.setupsAndPayoffs || [],
        continuityFindings: parsed.continuityFindings || [],
        identifiedTechniques: parsed.identifiedTechniques || [],
        overallNarrativeAssessment: parsed.overallNarrativeAssessment || {
          strengths: ['Analysis generated'],
          vulnerabilities: [],
          causalIntegrityScore: '90%',
          summary: 'Analysis completed successfully.',
        },
      };

      onSaveAnalysis(newAnalysis);

      // Log execution
      const logEntry: AIExecutionLog = {
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
      };
      onLogExecution(logEntry);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setAnalysisError(msg);

      // Log failure
      const failLog: AIExecutionLog = {
        id: `exec_${Date.now()}`,
        timestamp: Date.now(),
        provider: 'gemini',
        modelId: DEFAULT_MODEL_ID,
        taskType: 'chapter_analysis',
        chapterId: currentChapter.id,
        techniquePackIds: currentChapter.activeTechniquePackIds || [],
        inputPromptSummary: `Chapter ${currentChapter.chapterNumber} Intelligence Analysis (Failed)`,
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
      setIsAnalyzing(false);
    }
  };

  const selectedEvent = useMemo(() => {
    if (!currentAnalysis || !selectedEventId) return null;
    return currentAnalysis.events.find((e) => e.id === selectedEventId) || null;
  }, [currentAnalysis, selectedEventId]);

  if (!currentChapter) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 p-8">
        No chapter selected.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Chapter Selector & Overview Sidebar */}
      <div className="w-80 border-r border-stone-800 bg-stone-950 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5 mb-2">
            <GitFork className="w-4 h-4 text-amber-500" />
            <span>Chapter Intelligence</span>
          </div>
          <select
            value={currentChapter.id}
            onChange={(e) => onSelectChapter(e.target.value)}
            className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-xs font-mono text-stone-200"
          >
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                Ch. {c.chapterNumber}: {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Analysis Status & Action Card */}
        <div className="p-4 border-b border-stone-800 space-y-3 bg-stone-900/20">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-400">Analysis Status:</span>
            {currentAnalysis ? (
              isAnalysisStale ? (
                <span className="text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" /> Stale (Edited)
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Current
                </span>
              )
            ) : (
              <span className="text-stone-500">Not Analyzed</span>
            )}
          </div>

          {currentAnalysis && (
            <div className="text-[11px] font-mono text-stone-500 space-y-0.5">
              <div>Analyzed: {formatTimeOnly(currentAnalysis.analyzedAt)}</div>
              <div>Model: {currentAnalysis.modelIdentifier || 'Gemini'}</div>
              <div>Events: {currentAnalysis.events.length} extracted</div>
            </div>
          )}

          {analysisError && (
            <div className="p-2.5 bg-red-950/60 border border-red-800/80 rounded text-[11px] text-red-300 font-mono">
              {analysisError}
            </div>
          )}

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-semibold rounded text-xs font-mono flex items-center justify-center gap-2 transition-colors"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Extracting Events...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentAnalysis ? 'Re-Analyze Chapter' : 'Run Deep Analysis'}</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Findings Highlights */}
        {currentAnalysis && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-[11px] font-mono uppercase text-stone-400 font-semibold">
              Narrative Integrity
            </div>
            <div className="p-3 bg-stone-900 border border-stone-800 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="text-stone-400">Causal Coherence:</span>
                <span className="text-amber-400 font-semibold">
                  {currentAnalysis.overallNarrativeAssessment.causalIntegrityScore || 'Evaluated'}
                </span>
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                {currentAnalysis.overallNarrativeAssessment.summary}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Analysis Visualizer & Inspector */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-stone-950">
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-stone-800 bg-stone-900/30 px-6 text-xs font-mono flex-shrink-0">
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'border-amber-500 text-amber-400 font-medium'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>Events Timeline ({currentAnalysis?.events.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('causality')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'causality'
                ? 'border-amber-500 text-amber-400 font-medium'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Causality Graph</span>
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'knowledge'
                ? 'border-amber-500 text-amber-400 font-medium'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Character Knowledge Tracking</span>
          </button>
          <button
            onClick={() => setActiveTab('continuity')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'continuity'
                ? 'border-amber-500 text-amber-400 font-medium'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Continuity & Setups</span>
          </button>
          <button
            onClick={() => setActiveTab('techniques')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'techniques'
                ? 'border-amber-500 text-amber-400 font-medium'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Technique Execution</span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="flex-1 overflow-y-auto p-6 max-w-5xl space-y-6">
          {!currentAnalysis ? (
            <div className="border border-stone-800 rounded-lg p-12 text-center space-y-3 bg-stone-900/10">
              <GitFork className="w-8 h-8 text-stone-600 mx-auto" />
              <h3 className="text-sm font-semibold text-stone-200">
                No Analysis Available for Chapter {currentChapter.chapterNumber}
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Execute deep analysis to extract structured story events, causal dependencies, character knowledge states, and technique adherence directly from the drafted prose.
              </p>
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold rounded text-xs font-mono inline-flex items-center gap-2"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Begin Analysis</span>
              </button>
            </div>
          ) : (
            <>
              {/* Events Chronology Tab */}
              {activeTab === 'events' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <div className="flex items-center gap-2">
                      <span>Extracted Narrative Sequence (Text Grounded)</span>
                      <span className="text-stone-600">|</span>
                      <span className="text-stone-300">{currentAnalysis.events.length} Identifiable Story Events</span>
                    </div>
                    <button
                      onClick={() => setIsAddEventModalOpen(true)}
                      className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded text-xs font-mono inline-flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-500" />
                      <span>Add Manual Event</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentAnalysis.events.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEventId(evt.id === selectedEventId ? null : evt.id)}
                        className={`p-4 border rounded cursor-pointer transition-all ${
                          selectedEventId === evt.id
                            ? 'border-amber-600 bg-amber-950/20 shadow-md'
                            : 'border-stone-800 bg-stone-900/30 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-amber-500 font-bold">
                              #{evt.sequenceIndex}
                            </span>
                            <span className="text-xs font-semibold text-stone-200">
                              {evt.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 uppercase">
                              {evt.chronologyType}
                            </span>
                            {evt.storyTimeEstimate && (
                              <span className="text-stone-500">{evt.storyTimeEstimate}</span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-stone-300 leading-relaxed">
                          {evt.summary}
                        </p>

                        {/* Supporting Quote Preview */}
                        {evt.supportingPassageExcerpt && (
                          <div className="mt-2.5 p-2 bg-stone-950 border border-stone-800/80 rounded font-serif text-[11px] text-stone-400 italic">
                            &ldquo;{evt.supportingPassageExcerpt}&rdquo;
                          </div>
                        )}

                        {/* Detailed Expansion */}
                        {selectedEventId === evt.id && (
                          <div className="mt-3 pt-3 border-t border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono animate-in fade-in">
                            <div className="p-2.5 bg-stone-900/60 rounded border border-stone-800">
                              <span className="text-stone-400 block font-semibold mb-1">
                                Decisions & Actions:
                              </span>
                              <ul className="space-y-1 text-stone-300 text-[11px]">
                                {evt.decisionPoints && evt.decisionPoints.length > 0 ? (
                                  evt.decisionPoints.map((d, i) => (
                                    <li key={i}>• {d}</li>
                                  ))
                                ) : (
                                  <li className="text-stone-500">None explicitly recorded</li>
                                )}
                              </ul>
                            </div>

                            <div className="p-2.5 bg-stone-900/60 rounded border border-stone-800">
                              <span className="text-stone-400 block font-semibold mb-1">
                                Direct Consequences:
                              </span>
                              <ul className="space-y-1 text-stone-300 text-[11px]">
                                {evt.directConsequences && evt.directConsequences.length > 0 ? (
                                  evt.directConsequences.map((c, i) => (
                                    <li key={i}>• {c}</li>
                                  ))
                                ) : (
                                  <li className="text-stone-500">None explicitly recorded</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Causality Graph Tab */}
              {activeTab === 'causality' && (
                <div className="space-y-5">
                  <div className="p-4 bg-stone-900/40 border border-stone-800 rounded text-xs text-stone-400">
                    <span className="font-mono text-amber-400 font-semibold block mb-0.5">
                      Causality vs. Temporal Proximity
                    </span>
                    Events occurring sequentially are not assumed to cause one another. The graph below maps true causal dependencies (&quot;Predecessor &rarr; Consequence&quot;). Click any node to highlight related causal vectors.
                  </div>

                  {/* Interactive SVG Causality Diagram */}
                  <div className="border border-stone-800 rounded-lg bg-stone-950 p-4 overflow-x-auto">
                    <div className="text-xs font-mono text-stone-400 mb-2 flex items-center justify-between">
                      <span>Causal Dependency Graph Flow</span>
                      <span className="text-[11px] text-stone-500">
                        {selectedEventId ? 'Click on node to deselect' : 'Click node to inspect dependencies'}
                      </span>
                    </div>

                    <div className="min-w-[680px] py-4">
                      {(() => {
                        // Compute layout coordinates for nodes
                        const events = currentAnalysis.events;
                        const nodeWidth = 200;
                        const nodeHeight = 72;
                        const gapX = 60;
                        const gapY = 36;

                        // Calculate stage/column per event based on predecessor chains
                        const stages: Record<string, number> = {};
                        events.forEach((evt) => {
                          if (!evt.causalPredecessors || evt.causalPredecessors.length === 0) {
                            stages[evt.id] = 0;
                          } else {
                            const maxPredStage = Math.max(
                              ...evt.causalPredecessors.map((pid) => stages[pid] ?? 0),
                              0
                            );
                            stages[evt.id] = maxPredStage + 1;
                          }
                        });

                        // Group events by stage
                        const stageBuckets: Record<number, typeof events> = {};
                        events.forEach((evt) => {
                          const stg = stages[evt.id] || 0;
                          if (!stageBuckets[stg]) stageBuckets[stg] = [];
                          stageBuckets[stg].push(evt);
                        });

                        const stageKeys = Object.keys(stageBuckets).map(Number).sort((a, b) => a - b);
                        const maxInStage = Math.max(...Object.values(stageBuckets).map((b) => b.length), 1);

                        const totalWidth = Math.max(stageKeys.length * (nodeWidth + gapX) + 60, 680);
                        const totalHeight = Math.max(maxInStage * (nodeHeight + gapY) + 60, 240);

                        // Map node positions
                        const positions: Record<string, { x: number; y: number }> = {};
                        stageKeys.forEach((stg) => {
                          const columnEvents = stageBuckets[stg];
                          columnEvents.forEach((evt, idx) => {
                            const x = 30 + stg * (nodeWidth + gapX);
                            const y = 30 + idx * (nodeHeight + gapY);
                            positions[evt.id] = { x, y };
                          });
                        });

                        return (
                          <svg
                            viewBox={`0 0 ${totalWidth} ${totalHeight}`}
                            className="w-full h-auto overflow-visible"
                            style={{ minHeight: `${totalHeight}px` }}
                          >
                            <defs>
                              <marker
                                id="arrow-default"
                                viewBox="0 0 10 10"
                                refX="6"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                              >
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#78716c" />
                              </marker>
                              <marker
                                id="arrow-active"
                                viewBox="0 0 10 10"
                                refX="6"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                              >
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
                              </marker>
                            </defs>

                            {/* Render Causal Edges */}
                            {events.map((evt) => {
                              const targetPos = positions[evt.id];
                              if (!targetPos || !evt.causalPredecessors) return null;

                              return evt.causalPredecessors.map((predId) => {
                                const sourcePos = positions[predId];
                                if (!sourcePos) return null;

                                const startX = sourcePos.x + nodeWidth;
                                const startY = sourcePos.y + nodeHeight / 2;
                                const endX = targetPos.x;
                                const endY = targetPos.y + nodeHeight / 2;
                                const ctrlOffset = Math.max((endX - startX) / 2, 25);

                                const isHighlighted =
                                  selectedEventId === evt.id || selectedEventId === predId;

                                return (
                                  <path
                                    key={`${predId}->${evt.id}`}
                                    d={`M ${startX} ${startY} C ${startX + ctrlOffset} ${startY}, ${endX - ctrlOffset} ${endY}, ${endX} ${endY}`}
                                    fill="none"
                                    stroke={isHighlighted ? '#f59e0b' : '#57534e'}
                                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                                    strokeDasharray={isHighlighted ? undefined : '4 3'}
                                    markerEnd={isHighlighted ? 'url(#arrow-active)' : 'url(#arrow-default)'}
                                    className="transition-all duration-200"
                                  />
                                );
                              });
                            })}

                            {/* Render Event Nodes */}
                            {events.map((evt) => {
                              const pos = positions[evt.id];
                              if (!pos) return null;
                              const isSelected = selectedEventId === evt.id;
                              const causesThis = selectedEventId
                                ? currentAnalysis.events
                                    .find((e) => e.id === selectedEventId)
                                    ?.causalPredecessors?.includes(evt.id)
                                : false;
                              const causedByThis = selectedEventId
                                ? evt.causalPredecessors?.includes(selectedEventId)
                                : false;

                              let strokeColor = '#38322e';
                              let fillColor = '#1c1917';
                              if (isSelected) {
                                strokeColor = '#f59e0b';
                                fillColor = '#451a03';
                              } else if (causesThis || causedByThis) {
                                strokeColor = '#d97706';
                                fillColor = '#292524';
                              }

                              return (
                                <g
                                  key={evt.id}
                                  transform={`translate(${pos.x}, ${pos.y})`}
                                  onClick={() =>
                                    setSelectedEventId(isSelected ? null : evt.id)
                                  }
                                  className="cursor-pointer"
                                >
                                  <rect
                                    width={nodeWidth}
                                    height={nodeHeight}
                                    rx={6}
                                    fill={fillColor}
                                    stroke={strokeColor}
                                    strokeWidth={isSelected ? 2 : 1.2}
                                    className="transition-colors duration-150"
                                  />
                                  {/* Sequence Pill */}
                                  <rect
                                    x={8}
                                    y={8}
                                    width={24}
                                    height={16}
                                    rx={3}
                                    fill="#292524"
                                  />
                                  <text
                                    x={20}
                                    y={20}
                                    textAnchor="middle"
                                    fill="#f59e0b"
                                    fontSize={10}
                                    fontFamily="monospace"
                                    fontWeight="bold"
                                  >
                                    #{evt.sequenceIndex}
                                  </text>
                                  {/* Chronology Badge */}
                                  <text
                                    x={nodeWidth - 10}
                                    y={20}
                                    textAnchor="end"
                                    fill="#a8a29e"
                                    fontSize={9}
                                    fontFamily="monospace"
                                  >
                                    {evt.chronologyType}
                                  </text>
                                  {/* Title */}
                                  <text
                                    x={10}
                                    y={40}
                                    fill="#fafaf9"
                                    fontSize={11}
                                    fontWeight="600"
                                  >
                                    {evt.title.length > 24
                                      ? evt.title.substring(0, 22) + '...'
                                      : evt.title}
                                  </text>
                                  {/* Summary Snippet */}
                                  <text
                                    x={10}
                                    y={58}
                                    fill="#a8a29e"
                                    fontSize={9.5}
                                  >
                                    {evt.summary.length > 30
                                      ? evt.summary.substring(0, 28) + '...'
                                      : evt.summary}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Causal Node Breakdown List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono text-stone-400 font-semibold">
                      Causal Predecessors & Effects Table
                    </div>
                    {currentAnalysis.events.map((evt) => {
                      const causes = currentAnalysis.events.filter((e) =>
                        evt.causalPredecessors?.includes(e.id)
                      );
                      const directConsequences = currentAnalysis.events.filter((e) =>
                        e.causalPredecessors?.includes(evt.id)
                      );
                      const isSelected = selectedEventId === evt.id;

                      return (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                          className={`p-4 border rounded cursor-pointer transition-all ${
                            isSelected
                              ? 'border-amber-600 bg-amber-950/20'
                              : 'border-stone-800 bg-stone-900/30 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-xs font-mono">
                              <span className="text-amber-500 font-bold">Node #{evt.sequenceIndex}:</span>
                              <span className="font-semibold text-stone-200">{evt.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-stone-500 uppercase px-2 py-0.5 rounded bg-stone-800">
                              {evt.chronologyType}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono pt-1">
                            <div className="p-2 bg-stone-950 border border-stone-800 rounded">
                              <span className="text-stone-500 text-[10px] uppercase font-semibold block mb-1">
                                Causal Predecessors (Causes):
                              </span>
                              {causes.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5">
                                  {causes.map((c) => (
                                    <span
                                      key={c.id}
                                      className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-amber-300 text-[11px] flex items-center gap-1"
                                    >
                                      <span>#{c.sequenceIndex} {c.title}</span>
                                      <ArrowRight className="w-3 h-3 text-stone-500" />
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-stone-600 italic text-[11px]">
                                  Root Scene Trigger (No preceding causes within chapter)
                                </span>
                              )}
                            </div>

                            <div className="p-2 bg-stone-950 border border-stone-800 rounded">
                              <span className="text-stone-500 text-[10px] uppercase font-semibold block mb-1">
                                Direct Consequences (Effects):
                              </span>
                              {directConsequences.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5">
                                  {directConsequences.map((cons) => (
                                    <span
                                      key={cons.id}
                                      className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-amber-300 text-[11px] flex items-center gap-1"
                                    >
                                      <span>#{cons.sequenceIndex} {cons.title}</span>
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-stone-600 italic text-[11px]">
                                  Terminal / Open Effect (Carried to subsequent scene)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Character Knowledge Tracking Tab */}
              {activeTab === 'knowledge' && (
                <div className="space-y-4">
                  <div className="text-xs text-stone-400">
                    Tracks distinct cognitive boundaries per character to safeguard against omniscient leaks.
                  </div>

                  {currentAnalysis.characterKnowledge.map((k, idx) => (
                    <div key={idx} className="p-5 border border-stone-800 rounded bg-stone-900/30 space-y-3">
                      <div className="text-sm font-semibold font-mono text-stone-100 flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-500" />
                        <span>{k.characterName}</span>
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
                            Misconceptions (Believes Falsely)
                          </span>
                          <ul className="space-y-1 text-stone-300 text-[11px]">
                            {k.believesFalsely.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-stone-950 border border-stone-800 rounded">
                          <span className="text-stone-500 font-semibold block mb-1">
                            Blindspots (Unaware Of)
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

              {/* Continuity & Setups Tab */}
              {activeTab === 'continuity' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase text-stone-400 font-semibold">
                      Continuity Findings
                    </h4>
                    {currentAnalysis.continuityFindings.map((cf) => (
                      <div key={cf.id} className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                            cf.severity === 'verified_continuity'
                              ? 'border-emerald-800 bg-emerald-950/40 text-emerald-400'
                              : 'border-amber-800 bg-amber-950/40 text-amber-400'
                          }`}>
                            {cf.severity.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-stone-200">{cf.description}</p>
                        {cf.passageReference && (
                          <div className="text-[11px] font-serif text-stone-400 italic">
                            &ldquo;{cf.passageReference}&rdquo;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-3">
                    <h4 className="text-xs font-mono uppercase text-stone-400 font-semibold">
                      Setups & Payoffs
                    </h4>
                    {currentAnalysis.setupsAndPayoffs.map((sp, idx) => (
                      <div key={idx} className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-300">Setup: {sp.setup}</span>
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] uppercase text-amber-400">
                            {sp.status}
                          </span>
                        </div>
                        <div className="text-stone-500">Payoff: {sp.payoff}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technique Execution Tab */}
              {activeTab === 'techniques' && (
                <div className="space-y-4">
                  <div className="text-xs text-stone-400">
                    Specific passages identified as executing defined Technique Pack disciplines.
                  </div>

                  {currentAnalysis.identifiedTechniques.map((it, idx) => (
                    <div key={idx} className="p-5 border border-stone-800 rounded bg-stone-900/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {it.techniqueName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 uppercase">
                          Confidence: {it.confidence}
                        </span>
                      </div>

                      <div className="p-3 bg-stone-950 border border-stone-800 rounded font-serif text-xs text-stone-300 leading-relaxed italic">
                        &ldquo;{it.supportingPassage}&rdquo;
                      </div>

                      <p className="text-xs font-mono text-stone-400">
                        {it.analysis}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Manual Event Addition Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold font-mono text-stone-200">
                  Add Manual Story Event
                </h3>
              </div>
              <button
                onClick={() => setIsAddEventModalOpen(false)}
                className="text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400">
              Record a verified narrative beat directly into the chapter&apos;s analytical ledger. Authors can supplement AI extractions with explicit canonical landmarks.
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g., Issei identifies the spatial resonance anomaly"
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">
                  Narrative Summary
                </label>
                <textarea
                  value={newEventSummary}
                  onChange={(e) => setNewEventSummary(e.target.value)}
                  placeholder="Describe the action and its direct context..."
                  rows={2}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Scene Location</label>
                  <input
                    type="text"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    placeholder="e.g. Kuoh Academy Old Building"
                    className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Story Time / Timing</label>
                  <input
                    type="text"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="e.g. Twilight (17:40)"
                    className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Chronology Structure</label>
                  <select
                    value={newEventChronology}
                    onChange={(e) => setNewEventChronology(e.target.value as EventChronologyType)}
                    className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-xs"
                  >
                    <option value="linear">Linear Present</option>
                    <option value="flashback">Flashback</option>
                    <option value="foreshadowing_flashforward">Foreshadowing / Flashforward</option>
                    <option value="parallel_concurrent">Parallel / Concurrent</option>
                    <option value="unreliable_memory">Unreliable Memory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Characters Present</label>
                  <input
                    type="text"
                    value={newEventCharacters}
                    onChange={(e) => setNewEventCharacters(e.target.value)}
                    placeholder="Comma separated"
                    className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-xs"
                  />
                </div>
              </div>

              {currentAnalysis && currentAnalysis.events.length > 0 && (
                <div>
                  <label className="block text-stone-400 mb-1">
                    Causal Predecessors (Which events directly caused this?)
                  </label>
                  <div className="max-h-28 overflow-y-auto border border-stone-800 rounded bg-stone-950 p-2 space-y-1.5">
                    {currentAnalysis.events.map((evt) => {
                      const checked = newEventPredecessors.includes(evt.id);
                      return (
                        <label key={evt.id} className="flex items-center gap-2 cursor-pointer text-[11px] text-stone-300">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewEventPredecessors([...newEventPredecessors, evt.id]);
                              } else {
                                setNewEventPredecessors(newEventPredecessors.filter((id) => id !== evt.id));
                              }
                            }}
                            className="rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-0"
                          />
                          <span>#{evt.sequenceIndex}: {evt.title}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-stone-400 mb-1">
                  Supporting Passage Excerpt (from chapter text)
                </label>
                <textarea
                  value={newEventExcerpt}
                  onChange={(e) => setNewEventExcerpt(e.target.value)}
                  placeholder="Paste excerpt verifying this event..."
                  rows={2}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 text-xs focus:border-amber-500 outline-none font-serif"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-stone-800 text-xs font-mono">
              <button
                onClick={() => setIsAddEventModalOpen(false)}
                className="px-3 py-1.5 border border-stone-700 hover:bg-stone-800 text-stone-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleManualAddEvent}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold rounded"
              >
                Save Event to Ledger Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
