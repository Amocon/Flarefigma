import { LucideIcon, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ComingSoonScreenProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  onBackToDashboard?: () => void;
}

export function ComingSoonScreen({ 
  title, 
  description = "This feature will be part of the next version of Flare.",
  icon: Icon = Clock,
  onBackToDashboard 
}: ComingSoonScreenProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-[#93c47d]/10 flex items-center justify-center mx-auto mb-8">
          <Icon size={48} className="text-[#93c47d]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="mb-4 text-[var(--flare-text)]">
          {title} – Coming Soon
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>

        {/* Back Button */}
        <Button
          size="lg"
          onClick={onBackToDashboard}
          className="rounded-full bg-[#38761d] hover:bg-[#38761d]/90 text-white px-8 h-12"
        >
          Back to Dashboard
        </Button>

        {/* Additional Info */}
        <p className="text-sm text-muted-foreground mt-8">
          We're working hard to bring you this feature. Stay tuned!
        </p>
      </div>
    </div>
  );
}