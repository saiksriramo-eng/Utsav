import React, { useState } from 'react';
import {
  FileText,
  UtensilsCrossed,
  Palette,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { UtsavEventState } from '../types/utsav';

interface DetailsViewProps {
  state: UtsavEventState | null;
  onSelectTheme?: (index: number) => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({
  state,
  onSelectTheme,
}) => {
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    theme: true,
    feast: true,
    invite: true,
    specs: true,
  });

  const toggle = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const currentTheme =
    state?.themeConcepts?.[state.selectedThemeIndex || 0] || {
      themeName: 'Marigold & Heritage Luxe',
      vibeDescription: 'Warm golden hues, brass urlis with floating candles and rich velvet drapes.',
      colorPaletteHex: ['#D96B52', '#4A7B76', '#2C3844', '#E59852'],
      decorFocalPoints: ['Grand floral entrance arch', 'Brass urli cluster', 'Candlelit dining tables'],
      engagementActivities: ['Live acoustic saxophone', 'Interactive perfume bar', 'Polaroid guestbook wall'],
      digitalInviteCopy: 'Join us to celebrate the union of Kristina & Steven. An evening of music, love, and joyous festivities awaits!',
    };

  const feast = state?.feastMenu;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(currentTheme.digitalInviteCopy || '');
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  return (
    <div className="pb-24 lg:pb-12">
      {/* Header */}
      <div className="px-1 mb-4">
        <h2 className="font-sans font-bold text-[18px] lg:text-[20px] text-charcoal">
          Event Specifications & Style
        </h2>
        <p className="text-[12px] text-charcoal-muted">
          Design themes, regional feast menu and digital assets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN (lg:col-span-7): THEME & REGIONAL FEAST CATERING
           ========================================================================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* THEME & COLOR PALETTE STUDIO */}
          <div className="rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden">
            <div
              onClick={() => toggle('theme')}
              className="bg-slateNavy text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-white" />
                <span className="font-sans font-medium text-[15px]">
                  Theme & Aesthetic Palette
                </span>
              </div>
              {openSections.theme ? (
                <ChevronUp className="w-4 h-4 text-white/80" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/80" />
              )}
            </div>

            {openSections.theme && (
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <span className="text-[11px] font-semibold text-charcoal-muted uppercase">
                    Active Concept
                  </span>
                  <h4 className="font-display font-semibold text-[18px] text-charcoal mt-0.5">
                    {currentTheme.themeName}
                  </h4>
                  <p className="text-[12px] text-charcoal-muted mt-1 leading-relaxed">
                    {currentTheme.vibeDescription}
                  </p>
                </div>

                {/* Color Swatches */}
                <div>
                  <span className="text-[11px] font-semibold text-charcoal-muted uppercase block mb-1.5">
                    Harmonized Swatches
                  </span>
                  <div className="flex items-center gap-3">
                    {currentTheme.colorPaletteHex.map((hex, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div
                          className="w-9 h-9 rounded-full border border-black/10 shadow-ambient-sm"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[10px] text-charcoal-muted font-mono">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Focal Points on User-Specified #DE7356 Surface */}
                <div className="rounded-subcard bg-coralAccent text-white p-3.5 space-y-1.5 shadow-ambient-sm text-[12px]">
                  <span className="font-semibold uppercase text-[10px] tracking-wide text-white/90">
                    Decor Focal Points & Guest Games
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-white/95">
                    {currentTheme.decorFocalPoints?.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                    {currentTheme.engagementActivities?.map((act, i) => (
                      <li key={`act-${i}`}>Activity: {act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* REGIONAL FEAST CATERING STUDIO */}
          {feast && (
            <div className="rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden">
              <div
                onClick={() => toggle('feast')}
                className="bg-sageTeal text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-white" />
                  <span className="font-sans font-medium text-[15px]">
                    Culinary Feast & Catering Brief
                  </span>
                </div>
                {openSections.feast ? (
                  <ChevronUp className="w-4 h-4 text-white/80" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/80" />
                )}
              </div>

              {openSections.feast && (
                <div className="p-4 sm:p-5 space-y-3.5 text-[12px]">
                  <div className="flex items-center justify-between pb-2 border-b border-black/[0.04]">
                    <div>
                      <h4 className="font-sans font-semibold text-[15px] text-charcoal">
                        {feast.regionalTitle}
                      </h4>
                      <p className="text-[11px] text-charcoal-muted">
                        Allocated: ₹{feast.perPlateBudgetINR.toLocaleString('en-IN')} / plate
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sageTeal/15 text-sageTeal text-[12px] font-bold">
                      {feast.cateredPlateCount} Plates (+10% buffer)
                    </span>
                  </div>

                  {/* Dish Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-subcard bg-cream-50 border border-black/[0.04]">
                      <span className="font-semibold text-charcoal block mb-0.5">Welcome Drinks:</span>
                      <p className="text-charcoal-muted">{feast.welcomeDrinks.join(' • ')}</p>
                    </div>

                    <div className="p-3 rounded-subcard bg-cream-50 border border-black/[0.04]">
                      <span className="font-semibold text-charcoal block mb-0.5">Starters & Live Counters:</span>
                      <p className="text-charcoal-muted">{feast.startersAndLiveCounters.join(' • ')}</p>
                    </div>

                    <div className="p-3 rounded-subcard bg-cream-50 border border-black/[0.04]">
                      <span className="font-semibold text-charcoal block mb-0.5">Main Course Specialties:</span>
                      <p className="text-charcoal-muted">{feast.mainCourseSpecialties.join(' • ')}</p>
                    </div>

                    <div className="p-3 rounded-subcard bg-cream-50 border border-black/[0.04]">
                      <span className="font-semibold text-charcoal block mb-0.5">Artisanal Desserts:</span>
                      <p className="text-charcoal-muted">{feast.desserts.join(' • ')}</p>
                    </div>
                  </div>

                  {/* Caterer Brief on User-Specified #DE7356 Surface */}
                  <div className="rounded-subcard bg-coralAccent text-white p-3.5 space-y-1 shadow-ambient-sm">
                    <span className="font-semibold uppercase text-[10px] tracking-wide text-white/90">
                      Caterer Operations Brief
                    </span>
                    <p className="text-white/95 leading-relaxed">
                      {feast.catererQuantityBrief}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            RIGHT COLUMN (lg:col-span-5): DIGITAL INVITE COPYWRITING
           ========================================================================= */}
        <div className="lg:col-span-5 rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden">
          <div
            onClick={() => toggle('invite')}
            className="bg-terracotta text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-white" />
              <span className="font-sans font-medium text-[15px]">
                Ready-to-Send Digital Invite
              </span>
            </div>
            {openSections.invite ? (
              <ChevronUp className="w-4 h-4 text-white/80" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white/80" />
            )}
          </div>

          {openSections.invite && (
            <div className="p-4 sm:p-5 space-y-4">
              <span className="text-[11px] font-semibold text-charcoal-muted uppercase block">
                Live Broadcast Draft
              </span>

              <div className="p-4 rounded-subcard bg-cream-50 border border-black/[0.05] text-[13px] text-charcoal leading-relaxed whitespace-pre-line font-serif italic">
                "{currentTheme.digitalInviteCopy}"
              </div>

              <button
                onClick={handleCopyInvite}
                className="w-full py-3 rounded-full border border-black/[0.1] text-charcoal text-[13px] font-semibold hover:bg-cream-100 flex items-center justify-center gap-2 transition-all shadow-ambient-sm"
              >
                {copiedInvite ? (
                  <>
                    <Check className="w-4 h-4 text-sageTeal" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-charcoal-muted" />
                    <span>Copy Digital Invite Text</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
