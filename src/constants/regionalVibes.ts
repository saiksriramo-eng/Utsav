import { EventIntake, RegionalVibeId } from '../types/utsav';

export interface RegionalVibeMeta {
  id: RegionalVibeId;
  title: string;
  tagline: string;
  badgeEmoji: string;
  signatureDishes: string[];
  accentColorClass: string;
}

export const REGIONAL_VIBES: Record<RegionalVibeId, RegionalVibeMeta> = {
  southern_sambar: {
    id: 'southern_sambar',
    title: 'Southern Sambar & Sadhya',
    tagline: 'Aromatic Ghee Roast counters, banana-leaf warmth & brass-davara filter coffee.',
    badgeEmoji: 'South Indian',
    signatureDishes: [
      'Mini Podi Idli & Medu Vada Live Station',
      'Malabar Appam & Vegetable Stew',
      'Traditional Arachuvitta Sambar & Rasam',
      'Elaneer Payasam & Degree Filter Coffee Bar'
    ],
    accentColorClass: 'border-amber-600 bg-amber-50/70 text-amber-950'
  },
  northern_naan: {
    id: 'northern_naan',
    title: 'Northern Naan & Nawabi',
    tagline: 'Old-Delhi chaat carts, smoky tandoori kulchas, rich curries & kesar kulfi.',
    badgeEmoji: 'North Indian',
    signatureDishes: [
      'Crispy Palak Patta Chaat & Golgappa Water Bar',
      'Amritsari Stuffed Kulcha & Bhatti Paneer',
      '24-Hour Slow-Simmered Dal Makhani',
      'Hot Jalebi-Rabri Wok & Matka Kulfi Falooda'
    ],
    accentColorClass: 'border-orange-600 bg-orange-50/70 text-orange-950'
  },
  deccan_nizami: {
    id: 'deccan_nizami',
    title: 'Deccan & Royal Nizami',
    tagline: 'Fragrant Dum Biryani handis, royal salans, Double ka Meetha & Irani chai.',
    badgeEmoji: 'Deccan & Mughlai',
    signatureDishes: [
      'Charcoal-Grilled Subz & Paneer Shikampuri Kebabs',
      'Zafrani Dum Biryani Sealed in Clay Handis',
      'Authentic Mirchi ka Salan & Baghara Baingan',
      'Shahi Double ka Meetha & Irani Chai Counter'
    ],
    accentColorClass: 'border-rose-600 bg-rose-50/70 text-rose-950'
  },
  global_fusion: {
    id: 'global_fusion',
    title: 'Global Fusion & Street',
    tagline: 'Wood-fired pizzas, gourmet sliders, pasta wheels & artisanal mocktail bars.',
    badgeEmoji: 'Global & Fusion',
    signatureDishes: [
      'Wood-Fired Neapolitan Pizza & Garlic Knots',
      'Loaded Mexican Taco & Nacho Salsa Station',
      'Truffle & Herbs Pasta Tossed in Cheese Wheel',
      'DIY Boba Tea, Cold Brew & Botanical Mocktails'
    ],
    accentColorClass: 'border-indigo-600 bg-indigo-50/70 text-indigo-950'
  }
};

export const AESTHETIC_TAGS: string[] = [
  'Eco-Friendly & Zero Plastic',
  'Marigold & Brass Heritage',
  'Minimalist Pastel & Fairy Lights',
  'Retro Bollywood Sangeet',
  'Intimate Garden Soiree',
  'High-Energy Campus Fest'
];

export const MAP_CATEGORIES: Array<{
  label: string;
  queryTerm: string;
  serviceCategory: 'Caterers' | 'Decorators' | 'Photographers' | 'Venues';
}> = [
  { label: 'Caterers', queryTerm: 'catering services', serviceCategory: 'Caterers' },
  { label: 'Decorators', queryTerm: 'event decorators', serviceCategory: 'Decorators' },
  { label: 'Photographers', queryTerm: 'event wedding photographers', serviceCategory: 'Photographers' },
  { label: 'Venues & Halls', queryTerm: 'banquet halls event venues', serviceCategory: 'Venues' }
];

export const DEMO_PRESETS: Array<{ label: string; intake: EventIntake }> = [
  {
    label: 'Heritage Jaipur Sangeet (150 Guests - ₹8L)',
    intake: {
      eventName: 'Royal Heritage Wedding Sangeet',
      category: 'Wedding',
      subEvent: 'Sangeet & Ring Ceremony',
      city: 'Jaipur',
      venueType: 'Outdoor Lawn',
      eventDate: '2026-12-18',
      guestCount: 150,
      totalBudgetINR: 800000,
      regionalVibe: 'northern_naan',
      dietaryPreference: 'Pure Veg',
      aestheticTags: ['Marigold & Brass Heritage', 'Retro Bollywood Sangeet']
    }
  },
  {
    label: '1st Birthday Soiree (80 Guests - ₹65K)',
    intake: {
      eventName: 'Vihaan Milestone Celebration',
      category: 'Birthday',
      subEvent: '1st Milestone Birthday',
      city: 'Bengaluru',
      venueType: 'Rooftop / Terrace',
      eventDate: '2026-11-22',
      guestCount: 80,
      totalBudgetINR: 65000,
      regionalVibe: 'southern_sambar',
      dietaryPreference: 'Pure Veg',
      aestheticTags: ['Minimalist Pastel & Fairy Lights', 'Eco-Friendly & Zero Plastic']
    }
  },
  {
    label: 'Campus Cultural Fest (350 Guests - ₹2.5L)',
    intake: {
      eventName: 'Ignite Annual Campus Utsav',
      category: 'Community',
      subEvent: 'College Cultural & Hackathon Night',
      city: 'Puducherry',
      venueType: 'Community Hall / Campus',
      eventDate: '2026-11-30',
      guestCount: 350,
      totalBudgetINR: 250000,
      regionalVibe: 'global_fusion',
      dietaryPreference: 'Veg & Non-Veg',
      aestheticTags: ['High-Energy Campus Fest', 'Eco-Friendly & Zero Plastic']
    }
  }
];
