import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Utensils,
  Clock,
  MapPin,
  Sparkles,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import {
  UtsavEventState,
  EventIntake,
  RegionalVibeId
} from './types/utsav';
import {
  generateInitialUtsavPlan,
  rebalanceWithSahayak
} from './services/geminiService';
import { REGIONAL_VIBES } from './constants/regionalVibes';
import { Header } from './components/Header';
import { OnboardingIntake } from './components/OnboardingIntake';
import { PeaceOfMindBanner } from './components/PeaceOfMindBanner';
import { BudgetEngine } from './components/BudgetEngine';
import { FeastAndThemeStudio } from './components/FeastAndThemeStudio';
import { TimelineRunSheet } from './components/TimelineRunSheet';
import { VendorRadarMap } from './components/VendorRadarMap';
import { UtsavSahayakBar } from './components/UtsavSahayakBar';

type PillarTab = 'budget' | 'feast-theme' | 'timeline' | 'vendors';

const STORAGE_KEY = 'utsav_event_state';

export const App: React.FC = () => {
  const [eventState, setEventState] = useState<UtsavEventState | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<PillarTab>('budget');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRebalancing, setIsRebalancing] = useState<boolean>(false);
  const [notificationError, setNotificationError] = useState<string | null>(null);

  // Sync state changes with localStorage
  useEffect(() => {
    if (eventState) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eventState));
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }
    }
  }, [eventState]);

  // Handle Initial Plan Generation
  const handleGeneratePlan = async (intake: EventIntake) => {
    setIsLoading(true);
    setNotificationError(null);
    try {
      const plan = await generateInitialUtsavPlan(intake);
      setEventState(plan);
      setActiveTab('budget');
    } catch (error: any) {
      console.error('Generation error:', error);
      setNotificationError(
        error?.message || 'Utsav Sahayak experienced a temporary pause. Please verify your settings and retry.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reset / New Event
  const handleReset = () => {
    if (window.confirm('Start a new celebration plan? This will clear the current workspace.')) {
      setEventState(null);
      localStorage.removeItem(STORAGE_KEY);
      setActiveTab('budget');
    }
  };

  // Toggle Budget Lock
  const handleToggleLock = (id: string) => {
    if (!eventState) return;
    setEventState({
      ...eventState,
      budgetBreakdown: eventState.budgetBreakdown.map((item) =>
        item.id === id ? { ...item, isLocked: !item.isLocked } : item
      )
    });
  };

  // Update Actual Spend Inline
  const handleUpdateActualSpent = (id: string, amount: number) => {
    if (!eventState) return;
    setEventState({
      ...eventState,
      budgetBreakdown: eventState.budgetBreakdown.map((item) =>
        item.id === id ? { ...item, actualSpentINR: amount } : item
      )
    });
  };

  // Update Vendor Quote & Synchronize Budget Spend
  const handleUpdateVendorQuote = (
    vendorId: string,
    pinnedVendorName: string,
    quotedPriceINR: number,
    booked: boolean,
    serviceCategory: string
  ) => {
    if (!eventState) return;

    // 1. Update Vendor record
    const updatedVendors = eventState.vendors.map((v) =>
      v.id === vendorId
        ? { ...v, pinnedVendorName, quotedPriceINR, booked }
        : v
    );

    // 2. Map service category to matching budget item
    const categoryMapping: Record<string, string> = {
      Caterers: 'Catering & Feast',
      Venues: 'Venue & Banquet',
      Decorators: 'Decor & Ambience',
      Photographers: 'Photography & Media',
      'Sound & Artist': 'Sound, DJ & Artist'
    };

    const targetCategoryName = categoryMapping[serviceCategory];

    // Calculate total spend for this category across vendors
    const categoryVendors = updatedVendors.filter(
      (v) => v.serviceCategory === serviceCategory && v.quotedPriceINR > 0
    );
    const totalCategoryQuote = categoryVendors.reduce((acc, v) => acc + v.quotedPriceINR, 0);

    const updatedBudget = eventState.budgetBreakdown.map((b) => {
      if (b.categoryName === targetCategoryName) {
        return {
          ...b,
          actualSpentINR: totalCategoryQuote > 0 ? totalCategoryQuote : b.actualSpentINR
        };
      }
      return b;
    });

    setEventState({
      ...eventState,
      vendors: updatedVendors,
      budgetBreakdown: updatedBudget
    });
  };

  // Toggle Milestone Completion
  const handleToggleTimeline = (id: string) => {
    if (!eventState) return;
    setEventState({
      ...eventState,
      timeline: eventState.timeline.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    });
  };

  // Select Theme Concept
  const handleSelectTheme = (index: number) => {
    if (!eventState) return;
    setEventState({
      ...eventState,
      selectedThemeIndex: index
    });
  };

  // Switch Regional Vibe
  const handleChangeRegionalVibe = async (vibeId: RegionalVibeId) => {
    if (!eventState || isRebalancing) return;
    const targetMeta = REGIONAL_VIBES[vibeId];
    setIsRebalancing(true);
    setNotificationError(null);
    try {
      const next = await rebalanceWithSahayak(
        eventState,
        `Switch regional feast palate to ${targetMeta.title}. Recalibrate welcome drinks, live counters, and delicacies to match existing per-plate budget.`,
        { regionalVibe: vibeId }
      );
      setEventState(next);
    } catch (err: any) {
      console.error('Rebalance error:', err);
      setNotificationError('Temporary pause during palate rebalance. Please retry.');
    } finally {
      setIsRebalancing(false);
    }
  };

  // Sahayak Natural Language Message
  const handleSahayakMessage = async (text: string) => {
    if (!eventState || isRebalancing) return;
    setIsRebalancing(true);
    setNotificationError(null);
    try {
      const next = await rebalanceWithSahayak(eventState, text);
      setEventState(next);
    } catch (err: any) {
      console.error('Sahayak message error:', err);
      setNotificationError('Temporary pause during Sahayak recalculation. Please retry.');
    } finally {
      setIsRebalancing(false);
    }
  };

  // Sahayak 4 Calm Quick-Action Chips
  const handleQuickAction = async (
    actionKey: 'welcome_guests_25' | 'budget_cosy_15' | 'adapt_indoor' | 'cycle_regional_vibe'
  ) => {
    if (!eventState || isRebalancing) return;

    setIsRebalancing(true);
    setNotificationError(null);

    try {
      let prompt = '';
      let overrides: Partial<EventIntake> = {};

      if (actionKey === 'welcome_guests_25') {
        const nextGuests = eventState.intake.guestCount + 25;
        prompt = `Welcome +25 more guests (total: ${nextGuests}) within the existing total budget of ₹${eventState.intake.totalBudgetINR}. Hold locked categories constant and scale plate counts.`;
        overrides = { guestCount: nextGuests };
      } else if (actionKey === 'budget_cosy_15') {
        const reducedBudget = Math.round(eventState.intake.totalBudgetINR * 0.85);
        prompt = `Make decor and event flow 15% more budget-cosy (new budget: ₹${reducedBudget}). Recommend graceful floral and lighting swaps without hurting food quality.`;
        overrides = { totalBudgetINR: reducedBudget };
      } else if (actionKey === 'adapt_indoor') {
        prompt = `Adapt the current plan to an Indoor Banquet flow. Reallocate outdoor weather contingencies toward warm indoor acoustics, stage drapery, and ambient lighting.`;
        overrides = { venueType: 'Indoor Banquet' };
      } else if (actionKey === 'cycle_regional_vibe') {
        const vibeKeys = Object.keys(REGIONAL_VIBES) as RegionalVibeId[];
        const currentIdx = vibeKeys.indexOf(eventState.intake.regionalVibe);
        const nextVibe = vibeKeys[(currentIdx + 1) % vibeKeys.length];
        prompt = `Switch regional culinary trigger to ${REGIONAL_VIBES[nextVibe].title}. Harmonize all dishes with the current per-plate budget.`;
        overrides = { regionalVibe: nextVibe };
      }

      const next = await rebalanceWithSahayak(eventState, prompt, overrides);
      setEventState(next);
    } catch (err: any) {
      console.error('Quick action error:', err);
      setNotificationError('Temporary connection pause. Please retry.');
    } finally {
      setIsRebalancing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-36">
      {/* Brand Header */}
      <Header state={eventState} onReset={handleReset} />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error / Alert Banner if present */}
        {notificationError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{notificationError}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotificationError(null)}
              className="text-rose-600 font-bold hover:underline shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* STEP A: Intake Wizard if no active plan */}
        {!eventState ? (
          <OnboardingIntake onGeneratePlan={handleGeneratePlan} isLoading={isLoading} />
        ) : (
          /* STEP B: 4-Pillar Synchronized Command Center */
          <div className="space-y-6 animate-fade-in">
            {/* Top Proactive Peace-of-Mind Shield Banner */}
            <PeaceOfMindBanner peaceOfMind={eventState.peaceOfMind} intake={eventState.intake} />

            {/* 4-Pillar Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
              <nav aria-label="4-Pillar Workspace Navigation" className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  id="tab-pillar-budget"
                  onClick={() => setActiveTab('budget')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition ${
                    activeTab === 'budget'
                      ? 'bg-amber-600 text-white shadow-warm-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>1. Budget Engine</span>
                </button>

                <button
                  type="button"
                  id="tab-pillar-feast"
                  onClick={() => setActiveTab('feast-theme')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition ${
                    activeTab === 'feast-theme'
                      ? 'bg-amber-600 text-white shadow-warm-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>2. Regional Feast & Theme</span>
                </button>

                <button
                  type="button"
                  id="tab-pillar-timeline"
                  onClick={() => setActiveTab('timeline')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition ${
                    activeTab === 'timeline'
                      ? 'bg-amber-600 text-white shadow-warm-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>3. Dual Timeline</span>
                </button>

                <button
                  type="button"
                  id="tab-pillar-vendors"
                  onClick={() => setActiveTab('vendors')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition ${
                    activeTab === 'vendors'
                      ? 'bg-amber-600 text-white shadow-warm-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>4. Local Vendor Radar</span>
                </button>
              </nav>

              <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Synchronized JSON State Tree</span>
              </div>
            </div>

            {/* Active Pillar Views */}
            <div className="pt-2">
              {activeTab === 'budget' && (
                <BudgetEngine
                  budgetItems={eventState.budgetBreakdown}
                  totalBudgetINR={eventState.intake.totalBudgetINR}
                  costPerGuestINR={eventState.costPerGuestINR}
                  guestCount={eventState.intake.guestCount}
                  onToggleLock={handleToggleLock}
                  onUpdateActualSpent={handleUpdateActualSpent}
                />
              )}

              {activeTab === 'feast-theme' && (
                <FeastAndThemeStudio
                  feastMenu={eventState.feastMenu}
                  themeConcepts={eventState.themeConcepts}
                  selectedThemeIndex={eventState.selectedThemeIndex}
                  activeRegionalVibe={eventState.intake.regionalVibe}
                  onSelectTheme={handleSelectTheme}
                  onChangeRegionalVibe={handleChangeRegionalVibe}
                />
              )}

              {activeTab === 'timeline' && (
                <TimelineRunSheet
                  timeline={eventState.timeline}
                  onToggleComplete={handleToggleTimeline}
                />
              )}

              {activeTab === 'vendors' && (
                <VendorRadarMap
                  vendors={eventState.vendors}
                  intake={eventState.intake}
                  onUpdateVendorQuote={handleUpdateVendorQuote}
                />
              )}
            </div>

            {/* Floating Utsav Sahayak Dock */}
            <UtsavSahayakBar
              history={eventState.sahayakHistory}
              lastSummary={eventState.lastSahayakSummary}
              isRebalancing={isRebalancing}
              onSendMessage={handleSahayakMessage}
              onQuickAction={handleQuickAction}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
