import React, { useMemo, useState } from 'react';
import { BookOpen, Layers, Search, Table, X } from 'lucide-react';
import { ActIntelBriefing, CheatSheetTable, RosettaServiceRow } from '../types/curriculum';
import { sfx } from '../utils/audioHaptics';

interface BriefingsAndCodexModalProps {
  rosettaRows: RosettaServiceRow[];
  cheatSheets: CheatSheetTable[];
  briefings: ActIntelBriefing[];
  onClose: () => void;
}

export const BriefingsAndCodexModal: React.FC<BriefingsAndCodexModalProps> = ({
  rosettaRows,
  cheatSheets,
  briefings,
  onClose
}) => {
  const [tab, setTab] = useState<'rosetta' | 'matrices' | 'briefings'>('rosetta');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [selectedBriefingId, setSelectedBriefingId] = useState<string>(briefings[0]?.id || '');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(rosettaRows.map((r) => r.category)));
    return ['All', ...cats];
  }, [rosettaRows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rosettaRows.filter((row) => {
      if (category !== 'All' && row.category !== category) return false;
      if (!q) return true;
      return (
        row.awsService.toLowerCase().includes(q) ||
        row.azureService.toLowerCase().includes(q) ||
        row.architectGotcha.toLowerCase().includes(q) ||
        row.category.toLowerCase().includes(q)
      );
    });
  }, [rosettaRows, category, search]);

  const activeBriefing = briefings.find((b) => b.id === selectedBriefingId) || briefings[0];

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-black px-3.5 py-3 safe-bottom">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white">AWS ↔ Azure Rosetta Codex</h2>
          <p className="text-xs text-slate-400">100% Offline Reference, Matrices & Field Guides</p>
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

      {/* Tab Switcher */}
      <div className="mb-3 grid grid-cols-3 gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1">
        <button
          type="button"
          onClick={() => {
            sfx.tap();
            setTab('rosetta');
          }}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
            tab === 'rosetta' ? 'bg-sky-500 text-slate-950' : 'text-slate-300'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>AWS Map</span>
        </button>
        <button
          type="button"
          onClick={() => {
            sfx.tap();
            setTab('matrices');
          }}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
            tab === 'matrices' ? 'bg-sky-500 text-slate-950' : 'text-slate-300'
          }`}
        >
          <Table className="h-3.5 w-3.5" />
          <span>Cheat Sheets</span>
        </button>
        <button
          type="button"
          onClick={() => {
            sfx.tap();
            setTab('briefings');
          }}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
            tab === 'briefings' ? 'bg-sky-500 text-slate-950' : 'text-slate-300'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Act Guides</span>
        </button>
      </div>

      {/* TAB 1: SEARCHABLE AWS <-> AZURE ROSETTA STONE */}
      {tab === 'rosetta' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ECS, DynamoDB, S3, VPC, Entra, Bicep..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pr-3 pl-9 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                  category === cat
                    ? 'border-sky-400 bg-sky-500/20 text-sky-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2 pb-6">
            {filteredRows.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-3"
              >
                <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>{row.category}</span>
                  <span className="rounded bg-slate-900 px-1.5 py-0.5 text-sky-400">
                    {row.examTrack}
                  </span>
                </div>
                <div className="mb-1.5 grid grid-cols-2 gap-2 rounded-xl border border-slate-800/80 bg-slate-900/70 p-2 text-xs">
                  <div>
                    <div className="text-[10px] font-bold text-amber-400">AWS SAA</div>
                    <div className="font-bold text-amber-100">{row.awsService}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-sky-400">Microsoft Azure</div>
                    <div className="font-extrabold text-sky-200">{row.azureService}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  <strong className="text-emerald-400">Gotcha: </strong>
                  {row.architectGotcha}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EXAM CHEAT-SHEET MATRICES */}
      {tab === 'matrices' && (
        <div className="space-y-4 pb-6">
          {cheatSheets.map((sheet) => (
            <div
              key={sheet.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5"
            >
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white">{sheet.title}</h3>
                <span className="rounded bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                  {sheet.track}
                </span>
              </div>
              <p className="mb-2.5 text-xs text-slate-400">{sheet.subtitle}</p>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-900 text-sky-300">
                    <tr>
                      {sheet.headers.map((h, idx) => (
                        <th key={idx} className="px-2.5 py-2 font-bold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950">
                    {sheet.rows.map((r, rIdx) => (
                      <tr key={rIdx}>
                        {r.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-2.5 py-2 ${
                              cIdx === 0 ? 'font-bold text-white' : 'text-slate-300'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-2.5 rounded-xl border border-amber-500/30 bg-amber-950/20 px-2.5 py-2 text-xs text-amber-200">
                <strong className="text-amber-400">Exam Pro-Tip: </strong>
                {sheet.proTip}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ALL 8 ACT INTEL BRIEFINGS */}
      {tab === 'briefings' && (
        <div className="space-y-3 pb-6">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
            {briefings.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBriefingId(b.id)}
                className={`shrink-0 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                  activeBriefing?.id === b.id
                    ? 'border-sky-400 bg-sky-500/20 text-sky-200'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                {b.track.toUpperCase()} • Act {b.act}
              </button>
            ))}
          </div>

          {activeBriefing && (
            <div className="space-y-2.5">
              <div className="rounded-2xl border border-sky-500/35 bg-sky-950/20 p-3">
                <div className="text-[11px] font-bold text-sky-400">{activeBriefing.examWeight}</div>
                <h3 className="text-base font-extrabold text-white">{activeBriefing.title}</h3>
                <p className="text-xs text-slate-300">{activeBriefing.subtitle}</p>
              </div>
              {activeBriefing.cards.map((c, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-3"
                >
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-1">
                    <span className="text-sm font-extrabold text-sky-300">{c.title}</span>
                    <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      AWS: {c.awsEquivalent}
                    </span>
                  </div>
                  <p className="mb-2 text-xs text-slate-200">{c.azureConcept}</p>
                  <ul className="mb-2 space-y-1 text-xs text-slate-300">
                    {c.keyFacts.map((kf, kIdx) => (
                      <li key={kIdx}>• {kf}</li>
                    ))}
                  </ul>
                  <div className="rounded-lg border border-rose-500/30 bg-rose-950/25 px-2.5 py-1.5 text-[11px] text-rose-200">
                    <strong className="text-rose-400">Exam Trap: </strong>
                    {c.examTrap}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
