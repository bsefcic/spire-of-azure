import { ExamQuestion, ExamTrack } from '../types/curriculum';
import {
  ActiveEnemy,
  ActiveRun,
  ArchitectClassId,
  CombatState,
  GameCard,
  MapNode,
  MapNodeType,
  PlayerSaveProfile,
  QuestionMasteryRecord
} from '../types/game';
import {
  ALL_CARDS,
  ALL_RELICS,
  ARCHITECT_CLASSES,
  CLOUD_INCIDENTS,
  ENEMY_TEMPLATES
} from '../data/gameContent';
import { pickNextQuestion } from './fsrs';

let uidCounter = 1;
export function makeUid(prefix = 'card'): string {
  uidCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${uidCounter}`;
}

export function cloneCardInstance(cardId: string, upgraded = false): GameCard {
  const base = ALL_CARDS.find((c) => c.id === cardId) || ALL_CARDS[0];
  return {
    ...base,
    uid: makeUid(cardId),
    upgraded
  };
}

export function getEffectiveCardStats(card: GameCard) {
  const isUp = Boolean(card.upgraded);
  return {
    name: isUp && card.upgradedName ? card.upgradedName : card.name,
    cost: isUp && card.upgradedCost !== undefined ? card.upgradedCost : card.cost,
    description: isUp && card.upgradedDescription ? card.upgradedDescription : card.description,
    effect: isUp ? card.upgradedEffect : card.effect
  };
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateActMap(act: number): MapNode[] {
  // 7 playable floors per Act (Floors 0..5 branching, Floor 6 = Act Case Study Boss)
  const nodes: MapNode[] = [];
  const floorCols: number[][] = [
    [0, 1, 2],    // Floor 0: Entry combats
    [0, 1, 2],    // Floor 1: Combat / Incident
    [0, 1, 2],    // Floor 2: Elite / Shop / Combat
    [0, 1, 2],    // Floor 3: Rest / Incident / Combat
    [0, 1, 2],    // Floor 4: Elite / Shop / Combat
    [1],          // Floor 5: Guaranteed Pre-Boss Refactor Rest Site!
    [1]           // Floor 6: Act Case Study Boss!
  ];

  const pickNodeType = (floor: number, col: number): MapNodeType => {
    if (floor === 0) return 'combat';
    if (floor === 5) return 'rest';
    if (floor === 6) return 'boss';
    if (floor === 2) {
      if (col === 0) return 'elite';
      if (col === 2) return 'shop';
      return 'combat';
    }
    if (floor === 3) {
      if (col === 1) return 'incident';
      if (col === 0) return 'rest';
      return 'combat';
    }
    if (floor === 4) {
      if (col === 2) return 'elite';
      if (col === 0) return 'shop';
      return Math.random() < 0.5 ? 'incident' : 'combat';
    }
    // Floor 1
    if (col === 1) return 'incident';
    return 'combat';
  };

  for (let f = 0; f < floorCols.length; f++) {
    for (const c of floorCols[f]) {
      nodes.push({
        id: `a${act}-f${f}-c${c}`,
        floor: f,
        col: c,
        type: pickNodeType(f, c),
        nextIds: [],
        completed: false
      });
    }
  }

  // Connect each node on floor f to adjacent columns on floor f+1
  for (let f = 0; f < floorCols.length - 1; f++) {
    const currFloorNodes = nodes.filter((n) => n.floor === f);
    const nextFloorNodes = nodes.filter((n) => n.floor === f + 1);

    for (const node of currFloorNodes) {
      const reachable = nextFloorNodes.filter((nx) => Math.abs(nx.col - node.col) <= 1);
      const targets = reachable.length > 0 ? reachable : [nextFloorNodes[0]];
      node.nextIds = targets.map((t) => t.id);
    }

    // Ensure every next-floor node has at least one incoming parent
    for (const nx of nextFloorNodes) {
      const hasParent = currFloorNodes.some((cn) => cn.nextIds.includes(nx.id));
      if (!hasParent) {
        currFloorNodes[0].nextIds.push(nx.id);
      }
    }
  }

  return nodes;
}

export function createNewRun(
  profile: PlayerSaveProfile,
  track: ExamTrack | 'mixed',
  classId: ArchitectClassId,
  ascension: number
): ActiveRun {
  const cls = ARCHITECT_CLASSES.find((c) => c.id === classId) || ARCHITECT_CLASSES[0];
  const bonusHp = profile.metaUpgrades.hullPlating * 4;
  const maxHp = cls.maxHp + bonusHp;
  const gold = 80 + profile.metaUpgrades.startingCache * 35;
  const baseHints = 1 + profile.metaUpgrades.awsTranslator + (cls.starterRelicId === 'relic-aws-badge' ? 1 : 0);
  const totalActs: 3 | 5 = track === 'az-900' ? 3 : 5;

  const deck = cls.starterCardIds.map((cid) => cloneCardInstance(cid, false));

  return {
    seed: Date.now(),
    track,
    classId,
    ascension,
    act: 1,
    totalActs,
    hp: maxHp,
    maxHp,
    gold,
    hintCharges: baseHints,
    streak: 0,
    bestStreak: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    deck,
    relicIds: [cls.starterRelicId],
    map: generateActMap(1),
    currentNodeId: null,
    floor: 0,
    briefingSeenForAct: [],
    combat: null,
    activeIncident: null,
    rewardCards: null,
    rewardRelicId: null,
    rewardGold: 0
  };
}

export function spawnEnemyForNode(run: ActiveRun, tier: 'normal' | 'elite' | 'boss'): ActiveEnemy {
  let candidates = ENEMY_TEMPLATES.filter((e) => e.tier === tier);
  if (tier === 'boss') {
    const actBoss = candidates.find((b) => b.act === run.act);
    if (actBoss) candidates = [actBoss];
  }
  const template = candidates[Math.floor(Math.random() * candidates.length)] || ENEMY_TEMPLATES[0];

  // Scale HP moderately by Act and SLA Ascension
  const actScale = 1 + (run.act - 1) * 0.22;
  const ascHpScale = 1 + (run.ascension >= 1 ? 0.12 : 0) + (run.ascension >= 3 ? 0.16 : 0);
  const scaledHp = Math.round(template.maxHp * actScale * ascHpScale);

  const startingStrength =
    (run.act >= 3 && tier !== 'normal' ? 1 : 0) +
    (run.ascension >= 5 && tier === 'boss' ? 2 : 0);

  return {
    templateId: template.id,
    name: template.name,
    subtitle: template.subtitle,
    tier: template.tier,
    hp: scaledHp,
    maxHp: scaledHp,
    block: run.ascension >= 5 && tier === 'boss' ? 15 : 0,
    strength: startingStrength,
    vulnerable: 0,
    weak: 0,
    burn: 0,
    intentIndex: 0,
    currentIntent: template.intents[0],
    phase: 1
  };
}

export function startCombatOnRun(
  run: ActiveRun,
  tier: 'normal' | 'elite' | 'boss',
  questionPool: ExamQuestion[],
  mastery: Record<string, QuestionMasteryRecord>,
  recentQuestionIds: string[]
): ActiveRun {
  const enemy = spawnEnemyForNode(run, tier);
  const hasDefender = run.relicIds.includes('relic-defender-shield');
  const hasPurview = run.relicIds.includes('relic-purview-map');

  if (hasPurview) {
    enemy.vulnerable = 2;
    enemy.weak = 2;
  }

  const preferMulti = tier !== 'normal' || run.ascension >= 2;
  const minDiff = tier === 'boss' ? 2 : run.ascension >= 4 ? 2 : 1;

  const firstQuestion = pickNextQuestion({
    pool: questionPool,
    mastery,
    track: run.track,
    act: run.act,
    minDifficulty: minDiff,
    preferMultiFormat: preferMulti,
    recentIds: recentQuestionIds
  });

  const shuffledDeck = shuffle(run.deck.map((c) => ({ ...c })));

  const combat: CombatState = {
    enemy,
    turn: 1,
    phase: 'question',
    energy: 0,
    maxEnergy: 4,
    playerBlock: hasDefender ? 8 : 0,
    playerStrength: 0,
    playerDexterity: 0,
    playerThorns: hasDefender ? 2 : 0,
    retainBlockTurns: 0,
    drawPile: shuffledDeck,
    hand: [],
    discardPile: [],
    exhaustPile: [],
    activeQuestion: firstQuestion,
    questionStartedAt: Date.now(),
    usedHintThisTurn: false,
    lastAnswerCorrect: null,
    lastAnswerFast: false,
    lastEnergyAwarded: 0,
    pendingEliteCardUid: null,
    combatLog: [`Encountered ${enemy.name}!`]
  };

  return {
    ...run,
    combat
  };
}

export function drawCardsInCombat(combat: CombatState, count: number): CombatState {
  let drawPile = [...combat.drawPile];
  let discardPile = [...combat.discardPile];
  const hand = [...combat.hand];

  for (let i = 0; i < count; i++) {
    if (hand.length >= 9) break;
    if (drawPile.length === 0) {
      if (discardPile.length === 0) break;
      drawPile = shuffle(discardPile);
      discardPile = [];
    }
    const nextCard = drawPile.shift();
    if (nextCard) hand.push(nextCard);
  }

  return {
    ...combat,
    drawPile,
    discardPile,
    hand
  };
}

export function resolveTurnQuestion(
  run: ActiveRun,
  isCorrect: boolean,
  elapsedMs: number,
  autoAdvanceToAction: boolean
): ActiveRun {
  if (!run.combat) return run;
  let combat = { ...run.combat };

  // Check if this question was triggered by an Ultimate card mid-turn!
  if (combat.pendingEliteCardUid) {
    const uid = combat.pendingEliteCardUid;
    combat.pendingEliteCardUid = null;
    combat.lastAnswerCorrect = isCorrect;
    combat.lastAnswerFast = false;
    const multiplier = isCorrect ? 1.5 : 0.75;
    const updatedRun: ActiveRun = {
      ...run,
      streak: isCorrect ? run.streak + 1 : 0,
      bestStreak: isCorrect ? Math.max(run.bestStreak, run.streak + 1) : run.bestStreak,
      questionsAnswered: run.questionsAnswered + 1,
      questionsCorrect: run.questionsCorrect + (isCorrect ? 1 : 0),
      combat: {
        ...combat,
        phase: autoAdvanceToAction ? 'action' : 'feedback'
      }
    };
    return executeCardEffect(updatedRun, uid, multiplier, autoAdvanceToAction ? 'action' : 'feedback');
  }

  const fastThresholdMs = run.ascension >= 1 ? 10500 : 13000;
  const isFast = isCorrect && elapsedMs <= fastThresholdMs;

  const hasOpenBook = run.relicIds.includes('relic-ms-learn');
  const hasCrown = run.relicIds.includes('relic-global-admin-pim');
  const hasKeda = run.relicIds.includes('relic-keda-scaler') && combat.turn === 1;
  const hasExpressRoute = run.relicIds.includes('relic-expressroute-direct');
  const hasAzTrio = run.relicIds.includes('relic-az-trio');
  const hasAutoscale = run.relicIds.includes('relic-autoscale-profile');

  let energy = isCorrect ? (isFast ? 4 : 3) : (hasOpenBook ? 3 : 2);
  if (hasCrown) energy += 1;
  if (hasKeda) energy += 1;

  const newStreak = isCorrect ? run.streak + 1 : 0;
  const bestStreak = Math.max(run.bestStreak, newStreak);

  if (isFast && hasExpressRoute) {
    combat.playerStrength += 2;
    combat.combatLog = [...combat.combatLog.slice(-6), 'ExpressRoute 100G: +2 Strength from fast answer!'];
  }

  if (isCorrect && hasAzTrio && newStreak > 0 && newStreak % 3 === 0) {
    combat.playerBlock += 6;
    combat.combatLog = [...combat.combatLog.slice(-6), 'AZ Trio: +6 Block from 3x Streak!'];
  }

  // Draw cards for the turn if hand is empty (start of turn)
  const baseDraw = (hasAutoscale ? 6 : 5) + (hasKeda ? 1 : 0);
  if (combat.hand.length === 0) {
    combat = drawCardsInCombat(combat, baseDraw);
  }

  combat.energy = energy;
  combat.maxEnergy = Math.max(4, energy);
  combat.lastAnswerCorrect = isCorrect;
  combat.lastAnswerFast = isFast;
  combat.lastEnergyAwarded = energy;
  combat.phase = autoAdvanceToAction ? 'action' : 'feedback';

  return {
    ...run,
    streak: newStreak,
    bestStreak,
    questionsAnswered: run.questionsAnswered + 1,
    questionsCorrect: run.questionsCorrect + (isCorrect ? 1 : 0),
    combat
  };
}

export function playCardFromHand(
  run: ActiveRun,
  cardUid: string,
  questionPool: ExamQuestion[],
  mastery: Record<string, QuestionMasteryRecord>,
  recentQuestionIds: string[]
): ActiveRun {
  if (!run.combat || run.combat.phase !== 'action') return run;
  const card = run.combat.hand.find((c) => c.uid === cardUid);
  if (!card) return run;

  const stats = getEffectiveCardStats(card);
  if (run.combat.energy < stats.cost) return run;

  // Deduct cost first
  let combat: CombatState = {
    ...run.combat,
    energy: run.combat.energy - stats.cost
  };

  // If Ultimate card requires an Elite Question, pop the question modal!
  if (stats.effect.requiresEliteQuestion) {
    const eliteQ = pickNextQuestion({
      pool: questionPool,
      mastery,
      track: run.track,
      act: run.act,
      minDifficulty: 2,
      preferMultiFormat: true,
      recentIds: recentQuestionIds
    });

    combat.pendingEliteCardUid = cardUid;
    combat.activeQuestion = eliteQ;
    combat.questionStartedAt = Date.now();
    combat.usedHintThisTurn = false;
    combat.phase = 'question';

    return {
      ...run,
      combat
    };
  }

  return executeCardEffect({ ...run, combat }, cardUid, 1.0, 'action');
}

function executeCardEffect(
  run: ActiveRun,
  cardUid: string,
  powerMultiplier: number,
  postPhase: 'action' | 'feedback'
): ActiveRun {
  if (!run.combat) return run;
  let combat = { ...run.combat };
  const cardIdx = combat.hand.findIndex((c) => c.uid === cardUid);
  if (cardIdx === -1) return run;

  const card = combat.hand[cardIdx];
  const stats = getEffectiveCardStats(card);
  const eff = stats.effect;

  // Move card from hand -> discard (or exhaust if power)
  const newHand = [...combat.hand];
  newHand.splice(cardIdx, 1);
  combat.hand = newHand;
  if (card.type === 'power') {
    combat.exhaustPile = [...combat.exhaustPile, card];
  } else {
    combat.discardPile = [...combat.discardPile, card];
  }

  let hp = run.hp;
  const enemy = { ...combat.enemy };

  // 1. Gain Block first (important for Zero-Trust Enforcer which slams using Block!)
  if (eff.block) {
    const rawBlock = (eff.block + combat.playerDexterity) * powerMultiplier;
    combat.playerBlock += Math.max(0, Math.round(rawBlock));
  }

  if (eff.retainBlock) {
    combat.retainBlockTurns = Math.max(combat.retainBlockTurns, 1);
  }

  // 2. Buffs
  if (eff.gainStrength) combat.playerStrength += Math.round(eff.gainStrength * powerMultiplier);
  if (eff.gainDexterity) combat.playerDexterity += Math.round(eff.gainDexterity * powerMultiplier);
  if (eff.gainThorns) combat.playerThorns += Math.round(eff.gainThorns * powerMultiplier);
  if (eff.gainEnergy) combat.energy += eff.gainEnergy;
  if (eff.heal) hp = Math.min(run.maxHp, hp + Math.round(eff.heal * powerMultiplier));

  // 3. Damage calculation
  if (eff.damage !== undefined || eff.scaleWithBlock) {
    const hits = eff.hits || 1;
    for (let h = 0; h < hits; h++) {
      let baseDmg = (eff.damage || 0) + combat.playerStrength;
      if (eff.scaleWithStreak) {
        baseDmg += eff.scaleWithStreak * run.streak;
      }
      if (eff.scaleWithBlock) {
        baseDmg += combat.playerBlock;
      }
      baseDmg = baseDmg * powerMultiplier;
      if (enemy.vulnerable > 0) {
        baseDmg *= 1.5;
      }
      const finalDmg = Math.max(0, Math.round(baseDmg));

      if (enemy.block >= finalDmg) {
        enemy.block -= finalDmg;
      } else {
        const leftover = finalDmg - enemy.block;
        enemy.block = 0;
        enemy.hp = Math.max(0, enemy.hp - leftover);
      }
    }
  }

  // 4. Debuffs on enemy
  if (eff.applyVulnerable) enemy.vulnerable += Math.round(eff.applyVulnerable * powerMultiplier);
  if (eff.applyWeak) enemy.weak += Math.round(eff.applyWeak * powerMultiplier);
  if (eff.applyBurn) enemy.burn += Math.round(eff.applyBurn * powerMultiplier);

  combat.enemy = enemy;

  // 5. Card Draw
  if (eff.draw) {
    combat = drawCardsInCombat(combat, eff.draw);
  }

  // Check Victory!
  if (enemy.hp <= 0) {
    return handleCombatVictory({ ...run, hp, combat });
  }

  combat.phase = postPhase;
  return {
    ...run,
    hp,
    combat
  };
}

export function handleCombatVictory(run: ActiveRun, rarityBoostLevel = 0): ActiveRun {
  if (!run.combat) return run;
  const tier = run.combat.enemy.tier;
  const hasHybridBenefit = run.relicIds.includes('relic-hybrid-benefit');
  const hasAwsBadge = run.relicIds.includes('relic-aws-badge');

  let goldEarned = tier === 'boss' ? 95 : tier === 'elite' ? 55 : 28;
  goldEarned += Math.floor(Math.random() * 12);
  if (hasHybridBenefit) goldEarned += 18;

  let newHp = run.hp;
  if (tier === 'elite' && hasAwsBadge) {
    newHp = Math.min(run.maxHp, newHp + 5);
  }

  // Draft 3 reward cards matching class + neutral
  const eligiblePool = ALL_CARDS.filter(
    (c) => c.rarity !== 'starter' && (c.classPool === 'neutral' || c.classPool === run.classId)
  );
  const weightedPool: GameCard[] = [];
  for (const c of eligiblePool) {
    const weight =
      c.rarity === 'common'
        ? 5
        : c.rarity === 'uncommon'
          ? 3 + rarityBoostLevel
          : tier === 'boss'
            ? 5
            : 1 + rarityBoostLevel;
    for (let w = 0; w < weight; w++) weightedPool.push(c);
  }

  const rewardCards: GameCard[] = [];
  const pickedIds = new Set<string>();
  const shuffled = shuffle(weightedPool);
  for (const c of shuffled) {
    if (rewardCards.length >= 3) break;
    if (!pickedIds.has(c.id)) {
      pickedIds.add(c.id);
      rewardCards.push(cloneCardInstance(c.id, tier === 'boss' && Math.random() < 0.35));
    }
  }

  // Grant Relic on Elite or Boss victory!
  let rewardRelicId: string | null = null;
  if (tier === 'elite' || tier === 'boss') {
    const availableRelics = ALL_RELICS.filter(
      (r) =>
        !run.relicIds.includes(r.id) &&
        r.rarity !== 'starter' &&
        (tier === 'boss' ? r.rarity === 'boss' || r.rarity === 'rare' : r.rarity !== 'boss')
    );
    if (availableRelics.length > 0) {
      rewardRelicId = availableRelics[Math.floor(Math.random() * availableRelics.length)].id;
    }
  }

  return {
    ...run,
    hp: newHp,
    gold: run.gold + goldEarned,
    rewardGold: goldEarned,
    rewardCards,
    rewardRelicId,
    combat: {
      ...run.combat,
      phase: 'victory'
    }
  };
}

export function endPlayerTurn(
  run: ActiveRun,
  questionPool: ExamQuestion[],
  mastery: Record<string, QuestionMasteryRecord>,
  recentQuestionIds: string[]
): ActiveRun {
  if (!run.combat || run.combat.phase !== 'action') return run;
  let combat = { ...run.combat };
  let enemy = { ...combat.enemy };
  let hp = run.hp;
  let relicIds = [...run.relicIds];

  // Key Vault HSM Relic: unspent energy -> +4 Block
  if (combat.energy > 0 && relicIds.includes('relic-keyvault-hsm')) {
    combat.playerBlock += 4;
  }

  // Burn ticks on enemy before enemy acts!
  if (enemy.burn > 0) {
    enemy.hp = Math.max(0, enemy.hp - enemy.burn);
    enemy.burn = Math.max(0, enemy.burn - 1);
    if (enemy.hp <= 0) {
      combat.enemy = enemy;
      return handleCombatVictory({ ...run, combat });
    }
  }

  // Enemy resets its own block at start of its action
  enemy.block = 0;

  // Execute Enemy Intent
  const intent = enemy.currentIntent;
  const ascDmgBoost = run.ascension >= 2 && enemy.tier !== 'normal' ? 1.15 : 1.0;

  const dealHitToPlayer = (rawVal: number) => {
    let dmg = (rawVal + enemy.strength) * ascDmgBoost;
    if (enemy.weak > 0) dmg *= 0.75;
    const finalDmg = Math.max(0, Math.round(dmg));

    if (combat.playerBlock >= finalDmg) {
      combat.playerBlock -= finalDmg;
    } else {
      const pierce = finalDmg - combat.playerBlock;
      combat.playerBlock = 0;
      hp = Math.max(0, hp - pierce);
    }

    // Thorns reflection!
    if (combat.playerThorns > 0) {
      enemy.hp = Math.max(0, enemy.hp - combat.playerThorns);
    }
  };

  if (intent.type === 'attack') {
    dealHitToPlayer(intent.value || 8);
  } else if (intent.type === 'multi-attack') {
    const hits = intent.hits || 2;
    for (let i = 0; i < hits; i++) {
      dealHitToPlayer(intent.value || 4);
    }
  } else if (intent.type === 'attack-defend') {
    dealHitToPlayer(intent.value || 7);
    enemy.block += intent.secondaryValue || 7;
  } else if (intent.type === 'defend') {
    enemy.block += intent.value || 10;
  } else if (intent.type === 'buff') {
    enemy.strength += intent.value || 2;
  } else if (intent.type === 'debuff') {
    combat.playerDexterity = Math.max(-2, combat.playerDexterity - 1);
    dealHitToPlayer(5);
  } else if (intent.type === 'charge-boss') {
    enemy.block += intent.value || 10;
    enemy.strength += 2;
  }

  // Check if enemy died to Thorns!
  if (enemy.hp <= 0) {
    combat.enemy = enemy;
    return handleCombatVictory({ ...run, hp, combat });
  }

  // Check Soft-Delete Relic save on fatal hit!
  if (hp <= 0 && relicIds.includes('relic-soft-delete')) {
    hp = Math.max(15, Math.round(run.maxHp * 0.3));
    relicIds = relicIds.filter((r) => r !== 'relic-soft-delete');
    combat.combatLog = [...combat.combatLog.slice(-5), '14-Day Soft Delete Vault saved you from fatal outage!'];
  }

  if (hp <= 0) {
    combat.enemy = enemy;
    combat.phase = 'defeat';
    return {
      ...run,
      hp: 0,
      relicIds,
      combat
    };
  }

  // Decrement enemy status durations
  if (enemy.vulnerable > 0) enemy.vulnerable -= 1;
  if (enemy.weak > 0) enemy.weak -= 1;

  // Advance enemy intent
  const template = ENEMY_TEMPLATES.find((t) => t.id === enemy.templateId) || ENEMY_TEMPLATES[0];
  const nextIntentIdx = (enemy.intentIndex + 1) % template.intents.length;
  enemy.intentIndex = nextIntentIdx;
  enemy.currentIntent = template.intents[nextIntentIdx];

  // Discard hand & handle player Block retention
  combat.discardPile = [...combat.discardPile, ...combat.hand];
  combat.hand = [];
  if (combat.retainBlockTurns > 0) {
    combat.retainBlockTurns -= 1;
  } else {
    combat.playerBlock = 0;
  }

  // Pick next turn's Azure Exam Question!
  const preferMulti = enemy.tier !== 'normal' || run.ascension >= 2;
  const nextQuestion = pickNextQuestion({
    pool: questionPool,
    mastery,
    track: run.track,
    act: run.act,
    minDifficulty: enemy.tier === 'boss' ? 2 : 1,
    preferMultiFormat: preferMulti,
    recentIds: recentQuestionIds
  });

  combat.turn += 1;
  combat.enemy = enemy;
  combat.activeQuestion = nextQuestion;
  combat.questionStartedAt = Date.now();
  combat.usedHintThisTurn = false;
  combat.lastAnswerCorrect = null;
  combat.phase = 'question';

  return {
    ...run,
    hp,
    relicIds,
    combat
  };
}

export function generateMarketplaceShop(run: ActiveRun): ActiveRun {
  const discount = run.relicIds.includes('relic-reserved-3yr') ? 0.75 : 1.0;
  const cardPool = shuffle(
    ALL_CARDS.filter((c) => c.rarity !== 'starter' && (c.classPool === 'neutral' || c.classPool === run.classId))
  ).slice(0, 4);

  const shopCards = cardPool.map((c) => {
    const basePrice = c.rarity === 'common' ? 48 : c.rarity === 'uncommon' ? 76 : 120;
    return {
      card: cloneCardInstance(c.id, false),
      price: Math.round(basePrice * discount),
      sold: false
    };
  });

  const relicPool = shuffle(
    ALL_RELICS.filter((r) => !run.relicIds.includes(r.id) && r.rarity !== 'starter' && r.rarity !== 'boss')
  ).slice(0, 2);

  const shopRelics = relicPool.map((r) => ({
    relicId: r.id,
    price: Math.round((r.rarity === 'rare' ? 145 : 105) * discount),
    sold: false
  }));

  return {
    ...run,
    shopCards,
    shopRelics,
    cardRemoveUsedInShop: false
  };
}

export function triggerCloudIncident(run: ActiveRun): ActiveRun {
  const incident = CLOUD_INCIDENTS[Math.floor(Math.random() * CLOUD_INCIDENTS.length)];
  return {
    ...run,
    activeIncident: incident
  };
}
