# 🪔 Utsav — GenAI Celebration & Event Planner

> **A Reactive Indian Celebration & Event Command Center Powered by Google Gemini 2.5 Flash, the Proactive Peace-of-Mind Shield, and Synchronized 4-Pillar State Architecture.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-amber.svg)](https://tailwindcss.com/)
[![Google GenAI SDK](https://img.shields.io/badge/@google/genai-v2.30+-emerald.svg)](https://ai.google.dev/)
[![Gemini 2.5 Flash](https://img.shields.io/badge/Gemini-2.5--flash-rose.svg)](https://ai.google.dev/)

---

## 🌟 Executive Summary & Psychological Paradigm

Event management is notorious for operational fragmentation across disconnected spreadsheets, messaging channels, and static inspiration boards. Traditional generative AI wrappers exacerbate host stress by generating uneditable walls of static markdown text that break the moment a real-world constraint shifts (e.g., an unexpected guest count increase or a higher-than-expected venue quote).

**Project Utsav** transforms event planning into a synchronized, single-source-of-truth JSON state tree. Rather than amplifying host anxiety with crisis terminology, Utsav embeds psychological safety into its foundational calculation engine:

1. **10% Comfort Cushion (Peace-of-Mind Reserve)**: Automatically sets aside 10% of the total budget into a protected financial reserve before distributing funds across active vendor categories.
2. **+10% Extra Plate Catering Buffer**: Automatically briefs caterers for `Math.ceil(guestCount * 1.10)` portions so no guest is ever turned away hungry.
3. **Proactive Safeguards**: Pre-populates weather contingency shelters, acoustic clearances, and 100% DG generator load testing into the logistics schedule.
4. **Utsav Sahayak Co-Planner**: A calm bottom dock that rebalances unlocked budget categories, menu complexity, and run-of-show timelines while preserving locked quotes, completed milestones, and booked vendor details.

---

## 🏛️ The 4 Synchronized Command Center Pillars

| Pillar | Core Capabilities & User Experience | State & Algorithmic Mechanics |
| :--- | :--- | :--- |
| **1. Dynamic Budget Engine** | Category progress bars, per-guest investment KPI, inline actual-spend logging, and category lock toggles. | Computes live variance, protects locked categories (`isLocked: true`) during AI rebalancing, and synchronizes with pinned vendor quotes. |
| **2. Regional Feast & Theme Studio** | Connects cultural identity to per-plate catering math (`perPlateBudgetINR = cateringAllocated / bufferedPlates`). Displays 3 theme concepts with live CSS hex swatches, guest games, and 1-click digital invitations. | Supports 4 Regional Culinary Triggers (*Southern Sambar & Sadhya*, *Northern Naan & Nawabi*, *Deccan & Royal Nizami*, *Global Fusion & Street*). |
| **3. Dual-View Timeline & Run Sheet** | Switches between a **Pre-Event Countdown** (T-30 to T-1 days) and an **Event-Day Minute-by-Minute Run Sheet**. | Includes role filtering, proactive safety check badges, and celebratory `canvas-confetti` micro-interactions upon completing milestones. |
| **4. Smart Vendor Radar & Local Map** | Pairs fair price benchmarks and 3 diligence vetting questions with a 1-click WhatsApp inquiry generator and a live zero-key Google Maps search embed. | Embeds live Google Maps query iframe (`https://www.google.com/maps?q=...&output=embed`) with category filter pills (*🍽️ Caterers*, *🌸 Decorators*, *📸 Photographers*, *🏛️ Venues*). |

---

## 🧠 Autonomous GenAI Architecture (`@google/genai`)

- **Unified Client**: Uses exclusively the modern `@google/genai` TypeScript SDK (`GoogleGenAI`, `Type`, `Schema`) targeting `gemini-2.5-flash`.
- **Strict Structured Outputs**: Configured with `responseMimeType: 'application/json'` and `responseSchema: UTSAV_PLAN_SCHEMA` using native `Type.OBJECT`, `Type.ARRAY`, `Type.STRING`, `Type.NUMBER`, and `Type.BOOLEAN`.
- **Clean Prompt Separation**: System instructions contain no duplicated raw JSON schema text, preserving model token efficiency and response fidelity.
- **Sliding History Window**: Formats the last 10 conversation turns (`[Host]: ...`, `[UtsavSahayak]: ...`) for context-aware, state-preserving plan adjustments.
- **Resilient Fallback**: Features automatic retry handling and a high-fidelity deterministic celebration engine when running in offline or sandbox evaluation environments.

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/Utsav.git
cd Utsav

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy the template and configure your Gemini API Key:
```bash
cp .env.example .env
```
Inside `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, Utsav smoothly operates in high-fidelity offline demonstration mode with complete regional cultural presets).*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build & Type Checking
```bash
# Strict TypeScript validation
npx tsc --noEmit

# Production bundle compilation
npm run build
```

---

## 📂 Project Structure

```
Utsav/
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore specification
├── index.html                      # HTML entry with Playfair Display & Plus Jakarta Sans
├── package.json                    # Project dependencies & scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Custom festive Indian palette (marigold, kumkum, emerald-calm)
├── tsconfig.json                   # Root TypeScript config
├── tsconfig.app.json               # Bundler TypeScript compiler options
├── UTSAV_MASTERPRINT.md            # Autonomous engineering specification
└── src/
    ├── main.tsx                    # React DOM entry point
    ├── App.tsx                     # Single source of truth, localStorage & pillar coordination
    ├── index.css                   # Tailwind directives, custom scrollbars & glassmorphism
    ├── types/
    │   └── utsav.ts                # Unified state data contracts (UtsavEventState, EventIntake, etc.)
    ├── constants/
    │   └── regionalVibes.ts        # Regional culinary triggers, demo presets & map filters
    ├── utils/
    │   └── whatsappHelper.ts       # RFC-3986 WhatsApp brief & vetting questions builder
    ├── services/
    │   └── geminiService.ts        # GoogleGenAI client, structured schema & Sahayak rebalance
    └── components/
        ├── Header.tsx              # Brand identity, live event badge & JSON export
        ├── OnboardingIntake.tsx    # 4-step calm wizard with 1-click judge presets
        ├── PeaceOfMindBanner.tsx   # Persistent 10% cushion & +10% plate buffer banner
        ├── BudgetEngine.tsx        # Pillar 1: Progress bars, locks, KPIs & quote sync
        ├── FeastAndThemeStudio.tsx # Pillar 2: Calculated menu, palate switcher & hex swatches
        ├── TimelineRunSheet.tsx    # Pillar 3: Dual countdown/run sheet with confetti checks
        ├── VendorRadarMap.tsx      # Pillar 4: WhatsApp inquiries, diligence & Google Maps embed
        └── UtsavSahayakBar.tsx     # Floating bottom dock with 4 calm rebalancing chips
```

---

## 🎨 Cultural Palette Tokens

- **Marigold Warmth**: `#D97706` / `#F59E0B` (Auspicious Indian festive golden amber)
- **Kumkum & Sindoor**: `#BE123C` / `#E11D48` (Ceremonial warmth & vitality)
- **Emerald Calm**: `#047857` / `#10B981` (Peace-of-Mind financial & contingency shield)
- **Ivory Warmth**: `#FDFBF7` / `#FEF3C7` (Luxurious festive silks and textured paper)

---

## 📜 License
MIT License. Crafted with empathy and cultural reverence for Indian celebrations.
