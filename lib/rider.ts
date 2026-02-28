// --- Mock rider data ---
export const rider = {
  businessShare: 0.93,
  labeledShare: 0.56,
  topPurpose: "Meeting",
  topPurposeShare: 0.29,
};

// --- Business rules ---

export interface RiderInsight {
  /** e.g. "Business-Mode Rider" — shown when businessShare >= 0.8 */
  primaryBadge: string | null;
  /** Whether the rider qualifies for a discount */
  discountEligible: boolean;
  /** e.g. "Meeting Machine" — derived from topPurpose rules */
  subBadge: string | null;
  /** Shown when labeledShare < 0.2 (in place of subBadge) */
  fallbackMessage: string | null;
  /** Formatted percentage string, e.g. "93%" */
  businessPct: string;
}

export function getRiderInsight(
  r: typeof rider = rider
): RiderInsight {
  const primaryBadge =
    r.businessShare >= 0.8 ? "Business-Mode Rider" : null;

  const discountEligible = r.businessShare >= 0.8;

  let subBadge: string | null = null;
  let fallbackMessage: string | null = null;

  if (r.labeledShare < 0.2) {
    // Hide sub-badge entirely; show fallback
    fallbackMessage =
      "Label more trips to unlock detailed insights";
  } else {
    // Eligible for sub-badge
    if (
      r.topPurpose === "Meeting" &&
      r.topPurposeShare >= 0.25
    ) {
      subBadge = "Meeting Machine";
    }
  }

  const businessPct = `${Math.round(r.businessShare * 100)}%`;

  return {
    primaryBadge,
    discountEligible,
    subBadge,
    fallbackMessage,
    businessPct,
  };
}
