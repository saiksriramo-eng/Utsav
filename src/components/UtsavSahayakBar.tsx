import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  RefreshCw,
  X,
  ChevronDown,
  Maximize2,
  Minimize2,
  Calendar,
  Users,
  Wallet,
  Sparkles,
  Building,
  Utensils
} from 'lucide-react';
import { SahayakMessage, EventIntake } from '../types/utsav';

interface UtsavSahayakBarProps {
  history: SahayakMessage[];
  lastSummary: string;
  isRebalancing: boolean;
  onSendMessage: (text: string) => Promise<void>;
  onQuickAction: (
    actionKey:
      | 'welcome_guests_25'
      | 'budget_cosy_15'
      | 'adapt_indoor'
      | 'cycle_regional_vibe'
      | 'add_budget_50k'
  ) => Promise<void>;
  intake?: EventIntake;
}

export const UtsavSahayakBar: React.FC<UtsavSahayakBarProps> = ({
  history,
  lastSummary,
  isRebalancing,
  onSendMessage,
  onQuickAction,
  intake
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [dismissedSummary, setDismissedSummary] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isToastVisible = Boolean(lastSummary && lastSummary !== dismissedSummary);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen, isRebalancing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isRebalancing) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <aside aria-label="Utsav Sahayak AI Co-Planner" className="fixed bottom-6 right-6 z-50">
      {/* 1. COLLAPSED VIEW: Floating Bottom-Right Action Button */}
      {!isOpen && (
        <div className="flex flex-col items-end gap-2.5 animate-fade-in">
          {/* Recent Summary Floating Toast */}
          {isToastVisible && (
            <div
              onClick={() => setIsOpen(true)}
              className="max-w-[320px] p-3 rounded-2xl bg-white border border-orange-300 text-stone-800 shadow-xl text-xs flex items-center justify-between gap-2.5 cursor-pointer hover:border-orange-500 transition-all group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="truncate text-stone-800 font-semibold">{lastSummary}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDismissedSummary(lastSummary);
                }}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-full shrink-0"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Floating Action Button (FAB) */}
          <div className="relative group">
            <button
              type="button"
              id="btn-open-sahayak-chat"
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white shadow-warm-xl flex items-center justify-center border-2 border-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              title="Open Utsav Sahayak"
            >
              {isRebalancing ? (
                <RefreshCw className="w-7 h-7 text-white animate-spin" />
              ) : (
                <Bot className="w-7 h-7 text-white" />
              )}

              {/* Active Indicator Ring */}
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
              </span>
            </button>

            {/* Hover Tooltip */}
            <div className="hidden sm:group-hover:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white text-orange-950 text-xs font-bold whitespace-nowrap border border-orange-300 shadow-md items-center gap-1.5 pointer-events-none">
              <Bot className="w-3.5 h-3.5 text-orange-600" />
              <span>Ask Utsav Sahayak</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXPANDED VIEW: White & Orange Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`w-[calc(100vw-2rem)] ${
            isExpanded
              ? 'sm:w-[720px] md:w-[780px] h-[85vh]'
              : 'sm:w-[500px] md:w-[540px] h-[640px] max-h-[85vh]'
          } bg-white border-2 border-orange-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-900 animate-slide-up transition-all duration-300`}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl shadow-inner shrink-0 border border-white/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white tracking-wide">
                    Utsav Sahayak
                  </h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                    Live Co-Planner
                  </span>
                </div>
                <p className="text-[11px] text-orange-100 flex items-center gap-1.5 mt-0.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Interactive Celebration Assistant</span>
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 text-white/90">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/20 transition"
                title={isExpanded ? 'Restore window size' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition"
                title="Minimize chatbot"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition"
                title="Close chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Synced Metrics Strip */}
          {intake && (
            <div className="px-5 py-2.5 bg-orange-50/80 border-b border-orange-100 text-xs flex items-center justify-between gap-3 text-stone-700">
              <div className="flex items-center gap-4 truncate">
                <div className="flex items-center gap-1.5 text-orange-800 font-extrabold">
                  <Wallet className="w-3.5 h-3.5 text-orange-600" />
                  <span>₹{intake.totalBudgetINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-700 font-semibold">
                  <Users className="w-3.5 h-3.5 text-orange-600" />
                  <span>{intake.guestCount} Guests</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-stone-600 truncate">
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  <span className="truncate">{intake.city}</span>
                </div>
              </div>
              <div className="text-[11px] font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full border border-orange-200 shrink-0">
                Comfort Cushion: ₹{Math.round(intake.totalBudgetINR * 0.1).toLocaleString('en-IN')}
              </div>
            </div>
          )}

          {/* Quick Action Suggestion Chips - Pill Shaped */}
          <div className="px-4 py-2.5 bg-stone-50/90 border-b border-orange-100">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
              <button
                type="button"
                disabled={isRebalancing}
                onClick={() => onQuickAction('add_budget_50k')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-50 text-orange-800 border border-orange-300 font-semibold transition whitespace-nowrap active:scale-95 disabled:opacity-40 shadow-sm"
              >
                <Wallet className="w-3.5 h-3.5 text-orange-600" />
                <span>+₹50,000 Budget</span>
              </button>
              <button
                type="button"
                disabled={isRebalancing}
                onClick={() => onQuickAction('welcome_guests_25')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-50 text-orange-800 border border-orange-300 font-semibold transition whitespace-nowrap active:scale-95 disabled:opacity-40 shadow-sm"
              >
                <Users className="w-3.5 h-3.5 text-orange-600" />
                <span>Welcome +25 guests</span>
              </button>
              <button
                type="button"
                disabled={isRebalancing}
                onClick={() => onQuickAction('budget_cosy_15')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-50 text-orange-800 border border-orange-300 font-semibold transition whitespace-nowrap active:scale-95 disabled:opacity-40 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>15% budget-cosy decor</span>
              </button>
              <button
                type="button"
                disabled={isRebalancing}
                onClick={() => onQuickAction('adapt_indoor')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-50 text-orange-800 border border-orange-300 font-semibold transition whitespace-nowrap active:scale-95 disabled:opacity-40 shadow-sm"
              >
                <Building className="w-3.5 h-3.5 text-orange-600" />
                <span>Adapt to indoor flow</span>
              </button>
              <button
                type="button"
                disabled={isRebalancing}
                onClick={() => onQuickAction('cycle_regional_vibe')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-50 text-orange-800 border border-orange-300 font-semibold transition whitespace-nowrap active:scale-95 disabled:opacity-40 shadow-sm"
              >
                <Utensils className="w-3.5 h-3.5 text-orange-600" />
                <span>Switch regional feast</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-600">
                <div className="w-14 h-14 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-600 mb-3 shadow-inner">
                  <Bot className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  How can I help with your celebration?
                </h4>
                <p className="text-xs text-stone-600 max-w-xs leading-relaxed mb-4">
                  Request budget changes, update guest counts, modify food stations, or adjust schedules. Locked items remain preserved.
                </p>
                <div className="text-xs text-stone-600 space-y-1.5 bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200/80 max-w-sm">
                  <div>Try: <span className="text-orange-700 font-bold">"Increase the budget price by (+50,000)"</span></div>
                  <div>Or: <span className="text-orange-700 font-bold">"increase guests by +32 members"</span></div>
                </div>
              </div>
            ) : (
              history.map((msg) => {
                const isHost = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isHost ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isHost ? 'bg-orange-100 text-orange-800 border border-orange-300' : 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-sm'
                      }`}
                    >
                      {isHost ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                        isHost
                          ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-tr-none'
                          : 'bg-orange-50/70 text-stone-800 rounded-tl-none border border-orange-200'
                      }`}
                    >
                      <div className={`flex items-center justify-between gap-3 text-[10px] mb-1 font-semibold ${
                        isHost ? 'text-orange-100' : 'text-stone-500'
                      }`}>
                        <span>{msg.senderTag}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div className="whitespace-pre-wrap">
                        {msg.text
                          .replace(/^Dear\s+host,?\s*(?:your\s+)?(?:Aarav\s*&\s*Meera\s*[\w\s]*\s+is\s+)?/i, '')
                          .replace(/Dear host,?\s*/gi, '')
                          .replace(/Aarav & Meera Sangeet Utsav/gi, 'Celebration')
                          .replace(/Aarav & Meera/gi, 'Celebration')}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Rebalancing Indicator */}
            {isRebalancing && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-900 text-xs animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-orange-600 shrink-0" />
                <span className="font-medium">Harmonizing your budget, guest count, and event schedule...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form onSubmit={handleSubmit} className="p-3.5 bg-stone-50 border-t border-orange-100 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                id="input-sahayak-rebalance"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isRebalancing}
                placeholder={
                  isRebalancing
                    ? 'Updating your celebration plan...'
                    : 'Ask Sahayak (e.g., "increase guests by +32 members", "add 50k to budget")...'
                }
                className="w-full pl-4 pr-11 py-3 rounded-full bg-white border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs sm:text-sm text-stone-900 placeholder-stone-400 font-medium disabled:opacity-50 shadow-sm"
              />
              {isRebalancing && (
                <div className="absolute right-3.5 top-3.5">
                  <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
                </div>
              )}
            </div>

            <button
              type="submit"
              id="btn-submit-sahayak"
              disabled={!inputText.trim() || isRebalancing}
              className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold transition shadow-warm-sm shrink-0 active:scale-95 disabled:opacity-40 cursor-pointer"
              title="Send to Utsav Sahayak"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
