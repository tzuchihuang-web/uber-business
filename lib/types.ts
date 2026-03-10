// --- Core Types ---

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  home_label: string;
  home_address: string;
  work_label: string;
  work_address: string;
  created_at: string;
}

export interface Trip {
  id: string;
  user_id: string;
  pickup: string;
  dropoff: string;
  trip_time: string;
  category: "business" | "personal";
  purpose: TripPurpose;
  miles: number;
  fare_estimate: number;
  guarantee_selected: boolean;
  status: "completed" | "cancelled" | "in_progress";
  created_at: string;
}

export type TripPurpose =
  | "Meeting"
  | "Airport"
  | "Commute"
  | "Errand"
  | "Dinner"
  | "Shopping"
  | "Other";

export interface FrequentRoute {
  pickup: string;
  dropoff: string;
  count: number;
}

export interface RiderInsights {
  // Core percentages
  businessShare: number;
  labeledShare: number;
  
  // Purpose analysis
  topPurpose: TripPurpose | null;
  topPurposeShare: number;
  purposeBreakdown: Record<TripPurpose, number>;
  
  // Pattern analysis
  frequentRoutes: FrequentRoute[];
  frequentTimeOfDay: "morning" | "afternoon" | "evening" | "mixed";
  peakHours: number[];
  
  // Guarantee metrics
  guaranteeAttachRate: number;
  totalTrips: number;
  businessTrips: number;
  personalTrips: number;
  
  // Badges
  primaryBadge: string | null;
  subBadge: string | null;
  fallbackMessage: string | null;
  
  // Pricing
  discountEligible: boolean;
  price: number;
  originalPrice: number | null;
  
  // Warnings
  lowLabelWarning: boolean;
}

// --- Utility Functions ---

export function computeBusinessShare(trips: Trip[]): number {
  if (trips.length === 0) return 0;
  const businessTrips = trips.filter((t) => t.category === "business").length;
  return businessTrips / trips.length;
}

export function computeLabeledShare(trips: Trip[]): number {
  if (trips.length === 0) return 0;
  const labeledTrips = trips.filter((t) => t.purpose !== "Other").length;
  return labeledTrips / trips.length;
}

export function computePurposeBreakdown(
  trips: Trip[]
): Record<TripPurpose, number> {
  const purposes: TripPurpose[] = [
    "Meeting",
    "Airport",
    "Commute",
    "Errand",
    "Dinner",
    "Shopping",
    "Other",
  ];
  const breakdown: Record<TripPurpose, number> = {} as Record<TripPurpose, number>;
  
  for (const purpose of purposes) {
    const count = trips.filter((t) => t.purpose === purpose).length;
    breakdown[purpose] = trips.length > 0 ? count / trips.length : 0;
  }
  
  return breakdown;
}

export function computeTopPurpose(
  trips: Trip[]
): { purpose: TripPurpose | null; share: number } {
  if (trips.length === 0) return { purpose: null, share: 0 };
  
  const labeledTrips = trips.filter((t) => t.purpose !== "Other");
  if (labeledTrips.length === 0) return { purpose: null, share: 0 };
  
  const counts: Partial<Record<TripPurpose, number>> = {};
  for (const trip of labeledTrips) {
    counts[trip.purpose] = (counts[trip.purpose] || 0) + 1;
  }
  
  let maxPurpose: TripPurpose | null = null;
  let maxCount = 0;
  for (const [purpose, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxPurpose = purpose as TripPurpose;
    }
  }
  
  return {
    purpose: maxPurpose,
    share: maxPurpose ? maxCount / trips.length : 0,
  };
}

export function computeFrequentRoutes(trips: Trip[]): FrequentRoute[] {
  const routeMap = new Map<string, FrequentRoute>();
  
  for (const trip of trips) {
    const key = `${trip.pickup}|${trip.dropoff}`;
    const existing = routeMap.get(key);
    if (existing) {
      existing.count++;
    } else {
      routeMap.set(key, {
        pickup: trip.pickup,
        dropoff: trip.dropoff,
        count: 1,
      });
    }
  }
  
  return Array.from(routeMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export function computeFrequentTimeOfDay(
  trips: Trip[]
): "morning" | "afternoon" | "evening" | "mixed" {
  if (trips.length === 0) return "mixed";
  
  let morning = 0; // 5am - 12pm
  let afternoon = 0; // 12pm - 5pm
  let evening = 0; // 5pm - 10pm
  
  for (const trip of trips) {
    const hour = new Date(trip.trip_time).getHours();
    if (hour >= 5 && hour < 12) morning++;
    else if (hour >= 12 && hour < 17) afternoon++;
    else if (hour >= 17 && hour < 22) evening++;
  }
  
  const total = morning + afternoon + evening;
  if (total === 0) return "mixed";
  
  const threshold = 0.5;
  if (morning / total >= threshold) return "morning";
  if (afternoon / total >= threshold) return "afternoon";
  if (evening / total >= threshold) return "evening";
  return "mixed";
}

export function computePeakHours(trips: Trip[]): number[] {
  const hourCounts: Record<number, number> = {};
  
  for (const trip of trips) {
    const hour = new Date(trip.trip_time).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }
  
  return Object.entries(hourCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([hour]) => parseInt(hour));
}

export function computeGuaranteeAttachRate(trips: Trip[]): number {
  if (trips.length === 0) return 0;
  const withGuarantee = trips.filter((t) => t.guarantee_selected).length;
  return withGuarantee / trips.length;
}

export function getPrimaryBadge(businessShare: number): string | null {
  return businessShare >= 0.8 ? "Business-Mode Rider" : null;
}

export function getSubBadge(
  topPurpose: TripPurpose | null,
  topPurposeShare: number,
  labeledShare: number
): { subBadge: string | null; fallbackMessage: string | null } {
  if (labeledShare < 0.2) {
    return {
      subBadge: null,
      fallbackMessage: "Label more trips to unlock detailed insights",
    };
  }
  
  let subBadge: string | null = null;
  if (topPurpose === "Meeting" && topPurposeShare >= 0.25) {
    subBadge = "Meeting Machine";
  } else if (topPurpose === "Airport" && topPurposeShare >= 0.25) {
    subBadge = "Frequent Flyer";
  } else if (topPurpose === "Commute" && topPurposeShare >= 0.25) {
    subBadge = "Daily Commuter";
  }
  
  return { subBadge, fallbackMessage: null };
}

export function shouldRecommendGuarantee(
  pickup: string,
  dropoff: string,
  purpose: TripPurpose,
  category: "business" | "personal",
  insights: RiderInsights
): { recommend: boolean; reason: string | null } {
  // Always recommend for business category
  if (category === "business") {
    return {
      recommend: true,
      reason: "Business rides benefit from guaranteed pricing",
    };
  }
  
  // Recommend if this matches a frequent route
  const isFrequentRoute = insights.frequentRoutes.some(
    (r) => r.pickup === pickup && r.dropoff === dropoff && r.count >= 3
  );
  if (isFrequentRoute) {
    return {
      recommend: true,
      reason: "This is one of your frequent routes",
    };
  }
  
  // Recommend if purpose is typically business
  if (purpose === "Meeting" || purpose === "Airport") {
    return {
      recommend: true,
      reason: `${purpose} trips often benefit from price protection`,
    };
  }
  
  // Recommend if user has high guarantee attach rate
  if (insights.guaranteeAttachRate >= 0.5) {
    return {
      recommend: true,
      reason: "Based on your usual preferences",
    };
  }
  
  return { recommend: false, reason: null };
}

const BASE_PRICE = 0.99;
const DISCOUNT_PRICE = 0.79;

export function getRiderInsights(trips: Trip[]): RiderInsights {
  const businessShare = computeBusinessShare(trips);
  const labeledShare = computeLabeledShare(trips);
  const { purpose: topPurpose, share: topPurposeShare } = computeTopPurpose(trips);
  const purposeBreakdown = computePurposeBreakdown(trips);
  const frequentRoutes = computeFrequentRoutes(trips);
  const frequentTimeOfDay = computeFrequentTimeOfDay(trips);
  const peakHours = computePeakHours(trips);
  const guaranteeAttachRate = computeGuaranteeAttachRate(trips);
  
  const primaryBadge = getPrimaryBadge(businessShare);
  const { subBadge, fallbackMessage } = getSubBadge(
    topPurpose,
    topPurposeShare,
    labeledShare
  );
  
  const discountEligible = businessShare >= 0.8;
  const price = discountEligible ? DISCOUNT_PRICE : BASE_PRICE;
  const originalPrice = discountEligible ? BASE_PRICE : null;
  
  const businessTrips = trips.filter((t) => t.category === "business").length;
  const personalTrips = trips.filter((t) => t.category === "personal").length;
  
  return {
    businessShare,
    labeledShare,
    topPurpose,
    topPurposeShare,
    purposeBreakdown,
    frequentRoutes,
    frequentTimeOfDay,
    peakHours,
    guaranteeAttachRate,
    totalTrips: trips.length,
    businessTrips,
    personalTrips,
    primaryBadge,
    subBadge,
    fallbackMessage,
    discountEligible,
    price,
    originalPrice,
    lowLabelWarning: labeledShare < 0.2,
  };
}

// Helper to format hour as readable time
export function formatHour(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

// Helper to get greeting based on time of day
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
