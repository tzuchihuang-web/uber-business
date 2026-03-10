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
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { useUser } from "@/lib/user-context";

interface AccountScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { icon: CreditCard, label: "Payment", subtitle: "Visa ****4242" },
  { icon: Shield, label: "Safety", subtitle: "Manage trusted contacts" },
  { icon: Star, label: "Rewards", subtitle: "Gold member" },
  { icon: Bell, label: "Notifications", subtitle: "Manage alerts" },
  { icon: Settings, label: "Settings", subtitle: "App preferences" },
  { icon: HelpCircle, label: "Help", subtitle: "Support & FAQ" },
];

export default function AccountScreen({ onNavigate, onLogout }: AccountScreenProps) {
  const { currentUser, insights, isDemo, logout } = useUser();
  
  const handleLogout = () => {
    logout();
    onLogout();
  };
  
  const businessPct = Math.round(insights.businessShare * 100);

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <header className="px-5 pt-14 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Account
        </h1>
      </header>

      {/* Profile card */}
      <div className="mx-5 mt-3 mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-foreground">
          {currentUser?.full_name.charAt(0) || "U"}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-base font-semibold text-foreground">
            {currentUser?.full_name || "User"}
          </span>
          <span className="text-xs text-muted-foreground">
            {currentUser?.email || "user@example.com"}
          </span>
          {isDemo && (
            <span className="mt-1 inline-flex w-fit rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Demo Mode
            </span>
          )}
        </div>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>

      {/* Rider Status Card */}
      <div className="mx-5 mb-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 pb-3">
          <TrendingUp size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Your Rider Status
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{businessPct}%</span>
              <span className="text-sm text-muted-foreground">business</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {insights.totalTrips} total trips
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            {insights.primaryBadge && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-foreground px-2 py-1 text-xs font-semibold text-background">
                <BadgeCheck size={12} />
                {insights.primaryBadge}
              </span>
            )}
            {insights.subBadge && (
              <span className="rounded-lg bg-muted px-2 py-1 text-xs font-medium text-foreground">
                {insights.subBadge}
              </span>
            )}
          </div>
        </div>
        
        {insights.discountEligible && (
          <div className="mt-3 rounded-lg bg-success/10 px-3 py-2">
            <span className="text-xs font-medium text-success">
              Business Guarantee discount active: $0.79/ride
            </span>
          </div>
        )}
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
            Business Guarantee
          </span>
          <span className="text-xs text-background/70">
            {insights.discountEligible
              ? "You qualify for discounted rates"
              : "Learn about price protection"}
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
                <ChevronRight size={14} className="text-muted-foreground" />
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
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 py-4 text-left transition-colors active:bg-muted"
        >
          <LogOut size={20} className="text-foreground" />
          <span className="text-sm font-medium text-foreground">
            {isDemo ? "Switch Profile" : "Sign out"}
          </span>
        </button>
      </div>
    </div>
  );
}
