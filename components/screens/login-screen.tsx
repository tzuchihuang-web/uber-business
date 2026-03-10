"use client";

import { useUser } from "@/lib/user-context";
import { getDemoUserSummaries, DemoUserSummary } from "@/lib/seed-data";
import { Briefcase, User, TrendingUp, ChevronRight } from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

function ProfileCard({
  summary,
  onSelect,
}: {
  summary: DemoUserSummary;
  onSelect: () => void;
}) {
  const businessPct = Math.round(summary.businessShare * 100);
  
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all active:scale-[0.98] active:bg-muted"
    >
      {/* Avatar */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <span className="text-lg font-semibold">
          {summary.profile.full_name.charAt(0)}
        </span>
      </div>
      
      {/* Info */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            {summary.profile.full_name}
          </span>
          {summary.businessShare >= 0.8 && (
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
              Business
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <TrendingUp size={12} />
            {businessPct}% business
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={12} />
            {summary.tripCount} trips
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Top purpose: {summary.topPurpose}
        </span>
      </div>
      
      <ChevronRight size={18} className="text-muted-foreground" />
    </button>
  );
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const { setCurrentUser } = useUser();
  const demoUsers = getDemoUserSummaries();
  
  const handleSelectProfile = (summary: DemoUserSummary) => {
    setCurrentUser(summary.profile, true);
    onLoginSuccess();
  };
  
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header / Hero */}
      <div className="flex flex-col items-center px-6 pt-16 pb-8">
        {/* Logo */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground">
          <Briefcase size={32} className="text-background" />
        </div>
        
        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          RideSense
        </h1>
        <p className="text-center text-base leading-relaxed text-muted-foreground">
          Your ride app that learns how you move
        </p>
      </div>
      
      {/* Divider */}
      <div className="mx-6 h-px bg-border" />
      
      {/* Demo Mode Section */}
      <div className="flex flex-1 flex-col px-6 pt-6 pb-8">
        <div className="mb-4">
          <h2 className="mb-1 text-base font-semibold text-foreground">
            Try Demo Mode
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Select a profile to explore how RideSense personalizes your ride experience based on your patterns.
          </p>
        </div>
        
        {/* Profile Cards */}
        <div className="flex flex-col gap-3">
          {demoUsers.map((summary) => (
            <ProfileCard
              key={summary.profile.id}
              summary={summary}
              onSelect={() => handleSelectProfile(summary)}
            />
          ))}
        </div>
        
        {/* Explainer */}
        <div className="mt-6 rounded-xl bg-muted p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <User size={16} className="text-accent" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">
                Each profile has different patterns
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                Amy is a power business traveler, Jordan mixes work and play, and Maya rides mostly for personal trips. See how insights adapt!
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-border px-6 py-4">
        <p className="text-center text-xs text-muted-foreground">
          Demo mode uses sample data. No account required.
        </p>
      </div>
    </div>
  );
}
