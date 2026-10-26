'use client';

import React, { useState, useMemo } from 'react';
import {
  WorkspaceState,
  ChapterDraft,
  TechniquePack,
  InvestigationQuestion,
  PinnedWorkingItem,
  EpistemicStatus,
  ProvenanceType,
} from '@/types/domain';
import { generateId, generateTimestamp } from '@/lib/utils';
import {
  Search,
  Compass,
  Pin,
  BookOpen,
  Layers,
  GitFork,
  HelpCircle,
  ArrowUpRight,
  Plus,
  Filter,
  Columns,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  FileText,
  Users,
  Link2,
  X,
  Eye,
} from 'lucide-react';

interface InvestigationHubProps {
  state: WorkspaceState;
  onNavigateToChapter: (chapterId: string, highlightExcerpt?: string) => void;
  onNavigateToTechnique: (packId: string) => void;
  onNavigateToAnalysis: (chapterId: string) => void;
  onUpdateInvestigations: (questions: InvestigationQuestion[]) => void;
  onPinItem: (item: PinnedWorkingItem) => void;
  onUnpinItem: (id: string) => void;
}

type HubMode = 'search' | 'relationships' | 'investigations' | 'compare';
type SearchCategoryFilter =
  | 'all'
  | 'chapters'
  | 'techniques'
  | 'events'
  | 'continuity'
  | 'investigations';

interface ContextualSearchResult {
  id: string;
  category: 'chapter_passage' | 'technique' | 'event' | 'continuity' | 'investigation';
  title: string;
  subtitle: string;
  chapterId?: string;
  sourceId?: string;
  provenance: ProvenanceType | EpistemicStatus;
  matchedExcerpt: string;
  precedingContext?: string;
  succeedingContext?: string;
  metadataTags: string[];
}

interface TrackedEntity {
  id: string;
  name: string;
  type: 'character' | 'artifact_or_lead' | 'location_or_institution';
  roleSummary: string;
  searchKeywords: string[];
  primaryChapters: number[];
}

const CANONICAL_ENTITIES: TrackedEntity[] = [
  {
    id: 'ent_jonah',
    name: 'Jonah Laurence',
    type: 'character',
    roleSummary: '17-year-old protagonist in Chapters 1–3; his episodic memories and internal consciousness persist inside Ira Lowe’s body in Chapters 4–8.',
    searchKeywords: ['Jonah', 'Laurence', 'seventeen', 'list', 'My list'],
    primaryChapters: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'ent_ira',
    name: 'Ira Lowe (Vessel & Dossier Identity)',
    type: 'character',
    roleSummary: '16-year-old male vessel in 2005 Japan with long black-and-teal hair, emerald eyes, autonomous sightline reflexes, and an "Overseas Transfer / Independent Curriculum" dossier.',
    searchKeywords: ['Ira', 'Lowe', '1044', 'emerald', 'teal', 'duffel'],
    primaryChapters: [4, 5, 6, 7, 8],
  },
  {
    id: 'ent_violet_council',
    name: 'Violet-Eyed Student Council Figure (Kuoh)',
    type: 'character',
    roleSummary: 'Tall, spectacled student council authority in Chapter 6 who orders the registry closed at 8:45 AM and casts an anomalous shadow 5–6 inches beyond the window mullion geometry.',
    searchKeywords: ['violet', 'spectacles', 'eight-forty-five', 'shadow', 'parquetry'],
    primaryChapters: [6],
  },
  {
    id: 'ent_daniel',
    name: 'Daniel',
    type: 'character',
    roleSummary: 'Jonah’s best friend in Chapters 1–3 ("four minutes early / late"), whose departure for an appointment in Chapter 3 leaves Jonah walking home alone.',
    searchKeywords: ['Daniel', 'four minutes'],
    primaryChapters: [1, 2, 3, 4, 5],
  },
  {
    id: 'ent_mother',
    name: 'Jonah’s Mother',
    type: 'character',
    roleSummary: 'Anchors Jonah’s domestic warmth in Chapter 1 ("You’re welcome, Jonah Laurence"); her memory haunts his dying moments in Chapter 3 and his solitary evenings in Chapters 5 and 8.',
    searchKeywords: ['Mom', 'mother', 'You’re welcome, Jonah'],
    primaryChapters: [1, 3, 4, 5, 8],
  },
  {
    id: 'ent_maya',
    name: 'Maya',
    type: 'character',
    roleSummary: 'Classmate from English/History who borrowed Jonah’s notebook in Chapter 1 and distances herself after the anonymous screenshot leak in Chapter 2.',
    searchKeywords: ['Maya', 'notebook', 'history'],
    primaryChapters: [1, 2, 3],
  },
  {
    id: 'ent_kanagawa_assoc',
    name: 'Kanagawa Prefectural Educational Development Association (Minami-Kuoh Annex)',
    type: 'artifact_or_lead',
    roleSummary: 'Organization and administrative annex listed on the contact line of Ira Lowe’s "Overseas Transfer / Independent Curriculum" dossier in Chapter 8.',
    searchKeywords: ['Kanagawa', 'Association', 'Minami-Kuoh', 'annex', 'Independent Curriculum', 'dossier'],
    primaryChapters: [6, 8],
  },
  {
    id: 'ent_placard_1044',
    name: 'Applicant No. 1044 Placard & Kuoh Dossier',
    type: 'artifact_or_lead',
    roleSummary: 'Blue plastic examination placard and brown application envelope that carry Ira through Kuoh Academy’s Room 301 entrance exam.',
    searchKeywords: ['1044', 'placard', 'Room 301', 'envelope', 'application'],
    primaryChapters: [5, 6, 7, 8],
  },
  {
    id: 'ent_stalker_entity',
    name: '3:17 AM Corner Entity & Anonymous Texts',
    type: 'artifact_or_lead',
    roleSummary: 'The upright shadow scraping floorboards at 3:17 AM and the unknown number messages ("You should watch your back", "You looked happy today") preceding the Chapter 3 collision.',
    searchKeywords: ['3:17', '12:42', 'Unknown Number', 'watch your back', 'Scrrrrtch', 'black metal'],
    primaryChapters: [1, 2, 3],
  },
];

export default function InvestigationHub({
  state,
  onNavigateToChapter,
  onNavigateToTechnique,
  onNavigateToAnalysis,
  onUpdateInvestigations,
  onPinItem,
  onUnpinItem,
}: InvestigationHubProps) {
  const [activeMode, setActiveMode] = useState<HubMode>('search');
  const [query, setQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<SearchCategoryFilter>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [provenanceFilter, setProvenanceFilter] = useState<string>('all');
  const [selectedResult, setSelectedResult] = useState<ContextualSearchResult | null>(null);

  // Relationship Explorer state
  const [selectedEntityId, setSelectedEntityId] = useState<string>(CANONICAL_ENTITIES[0].id);

  // Investigation Questions state
  const investigations = useMemo(() => state.investigations || [], [state.investigations]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(
    investigations[0]?.id || ''
  );
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState<boolean>(false);
  const [newQTitle, setNewQTitle] = useState<string>('');
  const [newQCategory, setNewQCategory] =
    useState<InvestigationQuestion['category']>('continuity_mystery');
  const [newQSummary, setNewQSummary] = useState<string>('');
  const [newHypothesisText, setNewHypothesisText] = useState<string>('');
  const [newHypothesisStatus, setNewHypothesisStatus] =
    useState<EpistemicStatus>('hypothesis');

  // Comparator state
  const [leftCompareChapterId, setLeftCompareChapterId] = useState<string>(
    state.chapters[0]?.id || ''
  );
  const [rightCompareChapterId, setRightCompareChapterId] = useState<string>(
    state.chapters[5]?.id || state.chapters[1]?.id || ''
  );
  const [compareSearchFilter, setCompareSearchFilter] = useState<string>('');

  // Build contextual search results across all workspace material
  const searchResults = useMemo(() => {
    const results: ContextualSearchResult[] = [];
    const q = query.trim().toLowerCase();

    // 1. Search Chapters (paragraph-level with preceding & succeeding paragraph context)
    if (categoryFilter === 'all' || categoryFilter === 'chapters') {
      state.chapters.forEach((chap) => {
        if (chapterFilter !== 'all' && chap.id !== chapterFilter) return;
        if (provenanceFilter !== 'all' && chap.provenance !== provenanceFilter) return;

        const paragraphs = chap.currentContent
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);

        if (!q) {
          // When query is empty, surface key opening/turning paragraphs from each chapter
          if (paragraphs.length > 0) {
            results.push({
              id: `chap_lead_${chap.id}`,
              category: 'chapter_passage',
              title: `Ch. ${chap.chapterNumber}: ${chap.title}`,
              subtitle: `Paragraph 1 of ${paragraphs.length} • ${chap.sourceIdentifier || chap.provenance}`,
              chapterId: chap.id,
              provenance: chap.provenance,
              matchedExcerpt: paragraphs[1] || paragraphs[0],
              precedingContext: paragraphs[1] ? paragraphs[0] : undefined,
              succeedingContext: paragraphs[2],
              metadataTags: [`Ch. ${chap.chapterNumber}`, chap.provenance],
            });
          }
        } else {
          paragraphs.forEach((para, idx) => {
            if (
              para.toLowerCase().includes(q) ||
              chap.title.toLowerCase().includes(q)
            ) {
              results.push({
                id: `chap_p_${chap.id}_${idx}`,
                category: 'chapter_passage',
                title: `Ch. ${chap.chapterNumber}: ${chap.title}`,
                subtitle: `Paragraph ${idx + 1} of ${paragraphs.length}`,
                chapterId: chap.id,
                provenance: chap.provenance,
                matchedExcerpt: para,
                precedingContext: idx > 0 ? paragraphs[idx - 1] : undefined,
                succeedingContext:
                  idx < paragraphs.length - 1 ? paragraphs[idx + 1] : undefined,
                metadataTags: [`Ch. ${chap.chapterNumber}`, chap.provenance],
              });
            }
          });
        }
      });
    }

    // 2. Search Technique Packs
    if (categoryFilter === 'all' || categoryFilter === 'techniques') {
      state.techniquePacks.forEach((pack) => {
        const ver = pack.versions[pack.currentVersion];
        if (!ver) return;
        const searchableText = [
          pack.name,
          pack.description,
          ...pack.tags,
          ver.componentA.principles,
          ver.componentB.mechanisms,
          ...ver.componentE.practicalProcedures,
          ...ver.componentD.examples.map((e) => `${e.title} ${e.excerpt}`),
        ]
          .join(' ')
          .toLowerCase();

        if (!q || searchableText.includes(q)) {
          results.push({
            id: `tp_res_${pack.id}`,
            category: 'technique',
            title: `Technique Pack: ${pack.name}`,
            subtitle: `Category: ${pack.category.toUpperCase()} • v${pack.currentVersion}`,
            sourceId: pack.id,
            provenance: 'derived_analysis',
            matchedExcerpt: `${ver.componentA.principles}\n\nMechanism: ${ver.componentB.mechanisms}`,
            precedingContext: `Formal Representation: ${ver.componentA.formalRepresentation}`,
            succeedingContext: `Procedures:\n${ver.componentE.practicalProcedures.join('\n')}`,
            metadataTags: [pack.category, ...pack.tags.slice(0, 3)],
          });
        }
      });
    }

    // 3. Search Extracted Story Events & Causality
    if (categoryFilter === 'all' || categoryFilter === 'events') {
      state.analyses.forEach((ana) => {
        if (chapterFilter !== 'all' && ana.chapterId !== chapterFilter) return;
        const chap = state.chapters.find((c) => c.id === ana.chapterId);
        ana.events.forEach((evt) => {
          const text = `${evt.title} ${evt.summary} ${evt.supportingPassageExcerpt || ''} ${evt.charactersPresent.join(' ')}`.toLowerCase();
          if (!q || text.includes(q)) {
            results.push({
              id: `evt_res_${evt.id}`,
              category: 'event',
              title: `Event #${evt.sequenceIndex}: ${evt.title}`,
              subtitle: `Ch. ${chap?.chapterNumber || '?'}: ${chap?.title || ana.chapterId} • ${evt.storyTimeEstimate || evt.chronologyType}`,
              chapterId: ana.chapterId,
              sourceId: evt.id,
              provenance: evt.epistemicStatus || 'derived_analysis',
              matchedExcerpt: evt.summary,
              precedingContext: evt.supportingPassageExcerpt
                ? `Canonical Passage Anchor: "${evt.supportingPassageExcerpt}"`
                : undefined,
              succeedingContext:
                evt.directConsequences.length > 0
                  ? `Direct Consequences: ${evt.directConsequences.join('; ')}`
                  : undefined,
              metadataTags: [evt.chronologyType, ...evt.charactersPresent.slice(0, 2)],
            });
          }
        });
      });
    }

    // 4. Search Continuity Findings & Discrepancies
    if (categoryFilter === 'all' || categoryFilter === 'continuity') {
      state.analyses.forEach((ana) => {
        if (chapterFilter !== 'all' && ana.chapterId !== chapterFilter) return;
        ana.continuityFindings.forEach((cf) => {
          const text = `${cf.description} ${cf.passageReference || ''} ${cf.recommendedResolution || ''}`.toLowerCase();
          if (!q || text.includes(q)) {
            results.push({
              id: `cf_res_${cf.id}`,
              category: 'continuity',
              title: `Continuity Finding (${cf.severity.replace('_', ' ')})`,
              subtitle: `Affected: ${cf.affectedChaptersOrEvents.join(', ')}`,
              chapterId: ana.chapterId,
              sourceId: cf.id,
              provenance: cf.epistemicStatus || 'derived_analysis',
              matchedExcerpt: cf.description,
              precedingContext: cf.passageReference
                ? `Passage Evidence: "${cf.passageReference}"`
                : undefined,
              succeedingContext: cf.recommendedResolution
                ? `Resolution Note: ${cf.recommendedResolution}`
                : undefined,
              metadataTags: [cf.severity],
            });
          }
        });
      });
    }

    // 5. Search Open Investigation Questions
    if (categoryFilter === 'all' || categoryFilter === 'investigations') {
      investigations.forEach((inv) => {
        const text = `${inv.title} ${inv.summary} ${inv.competingHypotheses.map((h) => h.statement).join(' ')}`.toLowerCase();
        if (!q || text.includes(q)) {
          results.push({
            id: `inv_res_${inv.id}`,
            category: 'investigation',
            title: `Investigation: ${inv.title}`,
            subtitle: `Status: ${inv.status.replace('_', ' ').toUpperCase()} • ${inv.competingHypotheses.length} hypotheses`,
            chapterId: inv.linkedChapterIds[0],
            sourceId: inv.id,
            provenance: 'hypothesis',
            matchedExcerpt: inv.summary,
            succeedingContext: inv.competingHypotheses
              .map((h, i) => `Hypothesis ${i + 1} (${h.epistemicStatus}): ${h.statement}`)
              .join('\n\n'),
            metadataTags: [inv.category, inv.status],
          });
        }
      });
    }

    return results.slice(0, 60);
  }, [state, query, categoryFilter, chapterFilter, provenanceFilter, investigations]);

  // Relationship Explorer Computed Data for Selected Entity
  const selectedEntity = useMemo(() => {
    return CANONICAL_ENTITIES.find((e) => e.id === selectedEntityId) || CANONICAL_ENTITIES[0];
  }, [selectedEntityId]);

  const entityOccurrences = useMemo(() => {
    const chapterMatches: {
      chapter: ChapterDraft;
      excerpts: string[];
    }[] = [];

    state.chapters.forEach((chap) => {
      const paras = chap.currentContent
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
      const matchingParas = paras.filter((p) =>
        selectedEntity.searchKeywords.some((kw) =>
          p.toLowerCase().includes(kw.toLowerCase())
        )
      );
      if (matchingParas.length > 0) {
        chapterMatches.push({
          chapter: chap,
          excerpts: matchingParas.slice(0, 3),
        });
      }
    });

    const relatedEvents = state.analyses.flatMap((ana) =>
      ana.events
        .filter((evt) =>
          selectedEntity.searchKeywords.some(
            (kw) =>
              evt.title.toLowerCase().includes(kw.toLowerCase()) ||
              evt.summary.toLowerCase().includes(kw.toLowerCase()) ||
              evt.charactersPresent.some((c) =>
                c.toLowerCase().includes(kw.toLowerCase())
              )
          )
        )
        .map((evt) => ({ ...evt, chapterId: ana.chapterId }))
    );

    const knowledgeRecords = state.analyses.flatMap((ana) =>
      ana.characterKnowledge
        .filter((ck) =>
          selectedEntity.searchKeywords.some((kw) =>
            ck.characterName.toLowerCase().includes(kw.toLowerCase())
          )
        )
        .map((ck) => ({ ...ck, chapterId: ana.chapterId }))
    );

    const relatedQuestions = investigations.filter((inv) =>
      selectedEntity.searchKeywords.some(
        (kw) =>
          inv.title.toLowerCase().includes(kw.toLowerCase()) ||
          inv.summary.toLowerCase().includes(kw.toLowerCase())
      )
    );

    return {
      chapterMatches,
      relatedEvents,
      knowledgeRecords,
      relatedQuestions,
    };
  }, [state.chapters, state.analyses, investigations, selectedEntity]);

  const activeQuestion = useMemo(() => {
    return (
      investigations.find((q) => q.id === selectedQuestionId) ||
      investigations[0] ||
      null
    );
  }, [investigations, selectedQuestionId]);

  const handleCreateQuestion = () => {
    if (!newQTitle.trim()) return;
    const newQ: InvestigationQuestion = {
      id: generateId('inv'),
      title: newQTitle.trim(),
      category: newQCategory,
      status: 'investigating',
      summary: newQSummary.trim() || 'Active analytical investigation thread.',
      competingHypotheses: [],
      linkedChapterIds: [state.activeChapterId || state.chapters[0]?.id || ''],
      updatedAt: generateTimestamp(),
    };
    onUpdateInvestigations([newQ, ...investigations]);
    setSelectedQuestionId(newQ.id);
    setNewQTitle('');
    setNewQSummary('');
    setIsNewQuestionOpen(false);
  };

  const handleAddHypothesis = () => {
    if (!activeQuestion || !newHypothesisText.trim()) return;
    const updated: InvestigationQuestion = {
      ...activeQuestion,
      competingHypotheses: [
        ...activeQuestion.competingHypotheses,
        {
          id: generateId('hyp'),
          statement: newHypothesisText.trim(),
          epistemicStatus: newHypothesisStatus,
          supportingEvidence: [],
        },
      ],
      updatedAt: generateTimestamp(),
    };
    onUpdateInvestigations(
      investigations.map((q) => (q.id === updated.id ? updated : q))
    );
    setNewHypothesisText('');
  };

  const leftChapter = state.chapters.find((c) => c.id === leftCompareChapterId);
  const rightChapter = state.chapters.find((c) => c.id === rightCompareChapterId);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#09090b]">
      {/* Sub-Navigation Bar */}
      <div className="border-b border-stone-800/80 bg-[#0c0c0e] px-6 py-3 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-400">
            <Search className="w-3.5 h-3.5" />
            <span>Knowledge, Retrieval & Continuity Workstation</span>
          </div>
          <h2 className="text-base font-serif text-stone-100 mt-0.5">
            Information Access, Relationship Traversal & Evidence Investigation
          </h2>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center rounded-lg border border-stone-800 bg-stone-950 p-1 text-xs font-mono">
          <button
            onClick={() => setActiveMode('search')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeMode === 'search'
                ? 'bg-amber-500 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Contextual Search ({searchResults.length})</span>
          </button>
          <button
            onClick={() => setActiveMode('relationships')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeMode === 'relationships'
                ? 'bg-amber-500 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Entity & Relationship Map</span>
          </button>
          <button
            onClick={() => setActiveMode('investigations')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeMode === 'investigations'
                ? 'bg-amber-500 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Open Questions & Hypotheses ({investigations.length})</span>
          </button>
          <button
            onClick={() => setActiveMode('compare')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeMode === 'compare'
                ? 'bg-amber-500 text-stone-950 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Passage & Timeline Comparator</span>
          </button>
        </div>
      </div>

      {/* MODE 1: CONTEXTUAL SEARCH & PASSAGE INSPECTION */}
      {activeMode === 'search' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Search & Results Column */}
          <div className="flex-1 flex flex-col border-r border-stone-800/80 overflow-hidden">
            {/* Search & Facet Bar */}
            <div className="p-4 border-b border-stone-800/80 bg-stone-950/60 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search across 8 canonical Ledger chapters, techniques, causal events, character knowledge, or leads (e.g. '1044', 'Kanagawa', 'shadow', 'Daniel', 'kettle')..."
                  className="w-full bg-stone-900 border border-stone-700/80 focus:border-amber-500 rounded-lg pl-10 pr-9 py-2 text-xs text-stone-100 font-mono focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Facets */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { id: 'all', label: 'All Material' },
                      { id: 'chapters', label: 'Chapter Passages' },
                      { id: 'techniques', label: 'Technique Packs' },
                      { id: 'events', label: 'Story Events' },
                      { id: 'continuity', label: 'Continuity' },
                      { id: 'investigations', label: 'Investigations' },
                    ] as { id: SearchCategoryFilter; label: string }[]
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-2.5 py-1 rounded border transition-colors text-[11px] ${
                        categoryFilter === cat.id
                          ? 'bg-stone-800 border-amber-500/60 text-amber-300 font-semibold'
                          : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={chapterFilter}
                    onChange={(e) => setChapterFilter(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-300"
                  >
                    <option value="all">All Chapters (1–8)</option>
                    {state.chapters.map((c) => (
                      <option key={c.id} value={c.id}>
                        Ch. {c.chapterNumber}: {c.title}
                      </option>
                    ))}
                  </select>

                  <select
                    value={provenanceFilter}
                    onChange={(e) => setProvenanceFilter(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-300"
                  >
                    <option value="all">All Provenance</option>
                    <option value="ledger_authoritative">Ledger Authoritative</option>
                    <option value="local_working_draft">Working Draft</option>
                    <option value="derived_analysis">Derived Analysis</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {searchResults.length === 0 ? (
                <div className="p-12 text-center border border-stone-800/60 rounded-lg bg-stone-900/20 space-y-2">
                  <Search className="w-6 h-6 text-stone-600 mx-auto" />
                  <p className="text-xs font-mono text-stone-400">
                    No passages or records matched &ldquo;{query}&rdquo; with current filters.
                  </p>
                </div>
              ) : (
                searchResults.map((res) => {
                  const isSelected = selectedResult?.id === res.id;
                  return (
                    <div
                      key={res.id}
                      onClick={() => setSelectedResult(res)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500/80 bg-amber-950/15 shadow-md'
                          : 'border-stone-800/80 bg-[#0e0e11] hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400 flex-shrink-0">
                            {res.category.replace('_', ' ')}
                          </span>
                          <h4 className="text-xs font-semibold text-stone-100 truncate">
                            {res.title}
                          </h4>
                        </div>
                        <span
                          className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border flex-shrink-0 ${
                            res.provenance === 'ledger_authoritative'
                              ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-400'
                              : res.provenance === 'hypothesis' || res.provenance === 'inferred'
                              ? 'border-purple-800/80 bg-purple-950/40 text-purple-300'
                              : 'border-stone-700 bg-stone-900 text-stone-400'
                          }`}
                        >
                          {res.provenance.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-stone-400 mb-2">
                        {res.subtitle}
                      </div>

                      <p className="text-xs font-serif text-stone-300 leading-relaxed line-clamp-3 bg-stone-950/80 p-2.5 rounded border border-stone-800/60">
                        {res.matchedExcerpt}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Contextual Inspector Pane */}
          <div className="w-[460px] flex-shrink-0 bg-[#0c0c0e] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-stone-800/80 flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Contextual Passage & Provenance Inspector</span>
              </div>
            </div>

            {selectedResult ? (
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400 uppercase font-semibold">
                      {selectedResult.category.replace('_', ' ')}
                    </span>
                    <span className="text-stone-400">
                      Provenance: {selectedResult.provenance}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-medium text-stone-100">
                    {selectedResult.title}
                  </h3>
                  <p className="text-xs font-mono text-stone-400">
                    {selectedResult.subtitle}
                  </p>
                </div>

                {/* Action Bar: Open in Context or Pin to Workbench */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedResult.chapterId && (
                    <button
                      onClick={() =>
                        onNavigateToChapter(
                          selectedResult.chapterId!,
                          selectedResult.matchedExcerpt
                        )
                      }
                      className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open in Chapter Workspace</span>
                    </button>
                  )}

                  {selectedResult.category === 'technique' && selectedResult.sourceId && (
                    <button
                      onClick={() => onNavigateToTechnique(selectedResult.sourceId!)}
                      className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Open in Technique Studio</span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      onPinItem({
                        id: generateId('pin'),
                        type:
                          selectedResult.category === 'chapter_passage'
                            ? 'passage'
                            : selectedResult.category === 'technique'
                            ? 'technique'
                            : 'finding',
                        title: selectedResult.title,
                        subtitle: selectedResult.subtitle,
                        content: selectedResult.matchedExcerpt,
                        chapterId: selectedResult.chapterId,
                        sourceId: selectedResult.sourceId,
                        provenance: selectedResult.provenance,
                        pinnedAt: Date.now(),
                      })
                    }
                    className="px-3 py-1.5 rounded border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Pin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pin to Active Context</span>
                  </button>
                </div>

                {/* Surrounding Context Window */}
                <div className="space-y-3">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                    Surrounding Context Window
                  </div>

                  {selectedResult.precedingContext && (
                    <div className="p-3 rounded border border-stone-800/60 bg-stone-950/50 text-xs font-serif text-stone-400 leading-relaxed">
                      <span className="block text-[10px] font-mono uppercase text-stone-500 mb-1">
                        Preceding Context
                      </span>
                      {selectedResult.precedingContext}
                    </div>
                  )}

                  <div className="p-4 rounded-lg border-2 border-amber-500/60 bg-amber-950/10 text-sm font-serif text-stone-100 leading-relaxed whitespace-pre-wrap">
                    <span className="block text-[10px] font-mono uppercase text-amber-400 mb-1.5">
                      Matched Passage / Record
                    </span>
                    {selectedResult.matchedExcerpt}
                  </div>

                  {selectedResult.succeedingContext && (
                    <div className="p-3 rounded border border-stone-800/60 bg-stone-950/50 text-xs font-serif text-stone-400 leading-relaxed whitespace-pre-wrap">
                      <span className="block text-[10px] font-mono uppercase text-stone-500 mb-1">
                        Following Context
                      </span>
                      {selectedResult.succeedingContext}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-2">
                <FileText className="w-8 h-8 text-stone-700" />
                <p className="text-xs font-mono">
                  Select any search result on the left to inspect its surrounding paragraph context, provenance, and cross-workspace links.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: ENTITY & RELATIONSHIP EXPLORER */}
      {activeMode === 'relationships' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Entities Sidebar */}
          <div className="w-80 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-stone-800/80 text-xs font-mono uppercase text-stone-400">
              Canonical Entities, Characters & Leads
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {CANONICAL_ENTITIES.map((ent) => {
                const isSelected = ent.id === selectedEntity.id;
                return (
                  <button
                    key={ent.id}
                    onClick={() => setSelectedEntityId(ent.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-stone-900 border-amber-500/70 text-stone-100'
                        : 'bg-stone-950/50 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
                      <span className="text-amber-400">
                        {ent.type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-stone-400">
                        Ch. {ent.primaryChapters.join(', ')}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-stone-100">
                      {ent.name}
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                      {ent.roleSummary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Entity Connected Web */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-400">
                  {selectedEntity.type.replace(/_/g, ' ')}
                </span>
                <span className="text-xs font-mono text-stone-400">
                  Active across Chapters: {selectedEntity.primaryChapters.join(', ')}
                </span>
              </div>
              <h3 className="text-xl font-serif text-stone-100">
                {selectedEntity.name}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedEntity.roleSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Connected Chapters & Direct Textual Anchors */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Direct Textual Occurrences ({entityOccurrences.chapterMatches.length} Chapters)
                  </span>
                </h4>
                <div className="space-y-3">
                  {entityOccurrences.chapterMatches.map(({ chapter, excerpts }) => (
                    <div
                      key={chapter.id}
                      className="p-4 border border-stone-800 rounded-lg bg-[#0e0e11] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-100 font-serif">
                          Ch. {chapter.chapterNumber}: {chapter.title}
                        </span>
                        <button
                          onClick={() => onNavigateToChapter(chapter.id, excerpts[0])}
                          className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                          <span>Inspect in Chapter</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                      {excerpts.map((ex, i) => (
                        <div
                          key={i}
                          className="p-2.5 bg-stone-950 border border-stone-800/80 rounded text-xs font-serif text-stone-300 leading-relaxed"
                        >
                          &ldquo;{ex}&rdquo;
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Story Events, Epistemic States & Open Questions */}
              <div className="space-y-6">
                {/* Connected Events */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-2">
                    <GitFork className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      Linked Story Events & Causal Nodes ({entityOccurrences.relatedEvents.length})
                    </span>
                  </h4>
                  {entityOccurrences.relatedEvents.length === 0 ? (
                    <div className="p-4 border border-stone-800/60 rounded bg-stone-900/20 text-xs text-stone-400 font-mono">
                      Run Chapter Intelligence on additional chapters to populate event links.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {entityOccurrences.relatedEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="p-3.5 border border-stone-800 rounded-lg bg-[#0e0e11] space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-amber-400 font-semibold">
                              Event #{evt.sequenceIndex}: {evt.title}
                            </span>
                            {evt.chapterId && (
                              <button
                                onClick={() => onNavigateToAnalysis(evt.chapterId!)}
                                className="text-[11px] text-stone-400 hover:text-stone-200 underline"
                              >
                                View in Causality Graph
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-stone-300 leading-relaxed">
                            {evt.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Epistemic / Knowledge States */}
                {entityOccurrences.knowledgeRecords.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Recorded Epistemic & Knowledge Boundaries</span>
                    </h4>
                    {entityOccurrences.knowledgeRecords.map((kr, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-stone-800 rounded-lg bg-[#0e0e11] space-y-2 text-xs font-mono"
                      >
                        <div className="text-emerald-400 font-semibold">
                          Verified Knowledge:
                        </div>
                        <ul className="space-y-1 text-stone-300 text-[11px] pl-3 list-disc">
                          {kr.knows.map((k, i) => (
                            <li key={i}>{k}</li>
                          ))}
                        </ul>
                        {kr.unawareOf.length > 0 && (
                          <>
                            <div className="text-stone-400 font-semibold pt-2">
                              Critical Blindspots (Unaware Of):
                            </div>
                            <ul className="space-y-1 text-stone-400 text-[11px] pl-3 list-disc">
                              {kr.unawareOf.map((u, i) => (
                                <li key={i}>{u}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Linked Investigation Threads */}
                {entityOccurrences.relatedQuestions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Active Investigation Threads</span>
                    </h4>
                    {entityOccurrences.relatedQuestions.map((rq) => (
                      <div
                        key={rq.id}
                        onClick={() => {
                          setSelectedQuestionId(rq.id);
                          setActiveMode('investigations');
                        }}
                        className="p-3.5 border border-stone-800 hover:border-amber-500/60 rounded-lg bg-[#0e0e11] cursor-pointer space-y-1"
                      >
                        <div className="text-xs font-semibold text-stone-100">
                          {rq.title}
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-2">
                          {rq.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: OPEN QUESTIONS, HYPOTHESES & CONTINUITY LEDGER */}
      {activeMode === 'investigations' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Questions List Sidebar */}
          <div className="w-80 border-r border-stone-800/80 bg-[#0c0c0e] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-stone-800/80 flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-stone-400">
                Investigation Threads ({investigations.length})
              </span>
              <button
                onClick={() => setIsNewQuestionOpen(!isNewQuestionOpen)}
                className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-mono flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> New
              </button>
            </div>

            {isNewQuestionOpen && (
              <div className="p-3 border-b border-stone-800 bg-stone-900/60 space-y-2.5 text-xs font-mono">
                <input
                  type="text"
                  value={newQTitle}
                  onChange={(e) => setNewQTitle(e.target.value)}
                  placeholder="Question or contradiction title..."
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                />
                <select
                  value={newQCategory}
                  onChange={(e) =>
                    setNewQCategory(
                      e.target.value as InvestigationQuestion['category']
                    )
                  }
                  className="w-full bg-stone-950 border border-stone-800 rounded p-1.5 text-stone-300"
                >
                  <option value="continuity_mystery">Continuity Mystery</option>
                  <option value="causal_gap">Causal Gap</option>
                  <option value="character_identity">Character Identity</option>
                  <option value="textual_discrepancy">Textual Discrepancy</option>
                  <option value="technique_experiment">Technique Experiment</option>
                </select>
                <textarea
                  rows={2}
                  value={newQSummary}
                  onChange={(e) => setNewQSummary(e.target.value)}
                  placeholder="Context and scope of inquiry..."
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsNewQuestionOpen(false)}
                    className="px-2 py-1 text-stone-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateQuestion}
                    className="px-3 py-1 bg-amber-500 text-stone-950 font-semibold rounded"
                  >
                    Add Thread
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {investigations.map((inv) => {
                const isSelected = activeQuestion?.id === inv.id;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedQuestionId(inv.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-stone-900 border-amber-500/70 text-stone-100'
                        : 'bg-stone-950/40 border-stone-800/80 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
                      <span className="text-amber-400">
                        {inv.category.replace(/_/g, ' ')}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded ${
                          inv.status === 'resolved_in_canon'
                            ? 'bg-emerald-950/60 text-emerald-400'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {inv.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-stone-100">
                      {inv.title}
                    </div>
                    <div className="mt-1.5 text-[11px] font-mono text-stone-400">
                      {inv.competingHypotheses.length} competing hypotheses
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Investigation Detail Pane */}
          {activeQuestion ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl">
              <div className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-amber-400 uppercase">
                      {activeQuestion.category.replace(/_/g, ' ')}
                    </span>
                    <select
                      value={activeQuestion.status}
                      onChange={(e) => {
                        const updatedStatus = e.target
                          .value as InvestigationQuestion['status'];
                        onUpdateInvestigations(
                          investigations.map((q) =>
                            q.id === activeQuestion.id
                              ? { ...q, status: updatedStatus }
                              : q
                          )
                        );
                      }}
                      className="bg-stone-900 border border-stone-700 rounded px-2 py-0.5 text-stone-200 text-xs font-mono"
                    >
                      <option value="open">Status: Open</option>
                      <option value="investigating">Status: Investigating</option>
                      <option value="working_hypothesis">Status: Working Hypothesis</option>
                      <option value="resolved_in_canon">Status: Resolved in Canon</option>
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      onPinItem({
                        id: generateId('pin_q'),
                        type: 'question',
                        title: activeQuestion.title,
                        subtitle: activeQuestion.category,
                        content: activeQuestion.summary,
                        sourceId: activeQuestion.id,
                        provenance: 'hypothesis',
                        pinnedAt: Date.now(),
                      })
                    }
                    className="px-3 py-1 rounded border border-stone-700 bg-stone-900 hover:bg-stone-800 text-xs font-mono text-stone-200 flex items-center gap-1.5"
                  >
                    <Pin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pin Question to Workbench</span>
                  </button>
                </div>

                <h3 className="text-lg font-serif text-stone-100">
                  {activeQuestion.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {activeQuestion.summary}
                </p>

                {/* Linked Chapters */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="text-stone-400">Linked Chapters:</span>
                  {activeQuestion.linkedChapterIds.map((cid) => {
                    const ch = state.chapters.find((c) => c.id === cid);
                    return ch ? (
                      <button
                        key={cid}
                        onClick={() => onNavigateToChapter(cid)}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 hover:border-amber-500/60 text-amber-400"
                      >
                        Ch. {ch.chapterNumber}: {ch.title}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Competing Hypotheses & Grounded Evidence */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Competing Hypotheses & Canonical Evidence Matrix
                </h4>

                {activeQuestion.competingHypotheses.map((hyp, idx) => (
                  <div
                    key={hyp.id}
                    className="p-5 border border-stone-800 rounded-xl bg-[#0e0e11] space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-stone-200 font-semibold">
                        Hypothesis 0{idx + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-950/50 border border-purple-800/80 text-purple-300 uppercase text-[10px]">
                        Epistemic Status: {hyp.epistemicStatus.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-stone-200 leading-relaxed font-medium">
                      {hyp.statement}
                    </p>

                    {hyp.supportingEvidence.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                          Supporting Textual Evidence
                        </span>
                        {hyp.supportingEvidence.map((ev, i) => {
                          const ch = state.chapters.find(
                            (c) => c.id === ev.chapterId
                          );
                          return (
                            <div
                              key={i}
                              className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="text-amber-400">
                                  {ch
                                    ? `Ch. ${ch.chapterNumber}: ${ch.title}`
                                    : ev.chapterId}
                                </span>
                                {ch && (
                                  <button
                                    onClick={() =>
                                      onNavigateToChapter(ch.id, ev.excerpt)
                                    }
                                    className="text-stone-400 hover:text-stone-200 underline"
                                  >
                                    Jump to Passage
                                  </button>
                                )}
                              </div>
                              <blockquote className="text-xs font-serif italic text-stone-300 border-l-2 border-amber-500/60 pl-2.5">
                                &ldquo;{ev.excerpt}&rdquo;
                              </blockquote>
                              <p className="text-[11px] font-mono text-stone-400">
                                Note: {ev.note}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {hyp.counterEvidence && (
                      <div className="p-3 bg-red-950/20 border border-red-900/50 rounded text-xs font-mono text-red-300">
                        <span className="font-semibold uppercase text-[10px] block mb-0.5">
                          Counter-Evidence / Friction:
                        </span>
                        {hyp.counterEvidence}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add New Hypothesis Form */}
                <div className="p-4 border border-stone-800/80 rounded-xl bg-stone-900/30 space-y-3 text-xs font-mono">
                  <div className="text-stone-300 font-semibold">
                    Propose New Hypothesis or Interpretation
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-400">Epistemic Status:</span>
                    <select
                      value={newHypothesisStatus}
                      onChange={(e) =>
                        setNewHypothesisStatus(e.target.value as EpistemicStatus)
                      }
                      className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-stone-200"
                    >
                      <option value="hypothesis">Working Hypothesis</option>
                      <option value="inferred">Inferred from Text</option>
                      <option value="explicit_text">Explicit Textual Fact</option>
                      <option value="unresolved_question">Unresolved Question</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    value={newHypothesisText}
                    onChange={(e) => setNewHypothesisText(e.target.value)}
                    placeholder="Formulate a testable interpretation or causal hypothesis..."
                    className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200"
                  />
                  <button
                    onClick={handleAddHypothesis}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded"
                  >
                    Record Hypothesis
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* MODE 4: SIDE-BY-SIDE PASSAGE & TIMELINE COMPARATOR */}
      {activeMode === 'compare' && (
        <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-stone-400">Left Source:</span>
              <select
                value={leftCompareChapterId}
                onChange={(e) => setLeftCompareChapterId(e.target.value)}
                className="bg-stone-900 border border-stone-700 rounded px-2.5 py-1.5 text-stone-200"
              >
                {state.chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Ch. {c.chapterNumber}: {c.title} ({c.provenance})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <input
                type="text"
                value={compareSearchFilter}
                onChange={(e) => setCompareSearchFilter(e.target.value)}
                placeholder="Filter paragraphs in both chapters (e.g. 'mirror', 'morning', 'kettle')..."
                className="bg-stone-900 border border-stone-700 rounded px-3 py-1.5 text-stone-200 w-72"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-stone-400">Right Source:</span>
              <select
                value={rightCompareChapterId}
                onChange={(e) => setRightCompareChapterId(e.target.value)}
                className="bg-stone-900 border border-stone-700 rounded px-2.5 py-1.5 text-stone-200"
              >
                {state.chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Ch. {c.chapterNumber}: {c.title} ({c.provenance})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
            {[leftChapter, rightChapter].map((chap, idx) => {
              if (!chap) return null;
              const paras = chap.currentContent
                .split(/\n\s*\n/)
                .map((p) => p.trim())
                .filter(Boolean)
                .filter(
                  (p) =>
                    !compareSearchFilter.trim() ||
                    p.toLowerCase().includes(compareSearchFilter.toLowerCase())
                );

              return (
                <div
                  key={`${chap.id}_${idx}`}
                  className="flex flex-col border border-stone-800 rounded-xl bg-[#0e0e11] overflow-hidden"
                >
                  <div className="p-3 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-amber-400 font-semibold">
                        Ch. {chap.chapterNumber}: {chap.title}
                      </span>
                      <span className="text-stone-400 ml-2 text-[10px]">
                        ({paras.length} matching paragraphs)
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigateToChapter(chap.id)}
                      className="text-stone-300 hover:text-amber-400 underline text-[11px]"
                    >
                      Open in Editor
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 font-serif text-xs text-stone-300 leading-relaxed">
                    {paras.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-2.5 rounded border border-stone-800/50 bg-stone-950/60 hover:border-stone-700 group relative"
                      >
                        <p>{p}</p>
                        <button
                          onClick={() =>
                            onPinItem({
                              id: generateId('pin_cmp'),
                              type: 'passage',
                              title: `Ch. ${chap.chapterNumber} Excerpt`,
                              subtitle: chap.title,
                              content: p,
                              chapterId: chap.id,
                              provenance: chap.provenance,
                              pinnedAt: Date.now(),
                            })
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 px-2 py-0.5 rounded bg-stone-800 text-[10px] font-mono text-amber-400"
                        >
                          Pin Excerpt
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
