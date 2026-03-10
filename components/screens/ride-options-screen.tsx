"use client";

import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Users,
  Zap,
  Car,
  Shield,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  ChevronDown,
  Lightbulb,
} from "lucide-react";
import { useUser } from "@/lib/user-context";
import { TripPurpose, shouldRecommendGuarantee } from "@/lib/types";

interface RideState {
  pickup: string;
  dropoff: string;
  category: "business" | "personal";
  purpose: TripPurpose;
  fareEstimate: number;
  miles: number;
  guaranteeOn: boolean;
}

interface RideOptionsScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
  rideState: RideState;
  updateRideState: (updates: Partial<RideState>) => void;
}

const PURPOSES: TripPurpose[] = [
  "Meeting",
  "Airport",
  "Commute",
  "Errand",
  "Dinner",
  "Shopping",
  "Other",
];

const rides = [
  {
    id: "uberx",
    name: "UberX",
    desc: "Affordable rides",
    time: "4 min",
    priceMultiplier: 1,
    icon: Car,
  },
  {
    id: "comfort",
    name: "Comfort",
    desc: "Newer cars, extra legroom",
    time: "6 min",
    priceMultiplier: 1.46,
    icon: Car,
  },
  {
    id: "xl",
    name: "UberXL",
    desc: "Affordable rides for groups",
    time: "8 min",
    priceMultiplier: 1.83,
    icon: Users,
  },
  {
    id: "black",
    name: "Black",
    desc: "Premium rides in luxury cars",
    time: "5 min",
    priceMultiplier: 2.81,
    icon: Shield,
  },
  {
    id: "green",
    name: "Green",
    desc: "Electric or hybrid vehicles",
    time: "7 min",
    priceMultiplier: 1.13,
    icon: Zap,
  },
];

export default function RideOptionsScreen({
  onNavigate,
  onBack,
  rideState,
  updateRideState,
}: RideOptionsScreenProps) {
  const { insights, currentUser } = useUser();
  const [selectedRide, setSelectedRide] = useState("uberx");
  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);

  // Calculate base fare from ride state
  const baseFare = rideState.fareEstimate || 12.45;

  // Get the guarantee recommendation
  const guaranteeRec = useMemo(() => {
    return shouldRecommendGuarantee(
      rideState.pickup,
      rideState.dropoff,
      rideState.purpose,
      rideState.category,
      insights
    );
  }, [rideState.pickup, rideState.dropoff, rideState.purpose, rideState.category, insights]);

  // Calculate final price with guarantee
  const selectedRideData = rides.find((r) => r.id === selectedRide) || rides[0];
  const ridePrice = baseFare * selectedRideData.priceMultiplier;
  const confirmPrice = rideState.guaranteeOn
    ? (ridePrice + insights.price).toFixed(2)
    : ridePrice.toFixed(2);

  const handleConfirm = () => {
    updateRideState({ fareEstimate: ridePrice });
    onNavigate("confirmation");
  };

  return (
    <div className="flex flex-col pb-32">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors active:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Choose a ride</h1>
      </header>

      {/* Route summary - Editable */}
      <div className="mx-5 mb-4 flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
        <div className="flex flex-col items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          <div className="h-8 w-px bg-border" />
          <div className="h-2.5 w-2.5 rounded-sm bg-foreground" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div>
            <input
              type="text"
              value={rideState.pickup}
              onChange={(e) => updateRideState({ pickup: e.target.value })}
              placeholder="Current Location"
              className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="h-px bg-border" />
          <div>
            <input
              type="text"
              value={rideState.dropoff}
              onChange={(e) => updateRideState({ dropoff: e.target.value })}
              placeholder="Destination"
              className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trip Category & Purpose */}
      <div className="mx-5 mb-4 flex gap-3">
        {/* Category Toggle */}
        <div className="flex flex-1 rounded-xl bg-muted p-1">
          <button
            onClick={() => updateRideState({ category: "business" })}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
              rideState.category === "business"
                ? "bg-foreground text-background"
                : "text-muted-foreground"
            }`}
          >
            Business
          </button>
          <button
            onClick={() => updateRideState({ category: "personal" })}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
              rideState.category === "personal"
                ? "bg-foreground text-background"
                : "text-muted-foreground"
            }`}
          >
            Personal
          </button>
        </div>

        {/* Purpose Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => setShowPurposeDropdown(!showPurposeDropdown)}
            className="flex w-full items-center justify-between rounded-xl bg-muted px-3 py-2.5 text-xs font-medium text-foreground"
          >
            <span>{rideState.purpose}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
          {showPurposeDropdown && (
            <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-xl border border-border bg-card py-1 shadow-lg">
              {PURPOSES.map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => {
                    updateRideState({ purpose });
                    setShowPurposeDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs transition-colors hover:bg-muted ${
                    rideState.purpose === purpose
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {purpose}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Rider Insight Card */}
      <div className="mx-5 mb-4 overflow-hidden rounded-2xl border border-border bg-card">
        {/* Top section */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-1.5 pb-2">
            <TrendingUp size={13} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Based on your ride history
            </span>
          </div>

          {/* Primary badge */}
          {insights.primaryBadge && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
              <BadgeCheck size={13} />
              {insights.primaryBadge}
            </span>
          )}

          {/* Big percentage */}
          <p className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              {Math.round(insights.businessShare * 100)}%
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Business
            </span>
          </p>

          {/* Sub-badge or fallback */}
          {insights.subBadge && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              <Sparkles size={12} className="text-accent" />
              {insights.subBadge}
            </span>
          )}
          {insights.fallbackMessage && (
            <p className="mt-2 text-xs text-muted-foreground">
              {insights.fallbackMessage}
            </p>
          )}

          {/* Discount footnote */}
          {insights.discountEligible && (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              You qualify for business rider discounts on select ride types.
            </p>
          )}
        </div>

        {/* Recommendation banner */}
        {guaranteeRec.recommend && (
          <div className="border-t border-border bg-success/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <Lightbulb size={14} className="text-success" />
              <span className="text-xs font-medium text-success">
                Recommended: {guaranteeRec.reason}
              </span>
            </div>
          </div>
        )}

        {/* Business Guarantee add-on card */}
        <div className="border-t border-border">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate("business-guarantee")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onNavigate("business-guarantee");
              }
            }}
            className="cursor-pointer px-4 py-3.5 transition-colors active:bg-muted"
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                guaranteeRec.recommend ? "bg-success" : "bg-success"
              }`}>
                <Shield size={16} className="text-success-foreground" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    Business Guarantee
                  </span>
                  {guaranteeRec.recommend && (
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    ${insights.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">/ ride</span>
                  {insights.originalPrice !== null && (
                    <span className="text-xs text-muted-foreground line-through">
                      ${insights.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {insights.discountEligible && (
                  <span className="mt-0.5 inline-flex w-fit items-center gap-1 rounded-md bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                    Business discount applied
                  </span>
                )}
                {!insights.discountEligible && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {"Discount unlocks when Business trips \u2265 80%."}
                  </p>
                )}
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  Covers cancellations, fare issues, and pickup delays.
                </p>
              </div>

              {/* Toggle - stopPropagation prevents navigation */}
              <div
                className="flex shrink-0 flex-col items-center gap-1 pt-0.5"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <button
                  role="switch"
                  aria-checked={rideState.guaranteeOn}
                  aria-label="Add Business Guarantee to this ride"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateRideState({ guaranteeOn: !rideState.guaranteeOn });
                  }}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                    rideState.guaranteeOn ? "bg-success" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-background shadow-sm transition-transform ${
                      rideState.guaranteeOn ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-[10px] text-muted-foreground">
                  {rideState.guaranteeOn ? "Added" : "Add"}
                </span>
              </div>
            </div>

            {/* Inline cost preview when toggle is ON */}
            {rideState.guaranteeOn && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-muted px-3 py-2">
                <span className="text-xs font-medium text-foreground">
                  Added: +${insights.price.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  Est. coverage: up to $5 credit
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Ride list */}
      <ul className="flex flex-col px-5 pt-2">
        {rides.map((ride, idx) => {
          const Icon = ride.icon;
          const price = (baseFare * ride.priceMultiplier).toFixed(2);
          const isSelected = ride.id === selectedRide;
          return (
            <li key={ride.id}>
              <button
                onClick={() => setSelectedRide(ride.id)}
                className={`flex w-full items-center gap-4 rounded-xl py-3.5 text-left transition-colors active:bg-muted ${
                  isSelected ? "bg-muted" : ""
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    isSelected ? "bg-foreground" : "bg-muted"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      isSelected ? "text-background" : "text-foreground"
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {ride.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {ride.time}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {ride.desc}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  ${price}
                </span>
              </button>
              {idx < rides.length - 1 && (
                <div className="ml-16 h-px bg-border" />
              )}
            </li>
          );
        })}
      </ul>

      {/* Bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 mx-auto max-w-md border-t border-border bg-background px-5 py-4">
        {rideState.guaranteeOn && (
          <p className="mb-1.5 text-center text-xs font-medium text-success">
            Includes Business Guarantee
          </p>
        )}
        <button
          onClick={handleConfirm}
          className="w-full rounded-xl bg-foreground py-3.5 text-center text-sm font-semibold text-background transition-opacity active:opacity-80"
        >
          Confirm {selectedRideData.name} - ${confirmPrice}
        </button>
      </div>
    </div>
  );
}
