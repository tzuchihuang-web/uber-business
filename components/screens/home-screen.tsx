"use client";

import {
  Search,
  MapPin,
  Briefcase,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const suggestions = [
  {
    icon: Briefcase,
    title: "Office",
    subtitle: "350 5th Ave, New York",
  },
  {
    icon: Star,
    title: "Home",
    subtitle: "221B Baker St, London",
  },
  {
    icon: Clock,
    title: "Airport - JFK",
    subtitle: "John F. Kennedy Intl Airport",
  },
];

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <header className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Good evening
        </h1>
      </header>

      {/* Search bar */}
      <div className="px-5 pb-5">
        <button
          onClick={() => onNavigate("ride-options")}
          className="flex w-full items-center gap-3 rounded-xl bg-muted px-4 py-3.5 text-left transition-colors active:bg-border"
        >
          <Search size={18} className="text-muted-foreground" />
          <span className="text-base text-muted-foreground">
            Where to?
          </span>
        </button>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 px-5 pb-6">
        <button
          onClick={() => onNavigate("ride-options")}
          className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-muted p-4 transition-colors active:bg-border"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
            <MapPin size={18} className="text-background" />
          </div>
          <span className="text-xs font-medium text-foreground">Ride</span>
        </button>
        <button
          onClick={() => onNavigate("business-guarantee")}
          className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-muted p-4 transition-colors active:bg-border"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
            <Briefcase size={18} className="text-background" />
          </div>
          <span className="text-xs font-medium text-foreground">
            Business
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Suggestions */}
      <div className="px-5 pt-5">
        <h2 className="pb-3 text-base font-semibold text-foreground">
          Suggestions
        </h2>
        <ul className="flex flex-col">
          {suggestions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx}>
                <button
                  onClick={() => onNavigate("ride-options")}
                  className="flex w-full items-center gap-4 py-3.5 text-left transition-colors active:bg-muted"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon size={16} className="text-foreground" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-muted-foreground"
                  />
                </button>
                {idx < suggestions.length - 1 && (
                  <div className="ml-14 h-px bg-border" />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Divider */}
      <div className="mx-5 mt-4 h-px bg-border" />

      {/* Business banner */}
      <div className="px-5 pt-5">
        <button
          onClick={() => onNavigate("business-guarantee")}
          className="flex w-full items-center gap-4 rounded-xl bg-muted p-4 text-left transition-colors active:bg-border"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-foreground">
            <Briefcase size={20} className="text-background" />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              Uber for Business
            </span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              Get guaranteed rides for your team with transparent pricing.
            </span>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
