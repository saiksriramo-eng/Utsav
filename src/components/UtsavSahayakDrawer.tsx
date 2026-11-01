import React, { useState } from 'react';
import {
  X,
  Send,
  Users,
  Percent,
  Home,
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { UtsavEventState } from '../types/utsav';
import { UtsavAIIcon } from './icons/UtsavAIIcon';

interface UtsavSahayakDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: UtsavEventState | null;
  onRebalance: (prompt: string) => Promise<void>;
  isRebalancing: boolean;
}

export const UtsavSahayakDrawer: React.FC<UtsavSahayakDrawerProps> = ({
  isOpen,
  onClose,
  state,
  onRebalance,
  isRebalancing,
}) => {
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickActionChips = [
    {
      id: 'guests',
      icon: Users,
      label: 'Welcome +25 more guests within budget',
      prompt: 'Welcome +25 more guests within budget. Recalibrate per-plate catering and seating allocations while keeping locked items fixed.',
    },
    {
      id: 'budget_cosy',
      icon: Percent,
      label: 'Make decor & flow 15% more budget-cosy',
      prompt: 'Make decor and venue styling 15% more budget-cosy by adopting local marigold, brass diyas, and ambient warm fairy lights without sacrificing food quality.',
    },
    {
      id: 'indoor',
      icon: Home,
      label: 'Adapt outdoor plan to cosy indoor flow',
      prompt: 'Adapt outdoor plan to cosy indoor flow. Shift weather contingency reserves toward acoustic styling and indoor banquet ambiance.',
    },
    {
      id: 'feast',
      icon: UtensilsCrossed,
      label: 'Blend or switch Regional Feast Palate',
      prompt: 'Rebalance the feast menu with rich live counters while keeping the perPlateBudgetINR ceiling strictly respected.',
    },
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isRebalancing) return;
    setInputText('');
    await onRebalance(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-cream-50 w-full max-w-lg rounded-t-[32px] sm:rounded-card overflow-hidden shadow-ambient-md max-h-[88vh] flex flex-col relative animate-slide-up border border-black/[0.06]">
        {/* Header */}
        <div className="p-4 bg-white border-b border-black/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Custom Brand AI Sparkle Logo Icon */}
            <div className="w-9 h-9 rounded-full bg-sageTeal text-white flex items-center justify-center shadow-ambient-sm">
              <UtsavAIIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-[18px] text-charcoal leading-tight">
                Utsav Sahayak
              </h3>
              <p className="text-[11px] text-charcoal-muted">
                Calm AI Celebration Architect & Real-Time Plan Rebalancer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-charcoal hover:bg-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Reassurance Banner */}
          <div className="p-3.5 rounded-subcard bg-white border border-sageTeal/20 shadow-ambient-sm flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sageTeal shrink-0 mt-0.5" />
            <div className="text-[12px] text-charcoal">
              <span className="font-semibold block">Proactive Comfort Shield Active</span>
              <p className="text-charcoal-muted mt-0.5 leading-snug">
                {state?.peaceOfMind?.calmReassuranceNote ||
                  'Your plan reserves a 10% financial comfort cushion and +10% extra plates buffer automatically.'}
              </p>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-charcoal-muted uppercase block px-1">
              One-Click Rebalancing Adjustments
            </span>
            <div className="space-y-2">
              {quickActionChips.map((chip) => {
                const Icon = chip.icon;
                return (
                  <button
                    key={chip.id}
                    disabled={isRebalancing}
                    onClick={() => handleSend(chip.prompt)}
                    className="w-full text-left p-3.5 rounded-subcard bg-white border border-black/[0.05] hover:border-sageTeal/50 shadow-ambient-sm transition-all flex items-center justify-between text-[12px] font-medium text-charcoal hover:bg-cream-100 disabled:opacity-50 group"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-charcoal-muted group-hover:text-sageTeal transition-colors" />
                      <span>{chip.label}</span>
                    </div>
                    <UtsavAIIcon className="w-4 h-4 text-sageTeal shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Previous Rebalancing Summary */}
          {state?.lastSahayakSummary && (
            <div className="p-3.5 rounded-subcard bg-white border border-black/[0.05] shadow-ambient-sm text-[12px] space-y-1">
              <span className="font-semibold text-charcoal block text-[11px] uppercase tracking-wide">
                Latest Rebalance Log
              </span>
              <p className="text-charcoal-muted leading-relaxed">
                {state.lastSahayakSummary}
              </p>
            </div>
          )}
        </div>

        {/* Natural Language Prompt Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-black/[0.05]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              disabled={isRebalancing}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
              placeholder="e.g. Add 20k to decor, reduce photography..."
              className="flex-1 bg-cream-50 border border-black/[0.06] rounded-full px-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal"
            />
            <button
              onClick={() => handleSend(inputText)}
              disabled={isRebalancing || !inputText.trim()}
              className="w-10 h-10 rounded-full bg-sageTeal text-white flex items-center justify-center hover:bg-sageTeal-dark transition-colors disabled:opacity-50 shrink-0 shadow-ambient-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {isRebalancing && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <UtsavAIIcon className="w-3.5 h-3.5 text-sageTeal animate-spin" />
              <p className="text-[11px] text-sageTeal text-center font-medium animate-pulse">
                Recalibrating event master plan...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UtsavSahayakDrawer;
