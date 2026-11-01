import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Search,
  MessageCircle,
  HelpCircle,
  Check,
  Building,
  Camera,
  Utensils,
  Music,
  Palette,
  Sparkles,
  Layers,
  PhoneCall
} from 'lucide-react';
import { UtsavEventState, VendorItem } from '../types/utsav';
import { VENUE_IMAGES } from '../constants/utsavData';
import { buildWhatsAppUrl } from '../utils/whatsappHelper';

interface LocationsViewProps {
  state: UtsavEventState | null;
  onBookVendor?: (vendorId: string) => void;
}

type MapServiceCategory = 'Decorators' | 'Caterers' | 'Photographers' | 'Venues' | 'Sound';

interface RadarCategoryMeta {
  id: MapServiceCategory;
  label: string;
  queryTerm: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
}

const RADAR_CATEGORIES: RadarCategoryMeta[] = [
  {
    id: 'Decorators',
    label: 'Decorators & Mandap',
    queryTerm: 'wedding decorators florists mandap',
    icon: Palette,
    badgeColor: 'bg-terracotta text-white',
  },
  {
    id: 'Caterers',
    label: 'Catering & Halwai',
    queryTerm: 'wedding caterers catering services halwai',
    icon: Utensils,
    badgeColor: 'bg-goldenOchre text-white',
  },
  {
    id: 'Photographers',
    label: 'Photography & Studios',
    queryTerm: 'wedding photographers videographers studio',
    icon: Camera,
    badgeColor: 'bg-slateNavy text-white',
  },
  {
    id: 'Venues',
    label: 'Banquet Halls & Venues',
    queryTerm: 'banquet halls marriage gardens wedding resort',
    icon: Building,
    badgeColor: 'bg-sageTeal text-white',
  },
  {
    id: 'Sound',
    label: 'DJ, Sound & Lights',
    queryTerm: 'wedding DJ sound system stage lighting dhol',
    icon: Music,
    badgeColor: 'bg-coralAccent text-white',
  },
];

export const LocationsView: React.FC<LocationsViewProps> = ({
  state,
  onBookVendor,
}) => {
  const city = state?.intake?.city || 'Jaipur';
  const venueType = state?.intake?.venueType || 'Outdoor Lawn';

  // Sub-tab view: Map Radar vs Venue Stops
  const [activeSubTab, setActiveSubTab] = useState<'map' | 'stops'>('map');
  const [activeCategory, setActiveCategory] = useState<MapServiceCategory>('Decorators');
  const [customAreaSearch, setCustomAreaSearch] = useState<string>(city);
  const [bookedMap, setBookedMap] = useState<Record<string, boolean>>({});

  const activeCategoryMeta =
    RADAR_CATEGORIES.find((c) => c.id === activeCategory) || RADAR_CATEGORIES[0];

  const effectiveLocality = customAreaSearch.trim() || city;
  const searchQuery = `${activeCategoryMeta.queryTerm} in ${effectiveLocality}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    searchQuery
  )}&output=embed`;
  const openExternalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    searchQuery
  )}`;

  const toggleBooked = (vendorId: string) => {
    setBookedMap((prev) => ({
      ...prev,
      [vendorId]: !prev[vendorId],
    }));
    if (onBookVendor) {
      onBookVendor(vendorId);
    }
  };

  const locationStops = [
    {
      id: 'loc-1',
      type: 'Bride Prep',
      name: 'Amway Grand Plaza Hotel',
      address: `187 Monroe Ave NW, (${city})`,
      duration: '30 Min',
      driveTime: '28 Min / 12.8 Miles',
      room: '339',
      gateCode: '2082',
      instructions: 'Park in Lot A on the NE Side',
    },
    {
      id: 'loc-2',
      type: 'Ceremony Venue',
      name: 'Heritage Palace Sanctuary',
      address: `450 Heritage Sanctuary Road, ${city}`,
      duration: '45 Min',
      driveTime: '15 Min / 6.2 Miles',
      room: 'Main Mandap Courtyard',
      gateCode: 'N/A',
      instructions: 'Enter via East Cloister Gate for VIPs and Barat',
    },
    {
      id: 'loc-3',
      type: 'Reception & Feast',
      name: `Grand Palace ${venueType}`,
      address: `Royal Courtyard, Sector 4, ${city}`,
      duration: '4 Hours',
      driveTime: '20 Min / 9.4 Miles',
      room: 'Royal Pavilion',
      gateCode: '7741',
      instructions: 'Catering entrance at North Loading Dock B',
    },
  ];

  const vendors = state?.vendors || [];
  const filteredVendors = vendors.filter((v) => {
    if (activeCategory === 'Decorators') return v.serviceCategory === 'Decorators';
    if (activeCategory === 'Caterers') return v.serviceCategory === 'Caterers';
    if (activeCategory === 'Photographers') return v.serviceCategory === 'Photographers';
    if (activeCategory === 'Venues') return v.serviceCategory === 'Venues';
    return true;
  });

  return (
    <div className="pb-24 lg:pb-12 space-y-5">
      {/* =========================================================================
          TOP SUB-NAV / VIEW SWITCHER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-card border border-black/[0.05] shadow-ambient-sm">
        <div>
          <h2 className="font-display font-semibold text-[20px] text-charcoal flex items-center gap-2 leading-tight">
            <MapPin className="w-5 h-5 text-terracotta" />
            Nearby Centres & Logistics Radar
          </h2>
          <p className="text-[12px] text-charcoal-muted mt-0.5">
            Zero-key live Google Maps showing nearby decoration, catering, photography & venues in {city}.
          </p>
        </div>

        {/* View Toggle Pill */}
        <div className="inline-flex items-center p-1 rounded-full bg-cream-100 border border-black/[0.05] self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveSubTab('map')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'map'
                ? 'bg-sageTeal text-white shadow-ambient-sm'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Inbuilt Radar Map</span>
          </button>
          <button
            onClick={() => setActiveSubTab('stops')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'stops'
                ? 'bg-sageTeal text-white shadow-ambient-sm'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Venue Stops & Access</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: INBUILT LIVE MAP RADAR (The core requested feature!)
         ========================================================================= */}
      {activeSubTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLS: INTERACTIVE LIVE MAP & SEARCH CONTROLS */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-card border border-black/[0.05] p-4 sm:p-5 shadow-ambient space-y-4">
              {/* Category Filter Buttons */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted block mb-2">
                  Select Service to Locate Nearby:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {RADAR_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = activeCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`p-2.5 rounded-subcard text-left transition-all flex items-center gap-2 border text-[12px] font-semibold ${
                          isSelected
                            ? 'bg-sageTeal text-white border-sageTeal shadow-ambient-sm'
                            : 'bg-cream-50 text-charcoal border-black/[0.06] hover:bg-cream-100'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-sageTeal'}`} />
                        <span className="truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Locality / Landmark Search Input */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-terracotta absolute left-3.5 top-3 shrink-0" />
                  <input
                    type="text"
                    value={customAreaSearch}
                    onChange={(e) => setCustomAreaSearch(e.target.value)}
                    placeholder="Enter city, landmark, or neighborhood (e.g. Mansarovar, Jaipur)..."
                    className="w-full bg-cream-50/80 border border-black/[0.08] rounded-subcard pl-10 pr-3 py-2 text-[12px] font-medium text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal"
                  />
                </div>

                <a
                  href={openExternalMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-subcard bg-cream-100 hover:bg-cream-200 text-charcoal text-[12px] font-semibold flex items-center justify-center gap-1.5 border border-black/[0.06] transition-all shrink-0"
                  title="Open full Google Maps in new window"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sageTeal" />
                  <span>Google Maps App</span>
                </a>
              </div>

              {/* Inbuilt Interactive Google Maps Iframe */}
              <div className="relative w-full h-[420px] sm:h-[480px] rounded-subcard overflow-hidden border border-black/[0.08] shadow-inner bg-cream-100">
                <iframe
                  id="iframe-inbuilt-vendor-map"
                  title={`Live Inbuilt Map for ${activeCategory} in ${effectiveLocality}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating Map Status Overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-black/[0.08] px-3 py-1.5 rounded-full shadow-ambient-sm flex items-center gap-2 text-[11px] font-semibold text-charcoal">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Results: {searchQuery}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: VERIFIED VENDOR CHECKLIST & 1-CLICK BRIEFS */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-card border border-black/[0.05] p-4 sm:p-5 shadow-ambient space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-semibold text-[15px] text-charcoal">
                    {activeCategoryMeta.label}
                  </h4>
                  <p className="text-[11px] text-charcoal-muted">
                    Vetted benchmarks & 1-click WhatsApp inquiry
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-sageTeal/15 text-sageTeal text-[11px] font-bold">
                  {filteredVendors.length} Listed
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {filteredVendors.map((vendor) => {
                  const isBooked = bookedMap[vendor.id] || vendor.booked;
                  const waUrl = state?.intake
                    ? buildWhatsAppUrl(state.intake, vendor)
                    : `https://wa.me/?text=${encodeURIComponent(vendor.taskTitle)}`;

                  return (
                    <div
                      key={vendor.id}
                      className={`p-3.5 rounded-subcard border transition-all ${
                        isBooked
                          ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300/40'
                          : 'bg-cream-50 border-black/[0.05] hover:bg-cream-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="px-2 py-0.5 rounded-full bg-slateNavy/10 text-slateNavy text-[10px] font-bold uppercase tracking-wide">
                            {vendor.serviceCategory}
                          </span>
                          <h5 className="font-sans font-semibold text-[14px] text-charcoal mt-1">
                            {vendor.taskTitle}
                          </h5>
                          <p className="text-[12px] font-semibold text-terracotta mt-0.5">
                            Fair Benchmark: {vendor.estimatedPriceRangeINR}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleBooked(vendor.id)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                            isBooked
                              ? 'bg-emerald-600 text-white shadow-ambient-sm'
                              : 'bg-white border border-black/[0.08] text-charcoal hover:bg-cream-200'
                          }`}
                        >
                          {isBooked ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Booked</span>
                            </>
                          ) : (
                            <span>Mark Booked</span>
                          )}
                        </button>
                      </div>

                      {/* 3 Diligence Questions */}
                      {vendor.vettingQuestions && vendor.vettingQuestions.length > 0 && (
                        <div className="mb-3 p-2.5 rounded-subcard bg-white/80 border border-black/[0.04] text-[11px] text-charcoal space-y-1">
                          <span className="font-semibold text-charcoal block text-[10px] uppercase text-sageTeal flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" /> Diligence Check:
                          </span>
                          <ul className="list-disc list-inside space-y-0.5 text-charcoal-muted">
                            {vendor.vettingQuestions.slice(0, 2).map((q, qIdx) => (
                              <li key={qIdx} className="leading-tight truncate">
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* WhatsApp Brief Action */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-subcard bg-[#25D366] hover:bg-[#20ba59] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-ambient-sm transition-all"
                        title="Open WhatsApp with pre-drafted event inquiry"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send WhatsApp Brief</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: VENUE STOPS & ACCESS (Run-of-show logistics)
         ========================================================================= */}
      {activeSubTab === 'stops' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Stops Column */}
          <div className="lg:col-span-7 space-y-3.5">
            {locationStops.map((stop) => (
              <div
                key={stop.id}
                className="rounded-card bg-white border border-black/[0.05] p-4 sm:p-5 shadow-ambient space-y-3"
              >
                <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sageTeal" />
                    <h4 className="font-sans font-semibold text-[15px] text-charcoal">
                      {stop.type}
                    </h4>
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-sageTeal/15 text-sageTeal text-[12px] font-bold">
                    {stop.duration}
                  </span>
                </div>

                {/* Address Details */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sageTeal shrink-0 mt-0.5" />
                  <div className="text-[13px] text-charcoal">
                    <p className="font-semibold">{stop.name}</p>
                    <p className="text-charcoal-muted text-[12px]">{stop.address}</p>
                  </div>
                </div>

                {/* Drive Time & Street View Button */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[12px] text-charcoal-muted font-medium flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-sageTeal" />
                    {stop.driveTime}
                  </span>

                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${stop.name} ${city}`
                        )}`,
                        '_blank'
                      )
                    }
                    className="px-3.5 py-1 rounded-full border border-charcoal/30 text-charcoal text-[12px] font-medium hover:bg-cream-100 flex items-center gap-1 transition-all"
                  >
                    <ExternalLink className="w-3 h-3 text-sageTeal" />
                    Street View
                  </button>
                </div>

                {/* Structured Notes on Coral Accent Surface */}
                <div className="rounded-subcard bg-coralAccent text-white p-3.5 space-y-1 text-[12px] shadow-ambient-sm">
                  <div className="font-semibold uppercase text-[10px] tracking-wide text-white/90">
                    Access & Security
                  </div>
                  <p>
                    <span className="text-white/80 font-medium">Room Number: </span>
                    <span className="font-bold">{stop.room}</span>
                  </p>
                  <p>
                    <span className="text-white/80 font-medium">Gate Code: </span>
                    <span className="font-bold">{stop.gateCode}</span>
                  </p>
                  <p>
                    <span className="text-white/80 font-medium">Instructions: </span>
                    <span>{stop.instructions}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Venue Gallery Column */}
          <div className="lg:col-span-5 rounded-card bg-white border border-black/[0.05] p-4 sm:p-5 shadow-ambient space-y-3">
            <h4 className="font-sans font-semibold text-[15px] text-charcoal">
              Venue & Site Gallery
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {VENUE_IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Site Preview ${i + 1}`}
                  className="w-full h-36 rounded-subcard object-cover border border-black/[0.06]"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsView;
