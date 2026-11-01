/**
 * Generates an SVG data URI for a circular avatar with initials.
 * Used for clean, self-contained vector avatars without external image dependencies.
 */
export function generateAvatarSvg(initials: string, bgColor: string = '#4A7B76'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="${bgColor}"/><text x="40" y="40" dy="0.35em" text-anchor="middle" fill="white" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="600">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Generates an SVG data URI for a generic venue/location placeholder.
 */
export function generateVenuePlaceholder(label: string, bgColor: string = '#F5EFEA'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="${bgColor}"/><text x="200" y="120" text-anchor="middle" fill="#7A8288" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="500">${label}</text><path d="M185 145 l15-20 l15 20z M195 145 l10-13 l10 13z" fill="#7A8288" opacity="0.4"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Generates an SVG data URI for a hero/splash image placeholder.
 */
export function generateHeroPlaceholder(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4A7B76" stop-opacity="0.15"/><stop offset="100%" stop-color="#D96B52" stop-opacity="0.15"/></linearGradient></defs><rect width="600" height="400" fill="#F5EFEA"/><rect width="600" height="400" fill="url(#g)"/><text x="300" y="180" text-anchor="middle" fill="#2C3844" font-family="Cormorant Garamond, serif" font-size="36" font-weight="600">Utsav</text><text x="300" y="220" text-anchor="middle" fill="#7A8288" font-family="Plus Jakarta Sans, sans-serif" font-size="14">Celebration Planner</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
