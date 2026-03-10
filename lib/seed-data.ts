import { Profile, Trip, TripPurpose } from "./types";

// --- Demo Profiles ---

export const demoProfiles: Profile[] = [
  {
    id: "demo-amy",
    full_name: "Amy Chen",
    email: "amy.chen@acme.co",
    home_label: "Home",
    home_address: "221B Baker St, Manhattan",
    work_label: "Office",
    work_address: "350 5th Ave, New York",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "demo-jordan",
    full_name: "Jordan Lee",
    email: "jordan.lee@startup.io",
    home_label: "Home",
    home_address: "45 Park Ave, Brooklyn",
    work_label: "WeWork",
    work_address: "315 W 36th St, Manhattan",
    created_at: "2024-02-20T14:30:00Z",
  },
  {
    id: "demo-maya",
    full_name: "Maya Patel",
    email: "maya.patel@freelance.com",
    home_label: "Apartment",
    home_address: "123 Main St, Queens",
    work_label: "Studio",
    work_address: "88 Leonard St, Tribeca",
    created_at: "2024-03-10T09:15:00Z",
  },
];

// --- Helper to generate trips ---

function generateTrip(
  id: string,
  userId: string,
  pickup: string,
  dropoff: string,
  tripTime: string,
  category: "business" | "personal",
  purpose: TripPurpose,
  miles: number,
  fareEstimate: number,
  guaranteeSelected: boolean
): Trip {
  return {
    id,
    user_id: userId,
    pickup,
    dropoff,
    trip_time: tripTime,
    category,
    purpose,
    miles,
    fare_estimate: fareEstimate,
    guarantee_selected: guaranteeSelected,
    status: "completed",
    created_at: tripTime,
  };
}

// --- Amy's Trips (20 trips, ~85% business, high Meeting share) ---

const amyTrips: Trip[] = [
  // Business trips (17 trips)
  generateTrip("amy-1", "demo-amy", "221B Baker St", "350 5th Ave", "2026-03-10T08:30:00Z", "business", "Meeting", 3.2, 24.50, true),
  generateTrip("amy-2", "demo-amy", "350 5th Ave", "221B Baker St", "2026-03-10T18:15:00Z", "business", "Commute", 3.2, 22.80, true),
  generateTrip("amy-3", "demo-amy", "221B Baker St", "JFK Airport", "2026-03-08T06:00:00Z", "business", "Airport", 18.5, 68.00, true),
  generateTrip("amy-4", "demo-amy", "JFK Airport", "221B Baker St", "2026-03-07T21:30:00Z", "business", "Airport", 18.5, 72.50, true),
  generateTrip("amy-5", "demo-amy", "350 5th Ave", "200 Park Ave", "2026-03-06T10:00:00Z", "business", "Meeting", 1.8, 15.20, true),
  generateTrip("amy-6", "demo-amy", "200 Park Ave", "350 5th Ave", "2026-03-06T12:30:00Z", "business", "Meeting", 1.8, 14.80, false),
  generateTrip("amy-7", "demo-amy", "221B Baker St", "350 5th Ave", "2026-03-05T08:45:00Z", "business", "Commute", 3.2, 23.50, true),
  generateTrip("amy-8", "demo-amy", "350 5th Ave", "85 Broad St", "2026-03-04T14:00:00Z", "business", "Meeting", 4.1, 28.90, true),
  generateTrip("amy-9", "demo-amy", "85 Broad St", "221B Baker St", "2026-03-04T17:30:00Z", "business", "Meeting", 5.2, 32.40, true),
  generateTrip("amy-10", "demo-amy", "221B Baker St", "350 5th Ave", "2026-03-03T09:00:00Z", "business", "Meeting", 3.2, 24.10, true),
  generateTrip("amy-11", "demo-amy", "350 5th Ave", "One World Trade", "2026-03-01T11:00:00Z", "business", "Meeting", 3.8, 26.50, true),
  generateTrip("amy-12", "demo-amy", "One World Trade", "350 5th Ave", "2026-03-01T15:00:00Z", "business", "Meeting", 3.8, 27.20, true),
  generateTrip("amy-13", "demo-amy", "221B Baker St", "350 5th Ave", "2026-02-28T08:30:00Z", "business", "Commute", 3.2, 23.80, true),
  generateTrip("amy-14", "demo-amy", "350 5th Ave", "221B Baker St", "2026-02-28T19:00:00Z", "business", "Commute", 3.2, 25.60, false),
  generateTrip("amy-15", "demo-amy", "221B Baker St", "LaGuardia Airport", "2026-02-25T07:00:00Z", "business", "Airport", 12.3, 48.00, true),
  generateTrip("amy-16", "demo-amy", "350 5th Ave", "Grand Central", "2026-02-22T09:30:00Z", "business", "Meeting", 1.2, 12.50, true),
  generateTrip("amy-17", "demo-amy", "Grand Central", "350 5th Ave", "2026-02-22T12:00:00Z", "business", "Meeting", 1.2, 11.80, true),
  
  // Personal trips (3 trips)
  generateTrip("amy-18", "demo-amy", "221B Baker St", "Metropolitan Museum", "2026-03-09T14:00:00Z", "personal", "Other", 2.5, 18.50, false),
  generateTrip("amy-19", "demo-amy", "Metropolitan Museum", "221B Baker St", "2026-03-09T18:00:00Z", "personal", "Dinner", 2.5, 19.20, false),
  generateTrip("amy-20", "demo-amy", "221B Baker St", "Central Park", "2026-02-26T10:00:00Z", "personal", "Other", 1.8, 14.00, false),
];

// --- Jordan's Trips (12 trips, ~58% business, mixed purposes) ---

const jordanTrips: Trip[] = [
  // Business trips (7 trips)
  generateTrip("jordan-1", "demo-jordan", "45 Park Ave", "315 W 36th St", "2026-03-10T09:00:00Z", "business", "Commute", 4.5, 28.50, true),
  generateTrip("jordan-2", "demo-jordan", "315 W 36th St", "45 Park Ave", "2026-03-10T18:30:00Z", "business", "Commute", 4.5, 30.20, false),
  generateTrip("jordan-3", "demo-jordan", "315 W 36th St", "Union Square", "2026-03-08T12:00:00Z", "business", "Meeting", 2.1, 16.80, true),
  generateTrip("jordan-4", "demo-jordan", "45 Park Ave", "315 W 36th St", "2026-03-06T08:45:00Z", "business", "Commute", 4.5, 27.90, true),
  generateTrip("jordan-5", "demo-jordan", "315 W 36th St", "SoHo", "2026-03-04T14:30:00Z", "business", "Meeting", 3.2, 22.40, true),
  generateTrip("jordan-6", "demo-jordan", "45 Park Ave", "JFK Airport", "2026-02-28T05:30:00Z", "business", "Airport", 16.8, 62.00, true),
  generateTrip("jordan-7", "demo-jordan", "JFK Airport", "45 Park Ave", "2026-02-25T22:00:00Z", "business", "Airport", 16.8, 65.50, true),
  
  // Personal trips (5 trips)
  generateTrip("jordan-8", "demo-jordan", "45 Park Ave", "Williamsburg", "2026-03-09T20:00:00Z", "personal", "Dinner", 3.8, 24.50, false),
  generateTrip("jordan-9", "demo-jordan", "Williamsburg", "45 Park Ave", "2026-03-09T23:30:00Z", "personal", "Other", 3.8, 26.80, false),
  generateTrip("jordan-10", "demo-jordan", "45 Park Ave", "DUMBO", "2026-03-07T15:00:00Z", "personal", "Shopping", 2.4, 18.20, false),
  generateTrip("jordan-11", "demo-jordan", "DUMBO", "45 Park Ave", "2026-03-07T17:30:00Z", "personal", "Shopping", 2.4, 17.80, false),
  generateTrip("jordan-12", "demo-jordan", "45 Park Ave", "Prospect Park", "2026-03-02T11:00:00Z", "personal", "Errand", 1.9, 14.50, false),
];

// --- Maya's Trips (10 trips, ~20% business, mostly personal) ---

const mayaTrips: Trip[] = [
  // Business trips (2 trips)
  generateTrip("maya-1", "demo-maya", "123 Main St", "88 Leonard St", "2026-03-09T10:30:00Z", "business", "Meeting", 8.2, 42.50, true),
  generateTrip("maya-2", "demo-maya", "88 Leonard St", "123 Main St", "2026-03-09T16:00:00Z", "business", "Commute", 8.2, 45.20, false),
  
  // Personal trips (8 trips)
  generateTrip("maya-3", "demo-maya", "123 Main St", "Astoria", "2026-03-10T12:00:00Z", "personal", "Errand", 3.5, 22.80, false),
  generateTrip("maya-4", "demo-maya", "Astoria", "123 Main St", "2026-03-10T15:30:00Z", "personal", "Shopping", 3.5, 21.50, false),
  generateTrip("maya-5", "demo-maya", "123 Main St", "Long Island City", "2026-03-08T19:00:00Z", "personal", "Dinner", 2.8, 18.90, false),
  generateTrip("maya-6", "demo-maya", "Long Island City", "123 Main St", "2026-03-08T22:30:00Z", "personal", "Other", 2.8, 20.40, false),
  generateTrip("maya-7", "demo-maya", "123 Main St", "Flushing", "2026-03-05T11:00:00Z", "personal", "Errand", 4.2, 26.30, false),
  generateTrip("maya-8", "demo-maya", "Flushing", "123 Main St", "2026-03-05T14:00:00Z", "personal", "Errand", 4.2, 25.80, false),
  generateTrip("maya-9", "demo-maya", "123 Main St", "Jackson Heights", "2026-03-01T13:00:00Z", "personal", "Shopping", 2.1, 15.60, false),
  generateTrip("maya-10", "demo-maya", "Jackson Heights", "123 Main St", "2026-03-01T16:30:00Z", "personal", "Other", 2.1, 16.20, false),
];

// --- Export all demo trips ---

export const demoTrips: Trip[] = [...amyTrips, ...jordanTrips, ...mayaTrips];

// --- Helper to get trips for a specific user ---

export function getTripsForUser(userId: string): Trip[] {
  return demoTrips.filter((trip) => trip.user_id === userId);
}

// --- Demo user summaries for profile cards ---

export interface DemoUserSummary {
  profile: Profile;
  tripCount: number;
  businessShare: number;
  topPurpose: string;
  badgePreview: string;
}

export function getDemoUserSummaries(): DemoUserSummary[] {
  return demoProfiles.map((profile) => {
    const trips = getTripsForUser(profile.id);
    const businessTrips = trips.filter((t) => t.category === "business").length;
    const businessShare = trips.length > 0 ? businessTrips / trips.length : 0;
    
    // Count purposes
    const purposeCounts: Partial<Record<TripPurpose, number>> = {};
    for (const trip of trips) {
      if (trip.purpose !== "Other") {
        purposeCounts[trip.purpose] = (purposeCounts[trip.purpose] || 0) + 1;
      }
    }
    
    let topPurpose = "Mixed";
    let maxCount = 0;
    for (const [purpose, count] of Object.entries(purposeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topPurpose = purpose;
      }
    }
    
    // Badge preview
    let badgePreview = "Casual Rider";
    if (businessShare >= 0.8) {
      badgePreview = "Business-Mode Rider";
    } else if (businessShare >= 0.5) {
      badgePreview = "Mixed-Use Rider";
    }
    
    return {
      profile,
      tripCount: trips.length,
      businessShare,
      topPurpose,
      badgePreview,
    };
  });
}
