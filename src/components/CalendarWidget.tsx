import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarWidgetProps {
  onSelectDate?: (day: number) => void;
  selectedDay?: number;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  onSelectDate,
  selectedDay = 12,
}) => {
  const [currentMonth, setCurrentMonth] = useState('July 2024');

  // Days configuration matching Screen 3 of the reference image
  // Day states: 'navy' (solid navy #2C3844), 'teal' (solid teal #4A7B76), 'ring' (outlined ring), 'normal'
  const calendarDays = [
    { day: 29, isDiffMonth: true },
    { day: 30, isDiffMonth: true },
    { day: 1, type: 'normal' },
    { day: 2, type: 'normal' },
    { day: 3, type: 'normal' },
    { day: 4, type: 'normal' },
    { day: 5, type: 'navy' }, // Solid navy
    { day: 6, type: 'normal' },
    { day: 7, type: 'normal' },
    { day: 8, type: 'normal' },
    { day: 9, type: 'normal' },
    { day: 10, type: 'normal' },
    { day: 11, type: 'ring' }, // Outlined ring
    { day: 12, type: 'teal' }, // Solid teal active event
    { day: 13, type: 'normal' },
    { day: 14, type: 'normal' },
    { day: 15, type: 'normal' },
    { day: 16, type: 'normal' },
    { day: 17, type: 'normal' },
    { day: 18, type: 'normal' },
    { day: 19, type: 'navy' }, // Solid navy
    { day: 20, type: 'normal' },
    { day: 21, type: 'normal' },
    { day: 22, type: 'normal' },
    { day: 23, type: 'normal' },
    { day: 24, type: 'normal' },
    { day: 25, type: 'normal' },
    { day: 26, type: 'navy' }, // Solid navy
    { day: 27, type: 'normal' },
    { day: 28, type: 'normal' },
    { day: 29, type: 'normal' },
    { day: 30, type: 'normal' },
    { day: 31, type: 'ring' }, // Ring
    { day: 1, isDiffMonth: true },
    { day: 2, isDiffMonth: true },
  ];

  const weekHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  return (
    <div className="rounded-card bg-white border border-black/[0.05] p-4 shadow-ambient space-y-4">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between px-2">
        <button className="p-1 rounded-full text-charcoal hover:bg-cream-100 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-[15px] text-charcoal">
            {currentMonth}
          </span>
        </div>

        <button className="p-1 rounded-full text-charcoal hover:bg-cream-100 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Week Headers */}
      <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-charcoal-muted">
        {weekHeaders.map((wk) => (
          <span key={wk}>{wk}</span>
        ))}
      </div>

      {/* Calendar 7-Column Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
        {calendarDays.map((item, index) => {
          let styleClass = 'text-charcoal hover:bg-cream-100';

          if (item.isDiffMonth) {
            styleClass = 'text-charcoal-light/40';
          } else if (item.type === 'teal') {
            styleClass = 'bg-sageTeal text-white font-bold shadow-ambient-sm';
          } else if (item.type === 'navy') {
            styleClass = 'bg-slateNavy text-white font-bold shadow-ambient-sm';
          } else if (item.type === 'ring') {
            styleClass = 'border-2 border-slateNavy text-charcoal font-semibold';
          }

          return (
            <button
              key={index}
              onClick={() => !item.isDiffMonth && onSelectDate?.(item.day)}
              className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-[13px] transition-all ${styleClass}`}
            >
              {item.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

