export type ProvenanceType = 
  | 'ledger_authoritative' 
  | 'imported_external' 
  | 'local_working_draft' 
  | 'generated_revision' 
  | 'derived_analysis';

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
  currentContent: string;
  notes: string;
  writingObjectives: string[];
  constraints: string[];
  targetPlanId?: string;
  activeTechniquePackIds: string[];
  revisions: Revision[];
  createdAt: number;
  updatedAt: number;
  lastAnalysisTimestamp?: number;
}

export interface TechniquePackComponentA {
  principles: string;
  formalRepresentation: string; // Logical, causal, or structural notation
  coreAssumptions: string;
}

export interface TechniquePackComponentB {
  mechanisms: string;
  intendedEffects: string;
  psychologicalPhilosophicalRationale: string;
  limitationsAndRisks: string;
  evidenceBase: string; // Distinguish documented evidence from hypotheses
}

export interface TechniquePackComponentC {
  sources: string[];
  historicalContext: string;
  documentedLiteraryPrecedents: string;
  attribution: string; // Unknown origins must be explicitly stated as unknown
}

export interface TechniquePackExample {
  title: string;
  excerpt: string;
  annotation: string;
  type: 'effective' | 'ineffective' | 'contrast';
  criterionAnalysis: string;
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
  createdAt: number;
  updatedAt: number;
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
}

export interface SchemeOfWork {
  id: string;
  title: string;
  scope: string; // e.g., 'Act I: The Grigori Incursion'
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
  supportingPassageExcerpt?: string;
  uncertaintyOrInferenceNotes?: string;
}

export interface CharacterKnowledgeState {
  characterName: string;
  knows: string[];
  suspects: string[];
  believesFalsely: string[];
  unawareOf: string[];
}

export interface ContinuityFinding {
  id: string;
  severity: 'critical_contradiction' | 'soft_discrepancy' | 'unresolved_thread' | 'verified_continuity';
  description: string;
  affectedChaptersOrEvents: string[];
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
  modelIdentifier?: string;
  events: StoryEvent[];
  characterKnowledge: CharacterKnowledgeState[];
  setupsAndPayoffs: {
    setup: string;
    payoff: string;
    status: 'setup_only' | 'paid_off' | 'abandoned';
    passageRef?: string;
  }[];
  continuityFindings: ContinuityFinding[];
  identifiedTechniques: {
    techniqueName: string;
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
  activeChapterId?: string;
  ledgerConnection: {
    status: 'unconnected_standalone' | 'connected_proxy';
    endpointUrl?: string;
    lastSynced?: number;
  };
}
