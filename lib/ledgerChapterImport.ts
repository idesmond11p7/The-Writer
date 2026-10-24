import ledgerBundle from '@/data/ledger-chapters.json';
import { ChapterDraft, WorkspaceState } from '@/types/domain';

type LedgerSnapshotChapter = {
  chapterNumber: number;
  id: string;
  title: string;
  status: string;
  source: string;
  updatedAt: string;
  sourceRepository: string;
  sourcePath: string;
  sourceBlobSha: string;
  content: string;
};

const snapshotChapters = ledgerBundle.chapters as LedgerSnapshotChapter[];

function toChapterDraft(source: LedgerSnapshotChapter): ChapterDraft {
  const timestamp = Date.parse(source.updatedAt) || Date.now();
  const sourceIdentifier = `${source.sourceRepository}:${source.sourcePath}#${source.sourceBlobSha}`;
  const isChapterEight = source.chapterNumber === 8;
  const notes = [
    `Imported from the Ledger snapshot. Source status: ${source.status}.`,
    `Source blob SHA: ${source.sourceBlobSha}.`,
    'This is a read-only provenance reference in Writer; make revisions in a separate working draft rather than silently replacing the Ledger source.',
    ...(isChapterEight
      ? ["TITLE DISCREPANCY: this Ledger source is titled “The Architecture of Waiting”; the user's established working title for the planned redo is “The Logistics of Waiting”. Preserve this source title as metadata and do not silently resolve the discrepancy."]
      : []),
  ].join(' ');

  return {
    id: `ledger_chapter_${String(source.chapterNumber).padStart(2, '0')}_${source.sourceBlobSha.slice(0, 7)}`,
    title: source.title,
    chapterNumber: source.chapterNumber,
    provenance: 'ledger_authoritative',
    sourceIdentifier,
    currentContent: source.content,
    notes,
    writingObjectives: ['Preserve the exact Ledger chapter text', 'Analyze only with evidence from the supplied source'],
    constraints: [
      'Ledger-authoritative source snapshot; do not overwrite this record with a revision.',
      'Create a separate working draft for any rewrite or experimental edit.',
      'Do not treat inference as established canon.',
    ],
    activeTechniquePackIds: [],
    revisions: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export const INITIAL_LEDGER_CHAPTER_DRAFTS: ChapterDraft[] = snapshotChapters.map(toChapterDraft);

/**
 * Merge the bundled Ledger chapter snapshot into a Writer workspace without
 * overwriting existing user drafts or creating duplicate copies on re-import.
 */
export function importLedgerChapterSnapshot(state: WorkspaceState): WorkspaceState {
  const existing = [...state.chapters];
  const existingSourceIds = new Set(
    existing.map((chapter) => chapter.sourceIdentifier).filter((value): value is string => Boolean(value))
  );

  const legacySeedIndex = existing.findIndex(
    (chapter) =>
      chapter.id === 'chap_dxd_01' &&
      chapter.sourceIdentifier === 'LEDGER-REF-DXD-FW-001 (Pending Sync)'
  );

  if (legacySeedIndex >= 0) {
    const legacy = existing[legacySeedIndex];
    existing[legacySeedIndex] = {
      ...legacy,
      title: 'QUARANTINED: Unverified Writer Seed Example (not Ledger canon)',
      chapterNumber: '1-example',
      provenance: 'local_working_draft',
      sourceIdentifier: 'QUARANTINED_WRITER_SEED_EXAMPLE: not present in Ledger',
      notes: [
        'Quarantined during canonical Ledger chapter import because this was generated seed content, not a verified Ledger chapter.',
        legacy.notes,
      ].filter(Boolean).join(' '),
      activeTechniquePackIds: [],
    };
  }

  const imported = INITIAL_LEDGER_CHAPTER_DRAFTS.filter(
    (chapter) => !existingSourceIds.has(chapter.sourceIdentifier || '')
  );

  const chapters = [...imported, ...existing];
  const firstCanonical = chapters.find((chapter) => chapter.provenance === 'ledger_authoritative');

  const previousActive = state.chapters.find((chapter) => chapter.id === state.activeChapterId);
  const shouldSelectCanonical =
    !previousActive ||
    previousActive.id === 'chap_dxd_01' ||
    previousActive.sourceIdentifier === 'LEDGER-REF-DXD-FW-001 (Pending Sync)';

  return {
    ...state,
    version: '1.1.0',
    lastSavedAt: Date.now(),
    chapters,
    activeChapterId: shouldSelectCanonical ? firstCanonical?.id : state.activeChapterId,
    ledgerConnection: {
      ...state.ledgerConnection,
      status: 'unconnected_standalone',
      lastSynced: Date.now(),
    },
  };
}
