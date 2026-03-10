"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
  MapPin,
} from "lucide-react";
import { useUser } from "@/lib/user-context";
import { TripPurpose, shouldRecommendGuarantee } from "@/lib/types";
import {
  filterLocations,
  getDistanceBetweenLocations,
  rideOptions,
  calculateFare,
  Location,
} from "@/lib/locations";

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

export default function RideOptionsScreen({
  onNavigate,
  onBack,
  rideState,
  updateRideState,
}: RideOptionsScreenProps) {
  const { insights, currentUser } = useUser();
  const [selectedRide, setSelectedRide] = useState("uberx");
  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);
  
  // Autocomplete state
  const [pickupSuggestions, setPickupSuggestions] = useState<Location[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Location[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);

  // Calculate distance when pickup/dropoff change
  const distance = useMemo(() => {
    if (!rideState.pickup || !rideState.dropoff) return 5.0;
    return getDistanceBetweenLocations(rideState.pickup, rideState.dropoff);
  }, [rideState.pickup, rideState.dropoff]);

  // Update miles in ride state when distance changes
  useEffect(() => {
    if (distance !== rideState.miles) {
      updateRideState({ miles: distance });
    }
  }, [distance, rideState.miles, updateRideState]);

  // Handle pickup input change
  const handlePickupChange = (value: string) => {
    updateRideState({ pickup: value });
    const suggestions = filterLocations(value);
    setPickupSuggestions(suggestions);
    setShowPickupSuggestions(suggestions.length > 0);
  };

  // Handle dropoff input change
  const handleDropoffChange = (value: string) => {
    updateRideState({ dropoff: value });
    const suggestions = filterLocations(value);
    setDropoffSuggestions(suggestions);
    setShowDropoffSuggestions(suggestions.length > 0);
  };

  // Select a pickup location
  const selectPickup = (location: Location) => {
    updateRideState({ pickup: location.name });
    setShowPickupSuggestions(false);
  };

  // Select a dropoff location
  const selectDropoff = (location: Location) => {
    updateRideState({ dropoff: location.name });
    setShowDropoffSuggestions(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Calculate fares for all ride options
  const fares = useMemo(() => {
    return rideOptions.map((option) => ({
      ...option,
      fare: calculateFare(option, distance),
    }));
  }, [distance]);

  // Get selected ride data
  const selectedRideData = fares.find((r) => r.id === selectedRide) || fares[0];
  const ridePrice = selectedRideData.fare;
  const confirmPrice = rideState.guaranteeOn
    ? (ridePrice + insights.price).toFixed(2)
    : ridePrice.toFixed(2);

  const handleConfirm = () => {
    updateRideState({ fareEstimate: ridePrice, miles: distance });
    onNavigate("confirmation");
  };

  // Map ride options to UI format
  const rides = [
    { ...fares[0], icon: Car, time: fares[0].eta, desc: fares[0].description },
    { ...fares[1], icon: Car, time: fares[1].eta, desc: fares[1].description },
    { ...fares[2], icon: Shield, time: fares[2].eta, desc: fares[2].description },
  ];

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

      {/* Route summary - With Autocomplete */}
      <div className="mx-5 mb-4 flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
        <div className="flex flex-col items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          <div className="h-8 w-px bg-border" />
          <div className="h-2.5 w-2.5 rounded-sm bg-foreground" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {/* Pickup Input with Autocomplete */}
          <div ref={pickupRef} className="relative">
            <input
              type="text"
              value={rideState.pickup}
              onChange={(e) => handlePickupChange(e.target.value)}
              onFocus={() => {
                const suggestions = filterLocations(rideState.pickup);
                setPickupSuggestions(suggestions);
                setShowPickupSuggestions(suggestions.length > 0);
              }}
              placeholder="Enter pickup location"
              className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {showPickupSuggestions && pickupSuggestions.length > 0 && (
              <div className="absolute top-full left-0 z-20 mt-2 w-[calc(100%+40px)] -ml-4 rounded-xl border border-border bg-card py-1 shadow-lg">
                {pickupSuggestions.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => selectPickup(loc)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted"
                  >
                    <MapPin size={14} className="text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{loc.name}</span>
                      <span className="text-xs text-muted-foreground">{loc.address}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="h-px bg-border" />
          
          {/* Dropoff Input with Autocomplete */}
          <div ref={dropoffRef} className="relative">
            <input
              type="text"
              value={rideState.dropoff}
              onChange={(e) => handleDropoffChange(e.target.value)}
              onFocus={() => {
                const suggestions = filterLocations(rideState.dropoff);
                setDropoffSuggestions(suggestions);
                setShowDropoffSuggestions(suggestions.length > 0);
              }}
              placeholder="Enter destination"
              className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
              <div className="absolute top-full left-0 z-20 mt-2 w-[calc(100%+40px)] -ml-4 rounded-xl border border-border bg-card py-1 shadow-lg">
                {dropoffSuggestions.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => selectDropoff(loc)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted"
                  >
                    <MapPin size={14} className="text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{loc.name}</span>
                      <span className="text-xs text-muted-foreground">{loc.address}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Distance indicator */}
      <div className="mx-5 mb-4 flex items-center justify-between rounded-lg bg-muted/50 px-4 py-2">
        <span className="text-xs text-muted-foreground">Estimated distance</span>
        <span className="text-xs font-medium text-foreground">{distance.toFixed(1)} mi</span>
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

        {/* Guarantee Fee add-on card */}
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
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success">
                <Shield size={16} className="text-success-foreground" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    Guarantee Fee
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
                  aria-label="Add Guarantee Fee to this ride"
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
                  ${ride.fare.toFixed(2)}
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
            Includes Guarantee Fee
          </p>
        )}
        <button
          onClick={handleConfirm}
          disabled={!rideState.pickup || !rideState.dropoff}
          className="w-full rounded-xl bg-foreground py-3.5 text-center text-sm font-semibold text-background transition-opacity disabled:opacity-50 active:opacity-80"
        >
          Confirm {selectedRideData.name} - ${confirmPrice}
        </button>
      </div>
    </div>
  );
}
