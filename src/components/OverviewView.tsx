import React, { useState } from 'react';
import {
  Package,
  MapPin,
  Heart,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  Navigation,
  Lock,
  Unlock,
  ExternalLink,
  ShieldAlert,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { UtsavEventState, BudgetAllocationItem } from '../types/utsav';
import {
  UTSAV_CREW,
  UTSAV_FAMILY,
  VENUE_IMAGES
} from '../constants/utsavData';
import { generateAvatarSvg } from '../utils/avatarHelper';

interface OverviewViewProps {
  state: UtsavEventState | null;
  onUpdateActualSpent?: (categoryId: string, amount: number) => void;
  onToggleLock?: (categoryId: string) => void;
  onOpenStreetView?: (locationName: string) => void;
  onOpenSahayak?: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  state,
  onUpdateActualSpent,
  onToggleLock,
  onOpenStreetView,
  onOpenSahayak,
}) => {
  // Accordion open/close states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    package: true,
    locations: true,
    couple: true,
    family: true,
    details: true,
  });

  const [expandedLocations, setExpandedLocations] = useState<Record<string, boolean>>({
    prep: true,
    ceremony: false,
    reception: false,
  });

  const [expandedDetailsRows, setExpandedDetailsRows] = useState<Record<string, boolean>>({
    wedding: true,
    reception: false,
    floorplans: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const coupleName = state?.intake?.eventName || 'Kristina & Steven';
  const totalBudget = state?.intake?.totalBudgetINR || 800000;
  const comfortCushion = state?.peaceOfMind?.comfortCushionINR || Math.round(totalBudget * 0.1);
  const city = state?.intake?.city || 'Jaipur';
  const venueType = state?.intake?.venueType || 'Outdoor Lawn';

  // Wedding style and colors
  const weddingColors = state?.themeConcepts?.[state.selectedThemeIndex]?.colorPaletteHex || [
    '#D96B52',
    '#4A7B76',
    '#2C3844',
    '#E59852',
  ];

  return (
    <div className="pb-24 lg:pb-12">
      {/* Grid wrapper: 1 column on mobile, 12 columns on laptop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN (lg:col-span-7): PACKAGE & BUDGET, LOCATIONS & TRAVEL PLAN
           ========================================================================= */}
        <div className="lg:col-span-7 space-y-4 lg:space-y-6">
          {/* =========================================================================
              SECTION 1: PACKAGE CARD (DEEP SLATE / NAVY #2C3844)
             ========================================================================= */}
          <section
            id="section-package"
            className="rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden"
          >
            {/* Coloured Header Bar */}
            <div
              onClick={() => toggleSection('package')}
              className="bg-slateNavy text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/90">
                <Plus className="w-3.5 h-3.5" />
              </div>

              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-white" />
                <span className="font-sans font-medium text-[15px] tracking-wide">
                  Package & Budget
                </span>
              </div>

              <button className="text-white/80 hover:text-white">
                {openSections.package ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {openSections.package && (
              <div className="p-4 sm:p-5 space-y-4">
                {/* Story Package Title Badge */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-charcoal-muted uppercase">
                      Service Plan
                    </span>
                    <h3 className="font-sans font-semibold text-[16px] text-charcoal">
                      Story Package & Financial Plan
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slateNavy/10 text-slateNavy text-[12px] font-semibold">
                    8 hrs coverage
                  </span>
                </div>

                {/* 3-Column Timing / Budget Row */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-subcard bg-cream-50 border border-black/[0.04] text-center">
                  <div>
                    <p className="text-[11px] font-medium text-charcoal-muted">Starts / Budget</p>
                    <p className="text-[14px] font-semibold text-charcoal mt-0.5">
                      1:00 PM
                    </p>
                    <p className="text-[11px] text-charcoal-muted font-medium">
                      ₹{totalBudget.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="border-x border-black/[0.06] px-1">
                    <p className="text-[11px] font-medium text-charcoal-muted">Ends / Cushion</p>
                    <p className="text-[14px] font-bold text-coralAccent mt-0.5">
                      9:00 PM
                    </p>
                    <p className="text-[11px] font-semibold text-coralAccent">
                      ₹{comfortCushion.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-charcoal-muted">Duration</p>
                    <p className="text-[14px] font-semibold text-charcoal mt-0.5">
                      8 hrs
                    </p>
                    <p className="text-[11px] text-sageTeal font-semibold">
                      {state?.intake?.guestCount || 150} Guests
                    </p>
                  </div>
                </div>

                {/* Category Breakdown on User-Specified #DE7356 Nested Surface */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-charcoal">
                      Budget Allocations & Actuals
                    </span>
                    <span className="text-[11px] text-charcoal-muted">
                      Protected Comfort Cushion: 10%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {state?.budgetBreakdown?.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-subcard bg-coralAccent text-white p-3.5 shadow-ambient-sm transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[14px]">
                              {item.categoryName}
                            </span>
                            {item.isLocked && (
                              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] flex items-center gap-1 font-medium">
                                <Lock className="w-2.5 h-2.5" /> Locked
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-[14px] block mt-0.5">
                            ₹{item.allocatedINR.toLocaleString('en-IN')}
                          </span>
                          <p className="text-[11px] text-white/90 mt-1 line-clamp-1">
                            {item.notes}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-white/80 mt-2.5 pt-2 border-t border-white/20">
                          <span>Share: {item.percentage}%</span>
                          <span className="font-medium">
                            Actual: ₹{(item.actualSpentINR || 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* =========================================================================
              SECTION 2: LOCATIONS CARD (MUTED SAGE TEAL #4A7B76)
             ========================================================================= */}
          <section
            id="section-locations"
            className="rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden"
          >
            {/* Coloured Header Bar */}
            <div
              onClick={() => toggleSection('locations')}
              className="bg-sageTeal text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/90">
                <Plus className="w-3.5 h-3.5" />
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white" />
                <span className="font-sans font-medium text-[15px] tracking-wide">
                  Locations & Travel Plan
                </span>
              </div>

              <button className="text-white/80 hover:text-white">
                {openSections.locations ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {openSections.locations && (
              <div className="p-4 sm:p-5 space-y-4">
                {/* Bride Prep Sub-Header with 30 Min Duration Pill */}
                <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                  <h4 className="font-sans font-semibold text-[15px] text-charcoal">
                    Bride Prep
                  </h4>
                  <span className="px-3 py-0.5 rounded-full bg-sageTeal/15 text-sageTeal text-[12px] font-bold">
                    30 Min
                  </span>
                </div>

                {/* Address Pin + Details */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sageTeal shrink-0 mt-0.5" />
                    <div className="text-[13px] text-charcoal leading-snug">
                      <span className="font-semibold block">Amway Grand Plaza Hotel</span>
                      <span className="text-charcoal-muted">187 Monroe Ave NW, Grand Rapids, MI 49503 ({city})</span>
                    </div>
                  </div>

                  {/* Driving Time & Street View Outlined Pill Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[12px] text-charcoal-muted font-medium flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-sageTeal" />
                      28 Min / 12.8 Miles
                    </span>

                    <button
                      onClick={() => onOpenStreetView?.('Amway Grand Plaza Hotel')}
                      className="px-3.5 py-1 rounded-full border border-charcoal/30 text-charcoal text-[12px] font-medium hover:bg-cream-100 flex items-center gap-1 transition-all"
                    >
                      <ExternalLink className="w-3 h-3 text-sageTeal" />
                      Street View
                    </button>
                  </div>
                </div>

                {/* Structured Notes Block on User-Specified #DE7356 Surface */}
                <div className="rounded-subcard bg-coralAccent text-white p-3.5 space-y-1.5 text-[12px] shadow-ambient-sm">
                  <div className="font-semibold tracking-wide text-white/95 uppercase text-[11px]">
                    Notes
                  </div>
                  <p>
                    <span className="font-medium text-white/80">Room Number: </span>
                    <span className="font-bold">339</span>
                  </p>
                  <p>
                    <span className="font-medium text-white/80">Gate Code: </span>
                    <span className="font-bold">2082</span>
                  </p>
                  <p>
                    <span className="font-medium text-white/80">Instructions: </span>
                    <span>Park in Lot A on the NE Side</span>
                  </p>
                </div>

                {/* Venue Images Gallery */}
                <div>
                  <span className="text-[12px] font-semibold text-charcoal block mb-2">
                    Venue Images
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {VENUE_IMAGES.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Venue Preview ${i + 1}`}
                        className="w-full h-24 rounded-subcard object-cover border border-black/[0.06]"
                      />
                    ))}
                  </div>
                </div>

                {/* Vertical Dotted-Line Travel Plan Stepper */}
                <div className="pt-2">
                  <span className="text-[12px] font-semibold text-charcoal block mb-2.5">
                    Travel Plan
                  </span>
                  <div className="space-y-3 relative pl-4 border-l-2 border-dotted border-sageTeal/50 ml-2">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-sageTeal absolute -left-[21px] top-1" />
                      <p className="text-[13px] font-semibold text-charcoal">Lunch</p>
                      <p className="text-[12px] text-charcoal-muted leading-tight mt-0.5">
                        Included 15 minutes for a lunch spot on the way to the first location
                      </p>
                    </div>

                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-sageTeal absolute -left-[21px] top-1" />
                      <p className="text-[13px] font-semibold text-charcoal">Crew Drop Off</p>
                      <p className="text-[12px] text-charcoal-muted leading-tight mt-0.5">
                        Included 15 extra minutes to drop off a crew member at the groom's house
                      </p>
                    </div>
                  </div>
                </div>

                {/* Collapsed Pill Bars for Ceremony & Reception */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div
                    onClick={() =>
                      setExpandedLocations((prev) => ({
                        ...prev,
                        ceremony: !prev.ceremony,
                      }))
                    }
                    className="flex items-center justify-between p-3 rounded-subcard bg-cream-50 border border-black/[0.04] cursor-pointer hover:bg-cream-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-charcoal">Ceremony</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-sageTeal/15 text-sageTeal text-[11px] font-semibold">
                        45 Min
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-charcoal-muted" />
                  </div>

                  <div
                    onClick={() =>
                      setExpandedLocations((prev) => ({
                        ...prev,
                        reception: !prev.reception,
                      }))
                    }
                    className="flex items-center justify-between p-3 rounded-subcard bg-cream-50 border border-black/[0.04] cursor-pointer hover:bg-cream-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-charcoal">Reception</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-coralAccent/20 text-coralAccent text-[11px] font-semibold">
                        1 Hour
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-charcoal-muted" />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (lg:col-span-5): COUPLE, FAMILY, & EVENT DETAILS
           ========================================================================= */}
        <div className="lg:col-span-5 space-y-4 lg:space-y-6">
          {/* =========================================================================
              SECTION 3: COUPLE CARD (WARM TERRACOTTA / CORAL #D96B52)
             ========================================================================= */}
          <section
            id="section-couple"
            className="rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden"
          >
            {/* Coloured Header Bar */}
            <div
              onClick={() => toggleSection('couple')}
              className="bg-terracotta text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/90">
                <Heart className="w-3.5 h-3.5" />
              </div>

              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-white fill-white" />
                <span className="font-sans font-medium text-[15px] tracking-wide">
                  Couple
                </span>
              </div>

              <button className="text-white/80 hover:text-white">
                {openSections.couple ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {openSections.couple && (
              <div className="p-5">
                {/* Side-by-side rounded square portraits linked by central rings */}
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <img
                      src={generateAvatarSvg('K', '#D96B52')}
                      alt="Kristina"
                      className="w-24 h-24 rounded-subcard object-cover border-2 border-white shadow-ambient-md mx-auto"
                    />
                    <h4 className="font-display font-semibold text-[16px] text-charcoal mt-1.5">
                      Kristina
                    </h4>
                    <p className="text-[11px] text-charcoal-muted">Anderson</p>
                  </div>

                  {/* Center wedding ring connector */}
                  <div className="w-10 h-10 rounded-full bg-cream-100 border border-terracotta/30 flex items-center justify-center shadow-ambient-sm">
                    <Heart className="w-5 h-5 text-terracotta fill-terracotta/20" />
                  </div>

                  <div className="text-center">
                    <img
                      src={generateAvatarSvg('S', '#2C3844')}
                      alt="Steven"
                      className="w-24 h-24 rounded-subcard object-cover border-2 border-white shadow-ambient-md mx-auto"
                    />
                    <h4 className="font-display font-semibold text-[16px] text-charcoal mt-1.5">
                      Steven
                    </h4>
                    <p className="text-[11px] text-charcoal-muted">Smith</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* =========================================================================
              SECTION 4: FAMILY CARD (GOLDEN OCHRE #E59852)
             ========================================================================= */}
          <section
            id="section-family"
            className="rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden"
          >
            {/* Coloured Header Bar */}
            <div
              onClick={() => toggleSection('family')}
              className="bg-goldenOchre text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/90">
                <Users className="w-3.5 h-3.5" />
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white" />
                <span className="font-sans font-medium text-[15px] tracking-wide">
                  Family
                </span>
              </div>

              <button className="text-white/80 hover:text-white">
                {openSections.family ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {openSections.family && (
              <div className="p-5">
                {/* Top Couple Nodes */}
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <img
                      src={generateAvatarSvg('K', '#D96B52')}
                      alt="Kristina"
                      className="w-14 h-14 rounded-full object-cover border border-goldenOchre mx-auto shadow-ambient-sm"
                    />
                    <span className="text-[12px] font-semibold text-charcoal mt-1 block">
                      Kristina
                    </span>
                  </div>

                  <div className="h-px w-8 bg-goldenOchre/40" />

                  <div className="text-center">
                    <img
                      src={generateAvatarSvg('S', '#2C3844')}
                      alt="Steven"
                      className="w-14 h-14 rounded-full object-cover border border-goldenOchre mx-auto shadow-ambient-sm"
                    />
                    <span className="text-[12px] font-semibold text-charcoal mt-1 block">
                      Steven
                    </span>
                  </div>
                </div>

                {/* Dotted Connection Node Tree to Parents & Relatives */}
                <div className="relative pt-2">
                  <div className="w-full border-t border-dotted border-goldenOchre/60 mb-3" />
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {UTSAV_FAMILY.map((member) => (
                      <div key={member.id} className="flex flex-col items-center">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-11 h-11 rounded-full object-cover border border-black/[0.08] shadow-ambient-sm"
                        />
                        <span className="text-[12px] font-medium text-charcoal mt-1">
                          {member.name}
                        </span>
                        <span className="text-[10px] text-charcoal-muted leading-tight">
                          {member.relation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* =========================================================================
              SECTION 5: EVENT DETAILS CARD (DEEP SLATE / NAVY #2C3844)
             ========================================================================= */}
          <section
            id="section-details"
            className="rounded-card bg-white border border-black/[0.05] shadow-ambient overflow-hidden"
          >
            {/* Coloured Header Bar */}
            <div
              onClick={() => toggleSection('details')}
              className="bg-slateNavy text-white px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/90">
                <FileText className="w-3.5 h-3.5" />
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-white" />
                <span className="font-sans font-medium text-[15px] tracking-wide">
                  Event Details
                </span>
              </div>

              <button className="text-white/80 hover:text-white">
                {openSections.details ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {openSections.details && (
              <div className="p-4 sm:p-5 space-y-4">
                <h4 className="font-sans font-semibold text-[15px] text-charcoal border-b border-black/[0.04] pb-2">
                  Wedding Details
                </h4>

                {/* Clean Vertical Key-Value List */}
                <div className="space-y-3 text-[13px]">
                  <div>
                    <span className="font-semibold text-charcoal block">First Look</span>
                    <span className="text-charcoal-muted">No first look before ceremony</span>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">Attire</span>
                    <span className="text-charcoal-muted">Black Tie optional</span>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">Wedding Style</span>
                    <span className="text-charcoal-muted">
                      Luxe & classic style, draped room, high-energy reception
                    </span>
                  </div>

                  {/* Wedding Colors Rendered as Circular Swatches */}
                  <div>
                    <span className="font-semibold text-charcoal block mb-1.5">
                      Wedding Colors
                    </span>
                    <div className="flex items-center gap-2">
                      {weddingColors.map((hex, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border border-black/10 shadow-ambient-sm"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">Ceremony Type</span>
                    <span className="text-charcoal-muted">Catholic, indoor ceremony</span>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">Ceremony Setting</span>
                    <span className="text-charcoal-muted">Indoors ({venueType})</span>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">
                      Unique Ceremony Elements
                    </span>
                    <span className="text-charcoal-muted">
                      Singer to perform Ave Maria, special organ entrance & exit music, planned dip & kiss exit
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">Restrictions</span>
                    <span className="text-charcoal-muted">
                      Possible restrictions - contact event planner for details
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">
                      Ceremony Sound System
                    </span>
                    <span className="text-charcoal-muted">Yes, you can plug into it</span>
                  </div>

                  <div>
                    <span className="font-semibold text-charcoal block">Special Exit</span>
                    <span className="text-charcoal-muted">
                      Bubbles (not confirmed), party bus for bridal party
                    </span>
                  </div>
                </div>

                {/* Collapsible Bottom Rows: Reception Details & Floor Plans */}
                <div className="space-y-2 pt-2 border-t border-black/[0.04]">
                  <div
                    onClick={() =>
                      setExpandedDetailsRows((prev) => ({
                        ...prev,
                        reception: !prev.reception,
                      }))
                    }
                    className="flex items-center justify-between p-3 rounded-subcard bg-cream-50 border border-black/[0.04] cursor-pointer hover:bg-cream-100 transition-colors"
                  >
                    <span className="text-[13px] font-semibold text-charcoal">
                      Reception Details
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-charcoal-muted transition-transform ${
                        expandedDetailsRows.reception ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {expandedDetailsRows.reception && (
                    <div className="p-3 bg-cream-50/50 rounded-subcard text-[12px] space-y-1 text-charcoal-muted">
                      <p>Cocktail hour: 5:30 PM - 6:30 PM</p>
                      <p>Grand entrance: 6:45 PM</p>
                      <p>Dinner service: 7:15 PM</p>
                    </div>
                  )}

                  <div
                    onClick={() =>
                      setExpandedDetailsRows((prev) => ({
                        ...prev,
                        floorplans: !prev.floorplans,
                      }))
                    }
                    className="flex items-center justify-between p-3 rounded-subcard bg-cream-50 border border-black/[0.04] cursor-pointer hover:bg-cream-100 transition-colors"
                  >
                    <span className="text-[13px] font-semibold text-charcoal">
                      Floor Plans & Layout
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-charcoal-muted transition-transform ${
                        expandedDetailsRows.floorplans ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {expandedDetailsRows.floorplans && (
                    <div className="p-3 bg-cream-50/50 rounded-subcard text-[12px] space-y-1 text-charcoal-muted">
                      <p>Main Ballroom: 18 banquet tables, 8 chairs each</p>
                      <p>Stage: 24ft x 16ft facing south</p>
                      <p>Dance Floor: Central parquet 20ft x 20ft</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
