"use client";

import {
  ArrowLeft,
  Shield,
  CreditCard,
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { getRiderInsight } from "@/lib/rider";

interface BusinessGuaranteeScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
  guaranteeOn: boolean;
  setGuaranteeOn: (value: boolean) => void;
}

const insight = getRiderInsight();

const features = [
  {
    icon: Shield,
    title: "Guaranteed rides",
    desc: "Rides available within 10 minutes or your next trip is free.",
  },
  {
    icon: CreditCard,
    title: "Centralized billing",
    desc: "One invoice for all team rides. No expense reports needed.",
  },
  {
    icon: BarChart3,
    title: "Real-time reporting",
    desc: "Track all business trips with live dashboards and exports.",
  },
  {
    icon: Users,
    title: "Team management",
    desc: "Add or remove employees and set ride policies instantly.",
  },
];

export default function BusinessGuaranteeScreen({
  onNavigate,
  onBack,
  guaranteeOn,
  setGuaranteeOn,
}: BusinessGuaranteeScreenProps) {

  return (
    <div className="flex flex-col pb-32">
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
          Business Guarantee
        </h1>
      </header>

      {/* Hero section */}
      <div className="mx-5 mb-6 rounded-2xl bg-foreground p-6">
        <h2 className="text-xl font-bold text-background">
          Rides your team can count on
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-background/70">
          Uber for Business guarantees ride availability, transparent
          pricing, and centralized billing for your entire organization.
        </p>

        {/* Price display */}
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-background">
            ${insight.price.toFixed(2)}
          </span>
          <span className="text-sm text-background/60">/ride</span>
          {insight.originalPrice !== null && (
            <span className="text-sm text-background/40 line-through">
              ${insight.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {insight.discountEligible && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-success px-2.5 py-1 text-xs font-semibold text-success-foreground">
            <BadgeCheck size={12} />
            Business discount applied
          </span>
        )}
      </div>

      {/* Rider badges section */}
      <div className="mx-5 mb-4 rounded-2xl border border-border bg-card p-4">
        {insight.primaryBadge && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
            <BadgeCheck size={13} />
            {insight.primaryBadge}
          </span>
        )}

        {/* Sub-badge or low-label warning */}
        {insight.lowLabelWarning ? (
          <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-muted px-3 py-2.5">
            <AlertTriangle
              size={14}
              className="mt-0.5 shrink-0 text-muted-foreground"
            />
            <p className="text-xs leading-relaxed text-muted-foreground">
              We couldn{"'"}t confirm top purposes due to limited labels.
            </p>
          </div>
        ) : insight.subBadge ? (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
            <Sparkles size={12} className="text-accent" />
            {insight.subBadge}
          </span>
        ) : null}
      </div>

      {/* Toggle card */}
      <div className="mx-5 mb-6 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success">
              <Shield size={18} className="text-success-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                Add Business Guarantee
              </span>
              <span className="text-xs text-muted-foreground">
                to this ride
              </span>
            </div>
          </div>

          {/* Toggle */}
          <button
            role="switch"
            aria-checked={guaranteeOn}
            onClick={() => setGuaranteeOn(!guaranteeOn)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              guaranteeOn ? "bg-success" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-background shadow-sm transition-transform ${
                guaranteeOn ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Cost detail when toggle is on */}
        {guaranteeOn && (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">
              This ride
            </span>
            <span className="text-sm font-bold text-foreground">
              +${insight.price.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-2 bg-muted" />

      {/* Feature list */}
      <div className="px-5 pt-6 pb-6">
        <h3 className="pb-4 text-base font-semibold text-foreground">
          What you get
        </h3>
        <ul className="flex flex-col gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <li key={idx} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon size={18} className="text-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {feature.title}
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background px-5 pt-3 pb-8">
        {guaranteeOn ? (
          <button
            onClick={() => onNavigate("confirmation")}
            className="w-full rounded-xl bg-foreground py-3.5 text-center text-sm font-semibold text-background transition-opacity active:opacity-80"
          >
            Add to this ride &middot; ${insight.price.toFixed(2)}
          </button>
        ) : (
          <button
            onClick={onBack}
            className="w-full rounded-xl bg-muted py-3.5 text-center text-sm font-semibold text-foreground transition-opacity active:opacity-80"
          >
            Continue without
          </button>
        )}
      </div>
    </div>
  );
}
