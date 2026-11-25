import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  Flame,
  Lock,
  Play,
  Settings,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ALL_EXAM_QUESTIONS } from './data/allQuestions';
import { ACT_INTEL_BRIEFINGS } from './data/briefings';
import { CHEAT_SHEET_TABLES, ROSETTA_SERVICES } from './data/rosettaCodex';
import { ALL_RELICS, ARCHITECT_CLASSES, SLA_ASCENSIONS } from './data/gameContent';
import { ExamQuestion, ExamTrack } from './types/curriculum';
import {
  ActiveRun,
  ArchitectClassId,
  GameCard,
  IncidentChoice,
  MapNode,
  MetaUpgradeLevels,
  MockExamAttempt,
  PlayerSaveProfile
} from './types/game';
import {
  computeTrackReadiness,
  getWeakSpotQuestions,
  updateMasteryRecord
} from './engine/fsrs';
import {
  createNewRun,
  endPlayerTurn,
  generateActMap,
  generateMarketplaceShop,
  playCardFromHand,
  resolveTurnQuestion,
  startCombatOnRun,
  triggerCloudIncident
} from './engine/roguelike';
import { createDefaultProfile, loadProfile, saveProfile } from './utils/storage';
import { setAudioMuted, sfx } from './utils/audioHaptics';
import { CombatScreen } from './components/CombatScreen';
import { RunMapScreen } from './components/RunMapScreen';
import { BriefingsAndCodexModal } from './components/BriefingsAndCodexModal';
import { WeakSpotDrillScreen } from './components/WeakSpotDrillScreen';
import { MockExamScreen } from './components/MockExamScreen';
import { MetaProgressionModal } from './components/MetaProgressionModal';
import { SaveBackupModal } from './components/SaveBackupModal';

type ScreenView = 'hub' | 'run' | 'codex' | 'drill' | 'mock' | 'ccoe' | 'backup' | 'run-victory';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<PlayerSaveProfile>(() => createDefaultProfile());
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<ScreenView>('hub');
  const [runModeTrack, setRunModeTrack] = useState<ExamTrack | 'mixed'>('az-900');
  const [victoryCreditsEarned, setVictoryCreditsEarned] = useState(0);
  const recentQuestionsRef = useRef<string[]>([]);

  useEffect(() => {
    loadProfile().then((p) => {
      setProfile(p);
      setRunModeTrack(p.selectedTrack);
      setAudioMuted(p.soundMuted);
      setLoaded(true);
    });
  }, []);

  const persist = (next: PlayerSaveProfile) => {
    setAudioMuted(next.soundMuted);
    setProfile(next);
    saveProfile(next);
  };

  const pushRecentQ = (qid: string) => {
    recentQuestionsRef.current = [qid, ...recentQuestionsRef.current.filter((id) => id !== qid)].slice(
      0,
      25
    );
  };

  const activeExamTrackForHub: ExamTrack =
    runModeTrack === 'mixed' ? profile.selectedTrack : runModeTrack;

  const readiness = useMemo(
    () => computeTrackReadiness(ALL_EXAM_QUESTIONS, profile.mastery, activeExamTrackForHub),
    [profile.mastery, activeExamTrackForHub]
  );

  const weakSpotCount = useMemo(
    () => getWeakSpotQuestions(ALL_EXAM_QUESTIONS, profile.mastery).length,
    [profile.mastery]
  );

  // === RUN ACTIONS ===
  const handleStartNewRun = () => {
    sfx.tap();
    const maxUnlockedAsc =
      runModeTrack === 'mixed'
        ? Math.max(
            profile.highestAscensionUnlocked['az-900'],
            profile.highestAscensionUnlocked['az-104']
          )
        : profile.highestAscensionUnlocked[runModeTrack] || 0;
    const asc = Math.min(profile.selectedAscension, maxUnlockedAsc);
    const freshRun = createNewRun(profile, runModeTrack, profile.selectedClass, asc);
    persist({
      ...profile,
      selectedTrack: activeExamTrackForHub,
      activeRun: freshRun
    });
    setView('run');
  };

  const handleDismissActBriefing = () => {
    if (!profile.activeRun) return;
    const nextRun: ActiveRun = {
      ...profile.activeRun,
      briefingSeenForAct: Array.from(
        new Set([...profile.activeRun.briefingSeenForAct, profile.activeRun.act])
      )
    };
    persist({ ...profile, activeRun: nextRun });
  };

  const markNodeCompleted = (run: ActiveRun, nodeId: string): ActiveRun => ({
    ...run,
    currentNodeId: nodeId,
    map: run.map.map((n) => (n.id === nodeId ? { ...n, completed: true } : n))
  });

  const handleSelectMapNode = (node: MapNode) => {
    if (!profile.activeRun) return;
    let run = markNodeCompleted(profile.activeRun, node.id);

    if (node.type === 'combat' || node.type === 'elite' || node.type === 'boss') {
      const tier = node.type === 'combat' ? 'normal' : node.type;
      if (tier === 'boss') sfx.bossAlert();
      run = startCombatOnRun(
        run,
        tier,
        ALL_EXAM_QUESTIONS,
        profile.mastery,
        recentQuestionsRef.current
      );
      if (run.combat?.activeQuestion) pushRecentQ(run.combat.activeQuestion.id);
    } else if (node.type === 'shop') {
      run = generateMarketplaceShop(run);
    } else if (node.type === 'incident') {
      run = triggerCloudIncident(run);
    }

    persist({ ...profile, activeRun: run });
  };

  const handleCombatAnswer = (question: ExamQuestion, isCorrect: boolean, elapsedMs: number) => {
    if (!profile.activeRun) return;
    pushRecentQ(question.id);

    const updatedRecord = updateMasteryRecord(
      profile.mastery[question.id],
      question.id,
      isCorrect,
      elapsedMs
    );
    const nextMastery = {
      ...profile.mastery,
      [question.id]: updatedRecord
    };

    const nextStreak = isCorrect ? profile.activeRun.streak + 1 : 0;
    if (isCorrect) sfx.correct(nextStreak);
    else sfx.wrong();

    // Always show AWS Breakdown on wrong answers; on right answers respect user preference!
    const skipFeedback = isCorrect && !profile.autoShowExplanationOnCorrect;
    const nextRun = resolveTurnQuestion(profile.activeRun, isCorrect, elapsedMs, skipFeedback);

    persist({
      ...profile,
      mastery: nextMastery,
      activeRun: nextRun
    });
  };

  const handleUseHint = () => {
    if (!profile.activeRun || !profile.activeRun.combat) return;
    if (profile.activeRun.hintCharges <= 0 || profile.activeRun.combat.usedHintThisTurn) return;
    const nextRun: ActiveRun = {
      ...profile.activeRun,
      hintCharges: profile.activeRun.hintCharges - 1,
      combat: {
        ...profile.activeRun.combat,
        usedHintThisTurn: true
      }
    };
    persist({ ...profile, activeRun: nextRun });
  };

  const handleToggleFlagQuestion = (questionId: string) => {
    const existing = profile.mastery[questionId] || {
      questionId,
      seen: 0,
      correct: 0,
      wrong: 0,
      consecutiveCorrect: 0,
      stabilityDays: 0,
      nextDueAt: 0,
      lastSeenAt: Date.now(),
      flagged: false,
      avgResponseMs: 5000
    };
    persist({
      ...profile,
      mastery: {
        ...profile.mastery,
        [questionId]: {
          ...existing,
          flagged: !existing.flagged
        }
      }
    });
  };

  const handleDismissFeedback = () => {
    if (!profile.activeRun?.combat) return;
    persist({
      ...profile,
      activeRun: {
        ...profile.activeRun,
        combat: {
          ...profile.activeRun.combat,
          phase: 'action'
        }
      }
    });
  };

  const handlePlayCard = (cardUid: string) => {
    if (!profile.activeRun) return;
    const nextRun = playCardFromHand(
      profile.activeRun,
      cardUid,
      ALL_EXAM_QUESTIONS,
      profile.mastery,
      recentQuestionsRef.current
    );
    if (nextRun.combat?.phase === 'victory') {
      sfx.victory();
    }
    persist({ ...profile, activeRun: nextRun });
  };

  const handleEndTurn = () => {
    if (!profile.activeRun) return;
    const prevHp = profile.activeRun.hp;
    const nextRun = endPlayerTurn(
      profile.activeRun,
      ALL_EXAM_QUESTIONS,
      profile.mastery,
      recentQuestionsRef.current
    );
    if (nextRun.hp < prevHp) {
      sfx.enemyHit();
    }
    if (nextRun.combat?.activeQuestion) {
      pushRecentQ(nextRun.combat.activeQuestion.id);
    }
    persist({ ...profile, activeRun: nextRun });
  };

  const handlePickRewardCard = (pickedCard: GameCard | null) => {
    if (!profile.activeRun || !profile.activeRun.combat) return;
    let run = { ...profile.activeRun };
    const wasBoss = run.combat?.enemy.tier === 'boss';

    if (pickedCard) {
      run.deck = [...run.deck, pickedCard];
    }
    if (run.rewardRelicId && !run.relicIds.includes(run.rewardRelicId)) {
      run.relicIds = [...run.relicIds, run.rewardRelicId];
    }
    run.rewardCards = null;
    run.rewardRelicId = null;
    run.combat = null;

    // Check if Boss defeated -> Next Act OR Full Run Victory!
    if (wasBoss) {
      if (run.act >= run.totalActs) {
        // FULL SPIRE VICTORY!
        const credits =
          65 + run.totalActs * 18 + run.questionsCorrect * 2 + run.ascension * 25;
        const winTrack: ExamTrack = run.track === 'mixed' ? 'az-104' : run.track;
        const unlockedAsc = Math.min(
          5,
          Math.max(profile.highestAscensionUnlocked[winTrack] || 0, run.ascension + 1)
        );

        sfx.victory();
        setVictoryCreditsEarned(credits);
        persist({
          ...profile,
          migrationCredits: profile.migrationCredits + credits,
          runsCompleted: profile.runsCompleted + 1,
          runsWon: profile.runsWon + 1,
          highestAscensionUnlocked: {
            ...profile.highestAscensionUnlocked,
            [winTrack]: unlockedAsc
          },
          activeRun: null
        });
        setView('run-victory');
        return;
      } else {
        // Advance to Next Act!
        const nextAct = (run.act + 1) as 1 | 2 | 3 | 4 | 5;
        const postBossHeal =
          Math.round(run.maxHp * 0.35) + profile.metaUpgrades.slaBuffer * 6;
        const awsBadgeBonusHint = run.relicIds.includes('relic-aws-badge') ? 1 : 0;
        run = {
          ...run,
          act: nextAct,
          hp: Math.min(run.maxHp, run.hp + postBossHeal),
          hintCharges: run.hintCharges + awsBadgeBonusHint,
          map: generateActMap(nextAct),
          currentNodeId: null
        };
      }
    }

    persist({ ...profile, activeRun: run });
  };

  const handleFinishDefeatOrAbandon = () => {
    if (!profile.activeRun) {
      setView('hub');
      return;
    }
    const credits = Math.max(
      12,
      profile.activeRun.questionsCorrect * 2 + (profile.activeRun.act - 1) * 15
    );
    persist({
      ...profile,
      migrationCredits: profile.migrationCredits + credits,
      runsCompleted: profile.runsCompleted + 1,
      activeRun: null
    });
    setView('hub');
  };

  // === REST / SHOP / INCIDENT HANDLERS ===
  const handleRestHeal = () => {
    if (!profile.activeRun) return;
    const amt = Math.max(
      10,
      Math.round(profile.activeRun.maxHp * (profile.activeRun.ascension >= 3 ? 0.25 : 0.3))
    );
    persist({
      ...profile,
      activeRun: {
        ...profile.activeRun,
        hp: Math.min(profile.activeRun.maxHp, profile.activeRun.hp + amt)
      }
    });
  };

  const handleRestUpgradeCard = (cardUid: string) => {
    if (!profile.activeRun) return;
    persist({
      ...profile,
      activeRun: {
        ...profile.activeRun,
        deck: profile.activeRun.deck.map((c) =>
          c.uid === cardUid ? { ...c, upgraded: true } : c
        )
      }
    });
  };

  const handleBuyShopCard = (idx: number) => {
    if (!profile.activeRun?.shopCards) return;
    const item = profile.activeRun.shopCards[idx];
    if (!item || item.sold || profile.activeRun.gold < item.price) return;

    const updatedShop = profile.activeRun.shopCards.map((sc, i) =>
      i === idx ? { ...sc, sold: true } : sc
    );
    persist({
      ...profile,
      activeRun: {
        ...profile.activeRun,
        gold: profile.activeRun.gold - item.price,
        deck: [...profile.activeRun.deck, item.card],
        shopCards: updatedShop
      }
    });
  };

  const handleBuyShopRelic = (idx: number) => {
    if (!profile.activeRun?.shopRelics) return;
    const item = profile.activeRun.shopRelics[idx];
    if (!item || item.sold || profile.activeRun.gold < item.price) return;

    const updatedRelics = profile.activeRun.shopRelics.map((sr, i) =>
      i === idx ? { ...sr, sold: true } : sr
    );
    persist({
      ...profile,
      activeRun: {
        ...profile.activeRun,
        gold: profile.activeRun.gold - item.price,
        relicIds: [...profile.activeRun.relicIds, item.relicId],
        shopRelics: updatedRelics
      }
    });
  };

  const handleRemoveCardInShop = (cardUid: string) => {
    if (!profile.activeRun) return;
    const price = profile.activeRun.relicIds.includes('relic-reserved-3yr') ? 45 : 60;
    if (profile.activeRun.gold < price) return;
    persist({
      ...profile,
      activeRun: {
        ...profile.activeRun,
        gold: profile.activeRun.gold - price,
        deck: profile.activeRun.deck.filter((c) => c.uid !== cardUid),
        cardRemoveUsedInShop: true
      }
    });
  };

  const handleChooseIncidentOption = (choice: IncidentChoice) => {
    if (!profile.activeRun) return;
    let run = { ...profile.activeRun };
    if (choice.maxHpDelta) {
      run.maxHp += choice.maxHpDelta;
      run.hp += choice.maxHpDelta;
    }
    if (choice.hpDelta) {
      run.hp = Math.max(1, Math.min(run.maxHp, run.hp + choice.hpDelta));
    }
    if (choice.goldDelta) {
      run.gold = Math.max(0, run.gold + choice.goldDelta);
    }
    if (choice.hintDelta) {
      run.hintCharges += choice.hintDelta;
    }
    if (choice.upgradeRandomCard) {
      const candidates = run.deck.filter((c) => !c.upgraded);
      if (candidates.length > 0) {
        const picked = candidates[Math.floor(Math.random() * candidates.length)];
        run.deck = run.deck.map((c) => (c.uid === picked.uid ? { ...c, upgraded: true } : c));
      }
    }
    if (choice.gainRelic) {
      const pool = ALL_RELICS.filter(
        (r) => !run.relicIds.includes(r.id) && r.rarity !== 'starter' && r.rarity !== 'boss'
      );
      if (pool.length > 0) {
        const picked = pool[Math.floor(Math.random() * pool.length)];
        run.relicIds = [...run.relicIds, picked.id];
      }
    }
    persist({ ...profile, activeRun: run });
  };

  const handleLeaveNodeOverlay = () => {
    if (!profile.activeRun) return;
    persist({
      ...profile,
      activeRun: {
        ...profile.activeRun,
        activeIncident: null
      }
    });
  };

  if (!loaded) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-black text-sky-400">
        Loading Spire of Azure Offline Vault...
      </div>
    );
  }

  const currentActBriefing = profile.activeRun
    ? ACT_INTEL_BRIEFINGS.find(
        (b) =>
          b.track ===
            (profile.activeRun!.track === 'mixed' ? 'az-104' : profile.activeRun!.track) &&
          b.act === profile.activeRun!.act
      )
    : undefined;

  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-black text-slate-100">
      {/* PERSISTENT COMPACT TOP HUD */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-900 bg-black/95 px-3.5 backdrop-blur safe-top">
        <button
          type="button"
          onClick={() => {
            sfx.tap();
            setView('hub');
          }}
          className="flex items-center gap-2 text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 font-black text-slate-950 shadow">
            A
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-white leading-none">
              Spire of Azure
            </div>
            <div className="text-[10px] font-semibold text-sky-400">
              {ALL_EXAM_QUESTIONS.length} Offline Exam Cards
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              sfx.tap();
              setView('ccoe');
            }}
            className="flex items-center gap-1 rounded-xl border border-purple-500/35 bg-purple-500/10 px-2.5 py-1.5 text-xs font-extrabold text-purple-200"
          >
            <Award className="h-3.5 w-3.5 text-purple-400" />
            <span>{profile.migrationCredits}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              persist({ ...profile, soundMuted: !profile.soundMuted })
            }
            className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-300"
            title="Toggle Cabin Mute"
          >
            {profile.soundMuted ? (
              <VolumeX className="h-4 w-4 text-rose-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-sky-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              sfx.tap();
              setView('backup');
            }}
            className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-300"
            title="Settings & Save Backup"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ACTIVE VIEW ROUTER */}
      {view === 'run' && profile.activeRun ? (
        profile.activeRun.combat ? (
          <CombatScreen
            run={profile.activeRun}
            questionPool={ALL_EXAM_QUESTIONS}
            mastery={profile.mastery}
            autoSkipExplanationOnCorrect={!profile.autoShowExplanationOnCorrect}
            onAnswerQuestion={handleCombatAnswer}
            onUseHint={handleUseHint}
            onToggleFlagQuestion={handleToggleFlagQuestion}
            onDismissFeedback={handleDismissFeedback}
            onPlayCard={handlePlayCard}
            onEndTurn={handleEndTurn}
            onPickRewardCard={handlePickRewardCard}
            onAbandonOrFinishDefeat={handleFinishDefeatOrAbandon}
          />
        ) : (
          <RunMapScreen
            run={profile.activeRun}
            briefing={currentActBriefing}
            onDismissBriefing={handleDismissActBriefing}
            onSelectMapNode={handleSelectMapNode}
            onRestHeal={handleRestHeal}
            onRestUpgradeCard={handleRestUpgradeCard}
            onBuyShopCard={handleBuyShopCard}
            onBuyShopRelic={handleBuyShopRelic}
            onRemoveCardInShop={handleRemoveCardInShop}
            onLeaveNodeOverlay={handleLeaveNodeOverlay}
            onChooseIncidentOption={handleChooseIncidentOption}
            onAbandonRun={handleFinishDefeatOrAbandon}
          />
        )
      ) : view === 'codex' ? (
        <BriefingsAndCodexModal
          rosettaRows={ROSETTA_SERVICES}
          cheatSheets={CHEAT_SHEET_TABLES}
          briefings={ACT_INTEL_BRIEFINGS}
          onClose={() => setView('hub')}
        />
      ) : view === 'drill' ? (
        <WeakSpotDrillScreen
          questionPool={ALL_EXAM_QUESTIONS}
          mastery={profile.mastery}
          initialTrack={activeExamTrackForHub}
          onRecordAnswer={(qid, ok, ms) => {
            const rec = updateMasteryRecord(profile.mastery[qid], qid, ok, ms);
            persist({
              ...profile,
              mastery: { ...profile.mastery, [qid]: rec }
            });
          }}
          onToggleFlag={handleToggleFlagQuestion}
          onClose={() => setView('hub')}
        />
      ) : view === 'mock' ? (
        <MockExamScreen
          questionPool={ALL_EXAM_QUESTIONS}
          track={activeExamTrackForHub}
          pastAttempts={profile.mockExams}
          onCompleteAttempt={(attempt: MockExamAttempt, qResults) => {
            const nextMastery = { ...profile.mastery };
            for (const qr of qResults) {
              nextMastery[qr.questionId] = updateMasteryRecord(
                nextMastery[qr.questionId],
                qr.questionId,
                qr.isCorrect,
                8000
              );
            }
            const bonusCredits = attempt.passed ? 50 : 20;
            persist({
              ...profile,
              mastery: nextMastery,
              migrationCredits: profile.migrationCredits + bonusCredits,
              mockExams: [...profile.mockExams, attempt]
            });
          }}
          onClose={() => setView('hub')}
        />
      ) : view === 'ccoe' ? (
        <MetaProgressionModal
          profile={profile}
          onUnlockClass={(cid: ArchitectClassId, cost: number) => {
            if (profile.migrationCredits < cost) return;
            persist({
              ...profile,
              migrationCredits: profile.migrationCredits - cost,
              unlockedClasses: Array.from(new Set([...profile.unlockedClasses, cid])),
              selectedClass: cid
            });
          }}
          onBuyUpgrade={(key: keyof MetaUpgradeLevels, cost: number) => {
            if (profile.migrationCredits < cost) return;
            persist({
              ...profile,
              migrationCredits: profile.migrationCredits - cost,
              metaUpgrades: {
                ...profile.metaUpgrades,
                [key]: (profile.metaUpgrades[key] || 0) + 1
              }
            });
          }}
          onClose={() => setView('hub')}
        />
      ) : view === 'backup' ? (
        <SaveBackupModal
          profile={profile}
          onUpdateProfile={persist}
          onClose={() => setView('hub')}
        />
      ) : view === 'run-victory' ? (
        <div className="px-4 py-8 text-center">
          <Trophy className="mx-auto mb-3 h-14 w-14 text-amber-400 animate-float" />
          <h1 className="text-2xl font-black text-white">SPIRE CONQUERED!</h1>
          <p className="mt-1 text-sm text-emerald-300">
            All Case Study Bosses defeated • Next SLA Ascension Tier Unlocked!
          </p>
          <div className="my-5 rounded-2xl border border-purple-500/40 bg-purple-950/25 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Migration Credits Awarded
            </div>
            <div className="mt-1 text-3xl font-black text-white">+{victoryCreditsEarned} Cr</div>
          </div>
          <button
            type="button"
            onClick={() => setView('hub')}
            className="w-full rounded-2xl bg-sky-500 py-3.5 text-sm font-black text-slate-950"
          >
            Return to Command Hub →
          </button>
        </div>
      ) : (
        /* === MAIN OFFLINE COMMAND HUB === */
        <main className="space-y-3.5 px-3.5 py-3 safe-bottom">
          {/* RESUME ACTIVE RUN BANNER IF PRESENT */}
          {profile.activeRun && (
            <button
              type="button"
              onClick={() => {
                sfx.tap();
                setView('run');
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-emerald-400/60 bg-gradient-to-r from-emerald-950/60 via-slate-950 to-sky-950/50 p-4 text-left shadow-lg animate-glow"
            >
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                  ● Climb In Progress
                </div>
                <div className="text-base font-black text-white">
                  Resume {profile.activeRun.track.toUpperCase()} • Act {profile.activeRun.act}/
                  {profile.activeRun.totalActs}
                </div>
                <div className="text-xs text-slate-300">
                  HP {profile.activeRun.hp}/{profile.activeRun.maxHp} • Streak x
                  {profile.activeRun.streak} • {profile.activeRun.deck.length} Cards
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-emerald-400" />
            </button>
          )}

          {/* TWO-TRACK ASCENSION SWITCHER */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Certification Track
              </span>
              <span className="text-[11px] font-bold text-sky-400">
                Est. Score: {readiness.estimatedScaledScore}/1000
              </span>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-1.5 rounded-xl bg-slate-900 p-1">
              {(
                [
                  { id: 'az-900', label: 'AZ-900', sub: '3 Acts • Xmas' },
                  { id: 'az-104', label: 'AZ-104', sub: '5 Acts • Admin' },
                  { id: 'mixed', label: 'Mixed', sub: 'Adaptive All' }
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    sfx.tap();
                    setRunModeTrack(t.id);
                    if (t.id !== 'mixed') {
                      persist({ ...profile, selectedTrack: t.id });
                    }
                  }}
                  className={`rounded-lg py-2 text-center transition ${
                    runModeTrack === t.id
                      ? 'bg-sky-500 text-slate-950 shadow'
                      : 'text-slate-300'
                  }`}
                >
                  <div className="text-xs font-black">{t.label}</div>
                  <div
                    className={`text-[10px] ${
                      runModeTrack === t.id ? 'font-semibold text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    {t.sub}
                  </div>
                </button>
              ))}
            </div>

            {/* Domain Mastery Bars */}
            <div className="space-y-2">
              {readiness.domains.map((d) => (
                <div key={d.meta.id}>
                  <div className="mb-0.5 flex justify-between text-[11px]">
                    <span className="font-semibold text-slate-300">{d.meta.shortName}</span>
                    <span className="text-slate-400">
                      {d.mastered}/{d.total} mastered ({d.coveragePct}%)
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
                    <div
                      className={`h-full transition-all ${
                        d.coveragePct >= 75 ? 'bg-emerald-400' : 'bg-sky-500'
                      }`}
                      style={{ width: `${Math.max(2, d.coveragePct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ARCHITECT CLASS & SLA ASCENSION LAUNCHER */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Architect Loadout
              </span>
              <button
                type="button"
                onClick={() => setView('ccoe')}
                className="text-xs font-bold text-purple-400 underline"
              >
                Upgrades & Classes →
              </button>
            </div>

            {/* Class Pills */}
            <div className="mb-3 grid grid-cols-3 gap-1.5">
              {ARCHITECT_CLASSES.map((cls) => {
                const unlocked = profile.unlockedClasses.includes(cls.id);
                const selected = profile.selectedClass === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => {
                      if (!unlocked) {
                        setView('ccoe');
                        return;
                      }
                      sfx.tap();
                      persist({ ...profile, selectedClass: cls.id });
                    }}
                    className={`rounded-xl border p-2 text-left transition ${
                      selected
                        ? 'border-sky-400 bg-sky-500/15'
                        : unlocked
                          ? 'border-slate-800 bg-slate-900/80'
                          : 'border-slate-900 bg-slate-950 opacity-55'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-black ${cls.accentColor}`}>
                        {cls.name.split(' ')[1]}
                      </span>
                      {!unlocked && <Lock className="h-3 w-3 text-slate-500" />}
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400">{cls.maxHp} HP</div>
                  </button>
                );
              })}
            </div>

            {/* SLA Ascension Selector */}
            <div className="mb-3 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs">
              <div>
                <span className="font-bold text-amber-300">
                  {SLA_ASCENSIONS[profile.selectedAscension]?.sla}
                </span>
                <span className="ml-1.5 text-[11px] text-slate-400">
                  • {SLA_ASCENSIONS[profile.selectedAscension]?.subtitle}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {SLA_ASCENSIONS.map((asc) => {
                  const maxUnl =
                    profile.highestAscensionUnlocked[activeExamTrackForHub] || 0;
                  const unl = asc.level <= maxUnl;
                  return (
                    <button
                      key={asc.level}
                      type="button"
                      disabled={!unl}
                      onClick={() => persist({ ...profile, selectedAscension: asc.level })}
                      className={`h-6 w-6 rounded-md text-[11px] font-black ${
                        profile.selectedAscension === asc.level
                          ? 'bg-amber-400 text-slate-950'
                          : unl
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-slate-950 text-slate-700'
                      }`}
                    >
                      {asc.level}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartNewRun}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-sky-500/25 transition active:scale-98"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>
                {profile.activeRun
                  ? `Start Fresh ${runModeTrack.toUpperCase()} Climb`
                  : `Launch ${runModeTrack.toUpperCase()} Spire Climb`}
              </span>
            </button>
          </div>

          {/* 4 COMPANION STUDY & EXAM MODES */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                sfx.tap();
                setView('codex');
              }}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-left transition hover:border-sky-500/50 active:scale-98"
            >
              <BookOpen className="mb-1.5 h-5 w-5 text-sky-400" />
              <div className="text-xs font-extrabold text-white">AWS ↔ Azure Codex</div>
              <div className="text-[11px] text-slate-400">
                Rosetta Stone, SKU Tables & Act Guides
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                sfx.tap();
                setView('drill');
              }}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-left transition hover:border-amber-500/50 active:scale-98"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <Target className="h-5 w-5 text-amber-400" />
                {weakSpotCount > 0 && (
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-black text-amber-300">
                    {weakSpotCount} Due
                  </span>
                )}
              </div>
              <div className="text-xs font-extrabold text-white">Weak-Spot Drill</div>
              <div className="text-[11px] text-slate-400">
                Rapid FSRS cram on missed cards
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                sfx.tap();
                setView('mock');
              }}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-left transition hover:border-emerald-500/50 active:scale-98"
            >
              <ClipboardCheck className="mb-1.5 h-5 w-5 text-emerald-400" />
              <div className="text-xs font-extrabold text-white">700/1000 Mock Exam</div>
              <div className="text-[11px] text-slate-400">
                Timed AZ-900 (40q) & AZ-104 (50q)
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                sfx.tap();
                setView('ccoe');
              }}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-left transition hover:border-purple-500/50 active:scale-98"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="text-[10px] font-bold text-purple-300">
                  {profile.migrationCredits} Cr
                </span>
              </div>
              <div className="text-xs font-extrabold text-white">Architect Perks</div>
              <div className="text-[11px] text-slate-400">
                Unlock Sentinel, Striker & SLA buffs
              </div>
            </button>
          </div>

          {/* COMPACT STATS FOOTER */}
          <div className="flex items-center justify-around rounded-2xl border border-slate-900 bg-slate-950/60 py-2.5 text-center text-[11px]">
            <div>
              <div className="font-black text-white">
                {Object.values(profile.mastery).filter((m) => m.seen > 0).length} /{' '}
                {ALL_EXAM_QUESTIONS.length}
              </div>
              <div className="text-slate-500">Cards Seen</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 font-black text-emerald-400">
                <Shield className="h-3 w-3" /> {profile.runsWon} / {profile.runsCompleted}
              </div>
              <div className="text-slate-500">Runs Won</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 font-black text-amber-400">
                <Flame className="h-3 w-3" />{' '}
                {profile.mockExams.filter((m) => m.passed).length}
              </div>
              <div className="text-slate-500">Mocks Passed</div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
