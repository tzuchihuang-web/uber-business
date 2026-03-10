"use client";

import { useState, useMemo } from "react";
import {
  Car,
  ChevronRight,
  Briefcase,
  TrendingUp,
  Clock,
  Shield,
  MapPin,
  Filter,
} from "lucide-react";
import { useUser } from "@/lib/user-context";
import { Trip, TripPurpose, formatHour } from "@/lib/types";

interface ActivityScreenProps {
  onNavigate: (screen: string) => void;
}

type FilterCategory = "all" | "business" | "personal";
type FilterPurpose = "all" | TripPurpose;

function formatTripDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString("en-US", { weekday: "long" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTripTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="flex w-full items-center gap-4 py-4 text-left">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          trip.category === "business" ? "bg-accent/10" : "bg-muted"
        }`}
      >
        {trip.category === "business" ? (
          <Briefcase size={16} className="text-accent" />
        ) : (
          <Car size={16} className="text-foreground" />
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-medium text-foreground">{trip.dropoff}</span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTripDate(trip.trip_time)}</span>
          <span>at</span>
          <span>{formatTripTime(trip.trip_time)}</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              trip.category === "business"
                ? "bg-accent/10 text-accent"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {trip.category}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {trip.purpose}
          </span>
          {trip.guarantee_selected && (
            <Shield size={10} className="text-success" />
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-semibold text-foreground">
          ${trip.fare_estimate.toFixed(2)}
        </span>
        <span className="text-xs text-muted-foreground">{trip.miles} mi</span>
      </div>
    </div>
  );
}

function InsightsCard({
  insights,
}: {
  insights: ReturnType<typeof useUser>["insights"];
}) {
  const businessPct = Math.round(insights.businessShare * 100);
  const guaranteePct = Math.round(insights.guaranteeAttachRate * 100);

  return (
    <div className="mx-5 mb-4 rounded-2xl border border-border bg-card">
      <div className="p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Your Ride Insights
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Business Share */}
          <div className="rounded-xl bg-muted p-3">
            <div className="mb-1 flex items-center gap-2">
              <TrendingUp size={14} className="text-accent" />
              <span className="text-xs text-muted-foreground">Business</span>
            </div>
            <div className="text-xl font-bold text-foreground">{businessPct}%</div>
            <div className="text-[10px] text-muted-foreground">
              {insights.businessTrips} of {insights.totalTrips} trips
            </div>
          </div>

          {/* Guarantee Rate */}
          <div className="rounded-xl bg-muted p-3">
            <div className="mb-1 flex items-center gap-2">
              <Shield size={14} className="text-success" />
              <span className="text-xs text-muted-foreground">Guarantee</span>
            </div>
            <div className="text-xl font-bold text-foreground">{guaranteePct}%</div>
            <div className="text-[10px] text-muted-foreground">attach rate</div>
          </div>
        </div>

        {/* Top Purpose */}
        {insights.topPurpose && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-muted p-3">
            <div className="flex items-center gap-2">
              <Briefcase size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Top purpose</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {insights.topPurpose} ({Math.round(insights.topPurposeShare * 100)}%)
            </span>
          </div>
        )}

        {/* Peak Hours */}
        {insights.peakHours.length > 0 && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-muted p-3">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Peak hours</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {insights.peakHours.slice(0, 2).map(formatHour).join(", ")}
            </span>
          </div>
        )}

        {/* Frequent Routes */}
        {insights.frequentRoutes.length > 0 && (
          <div className="mt-3">
            <div className="mb-2 flex items-center gap-2">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Frequent routes</span>
            </div>
            <div className="flex flex-col gap-2">
              {insights.frequentRoutes.slice(0, 2).map((route, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"
                >
                  <span className="text-xs text-foreground">
                    {route.pickup} → {route.dropoff}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {route.count}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Badge Section */}
      {(insights.primaryBadge || insights.subBadge) && (
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            {insights.primaryBadge && (
              <span className="rounded-lg bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
                {insights.primaryBadge}
              </span>
            )}
            {insights.subBadge && (
              <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                {insights.subBadge}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActivityScreen({ onNavigate }: ActivityScreenProps) {
  const { trips, insights } = useUser();
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("all");
  const [purposeFilter, setPurposeFilter] = useState<FilterPurpose>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter trips
  const filteredTrips = useMemo(() => {
    return trips
      .filter((trip) => {
        if (categoryFilter !== "all" && trip.category !== categoryFilter) {
          return false;
        }
        if (purposeFilter !== "all" && trip.purpose !== purposeFilter) {
          return false;
        }
        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.trip_time).getTime() - new Date(a.trip_time).getTime()
      );
  }, [trips, categoryFilter, purposeFilter]);

  // Get unique purposes from trips
  const availablePurposes = useMemo(() => {
    const purposes = new Set(trips.map((t) => t.purpose));
    return Array.from(purposes) as TripPurpose[];
  }, [trips]);

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <header className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Activity
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {insights.totalTrips} total trips
        </p>
      </header>

      {/* Insights Card */}
      {trips.length > 0 && <InsightsCard insights={insights} />}

      {/* Filters */}
      <div className="px-5 pb-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Filter size={14} />
          <span>Filter</span>
          {(categoryFilter !== "all" || purposeFilter !== "all") && (
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
              Active
            </span>
          )}
        </button>

        {showFilters && (
          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-border p-3">
            {/* Category filter */}
            <div>
              <span className="mb-2 block text-xs text-muted-foreground">
                Category
              </span>
              <div className="flex gap-2">
                {(["all", "business", "personal"] as FilterCategory[]).map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                        categoryFilter === cat
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Purpose filter */}
            <div>
              <span className="mb-2 block text-xs text-muted-foreground">
                Purpose
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPurposeFilter("all")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    purposeFilter === "all"
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  All
                </button>
                {availablePurposes.map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => setPurposeFilter(purpose)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      purposeFilter === purpose
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {purpose}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Trips List */}
      {filteredTrips.length > 0 ? (
        <ul className="flex flex-col px-5">
          {filteredTrips.map((trip, idx) => (
            <li key={trip.id}>
              <TripCard trip={trip} />
              {idx < filteredTrips.length - 1 && (
                <div className="ml-14 h-px bg-border" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center px-5 py-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Car size={24} className="text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-foreground">
            No trips yet
          </h3>
          <p className="text-center text-sm text-muted-foreground">
            {categoryFilter !== "all" || purposeFilter !== "all"
              ? "No trips match your filters. Try adjusting them."
              : "Book your first ride to start tracking your patterns."}
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="mt-4 rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-background"
          >
            Book a ride
          </button>
        </div>
      )}
    </div>
  );
}
