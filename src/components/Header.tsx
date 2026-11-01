import React from 'react';
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Package,
  MapPin,
  Heart,
  Users,
  FileText,
  LogOut,
  Clock,
  LayoutGrid,
  MessageSquare
} from 'lucide-react';
import { UtsavEventState } from '../types/utsav';
import { AuthUser } from './LoginPage';
import { UtsavAIIcon } from './icons/UtsavAIIcon';
import { DiyaIcon } from './icons/DiyaIcon';
import { UtsavTab } from './BottomNav';

interface HeaderProps {
  state: UtsavEventState | null;
  activeSection: string;
  activeTab: UtsavTab;
  onTabChange: (tab: UtsavTab) => void;
  onSectionClick: (sectionId: string) => void;
  onOpenCalendar: () => void;
  onOpenSahayak: () => void;
  onOpenEventsList: () => void;
  user: AuthUser | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  activeSection,
  activeTab,
  onTabChange,
  onSectionClick,
  onOpenCalendar,
  onOpenSahayak,
  onOpenEventsList,
  user,
  onLogout,
}) => {
  const coupleName = state?.intake?.eventName || 'Kristina & Steven';
  const eventDate = state?.intake?.eventDate || '12 July, 2024';

  const quickJumpItems = [
    { id: 'package', label: 'Package', icon: Package },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'couple', label: 'Couple', icon: Heart },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'details', label: 'Details', icon: FileText },
  ];

  const desktopNavTabs: { id: UtsavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'details', label: 'Details', icon: FileText },
  ];

  return (
    <header className="bg-cream-100 lg:bg-white/95 rounded-b-[24px] lg:rounded-none px-4 lg:px-6 xl:px-8 pt-3 pb-3 lg:py-3 border-b border-black/[0.05] shadow-ambient-sm sticky top-0 z-30 transition-all backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
        {/* =========================================================================
            LEFT SECTION: BRAND LOGO + CURRENT EVENT TITLE (Desktop & Mobile)
           ========================================================================= */}
        <div className="flex items-center gap-3 shrink-0 min-w-0">
          {/* Mobile Back to Events List */}
          <button
            onClick={onOpenEventsList}
            title="All Events List"
            className="w-9 h-9 rounded-full bg-white border border-black/[0.06] shadow-ambient-sm flex lg:hidden items-center justify-center text-charcoal hover:bg-cream-200 transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-charcoal" />
          </button>

          {/* Desktop Brand Logo with Diya Icon */}
          <div
            onClick={onOpenEventsList}
            title="Switch Event / View All"
            className="hidden lg:flex items-center gap-2 cursor-pointer select-none group shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-terracotta text-white flex items-center justify-center shadow-ambient-sm group-hover:scale-105 transition-all">
              <DiyaIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-[21px] font-semibold text-charcoal tracking-wide leading-none block">
                Utsav
              </span>
              <span className="text-[9px] text-charcoal-muted uppercase font-semibold tracking-wider block">
                Planner
              </span>
            </div>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block h-6 w-px bg-black/[0.08] mx-1 shrink-0" />

          {/* Event Context (Title & Date) - Clear boundary, no collision */}
          <div className="min-w-0 max-w-[180px] sm:max-w-[260px] lg:max-w-[200px] xl:max-w-[280px]">
            <h1 className="font-display text-[17px] lg:text-[16px] xl:text-[18px] font-semibold text-charcoal leading-tight truncate">
              {coupleName}
            </h1>
            <p className="text-[11px] font-medium text-terracotta tracking-wide truncate">
              {eventDate}
            </p>
          </div>
        </div>

        {/* =========================================================================
            CENTER SECTION: DESKTOP NAVIGATION TABS (Laptop/Desktop only)
            Always single line, no multi-line wrapping, centered with proper padding
           ========================================================================= */}
        <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-2">
          <nav className="inline-flex items-center gap-1 bg-cream-100/90 p-1 rounded-full border border-black/[0.05] shadow-inner-sm">
            {desktopNavTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] xl:text-[13px] font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-sageTeal text-white shadow-ambient-sm font-semibold'
                      : 'text-charcoal-muted hover:text-charcoal hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* =========================================================================
            RIGHT SECTION: CALENDAR, AI SAHAYAK, USER PROFILE & LOGOUT
           ========================================================================= */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Calendar View Button */}
          <button
            onClick={onOpenCalendar}
            title="Open Calendar Schedule"
            className="w-9 h-9 rounded-full bg-white border border-black/[0.06] shadow-ambient-sm flex items-center justify-center text-charcoal hover:bg-cream-100 transition-colors shrink-0"
          >
            <CalendarIcon className="w-4 h-4 text-charcoal" />
          </button>

          {/* AI Co-Planner Button */}
          <button
            onClick={onOpenSahayak}
            title="Open AI Sahayak Co-Planner"
            className="h-9 px-3 rounded-full bg-sageTeal text-white shadow-ambient-sm flex items-center gap-1.5 hover:bg-sageTeal-dark transition-all shrink-0"
          >
            <UtsavAIIcon className="w-4 h-4 text-white shrink-0" />
            <span className="hidden sm:inline text-[12px] font-semibold whitespace-nowrap">AI Assistant</span>
          </button>

          {/* Logged In User Pill */}
          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-black/[0.08] shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-black/[0.08] shadow-ambient-sm shrink-0"
              />
              <div className="hidden xl:block text-left max-w-[90px] xl:max-w-[120px]">
                <span className="text-[12px] font-semibold text-charcoal block leading-tight truncate">
                  {user.name}
                </span>
                <span className="text-[10px] text-charcoal-muted block leading-none truncate">
                  {user.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="w-8 h-8 rounded-full bg-cream-50 hover:bg-cream-200 text-charcoal-muted hover:text-charcoal flex items-center justify-center transition-colors border border-black/[0.04] shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Row of Circular White Icon Buttons (Mobile Quick Jump) */}
      <div className="flex lg:hidden items-center justify-center gap-2.5 overflow-x-auto no-scrollbar py-1 mt-2">
        {quickJumpItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                isActive
                  ? 'bg-slateNavy text-white shadow-ambient'
                  : 'bg-white border border-black/[0.06] text-charcoal shadow-ambient-sm hover:bg-cream-50'
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
