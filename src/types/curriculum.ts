export type ExamTrack = 'az-900' | 'az-104' | 'aipc';

export type DomainId =
  | 'az900-concepts'
  | 'az900-architecture'
  | 'az900-governance'
  | 'az104-identity'
  | 'az104-storage'
  | 'az104-compute'
  | 'az104-networking'
  | 'az104-monitoring'
  | 'aipc-foundations'
  | 'aipc-strategy'
  | 'aipc-ux'
  | 'aipc-prds-prompts'
  | 'aipc-prototyping-agents'
  | 'aipc-evals-ethics-gtm';

export type QuestionFormat =
  | 'single'      // Standard 4-option single choice
  | 'multi'       // Select N correct options (e.g., Select 2)
  | 'yes-no'      // 3-statement Yes/No evaluation matrix
  | 'sequence';   // Order steps / hierarchy from top to bottom

export interface YesNoStatement {
  statement: string;
  answer: boolean; // true = Yes, false = No
}

export interface ExamQuestion {
  id: string;
  track: ExamTrack;
  act: 1 | 2 | 3 | 4 | 5 | 6;
  domain: DomainId;
  subtopic: string;
  difficulty: 1 | 2 | 3; // 1 = Core, 2 = Scenario, 3 = Elite/Case Study
  format: QuestionFormat;
  prompt: string;

  // Used for 'single' and 'multi'
  options?: string[];
  // For 'single', single index [2]; for 'multi', sorted indices [0, 3]
  correctIndices?: number[];
  // For 'multi', how many answers must be selected (e.g. 2)
  selectCount?: number;

  // Used for 'yes-no' (typically 3 statements)
  statements?: YesNoStatement[];

  // Used for 'sequence' (items listed in the CORRECT order; UI shuffles them)
  correctSequence?: string[];

  // Pre-answer subtle hint (consumes Hint Charge / Relic; never reveals exact answer letter)
  awsBridgeHint: string;

  // Post-answer crisp explanation
  explanation: string;

  // Post-answer comparison & gotcha (AWS Bridge for Cloud, Classic PM vs AI PM Shift for AIPC)
  awsComparison: string;
}

export interface BriefingCard {
  title: string;
  azureConcept: string;
  awsEquivalent: string;
  keyFacts: string[];
  examTrap: string;
}

export interface ActIntelBriefing {
  id: string;
  track: ExamTrack;
  act: 1 | 2 | 3 | 4 | 5 | 6;
  domain: DomainId;
  title: string;
  subtitle: string;
  examWeight: string;
  readTimeSeconds: number;
  cards: BriefingCard[];
}

export type RosettaCategory =
  | 'Compute & Containers'
  | 'Networking & Delivery'
  | 'Storage'
  | 'Databases & Cache'
  | 'Identity & Security'
  | 'Governance & IaC'
  | 'Messaging & Serverless'
  | 'Monitoring & DR'
  | 'AI Foundations & Models'
  | 'AI Strategy & Economics'
  | 'AI-Native UX & Trust'
  | 'PRDs, Prompts & RAG'
  | 'Agents & Prototyping'
  | 'Evals, Ethics & GTM';

export interface RosettaServiceRow {
  id: string;
  category: RosettaCategory;
  awsService: string;
  azureService: string;
  examTrack: 'Both' | 'AZ-900' | 'AZ-104' | 'AIPC';
  trackGroup?: 'cloud' | 'aipm';
  architectGotcha: string;
}

export interface CheatSheetTable {
  id: string;
  title: string;
  subtitle: string;
  track: 'Both' | 'AZ-900' | 'AZ-104' | 'AIPC';
  headers: string[];
  rows: string[][];
  proTip: string;
}
