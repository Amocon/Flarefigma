import { User, Bell, Lock, Globe, HelpCircle, Info, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export function SettingsScreen() {
  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div>
        <h3 className="mb-3 text-[var(--flare-text)]">Account</h3>
        <Card className="rounded-2xl shadow-sm border-border overflow-hidden">
          <SettingsItem
            icon={<User size={20} />}
            label="Profile Information"
            description="Update your personal details"
            showChevron
          />
          <Separator />
          <SettingsItem
            icon={<Lock size={20} />}
            label="Privacy & Security"
            description="Manage your privacy settings"
            showChevron
          />
        </Card>
      </div>

      {/* Notifications Section */}
      <div>
        <h3 className="mb-3 text-[var(--flare-text)]">Notifications</h3>
        <Card className="rounded-2xl shadow-sm border-border overflow-hidden">
          <SettingsToggleItem
            icon={<Bell size={20} />}
            label="Push Notifications"
            description="Receive updates on your device"
            defaultChecked={true}
          />
          <Separator />
          <SettingsToggleItem
            icon={<Bell size={20} />}
            label="Email Notifications"
            description="Get updates via email"
            defaultChecked={false}
          />
        </Card>
      </div>

      {/* Preferences Section */}
      <div>
        <h3 className="mb-3 text-[var(--flare-text)]">Preferences</h3>
        <Card className="rounded-2xl shadow-sm border-border overflow-hidden">
          <SettingsItem
            icon={<Globe size={20} />}
            label="Language"
            description="English"
            showChevron
          />
          <Separator />
          <SettingsToggleItem
            icon={<Globe size={20} />}
            label="Dark Mode"
            description="Switch to dark theme"
            defaultChecked={false}
          />
        </Card>
      </div>

      {/* Support Section */}
      <div>
        <h3 className="mb-3 text-[var(--flare-text)]">Support</h3>
        <Card className="rounded-2xl shadow-sm border-border overflow-hidden">
          <SettingsItem
            icon={<HelpCircle size={20} />}
            label="Help Center"
            description="Get help with Flare"
            showChevron
          />
          <Separator />
          <SettingsItem
            icon={<Info size={20} />}
            label="About Flare"
            description="Version 1.0.0"
            showChevron
          />
        </Card>
      </div>
    </div>
  );
}

function SettingsItem({
  icon,
  label,
  description,
  showChevron = false
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  showChevron?: boolean;
}) {
  return (
    <button className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors">
      <div className="w-10 h-10 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center text-[var(--flare-green-dark)] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm text-[var(--flare-text)] mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {showChevron && (
        <ChevronRight size={20} className="text-muted-foreground flex-shrink-0" />
      )}
    </button>
  );
}

function SettingsToggleItem({
  icon,
  label,
  description,
  defaultChecked = false
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-10 h-10 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center text-[var(--flare-green-dark)] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm text-[var(--flare-text)] mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
