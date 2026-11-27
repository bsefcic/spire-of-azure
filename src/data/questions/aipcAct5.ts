import type { ExamQuestion } from '../../types/curriculum';

export const AIPC_ACT5_QUESTIONS: ExamQuestion[] = [
  {
    id: 'aipc-a5-001',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Low-Code Prototyping',
    difficulty: 1,
    format: 'single',
    prompt: 'Before requesting two engineering sprints to build a custom AI contract-summarizer inside your SaaS app, what is the fastest way for an AI PM to validate whether users actually value the output format?',
    options: [
      'Test real customer contracts in a prompt playground or low-code workflow builder and review outputs with five target users',
      'Commission a custom fine-tuned open-weights model on historical legal clauses first',
      'Write a full production API microservice specification and wait for QA sign-off',
      'Ask legal counsel to draft an industry-wide AI ethics whitepaper before testing any prompts'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think about the cheapest, fastest discovery loop that tests desirability and output utility before committing engineering capacity.',
    explanation: 'Prompt playgrounds and low-code visual workflow builders let PMs iterate on system instructions, examples, and output schemas with real user inputs in hours rather than weeks. Validating user value before committing engineering sprints prevents building polished software around an unhelpful prompt pattern.',
    awsComparison: 'Classic Software PM relies on clickable Figma wireframes to validate static UI flows; AI PM pairs clickable prototypes with live prompt playgrounds or low-code flows because model behavior—not just button placement—determines product value.'
  },
  {
    id: 'aipc-a5-002',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Wizard-of-Oz Testing',
    difficulty: 1,
    format: 'single',
    prompt: 'A PM wants to test demand for an "AI executive inbox concierge" inside an existing calendar tool without writing any agent orchestration code yet. Behind a simple UI button, a human specialist drafts the daily briefings manually while the user sees an "AI Assistant" badge. What prototyping technique is this?',
    options: [
      'Shadow-mode regression testing',
      'Wizard-of-Oz prototyping',
      'Model cascading',
      'Semantic chunking'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Named after a classic story where someone operates the levers behind a curtain to simulate an intelligent machine.',
    explanation: 'Wizard-of-Oz testing simulates an automated or AI-powered experience using a human operating behind the scenes. It validates whether users trust, engage with, and derive value from the interaction before investing in complex agent engineering.',
    awsComparison: 'Classic Software PM uses Wizard-of-Oz tests to validate manual service workflows before automating; AI PM uses it specifically to discover edge-case user requests, acceptable latency, and trust thresholds before building autonomous agents.'
  },
  {
    id: 'aipc-a5-003',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Static Workflow vs. Agent',
    difficulty: 1,
    format: 'single',
    prompt: 'What is the defining difference between a deterministic prompt chain (workflow) and a true AI Agent?',
    options: [
      'A prompt chain always uses open-source models, whereas an AI Agent always uses proprietary models',
      'A prompt chain cannot return JSON, whereas an AI Agent only outputs structured JSON',
      'In a prompt chain, the developer hardcodes the sequence of steps; in an AI Agent, the model dynamically decides which tools and next steps to take based on intermediate observations',
      'An AI Agent eliminates the need for system prompts or evaluation datasets'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Compare a fixed recipe card (Step 1 -> Step 2 -> Step 3) against a dynamic planner that inspects results and chooses what to do next.',
    explanation: 'Static prompt chains follow predetermined code paths (e.g., summarize -> translate -> format). An AI Agent uses a reasoning loop to inspect the goal, choose tools, observe tool outputs, and dynamically decide whether to retry, call another tool, or conclude.',
    awsComparison: 'Classic Software PM specifies fixed if/else business logic; AI PM must decide when predictable fixed workflows suffice versus when open-ended tasks justify handing control flow to an agent loop.'
  },
  {
    id: 'aipc-a5-004',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Model Routing & Cascading',
    difficulty: 2,
    format: 'single',
    prompt: 'Your customer-support assistant handles 100,000 tickets per month. 75% are simple password-reset or order-status lookups, while 25% involve complex multi-policy billing disputes. Running every ticket through your largest frontier reasoning model blows past your gross-margin target. What architecture should you recommend?',
    options: [
      'Replace all AI responses with static FAQ links to eliminate token costs',
      'Fine-tune the largest frontier model on every historical ticket weekly',
      'Increase the temperature setting on the frontier model so it generates shorter replies',
      'Implement a model router that sends simple intents to a small, fast, low-cost model and escalates only complex cases to the frontier reasoning model'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Match task difficulty to model capability—like a triage nurse handling routine cases and escalating complex diagnostics to a specialist.',
    explanation: 'Model routing (or cascading) classifies incoming requests by complexity or confidence and routes easy, high-volume tasks to small, fast, inexpensive models while reserving expensive frontier reasoning models for complex synthesis. This protects gross margin and lowers average latency.',
    awsComparison: 'Classic Software PM optimizes a single deterministic backend tier; AI PM actively manages a portfolio of models across cost, latency, and reasoning tiers.'
  },
  {
    id: 'aipc-a5-005',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Core Agent Components',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement about core AI Agent building blocks.',
    statements: [
      {
        statement: 'Tool calling (function calling) allows a language model to emit structured parameters matching a schema so the application can execute an external action.',
        answer: true
      },
      {
        statement: 'In a ReAct-style agent loop, the model alternates between reasoning about what to do, taking an action (calling a tool), and observing the returned result.',
        answer: true
      },
      {
        statement: 'Because a language model executes tool calls directly inside its neural weights, the host application does not need to implement API execution or permission checks.',
        answer: false
      }
    ],
    awsBridgeHint: 'Remember that a model only outputs structured text requesting a tool call—your application code actually runs the tool and enforces permissions.',
    explanation: 'Models emit structured tool-call requests (like JSON arguments matching a schema), and the ReAct loop feeds the tool observation back into context. However, the host application—not the model—executes the function and must enforce authorization and validation.',
    awsComparison: 'Classic Software PM treats API callers as deterministic code; AI PM must treat the model as an untrusted planner proposing tool arguments that application guardrails must validate.'
  },
  {
    id: 'aipc-a5-006',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Agent Memory Architecture',
    difficulty: 2,
    format: 'single',
    prompt: 'A personal fitness coaching agent needs to remember what exercises the user already logged five minutes ago in the current chat AND recall that the user injured their left knee three months ago. Which memory pairing cleanly separates these two requirements?',
    options: [
      'Short-term scratchpad (in-context conversation state) for the active session, paired with long-term memory (retrieved user profile/episodic facts) across sessions',
      'Increasing the model temperature to 1.2 so it creatively guesses past workouts',
      'Hardcoding every user’s workout history directly into the global system prompt for all users',
      'Disabling tool calling so the agent relies solely on pretraining knowledge'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Distinguish working memory held inside the active conversation window from persistent memory stored and retrieved across separate sessions.',
    explanation: 'Short-term memory (scratchpad / active context window) tracks immediate steps and recent turns in the current task. Long-term memory (semantic preferences and episodic history stored externally and retrieved as needed) preserves durable user facts across sessions without overflowing context.',
    awsComparison: 'Classic Software PM distinguishes session state from persistent database records; AI PM maps those concepts to context-window scratchpads versus retrieved episodic/semantic memory with privacy and staleness controls.'
  },
  {
    id: 'aipc-a5-007',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Compounding Error Rates',
    difficulty: 3,
    format: 'single',
    prompt: 'An engineering lead proposes a 10-step autonomous agent where each step has a 95% per-step reliability rate, claiming the overall workflow will succeed roughly 95% of the time. Why should the AI PM push back on this estimate?',
    options: [
      'Because 10-step agents automatically become 100% accurate after three runs',
      'Because sequential dependencies cause reliability to compound multiplicatively (0.95^10 ≈ 60% end-to-end success), making long unguarded chains fragile',
      'Because tool schemas eliminate all intermediate reasoning errors',
      'Because per-step accuracy adds linearly across steps rather than multiplying'
    ],
    correctIndices: [1],
    awsBridgeHint: 'If ten independent steps must all succeed for the final outcome to be right, multiply the probabilities instead of taking the average.',
    explanation: 'When steps depend sequentially on prior outputs, errors compound multiplicatively: 0.95 to the 10th power is roughly 59.9%. A PM should shorten step counts, collapse deterministic steps into code, add verification checkpoints, or introduce human review gates.',
    awsComparison: 'Classic Software PM assumes deterministic code runs at ~100% logic reliability; AI PM must budget for compounding probabilistic error across multi-step agent trajectories.'
  },
  {
    id: 'aipc-a5-008',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Irreversible Side Effects & Safeguards',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt: 'Your finance-ops agent can read vendor invoices, draft payment approvals, and trigger irreversible bank wire transfers. Which TWO PM safeguards are essential before shipping? (Select 2)',
    options: [
      'Require an explicit human-in-the-loop confirmation gate before executing the irreversible wire-transfer tool',
      'Allow the agent unlimited retries in case the banking API returns a validation error',
      'Scope the agent’s permissions to least privilege and enforce strict schema/amount limits on tool inputs',
      'Set temperature to maximum so the agent explores alternative vendor accounts if an invoice is unclear'
    ],
    correctIndices: [0, 2],
    awsBridgeHint: 'Pair an explicit approval checkpoint for high-stakes actions with tight boundaries on what the tool is allowed to touch.',
    explanation: 'Irreversible external side effects (money movement, deleting records, sending mass emails) require human confirmation gates and strict least-privilege/amount constraints. Unlimited retries and high temperature amplify financial risk.',
    awsComparison: 'Classic Software PM restricts destructive actions with role checks and confirmation modals; AI PM must apply those same gates specifically around autonomous tool execution because models can misinterpret ambiguous inputs.'
  },
  {
    id: 'aipc-a5-009',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Low-Code Prototyping Trade-offs',
    difficulty: 2,
    format: 'single',
    prompt: 'After validating an AI support triage prototype in a no-code visual workflow builder with 20 beta users, your team plans to roll it out to 50,000 paying customers with strict audit logging, custom latency SLAs, and automated CI regression evals. What is the right PM call?',
    options: [
      'Keep all 50,000 users permanently on the visual no-code canvas because it requires zero code reviews',
      'Skip evaluation datasets because the 20 beta users liked the prototype',
      'Transition the validated workflow into version-controlled production code while preserving the learnings from the low-code prototype',
      'Delete the prototype prompt and ask engineers to invent a completely unrelated user experience'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Low-code tools shine for rapid discovery and validation, whereas production scale demands version control, observability, and automated testing.',
    explanation: 'Low-code workflow builders accelerate discovery and alignment with stakeholders. Once the workflow and user value are proven, graduating to version-controlled code enables automated eval suites, strict latency/cost telemetry, security controls, and reliable scaling.',
    awsComparison: 'Classic Software PM knows when to throw away a rapid MVP mockup and build production architecture; AI PM applies the same discipline when graduating from low-code AI builders to production pipelines.'
  },
  {
    id: 'aipc-a5-010',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Agent Control Flow',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the steps of a single ReAct agent turn from start to finish when answering a user request that requires live CRM lookup.',
    correctSequence: [
      'User submits goal and system loads task instructions plus available tool schemas',
      'Agent reasons about the goal and emits a structured tool-call request for the CRM lookup',
      'Application validates arguments, executes the CRM API, and returns the result as an observation',
      'Agent incorporates the observation into context and either calls another tool or produces the final answer'
    ],
    awsBridgeHint: 'Start with context + tool definitions, then Reason/Act (model emits call), then host execution/observation, then synthesis.',
    explanation: 'A ReAct cycle begins with the prompt and tool schemas, moves to the model reasoning and emitting a structured tool call, delegates execution to the host application to return an observation, and lets the model decide whether to loop again or answer.',
    awsComparison: 'Unlike a single request-response API call in classic software, an agent turn is an iterative loop between model reasoning and host-executed observations.'
  },
  {
    id: 'aipc-a5-011',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Circuit Breakers & Budgets',
    difficulty: 2,
    format: 'single',
    prompt: 'During internal dogfooding, a research agent got stuck calling the same search tool 42 times in a loop when a query returned zero results, racking up \$18 on a single user prompt. Which safeguard directly prevents this failure mode?',
    options: [
      'Increasing the model’s context window size to 1 million tokens',
      'Switching from JSON tool schemas to free-form natural language instructions',
      'Enabling Markdown streaming in the front-end chat bubble',
      'Implementing a max-steps / max-token budget circuit breaker plus loop detection that gracefully exits with a partial summary or fallback'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Put hard ceilings on loop iterations and spend so a confused agent halts cleanly instead of spinning indefinitely.',
    explanation: 'Autonomous loops need explicit circuit breakers—maximum step counts, token/dollar ceilings, and repeated-call detection—coupled with graceful fallback messaging so users are never stuck waiting or generating runaway API bills.',
    awsComparison: 'Classic Software PM sets API timeouts and rate limits; AI PM sets step budgets, token caps, and loop-detection circuit breakers for non-deterministic agent loops.'
  },
  {
    id: 'aipc-a5-012',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Multi-Agent Orchestration',
    difficulty: 2,
    format: 'single',
    prompt: 'When does splitting a complex product workflow into specialized multi-agent roles (e.g., Planner, Researcher, Critic/Verifier) outperform putting everything into one giant prompt?',
    options: [
      'When distinct sub-tasks benefit from focused instructions, isolated tool permissions, and dedicated verification—and you can afford the added latency and coordination overhead',
      'Always—multi-agent systems are guaranteed to be faster and cheaper than single prompts for every task',
      'Only when each agent has zero access to external tools or shared context',
      'Whenever you want to eliminate the need for any evaluation metrics'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think like organizing a team: specialization helps when one generalist prompt gets overloaded, but extra handoffs add latency and cost.',
    explanation: 'Multi-agent specialization improves accuracy when a single prompt is overloaded with competing instructions and dozens of tools, or when an independent Critic agent catches errors. However, inter-agent handoffs add latency, token cost, and debugging complexity, so simpler workflows should stay single-agent or deterministic.',
    awsComparison: 'Classic Software PM avoids premature microservices when a clean monolith works; AI PM avoids premature multi-agent complexity when a well-structured workflow or single agent meets quality targets.'
  },
  {
    id: 'aipc-a5-013',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Tool Design for Agents',
    difficulty: 2,
    format: 'single',
    prompt: 'Engineers complain that your agent frequently passes malformed dates or picks the wrong CRM endpoint when calling tools. As an AI PM reviewing the product spec, what is the highest-leverage improvement to advocate for?',
    options: [
      'Remove all parameter descriptions so the prompt uses fewer tokens',
      'Write clear, unambiguous tool descriptions, enforce strict enum/date-format schemas, and consolidate overlapping tools',
      'Instruct the user in the onboarding modal to type ISO-8601 dates manually in every chat message',
      'Increase model temperature to encourage more creative tool selection'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Treat tool schemas and descriptions like UX for the model: clear naming, strict types, and no overlapping ambiguous actions.',
    explanation: 'Models choose and populate tools based on tool names, descriptions, and parameter schemas. Ambiguous or overlapping tools confuse the planner; crisp descriptions, strict schema types/enums, and consolidated tools dramatically reduce tool-call errors.',
    awsComparison: 'Classic Software PM designs intuitive UI affordances for human users; AI PM also designs crisp, unambiguous tool interfaces (Agent-Computer Interfaces) for model callers.'
  },
  {
    id: 'aipc-a5-014',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Low-Code Prototyping Goal',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement about low-code AI prototyping during product discovery.',
    statements: [
      {
        statement: 'Testing prompts on 20–30 realistic, messy user inputs in a playground reveals failure modes far earlier than writing a static PRD alone.',
        answer: true
      },
      {
        statement: 'A low-code prototype should only ever be tested with idealized "happy-path" inputs created by the PM.',
        answer: false
      },
      {
        statement: 'Interactive prototypes help align design, engineering, and stakeholders around realistic latency and failure-recovery UX before sprint commitment.',
        answer: true
      }
    ],
    awsBridgeHint: 'Effective discovery tests real, messy inputs early so engineering and design see real model behavior.',
    explanation: 'Running real, messy user samples through a playground or low-code builder exposes edge cases, latency realities, and UX gaps early. Limiting tests to sanitized happy-path inputs creates false confidence.',
    awsComparison: 'Classic Software PM validates static flows with clean mock data; AI PM must stress-test prototypes early with real messy user inputs.'
  },
  {
    id: 'aipc-a5-015',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Cascading Pattern',
    difficulty: 3,
    format: 'single',
    prompt: 'How does "model cascading" differ from static upfront intent routing?',
    options: [
      'Cascading trains a new model from scratch on every user query',
      'Cascading always runs the largest model first and uses the small model only to translate the output',
      'Cascading attempts the request on a fast, cheap model first and escalates to a stronger model only if a confidence or quality check fails',
      'Cascading sends every request simultaneously to five models and averages their word counts'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Upfront routing decides before running; cascading tries the inexpensive tier first and checks whether escalation is actually needed.',
    explanation: 'In model cascading, a small/cheap model handles the request first; a lightweight verifier or confidence check inspects the output and escalates to a frontier model only when the cheap attempt falls short. Upfront routing classifies before execution.',
    awsComparison: 'Classic Software PM uses simple cache-aside patterns (check fast cache, fall back to DB); AI PM uses model cascading (try fast/cheap model, escalate on low confidence).'
  },
  {
    id: 'aipc-a5-016',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'When NOT to Use an Agent',
    difficulty: 2,
    format: 'single',
    prompt: 'A stakeholder wants to use a multi-step autonomous AI Agent to extract three fixed fields (invoice number, date, total amount) from standardized PDF receipts and save them to a billing table. What should you advise?',
    options: [
      'Build a three-agent swarm with a Planner, Critic, and Memory Manager so it feels more modern',
      'Use Wizard-of-Oz humans permanently instead of software automation',
      'Allow the agent to dynamically invent new database columns whenever a receipt looks unusual',
      'Use a single structured-extraction call (or deterministic parser + single model fallback) because the workflow is fixed and predictable—an autonomous agent adds unnecessary latency, cost, and variance'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Choose the simplest reliable architecture: if the steps are fixed, avoid paying the autonomy tax.',
    explanation: 'Autonomous agents shine on open-ended, branching problems where the path cannot be hardcoded. For fixed, predictable extraction tasks, a single structured-output call or deterministic workflow is faster, cheaper, easier to evaluate, and far more reliable.',
    awsComparison: 'Classic Software PM resists over-engineering simple CRUD forms; AI PM resists over-engineering predictable workflows into autonomous agents.'
  },
  {
    id: 'aipc-a5-017',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Prototyping Sequence',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Arrange the recommended AI PM prototyping progression from earliest discovery to production engineering investment.',
    correctSequence: [
      'Clarify user pain, target outcome, and failure tolerance in a lightweight problem brief',
      'Validate output utility and edge cases in a prompt playground or Wizard-of-Oz test using real user inputs',
      'Build a clickable or low-code interactive workflow to test latency, trust cues, and fallback UX with target users',
      'Commit engineering sprints to productionize the pipeline with automated evals, routing, and guardrails'
    ],
    awsBridgeHint: 'Move from problem framing -> raw capability test -> interactive workflow test -> full engineering build.',
    explanation: 'Disciplined AI PMs validate desirability and feasibility cheaply before committing sprint capacity: start with problem framing, test raw model feasibility on real inputs, test UX/trust in low-code, and then invest in production engineering.',
    awsComparison: 'Classic Software PM moves from brief -> wireframe -> engineering build; AI PM inserts raw capability and prompt validation before locking UI assumptions.'
  },
  {
    id: 'aipc-a5-018',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Agent State & Checkpointing',
    difficulty: 2,
    format: 'single',
    prompt: 'A travel-booking agent runs across five steps over 25 seconds. On step 4, a third-party airline API briefly times out. Without checkpointing, the user must restart from scratch and re-pay for steps 1–3. What design capability solves this?',
    options: [
      'Persisting step-level agent state and making tool actions idempotent so the agent can resume cleanly from step 4',
      'Hiding all loading indicators so the user does not notice the failure',
      'Deleting short-term memory after every single tool call',
      'Switching the model to zero-shot prompting'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Save progress at each milestone and ensure retrying a step does not duplicate bookings or charges.',
    explanation: 'Checkpointing persists intermediate agent state so transient tool failures do not discard prior work. Pairing checkpoints with idempotent tool calls prevents duplicate charges or bookings on retry.',
    awsComparison: 'Classic Software PM specifies idempotent checkout retries and saved form progress; AI PM applies the exact same resilience to multi-step agent trajectories.'
  },
  {
    id: 'aipc-a5-019',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Episodic vs. Semantic Memory',
    difficulty: 3,
    format: 'single',
    prompt: 'In an AI workplace assistant, which distinction accurately separates "semantic memory" from "episodic memory"?',
    options: [
      'Semantic memory stores raw audio files; episodic memory stores CSS stylesheets',
      'Semantic memory stores durable facts and user preferences (e.g., "User prefers concise bullet summaries"), while episodic memory records specific past interactions/outcomes (e.g., "Last Tuesday’s Q3 review draft was rejected for missing revenue figures")',
      'Semantic memory is erased after every turn; episodic memory is shared publicly across all customers',
      'There is no difference; both terms refer strictly to the system prompt'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Think of cognitive psychology: general facts/preferences you know versus specific past episodes/events you experienced.',
    explanation: 'Borrowed from cognitive science, semantic memory captures distilled facts and preferences about the user or domain, while episodic memory stores timestamped records of past task executions and feedback so the agent avoids repeating past mistakes.',
    awsComparison: 'Classic Software PM stores user profile settings separately from activity audit logs; AI PM retrieves both selectively into agent context as semantic and episodic memory.'
  },
  {
    id: 'aipc-a5-020',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Multi-Agent Handoff Risks',
    difficulty: 2,
    format: 'multi',
    selectCount: 3,
    prompt: 'When moving from a single-agent design to a multi-agent system, which THREE new product or operational risks must the PM explicitly manage? (Select 3)',
    options: [
      'Increased end-to-end latency and cumulative token cost from inter-agent communication',
      'Context loss or "telephone game" distortion during handoffs between agents',
      'Harder root-cause debugging when an error spans multiple agent turns',
      'Automatic elimination of all hallucination risks across every sub-agent'
    ],
    correctIndices: [0, 1, 2],
    awsBridgeHint: 'Adding more agents introduces communication overhead, handoff distortion, and harder tracing—never magic zero-hallucination guarantees.',
    explanation: 'Multi-agent architectures multiply token usage and latency, risk losing critical nuances across handoff summaries, and complicate trace debugging. They do not automatically eliminate hallucinations.',
    awsComparison: 'Classic Software PM weighs microservice coordination overhead before splitting an app; AI PM weighs inter-agent latency, cost, and context-loss overhead before splitting an agent.'
  },
  {
    id: 'aipc-a5-021',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Evaluator / Critic Pattern',
    difficulty: 2,
    format: 'single',
    prompt: 'A marketing-copy agent occasionally ignores brand compliance rules (such as never promising guaranteed financial returns). Your team adds a lightweight second pass that inspects the draft against a compliance checklist and triggers one revision if a violation is found. What agentic pattern is this?',
    options: [
      'Wizard-of-Oz fallback',
      'Context window truncation',
      'Reflection / Evaluator-Optimizer (Critic) pattern',
      'Zero-shot embedding clustering'
    ],
    correctIndices: [2],
    awsBridgeHint: 'One step generates; a second critic step reviews against criteria and feeds critique back for revision.',
    explanation: 'The Reflection or Evaluator-Optimizer pattern separates generation from critique. A reviewer step checks constraints (tone, policy, formatting) and requests targeted revision before presenting the final output to the user.',
    awsComparison: 'Classic Software PM relies on automated linters or QA sign-off before publishing; AI PM embeds an automated critic/reflection loop inside the generation pipeline.'
  },
  {
    id: 'aipc-a5-022',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Latency UX in Multi-Step Agents',
    difficulty: 1,
    format: 'single',
    prompt: 'Because an autonomous research agent takes 18 seconds to query three sources and synthesize a brief, early beta users assume the app froze and click "Submit" repeatedly. What UX requirement should the PM add to the PRD?',
    options: [
      'Disable the user’s browser back button during generation',
      'Increase the timeout to 10 minutes with a blank white screen',
      'Pre-generate identical canned answers for every possible user question',
      'Stream live progress milestones (e.g., "Searching policy docs… Comparing 3 clauses…") plus a Cancel control and duplicate-submit lock'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Make the agent’s intermediate steps visible, prevent accidental double-runs, and let users cancel.',
    explanation: 'Multi-step agents introduce multi-second latency. Streaming readable step progress builds user trust, explains why the app is working, and pairs with cancel/debouncing controls to prevent frustration and duplicate runs.',
    awsComparison: 'Classic Software PM expects sub-300ms API responses and simple spinners; AI PM designs transparent progress telemetry and interruptibility for multi-second agent runs.'
  },
  {
    id: 'aipc-a5-023',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Model Routing Signals',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt: 'Which TWO runtime signals are commonly used by a model router to decide whether to send a request to a small fast model versus a frontier reasoning model? (Select 2)',
    options: [
      'Predicted query complexity or intent category from a fast lightweight classifier',
      'The user’s desktop screen resolution in pixels',
      'Subscription tier / SLA budget or latency target attached to the request',
      'Alphabetical order of the user’s first name'
    ],
    correctIndices: [0, 2],
    awsBridgeHint: 'Routing balances task difficulty and business economics/SLA tier.',
    explanation: 'Effective routers inspect query complexity/intent alongside business context such as user tier, latency budget, or cost caps. Visual screen metrics and user names are irrelevant signals.',
    awsComparison: 'Classic Software PM uses feature flags for tier entitlements; AI PM combines tier entitlements with dynamic task-complexity classification to optimize unit economics.'
  },
  {
    id: 'aipc-a5-024',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Agent Observability & Traces',
    difficulty: 2,
    format: 'single',
    prompt: 'Users report that your HR policy agent gives wrong PTO balances 10% of the time, but standard HTTP logs only show "200 OK". What telemetry must an AI PM require in the spec to diagnose agent failures?',
    options: [
      'End-to-end execution traces capturing each reasoning step, selected tool, exact tool inputs/outputs, token counts, and latency per hop',
      'Only the total monthly invoice from the model vendor',
      'Only the final character count of the user-facing response',
      'Screenshot recordings of the marketing landing page'
    ],
    correctIndices: [0],
    awsBridgeHint: 'A 200 OK status hides whether the planner picked the wrong tool, passed bad arguments, or misread the tool output.',
    explanation: 'Agent failures happen inside intermediate reasoning steps and tool calls even when HTTP status is 200 OK. Step-level traces (inputs, tool calls, tool responses, tokens, latency) are essential to pinpoint whether failures stem from prompts, retrieval, tool schemas, or external APIs.',
    awsComparison: 'Classic Software PM monitors HTTP status codes and page load times; AI PM demands trace-level observability across every reasoning hop and tool invocation.'
  },
  {
    id: 'aipc-a5-025',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Human-in-the-Loop Escalation',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Human-in-the-Loop (HITL) design in AI agents.',
    statements: [
      {
        statement: 'Read-only research tools generally require fewer confirmation prompts than tools that mutate external records or send communications.',
        answer: true
      },
      {
        statement: 'Effective HITL UI displays the proposed action, target entity, and key parameters clearly so the user can approve, edit, or reject in one step.',
        answer: true
      },
      {
        statement: 'Forcing users to manually approve every single read-only search step maximizes productivity and eliminates user approval fatigue.',
        answer: false
      }
    ],
    awsBridgeHint: 'Gate high-impact writes, not harmless reads—otherwise users suffer click fatigue and rubber-stamp everything.',
    explanation: 'Smart HITL reserves friction for high-impact or irreversible actions and surfaces clear diffs/parameters for fast review. Over-gating harmless read actions causes approval fatigue, leading users to blindly click "Approve".',
    awsComparison: 'Classic Software PM balances security prompts against friction; AI PM calibrates autonomy gates by reversibility and blast radius.'
  },
  {
    id: 'aipc-a5-026',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Memory Hygiene & Privacy',
    difficulty: 3,
    format: 'single',
    prompt: 'Your customer-facing shopping agent stores long-term user preferences to personalize recommendations. A user deletes an old corporate shipping address and asks the assistant to "forget my previous employer info." Which PM requirement prevents stale or unwanted long-term memory leaks?',
    options: [
      'Never allowing users to view or edit what the assistant remembers about them',
      'Providing memory inspection, selective deletion/expiry (TTL), and strict tenant/user isolation boundaries on retrieved memories',
      'Storing all users’ long-term memories inside a single shared global vector index without user ID filters',
      'Copying every chat transcript permanently into the base model weights'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Long-term memory needs user control (view/forget), freshness rules, and airtight per-user isolation.',
    explanation: 'Long-term agent memory introduces staleness and privacy risks. PMs must specify user-scoped isolation filters (so User A never retrieves User B’s memory), memory expiration/conflict resolution, and user-facing controls to inspect or delete stored memories.',
    awsComparison: 'Classic Software PM enforces account-level CRUD and GDPR delete flows on profile tables; AI PM must extend those exact deletion and tenant-isolation guarantees into vector/episodic memory stores.'
  },
  {
    id: 'aipc-a5-027',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Prompt Playgrounds vs. Code',
    difficulty: 1,
    format: 'single',
    prompt: 'What is a primary limitation of validating a feature solely inside a single-turn prompt playground when your real product needs multi-step tool use?',
    options: [
      'Prompt playgrounds cannot display English text',
      'Prompt playgrounds cost 100x more per token than production APIs',
      'Single-turn playgrounds miss multi-turn context growth, messy real API responses, latency compounding, and tool-error recovery',
      'Prompt playgrounds automatically deploy changes to all production customers'
    ],
    correctIndices: [2],
    awsBridgeHint: 'A single static chat box hides what happens across 5 turns with noisy API payloads and partial failures.',
    explanation: 'Playgrounds are great for rapid initial prompt validation, but single-turn tests do not capture real API error payloads, expanding context windows, tool-selection ambiguity, or end-to-end latency.',
    awsComparison: 'Classic Software PM knows a static UI mockup doesn’t test live database latency; AI PM knows a single-turn prompt playground doesn’t test multi-turn tool orchestration.'
  },
  {
    id: 'aipc-a5-028',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Structured Output Contracts',
    difficulty: 2,
    format: 'single',
    prompt: 'When an agent passes extracted customer order data to a downstream billing workflow, why should the PM specify schema-constrained structured outputs (e.g., strict JSON schema validation) rather than free-form prose?',
    options: [
      'Because models charge zero tokens when outputting JSON',
      'Because JSON outputs cannot contain factual errors',
      'Because structured schemas automatically translate text into every human language',
      'Because deterministic downstream code relies on predictable field names and types, preventing parsing crashes from conversational filler'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Code breaks when an LLM wraps data in "Sure! Here is your info:" or renames a key from `total` to `amount`.',
    explanation: 'Schema-constrained outputs enforce exact keys, data types, and enums so downstream application code can parse and execute reliably without brittle regex hacks. (Note: schemas guarantee format compliance, though semantic accuracy still requires evals.)',
    awsComparison: 'Classic Software PM defines strict API contracts between services; AI PM enforces structured output schemas at the boundary between probabilistic models and deterministic code.'
  },
  {
    id: 'aipc-a5-029',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Orchestrator-Worker Architecture',
    difficulty: 3,
    format: 'single',
    prompt: 'In an Orchestrator-Worker multi-agent pattern for generating a competitive intelligence report, what is the Orchestrator agent’s primary responsibility?',
    options: [
      'Decomposing the user’s high-level objective into sub-tasks, dispatching specialized worker agents (e.g., Pricing, News, Reviews), and synthesizing their findings',
      'Training new foundation model weights overnight',
      'Manually rendering CSS animations in the user’s browser',
      'Replacing every worker agent’s API keys every five minutes'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think of an editor-in-chief assigning sections to specialist reporters and combining their drafts.',
    explanation: 'The Orchestrator (or Supervisor) plans the work breakdown, routes sub-tasks to specialized worker agents (often in parallel to reduce wall-clock latency), handles missing pieces, and synthesizes the final deliverable.',
    awsComparison: 'Classic Software PM maps parallel backend fan-out/fan-in workflows; AI PM applies that pattern dynamically when an Orchestrator decides at runtime which specialists to invoke.'
  },
  {
    id: 'aipc-a5-030',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Agent Sandbox & Blast Radius',
    difficulty: 2,
    format: 'single',
    prompt: 'You are launching a coding/data-analysis agent that can execute generated Python scripts on user-uploaded CSV files. What non-functional safeguard must be in the launch checklist?',
    options: [
      'Run the agent-generated code directly on the shared production database host with admin rights',
      'Execute generated code inside an isolated, ephemeral sandbox with restricted network access and tight CPU/memory/time limits',
      'Ask users via email to promise they will never upload tricky CSV files',
      'Disable all syntax checking so scripts run faster'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Never let AI-generated code run with unrestricted access to your production environment or external networks.',
    explanation: 'Whenever an agent generates and executes code, that code must run inside an isolated, ephemeral sandbox with no access to internal production secrets, restricted outbound networking, and strict compute/time caps.',
    awsComparison: 'Classic Software PM isolates untrusted user uploads; AI PM treats AI-generated code and tool actions as untrusted execution requiring sandboxing.'
  },
  {
    id: 'aipc-a5-031',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Prototyping Cost & Latency Reality',
    difficulty: 2,
    format: 'single',
    prompt: 'During a hackathon, an engineer demos an impressive agent using 12 sequential frontier-model calls per user message, taking 35 seconds and costing \$0.45 per run. As the PM assessing commercial viability for a \$15/month freemium product, what should you do next?',
    options: [
      'Approve immediate general availability because the demo looked magical',
      'Ban all AI features permanently from the roadmap',
      'Model unit economics at expected usage, then simplify the workflow, cache/deterministic-code static steps, and route easy sub-tasks to smaller models before launch',
      'Hide the \$0.45 cost by removing usage telemetry'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Awesome demos can still be unviable businesses—check cost-per-task and latency against your pricing tier.',
    explanation: 'Hackathon demos often ignore unit economics and latency budgets. If 35 runs per month cost \$15.75 in tokens alone, a \$15/month product loses money on active users. PMs must optimize steps, replace unnecessary LLM calls with code, and route lighter sub-tasks to cheaper models.',
    awsComparison: 'Classic Software PM rarely sees marginal compute wipe out a \$15 SaaS subscription; AI PM must model per-task token economics before greenlighting production.'
  },
  {
    id: 'aipc-a5-032',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Agent Failure Modes',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt: 'Which TWO failure modes are uniquely amplified in autonomous multi-step agents compared to single-turn Q&A chatbots? (Select 2)',
    options: [
      'Infinite or repetitive tool-calling loops when an intermediate API returns ambiguous errors',
      'Silent goal drift or compounding errors where a minor misinterpretation on step 1 derails steps 2–5',
      'Font rendering inconsistencies in static marketing hero banners',
      'Inability to display hyperlinks in HTML'
    ],
    correctIndices: [0, 1],
    awsBridgeHint: 'Focus on what happens when a model controls a loop over multiple turns and external tools.',
    explanation: 'Agents can spiral into repetitive tool loops on ambiguous errors and suffer cascading goal drift when an early mistake pollutes subsequent steps in the scratchpad.',
    awsComparison: 'Classic Software PM debugs single-request bugs; AI PM designs loop breakers and intermediate validation to contain multi-step drift.'
  },
  {
    id: 'aipc-a5-033',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Model Fallback & Resilience',
    difficulty: 2,
    format: 'single',
    prompt: 'Your primary frontier model provider experiences a 20-minute rate-limit outage during peak Monday traffic. What routing strategy keeps your AI assistant available with graceful degradation?',
    options: [
      'Shut down the entire application login page until the vendor recovers',
      'Retry the exact same failing endpoint 500 times per user request with zero backoff',
      'Display raw JSON stack traces directly to end users',
      'Configure automatic fallback routing to a secondary model/provider (plus clear UX notice if capability is slightly reduced)'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Just like payment gateways have backup processors, production AI products avoid single-model fragility.',
    explanation: 'Multi-model routing isn’t only for cost—it also provides resilience. Automatic fallback to a secondary model or provider (with bounded retries and graceful UX messaging) protects uptime during vendor outages or throttling.',
    awsComparison: 'Classic Software PM specifies failover for critical third-party APIs like payments; AI PM treats model endpoints as external dependencies needing fallback routing.'
  },
  {
    id: 'aipc-a5-034',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Low-Code Prototyping Metrics',
    difficulty: 1,
    format: 'single',
    prompt: 'When running a 1-week Wizard-of-Oz or low-code prototype test with 15 design-partner customers, what is the primary success signal the PM should measure?',
    options: [
      'Whether users adopt the output in their real workflow, where they edit/reject it, and which edge cases break trust',
      'Peak queries per second (QPS) under a 100,000-user load generator',
      'Total lines of custom backend code written during the week',
      'Whether the marketing team already bought Super Bowl ad slots'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Early discovery measures desirability, task completion, and edit/rejection patterns—not hyper-scale load capacity.',
    explanation: 'Early prototypes exist to learn whether the AI capability solves a real job-to-be-done, how much manual editing users must do, and what edge cases destroy trust—not to benchmark production QPS.',
    awsComparison: 'Classic Software PM distinguishes qualitative discovery metrics from scale-load tests; AI PM focuses early discovery on output acceptance rate and edit distance.'
  },
  {
    id: 'aipc-a5-035',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Context Bloat in Agents',
    difficulty: 3,
    format: 'single',
    prompt: 'An agent that browses documentation pages performs well on turn 1, but by turn 6 it starts ignoring its system rules and burning 80,000 input tokens per step because every raw HTML page was appended to its scratchpad. What architectural fix should the PM prioritize?',
    options: [
      'Remove the system prompt completely so there are no rules to forget',
      'Summarize or trim bulky intermediate tool outputs before storing them in the scratchpad, keeping only relevant extracted facts',
      'Force users to start a brand-new account after every three messages',
      'Disable tool calling after turn 1'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Keep raw noisy tool payloads out of the running conversation history—distill them first.',
    explanation: 'Unbounded tool outputs cause context bloat, driving up latency/cost and diluting attention ("lost in the middle") so the agent forgets instructions. Compressing or summarizing tool observations before adding them to short-term scratchpad memory preserves focus and unit economics.',
    awsComparison: 'Classic Software PM paginates large database responses so UIs stay snappy; AI PM summarizes/filters tool payloads so the agent’s context window stays lean and focused.'
  },
  {
    id: 'aipc-a5-036',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Parallel vs. Sequential Agents',
    difficulty: 3,
    format: 'sequence',
    prompt: 'Order the steps of a Parallel Fan-Out / Synthesis workflow for an AI due-diligence brief that checks Financial Filings, Legal News, and Customer Reviews simultaneously.',
    correctSequence: [
      'Intake step validates the target company identifier and defines the three independent research briefs',
      'Dispatcher invokes Financial, Legal, and Customer Review sub-agents in parallel so latencies overlap rather than stack',
      'Aggregator collects all three structured findings and checks whether any branch timed out or returned insufficient data',
      'Synthesizer composes the unified due-diligence memo with source citations and flags any incomplete sections'
    ],
    awsBridgeHint: 'Validate input -> fan out independent branches together -> gather/verify completeness -> synthesize final report.',
    explanation: 'When research tasks do not depend on each other, running sub-agents in parallel cuts total wall-clock latency to the slowest branch instead of the sum of all branches, followed by completeness checking and final synthesis.',
    awsComparison: 'Classic Software PM fans out independent API calls concurrently; AI PM uses parallel sub-agents when branches are independent to keep multi-agent latency tolerable.'
  },
  {
    id: 'aipc-a5-037',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Dynamic Tool Selection Scale',
    difficulty: 3,
    format: 'single',
    prompt: 'Your enterprise platform integrates with 120 external SaaS tools. Passing all 120 tool schemas into every agent turn bloats input tokens and causes the model to pick the wrong tools. How do mature agent architectures solve tool overload?',
    options: [
      'Randomly drop 100 tools on every request regardless of user intent',
      'Combine all 120 APIs into one giant tool with 400 optional parameters',
      'Use a lightweight intent router or semantic tool retrieval step to inject only the top relevant tools (e.g., 5–10) for the current task',
      'Ask the end user to memorize and type internal API endpoint names'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Just like RAG retrieves relevant documents instead of stuffing an entire library into context, retrieve only the relevant tools.',
    explanation: 'Stuffing dozens of tool schemas into context wastes tokens and degrades tool-selection accuracy. Dynamically retrieving or routing only the subset of relevant tools for the user’s intent keeps the planner sharp and cost-effective.',
    awsComparison: 'Classic Software PM groups menus by workspace role so users aren’t overwhelmed; AI PM scopes/retrieves only relevant tools per turn so the model isn’t overwhelmed.'
  },
  {
    id: 'aipc-a5-038',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Prompt-to-Code Hybridization',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement about combining deterministic code with AI agents.',
    statements: [
      {
        statement: 'Calculations like tax math, date arithmetic, and currency formatting should be offloaded from the LLM to deterministic code or calculator tools.',
        answer: true
      },
      {
        statement: 'Validating a user’s access permissions in deterministic backend code before executing an agent’s tool call is safer than asking the model in the prompt to "only access allowed records."',
        answer: true
      },
      {
        statement: 'Because AI agents are probabilistic, all business logic—including basic input validation and RBAC checks—must be written exclusively as natural-language prompt rules.',
        answer: false
      }
    ],
    awsBridgeHint: 'Use code for what code does reliably (math, permissions, validation) and models for what models do well (ambiguity, synthesis).',
    explanation: 'Great AI products blend deterministic code with probabilistic reasoning. Never rely on polite prompt instructions for security permissions or arithmetic when deterministic backend code guarantees 100% enforcement.',
    awsComparison: 'Classic Software PM relies 100% on deterministic code; AI PM intentionally partitions deterministic guarantees (security, math, schemas) from probabilistic reasoning.'
  },
  {
    id: 'aipc-a5-039',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Prototyping Stakeholder Alignment',
    difficulty: 1,
    format: 'single',
    prompt: 'Why is sharing a live low-code prototype (with real examples of both successes and awkward edge cases) especially valuable during executive stakeholder reviews?',
    options: [
      'It replaces the need for any post-launch monitoring',
      'It guarantees zero legal compliance requirements',
      'It eliminates all model inference costs in production',
      'It calibrates stakeholder expectations around probabilistic behavior early, preventing surprise when the AI isn’t 100% deterministic like traditional UI'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Executives often expect software to be 100% deterministic unless they interact with a live probabilistic prototype.',
    explanation: 'Static slide decks make AI look magical and infallible. Letting leadership interact with a live low-code prototype—including edge cases—builds shared realism about accuracy thresholds, latency, and why guardrails and HITL UX are necessary.',
    awsComparison: 'Classic Software PM demos polished slide flows assuming deterministic logic; AI PM demos live probabilistic prototypes early to align leadership on realistic quality bars.'
  },
  {
    id: 'aipc-a5-040',
    track: 'aipc',
    act: 5,
    domain: 'aipc-prototyping-agents',
    subtopic: 'Agent Kill Switch & Rollback',
    difficulty: 2,
    format: 'single',
    prompt: 'After launching an autonomous email-draft-and-send agent for sales reps, telemetry shows a sudden spike in out-of-policy discount offers after an upstream CRM field changed format. What PM-specified operational controls enable rapid containment?',
    options: [
      'Feature-flag kill switch to immediately downgrade from autonomous send to draft-only mode, plus reversible action logs',
      'Waiting two weeks for the next quarterly roadmap cycle to inspect the logs',
      'Deleting the entire sales CRM database',
      'Increasing the model’s token budget per turn'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think progressive autonomy: when live telemetry degrades, flip a switch to drop from autonomous execution back to human-reviewed drafts.',
    explanation: 'Production agents need instant feature flags / kill switches to throttle or step down autonomy (e.g., auto-send -> draft-only) without redeploying code, paired with audit logs to identify affected actions.',
    awsComparison: 'Classic Software PM uses feature flags to roll back buggy UI releases; AI PM uses autonomy-level feature flags to step agents down from "act" to "suggest/draft" instantly.'
  }
];
