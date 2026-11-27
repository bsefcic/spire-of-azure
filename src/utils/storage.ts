import { get, set } from 'idb-keyval';
import { PlayerSaveProfile } from '../types/game';

export const CURRENT_SCHEMA_VERSION = 1;

function getDefaultTrackForHost(): 'az-900' | 'aipc' {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('ai-product') || path.includes('ai-pm') || search.includes('track=aipc')) {
      return 'aipc';
    }
  }
  return 'az-900';
}

function getStorageKeys() {
  if (getDefaultTrackForHost() === 'aipc') {
    return {
      idbKey: 'spire_of_ai_product_save_v1',
      mirrorKey: 'spire_of_ai_product_save_mirror_v1'
    };
  }
  return {
    idbKey: 'spire_of_azure_save_v1',
    mirrorKey: 'spire_of_azure_save_mirror_v1'
  };
}

export function createDefaultProfile(): PlayerSaveProfile {
  const now = Date.now();
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    selectedTrack: getDefaultTrackForHost(),
    selectedClass: 'vanguard',
    selectedAscension: 0,
    unlockedClasses: ['vanguard'],
    highestAscensionUnlocked: {
      'az-900': 0,
      'az-104': 0,
      'aipc': 0
    },
    migrationCredits: 0,
    totalPlayTimeSec: 0,
    runsCompleted: 0,
    runsWon: 0,
    soundMuted: false,
    autoShowExplanationOnCorrect: false,
    metaUpgrades: {
      hullPlating: 0,
      startingCache: 0,
      awsTranslator: 1, // Start with +1 AWS Hint Charge unlocked out of the box!
      slaBuffer: 0,
      cardRarityBoost: 0
    },
    mastery: {},
    mockExams: [],
    activeRun: null
  };
}

export function normalizeProfile(raw: Partial<PlayerSaveProfile> | null | undefined): PlayerSaveProfile {
  const base = createDefaultProfile();
  if (!raw || typeof raw !== 'object') return base;

  return {
    ...base,
    ...raw,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    highestAscensionUnlocked: {
      ...base.highestAscensionUnlocked,
      ...(raw.highestAscensionUnlocked || {})
    },
    metaUpgrades: {
      ...base.metaUpgrades,
      ...(raw.metaUpgrades || {})
    },
    unlockedClasses: Array.isArray(raw.unlockedClasses) && raw.unlockedClasses.length > 0
      ? raw.unlockedClasses
      : base.unlockedClasses,
    mastery: raw.mastery && typeof raw.mastery === 'object' ? raw.mastery : {},
    mockExams: Array.isArray(raw.mockExams) ? raw.mockExams : []
  };
}

export async function loadProfile(): Promise<PlayerSaveProfile> {
  const { idbKey, mirrorKey } = getStorageKeys();
  try {
    const idbData = await get<PlayerSaveProfile>(idbKey);
    if (idbData) {
      return normalizeProfile(idbData);
    }
  } catch {
    // Fallback to localStorage if IndexedDB is unavailable in private webview
  }

  try {
    const rawStr = localStorage.getItem(mirrorKey);
    if (rawStr) {
      return normalizeProfile(JSON.parse(rawStr));
    }
  } catch {
    // Ignore parse error
  }

  const fresh = createDefaultProfile();
  await saveProfile(fresh);
  return fresh;
}

export async function saveProfile(profile: PlayerSaveProfile): Promise<void> {
  const { idbKey, mirrorKey } = getStorageKeys();
  const updated: PlayerSaveProfile = {
    ...profile,
    updatedAt: Date.now()
  };

  try {
    localStorage.setItem(mirrorKey, JSON.stringify(updated));
  } catch {
    // Ignore storage quota warning on mirror
  }

  try {
    await set(idbKey, updated);
  } catch {
    // Mirror already persisted in localStorage
  }
}

export function exportProfileToJson(profile: PlayerSaveProfile): string {
  return JSON.stringify(profile, null, 2);
}

export function importProfileFromJson(jsonText: string): PlayerSaveProfile {
  const parsed = JSON.parse(jsonText);
  if (!parsed || typeof parsed !== 'object' || (!('mastery' in parsed) && !('schemaVersion' in parsed))) {
    throw new Error('Invalid Spire of Azure save file.');
  }
  return normalizeProfile(parsed);
}
