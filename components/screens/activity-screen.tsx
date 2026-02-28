"use client";

import { Car, ChevronRight } from "lucide-react";

interface ActivityScreenProps {
  onNavigate: (screen: string) => void;
}

const trips = [
  {
    date: "Today",
    destination: "350 5th Ave",
    type: "UberX",
    price: "$12.45",
    time: "2:30 PM",
  },
  {
    date: "Yesterday",
    destination: "JFK Airport",
    type: "Comfort",
    price: "$48.20",
    time: "8:15 AM",
  },
  {
    date: "Feb 25",
    destination: "Grand Central",
    type: "UberX",
    price: "$9.80",
    time: "6:45 PM",
  },
  {
    date: "Feb 24",
    destination: "221B Baker St",
    type: "Black",
    price: "$35.00",
    time: "10:00 AM",
  },
];

export default function ActivityScreen({ onNavigate }: ActivityScreenProps) {
  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <header className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Activity
        </h1>
      </header>

      {/* Trips */}
      <ul className="flex flex-col px-5">
        {trips.map((trip, idx) => (
          <li key={idx}>
            <button
              onClick={() => onNavigate("confirmation")}
              className="flex w-full items-center gap-4 py-4 text-left transition-colors active:bg-muted"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <Car size={16} className="text-foreground" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium text-foreground">
                  {trip.destination}
                </span>
                <span className="text-xs text-muted-foreground">
                  {trip.date} at {trip.time} - {trip.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {trip.price}
                </span>
                <ChevronRight
                  size={14}
                  className="text-muted-foreground"
                />
              </div>
            </button>
            {idx < trips.length - 1 && (
              <div className="ml-14 h-px bg-border" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
