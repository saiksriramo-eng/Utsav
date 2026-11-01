import React from 'react';
import {
  LayoutGrid,
  Clock,
  MapPin,
  MessageSquare,
  FileText
} from 'lucide-react';

export type UtsavTab = 'overview' | 'timeline' | 'locations' | 'chat' | 'details';

interface BottomNavProps {
  activeTab: UtsavTab;
  onTabChange: (tab: UtsavTab) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 2,
}) => {
  const tabs: { id: UtsavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'details', label: 'Details', icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-black/[0.05] shadow-ambient max-w-md mx-auto">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
                isActive ? 'text-sageTeal' : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2px]' : 'stroke-[1.6px]'}`} />
                {tab.id === 'chat' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-coralAccent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 ${isActive ? 'font-semibold text-sageTeal' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

