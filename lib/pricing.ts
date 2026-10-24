import { DEFAULT_MODEL_ID } from './models';

// Pricing configuration per million tokens (USD)
// Distinguish reported metrics from estimated costs.

export interface ModelPricing {
  promptCostPerMillion: number;
  completionCostPerMillion: number;
  displayName: string;
}

export const MODEL_PRICING: Record<string, ModelPricing> = {
  'gemini-3.1-flash-lite': {
    promptCostPerMillion: 0.075,
    completionCostPerMillion: 0.30,
    displayName: 'Gemini 3.1 Flash Lite (High Throughput)',
  },
  'gemini-3.8-flash': {
    promptCostPerMillion: 0.10,
    completionCostPerMillion: 0.40,
    displayName: 'Gemini 3.8 Flash (General Tasks)',
  },
  'gemini-4-argon': {
    promptCostPerMillion: 1.25,
    completionCostPerMillion: 5.00,
    displayName: 'Gemini 4 Argon (Deep Reasoning)',
  },
  'custom_external': {
    promptCostPerMillion: 0.0,
    completionCostPerMillion: 0.0,
    displayName: 'External Custom Provider',
  },
};

export function estimateCost(modelId: string, promptTokens: number, completionTokens: number): number {
  const pricing = MODEL_PRICING[modelId] || MODEL_PRICING[DEFAULT_MODEL_ID] || MODEL_PRICING['gemini-3.1-flash-lite'];
  const promptCost = (promptTokens / 1_000_000) * pricing.promptCostPerMillion;
  const completionCost = (completionTokens / 1_000_000) * pricing.completionCostPerMillion;
  return Number((promptCost + completionCost).toFixed(6));
}

