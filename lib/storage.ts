import { WorkspaceState } from '@/types/domain';
import { INITIAL_WORKSPACE_STATE } from './seedData';
import { importLedgerChapterSnapshot } from './ledgerChapterImport';

const STORAGE_KEY = 'apocrypha_dxd_writer_workspace_v2';
const LEGACY_STORAGE_KEY = 'apocrypha_dxd_writer_workspace_v1';

let currentWorkspaceState: WorkspaceState = INITIAL_WORKSPACE_STATE;
let isInitialized = false;
const listeners = new Set<() => void>();

function migrateWorkspaceState(parsed: Partial<WorkspaceState>): WorkspaceState {
  // Ensure the 8 canonical Ledger chapters are always present and remove quarantined fake sample chap_dxd_01
  const filteredChapters = (parsed.chapters || []).filter(
    (c) => c.id !== 'chap_dxd_01'
  );
  const { chapters: mergedChapters } = importLedgerChapterSnapshot({
    ...INITIAL_WORKSPACE_STATE,
    chapters: filteredChapters,
  });

  // Remove the four fabricated legacy seed packs. Ledger-backed packs replace them;
  // user-authored local packs remain available.
  const legacySeedTechniquePackIds = new Set([
    'tp_sensory_fracture',
    'tp_somatic_cognitive_duality',
    'tp_causal_compression',
    'tp_epistemic_irony',
  ]);
  const existingPacks = (parsed.techniquePacks || []).filter(
    (pack) => !legacySeedTechniquePackIds.has(pack.id)
  );
  const existingPacksById = new Map(existingPacks.map((pack) => [pack.id, pack]));
  const canonicalPacks = INITIAL_WORKSPACE_STATE.techniquePacks;
  const mergedPacks = canonicalPacks.map((sourcePack) => {
    const existing = existingPacksById.get(sourcePack.id);
    if (!existing) return sourcePack;

    // Keep local edits when the imported source hash is unchanged. If Ledger changed,
    // advance the source version while retaining the user's previous versions as history.
    if (existing.sourceBlobSha === sourcePack.sourceBlobSha) return existing;
    return {
      ...sourcePack,
      versions: {
        ...existing.versions,
        ...sourcePack.versions,
      },
    };
  });
  existingPacks.forEach((pack) => {
    if (!mergedPacks.some((canonical) => canonical.id === pack.id)) {
      mergedPacks.push(pack);
    }
  });

  // Filter out legacy fake schemes of work (sow_act1_grigori) and ensure canonical scheme is present
  const existingSchemes = (parsed.schemesOfWork || []).filter(
    (s) => s.id !== 'sow_act1_grigori'
  );
  const mergedSchemes =
    existingSchemes.length > 0
      ? existingSchemes
      : INITIAL_WORKSPACE_STATE.schemesOfWork;

  // Filter out legacy fake analysis (ana_seed_01) and merge canonical analyses
  const existingAnalyses = (parsed.analyses || [])
    .filter((a) => a.id !== 'ana_seed_01' && a.chapterId !== 'chap_dxd_01')
    .map((analysis) => ({
      ...analysis,
      // Remove technique annotations that depended on the fabricated legacy packs.
      identifiedTechniques: (analysis.identifiedTechniques || []).filter(
        (item) => !legacySeedTechniquePackIds.has(item.techniquePackId || '')
      ),
    }));
  const mergedAnalyses = [...existingAnalyses];
  INITIAL_WORKSPACE_STATE.analyses.forEach((seedAna) => {
    if (!mergedAnalyses.some((a) => a.chapterId === seedAna.chapterId)) {
      mergedAnalyses.push(seedAna);
    }
  });

  // Filter out legacy fake evaluations (eval_seed_01)
  const existingEvaluations = (parsed.evaluations || []).filter(
    (e) =>
      e.id !== 'eval_seed_01' &&
      e.id !== 'eval_seed_ch08' &&
      e.chapterId !== 'chap_dxd_01'
  );
  const mergedEvaluations =
    existingEvaluations.length > 0
      ? existingEvaluations
      : INITIAL_WORKSPACE_STATE.evaluations;

  // Filter out legacy fake execution logs
  const existingLogs = (parsed.executionLogs || []).filter(
    (l) => l.id !== 'exec_seed_01' && l.id !== 'exec_seed_02' && l.chapterId !== 'chap_dxd_01'
  );

  const activeChapterId =
    parsed.activeChapterId &&
    parsed.activeChapterId !== 'chap_dxd_01' &&
    mergedChapters.some((c) => c.id === parsed.activeChapterId)
      ? parsed.activeChapterId
      : mergedChapters[0]?.id || INITIAL_WORKSPACE_STATE.activeChapterId;

  return {
    version: '2.0.0',
    lastSavedAt: parsed.lastSavedAt || Date.now(),
    chapters: mergedChapters,
    techniquePacks: mergedPacks,
    schemesOfWork: mergedSchemes,
    analyses: mergedAnalyses,
    evaluations: mergedEvaluations,
    executionLogs: existingLogs,
    investigations:
      parsed.investigations && parsed.investigations.length > 0
        ? parsed.investigations.map((question) => ({
            ...question,
            linkedTechniquePackIds: (question.linkedTechniquePackIds || []).filter(
              (id) => !legacySeedTechniquePackIds.has(id)
            ),
          }))
        : INITIAL_WORKSPACE_STATE.investigations,
    pinnedItems:
      parsed.pinnedItems && parsed.pinnedItems.length > 0
        ? parsed.pinnedItems
        : INITIAL_WORKSPACE_STATE.pinnedItems,
    activeChapterId,
    ledgerConnection: parsed.ledgerConnection || INITIAL_WORKSPACE_STATE.ledgerConnection,
  };
}

function initializeFromStorage() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;
  try {
    const rawV2 = window.localStorage.getItem(STORAGE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2) as WorkspaceState;
      if (parsed && Array.isArray(parsed.chapters)) {
        currentWorkspaceState = migrateWorkspaceState(parsed);
        return;
      }
    }
    const rawLegacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (rawLegacy) {
      const parsedLegacy = JSON.parse(rawLegacy) as Partial<WorkspaceState>;
      currentWorkspaceState = migrateWorkspaceState(parsedLegacy);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWorkspaceState));
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WORKSPACE_STATE));
  } catch (e) {
    console.error('Failed to load workspace state from storage:', e);
  }
}

export function getWorkspaceSnapshot(): WorkspaceState {
  if (typeof window !== 'undefined' && !isInitialized) {
    initializeFromStorage();
  }
  return currentWorkspaceState;
}

export function getServerWorkspaceSnapshot(): WorkspaceState {
  return INITIAL_WORKSPACE_STATE;
}

export function subscribeWorkspace(listener: () => void): () => void {
  if (typeof window !== 'undefined' && !isInitialized) {
    initializeFromStorage();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function updateWorkspaceState(updater: (prev: WorkspaceState) => WorkspaceState): void {
  const next = updater(currentWorkspaceState);
  const updated: WorkspaceState = {
    ...next,
    lastSavedAt: Date.now(),
  };
  currentWorkspaceState = updated;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save workspace state:', e);
    }
  }
  listeners.forEach((l) => l());
}

export function setWorkspaceStateDirect(state: WorkspaceState): void {
  currentWorkspaceState = migrateWorkspaceState(state);
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWorkspaceState));
    } catch (e) {
      console.error('Failed to save workspace state:', e);
    }
  }
  listeners.forEach((l) => l());
}

export function resetWorkspaceToSeed(): WorkspaceState {
  currentWorkspaceState = INITIAL_WORKSPACE_STATE;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WORKSPACE_STATE));
  }
  listeners.forEach((l) => l());
  return INITIAL_WORKSPACE_STATE;
}

export function exportWorkspaceBundle(state: WorkspaceState): void {
  const dataStr = JSON.stringify(state, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `apocrypha-dxd-writer-bundle-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export const exportWorkspaceToJson = exportWorkspaceBundle;

export function exportChapterToMarkdown(title: string, chapterNumber: string | number, content: string): void {
  const md = `# Chapter ${chapterNumber}: ${title}\n\n${content}`;
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chapter-${chapterNumber}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
