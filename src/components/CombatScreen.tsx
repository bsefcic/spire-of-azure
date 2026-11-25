import React, { useState } from 'react';
import {
  Activity,
  Award,
  Coins,
  Flame,
  Heart,
  Layers,
  Shield,
  Skull,
  Sparkles,
  Swords,
  Trophy,
  Zap
} from 'lucide-react';
import { ExamQuestion } from '../types/curriculum';
import { ActiveRun, GameCard, QuestionMasteryRecord } from '../types/game';
import { ALL_RELICS, ENEMY_TEMPLATES } from '../data/gameContent';
import { getEffectiveCardStats } from '../engine/roguelike';
import { QuestionCardView } from './QuestionCardView';
import { FeedbackDrawer } from './FeedbackDrawer';
import { sfx } from '../utils/audioHaptics';

interface CombatScreenProps {
  run: ActiveRun;
  questionPool: ExamQuestion[];
  mastery: Record<string, QuestionMasteryRecord>;
  autoSkipExplanationOnCorrect: boolean;
  onAnswerQuestion: (question: ExamQuestion, isCorrect: boolean, elapsedMs: number) => void;
  onUseHint: () => void;
  onToggleFlagQuestion: (questionId: string) => void;
  onDismissFeedback: () => void;
  onPlayCard: (cardUid: string) => void;
  onEndTurn: () => void;
  onPickRewardCard: (card: GameCard | null) => void;
  onAbandonOrFinishDefeat: () => void;
}

export const CombatScreen: React.FC<CombatScreenProps> = ({
  run,
  mastery,
  onAnswerQuestion,
  onUseHint,
  onToggleFlagQuestion,
  onDismissFeedback,
  onPlayCard,
  onEndTurn,
  onPickRewardCard,
  onAbandonOrFinishDefeat
}) => {
  const [hitShake, setHitShake] = useState(false);
  const [selectedRelicTip, setSelectedRelicTip] = useState<string | null>(null);

  const combat = run.combat;
  if (!combat) return null;

  const { enemy } = combat;
  const enemyTemplate = ENEMY_TEMPLATES.find((t) => t.id === enemy.templateId);
  const enemyHpPct = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));
  const playerHpPct = Math.max(0, Math.min(100, (run.hp / run.maxHp) * 100));

  const computeLiveCardPreview = (card: GameCard) => {
    const stats = getEffectiveCardStats(card);
    const eff = stats.effect;
    let dmg: number | null = null;
    if (eff.damage !== undefined || eff.scaleWithBlock) {
      let base = (eff.damage || 0) + combat.playerStrength;
      if (eff.scaleWithStreak) base += eff.scaleWithStreak * run.streak;
      if (eff.scaleWithBlock) base += combat.playerBlock + (eff.block ? eff.block + combat.playerDexterity : 0);
      if (enemy.vulnerable > 0) base *= 1.5;
      dmg = Math.max(0, Math.round(base));
    }
    const blk = eff.block !== undefined ? Math.max(0, eff.block + combat.playerDexterity) : null;
    return { stats, dmg, blk, hits: eff.hits || 1 };
  };

  const renderIntentBadge = () => {
    const intent = enemy.currentIntent;
    const ascBoost = run.ascension >= 2 && enemy.tier !== 'normal' ? 1.15 : 1.0;
    const calcAtk = (v = 0) => {
      let d = (v + enemy.strength) * ascBoost;
      if (enemy.weak > 0) d *= 0.75;
      return Math.max(0, Math.round(d));
    };

    if (intent.type === 'attack') {
      return (
        <span className="flex items-center gap-1 rounded-lg border border-rose-500/40 bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-300">
          <Swords className="h-3.5 w-3.5" /> {calcAtk(intent.value)} • {intent.label}
        </span>
      );
    }
    if (intent.type === 'multi-attack') {
      return (
        <span className="flex items-center gap-1 rounded-lg border border-rose-500/40 bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-300">
          <Swords className="h-3.5 w-3.5" /> {calcAtk(intent.value)}x{intent.hits} • {intent.label}
        </span>
      );
    }
    if (intent.type === 'attack-defend') {
      return (
        <span className="flex items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-300">
          <Swords className="h-3.5 w-3.5" /> {calcAtk(intent.value)} + <Shield className="h-3.5 w-3.5" />{' '}
          {intent.secondaryValue}
        </span>
      );
    }
    if (intent.type === 'defend') {
      return (
        <span className="flex items-center gap-1 rounded-lg border border-sky-500/40 bg-sky-500/15 px-2.5 py-1 text-xs font-bold text-sky-300">
          <Shield className="h-3.5 w-3.5" /> +{intent.value} • {intent.label}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 rounded-lg border border-purple-500/40 bg-purple-500/15 px-2.5 py-1 text-xs font-bold text-purple-300">
        <Activity className="h-3.5 w-3.5" /> {intent.label}
      </span>
    );
  };

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col justify-between bg-black px-3 pb-3 safe-bottom">
      {/* TOP TACTICAL ARENA: ENEMY + PLAYER STATUS */}
      <div className="space-y-2.5 pt-1">
        {/* Relic Strip */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {run.relicIds.map((rid) => {
              const relic = ALL_RELICS.find((r) => r.id === rid);
              if (!relic) return null;
              return (
                <button
                  key={rid}
                  type="button"
                  onClick={() => setSelectedRelicTip(selectedRelicTip === rid ? null : rid)}
                  className="rounded-lg border border-slate-800 bg-slate-900/90 px-2 py-1 text-[11px] font-semibold text-sky-300 active:scale-95"
                >
                  ✦ {relic.name}
                </button>
              );
            })}
          </div>
          <span className="shrink-0 text-[11px] font-bold text-slate-400">
            Act {run.act}/{run.totalActs} • Turn {combat.turn}
          </span>
        </div>

        {selectedRelicTip && (
          <div className="rounded-xl border border-sky-500/30 bg-slate-950 px-3 py-2 text-xs text-slate-200">
            <strong className="text-sky-400">
              {ALL_RELICS.find((r) => r.id === selectedRelicTip)?.name}:{' '}
            </strong>
            {ALL_RELICS.find((r) => r.id === selectedRelicTip)?.description}
          </div>
        )}

        {/* ENEMY HUD CARD */}
        <div
          className={`rounded-2xl border p-3 transition ${
            enemy.tier === 'boss'
              ? 'border-rose-500/45 bg-gradient-to-b from-rose-950/30 to-slate-950'
              : enemy.tier === 'elite'
                ? 'border-amber-500/40 bg-gradient-to-b from-amber-950/25 to-slate-950'
                : 'border-slate-800 bg-slate-950'
          } ${hitShake ? 'animate-shake' : ''}`}
        >
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-extrabold text-white">{enemy.name}</h2>
              <p className="text-[11px] text-slate-400">{enemy.subtitle}</p>
            </div>
            {renderIntentBadge()}
          </div>

          {enemyTemplate?.bossCaseStudyIntro && combat.turn === 1 && (
            <div className="mb-2 rounded-lg border border-rose-500/30 bg-rose-950/30 px-2.5 py-1.5 text-[11px] leading-snug text-rose-200">
              {enemyTemplate.bossCaseStudyIntro}
            </div>
          )}

          {/* Enemy HP Bar */}
          <div className="mb-1.5 flex items-center gap-2">
            <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-slate-900">
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-orange-500 transition-all duration-300"
                style={{ width: `${enemyHpPct}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-rose-300">
              {enemy.hp}/{enemy.maxHp}
            </span>
            {enemy.block > 0 && (
              <span className="flex items-center gap-0.5 rounded-md bg-sky-500/20 px-1.5 py-0.5 text-xs font-bold text-sky-300">
                <Shield className="h-3 w-3" /> {enemy.block}
              </span>
            )}
          </div>

          {/* Enemy Status Effects */}
          <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
            {enemy.vulnerable > 0 && (
              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">
                Vulnerable {enemy.vulnerable} (+50% dmg)
              </span>
            )}
            {enemy.weak > 0 && (
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">
                Weak {enemy.weak} (-25% atk)
              </span>
            )}
            {enemy.burn > 0 && (
              <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-orange-300">
                Burn {enemy.burn}
              </span>
            )}
            {enemy.strength > 0 && (
              <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-rose-300">
                +{enemy.strength} Strength
              </span>
            )}
          </div>
        </div>

        {/* PLAYER COMPACT STATUS BAR */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-emerald-400" />
              <div className="w-20 overflow-hidden rounded-full bg-slate-900 h-2">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${playerHpPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-emerald-300">
                {run.hp}/{run.maxHp}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-xs font-bold text-sky-300">
              <Shield className="h-3.5 w-3.5" />
              <span>{combat.playerBlock}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {combat.playerStrength > 0 && (
              <span className="text-[11px] font-bold text-rose-400">+{combat.playerStrength} Str</span>
            )}
            {combat.playerDexterity !== 0 && (
              <span className="text-[11px] font-bold text-emerald-400">
                {combat.playerDexterity > 0 ? `+${combat.playerDexterity}` : combat.playerDexterity} Dex
              </span>
            )}
            {combat.playerThorns > 0 && (
              <span className="text-[11px] font-bold text-purple-400">{combat.playerThorns} Thorns</span>
            )}
            <span className="flex items-center gap-0.5 rounded-lg bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-300">
              <Flame className="h-3.5 w-3.5" /> x{run.streak}
            </span>
            <span className="flex items-center gap-0.5 rounded-lg border border-sky-400/40 bg-sky-500/20 px-2 py-0.5 text-xs font-extrabold text-sky-200">
              <Zap className="h-3.5 w-3.5 text-sky-300" /> {combat.energy}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM THUMB ZONE: QUESTION / FEEDBACK / TACTICAL HAND / VICTORY */}
      <div className="mt-3">
        {combat.phase === 'question' && combat.activeQuestion && (
          <div>
            {combat.pendingEliteCardUid && (
              <div className="mb-2 rounded-xl border border-purple-500/40 bg-purple-950/30 px-3 py-1.5 text-xs font-bold text-purple-200">
                ⚡ ULTIMATE OVERCHARGE: Answer accurately to unleash 1.5x Ultimate Card Power!
              </div>
            )}
            <QuestionCardView
              question={combat.activeQuestion}
              hintCharges={run.hintCharges}
              usedHint={combat.usedHintThisTurn}
              onUseHint={onUseHint}
              isFlagged={Boolean(mastery[combat.activeQuestion.id]?.flagged)}
              onToggleFlag={() => onToggleFlagQuestion(combat.activeQuestion!.id)}
              showSpeedBar={!combat.pendingEliteCardUid}
              fastWindowMs={run.ascension >= 1 ? 10500 : 13000}
              onSubmitAnswer={(isCorrect, elapsedMs) =>
                onAnswerQuestion(combat.activeQuestion!, isCorrect, elapsedMs)
              }
            />
          </div>
        )}

        {combat.phase === 'feedback' && combat.activeQuestion && (
          <FeedbackDrawer
            question={combat.activeQuestion}
            isCorrect={Boolean(combat.lastAnswerCorrect)}
            isFast={combat.lastAnswerFast}
            energyAwarded={combat.lastEnergyAwarded}
            streak={run.streak}
            isFlagged={Boolean(mastery[combat.activeQuestion.id]?.flagged)}
            onToggleFlag={() => onToggleFlagQuestion(combat.activeQuestion!.id)}
            onContinue={onDismissFeedback}
          />
        )}

        {combat.phase === 'action' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1 text-xs text-slate-400">
              <span>
                Tap cards to deploy • Draw: <strong>{combat.drawPile.length}</strong> • Discard:{' '}
                <strong>{combat.discardPile.length}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  sfx.tap();
                  onEndTurn();
                }}
                className="rounded-xl border border-amber-500/50 bg-amber-500/20 px-4 py-2 text-xs font-extrabold text-amber-200 shadow-lg transition active:scale-95"
              >
                End Turn →
              </button>
            </div>

            {/* Horizontal / Grid Thumb-Friendly Card Hand */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {combat.hand.map((card) => {
                const { stats, dmg, blk, hits } = computeLiveCardPreview(card);
                const playable = combat.energy >= stats.cost;
                const borderStyle =
                  card.type === 'attack'
                    ? 'border-rose-500/45 bg-gradient-to-b from-rose-950/35 to-slate-950'
                    : card.type === 'skill'
                      ? 'border-sky-500/45 bg-gradient-to-b from-sky-950/35 to-slate-950'
                      : card.type === 'power'
                        ? 'border-emerald-500/45 bg-gradient-to-b from-emerald-950/35 to-slate-950'
                        : 'border-purple-500/60 bg-gradient-to-b from-purple-950/45 to-slate-950';

                return (
                  <button
                    key={card.uid}
                    type="button"
                    disabled={!playable}
                    onClick={() => {
                      if (card.type === 'attack' || card.type === 'ultimate') {
                        sfx.cardAttack();
                        setHitShake(true);
                        setTimeout(() => setHitShake(false), 280);
                      } else if (stats.effect.block) {
                        sfx.cardShield();
                      } else {
                        sfx.cardSkill();
                      }
                      onPlayCard(card.uid!);
                    }}
                    className={`flex flex-col justify-between rounded-2xl border p-2.5 text-left transition ${borderStyle} ${
                      playable
                        ? 'opacity-100 shadow-md active:scale-95'
                        : 'opacity-40 grayscale'
                    }`}
                  >
                    <div>
                      <div className="mb-1 flex items-start justify-between gap-1">
                        <span
                          className={`text-xs font-extrabold leading-tight ${
                            card.upgraded ? 'text-emerald-300' : 'text-white'
                          }`}
                        >
                          {stats.name}
                        </span>
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500 text-[11px] font-black text-slate-950">
                          {stats.cost}
                        </span>
                      </div>
                      <div className="mb-1.5 text-[10px] font-medium text-sky-300/80">
                        {card.azureTag}
                      </div>
                      <p className="text-[11px] leading-snug text-slate-200">{stats.description}</p>
                    </div>

                    <div className="mt-2 flex items-center gap-2 border-t border-slate-800/80 pt-1.5 text-[11px] font-bold">
                      {dmg !== null && (
                        <span className="text-rose-300">
                          ⚔️ {dmg}
                          {hits > 1 ? `x${hits}` : ''}
                        </span>
                      )}
                      {blk !== null && <span className="text-sky-300">🛡️ {blk}</span>}
                      <span className="ml-auto text-[9px] uppercase tracking-wider text-slate-500">
                        {card.type}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VICTORY LOOT DRAFT */}
        {combat.phase === 'victory' && (
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-extrabold text-white">Architecture Stabilized!</h3>
                  <p className="text-xs text-emerald-300">
                    Earned +{run.rewardGold} Gold{' '}
                    {run.rewardRelicId &&
                      `• Relic: ${ALL_RELICS.find((r) => r.id === run.rewardRelicId)?.name}`}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-300">
                <Coins className="h-3.5 w-3.5" /> {run.gold}
              </span>
            </div>

            {run.rewardRelicId && (
              <div className="mb-3 rounded-xl border border-purple-500/35 bg-purple-950/25 p-2.5 text-xs text-purple-200">
                <Sparkles className="mr-1 inline h-3.5 w-3.5 text-purple-400" />
                <strong>New Relic Equipped — {ALL_RELICS.find((r) => r.id === run.rewardRelicId)?.name}:</strong>{' '}
                {ALL_RELICS.find((r) => r.id === run.rewardRelicId)?.description}
              </div>
            )}

            <p className="mb-2 text-xs font-bold text-slate-300">
              Draft 1 Azure Card into your Deck (or skip to keep deck lean):
            </p>
            <div className="space-y-2">
              {(run.rewardCards || []).map((rc) => {
                const st = getEffectiveCardStats(rc);
                return (
                  <button
                    key={rc.uid}
                    type="button"
                    onClick={() => {
                      sfx.tap();
                      onPickRewardCard(rc);
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-left transition hover:border-sky-400 active:scale-98"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-white">{st.name}</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-sky-300">
                          {rc.azureTag}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-300">{st.description}</p>
                    </div>
                    <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-black text-slate-950">
                      {st.cost}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                sfx.tap();
                onPickRewardCard(null);
              }}
              className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-xs font-bold text-slate-300 active:scale-98"
            >
              Skip Card Draft & Continue →
            </button>
          </div>
        )}

        {/* DEFEAT SCREEN */}
        {combat.phase === 'defeat' && (
          <div className="rounded-2xl border border-rose-500/45 bg-slate-950 p-4 text-center shadow-2xl">
            <Skull className="mx-auto mb-2 h-8 w-8 text-rose-400" />
            <h3 className="text-lg font-black text-white">SLA Breached — Outage!</h3>
            <p className="mt-1 text-xs text-slate-300">
              Every outage hardens your architecture. Your FSRS mastery and Migration Credits are saved!
            </p>
            <div className="my-3 grid grid-cols-3 gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 text-xs">
              <div>
                <div className="text-slate-400">Answered</div>
                <div className="font-extrabold text-white">{run.questionsAnswered}</div>
              </div>
              <div>
                <div className="text-slate-400">Accuracy</div>
                <div className="font-extrabold text-emerald-400">
                  {run.questionsAnswered > 0
                    ? Math.round((run.questionsCorrect / run.questionsAnswered) * 100)
                    : 0}
                  %
                </div>
              </div>
              <div>
                <div className="text-slate-400">Best Streak</div>
                <div className="font-extrabold text-amber-400">x{run.bestStreak}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                sfx.tap();
                onAbandonOrFinishDefeat();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-extrabold text-slate-950"
            >
              <Award className="h-4 w-4" />
              <span>Claim Migration Credits & Return to Hub</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
