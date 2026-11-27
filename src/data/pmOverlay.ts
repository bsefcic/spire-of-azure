import { ExamTrack } from '../types/curriculum';
import { ArchitectClassId } from '../types/game';

export function isAiPmTrack(track: ExamTrack | 'mixed' | string | undefined): boolean {
  return track === 'aipc';
}

export interface ClassOverlay {
  name: string;
  shortLabel: string;
  title: string;
  description: string;
}

export const AIPC_CLASS_OVERLAYS: Record<ArchitectClassId, ClassOverlay> = {
  vanguard: {
    name: 'Product Strategist',
    shortLabel: 'Strategist',
    title: 'Full-Stack AI Product Manager',
    description: 'Balances user discovery, sharp GenAI PRDs, and streak-powered GTM execution across every product sprint.'
  },
  sentinel: {
    name: 'Trust & Safety Guardian',
    shortLabel: 'Guardian',
    title: 'Evals, Guardrails & Ethics Lead',
    description: 'Builds impenetrable RAG groundedness, retains compliance guardrails across turns, and reflects hallucinations with policy thorns.'
  },
  striker: {
    name: 'Growth & Agent Builder',
    shortLabel: 'Builder',
    title: 'Rapid Prototyper & Agentic PM',
    description: 'Ships low-code prototypes at high velocity. Chains 0- and 1-cost prompt bursts, model routing draw engines, and massive eval combos.'
  }
};

export const AIPC_ASCENSIONS = [
  { level: 0, label: 'Associate AI PM', subtitle: 'Core Foundations', description: 'Standard Product Sprint difficulty and balanced scenario pacing.' },
  { level: 1, label: 'AI Product Manager', subtitle: 'Shipping GenAI v1', description: 'Stakeholders have +12% HP. Fast-answer window tightens to 10.5s.' },
  { level: 2, label: 'Senior AI PM', subtitle: 'RAG & Evals Scale', description: 'Elites & Case Bosses deal +15% dmg and prefer multi-format scenarios.' },
  { level: 3, label: 'Staff AI PM', subtitle: 'Multi-Agent Systems', description: 'All blockers gain +18% HP; Sprint Retros heal 25% instead of 30%.' },
  { level: 4, label: 'Director of AI Product', subtitle: 'Enterprise Governance', description: 'Higher frequency of Difficulty 3 & Yes/No/Multi-select exec reviews.' },
  { level: 5, label: 'Chief AI Product Officer', subtitle: 'AIPC™ Master', description: 'Ultimate product leadership test: Bosses gain +2 Strength & launch shields.' }
];

export interface CardOverlay {
  name: string;
  upgradedName: string;
  tag: string;
}

export const AIPC_CARD_OVERLAYS: Record<string, CardOverlay> = {
  'vg-strike': { name: 'Prompt Iteration', upgradedName: 'Prompt Iteration+', tag: 'Zero-Shot Polish' },
  'vg-defend': { name: 'Eval Guardrail', upgradedName: 'Eval Guardrail+', tag: 'Groundedness Check' },
  'vg-peering-slash': { name: 'RAG Context Strike', upgradedName: 'RAG Context Strike+', tag: 'Hybrid Vector Search' },
  'vg-sla-barrier': { name: 'HITL Approval Gate', upgradedName: 'HITL Approval Gate+', tag: 'Human-in-the-Loop' },
  'sn-nsg-thorns': { name: 'Red-Team Firewall', upgradedName: 'Red-Team Firewall+', tag: 'Injection Counter' },
  'sn-policy-slam': { name: 'Compliance Slam', upgradedName: 'Compliance Slam+', tag: 'Policy Enforcement' },
  'sn-bastion-retain': { name: 'PII Redaction Lock', upgradedName: 'PII Redaction Lock+', tag: 'Zero Data Retention' },
  'st-aci-burst': { name: 'Low-Code Prototype', upgradedName: 'Low-Code Prototype+', tag: '1-Hour Validation' },
  'st-keda-draw': { name: 'Small-Model Router', upgradedName: 'Small-Model Router+', tag: 'Cascade & Save' },
  'st-vmss-barrage': { name: 'Multi-Agent Volley', upgradedName: 'Multi-Agent Volley+', tag: '3x Tool Calls' },
  'nt-front-door': { name: 'Inline Copilot UX', upgradedName: 'Inline Copilot UX+', tag: 'Ambient Canvas' },
  'nt-expressroute': { name: 'Proprietary Data Moat', upgradedName: 'Proprietary Data Moat+', tag: 'Data Flywheel' },
  'nt-resource-lock': { name: 'Fallback UI State', upgradedName: 'Fallback UI State+', tag: 'Graceful Degradation' },
  'nt-conditional-access': { name: 'Source Citation Gate', upgradedName: 'Source Citation Gate+', tag: 'Calibrated Trust' },
  'nt-bicep-deploy': { name: 'GenAI PRD Spec', upgradedName: 'GenAI PRD Spec+', tag: 'Evals & Budgets' },
  'nt-spot-evict': { name: 'Prompt Cache Hit', upgradedName: 'Prompt Cache Hit+', tag: '-50% Token Cost' },
  'nt-gzrs-vault': { name: 'Golden Dataset Restore', upgradedName: 'Golden Dataset Restore+', tag: 'Regression Suite' },
  'nt-log-burn': { name: 'LLM-as-a-Judge', upgradedName: 'LLM-as-a-Judge+', tag: 'Automated Rubric' },
  'nt-key-vault': { name: 'EU AI Act Vault', upgradedName: 'EU AI Act Vault+', tag: 'Audit-Ready Risk' },
  'vg-pim-elevation': { name: 'Executive Buy-In', upgradedName: 'Executive Buy-In+', tag: 'ROI & USP Alignment' },
  'vg-slot-swap': { name: 'Shadow Mode Canary', upgradedName: 'Shadow Mode Canary+', tag: 'Zero-Risk Rollout' },
  'vg-private-link': { name: 'Semantic Reranker', upgradedName: 'Semantic Reranker+', tag: 'Top-K Precision' },
  'sn-immutable-worm': { name: 'Audit Trail Ledger', upgradedName: 'Audit Trail Ledger+', tag: 'Decision Trace' },
  'sn-ddos-reflect': { name: 'Adversarial Defense', upgradedName: 'Adversarial Defense+', tag: 'Prompt Shield' },
  'sn-ddos-crush': { name: 'Trust Calibration Strike', upgradedName: 'Trust Calibration Strike+', tag: 'Zero Over-Reliance' },
  'st-aks-surge': { name: 'ReAct Planner Surge', upgradedName: 'ReAct Planner Surge+', tag: 'Tool Orchestration' },
  'st-func-chain': { name: 'Parallel Eval Chain', upgradedName: 'Parallel Eval Chain+', tag: 'Batch Scoring' },
  'st-ultra-disk': { name: 'LoRA Fine-Tune Boost', upgradedName: 'LoRA Fine-Tune Boost+', tag: 'Domain Style & Speed' },
  'ult-cosmos-global': { name: 'Outcome Pricing Launch', upgradedName: 'Outcome Pricing Launch+', tag: 'Value-Based GTM' },
  'ult-site-recovery': { name: 'Circuit Breaker Rollback', upgradedName: 'Circuit Breaker Rollback+', tag: 'Drift Recovery' },
  'ult-arc-dominion': { name: 'Autonomous Agent Fleet', upgradedName: 'Autonomous Agent Fleet+', tag: 'Multi-Step Mastery' }
};

export interface RelicOverlay {
  name: string;
  subtitle: string;
  description: string;
}

export const AIPC_RELIC_OVERLAYS: Record<string, RelicOverlay> = {
  'relic-aws-badge': {
    name: 'Product Sense Compass',
    subtitle: 'Classic PM Experience',
    description: 'Start each Module with +1 PM Hint charge and heal 5 HP after every Elite victory.'
  },
  'relic-defender-shield': {
    name: 'Constitutional Guardrails',
    subtitle: 'AI Safety Layer',
    description: 'Start every sprint battle with 8 Block and 2 Thorns.'
  },
  'relic-keda-scaler': {
    name: 'Low-Code Sandbox',
    subtitle: 'Rapid Prototyping',
    description: 'On Turn 1 of every combat, gain +1 bonus Energy and draw +1 extra card.'
  },
  'relic-ms-learn': {
    name: 'Curated Golden Dataset',
    subtitle: 'Eval Regression Bank',
    description: 'Wrong answers still grant 3 Energy instead of 2 Energy (mitigating mistakes!).'
  },
  'relic-az-trio': {
    name: 'The RAG Triad',
    subtitle: 'Groundedness • Relevance',
    description: 'Every 3rd streak step grants +6 automatic Block at the start of your card phase.'
  },
  'relic-reserved-3yr': {
    name: 'Token Batch Discount',
    subtitle: 'Inference Optimization',
    description: 'All AI Stack Market items and card removals cost 25% less Gold.'
  },
  'relic-hybrid-benefit': {
    name: 'Proprietary Data Flywheel',
    subtitle: 'Feedback Loop Moat',
    description: 'Gain +18 Gold after every sprint battle victory.'
  },
  'relic-expressroute-direct': {
    name: 'Streaming TTFT Boost',
    subtitle: 'Sub-300ms First Token',
    description: 'Fast & Correct answers (<12s) grant +2 temporary Strength for that combat!'
  },
  'relic-soft-delete': {
    name: 'Instant Shadow Rollback',
    subtitle: 'Feature Flag Safety',
    description: 'Once per run, if fatal damage would drop you to 0 HP, survive and restore 30% Max HP!'
  },
  'relic-keyvault-hsm': {
    name: 'PII Masking Proxy',
    subtitle: 'Privacy-by-Design',
    description: 'Gain +4 Block at the end of your turn if you have unspent Energy.'
  },
  'relic-autoscale-profile': {
    name: 'Multi-Model Router',
    subtitle: 'Smart Cascading',
    description: 'Draw 6 cards per turn instead of 5.'
  },
  'relic-global-admin-pim': {
    name: 'Human-in-the-Loop Crown',
    subtitle: 'Calibrated Autonomy',
    description: 'BOSS RELIC: Gain +1 Base Energy every turn (wrong=3, right=4, fast=5!).'
  },
  'relic-purview-map': {
    name: 'Automated Red-Teamer',
    subtitle: 'Pre-Launch Stress Test',
    description: 'BOSS RELIC: Start every combat by applying 2 Vulnerable and 2 Weak to the enemy.'
  }
};

export function getCardDisplayForTrack(
  card: { id: string; name: string; upgradedName?: string; azureTag: string; upgraded?: boolean },
  track: ExamTrack | 'mixed'
) {
  if (!isAiPmTrack(track)) {
    return {
      name: card.upgraded && card.upgradedName ? card.upgradedName : card.name,
      tag: card.azureTag
    };
  }
  const ov = AIPC_CARD_OVERLAYS[card.id];
  if (!ov) {
    return {
      name: card.upgraded && card.upgradedName ? card.upgradedName : card.name,
      tag: card.azureTag
    };
  }
  return {
    name: card.upgraded ? ov.upgradedName : ov.name,
    tag: ov.tag
  };
}

export function getRelicDisplayForTrack(
  relic: { id: string; name: string; description: string },
  track: ExamTrack | 'mixed'
) {
  if (!isAiPmTrack(track)) return relic;
  const ov = AIPC_RELIC_OVERLAYS[relic.id];
  if (!ov) return relic;
  return {
    ...relic,
    name: ov.name,
    description: ov.description
  };
}
