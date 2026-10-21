import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Calendar,
  MapPin,
  IndianRupee,
  Utensils,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HeartHandshake,
  Compass,
  Building,
  TreePine,
  Sun,
  ShieldAlert,
  Heart,
  Cake,
  PartyPopper,
  Check
} from 'lucide-react';
import { EventIntake, EventCategory, RegionalVibeId } from '../types/utsav';
import {
  REGIONAL_VIBES,
  AESTHETIC_TAGS,
  DEMO_PRESETS
} from '../constants/regionalVibes';

interface OnboardingIntakeProps {
  onGeneratePlan: (intake: EventIntake) => Promise<void>;
  isLoading: boolean;
}

export const OnboardingIntake: React.FC<OnboardingIntakeProps> = ({
  onGeneratePlan,
  isLoading
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form state initialized with sensible defaults
  const [formData, setFormData] = useState<EventIntake>({
    eventName: 'Royal Heritage Wedding Sangeet',
    category: 'Wedding',
    subEvent: 'Sangeet & Ring Ceremony',
    city: 'Jaipur',
    venueType: 'Outdoor Lawn',
    eventDate: '2026-12-18',
    guestCount: 150,
    totalBudgetINR: 800000,
    regionalVibe: 'northern_naan',
    dietaryPreference: 'Pure Veg',
    aestheticTags: ['Marigold & Brass Heritage', 'Retro Bollywood Sangeet']
  });

  const subEventOptions: Record<EventCategory, string[]> = {
    Wedding: [
      'Sangeet & Ring Ceremony',
      'Haldi & Mehendi Fiesta',
      'Traditional Wedding Muhurtham',
      'Grand Evening Reception',
      'Cocktail & Welcome Soiree'
    ],
    Birthday: [
      '1st Milestone Birthday Soiree',
      'Kids Fantasy Adventure Theme',
      'Sweet 16 / 18th Milestone Party',
      'Intimate Family Jubilee (50th/60th)',
      'Rooftop Sundowner Celebration'
    ],
    Community: [
      'College Cultural & Hackathon Night',
      'Housing Society Diwali / Navratri Mela',
      'Charity Gala & Art Fundraiser',
      'Tech Conference After-Party & Fest',
      'Youth Music & Food Carnival'
    ]
  };

  const venueTypeIcons = {
    'Indoor Banquet': Building,
    'Outdoor Lawn': TreePine,
    'Rooftop / Terrace': Sun,
    'Community Hall / Campus': Compass
  };

  const handleApplyPreset = (presetIntake: EventIntake) => {
    setFormData(presetIntake);
    setCurrentStep(4); // Jump to review step for immediate launch or fine-tuning
  };

  const calculateDaysRemaining = (targetDateStr: string): number => {
    if (!targetDateStr) return 0;
    const today = new Date();
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const toggleAestheticTag = (tag: string) => {
    setFormData((prev) => {
      const exists = prev.aestheticTags.includes(tag);
      return {
        ...prev,
        aestheticTags: exists
          ? prev.aestheticTags.filter((t) => t !== tag)
          : [...prev.aestheticTags, tag]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePlan(formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* 1-Click Judge & Evaluation Demo Presets */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300/60 shadow-warm-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              1-Click Judge Demo Presets
            </span>
          </div>
          <span className="text-xs text-stone-500">
            Instant full intake population
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DEMO_PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              id={`btn-preset-${index}`}
              onClick={() => handleApplyPreset(preset.intake)}
              className="text-left p-3 rounded-xl bg-white hover:bg-amber-50/90 border border-amber-200/90 text-xs font-medium text-stone-800 hover:text-amber-950 hover:border-amber-400 shadow-sm transition active:scale-95 group"
            >
              <div className="font-semibold text-amber-900 group-hover:text-amber-700 truncate">
                {preset.label}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5 truncate">
                {preset.intake.city} • {preset.intake.venueType}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Intake Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-amber-200 shadow-warm-lg p-6 sm:p-10">
        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-bold">
            <span className="text-amber-800">
              Step {currentStep} of 4:{' '}
              {currentStep === 1 && 'Archetype & Function'}
              {currentStep === 2 && 'Location & Setting'}
              {currentStep === 3 && 'Capacity & Date'}
              {currentStep === 4 && 'Budget & Feast Palate'}
            </span>
            <span className="text-stone-400">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Archetype & Sub-Event */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-1.5">
                  Celebration Title
                </label>
                <input
                  type="text"
                  id="input-event-name"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  placeholder="e.g., Grand Wedding Celebration, Golden Jubilee, Birthday Festivity"
                  className="w-full px-4 py-3 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-stone-800 font-medium text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  Event Archetype
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Wedding', 'Birthday', 'Community'] as EventCategory[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      id={`btn-cat-${cat.toLowerCase()}`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          category: cat,
                          subEvent: subEventOptions[cat][0]
                        })
                      }
                      className={`p-4 rounded-2xl border text-center font-bold text-sm transition flex flex-col items-center justify-center gap-1.5 ${
                        formData.category === cat
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-600 shadow-warm-md scale-[1.02]'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      <div className="mb-0.5">
                        {cat === 'Wedding' ? (
                          <Heart className="w-6 h-6 mx-auto" />
                        ) : cat === 'Birthday' ? (
                          <Cake className="w-6 h-6 mx-auto" />
                        ) : (
                          <PartyPopper className="w-6 h-6 mx-auto" />
                        )}
                      </div>
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  Specific Celebration Function
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {subEventOptions[formData.category].map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setFormData({ ...formData, subEvent: sub })}
                      className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold transition ${
                        formData.subEvent === sub
                          ? 'bg-amber-100/80 text-amber-950 border-amber-400 shadow-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Geographic Anchor and Venue Setting */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  Host City & Locality / PIN Code
                </label>
                <p className="text-xs text-stone-500 mb-2">
                  Anchors regional catering rates and auto-calibrates local vendor radar search.
                </p>
                <input
                  type="text"
                  id="input-city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., Jaipur, Rajasthan or Indiranagar, Bengaluru"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-stone-800 font-medium text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  Venue Setting Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      'Indoor Banquet',
                      'Outdoor Lawn',
                      'Rooftop / Terrace',
                      'Community Hall / Campus'
                    ] as const
                  ).map((type) => {
                    const IconComponent = venueTypeIcons[type];
                    return (
                      <button
                        key={type}
                        type="button"
                        id={`btn-venue-${type.toLowerCase().replace(/[^a-z]/g, '-')}`}
                        onClick={() => setFormData({ ...formData, venueType: type })}
                        className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition ${
                          formData.venueType === type
                            ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-sm ring-1 ring-amber-400'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        <div
                          className={`p-2.5 rounded-xl ${
                            formData.venueType === type ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm">{type}</div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {type === 'Outdoor Lawn' && 'Includes covered rain contingency reserve.'}
                            {type === 'Indoor Banquet' && 'Includes centralized DG acoustic backup.'}
                            {type === 'Rooftop / Terrace' && 'Includes wind & twilight lighting design.'}
                            {type === 'Community Hall / Campus' && 'Includes crowd flow & campus permits.'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Capacity and Target Date */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* Guest Stepper */}
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Expected Guest Count
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    +10% Buffer ({Math.ceil(formData.guestCount * 1.10)} Plates Catered)
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        guestCount: Math.max(10, formData.guestCount - 25)
                      })
                    }
                    className="px-3.5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm"
                  >
                    -25
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        guestCount: Math.max(10, formData.guestCount - 10)
                      })
                    }
                    className="px-3.5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm"
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    id="input-guest-count"
                    min="10"
                    max="10000"
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guestCount: Math.max(10, parseInt(e.target.value) || 10)
                      })
                    }
                    className="flex-1 px-4 py-3 text-center text-xl font-extrabold rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-stone-900"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        guestCount: formData.guestCount + 10
                      })
                    }
                    className="px-3.5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm"
                  >
                    +10
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        guestCount: formData.guestCount + 25
                      })
                    }
                    className="px-3.5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm"
                  >
                    +25
                  </button>
                </div>
              </div>

              {/* Target Date Picker */}
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    Target Celebration Date
                  </span>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {calculateDaysRemaining(formData.eventDate)} Days Remaining
                  </span>
                </label>
                <input
                  type="date"
                  id="input-event-date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-stone-800 font-medium text-sm"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 4: Budget & Regional Culinary Trigger */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              {/* Budget INR Range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-amber-600" />
                    Total Celebration Budget (INR)
                  </label>
                  <span className="text-lg font-extrabold text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                    ₹{formData.totalBudgetINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  id="input-budget-slider"
                  min="30000"
                  max="5000000"
                  step="10000"
                  value={formData.totalBudgetINR}
                  onChange={(e) =>
                    setFormData({ ...formData, totalBudgetINR: parseInt(e.target.value) })
                  }
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>₹30,000 (Cosy)</span>
                  <span>₹10,00,000 (Grand)</span>
                  <span>₹50,00,000+ (Royal)</span>
                </div>
                <div className="mt-2 text-xs text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Peace-of-Mind Buffer: <strong>₹{(formData.totalBudgetINR * 0.10).toLocaleString('en-IN')}</strong> (10%) automatically reserved for zero anxiety.
                  </span>
                </div>
              </div>

              {/* Regional Culinary Vibe Cards */}
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  Select Regional Culinary Vibe
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(REGIONAL_VIBES) as RegionalVibeId[]).map((vibeKey) => {
                    const vibe = REGIONAL_VIBES[vibeKey];
                    const isSelected = formData.regionalVibe === vibeKey;
                    return (
                      <button
                        key={vibeKey}
                        type="button"
                        id={`btn-vibe-${vibeKey}`}
                        onClick={() => setFormData({ ...formData, regionalVibe: vibeKey })}
                        className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/60'
                            : 'bg-white hover:bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{vibe.badgeEmoji}</span>
                            <div className="font-bold text-sm text-stone-900">{vibe.title}</div>
                          </div>
                          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                            {vibe.tagline}
                          </p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap gap-1">
                          {vibe.signatureDishes.slice(0, 2).map((dish, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
                            >
                              {dish.split('&')[0]}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Preference */}
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-1.5">
                  Dietary Protocol
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      'Pure Veg',
                      'Veg & Non-Veg',
                      'Jain & Veg Friendly',
                      'Vegan Options'
                    ] as const
                  ).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setFormData({ ...formData, dietaryPreference: pref })}
                      className={`py-2 px-3 rounded-xl border text-center text-xs font-semibold transition ${
                        formData.dietaryPreference === pref
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aesthetic Tags */}
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-1.5">
                  Celebration Aesthetic & Decor Vibes (Select 1-3)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AESTHETIC_TAGS.map((tag) => {
                    const isSelected = formData.aestheticTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleAestheticTag(tag)}
                        className={`inline-flex items-center px-4 py-2 rounded-full border text-xs font-semibold transition ${
                          isSelected
                            ? 'bg-orange-100 text-orange-950 border-orange-400 shadow-sm'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 mr-1 text-orange-600" /> : <span className="mr-1">+</span>}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                id="btn-intake-prev"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                id="btn-intake-next"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition shadow-warm-sm"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                id="btn-craft-masterplan"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm transition shadow-warm-lg active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Crafting Celebration Masterplan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-orange-100" />
                    <span>Craft Celebration Masterplan</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
