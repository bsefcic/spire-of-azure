import React from 'react';
import { ArrowRight, Bookmark, CheckCircle2, Flame, Layers, XCircle, Zap } from 'lucide-react';
import { ExamQuestion } from '../types/curriculum';
import { sfx } from '../utils/audioHaptics';

interface FeedbackDrawerProps {
  question: ExamQuestion;
  isCorrect: boolean;
  isFast?: boolean;
  energyAwarded?: number;
  streak?: number;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
  continueLabel?: string;
  onContinue: () => void;
}

export const FeedbackDrawer: React.FC<FeedbackDrawerProps> = ({
  question,
  isCorrect,
  isFast = false,
  energyAwarded,
  streak = 0,
  isFlagged = false,
  onToggleFlag,
  continueLabel = 'Play Tactical Cards',
  onContinue
}) => {
  const renderCorrectSummary = () => {
    if (question.format === 'single' && question.options && question.correctIndices) {
      return question.options[question.correctIndices[0]];
    }
    if (question.format === 'multi' && question.options && question.correctIndices) {
      return question.correctIndices.map((idx) => `• ${question.options![idx]}`).join('\n');
    }
    if (question.format === 'yes-no' && question.statements) {
      return question.statements
        .map((s) => `${s.answer ? '[YES]' : '[NO]'} ${s.statement}`)
        .join('\n');
    }
    if (question.format === 'sequence' && question.correctSequence) {
      return question.correctSequence.map((s, idx) => `${idx + 1}. ${s}`).join('\n');
    }
    return '';
  };

  return (
    <div
      className={`rounded-2xl border p-3.5 shadow-2xl ${
        isCorrect
          ? 'border-emerald-500/40 bg-emerald-950/20'
          : 'border-rose-500/40 bg-rose-950/20'
      }`}
    >
      {/* Status Banner */}
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-extrabold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                {isCorrect ? (isFast ? 'LIGHTNING ARCHITECT!' : 'CORRECT!') : 'MISCONFIGURED — ADDED TO DRILL'}
              </span>
              {streak >= 2 && (
                <span className="flex items-center gap-0.5 rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                  <Flame className="h-3 w-3" /> x{streak}
                </span>
              )}
            </div>
            {energyAwarded !== undefined && (
              <p className="flex items-center gap-1 text-xs text-sky-300">
                <Zap className="h-3.5 w-3.5" /> Charged <strong>{energyAwarded} Turn Energy</strong>
              </p>
            )}
          </div>
        </div>

        {onToggleFlag && (
          <button
            type="button"
            onClick={() => {
              sfx.tap();
              onToggleFlag();
            }}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
              isFlagged
                ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                : 'border-slate-800 bg-slate-900 text-slate-400'
            }`}
          >
            <Bookmark className="inline h-3.5 w-3.5 mr-1" fill={isFlagged ? 'currentColor' : 'none'} />
            {isFlagged ? 'Saved' : 'Save'}
          </button>
        )}
      </div>

      {/* Correct Answer Box */}
      <div className="mb-2.5 rounded-xl border border-slate-800 bg-slate-950/90 p-2.5">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          {question.track === 'aipc' ? 'Best-Practice AI PM Decision' : 'Correct Azure Solution'}
        </div>
        <div className="whitespace-pre-line text-xs font-semibold text-slate-100">
          {renderCorrectSummary()}
        </div>
      </div>

      {/* Exam Explanation */}
      <div className="mb-2.5 rounded-xl border border-slate-800/80 bg-slate-950/70 p-2.5 text-xs leading-relaxed text-slate-300">
        <span className="font-bold text-sky-300">Why: </span>
        {question.explanation}
      </div>

      {/* Bridge & Gotcha Box */}
      <div className="mb-3 rounded-xl border border-amber-500/30 bg-amber-950/25 p-2.5 text-xs leading-relaxed text-amber-100/95">
        <div className="mb-0.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-400">
          <Layers className="h-3.5 w-3.5" />
          <span>
            {question.track === 'aipc'
              ? 'Classic PM vs. AI PM Shift & Gotcha'
              : 'AWS SAA Equivalent & Gotcha'}
          </span>
        </div>
        {question.awsComparison}
      </div>

      <button
        type="button"
        onClick={() => {
          sfx.tap();
          onContinue();
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-sky-500/20 transition active:scale-98"
      >
        <span>{continueLabel}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
