import type {
  ActIntelBriefing,
  RosettaServiceRow,
  CheatSheetTable
} from '../types/curriculum';

// ============================================================================
// 1. 60-Second Act Intel Briefings (Modules 1–6 for AIPC™ AI Product Management)
// ============================================================================
export const AIPC_INTEL_BRIEFINGS: ActIntelBriefing[] = [
  {
    id: 'briefing-aipc-act1',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    title: 'Module 1: AI & GenAI Foundations for PMs',
    subtitle: 'How probabilistic foundation models, tokens, context windows, embeddings, and hallucination mechanics reshape product assumptions.',
    examWeight: '16%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Deterministic Rules vs. Probabilistic GenAI',
        azureConcept: 'Probabilistic Next-Token Prediction',
        awsEquivalent: 'Classic Deterministic Software (If/Else Business Logic)',
        keyFacts: [
          'Traditional software produces identical outputs for identical inputs (100% repeatable unless bugged).',
          'LLMs sample the next token probabilistically—meaning variation, creativity, and occasional plausible falsehoods are intrinsic properties, not rare glitches.',
          'Traditional predictive ML classifies or forecasts structured numbers (churn score, fraud probability); Generative AI synthesizes unstructured text, code, images, or audio.'
        ],
        examTrap: 'Never promise stakeholders "100% accuracy" on open-ended GenAI—design product workflows that absorb variance cleanly.'
      },
      {
        title: 'Tokens, Context Windows & Cost/Latency Math',
        azureConcept: 'Token Economics & Context Window Budgets',
        awsEquivalent: 'Fixed API Request Size & Predictable Page Payload',
        keyFacts: [
          'Models read and bill in tokens (~0.75 English words per token), split into cheaper input tokens and pricier, slower output tokens.',
          'Context Window = total working memory per call (system prompt + conversation history + retrieved docs + tools + output).',
          'Longer contexts raise cost, increase Time-to-First-Token (TTFT), and trigger "lost in the middle" attention drops.'
        ],
        examTrap: 'A 1M-token context window does NOT make retrieval free or instant—stuffing entire document repositories into every prompt destroys unit margins and latency!'
      },
      {
        title: 'Training Lifecycle: Pretraining -> Post-Training',
        azureConcept: 'Pretraining, SFT & Alignment (RLHF / DPO)',
        awsEquivalent: 'Compiling Static Application Code Once',
        keyFacts: [
          'Pretraining teaches broad language/world patterns on massive corpora (creates a base completion model, huge cost).',
          'Supervised Fine-Tuning (SFT) teaches instruction following and chat/task formatting.',
          'Alignment (RLHF / DPO) steers helpfulness, tone, and safety refusals using human preference data.'
        ],
        examTrap: 'Base pretrained models complete text rather than following instructions cleanly—customer products rely on post-trained / instruction-tuned models.'
      },
      {
        title: 'Temperature, Top-P & Reasoning Controls',
        azureConcept: 'Sampling Parameters & Inference-Time Compute',
        awsEquivalent: 'Static Configuration Flags',
        keyFacts: [
          'Low temperature (0.0–0.2) narrows sampling to high-probability tokens—best for extraction, classification, and JSON.',
          'Higher temperature (0.7–1.0) increases diversity—best for brainstorming and creative drafts.',
          'Reasoning models trade extra inference-time thinking tokens (higher latency/cost) for multi-step logic, coding, and math.'
        ],
        examTrap: 'Setting temperature to 0 improves repeatability, but it does NOT eliminate hallucinations when a model lacks factual grounding.'
      },
      {
        title: 'Embeddings & Semantic Similarity',
        azureConcept: 'Dense Vector Representations of Meaning',
        awsEquivalent: 'Exact Keyword / SQL `LIKE` Search',
        keyFacts: [
          'Embeddings convert text, images, or audio into numerical vectors where similar meanings sit close together in vector space.',
          'Semantic search matches intent ("reset login" ↔ "forgot password") even when exact keywords differ.',
          'Hybrid search combines dense vector similarity with keyword (BM25) matching so exact IDs, SKUs, and acronyms aren’t lost.'
        ],
        examTrap: 'Pure vector search often stumbles on exact product codes or error numbers—pair it with keyword search (hybrid) for enterprise search.'
      },
      {
        title: 'Why Hallucinations Happen',
        azureConcept: 'Fluent Pattern Completion Without Truth Verification',
        awsEquivalent: 'Database Returning Null or `404 Not Found`',
        keyFacts: [
          'LLMs optimize for plausible continuation, not database fact-checking; missing knowledge still produces confident prose.',
          'Knowledge cutoffs mean models lack post-training events, private company docs, and live inventory/pricing.',
          'Mitigation requires grounding (RAG), explicit abstention ("say I don’t know"), and verification UX.'
        ],
        examTrap: 'Adding "do not hallucinate" in a prompt does NOT solve knowledge gaps—ground the model in retrieved facts and verify output!'
      }
    ]
  },
  {
    id: 'briefing-aipc-act2',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    title: 'Module 2: AI Strategy, ROI & Unit Economics',
    subtitle: 'Picking high-ROI AI opportunities, Build vs. Buy vs. Partner, pricing models, and building defensible data moats.',
    examWeight: '17%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Problem-First vs. "AI Hammer" Trap',
        azureConcept: 'AI Desirability, Feasibility & Cost-of-Error Fit',
        awsEquivalent: 'Feature-Driven "Tech Push" Without User Pain',
        keyFacts: [
          'Start from a painful, frequent user job-to-be-done—never from "we need a chatbot on our homepage."',
          'Ideal GenAI problems involve unstructured inputs, high cognitive drudgery, and tolerable/reviewable error costs.',
          'If deterministic SQL, rules, or simple UI filters solve the problem cheaper and with 100% accuracy, skip GenAI.'
        ],
        examTrap: 'Adding an open-ended chat box to replace two crisp dropdown filters is classic "AI wrapper" bloat that lowers UX speed.'
      },
      {
        title: 'AI Unit Economics & Gross Margin Compression',
        azureConcept: 'Variable Per-Inference COGS vs. SaaS Margins',
        awsEquivalent: 'Near-Zero Marginal Cost per User Click (80%+ SaaS Margin)',
        keyFacts: [
          'Traditional SaaS enjoys ~75–85% gross margins because extra clicks cost almost nothing.',
          'Every AI generation burns variable token/compute cost—power users on flat pricing can turn accounts unprofitable.',
          'Protect margins via prompt caching, smaller routed models, output length caps, and tiered usage/credit packaging.'
        ],
        examTrap: 'Never evaluate AI ROI on demo quality alone—always calculate Cost Per Successful Task at P95 power-user volume.'
      },
      {
        title: 'Build vs. Buy vs. API/Customize',
        azureConcept: 'Strategic Stack Layering',
        awsEquivalent: 'Custom Software Build vs. Off-the-Shelf SaaS',
        keyFacts: [
          'Buy SaaS when capability is non-differentiating commodity work (generic transcription, standard support widgets).',
          'Integrate Model APIs + RAG/workflow IP when domain workflow and proprietary context differentiate your product.',
          'Train/host custom models only with massive proprietary data, strict offline/edge needs, or extreme scale economics.'
        ],
        examTrap: 'Training a foundation model from scratch is almost never justified for application PMs—competitive edge lives in workflow integration and proprietary data.'
      },
      {
        title: 'Defensible AI Moats Beyond Base Models',
        azureConcept: 'Data Flywheels & Workflow Embed',
        awsEquivalent: 'Single-Vendor API Wrapper',
        keyFacts: [
          'Foundation model intelligence commoditizes rapidly; thin prompt wrappers are copied in weeks.',
          'Durable moats come from proprietary domain data, deep system-of-record workflow integration, and user-feedback flywheels.',
          'High switching costs come from accumulated context, permissions, and verified audit history—not clever prompt phrasing.'
        ],
        examTrap: 'Assuming your prompt text is a long-term moat is fatal—treat proprietary data, distribution, and workflow telemetry as your moat.'
      },
      {
        title: 'Monetization & Pricing Models for AI',
        azureConcept: 'Seat Add-On, Usage/Credits & Outcome-Based Pricing',
        awsEquivalent: 'Pure Per-Seat Flat SaaS Subscription',
        keyFacts: [
          'Per-seat add-ons work when adoption is broad and cost per seat is predictable.',
          'Credit/usage tiers align revenue with variable inference costs for heavy compute (video, deep research, bulk agents).',
          'Outcome-based pricing (e.g., per resolved ticket) thrives when attribution is crisp and ROI is indisputable.'
        ],
        examTrap: 'Unlimited usage inside a cheap flat tier invites severe margin erosion from automated scripts and power users.'
      },
      {
        title: 'AI Business Case & ROI Framing',
        azureConcept: 'Incremental Value Minus Total Cost of Ownership (TCO)',
        awsEquivalent: 'Simple Engineering Build-Hours Estimate',
        keyFacts: [
          'AI TCO includes ongoing model inference, retrieval/vector storage, human review/labeling, eval maintenance, and model migration effort—not just initial sprint cost.',
          'Quantify value in hard outcomes: hours saved × adoption rate, ticket deflection, conversion lift, or churn reduction.',
          'Include time-to-value and risk-adjusted adoption curves rather than assuming 100% day-one trust.'
        ],
        examTrap: 'Forgetting ongoing eval, human-in-the-loop QA, and inference costs makes AI ROI projections wildly overstated.'
      }
    ]
  },
  {
    id: 'briefing-aipc-act3',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    title: 'Module 3: AI-Native UX & Human-Centered Trust',
    subtitle: 'Designing beyond the blank chat box: inline contextual triggers, latency masking, explainability, and graceful failure recovery.',
    examWeight: '16%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Beyond the Blank Chat Box',
        azureConcept: 'Inline Contextual AI vs. Conversational UI',
        awsEquivalent: 'Standard Form Fields, Menus & Direct Manipulation',
        keyFacts: [
          'Blank chat boxes impose "blank-page paralysis" and force users to guess what the AI can do.',
          'Inline UX (smart defaults, hover actions, pre-filled drafts, one-click transforms) embeds AI directly inside existing workflows.',
          'Reserve chat interfaces for open-ended exploration, iterative refinement, and multi-turn troubleshooting.'
        ],
        examTrap: 'Defaulting every feature to a side-panel chatbot slows users down when a one-click inline button would finish the job.'
      },
      {
        title: 'Calibrating User Trust & Transparency',
        azureConcept: 'Explainability, Citations & Confidence Cues',
        awsEquivalent: 'Implicit Trust in Deterministic Calculations',
        keyFacts: [
          'Over-trust (automation bias) causes users to ship subtle hallucinations; under-trust causes abandonment after one bad output.',
          'Inline source citations, highlighted diffs, and confidence cues help users verify fast without reading everything from scratch.',
          'Explicitly frame AI as a draft/copilot ("Review before sending") when accuracy isn’t guaranteed.'
        ],
        examTrap: 'Hiding uncertainty or faking human persona destroys long-term trust the moment an obvious error slips through.'
      },
      {
        title: 'Designing for AI Latency',
        azureConcept: 'Streaming Tokens, Skeletons & Async Notifications',
        awsEquivalent: 'Sub-200ms Synchronous CRUD Spinners',
        keyFacts: [
          'GenAI generations often take 2–30+ seconds—standard frozen spinners feel broken.',
          'Token streaming lowers perceived latency by showing immediate progress; structured step indicators explain multi-step waits.',
          'Tasks exceeding ~15–20 seconds should run asynchronously with background progress and completion notifications.'
        ],
        examTrap: 'Never block the user’s entire UI with a motionless spinner during a 20-second agent run without progress cues or a Cancel button.'
      },
      {
        title: 'Human-in-the-Loop & The Autonomy Spectrum',
        azureConcept: 'Shadow -> Suggest/Draft -> Approve-to-Execute -> Autonomous',
        awsEquivalent: 'Binary Manual vs. Fully Automated Cron Job',
        keyFacts: [
          'Match autonomy level to two axes: error frequency and blast radius (reversibility).',
          'High-stakes or irreversible actions (sending external emails, payments, deletions) demand Draft/Confirm modes.',
          'One-click Accept, Regenerate, Edit, and Undo controls lower user review friction dramatically.'
        ],
        examTrap: 'Shipping full autonomy on day one for external customer communications creates catastrophic brand risk.'
      },
      {
        title: 'Graceful Failure & Fallback UX',
        azureConcept: 'Safe Abstention & Manual Escape Hatches',
        awsEquivalent: 'Generic "500 Internal Server Error" Toast',
        keyFacts: [
          'Design explicitly for low-confidence answers, missing context, timeouts, and guardrail refusals.',
          'When AI fails or abstains, preserve the user’s input and offer immediate next steps (clarifying options, standard search, or human handoff).',
          'Make feedback lightweight (in-flow edits, quick thumbs with structured tags) so users aren’t interrogated.'
        ],
        examTrap: 'A dead-end refusal ("I cannot help with that") with zero fallback path strands the user and kills retention.'
      },
      {
        title: 'Cold-Start & Onboarding Scaffolding',
        azureConcept: 'Prompt Templates, Starter Chips & Example Outputs',
        awsEquivalent: 'Empty-State Illustrations with "Create New" CTA',
        keyFacts: [
          'Starter chips and domain templates teach users high-leverage prompts instantly without prompt-engineering jargon.',
          'Show realistic sample inputs/outputs so users understand capability boundaries immediately.',
          'Progressive disclosure keeps simple workflows clean while exposing power controls (tone, length, sources) only when needed.'
        ],
        examTrap: 'Expecting non-technical end users to learn prompt engineering just to use your product is a UX failure, not a user problem.'
      }
    ]
  },
  {
    id: 'briefing-aipc-act4',
    track: 'aipc',
    act: 4,
    domain: 'aipc-prds-prompts',
    title: 'Module 4: GenAI PRDs, Prompting & RAG vs. Fine-Tuning',
    subtitle: 'Evolving classic PRDs for non-determinism, structured prompt engineering, and choosing between Prompting, RAG, and Fine-Tuning.',
    examWeight: '18%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Classic PRD vs. Generative AI PRD',
        azureConcept: 'Probabilistic Acceptance Bars, Evals & Guardrails',
        awsEquivalent: 'Fixed Binary Acceptance Criteria ("Given X -> Exactly Y")',
        keyFacts: [
          'GenAI PRDs add: Golden Dataset scope, target eval thresholds (Groundedness, Precision/Recall), fallback behaviors, latency/cost budgets, and safety/privacy boundaries.',
          'Replace rigid pixel/string assertions with behavioral rubrics and acceptable failure tolerance.',
          'Define what the model must *refuse* or *abstain from* just as clearly as what it must answer.'
        ],
        examTrap: 'Writing a GenAI PRD with zero cost/latency ceiling or no abstention behavior leaves engineering guessing on critical trade-offs.'
      },
      {
        title: 'Prompt Engineering Core Levers',
        azureConcept: 'System Instructions, Few-Shot Examples, CoT & Structured Schemas',
        awsEquivalent: 'Hardcoded Templates & String Interpolation',
        keyFacts: [
          'Clear role, task constraints, edge-case rules, and negative constraints form the system prompt backbone.',
          'Few-shot examples (2–5 diverse input/output pairs) anchor formatting, tone, and edge-case handling far better than abstract adjectives.',
          'Chain-of-Thought (step-by-step reasoning) boosts accuracy on multi-constraint logic; JSON schemas guarantee parseable outputs.'
        ],
        examTrap: 'Do not stuff 50 uncurated examples into every call or rely on polite phrasing instead of strict output schemas.'
      },
      {
        title: 'Prompting vs. RAG vs. Fine-Tuning Decision',
        azureConcept: 'Behavior/Format vs. Fresh Knowledge vs. Specialized Style',
        awsEquivalent: 'Config Change vs. Database Lookup vs. Custom Binary',
        keyFacts: [
          'Start with Prompt Engineering to test baseline feasibility fast.',
          'Use RAG for dynamic, private, verifiable, or permission-scoped facts—with citations.',
          'Use Fine-Tuning to teach specialized style, compact domain behavior, or classify faster/cheaper at high volume—NOT to inject changing facts.'
        ],
        examTrap: 'Fine-tuning a model on weekly HR policies is an anti-pattern—it cannot enforce per-user document ACLs and goes stale immediately!'
      },
      {
        title: 'RAG Pipeline Mechanics for PMs',
        azureConcept: 'Chunking, Metadata Filtering, Hybrid Retrieval & Reranking',
        awsEquivalent: 'Single SQL `SELECT` Query',
        keyFacts: [
          'Chunking splits documents into retrievable units—too small loses surrounding context; too large dilutes relevance and spikes tokens.',
          'Metadata filters (tenant ID, date, role permissions, region) prevent stale or unauthorized chunks from reaching the prompt.',
          'Two-stage retrieval (fast hybrid candidate search + cross-encoder reranker) sharply lifts top-K precision.'
        ],
        examTrap: 'Most "RAG hallucinations" are actually poor chunking or missing metadata filters—fixing retrieval beats endlessly tweaking system prompts.'
      },
      {
        title: 'Handling Stale Knowledge & Access Control in RAG',
        azureConcept: 'Document Sync Freshness & ACL-Aware Retrieval',
        awsEquivalent: 'Row-Level Permissions in App Database',
        keyFacts: [
          'Vector indexes must sync deletions, edits, and permission revocations promptly—or fired employees’ docs or deleted prices stay retrievable.',
          'Permissions must be enforced *during* retrieval (filtering chunks before LLM context), never merely via a prompt instruction ("ignore restricted docs").',
          'Date-stamp chunks and prefer authoritative sources when policy versions conflict.'
        ],
        examTrap: 'Relying on the LLM prompt to hide confidential documents already stuffed into its context is a severe security flaw.'
      },
      {
        title: 'Context Engineering & Prompt Versioning',
        azureConcept: 'Treating Prompts & Context Assembly as Versioned Artifacts',
        awsEquivalent: 'Database Schema & API Versioning',
        keyFacts: [
          'Production prompts should live in version control alongside eval scores—never edited ad hoc without regression checks.',
          'A prompt change coupled to Model A may degrade silently on Model B; always pair prompt versions with pinned model versions.',
          'Context engineering curates *everything* entering the window: instructions, memory, retrieved chunks, and tool schemas.'
        ],
        examTrap: 'Editing production prompt templates directly in a live dashboard without offline eval runs causes unattributable quality drops.'
      }
    ]
  },
  {
    id: 'briefing-aipc-act5',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    title: 'Module 5: Low-Code Prototyping, Routing & AI Agents',
    subtitle: 'Validating value before engineering sprints, routing across model tiers, and designing safe, bounded agent loops.',
    examWeight: '16%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Low-Code & Wizard-of-Oz Prototyping',
        azureConcept: 'Prompt Playgrounds, Visual Builders & Human-Backed Tests',
        awsEquivalent: 'Static Figma Wireframes Before Sprint 1',
        keyFacts: [
          'Test real messy customer inputs in playgrounds or low-code builders in hours before requesting engineering sprints.',
          'Wizard-of-Oz (human behind the curtain) validates user demand, trust thresholds, and edge cases with zero agent code.',
          'Graduate proven prototypes into version-controlled code once scale, CI evals, and strict security SLAs matter.'
        ],
        examTrap: 'Never run 50,000 production users permanently on a prototype canvas lacking automated regression evals and observability.'
      },
      {
        title: 'Model Routing & Cascading',
        azureConcept: 'Right-Sizing Models by Task Complexity',
        awsEquivalent: 'Single Backend Service Tier for All Traffic',
        keyFacts: [
          'Route high-volume simple tasks (classification, extraction, routing) to small, fast, cheap models.',
          'Reserve frontier reasoning models for complex synthesis, ambiguity, or escalated edge cases.',
          'Cascading tries the cheap model first and escalates only on low confidence; fallback routing protects uptime during vendor outages.'
        ],
        examTrap: 'Using your most expensive frontier reasoning model for routine intent classification destroys unit margins and slows UX.'
      },
      {
        title: 'Static Workflows vs. True AI Agents',
        azureConcept: 'Deterministic Orchestration vs. Dynamic Planner Loops',
        awsEquivalent: 'Hardcoded State Machine / Step Logic',
        keyFacts: [
          'Prompt chains follow developer-defined steps; Agents dynamically choose tools and next steps based on intermediate observations (ReAct loop).',
          'Use fixed workflows when steps are predictable—agents add latency, cost, and variance.',
          'Use agents when path length and tool choices genuinely depend on open-ended discoveries.'
        ],
        examTrap: 'Don’t build a multi-step autonomous agent for a fixed 3-field form extraction task—avoid paying the "autonomy tax" unnecessarily.'
      },
      {
        title: 'Core Agent Anatomy: Tools & Memory',
        azureConcept: 'Tool Schemas, Short-Term Scratchpad & Long-Term Memory',
        awsEquivalent: 'REST Client + Session State + User Profile DB',
        keyFacts: [
          'Models propose structured tool calls (JSON args); host application code executes tools and enforces permissions.',
          'Short-term scratchpad tracks active task turns; long-term semantic (facts/preferences) and episodic (past outcomes) memory persist across sessions.',
          'Summarize bulky tool outputs before appending to context to prevent context bloat and instruction forgetting.'
        ],
        examTrap: 'Remembering user facts across sessions requires per-user isolation, expiration rules, and "forget/delete" privacy controls.'
      },
      {
        title: 'Multi-Agent Specialization & Orchestration',
        azureConcept: 'Orchestrator-Worker, Parallel Fan-Out & Critic Patterns',
        awsEquivalent: 'Monolith vs. Microservices Architecture Trade-Offs',
        keyFacts: [
          'Split into specialized agents (e.g., Planner, Researcher, Critic/Verifier) only when one prompt is overloaded with competing rules/tools.',
          'Parallel sub-agents cut wall-clock latency when research branches are independent.',
          'Handoffs introduce latency, cost multipliers, context loss, and harder trace debugging.'
        ],
        examTrap: 'More agents ≠ automatically smarter—unnecessary agent handoffs amplify token spend and telephone-game errors.'
      },
      {
        title: 'Compounding Errors & Agent Safeguards',
        azureConcept: 'Confirmation Gates, Step Budgets & Kill Switches',
        awsEquivalent: 'API Rate Limits, Timeouts & Feature Flags',
        keyFacts: [
          'Sequential errors compound multiplicatively: 95% per-step reliability across 10 steps yields only ~60% end-to-end success!',
          'Enforce max-step / max-token circuit breakers and loop detection to stop runaway retries.',
          'Gate irreversible side-effect tools (payments, deletions, external sends) behind HITL confirmation and sandboxed execution, with kill switches to step back to draft-only mode.'
        ],
        examTrap: 'Never rely on polite system-prompt rules alone to prevent unauthorized tool actions—enforce hard backend RBAC and confirmation gates.'
      }
    ]
  },
  {
    id: 'briefing-aipc-act6',
    track: 'aipc',
    act: 6,
    domain: 'aipc-evals-ethics-gtm',
    title: 'Module 6: Evals, Safety, Ethics & Go-To-Market',
    subtitle: 'Replacing vibe checks with Golden Datasets, RAG Triad & LLM judges, defending against injections, EU AI Act compliance, and staged GTM.',
    examWeight: '17%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'From Vibe Checks to Golden Datasets',
        azureConcept: 'Living Regression Suites Built from Real Traces',
        awsEquivalent: 'Automated Unit & Integration QA Suites',
        keyFacts: [
          'Manual "vibe checks" miss silent regressions across other inputs whenever a prompt is tweaked.',
          'Golden Datasets blend representative real traces, edge cases, unanswerable negative tests (refusal accuracy), and adversarial cases.',
          'Update datasets continuously from production failure traces while holding out blind splits to prevent overfitting.'
        ],
        examTrap: 'A static launch-day dataset scoring 99% can mask severe degradation on new real-world customer queries.'
      },
      {
        title: 'Offline Evals, Shadow Mode & Online Telemetry',
        azureConcept: 'Pre-Release Gates + Production Quality Loops',
        awsEquivalent: 'Staging QA + Canary A/B Experiments',
        keyFacts: [
          'Run deterministic code checks first (JSON validity, schema, citation IDs, forbidden patterns)—fast and 100% consistent.',
          'Pair LLM-as-a-Judge (calibrated against human experts; watch position & verbosity biases!) with human rubric reviews.',
          'Online evals track implicit signals (acceptance rate, edit distance, immediate retries) alongside shadow-mode agreement and business ROI.'
        ],
        examTrap: 'Never ship an uncalibrated LLM judge or treat "thumbs-up" clicks alone as proof of downstream business ROI.'
      },
      {
        title: 'RAG Triad & Precision vs. Recall',
        azureConcept: 'Pinpointing Retrieval vs. Generation vs. Threshold Trade-Offs',
        awsEquivalent: 'Static Error-Rate Thresholds',
        keyFacts: [
          'RAG Triad: Context Relevance (retrieval quality) + Groundedness/Faithfulness (no unsupported claims) + Answer Relevance (answers actual question).',
          'Prioritize Recall when misses are catastrophic (medical triage, fraud alerts); prioritize Precision when false alarms hurt users (auto-suspensions).',
          'Check both link existence AND semantic claim support before trusting citations.'
        ],
        examTrap: 'High Groundedness + Low Context Relevance means retrieval—not prompting—is broken!'
      },
      {
        title: 'Security Guardrails & Prompt Injection',
        azureConcept: 'Defense-in-Depth Input, Runtime & Output Controls',
        awsEquivalent: 'Input Validation, AuthZ & Output Encoding',
        keyFacts: [
          'Direct jailbreaks try to coax the model past safety rules; Indirect prompt injection hides hostile commands inside emails, PDFs, or web pages.',
          'Treat system prompts as non-secret—never store API keys or access-control secrets inside prompt text.',
          'Layer input scanners, least-privilege tool boundaries, output filters, and pre-launch red-teaming.'
        ],
        examTrap: 'Prompting a model "do not leak Tenant B’s data" is NOT tenant isolation—enforce ACLs inside retrieval indexes and caches.'
      },
      {
        title: 'Privacy, Bias, IP & EU AI Act Tiers',
        azureConcept: 'Responsible AI Governance & Compliance by Design',
        awsEquivalent: 'Standard GDPR Data Protection & License Audits',
        keyFacts: [
          'Verify vendor zero-training / zero-retention commitments AND redact PII/PHI before prompts leave your boundary.',
          'Run sliced evaluations across languages, dialects, and subgroups—average accuracy hides proxy bias.',
          'EU AI Act tiers: Minimal (unregulated), Limited (AI disclosure), High-Risk (hiring/credit/medical—strict audits & human oversight), Unacceptable (banned); secure vendor IP indemnity for enterprise buyers.'
        ],
        examTrap: 'Dropping explicit race/gender columns does NOT eliminate bias when correlated proxies (zip code, school, dialect) remain.'
      },
      {
        title: 'AI Go-To-Market & Drift Monitoring',
        azureConcept: 'Staged Rollouts, Trust Education & Drift Flywheel',
        awsEquivalent: 'Standard Feature Flag Release',
        keyFacts: [
          'Roll out progressively: internal dogfood + red-team -> shadow mode -> skeptical + champion beta -> progressive GA.',
          'GTM messaging should set realistic capability boundaries and supply starter prompts—never promise "100% error-free AI."',
          'Monitor post-launch data drift and upstream model updates continuously; route production failures back into the Golden Dataset.'
        ],
        examTrap: 'Frozen prompts degrade over time as customer vocabulary and vendor checkpoints evolve—AI requires continuous post-launch quality ops.'
      }
    ]
  }
];

// ============================================================================
// 2. Classic Software PM <-> AI Product Management Rosetta Codex (36 Rows)
// ============================================================================
export const AIPC_ROSETTA_ROWS: RosettaServiceRow[] = [
  // 1. AI Foundations & Models (6 rows)
  {
    id: 'aipc-rosetta-found-01',
    category: 'AI Foundations & Models',
    awsService: 'Deterministic Code (`If X -> Always Y`)',
    azureService: 'Probabilistic GenAI (Next-Token Sampling)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Identical inputs can produce slightly different valid—or occasionally wrong—outputs. Design tolerance thresholds, verification cues, and fallbacks instead of promising 100% deterministic outputs.'
  },
  {
    id: 'aipc-rosetta-found-02',
    category: 'AI Foundations & Models',
    awsService: 'Predictive ML (Regression / Classification)',
    azureService: 'Generative AI (Text / Code / Multimodal Synthesis)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Don’t replace fast, cheap tabular classifiers (churn score, fraud score) with slow expensive LLMs unless unstructured reasoning or natural-language synthesis is actually required.'
  },
  {
    id: 'aipc-rosetta-found-03',
    category: 'AI Foundations & Models',
    awsService: 'Fixed Payload Size (KB / MB)',
    azureService: 'Token Budgets & Context Windows (Input + Output)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Output tokens typically cost 3–5x more and add far more latency than input tokens. Filling huge context windows also degrades middle-document recall ("lost in the middle").'
  },
  {
    id: 'aipc-rosetta-found-04',
    category: 'AI Foundations & Models',
    awsService: 'Exact Keyword / SQL `LIKE` Search',
    azureService: 'Dense Embeddings + Hybrid Semantic Search',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Pure vector embeddings understand synonyms ("PTO" ↔ "parental leave") but can miss exact SKU numbers or error codes—always pair semantic search with keyword (BM25) hybrid matching.'
  },
  {
    id: 'aipc-rosetta-found-05',
    category: 'AI Foundations & Models',
    awsService: 'Static Config Flags',
    azureService: 'Sampling Controls (`Temperature`, `Top-P`) & Reasoning Budget',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Temperature = 0 maximizes consistency for JSON extraction, while higher temperature boosts brainstorming variety—but low temperature never cures missing factual context.'
  },
  {
    id: 'aipc-rosetta-found-06',
    category: 'AI Foundations & Models',
    awsService: 'Null / `404 Not Found` Error State',
    azureService: 'Confident Hallucination Without Grounding',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Traditional systems fail loudly when data is missing; LLMs fail silently with fluent prose. Explicitly test and reward "I don’t know" abstention rates on unanswerable queries.'
  },

  // 2. AI Strategy & Economics (6 rows)
  {
    id: 'aipc-rosetta-strat-01',
    category: 'AI Strategy & Economics',
    awsService: 'Near-Zero Marginal Cost per User Click',
    azureService: 'Variable Per-Inference Token & Compute COGS',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Heavy AI power users on flat \$15/month pricing can wipe out gross margin. Model P95 usage early and protect margins via routing, caching, and tiered quotas.'
  },
  {
    id: 'aipc-rosetta-strat-02',
    category: 'AI Strategy & Economics',
    awsService: 'Build vs. Buy Software',
    azureService: 'Buy SaaS vs. API + Proprietary Context vs. Custom Model',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Almost no application team should pretrain a foundation model from scratch; lasting differentiation comes from proprietary workflow data, UX integration, and eval feedback loops.'
  },
  {
    id: 'aipc-rosetta-strat-03',
    category: 'AI Strategy & Economics',
    awsService: 'Per-Seat Flat SaaS Subscription',
    azureService: 'Hybrid Seat + Usage Credits / Outcome Pricing',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Pure usage pricing creates buyer budget anxiety, while unlimited flat pricing risks margin blowups. Hybrid seat + generous credit pools often balance predictability and COGS protection.'
  },
  {
    id: 'aipc-rosetta-strat-04',
    category: 'AI Strategy & Economics',
    awsService: 'Feature Parity / "Me-Too" UI Widget',
    azureService: 'High-Drudgery, Error-Tolerant Job-to-be-Done Fit',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Bolting a generic "AI Ask" button onto clean deterministic forms adds friction. Target messy unstructured inputs where a 90%-ready draft saves users 15 minutes of manual work.'
  },
  {
    id: 'aipc-rosetta-strat-05',
    category: 'AI Strategy & Economics',
    awsService: 'Proprietary Codebase as Defensible IP',
    azureService: 'Proprietary Domain Data + Workflow Lock-In + Eval Flywheel',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Clever prompts leak or get replicated within weeks. Your real moat is live system-of-record context, user preference memory, and production error traces.'
  },
  {
    id: 'aipc-rosetta-strat-06',
    category: 'AI Strategy & Economics',
    awsService: 'Initial Engineering Sprint Estimate',
    azureService: 'Full AI TCO (Inference + Eval Ops + Human QA + Migrations)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'AI products carry ongoing eval maintenance, human annotation, and model-upgrade regression costs long after launch sprint #1 finishes.'
  },

  // 3. AI-Native UX & Trust (6 rows)
  {
    id: 'aipc-rosetta-ux-01',
    category: 'AI-Native UX & Trust',
    awsService: 'Standalone Modal / Support Chatbot',
    azureService: 'Inline Contextual Triggers, Smart Defaults & Diffs',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Blank chat boxes suffer from blank-page paralysis. Meet users inside the document, table, or inbox with contextual one-click actions before offering open chat.'
  },
  {
    id: 'aipc-rosetta-ux-02',
    category: 'AI-Native UX & Trust',
    awsService: 'Sub-200ms Blocking Loading Spinner',
    azureService: 'Streaming Tokens, Step Telemetry & Async Jobs',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Frozen spinners on 10-second LLM/agent calls cause double-clicks and abandonment. Stream partial output immediately, narrate agent steps, and add Cancel controls.'
  },
  {
    id: 'aipc-rosetta-ux-03',
    category: 'AI-Native UX & Trust',
    awsService: 'Implicit User Trust in Computed Output',
    azureService: 'Calibrated Trust (Citations, Confidence Cues, Diffs)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Blind automation bias causes costly mistakes, while unverified surprises destroy trust permanently. Show inline citations and highlight edits so humans verify in seconds.'
  },
  {
    id: 'aipc-rosetta-ux-04',
    category: 'AI-Native UX & Trust',
    awsService: 'Binary Manual vs. Automated Flow',
    azureService: 'Autonomy Spectrum (Shadow -> Draft -> Confirm -> Auto)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Never start high-blast-radius workflows at full autonomy. Graduate progressively from Draft/Suggest to Confirm-to-Send as online acceptance clears thresholds.'
  },
  {
    id: 'aipc-rosetta-ux-05',
    category: 'AI-Native UX & Trust',
    awsService: 'Generic `500` Error Alert',
    azureService: 'Graceful Abstention, Input Preservation & Escape Hatches',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'When AI abstains or hits a safety block, never wipe user work—offer instant fallback to classic search, manual editing, or human escalation.'
  },
  {
    id: 'aipc-rosetta-ux-06',
    category: 'AI-Native UX & Trust',
    awsService: 'Empty State with "Create New" Button',
    azureService: 'Starter Chips, Templates & Realistic Capability Bounds',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'End users shouldn’t have to become prompt engineers. Starter templates and realistic examples drive activation far faster than open text inputs.'
  },

  // 4. PRDs, Prompts & RAG (6 rows)
  {
    id: 'aipc-rosetta-prd-01',
    category: 'PRDs, Prompts & RAG',
    awsService: 'Binary Acceptance Criteria (`Given X -> Exact Y`)',
    azureService: 'Probabilistic GenAI PRD (Eval Bars, Cost/Latency Caps, Refusals)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'A classic PRD breaks down when outputs vary by wording. Specify Golden Dataset pass bars, non-answer refusal specs, and P95 latency/cost ceilings upfront.'
  },
  {
    id: 'aipc-rosetta-prd-02',
    category: 'PRDs, Prompts & RAG',
    awsService: 'Hardcoded UI Copy / String Templates',
    azureService: 'Versioned System Prompts + Few-Shot + Structured Schemas',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Never tweak production prompt wording live without versioning and regression checks—one adjective change can silently break downstream JSON parsing.'
  },
  {
    id: 'aipc-rosetta-prd-03',
    category: 'PRDs, Prompts & RAG',
    awsService: 'Database Lookup Query',
    azureService: 'Retrieval-Augmented Generation (RAG)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Use RAG—not Fine-Tuning—for dynamic facts, company policies, and citations. Enforce user permissions (ACLs) in retrieval queries before chunks ever reach the prompt.'
  },
  {
    id: 'aipc-rosetta-prd-04',
    category: 'PRDs, Prompts & RAG',
    awsService: 'Custom-Compiled Binary / Specialized Engine',
    azureService: 'Fine-Tuning (Style, Behavior, Compact Latency/Cost)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Fine-tuning teaches *how* to speak/format or cuts prompt token overhead at scale, but goes stale fast for changing knowledge and cannot enforce per-user document ACLs.'
  },
  {
    id: 'aipc-rosetta-prd-05',
    category: 'PRDs, Prompts & RAG',
    awsService: 'Simple Keyword Index',
    azureService: 'Chunking Strategy + Metadata Filters + Two-Stage Reranking',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Over-sized chunks blow up token costs and noise; tiny chunks lose meaning. Tuned chunk overlap, freshness tags, and reranking fix most "prompt" complaints.'
  },
  {
    id: 'aipc-rosetta-prd-06',
    category: 'PRDs, Prompts & RAG',
    awsService: 'Row-Level Database Permissions',
    azureService: 'ACL-Filtered Vector Indexes & Tenant-Keyed Caches',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Caching RAG answers purely by query text without tenant/role keys risks leaking confidential HR or M&A documents across users!'
  },

  // 5. Agents & Prototyping (6 rows)
  {
    id: 'aipc-rosetta-agent-01',
    category: 'Agents & Prototyping',
    awsService: 'Clickable Static Mockup',
    azureService: 'Prompt Playground, Low-Code Builder & Wizard-of-Oz Test',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Validate model utility on messy real inputs before spending engineering sprints—then graduate proven low-code flows into version-controlled code for scale.'
  },
  {
    id: 'aipc-rosetta-agent-02',
    category: 'Agents & Prototyping',
    awsService: 'Single Fixed Backend Model/Service',
    azureService: 'Multi-Model Routing, Cascading & Provider Fallback',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Route simple extraction/classification to small cheap models and escalate hard synthesis to frontier models; maintain fallback models for vendor outages.'
  },
  {
    id: 'aipc-rosetta-agent-03',
    category: 'Agents & Prototyping',
    awsService: 'Hardcoded Sequential Workflow',
    azureService: 'Dynamic ReAct Agent Loop (Reason -> Act -> Observe)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Don’t pay the latency and compounding-error tax of an autonomous agent when a fixed 2-step workflow or single structured extraction call solves the problem.'
  },
  {
    id: 'aipc-rosetta-agent-04',
    category: 'Agents & Prototyping',
    awsService: 'Session State + User Profile DB',
    azureService: 'Short-Term Scratchpad + Long-Term Episodic/Semantic Memory',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Summarize bulky tool payloads before appending to scratchpad memory, and expose "view/forget" privacy controls + TTLs on long-term user memories.'
  },
  {
    id: 'aipc-rosetta-agent-05',
    category: 'Agents & Prototyping',
    awsService: 'Microservice Decomposition',
    azureService: 'Multi-Agent Orchestrator-Worker / Critic Specialization',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Sequential steps compound failure rates (0.95^10 ≈ 60%). Split into multiple agents only when instruction overload requires it, and parallelize independent branches.'
  },
  {
    id: 'aipc-rosetta-agent-06',
    category: 'Agents & Prototyping',
    awsService: 'API Timeouts, Rate Limits & Rollback Flags',
    azureService: 'Step/Token Circuit Breakers, Confirmation Gates & Kill Switches',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Pair loop detection and step caps with HITL confirmation before irreversible tools (money, delete, external email) and instant kill switches to drop back to draft mode.'
  },

  // 6. Evals, Ethics & GTM (6 rows)
  {
    id: 'aipc-rosetta-eval-01',
    category: 'Evals, Ethics & GTM',
    awsService: 'Manual Spot-Check / QA Pass',
    azureService: 'Golden Dataset + Deterministic + Calibrated LLM-as-a-Judge',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Vibe checks create silent regressions. Run deterministic schema checks first, calibrate LLM judges against human experts, and guard against position and verbosity bias.'
  },
  {
    id: 'aipc-rosetta-eval-02',
    category: 'Evals, Ethics & GTM',
    awsService: 'Staging QA + Production A/B Clicks',
    azureService: 'Offline Eval Gates + Shadow Mode + Implicit Edit/Retry Telemetry',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Explicit thumbs-up/down gets <2% engagement; track draft acceptance rate, edit distance, and immediate retries alongside downstream business KPIs.'
  },
  {
    id: 'aipc-rosetta-eval-03',
    category: 'Evals, Ethics & GTM',
    awsService: 'Search Accuracy vs. UI Rendering Check',
    azureService: 'RAG Triad (Context Relevance, Groundedness, Answer Relevance)',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Separately diagnosing retrieval (Context Relevance) vs. hallucination (Groundedness) vs. helpfulness (Answer Relevance) prevents fixing the wrong layer.'
  },
  {
    id: 'aipc-rosetta-eval-04',
    category: 'Evals, Ethics & GTM',
    awsService: 'Fixed Pass/Fail Threshold',
    azureService: 'Asymmetric Precision vs. Recall Threshold Tuning',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Prioritize Recall when missing a case is severe (medical triage, fraud alerts); prioritize Precision when false alarms hurt innocent users (auto-suspensions).'
  },
  {
    id: 'aipc-rosetta-eval-05',
    category: 'Evals, Ethics & GTM',
    awsService: 'SQL Injection / XSS Defense & GDPR DPA',
    azureService: 'Indirect Prompt Injection Guardrails, Red-Teaming & EU AI Act',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Untrusted emails or retrieved docs can smuggle hidden commands (indirect injection). Treat system prompts as non-secret, redact PII, and classify features by EU AI Act risk tier.'
  },
  {
    id: 'aipc-rosetta-eval-06',
    category: 'Evals, Ethics & GTM',
    awsService: 'Static Feature Launch ("Ship & Forget")',
    azureService: 'Staged GTM + Continuous Drift Monitoring + Trace Flywheel',
    examTrack: 'AIPC',
    trackGroup: 'aipm',
    architectGotcha: 'Frozen AI features decay as user behavior shifts (data drift) or vendors update model checkpoints. Pipe production failure traces continuously back into the Golden Dataset.'
  }
];

// ============================================================================
// 3. Five AI Product Management Decision Matrices / Cheat Sheets
// ============================================================================
export const AIPC_CHEAT_SHEETS: CheatSheetTable[] = [
  {
    id: 'cheat-aipc-prompt-rag-finetune',
    title: '1. Prompting vs. RAG vs. Fine-Tuning Decision Matrix',
    subtitle: 'Pick the simplest customization lever that solves your knowledge, formatting, latency, or privacy requirement.',
    track: 'AIPC',
    headers: [
      'Dimension',
      'Prompt Engineering',
      'RAG (Retrieval-Augmented Generation)',
      'Fine-Tuning (SFT / LoRA / Custom)'
    ],
    rows: [
      [
        'Primary Superpower',
        'Steer task instructions, role, structure, and reasoning fast with zero training',
        'Inject fresh, private, verifiable, permission-scoped facts with citations',
        'Teach specialized tone/domain style, strict formats, or shrink massive prompts at scale'
      ],
      [
        'When to Choose',
        'Always start here! Ideal for summarization, classification, extraction, and prototyping',
        'Knowledge changes daily/weekly, needs inline citations, or varies per user/tenant ACL',
        'Prompting + few-shot still misses complex domain style, or 50+ examples bloat token cost/latency'
      ],
      [
        'Knowledge Freshness',
        'Frozen at model cutoff (unless manually pasted into prompt)',
        'Real-time / near-real-time as source documents sync',
        'Frozen at fine-tune snapshot (expensive to retrain frequently)'
      ],
      [
        'Access Control & Citations',
        'Only what the caller passes in the request',
        'Native per-user ACL filtering & exact source attribution',
        'Weak — cannot selectively restrict memorized training facts per user'
      ],
      [
        'Engineering & Maintenance Effort',
        'Lowest (hours–days; versioned templates + evals)',
        'Medium (chunking, embeddings/hybrid search, reranking, ACL sync)',
        'Highest (curated labeled dataset, training runs, regression evals on model updates)'
      ]
    ],
    proTip: 'Golden exam rule: **RAG is for Knowledge & Citations; Fine-Tuning is for Behavior, Style & Scale Economics.** Never fine-tune to store rapidly changing policies or private per-user permissions!'
  },
  {
    id: 'cheat-aipc-evals-rag-triad',
    title: '2. AI Evals & RAG Triad Quick Reference',
    subtitle: 'Diagnose where an AI pipeline breaks and pair the right offline and online evaluation signals.',
    track: 'AIPC',
    headers: [
      'Metric / Eval Layer',
      'Core Question Answered',
      'How Measured',
      'If This Fails -> Fix Here'
    ],
    rows: [
      [
        'Deterministic Code Checks',
        'Does output obey valid JSON, schema types, length caps, and existing citation IDs?',
        'Automated assertions / regex / schema validators (0–100% pass)',
        'Enforce structured output schemas & validation retries in app code'
      ],
      [
        'RAG: Context Relevance',
        'Did the retriever fetch the right chunks for the user’s query?',
        'Retrieval precision@K / recall@K / LLM relevance rubric',
        'Fix chunk size/overlap, hybrid keyword+vector search, metadata filters, or reranker'
      ],
      [
        'RAG: Groundedness (Faithfulness)',
        'Is every claim in the answer strictly supported by retrieved context?',
        'Claim-level NLI / calibrated LLM judge vs. retrieved chunks',
        'Tighten grounding instructions, lower temperature, add refusal examples, or add Critic pass'
      ],
      [
        'RAG: Answer Relevance',
        'Did the response actually answer what the user asked cleanly?',
        'LLM-as-a-Judge rubric + human expert spot calibration',
        'Refine system instructions, add few-shot examples, or check query rewriting'
      ],
      [
        'Precision vs. Recall Trade-Off',
        'Are false alarms (Precision) or missed detections (Recall) costlier here?',
        'Confusion matrix & confidence-threshold tuning on Golden Dataset',
        'Medical/fraud triage -> maximize Recall; Auto-ban/auto-send -> maximize Precision'
      ],
      [
        'Online Production Signals',
        'Are real users adopting the output and moving business KPIs?',
        'Draft acceptance rate, edit distance, immediate retry rate, downstream conversion/ROI',
        'Harvest top failure traces into Golden Dataset and run shadow/A-B iteration'
      ]
    ],
    proTip: 'Remember the **LLM-as-a-Judge Trap**: Automated judges prefer longer answers (**verbosity bias**) and specific answer slots (**position bias**). Always swap A/B order and calibrate against human domain experts!'
  },
  {
    id: 'cheat-aipc-ux-autonomy',
    title: '3. AI-Native UX & Autonomy Spectrum',
    subtitle: 'Match interface patterns and human-in-the-loop friction to error frequency and blast radius.',
    track: 'AIPC',
    headers: [
      'Autonomy Stage',
      'UX Pattern & User Role',
      'Ideal Use Cases (Blast Radius)',
      'Required PM Safeguards'
    ],
    rows: [
      [
        '1. Shadow Mode',
        'Invisible to end users; runs silently in background',
        'Validating real-world traffic accuracy before beta (e.g., underwriting, triage)',
        'Latency isolation, offline agreement scoring, zero user impact'
      ],
      [
        '2. Suggest / Inline Draft',
        'Pre-filled inline draft, smart chips, highlighted diff; user edits/accepts',
        'Email replies, PRDs, CRM summaries, code suggestions (medium stakes)',
        'Streaming tokens, inline citations, one-click Accept / Edit / Regenerate'
      ],
      [
        '3. Confirm-to-Execute (Copilot)',
        'Agent prepares structured action plan; human approves explicit action preview',
        'Calendar invites, bulk ticket updates, refund/wire drafts (high/irreversible stakes)',
        'Clear parameter preview, least-privilege scopes, edit-before-approve, Cancel button'
      ],
      [
        '4. Bounded Autonomy',
        'Agent executes end-to-end within tight rules; notifies user via audit digest',
        'Low-stakes routine routing, internal tagging, read-only research enrichment',
        'Step/token circuit breakers, confidence thresholds, instant kill switch back to Stage 2'
      ]
    ],
    proTip: 'Don’t force users into a **blank chat box** when an inline draft or one-click contextual trigger finishes the task faster—and never start irreversible external actions at Stage 4!'
  },
  {
    id: 'cheat-aipc-prd-comparison',
    title: '4. Classic Software PRD vs. Generative AI PRD',
    subtitle: 'What an AI PM adds to product requirements to account for probabilistic behavior, unit cost, and model drift.',
    track: 'AIPC',
    headers: [
      'PRD Section',
      'Classic Software PRD',
      'Generative AI PRD Addition'
    ],
    rows: [
      [
        'Acceptance Criteria',
        'Binary deterministic specs ("Clicking Save writes exact string to DB")',
        'Probabilistic Golden Dataset bars (e.g., ≥92% Groundedness, ≥95% JSON validity, subgroup fairness)'
      ],
      [
        'Error & Edge Handling',
        'HTTP status codes, validation alerts, empty-state screens',
        'Safe abstention ("I don’t know" criteria), low-confidence fallbacks, manual escape hatches'
      ],
      [
        'Data & Knowledge Spec',
        'Database schema, API endpoints, static copy strings',
        'RAG sources, chunking/freshness SLA, tenant ACL rules, short/long-term memory retention & forget UX'
      ],
      [
        'Performance & Economics',
        'Page load time (<300ms) & server capacity estimates',
        'TTFT + P95 end-to-end latency, model routing tiers, max token/step budgets, target cost-per-task'
      ],
      [
        'Security, Safety & Launch Gate',
        'AuthN/AuthZ roles, input validation, standard rollback flag',
        'Prompt-injection/output guardrails, PII redaction, red-team sign-off, EU AI Act tier, autonomy kill switch'
      ]
    ],
    proTip: 'Every GenAI PRD must define **what the AI should refuse or abstain from**—not just what it should generate!'
  },
  {
    id: 'cheat-aipc-safety-eu-ai-act',
    title: '5. AI Safety, Security & EU AI Act Risk Tiers',
    subtitle: 'Essential guardrails, threat distinctions, privacy controls, and regulatory tiers for AI PMs.',
    track: 'AIPC',
    headers: [
      'Risk / Threat Category',
      'Core Definition & Product Example',
      'Mandatory PM & Engineering Controls'
    ],
    rows: [
      [
        'Direct Jailbreak vs. Indirect Prompt Injection',
        'User tricks model past policies (jailbreak) vs. hidden commands in external emails/docs (indirect injection)',
        'Input/output guardrails, privilege separation, HITL confirmation on external actions; never put secrets in prompts'
      ],
      [
        'Data Privacy & Cross-Tenant Leakage',
        'PII/PHI sent to external models or Tenant A retrieving Tenant B’s RAG/cached context',
        'Vendor zero-training/retention contracts, pre-call PII redaction, ACL-filtered retrieval, tenant-keyed caches'
      ],
      [
        'EU AI Act: Minimal & Limited Risk',
        'Minimal = spam filters/games; Limited = customer chatbots & synthetic media',
        'Limited Risk requires clear user disclosure ("You are chatting with AI") & synthetic-content labeling'
      ],
      [
        'EU AI Act: High-Risk',
        'Hiring/resume ranking, credit scoring, medical devices, critical infrastructure',
        'Risk management, bias/data governance, detailed logging, technical docs, mandatory human-oversight design'
      ],
      [
        'EU AI Act: Unacceptable Risk',
        'Social scoring, manipulative subliminal exploitation, untargeted facial scraping',
        'Strictly prohibited — do not scope, build, or ship in covered jurisdictions'
      ]
    ],
    proTip: 'Remember: **Model providers cannot own your use-case risk.** Even with an API vendor’s baseline safety filter and IP indemnity, the product team owns tenant ACLs, human-oversight UX, and EU AI Act High-Risk compliance.'
  }
];
