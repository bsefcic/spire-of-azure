import { DomainId, ExamQuestion, ExamTrack } from '../types/curriculum';
import { QuestionMasteryRecord } from '../types/game';

export interface DomainMeta {
  id: DomainId;
  track: ExamTrack;
  act: 1 | 2 | 3 | 4 | 5;
  shortName: string;
  fullName: string;
  weightPct: number;
}

export const DOMAIN_META: DomainMeta[] = [
  { id: 'az900-concepts', track: 'az-900', act: 1, shortName: 'Cloud Concepts', fullName: 'Act 1: Cloud Concepts & Shared Responsibility', weightPct: 28 },
  { id: 'az900-architecture', track: 'az-900', act: 2, shortName: 'Architecture & Services', fullName: 'Act 2: Azure Architecture & Core Services', weightPct: 38 },
  { id: 'az900-governance', track: 'az-900', act: 3, shortName: 'Mgmt & Governance', fullName: 'Act 3: Management, Cost & Governance', weightPct: 34 },
  { id: 'az104-identity', track: 'az-104', act: 1, shortName: 'Entra & Governance', fullName: 'Act 1: Manage Entra Identities & Governance', weightPct: 22 },
  { id: 'az104-storage', track: 'az-104', act: 2, shortName: 'Storage Accounts', fullName: 'Act 2: Implement & Manage Storage', weightPct: 18 },
  { id: 'az104-compute', track: 'az-104', act: 3, shortName: 'Compute & Containers', fullName: 'Act 3: Deploy & Manage Compute Resources', weightPct: 23 },
  { id: 'az104-networking', track: 'az-104', act: 4, shortName: 'Virtual Networking', fullName: 'Act 4: Implement & Manage Virtual Networking', weightPct: 22 },
  { id: 'az104-monitoring', track: 'az-104', act: 5, shortName: 'Monitor & Backup', fullName: 'Act 5: Monitor & Maintain Azure Resources', weightPct: 15 }
];

export function updateMasteryRecord(
  existing: QuestionMasteryRecord | undefined,
  questionId: string,
  isCorrect: boolean,
  responseMs: number
): QuestionMasteryRecord {
  const now = Date.now();
  const prev: QuestionMasteryRecord = existing || {
    questionId,
    seen: 0,
    correct: 0,
    wrong: 0,
    consecutiveCorrect: 0,
    stabilityDays: 0,
    nextDueAt: 0,
    lastSeenAt: 0,
    flagged: false,
    avgResponseMs: responseMs
  };

  const seen = prev.seen + 1;
  const avgResponseMs = Math.round((prev.avgResponseMs * prev.seen + responseMs) / seen);

  if (isCorrect) {
    const consecutiveCorrect = prev.consecutiveCorrect + 1;
    const fastBonus = responseMs < 11000 ? 1.35 : 1.0;
    const baseStability = prev.stabilityDays <= 0
      ? 0.25 * fastBonus // ~6 hours on first right answer so long flights review only if needed
      : prev.stabilityDays * (2.1 * fastBonus);
    const stabilityDays = Math.min(30, Number(baseStability.toFixed(2)));
    const nextDueAt = now + stabilityDays * 24 * 60 * 60 * 1000;

    return {
      ...prev,
      seen,
      correct: prev.correct + 1,
      consecutiveCorrect,
      stabilityDays,
      nextDueAt,
      lastSeenAt: now,
      avgResponseMs,
      // Auto-clear flag only if user nails it 3 times in a row unless manually re-flagged
      flagged: consecutiveCorrect >= 3 ? false : prev.flagged
    };
  } else {
    // Wrong answer: schedule back into active queue within ~4 minutes!
    const nextDueAt = now + 4 * 60 * 1000;
    return {
      ...prev,
      seen,
      wrong: prev.wrong + 1,
      consecutiveCorrect: 0,
      stabilityDays: 0.01,
      nextDueAt,
      lastSeenAt: now,
      avgResponseMs
    };
  }
}

export interface QuestionPickOptions {
  pool: ExamQuestion[];
  mastery: Record<string, QuestionMasteryRecord>;
  track: ExamTrack | 'mixed';
  act?: number;
  minDifficulty?: 1 | 2 | 3;
  preferMultiFormat?: boolean; // For Elites/Bosses/High Ascension
  recentIds?: string[];
}

export function pickNextQuestion({
  pool,
  mastery,
  track,
  act,
  minDifficulty = 1,
  preferMultiFormat = false,
  recentIds = []
}: QuestionPickOptions): ExamQuestion {
  const now = Date.now();
  const recentSet = new Set(recentIds);

  let candidates = pool.filter((q) => {
    if (track !== 'mixed' && q.track !== track) return false;
    if (act !== undefined && track !== 'mixed' && q.act !== act) return false;
    return true;
  });

  if (candidates.length === 0) {
    candidates = pool.filter((q) => track === 'mixed' || q.track === track);
  }
  if (candidates.length === 0) {
    candidates = pool;
  }

  // Filter out very recent questions if possible
  const nonRecent = candidates.filter((q) => !recentSet.has(q.id));
  if (nonRecent.length >= 3) {
    candidates = nonRecent;
  }

  if (minDifficulty > 1) {
    const harder = candidates.filter((q) => q.difficulty >= minDifficulty);
    if (harder.length >= 3) candidates = harder;
  }

  if (preferMultiFormat) {
    const richFormat = candidates.filter((q) => q.format !== 'single' || q.difficulty === 3);
    if (richFormat.length >= 2) candidates = richFormat;
  }

  // Score each candidate with FSRS priority + slight jitter for variety
  let bestScore = -Infinity;
  let chosen = candidates[0];

  for (const q of candidates) {
    const rec = mastery[q.id];
    let score = Math.random() * 14; // Controlled randomness

    if (!rec || rec.seen === 0) {
      // Unseen questions get high priority so user explores the full 500+ bank!
      score += 78;
    } else {
      const isDue = rec.nextDueAt <= now;
      if (rec.consecutiveCorrect === 0 && isDue) {
        // Missed recently and due now -> top learning priority
        score += 110;
      } else if (rec.flagged && isDue) {
        score += 95;
      } else if (isDue) {
        score += 65;
      } else {
        // Already mastered and not yet due: push to back of line based on how recently seen
        const minutesAgo = (now - rec.lastSeenAt) / 60000;
        score += Math.min(25, minutesAgo * 0.15) - rec.consecutiveCorrect * 18;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      chosen = q;
    }
  }

  return chosen;
}

export function getWeakSpotQuestions(
  pool: ExamQuestion[],
  mastery: Record<string, QuestionMasteryRecord>,
  track?: ExamTrack
): ExamQuestion[] {
  return pool
    .filter((q) => {
      if (track && q.track !== track) return false;
      const rec = mastery[q.id];
      if (!rec) return false;
      return rec.flagged || rec.consecutiveCorrect === 0 || rec.wrong > rec.correct;
    })
    .sort((a, b) => {
      const ra = mastery[a.id];
      const rb = mastery[b.id];
      const scoreA = (ra.flagged ? 100 : 0) + ra.wrong * 15 - ra.consecutiveCorrect * 20;
      const scoreB = (rb.flagged ? 100 : 0) + rb.wrong * 15 - rb.consecutiveCorrect * 20;
      return scoreB - scoreA;
    });
}

export interface ReadinessSummary {
  track: ExamTrack;
  totalQuestions: number;
  seenQuestions: number;
  masteredQuestions: number; // consecutiveCorrect >= 1
  solidQuestions: number;    // consecutiveCorrect >= 2
  estimatedScaledScore: number; // 0..1000
  readinessPct: number;
  domains: {
    meta: DomainMeta;
    total: number;
    seen: number;
    mastered: number;
    accuracyPct: number;
    coveragePct: number;
  }[];
}

export function computeTrackReadiness(
  pool: ExamQuestion[],
  mastery: Record<string, QuestionMasteryRecord>,
  track: ExamTrack
): ReadinessSummary {
  const trackDomains = DOMAIN_META.filter((d) => d.track === track);
  const trackQuestions = pool.filter((q) => q.track === track);

  let weightedScoreSum = 0;
  let totalWeight = 0;

  const domains = trackDomains.map((meta) => {
    const qs = trackQuestions.filter((q) => q.domain === meta.id);
    const total = qs.length;
    let seen = 0;
    let mastered = 0;
    let totalCorrect = 0;
    let totalAttempts = 0;

    for (const q of qs) {
      const r = mastery[q.id];
      if (r && r.seen > 0) {
        seen++;
        totalCorrect += r.correct;
        totalAttempts += r.seen;
        if (r.consecutiveCorrect >= 1) mastered++;
      }
    }

    const accuracyPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const coveragePct = total > 0 ? Math.round((mastered / total) * 100) : 0;
    // Blend accuracy and syllabus coverage for realistic exam readiness
    const domainStrength = total > 0
      ? (coveragePct * 0.62 + accuracyPct * 0.38) / 100
      : 0;

    weightedScoreSum += domainStrength * meta.weightPct;
    totalWeight += meta.weightPct;

    return {
      meta,
      total,
      seen,
      mastered,
      accuracyPct,
      coveragePct
    };
  });

  const normalizedStrength = totalWeight > 0 ? weightedScoreSum / totalWeight : 0;
  const readinessPct = Math.min(100, Math.round(normalizedStrength * 100));
  const estimatedScaledScore = Math.min(1000, Math.round(normalizedStrength * 1000));

  let seenQuestions = 0;
  let masteredQuestions = 0;
  let solidQuestions = 0;
  for (const q of trackQuestions) {
    const r = mastery[q.id];
    if (r && r.seen > 0) {
      seenQuestions++;
      if (r.consecutiveCorrect >= 1) masteredQuestions++;
      if (r.consecutiveCorrect >= 2) solidQuestions++;
    }
  }

  return {
    track,
    totalQuestions: trackQuestions.length,
    seenQuestions,
    masteredQuestions,
    solidQuestions,
    estimatedScaledScore,
    readinessPct,
    domains
  };
}

export function buildMockExamQuestions(pool: ExamQuestion[], track: ExamTrack): ExamQuestion[] {
  const targetCount = track === 'az-900' ? 40 : 50;
  const domains = DOMAIN_META.filter((d) => d.track === track);
  const selected: ExamQuestion[] = [];
  const usedIds = new Set<string>();

  for (const d of domains) {
    const countForDomain = Math.max(4, Math.round((d.weightPct / 100) * targetCount));
    const domainPool = [...pool.filter((q) => q.domain === d.id)].sort(() => Math.random() - 0.5);
    for (const q of domainPool.slice(0, countForDomain)) {
      if (!usedIds.has(q.id)) {
        usedIds.add(q.id);
        selected.push(q);
      }
    }
  }

  // Top up or trim to exact targetCount
  if (selected.length < targetCount) {
    const leftovers = pool
      .filter((q) => q.track === track && !usedIds.has(q.id))
      .sort(() => Math.random() - 0.5);
    for (const q of leftovers) {
      if (selected.length >= targetCount) break;
      selected.push(q);
    }
  }

  return selected.slice(0, targetCount).sort(() => Math.random() - 0.5);
}
