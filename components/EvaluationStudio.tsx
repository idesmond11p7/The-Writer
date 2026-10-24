'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChapterDraft, 
  TechniquePack, 
  EvaluationRecord, 
  CriterionEvaluationResult, 
  AIExecutionLog 
} from '@/types/domain';
import { formatTimeOnly } from '@/lib/utils';
import { DEFAULT_MODEL_ID } from '@/lib/models';
import { 
  CheckSquare, 
  Play, 
  Star, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  UserCheck, 
  Bot, 
  Loader2, 
  Sparkles, 
  FileText,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface EvaluationStudioProps {
  chapters: ChapterDraft[];
  techniquePacks: TechniquePack[];
  evaluations: EvaluationRecord[];
  activeChapterId?: string;
  onSaveEvaluation: (evaluation: EvaluationRecord) => void;
  onLogExecution: (log: AIExecutionLog) => void;
}

const DEFAULT_RUBRIC = [
  { id: 'crit_obj', name: 'Objective & Constraint Compliance', category: 'objective' },
  { id: 'crit_tech', name: 'Technique Pack Adherence (Procedures & Rules)', category: 'technique' },
  { id: 'crit_causal', name: 'Causal Coherence & Narrative Logic', category: 'causality' },
  { id: 'crit_char', name: 'Character Voice & Psychological Realism', category: 'character_voice' },
  { id: 'crit_cont', name: 'Factual Continuity with Ur-Verse Canon', category: 'continuity' },
];

export default function EvaluationStudio({
  chapters,
  techniquePacks,
  evaluations,
  activeChapterId,
  onSaveEvaluation,
  onLogExecution,
}: EvaluationStudioProps) {
  const currentChapter = useMemo(() => {
    return chapters.find((c) => c.id === activeChapterId) || chapters[0] || null;
  }, [chapters, activeChapterId]);

  const [selectedRevisionId, setSelectedRevisionId] = useState<string>(
    currentChapter?.revisions[0]?.id || 'current'
  );

  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditError, setAuditError] = useState<string | null>(null);

  // Filter evaluations for this chapter
  const chapterEvaluations = useMemo(() => {
    if (!currentChapter) return [];
    return evaluations.filter((e) => e.chapterId === currentChapter.id);
  }, [evaluations, currentChapter]);

  const [selectedEvaluationId, setSelectedEvaluationId] = useState<string | null>(
    chapterEvaluations[0]?.id || null
  );

  const activeEvaluation = useMemo(() => {
    return evaluations.find((e) => e.id === selectedEvaluationId) || chapterEvaluations[0] || null;
  }, [evaluations, selectedEvaluationId, chapterEvaluations]);

  // Run AI Quality Audit
  const handleRunAudit = async () => {
    if (!currentChapter || !currentChapter.currentContent.trim()) {
      alert('Chapter has no prose to evaluate.');
      return;
    }

    setIsAuditing(true);
    setAuditError(null);

    const rubricDescription = DEFAULT_RUBRIC.map((r) => `- [${r.name}] (${r.category})`).join('\n');

    try {
      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: 'quality_evaluation',
          modelId: DEFAULT_MODEL_ID,
          userPrompt: `Evaluate prose against this rubric:\n${rubricDescription}\nActive Objectives: ${currentChapter.writingObjectives.join(', ')}`,
          contextText: currentChapter.currentContent,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Evaluation call failed');
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
        throw new Error('Model produced non-JSON evaluation format.');
      }

      const newEval: EvaluationRecord = {
        id: `eval_${Date.now()}`,
        timestamp: Date.now(),
        chapterId: currentChapter.id,
        revisionId: selectedRevisionId,
        techniquePackIdsUsed: currentChapter.activeTechniquePackIds || [],
        evaluatorType: 'model_independent',
        modelId: data.modelId,
        results: parsed.results || [],
        overallSummary: parsed.overallSummary || 'Evaluation completed.',
        identifiedDeviations: parsed.identifiedDeviations || [],
        recommendations: parsed.recommendations || [],
      };

      onSaveEvaluation(newEval);
      setSelectedEvaluationId(newEval.id);

      // Log execution
      const logEntry: AIExecutionLog = {
        id: `exec_${Date.now()}`,
        timestamp: Date.now(),
        provider: 'gemini',
        modelId: data.modelId,
        taskType: 'quality_evaluation',
        chapterId: currentChapter.id,
        techniquePackIds: currentChapter.activeTechniquePackIds || [],
        inputPromptSummary: `Quality Audit for Chapter ${currentChapter.chapterNumber}`,
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
      setAuditError(msg);
    } finally {
      setIsAuditing(false);
    }
  };

  if (!currentChapter) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 p-8">
        No chapter selected for evaluation.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar: Evaluation History & Controls */}
      <div className="w-80 border-r border-stone-800 bg-stone-950 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-amber-500" />
            <span>Evaluation Studio</span>
          </div>
          <div className="text-xs text-stone-300 font-medium truncate">
            Ch. {currentChapter.chapterNumber}: {currentChapter.title}
          </div>

          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="w-full py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-semibold rounded text-xs font-mono flex items-center justify-center gap-2 transition-colors"
          >
            {isAuditing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Prose...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Independent Audit</span>
              </>
            )}
          </button>

          {auditError && (
            <div className="p-2.5 bg-red-950/60 border border-red-800/80 rounded text-[11px] text-red-300 font-mono">
              {auditError}
            </div>
          )}
        </div>

        {/* Previous Audits List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          <div className="px-2 py-1 text-[10px] font-mono uppercase text-stone-500">
            Recorded Audits ({chapterEvaluations.length})
          </div>
          {chapterEvaluations.map((ev) => {
            const isSelected = ev.id === activeEvaluation?.id;
            const passCount = ev.results.filter((r) => r.passFail === 'pass').length;
            return (
              <div
                key={ev.id}
                onClick={() => setSelectedEvaluationId(ev.id)}
                className={`p-3 rounded border text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-stone-900 border-stone-700 text-stone-100'
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-stone-300 flex items-center gap-1">
                    {ev.evaluatorType === 'human_audit' ? (
                      <UserCheck className="w-3 h-3 text-blue-400" />
                    ) : (
                      <Bot className="w-3 h-3 text-amber-400" />
                    )}
                    <span>{ev.evaluatorType === 'human_audit' ? 'Human' : 'Model'}</span>
                  </span>
                  <span className="text-stone-500 text-[10px]">
                    {formatTimeOnly(ev.timestamp)}
                  </span>
                </div>
                <div className="text-xs font-medium text-stone-200">
                  {passCount} / {ev.results.length} Criteria Passed
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-1 font-mono">
                  {ev.overallSummary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Evaluation Report Area */}
      <div className="flex-1 overflow-y-auto p-8 max-w-4xl space-y-6 bg-stone-950">
        {!activeEvaluation ? (
          <div className="border border-stone-800 rounded-lg p-12 text-center space-y-3 bg-stone-900/10">
            <CheckSquare className="w-8 h-8 text-stone-600 mx-auto" />
            <h3 className="text-sm font-semibold text-stone-200">
              No Evaluation Records Yet
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Run an independent audit against explicit criteria (objective fidelity, Technique Pack application, causal coherence, and continuity).
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in">
            {/* Header Card */}
            <div className="p-6 border border-stone-800 bg-stone-900/40 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-400 uppercase font-bold">
                    {activeEvaluation.evaluatorType.replace('_', ' ')}
                  </span>
                  <span className="text-stone-400">
                    {new Date(activeEvaluation.timestamp).toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-mono text-stone-500">
                  Model: {activeEvaluation.modelId || 'Independent'}
                </span>
              </div>

              <h2 className="text-lg font-serif font-medium text-stone-100">
                Synthesis & Overall Evaluation
              </h2>

              <p className="text-xs text-stone-300 leading-relaxed font-serif">
                {activeEvaluation.overallSummary}
              </p>
            </div>

            {/* Criteria Results Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold">
                Explicit Rubric Criteria Assessment
              </h3>

              {activeEvaluation.results.map((res, i) => (
                <div key={i} className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-200 font-mono">
                      {res.criterionName}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                      res.passFail === 'pass'
                        ? 'border-emerald-800 bg-emerald-950/40 text-emerald-400'
                        : res.passFail === 'partial'
                        ? 'border-amber-800 bg-amber-950/40 text-amber-400'
                        : 'border-red-800 bg-red-950/40 text-red-400'
                    }`}>
                      {res.passFail} (Score: {res.score}/5)
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {res.findings}
                  </p>

                  {res.evidenceExcerpt && (
                    <div className="p-2 bg-stone-950 border border-stone-800 rounded font-serif text-[11px] text-stone-400 italic">
                      &ldquo;{res.evidenceExcerpt}&rdquo;
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Recommendations & Deviations */}
            {activeEvaluation.recommendations?.length > 0 && (
              <div className="p-4 border border-stone-800 rounded bg-stone-900/20 space-y-2">
                <h4 className="text-xs font-mono uppercase text-amber-400 font-semibold">
                  Actionable Recommendations
                </h4>
                <ul className="space-y-1 text-xs text-stone-300 font-mono">
                  {activeEvaluation.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
