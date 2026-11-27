import React from 'react';
import { Award, Check, Lock, Sparkles, X } from 'lucide-react';
import { ArchitectClassId, MetaUpgradeLevels, PlayerSaveProfile } from '../types/game';
import { ARCHITECT_CLASSES } from '../data/gameContent';
import { AIPC_CLASS_OVERLAYS, isAiPmTrack } from '../data/pmOverlay';
import { sfx } from '../utils/audioHaptics';

interface MetaProgressionModalProps {
  profile: PlayerSaveProfile;
  onUnlockClass: (classId: ArchitectClassId, cost: number) => void;
  onBuyUpgrade: (key: keyof MetaUpgradeLevels, cost: number) => void;
  onClose: () => void;
}

const UPGRADE_DEFS: {
  key: keyof MetaUpgradeLevels;
  title: string;
  maxLevel: number;
  baseCost: number;
  desc: string;
}[] = [
  {
    key: 'hullPlating',
    title: 'Multi-Zone SLA Buffer',
    maxLevel: 5,
    baseCost: 45,
    desc: '+4 Starting & Max HP per level on all runs.'
  },
  {
    key: 'awsTranslator',
    title: 'AWS Rosetta Co-Processor',
    maxLevel: 3,
    baseCost: 55,
    desc: '+1 Starting AWS Bridge Hint Charge per run.'
  },
  {
    key: 'startingCache',
    title: 'Enterprise Credit Grant',
    maxLevel: 4,
    baseCost: 50,
    desc: '+35 Starting Gold per level for Azure Marketplace shops.'
  },
  {
    key: 'slaBuffer',
    title: 'Automated Post-Mortem Heal',
    maxLevel: 3,
    baseCost: 65,
    desc: 'Restore +6 bonus HP automatically after defeating every Act Boss.'
  },
  {
    key: 'cardRarityBoost',
    title: 'Premium SKU Catalog',
    maxLevel: 3,
    baseCost: 75,
    desc: 'Increases Uncommon & Ultimate card appearance rate in post-combat drafts.'
  }
];

export const MetaProgressionModal: React.FC<MetaProgressionModalProps> = ({
  profile,
  onUnlockClass,
  onBuyUpgrade,
  onClose
}) => {
  const isPm = isAiPmTrack(profile.selectedTrack);

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-3 safe-bottom">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white">
            {isPm ? 'AI Product Guild' : 'Cloud Center of Excellence'}
          </h2>
          <p className="text-xs text-slate-400">
            {isPm ? 'Permanent PM Archetypes & Sprint Perks' : 'Permanent Architect Classes & QoL Perks'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-xl border border-purple-500/40 bg-purple-500/15 px-3 py-1.5 text-xs font-black text-purple-200">
            <Award className="h-3.5 w-3.5 text-purple-400" /> {profile.migrationCredits} Credits
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Classes */}
      <div className="mb-4 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
          {isPm ? 'Playable AI PM Archetypes' : 'Playable Architect Classes'}
        </h3>
        {ARCHITECT_CLASSES.map((cls) => {
          const unlocked = profile.unlockedClasses.includes(cls.id);
          const canAfford = profile.migrationCredits >= cls.unlockCostCredits;
          const dispName = isPm ? AIPC_CLASS_OVERLAYS[cls.id].name : cls.name;
          const dispDesc = isPm ? AIPC_CLASS_OVERLAYS[cls.id].description : cls.description;
          return (
            <div
              key={cls.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5"
            >
              <div className="mb-1 flex items-center justify-between">
                <div>
                  <span className={`text-sm font-black ${cls.accentColor}`}>{dispName}</span>
                  <span className="ml-2 text-[11px] text-slate-400">({cls.maxHp} Base HP)</span>
                </div>
                {unlocked ? (
                  <span className="flex items-center gap-1 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                    <Check className="h-3.5 w-3.5" /> Unlocked
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => {
                      sfx.victory();
                      onUnlockClass(cls.id, cls.unlockCostCredits);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-purple-500 px-3 py-1.5 text-xs font-black text-slate-950 disabled:bg-slate-800 disabled:text-slate-500"
                  >
                    <Lock className="h-3 w-3" /> Unlock ({cls.unlockCostCredits} Cr)
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-300">{dispDesc}</p>
            </div>
          );
        })}
      </div>

      {/* Permanent Meta Upgrades */}
      <div className="space-y-2 pb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
          {isPm ? 'Permanent Product Leadership Perks' : 'Permanent Infrastructure Perks'}
        </h3>
        {UPGRADE_DEFS.map((u) => {
          const currentLvl = profile.metaUpgrades[u.key] || 0;
          const maxed = currentLvl >= u.maxLevel;
          const nextCost = u.baseCost + currentLvl * 35;
          const canAfford = !maxed && profile.migrationCredits >= nextCost;
          const pmTitles: Partial<Record<keyof MetaUpgradeLevels, { title: string; desc: string }>> = {
            hullPlating: { title: 'Stakeholder Trust Buffer', desc: '+4 Starting & Max HP per level on all runs.' },
            awsTranslator: { title: 'Product Sense Co-Pilot', desc: '+1 Starting PM Hint Charge per run.' },
            startingCache: { title: 'Seed R&D Budget', desc: '+35 Starting Gold per level for AI Tooling Stack shops.' },
            slaBuffer: { title: 'Sprint Post-Mortem Heal', desc: 'Restore +6 bonus HP automatically after defeating every Module Boss.' },
            cardRarityBoost: { title: 'Frontier Model Catalog', desc: 'Increases Uncommon & Ultimate card appearance rate in drafts.' }
          };
          const title = isPm && pmTitles[u.key] ? pmTitles[u.key]!.title : u.title;
          const desc = isPm && pmTitles[u.key] ? pmTitles[u.key]!.desc : u.desc;

          return (
            <div
              key={u.key}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-3.5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white">{title}</span>
                  <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                    Lv {currentLvl}/{u.maxLevel}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
              </div>

              <button
                type="button"
                disabled={!canAfford || maxed}
                onClick={() => {
                  sfx.cardShield();
                  onBuyUpgrade(u.key, nextCost);
                }}
                className="shrink-0 rounded-xl bg-sky-500 px-3 py-2 text-xs font-black text-slate-950 disabled:bg-slate-800 disabled:text-slate-500"
              >
                {maxed ? (
                  'MAXED'
                ) : (
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> {nextCost} Cr
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
