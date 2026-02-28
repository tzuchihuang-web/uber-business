"use client";

import { ArrowLeft, Users, Zap, Car, Shield } from "lucide-react";

interface RideOptionsScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

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
