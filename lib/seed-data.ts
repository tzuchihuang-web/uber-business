import { Profile, Trip, TripPurpose } from "./types";

// --- Demo Profiles (Chicago-based) ---

export const demoProfiles: Profile[] = [
  {
    id: "demo-amy",
    full_name: "Amy Chen",
    email: "amy@demo.com",
    password: "demo123", // For demo login
    home_label: "Home",
    home_address: "Lincoln Park",
    work_label: "Office",
    work_address: "Willis Tower",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "demo-jordan",
    full_name: "Jordan Lee",
    email: "jordan@demo.com",
    password: "demo123",
    home_label: "Home",
    home_address: "Wicker Park",
    work_label: "WeWork",
    work_address: "Fulton Market",
    created_at: "2024-02-20T14:30:00Z",
  },
  {
    id: "demo-maya",
    full_name: "Maya Patel",
    email: "maya@demo.com",
    password: "demo123",
    home_label: "Apartment",
    home_address: "Hyde Park",
    work_label: "Studio",
    work_address: "West Loop",
    created_at: "2024-03-10T09:15:00Z",
  },
  {
    id: "demo-new",
    full_name: "New User",
    email: "new@demo.com",
    password: "demo123",
    home_label: "Home",
    home_address: "Gold Coast",
    work_label: "Work",
    work_address: "Chase Tower",
    created_at: "2026-03-10T10:00:00Z",
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
// Amy: Power business traveler in Chicago

const amyTrips: Trip[] = [
  // Business trips (17 trips)
  generateTrip("amy-1", "demo-amy", "Lincoln Park", "Willis Tower", "2026-03-10T08:30:00Z", "business", "Meeting", 5.2, 32.50, true),
  generateTrip("amy-2", "demo-amy", "Willis Tower", "Lincoln Park", "2026-03-10T18:15:00Z", "business", "Commute", 5.2, 30.80, true),
  generateTrip("amy-3", "demo-amy", "Lincoln Park", "O'Hare International Airport", "2026-03-08T06:00:00Z", "business", "Airport", 14.8, 68.00, true),
  generateTrip("amy-4", "demo-amy", "O'Hare International Airport", "Lincoln Park", "2026-03-07T21:30:00Z", "business", "Airport", 14.8, 72.50, true),
  generateTrip("amy-5", "demo-amy", "Willis Tower", "Aon Center", "2026-03-06T10:00:00Z", "business", "Meeting", 0.8, 12.20, true),
  generateTrip("amy-6", "demo-amy", "Aon Center", "Willis Tower", "2026-03-06T12:30:00Z", "business", "Meeting", 0.8, 11.80, false),
  generateTrip("amy-7", "demo-amy", "Lincoln Park", "Willis Tower", "2026-03-05T08:45:00Z", "business", "Commute", 5.2, 31.50, true),
  generateTrip("amy-8", "demo-amy", "Willis Tower", "McCormick Place", "2026-03-04T14:00:00Z", "business", "Meeting", 3.1, 28.90, true),
  generateTrip("amy-9", "demo-amy", "McCormick Place", "Lincoln Park", "2026-03-04T17:30:00Z", "business", "Meeting", 7.2, 42.40, true),
  generateTrip("amy-10", "demo-amy", "Lincoln Park", "Willis Tower", "2026-03-03T09:00:00Z", "business", "Meeting", 5.2, 32.10, true),
  generateTrip("amy-11", "demo-amy", "Willis Tower", "Merchandise Mart", "2026-03-01T11:00:00Z", "business", "Meeting", 1.2, 14.50, true),
  generateTrip("amy-12", "demo-amy", "Merchandise Mart", "Willis Tower", "2026-03-01T15:00:00Z", "business", "Meeting", 1.2, 15.20, true),
  generateTrip("amy-13", "demo-amy", "Lincoln Park", "Willis Tower", "2026-02-28T08:30:00Z", "business", "Commute", 5.2, 31.80, true),
  generateTrip("amy-14", "demo-amy", "Willis Tower", "Lincoln Park", "2026-02-28T19:00:00Z", "business", "Commute", 5.2, 33.60, false),
  generateTrip("amy-15", "demo-amy", "Lincoln Park", "Midway International Airport", "2026-02-25T07:00:00Z", "business", "Airport", 12.3, 58.00, true),
  generateTrip("amy-16", "demo-amy", "Willis Tower", "Union Station", "2026-02-22T09:30:00Z", "business", "Meeting", 0.5, 10.50, true),
  generateTrip("amy-17", "demo-amy", "Union Station", "Willis Tower", "2026-02-22T12:00:00Z", "business", "Meeting", 0.5, 9.80, true),
  
  // Personal trips (3 trips)
  generateTrip("amy-18", "demo-amy", "Lincoln Park", "The Art Institute of Chicago", "2026-03-09T14:00:00Z", "personal", "Other", 3.5, 22.50, false),
  generateTrip("amy-19", "demo-amy", "The Art Institute of Chicago", "Lincoln Park", "2026-03-09T18:00:00Z", "personal", "Dinner", 3.5, 23.20, false),
  generateTrip("amy-20", "demo-amy", "Lincoln Park", "Millennium Park", "2026-02-26T10:00:00Z", "personal", "Other", 3.2, 20.00, false),
];

// --- Jordan's Trips (12 trips, ~58% business, mixed purposes) ---
// Jordan: Mixed-use rider, startup worker

const jordanTrips: Trip[] = [
  // Business trips (7 trips)
  generateTrip("jordan-1", "demo-jordan", "Wicker Park", "Fulton Market", "2026-03-10T09:00:00Z", "business", "Commute", 2.5, 18.50, true),
  generateTrip("jordan-2", "demo-jordan", "Fulton Market", "Wicker Park", "2026-03-10T18:30:00Z", "business", "Commute", 2.5, 19.20, false),
  generateTrip("jordan-3", "demo-jordan", "Fulton Market", "Tribune Tower", "2026-03-08T12:00:00Z", "business", "Meeting", 1.8, 14.80, true),
  generateTrip("jordan-4", "demo-jordan", "Wicker Park", "Fulton Market", "2026-03-06T08:45:00Z", "business", "Commute", 2.5, 17.90, true),
  generateTrip("jordan-5", "demo-jordan", "Fulton Market", "West Loop", "2026-03-04T14:30:00Z", "business", "Meeting", 0.8, 10.40, true),
  generateTrip("jordan-6", "demo-jordan", "Wicker Park", "O'Hare International Airport", "2026-02-28T05:30:00Z", "business", "Airport", 13.2, 62.00, true),
  generateTrip("jordan-7", "demo-jordan", "O'Hare International Airport", "Wicker Park", "2026-02-25T22:00:00Z", "business", "Airport", 13.2, 65.50, true),
  
  // Personal trips (5 trips)
  generateTrip("jordan-8", "demo-jordan", "Wicker Park", "Lakeview", "2026-03-09T20:00:00Z", "personal", "Dinner", 3.8, 24.50, false),
  generateTrip("jordan-9", "demo-jordan", "Lakeview", "Wicker Park", "2026-03-09T23:30:00Z", "personal", "Other", 3.8, 26.80, false),
  generateTrip("jordan-10", "demo-jordan", "Wicker Park", "Magnificent Mile", "2026-03-07T15:00:00Z", "personal", "Shopping", 4.2, 28.20, false),
  generateTrip("jordan-11", "demo-jordan", "Magnificent Mile", "Wicker Park", "2026-03-07T17:30:00Z", "personal", "Shopping", 4.2, 27.80, false),
  generateTrip("jordan-12", "demo-jordan", "Wicker Park", "Ukrainian Village", "2026-03-02T11:00:00Z", "personal", "Errand", 1.2, 12.50, false),
];

// --- Maya's Trips (10 trips, ~20% business, mostly personal) ---
// Maya: Casual rider, freelancer in Hyde Park

const mayaTrips: Trip[] = [
  // Business trips (2 trips)
  generateTrip("maya-1", "demo-maya", "Hyde Park", "West Loop", "2026-03-09T10:30:00Z", "business", "Meeting", 8.2, 42.50, true),
  generateTrip("maya-2", "demo-maya", "West Loop", "Hyde Park", "2026-03-09T16:00:00Z", "business", "Commute", 8.2, 45.20, false),
  
  // Personal trips (8 trips)
  generateTrip("maya-3", "demo-maya", "Hyde Park", "Pilsen", "2026-03-10T12:00:00Z", "personal", "Errand", 4.5, 26.80, false),
  generateTrip("maya-4", "demo-maya", "Pilsen", "Hyde Park", "2026-03-10T15:30:00Z", "personal", "Shopping", 4.5, 25.50, false),
  generateTrip("maya-5", "demo-maya", "Hyde Park", "Chinatown", "2026-03-08T19:00:00Z", "personal", "Dinner", 5.8, 32.90, false),
  generateTrip("maya-6", "demo-maya", "Chinatown", "Hyde Park", "2026-03-08T22:30:00Z", "personal", "Other", 5.8, 34.40, false),
  generateTrip("maya-7", "demo-maya", "Hyde Park", "Museum of Science and Industry", "2026-03-05T11:00:00Z", "personal", "Errand", 1.2, 10.30, false),
  generateTrip("maya-8", "demo-maya", "Museum of Science and Industry", "Hyde Park", "2026-03-05T14:00:00Z", "personal", "Errand", 1.2, 9.80, false),
  generateTrip("maya-9", "demo-maya", "Hyde Park", "Bronzeville", "2026-03-01T13:00:00Z", "personal", "Shopping", 2.1, 15.60, false),
  generateTrip("maya-10", "demo-maya", "Bronzeville", "Hyde Park", "2026-03-01T16:30:00Z", "personal", "Other", 2.1, 16.20, false),
];

// --- New User has no trips (empty state) ---
const newUserTrips: Trip[] = [];

// --- Export all demo trips ---

export const demoTrips: Trip[] = [...amyTrips, ...jordanTrips, ...mayaTrips, ...newUserTrips];

// --- Helper to get trips for a specific user ---

export function getTripsForUser(userId: string): Trip[] {
  return demoTrips.filter((trip) => trip.user_id === userId);
}

// --- Find user by email ---

export function findUserByEmail(email: string): Profile | undefined {
  return demoProfiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
}

// --- Validate user credentials ---

export function validateCredentials(email: string, password: string): Profile | null {
  const profile = findUserByEmail(email);
  if (profile && profile.password === password) {
    return profile;
  }
  return null;
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
    } else if (trips.length === 0) {
      badgePreview = "New Rider";
    }
    
    return {
      profile,
      tripCount: trips.length,
      businessShare,
      topPurpose: trips.length === 0 ? "None yet" : topPurpose,
      badgePreview,
    };
  });
}
