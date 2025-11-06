import { Home, UserPlus, Search } from 'lucide-react';
import { Button } from '../ui/button';

interface RoleSelectionScreenProps {
  onRoleSelect: (role: 'create-flat' | 'join-flat' | 'applicant-profile') => void;
}

export function RoleSelectionScreen({ onRoleSelect }: RoleSelectionScreenProps) {
  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-3">What brings you here?</h1>
          <p className="text-muted-foreground">
            Choose the option that best describes your situation
          </p>
        </div>

        {/* Role Options */}
        <div className="space-y-4">
          {/* Create a Flat */}
          <button
            onClick={() => onRoleSelect('create-flat')}
            className="w-full bg-white border-2 border-border hover:border-[var(--flare-green)] rounded-2xl p-6 transition-all hover:shadow-md group text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Home size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="mb-1">Create a Flat</h3>
                <p className="text-sm text-muted-foreground">
                  You have a WG and are looking for new flatmates
                </p>
              </div>
            </div>
          </button>

          {/* Join Existing Flat */}
          <button
            onClick={() => onRoleSelect('join-flat')}
            className="w-full bg-white border-2 border-border hover:border-[var(--flare-green)] rounded-2xl p-6 transition-all hover:shadow-md group text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <UserPlus size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="mb-1">Join Existing Flat</h3>
                <p className="text-sm text-muted-foreground">
                  You have an invite code from your future flatmates
                </p>
              </div>
            </div>
          </button>

          {/* Search for a Flat */}
          <button
            onClick={() => onRoleSelect('applicant-profile')}
            className="w-full bg-white border-2 border-border hover:border-[var(--flare-green)] rounded-2xl p-6 transition-all hover:shadow-md group text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Search size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="mb-1">Search for a Flat</h3>
                <p className="text-sm text-muted-foreground">
                  You're looking for a WG to join
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-xl bg-[var(--flare-highlight)]/30 border border-[var(--flare-highlight)]">
          <p className="text-xs text-muted-foreground text-center">
            💡 Don't worry, you can always switch between modes later in settings
          </p>
        </div>
      </div>
    </div>
  );
}
