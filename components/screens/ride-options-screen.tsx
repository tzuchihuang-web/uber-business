"use client";

import {
  ArrowLeft,
  Users,
  Zap,
  Car,
  Shield,
  Sparkles,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { getRiderInsight } from "@/lib/rider";

interface RideOptionsScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
  guaranteeOn: boolean;
  setGuaranteeOn: (value: boolean) => void;
}

const insight = getRiderInsight();
const BASE_RIDE_PRICE = 12.45;

const rides = [
  {
    id: "uberx",
    name: "UberX",
    desc: "Affordable rides",
    time: "4 min",
    price: BASE_RIDE_PRICE,
    icon: Car,
    selected: true,
  },
  {
    id: "comfort",
    name: "Comfort",
    desc: "Newer cars, extra legroom",
    time: "6 min",
    price: 18.2,
    icon: Car,
    selected: false,
  },
  {
    id: "xl",
    name: "UberXL",
    desc: "Affordable rides for groups",
    time: "8 min",
    price: 22.8,
    icon: Users,
    selected: false,
  },
  {
    id: "black",
    name: "Black",
    desc: "Premium rides in luxury cars",
    time: "5 min",
    price: 35.0,
    icon: Shield,
    selected: false,
  },
  {
    id: "green",
    name: "Green",
    desc: "Electric or hybrid vehicles",
    time: "7 min",
    price: 14.1,
    icon: Zap,
    selected: false,
  },
];

export default function RideOptionsScreen({
  onNavigate,
  onBack,
  guaranteeOn,
  setGuaranteeOn,
}: RideOptionsScreenProps) {
  const confirmPrice = guaranteeOn
    ? (BASE_RIDE_PRICE + insight.price).toFixed(2)
    : BASE_RIDE_PRICE.toFixed(2);

  return (
    <div className="flex flex-col pb-20">
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

      {/* Route summary */}
      <div className="mx-5 mb-4 flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
        <div className="flex flex-col items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          <div className="h-8 w-px bg-border" />
          <div className="h-2.5 w-2.5 rounded-sm bg-foreground" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">
              Current Location
            </p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <p className="text-sm font-medium text-foreground">
              350 5th Ave, New York
            </p>
          </div>
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
          {insight.primaryBadge && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
              <BadgeCheck size={13} />
              {insight.primaryBadge}
            </span>
          )}

          {/* Big percentage */}
          <p className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              {insight.businessPct}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Business
            </span>
          </p>

          {/* Sub-badge or fallback */}
          {insight.subBadge && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              <Sparkles size={12} className="text-accent" />
              {insight.subBadge}
            </span>
          )}
          {insight.fallbackMessage && (
            <p className="mt-2 text-xs text-muted-foreground">
              {insight.fallbackMessage}
            </p>
          )}

          {/* Discount footnote */}
          {insight.discountEligible && (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              You qualify for business rider discounts on select ride types.
            </p>
          )}
        </div>

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
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success">
                <Shield size={16} className="text-success-foreground" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    Business Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    ${insight.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">/ ride</span>
                  {insight.originalPrice !== null && (
                    <span className="text-xs text-muted-foreground line-through">
                      ${insight.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {insight.discountEligible && (
                  <span className="mt-0.5 inline-flex w-fit items-center gap-1 rounded-md bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                    Business discount applied
                  </span>
                )}
                {!insight.discountEligible && (
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
                  aria-checked={guaranteeOn}
                  aria-label="Add Business Guarantee to this ride"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGuaranteeOn(!guaranteeOn);
                  }}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                    guaranteeOn ? "bg-success" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-background shadow-sm transition-transform ${
                      guaranteeOn ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-[10px] text-muted-foreground">
                  {guaranteeOn ? "Added" : "Add"}
                </span>
              </div>
            </div>

            {/* Inline cost preview when toggle is ON */}
            {guaranteeOn && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-muted px-3 py-2">
                <span className="text-xs font-medium text-foreground">
                  Added: +${insight.price.toFixed(2)}
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
          return (
            <li key={ride.id}>
              <button
                onClick={() => onNavigate("confirmation")}
                className={`flex w-full items-center gap-4 rounded-xl py-3.5 text-left transition-colors active:bg-muted ${
                  ride.selected ? "bg-muted" : ""
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    ride.selected ? "bg-foreground" : "bg-muted"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      ride.selected ? "text-background" : "text-foreground"
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
                  ${ride.price.toFixed(2)}
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
      <div className="fixed bottom-16 left-0 right-0 border-t border-border bg-background px-5 py-4">
        {guaranteeOn && (
          <p className="mb-1.5 text-center text-xs font-medium text-success">
            Includes Business Guarantee
          </p>
        )}
        <button
          onClick={() => onNavigate("confirmation")}
          className="w-full rounded-xl bg-foreground py-3.5 text-center text-sm font-semibold text-background transition-opacity active:opacity-80"
        >
          Confirm UberX - ${confirmPrice}
        </button>
      </div>
    </div>
  );
}
