"use client";

import { useState, useCallback } from "react";
import { UserProvider, useUser } from "@/lib/user-context";
import { Trip, TripPurpose } from "@/lib/types";
import BottomTabBar from "@/components/bottom-tab-bar";
import HomeScreen from "@/components/screens/home-screen";
import RideOptionsScreen from "@/components/screens/ride-options-screen";
import BusinessGuaranteeScreen from "@/components/screens/business-guarantee-screen";
import ConfirmationScreen from "@/components/screens/confirmation-screen";
import ActivityScreen from "@/components/screens/activity-screen";
import AccountScreen from "@/components/screens/account-screen";
import LoginScreen from "@/components/screens/login-screen";
import SuccessScreen from "@/components/screens/success-screen";

type Screen =
  | "login"
  | "home"
  | "ride-options"
  | "business-guarantee"
  | "confirmation"
  | "success"
  | "activity"
  | "account";

type Tab = "home" | "activity" | "account";

function screenToTab(screen: Screen): Tab {
  if (screen === "activity") return "activity";
  if (screen === "account") return "account";
  return "home";
}

// Ride state for the current booking flow
interface RideState {
  pickup: string;
  dropoff: string;
  category: "business" | "personal";
  purpose: TripPurpose;
  fareEstimate: number;
  miles: number;
  guaranteeOn: boolean;
}

const defaultRideState: RideState = {
  pickup: "",
  dropoff: "",
  category: "business",
  purpose: "Meeting",
  fareEstimate: 24.50,
  miles: 3.2,
  guaranteeOn: false,
};

function AppShellInner() {
  const { isAuthenticated, addTrip } = useUser();
  const [screen, setScreen] = useState<Screen>(isAuthenticated ? "home" : "login");
  const [history, setHistory] = useState<Screen[]>([]);
  const [rideState, setRideState] = useState<RideState>(defaultRideState);

  const navigate = useCallback(
    (target: string) => {
      setHistory((prev) => [...prev, screen]);
      setScreen(target as Screen);
    },
    [screen]
  );

  const goBack = useCallback(() => {
    setHistory((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) setScreen(last);
      return next;
    });
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setHistory([]);
    setScreen(tab as Screen);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setScreen("home");
    setHistory([]);
  }, []);

  const handleLogout = useCallback(() => {
    setScreen("login");
    setHistory([]);
    setRideState(defaultRideState);
  }, []);

  const updateRideState = useCallback((updates: Partial<RideState>) => {
    setRideState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleConfirmRide = useCallback(() => {
    // Create and save the trip
    const newTrip: Omit<Trip, "id" | "created_at"> = {
      user_id: "", // Will be set by context
      pickup: rideState.pickup,
      dropoff: rideState.dropoff,
      trip_time: new Date().toISOString(),
      category: rideState.category,
      purpose: rideState.purpose,
      miles: rideState.miles,
      fare_estimate: rideState.fareEstimate,
      guarantee_selected: rideState.guaranteeOn,
      status: "completed",
    };
    
    addTrip(newTrip);
    navigate("success");
  }, [rideState, addTrip, navigate]);

  const handleSuccessDone = useCallback(() => {
    // Reset ride state and go home
    setRideState(defaultRideState);
    setHistory([]);
    setScreen("home");
  }, []);

  // Handle selecting a suggestion from home screen
  const handleSelectDestination = useCallback(
    (pickup: string, dropoff: string) => {
      setRideState((prev) => ({
        ...prev,
        pickup,
        dropoff,
        // Estimate fare based on a simple calculation
        fareEstimate: Math.round((5 + Math.random() * 25) * 100) / 100,
        miles: Math.round((1 + Math.random() * 8) * 10) / 10,
      }));
      navigate("ride-options");
    },
    [navigate]
  );

  // Don't show bottom bar on login or success screens
  const showBottomBar = !["login", "success"].includes(screen);

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-background">
      <main>
        {screen === "login" && (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}
        {screen === "home" && (
          <HomeScreen
            onNavigate={navigate}
            onSelectDestination={handleSelectDestination}
          />
        )}
        {screen === "ride-options" && (
          <RideOptionsScreen
            onNavigate={navigate}
            onBack={goBack}
            rideState={rideState}
            updateRideState={updateRideState}
          />
        )}
        {screen === "business-guarantee" && (
          <BusinessGuaranteeScreen
            onNavigate={navigate}
            onBack={goBack}
            guaranteeOn={rideState.guaranteeOn}
            setGuaranteeOn={(on) => updateRideState({ guaranteeOn: on })}
          />
        )}
        {screen === "confirmation" && (
          <ConfirmationScreen
            onNavigate={navigate}
            rideState={rideState}
            onConfirm={handleConfirmRide}
          />
        )}
        {screen === "success" && (
          <SuccessScreen
            rideState={rideState}
            onDone={handleSuccessDone}
          />
        )}
        {screen === "activity" && (
          <ActivityScreen onNavigate={navigate} />
        )}
        {screen === "account" && (
          <AccountScreen onNavigate={navigate} onLogout={handleLogout} />
        )}
      </main>
      {showBottomBar && (
        <BottomTabBar
          activeTab={screenToTab(screen)}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}

export default function AppShell() {
  return (
    <UserProvider>
      <AppShellInner />
    </UserProvider>
  );
}
