import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Bot,
  User,
  RefreshCw,
  X
} from 'lucide-react';
import { SahayakMessage } from '../types/utsav';

interface UtsavSahayakBarProps {
  history: SahayakMessage[];
  lastSummary: string;
  isRebalancing: boolean;
  onSendMessage: (text: string) => Promise<void>;
  onQuickAction: (actionKey: 'welcome_guests_25' | 'budget_cosy_15' | 'adapt_indoor' | 'cycle_regional_vibe') => Promise<void>;
}

export const UtsavSahayakBar: React.FC<UtsavSahayakBarProps> = ({
  history,
  lastSummary,
  isRebalancing,
  onSendMessage,
  onQuickAction
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isLogOpen, setIsLogOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isRebalancing) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <aside aria-label="Utsav Sahayak Co-Planner" className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        {/* Collapsible History Drawer */}
        {isLogOpen && (
          <div className="mb-2 bg-white/95 backdrop-blur-xl rounded-3xl border border-amber-200/90 shadow-warm-xl p-4 sm:p-6 max-h-[360px] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 font-festive">
                    Utsav Sahayak Conversation & Adjustment Log
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Sliding 10-turn window keeping host preferences synchronized.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLogOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Items */}
            {history.length === 0 ? (
              <div className="text-center py-6 text-xs text-stone-400 italic">
                No past adjustments yet. Try one of the quick chips or ask an adjustment question below!
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((msg) => {
                  const isHost = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isHost ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          isHost ? 'bg-stone-200 text-stone-700' : 'bg-amber-600 text-white'
                        }`}
                      >
                        {isHost ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isHost
                            ? 'bg-amber-100 text-amber-950 rounded-tr-none'
                            : 'bg-stone-100 text-stone-800 rounded-tl-none border border-stone-200/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 text-[10px] text-stone-400 mb-1">
                          <span className="font-bold">{msg.senderTag}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <div>{msg.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Main Floating Bar */}
        <div className="bg-stone-900/90 backdrop-blur-xl rounded-3xl border border-amber-400/30 shadow-2xl p-3 sm:p-4 text-white">
          {/* Quick Adjustment Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              type="button"
              id="chip-welcome-guests"
              disabled={isRebalancing}
              onClick={() => onQuickAction('welcome_guests_25')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-amber-500/30 text-stone-200 hover:text-white border border-white/15 transition whitespace-nowrap active:scale-95 disabled:opacity-40"
            >
              <span>✨ Welcome +25 more guests within budget</span>
            </button>
            <button
              type="button"
              id="chip-budget-cosy"
              disabled={isRebalancing}
              onClick={() => onQuickAction('budget_cosy_15')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-emerald-500/30 text-stone-200 hover:text-white border border-white/15 transition whitespace-nowrap active:scale-95 disabled:opacity-40"
            >
              <span>🌿 Make decor & flow 15% more budget-cosy</span>
            </button>
            <button
              type="button"
              id="chip-indoor-flow"
              disabled={isRebalancing}
              onClick={() => onQuickAction('adapt_indoor')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-blue-500/30 text-stone-200 hover:text-white border border-white/15 transition whitespace-nowrap active:scale-95 disabled:opacity-40"
            >
              <span>🏡 Adapt outdoor plan to cosy indoor flow</span>
            </button>
            <button
              type="button"
              id="chip-cycle-vibe"
              disabled={isRebalancing}
              onClick={() => onQuickAction('cycle_regional_vibe')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-rose-500/30 text-stone-200 hover:text-white border border-white/15 transition whitespace-nowrap active:scale-95 disabled:opacity-40"
            >
              <span>🍛 Switch or blend Regional Feast Palate</span>
            </button>
          </div>

          {/* Input Row & History Toggle */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
            <button
              type="button"
              id="btn-toggle-sahayak-history"
              onClick={() => setIsLogOpen(!isLogOpen)}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition shrink-0"
              title={isLogOpen ? 'Collapse conversation log' : 'Open conversation log'}
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                id="input-sahayak-rebalance"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isRebalancing}
                placeholder={
                  isRebalancing
                    ? 'Utsav Sahayak is recalibrating your masterplan...'
                    : 'Ask Utsav Sahayak to adjust anything (e.g., "Add a live jalebi wok", "Focus on acoustic sunset lighting")...'
                }
                className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs sm:text-sm text-white placeholder-stone-400 font-medium disabled:opacity-50"
              />
              {isRebalancing && (
                <div className="absolute right-3 top-3">
                  <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                </div>
              )}
            </div>

            <button
              type="submit"
              id="btn-submit-sahayak"
              disabled={!inputText.trim() || isRebalancing}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold transition shadow-warm-md shrink-0 active:scale-95 disabled:opacity-40"
              title="Send to Utsav Sahayak"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Last Adjustment Summary Badge */}
          {lastSummary && (
            <div className="mt-2 text-[11px] text-amber-200/90 truncate flex items-center gap-1.5 px-2">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{lastSummary}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
