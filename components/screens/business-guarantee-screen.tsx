"use client";

import {
  ArrowLeft,
  Shield,
  CreditCard,
  BarChart3,
  Users,
  CheckCircle2,
} from "lucide-react";

interface BusinessGuaranteeScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

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

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    features: [
      "Up to 10 team members",
      "Basic reporting",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Business",
    price: "$5",
    period: "/rider/mo",
    features: [
      "Unlimited team members",
      "Guaranteed rides",
      "Priority support",
      "Advanced analytics",
    ],
    highlighted: true,
  },
];

export default function BusinessGuaranteeScreen({
  onNavigate,
  onBack,
}: BusinessGuaranteeScreenProps) {
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
        <button
          onClick={() => onNavigate("ride-options")}
          className="mt-5 w-full rounded-xl bg-background py-3 text-center text-sm font-semibold text-foreground transition-opacity active:opacity-80"
        >
          Get started
        </button>
      </div>

      {/* Feature list */}
      <div className="px-5 pb-6">
        <h3 className="pb-4 text-base font-semibold text-foreground">
          What you get
        </h3>
        <ul className="flex flex-col gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <li
                key={idx}
                className="flex items-start gap-4"
              >
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

      {/* Divider */}
      <div className="h-2 bg-muted" />

      {/* Pricing */}
      <div className="px-5 pt-6 pb-6">
        <h3 className="pb-4 text-base font-semibold text-foreground">
          Plans
        </h3>
        <div className="flex flex-col gap-4">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-5 ${
                plan.highlighted
                  ? "border-foreground"
                  : "border-border"
              }`}
            >
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-xs text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {plan.name}
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {plan.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2
                      size={14}
                      className={
                        plan.highlighted
                          ? "text-success"
                          : "text-muted-foreground"
                      }
                    />
                    <span className="text-xs text-muted-foreground">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate("ride-options")}
                className={`mt-4 w-full rounded-xl py-3 text-center text-sm font-semibold transition-opacity active:opacity-80 ${
                  plan.highlighted
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
                }`}
              >
                {plan.highlighted ? "Choose Business" : "Choose Starter"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
