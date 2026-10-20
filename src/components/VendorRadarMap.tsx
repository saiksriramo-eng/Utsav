import React, { useState } from 'react';
import {
  MapPin,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  Search,
  Building,
  HelpCircle,
  PhoneCall,
  Check
} from 'lucide-react';
import { VendorItem, EventIntake } from '../types/utsav';
import { MAP_CATEGORIES } from '../constants/regionalVibes';
import { buildWhatsAppUrl } from '../utils/whatsappHelper';

interface VendorRadarMapProps {
  vendors: VendorItem[];
  intake: EventIntake;
  onUpdateVendorQuote: (
    vendorId: string,
    pinnedVendorName: string,
    quotedPriceINR: number,
    booked: boolean,
    serviceCategory: string
  ) => void;
}

export const VendorRadarMap: React.FC<VendorRadarMapProps> = ({
  vendors,
  intake,
  onUpdateVendorQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'Caterers' | 'Decorators' | 'Photographers' | 'Venues'
  >('Caterers');
  const [customAreaSearch, setCustomAreaSearch] = useState<string>(intake.city);

  const activeMeta =
    MAP_CATEGORIES.find((c) => c.serviceCategory === activeCategory) ||
    MAP_CATEGORIES[0];

  const searchQuery = `${activeMeta.queryTerm} near ${
    customAreaSearch.trim() || intake.city
  }`;

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    searchQuery
  )}&output=embed`;

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div>
        <h3 className="text-xl font-extrabold text-stone-900 font-festive flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-600" />
          Smart Local Vendor Radar & Actionable Checklist
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          Zero-key Google Maps locality radar paired with vetted price benchmarks, 3 diligence questions, and 1-click WhatsApp briefs.
        </p>
      </div>

      {/* Main Split Grid: Vendors Checklist on Left, Live Maps Radar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vendor Checklist & Action Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {vendors.map((vendor) => {
            const waUrl = buildWhatsAppUrl(intake, vendor);

            return (
              <div
                key={vendor.id}
                className={`p-6 rounded-3xl border transition-all ${
                  vendor.booked
                    ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-400/40 shadow-warm-sm'
                    : 'bg-white/95 border-stone-200/90 hover:border-amber-300 shadow-warm-sm'
                }`}
              >
                {/* Vendor Category & Estimated Budget */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {vendor.serviceCategory}
                    </span>
                    <h4 className="text-base font-extrabold text-stone-900 mt-1">
                      {vendor.taskTitle}
                    </h4>
                  </div>

                  <div className="text-right self-start sm:self-auto bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
                    <div className="text-[10px] font-bold text-stone-400 uppercase">Fair Price Benchmark</div>
                    <div className="text-xs font-extrabold text-amber-900">
                      {vendor.estimatedPriceRangeINR}
                    </div>
                  </div>
                </div>

                {/* 3 Practical Diligence Vetting Questions */}
                <div className="mb-4 p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/50">
                  <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-2">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    3 Diligence Questions for this Vendor
                  </div>
                  <ol className="space-y-1.5 text-xs text-stone-700 list-decimal list-inside leading-relaxed">
                    {vendor.vettingQuestions.map((q, qIdx) => (
                      <li key={qIdx}>{q}</li>
                    ))}
                  </ol>
                </div>

                {/* WhatsApp Action Button & Quoted Spend Form */}
                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* WhatsApp Direct Action */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-wa-${vendor.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm active:scale-95 shrink-0"
                    title="Open pre-filled WhatsApp brief"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send WhatsApp Brief</span>
                    <ExternalLink className="w-3 h-3 opacity-75" />
                  </a>

                  {/* Pin Vendor Quote Fields */}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      id={`input-vendor-name-${vendor.id}`}
                      value={vendor.pinnedVendorName || ''}
                      onChange={(e) =>
                        onUpdateVendorQuote(
                          vendor.id,
                          e.target.value,
                          vendor.quotedPriceINR,
                          vendor.booked,
                          vendor.serviceCategory
                        )
                      }
                      placeholder="Vendor name..."
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 w-32"
                    />
                    <input
                      type="number"
                      min="0"
                      step="500"
                      id={`input-vendor-price-${vendor.id}`}
                      value={vendor.quotedPriceINR || ''}
                      onChange={(e) =>
                        onUpdateVendorQuote(
                          vendor.id,
                          vendor.pinnedVendorName,
                          parseInt(e.target.value) || 0,
                          vendor.booked,
                          vendor.serviceCategory
                        )
                      }
                      placeholder="₹ Quote"
                      className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 w-24"
                    />
                    <button
                      type="button"
                      id={`btn-book-${vendor.id}`}
                      onClick={() =>
                        onUpdateVendorQuote(
                          vendor.id,
                          vendor.pinnedVendorName,
                          vendor.quotedPriceINR,
                          !vendor.booked,
                          vendor.serviceCategory
                        )
                      }
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        vendor.booked
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                      title={vendor.booked ? 'Booked' : 'Mark as Booked'}
                    >
                      {vendor.booked ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Booked</span>
                        </>
                      ) : (
                        <span>Mark Booked</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Zero-Key Google Maps Radar & Category Filters (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="bg-white/95 rounded-3xl border border-amber-200/90 shadow-warm-lg p-5 overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                Live Map Radar
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Zero-Key Local Embed
              </span>
            </div>

            {/* Editable Locality Search */}
            <div className="relative mb-3">
              <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                id="input-locality-search"
                value={customAreaSearch}
                onChange={(e) => setCustomAreaSearch(e.target.value)}
                placeholder="Change locality or landmark..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-stone-800"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {MAP_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.serviceCategory;
                return (
                  <button
                    key={cat.serviceCategory}
                    type="button"
                    id={`btn-map-filter-${cat.serviceCategory.toLowerCase()}`}
                    onClick={() => setActiveCategory(cat.serviceCategory)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition text-left truncate flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-warm-sm ring-1 ring-amber-500'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Embedded Google Maps Search Iframe */}
            <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-inner">
              <iframe
                id="iframe-vendor-radar-map"
                title={`Live Radar for ${activeCategory} in ${customAreaSearch || intake.city}`}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="text-[11px] text-stone-400 text-center mt-2.5">
              Live results rendered for "{searchQuery}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
