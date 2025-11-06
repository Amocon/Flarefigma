import { Home, User, MessageCircle } from 'lucide-react';

interface TabBarProps {
  activeTab: 'home' | 'profile' | 'applications';
  onTabChange: (tab: 'home' | 'profile' | 'applications') => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'applications', label: 'Chat', icon: MessageCircle },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-2px_8px_rgba(0,0,0,0.04)] z-50">
      <div className="max-w-md mx-auto flex items-center justify-around px-6 py-3 safe-area-inset-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center gap-1.5 min-w-[70px] 
                transition-all duration-200 ease-out
                ${isActive ? 'scale-105' : 'scale-100'}
              `}
            >
              <div className={`
                relative p-2 rounded-2xl transition-all duration-200
                ${isActive ? 'bg-[var(--flare-nav-active)]/10' : ''}
              `}>
                <Icon 
                  size={24}
                  className={`
                    transition-colors duration-200
                    ${isActive ? 'text-[var(--flare-nav-active)]' : 'text-[var(--flare-nav-inactive)]'}
                  `}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span 
                className={`
                  text-xs transition-colors duration-200
                  ${isActive ? 'text-[var(--flare-nav-active)]' : 'text-[var(--flare-nav-inactive)]'}
                `}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
