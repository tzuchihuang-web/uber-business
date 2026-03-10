"use client";

import { useMemo } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Star,
  Clock,
  ChevronRight,
  TrendingUp,
  Shield,
  BadgeCheck,
  Plane,
} from "lucide-react";
import { useUser } from "@/lib/user-context";
import { getGreeting } from "@/lib/types";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onSelectDestination: (pickup: string, dropoff: string) => void;
}

export default function HomeScreen({
  onNavigate,
  onSelectDestination,
}: HomeScreenProps) {
  const { currentUser, insights, trips } = useUser();
  const greeting = getGreeting();

  // Generate suggestions based on user's frequent routes and saved locations
  const suggestions = useMemo(() => {
    const items: Array<{
      icon: typeof Briefcase;
      title: string;
      subtitle: string;
      pickup: string;
      dropoff: string;
    }> = [];

    // Add work location if available
    if (currentUser?.work_label && currentUser?.work_address) {
      items.push({
        icon: Briefcase,
        title: currentUser.work_label,
        subtitle: currentUser.work_address,
        pickup: currentUser.home_address || "Current Location",
        dropoff: currentUser.work_address,
      });
    }

    // Add home location if available
    if (currentUser?.home_label && currentUser?.home_address) {
      items.push({
        icon: Star,
        title: currentUser.home_label,
        subtitle: currentUser.home_address,
        pickup: "Current Location",
        dropoff: currentUser.home_address,
      });
    }

    // Add frequent routes
    if (insights.frequentRoutes.length > 0) {
      const topRoute = insights.frequentRoutes[0];
      // Only add if not already in list
      const alreadyAdded = items.some(
        (i) => i.dropoff === topRoute.dropoff || i.subtitle === topRoute.dropoff
      );
      if (!alreadyAdded) {
        items.push({
          icon: Clock,
          title: topRoute.dropoff.split(",")[0],
          subtitle: topRoute.dropoff,
          pickup: topRoute.pickup,
          dropoff: topRoute.dropoff,
        });
      }
    }

    // Add fallback suggestions if needed (Chicago airports)
    if (items.length < 3) {
      const fallbacks = [
        {
          icon: Plane,
          title: "O'Hare Airport",
          subtitle: "O'Hare International Airport",
          pickup: "Current Location",
          dropoff: "O'Hare International Airport",
        },
        {
          icon: Plane,
          title: "Midway Airport",
          subtitle: "Midway International Airport",
          pickup: "Current Location",
          dropoff: "Midway International Airport",
        },
      ];
      for (const fb of fallbacks) {
        if (items.length >= 3) break;
        if (!items.some((i) => i.title === fb.title)) {
          items.push(fb);
        }
      }
    }

    return items.slice(0, 3);
  }, [currentUser, insights.frequentRoutes]);

  const businessPct = Math.round(insights.businessShare * 100);

  // Empty state for new users
  const isNewUser = trips.length === 0;

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <header className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {greeting}
          {currentUser ? `, ${currentUser.full_name.split(" ")[0]}` : ""}
        </h1>
      </header>

      {/* Search bar */}
      <div className="px-5 pb-5">
        <button
          onClick={() => onNavigate("ride-options")}
          className="flex w-full items-center gap-3 rounded-xl bg-muted px-4 py-3.5 text-left transition-colors active:bg-border"
        >
          <Search size={18} className="text-muted-foreground" />
          <span className="text-base text-muted-foreground">Where to?</span>
        </button>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 px-5 pb-6">
        <button
          onClick={() => onNavigate("ride-options")}
          className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-muted p-4 transition-colors active:bg-border"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
            <MapPin size={18} className="text-background" />
          </div>
          <span className="text-xs font-medium text-foreground">Ride</span>
        </button>
        <button
          onClick={() => onNavigate("business-guarantee")}
          className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-muted p-4 transition-colors active:bg-border"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
            <Briefcase size={18} className="text-background" />
          </div>
          <span className="text-xs font-medium text-foreground">Business</span>
        </button>
      </div>

      {/* New User Empty State */}
      {isNewUser && (
        <div className="mx-5 mb-5 rounded-xl border border-dashed border-border bg-muted/50 p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <TrendingUp size={20} className="text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-sm font-semibold text-foreground">
            No rides yet
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Take your first ride to start building your personalized insights and unlock business discounts.
          </p>
        </div>
      )}

      {/* Insights summary card - only show for users with trips */}
      {!isNewUser && (
        <div className="mx-5 mb-5 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 pb-2">
            <TrendingUp size={13} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Your ride patterns
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                {businessPct}%
              </span>
              <span className="text-sm text-muted-foreground">business</span>
            </div>

            <div className="flex items-center gap-2">
              {insights.primaryBadge && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-foreground px-2 py-1 text-xs font-semibold text-background">
                  <BadgeCheck size={12} />
                  {insights.primaryBadge}
                </span>
              )}
            </div>
          </div>

          {insights.topPurpose && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Top purpose:
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                {insights.topPurpose}
              </span>
            </div>
          )}

          {insights.discountEligible && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2">
              <Shield size={14} className="text-success" />
              <span className="text-xs font-medium text-success">
                Guarantee Fee discount unlocked
              </span>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Suggestions */}
      <div className="px-5 pt-5">
        <h2 className="pb-3 text-base font-semibold text-foreground">
          Suggestions
        </h2>
        <ul className="flex flex-col">
          {suggestions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx}>
                <button
                  onClick={() => onSelectDestination(item.pickup, item.dropoff)}
                  className="flex w-full items-center gap-4 py-3.5 text-left transition-colors active:bg-muted"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon size={16} className="text-foreground" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
                {idx < suggestions.length - 1 && (
                  <div className="ml-14 h-px bg-border" />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Divider */}
      <div className="mx-5 mt-4 h-px bg-border" />

      {/* Business banner */}
      <div className="px-5 pt-5">
        <button
          onClick={() => onNavigate("business-guarantee")}
          className="flex w-full items-center gap-4 rounded-xl bg-muted p-4 text-left transition-colors active:bg-border"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-foreground">
            <Briefcase size={20} className="text-background" />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              {insights.discountEligible
                ? "Guarantee Fee Active"
                : "Uber for Business"}
            </span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              {insights.discountEligible
                ? "You qualify for $0.79/ride guaranteed pricing"
                : "Get guaranteed rides with transparent pricing."}
            </span>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
