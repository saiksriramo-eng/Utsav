import React, { useState } from 'react';
import {
  Search,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Camera,
  Users,
  Building,
  HeartHandshake
} from 'lucide-react';
import { UTSAV_EVENTS, UTSAV_CREW, CalendarEventItem } from '../constants/utsavData';
import { CalendarWidget } from './CalendarWidget';

interface EventsListViewProps {
  onSelectEvent: (eventTitle: string) => void;
  onBackToEvent: () => void;
}

export const EventsListView: React.FC<EventsListViewProps> = ({
  onSelectEvent,
  onBackToEvent,
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [events, setEvents] = useState<CalendarEventItem[]>(UTSAV_EVENTS);

  const toggleExpand = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isExpanded: !e.isExpanded } : e))
    );
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24">
      {/* Top Header Row: Events List Title & Calendar Toggle */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="font-sans font-bold text-[18px] text-charcoal">
            Events List
          </h2>
          <span className="text-[12px] text-charcoal-muted">
            {filteredEvents.length} Events Scheduled
          </span>
        </div>

        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all shadow-ambient-sm ${
            showCalendar
              ? 'bg-slateNavy text-white'
              : 'bg-white border border-black/[0.06] text-charcoal hover:bg-cream-100'
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Calendar</span>
        </button>
      </div>

      {/* Calendar Widget (If Toggled) */}
      {showCalendar && (
        <div className="transition-all animate-fade-in">
          <CalendarWidget />
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by date, client or name..."
          className="w-full bg-white border border-black/[0.06] rounded-card pl-10 pr-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal shadow-ambient"
        />
      </div>

      {/* Events List Cards */}
      <div className="space-y-3">
        {filteredEvents.map((evt) => {
          return (
            <div
              key={evt.id}
              className="rounded-card bg-white border border-black/[0.05] p-4 shadow-ambient transition-all space-y-3"
            >
              {/* Event Card Header */}
              <div
                onClick={() => toggleExpand(evt.id)}
                className="flex items-start justify-between cursor-pointer select-none"
              >
                <div>
                  <h3 className="font-display font-semibold text-[17px] text-charcoal">
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[12px] text-charcoal-muted mt-0.5">
                    <span className="text-terracotta font-medium">{evt.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sageTeal" />
                      {evt.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Overlapping Crew Avatars */}
                  <div className="flex items-center">
                    {evt.crew.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Crew"
                        className="w-6 h-6 rounded-full border-2 border-white object-cover -ml-2 first:ml-0 shadow-ambient-sm"
                      />
                    ))}
                  </div>

                  <button className="text-charcoal-muted hover:text-charcoal">
                    {evt.isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded State Nested Sub-Cards on User-Specified #DE7356 Surface */}
              {evt.isExpanded && (
                <div className="space-y-2.5 pt-2 border-t border-black/[0.04] animate-fade-in text-[12px]">
                  {/* Sub-Card 1: Assigned Crew */}
                  <div className="rounded-subcard bg-coralAccent text-white p-3 space-y-2 shadow-ambient-sm">
                    <span className="font-semibold uppercase text-[10px] tracking-wide text-white/90">
                      Assigned Crew
                    </span>
                    <div className="space-y-1.5">
                      {UTSAV_CREW.slice(0, 3).map((c) => (
                        <div key={c.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-6 h-6 rounded-full object-cover border border-white/20"
                            />
                            <span className="font-semibold text-white">{c.name}</span>
                          </div>
                          <span className="text-[11px] text-white/80">{c.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sub-Card 2: Ceremony & Reception */}
                  <div className="rounded-subcard bg-cream-50 border border-black/[0.04] p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <Building className="w-4 h-4 text-sageTeal shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-charcoal block">Ceremony</span>
                        <span className="text-charcoal-muted">St. Peter's Cathedral</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 pt-1 border-t border-black/[0.04]">
                      <Building className="w-4 h-4 text-slateNavy shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-charcoal block">Reception</span>
                        <span className="text-charcoal-muted">Amway Grand Plaza Hotel</span>
                      </div>
                    </div>
                  </div>

                  {/* Sub-Card 3: Package & Add-ons */}
                  <div className="rounded-subcard bg-cream-50 border border-black/[0.04] p-3 space-y-1.5 text-charcoal">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Story Package</span>
                      <span className="font-medium text-charcoal-muted">8 hours</span>
                    </div>
                    <div className="text-[11px] text-charcoal-muted pt-1 border-t border-black/[0.04]">
                      <span className="font-medium text-charcoal">Add-ons: </span>
                      Drone Coverage, Extra hour
                    </div>
                    <div className="text-[11px] text-charcoal-muted">
                      <span className="font-medium text-charcoal">Wedding Planner: </span>
                      A Day in May Events
                    </div>
                    <div className="text-[11px] text-charcoal-muted">
                      <span className="font-medium text-charcoal">Photographer: </span>
                      The Weber Photographers
                    </div>
                  </div>

                  {/* Open in Command Center Button */}
                  <button
                    onClick={() => {
                      onSelectEvent(evt.title);
                      onBackToEvent();
                    }}
                    className="w-full py-2.5 rounded-full bg-sageTeal text-white font-semibold text-[13px] hover:bg-sageTeal-dark transition-colors shadow-ambient-sm mt-1"
                  >
                    Open Event Details & Workspace
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

