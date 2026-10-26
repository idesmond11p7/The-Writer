export type ProvenanceType = 
  | 'ledger_authoritative' 
  | 'imported_external' 
  | 'local_working_draft' 
  | 'generated_revision' 
  | 'derived_analysis';

export type EpistemicStatus =
  | 'explicit_text'
  | 'derived_analysis'
  | 'inferred'
  | 'hypothesis'
  | 'unresolved_question';

export type CausalEdgeType =
  | 'direct_causation'
  | 'contributing_condition'
  | 'temporal_succession'
  | 'correlation'
  | 'inferred_connection'
  | 'setup_payoff'
  | 'contradiction';

export interface CausalEdge {
  id: string;
  sourceEventId: string;
  targetEventId: string;
  edgeType: CausalEdgeType;
  epistemicStatus: EpistemicStatus;
  rationale: string;
  supportingPassageExcerpt?: string;
}

export interface PassageAnnotation {
  id: string;
  chapterId: string;
  excerpt: string;
  note: string;
  category: 'technique_evidence' | 'causal_anchor' | 'continuity_flag' | 'character_psychology' | 'open_question';
  epistemicStatus: EpistemicStatus;
  linkedEntityId?: string; // Event ID, TechniquePack ID, or Question ID
  createdAt: number;
}

export interface Revision {
  id: string;
  timestamp: number;
  author: 'user' | 'model';
  modelId?: string;
  notes?: string;
  content: string;
  wordCount: number;
  techniquePackIds?: string[];
  evaluationId?: string;
}

export interface ChapterDraft {
  id: string;
  title: string;
  chapterNumber: number | string;
  provenance: ProvenanceType;
  sourceIdentifier?: string; // E.g. Ledger ref, file source
  parentLedgerChapterId?: string; // If forked from an authoritative Ledger snapshot
  currentContent: string;
  notes: string;
  writingObjectives: string[];
  constraints: string[];
  targetPlanId?: string;
  activeTechniquePackIds: string[];
  revisions: Revision[];
  annotations?: PassageAnnotation[];
  createdAt: number;
  updatedAt: number;
  lastAnalysisTimestamp?: number;
}

export interface TechniqueMechanismStep {
  stepNumber: number;
  phase: string;
  InputState: string;
  operation: string;
  observableOutput: string;
}

export interface TechniquePackComponentA {
  principles: string;
  formalRepresentation: string; // Logical, causal, or structural notation
  coreAssumptions: string;
  methodologicalStatus?: 'documented_principle' | 'project_adaptation' | 'experimental_hypothesis';
}

export interface TechniquePackComponentB {
  mechanisms: string;
  intendedEffects: string;
  psychologicalPhilosophicalRationale: string;
  limitationsAndRisks: string;
  evidenceBase: string; // Distinguish documented evidence from hypotheses
  mechanismSteps?: TechniqueMechanismStep[];
}

export interface TechniquePackComponentC {
  sources: string[];
  historicalContext: string;
  documentedLiteraryPrecedents: string;
  attribution: string; // Unknown origins must be explicitly stated as unknown
  linkedCanonicalChapterIds?: string[];
}

export interface TechniquePackExample {
  title: string;
  excerpt: string;
  annotation: string;
  type: 'effective' | 'ineffective' | 'contrast';
  criterionAnalysis: string;
  sourceChapterId?: string;
}

export interface TechniquePackComponentD {
  examples: TechniquePackExample[];
}

export interface TechniquePackComponentE {
  practicalProcedures: string[];
  decisionRules: string[];
  constraints: string[];
  commonErrorsToAvoid: string[];
  evaluationTests: string[];
}

export interface TechniqueApplicationRecord {
  id: string;
  timestamp: number;
  techniquePackId: string;
  techniqueVersion: string;
  chapterId: string;
  originalPassage: string;
  revisedPassage: string;
  appliedProcedures: string[];
  outcomeStatus: 'effective' | 'partial' | 'counterproductive';
  observedEffectNotes: string;
  methodUsed: 'manual_workbench' | 'model_assisted';
  modelId?: string;
}

export interface TechniquePackVersion {
  versionNumber: string;
  updatedAt: number;
  changelog: string;
  componentA: TechniquePackComponentA;
  componentB: TechniquePackComponentB;
  componentC: TechniquePackComponentC;
  componentD: TechniquePackComponentD;
  componentE: TechniquePackComponentE;
}

export interface TechniquePack {
  id: string;
  name: string;
  category: 'narrative' | 'psychology' | 'prose' | 'structure' | 'thematic';
  description: string;
  currentVersion: string;
  tags: string[];
  versions: Record<string, TechniquePackVersion>;
  applicationRecords?: TechniqueApplicationRecord[];
  createdAt: number;
  updatedAt: number;
  // Present only for imported Ledger source records; these fields preserve traceability.
  provenance?: 'ledger_source_draft' | 'local_working_pack';
  sourceRepository?: string;
  sourcePath?: string;
  sourceBlobSha?: string;
  sourceStatus?: string;
  sourceMarkdown?: string;
}

export interface CompiledTechniqueInstruction {
  compilationId: string;
  compiledAt: number;
  packIds: string[];
  packVersions: Record<string, string>;
  taskContext: string;
  systemPromptBlock: string;
  ruleList: string[];
  conflictWarnings: string[];
}

export interface PlanMilestone {
  id: string;
  title: string;
  targetChapterNumber?: string | number;
  intendedEvents: string[];
  characterBeats: string[];
  thematicGoals: string[];
  status: 'planned' | 'drafted' | 'diverged' | 'completed';
  dependsOnMilestoneIds?: string[];
}

export interface SchemeOfWork {
  id: string;
  title: string;
  scope: string; // e.g., 'Act I: Mortality, Transmigration & The Kuoh Threshold'
  originalSource: string; // Origin provenance
  overview: string;
  charactersInvolved: string[];
  milestones: PlanMilestone[];
  discrepancies: {
    chapterId: string;
    description: string;
    actionRequired: string;
    resolved: boolean;
  }[];
  createdAt: number;
  updatedAt: number;
}

export type EventChronologyType = 'linear' | 'flashback' | 'simultaneous' | 'prophecy_or_vision';

export interface StoryEvent {
  id: string;
  chapterId?: string;
  sequenceIndex: number;
  title: string;
  summary: string;
  sceneLocation?: string;
  chronologyType: EventChronologyType;
  storyTimeEstimate?: string;
  charactersPresent: string[];
  decisionPoints: string[];
  directConsequences: string[];
  causalPredecessors: string[]; // Event IDs that directly cause this event
  temporalPredecessors?: string[]; // Events that merely precede temporally without causing it
  epistemicStatus?: EpistemicStatus;
  supportingPassageExcerpt?: string;
  uncertaintyOrInferenceNotes?: string;
}

export interface CharacterKnowledgeState {
  characterName: string;
  roleOrIdentityNote?: string;
  knows: string[];
  suspects: string[];
  believesFalsely: string[];
  unawareOf: string[];
  evidencePassage?: string;
}

export interface ContinuityFinding {
  id: string;
  severity: 'critical_contradiction' | 'soft_discrepancy' | 'unresolved_thread' | 'verified_continuity';
  description: string;
  affectedChaptersOrEvents: string[];
  epistemicStatus?: EpistemicStatus;
  passageReference?: string;
  passageRef?: string;
  recommendedResolution?: string;
}

export interface ChapterAnalysis {
  id: string;
  chapterId: string;
  chapterVersionTimestamp: number;
  analyzedAt: number;
  isStale: boolean;
  provenance?: ProvenanceType;
  modelIdentifier?: string;
  events: StoryEvent[];
  causalEdges?: CausalEdge[];
  characterKnowledge: CharacterKnowledgeState[];
  setupsAndPayoffs: {
    setup: string;
    payoff: string;
    status: 'setup_only' | 'paid_off' | 'abandoned';
    passageRef?: string;
    targetChapterRef?: string;
  }[];
  continuityFindings: ContinuityFinding[];
  identifiedTechniques: {
    techniqueName: string;
    techniquePackId?: string;
    confidence: 'high_evidence' | 'moderate' | 'inferred';
    supportingPassage: string;
    analysis: string;
  }[];
  overallNarrativeAssessment: {
    strengths: string[];
    vulnerabilities: string[];
    causalIntegrityScore?: string;
    summary: string;
  };
}

export interface InvestigationQuestion {
  id: string;
  title: string;
  category: 'continuity_mystery' | 'causal_gap' | 'character_identity' | 'technique_experiment' | 'textual_discrepancy';
  status: 'open' | 'investigating' | 'resolved_in_canon' | 'working_hypothesis';
  summary: string;
  competingHypotheses: {
    id: string;
    statement: string;
    epistemicStatus: EpistemicStatus;
    supportingEvidence: {
      chapterId: string;
      excerpt: string;
      note: string;
    }[];
    counterEvidence?: string;
  }[];
  linkedChapterIds: string[];
  linkedTechniquePackIds?: string[];
  updatedAt: number;
}

export interface PinnedWorkingItem {
  id: string;
  type: 'passage' | 'technique' | 'event' | 'question' | 'finding';
  title: string;
  subtitle?: string;
  content: string;
  chapterId?: string;
  sourceId?: string;
  provenance: ProvenanceType | EpistemicStatus;
  pinnedAt: number;
}

export interface EvaluationCriterion {
  id: string;
  name: string;
  description: string;
  category: 'objective' | 'technique' | 'continuity' | 'causality' | 'character_voice' | 'prose_quality';
  weight: number;
}

export interface CriterionEvaluationResult {
  criterionId: string;
  criterionName: string;
  score: number; // 1 to 5
  evidenceExcerpt: string;
  findings: string;
  passFail: 'pass' | 'fail' | 'partial';
}

export interface EvaluationRecord {
  id: string;
  timestamp: number;
  chapterId: string;
  revisionId: string;
  techniquePackIdsUsed: string[];
  evaluatorType: 'model_independent' | 'human_audit';
  modelId?: string;
  results: CriterionEvaluationResult[];
  overallSummary: string;
  identifiedDeviations: string[];
  recommendations: string[];
}

export interface AIExecutionLog {
  id: string;
  timestamp: number;
  provider: 'gemini' | 'custom_external';
  modelId: string; // The model that actually generated the result
  requestedModelId?: string; // The model requested before fallback
  fallbackTriggered?: boolean;
  fallbackReason?: string;
  taskType: 'draft_generation' | 'prose_revision' | 'chapter_analysis' | 'quality_evaluation' | 'technique_compilation';
  chapterId?: string;
  draftRevisionId?: string;
  techniquePackIds: string[];
  inputPromptSummary: string;
  rawInputPrompt?: string;
  rawOutputText?: string;
  status: 'success' | 'failed' | 'rate_limited' | 'interrupted';
  errorMessage?: string;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  userAccepted?: boolean;
}

export interface WorkspaceState {
  version: string;
  lastSavedAt: number;
  chapters: ChapterDraft[];
  techniquePacks: TechniquePack[];
  schemesOfWork: SchemeOfWork[];
  analyses: ChapterAnalysis[];
  evaluations: EvaluationRecord[];
  executionLogs: AIExecutionLog[];
  investigations?: InvestigationQuestion[];
  pinnedItems?: PinnedWorkingItem[];
  activeChapterId?: string;
  ledgerConnection: {
    status: 'unconnected_standalone' | 'connected_proxy';
    endpointUrl?: string;
    lastSynced?: number;
  };
}
