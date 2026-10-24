import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { estimateCost } from '@/lib/pricing';
import { 
  DEFAULT_MODEL_ID, 
  FALLBACK_MODEL_ID, 
  SUPPORTED_MODELS, 
  isSupportedModel 
} from '@/lib/models';

function isTransientCapacityError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  return (
    msg.includes('503') ||
    msg.includes('UNAVAILABLE') ||
    msg.includes('high demand') ||
    msg.includes('temporarily unavailable') ||
    msg.includes('Overloaded') ||
    msg.includes('ResourceExhausted')
  );
}

export async function GET() {
  const hasKey = !!process.env.GEMINI_API_KEY;
  return NextResponse.json({
    success: true,
    hasApiKey: hasKey,
    defaultModelId: DEFAULT_MODEL_ID,
    fallbackModelId: FALLBACK_MODEL_ID,
    supportedModels: SUPPORTED_MODELS,
    status: hasKey ? 'operational' : 'missing_api_key',
  });
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const {
      taskType, // 'draft_generation' | 'prose_revision' | 'chapter_analysis' | 'quality_evaluation'
      modelId = DEFAULT_MODEL_ID,
      userPrompt,
      contextText, // Chapter content or draft
      compiledTechniquePrompt, // Formatted text from Technique Pack compiler
      planContext, // Scheme of Work milestone context
      constraints = [],
      temperature = 0.7,
    } = body;

    // Validate model identifier
    if (!isSupportedModel(modelId)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported model identifier '${modelId}'. Supported models are: ${SUPPORTED_MODELS.map((m) => m.id).join(', ')}.`,
          status: 'unsupported_model',
          requestedModelId: modelId,
          latencyMs: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'GEMINI_API_KEY is not configured in the server environment. Please check the Secrets panel in AI Studio.',
          status: 'failed',
          latencyMs: Date.now() - startTime,
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Assemble systematic prompt
    let systemInstruction = `You are the specialized literary intelligence engine for "Apocrypha DXD: ForeverWorlds", part of the Ur-Verse project.
You adhere strictly to the supplied literary techniques, narrative causality constraints, and character voice guidelines.
Never fabricate ungrounded canon or contradict explicit constraints.`;

    if (compiledTechniquePrompt) {
      systemInstruction += `\n\n${compiledTechniquePrompt}`;
    }

    let assembledContent = '';

    if (taskType === 'draft_generation') {
      assembledContent += `### WRITING TASK: DRAFT GENERATION\n`;
      if (planContext) assembledContent += `Plan Context:\n${planContext}\n\n`;
      if (contextText) assembledContent += `Current Scene Context:\n${contextText}\n\n`;
      assembledContent += `Specific Directives:\n${userPrompt}\n\n`;
      if (constraints.length > 0) {
        assembledContent += `Constraints:\n- ${constraints.join('\n- ')}\n\n`;
      }
      assembledContent += `Please produce the prose for this scene, observing all active Technique Pack procedures.`;
    } else if (taskType === 'prose_revision') {
      assembledContent += `### WRITING TASK: PROSE REVISION\n`;
      assembledContent += `Source Prose to Revise:\n${contextText}\n\n`;
      assembledContent += `Revision Objectives:\n${userPrompt}\n\n`;
      if (constraints.length > 0) {
        assembledContent += `Constraints:\n- ${constraints.join('\n- ')}\n\n`;
      }
      assembledContent += `Revise the prose to enhance psychological depth, sensory precision, and technique fidelity while maintaining character continuity.`;
    } else if (taskType === 'chapter_analysis') {
      assembledContent += `### CHAPTER INTELLIGENCE & CAUSALITY ANALYSIS\n`;
      assembledContent += `Analyze the following chapter text strictly according to the evidence present in the text.\n`;
      assembledContent += `Text:\n${contextText}\n\n`;
      assembledContent += `Directives:\n${userPrompt || 'Extract story events, chronological type, causal predecessors, character knowledge matrix (knows vs suspects vs unaware), setups/payoffs, and technique execution.'}\n\n`;
      assembledContent += `Return your analysis in valid JSON format matching this schema:
{
  "events": [
    {
      "id": "evt_...",
      "sequenceIndex": 1,
      "title": "Short title",
      "summary": "Concrete summary",
      "sceneLocation": "Location",
      "chronologyType": "linear" | "flashback" | "simultaneous",
      "storyTimeEstimate": "time or period",
      "charactersPresent": ["name"],
      "decisionPoints": ["decisions made"],
      "directConsequences": ["consequences"],
      "causalPredecessors": ["id of preceding cause"],
      "supportingPassageExcerpt": "quote from text"
    }
  ],
  "characterKnowledge": [
    {
      "characterName": "Name",
      "knows": ["factual observations"],
      "suspects": ["inferences"],
      "believesFalsely": ["false beliefs"],
      "unawareOf": ["hidden context"]
    }
  ],
  "setupsAndPayoffs": [
    {
      "setup": "description",
      "payoff": "description or pending",
      "status": "setup_only" | "paid_off" | "abandoned",
      "passageRef": "quote"
    }
  ],
  "continuityFindings": [
    {
      "id": "cont_...",
      "severity": "critical_contradiction" | "soft_discrepancy" | "unresolved_thread" | "verified_continuity",
      "description": "analysis",
      "passageReference": "quote"
    }
  ],
  "identifiedTechniques": [
    {
      "techniqueName": "Technique Name",
      "confidence": "high_evidence" | "moderate" | "inferred",
      "supportingPassage": "quote",
      "analysis": "how technique was applied"
    }
  ],
  "overallNarrativeAssessment": {
    "strengths": ["points"],
    "vulnerabilities": ["points"],
    "causalIntegrityScore": "percentage or rating",
    "summary": "comprehensive synthesis"
  }
}
Output only valid JSON without markdown fences.`;
    } else if (taskType === 'quality_evaluation') {
      assembledContent += `### LITERARY & TECHNIQUE QUALITY AUDIT\n`;
      assembledContent += `Audit the following prose against explicit writing criteria and Technique Pack specifications.\n`;
      assembledContent += `Text:\n${contextText}\n\n`;
      assembledContent += `Rubric / Objectives:\n${userPrompt}\n\n`;
      assembledContent += `Return valid JSON without markdown fences matching:
{
  "results": [
    {
      "criterionId": "crit_...",
      "criterionName": "Criterion Name",
      "score": 1-5,
      "evidenceExcerpt": "quote",
      "findings": "detailed evaluation",
      "passFail": "pass" | "fail" | "partial"
    }
  ],
  "overallSummary": "summary",
  "identifiedDeviations": ["deviations"],
  "recommendations": ["recommendations"]
}`;
    } else {
      assembledContent = userPrompt;
    }

async function generateWithRetry(
  ai: GoogleGenAI,
  model: string,
  contents: any,
  config: any,
  maxRetries = 2
) {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model,
        contents,
        config,
      });
    } catch (err: unknown) {
      lastError = err;
      if (attempt < maxRetries && isTransientCapacityError(err)) {
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`Model ${model} encountered transient error (attempt ${attempt + 1}/${maxRetries + 1}): ${err}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      break;
    }
  }
  throw lastError;
}

    // Call Gemini Model with controlled transient failure retry & fallback
    let response;
    let actualModelUsed = modelId;
    let fallbackTriggered = false;
    let fallbackReason: string | undefined = undefined;

    try {
      response = await generateWithRetry(ai, modelId, assembledContent, { systemInstruction, temperature }, 2);
    } catch (primaryError: unknown) {
      const primaryMsg = primaryError instanceof Error ? primaryError.message : String(primaryError);

      // Check if candidate for controlled fallback
      if (modelId !== FALLBACK_MODEL_ID && isTransientCapacityError(primaryError)) {
        console.warn(
          `Requested model ${modelId} failed after retries due to transient capacity error: ${primaryMsg}. Initiating controlled fallback to ${FALLBACK_MODEL_ID}...`
        );
        try {
          response = await generateWithRetry(ai, FALLBACK_MODEL_ID, assembledContent, { systemInstruction, temperature }, 1);
          actualModelUsed = FALLBACK_MODEL_ID;
          fallbackTriggered = true;
          fallbackReason = `Requested model '${modelId}' encountered transient capacity failure (${primaryMsg}). Successfully executed using fallback model '${FALLBACK_MODEL_ID}'.`;
        } catch (fallbackError: unknown) {
          const fallbackMsg = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
          console.error(`Fallback to ${FALLBACK_MODEL_ID} also failed: ${fallbackMsg}`);
          const latencyMs = Date.now() - startTime;
          return NextResponse.json(
            {
              success: false,
              error: `Primary model '${modelId}' failed after retries (${primaryMsg}), and fallback on '${FALLBACK_MODEL_ID}' failed (${fallbackMsg}).`,
              requestedModelId: modelId,
              modelId: FALLBACK_MODEL_ID,
              fallbackTriggered: true,
              status: 'failed',
              latencyMs,
            },
            { status: 503 }
          );
        }
      } else {
        // Not a transient capacity error or already the fallback model
        const latencyMs = Date.now() - startTime;
        return NextResponse.json(
          {
            success: false,
            error: primaryMsg,
            requestedModelId: modelId,
            modelId,
            fallbackTriggered: false,
            status: 'failed',
            latencyMs,
          },
          { status: 500 }
        );
      }
    }

    const latencyMs = Date.now() - startTime;
    const usage = response.usageMetadata;
    const promptTokens = usage?.promptTokenCount || 0;
    const completionTokens = usage?.candidatesTokenCount || 0;
    const totalTokens = usage?.totalTokenCount || promptTokens + completionTokens;
    // Estimated cost must accurately reflect the model ACTUALLY used
    const estimatedCostUsd = estimateCost(actualModelUsed, promptTokens, completionTokens);
    const outputText = response.text || '';

    return NextResponse.json({
      success: true,
      outputText,
      modelId: actualModelUsed,
      requestedModelId: modelId,
      fallbackTriggered,
      fallbackReason,
      latencyMs,
      promptTokens,
      completionTokens,
      totalTokens,
      estimatedCostUsd,
      rawInputSummary: assembledContent.substring(0, 300) + '...',
    });
  } catch (error: unknown) {
    const latencyMs = Date.now() - startTime;
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error('Gemini Orchestration fatal route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: errMessage,
        status: 'failed',
        latencyMs,
      },
      { status: 500 }
    );
  }
}
