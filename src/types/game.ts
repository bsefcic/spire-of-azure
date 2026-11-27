import { DomainId, ExamQuestion, ExamTrack } from './curriculum';

export type ArchitectClassId = 'vanguard' | 'sentinel' | 'striker';

export type CardType = 'attack' | 'skill' | 'power' | 'ultimate';
export type CardRarity = 'starter' | 'common' | 'uncommon' | 'rare';

export interface CardEffect {
  damage?: number;
  hits?: number; // Multi-hit (default 1)
  block?: number;
  draw?: number;
  gainEnergy?: number;
  applyVulnerable?: number; // Enemy takes +50% dmg
  applyWeak?: number;       // Enemy deals -25% dmg
  applyBurn?: number;       // DoT at end of enemy turn
  gainThorns?: number;      // Reflect dmg when hit
  retainBlock?: boolean;    // Keep block next turn
  heal?: number;
  scaleWithStreak?: number; // Extra dmg/block per current streak count
  scaleWithBlock?: boolean; // Body-slam style: deal dmg equal to current block
  gainStrength?: number;    // Permanent +dmg this combat
  gainDexterity?: number;   // Permanent +block this combat
  requiresEliteQuestion?: boolean; // Ultimate cards trigger a bonus high-tier question for 1.5x effect!
}

export interface GameCard {
  id: string;
  uid?: string; // Unique instance ID inside a deck
  name: string;
  azureTag: string; // e.g., "NSG Rule", "AKS Autoscale", "Entra PIM"
  classPool: ArchitectClassId | 'neutral';
  type: CardType;
  rarity: CardRarity;
  cost: number;
  description: string;
  upgraded?: boolean;
  upgradedName?: string;
  upgradedCost?: number;
  upgradedDescription?: string;
  effect: CardEffect;
  upgradedEffect: CardEffect;
}

export interface Relic {
  id: string;
  name: string;
  azureService: string;
  rarity: 'starter' | 'common' | 'rare' | 'boss';
  description: string;
  icon: string;
}

export type EnemyIntentType = 'attack' | 'multi-attack' | 'defend' | 'buff' | 'debuff' | 'attack-defend' | 'charge-boss';

export interface EnemyIntent {
  type: EnemyIntentType;
  value?: number;
  hits?: number;
  secondaryValue?: number;
  label: string;
}

export interface EnemyTemplate {
  id: string;
  name: string;
  subtitle: string;
  tier: 'normal' | 'elite' | 'boss';
  track?: ExamTrack | 'both' | 'cloud';
  act?: number;
  maxHp: number;
  intents: EnemyIntent[];
  bossCaseStudyIntro?: string;
}

export interface ActiveEnemy {
  templateId: string;
  name: string;
  subtitle: string;
  tier: 'normal' | 'elite' | 'boss';
  hp: number;
  maxHp: number;
  block: number;
  strength: number;
  vulnerable: number;
  weak: number;
  burn: number;
  intentIndex: number;
  currentIntent: EnemyIntent;
  phase?: number;
}

export type MapNodeType = 'combat' | 'elite' | 'rest' | 'shop' | 'incident' | 'boss';

export interface MapNode {
  id: string;
  floor: number;
  col: number;
  type: MapNodeType;
  nextIds: string[];
  completed: boolean;
}

export interface IncidentChoice {
  label: string;
  azureAction: string;
  outcomeText: string;
  hpDelta?: number;
  maxHpDelta?: number;
  goldDelta?: number;
  hintDelta?: number;
  gainRelic?: boolean;
  upgradeRandomCard?: boolean;
}

export interface CloudIncident {
  id: string;
  trackGroup?: 'cloud' | 'aipm';
  title: string;
  awsContext: string;
  description: string;
  choices: IncidentChoice[];
}

export interface CombatState {
  enemy: ActiveEnemy;
  turn: number;
  phase: 'question' | 'feedback' | 'action' | 'victory' | 'defeat';
  energy: number;
  maxEnergy: number;
  playerBlock: number;
  playerStrength: number;
  playerDexterity: number;
  playerThorns: number;
  retainBlockTurns: number;
  drawPile: GameCard[];
  hand: GameCard[];
  discardPile: GameCard[];
  exhaustPile: GameCard[];
  activeQuestion: ExamQuestion | null;
  questionStartedAt: number;
  usedHintThisTurn: boolean;
  lastAnswerCorrect: boolean | null;
  lastAnswerFast: boolean;
  lastEnergyAwarded: number;
  pendingEliteCardUid?: string | null;
  combatLog: string[];
}

export interface ActiveRun {
  seed: number;
  track: ExamTrack | 'mixed';
  classId: ArchitectClassId;
  ascension: number; // 0 = 99.0% SLA .. 5 = 99.999% SLA
  act: 1 | 2 | 3 | 4 | 5 | 6;
  totalActs: 3 | 5 | 6;
  hp: number;
  maxHp: number;
  gold: number;
  hintCharges: number;
  streak: number;
  bestStreak: number;
  questionsAnswered: number;
  questionsCorrect: number;
  deck: GameCard[];
  relicIds: string[];
  map: MapNode[];
  currentNodeId: string | null;
  floor: number;
  briefingSeenForAct: number[];
  combat: CombatState | null;
  activeIncident: CloudIncident | null;
  rewardCards: GameCard[] | null;
  rewardRelicId: string | null;
  rewardGold: number;
  shopCards?: { card: GameCard; price: number; sold?: boolean }[];
  shopRelics?: { relicId: string; price: number; sold?: boolean }[];
  cardRemoveUsedInShop?: boolean;
}

export interface QuestionMasteryRecord {
  questionId: string;
  seen: number;
  correct: number;
  wrong: number;
  consecutiveCorrect: number;
  stabilityDays: number;
  nextDueAt: number; // timestamp ms
  lastSeenAt: number;
  flagged: boolean;
  avgResponseMs: number;
}

export interface MockExamAttempt {
  id: string;
  track: ExamTrack;
  completedAt: number;
  scaledScore: number; // 0 - 1000 (700 = Pass)
  passed: boolean;
  correctCount: number;
  totalCount: number;
  durationSec: number;
  domainScores: Record<string, { correct: number; total: number }>;
}

export interface MetaUpgradeLevels {
  hullPlating: number;     // +4 Max HP per level (max 5)
  startingCache: number;   // +35 Starting Gold per level (max 4)
  awsTranslator: number;   // +1 Starting AWS Hint Charge per run (max 3)
  slaBuffer: number;       // Heal +5 extra HP after Bosses (max 3)
  cardRarityBoost: number; // Higher uncommon/rare draft chance (max 3)
}

export interface PlayerSaveProfile {
  schemaVersion: number;
  createdAt: number;
  updatedAt: number;
  selectedTrack: ExamTrack;
  selectedClass: ArchitectClassId;
  selectedAscension: number;
  unlockedClasses: ArchitectClassId[];
  highestAscensionUnlocked: Record<ExamTrack, number>;
  migrationCredits: number;
  totalPlayTimeSec: number;
  runsCompleted: number;
  runsWon: number;
  soundMuted: boolean;
  autoShowExplanationOnCorrect: boolean;
  metaUpgrades: MetaUpgradeLevels;
  mastery: Record<string, QuestionMasteryRecord>;
  mockExams: MockExamAttempt[];
  activeRun: ActiveRun | null;
}
