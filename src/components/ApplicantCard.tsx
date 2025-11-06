import { MapPin, Briefcase, GraduationCap, Calendar, Check, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface ApplicantCardProps {
  id: string;
  name: string;
  age: number;
  photo: string;
  occupation: string;
  location: string;
  moveInDate: string;
  bio: string;
  onAccept?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

export function ApplicantCard({ 
  name, 
  age, 
  photo, 
  occupation, 
  location, 
  moveInDate,
  bio,
  onAccept,
  onReject,
  showActions = true
}: ApplicantCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
      <div className="relative">
        <ImageWithFallback 
          src={photo} 
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white">{name}, {age}</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Briefcase size={16} className="text-[var(--flare-green)]" />
            <span>{occupation}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-[var(--flare-green)]" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-[var(--flare-green)]" />
            <span>Moving in: {moveInDate}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>
        
        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={onReject}
              variant="outline"
              className="flex-1 rounded-xl"
            >
              <X size={18} className="mr-2" />
              Pass
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] text-white rounded-xl"
            >
              <Check size={18} className="mr-2" />
              Accept
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
