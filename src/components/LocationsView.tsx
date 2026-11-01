import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building,
  Camera,
  Utensils,
  Music,
  Palette
} from 'lucide-react';
import { UtsavEventState, VendorItem } from '../types/utsav';
import { VENUE_IMAGES } from '../constants/utsavData';
import { buildWhatsAppUrl } from '../utils/whatsappHelper';

interface LocationsViewProps {
  state: UtsavEventState | null;
  onBookVendor?: (vendorId: string) => void;
}

export const LocationsView: React.FC<LocationsViewProps> = ({
  state,
  onBookVendor,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const city = state?.intake?.city || 'Jaipur';
  const venueType = state?.intake?.venueType || 'Outdoor Lawn';

  const locationStops = [
    {
      id: 'loc-1',
      type: 'Bride Prep',
      name: 'Amway Grand Plaza Hotel',
      address: `187 Monroe Ave NW, Grand Rapids, MI (${city})`,
      duration: '30 Min',
      driveTime: '28 Min / 12.8 Miles',
      room: '339',
      gateCode: '2082',
      instructions: 'Park in Lot A on the NE Side',
    },
    {
      id: 'loc-2',
      type: 'Ceremony Venue',
      name: 'St. Peter\'s Cathedral',
      address: `450 Heritage Sanctuary Road, ${city}`,
      duration: '45 Min',
      driveTime: '15 Min / 6.2 Miles',
      room: 'Main Nave',
      gateCode: 'N/A',
      instructions: 'Enter via East Cloister Gate for VIPs',
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

  const vendorCategories = ['All', 'Caterers', 'Decorators', 'Photographers', 'Venues', 'Sound & Artist'];

  const filteredVendors = (state?.vendors || []).filter((v) => {
    if (activeCategory === 'All') return true;
    return v.serviceCategory === activeCategory;
  });

  return (
    <div className="pb-24 lg:pb-12">
      {/* Page Header */}
      <div className="px-1 mb-4">
        <h2 className="font-sans font-bold text-[18px] lg:text-[20px] text-charcoal">
          Locations & Logistics Radar
        </h2>
        <p className="text-[12px] text-charcoal-muted">
          Venues, prep stops, travel plan and verified local partners
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN (lg:col-span-7): MAIN STOPS & VENUE GALLERY
           ========================================================================= */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3.5">
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

                {/* Structured Notes on User-Specified #DE7356 Surface */}
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

          {/* Horizontal Venue Images Gallery */}
          <div className="rounded-card bg-white border border-black/[0.05] p-4 sm:p-5 shadow-ambient space-y-2">
            <h4 className="font-sans font-semibold text-[14px] text-charcoal">
              Venue & Site Gallery
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {VENUE_IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Site Preview"
                  className="w-full h-24 rounded-subcard object-cover border border-black/[0.06]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (lg:col-span-5): VERIFIED LOCAL VENDOR DIRECTORY
           ========================================================================= */}
        <div className="lg:col-span-5 rounded-card bg-white border border-black/[0.05] p-4 sm:p-5 shadow-ambient space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="font-sans font-semibold text-[15px] text-charcoal">
              Verified Vendor Directory
            </h4>
            <span className="text-[11px] text-charcoal-muted">
              1-Click WhatsApp Inquiries
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {vendorCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all ${
                  activeCategory === cat
                    ? 'bg-slateNavy text-white shadow-ambient-sm'
                    : 'bg-cream-100 text-charcoal hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vendor List */}
          <div className="space-y-2.5 pt-1">
            {filteredVendors.map((vendor) => {
              const whatsappUrl = state?.intake
                ? buildWhatsAppUrl(state.intake, vendor)
                : `https://wa.me/?text=${encodeURIComponent(vendor.taskTitle)}`;

              return (
                <div
                  key={vendor.id}
                  className="p-3.5 rounded-subcard bg-cream-50 border border-black/[0.04] space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-slateNavy/10 text-slateNavy text-[10px] font-bold uppercase tracking-wide">
                        {vendor.serviceCategory}
                      </span>
                      <h5 className="font-sans font-semibold text-[14px] text-charcoal mt-1">
                        {vendor.taskTitle}
                      </h5>
                      <p className="text-[12px] font-semibold text-terracotta mt-0.5">
                        Estimated: {vendor.estimatedPriceRangeINR}
                      </p>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 transition-colors shadow-ambient-sm"
                      title="Send WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Vetting Checklist Pills */}
                  {vendor.vettingQuestions && vendor.vettingQuestions.length > 0 && (
                    <div className="text-[11px] text-charcoal-muted border-t border-black/[0.04] pt-2 space-y-0.5">
                      <span className="font-semibold text-charcoal block text-[10px] uppercase">
                        Vetting Check:
                      </span>
                      <p className="line-clamp-2">
                        • {vendor.vettingQuestions[0]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsView;
