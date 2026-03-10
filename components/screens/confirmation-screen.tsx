"use client";

import {
  MapPin,
  Clock,
  CreditCard,
  ChevronRight,
  Shield,
  ArrowLeft,
  Briefcase,
  Tag,
} from "lucide-react";
import { useUser } from "@/lib/user-context";
import { TripPurpose } from "@/lib/types";

interface RideState {
  pickup: string;
  dropoff: string;
  category: "business" | "personal";
  purpose: TripPurpose;
  fareEstimate: number;
  miles: number;
  guaranteeOn: boolean;
}

interface ConfirmationScreenProps {
  onNavigate: (screen: string) => void;
  rideState: RideState;
  onConfirm: () => void;
}

const BOOKING_FEE = 1.65;

export default function ConfirmationScreen({
  onNavigate,
  rideState,
  onConfirm,
}: ConfirmationScreenProps) {
  const { insights } = useUser();
  
  const tripFare = rideState.fareEstimate;
  const guaranteePrice = rideState.guaranteeOn ? insights.price : 0;
  const totalPrice = tripFare + BOOKING_FEE + guaranteePrice;

  return (
    <div className="flex flex-col pb-32">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={() => onNavigate("ride-options")}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors active:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Confirm your ride</h1>
      </header>

      {/* Route */}
      <div className="mx-5 mb-4 rounded-2xl border border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
            <div className="h-10 w-px bg-border" />
            <div className="h-2.5 w-2.5 rounded-sm bg-foreground" />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Pickup</span>
                <span className="text-sm font-medium text-foreground">
                  {rideState.pickup || "Current Location"}
                </span>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Dropoff</span>
                <span className="text-sm font-medium text-foreground">
                  {rideState.dropoff || "Destination"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip details */}
      <div className="mx-5 mb-4 flex gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
          <Clock size={16} className="text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">ETA</span>
            <span className="text-sm font-semibold text-foreground">4 min</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
          <MapPin size={16} className="text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Distance</span>
            <span className="text-sm font-semibold text-foreground">
              {rideState.miles.toFixed(1)} mi
            </span>
          </div>
        </div>
      </div>

      {/* Category & Purpose badges */}
      <div className="mx-5 mb-4 flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-4 py-3">
          <Briefcase size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium capitalize text-foreground">
            {rideState.category}
          </span>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-4 py-3">
          <Tag size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {rideState.purpose}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-muted" />

      {/* Receipt */}
      <div className="px-5 pt-5 pb-4">
        <h2 className="pb-3 text-base font-semibold text-foreground">
          Price breakdown
        </h2>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Trip fare</span>
            <span className="text-sm text-foreground">
              ${tripFare.toFixed(2)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Booking fee</span>
            <span className="text-sm text-foreground">
              ${BOOKING_FEE.toFixed(2)}
            </span>
          </li>
          {rideState.guaranteeOn && (
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield size={13} className="text-success" />
                Guarantee Fee
              </span>
              <span className="text-sm text-foreground">
                +${insights.price.toFixed(2)}
              </span>
            </li>
          )}
        </ul>
        <div className="my-3 h-px bg-border" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Total</span>
          <span className="text-sm font-semibold text-foreground">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        {rideState.guaranteeOn && (
          <p className="mt-2 text-xs font-medium text-success">
            Including Guarantee Fee protection
          </p>
        )}
      </div>

      {/* Payment method */}
      <div className="mx-5 mb-4 flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
        <CreditCard size={16} className="text-foreground" />
        <span className="flex-1 text-sm text-foreground">{"Visa ****4242"}</span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>

      {/* Insights preview */}
      {rideState.category === "business" && (
        <div className="mx-5 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>This trip will count toward your business percentage</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-lg font-bold text-foreground">
              {Math.round(insights.businessShare * 100)}%
            </span>
            <span className="text-xs text-muted-foreground">
              current business share
            </span>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 mx-auto max-w-md border-t border-border bg-background px-5 py-4">
        <button
          onClick={onConfirm}
          className="w-full rounded-xl bg-foreground py-3.5 text-center text-sm font-semibold text-background transition-opacity active:opacity-80"
        >
          Confirm Ride - ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
