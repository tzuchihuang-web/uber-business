"use client";

import { useState, useCallback } from "react";
import BottomTabBar from "@/components/bottom-tab-bar";
import HomeScreen from "@/components/screens/home-screen";
import RideOptionsScreen from "@/components/screens/ride-options-screen";
import BusinessGuaranteeScreen from "@/components/screens/business-guarantee-screen";
import ConfirmationScreen from "@/components/screens/confirmation-screen";
import ActivityScreen from "@/components/screens/activity-screen";
import AccountScreen from "@/components/screens/account-screen";

type Screen =
  | "home"
  | "ride-options"
  | "business-guarantee"
  | "confirmation"
  | "activity"
  | "account";

type Tab = "home" | "activity" | "account";

function screenToTab(screen: Screen): Tab {
  if (screen === "activity") return "activity";
  if (screen === "account") return "account";
  return "home";
}

export default function AppShell() {
  const [screen, setScreen] = useState<Screen>("home");
  const [history, setHistory] = useState<Screen[]>([]);
  const [guaranteeOn, setGuaranteeOn] = useState(false);

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

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-background">
      <main>
        {screen === "home" && <HomeScreen onNavigate={navigate} />}
        {screen === "ride-options" && (
          <RideOptionsScreen
            onNavigate={navigate}
            onBack={goBack}
            guaranteeOn={guaranteeOn}
            setGuaranteeOn={setGuaranteeOn}
          />
        )}
        {screen === "business-guarantee" && (
          <BusinessGuaranteeScreen
            onNavigate={navigate}
            onBack={goBack}
            guaranteeOn={guaranteeOn}
            setGuaranteeOn={setGuaranteeOn}
          />
        )}
        {screen === "confirmation" && (
          <ConfirmationScreen onNavigate={navigate} />
        )}
        {screen === "activity" && (
          <ActivityScreen onNavigate={navigate} />
        )}
        {screen === "account" && (
          <AccountScreen onNavigate={navigate} />
        )}
      </main>
      <BottomTabBar
        activeTab={screenToTab(screen)}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
