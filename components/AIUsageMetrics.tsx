'use client';

import React, { useState, useMemo } from 'react';
import { AIExecutionLog } from '@/types/domain';
import { formatTimeOnly } from '@/lib/utils';
import { 
  Activity, 
  Clock, 
  DollarSign, 
  Cpu, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  Layers,
  ArrowUpRight,
  TrendingUp,
  X
} from 'lucide-react';

interface AIUsageMetricsProps {
  logs: AIExecutionLog[];
  onClearLogs?: () => void;
}

export default function AIUsageMetrics({ logs, onClearLogs }: AIUsageMetricsProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTaskFilter, setSelectedTaskFilter] = useState<string>('all');
  const [selectedLogForInspection, setSelectedLogForInspection] = useState<AIExecutionLog | null>(null);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSearch = 
        log.modelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.inputPromptSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.chapterId && log.chapterId.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchTask = selectedTaskFilter === 'all' || log.taskType === selectedTaskFilter;
      return matchSearch && matchTask;
    });
  }, [logs, searchTerm, selectedTaskFilter]);

  // Aggregate Metrics
  const aggregates = useMemo(() => {
    const totalCalls = logs.length;
    const successfulCalls = logs.filter((l) => l.status === 'success').length;
    const totalTokens = logs.reduce((acc, l) => acc + (l.totalTokens || 0), 0);
    const totalPromptTokens = logs.reduce((acc, l) => acc + (l.promptTokens || 0), 0);
    const totalCompletionTokens = logs.reduce((acc, l) => acc + (l.completionTokens || 0), 0);
    const totalCost = logs.reduce((acc, l) => acc + (l.estimatedCostUsd || 0), 0);
    const avgLatency = totalCalls > 0
      ? Math.round(logs.reduce((acc, l) => acc + (l.latencyMs || 0), 0) / totalCalls)
      : 0;

    // Task distribution
    const taskCounts: Record<string, number> = {};
    logs.forEach((l) => {
      taskCounts[l.taskType] = (taskCounts[l.taskType] || 0) + 1;
    });

    return {
      totalCalls,
      successfulCalls,
      successRate: totalCalls > 0 ? Math.round((successfulCalls / totalCalls) * 100) : 100,
      totalTokens,
      totalPromptTokens,
      totalCompletionTokens,
      totalCost: Number(totalCost.toFixed(5)),
      avgLatency,
      taskCounts,
    };
  }, [logs]);

  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto space-y-8 bg-stone-950">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4" />
            <span>Telemetry & Operational Records</span>
          </div>
          <h2 className="text-2xl font-serif text-stone-100 font-normal">
            AI Orchestration Metrics & Audit Log
          </h2>
          <p className="mt-1 text-xs text-stone-400">
            Truthful accounting of external model invocations, latency, token consumption, and Technique Pack applications.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300">
            {aggregates.totalCalls} Operations Recorded
          </span>
        </div>
      </div>

      {/* Aggregate KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cost */}
        <div className="p-4 border border-stone-800 rounded-lg bg-stone-900/30 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Estimated Cost</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-stone-100">
            ${aggregates.totalCost}
          </div>
          <p className="text-[10px] text-stone-500 font-mono">
            Calculated via Gemini pricing rate
          </p>
        </div>

        {/* Total Tokens */}
        <div className="p-4 border border-stone-800 rounded-lg bg-stone-900/30 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Total Tokens</span>
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-stone-100">
            {aggregates.totalTokens.toLocaleString()}
          </div>
          <p className="text-[10px] text-stone-500 font-mono">
            {aggregates.totalPromptTokens.toLocaleString()} in / {aggregates.totalCompletionTokens.toLocaleString()} out
          </p>
        </div>

        {/* Avg Latency */}
        <div className="p-4 border border-stone-800 rounded-lg bg-stone-900/30 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Average Latency</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-stone-100">
            {aggregates.avgLatency} ms
          </div>
          <p className="text-[10px] text-stone-500 font-mono">
            Across all external calls
          </p>
        </div>

        {/* Success Rate */}
        <div className="p-4 border border-stone-800 rounded-lg bg-stone-900/30 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Success Rate</span>
            <CheckCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold font-mono text-stone-100">
            {aggregates.successRate}%
          </div>
          <p className="text-[10px] text-stone-500 font-mono">
            {aggregates.successfulCalls} of {aggregates.totalCalls} completed
          </p>
        </div>
      </div>

      {/* Task Distribution Breakdown */}
      <div className="p-6 border border-stone-800 rounded-lg bg-stone-900/20 space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold">
          Operation Distribution by Task Type
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          {Object.entries(aggregates.taskCounts).map(([task, count]) => (
            <div key={task} className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1">
              <span className="text-stone-400 capitalize block truncate">
                {task.replace('_', ' ')}
              </span>
              <div className="text-base font-bold text-amber-400">
                {count} runs
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Log Table */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold">
            Execution Audit Trail ({filteredLogs.length} Entries)
          </h3>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search model, chapter..."
                className="bg-stone-900 border border-stone-800 rounded pl-8 pr-2 py-1 text-xs text-stone-200 focus:outline-none font-mono"
              />
            </div>

            <select
              value={selectedTaskFilter}
              onChange={(e) => setSelectedTaskFilter(e.target.value)}
              className="bg-stone-900 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 font-mono"
            >
              <option value="all">All Tasks</option>
              <option value="draft_generation">Draft Generation</option>
              <option value="prose_revision">Prose Revision</option>
              <option value="chapter_analysis">Chapter Analysis</option>
              <option value="quality_evaluation">Quality Evaluation</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-stone-800 rounded-lg overflow-hidden bg-stone-900/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-950/80 text-stone-400 uppercase text-[10px]">
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Task Type</th>
                  <th className="p-3">Model</th>
                  <th className="p-3">Tokens (In / Out)</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Est. Cost</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 text-stone-300">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-stone-500">
                      No matching execution logs recorded.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-stone-900/50 transition-colors">
                      <td className="p-3">
                        {log.status === 'success' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400">
                            <CheckCircle className="w-3.5 h-3.5" /> Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-400">
                            <XCircle className="w-3.5 h-3.5" /> Failed
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-stone-400">
                        {formatTimeOnly(log.timestamp)}
                      </td>
                      <td className="p-3 capitalize font-medium text-stone-200">
                        {log.taskType.replace('_', ' ')}
                      </td>
                      <td className="p-3 text-amber-400/90 truncate max-w-[140px]">
                        {log.modelId}
                      </td>
                      <td className="p-3 text-stone-400">
                        {log.promptTokens} / {log.completionTokens} ({log.totalTokens})
                      </td>
                      <td className="p-3 text-stone-400">
                        {log.latencyMs}ms
                      </td>
                      <td className="p-3 text-stone-300 font-semibold">
                        ${log.estimatedCostUsd}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedLogForInspection(log)}
                          className="px-2 py-0.5 rounded border border-stone-700 hover:bg-stone-800 text-stone-300 hover:text-white inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Inspect
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Log Inspection Modal */}
      {selectedLogForInspection && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 rounded-lg max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-stone-800 bg-stone-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-200">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Execution Log: {selectedLogForInspection.id}</span>
              </div>
              <button
                onClick={() => setSelectedLogForInspection(null)}
                className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-900 border border-stone-800 rounded">
                <div>Model: <span className="text-amber-400">{selectedLogForInspection.modelId}</span></div>
                <div>Status: <span className="uppercase text-stone-200">{selectedLogForInspection.status}</span></div>
                <div>Total Tokens: <span className="text-stone-200">{selectedLogForInspection.totalTokens}</span></div>
                <div>Latency: <span className="text-stone-200">{selectedLogForInspection.latencyMs}ms</span></div>
              </div>

              {selectedLogForInspection.rawInputPrompt && (
                <div className="space-y-1">
                  <span className="text-stone-400 font-semibold uppercase text-[11px]">Assembled Input Summary:</span>
                  <div className="p-3 bg-stone-900/40 border border-stone-800 rounded text-stone-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {selectedLogForInspection.rawInputPrompt}
                  </div>
                </div>
              )}

              {selectedLogForInspection.rawOutputText && (
                <div className="space-y-1">
                  <span className="text-stone-400 font-semibold uppercase text-[11px]">Raw Model Output:</span>
                  <div className="p-3 bg-stone-900/40 border border-stone-800 rounded text-stone-300 whitespace-pre-wrap max-h-60 overflow-y-auto font-serif">
                    {selectedLogForInspection.rawOutputText}
                  </div>
                </div>
              )}

              {selectedLogForInspection.errorMessage && (
                <div className="p-3 bg-red-950/60 border border-red-800 rounded text-red-300">
                  <span className="font-bold">Error Trace:</span> {selectedLogForInspection.errorMessage}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-stone-800 bg-stone-900/30 flex justify-end">
              <button
                onClick={() => setSelectedLogForInspection(null)}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-mono"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
