import { useState } from 'react';
import { Wallet, Brush, ShoppingBag, Calendar, FileText } from 'lucide-react';
import { DrawerNavigation } from './components/DrawerNavigation';
import { Dashboard } from './components/Dashboard';
import { WGMatching } from './components/WGMatching';
import { ComingSoonScreen } from './components/ComingSoonScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ApplicantHome } from './components/ApplicantHome';
import { ApplicantApplications } from './components/ApplicantApplications';
import { SavedWGs } from './components/SavedWGs';
import { ProfileApplicant } from './components/ProfileApplicant';
import { ProfileResident } from './components/ProfileResident';
import { MyWG } from './components/MyWG';
import { TopBar } from './components/TopBar';
import './styles/globals.css';

type DrawerMenuItem = 
  | 'dashboard' 
  | 'mywg'
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

type UserRole = 'resident' | 'applicant';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState<DrawerMenuItem>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('resident');

  const handleNavigate = (item: DrawerMenuItem) => {
    if (item === 'logout') {
      // Handle logout - for now just reset to dashboard
      // In a real app, this would clear session/auth tokens
      setActiveScreen('dashboard');
      setIsDrawerOpen(false);
      return;
    }
    setActiveScreen(item);
    setIsDrawerOpen(false);
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setUserRole(newRole);
    // Reset to dashboard when switching roles
    setActiveScreen('dashboard');
    setIsDrawerOpen(false);
  };

  const renderContent = () => {
    // If applicant role, show applicant screens
    if (userRole === 'applicant') {
      switch (activeScreen) {
        case 'dashboard':
          return <ApplicantHome />;
        case 'matching':
          return <ApplicantHome />;
        case 'applications':
          return <ApplicantApplications />;
        case 'saved':
          return <SavedWGs />;
        case 'profile':
          return <ProfileApplicant />;
        case 'settings':
          return <SettingsScreen />;
        default:
          return <ApplicantHome />;
      }
    }

    // Resident role screens
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={(screen) => {
          const screenMap: { [key: string]: DrawerMenuItem } = {
            'matching': 'matching',
            'financial': 'financial',
            'cleaning': 'cleaning',
            'calendar': 'calendar',
            'shopping': 'shopping',
            'contracts': 'contracts',
            'settings': 'settings'
          };
          const mappedScreen = screenMap[screen];
          if (mappedScreen) {
            setActiveScreen(mappedScreen);
          }
        }} />;
      case 'mywg':
        return <MyWG onNavigate={(screen) => {
          const screenMap: { [key: string]: DrawerMenuItem } = {
            'matching': 'matching'
          };
          const mappedScreen = screenMap[screen];
          if (mappedScreen) {
            setActiveScreen(mappedScreen);
          }
        }} />;
      case 'matching':
        return <WGMatching />;
      case 'profile':
        return <ProfileResident />;
      case 'financial':
        return (
          <ComingSoonScreen
            title="Financial Plan"
            description="Track shared expenses, split bills, and manage rent payments with your flatmates. This feature will be part of the next version of Flare."
            icon={Wallet}
            onBackToDashboard={() => setActiveScreen('dashboard')}
          />
        );
      case 'cleaning':
        return (
          <ComingSoonScreen
            title="Cleaning Schedule"
            description="Create and manage a fair cleaning rotation for all common areas in your WG. This feature will be part of the next version of Flare."
            icon={Brush}
            onBackToDashboard={() => setActiveScreen('dashboard')}
          />
        );
      case 'shopping':
        return (
          <ComingSoonScreen
            title="Shopping List"
            description="Share and collaborate on grocery lists with your flatmates. This feature will be part of the next version of Flare."
            icon={ShoppingBag}
            onBackToDashboard={() => setActiveScreen('dashboard')}
          />
        );
      case 'calendar':
        return (
          <ComingSoonScreen
            title="Shared Calendar"
            description="Coordinate events, viewings, and important dates with your WG. This feature will be part of the next version of Flare."
            icon={Calendar}
            onBackToDashboard={() => setActiveScreen('dashboard')}
          />
        );
      case 'contracts':
        return (
          <ComingSoonScreen
            title="Contract Archive"
            description="Store and manage all your rental contracts and important documents securely. This feature will be part of the next version of Flare."
            icon={FileText}
            onBackToDashboard={() => setActiveScreen('dashboard')}
          />
        );
      case 'settings':
        return <SettingsScreen />;
      default:
        return <Dashboard onNavigate={(screen) => {
          const screenMap: { [key: string]: DrawerMenuItem } = {
            'matching': 'matching',
            'financial': 'financial',
            'cleaning': 'cleaning',
            'calendar': 'calendar',
            'shopping': 'shopping',
            'contracts': 'contracts',
            'settings': 'settings'
          };
          const mappedScreen = screenMap[screen];
          if (mappedScreen) {
            setActiveScreen(mappedScreen);
          }
        }} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Drawer Navigation */}
      <DrawerNavigation
        activeItem={activeScreen}
        onItemSelect={handleNavigate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {/* Top Bar */}
        <TopBar 
          onMenuClick={() => setIsDrawerOpen(true)}
          userRole={userRole}
          onRoleSwitch={handleRoleSwitch}
        />

        {/* Content with transition and top padding */}
        <div 
          key={userRole} 
          className="pt-[72px] transition-opacity duration-300 animate-in fade-in"
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;