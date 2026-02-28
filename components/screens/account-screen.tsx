"use client";

import {
  ChevronRight,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Settings,
  Star,
} from "lucide-react";

interface AccountScreenProps {
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { icon: CreditCard, label: "Payment", subtitle: "Visa ****4242" },
  { icon: Shield, label: "Safety", subtitle: "Manage trusted contacts" },
  { icon: Star, label: "Rewards", subtitle: "Gold member" },
  { icon: Bell, label: "Notifications", subtitle: "Manage alerts" },
  { icon: Settings, label: "Settings", subtitle: "App preferences" },
  { icon: HelpCircle, label: "Help", subtitle: "Support & FAQ" },
];

export default function AccountScreen({ onNavigate }: AccountScreenProps) {
  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <header className="px-5 pt-14 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Account
        </h1>
      </header>

      {/* Profile card */}
      <div className="mx-5 mt-3 mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-xl font-bold text-background">
          J
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-base font-semibold text-foreground">
            Jane Cooper
          </span>
          <span className="text-xs text-muted-foreground">
            jane.cooper@company.com
          </span>
        </div>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>

      {/* Divider */}
      <div className="h-2 bg-muted" />

      {/* Business CTA */}
      <button
        onClick={() => onNavigate("business-guarantee")}
        className="mx-5 mt-5 mb-5 flex items-center gap-4 rounded-xl bg-foreground p-4 text-left transition-opacity active:opacity-90"
      >
        <Shield size={20} className="text-background" />
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-semibold text-background">
            Uber for Business
          </span>
          <span className="text-xs text-background/70">
            Manage your business travel
          </span>
        </div>
        <ChevronRight size={16} className="text-background/70" />
      </button>

      {/* Menu items */}
      <ul className="flex flex-col px-5">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={idx}>
              <button className="flex w-full items-center gap-4 py-4 text-left transition-colors active:bg-muted">
                <Icon size={20} className="text-foreground" />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.subtitle}
                  </span>
                </div>
                <ChevronRight
                  size={14}
                  className="text-muted-foreground"
                />
              </button>
              {idx < menuItems.length - 1 && (
                <div className="ml-9 h-px bg-border" />
              )}
            </li>
          );
        })}
      </ul>

      {/* Divider */}
      <div className="mx-5 my-2 h-px bg-border" />

      {/* Sign out */}
      <div className="px-5">
        <button className="flex w-full items-center gap-4 py-4 text-left transition-colors active:bg-muted">
          <LogOut size={20} className="text-foreground" />
          <span className="text-sm font-medium text-foreground">
            Sign out
          </span>
        </button>
      </div>
    </div>
  );
}
