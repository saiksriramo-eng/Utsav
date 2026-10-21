import React, { useState } from 'react';
import {
  Utensils,
  Palette,
  Copy,
  Check,
  Sparkles,
  ChefHat,
  Coffee,
  GlassWater,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { FeastMenu, ThemeConcept, RegionalVibeId } from '../types/utsav';
import { REGIONAL_VIBES } from '../constants/regionalVibes';

interface FeastAndThemeStudioProps {
  feastMenu: FeastMenu;
  themeConcepts: ThemeConcept[];
  selectedThemeIndex: number;
  activeRegionalVibe: RegionalVibeId;
  onSelectTheme: (index: number) => void;
  onChangeRegionalVibe: (vibeId: RegionalVibeId) => void;
}

export const FeastAndThemeStudio: React.FC<FeastAndThemeStudioProps> = ({
  feastMenu,
  themeConcepts,
  selectedThemeIndex,
  activeRegionalVibe,
  onSelectTheme,
  onChangeRegionalVibe
}) => {
  const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);

  const handleCopyInvite = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInviteId(id);
    setTimeout(() => {
      setCopiedInviteId(null);
    }, 2500);
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: Regional Feast & Culinary Studio */}
      <div className="bg-white/95 rounded-3xl border border-amber-200/90 shadow-warm-md p-6 sm:p-8">
        {/* Header & Regional Palate Switcher Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <ChefHat className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-extrabold text-stone-900 font-festive">
                {feastMenu.regionalTitle}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Culturally anchored banquet menu scaled to per-plate mathematics with +10% peace-of-mind buffer.
            </p>
          </div>

          {/* Quick Palate Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(REGIONAL_VIBES) as RegionalVibeId[]).map((vibeKey) => {
              const vibe = REGIONAL_VIBES[vibeKey];
              const isActive = activeRegionalVibe === vibeKey;
              return (
                <button
                  key={vibeKey}
                  type="button"
                  id={`btn-switch-vibe-${vibeKey}`}
                  onClick={() => onChangeRegionalVibe(vibeKey)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-warm-sm scale-105'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{vibe.badgeEmoji}</span>
                  <span>{vibe.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Per-Plate KPI & Quantity Brief Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-rose-500/10 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500 text-white shadow-sm">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Calculated Per-Plate Budget
              </div>
              <div className="text-xl font-extrabold text-stone-900">
                ₹{feastMenu.perPlateBudgetINR.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-stone-500">/ plate</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-600 max-w-md bg-white/80 p-3 rounded-xl border border-amber-200/60">
            <strong>Caterer Quantity Brief:</strong> {feastMenu.catererQuantityBrief}
          </div>
        </div>

        {/* Categorized Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Welcome Drinks */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60">
            <div className="flex items-center gap-2 mb-3 text-amber-900 font-bold text-sm">
              <GlassWater className="w-4 h-4 text-amber-600" />
              <span>Welcome Drinks & Refreshers</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {feastMenu.welcomeDrinks.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Starters & Live Counters */}
          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60">
            <div className="flex items-center gap-2 mb-3 text-rose-900 font-bold text-sm">
              <Flame className="w-4 h-4 text-rose-600" />
              <span>Starters & Live Interactive Counters</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {feastMenu.startersAndLiveCounters.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Course Specialties */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60">
            <div className="flex items-center gap-2 mb-3 text-emerald-900 font-bold text-sm">
              <Utensils className="w-4 h-4 text-emerald-600" />
              <span>Main Course Curated Specialties</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {feastMenu.mainCourseSpecialties.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Breads & Rice */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2 mb-3 text-stone-800 font-bold text-sm">
              <ChefHat className="w-4 h-4 text-amber-700" />
              <span>Breads, Rice & Tandoors</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {feastMenu.breadsAndRice.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desserts & Sweet Endings */}
          <div className="p-4 rounded-2xl bg-fuchsia-50/40 border border-fuchsia-200/60 md:col-span-2">
            <div className="flex items-center gap-2 mb-3 text-fuchsia-900 font-bold text-sm">
              <Coffee className="w-4 h-4 text-fuchsia-600" />
              <span>Desserts, Mithai & Traditional Hot Brews</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {feastMenu.desserts.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 3 Theme Concepts with Live CSS Hex Color Swatches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-extrabold text-stone-900 font-festive flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-600" />
              3 Curated Theme Concepts & Visual Palettes
            </h3>
            <p className="text-xs text-stone-500">
              Each concept includes 4 live CSS hex swatches, decor focal points, games, and copyable digital invites.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Selected: Concept {selectedThemeIndex + 1}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {themeConcepts.map((theme, idx) => {
            const isSelected = selectedThemeIndex === idx;
            const isCopied = copiedInviteId === theme.id;

            return (
              <div
                key={theme.id}
                onClick={() => onSelectTheme(idx)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-warm-lg ring-2 ring-amber-400'
                    : 'bg-white/80 hover:bg-white border-stone-200 hover:shadow-warm-sm'
                }`}
              >
                <div>
                  {/* Theme Header & Selection Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Concept {idx + 1}
                      </span>
                      <h4 className="text-base font-extrabold text-stone-900 mt-1 font-festive">
                        {theme.themeName}
                      </h4>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                        isSelected
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    {theme.vibeDescription}
                  </p>

                  {/* 4 Live CSS Hex Color Swatches */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                      Color Palette Swatches
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {theme.colorPaletteHex.map((hex, hexIdx) => (
                        <div key={hexIdx} className="group relative">
                          <div
                            className="w-full h-9 rounded-xl border border-stone-200/80 shadow-xs transition group-hover:scale-105"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                          <div className="text-[10px] text-center font-mono text-stone-500 mt-1 truncate">
                            {hex}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decor Focal Points */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                      Decor Focal Points
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {theme.decorFocalPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Guest Engagement Games / Activities */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                      Interactive Guest Activities
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {theme.engagementActivities.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 1-Click Copyable Digital Invite Box */}
                <div className="mt-4 pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Digital Invitation Message
                    </span>
                    <button
                      type="button"
                      id={`btn-copy-invite-${idx}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyInvite(theme.digitalInviteCopy, theme.id);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Invite</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 italic leading-relaxed line-clamp-3">
                    "{theme.digitalInviteCopy}"
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
