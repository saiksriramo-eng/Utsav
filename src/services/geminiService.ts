import { GoogleGenAI, Type, Schema } from '@google/genai';
import {
  EventIntake,
  UtsavEventState,
  SahayakMessage,
  BudgetAllocationItem,
  FeastMenu,
  ThemeConcept,
  TimelineItem,
  VendorItem
} from '../types/utsav';
import { REGIONAL_VIBES } from '../constants/regionalVibes';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const hasValidKey = apiKey.trim().length > 0 && !apiKey.includes('your_gemini_api_key');
const ai = new GoogleGenAI({ apiKey: hasValidKey ? apiKey : 'placeholder_key' });

const MODEL_NAME = 'gemini-2.5-flash';

export const UTSAV_PLAN_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    peaceOfMind: {
      type: Type.OBJECT,
      properties: {
        comfortCushionINR: { type: Type.NUMBER },
        extraPlateBufferCount: { type: Type.NUMBER },
        weatherAndPowerSafeguard: { type: Type.STRING },
        calmReassuranceNote: { type: Type.STRING }
      },
      required: [
        'comfortCushionINR',
        'extraPlateBufferCount',
        'weatherAndPowerSafeguard',
        'calmReassuranceNote'
      ]
    },
    costPerGuestINR: { type: Type.NUMBER },
    budgetBreakdown: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          categoryName: { type: Type.STRING },
          percentage: { type: Type.NUMBER },
          allocatedINR: { type: Type.NUMBER },
          notes: { type: Type.STRING }
        },
        required: ['id', 'categoryName', 'percentage', 'allocatedINR', 'notes']
      }
    },
    feastMenu: {
      type: Type.OBJECT,
      properties: {
        regionalTitle: { type: Type.STRING },
        perPlateBudgetINR: { type: Type.NUMBER },
        cateredPlateCount: { type: Type.NUMBER },
        welcomeDrinks: { type: Type.ARRAY, items: { type: Type.STRING } },
        startersAndLiveCounters: { type: Type.ARRAY, items: { type: Type.STRING } },
        mainCourseSpecialties: { type: Type.ARRAY, items: { type: Type.STRING } },
        breadsAndRice: { type: Type.ARRAY, items: { type: Type.STRING } },
        desserts: { type: Type.ARRAY, items: { type: Type.STRING } },
        catererQuantityBrief: { type: Type.STRING }
      },
      required: [
        'regionalTitle',
        'perPlateBudgetINR',
        'cateredPlateCount',
        'welcomeDrinks',
        'startersAndLiveCounters',
        'mainCourseSpecialties',
        'breadsAndRice',
        'desserts',
        'catererQuantityBrief'
      ]
    },
    themeConcepts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          themeName: { type: Type.STRING },
          vibeDescription: { type: Type.STRING },
          colorPaletteHex: { type: Type.ARRAY, items: { type: Type.STRING } },
          decorFocalPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          engagementActivities: { type: Type.ARRAY, items: { type: Type.STRING } },
          digitalInviteCopy: { type: Type.STRING }
        },
        required: [
          'id',
          'themeName',
          'vibeDescription',
          'colorPaletteHex',
          'decorFocalPoints',
          'engagementActivities',
          'digitalInviteCopy'
        ]
      }
    },
    timeline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          phase: {
            type: Type.STRING,
            enum: ['Pre-Event Countdown', 'Event-Day Run Sheet']
          },
          timeMarker: { type: Type.STRING },
          taskTitle: { type: Type.STRING },
          assignedRole: { type: Type.STRING },
          isSafetyCheck: { type: Type.BOOLEAN }
        },
        required: [
          'id',
          'phase',
          'timeMarker',
          'taskTitle',
          'assignedRole',
          'isSafetyCheck'
        ]
      }
    },
    vendors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          serviceCategory: {
            type: Type.STRING,
            enum: [
              'Caterers',
              'Decorators',
              'Photographers',
              'Venues',
              'Sound & Artist'
            ]
          },
          taskTitle: { type: Type.STRING },
          estimatedPriceRangeINR: { type: Type.STRING },
          vettingQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          whatsappInquiryTemplate: { type: Type.STRING }
        },
        required: [
          'id',
          'serviceCategory',
          'taskTitle',
          'estimatedPriceRangeINR',
          'vettingQuestions',
          'whatsappInquiryTemplate'
        ]
      }
    },
    lastSahayakSummary: { type: Type.STRING }
  },
  required: [
    'peaceOfMind',
    'costPerGuestINR',
    'budgetBreakdown',
    'feastMenu',
    'themeConcepts',
    'timeline',
    'vendors',
    'lastSahayakSummary'
  ]
};

export function formatSlidingWindowHistory(history: SahayakMessage[]): string {
  const recentTurns = history.slice(-10);
  if (recentTurns.length === 0) return 'No prior adjustments.';
  return recentTurns
    .map((msg) => `[${msg.senderTag}]: ${msg.text}`)
    .join('\n');
}

const SYSTEM_INSTRUCTION_MASTER = `
Act as Utsav Sahayak, an empathetic, culturally grounded Indian celebration and event architect.
Follow the provided responseSchema strictly.
Core Operational Rules:
1. Always set aside exactly 10% of totalBudgetINR as the '10% Comfort Cushion (Peace-of-Mind Buffer)' inside budgetBreakdown and peaceOfMind.comfortCushionINR.
2. The sum of all allocatedINR across budgetBreakdown items must equal totalBudgetINR.
3. Calculate cateredPlateCount as Math.ceil(guestCount * 1.10) so the event never runs short of food.
4. Calculate perPlateBudgetINR by dividing the Catering category's allocatedINR by cateredPlateCount.
5. Design feastMenu specifically around the chosen regionalVibe (Southern Sambar & Sadhya, Northern Naan & Nawabi, Deccan & Royal Nizami, or Global Fusion & Street) and ensure dishes realistically match the perPlateBudgetINR tier and dietaryPreference.
6. Provide exactly 3 distinct themeConcepts, each with 4 valid 6-digit CSS hex color codes (e.g. #D97706), practical decor focal points, interactive guest games/activities, and a warm, ready-to-send digital invite message.
7. Provide at least 5 'Pre-Event Countdown' timeline tasks and 5 'Event-Day Run Sheet' minute-by-minute tasks, including proactive weather and power backup safety checks.
8. Provide actionable vendor items covering Caterers, Decorators, Photographers, Venues, and Sound & Artist with realistic price ranges in INR for the specified city, 3 practical vetting questions each, and a polite WhatsApp inquiry draft.
9. Maintain a calm, reassuring, warm tone in calmReassuranceNote and lastSahayakSummary that eliminates host stress.
`;

export async function generateInitialUtsavPlan(
  intake: EventIntake
): Promise<UtsavEventState> {
  const regionalMeta = REGIONAL_VIBES[intake.regionalVibe];
  const prompt = `
Create a complete Utsav celebration master plan for:
- Event Name: ${intake.eventName}
- Category: ${intake.category} (${intake.subEvent})
- Location: ${intake.city} | Venue Setting: ${intake.venueType}
- Date: ${intake.eventDate} | Guest Count: ${intake.guestCount}
- Total Budget: ₹${intake.totalBudgetINR.toLocaleString('en-IN')}
- Regional Culinary Trigger: ${regionalMeta.title} (${regionalMeta.tagline})
- Dietary Preference: ${intake.dietaryPreference}
- Aesthetic Vibes: ${intake.aestheticTags.join(', ')}
`;

  if (!hasValidKey) {
    console.info('No valid VITE_GEMINI_API_KEY detected. Using high-fidelity offline deterministic engine.');
    return generateDeterministicPlan(intake);
  }

  let attempt = 0;
  while (attempt < 2) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION_MASTER,
          responseMimeType: 'application/json',
          responseSchema: UTSAV_PLAN_SCHEMA,
          temperature: 0.4
        }
      });

      const rawText = response.text || '{}';
      const parsed = JSON.parse(rawText);
      return hydrateFullState(intake, parsed);
    } catch (error) {
      attempt += 1;
      console.warn(`Utsav synthesis attempt ${attempt} paused:`, error);
      if (attempt >= 2) {
        console.info('Falling back gracefully to comprehensive deterministic Utsav celebration model.');
        return generateDeterministicPlan(intake);
      }
    }
  }

  return generateDeterministicPlan(intake);
}

export async function rebalanceWithSahayak(
  currentState: UtsavEventState,
  userRequest: string,
  updatedIntakeOverrides?: Partial<EventIntake>
): Promise<UtsavEventState> {
  const mergedIntake: EventIntake = {
    ...currentState.intake,
    ...updatedIntakeOverrides
  };

  const lockedCategories = currentState.budgetBreakdown
    .filter((b) => b.isLocked)
    .map((b) => `${b.categoryName}: Locked at ₹${b.allocatedINR}`)
    .join(', ');

  const slidingHistoryText = formatSlidingWindowHistory(
    currentState.sahayakHistory
  );

  const prompt = `
Current Event Parameters:
- Event: ${mergedIntake.eventName} (${mergedIntake.category} - ${mergedIntake.subEvent})
- City: ${mergedIntake.city} | Setting: ${mergedIntake.venueType}
- Guest Count: ${mergedIntake.guestCount} | Total Budget: ₹${mergedIntake.totalBudgetINR}
- Regional Culinary Trigger: ${REGIONAL_VIBES[mergedIntake.regionalVibe].title}
- Dietary: ${mergedIntake.dietaryPreference}
- Locked Budget Categories (DO NOT alter allocatedINR for these): ${lockedCategories || 'None'}

Recent Conversation Window:
${slidingHistoryText}

Latest Host Adjustment Request:
"${userRequest}"

Smoothly rebalance the budgetBreakdown, feastMenu, themeConcepts, timeline, and vendors to honor the request and any locked categories while keeping the host completely stress-free. Explain the graceful adjustments in lastSahayakSummary.
`;

  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (!hasValidKey) {
    console.info('Rebalancing with deterministic Sahayak engine (offline/demo mode).');
    const offlineState = generateDeterministicPlan(mergedIntake, currentState, userRequest);
    offlineState.sahayakHistory = [
      ...currentState.sahayakHistory.slice(-8),
      {
        id: `usr-${Date.now()}`,
        role: 'user',
        senderTag: 'Host',
        text: userRequest,
        timestamp: now
      },
      {
        id: `mdl-${Date.now() + 1}`,
        role: 'model',
        senderTag: 'UtsavSahayak',
        text: offlineState.lastSahayakSummary,
        timestamp: now
      }
    ];
    return offlineState;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_MASTER,
        responseMimeType: 'application/json',
        responseSchema: UTSAV_PLAN_SCHEMA,
        temperature: 0.35
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    const nextState = hydrateFullState(mergedIntake, parsed, currentState);

    nextState.sahayakHistory = [
      ...currentState.sahayakHistory.slice(-8),
      {
        id: `usr-${Date.now()}`,
        role: 'user',
        senderTag: 'Host',
        text: userRequest,
        timestamp: now
      },
      {
        id: `mdl-${Date.now() + 1}`,
        role: 'model',
        senderTag: 'UtsavSahayak',
        text: parsed.lastSahayakSummary || 'Plan smoothly recalibrated with zero host stress.',
        timestamp: now
      }
    ];

    return nextState;
  } catch (error) {
    console.warn('Sahayak online rebalance fallback triggered:', error);
    const fallbackState = generateDeterministicPlan(mergedIntake, currentState, userRequest);
    fallbackState.sahayakHistory = [
      ...currentState.sahayakHistory.slice(-8),
      {
        id: `usr-${Date.now()}`,
        role: 'user',
        senderTag: 'Host',
        text: userRequest,
        timestamp: now
      },
      {
        id: `mdl-${Date.now() + 1}`,
        role: 'model',
        senderTag: 'UtsavSahayak',
        text: fallbackState.lastSahayakSummary,
        timestamp: now
      }
    ];
    return fallbackState;
  }
}

export function hydrateFullState(
  intake: EventIntake,
  rawModelData: any,
  previousState?: UtsavEventState
): UtsavEventState {
  const prevBudgetMap = new Map(
    previousState?.budgetBreakdown.map((b) => [b.categoryName, b]) || []
  );
  const prevTimelineMap = new Map(
    previousState?.timeline.map((t) => [t.taskTitle, t]) || []
  );
  const prevVendorMap = new Map(
    previousState?.vendors.map((v) => [v.serviceCategory, v]) || []
  );

  return {
    intake,
    peaceOfMind: rawModelData.peaceOfMind,
    costPerGuestINR:
      rawModelData.costPerGuestINR ||
      Math.round(intake.totalBudgetINR / Math.max(1, intake.guestCount)),
    budgetBreakdown: (rawModelData.budgetBreakdown || []).map(
      (item: any, idx: number) => {
        const existing = prevBudgetMap.get(item.categoryName);
        return {
          id: item.id || `b-${idx}`,
          categoryName: item.categoryName,
          percentage: item.percentage,
          allocatedINR: existing?.isLocked
            ? existing.allocatedINR
            : item.allocatedINR,
          actualSpentINR: existing?.actualSpentINR || 0,
          isLocked: existing?.isLocked || false,
          notes: item.notes
        };
      }
    ),
    feastMenu: rawModelData.feastMenu,
    themeConcepts: rawModelData.themeConcepts || [],
    selectedThemeIndex: previousState?.selectedThemeIndex || 0,
    timeline: (rawModelData.timeline || []).map((item: any, idx: number) => {
      const existing = prevTimelineMap.get(item.taskTitle);
      return {
        id: item.id || `t-${idx}`,
        phase: item.phase,
        timeMarker: item.timeMarker,
        taskTitle: item.taskTitle,
        assignedRole: item.assignedRole,
        completed: existing?.completed || false,
        isSafetyCheck: Boolean(item.isSafetyCheck)
      };
    }),
    vendors: (rawModelData.vendors || []).map((item: any, idx: number) => {
      const existing = prevVendorMap.get(item.serviceCategory);
      return {
        id: item.id || `v-${idx}`,
        serviceCategory: item.serviceCategory,
        taskTitle: item.taskTitle,
        estimatedPriceRangeINR: item.estimatedPriceRangeINR,
        vettingQuestions: item.vettingQuestions || [],
        whatsappInquiryTemplate: item.whatsappInquiryTemplate,
        pinnedVendorName: existing?.pinnedVendorName || '',
        quotedPriceINR: existing?.quotedPriceINR || 0,
        booked: existing?.booked || false
      };
    }),
    sahayakHistory: previousState?.sahayakHistory || [],
    lastSahayakSummary:
      rawModelData.lastSahayakSummary ||
      'Initial Utsav plan crafted with a 10% Comfort Cushion and +10% extra catering buffer.'
  };
}

/**
 * High-fidelity deterministic celebration planner engine
 * Strictly respects all Peace-of-Mind mathematical rules, cultural culinary triggers,
 * and category locking mechanics.
 */
export function generateDeterministicPlan(
  intake: EventIntake,
  previousState?: UtsavEventState,
  adjustmentPrompt?: string
): UtsavEventState {
  const total = intake.totalBudgetINR;
  const guests = Math.max(1, intake.guestCount);
  const comfortCushionINR = Math.round(total * 0.10);
  const bufferedPlates = Math.ceil(guests * 1.10);

  // Budget allocations: exactly 100% total (38% Catering, 22% Venue, 15% Decor, 8% Photo, 4% Sound, 3% Logistics, 10% Cushion)
  const defaultAllocations = [
    { name: 'Catering & Feast', pct: 38, notes: 'Includes regional food stations, service staff, and cutlery.' },
    { name: 'Venue & Banquet', pct: 22, notes: 'Rental, basic lighting setup, air-conditioning/fan backup.' },
    { name: 'Decor & Ambience', pct: 15, notes: 'Theme stage, entrance arches, floral arrangements, seating drapes.' },
    { name: 'Photography & Media', pct: 8, notes: 'Candid photographer, traditional coverage, teaser reels.' },
    { name: 'Sound, DJ & Artist', pct: 4, notes: 'Acoustic setup, wireless microphones, curated cultural playlists.' },
    { name: 'Logistics & Hospitality', pct: 3, notes: 'Welcome desk, luggage coordination, emergency first-aid kit.' },
    { name: '10% Comfort Cushion (Peace-of-Mind Buffer)', pct: 10, notes: 'Protected reserve for zero-stress last-minute exigencies.' }
  ];

  // Calculate allocatedINR respecting locked items if previousState exists
  const prevBudgetMap = new Map(
    previousState?.budgetBreakdown.map((b) => [b.categoryName, b]) || []
  );

  let lockedTotal = 0;
  let unlockedBasePct = 0;
  defaultAllocations.forEach((alloc) => {
    const prev = prevBudgetMap.get(alloc.name);
    if (prev?.isLocked) {
      lockedTotal += prev.allocatedINR;
    } else {
      unlockedBasePct += alloc.pct;
    }
  });

  const remainingForUnlocked = Math.max(0, total - lockedTotal);

  const budgetBreakdown: BudgetAllocationItem[] = defaultAllocations.map((alloc, idx) => {
    const prev = prevBudgetMap.get(alloc.name);
    if (prev?.isLocked) {
      return {
        id: `b-${idx}`,
        categoryName: alloc.name,
        percentage: Math.round((prev.allocatedINR / total) * 100),
        allocatedINR: prev.allocatedINR,
        actualSpentINR: prev.actualSpentINR || 0,
        isLocked: true,
        notes: `${alloc.notes} (Locked by host)`
      };
    }

    const calculatedINR = unlockedBasePct > 0
      ? Math.round((alloc.pct / unlockedBasePct) * remainingForUnlocked)
      : Math.round((alloc.pct / 100) * total);

    return {
      id: `b-${idx}`,
      categoryName: alloc.name,
      percentage: Math.round((calculatedINR / total) * 100),
      allocatedINR: calculatedINR,
      actualSpentINR: prev?.actualSpentINR || 0,
      isLocked: false,
      notes: alloc.notes
    };
  });

  // Ensure exact sum equality to total
  const currentSum = budgetBreakdown.reduce((sum, item) => sum + item.allocatedINR, 0);
  const diff = total - currentSum;
  if (diff !== 0) {
    const adjustable = budgetBreakdown.find((b) => !b.isLocked && b.categoryName !== '10% Comfort Cushion (Peace-of-Mind Buffer)') || budgetBreakdown[0];
    adjustable.allocatedINR += diff;
  }

  // Catering mathematics
  const cateringAlloc = budgetBreakdown.find((b) => b.categoryName === 'Catering & Feast')?.allocatedINR || Math.round(total * 0.38);
  const perPlateBudgetINR = Math.max(150, Math.floor(cateringAlloc / bufferedPlates));

  // Regional Feast Menu Generation
  const regionalMeta = REGIONAL_VIBES[intake.regionalVibe];
  let feastMenu: FeastMenu;

  switch (intake.regionalVibe) {
    case 'southern_sambar':
      feastMenu = {
        regionalTitle: 'Southern Sambar & Sadhya Royal Spread',
        perPlateBudgetINR,
        cateredPlateCount: bufferedPlates,
        welcomeDrinks: ['Panakam with Jaggery & Dry Ginger', 'Fresh Nannari Sharbat', 'Tender Coconut Cooler with Mint'],
        startersAndLiveCounters: [
          'Live Ghee Podi Mini Idli & Crispy Medu Vada Bar',
          'Fresh Malabar Appam with Cardamom Vegetable Stew',
          'Crispy Vazhaipoo (Banana Flower) Vadas & Coconut Chutney'
        ],
        mainCourseSpecialties: [
          'Authentic Arachuvitta Drumstick & Shallot Sambar',
          'Traditional Kerala Avial with Coconut Oil Drizzle',
          'Urulai Roast (Spiced Baby Potato Fry)',
          'Mysore Rasam & Curd Pachadi'
        ],
        breadsAndRice: [
          'Flaky Malabar Parottas',
          'Ponni Steamed Rice & Brown Red Matta Rice',
          'Bisi Bele Bath with Ghee Boondi'
        ],
        desserts: [
          'Warm Elaneer (Tender Coconut) Payasam',
          'Traditional Tirunelveli Ghee Halwa',
          'Authentic Brass-Davara Kumbakonam Degree Filter Coffee'
        ],
        catererQuantityBrief: `Briefed for ${bufferedPlates} full banana-leaf sets (+10% extra buffer). 3 live counter chefs, continuous fresh sambar and filter coffee kettles.`
      };
      break;

    case 'northern_naan':
      feastMenu = {
        regionalTitle: 'Northern Naan & Nawabi Dawat',
        perPlateBudgetINR,
        cateredPlateCount: bufferedPlates,
        welcomeDrinks: ['Kesaria Thandai with Pistachio Shavings', 'Tangy Mint Masala Shikanji', 'Gulab Jal Rooh Afza Lassi'],
        startersAndLiveCounters: [
          'Old Delhi Chandni Chowk Palak Patta Chaat & Dahi Bhalla Wok',
          'Bhatti Ka Paneer Tikka & Tandoori Broccoli Grills',
          'Live Golgappa Water Bar with 4 Artisanal Flavors'
        ],
        mainCourseSpecialties: [
          '24-Hour Slow-Simmered Signature Dal Makhani with Makkhan',
          'Paneer Lababdar with Roasted Bell Peppers',
          'Pindi Chhole slow-cooked with Tea Leaves & Anardana',
          'Subz Nizami Handi with Cashmere Saffron'
        ],
        breadsAndRice: [
          'Live Amritsari Stuffed Chur-Chur Kulchas',
          'Peshawari Garlic & Butter Naan Baskets',
          'Zafrani Dum Pulao with Golden Fried Onions & Mint Raita'
        ],
        desserts: [
          'Live Hot Jalebi Wok with Thick Rabri',
          'Matka Kulfi Falooda with Rose Syrup & Basil Seeds',
          'Warm Gulab Jamun filled with Pistachio Praline'
        ],
        catererQuantityBrief: `Prepared for ${bufferedPlates} diners (+10% buffer count). Dual tandoor stations ensuring piping-hot breads served directly to table.`
      };
      break;

    case 'deccan_nizami':
      feastMenu = {
        regionalTitle: 'Deccan & Royal Nizami Dastarkhwan',
        perPlateBudgetINR,
        cateredPlateCount: bufferedPlates,
        welcomeDrinks: ['Royal Rose Shahi Sharbat with Chia Seeds', 'Pudina Aam Panna', 'Anar & Kesar Welcome Spritz'],
        startersAndLiveCounters: [
          'Charcoal-Grilled Paneer Shikampuri Kebabs',
          'Crispy Corn & Water Chestnut Salt & Pepper',
          'Dahi Ke Kebab with Mint Coriander Chutney'
        ],
        mainCourseSpecialties: [
          'Clay Handi Sealed Dum Biryani with Saffron Infusion',
          'Authentic Hyderabadi Mirchi Ka Salan (Peanut & Sesame Gravy)',
          'Royal Baghara Baingan with Curry Leaves',
          'Dalcha with Bottle Gourd & Tangy Tamarind'
        ],
        breadsAndRice: [
          'Tandoori Sheermal & Roomali Roti',
          'Fragrant Baghara Rice',
          'Vegetable Dum Biryani Handis'
        ],
        desserts: [
          'Rich Shahi Double Ka Meetha topped with Silver Leaf & Almonds',
          'Hyderabadi Qubani Ka Meetha with Clotted Malai',
          'Irani Chai Counter with Fresh Osmania Biscuits'
        ],
        catererQuantityBrief: `Handis scaled for ${bufferedPlates} portions (+10% peace-of-mind buffer). Live charcoal counter and hot dum biryani handis opened live.`
      };
      break;

    case 'global_fusion':
    default:
      feastMenu = {
        regionalTitle: 'Global Fusion & Street Carnival',
        perPlateBudgetINR,
        cateredPlateCount: bufferedPlates,
        welcomeDrinks: ['Passionfruit Botanical Spritzer', 'Blue Pea & Lemongrass Cooler', 'Artisanal Cold Brew Station'],
        startersAndLiveCounters: [
          'Live Wood-Fired Neapolitan Sourdough Pizza Oven',
          'Mexican Taco & Nacho Live Bar with 3 Salsas & Guacamole',
          'Loaded Truffle & Peri-Peri Fries Counter with 4 Dips'
        ],
        mainCourseSpecialties: [
          'Artisanal Pasta Tossed in Grana Padano Wheel with Wild Mushrooms',
          'Thai Green Curry with Jasmine Rice & Wok Greens',
          'Gourmet Paneer Sliders with Caramelized Onions',
          'Roasted Mediterranean Vegetable Lasagne'
        ],
        breadsAndRice: [
          'Herbed Garlic Knots & Rosemary Focaccia',
          'Fragrant Coconut Jasmine Rice',
          'Handmade Soft Flour Tortillas'
        ],
        desserts: [
          'Live Churros Station with Warm Belgian Dark Chocolate Dip',
          'DIY Boba Tea & Gelato Counter',
          'Mini Blueberry Cheesecakes & Tiramisu Cups'
        ],
        catererQuantityBrief: `High-yield interactive stations planned for ${bufferedPlates} guests (+10% buffer). 4 rapid-fire live assembly lines to prevent guest queues.`
      };
      break;
  }

  // 3 Theme Concepts with Live CSS Hex Codes
  const themeConcepts: ThemeConcept[] = [
    {
      id: 'thm-1',
      themeName: 'Marigold & Brass Royal Heritage',
      vibeDescription: 'Warm, timeless Indian celebration aesthetics with temple bells, hand-strung marigolds, and glowing brass urulis.',
      colorPaletteHex: ['#D97706', '#92400e', '#FEF3C7', '#065F46'],
      decorFocalPoints: [
        'Grand Entrance Archway adorned with 1000+ local fresh marigold blooms & brass diyas',
        'Traditional Brass Urulis with floating flowers and floating aromatic candles',
        'Heritage photobooth with vintage carved wooden jharokha frame and brass bells'
      ],
      engagementActivities: [
        'Live Traditional Bangle-Making & Henna Art Corner',
        'Folk Acoustic Music performance during reception entry',
        'Interactive Memory Polaroid Guestbook with handwritten blessing notes'
      ],
      digitalInviteCopy: `🌸 With hearts full of joy, we warmly welcome you to ${intake.eventName}! Join us on ${intake.eventDate} in ${intake.city} for an evening of celebrations, laughter, and a sumptuous ${regionalMeta.title} feast.`
    },
    {
      id: 'thm-2',
      themeName: 'Minimalist Pastel Garden & Fairy Lights',
      vibeDescription: 'A dreamy, elegant twilight botanical setting with sheer blush drapes, fairy light canopies, and fragrant white jasmine.',
      colorPaletteHex: ['#BE123C', '#F43F5E', '#FFF1F2', '#10B981'],
      decorFocalPoints: [
        'Fairy Light Tunnel & Warm Filament Bulb Canopy over dining tables',
        'Eucalyptus, Baby’s Breath and Soft Blush Rose stage backdrop',
        'Rustic Wooden Signages and Chalkboard welcome easels with warm calligraphy'
      ],
      engagementActivities: [
        'Live Acoustic Guitar & Violin Duet during sunset dinner',
        'Curated DIY Botanical Mocktail bar with fresh herbs',
        'Celebration trivia quiz and audio-visual memory reel'
      ],
      digitalInviteCopy: `✨ Together is our favorite place to be. Please grace the ${intake.eventName} on ${intake.eventDate} at ${intake.city}. Come share our joy, music, and unforgettable memories!`
    },
    {
      id: 'thm-3',
      themeName: 'Royal Indigo & Saffron Festive Grandeur',
      vibeDescription: 'Opulent celebration style with deep royal indigo silk, rich saffron contrasts, intricate mandalas, and majestic chandeliers.',
      colorPaletteHex: ['#1E1B4B', '#EA580C', '#F59E0B', '#312E81'],
      decorFocalPoints: [
        'Royal Indigo Velvet drapery with golden zardozi borders and geometric mandalas',
        'Crystal Moroccan Chandeliers casting warm geometric shadows',
        'Grand elevated couple/honoree stage with warm ambient LED spotlights'
      ],
      engagementActivities: [
        'Choreographed family flash mob / celebratory dance entrance',
        '360-Degree Slow-Motion Spin Video Booth for guests',
        'Celebratory cake-cutting with safe indoor cold-pyro sparklers'
      ],
      digitalInviteCopy: `🪔 Join us for a grand celebration of togetherness! You are lovingly invited to ${intake.eventName} on ${intake.eventDate} in ${intake.city}. Your gracious presence will make our celebration truly complete.`
    }
  ];

  // Timeline with Safety Checks and Dual-View (Pre-Event vs Event-Day)
  const timeline: TimelineItem[] = [
    {
      id: 't-1',
      phase: 'Pre-Event Countdown',
      timeMarker: 'T-30 Days',
      taskTitle: 'Confirm venue contract & inspect acoustic/power layout',
      assignedRole: 'Host Family',
      completed: false,
      isSafetyCheck: true
    },
    {
      id: 't-2',
      phase: 'Pre-Event Countdown',
      timeMarker: 'T-21 Days',
      taskTitle: 'Finalize regional tasting menu & lock per-plate plate count',
      assignedRole: 'Venue Manager',
      completed: false,
      isSafetyCheck: false
    },
    {
      id: 't-3',
      phase: 'Pre-Event Countdown',
      timeMarker: 'T-14 Days',
      taskTitle: 'Dispatch digital invitations & track RSVP responses',
      assignedRole: 'Host Family',
      completed: false,
      isSafetyCheck: false
    },
    {
      id: 't-4',
      phase: 'Pre-Event Countdown',
      timeMarker: 'T-7 Days',
      taskTitle: 'Verify diesel generator backup & covered rain canopy shelter',
      assignedRole: 'Venue Manager',
      completed: false,
      isSafetyCheck: true
    },
    {
      id: 't-5',
      phase: 'Pre-Event Countdown',
      timeMarker: 'T-1 Day',
      taskTitle: 'Final stage floral mockup review & audio mic soundcheck',
      assignedRole: 'Decorator',
      completed: false,
      isSafetyCheck: true
    },
    {
      id: 't-6',
      phase: 'Event-Day Run Sheet',
      timeMarker: '02:00 PM',
      taskTitle: 'Venue access granted; decorator team begins stage & floral build',
      assignedRole: 'Decorator',
      completed: false,
      isSafetyCheck: false
    },
    {
      id: 't-7',
      phase: 'Event-Day Run Sheet',
      timeMarker: '04:30 PM',
      taskTitle: 'Catering service arrives; raw ingredients & buffet station safety check',
      assignedRole: 'Volunteer Lead',
      completed: false,
      isSafetyCheck: true
    },
    {
      id: 't-8',
      phase: 'Event-Day Run Sheet',
      timeMarker: '06:00 PM',
      taskTitle: 'Welcome desk open; welcome drinks & live starter counters active',
      assignedRole: 'Host Family',
      completed: false,
      isSafetyCheck: false
    },
    {
      id: 't-9',
      phase: 'Event-Day Run Sheet',
      timeMarker: '07:30 PM',
      taskTitle: 'Grand ceremonial entrance, family felicitations & photo session',
      assignedRole: 'Volunteer Lead',
      completed: false,
      isSafetyCheck: false
    },
    {
      id: 't-10',
      phase: 'Event-Day Run Sheet',
      timeMarker: '08:30 PM',
      taskTitle: 'Main feast buffet opens; live bread tandoors & dessert woks fire up',
      assignedRole: 'Venue Manager',
      completed: false,
      isSafetyCheck: false
    },
    {
      id: 't-11',
      phase: 'Event-Day Run Sheet',
      timeMarker: '10:30 PM',
      taskTitle: 'Return gift distribution, vendor accounts clearance & smooth wrap-up',
      assignedRole: 'Host Family',
      completed: false,
      isSafetyCheck: false
    }
  ];

  // Vendors
  const vendors: VendorItem[] = [
    {
      id: 'v-1',
      serviceCategory: 'Caterers',
      taskTitle: 'Regional Authentic Feast & Live Counter Partner',
      estimatedPriceRangeINR: `₹${(perPlateBudgetINR * 0.9).toFixed(0)} - ₹${(perPlateBudgetINR * 1.15).toFixed(0)} / plate`,
      vettingQuestions: [
        'Can you provide live counter chefs for our specified regional palate?',
        'Do you include uniform service staff, chafing dishes, and eco-friendly crockery?',
        'What is your protocol for replenishing hot live counters during peak dining rush?'
      ],
      whatsappInquiryTemplate: `We are looking for catering for ~${guests} guests with a target budget of ~₹${cateringAlloc.toLocaleString('en-IN')}. Please share menu catalogs and tasting dates.`,
      pinnedVendorName: '',
      quotedPriceINR: 0,
      booked: false
    },
    {
      id: 'v-2',
      serviceCategory: 'Venues',
      taskTitle: `${intake.venueType} Facility & Event Hall Rental`,
      estimatedPriceRangeINR: `₹${(total * 0.18).toFixed(0)} - ₹${(total * 0.24).toFixed(0)}`,
      vettingQuestions: [
        'Does the rental fee include 100% generator power backup and air-conditioning?',
        'What are the permissible music sound limits and timing cutoff rules?',
        'Is there a designated covered rain contingency area in case of weather change?'
      ],
      whatsappInquiryTemplate: `Checking date availability for ${intake.eventDate} for ~${guests} guests. Please share banquet package details and parking capacity.`,
      pinnedVendorName: '',
      quotedPriceINR: 0,
      booked: false
    },
    {
      id: 'v-3',
      serviceCategory: 'Decorators',
      taskTitle: 'Theme Stage, Floral Decor & Ambient Lighting Specialist',
      estimatedPriceRangeINR: `₹${(total * 0.12).toFixed(0)} - ₹${(total * 0.17).toFixed(0)}`,
      vettingQuestions: [
        'Can you execute the theme with fresh flowers and warm brass/fairy lighting?',
        'Do you provide custom entrance arches and dining table centerpieces?',
        'What time will your team begin setup on the morning of the celebration?'
      ],
      whatsappInquiryTemplate: `Reaching out for event decor on ${intake.eventDate}. Target vibe: ${themeConcepts[0].themeName}. Please share recent portfolio pictures.`,
      pinnedVendorName: '',
      quotedPriceINR: 0,
      booked: false
    },
    {
      id: 'v-4',
      serviceCategory: 'Photographers',
      taskTitle: 'Candid Moments, Traditional Coverage & Cinematic Reels',
      estimatedPriceRangeINR: `₹${(total * 0.06).toFixed(0)} - ₹${(total * 0.09).toFixed(0)}`,
      vettingQuestions: [
        'How many photographers/videographers will be on-site on event day?',
        'What is your turnaround time for edited candid photos and high-resolution reels?',
        'Do you offer drone photography if the venue permits?'
      ],
      whatsappInquiryTemplate: `Inquiring for photography coverage on ${intake.eventDate} in ${intake.city}. Please share your package options and sample album links.`,
      pinnedVendorName: '',
      quotedPriceINR: 0,
      booked: false
    },
    {
      id: 'v-5',
      serviceCategory: 'Sound & Artist',
      taskTitle: 'Acoustic Sound System, Cultural DJ & Live Performer',
      estimatedPriceRangeINR: `₹${(total * 0.03).toFixed(0)} - ₹${(total * 0.05).toFixed(0)}`,
      vettingQuestions: [
        'Does the package include digital sound mixer, cordless microphones, and monitors?',
        'Can you curate a customized playlist matching our regional cultural theme?',
        'Do you handle local music licensing and sound compliance guidelines?'
      ],
      whatsappInquiryTemplate: `Seeking sound & music equipment setup for ${intake.eventName} on ${intake.eventDate}. Please share equipment specs and pricing.`,
      pinnedVendorName: '',
      quotedPriceINR: 0,
      booked: false
    }
  ];

  // Preserve previous states if hydrating
  if (previousState) {
    const prevTimelineMap = new Map(previousState.timeline.map((t) => [t.taskTitle, t]));
    timeline.forEach((item) => {
      const prev = prevTimelineMap.get(item.taskTitle);
      if (prev) item.completed = prev.completed;
    });

    const prevVendorMap = new Map(previousState.vendors.map((v) => [v.serviceCategory, v]));
    vendors.forEach((item) => {
      const prev = prevVendorMap.get(item.serviceCategory);
      if (prev) {
        item.pinnedVendorName = prev.pinnedVendorName;
        item.quotedPriceINR = prev.quotedPriceINR;
        item.booked = prev.booked;
      }
    });
  }

  const calmNote = `Relax and savor the excitement! We have securely reserved ₹${comfortCushionINR.toLocaleString('en-IN')} as your 10% Peace-of-Mind Buffer, and scaled catering to ${bufferedPlates} plates so food never runs short.`;

  const summary = adjustmentPrompt
    ? `Smoothly rebalanced for "${adjustmentPrompt}". Your locked categories and booked vendors are preserved, while food and flow remain perfectly harmonious.`
    : `Celebration master plan created with ₹${comfortCushionINR.toLocaleString('en-IN')} Comfort Cushion, +10% catering buffer (${bufferedPlates} plates), and authentic ${regionalMeta.title}.`;

  return {
    intake,
    peaceOfMind: {
      comfortCushionINR,
      extraPlateBufferCount: bufferedPlates,
      weatherAndPowerSafeguard: `${intake.venueType === 'Outdoor Lawn' ? 'Covered waterproof canopy reserve + backup indoor salon' : 'Heavy-duty 100% DG set power backup + dual air-flow ventilation'}`,
      calmReassuranceNote: calmNote
    },
    costPerGuestINR: Math.round(total / guests),
    budgetBreakdown,
    feastMenu,
    themeConcepts,
    selectedThemeIndex: previousState?.selectedThemeIndex || 0,
    timeline,
    vendors,
    sahayakHistory: previousState?.sahayakHistory || [],
    lastSahayakSummary: summary
  };
}
