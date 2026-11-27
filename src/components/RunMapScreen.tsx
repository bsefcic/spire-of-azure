import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Check,
  Coins,
  Flame,
  Heart,
  HelpCircle,
  Layers,
  ShoppingBag,
  Skull,
  Sparkles,
  Swords,
  Trash2,
  Wrench,
  X
} from 'lucide-react';
import { ActIntelBriefing } from '../types/curriculum';
import { ActiveRun, GameCard, IncidentChoice, MapNode } from '../types/game';
import { ALL_RELICS } from '../data/gameContent';
import { getCardDisplayForTrack, getRelicDisplayForTrack, isAiPmTrack } from '../data/pmOverlay';
import { DOMAIN_META } from '../engine/fsrs';
import { getEffectiveCardStats } from '../engine/roguelike';
import { sfx } from '../utils/audioHaptics';

interface RunMapScreenProps {
  run: ActiveRun;
  briefing: ActIntelBriefing | undefined;
  onDismissBriefing: () => void;
  onSelectMapNode: (node: MapNode) => void;
  onRestHeal: () => void;
  onRestUpgradeCard: (cardUid: string) => void;
  onBuyShopCard: (idx: number) => void;
  onBuyShopRelic: (idx: number) => void;
  onRemoveCardInShop: (cardUid: string) => void;
  onLeaveNodeOverlay: () => void;
  onChooseIncidentOption: (choice: IncidentChoice) => void;
  onAbandonRun: () => void;
}

export const RunMapScreen: React.FC<RunMapScreenProps> = ({
  run,
  briefing,
  onDismissBriefing,
  onSelectMapNode,
  onRestHeal,
  onRestUpgradeCard,
  onBuyShopCard,
  onBuyShopRelic,
  onRemoveCardInShop,
  onLeaveNodeOverlay,
  onChooseIncidentOption,
  onAbandonRun
}) => {
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'rest' | 'shop' | 'deck' | 'briefing'>('none');
  const [incidentResult, setIncidentResult] = useState<string | null>(null);
  const [upgradingMode, setUpgradingMode] = useState(false);
  const [purgingMode, setPurgingMode] = useState(false);

  const showAutoBriefing =
    briefing && !run.briefingSeenForAct.includes(run.act) && activeOverlay === 'none';

  const isPm = isAiPmTrack(run.track);

  const actDomain = DOMAIN_META.find(
    (d) => d.track === (run.track === 'mixed' ? 'az-104' : run.track) && d.act === run.act
  );

  // Determine which map nodes are currently clickable!
  const currentNode = run.map.find((n) => n.id === run.currentNodeId);
  const reachableNodeIds = new Set<string>(
    currentNode ? currentNode.nextIds : run.map.filter((n) => n.floor === 0).map((n) => n.id)
  );

  const healAmount = Math.max(10, Math.round(run.maxHp * (run.ascension >= 3 ? 0.25 : 0.3)));
  const cardRemovePrice = run.relicIds.includes('relic-reserved-3yr') ? 45 : 60;

  const handleTapNode = (node: MapNode) => {
    if (!reachableNodeIds.has(node.id)) return;
    sfx.tap();
    if (node.type === 'rest') {
      setUpgradingMode(false);
      setActiveOverlay('rest');
    } else if (node.type === 'shop') {
      setPurgingMode(false);
      setActiveOverlay('shop');
    } else if (node.type === 'incident') {
      setIncidentResult(null);
    }
    onSelectMapNode(node);
  };

  const renderNodeBadge = (node: MapNode) => {
    const isCurrent = node.id === run.currentNodeId;
    const isReachable = reachableNodeIds.has(node.id);
    const isDone = node.completed;

    const iconMap = {
      combat: <Swords className="h-4 w-4" />,
      elite: <Flame className="h-4 w-4 text-amber-400" />,
      rest: <Wrench className="h-4 w-4 text-emerald-400" />,
      shop: <ShoppingBag className="h-4 w-4 text-sky-400" />,
      incident: <HelpCircle className="h-4 w-4 text-purple-400" />,
      boss: <Skull className="h-5 w-5 text-rose-400" />
    };

    const labelMap = {
      combat: isPm ? 'Challenge' : 'Combat',
      elite: 'Elite',
      rest: isPm ? 'Retro' : 'Refactor',
      shop: isPm ? 'Stack' : 'Market',
      incident: isPm ? 'Escalate' : 'Incident',
      boss: 'Case Boss'
    };

    return (
      <button
        key={node.id}
        type="button"
        disabled={!isReachable}
        onClick={() => handleTapNode(node)}
        className={`flex flex-col items-center justify-center rounded-2xl border px-3 py-2 transition ${
          node.type === 'boss' ? 'w-36 py-3' : 'w-24'
        } ${
          isCurrent
            ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-lg'
            : isReachable
              ? 'animate-glow border-sky-400 bg-slate-900 text-white active:scale-95'
              : isDone
                ? 'border-slate-800 bg-slate-950/60 text-slate-600'
                : 'border-slate-900 bg-slate-950/40 text-slate-500 opacity-55'
        }`}
      >
        <div className="mb-0.5 flex items-center gap-1">
          {isDone ? <Check className="h-4 w-4 text-emerald-500" /> : iconMap[node.type]}
        </div>
        <span className="text-[11px] font-bold">{labelMap[node.type]}</span>
      </button>
    );
  };

  // PRE-ACT 60-SECOND INTEL BRIEFING MODAL
  if ((showAutoBriefing || activeOverlay === 'briefing') && briefing) {
    const closeBriefing = () => {
      sfx.tap();
      if (showAutoBriefing) onDismissBriefing();
      setActiveOverlay('none');
    };

    return (
      <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-3 safe-bottom">
        <div className="mb-3 rounded-2xl border border-sky-500/40 bg-gradient-to-b from-sky-950/40 to-slate-950 p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="rounded-md bg-sky-500/20 px-2 py-0.5 text-[11px] font-bold uppercase text-sky-300">
              {isPm ? '60-Sec Module Field Guide' : '60-Sec Pre-Act Field Guide'} • {briefing.examWeight}
            </span>
            <button
              type="button"
              onClick={closeBriefing}
              className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-300"
            >
              Skip →
            </button>
          </div>
          <h2 className="text-lg font-black text-white">{briefing.title}</h2>
          <p className="text-xs text-slate-300">{briefing.subtitle}</p>
        </div>

        <div className="space-y-2.5 pb-4">
          {briefing.cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 shadow-lg"
            >
              <div className="mb-1 flex flex-wrap items-center justify-between gap-1">
                <h3 className="text-sm font-extrabold text-sky-300">{card.title}</h3>
                <span className="rounded-md border border-amber-500/30 bg-amber-950/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                  {isPm ? 'Classic PM: ' : 'AWS: '}
                  {card.awsEquivalent}
                </span>
              </div>
              <p className="mb-2 text-xs font-medium text-slate-200">{card.azureConcept}</p>
              <ul className="mb-2 space-y-1 text-xs text-slate-300">
                {card.keyFacts.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-sky-400">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg border border-rose-500/30 bg-rose-950/25 px-2.5 py-1.5 text-[11px] text-rose-200">
                <strong className="text-rose-400">Exam Trap: </strong>
                {card.examTrap}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={closeBriefing}
            className="w-full rounded-2xl bg-sky-500 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-sky-500/25 active:scale-98"
          >
            Enter {isPm ? `Module ${run.act} Sprint Map` : `Act ${run.act} Spire Map`} →
          </button>
        </div>
      </div>
    );
  }

  // CLOUD MYSTERY INCIDENT OVERLAY
  if (run.activeIncident) {
    const inc = run.activeIncident;
    return (
      <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-4 safe-bottom">
        <div className="rounded-2xl border border-purple-500/40 bg-slate-950 p-4 shadow-2xl">
          <div className="mb-2 flex items-center gap-2 text-purple-300">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-xs font-extrabold uppercase tracking-wider">
              {isPm ? 'Live Product Escalation' : 'Live Migration Incident'}
            </span>
          </div>
          <h2 className="mb-2 text-lg font-black text-white">{inc.title}</h2>
          <div className="mb-2.5 rounded-xl border border-amber-500/30 bg-amber-950/20 p-2.5 text-xs text-amber-200">
            <strong>Context: </strong>
            {inc.awsContext}
          </div>
          <p className="mb-4 text-sm leading-relaxed text-slate-200">{inc.description}</p>

          {!incidentResult ? (
            <div className="space-y-2.5">
              {inc.choices.map((ch, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    sfx.tap();
                    setIncidentResult(ch.outcomeText);
                    onChooseIncidentOption(ch);
                  }}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-left transition hover:border-purple-400 active:scale-98"
                >
                  <div className="mb-0.5 text-[11px] font-bold text-purple-300">
                    {ch.azureAction}
                  </div>
                  <div className="text-xs font-bold text-white">{ch.label}</div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div className="mb-3 rounded-xl border border-emerald-500/40 bg-emerald-950/25 p-3 text-xs leading-relaxed text-emerald-200">
                {incidentResult}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIncidentResult(null);
                  onLeaveNodeOverlay();
                }}
                className="w-full rounded-xl bg-sky-500 py-3 text-sm font-extrabold text-slate-950"
              >
                Continue Climb →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // REFACTOR REST SITE OVERLAY
  if (activeOverlay === 'rest') {
    const upgradableCards = run.deck.filter((c) => !c.upgraded);
    return (
      <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-4 safe-bottom">
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-4">
          <div className="mb-2 flex items-center gap-2 text-emerald-400">
            <Wrench className="h-5 w-5" />
            <h2 className="text-lg font-black text-white">
              {isPm ? 'Sprint Retro & Calibration' : 'Architecture Refactor Window'}
            </h2>
          </div>
          <p className="mb-4 text-xs text-slate-300">
            {isPm
              ? 'Take a breather between product sprints. Restore Stakeholder Trust or upgrade a card in your deck.'
              : 'Scheduled maintenance window before the next wave. Restore SLA Uptime or upgrade a card in your deck.'}
          </p>

          {!upgradingMode ? (
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  sfx.cardShield();
                  onRestHeal();
                  setActiveOverlay('none');
                }}
                className="flex w-full items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-950/25 p-3.5 text-left active:scale-98"
              >
                <div>
                  <div className="text-sm font-extrabold text-emerald-300">
                    {isPm ? `Restore Stakeholder Trust (+${healAmount} HP)` : `Restore SLA Uptime (+${healAmount} HP)`}
                  </div>
                  <div className="text-xs text-slate-400">
                    Current HP: {run.hp} / {run.maxHp}
                  </div>
                </div>
                <Heart className="h-5 w-5 text-emerald-400" />
              </button>

              <button
                type="button"
                disabled={upgradableCards.length === 0}
                onClick={() => {
                  sfx.tap();
                  setUpgradingMode(true);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-sky-500/40 bg-sky-950/25 p-3.5 text-left disabled:opacity-40 active:scale-98"
              >
                <div>
                  <div className="text-sm font-extrabold text-sky-300">
                    {isPm ? 'Upgrade Strategy Card (+ Version)' : 'Upgrade SKU Card (+ Version)'}
                  </div>
                  <div className="text-xs text-slate-400">
                    Permanently boost 1 card in your deck ({upgradableCards.length} eligible)
                  </div>
                </div>
                <Sparkles className="h-5 w-5 text-sky-400" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-bold text-sky-300">Select a card to upgrade:</span>
                <button
                  type="button"
                  onClick={() => setUpgradingMode(false)}
                  className="text-xs text-slate-400 underline"
                >
                  Back
                </button>
              </div>
              <div className="max-h-[60dvh] space-y-2 overflow-y-auto pr-1">
                {upgradableCards.map((c) => {
                  const disp = getCardDisplayForTrack(c, run.track);
                  const dispUp = getCardDisplayForTrack({ ...c, upgraded: true }, run.track);
                  return (
                  <button
                    key={c.uid}
                    type="button"
                    onClick={() => {
                      sfx.victory();
                      onRestUpgradeCard(c.uid!);
                      setActiveOverlay('none');
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-left hover:border-emerald-400 active:scale-98"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300">
                        {disp.name} → <span className="text-emerald-300">{dispUp.name}</span>
                      </span>
                      <span className="rounded bg-sky-500/20 px-2 py-0.5 text-sky-300">
                        Cost {c.cost}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                      Now: {c.description}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-300">
                      Upgraded: {c.upgradedDescription}
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // CLOUD MARKETPLACE SHOP OVERLAY
  if (activeOverlay === 'shop') {
    return (
      <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-4 safe-bottom">
        <div className="rounded-2xl border border-sky-500/40 bg-slate-950 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-sky-400" />
              <h2 className="text-lg font-black text-white">
                {isPm ? 'AI Tooling Marketplace' : 'Azure Marketplace'}
              </h2>
            </div>
            <span className="flex items-center gap-1 rounded-lg bg-amber-500/20 px-2.5 py-1 text-xs font-extrabold text-amber-300">
              <Coins className="h-3.5 w-3.5" /> {run.gold} Gold
            </span>
          </div>

          {!purgingMode ? (
            <div className="space-y-3">
              <div>
                <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Cards Available
                </h3>
                <div className="space-y-2">
                  {(run.shopCards || []).map((item, idx) => {
                    const st = getEffectiveCardStats(item.card);
                    const disp = getCardDisplayForTrack(item.card, run.track);
                    const canAfford = run.gold >= item.price && !item.sold;
                    return (
                      <button
                        key={item.card.uid}
                        type="button"
                        disabled={!canAfford}
                        onClick={() => {
                          sfx.tap();
                          onBuyShopCard(idx);
                        }}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-left disabled:opacity-40"
                      >
                        <div>
                          <div className="text-xs font-extrabold text-white">
                            {disp.name}{' '}
                            <span className="text-[10px] font-normal text-sky-300">
                              ({st.cost} ⚡)
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-300">{st.description}</div>
                        </div>
                        <span className="ml-2 shrink-0 rounded-lg bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300">
                          {item.sold ? 'SOLD' : `${item.price} G`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {(run.shopRelics || []).length > 0 && (
                <div>
                  <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isPm ? 'Product Relics' : 'Architecture Relics'}
                  </h3>
                  <div className="space-y-2">
                    {(run.shopRelics || []).map((sr, idx) => {
                      const rawRelic = ALL_RELICS.find((r) => r.id === sr.relicId);
                      if (!rawRelic) return null;
                      const relic = getRelicDisplayForTrack(rawRelic, run.track);
                      const canAfford = run.gold >= sr.price && !sr.sold;
                      return (
                        <button
                          key={sr.relicId}
                          type="button"
                          disabled={!canAfford}
                          onClick={() => {
                            sfx.victory();
                            onBuyShopRelic(idx);
                          }}
                          className="flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-950/20 p-2.5 text-left disabled:opacity-40"
                        >
                          <div>
                            <div className="text-xs font-extrabold text-purple-200">
                              ✦ {relic.name}
                            </div>
                            <div className="text-[11px] text-slate-300">{relic.description}</div>
                          </div>
                          <span className="ml-2 shrink-0 rounded-lg bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300">
                            {sr.sold ? 'OWNED' : `${sr.price} G`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={Boolean(run.cardRemoveUsedInShop) || run.gold < cardRemovePrice || run.deck.length <= 5}
                onClick={() => setPurgingMode(true)}
                className="flex w-full items-center justify-between rounded-xl border border-rose-500/35 bg-rose-950/20 p-3 text-left text-xs disabled:opacity-40"
              >
                <span className="flex items-center gap-2 font-bold text-rose-200">
                  <Trash2 className="h-4 w-4" /> Decommission 1 Card from Deck
                </span>
                <span className="font-extrabold text-amber-300">
                  {run.cardRemoveUsedInShop ? 'USED' : `${cardRemovePrice} G`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sfx.tap();
                  setActiveOverlay('none');
                  onLeaveNodeOverlay();
                }}
                className="w-full rounded-xl bg-sky-500 py-3 text-sm font-extrabold text-slate-950"
              >
                Leave Marketplace →
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300">
                  Tap a card to permanently remove ({cardRemovePrice} Gold):
                </span>
                <button
                  type="button"
                  onClick={() => setPurgingMode(false)}
                  className="text-xs text-slate-400 underline"
                >
                  Cancel
                </button>
              </div>
              <div className="max-h-[55dvh] space-y-1.5 overflow-y-auto">
                {run.deck.map((c) => {
                  const st = getEffectiveCardStats(c);
                  const disp = getCardDisplayForTrack(c, run.track);
                  return (
                    <button
                      key={c.uid}
                      type="button"
                      onClick={() => {
                        sfx.tap();
                        onRemoveCardInShop(c.uid!);
                        setPurgingMode(false);
                      }}
                      className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-left text-xs"
                    >
                      <span className="font-bold text-white">{disp.name}</span>
                      <span className="text-slate-400">{st.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // DECK INSPECTOR OVERLAY
  if (activeOverlay === 'deck') {
    return (
      <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-4 safe-bottom">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white">
            Active Deck ({run.deck.length} Cards)
          </h2>
          <button
            type="button"
            onClick={() => setActiveOverlay('none')}
            className="rounded-lg border border-slate-700 bg-slate-900 p-1.5 text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {run.deck.map((c: GameCard) => {
            const st = getEffectiveCardStats(c);
            const disp = getCardDisplayForTrack(c, run.track);
            return (
              <div
                key={c.uid}
                className="rounded-xl border border-slate-800 bg-slate-950 p-2.5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-extrabold ${
                      c.upgraded ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {disp.name}
                  </span>
                  <span className="rounded-full bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-bold text-sky-300">
                    {st.cost} ⚡
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-300">{st.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // MAIN ACT BRANCHING MAP
  const floors = [6, 5, 4, 3, 2, 1, 0]; // Render Boss at top, Floor 0 at bottom (Slay-the-Spire climb!)

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col justify-between bg-black px-3.5 py-2.5 safe-bottom">
      {/* Run Status Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2.5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
              {isPm ? `AIPC™ • Module ${run.act} of ${run.totalActs}` : `${run.track.toUpperCase()} • Act ${run.act} of ${run.totalActs}`}
            </div>
            <h2 className="text-sm font-extrabold text-white">
              {actDomain ? actDomain.shortName : isPm ? 'AI Product Spire' : 'Cloud Spire'}
            </h2>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-bold">
            <span className="flex items-center gap-1 text-emerald-300">
              <Heart className="h-3.5 w-3.5" /> {run.hp}/{run.maxHp}
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <Coins className="h-3.5 w-3.5" /> {run.gold}
            </span>
          </div>
        </div>

        {/* Utility Toolbar: Intel Briefing & Deck */}
        <div className="flex items-center justify-between gap-2">
          {briefing && (
            <button
              type="button"
              onClick={() => {
                sfx.tap();
                setActiveOverlay('briefing');
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-950/30 py-2 text-xs font-bold text-sky-300 active:scale-98"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{isPm ? `Mod ${run.act} Intel Guide` : `Act ${run.act} Intel Guide`}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              sfx.tap();
              setActiveOverlay('deck');
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 py-2 text-xs font-bold text-slate-200 active:scale-98"
          >
            <Layers className="h-3.5 w-3.5 text-sky-400" />
            <span>Deck ({run.deck.length})</span>
          </button>
        </div>
      </div>

      {/* Vertical Climb Map */}
      <div className="my-3 flex flex-col items-center space-y-3 rounded-2xl border border-slate-900 bg-gradient-to-b from-slate-950 via-black to-slate-950 py-4">
        {floors.map((floorIdx) => {
          const floorNodes = run.map
            .filter((n) => n.floor === floorIdx)
            .sort((a, b) => a.col - b.col);
          return (
            <div key={floorIdx} className="flex w-full items-center justify-around px-2">
              {floorNodes.map((node) => renderNodeBadge(node))}
            </div>
          );
        })}
      </div>

      {/* Footer Hint + Abandon */}
      <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
        <span>Tap a glowing node above to climb</span>
        <button
          type="button"
          onClick={onAbandonRun}
          className="text-rose-400/80 underline hover:text-rose-300"
        >
          End Run Early
        </button>
      </div>
    </div>
  );
};
