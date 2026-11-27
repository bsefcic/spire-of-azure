import React, { useEffect, useMemo, useState } from 'react';
import { Award, CheckCircle2, Clock, Flag, Trophy, X, XCircle } from 'lucide-react';
import { ExamQuestion, ExamTrack } from '../types/curriculum';
import { MockExamAttempt } from '../types/game';
import { buildMockExamQuestions, DOMAIN_META } from '../engine/fsrs';
import { QuestionCardView } from './QuestionCardView';
import { sfx } from '../utils/audioHaptics';

interface MockExamScreenProps {
  questionPool: ExamQuestion[];
  track: ExamTrack;
  pastAttempts: MockExamAttempt[];
  onCompleteAttempt: (
    attempt: MockExamAttempt,
    perQuestionResults: { questionId: string; isCorrect: boolean }[]
  ) => void;
  onClose: () => void;
}

export const MockExamScreen: React.FC<MockExamScreenProps> = ({
  questionPool,
  track,
  pastAttempts,
  onCompleteAttempt,
  onClose
}) => {
  const [selectedTrack, setSelectedTrack] = useState<ExamTrack>(track);
  const [stage, setStage] = useState<'intro' | 'active' | 'results'>('intro');
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [resultsByIdx, setResultsByIdx] = useState<Record<number, boolean>>({});
  const [flaggedIdx, setFlaggedIdx] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [startedAtSec, setStartedAtSec] = useState(0);
  const [finishedAttempt, setFinishedAttempt] = useState<MockExamAttempt | null>(null);

  const totalMinutes = selectedTrack === 'az-900' ? 45 : selectedTrack === 'aipc' ? 50 : 65;
  const totalQuestionTarget = selectedTrack === 'az-900' ? 40 : selectedTrack === 'aipc' ? 45 : 50;

  useEffect(() => {
    if (stage !== 'active') return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === 'active' && secondsLeft === 0) {
      gradeExam(resultsByIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, stage]);

  const startMock = () => {
    sfx.tap();
    const qs = buildMockExamQuestions(questionPool, selectedTrack);
    setExamQuestions(qs);
    setCurrentIdx(0);
    setResultsByIdx({});
    setFlaggedIdx({});
    setSecondsLeft(totalMinutes * 60);
    setStartedAtSec(Math.floor(Date.now() / 1000));
    setStage('active');
  };

  const gradeExam = (finalMap: Record<number, boolean>) => {
    const total = examQuestions.length;
    let correctCount = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};
    const perQuestionResults: { questionId: string; isCorrect: boolean }[] = [];

    examQuestions.forEach((q, idx) => {
      const ok = Boolean(finalMap[idx]);
      if (ok) correctCount += 1;
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { correct: 0, total: 0 };
      }
      domainScores[q.domain].total += 1;
      if (ok) domainScores[q.domain].correct += 1;
      perQuestionResults.push({ questionId: q.id, isCorrect: ok });
    });

    const scaledScore = total > 0 ? Math.round((correctCount / total) * 1000) : 0;
    const passed = scaledScore >= 700;
    if (passed) sfx.victory();
    else sfx.wrong();

    const attempt: MockExamAttempt = {
      id: `mock-${Date.now()}`,
      track: selectedTrack,
      completedAt: Date.now(),
      scaledScore,
      passed,
      correctCount,
      totalCount: total,
      durationSec: Math.max(1, Math.floor(Date.now() / 1000) - startedAtSec),
      domainScores
    };

    setFinishedAttempt(attempt);
    setStage('results');
    onCompleteAttempt(attempt, perQuestionResults);
  };

  const handleQuestionSubmit = (isCorrect: boolean) => {
    sfx.tap();
    const updated = { ...resultsByIdx, [currentIdx]: isCorrect };
    setResultsByIdx(updated);

    if (currentIdx < examQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      gradeExam(updated);
    }
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const trackHistory = useMemo(
    () => pastAttempts.filter((a) => a.track === selectedTrack).slice().reverse(),
    [pastAttempts, selectedTrack]
  );

  if (stage === 'intro') {
    return (
      <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-3 safe-bottom">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">700/1000 Exam Simulator</h2>
            <p className="text-xs text-slate-400">Pearson VUE-style timed readiness check</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {(['az-900', 'az-104', 'aipc'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTrack(t)}
              className={`rounded-2xl border p-2.5 text-left transition ${
                selectedTrack === t
                  ? 'border-sky-400 bg-sky-500/15 text-white'
                  : 'border-slate-800 bg-slate-950 text-slate-400'
              }`}
            >
              <div className="text-xs font-black uppercase">
                {t === 'aipc' ? 'AI PM (AIPC)' : t}
              </div>
              <div className="text-[10px]">
                {t === 'az-900'
                  ? '40 Qs • 45 Min'
                  : t === 'aipc'
                    ? '45 Qs • 50 Min'
                    : '50 Qs • 65 Min'}
              </div>
            </button>
          ))}
        </div>

        <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs leading-relaxed text-slate-300">
          <ul className="space-y-1.5">
            <li>
              • Weighted across official{' '}
              {selectedTrack === 'aipc'
                ? 'Product School AIPC™ 6 modules'
                : 'Microsoft Learn exam domains'}
              .
            </li>
            <li>• Passing score: <strong className="text-emerald-400">700 / 1000 (70%)</strong>.</li>
            <li>
              • No feedback during the test—full{' '}
              {selectedTrack === 'aipc' ? 'Classic PM vs. AI PM' : 'AWS Bridge'} review unlocked at submission.
            </li>
            <li>• Any missed questions automatically feed into your FSRS Weak-Spot Drill queue!</li>
          </ul>
          <button
            type="button"
            onClick={startMock}
            className="mt-4 w-full rounded-xl bg-sky-500 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-sky-500/20"
          >
            Start Timed {selectedTrack.toUpperCase()} Exam ({totalQuestionTarget} Qs) →
          </button>
        </div>

        {trackHistory.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Previous {selectedTrack.toUpperCase()} Attempts
            </h3>
            {trackHistory.slice(0, 5).map((att) => (
              <div
                key={att.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs"
              >
                <div>
                  <span
                    className={`font-black ${
                      att.passed ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {att.scaledScore} / 1000 ({att.passed ? 'PASS' : 'RETRY'})
                  </span>
                  <div className="text-[11px] text-slate-500">
                    {att.correctCount}/{att.totalCount} correct •{' '}
                    {new Date(att.completedAt).toLocaleDateString()}
                  </div>
                </div>
                {att.passed && <Trophy className="h-4 w-4 text-amber-400" />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (stage === 'active') {
    const q = examQuestions[currentIdx];
    const answeredCount = Object.keys(resultsByIdx).length;
    return (
      <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-2.5 safe-bottom">
        {/* Exam Top Bar */}
        <div className="mb-2.5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs">
          <span className="font-extrabold text-white">
            Q {currentIdx + 1} / {examQuestions.length}
          </span>
          <span
            className={`flex items-center gap-1 font-mono font-bold ${
              secondsLeft < 300 ? 'text-rose-400' : 'text-sky-300'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setFlaggedIdx((p) => ({ ...p, [currentIdx]: !p[currentIdx] }))
              }
              className={`rounded-lg border px-2 py-1 ${
                flaggedIdx[currentIdx]
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border-slate-800 text-slate-400'
              }`}
            >
              <Flag className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => gradeExam(resultsByIdx)}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 font-bold text-emerald-300"
            >
              Finish ({answeredCount})
            </button>
          </div>
        </div>

        {/* Mini Question Strip */}
        <div className="no-scrollbar mb-2.5 flex gap-1 overflow-x-auto pb-1">
          {examQuestions.map((_, idx) => {
            const done = idx in resultsByIdx;
            const cur = idx === currentIdx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`h-6 w-6 shrink-0 rounded-md border text-[10px] font-bold ${
                  cur
                    ? 'border-sky-400 bg-sky-500 text-slate-950'
                    : flaggedIdx[idx]
                      ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                      : done
                        ? 'border-slate-700 bg-slate-800 text-slate-200'
                        : 'border-slate-900 bg-slate-950 text-slate-500'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {q && (
          <QuestionCardView
            key={`${q.id}-${currentIdx}`}
            question={q}
            onSubmitAnswer={(isCorrect) => handleQuestionSubmit(isCorrect)}
          />
        )}
      </div>
    );
  }

  // RESULTS SCREEN
  if (!finishedAttempt) return null;
  const missedQuestions = examQuestions.filter((_, idx) => !resultsByIdx[idx]);

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-4 safe-bottom">
      <div
        className={`mb-4 rounded-2xl border p-4 text-center ${
          finishedAttempt.passed
            ? 'border-emerald-500/45 bg-emerald-950/20'
            : 'border-rose-500/45 bg-rose-950/20'
        }`}
      >
        {finishedAttempt.passed ? (
          <Award className="mx-auto mb-1.5 h-10 w-10 text-emerald-400" />
        ) : (
          <XCircle className="mx-auto mb-1.5 h-10 w-10 text-rose-400" />
        )}
        <div className="text-3xl font-black text-white">
          {finishedAttempt.scaledScore}{' '}
          <span className="text-sm font-semibold text-slate-400">/ 1000</span>
        </div>
        <div
          className={`text-sm font-extrabold ${
            finishedAttempt.passed ? 'text-emerald-300' : 'text-rose-300'
          }`}
        >
          {finishedAttempt.passed
            ? `CERTIFICATION READY! (Pass Bar: 700)`
            : `BELOW 700 PASS BAR — MISSED QUESTIONS QUEUED FOR DRILL`}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          {finishedAttempt.correctCount} of {finishedAttempt.totalCount} correct
        </p>
      </div>

      {/* Domain Score Bars */}
      <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          Domain Breakdown
        </h3>
        <div className="space-y-2.5">
          {Object.entries(finishedAttempt.domainScores).map(([domId, stat]) => {
            const meta = DOMAIN_META.find((d) => d.id === domId);
            const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
            return (
              <div key={domId}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">
                    {meta ? meta.shortName : domId}
                  </span>
                  <span className={pct >= 70 ? 'font-bold text-emerald-400' : 'font-bold text-rose-400'}>
                    {stat.correct}/{stat.total} ({pct}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-900">
                  <div
                    className={`h-full ${pct >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Missed Questions Review */}
      {missedQuestions.length > 0 && (
        <div className="mb-4 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
            Missed Scenarios & {selectedTrack === 'aipc' ? 'AI PM' : 'AWS SAA'} Breakdown ({missedQuestions.length})
          </h3>
          {missedQuestions.map((mq) => (
            <div
              key={mq.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3 text-xs"
            >
              <p className="mb-2 font-bold text-white">{mq.prompt}</p>
              <p className="mb-1.5 text-slate-300">
                <strong className="text-emerald-400">Explanation: </strong>
                {mq.explanation}
              </p>
              <p className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-2 text-amber-200">
                <strong className="text-amber-400">
                  {mq.track === 'aipc' ? 'Classic vs. AI PM Shift: ' : 'AWS Bridge: '}
                </strong>
                {mq.awsComparison}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-xl bg-sky-500 py-3 text-sm font-extrabold text-slate-950"
      >
        Done & Return to Hub
      </button>
    </div>
  );
};
