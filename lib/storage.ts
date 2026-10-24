import { WorkspaceState } from '@/types/domain';
import { INITIAL_WORKSPACE_STATE } from '@/lib/seedData';

const STORAGE_KEY = 'apocrypha_dxd_writer_workspace_v1';

let currentWorkspaceState: WorkspaceState = INITIAL_WORKSPACE_STATE;
let isInitialized = false;
const listeners = new Set<() => void>();

export function getWorkspaceSnapshot(): WorkspaceState {
  if (typeof window === 'undefined') {
    return INITIAL_WORKSPACE_STATE;
  }
  if (!isInitialized) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WorkspaceState;
        if (parsed.chapters && parsed.techniquePacks && parsed.schemesOfWork) {
          currentWorkspaceState = parsed;
        }
      } else {
        saveWorkspaceState(INITIAL_WORKSPACE_STATE);
      }
    } catch (err) {
      console.error('Failed to parse workspace state from localStorage:', err);
    }
    isInitialized = true;
  }
  return currentWorkspaceState;
}

export function getServerWorkspaceSnapshot(): WorkspaceState {
  return INITIAL_WORKSPACE_STATE;
}

export function subscribeWorkspace(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function updateWorkspaceState(updater: (prev: WorkspaceState) => WorkspaceState): void {
  const prev = getWorkspaceSnapshot();
  const next = updater(prev);
  currentWorkspaceState = next;
  saveWorkspaceState(next);
  listeners.forEach((l) => l());
}

export function setWorkspaceStateDirect(next: WorkspaceState): void {
  currentWorkspaceState = next;
  saveWorkspaceState(next);
  listeners.forEach((l) => l());
}

export function loadWorkspaceState(): WorkspaceState {
  return getWorkspaceSnapshot();
}

export function saveWorkspaceState(state: WorkspaceState): void {
  if (typeof window === 'undefined') return;
  try {
    const updated = {
      ...state,
      lastSavedAt: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save workspace state to localStorage:', err);
  }
}

export function exportWorkspaceToJson(state: WorkspaceState): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `apocrypha_writer_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportChapterToMarkdown(title: string, chapterNumber: string | number, content: string): void {
  const header = `# Chapter ${chapterNumber}: ${title}\n\n*Apocrypha DXD: ForeverWorlds — Draft Export*\n\n---\n\n`;
  const blob = new Blob([header + content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Chapter_${chapterNumber}_${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function resetWorkspaceToSeed(): WorkspaceState {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  currentWorkspaceState = INITIAL_WORKSPACE_STATE;
  saveWorkspaceState(INITIAL_WORKSPACE_STATE);
  listeners.forEach((l) => l());
  return INITIAL_WORKSPACE_STATE;
}
