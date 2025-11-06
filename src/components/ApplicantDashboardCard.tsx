import { MessageCircle, Eye, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ApplicantDashboardCardProps {
  id: string;
  name: string;
  age: number;
  photo: string;
  intro: string;
  interests: string[];
  onViewProfile: () => void;
  onChat: () => void;
  onInvite: () => void;
}

export function ApplicantDashboardCard({ 
  name, 
  age, 
  photo, 
  intro,
  interests,
  onViewProfile,
  onChat,
  onInvite
}: ApplicantDashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
      <div className="flex gap-4 p-4">
        {/* Photo */}
        <ImageWithFallback 
          src={photo} 
          alt={name}
          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
        />
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="mb-1">{name}, {age}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{intro}</p>
        </div>
      </div>
      
      {/* Interests */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {interests.slice(0, 4).map((interest) => (
            <Badge 
              key={interest} 
              variant="secondary"
              className="bg-[var(--flare-highlight)] text-[var(--flare-text)] border-0 rounded-full text-xs"
            >
              {interest}
            </Badge>
          ))}
          {interests.length > 4 && (
            <Badge 
              variant="secondary"
              className="bg-muted text-muted-foreground border-0 rounded-full text-xs"
            >
              +{interests.length - 4}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2 p-4 pt-3 border-t border-border">
        <Button
          onClick={onViewProfile}
          variant="outline"
          className="flex-1 rounded-xl"
          size="sm"
        >
          <Eye size={16} className="mr-2" />
          View
        </Button>
        <Button
          onClick={onChat}
          variant="outline"
          className="flex-1 rounded-xl"
          size="sm"
        >
          <MessageCircle size={16} className="mr-2" />
          Chat
        </Button>
        <Button
          onClick={onInvite}
          className="flex-1 bg-[var(--flare-brown)] hover:bg-[#6d4a2e] text-white rounded-xl"
          size="sm"
        >
          <Send size={16} className="mr-2" />
          Invite
        </Button>
      </div>
    </div>
  );
}
