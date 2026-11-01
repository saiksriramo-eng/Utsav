import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Wallet,
  CheckCircle2,
  X
} from 'lucide-react';
import { EventIntake, RegionalVibeId } from '../types/utsav';
import { generateHeroPlaceholder } from '../utils/avatarHelper';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (intake: EventIntake) => void;
  isLoading?: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [step, setStep] = useState<'welcome' | 'form'>('welcome');

  // Form State
  const [eventName, setEventName] = useState('Kristina & Steven\'s Wedding');
  const [city, setCity] = useState('Grand Rapids, MI (Jaipur)');
  const [venueType, setVenueType] = useState<'Indoor Banquet' | 'Outdoor Lawn' | 'Rooftop / Terrace' | 'Community Hall / Campus'>('Outdoor Lawn');
  const [eventDate, setEventDate] = useState('2024-07-12');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [totalBudgetINR, setTotalBudgetINR] = useState<number>(800000);
  const [regionalVibe, setRegionalVibe] = useState<RegionalVibeId>('northern_naan');
  const [dietaryPreference, setDietaryPreference] = useState<'Pure Veg' | 'Veg & Non-Veg' | 'Jain & Veg Friendly' | 'Vegan Options'>('Veg & Non-Veg');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: 'wedding' | 'birthday' | 'community') => {
    if (preset === 'wedding') {
      setEventName('Kristina & Steven\'s Wedding');
      setCity('Jaipur');
      setVenueType('Outdoor Lawn');
      setGuestCount(150);
      setTotalBudgetINR(800000);
      setRegionalVibe('northern_naan');
    } else if (preset === 'birthday') {
      setEventName('1st Milestone Birthday Soiree');
      setCity('Bengaluru');
      setVenueType('Rooftop / Terrace');
      setGuestCount(80);
      setTotalBudgetINR(65000);
      setRegionalVibe('southern_sambar');
    } else {
      setEventName('Campus Tech & Cultural Utsav');
      setCity('Pune');
      setVenueType('Community Hall / Campus');
      setGuestCount(350);
      setTotalBudgetINR(250000);
      setRegionalVibe('global_fusion');
    }
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      eventName,
      category: 'Wedding',
      subEvent: 'Sangeet & Wedding Ceremony',
      city,
      venueType,
      eventDate,
      guestCount,
      totalBudgetINR,
      regionalVibe,
      dietaryPreference,
      aestheticTags: ['Luxe & Classic', 'Draped Room', 'High-Energy'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-card overflow-hidden shadow-ambient-md max-h-[92vh] flex flex-col relative animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.08] flex items-center justify-center text-charcoal hover:bg-cream-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* =========================================================================
            VIEW 1: WELCOME SCREEN (Strictly Replicating Reference Image Screen 2)
           ========================================================================= */}
        {step === 'welcome' && (
          <div className="flex flex-col h-full">
            {/* Top Couple Photo in Black Tie */}
            <div className="h-64 relative shrink-0 overflow-hidden bg-slateNavy">
              <img
                src={generateHeroPlaceholder()}
                alt="Kristina and Steven"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Bottom White Card */}
            <div className="p-6 bg-white -mt-6 rounded-t-[28px] relative z-10 flex flex-col justify-between flex-1 space-y-4">
              <div className="text-center space-y-2 pt-1">
                <h2 className="font-display font-semibold text-[23px] text-charcoal leading-tight">
                  All Your <span className="text-terracotta">Event</span> Details, Effortlessly Organized!
                </h2>
                <p className="text-[13px] text-charcoal-muted leading-relaxed px-2">
                  Instantly access timelines, floor plans, questionnaires, directions, style notes.
                </p>
              </div>

              {/* Instant Preview Preset Chips */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-semibold text-charcoal-muted uppercase block text-center">
                  Quick Demo Presets
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('wedding')}
                    className="p-2 rounded-subcard bg-cream-100 border border-black/[0.05] text-[11px] font-semibold text-charcoal hover:bg-cream-200 transition-colors text-center"
                  >
                    💍 Royal Wedding
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('birthday')}
                    className="p-2 rounded-subcard bg-cream-100 border border-black/[0.05] text-[11px] font-semibold text-charcoal hover:bg-cream-200 transition-colors text-center"
                  >
                    🎂 Soiree
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('community')}
                    className="p-2 rounded-subcard bg-cream-100 border border-black/[0.05] text-[11px] font-semibold text-charcoal hover:bg-cream-200 transition-colors text-center"
                  >
                    🎉 Campus Fest
                  </button>
                </div>
              </div>

              {/* Primary CTA Button */}
              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full py-3 rounded-full bg-sageTeal text-white font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-sageTeal-dark transition-all shadow-ambient-sm"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-sageTeal" />
                <div className="w-1.5 h-1.5 rounded-full bg-charcoal-light/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-charcoal-light/40" />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: EVENT DETAILS INTAKE FORM
           ========================================================================= */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            <div className="border-b border-black/[0.06] pb-3">
              <span className="text-[11px] font-semibold text-sageTeal uppercase tracking-wider">
                Event Setup
              </span>
              <h3 className="font-display font-semibold text-[20px] text-charcoal">
                Configure Celebration
              </h3>
            </div>

            <div className="space-y-3 text-[13px]">
              <div>
                <label className="font-semibold text-charcoal block mb-1">
                  Event / Couple Name
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full bg-cream-50 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-charcoal block mb-1">
                    City / Region
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-cream-50 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-charcoal block mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-cream-50 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-charcoal block mb-1">
                    Guest Count
                  </label>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    min={10}
                    max={2000}
                    className="w-full bg-cream-50 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-charcoal block mb-1">
                    Total Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={totalBudgetINR}
                    onChange={(e) => setTotalBudgetINR(Number(e.target.value))}
                    min={20000}
                    step={10000}
                    className="w-full bg-cream-50 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-charcoal block mb-1">
                  Venue Setting
                </label>
                <select
                  value={venueType}
                  onChange={(e) => setVenueType(e.target.value as any)}
                  className="w-full bg-cream-50 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal"
                >
                  <option value="Outdoor Lawn">Outdoor Lawn</option>
                  <option value="Indoor Banquet">Indoor Banquet</option>
                  <option value="Rooftop / Terrace">Rooftop / Terrace</option>
                  <option value="Community Hall / Campus">Community Hall / Campus</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-charcoal block mb-1">
                  Regional Culinary Vibe
                </label>
                <select
                  value={regionalVibe}
                  onChange={(e) => setRegionalVibe(e.target.value as any)}
                  className="w-full bg-cream-50 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal"
                >
                  <option value="northern_naan">Northern Naan & Nawabi</option>
                  <option value="southern_sambar">Southern Sambar & Sadhya</option>
                  <option value="deccan_nizami">Deccan & Royal Nizami</option>
                  <option value="global_fusion">Global Fusion & Street</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-sageTeal text-white font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-sageTeal-dark transition-all shadow-ambient-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Synthesizing Event Plan...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Event Master Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

