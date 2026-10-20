import React from 'react';
import { Sparkles, Download, RotateCcw, Calendar, Users, MapPin, ShieldCheck } from 'lucide-react';
import { UtsavEventState } from '../types/utsav';

interface HeaderProps {
  state: UtsavEventState | null;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ state, onReset }) => {
  const handleExportJSON = () => {
    if (!state) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const sanitizedName = state.intake.eventName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadAnchor.setAttribute('download', `utsav-${sanitizedName}-plan.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/70 shadow-warm-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 text-white shadow-warm-md">
              <span className="text-2xl select-none" role="img" aria-label="Utsav Diya">🪔</span>
              <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-800 via-rose-800 to-amber-900 bg-clip-text text-transparent font-festive">
                  Utsav
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  GenAI 2.5
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                Reactive Indian Celebration & Event Command Center
              </p>
            </div>
          </div>

          {/* Active Event Summary Badge (if event generated) */}
          {state && (
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 shadow-sm">
              <div className="font-semibold text-stone-800 max-w-[160px] truncate">
                {state.intake.eventName}
              </div>
              <div className="h-4 w-px bg-amber-200" />
              <div className="flex items-center gap-1 text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{state.intake.eventDate}</span>
              </div>
              <div className="h-4 w-px bg-amber-200" />
              <div className="flex items-center gap-1 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span className="max-w-[100px] truncate">{state.intake.city}</span>
              </div>
              <div className="h-4 w-px bg-amber-200" />
              <div className="flex items-center gap-1 text-stone-600">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>{state.intake.guestCount} Guests</span>
              </div>
              <div className="h-4 w-px bg-amber-200" />
              <div className="flex items-center gap-1 font-bold text-amber-900">
                <span>₹{state.intake.totalBudgetINR.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {state && (
              <>
                <button
                  type="button"
                  id="btn-export-plan-json"
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition shadow-sm active:scale-95"
                  title="Export full event state as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Export JSON</span>
                </button>
                <button
                  type="button"
                  id="btn-reset-new-event"
                  onClick={onReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition shadow-sm active:scale-95"
                  title="Start a new event plan"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                  <span>New Event</span>
                </button>
              </>
            )}
            {!state && (
              <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">10% Peace-of-Mind Cushion Protected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
