export type EventCategory = 'Wedding' | 'Birthday' | 'Community';

export type RegionalVibeId =
  | 'southern_sambar'
  | 'northern_naan'
  | 'deccan_nizami'
  | 'global_fusion';

export interface EventIntake {
  eventName: string;
  category: EventCategory;
  subEvent: string;
  city: string;
  venueType: 'Indoor Banquet' | 'Outdoor Lawn' | 'Rooftop / Terrace' | 'Community Hall / Campus';
  eventDate: string;
  guestCount: number;
  totalBudgetINR: number;
  regionalVibe: RegionalVibeId;
  dietaryPreference: 'Pure Veg' | 'Veg & Non-Veg' | 'Jain & Veg Friendly' | 'Vegan Options';
  aestheticTags: string[];
}

export interface BudgetAllocationItem {
  id: string;
  categoryName: string;
  percentage: number;
  allocatedINR: number;
  actualSpentINR: number;
  isLocked: boolean;
  notes: string;
}

export interface FeastMenu {
  regionalTitle: string;
  perPlateBudgetINR: number;
  cateredPlateCount: number; // Includes +10% Peace-of-Mind plate buffer
  welcomeDrinks: string[];
  startersAndLiveCounters: string[];
  mainCourseSpecialties: string[];
  breadsAndRice: string[];
  desserts: string[];
  catererQuantityBrief: string;
}

export interface ThemeConcept {
  id: string;
  themeName: string;
  vibeDescription: string;
  colorPaletteHex: string[]; // Array of 4 hex strings e.g. ["#D97706", "#7C2D12", "#FEF3C7", "#065F46"]
  decorFocalPoints: string[];
  engagementActivities: string[];
  digitalInviteCopy: string;
}

export interface TimelineItem {
  id: string;
  phase: 'Pre-Event Countdown' | 'Event-Day Run Sheet';
  timeMarker: string; // e.g., "T-30 Days" or "06:30 PM"
  taskTitle: string;
  assignedRole: string;
  completed: boolean;
  isSafetyCheck: boolean;
}

export interface VendorItem {
  id: string;
  serviceCategory: 'Caterers' | 'Decorators' | 'Photographers' | 'Venues' | 'Sound & Artist';
  taskTitle: string;
  estimatedPriceRangeINR: string;
  vettingQuestions: string[];
  whatsappInquiryTemplate: string;
  pinnedVendorName: string;
  quotedPriceINR: number;
  booked: boolean;
}

export interface PeaceOfMindShield {
  comfortCushionINR: number;
  extraPlateBufferCount: number;
  weatherAndPowerSafeguard: string;
  calmReassuranceNote: string;
}

export interface SahayakMessage {
  id: string;
  role: 'user' | 'model';
  senderTag: 'Host' | 'UtsavSahayak';
  text: string;
  timestamp: string;
}

export interface UtsavEventState {
  intake: EventIntake;
  peaceOfMind: PeaceOfMindShield;
  costPerGuestINR: number;
  budgetBreakdown: BudgetAllocationItem[];
  feastMenu: FeastMenu;
  themeConcepts: ThemeConcept[];
  selectedThemeIndex: number;
  timeline: TimelineItem[];
  vendors: VendorItem[];
  sahayakHistory: SahayakMessage[];
  lastSahayakSummary: string;
}
