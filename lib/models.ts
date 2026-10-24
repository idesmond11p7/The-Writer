// Authoritative Model Configuration for Apocrypha DXD: ForeverWorlds Writer App

export interface ModelOption {
  id: string;
  displayName: string;
  description: string;
  tier: 'fast' | 'standard' | 'reasoning';
  isDefault?: boolean;
}

export const DEFAULT_MODEL_ID = 'gemini-3.8-flash';
export const FALLBACK_MODEL_ID = 'gemini-3.1-flash-lite';

export const SUPPORTED_MODELS: ModelOption[] = [
  {
    id: 'gemini-3.8-flash',
    displayName: 'Gemini 3.8 Flash',
    description: 'Standard multi-task model (default for text generation, revision, and analysis).',
    tier: 'standard',
    isDefault: true,
  },
  {
    id: 'gemini-3.1-flash-lite',
    displayName: 'Gemini 3.1 Flash Lite',
    description: 'High-throughput operational tier (reliable fallback and high speed).',
    tier: 'fast',
  },
  {
    id: 'gemini-4-argon',
    displayName: 'Gemini 4 Argon',
    description: 'Deep reasoning architecture for intricate literary causality.',
    tier: 'reasoning',
  },
];

export function isSupportedModel(modelId: string): boolean {
  return SUPPORTED_MODELS.some((m) => m.id === modelId);
}

export function getModelDisplayName(modelId: string): string {
  const found = SUPPORTED_MODELS.find((m) => m.id === modelId);
  return found ? found.displayName : modelId;
}
