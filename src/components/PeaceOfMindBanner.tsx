import React, { useState } from 'react';
import {
  ShieldCheck,
  UtensilsCrossed,
  CloudRain,
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart
} from 'lucide-react';
import { PeaceOfMindShield, EventIntake } from '../types/utsav';

interface PeaceOfMindBannerProps {
  peaceOfMind: PeaceOfMindShield;
  intake: EventIntake;
}

export const PeaceOfMindBanner: React.FC<PeaceOfMindBannerProps> = ({
  peaceOfMind,
  intake
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="w-full mb-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white shadow-warm-lg border border-emerald-500/30 overflow-hidden transition-all animate-fade-in">
      <div className="px-6 py-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Shield Header & Calm Reassurance */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-emerald-glow shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                  Utsav Peace-of-Mind Shield Active
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-200/80">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  Zero Host Anxiety
                </span>
              </div>
              <p className="text-sm text-emerald-100 font-medium mt-1 max-w-2xl leading-relaxed">
                {peaceOfMind.calmReassuranceNote}
              </p>
            </div>
          </div>

          {/* Quick Quantitative Buffer Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            {/* 10% Cushion */}
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                10% Comfort Cushion
              </div>
              <div className="text-base font-extrabold text-white">
                ₹{peaceOfMind.comfortCushionINR.toLocaleString('en-IN')}
              </div>
            </div>

            {/* +10% Extra Plate Buffer */}
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                +10% Plate Buffer
              </div>
              <div className="text-base font-extrabold text-white">
                {peaceOfMind.extraPlateBufferCount} <span className="text-xs font-normal text-emerald-200">Plates</span>
              </div>
            </div>

            {/* Expand / Details Toggle */}
            <button
              type="button"
              id="btn-toggle-peace-shield-details"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-emerald-200 transition"
              title="Toggle safeguard verifications"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Safeguard Contingencies */}
        {isExpanded && (
          <div className="mt-5 pt-4 border-t border-emerald-700/50 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-emerald-100 animate-slide-up">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-800/40 border border-emerald-700/40">
              <CloudRain className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white mb-0.5">Weather Safeguard</div>
                <div className="text-emerald-200/90 leading-relaxed">
                  {peaceOfMind.weatherAndPowerSafeguard}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-800/40 border border-emerald-700/40">
              <Zap className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white mb-0.5">Power & Acoustic Continuity</div>
                <div className="text-emerald-200/90 leading-relaxed">
                  100% DG generator load testing locked at T-7 days; sound permits validated for {intake.city}.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-800/40 border border-emerald-700/40">
              <UtensilsCrossed className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white mb-0.5">Catering Reserve Guarantee</div>
                <div className="text-emerald-200/90 leading-relaxed">
                  Caterer contracted for {peaceOfMind.extraPlateBufferCount} plates for {intake.guestCount} expected guests. No guest ever turned away hungry.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
