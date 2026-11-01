import { generateAvatarSvg, generateVenuePlaceholder } from '../utils/avatarHelper';

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  side: 'bride' | 'groom' | 'relative';
}

export interface ChatThread {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isActive?: boolean;
}

export interface CalendarEventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  city: string;
  crew: string[];
  isExpanded?: boolean;
  packageTitle?: string;
  packageDuration?: string;
  addons?: string[];
  planner?: string;
  photographer?: string;
}

export const UTSAV_CREW: CrewMember[] = [
  {
    id: 'crew-1',
    name: 'John Pettis',
    role: 'Lead Photographer',
    avatar: generateAvatarSvg('JP', '#2C3844'),
  },
  {
    id: 'crew-2',
    name: 'Paige Johnson',
    role: 'Lead Cinematographer',
    avatar: generateAvatarSvg('PJ', '#4A7B76'),
  },
  {
    id: 'crew-3',
    name: 'Evan Anderson',
    role: 'Second Shooter',
    avatar: generateAvatarSvg('EA', '#D96B52'),
  },
  {
    id: 'crew-4',
    name: 'Meredith Grey',
    role: 'Event Coordinator',
    avatar: generateAvatarSvg('MG', '#E59852'),
  },
];

export const UTSAV_FAMILY: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Leroy',
    relation: "Father of the Bride",
    avatar: generateAvatarSvg('L', '#2C3844'),
    side: 'bride',
  },
  {
    id: 'fam-2',
    name: 'Gregory',
    relation: "Father of the Groom",
    avatar: generateAvatarSvg('G', '#2C3844'),
    side: 'groom',
  },
  {
    id: 'fam-3',
    name: 'Barbara',
    relation: "Mother of the Bride",
    avatar: generateAvatarSvg('B', '#D96B52'),
    side: 'bride',
  },
  {
    id: 'fam-4',
    name: 'Monica',
    relation: "Mother of the Groom",
    avatar: generateAvatarSvg('M', '#DE7356'),
    side: 'groom',
  },
];

export const UTSAV_CHATS: ChatThread[] = [
  {
    id: 'chat-1',
    name: 'Paige Johnson',
    role: 'Lead Cinematographer',
    avatar: generateAvatarSvg('PJ', '#4A7B76'),
    lastMessage: "I'm running late. I should be there just a few minutes after our...",
    timestamp: '9:30 AM',
    unreadCount: 2,
    isActive: true,
  },
  {
    id: 'chat-2',
    name: 'John Pettis',
    role: 'Lead Photographer',
    avatar: generateAvatarSvg('JP', '#2C3844'),
    lastMessage: 'The bride just arrived. Looks like they have a few extra spots for photos.',
    timestamp: '11:43 AM',
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    name: 'Hunter Smith',
    role: 'Event Designer',
    avatar: generateAvatarSvg('HS', '#DE7356'),
    lastMessage: 'Lots completed. Excuse the delay, loaded on the final touches to the overlay.',
    timestamp: '1:23 PM',
    unreadCount: 0,
  },
  {
    id: 'chat-4',
    name: 'Coastline Team',
    role: 'Hair & Makeup',
    avatar: generateAvatarSvg('CT', '#D96B52'),
    lastMessage: 'Just a reminder to grab $70 from the photographer as he\'s shooting with...',
    timestamp: '11:18 AM',
    unreadCount: 0,
  },
  {
    id: 'chat-5',
    name: 'Ryan Walker',
    role: 'DJ & Audio Tech',
    avatar: generateAvatarSvg('RW', '#2C3844'),
    lastMessage: 'Hey, things are going well down here at the event. Mike shooting with you?',
    timestamp: '2:15 PM',
    unreadCount: 0,
  },
  {
    id: 'chat-6',
    name: 'Allison Stevens',
    role: 'Floral Designer',
    avatar: generateAvatarSvg('AS', '#E59852'),
    lastMessage: "Ryan asked me to let you know we should purchase some padded ch...",
    timestamp: '5:10 PM',
    unreadCount: 0,
  },
];

export const UTSAV_EVENTS: CalendarEventItem[] = [
  {
    id: 'evt-1',
    title: 'Anderson - Smith',
    date: 'May 5, 2024',
    location: 'Chicago, IL',
    city: 'Chicago',
    crew: [
      generateAvatarSvg('JP', '#2C3844'),
      generateAvatarSvg('PJ', '#4A7B76'),
      generateAvatarSvg('EA', '#D96B52'),
    ],
  },
  {
    id: 'evt-2',
    title: 'Miller - Sage',
    date: 'August 15, 2024',
    location: 'New York, NY',
    city: 'New York',
    crew: [
      generateAvatarSvg('MG', '#E59852'),
      generateAvatarSvg('HS', '#DE7356'),
    ],
  },
  {
    id: 'evt-3',
    title: 'Johnson - O\'Connor',
    date: 'September 18, 2024',
    location: 'Salt Lake City, UT',
    city: 'Salt Lake City',
    isExpanded: true,
    packageTitle: 'Story Package',
    packageDuration: '8 hours',
    addons: ['Drone Coverage', 'Extra hour'],
    planner: 'A Day in May Events',
    photographer: 'The Weber Photographers',
    crew: [
      generateAvatarSvg('JP', '#2C3844'),
      generateAvatarSvg('PJ', '#4A7B76'),
      generateAvatarSvg('EA', '#D96B52'),
    ],
  },
  {
    id: 'evt-4',
    title: 'Fritz - Hanson',
    date: '15 January 2025',
    location: 'Phoenix, AZ',
    city: 'Phoenix',
    crew: [
      generateAvatarSvg('CT', '#D96B52'),
      generateAvatarSvg('AS', '#E59852'),
      generateAvatarSvg('RW', '#2C3844'),
    ],
  },
];

export const VENUE_IMAGES = [
  generateVenuePlaceholder('Grand Ballroom & Mandap', '#F5EFEA'),
  generateVenuePlaceholder('Courtyard Lawn & Stage', '#F5EFEA'),
  generateVenuePlaceholder('Banquet Hall Reception', '#F5EFEA'),
];

export const DEFAULT_EVENT_INTAKE = {
  eventName: 'Kristina & Steven',
  category: 'Wedding' as const,
  subEvent: 'Sangeet & Wedding Ceremony',
  city: 'Grand Rapids, MI (Jaipur)',
  venueType: 'Outdoor Lawn' as const,
  eventDate: '12 July, 2024',
  guestCount: 150,
  totalBudgetINR: 800000,
  regionalVibe: 'northern_naan' as const,
  dietaryPreference: 'Veg & Non-Veg' as const,
  aestheticTags: ['Luxe & Classic', 'Draped Room', 'High-Energy'],
};
