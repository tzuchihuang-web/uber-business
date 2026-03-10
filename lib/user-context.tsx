"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Profile, Trip, RiderInsights, getRiderInsights } from "./types";
import { demoProfiles, getTripsForUser, demoTrips } from "./seed-data";

// --- Context Types ---

interface UserContextType {
  // Current user state
  currentUser: Profile | null;
  isAuthenticated: boolean;
  isDemo: boolean;
  
  // Available demo profiles
  availableProfiles: Profile[];
  
  // User's trips and insights
  trips: Trip[];
  insights: RiderInsights;
  
  // Actions
  setCurrentUser: (profile: Profile, isDemo?: boolean) => void;
  logout: () => void;
  addTrip: (trip: Omit<Trip, "id" | "created_at">) => void;
  refreshInsights: () => void;
}

const defaultInsights: RiderInsights = {
  businessShare: 0,
  labeledShare: 0,
  topPurpose: null,
  topPurposeShare: 0,
  purposeBreakdown: {
    Meeting: 0,
    Airport: 0,
    Commute: 0,
    Errand: 0,
    Dinner: 0,
    Shopping: 0,
    Other: 0,
  },
  frequentRoutes: [],
  frequentTimeOfDay: "mixed",
  peakHours: [],
  guaranteeAttachRate: 0,
  totalTrips: 0,
  businessTrips: 0,
  personalTrips: 0,
  primaryBadge: null,
  subBadge: null,
  fallbackMessage: null,
  discountEligible: false,
  price: 0.99,
  originalPrice: null,
  lowLabelWarning: true,
};

const UserContext = createContext<UserContextType | null>(null);

// --- Provider Component ---

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUserState] = useState<Profile | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  
  // Load trips for user
  const loadTripsForUser = useCallback((userId: string, demo: boolean) => {
    if (demo) {
      // In demo mode, load from seed data
      const userTrips = getTripsForUser(userId);
      setTrips(userTrips);
    } else {
      // In real mode, this would fetch from Supabase
      // For now, fall back to demo data
      const userTrips = getTripsForUser(userId);
      setTrips(userTrips);
    }
  }, []);
  
  const setCurrentUser = useCallback(
    (profile: Profile, demo: boolean = true) => {
      setCurrentUserState(profile);
      setIsDemo(demo);
      loadTripsForUser(profile.id, demo);
    },
    [loadTripsForUser]
  );
  
  const logout = useCallback(() => {
    setCurrentUserState(null);
    setIsDemo(false);
    setTrips([]);
  }, []);
  
  const addTrip = useCallback((tripData: Omit<Trip, "id" | "created_at">) => {
    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      created_at: new Date().toISOString(),
    };
    
    setTrips((prev) => [newTrip, ...prev]);
    
    // In real mode, this would save to Supabase
    // For now, just update local state
  }, []);
  
  const refreshInsights = useCallback(() => {
    // Insights are computed from trips, so this just triggers a re-render
    // The useMemo below will recompute insights
  }, []);
  
  // Compute insights from trips
  const insights = useMemo(() => {
    if (trips.length === 0) return defaultInsights;
    return getRiderInsights(trips);
  }, [trips]);
  
  const value: UserContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    isDemo,
    availableProfiles: demoProfiles,
    trips,
    insights,
    setCurrentUser,
    logout,
    addTrip,
    refreshInsights,
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// --- Hook ---

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// --- Utility to check demo mode ---

export function useDemoMode(): boolean {
  const { isDemo } = useUser();
  return isDemo;
}
