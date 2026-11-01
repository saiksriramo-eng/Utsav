import React, { useState } from 'react';
import {
  User,
  Mail,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Heart,
  CheckCircle2,
  Calendar,
  Lock
} from 'lucide-react';
import { UtsavAIIcon } from './icons/UtsavAIIcon';
import { generateAvatarSvg, generateHeroPlaceholder } from '../utils/avatarHelper';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
  eventCode: string;
}

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Event Host / Couple');
  const [eventCode, setEventCode] = useState('WED-2024-JUL');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

    const user: AuthUser = {
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@utsav.app`,
      role,
      avatar:
        role.includes('Host') || role.includes('Couple')
          ? generateAvatarSvg(initials, '#D96B52')
          : role.includes('Planner')
          ? generateAvatarSvg(initials, '#4A7B76')
          : generateAvatarSvg(initials, '#2C3844'),
      eventCode: eventCode.trim() || 'WED-2024-JUL',
    };

    onLogin(user);
  };

  const handleQuickLogin = (demoRole: 'host' | 'planner' | 'photographer') => {
    let user: AuthUser;
    if (demoRole === 'host') {
      user = {
        name: 'Kristina & Steven',
        email: 'kristina.steven@utsav.app',
        role: 'Event Host / Couple',
        avatar: generateAvatarSvg('KS', '#D96B52'),
        eventCode: 'WED-2024-JUL',
      };
    } else if (demoRole === 'planner') {
      user = {
        name: 'Meredith Grey',
        email: 'meredith@utsav.app',
        role: 'Lead Wedding Planner',
        avatar: generateAvatarSvg('MG', '#4A7B76'),
        eventCode: 'WED-2024-JUL',
      };
    } else {
      user = {
        name: 'John Pettis',
        email: 'john@utsav.app',
        role: 'Lead Photographer & Crew',
        avatar: generateAvatarSvg('JP', '#2C3844'),
        eventCode: 'WED-2024-JUL',
      };
    }
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-[#F5EFEA] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl bg-white rounded-[28px] sm:rounded-[36px] shadow-ambient-md border border-black/[0.05] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* =========================================================================
            LEFT COLUMN: EDITORIAL VISUAL HERO (Visible on Laptop / Large Screens)
           ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 text-white overflow-hidden bg-slateNavy">
          {/* Subtle Decorative Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-slateNavy via-[#23303c] to-[#1a232b] opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,123,118,0.35),transparent_60%)]" />

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-sageTeal text-white flex items-center justify-center shadow-ambient-sm">
              <UtsavAIIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-[22px] font-semibold tracking-wide text-white">
                Utsav
              </span>
              <span className="text-[10px] block text-white/70 font-medium tracking-wider uppercase">
                Luxury Celebration Command Center
              </span>
            </div>
          </div>

          {/* Center Editorial Quote */}
          <div className="relative z-10 space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-semibold tracking-wider uppercase text-white/90 border border-white/20 inline-block">
              Intelligent Co-Planning
            </span>
            <h2 className="font-display font-semibold text-[32px] leading-tight text-white">
              All Your Event Details, Effortlessly Organized.
            </h2>
            <p className="text-[13px] text-white/80 leading-relaxed font-sans">
              Instant access to run-of-show minute schedules, floor plans, budget shields, regional feast curation, and vendor live radar.
            </p>
          </div>

          {/* Bottom Live Metric Badge */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[12px] text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Event System Active</span>
            </div>
            <span className="font-semibold text-white">Jaipur & Grand Rapids</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: SIGN-IN FORM & USER CREDENTIALS INTAKE
           ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Mobile Header Brand (Visible on mobile only) */}
            <div className="lg:hidden flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-full bg-sageTeal text-white flex items-center justify-center shadow-ambient-sm">
                <UtsavAIIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-[22px] font-semibold text-charcoal">
                  Utsav
                </h1>
                <span className="text-[11px] text-charcoal-muted">
                  Celebration Command Center
                </span>
              </div>
            </div>

            {/* Form Title */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-sageTeal uppercase tracking-wider">
                User Authentication
              </span>
              <h2 className="font-display font-semibold text-[26px] sm:text-[30px] text-charcoal mt-0.5 leading-tight">
                Enter Event Workspace
              </h2>
              <p className="text-[13px] text-charcoal-muted mt-1">
                Please enter your details to open the synchronized celebration command center.
              </p>
            </div>

            {/* Quick Demo Login Chips */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-charcoal-muted uppercase block mb-2">
                Fast Sign-In (Demo Profiles)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('host')}
                  className="p-2.5 rounded-subcard bg-cream-50 hover:bg-cream-100 border border-black/[0.06] text-left transition-all flex items-center gap-2 shadow-ambient-sm"
                >
                  <img
                    src={generateAvatarSvg('KS', '#D96B52')}
                    alt="Host"
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-[12px] text-charcoal truncate">Kristina (Host)</p>
                    <p className="text-[10px] text-terracotta">Bride & Groom</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('planner')}
                  className="p-2.5 rounded-subcard bg-cream-50 hover:bg-cream-100 border border-black/[0.06] text-left transition-all flex items-center gap-2 shadow-ambient-sm"
                >
                  <img
                    src={generateAvatarSvg('MG', '#4A7B76')}
                    alt="Planner"
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-[12px] text-charcoal truncate">Meredith Grey</p>
                    <p className="text-[10px] text-sageTeal">Lead Planner</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('photographer')}
                  className="p-2.5 rounded-subcard bg-cream-50 hover:bg-cream-100 border border-black/[0.06] text-left transition-all flex items-center gap-2 shadow-ambient-sm"
                >
                  <img
                    src={generateAvatarSvg('JP', '#2C3844')}
                    alt="Crew"
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-[12px] text-charcoal truncate">John Pettis</p>
                    <p className="text-[10px] text-slateNavy">Photographer</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Main Intake Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-charcoal mb-1">
                  Full Name / Host Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kristina Anderson"
                    className="w-full bg-cream-50/70 border border-black/[0.08] rounded-subcard pl-10 pr-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-charcoal mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kristina@utsav.app"
                      className="w-full bg-cream-50/70 border border-black/[0.08] rounded-subcard pl-10 pr-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-charcoal mb-1">
                    Role in Event
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-cream-50/70 border border-black/[0.08] rounded-subcard px-3.5 py-2.5 text-[13px] text-charcoal focus:outline-none focus:ring-1 focus:ring-sageTeal transition-all"
                  >
                    <option value="Event Host / Couple">Event Host / Bride & Groom</option>
                    <option value="Lead Wedding Planner">Lead Wedding Planner</option>
                    <option value="Photographer & Media Crew">Photographer & Media Crew</option>
                    <option value="Catering & Culinary Lead">Catering & Culinary Lead</option>
                    <option value="Family Member / Guest">Family Member / Guest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-charcoal mb-1">
                  Event Access Passkey / Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={eventCode}
                    onChange={(e) => setEventCode(e.target.value)}
                    placeholder="WED-2024-JUL"
                    className="w-full bg-cream-50/70 border border-black/[0.08] rounded-subcard pl-10 pr-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-charcoal">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-black/20 text-sageTeal focus:ring-sageTeal w-4 h-4"
                  />
                  <span>Remember my workspace session</span>
                </label>

                <span className="text-[11px] text-sageTeal font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Secure
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-sageTeal text-white font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-sageTeal-dark transition-all shadow-ambient hover:shadow-ambient-md"
                >
                  <span>Enter Event Command Center</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-charcoal-muted text-center mt-6">
            Protected by Utsav Private Key Encryption • Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
