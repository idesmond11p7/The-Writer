# Writer App: Model Execution Reliability Fix

Implement robust model selection consistency, controlled transient error retries (up to 2 attempts with exponential backoff), and safe fallback to `gemini-3.1-flash-lite` when `gemini-3.8-flash` encounters capacity spikes or HTTP 503 errors.

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Default Model**: `gemini-3.8-flash` across all text tasks (drafting, revision, analysis, evaluation).
> - **Transient Error Retry**: Retry primary model up to 2 times with backoff on 503 / UNAVAILABLE / capacity errors.
> - **Fallback Model**: Fall back to `gemini-3.1-flash-lite` if primary model exhausts retries.

## 1. Overview & Core Concept
- Establish `gemini-3.8-flash` as the authoritative default model across `/lib/models.ts`, `/app/api/orchestrate/route.ts`, and UI components.
- Implement robust retry-with-backoff and controlled fallback logic in `/app/api/orchestrate/route.ts`.
- Ensure accurate attribution (`requestedModelId`, `actualModelUsed`, `fallbackTriggered`) in AI execution logs and cost calculations.

## 2. Technical Architecture & Data Strategy

```
┌─────────────────────────┐          ┌──────────────────────────┐          ┌─────────────────────────┐
│   WritingWorkspace /    │  POST    │   /api/orchestrate       │  Call    │     GoogleGenAI SDK     │
│   ChapterIntelligence / │ ───────> │   (Retry + Backoff &     │ ───────> │    (gemini-3.8-flash /  │
│   EvaluationStudio      │          │    Fallback Handler)     │          │    gemini-3.1-flash-lite)│
└─────────────────────────┘          └──────────────────────────┘          └─────────────────────────┘
```

- **Retry Policy**: 2 retries with exponential backoff (1s, 2s) on 503 / UNAVAILABLE / capacity errors.
- **Model Fallback**: If primary model (`gemini-3.8-flash`) fails after retries, switch to fallback model (`gemini-3.1-flash-lite`) and record fallback reason.
- **Cost & Token Tracking**: Uses `estimateCost` with the actual model used.
