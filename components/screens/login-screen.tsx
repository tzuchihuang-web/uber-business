"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { validateCredentials, demoProfiles } from "@/lib/seed-data";
import { MapPin, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const { setCurrentUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    // Simulate network delay for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Validate credentials against demo users
    const user = validateCredentials(email, password);
    
    if (user) {
      setCurrentUser(user, true);
      onLoginSuccess();
    } else {
      setError("Invalid email or password. Try a demo account below.");
    }
    
    setIsLoading(false);
  };
  
  const fillDemoCredentials = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo123");
    setError(null);
  };
  
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header / Hero */}
      <div className="flex flex-col items-center px-6 pt-16 pb-8">
        {/* Logo */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground">
          <MapPin size={32} className="text-background" />
        </div>
        
        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          Uber
        </h1>
        <p className="text-center text-base leading-relaxed text-muted-foreground">
          Go anywhere with Uber
        </p>
      </div>
      
      {/* Login Form */}
      <div className="flex flex-1 flex-col px-6 pb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              required
              autoComplete="email"
            />
          </div>
          
          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12 w-full rounded-lg border border-border bg-card px-4 pr-12 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="mt-2 flex h-12 items-center justify-center rounded-lg bg-foreground text-base font-semibold text-background transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        
        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">Demo Accounts</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        {/* Demo Account Quick Fill */}
        <div className="flex flex-col gap-2">
          <p className="mb-2 text-sm text-muted-foreground">
            Try a demo account to explore the app:
          </p>
          {demoProfiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => fillDemoCredentials(profile.email)}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-all active:scale-[0.98] active:bg-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <span className="text-sm font-semibold">
                    {profile.full_name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {profile.full_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {profile.email}
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Tap to fill</span>
            </button>
          ))}
        </div>
        
        {/* Hint */}
        <div className="mt-4 rounded-lg bg-muted p-3">
          <p className="text-center text-xs text-muted-foreground">
            Password for all demo accounts: <span className="font-mono font-medium text-foreground">demo123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
