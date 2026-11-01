import React, { useState } from 'react';
import {
  Clock,
  Plus,
  ChevronDown,
  LayoutList,
  BarChart3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { UtsavEventState, TimelineItem } from '../types/utsav';
import { UTSAV_CREW } from '../constants/utsavData';

interface TimelineViewProps {
  state: UtsavEventState | null;
  onToggleTask?: (taskId: string) => void;
  onAddTask?: (task: Partial<TimelineItem>) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  state,
  onToggleTask,
  onAddTask,
}) => {
  const [timelineMode, setTimelineMode] = useState<'schedule' | 'gantt'>('schedule');
  const [selectedDay, setSelectedDay] = useState<number>(27);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const days = [
    { date: 24, day: 'Wed' },
    { date: 25, day: 'Thu' },
    { date: 26, day: 'Fri' },
    { date: 27, day: 'Sat' },
    { date: 28, day: 'Sun' },
  ];

  // Schedule items matching the reference image Screen 6
  const scheduleCards = [
    {
      id: 'sch-1',
      title: 'Hair and Makeup Cascade',
      timeSlot: '08:00 AM - 10:00 AM',
      topOffset: '8:00',
      colorClass: 'bg-cream-50 border-l-4 border-sageTeal text-charcoal',
      pillClass: 'bg-white text-charcoal border border-black/[0.08]',
      avatars: [
        UTSAV_CREW[1].avatar,
        UTSAV_CREW[3].avatar,
      ],
      isCompleted: true,
    },
    {
      id: 'sch-2',
      title: 'Guys take bus to Church',
      timeSlot: '10:45 AM - 11:00 AM',
      topOffset: '10:45',
      colorClass: 'bg-slateNavy text-white',
      pillClass: 'bg-white/20 text-white',
      avatars: [
        UTSAV_CREW[0].avatar,
        UTSAV_CREW[2].avatar,
      ],
      isCompleted: false,
    },
    {
      id: 'sch-3',
      title: 'Bride & Bridesmaids / Picked Up from Cascade to go to Church',
      timeSlot: '12:00 PM - 1:00 PM',
      topOffset: '12:00',
      colorClass: 'bg-sageTeal text-white',
      pillClass: 'bg-white/20 text-white',
      avatars: [
        UTSAV_CREW[1].avatar,
        UTSAV_CREW[3].avatar,
      ],
      isCompleted: false,
    },
    {
      id: 'sch-4',
      title: 'Meredith Get Into Dress',
      timeSlot: '01:00 PM - 1:45 PM',
      topOffset: '13:00',
      colorClass: 'bg-terracotta text-white',
      pillClass: 'bg-white/20 text-white',
      avatars: [
        UTSAV_CREW[3].avatar,
      ],
      isCompleted: false,
    },
  ];

  // Gantt items matching the reference image Screen 5
  const ganttCategories = [
    {
      id: 'g-vendor',
      name: 'Vendor',
      barColor: 'bg-slateNavy text-white',
      milestones: [
        { label: 'Photo Coverage Begins', time: '8:00 AM', dotPosition: 'left-4' },
        { label: 'Groom get dressed', time: '8:30 AM', dotPosition: 'left-24' },
      ],
    },
    {
      id: 'g-ent',
      name: 'Entertainment',
      barColor: 'bg-sageTeal text-white',
      milestones: [
        { label: 'Band Arrival', time: '9:00 AM', dotPosition: 'left-28' },
        { label: 'Groom got dressed', time: '9:45 AM', dotPosition: 'left-48' },
      ],
    },
    {
      id: 'g-venue',
      name: 'Venue',
      barColor: 'bg-terracotta text-white',
      milestones: [
        { label: 'Coastline arrival - Bride prep', time: '11:00 AM', dotPosition: 'left-12' },
        { label: 'Coastline arrival - grooms prep', time: '11:30 AM', dotPosition: 'left-36' },
        { label: '1st look', time: '12:00 PM', dotPosition: 'left-56' },
      ],
    },
  ];

  return (
    <div className="space-y-4 pb-24 relative">
      {/* Subheader: Title + Show All Filter + Mode Switcher */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="font-sans font-bold text-[18px] text-charcoal">
            Timeline
          </h2>
          <p className="text-[12px] text-charcoal-muted">
            Run-of-show minute-by-minute schedule
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-cream-200/80 rounded-full p-0.5 flex border border-black/[0.04]">
            <button
              onClick={() => setTimelineMode('schedule')}
              className={`p-1.5 rounded-full text-xs font-medium transition-all ${
                timelineMode === 'schedule'
                  ? 'bg-white text-slateNavy shadow-ambient-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
              title="Vertical Schedule"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTimelineMode('gantt')}
              className={`p-1.5 rounded-full text-xs font-medium transition-all ${
                timelineMode === 'gantt'
                  ? 'bg-white text-slateNavy shadow-ambient-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
              title="Horizontal Gantt"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>

          <button className="px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[12px] font-medium text-charcoal flex items-center gap-1 shadow-ambient-sm">
            <span>Show All</span>
            <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          MODE 1: VERTICAL SCHEDULE VIEW (Screen 6)
         ========================================================================= */}
      {timelineMode === 'schedule' && (
        <div className="space-y-4">
          {/* Horizontal Day Selector Pills */}
          <div className="flex items-center justify-between bg-white rounded-card p-2.5 border border-black/[0.05] shadow-ambient">
            {days.map((item) => {
              const isSelected = selectedDay === item.date;
              return (
                <button
                  key={item.date}
                  onClick={() => setSelectedDay(item.date)}
                  className={`flex flex-col items-center justify-center w-12 h-14 rounded-subcard transition-all ${
                    isSelected
                      ? 'bg-slateNavy text-white shadow-ambient-sm'
                      : 'text-charcoal hover:bg-cream-100'
                  }`}
                >
                  <span className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-charcoal-muted'}`}>
                    {item.day}
                  </span>
                  <span className="text-[15px] font-bold mt-0.5">
                    {item.date}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Left-Edge Vertical Tick Ruler Alongside Stacked Event Cards */}
          <div className="bg-white rounded-card p-4 border border-black/[0.05] shadow-ambient">
            <div className="relative pl-12 space-y-4">
              {/* Vertical Time Markers on Left Edge */}
              <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-[11px] font-semibold text-charcoal-muted select-none border-r border-black/[0.08] pr-2">
                <span>08:00</span>
                <span>09:00</span>
                <span>10:00</span>
                <span>11:00</span>
                <span>12:00</span>
                <span>13:00</span>
                <span>14:00</span>
              </div>

              {/* Stacked Color-Coded Event Cards */}
              {scheduleCards.map((card) => (
                <div
                  key={card.id}
                  className={`rounded-subcard p-3.5 shadow-ambient-sm transition-all ${card.colorClass}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-sans font-semibold text-[14px] leading-snug">
                      {card.title}
                    </h4>

                    {/* Overlapping Crew Avatars */}
                    <div className="flex items-center shrink-0">
                      {card.avatars.map((av, i) => (
                        <img
                          key={i}
                          src={av}
                          alt="Crew"
                          className="w-6 h-6 rounded-full border-2 border-white object-cover -ml-2 first:ml-0 shadow-ambient-sm"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Timestamp Pill */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${card.pillClass}`}>
                      <Clock className="w-3 h-3" />
                      {card.timeSlot}
                    </span>

                    <button
                      onClick={() => onToggleTask?.(card.id)}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 2: HORIZONTAL GANTT VIEW (Screen 5)
         ========================================================================= */}
      {timelineMode === 'gantt' && (
        <div className="bg-white rounded-card p-4 border border-black/[0.05] shadow-ambient space-y-5">
          {/* Top Horizontal Time Ruler */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-charcoal-muted border-b border-black/[0.08] pb-2 px-1">
            <span>8:00</span>
            <span>9:00</span>
            <span>10:00</span>
            <span>11:00</span>
            <span>12:00</span>
            <span>1:00</span>
          </div>

          {/* Full-width Rounded Category Bars (Navy, Teal, Coral) */}
          <div className="space-y-6 pt-1">
            {ganttCategories.map((cat) => (
              <div key={cat.id} className="space-y-2">
                {/* Category Rounded Bar */}
                <div className={`rounded-full py-1.5 px-4 flex items-center justify-between shadow-ambient-sm ${cat.barColor}`}>
                  <span className="text-[12px] font-semibold tracking-wide uppercase">
                    {cat.name}
                  </span>
                  <span className="text-[10px] opacity-80 font-medium">Active Band</span>
                </div>

                {/* Dot-Connected Milestone Labels */}
                <div className="relative pl-4 space-y-2.5 border-l-2 border-dotted border-charcoal/20 ml-3 pt-1">
                  {cat.milestones.map((ms, idx) => (
                    <div key={idx} className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-slateNavy absolute -left-[21px] top-1" />
                      <div className="text-[12px]">
                        <span className="font-semibold text-charcoal">{ms.label}</span>
                        <span className="text-charcoal-muted ml-2 font-medium">({ms.time})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom-Right Floating + Button */}
      <button
        onClick={() => onAddTask?.({ taskTitle: 'New Schedule Task' })}
        className="fixed bottom-20 right-6 w-12 h-12 rounded-full bg-white border border-black/[0.08] shadow-ambient-md flex items-center justify-center text-charcoal hover:bg-cream-100 transition-all z-30"
        title="Add Event Task"
      >
        <Plus className="w-5 h-5 text-charcoal" />
      </button>
    </div>
  );
};

