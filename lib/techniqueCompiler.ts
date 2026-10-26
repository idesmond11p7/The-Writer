import { TechniquePack, CompiledTechniqueInstruction } from '@/types/domain';

export function compileTechniquePacks(
  packs: TechniquePack[],
  selectedVersions: Record<string, string>, // packId -> versionNumber
  taskContext: string,
  extraConstraints: string[] = []
): CompiledTechniqueInstruction {
  const packIds: string[] = [];
  const packVersions: Record<string, string> = {};
  const rules: string[] = [];
  const conflictWarnings: string[] = [];

  let compiledInstructionsText = `### COMPILED LITERARY TECHNIQUE SPECIFICATION\n`;
  compiledInstructionsText += `Task Directive: ${taskContext || 'Drafting / Prose Formulation'}\n\n`;

  packs.forEach((pack) => {
    const versionNumber = selectedVersions[pack.id] || pack.currentVersion;
    const versionData = pack.versions[versionNumber];
    if (!versionData) return;

    packIds.push(pack.id);
    packVersions[pack.id] = versionNumber;

    compiledInstructionsText += `========================================================\n`;
    compiledInstructionsText += `TECHNIQUE PACK: ${pack.name} [ID: ${pack.id}] (Version: ${versionNumber})\n`;
    compiledInstructionsText += `Category: ${pack.category.toUpperCase()}\n`;
    if (pack.provenance === 'ledger_source_draft') {
      compiledInstructionsText += `SOURCE STATUS: ${pack.sourceStatus || 'unspecified'} (Ledger draft; not user-approved canon or final methodology)\n`;
      compiledInstructionsText += `SOURCE: ${pack.sourceRepository || 'unknown repository'} / ${pack.sourcePath || 'unknown path'}\n`;
      compiledInstructionsText += `SOURCE BLOB SHA: ${pack.sourceBlobSha || 'unavailable'}\n`;
    }
    compiledInstructionsText += `========================================================\n\n`;

    // Component A: Formal Model
    compiledInstructionsText += `[1. ABSTRACT PHILOSOPHY & FORMAL REPRESENTATION]\n`;
    compiledInstructionsText += `Principles: ${versionData.componentA.principles}\n`;
    compiledInstructionsText += `Formal Representation: ${versionData.componentA.formalRepresentation}\n`;
    compiledInstructionsText += `Core Assumptions: ${versionData.componentA.coreAssumptions}\n\n`;

    // Component B: Applied Philosophy & Psychology
    compiledInstructionsText += `[2. APPLIED MECHANISM & PSYCHOLOGY]\n`;
    compiledInstructionsText += `Mechanisms: ${versionData.componentB.mechanisms}\n`;
    compiledInstructionsText += `Intended Reader Effects: ${versionData.componentB.intendedEffects}\n`;
    compiledInstructionsText += `Rationale: ${versionData.componentB.psychologicalPhilosophicalRationale}\n`;
    compiledInstructionsText += `Boundaries & Risks: ${versionData.componentB.limitationsAndRisks}\n\n`;

    // Component E: Implementation rules
    compiledInstructionsText += `[3. OPERATIONAL RULES & PROCEDURES]\n`;
    versionData.componentE.practicalProcedures.forEach((proc, i) => {
      rules.push(`[${pack.name}] Procedure ${i + 1}: ${proc}`);
      compiledInstructionsText += `- Procedure ${i + 1}: ${proc}\n`;
    });

    compiledInstructionsText += `\n[DECISION RULES & CONSTRAINTS]:\n`;
    versionData.componentE.decisionRules.forEach((rule) => {
      rules.push(`[${pack.name}] Decision: ${rule}`);
      compiledInstructionsText += `- Rule: ${rule}\n`;
    });
    versionData.componentE.constraints.forEach((cons) => {
      rules.push(`[${pack.name}] Constraint: ${cons}`);
      compiledInstructionsText += `- Constraint: ${cons}\n`;
    });

    compiledInstructionsText += `\n[ERRORS TO AVOID]:\n`;
    versionData.componentE.commonErrorsToAvoid.forEach((err) => {
      compiledInstructionsText += `- AVOID: ${err}\n`;
    });

    compiledInstructionsText += `\n[EVALUATION CHECKS]:\n`;
    versionData.componentE.evaluationTests.forEach((test) => {
      compiledInstructionsText += `- Audit Check: ${test}\n`;
    });

    if (pack.provenance === 'ledger_source_draft' && pack.sourceMarkdown) {
      compiledInstructionsText += `[VERBATIM LEDGER SOURCE DOCUMENT — PRESERVE ITS QUALIFIERS]\n`;
      compiledInstructionsText += pack.sourceMarkdown + `\n\n`;
    }

    compiledInstructionsText += `\n`;
  });

  // Extra constraints
  if (extraConstraints.length > 0) {
    compiledInstructionsText += `[TASK-SPECIFIC CONSTRAINTS]\n`;
    extraConstraints.forEach((c) => {
      rules.push(`[Task Constraint] ${c}`);
      compiledInstructionsText += `- ${c}\n`;
    });
    compiledInstructionsText += `\n`;
  }

  // Conflict detection heuristic
  const lowerRules = rules.map((r) => r.toLowerCase());
  for (let i = 0; i < lowerRules.length; i++) {
    for (let j = i + 1; j < lowerRules.length; j++) {
      if (
        (lowerRules[i].includes('omit') && lowerRules[j].includes('include')) ||
        (lowerRules[i].includes('fast pace') && lowerRules[j].includes('slow pace')) ||
        (lowerRules[i].includes('high dialogue') && lowerRules[j].includes('dialogue-free'))
      ) {
        conflictWarnings.push(`Potential friction detected between "${rules[i]}" and "${rules[j]}".`);
      }
    }
  }

  return {
    compilationId: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    compiledAt: Date.now(),
    packIds,
    packVersions,
    taskContext,
    systemPromptBlock: compiledInstructionsText,
    ruleList: rules,
    conflictWarnings,
  };
}
