import { Menu, Home, UserCheck } from 'lucide-react';
import { Button } from './ui/button';

interface TopBarProps {
  onMenuClick: () => void;
  userRole: 'resident' | 'applicant';
  onRoleSwitch: (role: 'resident' | 'applicant') => void;
}

export function TopBar({ onMenuClick, userRole, onRoleSwitch }: TopBarProps) {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-b border-border z-40 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="rounded-full hover:bg-muted -ml-2"
          >
            <Menu size={24} className="text-[var(--flare-text)]" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center shadow-sm">
              <span className="text-white text-sm">F</span>
            </div>
            <h3 className="text-[var(--flare-text)]">Flare</h3>
          </div>
        </div>

        {/* Right: Role Switcher */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-full">
          <button
            onClick={() => onRoleSwitch('resident')}
            className={`
              px-3 py-1.5 rounded-full text-sm transition-all duration-300 flex items-center gap-1.5
              ${userRole === 'resident' 
                ? 'bg-[var(--flare-green)] text-white shadow-sm' 
                : 'text-[var(--flare-text)] hover:bg-background'
              }
            `}
          >
            <Home size={14} />
            <span className="hidden sm:inline">Resident</span>
          </button>
          <button
            onClick={() => onRoleSwitch('applicant')}
            className={`
              px-3 py-1.5 rounded-full text-sm transition-all duration-300 flex items-center gap-1.5
              ${userRole === 'applicant' 
                ? 'bg-[var(--flare-green)] text-white shadow-sm' 
                : 'text-[var(--flare-text)] hover:bg-background'
              }
            `}
          >
            <UserCheck size={14} />
            <span className="hidden sm:inline">Applicant</span>
          </button>
        </div>
      </div>
    </div>
  );
}
