"use client";

import { useUser } from "@/lib/user-context";
import { TripPurpose } from "@/lib/types";
import { CheckCircle, TrendingUp, Shield, ArrowRight, MapPin } from "lucide-react";

interface RideState {
  pickup: string;
  dropoff: string;
  category: "business" | "personal";
  purpose: TripPurpose;
  fareEstimate: number;
  miles: number;
  guaranteeOn: boolean;
}

interface SuccessScreenProps {
  rideState: RideState;
  onDone: () => void;
}

export default function SuccessScreen({ rideState, onDone }: SuccessScreenProps) {
  const { insights } = useUser();
  
  const businessPct = Math.round(insights.businessShare * 100);
  const totalTrips = insights.totalTrips;
  
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Success Header */}
      <div className="flex flex-col items-center px-6 pt-16 pb-8">
        {/* Success Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle size={48} className="text-success" />
        </div>
        
        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          Ride Confirmed!
        </h1>
        <p className="text-center text-base leading-relaxed text-muted-foreground">
          Your driver is on the way
        </p>
      </div>
      
      {/* Ride Summary Card */}
      <div className="mx-6 mb-6 rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Trip Details</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground capitalize">
            {rideState.category}
          </span>
        </div>
        
        <div className="mb-4 flex items-center gap-2 text-sm text-foreground">
          <span className="truncate">{rideState.pickup || "Current Location"}</span>
          <ArrowRight size={14} className="shrink-0 text-muted-foreground" />
          <span className="truncate">{rideState.dropoff || "Destination"}</span>
        </div>
        
        {/* Distance and Purpose row */}
        <div className="mb-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">{rideState.miles.toFixed(1)} mi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Purpose:</span>
            <span className="font-medium text-foreground">{rideState.purpose}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm text-muted-foreground">Total fare</span>
          <div className="text-right">
            <span className="text-lg font-semibold text-foreground">
              ${rideState.fareEstimate.toFixed(2)}
            </span>
            {rideState.guaranteeOn && (
              <span className="ml-1 text-xs text-success">+ Fee</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Updated Insights */}
      <div className="mx-6 mb-6">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Your Updated Insights</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Business Share */}
          <div className="rounded-xl bg-muted p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <TrendingUp size={16} className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">{businessPct}%</div>
            <div className="text-xs text-muted-foreground">Business trips</div>
          </div>
          
          {/* Total Trips */}
          <div className="rounded-xl bg-muted p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle size={16} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalTrips}</div>
            <div className="text-xs text-muted-foreground">Total trips</div>
          </div>
        </div>
        
        {/* Badge Update */}
        {insights.primaryBadge && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-4">
            <Shield size={20} className="text-success" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {insights.primaryBadge}
              </span>
              <span className="text-xs text-muted-foreground">
                {insights.discountEligible
                  ? "You qualify for Guarantee Fee discounts!"
                  : "Keep riding to unlock more benefits"}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Done Button */}
      <div className="p-6">
        <button
          onClick={onDone}
          className="w-full rounded-xl bg-foreground py-4 text-base font-semibold text-background transition-colors active:bg-foreground/90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
