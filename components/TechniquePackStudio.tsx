'use client';

import React, { useState, useMemo } from 'react';
import { 
  TechniquePack, 
  TechniquePackVersion,
  TechniquePackExample 
} from '@/types/domain';
import { generateTimestamp, generateId } from '@/lib/utils';
import { compileTechniquePacks } from '@/lib/techniqueCompiler';
import { 
  Layers, 
  Plus, 
  Search, 
  Tag, 
  Save, 
  Copy, 
  Download, 
  Upload, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  GitBranch, 
  Code2, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';

interface TechniquePackStudioProps {
  packs: TechniquePack[];
  onUpdatePack: (pack: TechniquePack) => void;
  onCreatePack: (pack: TechniquePack) => void;
  onDeletePack: (packId: string) => void;
}

export default function TechniquePackStudio({
  packs,
  onUpdatePack,
  onCreatePack,
  onDeletePack,
}: TechniquePackStudioProps) {
  const [selectedPackId, setSelectedPackId] = useState<string>(packs[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'compA' | 'compB' | 'compC' | 'compD' | 'compE' | 'compiler' | 'versions'>('compA');

  // Compilation test state
  const [testTaskPrompt, setTestTaskPrompt] = useState<string>('Draft high-tension scene encountering an anomaly.');
  const [copied, setCopied] = useState<boolean>(false);

  const activePack = useMemo(() => {
    return packs.find((p) => p.id === selectedPackId) || packs[0] || null;
  }, [packs, selectedPackId]);

  const currentVersionData = useMemo(() => {
    if (!activePack) return null;
    return activePack.versions[activePack.currentVersion] || Object.values(activePack.versions)[0];
  }, [activePack]);

  // Filtered packs
  const filteredPacks = useMemo(() => {
    return packs.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [packs, searchTerm, selectedCategory]);

  // Structural readiness score (evaluates all 5 components)
  const readinessCheck = useMemo(() => {
    if (!currentVersionData) return { isReady: false, score: 0, missing: [] };
    const missing: string[] = [];
    if (!currentVersionData.componentA.principles.trim()) missing.push('Component A: Principles');
    if (!currentVersionData.componentA.formalRepresentation.trim()) missing.push('Component A: Formal Model');
    if (!currentVersionData.componentB.mechanisms.trim()) missing.push('Component B: Mechanisms');
    if (!currentVersionData.componentB.intendedEffects.trim()) missing.push('Component B: Intended Effects');
    if (!currentVersionData.componentC.attribution.trim()) missing.push('Component C: Attribution & Provenance');
    if (currentVersionData.componentD.examples.length === 0) missing.push('Component D: Demonstrative Examples');
    if (currentVersionData.componentE.practicalProcedures.length === 0) missing.push('Component E: Practical Procedures');
    if (currentVersionData.componentE.constraints.length === 0) missing.push('Component E: Constraints');

    const total = 8;
    const filled = total - missing.length;
    const score = Math.round((filled / total) * 100);

    return {
      isReady: missing.length === 0,
      score,
      missing,
    };
  }, [currentVersionData]);

  // Update component fields
  const handleUpdateCurrentVersion = (updater: (prev: TechniquePackVersion) => TechniquePackVersion) => {
    if (!activePack || !currentVersionData) return;
    const updatedVer = updater(currentVersionData);
    const updatedPack: TechniquePack = {
      ...activePack,
      updatedAt: generateTimestamp(),
      versions: {
        ...activePack.versions,
        [activePack.currentVersion]: updatedVer,
      },
    };
    onUpdatePack(updatedPack);
  };

  // Create new version
  const handleCreateNewVersion = () => {
    if (!activePack || !currentVersionData) return;
    const currentVerParts = activePack.currentVersion.split('.').map(Number);
    const nextVer = `${currentVerParts[0]}.${currentVerParts[1] + 1}.0`;
    const now = generateTimestamp();

    const newVersionData: TechniquePackVersion = {
      ...currentVersionData,
      versionNumber: nextVer,
      updatedAt: now,
      changelog: `Incremental revision from v${activePack.currentVersion}`,
    };

    const updatedPack: TechniquePack = {
      ...activePack,
      currentVersion: nextVer,
      updatedAt: now,
      versions: {
        ...activePack.versions,
        [nextVer]: newVersionData,
      },
    };

    onUpdatePack(updatedPack);
  };

  // Create brand new pack
  const handleCreatePack = () => {
    const newId = generateId('pack_user');
    const now = generateTimestamp();
    const newPack: TechniquePack = {
      id: newId,
      name: 'New Literary Technique Pack',
      category: 'narrative',
      description: 'Define a repeatable writing discipline with formal representation, psychology, receipts, examples, and rules.',
      currentVersion: '1.0.0',
      tags: ['draft'],
      createdAt: now,
      updatedAt: now,
      versions: {
        '1.0.0': {
          versionNumber: '1.0.0',
          updatedAt: now,
          changelog: 'Initial version draft.',
          componentA: {
            principles: '',
            formalRepresentation: '',
            coreAssumptions: '',
          },
          componentB: {
            mechanisms: '',
            intendedEffects: '',
            psychologicalPhilosophicalRationale: '',
            limitationsAndRisks: '',
            evidenceBase: '',
          },
          componentC: {
            sources: [],
            historicalContext: '',
            documentedLiteraryPrecedents: '',
            attribution: 'Unknown (must be verified)',
          },
          componentD: {
            examples: [],
          },
          componentE: {
            practicalProcedures: [],
            decisionRules: [],
            constraints: [],
            commonErrorsToAvoid: [],
            evaluationTests: [],
          },
        },
      },
    };
    onCreatePack(newPack);
    setSelectedPackId(newId);
  };

  // Duplicate / Clone pack
  const handleDuplicatePack = () => {
    if (!activePack) return;
    const newId = generateId('pack_clone');
    const now = generateTimestamp();
    const clonedPack: TechniquePack = {
      ...JSON.parse(JSON.stringify(activePack)),
      id: newId,
      name: `${activePack.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
    };
    onCreatePack(clonedPack);
    setSelectedPackId(newId);
  };

  // Export pack JSON
  const handleExportPack = () => {
    if (!activePack) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activePack, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${activePack.id}_v${activePack.currentVersion}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Compile active pack for preview
  const testCompilation = useMemo(() => {
    if (!activePack) return null;
    return compileTechniquePacks([activePack], { [activePack.id]: activePack.currentVersion }, testTaskPrompt);
  }, [activePack, testTaskPrompt]);

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Packs Sidebar List */}
      <div className="w-80 border-r border-stone-800 bg-stone-950 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Technique Packs</span>
            </div>
            <button
              onClick={handleCreatePack}
              className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200"
              title="Create New Technique Pack"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search packs, tags..."
              className="w-full bg-stone-900 border border-stone-800 rounded pl-8 pr-2 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-stone-700 font-mono"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-mono pb-1">
            {['all', 'psychology', 'narrative', 'combat', 'structure'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded capitalize ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of Packs */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {filteredPacks.map((pack) => {
            const isSelected = pack.id === activePack?.id;
            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPackId(pack.id)}
                className={`p-3 rounded border text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-stone-900 border-stone-700 text-stone-100'
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-amber-500/90 font-medium capitalize">{pack.category}</span>
                  <span className="text-stone-500 text-[10px]">v{pack.currentVersion}</span>
                </div>
                <div className="text-xs font-medium text-stone-200 truncate">
                  {pack.name}
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                  {pack.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {pack.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] font-mono px-1.5 py-0.2 bg-stone-900 border border-stone-800 rounded text-stone-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Studio Editor Pane */}
      {activePack && currentVersionData ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-stone-950">
          {/* Header Bar */}
          <div className="p-4 border-b border-stone-800 bg-stone-900/40 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={activePack.name}
                  onChange={(e) => {
                    onUpdatePack({ ...activePack, name: e.target.value, updatedAt: generateTimestamp() });
                  }}
                  className="bg-transparent border-b border-transparent hover:border-stone-700 focus:border-amber-500 text-base font-serif font-medium text-stone-100 focus:outline-none"
                />
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-amber-400 font-mono text-[11px]">
                  v{activePack.currentVersion}
                </span>
              </div>
              <input
                type="text"
                value={activePack.description}
                onChange={(e) => {
                  onUpdatePack({ ...activePack, description: e.target.value, updatedAt: generateTimestamp() });
                }}
                className="bg-transparent text-xs text-stone-400 w-full max-w-xl focus:outline-none border-b border-transparent focus:border-stone-700"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Readiness indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-xs font-mono">
                {readinessCheck.isReady ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="text-stone-300">Readiness: {readinessCheck.score}%</span>
              </div>

              {/* Version Bump */}
              <button
                onClick={handleCreateNewVersion}
                className="px-2.5 py-1 text-xs font-mono rounded border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-300 flex items-center gap-1.5"
                title="Create Next Version"
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-500" />
                <span>New Version</span>
              </button>

              {/* Duplicate / Clone */}
              <button
                onClick={handleDuplicatePack}
                className="p-1.5 rounded border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                title="Duplicate / Clone Pack"
              >
                <Copy className="w-4 h-4" />
              </button>

              {/* Export */}
              <button
                onClick={handleExportPack}
                className="p-1.5 rounded border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                title="Export Pack JSON"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Delete Pack */}
              {packs.length > 1 && (
                <button
                  onClick={() => {
                    if (confirm(`Delete Technique Pack "${activePack.name}"?`)) {
                      onDeletePack(activePack.id);
                      setSelectedPackId(packs.find((p) => p.id !== activePack.id)?.id || '');
                    }
                  }}
                  className="p-1.5 rounded border border-stone-800 hover:bg-red-950/40 text-stone-500 hover:text-red-400"
                  title="Delete Pack"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Component Tabs Navigation */}
          <div className="flex items-center border-b border-stone-800 bg-stone-900/30 px-4 text-xs font-mono overflow-x-auto">
            <button
              onClick={() => setActiveTab('compA')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'compA'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>A. Philosophy & Formal</span>
            </button>
            <button
              onClick={() => setActiveTab('compB')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'compB'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>B. Psychology & Mechanism</span>
            </button>
            <button
              onClick={() => setActiveTab('compC')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'compC'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>C. Receipts & Provenance</span>
            </button>
            <button
              onClick={() => setActiveTab('compD')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'compD'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>D. Demonstrative Examples ({currentVersionData.componentD.examples.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('compE')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'compE'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>E. Implementation & Rules</span>
            </button>
            <button
              onClick={() => setActiveTab('compiler')}
              className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'compiler'
                  ? 'border-amber-500 text-amber-400 font-medium'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Compilation Studio</span>
            </button>
          </div>

          {/* Component Content Area */}
          <div className="flex-1 overflow-y-auto p-6 max-w-4xl space-y-6">
            {/* Component A */}
            {activeTab === 'compA' && (
              <div className="space-y-4">
                <div className="p-3 bg-stone-900/30 border border-stone-800 rounded text-xs text-stone-400">
                  <span className="font-mono text-amber-400 font-semibold block mb-0.5">Component A: Formal Definition</span>
                  Establishes the foundational principles and formal logical, mathematical, causal, or structural notation representing the technique.
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Core Literary Principles
                  </label>
                  <textarea
                    rows={4}
                    value={currentVersionData.componentA.principles}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentA: { ...v.componentA, principles: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                    placeholder="State the underlying literary philosophy..."
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Formal Logical / Causal / Structural Representation
                  </label>
                  <textarea
                    rows={3}
                    value={currentVersionData.componentA.formalRepresentation}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentA: { ...v.componentA, formalRepresentation: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                    placeholder="E.g., P(t_0) = Filter(Somatic) -> Trigger(t_1) -> Breach(t_2)"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Underlying Conceptual Assumptions
                  </label>
                  <textarea
                    rows={3}
                    value={currentVersionData.componentA.coreAssumptions}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentA: { ...v.componentA, coreAssumptions: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                    placeholder="Assumptions regarding reader psychology or world logic..."
                  />
                </div>
              </div>
            )}

            {/* Component B */}
            {activeTab === 'compB' && (
              <div className="space-y-4">
                <div className="p-3 bg-stone-900/30 border border-stone-800 rounded text-xs text-stone-400">
                  <span className="font-mono text-amber-400 font-semibold block mb-0.5">Component B: Applied Mechanisms & Psychology</span>
                  Explains the psychological mechanisms, intended effects, rationale, and limitations. Distinguishes documented evidence from creative hypotheses.
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Specific Sensory / Cognitive Mechanisms
                  </label>
                  <textarea
                    rows={3}
                    value={currentVersionData.componentB.mechanisms}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentB: { ...v.componentB, mechanisms: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Intended Reader Effects
                  </label>
                  <textarea
                    rows={3}
                    value={currentVersionData.componentB.intendedEffects}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentB: { ...v.componentB, intendedEffects: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Psychological & Philosophical Rationale
                  </label>
                  <textarea
                    rows={3}
                    value={currentVersionData.componentB.psychologicalPhilosophicalRationale}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentB: { ...v.componentB, psychologicalPhilosophicalRationale: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Known Limitations & Narrative Risks
                  </label>
                  <textarea
                    rows={2}
                    value={currentVersionData.componentB.limitationsAndRisks}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentB: { ...v.componentB, limitationsAndRisks: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Component C */}
            {activeTab === 'compC' && (
              <div className="space-y-4">
                <div className="p-3 bg-stone-900/30 border border-stone-800 rounded text-xs text-stone-400">
                  <span className="font-mono text-amber-400 font-semibold block mb-0.5">Component C: Receipts & Provenance</span>
                  Mandates strict attribution. Never invent a founder, source, citation, or historical precedent. Unknown origins must be recorded as unknown.
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Attribution & Origin Declaration
                  </label>
                  <input
                    type="text"
                    value={currentVersionData.componentC.attribution}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentC: { ...v.componentC, attribution: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-2 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                    placeholder="Attribution (or 'Unknown')"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Historical Literary Context
                  </label>
                  <textarea
                    rows={3}
                    value={currentVersionData.componentC.historicalContext}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentC: { ...v.componentC, historicalContext: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-stone-300 block mb-1">
                    Documented Literary Precedents & Sources
                  </label>
                  <textarea
                    rows={3}
                    value={currentVersionData.componentC.documentedLiteraryPrecedents}
                    onChange={(e) =>
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentC: { ...v.componentC, documentedLiteraryPrecedents: e.target.value },
                      }))
                    }
                    className="w-full bg-stone-900/80 border border-stone-800 rounded p-3 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Component D: Examples */}
            {activeTab === 'compD' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-stone-400">
                    Demonstrative passages contrasting effective application versus common failures.
                  </div>
                  <button
                    onClick={() => {
                      const newExample: TechniquePackExample = {
                        title: 'New Demonstrative Passage',
                        excerpt: '',
                        annotation: '',
                        type: 'effective',
                        criterionAnalysis: '',
                      };
                      handleUpdateCurrentVersion((v) => ({
                        ...v,
                        componentD: {
                          examples: [...v.componentD.examples, newExample],
                        },
                      }));
                    }}
                    className="px-2.5 py-1 text-xs font-mono bg-stone-800 hover:bg-stone-700 text-stone-200 rounded flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Example
                  </button>
                </div>

                {currentVersionData.componentD.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={ex.title}
                        onChange={(e) => {
                          const updated = [...currentVersionData.componentD.examples];
                          updated[idx].title = e.target.value;
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentD: { examples: updated },
                          }));
                        }}
                        className="bg-transparent font-medium text-xs font-mono text-stone-200 focus:outline-none border-b border-stone-700"
                      />
                      <div className="flex items-center gap-2">
                        <select
                          value={ex.type}
                          onChange={(e) => {
                            const updated = [...currentVersionData.componentD.examples];
                            updated[idx].type = e.target.value as 'effective' | 'ineffective' | 'contrast';
                            handleUpdateCurrentVersion((v) => ({
                              ...v,
                              componentD: { examples: updated },
                            }));
                          }}
                          className="bg-stone-900 border border-stone-700 text-[10px] font-mono rounded px-1.5 py-0.5 text-stone-300"
                        >
                          <option value="effective">Effective</option>
                          <option value="ineffective">Ineffective</option>
                          <option value="contrast">Contrast</option>
                        </select>
                        <button
                          onClick={() => {
                            const updated = currentVersionData.componentD.examples.filter((_, i) => i !== idx);
                            handleUpdateCurrentVersion((v) => ({
                              ...v,
                              componentD: { examples: updated },
                            }));
                          }}
                          className="text-stone-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                        Passage Excerpt
                      </label>
                      <textarea
                        rows={3}
                        value={ex.excerpt}
                        onChange={(e) => {
                          const updated = [...currentVersionData.componentD.examples];
                          updated[idx].excerpt = e.target.value;
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentD: { examples: updated },
                          }));
                        }}
                        className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-xs font-serif text-stone-200 focus:outline-none focus:border-stone-700"
                        placeholder="Quote or sample prose..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                        Critical Annotation & Technique Analysis
                      </label>
                      <input
                        type="text"
                        value={ex.criterionAnalysis}
                        onChange={(e) => {
                          const updated = [...currentVersionData.componentD.examples];
                          updated[idx].criterionAnalysis = e.target.value;
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentD: { examples: updated },
                          }));
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs font-mono text-stone-300 focus:outline-none"
                        placeholder="Why this succeeds or fails against the criteria..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Component E: Implementation */}
            {activeTab === 'compE' && (
              <div className="space-y-6">
                {/* Practical Procedures */}
                <div className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-amber-400 font-semibold">
                      Practical Procedures (Step-by-Step)
                    </label>
                    <button
                      onClick={() => {
                        const updated = [...currentVersionData.componentE.practicalProcedures, ''];
                        handleUpdateCurrentVersion((v) => ({
                          ...v,
                          componentE: { ...v.componentE, practicalProcedures: updated },
                        }));
                      }}
                      className="text-xs font-mono text-stone-400 hover:text-white flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Step
                    </button>
                  </div>
                  {currentVersionData.componentE.practicalProcedures.map((proc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-stone-500">{i + 1}.</span>
                      <input
                        type="text"
                        value={proc}
                        onChange={(e) => {
                          const updated = [...currentVersionData.componentE.practicalProcedures];
                          updated[i] = e.target.value;
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentE: { ...v.componentE, practicalProcedures: updated },
                          }));
                        }}
                        className="flex-1 bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-mono text-stone-200 focus:outline-none focus:border-stone-700"
                        placeholder="Actionable procedure..."
                      />
                      <button
                        onClick={() => {
                          const updated = currentVersionData.componentE.practicalProcedures.filter((_, idx) => idx !== i);
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentE: { ...v.componentE, practicalProcedures: updated },
                          }));
                        }}
                        className="text-stone-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Hard Constraints & Rules */}
                <div className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold">
                      Hard Constraints & Negative Boundaries
                    </label>
                    <button
                      onClick={() => {
                        const updated = [...currentVersionData.componentE.constraints, ''];
                        handleUpdateCurrentVersion((v) => ({
                          ...v,
                          componentE: { ...v.componentE, constraints: updated },
                        }));
                      }}
                      className="text-xs font-mono text-stone-400 hover:text-white flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Constraint
                    </button>
                  </div>
                  {currentVersionData.componentE.constraints.map((cons, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-red-400/80">✕</span>
                      <input
                        type="text"
                        value={cons}
                        onChange={(e) => {
                          const updated = [...currentVersionData.componentE.constraints];
                          updated[i] = e.target.value;
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentE: { ...v.componentE, constraints: updated },
                          }));
                        }}
                        className="flex-1 bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-mono text-stone-200 focus:outline-none focus:border-stone-700"
                        placeholder="Forbidden pattern..."
                      />
                      <button
                        onClick={() => {
                          const updated = currentVersionData.componentE.constraints.filter((_, idx) => idx !== i);
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentE: { ...v.componentE, constraints: updated },
                          }));
                        }}
                        className="text-stone-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Evaluation Tests */}
                <div className="p-4 border border-stone-800 rounded bg-stone-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-stone-300 font-semibold">
                      Audit Evaluation Tests
                    </label>
                    <button
                      onClick={() => {
                        const updated = [...currentVersionData.componentE.evaluationTests, ''];
                        handleUpdateCurrentVersion((v) => ({
                          ...v,
                          componentE: { ...v.componentE, evaluationTests: updated },
                        }));
                      }}
                      className="text-xs font-mono text-stone-400 hover:text-white flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Test
                    </button>
                  </div>
                  {currentVersionData.componentE.evaluationTests.map((test, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400/80">?</span>
                      <input
                        type="text"
                        value={test}
                        onChange={(e) => {
                          const updated = [...currentVersionData.componentE.evaluationTests];
                          updated[i] = e.target.value;
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentE: { ...v.componentE, evaluationTests: updated },
                          }));
                        }}
                        className="flex-1 bg-stone-900 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-mono text-stone-200 focus:outline-none focus:border-stone-700"
                        placeholder="Audit question or test..."
                      />
                      <button
                        onClick={() => {
                          const updated = currentVersionData.componentE.evaluationTests.filter((_, idx) => idx !== i);
                          handleUpdateCurrentVersion((v) => ({
                            ...v,
                            componentE: { ...v.componentE, evaluationTests: updated },
                          }));
                        }}
                        className="text-stone-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compiler View */}
            {activeTab === 'compiler' && (
              <div className="space-y-4">
                <div className="p-4 bg-stone-900/40 border border-stone-800 rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-amber-400 font-semibold">
                      Task-Specific Compilation Studio
                    </span>
                    <button
                      onClick={() => {
                        if (testCompilation) {
                          navigator.clipboard.writeText(testCompilation.systemPromptBlock);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }
                      }}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied!' : 'Copy Instructions'}</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1">
                      Task Directive Context
                    </label>
                    <input
                      type="text"
                      value={testTaskPrompt}
                      onChange={(e) => setTestTaskPrompt(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {testCompilation && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-mono text-stone-400 flex items-center justify-between">
                        <span>Compiled Instruction Block (Token Ready)</span>
                        <span className="text-stone-500">ID: {testCompilation.compilationId}</span>
                      </div>
                      <pre className="p-3 bg-stone-950 border border-stone-800 rounded max-h-96 overflow-y-auto text-[11px] font-mono text-stone-300 leading-relaxed whitespace-pre-wrap">
                        {testCompilation.systemPromptBlock}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
