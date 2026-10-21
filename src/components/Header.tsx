import React from 'react';
import { Download, Plus, Calendar, Users, MapPin, ShieldCheck } from 'lucide-react';
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
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white shadow-warm-md">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c0 4.5-4 7-4 11a5 5 0 0 0 10 0c0-4-4-6.5-4-11z" fill="currentColor" fillOpacity="0.25"/>
                <path d="M12 10c0 2-2 3.5-2 5a2 2 0 0 0 4 0c0-1.5-2-3-2-5z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-700 via-amber-700 to-orange-800 bg-clip-text text-transparent font-festive">
                  Utsav
                </h1>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  Event Command Center
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                Celebration and Event Planning Platform
              </p>
            </div>
          </div>

          {/* Active Event Summary Badge */}
          {state && (
            <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50/90 border border-orange-200/80 text-xs text-stone-800 shadow-sm">
              <div className="font-bold text-orange-950 max-w-[150px] truncate">
                {state.intake.eventName}
              </div>
              <div className="h-3.5 w-px bg-orange-200" />
              <div className="flex items-center gap-1 text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                <span>{state.intake.eventDate}</span>
              </div>
              <div className="h-3.5 w-px bg-orange-200" />
              <div className="flex items-center gap-1 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span className="max-w-[90px] truncate">{state.intake.city}</span>
              </div>
              <div className="h-3.5 w-px bg-orange-200" />
              <div className="flex items-center gap-1 font-semibold text-stone-800">
                <Users className="w-3.5 h-3.5 text-orange-600" />
                <span>{state.intake.guestCount} Guests</span>
              </div>
              <div className="h-3.5 w-px bg-orange-200" />
              <div className="flex items-center gap-1 font-extrabold text-orange-800">
                <span>₹{state.intake.totalBudgetINR.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {state && (
              <>
                <button
                  type="button"
                  id="btn-export-plan-json"
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 transition shadow-sm active:scale-95"
                  title="Export full event state as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Export Plan</span>
                </button>
                <button
                  type="button"
                  id="btn-reset-new-event"
                  onClick={onReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-warm-sm transition active:scale-95 border border-orange-400"
                  title="Create a new celebration plan"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>New Event</span>
                </button>
              </>
            )}
            {!state && (
              <div className="flex items-center gap-1.5 text-xs text-orange-900 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span className="font-semibold">Celebration Safeguards Ready</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
