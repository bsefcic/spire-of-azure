import {
  ArchitectClassId,
  CloudIncident,
  EnemyTemplate,
  GameCard,
  Relic
} from '../types/game';

export interface ArchitectClassMeta {
  id: ArchitectClassId;
  name: string;
  title: string;
  unlockCostCredits: number;
  maxHp: number;
  starterRelicId: string;
  accentColor: string;
  badgeBg: string;
  description: string;
  starterCardIds: string[];
}

export const ARCHITECT_CLASSES: ArchitectClassMeta[] = [
  {
    id: 'vanguard',
    name: 'Cloud Vanguard',
    title: 'Balanced Solutions Architect',
    unlockCostCredits: 0,
    maxHp: 78,
    starterRelicId: 'relic-aws-badge',
    accentColor: 'text-sky-400',
    badgeBg: 'border-sky-500/40 bg-sky-500/10',
    description: 'Versatile AWS-to-Azure migration specialist. Balances reliable SLA shields, streak-scaling strikes, and adaptive energy.',
    starterCardIds: [
      'vg-strike', 'vg-strike', 'vg-strike', 'vg-strike',
      'vg-defend', 'vg-defend', 'vg-defend', 'vg-defend',
      'vg-peering-slash',
      'vg-sla-barrier'
    ]
  },
  {
    id: 'sentinel',
    name: 'Zero-Trust Sentinel',
    title: 'Security & Governance Bastion',
    unlockCostCredits: 120,
    maxHp: 86,
    starterRelicId: 'relic-defender-shield',
    accentColor: 'text-emerald-400',
    badgeBg: 'border-emerald-500/40 bg-emerald-500/10',
    description: 'Impenetrable defense-in-depth fortress. Retains block across turns, reflects attacks with NSG Thorns, and converts armor into crushing slams.',
    starterCardIds: [
      'vg-strike', 'vg-strike', 'vg-strike',
      'vg-defend', 'vg-defend', 'vg-defend', 'vg-defend',
      'sn-nsg-thorns',
      'sn-policy-slam',
      'sn-bastion-retain'
    ]
  },
  {
    id: 'striker',
    name: 'Scale-Out Striker',
    title: 'Elastic Compute & Container Specialist',
    unlockCostCredits: 180,
    maxHp: 70,
    starterRelicId: 'relic-keda-scaler',
    accentColor: 'text-amber-400',
    badgeBg: 'border-amber-500/40 bg-amber-500/10',
    description: 'High-velocity horizontal autoscaler. Chains rapid 0- and 1-cost container multi-hits, card draw bursts, and massive streak multipliers.',
    starterCardIds: [
      'vg-strike', 'vg-strike', 'vg-strike',
      'vg-defend', 'vg-defend', 'vg-defend',
      'st-aci-burst', 'st-aci-burst',
      'st-keda-draw',
      'st-vmss-barrage'
    ]
  }
];

export const SLA_ASCENSIONS = [
  { level: 0, sla: '99.0% SLA', subtitle: 'Standard Baseline', description: 'Standard enemy stats and exam question pacing.' },
  { level: 1, sla: '99.5% SLA', subtitle: 'Production Ready', description: 'Enemies have +12% HP. Fast-answer threshold tightens to 10s.' },
  { level: 2, sla: '99.9% SLA', subtitle: 'Zone Redundant', description: 'Elites & Bosses deal +15% damage and prefer multi-format scenarios.' },
  { level: 3, sla: '99.95% SLA', subtitle: 'Multi-Region Active', description: 'All enemies gain +18% HP; Rest sites heal 25% instead of 30%.' },
  { level: 4, sla: '99.99% SLA', subtitle: 'Mission Critical', description: 'Higher frequency of Difficulty 3 & Yes/No/Multi-select exam twists.' },
  { level: 5, sla: '99.999% SLA', subtitle: 'Five-Nines Architect', description: 'Ultimate exam mastery test: Bosses gain +2 Strength & multi-phase shields.' }
];

export const ALL_CARDS: GameCard[] = [
  // === STARTERS ===
  {
    id: 'vg-strike',
    name: 'CLI Strike',
    upgradedName: 'CLI Strike+',
    azureTag: 'az vm run-command',
    classPool: 'neutral',
    type: 'attack',
    rarity: 'starter',
    cost: 1,
    description: 'Deal 6 damage.',
    upgradedDescription: 'Deal 9 damage.',
    effect: { damage: 6 },
    upgradedEffect: { damage: 9 }
  },
  {
    id: 'vg-defend',
    name: 'NSG Allow-Block',
    upgradedName: 'NSG Allow-Block+',
    azureTag: 'Priority 100 Inbound',
    classPool: 'neutral',
    type: 'skill',
    rarity: 'starter',
    cost: 1,
    description: 'Gain 5 Block.',
    upgradedDescription: 'Gain 8 Block.',
    effect: { block: 5 },
    upgradedEffect: { block: 8 }
  },
  {
    id: 'vg-peering-slash',
    name: 'VNet Peering Lance',
    upgradedName: 'VNet Peering Lance+',
    azureTag: 'Low-Latency Backbone',
    classPool: 'vanguard',
    type: 'attack',
    rarity: 'starter',
    cost: 2,
    description: 'Deal 9 damage. Apply 2 Vulnerable (+50% dmg taken).',
    upgradedDescription: 'Deal 12 damage. Apply 3 Vulnerable.',
    effect: { damage: 9, applyVulnerable: 2 },
    upgradedEffect: { damage: 12, applyVulnerable: 3 }
  },
  {
    id: 'vg-sla-barrier',
    name: 'Zone-Redundant Shield',
    upgradedName: 'Zone-Redundant Shield+',
    azureTag: '3 Availability Zones',
    classPool: 'vanguard',
    type: 'skill',
    rarity: 'starter',
    cost: 1,
    description: 'Gain 7 Block. Draw 1 card.',
    upgradedDescription: 'Gain 10 Block. Draw 1 card.',
    effect: { block: 7, draw: 1 },
    upgradedEffect: { block: 10, draw: 1 }
  },
  {
    id: 'sn-nsg-thorns',
    name: 'WAF Counter-Rule',
    upgradedName: 'WAF Counter-Rule+',
    azureTag: 'OWASP 3.2 CRS',
    classPool: 'sentinel',
    type: 'power',
    rarity: 'starter',
    cost: 1,
    description: 'Gain 4 Block and 3 Thorns for this combat.',
    upgradedDescription: 'Gain 6 Block and 5 Thorns for this combat.',
    effect: { block: 4, gainThorns: 3 },
    upgradedEffect: { block: 6, gainThorns: 5 }
  },
  {
    id: 'sn-policy-slam',
    name: 'Deny-Policy Slam',
    upgradedName: 'Deny-Policy Slam+',
    azureTag: 'Azure Policy Effect: Deny',
    classPool: 'sentinel',
    type: 'attack',
    rarity: 'starter',
    cost: 1,
    description: 'Deal 4 damage + damage equal to your current Block.',
    upgradedDescription: 'Deal 8 damage + damage equal to your current Block.',
    effect: { damage: 4, scaleWithBlock: true },
    upgradedEffect: { damage: 8, scaleWithBlock: true }
  },
  {
    id: 'sn-bastion-retain',
    name: 'Azure Bastion Lock',
    upgradedName: 'Azure Bastion Lock+',
    azureTag: 'Zero Public IP /26',
    classPool: 'sentinel',
    type: 'skill',
    rarity: 'starter',
    cost: 1,
    description: 'Gain 8 Block. Retain your Block into next turn.',
    upgradedDescription: 'Gain 11 Block. Retain your Block into next turn.',
    effect: { block: 8, retainBlock: true },
    upgradedEffect: { block: 11, retainBlock: true }
  },
  {
    id: 'st-aci-burst',
    name: 'ACI Fast-Spawn',
    upgradedName: 'ACI Fast-Spawn+',
    azureTag: 'Serverless Pod Burst',
    classPool: 'striker',
    type: 'attack',
    rarity: 'starter',
    cost: 0,
    description: 'Deal 4 damage. Scales +1 per Streak.',
    upgradedDescription: 'Deal 6 damage. Scales +2 per Streak.',
    effect: { damage: 4, scaleWithStreak: 1 },
    upgradedEffect: { damage: 6, scaleWithStreak: 2 }
  },
  {
    id: 'st-keda-draw',
    name: 'KEDA Event Trigger',
    upgradedName: 'KEDA Event Trigger+',
    azureTag: 'Container Apps Scale',
    classPool: 'striker',
    type: 'skill',
    rarity: 'starter',
    cost: 1,
    description: 'Draw 2 cards. Gain 1 Energy.',
    upgradedDescription: 'Draw 3 cards. Gain 1 Energy.',
    effect: { draw: 2, gainEnergy: 1 },
    upgradedEffect: { draw: 3, gainEnergy: 1 }
  },
  {
    id: 'st-vmss-barrage',
    name: 'VMSS Horizontal Volley',
    upgradedName: 'VMSS Horizontal Volley+',
    azureTag: 'Scale-Out 3x Instances',
    classPool: 'striker',
    type: 'attack',
    rarity: 'starter',
    cost: 2,
    description: 'Deal 4 damage 3 times.',
    upgradedDescription: 'Deal 6 damage 3 times.',
    effect: { damage: 4, hits: 3 },
    upgradedEffect: { damage: 6, hits: 3 }
  },

  // === COMMONS & UNCOMMONS (NEUTRAL + CLASS SYNERGIES) ===
  {
    id: 'nt-front-door',
    name: 'Front Door Anycast',
    upgradedName: 'Front Door Anycast+',
    azureTag: 'Global Layer-7 Edge',
    classPool: 'neutral',
    type: 'attack',
    rarity: 'common',
    cost: 1,
    description: 'Deal 7 damage. Draw 1 card.',
    upgradedDescription: 'Deal 10 damage. Draw 1 card.',
    effect: { damage: 7, draw: 1 },
    upgradedEffect: { damage: 10, draw: 1 }
  },
  {
    id: 'nt-expressroute',
    name: 'ExpressRoute Circuit',
    upgradedName: 'ExpressRoute Circuit+',
    azureTag: 'Private MPLS Bypass',
    classPool: 'neutral',
    type: 'attack',
    rarity: 'uncommon',
    cost: 2,
    description: 'Deal 14 damage. Scales +2 per Streak.',
    upgradedDescription: 'Deal 18 damage. Scales +3 per Streak.',
    effect: { damage: 14, scaleWithStreak: 2 },
    upgradedEffect: { damage: 18, scaleWithStreak: 3 }
  },
  {
    id: 'nt-resource-lock',
    name: 'CanNotDelete Lock',
    upgradedName: 'CanNotDelete Lock+',
    azureTag: 'Inherited Scope Guard',
    classPool: 'neutral',
    type: 'skill',
    rarity: 'common',
    cost: 1,
    description: 'Gain 9 Block. Apply 1 Weak (-25% enemy dmg).',
    upgradedDescription: 'Gain 12 Block. Apply 2 Weak.',
    effect: { block: 9, applyWeak: 1 },
    upgradedEffect: { block: 12, applyWeak: 2 }
  },
  {
    id: 'nt-conditional-access',
    name: 'Conditional Access Gate',
    upgradedName: 'Conditional Access Gate+',
    azureTag: 'Signal + Verify + Enforce',
    classPool: 'neutral',
    type: 'skill',
    rarity: 'common',
    cost: 1,
    description: 'Apply 2 Weak and 1 Vulnerable. Gain 4 Block.',
    upgradedDescription: 'Apply 3 Weak and 2 Vulnerable. Gain 6 Block.',
    effect: { block: 4, applyWeak: 2, applyVulnerable: 1 },
    upgradedEffect: { block: 6, applyWeak: 3, applyVulnerable: 2 }
  },
  {
    id: 'nt-bicep-deploy',
    name: 'Bicep Idempotent Push',
    upgradedName: 'Bicep Idempotent Push+',
    azureTag: 'az deployment group create',
    classPool: 'neutral',
    type: 'power',
    rarity: 'uncommon',
    cost: 1,
    description: 'Gain +2 Strength and +2 Dexterity for this combat.',
    upgradedDescription: 'Gain +3 Strength and +3 Dexterity for this combat.',
    effect: { gainStrength: 2, gainDexterity: 2 },
    upgradedEffect: { gainStrength: 3, gainDexterity: 3 }
  },
  {
    id: 'nt-spot-evict',
    name: 'Spot VM Overclock',
    upgradedName: 'Spot VM Overclock+',
    azureTag: '90% Discount Burst',
    classPool: 'neutral',
    type: 'skill',
    rarity: 'uncommon',
    cost: 0,
    description: 'Gain 2 Energy. Draw 1 card.',
    upgradedDescription: 'Gain 2 Energy. Draw 2 cards.',
    effect: { gainEnergy: 2, draw: 1 },
    upgradedEffect: { gainEnergy: 2, draw: 2 }
  },
  {
    id: 'nt-gzrs-vault',
    name: 'RA-GZRS Recovery',
    upgradedName: 'RA-GZRS Recovery+',
    azureTag: '16-Nines Cross-Region',
    classPool: 'neutral',
    type: 'skill',
    rarity: 'uncommon',
    cost: 2,
    description: 'Gain 13 Block and heal 4 HP.',
    upgradedDescription: 'Gain 17 Block and heal 6 HP.',
    effect: { block: 13, heal: 4 },
    upgradedEffect: { block: 17, heal: 6 }
  },
  {
    id: 'nt-log-burn',
    name: 'KQL Anomaly Purge',
    upgradedName: 'KQL Anomaly Purge+',
    azureTag: 'Log Analytics Query',
    classPool: 'neutral',
    type: 'attack',
    rarity: 'common',
    cost: 1,
    description: 'Deal 6 damage and apply 5 Burn.',
    upgradedDescription: 'Deal 8 damage and apply 8 Burn.',
    effect: { damage: 6, applyBurn: 5 },
    upgradedEffect: { damage: 8, applyBurn: 8 }
  },
  {
    id: 'nt-key-vault',
    name: 'Key Vault HSM Ward',
    upgradedName: 'Key Vault HSM Ward+',
    azureTag: 'FIPS 140-2 Level 3',
    classPool: 'neutral',
    type: 'skill',
    rarity: 'common',
    cost: 2,
    description: 'Gain 15 Block.',
    upgradedDescription: 'Gain 20 Block.',
    effect: { block: 15 },
    upgradedEffect: { block: 20 }
  },
  {
    id: 'vg-pim-elevation',
    name: 'Entra PIM Elevation',
    upgradedName: 'Entra PIM Elevation+',
    azureTag: 'Just-In-Time Admin',
    classPool: 'vanguard',
    type: 'power',
    rarity: 'uncommon',
    cost: 1,
    description: 'Gain +3 Strength and 1 Energy.',
    upgradedDescription: 'Gain +4 Strength and 2 Energy.',
    effect: { gainStrength: 3, gainEnergy: 1 },
    upgradedEffect: { gainStrength: 4, gainEnergy: 2 }
  },
  {
    id: 'vg-slot-swap',
    name: 'Zero-Downtime Slot Swap',
    upgradedName: 'Zero-Downtime Slot Swap+',
    azureTag: 'Staging -> Production',
    classPool: 'vanguard',
    type: 'skill',
    rarity: 'common',
    cost: 1,
    description: 'Gain 6 Block. Draw 2 cards.',
    upgradedDescription: 'Gain 9 Block. Draw 3 cards.',
    effect: { block: 6, draw: 2 },
    upgradedEffect: { block: 9, draw: 3 }
  },
  {
    id: 'vg-private-link',
    name: 'Private Link Pierce',
    upgradedName: 'Private Link Pierce+',
    azureTag: 'privatelink.* VNet IP',
    classPool: 'vanguard',
    type: 'attack',
    rarity: 'uncommon',
    cost: 2,
    description: 'Deal 13 damage. Gain 7 Block.',
    upgradedDescription: 'Deal 17 damage. Gain 10 Block.',
    effect: { damage: 13, block: 7 },
    upgradedEffect: { damage: 17, block: 10 }
  },
  {
    id: 'sn-immutable-worm',
    name: 'Immutable WORM Vault',
    upgradedName: 'Immutable WORM Vault+',
    azureTag: 'Legal Hold Retention',
    classPool: 'sentinel',
    type: 'skill',
    rarity: 'uncommon',
    cost: 2,
    description: 'Gain 18 Block. Retain Block into next turn.',
    upgradedDescription: 'Gain 24 Block. Retain Block into next turn.',
    effect: { block: 18, retainBlock: true },
    upgradedEffect: { block: 24, retainBlock: true }
  },
  {
    id: 'sn-ddos-reflect',
    name: 'DDoS Network Protection',
    upgradedName: 'DDoS Network Protection+',
    azureTag: 'Adaptive L3/L4 Mitigation',
    classPool: 'sentinel',
    type: 'power',
    rarity: 'rare',
    cost: 2,
    description: 'Gain 10 Block, +3 Dexterity, and +5 Thorns.',
    upgradedDescription: 'Gain 14 Block, +4 Dexterity, and +7 Thorns.',
    effect: { block: 10, gainDexterity: 3, gainThorns: 5 },
    upgradedEffect: { block: 14, gainDexterity: 4, gainThorns: 7 }
  },
  {
    id: 'sn-ddos-crush',
    name: 'Zero-Trust Enforcer',
    upgradedName: 'Zero-Trust Enforcer+',
    azureTag: 'Verify Explicitly',
    classPool: 'sentinel',
    type: 'attack',
    rarity: 'uncommon',
    cost: 2,
    description: 'Gain 8 Block, then deal damage equal to your Block + 6.',
    upgradedDescription: 'Gain 12 Block, then deal damage equal to your Block + 8.',
    effect: { block: 8, damage: 6, scaleWithBlock: true },
    upgradedEffect: { block: 12, damage: 8, scaleWithBlock: true }
  },
  {
    id: 'st-aks-surge',
    name: 'AKS Cluster Autoscaler',
    upgradedName: 'AKS Cluster Autoscaler+',
    azureTag: 'Node Pool Burst',
    classPool: 'striker',
    type: 'attack',
    rarity: 'uncommon',
    cost: 1,
    description: 'Deal 3 damage 3 times. Scales +1 per Streak.',
    upgradedDescription: 'Deal 4 damage 4 times. Scales +1 per Streak.',
    effect: { damage: 3, hits: 3, scaleWithStreak: 1 },
    upgradedEffect: { damage: 4, hits: 4, scaleWithStreak: 1 }
  },
  {
    id: 'st-func-chain',
    name: 'Durable Function Fan-Out',
    upgradedName: 'Durable Function Fan-Out+',
    azureTag: 'Serverless Orchestrator',
    classPool: 'striker',
    type: 'attack',
    rarity: 'common',
    cost: 1,
    description: 'Deal 6 damage. Gain 1 Energy if on a Streak, Draw 1 card.',
    upgradedDescription: 'Deal 9 damage. Gain 1 Energy, Draw 2 cards.',
    effect: { damage: 6, gainEnergy: 1, draw: 1 },
    upgradedEffect: { damage: 9, gainEnergy: 1, draw: 2 }
  },
  {
    id: 'st-ultra-disk',
    name: 'Ultra Disk IOPS Overdrive',
    upgradedName: 'Ultra Disk IOPS Overdrive+',
    azureTag: 'Sub-ms 160K IOPS',
    classPool: 'striker',
    type: 'power',
    rarity: 'rare',
    cost: 2,
    description: 'Gain +4 Strength and draw 2 cards immediately.',
    upgradedDescription: 'Gain +6 Strength and draw 3 cards immediately.',
    effect: { gainStrength: 4, draw: 2 },
    upgradedEffect: { gainStrength: 6, draw: 3 }
  },

  // === ULTIMATE / RARE CARDS (TRIGGER HIGH-TIER CHALLENGE FOR MASSIVE PAYOFF!) ===
  {
    id: 'ult-cosmos-global',
    name: 'Cosmos Multi-Region Write',
    upgradedName: 'Cosmos Multi-Region Write+',
    azureTag: '99.999% Turnkey Global',
    classPool: 'neutral',
    type: 'ultimate',
    rarity: 'rare',
    cost: 2,
    description: 'ULTIMATE: Answer an Elite Scenario for 1.5x power! Deal 22 damage & apply 3 Vulnerable.',
    upgradedDescription: 'ULTIMATE: Answer an Elite Scenario for 1.5x power! Deal 28 damage & apply 4 Vulnerable.',
    effect: { damage: 22, applyVulnerable: 3, requiresEliteQuestion: true },
    upgradedEffect: { damage: 28, applyVulnerable: 4, requiresEliteQuestion: true }
  },
  {
    id: 'ult-site-recovery',
    name: 'ASR Failover Protocol',
    upgradedName: 'ASR Failover Protocol+',
    azureTag: 'Cross-Region DR Cutover',
    classPool: 'neutral',
    type: 'ultimate',
    rarity: 'rare',
    cost: 2,
    description: 'ULTIMATE: Answer an Elite Scenario for 1.5x power! Gain 20 Block, heal 7 HP, draw 2.',
    upgradedDescription: 'ULTIMATE: Answer an Elite Scenario for 1.5x power! Gain 26 Block, heal 10 HP, draw 3.',
    effect: { block: 20, heal: 7, draw: 2, requiresEliteQuestion: true },
    upgradedEffect: { block: 26, heal: 10, draw: 3, requiresEliteQuestion: true }
  },
  {
    id: 'ult-arc-dominion',
    name: 'Azure Arc Multi-Cloud Storm',
    upgradedName: 'Azure Arc Multi-Cloud Storm+',
    azureTag: 'Hybrid Control Plane',
    classPool: 'neutral',
    type: 'ultimate',
    rarity: 'rare',
    cost: 3,
    description: 'ULTIMATE: Answer an Elite Scenario for 1.5x power! Hit 4 times for 8 damage + 8 Burn.',
    upgradedDescription: 'ULTIMATE: Answer an Elite Scenario for 1.5x power! Hit 4 times for 11 damage + 12 Burn.',
    effect: { damage: 8, hits: 4, applyBurn: 8, requiresEliteQuestion: true },
    upgradedEffect: { damage: 11, hits: 4, applyBurn: 12, requiresEliteQuestion: true }
  }
];

export const ALL_RELICS: Relic[] = [
  {
    id: 'relic-aws-badge',
    name: 'AWS SAA Rosetta Chip',
    azureService: 'Cross-Cloud Experience',
    rarity: 'starter',
    description: 'Start each Act with +1 AWS Bridge Hint charge and heal 5 HP after every Elite victory.',
    icon: 'Cpu'
  },
  {
    id: 'relic-defender-shield',
    name: 'Defender CSPM Core',
    azureService: 'Microsoft Defender for Cloud',
    rarity: 'starter',
    description: 'Start every combat with 8 Block and 2 Thorns.',
    icon: 'Shield'
  },
  {
    id: 'relic-keda-scaler',
    name: 'KEDA Burst Capacitor',
    azureService: 'Azure Container Apps',
    rarity: 'starter',
    description: 'On Turn 1 of every combat, gain +1 bonus Energy and draw +1 extra card.',
    icon: 'Zap'
  },
  {
    id: 'relic-ms-learn',
    name: 'Open-Book MS Learn Tab',
    azureService: 'Exam Role-Based Perk',
    rarity: 'common',
    description: 'Wrong answers still grant 3 Energy instead of 2 Energy (mitigating mistakes!).',
    icon: 'BookOpen'
  },
  {
    id: 'relic-az-trio',
    name: 'Availability Zone Trio',
    azureService: '3 Separate Datacenters',
    rarity: 'common',
    description: 'Every 3rd streak step grants +6 automatic Block at the start of your card phase.',
    icon: 'Layers'
  },
  {
    id: 'relic-reserved-3yr',
    name: '3-Year Reserved Instance',
    azureService: 'Up to 72% Compute Savings',
    rarity: 'common',
    description: 'All Cloud Marketplace shop items and card removals cost 25% less Gold.',
    icon: 'Coins'
  },
  {
    id: 'relic-hybrid-benefit',
    name: 'Azure Hybrid Benefit',
    azureService: 'BYOL Windows & SQL Server',
    rarity: 'common',
    description: 'Gain +18 Gold after every combat victory.',
    icon: 'Award'
  },
  {
    id: 'relic-expressroute-direct',
    name: 'ExpressRoute Direct 100G',
    azureService: 'Dedicated Fiber Port',
    rarity: 'rare',
    description: 'Fast & Correct answers (<12s) grant +2 temporary Strength for that combat!',
    icon: 'Activity'
  },
  {
    id: 'relic-soft-delete',
    name: '14-Day Soft Delete Vault',
    azureService: 'Recovery Services Vault',
    rarity: 'rare',
    description: 'Once per run, if fatal damage would drop you to 0 HP, survive and restore 30% Max HP!',
    icon: 'RefreshCw'
  },
  {
    id: 'relic-keyvault-hsm',
    name: 'Managed HSM Enclave',
    azureService: 'Azure Key Vault',
    rarity: 'common',
    description: 'Gain +4 Block at the end of your turn if you have unspent Energy.',
    icon: 'Lock'
  },
  {
    id: 'relic-autoscale-profile',
    name: 'Predictive Autoscale',
    azureService: 'Azure Monitor Autoscale',
    rarity: 'rare',
    description: 'Draw 6 cards per turn instead of 5.',
    icon: 'TrendingUp'
  },
  {
    id: 'relic-global-admin-pim',
    name: 'Zero-Standing Privilege Crown',
    azureService: 'Entra ID Governance P2',
    rarity: 'boss',
    description: 'BOSS RELIC: Gain +1 Base Energy every turn (wrong=3, right=4, fast=5!).',
    icon: 'Crown'
  },
  {
    id: 'relic-purview-map',
    name: 'Purview Lineage Scanner',
    azureService: 'Microsoft Purview',
    rarity: 'boss',
    description: 'BOSS RELIC: Start every combat by applying 2 Vulnerable and 2 Weak to the enemy.',
    icon: 'Radar'
  }
];

export const ENEMY_TEMPLATES: EnemyTemplate[] = [
  // Normal Enemies
  {
    id: 'en-shadow-it',
    name: 'Shadow IT Rogue VM',
    subtitle: 'Untagged Pay-As-You-Go Sprawl',
    tier: 'normal',
    maxHp: 42,
    intents: [
      { type: 'attack', value: 8, label: 'Unbudgeted Spin-Up' },
      { type: 'attack-defend', value: 6, secondaryValue: 6, label: 'Orphaned NIC Shield' },
      { type: 'attack', value: 11, label: 'Bill Shock' }
    ]
  },
  {
    id: 'en-egress-leech',
    name: 'Cross-Region Egress Leech',
    subtitle: 'Outbound Bandwidth Drain',
    tier: 'normal',
    maxHp: 46,
    intents: [
      { type: 'multi-attack', value: 4, hits: 2, label: 'Packet Drain x2' },
      { type: 'buff', value: 2, label: 'Traffic Spike (+2 Str)' },
      { type: 'attack', value: 10, label: 'Inter-Region Transfer' }
    ]
  },
  {
    id: 'en-public-blob',
    name: 'Anonymous Blob Leak',
    subtitle: 'Misconfigured Public Container',
    tier: 'normal',
    maxHp: 48,
    intents: [
      { type: 'debuff', value: 2, label: 'Data Exposure (Weak)' },
      { type: 'attack', value: 10, label: 'Credential Scrape' },
      { type: 'attack-defend', value: 8, secondaryValue: 7, label: 'Exfiltrate' }
    ]
  },
  {
    id: 'en-cidr-collision',
    name: 'Overlapping CIDR Phantom',
    subtitle: '10.0.0.0/16 Peering Conflict',
    tier: 'normal',
    maxHp: 54,
    intents: [
      { type: 'attack', value: 9, label: 'Packet Drop' },
      { type: 'defend', value: 10, label: 'Blackhole Route' },
      { type: 'attack', value: 13, label: 'Asymmetric Routing' }
    ]
  },
  {
    id: 'en-snat-exhaust',
    name: 'SNAT Port Exhaustion Swarm',
    subtitle: 'Outbound Connection Timeout',
    tier: 'normal',
    maxHp: 58,
    intents: [
      { type: 'multi-attack', value: 4, hits: 3, label: 'Ephemeral Flood x3' },
      { type: 'attack-defend', value: 9, secondaryValue: 6, label: 'Socket Lock' }
    ]
  },
  {
    id: 'en-stale-admin',
    name: 'Overprivileged Owner Bot',
    subtitle: 'Standing Subscription Root Access',
    tier: 'normal',
    maxHp: 62,
    intents: [
      { type: 'buff', value: 3, label: 'Privilege Creep (+3 Str)' },
      { type: 'attack', value: 12, label: 'Wildcard * Action' },
      { type: 'attack', value: 14, label: 'Delete Resource Group' }
    ]
  },

  // Elite Enemies
  {
    id: 'el-ddos-leviathan',
    name: 'Volumetric DDoS Leviathan',
    subtitle: 'ELITE • Multi-Vector L4/L7 Flood',
    tier: 'elite',
    maxHp: 84,
    intents: [
      { type: 'multi-attack', value: 5, hits: 3, label: 'SYN Flood x3' },
      { type: 'buff', value: 3, label: 'Botnet Amplify (+3 Str)' },
      { type: 'attack-defend', value: 14, secondaryValue: 10, label: 'HTTP Cache Bypass' }
    ]
  },
  {
    id: 'el-split-brain',
    name: 'Split-Brain Quorum Sentinel',
    subtitle: 'ELITE • Single-Zone Outage Cascade',
    tier: 'elite',
    maxHp: 90,
    intents: [
      { type: 'attack', value: 15, label: 'Zone 1 Power Loss' },
      { type: 'debuff', value: 2, label: 'Quorum Desync (Weak)' },
      { type: 'multi-attack', value: 8, hits: 2, label: 'Dual Write Conflict x2' }
    ]
  },
  {
    id: 'el-complete-arm',
    name: 'Complete-Mode Destroyer',
    subtitle: 'ELITE • Destructive IaC Rollout',
    tier: 'elite',
    maxHp: 96,
    intents: [
      { type: 'charge-boss', value: 12, label: 'Scanning Unlisted Resources...' },
      { type: 'attack', value: 20, label: 'Purge Unlisted Resources!' },
      { type: 'attack-defend', value: 12, secondaryValue: 12, label: 'State Lock' }
    ]
  },

  // Case Study Bosses
  {
    id: 'boss-capex-cfo',
    name: 'The Skeptical CFO',
    subtitle: 'ACT 1 CASE STUDY BOSS • Cloud Economics & Shared Responsibility',
    tier: 'boss',
    act: 1,
    maxHp: 120,
    bossCaseStudyIntro: 'CASE STUDY: Your board challenges the AWS-to-Azure migration budget, questioning OpEx predictability, CapEx hardware write-offs, and who is legally liable for customer data in PaaS.',
    intents: [
      { type: 'attack-defend', value: 11, secondaryValue: 10, label: 'Freeze OpEx Budget' },
      { type: 'buff', value: 3, label: 'Audit Escalation (+3 Str)' },
      { type: 'attack', value: 18, label: 'Mandate On-Prem CapEx' },
      { type: 'multi-attack', value: 7, hits: 2, label: 'Compliance Grill x2' }
    ]
  },
  {
    id: 'boss-monolith-cutover',
    name: 'The Legacy Monolith',
    subtitle: 'ACT 2 CASE STUDY BOSS • Core Compute, Storage & VNet Cutover',
    tier: 'boss',
    act: 2,
    maxHp: 142,
    bossCaseStudyIntro: 'CASE STUDY: A tightly coupled ECS + DynamoDB + S3 workload is mid-cutover to Azure Container Apps, Cosmos DB, and GZRS Blob Storage as peak European traffic hits.',
    intents: [
      { type: 'multi-attack', value: 6, hits: 3, label: 'Traffic Surge x3' },
      { type: 'defend', value: 16, label: 'Hardcoded IP Coupling' },
      { type: 'attack', value: 21, label: 'Single-Point Failover Test' },
      { type: 'buff', value: 3, label: 'Latency Cascade (+3 Str)' }
    ]
  },
  {
    id: 'boss-audit-inquisitor',
    name: 'The Governance Inquisitor',
    subtitle: 'ACT 3 CASE STUDY BOSS • Policy, Locks, Cost & Composite SLAs',
    tier: 'boss',
    act: 3,
    maxHp: 165,
    bossCaseStudyIntro: 'CASE STUDY: External regulators demand proof of EU data residency via Azure Policy, non-deletable production vaults, accurate composite SLAs, and zero-trust Entra controls.',
    intents: [
      { type: 'debuff', value: 2, label: 'ReadOnly Lock Trap (Weak)' },
      { type: 'attack-defend', value: 15, secondaryValue: 14, label: 'Non-Compliant Audit' },
      { type: 'attack', value: 24, label: 'SLA Breach Penalty!' },
      { type: 'buff', value: 4, label: 'Regulatory Pressure (+4 Str)' }
    ]
  },
  {
    id: 'boss-bgp-hijacker',
    name: 'Transitive Routing Phantom',
    subtitle: 'ACT 4 CASE STUDY BOSS • Hub-Spoke VNet, UDRs & Private Link',
    tier: 'boss',
    act: 4,
    maxHp: 180,
    bossCaseStudyIntro: 'CASE STUDY: Spoke-A cannot reach Spoke-B through your Hub NVA firewall, Private Endpoints are resolving to public IPs, and ExpressRoute failover is flapping.',
    intents: [
      { type: 'multi-attack', value: 8, hits: 3, label: 'Dropped Peering Hops x3' },
      { type: 'attack-defend', value: 16, secondaryValue: 16, label: 'DNS Poison Cache' },
      { type: 'attack', value: 25, label: 'Blackhole 0.0.0.0/0!' }
    ]
  },
  {
    id: 'boss-region-blackout',
    name: 'West Europe Blackout',
    subtitle: 'ACT 5 FINAL CASE STUDY BOSS • Full DR, ASR, Monitor & Backup',
    tier: 'boss',
    act: 5,
    maxHp: 205,
    bossCaseStudyIntro: 'FINAL CASE STUDY: Primary region experiences a multi-zone fiber cut. Execute Azure Site Recovery plans, KQL root-cause triage, and RA-GRS vault restores before SLA hits zero.',
    intents: [
      { type: 'attack', value: 20, label: 'Primary Region Offline' },
      { type: 'buff', value: 4, label: 'RPO Timer Ticking (+4 Str)' },
      { type: 'multi-attack', value: 9, hits: 3, label: 'Cascading Alert Storm x3' },
      { type: 'attack-defend', value: 26, secondaryValue: 18, label: 'Total Outage Pulse!' }
    ]
  }
];

export const CLOUD_INCIDENTS: CloudIncident[] = [
  {
    id: 'inc-readonly-lock',
    title: 'Midnight ReadOnly Lock Incident',
    awsContext: 'An engineer migrating from AWS SCPs applied a ReadOnly Resource Lock to the entire production Resource Group.',
    description: 'Now your web app cannot list Storage Account keys and deallocated VMs refuse to start! How do you resolve it cleanly?',
    choices: [
      {
        label: 'Swap ReadOnly Lock for CanNotDelete Lock & switch app to Managed Identity RBAC',
        azureAction: 'Best Practice Architecture',
        outcomeText: 'Clean fix! CanNotDelete protects against accidental deletion while allowing normal operations—upgrade a random card & gain +35 Gold.',
        goldDelta: 35,
        upgradeRandomCard: true
      },
      {
        label: 'Remove all locks permanently to unblock deployment speed',
        azureAction: 'Fast but Risky',
        outcomeText: 'Deployment succeeds fast (+65 Gold), though an intern later deletes a test subnet (-8 HP).',
        goldDelta: 65,
        hpDelta: -8
      }
    ]
  },
  {
    id: 'inc-ecs-migration',
    title: 'ECS + DynamoDB Microservice Cutover',
    awsContext: 'Your team wants to lift your containerized microservice + key-value session cache into Azure without managing Kubernetes control planes.',
    description: 'You have 48 hours before the Lisbon flight demo. Which architecture blueprint do you approve?',
    choices: [
      {
        label: 'Azure Container Apps (KEDA) + Cosmos DB Serverless',
        azureAction: 'Managed Serverless PaaS',
        outcomeText: 'Zero K8s node maintenance and single-digit ms reads! Restore +14 HP and gain +1 AWS Hint Charge.',
        hpDelta: 14,
        hintDelta: 1
      },
      {
        label: 'Multi-zone AKS Cluster +Cosmos DB Autoscale + Relic Grant',
        azureAction: 'Full Enterprise Control (-10 HP effort)',
        outcomeText: 'Long night configuring Azure CNI (-10 HP), but your cluster yields a rare architectural Relic!',
        hpDelta: -10,
        gainRelic: true
      }
    ]
  },
  {
    id: 'inc-archive-rehydrate',
    title: 'Compliance Audit Demands Archived Logs',
    awsContext: 'Auditors ask for 3-year-old blobs sitting in the Azure Archive Access Tier (like S3 Deep Glacier) within 2 hours.',
    description: 'Standard rehydration takes up to 15 hours. What do you authorize?',
    choices: [
      {
        label: 'Trigger High-Priority Rehydration to Hot Tier (<1 hr for <10 GB objects)',
        azureAction: 'Pay Egress/Read Premium (-25 Gold)',
        outcomeText: 'Blobs rehydrate in 42 minutes! Auditors applaud—upgrade a random card & gain +6 Max HP.',
        goldDelta: -25,
        maxHpDelta: 6,
        upgradeRandomCard: true
      },
      {
        label: 'Use Standard Rehydration and negotiate audit window extension',
        azureAction: 'Cost-Conscious (+45 Gold)',
        outcomeText: 'Saved high-priority retrieval fees (+45 Gold) and gained +1 Hint Charge.',
        goldDelta: 45,
        hintDelta: 1
      }
    ]
  },
  {
    id: 'inc-tag-inheritance',
    title: 'Missing Cost-Center Tags on 400 Resources',
    awsContext: 'Finance tagged the Production Resource Group with CostCenter=FinTech, assuming child resources inherit tags automatically.',
    description: 'In Azure, tags do NOT inherit automatically from Resource Groups! Monthly billing attribution is blank.',
    choices: [
      {
        label: 'Assign built-in "Inherit a tag from the resource group" Modify Policy + Remediation Task',
        azureAction: 'Automated Governance',
        outcomeText: 'Managed Identity backfills all 400 existing resources automatically! Gain +50 Gold and heal +10 HP.',
        goldDelta: 50,
        hpDelta: 10
      },
      {
        label: 'Write a quick Az PowerShell loop & bank overtime bounty',
        azureAction: 'Manual Script (-6 HP)',
        outcomeText: 'Fixed existing resources (-6 HP fatigue), earning +75 Gold.',
        hpDelta: -6,
        goldDelta: 75
      }
    ]
  },
  {
    id: 'inc-peering-transitive',
    title: 'Broken Spoke-to-Spoke VNet Connectivity',
    awsContext: 'VNet-A is peered to VNet-Hub, and VNet-Hub is peered to VNet-B, but VNet-A cannot ping VNet-B.',
    description: 'Remember: VNet Peering is non-transitive! How do you wire the production hub?',
    choices: [
      {
        label: 'Deploy Azure Firewall / NVA in Hub + UDRs + "Allow Forwarded Traffic"',
        azureAction: 'Hub-and-Spoke Reference Architecture',
        outcomeText: 'Centralized inspection AND spoke-to-spoke routing online! Upgrade a random card & heal +8 HP.',
        hpDelta: 8,
        upgradeRandomCard: true
      },
      {
        label: 'Create direct mesh VNet Peering between VNet-A and VNet-B',
        azureAction: 'Low-Latency Direct Link',
        outcomeText: 'Instant full-bandwidth link with zero NVA hop! Gain +40 Gold and +1 AWS Hint Charge.',
        goldDelta: 40,
        hintDelta: 1
      }
    ]
  }
];
