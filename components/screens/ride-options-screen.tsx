"use client";

import {
  ArrowLeft,
  Users,
  Zap,
  Car,
  Shield,
  ChevronRight,
  Sparkles,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { getRiderInsight } from "@/lib/rider";

interface RideOptionsScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const insight = getRiderInsight();

const rides = [
  {
    id: "uberx",
    name: "UberX",
    desc: "Affordable rides",
    time: "4 min",
    price: "$12.45",
    icon: Car,
    selected: true,
  },
  {
    id: "comfort",
    name: "Comfort",
    desc: "Newer cars, extra legroom",
    time: "6 min",
    price: "$18.20",
    icon: Car,
    selected: false,
  },
  {
    id: "xl",
    name: "UberXL",
    desc: "Affordable rides for groups",
    time: "8 min",
    price: "$22.80",
    icon: Users,
    selected: false,
  },
  {
    id: "black",
    name: "Black",
    desc: "Premium rides in luxury cars",
    time: "5 min",
    price: "$35.00",
    icon: Shield,
    selected: false,
  },
  {
    id: "green",
    name: "Green",
    desc: "Electric or hybrid vehicles",
    time: "7 min",
    price: "$14.10",
    icon: Zap,
    selected: false,
  },
];

export default function RideOptionsScreen({
  onNavigate,
  onBack,
}: RideOptionsScreenProps) {
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
        <h1 className="text-lg font-bold text-foreground">
          Choose a ride
        </h1>
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
              You qualify for business rider discounts on select
              ride types.
            </p>
          )}
        </div>

        {/* Business Guarantee row */}
        <div className="border-t border-border">
          <button
            onClick={() => onNavigate("business-guarantee")}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-muted"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success">
              <Shield size={14} className="text-success-foreground" />
            </div>
            <span className="flex-1 text-sm font-semibold text-foreground">
              Business Guarantee unlocked
            </span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
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
                    ride.selected
                      ? "bg-foreground"
                      : "bg-muted"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      ride.selected
                        ? "text-background"
                        : "text-foreground"
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
                  {ride.price}
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
        <button
          onClick={() => onNavigate("confirmation")}
          className="w-full rounded-xl bg-foreground py-3.5 text-center text-sm font-semibold text-background transition-opacity active:opacity-80"
        >
          Confirm UberX - $12.45
        </button>
      </div>
    </div>
  );
}
