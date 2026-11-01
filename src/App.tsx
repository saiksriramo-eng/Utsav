import React, { useState, useEffect } from 'react';
import { UtsavEventState, EventIntake } from './types/utsav';
import {
  generateInitialUtsavPlan,
  rebalanceWithSahayak,
  generateDeterministicPlan
} from './services/geminiService';
import { Header } from './components/Header';
import { BottomNav, UtsavTab } from './components/BottomNav';
import { OverviewView } from './components/OverviewView';
import { TimelineView } from './components/TimelineView';
import { LocationsView } from './components/LocationsView';
import { MessagesView } from './components/MessagesView';
import { DetailsView } from './components/DetailsView';
import { EventsListView } from './components/EventsListView';
import { OnboardingModal } from './components/OnboardingModal';
import { UtsavSahayakDrawer } from './components/UtsavSahayakDrawer';
import { LoginPage, AuthUser } from './components/LoginPage';
import { UtsavAIIcon } from './components/icons/UtsavAIIcon';
import { DEFAULT_EVENT_INTAKE } from './constants/utsavData';

const STORAGE_KEY = 'utsav_event_state';
const AUTH_KEY = 'utsav_auth_user';

export const App: React.FC = () => {
  // Authentication State
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Initialize event state
  const [eventState, setEventState] = useState<UtsavEventState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fall through to default
    }
    return generateDeterministicPlan(DEFAULT_EVENT_INTAKE);
  });

  const [activeTab, setActiveTab] = useState<UtsavTab>('overview');
  const [activeSection, setActiveSection] = useState<string>('package');
  const [showEventsList, setShowEventsList] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showSahayakDrawer, setShowSahayakDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRebalancing, setIsRebalancing] = useState<boolean>(false);

  // Sync event state with localStorage
  useEffect(() => {
    if (eventState) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eventState));
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }
    }
  }, [eventState]);

  // Handle Login
  const handleLogin = (newUser: AuthUser) => {
    setUser(newUser);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    } catch (err) {
      console.error('Failed to save auth session:', err);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm('Sign out of your Utsav workspace session?')) {
      setUser(null);
      try {
        localStorage.removeItem(AUTH_KEY);
      } catch (err) {
        console.error('Failed to clear auth session:', err);
      }
    }
  };

  // Handle plan generation from onboarding
  const handleGeneratePlan = async (intake: EventIntake) => {
    setIsLoading(true);
    try {
      const plan = await generateInitialUtsavPlan(intake);
      setEventState(plan);
      setShowOnboarding(false);
      setActiveTab('overview');
    } catch (error) {
      console.error('Plan generation error:', error);
      const fallback = generateDeterministicPlan(intake);
      setEventState(fallback);
      setShowOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle AI rebalancing via Utsav Sahayak
  const handleRebalance = async (prompt: string) => {
    setIsRebalancing(true);
    try {
      const rebalanced = await rebalanceWithSahayak(eventState, prompt);
      setEventState(rebalanced);
    } catch (error) {
      console.error('Rebalance error:', error);
    } finally {
      setIsRebalancing(false);
    }
  };

  // Toggle budget category lock
  const handleToggleLock = (id: string) => {
    setEventState((prev) => ({
      ...prev,
      budgetBreakdown: prev.budgetBreakdown.map((item) =>
        item.id === id ? { ...item, isLocked: !item.isLocked } : item
      ),
    }));
  };

  // Update actual spent
  const handleUpdateActualSpent = (id: string, amount: number) => {
    setEventState((prev) => ({
      ...prev,
      budgetBreakdown: prev.budgetBreakdown.map((item) =>
        item.id === id ? { ...item, actualSpentINR: amount } : item
      ),
    }));
  };

  // Quick jump scrolling
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (activeTab !== 'overview') {
      setActiveTab('overview');
    }
    setTimeout(() => {
      const el = document.getElementById(`section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Select event from events list
  const handleSelectEvent = (eventTitle: string) => {
    const updatedIntake: EventIntake = {
      ...eventState.intake,
      eventName: eventTitle,
    };
    const newPlan = generateDeterministicPlan(updatedIntake);
    setEventState(newPlan);
  };

  // If user is not authenticated, render Login Page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col font-sans text-charcoal antialiased selection:bg-terracotta/20">
      {/* Top App Bar & Navigation */}
      <Header
        state={eventState}
        activeSection={activeSection}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setShowEventsList(false);
          setActiveTab(tab);
        }}
        onSectionClick={handleSectionClick}
        onOpenCalendar={() => setShowEventsList(true)}
        onOpenSahayak={() => setShowSahayakDrawer(true)}
        onOpenEventsList={() => setShowEventsList(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Container - Full Width on Laptop (max-w-7xl), responsive on mobile */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {showEventsList ? (
          <EventsListView
            onSelectEvent={handleSelectEvent}
            onBackToEvent={() => setShowEventsList(false)}
          />
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewView
                state={eventState}
                onToggleLock={handleToggleLock}
                onUpdateActualSpent={handleUpdateActualSpent}
                onOpenSahayak={() => setShowSahayakDrawer(true)}
              />
            )}

            {activeTab === 'timeline' && (
              <TimelineView
                state={eventState}
                onToggleTask={(taskId) => {
                  setEventState((prev) => ({
                    ...prev,
                    timeline: prev.timeline.map((t) =>
                      t.id === taskId ? { ...t, completed: !t.completed } : t
                    ),
                  }));
                }}
              />
            )}

            {activeTab === 'locations' && (
              <LocationsView state={eventState} />
            )}

            {activeTab === 'chat' && <MessagesView />}

            {activeTab === 'details' && (
              <DetailsView
                state={eventState}
                onSelectTheme={(idx) =>
                  setEventState((prev) => ({
                    ...prev,
                    selectedThemeIndex: idx,
                  }))
                }
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Fixed 5-Tab Bottom Navigation Bar (Hidden on Laptop >= 1024px) */}
      <div className="lg:hidden">
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setShowEventsList(false);
            setActiveTab(tab);
          }}
          unreadCount={2}
        />
      </div>

      {/* Onboarding Welcome / Intake Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onSubmit={handleGeneratePlan}
        isLoading={isLoading}
      />

      {/* AI Co-Planner Drawer (Utsav Sahayak) */}
      <UtsavSahayakDrawer
        isOpen={showSahayakDrawer}
        onClose={() => setShowSahayakDrawer(false)}
        state={eventState}
        onRebalance={handleRebalance}
        isRebalancing={isRebalancing}
      />

      {/* Laptop Floating AI Assistant Button (Bottom Right) */}
      <button
        onClick={() => setShowSahayakDrawer(true)}
        className="hidden lg:flex fixed bottom-8 right-8 z-30 h-14 px-5 rounded-full bg-sageTeal hover:bg-sageTeal-dark text-white items-center gap-3 shadow-ambient-md transition-all hover:scale-105"
        title="Open Utsav Sahayak AI Co-Planner"
      >
        <UtsavAIIcon className="w-6 h-6 text-white" />
        <span className="font-semibold text-[14px]">AI Co-Planner</span>
      </button>
    </div>
  );
};

export default App;
