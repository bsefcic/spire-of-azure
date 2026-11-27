import type { ExamQuestion } from '../../types/curriculum';

export const AIPC_ACT2_QUESTIONS: ExamQuestion[] = [
  {
    id: 'aipc-a2-001',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'High-ROI AI vs. AI-Washing',
    difficulty: 1,
    format: 'single',
    prompt: 'An executive asks your team to add a floating "Ask AI" chatbot to your B2B analytics dashboard because competitors announced one. User research shows customers simply want to filter invoices by date range and export CSVs—currently hidden under three sub-menus. What is the right AI PM response?',
    options: [
      'Push back against AI-washing, fix the navigation and filter UX deterministically, and reserve AI for genuinely ambiguous high-friction workflows',
      'Launch the chatbot immediately with a system prompt instructing it to describe where the CSV menu is located',
      'Train a custom open-weight model to generate fake invoice previews inside chat bubbles',
      'Add a chatbot and charge an extra $20/seat to recover development costs'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Never bolt probabilistic chat onto a problem solved faster and more reliably by clear UI controls.',
    explanation: 'Adding a chatbot where a two-click deterministic filter solves the user pain is classic "AI-washing"—slowing users down while adding inference COGS and hallucination risk. Strong AI PMs fix deterministic UX flaws directly and target AI at messy, unstructured bottlenecks where traditional UI falls short.',
    awsComparison: 'Classic PMs sometimes ship executive pet features for optics; AI PMs filter out shiny-object solutionism by asking whether deterministic UI solves the job faster and cheaper.'
  },
  {
    id: 'aipc-a2-002',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'USP & Customer Workflow Fit',
    difficulty: 2,
    format: 'single',
    prompt: 'You lead product for a specialized construction-bidding platform whose Unique Selling Proposition (USP) is hyper-accurate regional material cost estimation. Which AI investment most strongly reinforces your USP?',
    options: [
      'Building a generic AI email writer for contractors to compose holiday newsletters',
      'Embedding an AI blueprint-and-spec analyzer directly inside the bid builder that cross-checks contractor specs against your proprietary regional pricing history',
      'Launching a standalone general-purpose trivia bot inside the company mobile app',
      'Replacing your verified historical cost database entirely with an ungrounded general LLM'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Put AI directly inside the core decision bottleneck where your proprietary advantage already lives.',
    explanation: 'High-impact AI features amplify a product’s core USP inside the user’s primary workflow—combining blueprint parsing with proprietary regional cost data creates immediate differentiation competitors cannot copy. Generic email writers or ungrounded general bots dilute focus and invite commoditization.',
    awsComparison: 'Classic PMs bolt generic add-ons onto sidebars; AI PMs weave intelligence into the proprietary workflow step that drives customer willingness to pay.'
  },
  {
    id: 'aipc-a2-003',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Thin Wrappers vs. Defensible Moats',
    difficulty: 1,
    format: 'single',
    prompt: 'A startup launches a PDF summarizer whose entire differentiation is a clever three-paragraph system prompt wrapped around a commercial frontier LLM API. Six months later, the model provider releases native PDF summarization for free. Why did the startup get wiped out?',
    options: [
      'They used Temperature 0.2 instead of Temperature 0.7',
      'They priced on a usage basis instead of annual contracts',
      'They built a "thin LLM wrapper" lacking proprietary data, deep workflow integration, or system-of-record lock-in',
      'Their UI streamed tokens too quickly for users to read'
    ],
    correctIndices: [2],
    awsBridgeHint: 'When your only secret sauce is a prompt on someone else’s foundation model, one upstream release absorbs your product.',
    explanation: 'Thin wrappers rely solely on prompt cleverness atop commodity frontier APIs, leaving zero defensibility when model vendors absorb common horizontal features. Durable AI products anchor into proprietary domain data, complex multi-step workflows, and deep enterprise integrations.',
    awsComparison: 'Classic PMs protect UI features with speed-to-market; AI PMs assume prompt UIs are instantly copyable and build moats around data, integrations, and workflow context.'
  },
  {
    id: 'aipc-a2-004',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Proprietary Data Moats & Flywheels',
    difficulty: 2,
    format: 'single',
    prompt: 'Your customer support AI drafts replies that agents edit before sending. How do you turn this interaction into a genuine **proprietary data flywheel** rather than a static integration?',
    options: [
      'Scrape public Wikipedia articles weekly and append them to the system prompt',
      'Ask agents to rate the AI with a generic 1–5 star popup once per quarter',
      'Switch to a larger context window every time the model vendor raises prices',
      'Capture structured agent edits and final resolution outcomes (accept/reject/diff), feed those verified pairs back into evaluation sets and retrieval/tuning loops, and steadily raise draft acceptance rates'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Think about capturing the exact moment domain experts correct the AI inside real daily work—and closing the loop.',
    explanation: 'A true data flywheel logs high-signal workflow telemetry—specifically how expert users edit AI drafts and whether those replies resolve tickets—creating proprietary training and evaluation datasets no competitor can buy. Public web scraping or vague quarterly surveys never compound product quality.',
    awsComparison: 'Classic PMs track click metrics only for analytics dashboards; AI PMs instrument human edits and outcomes as compounding assets that improve future model performance.'
  },
  {
    id: 'aipc-a2-005',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Build vs. Buy vs. Frontier APIs',
    difficulty: 2,
    format: 'single',
    prompt: 'You have 6 weeks to prove whether an AI clinical-note drafter drives real adoption with pilot clinics before the board approves a $1.5M annual budget. Which sourcing strategy fits best right now?',
    options: [
      'Integrate a leading frontier commercial API with strong enterprise privacy commitments to validate workflow value fast before making heavy model commitments',
      'Spend 4 months pre-training a bespoke language model from scratch on clinic notes',
      'Self-host and fine-tune a 70B open-weight model from day one before validating user demand',
      'Build your own tokenization algorithm before interviewing pilot clinicians'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Optimize for learning speed and time-to-value during early product discovery—do not prematurely optimize unit cost before PMF.',
    explanation: 'Commercial frontier APIs deliver state-of-the-art quality in days with minimal engineering overhead, letting PMs prove real customer adoption and willingness to pay inside a 6-week window. Pre-training or heavy self-hosting before proving demand burns months on premature optimization.',
    awsComparison: 'Classic PMs avoid third-party dependencies when planning long-term architecture; AI PMs use frontier APIs first to de-risk user value, then optimize sourcing once volume scales.'
  },
  {
    id: 'aipc-a2-006',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Open-Weight Models vs. Frontier APIs',
    difficulty: 3,
    format: 'single',
    prompt: 'Six months post-launch, your AI contract-extraction product processes 50 million documents per month. Strict European banking clients forbid sending text to external vendor APIs, and your task is narrow and well-defined. Why might switching to a fine-tuned **open-weight model** (e.g., Llama or Mistral family) make strategic sense now?',
    options: [
      'Open-weight models automatically require zero engineering maintenance or evaluation testing',
      'You gain full control over data residency/privacy, avoid per-token vendor API markups at massive predictable volume, and can specialize a compact model for that narrow task',
      'Open-weight models always beat frontier commercial models on broad open-ended reasoning out of the box',
      'Open-weight models eliminate hallucinations completely when hosted privately'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Look at the three triggers in the scenario: strict data residency, huge steady volume, and a narrow specialized task.',
    explanation: 'Once a narrow workflow reaches high steady volume—or faces hard data-residency rules barring external APIs—a fine-tuned compact open-weight model can match frontier accuracy on that specific task at far lower unit cost and with complete privacy control. However, it still requires ongoing maintenance and evals.',
    awsComparison: 'Classic PMs assume open-source means "free"; AI PMs weigh open-weight unit savings and privacy control against engineering TCO and narrower general reasoning.'
  },
  {
    id: 'aipc-a2-007',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Data Readiness & Feasibility Audits',
    difficulty: 1,
    format: 'single',
    prompt: 'Before committing two engineering squads for a full quarter to build an "AI sales deal-risk predictor," what should you verify in a pre-sprint **data readiness & feasibility audit**?',
    options: [
      'Whether the marketing team has already designed the launch badge and landing page',
      'Only whether the commercial LLM vendor offers a 99.9% uptime SLA',
      'Whether historical deal notes and outcomes are actually captured, clean, legally usable for AI, and predictive of real deal risk',
      'Whether the CEO prefers usage-based or seat-based pricing'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Garbage-in, garbage-out: check whether the raw fuel exists, is clean, and is legally permitted before building the engine.',
    explanation: 'Most stalled AI initiatives fail not on model math, but on dirty, missing, siloed, or legally restricted data ("no-consent" customer records). Auditing data availability, label integrity, privacy rights, and baseline feasibility on real messy samples prevents wasting an entire quarter on an unviable build.',
    awsComparison: 'Classic PMs verify API specs and UI mocks before sprint commitment; AI PMs audit underlying data quality, coverage, and usage rights first.'
  },
  {
    id: 'aipc-a2-008',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Input vs. Output Token Economics',
    difficulty: 2,
    format: 'single',
    prompt: 'Your finance lead flags that AI unit costs ran 3x over forecast last month, even though monthly active users matched projections. Looking at logs, you notice the model writes sprawling 1,200-token essays for simple questions where a 120-token bullet list would be better UX. Why did verbosity spike COGS so sharply?',
    options: [
      'Input tokens always cost 10x more than output tokens across commercial models',
      'Verbose outputs bypass context windows and trigger hidden fine-tuning fees',
      'Model providers charge flat monthly penalties whenever responses exceed 500 words',
      'Output tokens are typically priced 3x–5x higher per token than input tokens—and add direct generation latency—so uncontrolled verbosity destroys unit margins'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Generating new tokens sequentially is far more expensive than reading input tokens in parallel.',
    explanation: 'Commercial LLM pricing reflects computational asymmetry: output tokens usually cost 3x to 5x more than input tokens and slow down total completion time. Constraining response length via prompt design and `max_tokens` caps simultaneously improves UX scannability and protects gross margins.',
    awsComparison: 'Classic PMs treat longer answers as harmless extra text; AI PMs treat every unnecessary output token as direct COGS and latency drag.'
  },
  {
    id: 'aipc-a2-009',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Context Caching Economics',
    difficulty: 2,
    format: 'single',
    prompt: 'Every query in your legal copilot sends the exact same 25,000-token firm playbook and system instructions before a 100-token user question. Which economic lever cuts repeated input-token costs dramatically without shrinking the playbook?',
    options: [
      'Prompt / Context Caching, which reuses the pre-processed static prefix across requests at heavily discounted input-token rates',
      'Increasing Temperature to 1.0 so the model reads the playbook faster',
      'Switching to an outcome-based pricing tier for end users without changing inference architecture',
      'Converting the 25,000-token playbook into an image screenshot'
    ],
    correctIndices: [0],
    awsBridgeHint: 'When the large front portion of your prompt stays identical across thousands of calls, stop paying full price to re-read it every turn.',
    explanation: 'Context (prompt) caching stores the computed prefix state of static instructions, schemas, or large reference documents so subsequent queries pay a steep discount (often 50%–90% off cached input tokens) and see lower time-to-first-token latency. Changing pricing tiers or sampling parameters leaves compute waste untouched.',
    awsComparison: 'Classic PMs cache finished API responses; AI PMs also cache static *prompt prefixes* so dynamic user questions reuse heavy background context cheaply.'
  },
  {
    id: 'aipc-a2-010',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Multi-Turn Conversation Cost Scaling',
    difficulty: 3,
    format: 'single',
    prompt: 'Your PM team models a multi-turn AI tutor assuming a 20-turn session costs 20x a 1-turn session. In production, a 20-turn chat costs closer to **210x** a single initial turn. Why?',
    options: [
      'Providers apply a quadratic surcharge penalty after 5 turns',
      'Because LLMs are stateless, each new turn typically re-sends the entire growing conversation history—making cumulative input tokens grow roughly quadratically with turn count',
      'Each chat turn doubles the Temperature parameter automatically',
      'Vector embeddings expand exponentially inside user browsers'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Turn 1 sends 1 message; Turn 2 sends 1+2; Turn 3 sends 1+2+3... what happens to the total sum over N turns?',
    explanation: 'Because inference calls are stateless, naive chat implementations resend all prior messages on every turn (1 + 2 + 3 + ... + N = N(N+1)/2), causing cumulative token volume to scale quadratically rather than linearly. Summarizing older turns, sliding windows, and prefix caching are vital to keep multi-turn COGS sane.',
    awsComparison: 'Classic PMs assume 20 user actions cost 20x 1 action; AI PMs design sliding memory windows and rolling summaries to tame quadratic chat-history costs.'
  },
  {
    id: 'aipc-a2-011',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'SaaS vs. AI Gross Margin Compression',
    difficulty: 1,
    format: 'single',
    prompt: 'Traditional B2B SaaS products routinely enjoy 80%–85% gross margins. Why do AI-native features often compress gross margins down to 50%–65% if priced identically?',
    options: [
      'AI products cannot be sold on annual B2B contracts',
      'AI models require paying human annotators manually for every live production query',
      'Every active user interaction triggers substantial variable inference COGS (compute/tokens) that scales directly with usage rather than approaching near-zero marginal cost',
      'Marketing acquisition costs are included inside Gross Margin calculations'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Compare the near-zero marginal cost of serving one extra traditional webpage versus running billions of neural parameters per click.',
    explanation: 'Traditional software enjoys near-zero marginal cost per additional click, whereas Generative AI incurs meaningful variable COGS on every inference call—and power users consume far more than casual ones. Without thoughtful model routing, caching, or usage-aligned pricing, heavy AI adoption erodes SaaS gross margins.',
    awsComparison: 'Classic SaaS PMs chase maximum user engagement at zero marginal cost; AI PMs balance engagement against variable per-query COGS to defend gross margin.'
  },
  {
    id: 'aipc-a2-012',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Flat Per-Seat Pricing Trap',
    difficulty: 2,
    format: 'single',
    prompt: 'You bundle an unlimited frontier-AI research agent into your existing $29/month flat per-seat SaaS plan. Your top 10% power users love it—running automated deep research all day—and generate $95/month each in token COGS. What strategic mistake occurred?',
    options: [
      'You forgot to add an RLHF feedback thumbs-up button to the UI',
      'You should have increased Temperature so power users received shorter answers',
      'Power users should be blocked from using the flagship feature entirely',
      'Flat unlimited per-seat pricing creates a severe mismatch with variable per-query AI COGS, turning your most engaged customers into negative-margin accounts'
    ],
    correctIndices: [3],
    awsBridgeHint: 'When your best customers cost you 3x what they pay you, the pricing model—not the customer—is broken.',
    explanation: 'Under flat unlimited per-seat pricing, traditional SaaS wins when power users love the product; in AI products with variable token COGS, heavy users quickly become unprofitable ("whale loss"). Hybrid seat + included credit tiers, model routing, or usage overages align revenue with real inference consumption.',
    awsComparison: 'Classic PMs celebrate unlimited usage under flat per-seat plans; AI PMs model P95/P99 user consumption and pair seats with credit caps or tiered usage.'
  },
  {
    id: 'aipc-a2-013',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Pricing Models: Usage vs. Outcome',
    difficulty: 2,
    format: 'single',
    prompt: 'Your AI customer-support agent autonomously resolves Tier-1 refund and order-status tickets end-to-end. Enterprise buyers hate unpredictable token bills and also question paying per human seat when AI reduces seat headcount. Which pricing model aligns best with buyer value?',
    options: [
      'Outcome-based pricing (e.g., charging a fixed fee per verified, autonomously resolved ticket) backed by clear resolution criteria',
      'Charging buyers raw per-token rates plus a 5% markup so they manage prompt length themselves',
      'Charging strictly per-human-agent seat so your revenue shrinks as your AI succeeds',
      'Giving the AI agent away free forever to boost daily active logins'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Pick the pricing unit that grows when customer value grows—even if human seat count shrinks.',
    explanation: 'Outcome-based pricing (e.g., $0.99 per successfully resolved ticket) directly ties your revenue to business value delivered while eliminating buyer fear of paying for failed bot loops or shrinking seat counts. Raw token pass-through feels technical and opaque, and pure seat pricing penalizes your own automation success.',
    awsComparison: 'Classic SaaS PMs default to per-seat licenses; AI PMs adopt usage or outcome-based pricing when AI automates work rather than merely assisting a seated worker.'
  },
  {
    id: 'aipc-a2-014',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Executive ROI Framing',
    difficulty: 1,
    format: 'single',
    prompt: 'You are pitching a Q3 AI contract-triage assistant to your CFO and VP of Operations. Which framing is strongest for securing executive sponsorship?',
    options: [
      '"Our prototype achieves an 89% F1-score and uses a 128k-token Transformer architecture."',
      '"Cutting initial NDA review from 45 minutes to 4 minutes saves 1,800 legal hours annually ($320k capacity gain) and speeds sales cycle close by 3 days, with $45k annual inference COGS."',
      '"All three of our main competitors announced generative AI press releases last quarter."',
      '"Engineers are excited to learn post-training alignment during Q3."'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Translate model metrics into dollars, hours saved, revenue velocity, and net COGS.',
    explanation: 'Executives fund measurable business outcomes—cycle-time compression, capacity unlocked, revenue impact, and net ROI after inference and maintenance costs—not technical scores like F1 or context lengths. Competitive panic and team curiosity are weak, risky justifications.',
    awsComparison: 'Classic PMs pitch feature checklists; AI PMs bridge technical eval metrics into concrete P&L impact minus ongoing AI operating costs.'
  },
  {
    id: 'aipc-a2-015',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Model Routing & Margin Defense',
    difficulty: 3,
    format: 'single',
    prompt: 'Analysis of production traffic shows 75% of user requests are straightforward intent classification or short formatting, while 25% require complex multi-step reasoning. Right now, 100% of queries hit your most expensive frontier model. Which strategy preserves quality while cutting inference COGS by ~60%?',
    options: [
      'Force users to manually pick between "Cheap Model" and "Smart Model" via a technical dropdown before every prompt',
      'Eliminate complex reasoning features so all users get only basic formatting',
      'Implement **model routing (cascading)**: route routine 75% queries to a fast, low-cost compact model and escalate only complex 25% queries to the frontier model',
      'Raise retail subscription prices 3x immediately without optimizing inference'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Use the right-sized model automatically behind the scenes instead of using a sledgehammer for every thumbtack.',
    explanation: 'Model routing (or cascading) classifies query complexity upfront and dispatches simple tasks to fast, inexpensive small models while reserving costly frontier models for genuinely hard reasoning. Users get faster responses on easy tasks and full intelligence on hard ones—protecting margins invisibly.',
    awsComparison: 'Classic PMs pick one backend engine for every call; AI PMs orchestrate a portfolio of small fast models and frontier reasoning models via routing.'
  },
  {
    id: 'aipc-a2-016',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'High-ROI Workflow Selection',
    difficulty: 2,
    format: 'single',
    prompt: 'You are prioritizing four candidate AI features for next year’s roadmap. Which candidate exhibits the strongest **high-ROI AI opportunity profile**?',
    options: [
      'Automating an annual board compliance filing that takes 2 hours once a year and carries zero tolerance for ambiguity',
      'Replacing a reliable deterministic tax-bracket calculator with an LLM guessing tax brackets',
      'Generating fun daily horoscopes inside a serious B2B payroll portal',
      'Pre-drafting high-volume insurance claim summaries (10,000/month, currently 25 mins each) where adjusters already review and approve before payout'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Look for high repetition, heavy human text synthesis cost, and a natural human-in-the-loop safety net.',
    explanation: 'High-volume, text-heavy workflows with significant labor cost and an existing human review step—like claim pre-drafting—deliver massive ROI while keeping error risk low. Rare annual filings lack volume, deterministic calculators need exact math, and payroll horoscopes are pure AI-washing.',
    awsComparison: 'Classic PMs prioritize strictly by "cool factor" or simple RICE; AI PMs filter candidates by frequency, unstructured friction, and natural error tolerance.'
  },
  {
    id: 'aipc-a2-017',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Data Flywheel Cold-Start Strategy',
    difficulty: 3,
    format: 'single',
    prompt: 'Your roadmap relies on a data flywheel where user corrections improve AI scheduling suggestions. A skeptical investor asks: "If your product needs user data to get good, why will early users stick around on Day 1?" How do you solve the **cold-start problem**?',
    options: [
      'Deliver immediate Day-1 baseline utility using strong frontier/retrieval defaults and curated expert templates, then let passive feedback compound into personalization over time',
      'Delay public launch for two years until internal interns generate 10 million synthetic clicks',
      'Launch a broken product on Day 1 and ask early customers to train it for free out of goodwill',
      'Remove all personalization features permanently so no flywheel is needed'
    ],
    correctIndices: [0],
    awsBridgeHint: 'A flywheel only spins if users get enough immediate standalone value on Day 1 to keep coming back.',
    explanation: 'Data flywheels fail if Day-1 utility is unusable ("single-player cold start"). Winning AI products combine strong out-of-the-box defaults (frontier models + curated domain knowledge) so Day-1 users get instant value, while quiet workflow capture steadily widens the personalization moat.',
    awsComparison: 'Classic PMs launch static MVPs; AI PMs solve cold start with strong baseline intelligence on Day 1 before the proprietary data loop takes over.'
  },
  {
    id: 'aipc-a2-018',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Build vs. Buy Discipline',
    difficulty: 2,
    format: 'single',
    prompt: 'Your engineering team asks for 3 months to build a custom internal meeting-transcription tool with speaker diarization so your sales-coaching team can review calls. Meanwhile, your core USP is proprietary deal-coaching playbooks. What should you recommend?',
    options: [
      'Approve the 3-month custom transcription build to showcase engineering AI skills',
      'Buy a turnkey commercial transcription tool/API for commodity speech-to-text and invest scarce engineering cycles into your differentiating deal-coaching intelligence',
      'Pre-train a new multilingual audio model from scratch before coaching any sales reps',
      'Cancel the sales-coaching initiative because transcription cannot be bought off-the-shelf'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Apply classic product strategy: buy commodity capabilities; build only where your unique differentiation lives.',
    explanation: 'Speech-to-text transcription is a mature, commoditized capability where commercial tools outperform bespoke builds at a fraction of the cost. Buying commodity layers frees your engineers to focus on proprietary deal-coaching workflows and data advantages.',
    awsComparison: 'Classic PMs know "don’t rebuild payment rails"; AI PMs apply the same rule to commoditized AI layers like generic transcription, translation, and OCR.'
  },
  {
    id: 'aipc-a2-019',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'TCO of Open-Weight Models',
    difficulty: 3,
    format: 'single',
    prompt: 'A PM proposes replacing a $4,000/month commercial LLM API bill with an "open-source, zero-license-fee" model, claiming AI costs will drop to $0. What critical **Total Cost of Ownership (TCO)** blind spot are they missing?',
    options: [
      'Open-weight models cannot accept English text inputs without paid plugins',
      'Open-weight models legally require sharing all customer data publicly',
      'Hosting dedicated inference capacity, engineering maintenance, evaluation pipelines, latency tuning, and model upgrades often cost far more than $4,000/month at modest scale',
      'Open-weight models cannot output structured JSON'
    ],
    correctIndices: [2],
    awsBridgeHint: '"Free to download" weights still require specialized capacity and full-time engineering upkeep to run reliably in production.',
    explanation: 'At $4,000/month in API spend, dedicated hosting capacity and the engineering hours required for uptime, scaling, security patching, and evaluation maintenance far exceed the commercial API bill. Open-weight economics only win once volume, latency, or strict privacy rules cross the TCO breakeven point.',
    awsComparison: 'Classic PMs sometimes mistake open-source licensing for free operation; AI PMs calculate full TCO—compute + specialized engineering—before leaving managed APIs.'
  },
  {
    id: 'aipc-a2-020',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Time-to-Value & Incremental Rollout',
    difficulty: 2,
    format: 'single',
    prompt: 'Leadership wants an autonomous AI procurement negotiator, projected to take 11 months of complex ERP integration and safety testing. How should an AI PM restructure the roadmap for faster **time-to-value**?',
    options: [
      'Commit to the 11-month big-bang release so users only see the finished autonomous agent',
      'Ask procurement officers to wait 11 months while collecting manual spreadsheets',
      'Skip safety testing completely to ship full autonomous vendor emailing in 3 weeks',
      'Ship a high-value "copilot" slice in 6 weeks (drafting vendor counter-offers for human sign-off), proving ROI and gathering negotiation feedback toward future autonomy'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Deliver immediate copilot value with human approval first while collecting the real-world edge cases needed for safe autonomy later.',
    explanation: 'Starting with a human-in-the-loop copilot delivers measurable time savings in weeks rather than a year, de-risks edge cases safely, and captures real negotiation edits that inform later automation stages. Big-bang 11-month AI bets risk shifting market realities and wasted investment.',
    awsComparison: 'Classic PMs slice releases by UI screens; AI PMs slice releases along the autonomy spectrum (suggest -> draft -> semi-auto -> autonomous).'
  },
  {
    id: 'aipc-a2-021',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Unit Economics Modeling (Average vs. P95)',
    difficulty: 1,
    format: 'single',
    prompt: 'When building an AI feature’s unit economics spreadsheet before pricing launch, why is modeling **only the average (mean) queries per user** dangerous?',
    options: [
      'AI usage is heavily skewed: a small slice of power users can generate 10x–30x the mean token COGS, distorting blended gross margins if uncapped',
      'Average token counts cannot be multiplied by per-token pricing',
      'Commercial APIs only bill for median users rather than total monthly tokens',
      'Mean usage ignores fixed engineering salaries inside unit COGS'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think about skewed heavy-tailed usage distributions in interactive AI tools.',
    explanation: 'Interactive AI products exhibit steep power-law usage: most users ask a few questions while 5%–10% run massive batch workflows or deep multi-turn loops. Modeling P90/P95 consumption alongside the mean reveals margin exposure and tells PMs where soft caps, caching, or tier upgrades are required.',
    awsComparison: 'Classic SaaS PMs model average server load comfortably; AI PMs stress-test P95/P99 token consumption because heavy users directly compress gross margin.'
  },
  {
    id: 'aipc-a2-022',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Outcome-Based Pricing Readiness',
    difficulty: 3,
    format: 'single',
    prompt: 'An AI HR recruiting platform wants to switch from per-seat SaaS pricing to **outcome-based pricing** ("$500 per qualified hire"). Before rolling this out, what foundational requirement must be true?',
    options: [
      'Every job description must be written with Temperature = 1.0',
      'The causal outcome must be unambiguously measurable, cleanly attributable to the AI workflow, and auditable without endless customer disputes',
      'The platform must switch exclusively to an open-weight model',
      'Hiring managers must be prohibited from interviewing candidates manually'
    ],
    correctIndices: [1],
    awsBridgeHint: 'What happens to billing disputes if "qualified hire" or "who gets credit" is fuzzy?',
    explanation: 'Outcome-based pricing works wonderfully for crisp, machine-verifiable events (like an autonomously closed refund ticket), but breaks down when attribution is murky or delayed (like whether a hire succeeded because of AI sourcing vs. a recruiter’s network). Clear attribution and mutual auditability are prerequisites.',
    awsComparison: 'Classic PMs pick pricing tiers from competitor benchmarks; AI PMs validate attribution clarity and dispute risk before promising pure outcome-based billing.'
  },
  {
    id: 'aipc-a2-023',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Data Readiness Discovery',
    difficulty: 2,
    format: 'single',
    prompt: 'During an AI feasibility audit for an automated maintenance scheduler, you discover equipment failure logs exist only as scanned handwritten PDFs from 40 regional depots with inconsistent codes. What should you update first?',
    options: [
      'Immediately promise the executive team a 95% accuracy launch next month',
      'Skip cleaning the logs and double the LLM context window instead',
      'Re-scope the roadmap to first digitize/standardize incoming logs and validate extraction quality on a pilot depot before promising predictive scheduling',
      'Switch pricing from per-seat to outcome-based immediately'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Never promise predictive AI magic on top of unstandardized, illegible historical records without fixing the data foundation first.',
    explanation: 'Inconsistent codes and messy scanned handwritten PDFs will cripple predictive accuracy regardless of which model you pick. Re-scoping into a phased data-capture and extraction pilot sets realistic stakeholder expectations and builds clean telemetry for future prediction.',
    awsComparison: 'Classic PMs treat existing database fields as ready to query; AI PMs frequently discover that "getting data usable" is Phase 1 of the product itself.'
  },
  {
    id: 'aipc-a2-024',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Total AI ROI & Ongoing Lifecycle Cost',
    difficulty: 3,
    format: 'single',
    prompt: 'Your CFO compares an AI feature’s ROI to a standard UI feature assuming zero ongoing cost after launch day. Which ongoing cost line items must an AI PM include for an honest ROI model?',
    options: [
      'Only the initial UX designer hours spent in Figma',
      'One-time domain registration fees for the company website',
      'Only annual office electricity bills unrelated to product usage',
      'Variable inference COGS scaling with adoption, ongoing human/automated eval curation, and periodic prompt/model migration maintenance'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Unlike static UI code, AI products incur per-query inference bills and need continuous evaluation upkeep as models and inputs evolve.',
    explanation: 'An honest AI business case tracks both upfront build costs and recurring operating costs: per-query token COGS (which grow with success!), evaluation dataset curation, quality monitoring, and migrating prompts when foundation models deprecate or drift.',
    awsComparison: 'Classic PMs amortize upfront R&D over near-zero runtime cost; AI PMs model ongoing inference COGS and continuous eval maintenance inside ROI payback.'
  },
  {
    id: 'aipc-a2-025',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Hybrid Seat + Usage Pricing',
    difficulty: 1,
    format: 'single',
    prompt: 'Enterprise procurement teams demand predictable annual budgets, yet your AI video-analysis tool incurs heavy per-minute inference COGS. Which pricing structure balances enterprise budget predictability with gross-margin protection?',
    options: [
      'Hybrid pricing: a predictable base per-seat (or platform) fee that includes a generous monthly AI credit allowance, plus metered overage or tier upgrades for heavy usage',
      'Completely unlimited free AI usage across all $10/month entry seats',
      'Charging random daily variable prices based on real-time model provider spot rates',
      'Eliminating annual contracts and forcing users to enter a credit card before every single click'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Give buyers budget certainty for 85% of normal work while capping extreme tail consumption.',
    explanation: 'Hybrid seat-plus-credit pricing gives procurement predictable baseline spend while protecting your gross margin from extreme heavy-usage outliers via clear allowances and expansion tiers. Unlimited flat pricing loses money on power users, while per-click billing creates terrible purchase friction.',
    awsComparison: 'Classic SaaS PMs sell pure unlimited seats; AI PMs combine base subscription predictability with included usage envelopes to safeguard margins.'
  },
  {
    id: 'aipc-a2-026',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'System-of-Record & Workflow Advantage',
    difficulty: 3,
    format: 'single',
    prompt: 'Two competing B2B tax platforms use the exact same frontier commercial LLM API. Platform A merely embeds a chat window; Platform B auto-pulls verified client ledger balances, applies jurisdiction rules, logs audit trails, and files returns directly. Why does Platform B command 4x higher pricing and retention?',
    options: [
      'Platform B likely uses a higher Temperature setting in its API calls',
      'Platform B owns the system-of-record data, deterministic compliance guardrails, and end-to-end execution workflow—making the underlying LLM an interchangeable engine rather than the product',
      'Platform B uses longer system prompts with more exclamation marks',
      'Platform B avoids integrating with client ledgers so chats stay simpler'
    ],
    correctIndices: [1],
    awsBridgeHint: 'The LLM is a commoditizing reasoning engine; durable enterprise value sits in the context fed in and the trusted action taken out.',
    explanation: 'When competitors access identical foundation APIs, advantage shifts to owning authoritative client data (system of record), embedding domain compliance checks, and executing closed-loop actions inside the workflow. That makes the model swappable while customer switching costs remain high.',
    awsComparison: 'Classic PMs win via workflow completeness and system-of-record lock-in; AI PMs win the exact same way—treating foundation models as swappable engines.'
  },
  {
    id: 'aipc-a2-027',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Steel-Thread Feasibility Validation',
    difficulty: 2,
    format: 'single',
    prompt: 'Before greenlighting a 10-week build for an AI medical-coding assistant, you spend 4 days testing 50 real, messy anonymized clinical charts against a baseline model and measuring accuracy with two coding specialists. What is the goal of this rapid "steel thread" spike?',
    options: [
      'To finalize the production CSS animations for the launch dashboard',
      'To prove the model never needs human oversight in production',
      'To validate technical feasibility and real-world ceiling accuracy on messy customer data early, before burning 10 weeks of full-team sprint capacity',
      'To negotiate enterprise annual pricing contracts before testing quality'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Fail fast on real messy examples in days rather than discovering fundamental accuracy gaps in Week 9.',
    explanation: 'AI feasibility cannot be guaranteed from a PRD mockup—it must be tested empirically against ugly, representative real-world inputs. A short 4-day spike reveals edge cases, error patterns, and latency realities before committing an entire squad for a quarter.',
    awsComparison: 'Classic PMs de-risk builds with architecture specs and Figma prototypes; AI PMs add empirical feasibility spikes on real sample data before committing sprints.'
  },
  {
    id: 'aipc-a2-028',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Identifying AI-Washing',
    difficulty: 2,
    format: 'multi',
    prompt: 'Select TWO red flags indicating a proposed roadmap item is **"AI-washing"** rather than a sound AI product investment.',
    options: [
      'Replacing a clear 2-click dropdown filter with a slower, probabilistic chat prompt just to feature "AI" in marketing slides',
      'Using an LLM to cluster and summarize 5,000 messy open-ended survey responses per week',
      'Embedding an AI drafting copilot inside an existing document editor where users spend 4 hours daily',
      'Starting with "We must launch a generative AI feature this quarter" without identifying a painful customer workflow or measurable ROI metric'
    ],
    correctIndices: [0, 3],
    selectCount: 2,
    awsBridgeHint: 'Look for solutions chasing a press-release buzzword or degrading an already simple deterministic interaction.',
    explanation: 'Replacing crisp deterministic UI controls with chat or starting from "we need an AI feature" instead of a customer bottleneck are classic symptoms of AI-washing. Summarizing messy open-ended feedback and drafting inside high-time-spent workflows address real unstructured friction.',
    awsComparison: 'Classic PMs avoid building features nobody asked for; AI PMs specifically guard against forcing probabilistic chat onto simple deterministic UI tasks.'
  },
  {
    id: 'aipc-a2-029',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Durable AI Product Moats',
    difficulty: 3,
    format: 'multi',
    prompt: 'Which THREE assets create a **durable competitive moat** for an AI product even as underlying frontier models rapidly commoditize?',
    options: [
      'Proprietary workflow telemetry capturing how domain experts edit, accept, or reject AI outputs',
      'Deep integrations into customers’ systems of record that supply privileged context and execute downstream actions',
      'Unique, domain-specific evaluation datasets built from real production edge cases',
      'Keeping a clever 300-word prompt secret inside your backend code'
    ],
    correctIndices: [0, 1, 2],
    selectCount: 3,
    awsBridgeHint: 'Prompts are easily reverse-engineered or outgrown; look at compounding data, integrations, and proprietary quality benchmarks.',
    explanation: 'Proprietary expert-correction loops, deep system-of-record integrations, and hard-won domain evaluation sets compound over time and cannot be replicated overnight. Secret system prompts alone are trivial to imitate and offer zero long-term defensibility.',
    awsComparison: 'Classic PMs build moats via network effects and switching costs; AI PMs add compounding data flywheels and proprietary eval benchmarks to those moats.'
  },
  {
    id: 'aipc-a2-030',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Token COGS Optimization Levers',
    difficulty: 2,
    format: 'multi',
    prompt: 'Select TWO engineering/product levers that cut **LLM inference COGS** meaningfully without degrading core user experience.',
    options: [
      'Increasing output Temperature to 1.5 so the model chooses cheaper tokens',
      'Routing routine classification/formatting tasks to compact fast models while reserving frontier models for complex reasoning',
      'Enabling prompt/context caching on large repeated system instructions and static reference documents',
      'Removing all context from prompts so users must manually re-explain company policies every message'
    ],
    correctIndices: [1, 2],
    selectCount: 2,
    awsBridgeHint: 'Think about right-sizing model intelligence per query and avoiding re-paying for identical static prefixes.',
    explanation: 'Model routing cuts wasted frontier spend on easy queries, and context caching eliminates full-price re-computation of repeated static prefixes. Raising Temperature does not lower token prices (and hurts quality), while stripping helpful context degrades UX.',
    awsComparison: 'Classic PMs optimize database queries and image compression; AI PMs optimize model routing, prefix caching, and output conciseness.'
  },
  {
    id: 'aipc-a2-031',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'AI Pricing & Margin Best Practices',
    difficulty: 3,
    format: 'multi',
    prompt: 'Which THREE practices help AI PMs protect **gross margins** when pricing AI-enabled B2B products?',
    options: [
      'Modeling unit economics at P90/P95 power-user consumption rather than relying solely on average usage',
      'Offering unlimited frontier-model agent runs on low-cost flat per-seat tiers indefinitely',
      'Aligning pricing metrics (hybrid credit allowances or outcome fees) with variable inference value and cost',
      'Tracking per-feature inference COGS separately in product analytics alongside revenue per account'
    ],
    correctIndices: [0, 2, 3],
    selectCount: 3,
    awsBridgeHint: 'Remember heavy-tailed usage distributions, value-aligned pricing units, and continuous per-feature COGS visibility.',
    explanation: 'Stress-testing P95 usage, pairing pricing structures with variable cost/value, and instrumenting per-feature COGS prevent margin shocks. Unlimited frontier usage on cheap flat seats turns your most active users into loss-making accounts.',
    awsComparison: 'Classic SaaS PMs rarely monitor per-click COGS per user; AI PMs treat per-feature token COGS as a first-class product health metric.'
  },
  {
    id: 'aipc-a2-032',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Opportunity Sizing & Workflow Fit',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement about AI opportunity sizing and workflow fit:',
    statements: [
      {
        statement: 'High-frequency workflows involving unstructured text, synthesis, or triage—where humans can quickly review drafts—are prime candidates for high-ROI AI.',
        answer: true
      },
      {
        statement: 'If a simple deterministic rule or UI filter already solves the problem reliably, adding a conversational AI layer usually improves speed and lowers cost.',
        answer: false
      },
      {
        statement: 'AI features deliver strongest retention when embedded directly inside users’ existing daily workflows rather than isolated in separate novelty tabs.',
        answer: true
      }
    ],
    awsBridgeHint: 'Match AI to messy, frequent bottlenecks inside the core workflow—not simple tasks already solved cleanly by classic UI.',
    explanation: 'AI shines on repetitive, unstructured synthesis inside core workflows where review friction is low. Replacing simple deterministic UI with chat slows users down, adds cost, and introduces avoidable errors.',
    awsComparison: 'Classic PMs optimize clicks inside existing flows; AI PMs collapse multi-step synthesis work while resisting the urge to turn every button into a chatbox.'
  },
  {
    id: 'aipc-a2-033',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Build vs. Buy & Model Sourcing',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement about Build vs. Buy and Commercial APIs vs. Open-Weight models:',
    statements: [
      {
        statement: 'Frontier commercial APIs are typically the fastest way to validate customer demand and willingness-to-pay during early product discovery.',
        answer: true
      },
      {
        statement: 'Pre-training a brand-new LLM from scratch is almost always recommended for a Series A B2B SaaS company launching its first AI assistant.',
        answer: false
      },
      {
        statement: 'Open-weight models become attractive at scale when strict data residency, deep task specialization, or unit-cost control outweigh dedicated hosting and engineering overhead.',
        answer: true
      }
    ],
    awsBridgeHint: 'Start fast to prove value; specialize into open-weight or custom builds only when scale, privacy, or differentiation truly justify TCO.',
    explanation: 'Commercial APIs minimize time-to-value for discovery, whereas open-weight models pay off once high predictable volume or strict privacy constraints outweigh operational TCO. Pre-training from scratch makes sense only for rare foundational research bets.',
    awsComparison: 'Classic PMs rarely rebuild commoditized infrastructure; AI PMs treat frontier APIs as rapid validation engines and open-weight models as scale/privacy optimizations.'
  },
  {
    id: 'aipc-a2-034',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Token Economics & Caching',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement about LLM token inference economics:',
    statements: [
      {
        statement: 'Output tokens are generally priced substantially higher per token than input tokens, making overly verbose replies expensive.',
        answer: true
      },
      {
        statement: 'In a stateless multi-turn chat that re-sends full history each turn, total token spend grows strictly linearly with the number of turns.',
        answer: false
      },
      {
        statement: 'Context caching lowers cost and latency when a large static prompt prefix (instructions or reference docs) is reused across many requests.',
        answer: true
      }
    ],
    awsBridgeHint: 'Check output vs. input pricing, cumulative conversation history growth, and static prefix reuse.',
    explanation: 'Output tokens cost more and take longer to generate, while context caching discounts repeated static prefixes. Re-sending growing chat histories each turn causes cumulative token consumption to grow quadratically, not linearly.',
    awsComparison: 'Classic PMs view API calls as flat-rate requests; AI PMs actively engineer prompt conciseness, memory truncation, and prefix caching to control COGS.'
  },
  {
    id: 'aipc-a2-035',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'AI Gross Margins & COGS',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement about gross margins in traditional SaaS vs. AI products:',
    statements: [
      {
        statement: 'Because every AI query triggers nontrivial compute/token COGS, AI products frequently experience lower gross margins than traditional 80%+ margin SaaS.',
        answer: true
      },
      {
        statement: 'Under flat unlimited per-seat pricing, a customer’s heavy AI adoption always increases your gross margin percentage.',
        answer: false
      },
      {
        statement: 'Smart model routing—sending simple queries to small models—helps restore SaaS-like gross margins without hurting quality on hard tasks.',
        answer: true
      }
    ],
    awsBridgeHint: 'Remember how variable per-query cost flips the traditional SaaS "unlimited engagement = pure profit" equation.',
    explanation: 'Variable inference COGS compresses traditional SaaS margins and can turn uncapped flat-rate power users unprofitable. Routing routine tasks to compact models keeps variable COGS disciplined while preserving frontier quality where needed.',
    awsComparison: 'Classic SaaS PMs assume higher usage always boosts unit profitability; AI PMs manage margin compression actively through routing, caps, and value-aligned pricing.'
  },
  {
    id: 'aipc-a2-036',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Data Moats, Flywheels & Thin Wrappers',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement about AI defensibility and data moats:',
    statements: [
      {
        statement: 'A product whose main differentiator is prompt formatting atop a public API is vulnerable to immediate commoditization by foundation model updates.',
        answer: true
      },
      {
        statement: 'Simply storing raw user chat logs without capturing quality outcomes, corrections, or resolution labels automatically creates a strong data flywheel.',
        answer: false
      },
      {
        statement: 'Combining proprietary customer data, workflow action hooks, and continuous human-correction feedback builds compounding defensibility.',
        answer: true
      }
    ],
    awsBridgeHint: 'Ask whether noisy raw logs alone improve intelligence, or whether verified outcome/correction signals are required.',
    explanation: 'Thin prompt wrappers are easily absorbed by model vendors, whereas deep workflow integrations and expert-correction loops compound defensibility. Raw unlabelled logs without outcome or edit signals create storage clutter rather than a working flywheel.',
    awsComparison: 'Classic PMs track volume metrics ("millions of logs"); AI PMs prize high-signal labeled outcomes ("how experts corrected our draft").'
  },
  {
    id: 'aipc-a2-037',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Executive ROI, Audits & Pricing',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement about executive ROI framing, readiness audits, and AI pricing:',
    statements: [
      {
        statement: 'Auditing data availability, cleanliness, and customer consent rights before committing engineering sprints prevents costly mid-quarter stalls.',
        answer: true
      },
      {
        statement: 'Outcome-based pricing works best when causal attribution is vague and results take 18 months to observe.',
        answer: false
      },
      {
        statement: 'Strong executive ROI pitches translate AI capability into tangible business KPIs (hours saved, faster cycle time, net margin after inference COGS).',
        answer: true
      }
    ],
    awsBridgeHint: 'Outcome pricing demands crisp, auditable attribution; executive pitches demand P&L impact over technical benchmarks.',
    explanation: 'Pre-sprint data audits catch fatal blockers early, and executive pitches win on P&L outcomes net of ongoing AI costs. Outcome-based pricing requires crisp, short-cycle verifiable attribution—vague long-lag outcomes trigger constant billing disputes.',
    awsComparison: 'Classic PMs pitch feature velocity; AI PMs de-risk data readiness early and tie business cases to net economic value minus recurring COGS.'
  },
  {
    id: 'aipc-a2-038',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'AI Opportunity Discovery Sequence',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Order the strategic sequence an AI PM follows before committing a full engineering squad to build a new AI capability:',
    correctSequence: [
      'Identify a high-friction, high-value customer workflow aligned with company USP',
      'Audit data readiness, privacy consent, and technical feasibility on real messy samples',
      'Validate workflow value and unit economics quickly using a low-cost baseline prototype',
      'Commit full roadmap capacity with clear business KPIs and margin guardrails'
    ],
    awsBridgeHint: 'Start with customer pain and USP alignment, verify data/feasibility, test value cheaply, and only then commit full engineering.',
    explanation: 'Great AI strategy begins with an authentic workflow bottleneck tied to USP, checks data/consent readiness and real-sample feasibility before writing production code, validates ROI/unit costs with a fast prototype, and only then commits multi-sprint engineering capacity.',
    awsComparison: 'Classic PMs jump from discovery interviews to roadmap estimation; AI PMs insert an explicit data-readiness and real-sample feasibility gate before full commitment.'
  },
  {
    id: 'aipc-a2-039',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'AI Pricing & Margin Evolution',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the typical commercial maturity path for pricing and managing unit economics of a new B2B AI product:',
    correctSequence: [
      'Validate customer willingness-to-pay and core workflow ROI during gated pilot access',
      'Instrument per-feature and P95 user inference COGS across real production usage',
      'Launch hybrid subscription + credit/tier guardrails to protect gross margins',
      'Optimize COGS via routing/caching and explore outcome-based tiers where attribution is crisp'
    ],
    awsBridgeHint: 'Prove value first, measure real skewed costs second, cap margin exposure commercially, and refine economics at scale.',
    explanation: 'Teams first prove real buyer value in bounded pilots, measure skewed P95 inference COGS in production, introduce hybrid seat-plus-allowance tiers to prevent negative-margin whales, and progressively optimize COGS or adopt outcome pricing as attribution matures.',
    awsComparison: 'Classic SaaS pricing stays largely static for years; AI pricing evolves alongside instrumented token economics and maturing outcome attribution.'
  },
  {
    id: 'aipc-a2-040',
    track: 'aipc',
    act: 2,
    domain: 'aipc-strategy',
    subtopic: 'Model Sourcing & Optimization Ladder',
    difficulty: 3,
    format: 'sequence',
    prompt: 'Order the strategic model-sourcing progression from **fastest time-to-value for non-core/early work** to **deepest control at specialized high scale**:',
    correctSequence: [
      'Buy turnkey off-the-shelf tools for commoditized horizontal capabilities',
      'Integrate commercial frontier APIs to rapidly ship and validate differentiating workflows',
      'Introduce context caching and model routing across small/frontier models to defend margins',
      'Host and fine-tune open-weight models if scale, latency, or strict privacy justify full TCO'
    ],
    awsBridgeHint: 'Buy commodity first, validate differentiation on managed frontier APIs, tune economics via routing/caching, and self-host open-weight only when scale demands.',
    explanation: 'Smart AI PMs buy commoditized capabilities outright, use frontier APIs to validate unique product workflows fast, defend margins with routing and caching as adoption grows, and take on open-weight hosting/tuning TCO only when volume or residency clearly justifies it.',
    awsComparison: 'Classic PMs sometimes over-architect custom components on Day 1; AI PMs climb the sourcing ladder strictly when scale, margin, or compliance forces the next step.'
  }
];
