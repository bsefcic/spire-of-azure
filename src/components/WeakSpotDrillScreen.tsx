import React, { useMemo, useState } from 'react';
import { CheckCircle2, Flame, Target, X } from 'lucide-react';
import { ExamQuestion, ExamTrack } from '../types/curriculum';
import { QuestionMasteryRecord } from '../types/game';
import { getWeakSpotQuestions } from '../engine/fsrs';
import { QuestionCardView } from './QuestionCardView';
import { FeedbackDrawer } from './FeedbackDrawer';
import { sfx } from '../utils/audioHaptics';

interface WeakSpotDrillScreenProps {
  questionPool: ExamQuestion[];
  mastery: Record<string, QuestionMasteryRecord>;
  initialTrack: ExamTrack;
  onRecordAnswer: (questionId: string, isCorrect: boolean, elapsedMs: number) => void;
  onToggleFlag: (questionId: string) => void;
  onClose: () => void;
}

export const WeakSpotDrillScreen: React.FC<WeakSpotDrillScreenProps> = ({
  questionPool,
  mastery,
  initialTrack,
  onRecordAnswer,
  onToggleFlag,
  onClose
}) => {
  const [filterTrack, setFilterTrack] = useState<'all' | ExamTrack>(initialTrack);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'question' | 'feedback'>('question');
  const [lastCorrect, setLastCorrect] = useState(false);
  const [drillStreak, setDrillStreak] = useState(0);

  const weakQuestions = useMemo(() => {
    return getWeakSpotQuestions(
      questionPool,
      mastery,
      filterTrack === 'all' ? undefined : filterTrack
    );
  }, [questionPool, mastery, filterTrack]);

  // Snapshot the active question so answering it doesn't swap it out before feedback finishes!
  const [lockedQuestion, setLockedQuestion] = useState<ExamQuestion | null>(null);
  const activeQ = lockedQuestion || weakQuestions[currentIndex] || weakQuestions[0] || null;

  const handleAnswer = (isCorrect: boolean, elapsedMs: number) => {
    if (!activeQ) return;
    setLockedQuestion(activeQ);
    setLastCorrect(isCorrect);
    if (isCorrect) {
      const nextSt = drillStreak + 1;
      setDrillStreak(nextSt);
      sfx.correct(nextSt);
    } else {
      setDrillStreak(0);
      sfx.wrong();
    }
    onRecordAnswer(activeQ.id, isCorrect, elapsedMs);
    setPhase('feedback');
  };

  const handleNext = () => {
    setLockedQuestion(null);
    setPhase('question');
    setCurrentIndex((prev) => (weakQuestions.length > 0 ? (prev + 1) % weakQuestions.length : 0));
  };

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-3 safe-bottom">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-amber-400" />
          <div>
            <h2 className="text-base font-black text-white">Weak-Spot FSRS Drill</h2>
            <p className="text-xs text-slate-400">
              Missed & bookmarked scenarios ({weakQuestions.length} in queue)
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            sfx.tap();
            onClose();
          }}
          className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Track Filter */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {(['az-900', 'az-104', 'all'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setFilterTrack(t);
                setLockedQuestion(null);
                setPhase('question');
                setCurrentIndex(0);
              }}
              className={`rounded-lg border px-3 py-1.5 text-xs font-bold uppercase transition ${
                filterTrack === t
                  ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                  : 'border-slate-800 bg-slate-950 text-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {drillStreak > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300">
            <Flame className="h-3.5 w-3.5" /> Streak x{drillStreak}
          </span>
        )}
      </div>

      {!activeQ ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/35 bg-slate-950 p-6 text-center">
          <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-emerald-400" />
          <h3 className="text-base font-extrabold text-white">Zero Weak Spots Remaining!</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            Any question you miss or bookmark during Roguelike climbs or Mock Exams automatically lands here until you nail it consecutively.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-extrabold text-slate-950"
          >
            Back to Hub
          </button>
        </div>
      ) : phase === 'question' ? (
        <QuestionCardView
          question={activeQ}
          hintCharges={99}
          isFlagged={Boolean(mastery[activeQ.id]?.flagged)}
          onToggleFlag={() => onToggleFlag(activeQ.id)}
          onSubmitAnswer={handleAnswer}
        />
      ) : (
        <FeedbackDrawer
          question={activeQ}
          isCorrect={lastCorrect}
          streak={drillStreak}
          isFlagged={Boolean(mastery[activeQ.id]?.flagged)}
          onToggleFlag={() => onToggleFlag(activeQ.id)}
          continueLabel="Next Weak-Spot Card →"
          onContinue={handleNext}
        />
      )}
    </div>
  );
};
