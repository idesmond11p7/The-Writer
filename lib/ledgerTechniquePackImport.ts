import ledgerBundle from '@/data/ledger-technique-packs.json';
import { TechniquePack, TechniquePackVersion } from '@/types/domain';

type LedgerPackSnapshot = {
  id: string;
  path: string;
  blobSha: string;
  metadata: {
    title: string;
    status?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
    source?: string;
    relatedDocIds?: string[];
  };
  markdown: string;
};

const snapshot = ledgerBundle.packs as LedgerPackSnapshot[];
const NOT_STATED = 'Not stated in the source document. Do not infer or present this as source-backed fact.';

function splitSections(markdown: string): { intro: string; sections: Map<string, string> } {
  const lines = markdown.split(/\r?\n/);
  const sections = new Map<string, string>();
  let current = '';
  let buffer: string[] = [];
  const flush = () => {
    if (current) sections.set(current.trim().toLowerCase(), buffer.join('\n').trim());
  };
  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      flush();
      current = heading[1].trim();
      buffer = [];
    } else if (current) {
      buffer.push(line);
    }
  }
  flush();
  const firstSection = lines.findIndex((line) => /^##\s+/.test(line));
  const introLines = (firstSection < 0 ? lines : lines.slice(0, firstSection))
    .filter((line, index) => !(index === 0 && /^#\s+/.test(line)));
  return { intro: introLines.join('\n').trim(), sections };
}

function section(sections: Map<string, string>, ...names: string[]): string {
  return names.map((name) => sections.get(name.toLowerCase())).filter(Boolean).join('\n\n').trim();
}

function listItems(text: string): string[] {
  return text.split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^(?:[-*+]\s+|\d+[.)]\s+)/.test(line))
    .map((line) => line.replace(/^(?:[-*+]\s+|\d+[.)]\s+)/, '').trim())
    .filter(Boolean);
}

function categoryFor(id: string): TechniquePack['category'] {
  if (/psycholinguistic|camera_eye|subtext|resonance/.test(id)) return 'psychology';
  if (/glyphcraft|cadence|kinetic|wraytracing|lyric_forge/.test(id)) return 'prose';
  if (/rest_arrest|juxtaposition|ellipsis/.test(id)) return 'structure';
  return 'narrative';
}

function toPack(source: LedgerPackSnapshot): TechniquePack {
  const { intro, sections } = splitSections(source.markdown);
  const mechanisms = section(
    sections,
    'the ray model', 'physical mechanics palette', 'controls', 'motif lifecycle',
    'three gap modes', 'core idea', 'three scales of ellipsis', 'what can be arrested?',
    'collision types', 'action chain', 'mechanisms to inspect', 'main controls'
  );
  const evidence = section(
    sections, 'ledger evidence', 'ledger case studies', 'ledger applications',
    'ledger cases', 'ledger connections', 'case studies'
  );
  const procedure = section(
    sections, 'application procedure', 'how to apply it', 'procedure',
    'procedure for lyric writing', 'lyrical prose'
  );
  const failures = section(sections, 'failure modes');
  const diagnostic = section(
    sections, 'diagnostic test', 'diagnostic', 'diagnostic questions',
    'test', 'tests', 'evaluation checklist'
  );
  const research = section(sections, 'research connection', 'research grounding');
  const links = [...source.markdown.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)]
    .map((match) => `${match[1]} — ${match[2]}`);
  const now = Date.parse(source.metadata.updatedAt || '') || 0;
  const version = `1.0.0+ledger.${source.blobSha.slice(0, 7)}`;
  const versionData: TechniquePackVersion = {
    versionNumber: version,
    updatedAt: now,
    changelog: `Imported from Ledger source ${source.path}; blob ${source.blobSha}. Source status: ${source.metadata.status || 'unspecified'}. No unsupported examples or claims were generated during import.`,
    componentA: {
      principles: intro || source.metadata.title,
      formalRepresentation: section(sections, 'formal representation') || NOT_STATED,
      coreAssumptions: section(sections, 'core assumptions') || NOT_STATED,
      methodologicalStatus: 'project_adaptation',
    },
    componentB: {
      mechanisms: mechanisms || NOT_STATED,
      intendedEffects: NOT_STATED,
      psychologicalPhilosophicalRationale: research || NOT_STATED,
      limitationsAndRisks: failures || NOT_STATED,
      evidenceBase: evidence || 'No chapter-case-study section was present in the source document.',
    },
    componentC: {
      sources: links,
      historicalContext: NOT_STATED,
      documentedLiteraryPrecedents: evidence || NOT_STATED,
      attribution: source.metadata.source || NOT_STATED,
      linkedCanonicalChapterIds: (source.metadata.relatedDocIds || []).filter((id) => id.startsWith('chapter_')),
    },
    componentD: {
      // Source summaries are not misrepresented as direct chapter excerpts or validated examples.
      examples: [],
    },
    componentE: {
      practicalProcedures: listItems(procedure),
      decisionRules: listItems(diagnostic),
      constraints: listItems(failures),
      commonErrorsToAvoid: listItems(failures),
      evaluationTests: listItems(diagnostic),
    },
  };

  const firstParagraph = intro.split(/\n\s*\n/).map((p) => p.trim()).find(Boolean);
  return {
    id: `ledger_${source.id}`,
    name: source.metadata.title,
    category: categoryFor(source.id),
    description: firstParagraph || 'Imported source document; consult the full source text and metadata.',
    currentVersion: version,
    tags: [...new Set([...(source.metadata.tags || []), 'ledger-source', 'source-draft'])],
    versions: { [version]: versionData },
    applicationRecords: [],
    createdAt: Date.parse(source.metadata.createdAt || '') || now,
    updatedAt: now,
    provenance: 'ledger_source_draft',
    sourceRepository: 'idesmond11p7/The-Ledger',
    sourcePath: source.path,
    sourceBlobSha: source.blobSha,
    sourceStatus: source.metadata.status || 'unspecified',
    sourceMarkdown: source.markdown,
  };
}

export const INITIAL_LEDGER_TECHNIQUE_PACKS: TechniquePack[] = snapshot.map(toPack);
