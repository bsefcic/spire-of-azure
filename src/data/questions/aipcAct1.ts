import type { ExamQuestion } from '../../types/curriculum';

export const AIPC_ACT1_QUESTIONS: ExamQuestion[] = [
  {
    id: 'aipc-a1-001',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Traditional ML vs. GenAI',
    difficulty: 1,
    format: 'single',
    prompt: 'Your subscription SaaS team wants to predict the exact probability (0%–100%) that an enterprise account will churn next quarter based on 40 structured usage columns (logins, seat utilization, support ticket counts). Which modeling approach should you prioritize first?',
    options: [
      'Traditional supervised machine learning (e.g., gradient-boosted trees or logistic regression) trained on historical tabular churn outcomes',
      'A frontier Generative AI large language model prompted with raw CSV rows for each customer',
      'An unsupervised clustering algorithm that groups accounts without using any past churn labels',
      'A multimodal image-and-text model to visually inspect screenshots of customer billing pages'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Match the tool to the data shape: structured tabular numbers with historical outcomes have a classic, high-precision workhorse.',
    explanation: 'Traditional supervised ML (like gradient-boosted decision trees) excels at structured tabular prediction, offering calibrated probabilities, explainable feature importance, and pennies-per-thousand-predictions cost. Prompting a Generative AI LLM with CSV rows is slow, costly, and poorly calibrated for numerical regression, while unsupervised learning ignores known churn labels.',
    awsComparison: 'Classic PMs often chase the newest buzzword; AI PMs know Traditional ML beats GenAI on tabular forecasting in accuracy, latency, explainability, and unit cost.'
  },
  {
    id: 'aipc-a1-002',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Learning Paradigms',
    difficulty: 1,
    format: 'single',
    prompt: 'A consumer fitness app has 500,000 user activity logs but zero predefined persona labels. The Product Manager wants to discover natural behavioral cohorts (e.g., weekend warriors vs. daily commuters) to inform onboarding flows. Which learning paradigm fits this task?',
    options: [
      'Supervised classification using historical persona tags',
      'Unsupervised learning (clustering) to uncover hidden patterns in unlabeled behavioral data',
      'Reinforcement learning with human feedback (RLHF) to rewrite workout copy',
      'Next-token autoregressive generation to invent fictional user profiles'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Notice the key constraint in the prompt: there are no predefined labels to train against.',
    explanation: 'Unsupervised learning discovers inherent structure and groupings inside unlabeled datasets, making clustering ideal for exploratory user segmentation. Supervised learning requires pre-labeled examples, whereas RLHF and autoregressive generation are designed for sequence generation and preference alignment rather than cohort discovery.',
    awsComparison: 'Classic PMs rely on static demographic buckets; AI PMs use unsupervised clustering to surface emergent behavioral segments directly from product telemetry.'
  },
  {
    id: 'aipc-a1-003',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Discriminative vs. Generative Models',
    difficulty: 1,
    format: 'single',
    prompt: 'Which product feature is the clearest example of a **discriminative** AI model rather than a **generative** AI model?',
    options: [
      'Drafting a personalized follow-up email after a sales call',
      'Synthesizing a product marketing hero illustration from a text brief',
      'Scoring an incoming payment transaction as "Legitimate" or "Fraudulent"',
      'Summarizing a 45-minute customer discovery interview into bullet points'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think about drawing a decision boundary between existing categories versus creating brand-new content.',
    explanation: 'Discriminative models learn boundaries between classes to classify or score existing inputs—such as flagging fraud vs. legitimate transactions. Drafting emails, creating images, and writing summaries all produce novel sequences of text or pixels, which is the hallmark of generative models.',
    awsComparison: 'Classic PMs treat all "AI" as one bucket; AI PMs separate discriminative tasks (classify/route/score) from generative tasks (draft/synthesize) to set the right UX and risk guardrails.'
  },
  {
    id: 'aipc-a1-004',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Transformers & Self-Attention',
    difficulty: 2,
    format: 'single',
    prompt: 'When explaining to stakeholders why modern Transformer-based LLMs handle long, nuanced customer contracts better than older sequential text models, which intuitive property of **self-attention** should you highlight?',
    options: [
      'Self-attention deletes filler words before processing to guarantee zero hallucinations',
      'Self-attention automatically verifies every contract clause against an external legal database',
      'Self-attention translates all text into binary rules so outputs become 100% deterministic',
      'Self-attention weighs relationships between every word and every other word across the input simultaneously, preserving long-range context'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Contrast reading a document strictly left-to-right with forgetting the beginning versus connecting distant clues across the entire page at once.',
    explanation: 'Self-attention allows a Transformer to relate tokens across wide spans in parallel—for example, linking "the vendor" in paragraph 12 back to a liability cap in paragraph 2—without forgetting earlier context like older recurrent models did. It does not guarantee determinism, delete words, or query external legal databases on its own.',
    awsComparison: 'Classic PMs assume AI reads linearly like a rigid parser; AI PMs understand attention links distant context simultaneously—while still degrading when prompts grow excessively bloated.'
  },
  {
    id: 'aipc-a1-005',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Tokens & Tokenization',
    difficulty: 1,
    format: 'single',
    prompt: 'Your engineering lead warns that a prompt-length estimate based on word count is off by 35%. Why do LLMs measure text in **tokens** rather than whole words?',
    options: [
      'Tokenizers split text into frequent subword chunks, punctuation, and whitespace units, so rare words, URLs, and formatting break into multiple tokens',
      'Every model enforces a strict 1-token-per-sentence compression rule before billing',
      'Tokens count only nouns and verbs while ignoring adjectives and numbers',
      'A token always equals exactly four English words regardless of punctuation or casing'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Consider how a model handles unfamiliar jargon, numbers, and punctuation without needing an infinitely large dictionary.',
    explanation: 'Modern LLMs use subword tokenization (roughly ~0.75 English words per token on average), breaking common words into single tokens while splitting complex terms, code, URLs, and punctuation into several pieces. Estimating budgets or context limits by raw word count frequently underestimates actual token consumption.',
    awsComparison: 'Classic PMs size payloads in characters or database rows; AI PMs budget latency, context limits, and COGS in subword tokens.'
  },
  {
    id: 'aipc-a1-006',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Tokens & Multilingual Cost',
    difficulty: 2,
    format: 'single',
    prompt: 'You launch an AI help-desk assistant in English and then expand it to Japanese, Hindi, and Thai. Suddenly, average per-ticket latency and inference costs jump 2.5x for non-English users even though the translated prompts look shorter visually. What is the most likely root cause?',
    options: [
      'Non-English languages automatically trigger higher Temperature settings inside the model',
      'The model tokenizer was optimized primarily on English text, splitting non-Latin scripts into far more subword or byte tokens per sentence',
      'Multilingual prompts bypass vector embeddings and force full model retraining on every query',
      'Translation turns discriminative queries into generative queries'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Think about how a subword vocabulary built mostly from English corpora handles unfamiliar scripts.',
    explanation: 'Tokenizers trained heavily on English encode common English words as 1 token but often split non-Latin scripts into individual characters or UTF-8 bytes—multiplying token counts, latency, and cost for the exact same semantic message. Temperature, embeddings, and training loops are unrelated to this token-inflation effect.',
    awsComparison: 'Classic PMs treat localization as a static string-table swap; AI PMs audit tokenizer fertility across target languages before promising international unit economics.'
  },
  {
    id: 'aipc-a1-007',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Vector Embeddings',
    difficulty: 1,
    format: 'single',
    prompt: 'Users in your help center search for "stop my monthly charges," while your support article is titled "How to Cancel a Recurring Subscription." Keyword search returns zero results, yet an embedding-powered search surfaces the right article at #1. Why?',
    options: [
      'Embeddings rewrite the user query using a hardcoded thesaurus maintained by PMs',
      'Embeddings rank articles strictly by recent page views and click-through rate',
      'Vector embeddings map text into numeric coordinates based on semantic meaning, placing synonymous phrases close together even without shared keywords',
      'Embeddings execute an exact-character wildcard match across the article body'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think in terms of geometry of meaning rather than exact spelling.',
    explanation: 'Vector embeddings encode sentences into high-dimensional numeric vectors where semantically related concepts ("stop charges" and "cancel subscription") sit near each other in vector space. Unlike keyword search or manual synonym lists, semantic similarity captures intent across varied phrasing.',
    awsComparison: 'Classic PMs fix zero-result searches by maintaining brittle synonym dictionaries; AI PMs use vector embeddings to match user intent—while pairing them with keyword search for exact IDs.'
  },
  {
    id: 'aipc-a1-008',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Temperature & Determinism',
    difficulty: 2,
    format: 'single',
    prompt: 'You are shipping an AI workflow that extracts invoice amounts, vendor names, and due dates into strict JSON for downstream accounting. Stakeholders notice occasional creative rewording and invalid formatting. Which decoding adjustment should you make first?',
    options: [
      'Raise Temperature to 1.2 so the model explores more diverse JSON keys',
      'Increase Top-p to 1.0 and remove schema instructions to avoid constraining the model',
      'Switch from a Transformer model to an unsupervised clustering model',
      'Lower Temperature toward 0 (and constrain Top-p) so the model consistently picks the highest-probability tokens'
    ],
    correctIndices: [3],
    awsBridgeHint: 'When accuracy and format compliance matter more than creativity, do you flatten or sharpen the next-token probability distribution?',
    explanation: 'Setting Temperature near 0 narrows token sampling toward the most probable next token, dramatically improving repeatability and schema adherence for extraction and classification tasks. Raising Temperature or Top-p injects randomness that breaks structured outputs, though note that even Temperature = 0 is not guaranteed 100% deterministic across hardware runs.',
    awsComparison: 'Classic PMs assume an API returns identical output for identical input; AI PMs tune Temperature/Top-p near 0 for structured tasks and still enforce schema validation.'
  },
  {
    id: 'aipc-a1-009',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Temperature & Top-p Trade-offs',
    difficulty: 2,
    format: 'single',
    prompt: 'A marketing copywriting tool generates five headline variations per click, but beta testers complain all five options look nearly identical. What is the most direct parameter adjustment to increase creative variety without degenerating into gibberish?',
    options: [
      'Moderately raise Temperature (e.g., 0.7–0.9) and use Top-p (nucleus sampling) around 0.9 to sample from plausible creative alternatives while trimming bizarre tail tokens',
      'Set Temperature to 0.0 to force maximum creativity across independent runs',
      'Double the context window size so the model generates longer single headlines',
      'Disable tokenization so the model outputs raw unformatted paragraphs'
    ],
    correctIndices: [0],
    awsBridgeHint: 'You want diverse brainstorming candidates while pruning out the wildly improbable words in the tail.',
    explanation: 'Moderately higher Temperature widens token choice for fresher phrasing, while Top-p (nucleus sampling) caps sampling to the smallest set of top tokens whose cumulative probability reaches p—preventing nonsensical tail tokens. Temperature 0 repeats the safest phrasing, and context window size governs input/output capacity rather than sampling diversity.',
    awsComparison: 'Classic PMs hardcode static templates to avoid repetition; AI PMs balance Temperature and Top-p to tune the creativity-vs-coherence dial per user persona.'
  },
  {
    id: 'aipc-a1-010',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Context Windows & Lost in the Middle',
    difficulty: 2,
    format: 'single',
    prompt: 'Your legal tech product feeds a 100,000-token dossier into a model with a 128,000-token context window, yet the model repeatedly misses a crucial indemnity clause buried on page 48. Which phenomenon explains this failure?',
    options: [
      'Tokenization overflow caused the model to permanently delete pages 40 through 60',
      'The "lost in the middle" phenomenon, where LLMs recall information at the beginning and end of long contexts much more reliably than details buried in the center',
      'Extrinsic hallucination forced the model to refuse reading anything past 32,000 tokens',
      'The model automatically lowered its Temperature to zero halfway through the document'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Maximum advertised context capacity does not guarantee uniform attention across every page inside that window.',
    explanation: 'Research on long-context LLMs shows a U-shaped attention curve: models accurately retrieve facts placed at the very start or very end of a prompt, while recall drops sharply in the middle ("lost in the middle"). Even though 100k fits inside 128k, effective reasoning degrades unless key instructions or retrieved chunks are placed strategically.',
    awsComparison: 'Classic PMs treat a buffer limit (like 128k tokens) as lossless memory; AI PMs know context capacity ≠ uniform comprehension and place critical rules at the edges.'
  },
  {
    id: 'aipc-a1-011',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Pre-training vs. Post-training',
    difficulty: 1,
    format: 'single',
    prompt: 'Why would a raw **pre-trained** base LLM perform poorly if dropped directly into a customer-facing support chat without **post-training (alignment)**?',
    options: [
      'Pre-trained base models cannot generate more than 50 tokens at a time',
      'Pre-trained base models have zero exposure to human language or grammar',
      'Pre-trained models are optimized simply to continue internet text patterns—not to follow user instructions, converse helpfully, or refuse unsafe requests',
      'Post-training is what converts a model from discriminative classification into generative text'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think about the difference between predicting "what text comes next on a webpage" versus "answering a user politely and safely."',
    explanation: 'Pre-training teaches broad language fluency and world patterns via next-token prediction, so a raw base model might answer a question by generating five more similar questions! Post-training (Supervised Fine-Tuning + RLHF/preference alignment) teaches the model conversational helpfulness, instruction following, and safety boundaries.',
    awsComparison: 'Classic PMs view model training as a single compile step; AI PMs distinguish pre-training (broad knowledge) from post-training alignment (product behavior and safety).'
  },
  {
    id: 'aipc-a1-012',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'RLHF & Alignment',
    difficulty: 2,
    format: 'single',
    prompt: 'During **Reinforcement Learning from Human Feedback (RLHF)**, human raters rank competing model responses to shape a reward model. What subtle product risk can arise if RLHF heavily rewards responses that raters merely *like reading*?',
    options: [
      'The model loses its ability to process vector embeddings',
      'Tokenization costs drop to zero for all downstream enterprise users',
      'The model permanently forgets how to output JSON or structured markdown',
      'Sycophancy and confident-sounding fluff—where the model agrees with user misconceptions or writes authoritative prose even when uncertain'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Consider what happens when human raters unconsciously prefer polite, confident, thorough-looking answers over blunt admissions of ignorance.',
    explanation: 'Because human annotators often prefer polite, agreeable, and well-structured answers, RLHF can inadvertently incentivize sycophancy ("You are totally right!") and confident fabrication over saying "I do not know." PMs must test specifically for overconfidence and user-pleasing bias rather than assuming RLHF guarantees truthfulness.',
    awsComparison: 'Classic PMs equate "higher user satisfaction ratings" with objective correctness; AI PMs watch for RLHF-induced sycophancy that trades accuracy for polish.'
  },
  {
    id: 'aipc-a1-013',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Hallucinations as Next-Token Prediction',
    difficulty: 1,
    format: 'single',
    prompt: 'An executive asks engineering to "fix the hallucination bug in the LLM before Friday so it stops inventing product features." What is the most accurate way for an AI PM to frame this issue?',
    options: [
      'Hallucination is not a one-time code bug—it is an inherent mathematical consequence of probabilistic next-token prediction optimizing for linguistic plausibility rather than verified truth',
      'Hallucinations only occur when Temperature is above 0.5 and vanish permanently at Temperature 0',
      'Adding a "Do not lie" sentence to the system prompt mathematically eliminates hallucinations',
      'Hallucinations happen only because the context window is smaller than 100,000 tokens'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Remember what the underlying objective function of an LLM actually optimizes during generation.',
    explanation: 'LLMs predict statistically plausible next tokens rather than querying a verified truth table, making hallucinations an intrinsic property of the architecture rather than a patchable syntax defect. Lowering Temperature or writing stern prompts reduces frequency but never eliminates the risk—requiring grounding, verification, and UX guardrails.',
    awsComparison: 'Classic PMs log defects expecting a deterministic 100% fix; AI PMs manage probabilistic error rates through grounding, UI disclaimers, and human-in-the-loop workflows.'
  },
  {
    id: 'aipc-a1-014',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Intrinsic vs. Extrinsic Hallucinations',
    difficulty: 2,
    format: 'single',
    prompt: 'Your AI meeting summarizer reads a transcript where the CFO says "Q3 revenue grew 8%," yet the generated summary states "Q3 revenue declined 8%." Meanwhile, another summary invents an unmentioned competitor acquisition from thin air. How should you categorize the **first** error?',
    options: [
      'An extrinsic hallucination, because the model pulled outdated facts from pre-training',
      'An intrinsic hallucination, because the output directly contradicts the source text explicitly provided in the prompt',
      'A tokenization overflow error unrelated to model reasoning',
      'A discriminative classification mismatch'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Contrast fabricating external facts absent from the source versus contradicting evidence right inside the supplied context.',
    explanation: 'An **intrinsic hallucination** directly contradicts or distorts information present in the provided source input (flipping +8% growth to -8% decline). An **extrinsic hallucination** introduces unverified claims that cannot be confirmed or refuted by the source input (like inventing an unmentioned acquisition). Distinguishing them helps PMs choose between faithfulness checks and external grounding.',
    awsComparison: 'Classic PMs lump all wrong answers together; AI PMs separate intrinsic errors (source-faithfulness failures) from extrinsic errors (ungrounded external inventions).'
  },
  {
    id: 'aipc-a1-015',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Multimodal Models',
    difficulty: 2,
    format: 'single',
    prompt: 'Your B2B expense app lets users snap photos of crumpled, handwritten restaurant receipts with itemized tax and tip lines. Why does a **native multimodal model** typically outperform a legacy "OCR-to-text + text-only LLM" pipeline here?',
    options: [
      'Native multimodal models eliminate all token fees for image inputs',
      'Native multimodal models guarantee zero arithmetic mistakes without validation',
      'Native multimodal models process spatial layout, visual cues, and handwriting directly alongside text reasoning rather than losing table alignment in an intermediate OCR step',
      'Text-only LLMs cannot read numeric digits after OCR conversion'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think about what gets lost when a multi-column receipt is flattened into plain unformatted text before the reasoning model ever sees it.',
    explanation: 'Flattening receipts via standalone OCR often scrambles column alignment, checkboxes, and messy handwriting before the LLM sees the data. A native multimodal model inspects visual layout and text jointly in one representation—preserving which price aligns with which line item—though PMs still verify math with deterministic code.',
    awsComparison: 'Classic PMs chain separate single-modality tools sequentially; AI PMs use native multimodality when visual layout or tone carries critical meaning.'
  },
  {
    id: 'aipc-a1-016',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Deterministic vs. Probabilistic Lifecycle',
    difficulty: 1,
    format: 'single',
    prompt: 'A QA lead used to traditional SaaS rejects your AI release candidate because running the same test prompt twice produced two differently phrased—yet both accurate—customer answers. How should an AI PM evolve the release standard?',
    options: [
      'Freeze the feature until every prompt produces byte-for-byte identical prose across all runs',
      'Remove all automated testing because AI outputs cannot be evaluated objectively',
      'Ask developers to hardcode an `if/else` lookup table for every possible customer question',
      'Replace exact-string pass/fail assertions with rubric-based evaluations, acceptable variance thresholds, and task-success metrics across a representative test suite'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Shift from testing whether output matches one exact string to measuring whether output consistently meets quality criteria.',
    explanation: 'Because generative models are probabilistic, identical inputs can yield varied yet equally valid phrasing. AI PMs evaluate statistical performance across curated datasets—measuring accuracy, safety, and format compliance rates—rather than expecting deterministic string equality.',
    awsComparison: 'Classic PMs ship against deterministic unit tests (100% exact match); AI PMs ship against probabilistic evaluation thresholds and continuous post-launch monitoring.'
  },
  {
    id: 'aipc-a1-017',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Pre-training Cutoff vs. Inference',
    difficulty: 3,
    format: 'single',
    prompt: 'Your travel assistant uses a leading pre-trained LLM that confidently quotes outdated baggage fees from two years ago. A stakeholder suggests waiting for the model vendor’s next major pre-training update to solve this. Why is that the wrong product strategy?',
    options: [
      'Pre-training always has a static knowledge cutoff, so dynamic real-world data (prices, inventory, policies) must be injected at inference time rather than baked into model weights',
      'Pre-trained models only store facts about historical events before 2020',
      'Lowering Temperature during inference forces the model to discover today’s baggage fees automatically',
      'RLHF alignment continuously updates airline pricing inside the model weights every hour'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Separate static knowledge learned months ago during pre-training from live business facts needed at runtime.',
    explanation: 'Pre-training freezes world knowledge at a cutoff date and is far too slow and expensive to track live operational facts like prices or policies. Dynamic data must be retrieved and supplied at inference time (via search/retrieval or live tool lookups) so the model reasons over fresh context.',
    awsComparison: 'Classic PMs query a live database for current truth; AI PMs never rely on static pre-training memory for mutable facts—always supply fresh context at inference.'
  },
  {
    id: 'aipc-a1-018',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Deep Learning vs. Traditional ML Trade-offs',
    difficulty: 2,
    format: 'single',
    prompt: 'A regulated consumer lending team must provide legally auditable, human-understandable reasons whenever an applicant is denied credit ("high debt-to-income ratio," "recent delinquency"). Which trade-off favors Traditional ML over Deep Learning here?',
    options: [
      'Traditional ML models cannot run without millions of unlabeled audio files',
      'Traditional ML models (e.g., logistic regression or decision trees) offer transparent feature attribution, whereas deep neural networks behave like opaque black boxes',
      'Deep learning models are incapable of outputting numeric credit scores',
      'Traditional ML automatically generates personalized denial letters in natural prose'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Think about regulatory explainability ("why was this user rejected?") in high-stakes decisions.',
    explanation: 'In regulated domains like credit underwriting or healthcare triage, explainability is a legal and UX requirement. Traditional ML models make individual feature weights and decision paths auditable, whereas deep learning layers obscure exact causal drivers behind millions of parameters.',
    awsComparison: 'Classic PMs focus only on predictive lift; AI PMs weigh accuracy against explainability, auditability, and regulatory constraints before picking model complexity.'
  },
  {
    id: 'aipc-a1-019',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Context Windows & Latency/Quality',
    difficulty: 3,
    format: 'single',
    prompt: 'Engineers propose dumping a customer’s entire 80-page account history into every support-bot prompt since the model supports a 200k-token context window. As the PM, why should you push back against naive "stuff everything in the prompt" design?',
    options: [
      'Models charge 10x more if prompts exceed 10,000 tokens regardless of actual usage',
      'Transformers can only attend to the final 500 tokens of any prompt',
      'Huge noisy prompts increase time-to-first-token latency, inflate input token costs on every turn, and degrade reasoning accuracy through distraction and lost-in-the-middle effects',
      'Filling more than 25% of a context window permanently corrupts future user sessions'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Just because a suitcase holds 100 pounds does not mean carrying rocks on every sprint improves speed or clarity.',
    explanation: 'Even when inputs fit inside a large context window, irrelevant history increases latency, multiplies per-turn token spend, and dilutes attention across distracting details. Curating only the relevant excerpts via selective retrieval yields faster, cheaper, and sharper answers.',
    awsComparison: 'Classic PMs dump full records into memory if space allows; AI PMs curate concise, high-signal context because noise actively degrades LLM reasoning.'
  },
  {
    id: 'aipc-a1-020',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Reinforcement Learning in Products',
    difficulty: 3,
    format: 'single',
    prompt: 'A language-learning app wants its notification engine to choose *when* and *which* nudge style to send so 30-day learner retention improves without causing users to mute notifications. Why does **Reinforcement Learning (RL)** fit better than static Supervised Learning here?',
    options: [
      'Supervised learning cannot process user timestamps or categorical notification types',
      'RL requires zero historical or live user interaction signals to optimize outcomes',
      'RL turns notification copy into photorealistic images for higher open rates',
      'RL optimizes sequential decisions toward a delayed multi-step reward (30-day retention vs. mute penalty) by learning from ongoing user feedback loops'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Notice the trade-off between an immediate click today and long-term retention or churn weeks later.',
    explanation: 'Supervised learning optimizes single-step predictions (e.g., will the user click right now?), which can encourage spammy nudges that cause unsubscribes next week. Reinforcement Learning balances exploration and delayed rewards over sequential interactions to maximize long-term retention.',
    awsComparison: 'Classic PMs optimize immediate single-click conversion funnels; AI PMs apply RL thinking when sequential user actions trade short-term clicks against long-term retention.'
  },
  {
    id: 'aipc-a1-021',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Vector Embeddings Limitations',
    difficulty: 2,
    format: 'single',
    prompt: 'After replacing keyword search with pure vector embedding search in an industrial parts catalog, technicians complain that searching exact SKU `"XR-9402-B"` frequently returns `"XR-9401-A"` instead of the exact match. What happened?',
    options: [
      'Semantic embeddings compress text into broad conceptual similarity rather than preserving exact character-level identifiers, making hybrid search (keyword + vector) essential for part numbers',
      'The embedding model suffered from an intrinsic hallucination during indexing',
      'Vector embeddings only work on sentences longer than 15 words',
      'Lowering Temperature in the search bar will restore exact SKU matching'
    ],
    correctIndices: [0],
    awsBridgeHint: 'To a semantic model, two neighboring model numbers look almost identical in meaning—even when one digit changes everything.',
    explanation: 'Dense vector embeddings capture conceptual meaning, so `"XR-9402-B"` and `"XR-9401-A"` look nearly indistinguishable semantically. Exact identifiers, error codes, and proper nouns require lexical/keyword matching alongside vector search (hybrid search) to guarantee precision.',
    awsComparison: 'Classic PMs assume a newer search engine strictly dominates the old one; AI PMs pair semantic vectors with classic keyword search to cover both intent and exact codes.'
  },
  {
    id: 'aipc-a1-022',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Post-training Alignment Limits',
    difficulty: 3,
    format: 'single',
    prompt: 'Your team runs a lightweight preference-alignment (RLHF) pass on a foundation model expecting it to memorize 50,000 proprietary internal policy rules. Why does this expectation fail?',
    options: [
      'RLHF erases all pre-trained grammar from the base model',
      'Post-training alignment primarily shapes tone, formatting, safety, and refusal behavior—it is an unreliable mechanism for injecting large volumes of precise, updatable factual knowledge',
      'RLHF only works on discriminative fraud models, never on generative LLMs',
      'Alignment changes only the tokenizer vocabulary without touching model behavior'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Distinguish teaching a model *how* to behave versus expecting it to act as an exact, mutable database.',
    explanation: 'Post-training alignment (SFT and RLHF) teaches style, instruction adherence, and safety boundaries rather than serving as a high-precision knowledge store. Large, changing policy corpora belong in external retrieval/context at inference time so facts stay auditable and instantly updatable.',
    awsComparison: 'Classic PMs expect one configuration step to handle both behavior and data; AI PMs separate behavioral alignment (style/format) from inference-time knowledge supply.'
  },
  {
    id: 'aipc-a1-023',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Multimodal Speech & Latency UX',
    difficulty: 2,
    format: 'single',
    prompt: 'You are designing a real-time voice coaching assistant where conversational pauses longer than 800ms feel unnatural. Why might a **native multimodal audio-to-audio model** deliver noticeably better UX than chaining Speech-to-Text -> Text LLM -> Text-to-Speech?',
    options: [
      'Chained pipelines cannot support English punctuation',
      'Text-to-Speech systems require manual human voice recording for each response',
      'Native audio-to-audio models eliminate intermediate transcription hops (cutting latency) and directly perceive vocal emotion, pacing, and interruptions',
      'Native audio models never produce hallucinations during live conversations'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Consider both the time penalty of three serial handoffs and the emotional clues stripped away when speech becomes plain text.',
    explanation: 'A three-stage cascade adds serial latency at every handoff and discards acoustic cues like hesitation, sarcasm, or urgency when converting audio to plain text. Native multimodal voice models stream audio directly in and out, cutting turn-taking lag while preserving vocal nuance.',
    awsComparison: 'Classic PMs assemble sequential microservice pipelines; AI PMs evaluate native end-to-end multimodal models whenever latency and non-textual cues define UX.'
  },
  {
    id: 'aipc-a1-024',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Probabilistic Quality Guardrails',
    difficulty: 3,
    format: 'single',
    prompt: 'An automated AI contract reviewer achieves 92% accuracy on clause risk flagging in pre-launch testing. What is the strongest PM decision before opening general availability to enterprise legal teams?',
    options: [
      'Delay launch indefinitely until the LLM reaches 100.0% deterministic accuracy',
      'Hide confidence cues and present every AI flag as final legal truth so users trust the tool',
      'Increase Temperature to 1.0 so the remaining 8% errors distribute evenly',
      'Design a human-in-the-loop review UX with inline source citations and clear confidence/verification workflows so lawyers catch the remaining 8% effortlessly'
    ],
    correctIndices: [3],
    awsBridgeHint: 'When 100% perfection is mathematically unattainable in a probabilistic system, how should product UX absorb the residual error?',
    explanation: 'Waiting for 100% accuracy from a probabilistic model stalls launches forever, while masking uncertainty creates dangerous liability. Strong AI PMs pair realistic accuracy thresholds with UX scaffolding—source links, easy overrides, and human review—so the workflow safely absorbs inevitable edge-case errors.',
    awsComparison: 'Classic PMs treat <100% reliability as a launch blocker; AI PMs design UX and human-in-the-loop checkpoints matched to the cost of an 8% error.'
  },
  {
    id: 'aipc-a1-025',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Inference-Time Adaptation',
    difficulty: 1,
    format: 'single',
    prompt: 'Without modifying any underlying model weights, you include three realistic input/output examples inside your prompt to teach the LLM your company’s exact support-ticket tone. What is this technique called?',
    options: [
      'Few-shot prompting (in-context learning at inference time)',
      'Pre-training from scratch',
      'Unsupervised k-means clustering',
      'Reinforcement learning from human feedback (RLHF)'
    ],
    correctIndices: [0],
    awsBridgeHint: 'The model adapts purely from examples placed inside the current prompt during runtime.',
    explanation: 'Providing a handful of concrete examples inside the prompt is **few-shot prompting**, leveraging in-context learning during inference without retraining weights. Pre-training and RLHF permanently alter weights offline, while clustering is an unsupervised grouping technique.',
    awsComparison: 'Classic PMs file engineering tickets for every behavior tweak; AI PMs rapidly iterate on behavior using inference-time examples before touching model weights.'
  },
  {
    id: 'aipc-a1-026',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Mitigating Intrinsic Hallucinations',
    difficulty: 3,
    format: 'single',
    prompt: 'Your healthcare intake tool summarizes patient intake forms, but occasional **intrinsic hallucinations** swap medication dosages written in the form. Which architectural pattern directly catches or reduces these source contradictions?',
    options: [
      'Removing the source intake form from the prompt so the model relies on general medical memory',
      'Requiring inline span citations back to exact sentences in the intake form, paired with an automated verification pass and mandatory clinician sign-off',
      'Switching to an unsupervised clustering model to rewrite the intake summary',
      'Raising Top-p and Temperature to encourage more expressive medical phrasing'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Force the model to anchor claims to exact source spans and verify faithfulness before a human signs off.',
    explanation: 'Grounding summaries with explicit citations to source spans lets both automated faithfulness checks and clinicians spot dosage contradictions immediately. Stripping the source increases fabrication, and raising sampling randomness worsens factual drift.',
    awsComparison: 'Classic PMs trust data-mapping scripts once tested; AI PMs build citation anchors and verification layers around probabilistic summarizers in high-stakes domains.'
  },
  {
    id: 'aipc-a1-027',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Token Streaming & Perceived Latency',
    difficulty: 2,
    format: 'single',
    prompt: 'Users complain your AI writing assistant feels sluggish because generating a 600-token memo takes 9 seconds end-to-end, even though the first word is ready in 400ms. Which product/UX decision dramatically improves **perceived latency** without changing the model?',
    options: [
      'Block the UI until all 600 tokens finish so users can read cleanly at the end',
      'Increase the context window from 32k to 128k tokens',
      'Stream output tokens progressively to the UI as they are generated, optimizing Time-to-First-Token (TTFT)',
      'Convert the output into an unlabeled vector embedding before rendering'
    ],
    correctIndices: [2],
    awsBridgeHint: 'How can users start reading 0.4 seconds after clicking instead of staring at a 9-second loading spinner?',
    explanation: 'LLMs generate output sequentially one token at a time; streaming tokens incrementally lets users begin reading in ~400ms rather than waiting 9 seconds for the full payload. Blocking UI rendering wastes that natural streaming advantage, and context window size or embeddings do not speed up generation.',
    awsComparison: 'Classic PMs optimize total API response time before rendering; AI PMs separate Time-to-First-Token (perceived responsiveness) from total generation duration.'
  },
  {
    id: 'aipc-a1-028',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Traditional ML vs. GenAI Selection',
    difficulty: 2,
    format: 'multi',
    prompt: 'Select TWO product use cases where **Traditional Machine Learning** is clearly a better starting choice than a Generative AI LLM.',
    options: [
      'Predicting next-month inventory demand from 5 years of structured warehouse SKU sales history',
      'Drafting empathetic, policy-aware customer apology emails from unstructured complaint threads',
      'Detecting anomalous credit-card transactions in under 15 milliseconds using numerical velocity features',
      'Extracting action items and owners from free-form video call transcripts'
    ],
    correctIndices: [0, 2],
    selectCount: 2,
    awsBridgeHint: 'Look for strict ultra-low latency or structured historical time-series/numerical forecasting rather than unstructured language synthesis.',
    explanation: 'Structured SKU demand forecasting and sub-15ms numerical fraud scoring are classic Traditional ML strengths—fast, cheap, calibrated, and deterministic enough for tight SLAs. Drafting empathetic emails and extracting tasks from messy transcripts require unstructured language understanding where GenAI shines.',
    awsComparison: 'Classic PMs sometimes force legacy rules onto messy text; modern AI PMs avoid the reverse trap of forcing pricey LLMs onto numeric forecasting and sub-20ms scoring.'
  },
  {
    id: 'aipc-a1-029',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Vector Embeddings & Semantic Search',
    difficulty: 2,
    format: 'multi',
    prompt: 'Which THREE statements accurately describe **vector embeddings** in an AI product?',
    options: [
      'They convert text, images, or audio into numerical arrays that capture semantic meaning',
      'Items with similar concepts sit closer together mathematically, enabling meaning-based search without exact keyword overlap',
      'They eliminate the need to worry about exact IDs or part-number matches in every search product',
      'They power semantic retrieval that feeds relevant excerpts into an LLM prompt at inference time'
    ],
    correctIndices: [0, 1, 3],
    selectCount: 3,
    awsBridgeHint: 'Remember both what embeddings excel at (meaning across modalities) and the one lookup scenario where exact keywords still matter.',
    explanation: 'Embeddings map content into numeric vectors where proximity reflects conceptual similarity, powering semantic search and context retrieval for LLMs. However, they do *not* eliminate the need for exact keyword matching on SKUs, error codes, or strict identifiers—which require hybrid search.',
    awsComparison: 'Classic PMs rely solely on string matching; AI PMs adopt semantic embeddings while keeping lexical search as a safety net for exact identifiers.'
  },
  {
    id: 'aipc-a1-030',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Hallucinations & Next-Token Mechanics',
    difficulty: 3,
    format: 'multi',
    prompt: 'Which TWO statements accurately explain **hallucinations** in Generative AI products?',
    options: [
      'Setting Temperature to 0 guarantees zero hallucinations across all customer queries',
      'An extrinsic hallucination invents unverified external facts not present in the provided source context',
      'An intrinsic hallucination occurs when the model simply repeats the prompt verbatim',
      'Hallucinations emerge naturally because LLMs sample plausible next tokens rather than querying a verified truth engine'
    ],
    correctIndices: [1, 3],
    selectCount: 2,
    awsBridgeHint: 'Check the exact definitions of extrinsic vs. intrinsic errors and the statistical root cause of next-token sampling.',
    explanation: 'LLMs optimize statistical plausibility over factual verification, and extrinsic hallucinations fabricate claims unsupported by supplied context. Temperature = 0 reduces randomness but does not stop hallucinations, and intrinsic hallucinations contradict the provided source rather than repeating it verbatim.',
    awsComparison: 'Classic PMs treat factual errors as isolated software regressions; AI PMs treat hallucinations as an architectural property requiring grounding and UX verification.'
  },
  {
    id: 'aipc-a1-031',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Probabilistic AI Product Lifecycle',
    difficulty: 3,
    format: 'multi',
    prompt: 'Select THREE ways the **probabilistic AI product lifecycle** differs fundamentally from classic deterministic software delivery.',
    options: [
      'Acceptance criteria shift from binary pass/fail unit tests to statistical quality thresholds across curated evaluation sets',
      'Once a prompt passes QA in staging, its output is guaranteed identical forever without monitoring',
      'Product design must include graceful fallbacks, citations, or human review for inevitable edge-case errors',
      'Upstream model updates or shifts in real-world user inputs can silently alter output quality, requiring ongoing post-launch evaluation'
    ],
    correctIndices: [0, 2, 3],
    selectCount: 3,
    awsBridgeHint: 'Think about how testing, UX safety nets, and post-launch drift change when software stops being deterministic.',
    explanation: 'Probabilistic AI requires evaluation metrics over test suites, UX fallback paths for imperfect outputs, and continuous monitoring for drift or model updates. Assuming staging QA guarantees forever-identical behavior is a classic deterministic fallacy.',
    awsComparison: 'Classic PMs treat launch as "feature complete"; AI PMs treat launch as Day 1 of continuous empirical evaluation and drift management.'
  },
  {
    id: 'aipc-a1-032',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Traditional ML vs. Deep Learning vs. GenAI',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Traditional ML, Deep Learning, and Generative AI:',
    statements: [
      {
        statement: 'Generative AI is a specialized subset of Deep Learning focused on creating new content such as text, images, code, or audio.',
        answer: true
      },
      {
        statement: 'Deep Learning always outperforms Traditional ML on small, clean tabular spreadsheets and is cheaper to interpret.',
        answer: false
      },
      {
        statement: 'Discriminative models classify or score inputs into labels, whereas generative models synthesize novel outputs matching learned patterns.',
        answer: true
      }
    ],
    awsBridgeHint: 'Keep the AI hierarchy clear (AI > ML > Deep Learning > GenAI) and recall where tabular data still favors classic ML.',
    explanation: 'GenAI sits inside Deep Learning and focuses on content synthesis, while discriminative models focus on classification/scoring boundaries. On small or medium structured tables, Traditional ML (such as tree ensembles) routinely beats Deep Learning in cost, accuracy, and interpretability.',
    awsComparison: 'Classic PMs sometimes skip straight to the biggest model; AI PMs walk up the complexity ladder only as data modality and problem ambiguity require it.'
  },
  {
    id: 'aipc-a1-033',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Tokens & Context Windows',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement about tokenization and LLM context windows:',
    statements: [
      {
        statement: 'Input tokens and output tokens together must fit within the model’s maximum context window for a single request.',
        answer: true
      },
      {
        statement: 'A 128,000-token context window guarantees the model recalls a single sentence on page 60 with the exact same reliability as page 1.',
        answer: false
      },
      {
        statement: 'Code snippets, JSON punctuation, and non-English scripts often consume significantly more tokens per character than plain English prose.',
        answer: true
      }
    ],
    awsBridgeHint: 'Remember that context capacity includes both prompt and reply, and attention is not flat across the middle.',
    explanation: 'Both the input prompt and generated completion share the total context window budget, and subword tokenizers often inflate token counts for code, punctuation, and non-Latin languages. Crucially, the "lost in the middle" effect means attention degrades on buried middle facts even well inside max limits.',
    awsComparison: 'Classic PMs read "128k context" as a simple capacity spec; AI PMs manage shared input+output budgets, language token inflation, and middle-context decay.'
  },
  {
    id: 'aipc-a1-034',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Temperature, Top-p & Determinism',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each product decision involving Temperature and Top-p decoding parameters:',
    statements: [
      {
        statement: 'Lowering Temperature toward 0 makes outputs much more consistent for classification, routing, and structured data extraction.',
        answer: true
      },
      {
        statement: 'Setting Temperature to 0 guarantees 100% identical byte-for-byte outputs across every model provider and repeated production call.',
        answer: false
      },
      {
        statement: 'Top-p (nucleus sampling) restricts random token selection to the smallest group of top candidates whose probabilities sum to p.',
        answer: true
      }
    ],
    awsBridgeHint: 'Watch out for absolute guarantees like "100% identical" even when Temperature is set to zero.',
    explanation: 'Low Temperature sharpens probability toward top tokens for consistent structured tasks, and Top-p trims unlikely tail tokens while preserving controlled variety. However, even at Temperature = 0, floating-point parallelism and batching mean PMs cannot assume absolute 100% determinism.',
    awsComparison: 'Classic PMs expect a config flag to restore strict determinism; AI PMs treat low Temperature as "high consistency" while still enforcing validation checks.'
  },
  {
    id: 'aipc-a1-035',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Supervised, Unsupervised & RLHF',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement about AI learning paradigms:',
    statements: [
      {
        statement: 'Supervised learning requires labeled training examples (input paired with known target outcome) to learn predictions.',
        answer: true
      },
      {
        statement: 'Unsupervised learning requires human annotators to label every record before clustering can begin.',
        answer: false
      },
      {
        statement: 'RLHF aligns generative model behavior using human preference comparisons rather than simple next-word internet prediction alone.',
        answer: true
      }
    ],
    awsBridgeHint: 'Focus on whether labeled ground truth exists before training and what human raters provide in RLHF.',
    explanation: 'Supervised learning maps inputs to known labels, whereas unsupervised learning finds patterns in unlabeled data without human pre-tagging. RLHF adds a human preference signal during post-training so models behave helpfully and safely rather than merely mimicking raw web text.',
    awsComparison: 'Classic PMs assume all ML starts with expensive manual labeling; AI PMs know unsupervised discovery and preference-based RLHF serve distinct stages.'
  },
  {
    id: 'aipc-a1-036',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Pre-training, Alignment & Inference',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement about the three phases of modern LLM lifecycle (Pre-training, Post-training/Alignment, Inference):',
    statements: [
      {
        statement: 'Pre-training establishes broad language fluency and world knowledge from massive corpora, leaving the model with a fixed knowledge cutoff.',
        answer: true
      },
      {
        statement: 'Every user chat prompt sent in production triggers a quick pre-training update to the model’s weights.',
        answer: false
      },
      {
        statement: 'In-context learning (like few-shot examples) adapts model output at inference time without permanently modifying model weights.',
        answer: true
      }
    ],
    awsBridgeHint: 'Distinguish offline weight updates from stateless runtime inference.',
    explanation: 'Pre-training builds foundational weights offline up to a cutoff date; production queries run statelessly at inference time and adapt via prompt context without altering weights. If weights changed on every prompt, latency, cost, and tenant isolation would collapse.',
    awsComparison: 'Classic PMs sometimes think chatting with an AI "teaches" the shared model permanently; AI PMs know runtime prompts do not rewrite model weights.'
  },
  {
    id: 'aipc-a1-037',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Hallucinations & Multimodality',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement about hallucinations and multimodal AI models:',
    statements: [
      {
        statement: 'An intrinsic hallucination occurs when a model contradicts facts explicitly stated in the document provided inside its prompt.',
        answer: true
      },
      {
        statement: 'Native multimodal models cannot make factual errors because visual inputs are grounded in pixels.',
        answer: false
      },
      {
        statement: 'Native multimodal architectures can reason across text, images, or audio jointly without losing spatial or tonal cues in separate conversion steps.',
        answer: true
      }
    ],
    awsBridgeHint: 'Multimodal models still rely on probabilistic generation—they can misread charts or invent visual details just like text.',
    explanation: 'Intrinsic hallucinations contradict supplied context, and native multimodal models preserve visual/acoustic nuance across modalities. However, multimodal models remain probabilistic generators capable of misinterpreting blurry charts or hallucinating unseen image details.',
    awsComparison: 'Classic PMs assume image parsing is deterministic OCR; AI PMs apply the same hallucination guardrails to visual/audio outputs as to text.'
  },
  {
    id: 'aipc-a1-038',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Foundation Model Lifecycle Sequence',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Order the four stages of building and operating a modern Generative AI LLM from earliest foundational creation to live end-user execution:',
    correctSequence: [
      'Self-supervised Pre-training on massive broad corpora',
      'Supervised Fine-Tuning (SFT) on high-quality instruction examples',
      'Preference Alignment (RLHF) for helpfulness, tone, and safety',
      'Stateless Runtime Inference answering live user prompts'
    ],
    awsBridgeHint: 'Start with broad internet language learning, refine into instruction-following and safe alignment, and end at production serving.',
    explanation: 'Foundation models first learn general language patterns via pre-training, then learn to follow instructions via SFT, align with human safety and helpfulness preferences via RLHF, and finally serve live requests during inference.',
    awsComparison: 'Classic PMs think of build -> deploy as one compilation step; AI PMs map product levers to the right stage—knowing almost all PM iteration happens at inference before touching SFT.'
  },
  {
    id: 'aipc-a1-039',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'Transformer Prompt Processing Flow',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the conceptual sequence of how a Transformer-based LLM processes a user prompt and produces a reply at inference time:',
    correctSequence: [
      'Split the raw input text into subword tokens via the tokenizer',
      'Map tokens into vector embeddings with positional context',
      'Apply self-attention layers to weigh relationships across all tokens simultaneously',
      'Compute next-token probabilities and sample using Temperature and Top-p'
    ],
    awsBridgeHint: 'Follow the text from raw characters -> numeric meaning -> cross-word relationships -> word-by-word generation.',
    explanation: 'At inference time, an LLM first tokenizes input text into subword IDs, converts them into vector representations, runs self-attention across the sequence to build contextual meaning, and finally samples each output token sequentially using decoding parameters like Temperature and Top-p.',
    awsComparison: 'Classic PMs treat an LLM as a black-box oracle; understanding this 4-step pipeline clarifies why token count, context order, and sampling settings directly drive UX.'
  },
  {
    id: 'aipc-a1-040',
    track: 'aipc',
    act: 1,
    domain: 'aipc-foundations',
    subtopic: 'AI Intervention Escalation Ladder',
    difficulty: 3,
    format: 'sequence',
    prompt: 'When an LLM feature underperforms in production, order the PM troubleshooting ladder from the **fastest, lowest-cost inference tweak** to the **heaviest weight-changing intervention**:',
    correctSequence: [
      'Refine prompt instructions and adjust Temperature/Top-p settings',
      'Add curated few-shot examples inside the prompt to anchor format and style',
      'Supply fresh, relevant excerpts at inference time via semantic/hybrid retrieval',
      'Invest in custom post-training (fine-tuning) model weights on domain examples'
    ],
    awsBridgeHint: 'Exhaust zero-training prompt and context improvements before paying the time and maintenance cost of altering model weights.',
    explanation: 'Smart AI PMs iterate up the intervention ladder: start with prompt clarity and decoding settings, add few-shot examples for tone/format, inject external context via retrieval to solve knowledge gaps, and reserve fine-tuning only for specialized behaviors that prompting cannot reliably achieve.',
    awsComparison: 'Classic PMs jump straight to custom engineering rebuilds; AI PMs prove maximum value at the top of the prompt-and-retrieval stack before customizing weights.'
  }
];
