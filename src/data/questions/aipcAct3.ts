import type { ExamQuestion } from '../../types/curriculum';

export const AIPC_ACT3_QUESTIONS: ExamQuestion[] = [
  {
    id: 'aipc-a3-001',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Beyond Blank-Box Chatbots',
    difficulty: 1,
    format: 'single',
    prompt: 'A B2B CRM product team wants to help account executives summarize 20-email deal threads and update next-step fields. Why should the Product Manager favor an embedded contextual action directly inside the deal record over a standalone blank-box chat sidebar?',
    options: [
      'An embedded action inherits the current deal context automatically, reduces prompt-writing friction, and places outputs right where the user updates fields',
      'A standalone chat sidebar prevents users from reading previous emails in the thread while waiting for a response',
      'Embedded buttons eliminate the need to evaluate output quality because users cannot ask follow-up questions',
      'Chat interfaces cannot process multi-turn email text unless the user manually pastes one message at a time'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think about how much context the product already knows from the active screen versus forcing the user to re-explain it in a blank text box.',
    explanation: 'Embedded co-pilots leverage implicit screen context (deal ID, recent emails, record schema) so users trigger value in one click without authoring prompts from scratch. Standalone blank boxes create cold-start friction and force tedious copy-pasting between the workspace and the chat window.',
    awsComparison: 'Classic PMs add a separate "AI Chat" tab as a bolt-on feature; AI PMs embed intelligence directly into the existing workflow and reduce prompt tax.'
  },
  {
    id: 'aipc-a3-002',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Inline Canvas & Co-Editing',
    difficulty: 1,
    format: 'single',
    prompt: 'Users of a marketing campaign tool frequently ask the AI to revise only the call-to-action paragraph of a 600-word landing page draft. Which UX pattern best supports iterative co-creation?',
    options: [
      'A full-page modal that regenerates the entire 600-word document inside a chat bubble on every turn',
      'An inline canvas where users highlight a specific section and apply targeted AI edits in place',
      'A read-only preview pane that disables manual keyboard editing until the AI conversation ends',
      'An automated email delivery flow that sends each new AI variation to the user’s inbox'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Consider how writers collaborate in modern document editors when only one paragraph needs work rather than rewriting the whole page.',
    explanation: 'An inline canvas with selection-scoped actions lets users keep the parts they like and iterate surgically on a specific paragraph without losing prior edits. Regenerating the entire document in a linear chat stream forces users to re-read everything and frequently introduces unintended regressions in untouched sections.',
    awsComparison: 'Classic PMs treat text generation like a turn-based Q&A log; AI PMs design spatial, canvas-first co-editing where human and AI share the same artifact.'
  },
  {
    id: 'aipc-a3-003',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Structured UI Controls',
    difficulty: 2,
    format: 'single',
    prompt: 'In an AI-powered customer support reply assistant, agents repeatedly type instructions like "make it shorter, friendlier, and less technical." What UX improvement should the PM prioritize?',
    options: [
      'Increase the chat input character limit so agents can write more detailed tone instructions',
      'Hide the reply preview and automatically send the AI’s first draft to speed up ticket closure',
      'Replace repetitive text prompting with structured UI controls such as tone pills, length sliders, and audience selectors',
      'Require agents to complete a mandatory two-hour prompt engineering course during onboarding'
    ],
    correctIndices: [2],
    awsBridgeHint: 'When users keep typing the same adjectives over and over, good interface design turns words into direct manipulation.',
    explanation: 'Structured UI controls—such as tone chips ("Empathetic", "Concise") and length sliders—convert recurring natural-language wishes into deterministic, one-click interface affordances. Asking users to keep typing repetitive adjectives slows down high-volume workflows and produces inconsistent phrasing.',
    awsComparison: 'Classic PMs rely on forms and controls by default; AI PMs rediscover that sliders, toggles, and presets still outperform free-text prompts for bounded parameters.'
  },
  {
    id: 'aipc-a3-004',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Proactive & Ambient Triggers',
    difficulty: 2,
    format: 'single',
    prompt: 'A finance operations PM wants an expense-review product to catch duplicate receipts and policy mismatches without interrupting reviewers who are processing clean reports. Which trigger pattern is most appropriate?',
    options: [
      'A blocking full-screen chatbot greeting every time a reviewer opens any expense report',
      'An automatic rejection rule that deletes flagged line items before a human inspects them',
      'A weekly digest spreadsheet emailed on Fridays summarizing every receipt processed that week',
      'An ambient inline badge next to suspect line items that expands on hover or click to show the potential conflict'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Aim for quiet peripheral awareness on clean items and effortless inspection only where an anomaly actually exists.',
    explanation: 'Ambient, inline indicators surface proactive AI insights exactly at the point of friction while staying invisible when nothing is wrong. Blocking modals cause alert fatigue on clean reports, and silent auto-deletion removes human oversight on financial records.',
    awsComparison: 'Classic PMs build rule alerts as noisy pop-ups or static dashboards; AI PMs weave ambient, context-triggered nudges quietly into the primary work surface.'
  },
  {
    id: 'aipc-a3-005',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'AI-Native Interaction Patterns',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each product design statement regarding moving beyond blank-box chatbot interfaces.',
    statements: [
      {
        statement: 'Passing active screen state (such as selected rows or document IDs) behind the scenes reduces the amount of context users must type.',
        answer: true
      },
      {
        statement: 'Natural language chat is always faster and less error-prone than clickable chips or dropdowns for adjusting repeatable parameters like output length.',
        answer: false
      },
      {
        statement: 'Proactive ambient suggestions should be easily dismissible so users do not feel trapped by unwanted interruptions.',
        answer: true
      }
    ],
    awsBridgeHint: 'Consider user effort, repeatability of controls, and user agency over proactive interruptions.',
    explanation: 'Implicit context injection eliminates repetitive typing, structured controls beat free text for repeatable parameters, and dismissible ambient cues preserve user control. Treating free-form chat as universally superior ignores motor and cognitive effort.',
    awsComparison: 'Classic PMs optimize click counts; AI PMs optimize "cognitive and typing tax," blending direct manipulation with natural language only where open-ended intent is needed.'
  },
  {
    id: 'aipc-a3-006',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Beyond Blank-Box Chatbots',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt: 'A product analytics platform forced all data exploration into a single linear chat box. Which TWO usability failures most commonly occur with this blank-box pattern in analytical workflows? (Select 2)',
    options: [
      'Users struggle to discover which metrics, filters, and operations the assistant actually supports',
      'Charts and tables cannot be rendered in web browsers when triggered from a text input',
      'Iterative filtering and multi-column sorting become clumsy compared to direct interactive table controls',
      'Linear chat histories automatically delete older browser cookies after five messages'
    ],
    correctIndices: [0, 2],
    awsBridgeHint: 'Think about feature discoverability on an empty screen and how analysts normally slice, sort, and pivot data.',
    explanation: 'A blank text box hides capability boundaries (low discoverability) and makes fine-grained manipulation like sorting, column resizing, or toggling filters far slower than direct UI controls. Modern browsers easily render rich charts from chat, and chat histories do not wipe browser cookies.',
    awsComparison: 'Classic PMs expose features through visible menus and affordances; AI PMs must avoid hiding entire analytical workflows inside an opaque command line.'
  },
  {
    id: 'aipc-a3-007',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Probabilistic UX Framing',
    difficulty: 1,
    format: 'single',
    prompt: 'An HR recruiting tool generates candidate interview summaries from call transcripts. Which UI copy and framing best reflects probabilistic AI behavior?',
    options: [
      'Labeling the output "AI-drafted summary — verify key details against transcript quotes" with clickable timestamps',
      'Labeling the output "Verified Fact Sheet" to boost recruiter confidence during launch week',
      'Removing all edit buttons on the summary card so hiring managers treat it as an official record',
      'Displaying a spinning progress bar without any caveats so the UI looks clean and uncluttered'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Users calibrate their vigilance based on how confidently the product presents machine-generated output.',
    explanation: 'Framing outputs as drafts paired with easy verification (clickable transcript timestamps) sets accurate mental models for probabilistic systems. Presenting probabilistic summaries as "verified facts" or locking edits invites blind trust and costly hiring mistakes.',
    awsComparison: 'Classic deterministic software guarantees exact database lookups; AI PMs design interfaces around likelihood, verification, and effortless correction.'
  },
  {
    id: 'aipc-a3-008',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Graceful Failure & Fallbacks',
    difficulty: 2,
    format: 'single',
    prompt: 'An AI contract clause explainer cannot find a confident match in the company’s approved legal playbook and hits a safety uncertainty threshold. What is the best fallback UX?',
    options: [
      'Ask the model to guess the most likely policy anyway so the user never sees an empty state',
      'Clearly state that no approved guidance was found, preserve the user’s selected clause, and provide a one-click link to standard search or legal escalation',
      'Display a generic "Something went wrong (Error 500)" alert and clear the user’s screen',
      'Silently redirect the user back to the home dashboard without explaining why the action stopped'
    ],
    correctIndices: [1],
    awsBridgeHint: 'When the AI cannot answer safely, protect the user’s work and hand them a practical non-AI next step.',
    explanation: 'Graceful degradation acknowledges the system’s boundary transparently, preserves user input, and routes seamlessly to deterministic search or human escalation. Forcing a guess creates hallucination risk, while generic crashes destroy trust and waste the user’s context.',
    awsComparison: 'Classic PMs treat errors as rare technical exceptions; AI PMs design explicit "I don’t know" states and deterministic escape hatches as core product flows.'
  },
  {
    id: 'aipc-a3-009',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Graceful Degradation Under Latency',
    difficulty: 3,
    format: 'single',
    prompt: 'During peak Monday morning traffic, the AI call-summarization step inside a live customer support workspace experiences intermittent 15-second delays. How should the workspace handle this without blocking agents?',
    options: [
      'Freeze the entire ticket screen until the AI summary finishes loading so every agent gets identical data',
      'Disable ticket submission for all agents until AI response times return under two seconds',
      'Load the core ticket, raw transcript, and manual disposition controls immediately while the AI summary loads asynchronously with a manual skip option',
      'Replace the AI summary panel with random tips until the agent refreshes the browser manually'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Never let an optional AI enhancement hold the critical core workflow hostage.',
    explanation: 'Decoupling the core deterministic workspace from asynchronous AI enrichment guarantees agents can still read transcripts and resolve tickets even when AI latency spikes. Blocking the whole UI turns a slow helper feature into a full operational outage.',
    awsComparison: 'Classic PMs couple page load to critical data queries; AI PMs isolate probabilistic features behind non-blocking, gracefully degradable UI boundaries.'
  },
  {
    id: 'aipc-a3-010',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Graceful Failure & Fallbacks',
    difficulty: 2,
    format: 'multi',
    selectCount: 3,
    prompt: 'Which THREE UX behaviors demonstrate well-designed graceful failure states for an AI writing assistant? (Select 3)',
    options: [
      'Preserving the user’s original prompt or highlighted text so they do not have to retype it',
      'Explaining in plain language why the request could not be completed (e.g., unsupported file type or missing source context)',
      'Automatically charging an extra retry fee whenever generation fails',
      'Offering a clear recovery path such as "Retry", "Shorten selection", or "Continue editing manually"',
      'Hiding the failure silently and leaving the previous unrelated draft on screen as if it were new'
    ],
    correctIndices: [0, 1, 3],
    awsBridgeHint: 'Good failure UX protects user effort, explains the gap clearly, and gives actionable next steps.',
    explanation: 'Preserving user input, communicating plain-language reasons, and offering actionable recovery options keep users productive when probabilistic generation fails. Silent stale outputs confuse users into trusting outdated text, and punitive retry friction drives abandonment.',
    awsComparison: 'Classic PMs write static error banners; AI PMs design collaborative recovery flows that keep user momentum intact across partial or failed generations.'
  },
  {
    id: 'aipc-a3-011',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Designing for Probabilistic Outputs',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement about designing interfaces for probabilistic AI outputs.',
    statements: [
      {
        statement: 'Because two runs of the same prompt can yield slightly different phrasing, users benefit from an easy "Regenerate" or "Show alternatives" affordance.',
        answer: true
      },
      {
        statement: 'If an AI feature fails to produce a confident answer, hiding the uncertainty by making the text sound authoritative improves long-term retention.',
        answer: false
      },
      {
        statement: 'Providing manual override controls ensures users can finish their task even when the AI output misses the mark.',
        answer: true
      }
    ],
    awsBridgeHint: 'Think about variability, honest framing, and user escape hatches.',
    explanation: 'Easy regeneration embraces creative/probabilistic variance, and manual overrides guarantee task completion. Conversely, masking low confidence behind authoritative prose causes sudden trust collapse the first time a user catches a serious mistake.',
    awsComparison: 'Classic PMs assume identical inputs yield identical outputs; AI PMs design for output variance and fast human correction.'
  },
  {
    id: 'aipc-a3-012',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Inline Citations & Grounding',
    difficulty: 1,
    format: 'single',
    prompt: 'An internal HR policy assistant answers employee questions about parental leave and expense reimbursement. Which UX feature most directly builds justified trust in its answers?',
    options: [
      'Adding a cheerful avatar animation next to every policy answer',
      'Increasing the font size of key numbers so the answer looks more official',
      'Displaying a single static disclaimer at the bottom of the Settings page',
      'Embedding numbered inline citations that open a preview of the exact source policy paragraph and last-updated date'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Users trust answers fastest when they can verify the exact source sentence in one click without leaving the screen.',
    explanation: 'Inline citations linked to the exact source snippet and effective date let employees verify policy claims immediately without hunting through intranet folders. Cosmetic avatars, bold fonts, or buried disclaimers do not help users confirm whether an answer is accurate or current.',
    awsComparison: 'Classic PMs build keyword search results lists; AI PMs synthesize answers while keeping clickable, inspectable provenance attached to every claim.'
  },
  {
    id: 'aipc-a3-013',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Calibrated Trust & Confidence',
    difficulty: 2,
    format: 'single',
    prompt: 'A PM considers displaying an arbitrary "94.7% Confidence Score" badge next to every free-text answer from a generative Q&A assistant. Why is raw decimal confidence often counterproductive in generative UX?',
    options: [
      'Unproven numeric percentages create false precision and mislead users into over-trusting fluent hallucinations, whereas qualitative grounding and source links enable real verification',
      'Users cannot read percentage symbols inside enterprise web applications',
      'Showing any number above 90% forces the system to disable streaming responses',
      'Confidence badges automatically violate user privacy regulations regardless of the domain'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Ask whether a user actually knows what "94.7% confident" means on a three-sentence paragraph, or if evidence works better.',
    explanation: 'LLMs are notoriously poorly calibrated on raw token probabilities, so displaying a precise-looking number like "94.7%" tricks users into treating shaky answers as statistically verified. Grounded citations, explicit uncertainty cues ("Partial match in 2023 memo"), and source previews calibrate trust far more honestly.',
    awsComparison: 'Classic ML classifiers sometimes exposed calibrated class scores; generative AI PMs prefer verifiable evidence and clear uncertainty tiers over fake-precise percentages.'
  },
  {
    id: 'aipc-a3-014',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Automation Bias Mitigation',
    difficulty: 2,
    format: 'single',
    prompt: 'In an AI-assisted medical coding or compliance review tool, usability testing shows reviewers blindly click "Approve All" within two seconds on 98% of AI recommendations—including ones containing subtle errors. Which UX change directly counters this automation bias?',
    options: [
      'Make the "Approve All" button larger and green so reviewers finish queues faster',
      'Highlight low-confidence or high-impact fields, surface the supporting evidence inline, and require explicit item-level confirmation on flagged anomalies',
      'Remove the source document viewer so reviewers are not distracted by raw text',
      'Hide whether a suggestion came from AI or from an earlier human reviewer'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Introduce healthy friction only where risk or uncertainty is high, instead of encouraging one-click rubber-stamping.',
    explanation: 'Automation bias happens when fluent AI output lulls humans into passive rubber-stamping. Targeted visual highlighting of uncertain/high-stakes items, inline evidence, and selective item-level sign-off restore active human judgment without slowing down routine low-risk items.',
    awsComparison: 'Classic PMs ruthlessly minimize friction on every button; AI PMs intentionally design "productive friction" on high-stakes verification steps to defeat automation bias.'
  },
  {
    id: 'aipc-a3-015',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Source Previews & Conflicting Evidence',
    difficulty: 3,
    format: 'single',
    prompt: 'A legal operations AI tool retrieves two documents that disagree: a 2022 master agreement and a 2025 signed addendum. What is the strongest UX design for presenting the synthesized answer?',
    options: [
      'Pick whichever paragraph appeared first alphabetically and hide the other document to keep the UI simple',
      'Refuse to answer any query whenever more than one document matches the topic',
      'Present the prevailing answer with inline citations to both documents, explicitly flagging the conflict and document dates in a side-by-side preview',
      'Merge both rules into one blended sentence without dates so the response reads smoothly'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Hiding contradictions creates silent risk; surfacing dated provenance lets the human resolve authority quickly.',
    explanation: 'Explicitly surfacing conflicting sources with publication/effective dates and side-by-side excerpts empowers the user to verify which authority governs. Silently blending or hiding a conflicting document creates dangerous false certainty.',
    awsComparison: 'Classic search shows ten blue links and leaves synthesis to the user; AI PMs synthesize while transparently exposing provenance, recency, and source conflicts.'
  },
  {
    id: 'aipc-a3-016',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Calibrated Trust & Verification',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement about building calibrated user trust in AI products.',
    statements: [
      {
        statement: 'Calibrated trust means users know both when to rely on the AI and when to double-check or override it.',
        answer: true
      },
      {
        statement: 'Hovering or clicking an inline citation to view the highlighted original passage reduces verification time compared to opening a separate PDF.',
        answer: true
      },
      {
        statement: 'Maximizing user trust at all costs—even when model accuracy is low—is always the right product goal.',
        answer: false
      }
    ],
    awsBridgeHint: 'Distinguish healthy, accurate trust calibration from blind over-reliance.',
    explanation: 'The goal of human-centered AI UX is calibrated trust—matching user reliance to actual system capability—supported by low-friction evidence inspection. Pushing users to trust flawed outputs causes harmful errors and eventual abandonment.',
    awsComparison: 'Classic PMs equate high confidence with great UX; AI PMs measure whether users catch mistakes when the AI is wrong and accept help when it is right.'
  },
  {
    id: 'aipc-a3-017',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Grounded Verification Flow',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the steps of a well-designed, trust-calibrating user flow in an enterprise research assistant from start to finish.',
    correctSequence: [
      'User submits a scoped question from the active project workspace',
      'Interface streams a structured draft with numbered inline citation markers',
      'User clicks a citation marker to inspect the highlighted excerpt in the source preview pane',
      'User verifies or edits the claim before exporting the brief to stakeholders'
    ],
    awsBridgeHint: 'Follow the natural arc from intent capture, to grounded streaming, to source inspection, to final human sign-off.',
    explanation: 'A calibrated AI workflow begins with scoped intent, delivers fast progressive output annotated with citations, makes source verification effortless in context, and concludes with human review prior to high-visibility sharing.',
    awsComparison: 'Classic PMs design "query -> result -> done"; AI PMs design "intent -> grounded draft -> inspect provenance -> verified action."'
  },
  {
    id: 'aipc-a3-018',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Streaming & Time-To-First-Token',
    difficulty: 1,
    format: 'single',
    prompt: 'An AI meeting notes generator takes 9 seconds to finish writing a full summary, causing users to think the app has frozen and click "Refresh." Which UX change directly reduces perceived latency without changing total model runtime?',
    options: [
      'Replace the loading screen with a longer legal terms modal before every summary',
      'Wait until the 9th second and fade the completed paragraph in slowly over 3 seconds',
      'Ask users to guess how long the summary will take before clicking "Generate"',
      'Stream tokens progressively as they generate so Time-To-First-Token (TTFT) appears within ~1 second'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Users judge responsiveness by how quickly meaningful progress starts appearing, not just when the last word finishes.',
    explanation: 'Streaming tokens lowers Time-To-First-Token (TTFT), giving immediate visual confirmation that the system is working and letting users begin reading while the rest completes. Waiting for full completion leaves users staring at a dead or static screen for 9 seconds.',
    awsComparison: 'Classic PMs optimize total page-load completion time; AI PMs obsess over Time-To-First-Token (TTFT) and progressive rendering.'
  },
  {
    id: 'aipc-a3-019',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Latency & Progress UX',
    difficulty: 2,
    format: 'single',
    prompt: 'Before an AI research assistant starts streaming its answer, it spends 5 seconds searching documents and verifying permissions. What should the UI display during those 5 pre-stream seconds?',
    options: [
      'Meaningful step-level progress indicators (e.g., "Searching Q4 board memos… Comparing 4 sources…") paired with a content skeleton',
      'A blank white panel until the first word of the answer is ready',
      'A fake countdown timer that always resets to 3 seconds when it reaches zero',
      'A full-screen survey asking users to rate the app before they see their answer'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Explain what useful work is happening during the retrieval phase rather than leaving users guessing or lying with fake timers.',
    explanation: 'Descriptive stage indicators combined with skeleton placeholders reassure users that real retrieval work is underway and preview the shape of the coming output. Fake countdowns break trust when inaccurate, and blank screens trigger impatient refreshes.',
    awsComparison: 'Classic PMs slap a generic spinner on slow API calls; AI PMs expose transparent reasoning/retrieval milestones to bridge pre-token wait times.'
  },
  {
    id: 'aipc-a3-020',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Asynchronous Latency Patterns',
    difficulty: 2,
    format: 'single',
    prompt: 'A legal due-diligence AI feature analyzes 80 contracts and reliably takes 60–90 seconds to complete. Which UX architecture fits this latency profile best?',
    options: [
      'Keep the user locked on a modal spinner for 90 seconds with no way to navigate elsewhere',
      'Run the job asynchronously in the background, allow the user to keep working, and notify them inline or via inbox/toast when the draft report is ready',
      'Truncate the analysis after 3 contracts so it finishes in 2 seconds regardless of accuracy',
      'Require users to hold down a keyboard shortcut until processing finishes'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Once latency passes ~10–15 seconds, synchronous waiting breaks flow—shift from blocking chat to background job UX.',
    explanation: 'Long-running synthesis (60–90 seconds) belongs in an asynchronous background workflow where users can move on to other tasks and return via a clear notification when ready. Blocking spinners cause tab abandonment, while arbitrarily truncating 80 contracts destroys core value.',
    awsComparison: 'Classic synchronous web UIs expect sub-second responses; AI PMs match interaction patterns to latency tiers (streaming for seconds, async jobs for minutes).'
  },
  {
    id: 'aipc-a3-021',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Latency & Streaming UX',
    difficulty: 3,
    format: 'multi',
    selectCount: 2,
    prompt: 'Which TWO UX practices reduce user frustration and wasted spend during slow AI generation? (Select 2)',
    options: [
      'Providing a clear "Stop generating" button so users can abort early when they see the response heading in the wrong direction',
      'Auto-scroll locking the viewport at the bottom even when the user scrolls up to read earlier citations',
      'Structuring output with an upfront TL;DR or headline summary first so users get immediate value before details finish streaming',
      'Removing all progress feedback so the interface looks minimalist'
    ],
    correctIndices: [0, 2],
    awsBridgeHint: 'Give users an emergency brake for off-track generations and put the most useful answer at the top.',
    explanation: 'A "Stop generating" control lets users interrupt bad runs immediately instead of waiting helplessly, and front-loading a concise summary delivers value within the first seconds of streaming. Hijacking scroll position frustrates readers inspecting earlier citations.',
    awsComparison: 'Classic PMs never needed a mid-response "Stop" button on a database query; AI PMs treat abortability and front-loaded structure as essential latency controls.'
  },
  {
    id: 'aipc-a3-022',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Cold-Start & Prompt Templates',
    difficulty: 1,
    format: 'single',
    prompt: 'Analytics show that 65% of new users open a B2B AI workspace, stare at the empty prompt bar for 15 seconds, and close the tab without typing anything. Which UX fix directly addresses this cold-start problem?',
    options: [
      'Increase the width of the empty text box by 40%',
      'Send an automated reminder email three days after sign-up',
      'Surface 3–4 role-specific starter templates and clickable example prompts tailored to the user’s current workspace data',
      'Hide the AI feature inside a nested "Advanced" menu so only power users find it'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Eliminate blank-page paralysis by showing concrete, one-click starting points anchored in the user’s real data.',
    explanation: 'Pre-populated starter chips and role-specific templates demonstrate what good prompts look like and let new users experience value in one click. Enlarging an empty box still leaves users guessing what the product can actually do.',
    awsComparison: 'Classic onboarding walks users through fixed buttons; AI onboarding must overcome "blank-page paralysis" with contextual starter prompts and examples.'
  },
  {
    id: 'aipc-a3-023',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Onboarding & Capability Boundaries',
    difficulty: 2,
    format: 'single',
    prompt: 'During onboarding for a new AI financial planning assistant, users repeatedly ask it to execute live stock trades—an action the product cannot perform. What is the best way to set accurate capability expectations?',
    options: [
      'Remove the help documentation so users figure it out through trial and error',
      'Let users type trade orders and respond with a vague "Try again later" error',
      'Show a 12-screen mandatory carousel explaining neural network architecture before sign-in',
      'Pair starter prompt suggestions ("Analyze my cash runway", "Compare Q1 burn") with a concise inline scope note clarifying it provides analysis, not trade execution'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Teach both what the AI excels at and where its action boundary stops right where the user starts typing.',
    explanation: 'Showing positive starter examples alongside a brief, concrete boundary statement prevents repeated dead-end prompts without burying users in long tutorials. Long theoretical carousels are skipped immediately.',
    awsComparison: 'Classic UIs communicate boundaries naturally because unsupported buttons simply do not exist; AI UIs accept arbitrary text, so PMs must actively scaffold capability boundaries.'
  },
  {
    id: 'aipc-a3-024',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Suggested Next Actions',
    difficulty: 2,
    format: 'single',
    prompt: 'After an AI product-research assistant summarizes 50 user interviews, users frequently pause and wonder what to ask next. Which UX pattern sustains momentum and drives deeper workflow adoption?',
    options: [
      'Context-aware suggested follow-up chips below the summary (e.g., "Cluster top 3 pain points", "Draft PRD problem statement", "Export quotes by persona")',
      'Clearing the screen immediately after the user copies the text',
      'Displaying a generic "Ask me anything else!" placeholder in an empty box',
      'Requiring the user to type slash commands memorized from a PDF manual'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Anticipate the user’s next logical job-to-be-done right below the first answer.',
    explanation: 'Dynamic next-step chips bridge the gap between reading an insight and acting on it, guiding users toward high-value downstream workflows without requiring prompt creativity. Generic placeholders leave the cognitive burden entirely on the user.',
    awsComparison: 'Classic PMs build static multi-step wizards; AI PMs use dynamic, context-sensitive follow-up chips to turn single answers into guided workflows.'
  },
  {
    id: 'aipc-a3-025',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Onboarding & Cold-Start UX',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding AI onboarding and cold-start UX.',
    statements: [
      {
        statement: 'Pre-built prompt templates should be editable so users can tweak variables rather than feeling locked into rigid outputs.',
        answer: true
      },
      {
        statement: 'Using realistic sample data for first-time users lets them experience AI value before connecting their own workspace.',
        answer: true
      },
      {
        statement: 'Because natural language is intuitive, AI features require zero onboarding hints or capability examples.',
        answer: false
      }
    ],
    awsBridgeHint: 'Think about editable templates, instant sample sandboxes, and why open text boxes still confuse new users.',
    explanation: 'Editable templates and pre-loaded sample data accelerate time-to-aha, while assuming "everyone knows what to type" is one of the biggest causes of low AI feature activation.',
    awsComparison: 'Classic SaaS onboarding relies on empty-state checklists; AI onboarding pairs sample sandboxes with editable starter prompts to conquer the blank box.'
  },
  {
    id: 'aipc-a3-026',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Explicit vs. Implicit Feedback',
    difficulty: 1,
    format: 'single',
    prompt: 'A PM notices that only 2% of users click the thumbs-up or thumbs-down icons on an AI email drafter, and most clicks are negative rants. Why should the PM avoid relying solely on thumbs up/down to measure quality?',
    options: [
      'Thumbs buttons cannot be tracked inside modern web analytics dashboards',
      'Explicit feedback suffers from very low response rates and strong selection bias, missing how the quiet 98% actually accept, edit, or abandon outputs',
      'Users who click thumbs-down always want the entire AI feature deleted from the product',
      'Implicit signals like edits and insertions require users to fill out extra survey forms'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Compare what the vocal 2% click versus what the silent 98% actually do with the generated draft.',
    explanation: 'Explicit ratings capture a tiny, skewed fraction of sessions—mostly extreme frustration or novelty—whereas implicit behavioral telemetry captures every single interaction passively. Relying only on thumbs buttons gives a distorted picture of real product utility.',
    awsComparison: 'Classic PMs measure explicit CSAT surveys cautiously; AI PMs combine sparse explicit ratings with rich implicit behavioral loops on every generated artifact.'
  },
  {
    id: 'aipc-a3-027',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Implicit Feedback Telemetry',
    difficulty: 2,
    format: 'single',
    prompt: 'An AI code-comment or copywriting assistant logs four behaviors: (A) Accept as-is, (B) Insert and edit <15% of characters, (C) Insert and rewrite >70% of characters, and (D) Regenerate three times then close. How should the PM interpret these signals?',
    options: [
      'Group (A), (B), and (C) together as equal successes because the user clicked "Insert"',
      'Treat (D) as high engagement because the user spent more time interacting with the AI',
      'Treat (A) and low-edit (B) as strong positive quality signals, heavy rewrite (C) as partial utility needing tuning, and repeated regenerate-then-abandon (D) as a quality failure',
      'Ignore (B) and (C) completely because only zero-edit acceptance counts as product value'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Distinguish genuine workflow value from wasted effort—more regenerations usually signal struggle, not engagement.',
    explanation: 'Edit distance after insertion reveals how close the AI draft actually was: minor tweaks indicate high value, heavy rewrites expose gaps in tone or accuracy, and regenerate-then-abandon loops represent clear failure. Counting repeated regenerations as "engagement" is a classic AI metrics trap.',
    awsComparison: 'Classic PMs celebrate higher time-on-feature and click volume; AI PMs treat repeated retries and heavy post-insert rewrites as negative friction signals.'
  },
  {
    id: 'aipc-a3-028',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Interpreting Dwell Time & Signals',
    difficulty: 3,
    format: 'single',
    prompt: 'A PM sees that users spend an average of 90 seconds staring at an AI-generated legal clause summary before taking any action. Why is raw dwell time alone an ambiguous metric?',
    options: [
      'Dwell time cannot be measured if a user opens more than one browser tab',
      'Longer dwell time always proves users love reading the AI’s prose',
      'Short dwell time under 5 seconds always proves the AI output was 100% accurate',
      '90 seconds could mean careful reading and verification, or it could mean confusion and distrust—so it must be paired with downstream actions like copy, export, or manual search'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Ask whether lingering on a screen reflects deep value or stalled uncertainty—pair time with what happens next.',
    explanation: 'Dwell time without outcome context is inherently ambiguous: thoughtful review and confused hesitation look identical on a timer. Pairing dwell time with downstream signals (copying text, clicking sources, editing, or abandoning to manual search) clarifies true satisfaction.',
    awsComparison: 'Classic content PMs treat longer dwell time as engagement; AI productivity PMs validate dwell time against completion, verification, and edit-rate outcomes.'
  },
  {
    id: 'aipc-a3-029',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Implicit Feedback Loops',
    difficulty: 2,
    format: 'multi',
    selectCount: 3,
    prompt: 'A PM is instrumenting an AI sales-email assistant embedded inside an outreach composer. Which THREE implicit telemetry events give the strongest signal of draft quality? (Select 3)',
    options: [
      'Acceptance rate (user inserts the draft into the email body)',
      'Edit distance (percentage of generated words modified before sending)',
      'Total number of pixels on the user’s monitor',
      'Regeneration or immediate undo/delete rate after insertion',
      'Number of times the user opens the company’s About Us page'
    ],
    correctIndices: [0, 1, 3],
    awsBridgeHint: 'Focus on what users actually do to the generated draft: adopt it, tweak it, or throw it away.',
    explanation: 'Insertion rate, post-insertion edit distance, and immediate undo/regeneration rates directly track whether drafts saved time and matched intent. Monitor resolution and unrelated navigation pages carry no signal about email draft quality.',
    awsComparison: 'Classic PMs track button clicks and page views; AI PMs instrument artifact-level acceptance, diff/edit distance, and immediate discard/retry loops.'
  },
  {
    id: 'aipc-a3-030',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Feedback Loop Design',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding explicit and implicit feedback design in AI products.',
    statements: [
      {
        statement: 'When a user clicks thumbs-down, offering lightweight one-click tags (e.g., "Inaccurate", "Wrong tone", "Missing context") yields much more actionable data than a blank comment box alone.',
        answer: true
      },
      {
        statement: 'If users silently copy an AI output to their clipboard and leave the chat, it is safer to treat that copy event as a negative signal because they did not click thumbs-up.',
        answer: false
      },
      {
        statement: 'Closing the loop—such as letting users see that their corrections update future workspace preferences—encourages ongoing high-quality feedback.',
        answer: true
      }
    ],
    awsBridgeHint: 'Think about reducing friction on negative feedback tags, interpreting copy-to-clipboard behavior, and rewarding user corrections.',
    explanation: 'Structured failure tags turn vague complaints into prioritized fixes, and visible personalization rewards feedback effort. Copying an AI answer to use elsewhere is usually a strong implicit positive signal, even without an explicit thumbs-up click.',
    awsComparison: 'Classic PMs log bug reports manually; AI PMs turn lightweight structured tags and natural user actions into continuous evaluation datasets.'
  },
  {
    id: 'aipc-a3-031',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'HITL Autonomy Spectrum',
    difficulty: 1,
    format: 'single',
    prompt: 'What principle should guide a PM when choosing where an AI feature sits on the Human-in-the-Loop (HITL) autonomy spectrum (Suggest -> Draft -> Approve -> Autonomous)?',
    options: [
      'Match the level of autonomy to the stakes and reversibility of the action—higher stakes or irreversible outcomes require stronger human review gates',
      'Always launch every new AI feature at full autonomous execution to showcase maximum technical innovation',
      'Keep every AI feature permanently at passive suggestion regardless of how low-risk or reversible the task is',
      'Let the model randomly pick its autonomy level on each user session'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Compare sending a mass customer refund or deleting data versus tagging an internal support ticket.',
    explanation: 'Autonomy should scale inversely with blast radius and irreversibility: high-impact or irreversible actions require explicit human approval ("Draft -> Approve"), while low-risk, easily reversible tasks can move toward autonomous execution with undo.',
    awsComparison: 'Classic software executes deterministic rules at fixed automation levels; AI PMs actively calibrate human oversight gates by risk, cost of error, and reversibility.'
  },
  {
    id: 'aipc-a3-032',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'HITL Autonomy Spectrum',
    difficulty: 2,
    format: 'single',
    prompt: 'A customer support team wants AI to handle billing dispute responses that may issue up to \$500 in account credits. Which HITL mode should the PM ship in v1?',
    options: [
      'Fully autonomous sending with no human notification or audit log',
      'Draft + Explicit Approve: AI prepares the response and recommended credit amount, and an agent reviews and clicks "Approve & Send"',
      'Passive hint only: AI says "You might want to check billing" without pulling data or drafting anything',
      'Autonomous sending at midnight without any undo or reversal mechanism'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Real money leaving the company is high-stakes and hard to claw back, yet drafting saves huge agent time.',
    explanation: 'Draft + Explicit Approve captures most of the speed gain—assembling facts and prose—while keeping a human accountable before \$500 leaves the business. Full autonomy on financial credits creates unacceptable fraud and hallucination exposure in v1.',
    awsComparison: 'Classic PMs either automate a rule completely or leave it manual; AI PMs unlock massive leverage in the middle ("AI drafts, human approves").'
  },
  {
    id: 'aipc-a3-033',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Autonomous With Undo',
    difficulty: 2,
    format: 'single',
    prompt: 'An inbox productivity app uses AI to automatically apply non-destructive topic labels ("Travel", "Receipts", "Newsletters") to incoming emails. Why is "Autonomous with Undo" a strong UX fit here?',
    options: [
      'Users love clicking "Confirm" pop-ups on every single incoming newsletter email',
      'Topic labeling is legally irreversible once applied to an inbox',
      'The task is high-volume, low-stakes, and trivially reversible—so automatic labeling saves tedious clicks while an "Undo / Change label" action keeps users in control',
      'Autonomous labeling eliminates the need to measure classification accuracy'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think about tasks where asking permission on every item is more annoying than fixing the occasional miss.',
    explanation: 'When errors are cheap and easily reversible, requiring per-item approval destroys the time savings of automation. Executing automatically while making undo/re-labeling one click preserves speed, user control, and continuous correction data.',
    awsComparison: 'Classic rule filters act silently or require manual setup; AI PMs deploy optimistic automation backed by frictionless undo and correction.'
  },
  {
    id: 'aipc-a3-034',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Diff View & User Agency',
    difficulty: 3,
    format: 'single',
    prompt: 'An AI assistant inside a product-spec editor proposes updates to a 10-page PRD written by the PM. Which review UX best protects user trust and prevents silent unintended changes?',
    options: [
      'Overwrite the entire document silently and display a brief "Updated!" toast',
      'Append the new 10-page draft underneath the old 10 pages as plain unformatted text',
      'Lock the original text from being viewed once the AI begins rewriting',
      'Present a tracked-changes diff view highlighting additions and deletions, allowing section-by-section Accept or Reject'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Borrow the gold-standard pattern editors use when collaborating with a human teammate on an existing document.',
    explanation: 'A granular diff view with Accept/Reject controls makes every proposed change legible, respects the author’s existing work, and prevents subtle AI deletions from slipping into a critical spec unnoticed.',
    awsComparison: 'Classic "Find & Replace" previews exact matches; AI edits alter meaning across sentences, making tracked-changes diff UI mandatory for serious document workflows.'
  },
  {
    id: 'aipc-a3-035',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'HITL Autonomy Progression',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Order the Human-in-the-Loop (HITL) autonomy levels from LOWEST AI agency to HIGHEST AI agency.',
    correctSequence: [
      'Suggest: AI offers inline ideas or snippets only when asked, without modifying state',
      'Draft: AI pre-fills a complete artifact or action plan that remains unsent until edited',
      'Approve: AI queues a ready-to-execute action requiring explicit human sign-off',
      'Autonomous with Undo: AI executes low-risk actions automatically while logging changes and offering one-click rollback'
    ],
    awsBridgeHint: 'Move step-by-step from passive advice, to pre-populated work, to gated execution, to optimistic execution.',
    explanation: 'The HITL spectrum progresses from Suggest (user pulls advice), to Draft (AI prepares editable work), to Approve (explicit human gate before impact), to Autonomous with Undo (AI acts first with instant reversibility). Products often graduate workflows along this ladder as eval accuracy earns trust.',
    awsComparison: 'Classic software is binary (manual vs. automated); AI PMs treat autonomy as a graduated spectrum that expands as real-world reliability is proven.'
  },
  {
    id: 'aipc-a3-036',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Ambient AI & Avoiding Intrusiveness',
    difficulty: 3,
    format: 'single',
    prompt: 'Users complain that a proactive AI writing coach pops up mid-sentence every time they pause typing for two seconds, earning comparisons to annoying legacy office assistants. How should the PM redesign this experience?',
    options: [
      'Shift triggers to natural completion boundaries (such as end-of-paragraph or explicit hover), lower frequency on dismissed suggestions, and add a quick snooze/sensitivity toggle',
      'Speed up the pop-up delay from 2 seconds to 0.5 seconds so suggestions appear even sooner',
      'Play a chime sound every time a suggestion appears to train users to notice it',
      'Disable the user’s Backspace key while a suggestion card is visible'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Respect user flow state: wait for natural pauses, learn from dismissals, and give users a volume knob.',
    explanation: 'Good ambient AI respects cognitive flow by waiting for natural breakpoints, backing off automatically when suggestions are dismissed, and letting users adjust or snooze proactive nudges. Faster pop-ups or audio chimes only amplify interruption fatigue.',
    awsComparison: 'Classic notification systems often over-alert until users turn them off globally; AI PMs tune trigger timing and adaptive suppression per user.'
  },
  {
    id: 'aipc-a3-037',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'User Control & State Preservation',
    difficulty: 2,
    format: 'single',
    prompt: 'In an AI-powered slide deck builder, a user generates an outline, manually edits slide 3, and then asks the AI to "add a case study slide at the end." Which state-management failure would break user trust fastest?',
    options: [
      'Streaming the new case study slide smoothly at the end of the outline',
      'Regenerating the entire deck from scratch and silently wiping out the user’s manual edits on slide 3',
      'Highlighting the newly added slide with a subtle "New" badge',
      'Keeping an Undo history entry so the user can revert adding the case study slide'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Never punish a user for collaborating manually by overwriting what they already refined.',
    explanation: 'Nothing erodes user trust in co-creative AI tools faster than clobbering manual human edits during a subsequent AI command. Preserving user-locked sections and scoping edits strictly to the requested change keeps human and AI collaboration safe.',
    awsComparison: 'Classic CRUD apps rigorously protect unsaved user edits; AI PMs must enforce the same state-preservation discipline around probabilistic regenerations.'
  },
  {
    id: 'aipc-a3-038',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'Human-Centered Explainability',
    difficulty: 3,
    format: 'single',
    prompt: 'A B2B churn-prediction and account-briefing co-pilot flags an enterprise customer as "At Risk" and drafts a save plan. What level of explainability is most useful to a Customer Success Manager (CSM)?',
    options: [
      'Printing raw model hyperparameter weights and embedding vector distances in the sidebar',
      'Showing only a red warning icon with the caption "AI says this account is high risk"',
      'Surfacing the concrete behavioral drivers in domain language ("3 executive logins dropped 60%, 2 unresolved Sev-1 tickets") linked to source records',
      'Requiring the CSM to open a developer console log to read JSON scoring payloads'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Translate model reasoning into observable customer facts the CSM can immediately verify and act on.',
    explanation: 'Domain-level explainability connects the AI recommendation to concrete, inspectable customer evidence (usage drops, open escalations), enabling the CSM to validate the diagnosis and tailor outreach. Raw mathematical weights overwhelm non-technical users, while unexplained red badges breed skepticism.',
    awsComparison: 'Classic BI dashboards show raw charts without synthesis; AI PMs pair recommendations with human-readable causal drivers linked to underlying evidence.'
  },
  {
    id: 'aipc-a3-039',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'HITL Governance & Progressive Disclosure',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Human-in-the-Loop (HITL) controls and progressive disclosure in AI UX.',
    statements: [
      {
        statement: 'Progressive disclosure keeps the primary interface clean by showing the concise answer first while letting skeptical users expand sources, assumptions, or step logs on demand.',
        answer: true
      },
      {
        statement: 'Giving users an easy way to undo an AI bulk action increases their willingness to try higher-autonomy workflows.',
        answer: true
      },
      {
        statement: 'Once an AI feature reaches 90% accuracy in offline testing, human review gates and undo options can safely be removed even for irreversible external actions.',
        answer: false
      }
    ],
    awsBridgeHint: 'Consider how layered detail, reversibility, and residual error rates (10% wrong = 1 in 10!) affect real-world safety.',
    explanation: 'Progressive disclosure balances simplicity for fast tasks with depth for verification, and reliable undo lowers adoption anxiety. Even 90% accuracy means 1 in 10 actions fails—far too risky for unreviewed irreversible actions.',
    awsComparison: 'Classic deterministic workflows rarely fail 10% of the time; AI PMs assume non-zero error rates forever and keep safety nets proportionate to impact.'
  },
  {
    id: 'aipc-a3-040',
    track: 'aipc',
    act: 3,
    domain: 'aipc-ux',
    subtopic: 'End-to-End AI-Native UX Design',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the product design progression for transforming an unloved blank-box chatbot into a trusted, AI-native workflow.',
    correctSequence: [
      'Pinpoint a high-friction user task and embed an in-context trigger with starter templates',
      'Stream a structured draft with step indicators so users see fast progress',
      'Attach inline citations and appropriate HITL review controls matching task stakes',
      'Instrument acceptance, edit distance, and undo rates to refine quality over time'
    ],
    awsBridgeHint: 'Move from contextual entry point, to responsive delivery, to trust & safety controls, to behavioral learning loops.',
    explanation: 'Designing AI-native UX starts with embedding context and solving cold-start, continues with fast streaming/progress UX, builds calibrated trust via citations and risk-appropriate HITL gates, and closes the loop with implicit behavioral telemetry.',
    awsComparison: 'Classic PMs ship static specs and check conversion funnels; AI PMs iterate continuously across context triggers, latency perception, trust scaffolding, and behavioral edit loops.'
  }
];
