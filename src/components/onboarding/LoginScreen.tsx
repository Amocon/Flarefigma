import { useState } from 'react';
import { Mail, Lock, Chrome, Apple as AppleIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

interface LoginScreenProps {
  onComplete: () => void;
}

export function LoginScreen({ onComplete }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication
    onComplete();
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Handle social authentication
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Logo & Title */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] mb-6">
            <span className="text-3xl text-white">🏠</span>
          </div>
          <h1 className="mb-2">Welcome to Flare</h1>
          <p className="text-muted-foreground">
            Find your perfect shared flat
          </p>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="email" className="text-sm mb-2 block">Email</Label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-xl"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm mb-2 block">Password</Label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 rounded-xl"
                required
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full rounded-xl"
            size="lg"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl justify-start"
            size="lg"
            onClick={() => handleSocialLogin('google')}
          >
            <Chrome size={20} className="mr-3" />
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl justify-start"
            size="lg"
            onClick={() => handleSocialLogin('apple')}
          >
            <AppleIcon size={20} className="mr-3" />
            Continue with Apple
          </Button>
        </div>

        {/* Toggle Sign Up/Sign In */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-[var(--flare-green)] hover:text-[var(--flare-green-dark)] transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground mt-8">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
}
