import { createServer } from 'vite';

const server = await createServer({
  root: 'C:/Users/bsefc/.gemini/antigravity/scratch/spire-of-azure',
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom'
});

try {
  const { ALL_EXAM_QUESTIONS } = await server.ssrLoadModule('/src/data/allQuestions.ts');
  const { ACT_INTEL_BRIEFINGS } = await server.ssrLoadModule('/src/data/briefings.ts');
  const { ROSETTA_SERVICES, CHEAT_SHEET_TABLES } = await server.ssrLoadModule('/src/data/rosettaCodex.ts');

  const seenIds = new Set();
  const seenPrompts = new Set();
  let errors = 0;

  for (const q of ALL_EXAM_QUESTIONS) {
    if (seenIds.has(q.id)) {
      console.error(`Duplicate ID: ${q.id}`);
      errors++;
    }
    seenIds.add(q.id);

    const normPrompt = q.prompt.trim().toLowerCase();
    if (seenPrompts.has(normPrompt)) {
      console.error(`Duplicate Prompt on ${q.id}`);
      errors++;
    }
    seenPrompts.add(normPrompt);

    if (!q.awsBridgeHint || !q.explanation || !q.awsComparison) {
      console.error(`Missing explanation/AWS bridge on ${q.id}`);
      errors++;
    }

    if (q.format === 'single') {
      if (!Array.isArray(q.options) || q.options.length < 3 || !Array.isArray(q.correctIndices) || q.correctIndices.length !== 1) {
        console.error(`Invalid single question ${q.id}`);
        errors++;
      } else if (q.correctIndices[0] < 0 || q.correctIndices[0] >= q.options.length) {
        console.error(`Out-of-bounds index on ${q.id}`);
        errors++;
      }
    } else if (q.format === 'multi') {
      if (!Array.isArray(q.options) || !Array.isArray(q.correctIndices) || q.correctIndices.length !== (q.selectCount || 2)) {
        console.error(`Invalid multi question ${q.id}`);
        errors++;
      } else if (q.correctIndices.some((idx) => idx < 0 || idx >= q.options.length)) {
        console.error(`Out-of-bounds multi index on ${q.id}`);
        errors++;
      }
    } else if (q.format === 'yes-no') {
      if (!Array.isArray(q.statements) || q.statements.length < 2) {
        console.error(`Invalid yes-no question ${q.id}`);
        errors++;
      }
    } else if (q.format === 'sequence') {
      if (!Array.isArray(q.correctSequence) || q.correctSequence.length < 3) {
        console.error(`Invalid sequence question ${q.id}`);
        errors++;
      }
    }
  }

  const az900Count = ALL_EXAM_QUESTIONS.filter((q) => q.track === 'az-900').length;
  const az104Count = ALL_EXAM_QUESTIONS.filter((q) => q.track === 'az-104').length;

  console.log(`Total Questions Validated: ${ALL_EXAM_QUESTIONS.length} (AZ-900: ${az900Count}, AZ-104: ${az104Count})`);
  console.log(`Briefings: ${ACT_INTEL_BRIEFINGS.length} | Rosetta Rows: ${ROSETTA_SERVICES.length} | Cheat Sheets: ${CHEAT_SHEET_TABLES.length}`);
  console.log(`Validation Errors: ${errors}`);
  if (errors > 0) process.exitCode = 1;
} finally {
  await server.close();
}
