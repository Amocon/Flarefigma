import { X, Home, Search, Wallet, Brush, ShoppingBag, Calendar, FileText, Settings, MessageCircle, User, LogOut, Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useEffect } from 'react';

export type DrawerMenuItem = 
  | 'dashboard' 
  | 'matching' 
  | 'financial' 
  | 'cleaning' 
  | 'shopping' 
  | 'calendar' 
  | 'contracts' 
  | 'applications'
  | 'saved'
  | 'profile'
  | 'settings'
  | 'logout';

interface DrawerNavigationProps {
  activeItem: DrawerMenuItem;
  onItemSelect: (item: DrawerMenuItem) => void;
  onLogout?: () => void;
  isOpen: boolean;
  onClose: () => void;
  userRole: 'resident' | 'applicant';
}

const residentMenuItems = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: Home, comingSoon: false },
  { id: 'matching' as const, label: 'WG Matching', icon: Search, comingSoon: false },
  { id: 'financial' as const, label: 'Financial Plan', icon: Wallet, comingSoon: true },
  { id: 'cleaning' as const, label: 'Cleaning Schedule', icon: Brush, comingSoon: true },
  { id: 'shopping' as const, label: 'Shopping List', icon: ShoppingBag, comingSoon: true },
  { id: 'calendar' as const, label: 'Shared Calendar', icon: Calendar, comingSoon: true },
  { id: 'contracts' as const, label: 'Contract Archive', icon: FileText, comingSoon: true },
  { id: 'profile' as const, label: 'Profile', icon: User, comingSoon: false },
  { id: 'settings' as const, label: 'Settings', icon: Settings, comingSoon: false },
  { id: 'logout' as const, label: 'Logout', icon: LogOut, comingSoon: false },
];

const applicantMenuItems = [
  { id: 'dashboard' as const, label: 'Home', icon: Home, comingSoon: false },
  { id: 'matching' as const, label: 'Browse WGs', icon: Search, comingSoon: false },
  { id: 'applications' as const, label: 'Applications & Chats', icon: MessageCircle, comingSoon: false },
  { id: 'saved' as const, label: 'Saved WGs', icon: Bookmark, comingSoon: false },
  { id: 'profile' as const, label: 'Profile', icon: User, comingSoon: false },
  { id: 'settings' as const, label: 'Settings', icon: Settings, comingSoon: false },
  { id: 'logout' as const, label: 'Logout', icon: LogOut, comingSoon: false },
];

export function DrawerNavigation({ 
  activeItem, 
  onItemSelect, 
  onLogout, 
  isOpen, 
  onClose,
  userRole 
}: DrawerNavigationProps) {
  const menuItems = userRole === 'resident' ? residentMenuItems : applicantMenuItems;

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const drawer = document.getElementById('drawer');
      
      if (isOpen && 
          drawer && 
          !drawer.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleItemClick = (item: DrawerMenuItem) => {
    onItemSelect(item);
  };

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          style={{ backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Drawer */}
      <div
        id="drawer"
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header with Accent Bar */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--flare-green-dark)]" />
          <div className="p-6 pl-8">
            <h2 className="text-[var(--flare-text)]">Flare</h2>
            <p className="text-sm text-muted-foreground">
              {userRole === 'resident' ? 'Shared flat management' : 'Find your perfect WG'}
            </p>
          </div>
        </div>

        {/* Role Badge */}
        <div className="px-4 pb-4">
          <Badge className="bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full">
            {userRole === 'resident' ? '🏠 WG Resident' : '🔍 Flat Seeker'}
          </Badge>
        </div>

        {/* Menu Items */}
        <nav className="px-4 py-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isLogout = item.id === 'logout';
            const showSeparator = isLogout && index > 0;
            
            return (
              <div key={item.id}>
                {showSeparator && (
                  <Separator className="my-3" />
                )}
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 relative ${
                    isActive
                      ? 'bg-[var(--flare-highlight)]/30 text-[var(--flare-brown)]'
                      : 'text-[var(--flare-text)] hover:bg-[var(--flare-highlight)]/20'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--flare-brown)] rounded-r-full" />
                  )}
                  <Icon size={20} className={isActive ? 'text-[var(--flare-brown)]' : ''} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.comingSoon && !isActive && (
                    <span className="text-xs text-muted-foreground">Soon</span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}