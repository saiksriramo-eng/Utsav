import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  ShieldAlert,
  Filter,
  Sparkles,
  Users
} from 'lucide-react';
import { TimelineItem } from '../types/utsav';

interface TimelineRunSheetProps {
  timeline: TimelineItem[];
  onToggleComplete: (id: string) => void;
}

export const TimelineRunSheet: React.FC<TimelineRunSheetProps> = ({
  timeline,
  onToggleComplete
}) => {
  const [activeTab, setActiveTab] = useState<'Pre-Event Countdown' | 'Event-Day Run Sheet'>(
    'Pre-Event Countdown'
  );
  const [selectedRole, setSelectedRole] = useState<string>('All');

  // Extract unique assigned roles
  const roles = ['All', ...Array.from(new Set(timeline.map((t) => t.assignedRole)))];

  const filteredTimeline = timeline.filter((item) => {
    const matchesTab = item.phase === activeTab;
    const matchesRole = selectedRole === 'All' || item.assignedRole === selectedRole;
    return matchesTab && matchesRole;
  });

  const handleToggle = (item: TimelineItem) => {
    if (!item.completed) {
      // Celebratory micro-interaction
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D97706', '#E11D48', '#10B981', '#F59E0B']
      });
    }
    onToggleComplete(item.id);
  };

  const totalCompletedInPhase = timeline.filter(
    (t) => t.phase === activeTab && t.completed
  ).length;
  const totalInPhase = timeline.filter((t) => t.phase === activeTab).length;

  return (
    <div className="bg-white/95 rounded-3xl border border-amber-200/90 shadow-warm-md p-6 sm:p-8">
      {/* Header and Dual-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-stone-900 font-festive flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Dual-View Timeline & Minute-by-Minute Run Sheet
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Switch between weeks-out countdown milestones and event-day execution schedules.
          </p>
        </div>

        {/* Dual Tab Buttons */}
        <div className="flex items-center p-1 rounded-2xl bg-stone-100 border border-stone-200">
          <button
            type="button"
            id="tab-pre-event"
            onClick={() => setActiveTab('Pre-Event Countdown')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'Pre-Event Countdown'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Pre-Event Countdown</span>
          </button>
          <button
            type="button"
            id="tab-event-day"
            onClick={() => setActiveTab('Event-Day Run Sheet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'Event-Day Run Sheet'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-rose-600" />
            <span>Event-Day Run Sheet</span>
          </button>
        </div>
      </div>

      {/* Role Filter & Phase Progress Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60">
        {/* Role Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            Role Filter:
          </span>
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                selectedRole === role
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Milestone Completion Metric */}
        <div className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>
            {totalCompletedInPhase} of {totalInPhase} milestones checked
          </span>
        </div>
      </div>

      {/* Timeline Milestone Checklist */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-200 space-y-6 my-4">
        {filteredTimeline.length === 0 ? (
          <div className="text-xs text-stone-500 py-6">
            No milestones match the selected role filter.
          </div>
        ) : (
          filteredTimeline.map((item) => (
            <div
              key={item.id}
              className={`relative group p-4 rounded-2xl border transition ${
                item.completed
                  ? 'bg-stone-50/70 border-stone-200 opacity-75'
                  : item.isSafetyCheck
                  ? 'bg-emerald-50/30 border-emerald-300 ring-1 ring-emerald-300/40 shadow-xs'
                  : 'bg-white hover:bg-amber-50/20 border-stone-200 shadow-sm'
              }`}
            >
              {/* Bullet Node Indicator */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition cursor-pointer ${
                  item.completed
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'bg-white border-amber-400 text-stone-300 group-hover:border-amber-600'
                }`}
                onClick={() => handleToggle(item)}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                )}
              </div>

              {/* Task Row Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggle(item)}
                    className="mt-0.5 text-stone-400 hover:text-emerald-600 transition"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300 hover:text-amber-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg font-mono">
                        {item.timeMarker}
                      </span>
                      <span
                        className={`font-bold text-sm ${
                          item.completed ? 'line-through text-stone-400' : 'text-stone-800'
                        }`}
                      >
                        {item.taskTitle}
                      </span>
                      {item.isSafetyCheck && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          <ShieldAlert className="w-3 h-3 text-emerald-700" />
                          Safety & Contingency Check
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Responsible Role Badge */}
                <div className="self-end sm:self-auto shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-stone-100 text-stone-600 border border-stone-200">
                    <Users className="w-3 h-3 text-stone-400" />
                    {item.assignedRole}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
