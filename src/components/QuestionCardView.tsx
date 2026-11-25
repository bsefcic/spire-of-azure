import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Bookmark, Check, HelpCircle, Sparkles, Zap } from 'lucide-react';
import { ExamQuestion } from '../types/curriculum';
import { sfx } from '../utils/audioHaptics';

interface QuestionCardViewProps {
  question: ExamQuestion;
  hintCharges?: number;
  usedHint?: boolean;
  onUseHint?: () => void;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
  showSpeedBar?: boolean;
  fastWindowMs?: number;
  onSubmitAnswer: (isCorrect: boolean, elapsedMs: number) => void;
  compactHeader?: string;
}

function deterministicShuffle(items: string[], seedStr: string): string[] {
  const arr = [...items];
  let hash = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    hash ^= seedStr.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    hash ^= i + 97;
    hash = Math.imul(hash, 16777619);
    const j = Math.abs(hash) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure shuffled isn't identical to original if length > 1
  if (arr.length > 1 && arr.every((v, idx) => v === items[idx])) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

export const QuestionCardView: React.FC<QuestionCardViewProps> = ({
  question,
  hintCharges = 0,
  usedHint = false,
  onUseHint,
  isFlagged = false,
  onToggleFlag,
  showSpeedBar = false,
  fastWindowMs = 13000,
  onSubmitAnswer,
  compactHeader
}) => {
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  // Multi-select state
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);

  // Yes-No matrix state: null | boolean per statement
  const [yesNoAnswers, setYesNoAnswers] = useState<(boolean | null)[]>([]);

  // Sequence order state
  const initialSeq = useMemo(() => {
    if (question.format !== 'sequence' || !question.correctSequence) return [];
    return deterministicShuffle(question.correctSequence, question.id);
  }, [question]);
  const [seqOrder, setSeqOrder] = useState<string[]>(initialSeq);

  useEffect(() => {
    const now = Date.now();
    setStartedAt(now);
    setElapsedMs(0);
    setSelectedMulti([]);
    setYesNoAnswers(question.statements ? question.statements.map(() => null) : []);
    setSeqOrder(initialSeq);
  }, [question, initialSeq]);

  useEffect(() => {
    if (!showSpeedBar) return;
    const id = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAt);
    }, 150);
    return () => window.clearInterval(id);
  }, [showSpeedBar, startedAt]);

  const inFastWindow = elapsedMs <= fastWindowMs;
  const speedPct = Math.max(0, Math.min(100, ((fastWindowMs - elapsedMs) / fastWindowMs) * 100));

  const handleSingleTap = (idx: number) => {
    const elapsed = Date.now() - startedAt;
    const isCorrect = Boolean(question.correctIndices && question.correctIndices[0] === idx);
    onSubmitAnswer(isCorrect, elapsed);
  };

  const toggleMultiOption = (idx: number) => {
    sfx.tap();
    const maxSelect = question.selectCount || 2;
    setSelectedMulti((prev) => {
      if (prev.includes(idx)) return prev.filter((i) => i !== idx);
      if (prev.length >= maxSelect) {
        return [...prev.slice(1), idx];
      }
      return [...prev, idx];
    });
  };

  const submitMulti = () => {
    const elapsed = Date.now() - startedAt;
    const expected = [...(question.correctIndices || [])].sort((a, b) => a - b);
    const actual = [...selectedMulti].sort((a, b) => a - b);
    const isCorrect =
      expected.length === actual.length && expected.every((val, i) => val === actual[i]);
    onSubmitAnswer(isCorrect, elapsed);
  };

  const submitYesNo = () => {
    if (!question.statements) return;
    const elapsed = Date.now() - startedAt;
    const isCorrect = question.statements.every((st, i) => yesNoAnswers[i] === st.answer);
    onSubmitAnswer(isCorrect, elapsed);
  };

  const moveSeqItem = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= seqOrder.length) return;
    sfx.tap();
    const copy = [...seqOrder];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setSeqOrder(copy);
  };

  const submitSequence = () => {
    if (!question.correctSequence) return;
    const elapsed = Date.now() - startedAt;
    const isCorrect = question.correctSequence.every((item, idx) => seqOrder[idx] === item);
    onSubmitAnswer(isCorrect, elapsed);
  };

  const formatBadge =
    question.format === 'single'
      ? 'Single Choice'
      : question.format === 'multi'
        ? `Select ${question.selectCount || 2}`
        : question.format === 'yes-no'
          ? 'Yes / No Matrix'
          : 'Sequence Order';

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/95 p-3.5 shadow-2xl">
      {/* Speed Charge Bar for Roguelike Turn Energy */}
      {showSpeedBar && (
        <div className="mb-2.5">
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium">
            <span className={inFastWindow ? 'flex items-center gap-1 text-sky-400' : 'text-slate-400'}>
              <Zap className="h-3.5 w-3.5" />
              {inFastWindow ? 'FAST CHARGE ACTIVE (+4 ⚡ Energy)' : 'STANDARD CHARGE (+3 ⚡ Energy)'}
            </span>
            <span className="text-slate-500 uppercase tracking-wider">{question.track}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
            <div
              className={`h-full transition-all duration-150 ${
                inFastWindow ? 'bg-gradient-to-r from-sky-400 to-indigo-400' : 'bg-slate-700'
              }`}
              style={{ width: `${inFastWindow ? speedPct : 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Meta Header */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-300">
            {compactHeader || question.subtopic}
          </span>
          <span className="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5 text-[11px] text-slate-300">
            {formatBadge}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onUseHint && (
            <button
              type="button"
              disabled={usedHint || hintCharges <= 0}
              onClick={() => {
                sfx.tap();
                onUseHint();
              }}
              className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition active:scale-95 ${
                usedHint
                  ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                  : hintCharges > 0
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                    : 'border-slate-800 bg-slate-900/50 text-slate-600'
              }`}
              title="AWS SAA Bridge Hint"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>AWS Hint ({hintCharges})</span>
            </button>
          )}
          {onToggleFlag && (
            <button
              type="button"
              onClick={() => {
                sfx.tap();
                onToggleFlag();
              }}
              className={`rounded-lg border p-1.5 transition active:scale-95 ${
                isFlagged
                  ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400'
              }`}
              title="Bookmark to Weak-Spot Drill"
            >
              <Bookmark className="h-3.5 w-3.5" fill={isFlagged ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
      </div>

      {/* Optional AWS Hint Banner */}
      {usedHint && (
        <div className="mb-2.5 rounded-xl border border-amber-500/35 bg-amber-950/35 px-3 py-2 text-xs text-amber-200">
          <span className="font-bold text-amber-400">AWS SAA Bridge Nudge: </span>
          {question.awsBridgeHint}
        </div>
      )}

      {/* Question Prompt */}
      <p className="mb-3 text-[14px] leading-relaxed font-medium text-slate-100 select-text">
        {question.prompt}
      </p>

      {/* FORMAT 1: SINGLE CHOICE */}
      {question.format === 'single' && question.options && (
        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSingleTap(idx)}
                className="flex w-full items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2.5 text-left text-[13px] leading-snug text-slate-100 transition hover:border-sky-500/60 hover:bg-slate-900 active:scale-[0.985] active:border-sky-400"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-950 text-[11px] font-bold text-sky-400">
                  {letter}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* FORMAT 2: MULTI-SELECT */}
      {question.format === 'multi' && question.options && (
        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            const checked = selectedMulti.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleMultiOption(idx)}
                className={`flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13px] leading-snug transition active:scale-[0.985] ${
                  checked
                    ? 'border-sky-400 bg-sky-500/15 text-white'
                    : 'border-slate-800 bg-slate-900/90 text-slate-200'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold ${
                    checked
                      ? 'border-sky-400 bg-sky-500 text-slate-950'
                      : 'border-slate-700 bg-slate-950 text-slate-400'
                  }`}
                >
                  {checked ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
          <button
            type="button"
            disabled={selectedMulti.length !== (question.selectCount || 2)}
            onClick={submitMulti}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-2.5 text-sm font-bold text-slate-950 transition disabled:bg-slate-800 disabled:text-slate-500 active:scale-98"
          >
            <Sparkles className="h-4 w-4" />
            <span>
              Confirm Selection ({selectedMulti.length}/{question.selectCount || 2})
            </span>
          </button>
        </div>
      )}

      {/* FORMAT 3: MICROSOFT YES / NO STATEMENT MATRIX */}
      {question.format === 'yes-no' && question.statements && (
        <div className="space-y-2">
          {question.statements.map((st, idx) => {
            const val = yesNoAnswers[idx];
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/90 p-2.5"
              >
                <p className="mb-2 text-[12.5px] leading-snug text-slate-200">{st.statement}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sfx.tap();
                      const next = [...yesNoAnswers];
                      next[idx] = true;
                      setYesNoAnswers(next);
                    }}
                    className={`rounded-lg border py-1.5 text-xs font-bold transition ${
                      val === true
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                        : 'border-slate-700 bg-slate-950 text-slate-400'
                    }`}
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sfx.tap();
                      const next = [...yesNoAnswers];
                      next[idx] = false;
                      setYesNoAnswers(next);
                    }}
                    className={`rounded-lg border py-1.5 text-xs font-bold transition ${
                      val === false
                        ? 'border-rose-400 bg-rose-500/20 text-rose-300'
                        : 'border-slate-700 bg-slate-950 text-slate-400'
                    }`}
                  >
                    NO
                  </button>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            disabled={yesNoAnswers.some((v) => v === null)}
            onClick={submitYesNo}
            className="mt-2 w-full rounded-xl bg-sky-500 py-2.5 text-sm font-bold text-slate-950 transition disabled:bg-slate-800 disabled:text-slate-500 active:scale-98"
          >
            Lock In Matrix Answers
          </button>
        </div>
      )}

      {/* FORMAT 4: SEQUENCE ORDERING */}
      {question.format === 'sequence' && (
        <div className="space-y-2">
          <p className="text-[11px] text-slate-400">
            Use the arrows to arrange from <strong className="text-sky-300">First / Top (1)</strong> to{' '}
            <strong className="text-sky-300">Last / Bottom ({seqOrder.length})</strong>:
          </p>
          {seqOrder.map((item, idx) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-2.5 py-2"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-300">
                {idx + 1}
              </span>
              <span className="flex-1 text-[12.5px] leading-snug text-slate-100">{item}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSeqItem(idx, -1)}
                  className="rounded-lg border border-slate-700 bg-slate-950 p-1.5 text-slate-300 disabled:opacity-30 active:scale-95"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === seqOrder.length - 1}
                  onClick={() => moveSeqItem(idx, 1)}
                  className="rounded-lg border border-slate-700 bg-slate-950 p-1.5 text-slate-300 disabled:opacity-30 active:scale-95"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={submitSequence}
            className="mt-2 w-full rounded-xl bg-sky-500 py-2.5 text-sm font-bold text-slate-950 transition active:scale-98"
          >
            Submit Sequence
          </button>
        </div>
      )}
    </div>
  );
};
