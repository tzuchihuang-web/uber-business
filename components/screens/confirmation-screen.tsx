"use client";

import {
  CheckCircle2,
  MapPin,
  Clock,
  CreditCard,
  Star,
  ChevronRight,
  Shield,
} from "lucide-react";
import { getRiderInsight } from "@/lib/rider";

interface ConfirmationScreenProps {
  onNavigate: (screen: string) => void;
  guaranteeOn: boolean;
}

const BASE_PRICE = 12.45;
const TRIP_FARE = 10.80;
const BOOKING_FEE = 1.65;
const PROMOTIONS = 0.00;
const insight = getRiderInsight();

export default function ConfirmationScreen({
  onNavigate,
  guaranteeOn,
}: ConfirmationScreenProps) {
  const guaranteePrice = insight.price;
  const totalPrice = TRIP_FARE + BOOKING_FEE - PROMOTIONS + (guaranteeOn ? guaranteePrice : 0);

  return (
    <div className="flex flex-col pb-20">
      {/* Success header */}
      <div className="flex flex-col items-center px-5 pt-16 pb-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
          <CheckCircle2 size={32} className="text-success-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          Ride confirmed
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your driver is on the way
        </p>
      </div>

      {/* Driver card */}
      <div className="mx-5 mb-4 flex items-center gap-4 rounded-2xl bg-muted p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-lg font-bold text-background">
          M
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-semibold text-foreground">
            Michael R.
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-foreground" />
            <span className="text-xs text-muted-foreground">
              4.92
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-foreground">
            Toyota Camry
          </span>
          <span className="text-xs text-muted-foreground">
            ABC-1234
          </span>
        </div>
      </div>

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
                <span className="text-xs text-muted-foreground">
                  Pickup
                </span>
                <span className="text-sm font-medium text-foreground">
                  Current Location
                </span>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Dropoff
                </span>
                <span className="text-sm font-medium text-foreground">
                  350 5th Ave, New York
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip details */}
      <div className="mx-5 mb-4 flex gap-4">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
          <Clock size={16} className="text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">ETA</span>
            <span className="text-sm font-semibold text-foreground">
              4 min
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
          <MapPin size={16} className="text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              Distance
            </span>
            <span className="text-sm font-semibold text-foreground">
              3.2 mi
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-muted" />

      {/* Receipt */}
      <div className="px-5 pt-5 pb-4">
        <h2 className="pb-3 text-base font-semibold text-foreground">
          Receipt
        </h2>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Trip fare</span>
            <span className="text-sm text-foreground">${TRIP_FARE.toFixed(2)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Booking fee</span>
            <span className="text-sm text-foreground">${BOOKING_FEE.toFixed(2)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Promotions</span>
            <span className="text-sm text-foreground">-${PROMOTIONS.toFixed(2)}</span>
          </li>
          {guaranteeOn && (
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield size={13} className="text-success" />
                Business Guarantee
              </span>
              <span className="text-sm text-foreground">+${guaranteePrice.toFixed(2)}</span>
            </li>
          )}
        </ul>
        <div className="my-3 h-px bg-border" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Total
          </span>
          <span className="text-sm font-semibold text-foreground">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        {guaranteeOn && (
          <p className="mt-2 text-xs font-medium text-success">
            Including Business Guarantee protection
          </p>
        )}
      </div>

      {/* Payment method */}
      <div className="mx-5 mb-4 flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
        <CreditCard size={16} className="text-foreground" />
        <span className="flex-1 text-sm text-foreground">
          {'Visa ****4242'}
        </span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 px-5 pt-2">
        <button
          onClick={() => onNavigate("home")}
          className="w-full rounded-xl bg-foreground py-3.5 text-center text-sm font-semibold text-background transition-opacity active:opacity-80"
        >
          Done
        </button>
        <button
          onClick={() => onNavigate("ride-options")}
          className="w-full rounded-xl bg-muted py-3.5 text-center text-sm font-semibold text-foreground transition-opacity active:opacity-80"
        >
          Book another ride
        </button>
      </div>
    </div>
  );
}
