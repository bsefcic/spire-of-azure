import React, { useState } from 'react';
import { Check, Copy, Download, Upload, Volume2, VolumeX, WifiOff, X } from 'lucide-react';
import { PlayerSaveProfile } from '../types/game';
import { exportProfileToJson, importProfileFromJson } from '../utils/storage';
import { sfx } from '../utils/audioHaptics';

interface SaveBackupModalProps {
  profile: PlayerSaveProfile;
  onUpdateProfile: (next: PlayerSaveProfile) => void;
  onClose: () => void;
}

export const SaveBackupModal: React.FC<SaveBackupModalProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [importText, setImportText] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportProfileToJson(profile));
      setCopied(true);
      sfx.tap();
      setStatusMsg('Copied full save JSON to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatusMsg('Clipboard blocked — use Download Save File below.');
    }
  };

  const handleDownloadFile = () => {
    sfx.tap();
    const blob = new Blob([exportProfileToJson(profile)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spire-of-azure-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg('Downloaded backup .json file to your device!');
  };

  const handleImport = () => {
    try {
      const restored = importProfileFromJson(importText);
      onUpdateProfile(restored);
      sfx.victory();
      setStatusMsg('Save restored successfully! All FSRS mastery & unlocks loaded.');
      setImportText('');
    } catch (err) {
      sfx.wrong();
      setStatusMsg(err instanceof Error ? err.message : 'Invalid JSON backup.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const restored = importProfileFromJson(String(reader.result || ''));
        onUpdateProfile(restored);
        sfx.victory();
        setStatusMsg('Backup file imported cleanly!');
      } catch {
        sfx.wrong();
        setStatusMsg('Could not parse uploaded JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-3 safe-bottom">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white">Airplane Settings & Save Backup</h2>
          <p className="text-xs text-slate-400">Offline IndexedDB + Guangzhou Expansion Ready</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Offline Status Card */}
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-emerald-500/35 bg-emerald-950/20 p-3.5">
        <WifiOff className="h-6 w-6 shrink-0 text-emerald-400" />
        <div className="text-xs text-slate-200">
          <div className="font-extrabold text-emerald-300">100% Airplane-Mode Ready</div>
          All question packs, Rosetta Codex tables, synth audio, and FSRS history live locally on your S26+.
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-4 space-y-2.5 rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Cabin Preferences
        </h3>

        <button
          type="button"
          onClick={() =>
            onUpdateProfile({ ...profile, soundMuted: !profile.soundMuted })
          }
          className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs font-bold text-white"
        >
          <span className="flex items-center gap-2">
            {profile.soundMuted ? (
              <VolumeX className="h-4 w-4 text-rose-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-sky-400" />
            )}
            Synth Sound Effects
          </span>
          <span className={profile.soundMuted ? 'text-rose-400' : 'text-emerald-400'}>
            {profile.soundMuted ? 'MUTED' : 'ON'}
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdateProfile({
              ...profile,
              autoShowExplanationOnCorrect: !profile.autoShowExplanationOnCorrect
            })
          }
          className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs font-bold text-white"
        >
          <span>Show AWS Breakdown on Correct Answers Too</span>
          <span
            className={
              profile.autoShowExplanationOnCorrect ? 'text-emerald-400' : 'text-slate-400'
            }
          >
            {profile.autoShowExplanationOnCorrect ? 'ALWAYS SHOW' : 'FAST SKIP'}
          </span>
        </button>
      </div>

      {/* Export / Import */}
      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
          1-Tap JSON Save Export & Restore
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDownloadFile}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 py-2.5 text-xs font-black text-slate-950"
          >
            <Download className="h-4 w-4" /> Download .JSON
          </button>
          <button
            type="button"
            onClick={handleCopyJson}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-xs font-bold text-white"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
        </div>

        <div>
          <label className="mb-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 py-2.5 text-xs font-bold text-slate-300 hover:border-sky-400">
            <Upload className="h-4 w-4 text-sky-400" />
            <span>Import from .JSON File</span>
            <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="space-y-2">
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={3}
            placeholder="Or paste exported JSON save string here..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-slate-200 placeholder-slate-500"
          />
          {importText.trim().length > 0 && (
            <button
              type="button"
              onClick={handleImport}
              className="w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-black text-slate-950"
            >
              Restore Pasted Save
            </button>
          )}
        </div>

        {statusMsg && (
          <div className="rounded-xl border border-sky-500/30 bg-sky-950/30 p-2.5 text-xs text-sky-200">
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
};
