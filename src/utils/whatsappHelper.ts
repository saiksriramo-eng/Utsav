import { EventIntake, VendorItem } from '../types/utsav';

export function buildVendorWhatsAppMessage(
  intake: EventIntake,
  vendor: VendorItem
): string {
  const greeting = `Namaste! Reaching out regarding the upcoming ${intake.eventName} (${intake.category} - ${intake.subEvent}).`;
  const specs = `\n📅 Date: ${intake.eventDate}\n📍 Location: ${intake.city} (${intake.venueType})\n👥 Expected Guests: ~${intake.guestCount}\n💰 Target Allocation Range: ${vendor.estimatedPriceRangeINR}`;
  const body = `\n\n${vendor.whatsappInquiryTemplate}`;
  const questions =
    vendor.vettingQuestions.length > 0
      ? `\n\nKindly share availability and package details covering:\n${vendor.vettingQuestions
          .map((q, i) => `${i + 1}. ${q}`)
          .join('\n')}`
      : '';

  return `${greeting}${specs}${body}${questions}\n\nWarm regards!`;
}

export function buildWhatsAppUrl(
  intake: EventIntake,
  vendor: VendorItem
): string {
  const fullMessage = buildVendorWhatsAppMessage(intake, vendor);
  return `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
}
