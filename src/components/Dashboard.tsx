import { 
  Users, 
  Home, 
  Calendar, 
  ClipboardList,
  Edit,
  UserSearch,
  Plus,
  Euro,
  Sparkles,
  CalendarDays,
  UserPlus,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DashboardProps {
  onNavigate?: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Mock WG data
  const wgData = {
    name: 'Kreuzberg Dreamers',
    status: 'searching' as 'searching' | 'active' | 'full',
    currentMembers: 3,
    totalRooms: 4,
    address: 'Kreuzberg, Berlin',
    activeApplications: 8,
    upcomingMeetings: 2,
    pendingTasks: 5
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'searching':
        return {
          label: 'Searching for Roommates',
          color: 'bg-[var(--flare-highlight)]/30 text-[var(--flare-brown)]',
          icon: UserSearch
        };
      case 'active':
        return {
          label: 'Active WG',
          color: 'bg-[var(--flare-green)]/20 text-[var(--flare-green-dark)]',
          icon: CheckCircle2
        };
      case 'full':
        return {
          label: 'WG Full',
          color: 'bg-muted text-muted-foreground',
          icon: Home
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-muted text-muted-foreground',
          icon: Home
        };
    }
  };

  const statusConfig = getStatusConfig(wgData.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your WG lifecycle</p>
      </div>

      {/* WG Overview Card */}
      <Card className="p-6 rounded-3xl shadow-lg border-border bg-gradient-to-br from-white to-[var(--flare-green)]/5">
        <div className="flex items-start gap-4 mb-6">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 flex items-center justify-center flex-shrink-0">
            <Home size={32} className="text-[var(--flare-green)]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="mb-2 text-[var(--flare-text)]">{wgData.name}</h2>
            <p className="text-sm text-muted-foreground mb-3">{wgData.address}</p>
            
            {/* Status Badge */}
            <Badge className={`rounded-full border-0 ${statusConfig.color}`}>
              <StatusIcon size={14} className="mr-1" />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {/* Members Info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-2xl border border-border">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Users size={18} className="text-[var(--flare-green-dark)]" />
              <p className="text-sm text-muted-foreground">Members</p>
            </div>
            <p className="text-[var(--flare-text)]">
              {wgData.currentMembers} / {wgData.totalRooms}
            </p>
          </div>
          
          <div className="w-px h-12 bg-border" />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Home size={18} className="text-[var(--flare-green-dark)]" />
              <p className="text-sm text-muted-foreground">Rooms Available</p>
            </div>
            <p className="text-[var(--flare-text)]">
              {wgData.totalRooms - wgData.currentMembers}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-full border-2 hover:bg-muted"
            onClick={() => onNavigate?.('profile')}
          >
            <Edit size={18} className="mr-2" />
            Edit Profile
          </Button>
          <Button
            className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
            onClick={() => onNavigate?.('matching')}
          >
            <UserSearch size={18} className="mr-2" />
            WG Matching
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3 text-[var(--flare-text)]">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <QuickActionCard
            icon={<Euro size={24} />}
            label="Add Expense"
            color="var(--flare-green)"
            onClick={() => onNavigate?.('financial')}
          />
          <QuickActionCard
            icon={<Sparkles size={24} />}
            label="Add Cleaning Task"
            color="var(--flare-brown)"
            onClick={() => onNavigate?.('cleaning')}
          />
          <QuickActionCard
            icon={<CalendarDays size={24} />}
            label="Open Calendar"
            color="var(--flare-green-dark)"
            onClick={() => onNavigate?.('calendar')}
          />
          <QuickActionCard
            icon={<UserPlus size={24} />}
            label="Manage Residents"
            color="var(--flare-highlight)"
            onClick={() => onNavigate?.('settings')}
          />
        </div>
      </div>

      {/* Status Overview */}
      <div>
        <h3 className="mb-3 text-[var(--flare-text)]">Status Overview</h3>
        <div className="space-y-3">
          {/* Active Applications */}
          <StatusCard
            icon={<UserSearch size={20} className="text-[var(--flare-green)]" />}
            title="Active Applications"
            value={wgData.activeApplications}
            description="applicants interested in your WG"
            action="Review Applications"
            onClick={() => onNavigate?.('matching')}
            variant="success"
          />

          {/* Upcoming Meetings */}
          <StatusCard
            icon={<Calendar size={20} className="text-[var(--flare-brown)]" />}
            title="Upcoming Meetings"
            value={wgData.upcomingMeetings}
            description="scheduled viewings this week"
            action="View Schedule"
            onClick={() => onNavigate?.('matching')}
            variant="warning"
          />

          {/* Shared Tasks */}
          <StatusCard
            icon={<ClipboardList size={20} className="text-[var(--flare-green-dark)]" />}
            title="Shared Tasks"
            value={wgData.pendingTasks}
            description="pending tasks to complete"
            action="View Tasks"
            onClick={() => onNavigate?.('cleaning')}
            variant="info"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="mb-3 text-[var(--flare-text)]">Recent Activity</h3>
        <Card className="rounded-2xl shadow-sm border-border overflow-hidden divide-y divide-border">
          <ActivityItem
            icon={<Users size={18} className="text-[var(--flare-green)]" />}
            title="New applicant interested"
            description="Sarah M. viewed your WG profile"
            time="2 hours ago"
          />
          <ActivityItem
            icon={<Calendar size={18} className="text-[var(--flare-brown)]" />}
            title="Meeting confirmed"
            description="Viewing scheduled for tomorrow at 18:00"
            time="5 hours ago"
          />
          <ActivityItem
            icon={<CheckCircle2 size={18} className="text-[var(--flare-green-dark)]" />}
            title="Task completed"
            description="Kitchen cleaning marked as done"
            time="1 day ago"
          />
        </Card>
      </div>
    </div>
  );
}

function ActivityItem({ 
  icon, 
  title, 
  description, 
  time 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  time: string;
}) {
  return (
    <div className="flex gap-3 p-4">
      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--flare-text)] mb-1">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ 
  icon, 
  label, 
  color,
  onClick
}: { 
  icon: React.ReactNode; 
  label: string; 
  color: string;
  onClick?: () => void;
}) {
  return (
    <button className="p-4 rounded-2xl border border-border bg-white hover:bg-muted transition-colors" onClick={onClick}>
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>
      <p className="text-sm text-[var(--flare-text)] text-center">{label}</p>
    </button>
  );
}

function StatusCard({ 
  icon, 
  title, 
  value, 
  description, 
  action, 
  onClick,
  variant
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: number; 
  description: string; 
  action: string; 
  onClick?: () => void;
  variant: 'success' | 'warning' | 'info';
}) {
  const getVariantColor = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'bg-[var(--flare-green)]/20 text-[var(--flare-green-dark)]';
      case 'warning':
        return 'bg-[var(--flare-highlight)]/30 text-[var(--flare-brown)]';
      case 'info':
        return 'bg-[var(--flare-green-dark)]/20 text-[var(--flare-green)]';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const variantColor = getVariantColor(variant);

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border">
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${variantColor}20` }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-[var(--flare-text)] font-medium">
          {value} <span className="text-sm text-muted-foreground">{description}</span>
        </p>
        <button
          className="text-sm text-[var(--flare-green-dark)] hover:underline"
          onClick={onClick}
        >
          {action}
        </button>
      </div>
    </div>
  );
}