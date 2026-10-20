import React from 'react';
import {
  IndianRupee,
  Lock,
  Unlock,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Users,
  PiggyBank,
  Wallet
} from 'lucide-react';
import { BudgetAllocationItem } from '../types/utsav';

interface BudgetEngineProps {
  budgetItems: BudgetAllocationItem[];
  totalBudgetINR: number;
  costPerGuestINR: number;
  guestCount: number;
  onToggleLock: (id: string) => void;
  onUpdateActualSpent: (id: string, amount: number) => void;
}

export const BudgetEngine: React.FC<BudgetEngineProps> = ({
  budgetItems,
  totalBudgetINR,
  costPerGuestINR,
  guestCount,
  onToggleLock,
  onUpdateActualSpent
}) => {
  const totalAllocated = budgetItems.reduce((acc, curr) => acc + curr.allocatedINR, 0);
  const totalActual = budgetItems.reduce((acc, curr) => acc + (curr.actualSpentINR || 0), 0);
  const overallVariance = totalBudgetINR - totalActual;

  const getCategoryColor = (categoryName: string): string => {
    if (categoryName.includes('Catering')) return 'from-amber-500 to-amber-600';
    if (categoryName.includes('Venue')) return 'from-rose-500 to-rose-600';
    if (categoryName.includes('Decor')) return 'from-fuchsia-500 to-purple-600';
    if (categoryName.includes('Photo')) return 'from-indigo-500 to-indigo-600';
    if (categoryName.includes('Sound')) return 'from-sky-500 to-blue-600';
    if (categoryName.includes('Logistics')) return 'from-stone-500 to-stone-600';
    if (categoryName.includes('Comfort Cushion') || categoryName.includes('Peace-of-Mind'))
      return 'from-emerald-500 to-emerald-600';
    return 'from-amber-500 to-rose-500';
  };

  return (
    <div className="space-y-6">
      {/* Top Level Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget Card */}
        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-warm-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Event Budget</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-stone-900">
            ₹{totalBudgetINR.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            Allocated: ₹{totalAllocated.toLocaleString('en-IN')} (100%)
          </div>
        </div>

        {/* Cost Per Guest KPI */}
        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-warm-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Per-Guest Investment</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-blue-900">
            ₹{costPerGuestINR.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            Across {guestCount} expected guests
          </div>
        </div>

        {/* Actual Logged Spend */}
        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-warm-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Actual Logged Spend</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-900">
            ₹{totalActual.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            From pinned vendor quotes
          </div>
        </div>

        {/* Live Variance */}
        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-warm-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Financial Cushion Status</span>
            <div
              className={`p-2 rounded-xl ${
                overallVariance >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {overallVariance >= 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            </div>
          </div>
          <div
            className={`text-2xl font-extrabold ${
              overallVariance >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {overallVariance >= 0 ? '+' : ''}₹{overallVariance.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {overallVariance >= 0 ? 'Comfortably within budget' : 'Over budget allocation'}
          </div>
        </div>
      </div>

      {/* Itemized Category Breakdown & Lock Toggles */}
      <div className="bg-white/95 rounded-3xl border border-amber-200/90 shadow-warm-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900 font-festive">
              Dynamic Category Allocation & Spend Sync
            </h3>
            <p className="text-xs text-stone-500">
              Lock fixed quotes to shield them during AI rebalances. Pinned vendor quotes sync automatically.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Click lock icon to hold category constant</span>
          </div>
        </div>

        <div className="space-y-4">
          {budgetItems.map((item) => {
            const isCushion = item.categoryName.includes('Cushion') || item.categoryName.includes('Peace-of-Mind');
            const percentOfTotal = ((item.allocatedINR / totalBudgetINR) * 100).toFixed(1);
            const spentPercent = item.allocatedINR > 0 ? Math.min(100, Math.round((item.actualSpentINR / item.allocatedINR) * 100)) : 0;
            const itemVariance = item.allocatedINR - item.actualSpentINR;

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition ${
                  isCushion
                    ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400/30'
                    : item.isLocked
                    ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                    : 'bg-white hover:bg-stone-50/60 border-stone-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    {/* Lock Toggle Button */}
                    {!isCushion ? (
                      <button
                        type="button"
                        id={`btn-lock-${item.id}`}
                        onClick={() => onToggleLock(item.id)}
                        className={`p-2 rounded-xl transition ${
                          item.isLocked
                            ? 'bg-amber-600 text-white shadow-warm-sm'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-500'
                        }`}
                        title={item.isLocked ? 'Category locked from AI changes' : 'Click to lock this category'}
                      >
                        {item.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                    ) : (
                      <div className="p-2 rounded-xl bg-emerald-600 text-white">
                        <Lock className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{item.categoryName}</span>
                        {item.isLocked && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                            Locked
                          </span>
                        )}
                        {isCushion && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                            Protected Buffer
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{item.notes}</p>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="flex items-center gap-4 text-right self-end sm:self-auto">
                    <div>
                      <div className="text-xs text-stone-400 font-medium">Target Allocation</div>
                      <div className="text-sm font-extrabold text-stone-900">
                        ₹{item.allocatedINR.toLocaleString('en-IN')}{' '}
                        <span className="text-[11px] font-normal text-stone-500">({percentOfTotal}%)</span>
                      </div>
                    </div>

                    {!isCushion && (
                      <div className="w-32">
                        <div className="text-xs text-stone-400 font-medium text-left">Actual Spent (₹)</div>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          id={`input-actual-${item.id}`}
                          value={item.actualSpentINR || ''}
                          onChange={(e) =>
                            onUpdateActualSpent(item.id, Math.max(0, parseInt(e.target.value) || 0))
                          }
                          placeholder="Log quote..."
                          className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Allocation Progress Bar */}
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden mb-1">
                  <div
                    className={`h-full bg-gradient-to-r ${getCategoryColor(item.categoryName)} rounded-full transition-all`}
                    style={{ width: `${percentOfTotal}%` }}
                  />
                </div>

                {/* Sub-bar showing actual spent ratio if logged */}
                {!isCushion && item.actualSpentINR > 0 && (
                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>
                      Spend utilized: <strong>{spentPercent}%</strong> of allocated
                    </span>
                    <span
                      className={`font-semibold ${
                        itemVariance >= 0 ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {itemVariance >= 0
                        ? `Under by ₹${itemVariance.toLocaleString('en-IN')}`
                        : `Over by ₹${Math.abs(itemVariance).toLocaleString('en-IN')}`}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
