import { MessageCircle, X, Heart, MapPin, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState } from 'react';

interface ApplicantSwipeCardProps {
  id: string;
  name: string;
  age: number;
  photo: string;
  location: string;
  occupation: string;
  intro: string;
  interests: string[];
  moveInDate: string;
  onChat: () => void;
  onDismiss: () => void;
  onViewDetails: () => void;
}

export function ApplicantSwipeCard({
  name,
  age,
  photo,
  location,
  occupation,
  intro,
  interests,
  moveInDate,
  onChat,
  onDismiss,
  onViewDetails,
}: ApplicantSwipeCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleSwipeLeft();
    } else if (isRightSwipe) {
      handleSwipeRight();
    }
  };

  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    setTimeout(() => {
      onDismiss();
      setSwipeDirection(null);
    }, 300);
  };

  const handleSwipeRight = () => {
    setSwipeDirection('right');
    setTimeout(() => {
      onChat();
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div 
      className={`relative transition-all duration-300 ${
        swipeDirection === 'left' 
          ? '-translate-x-full opacity-0' 
          : swipeDirection === 'right'
          ? 'translate-x-full opacity-0'
          : ''
      }`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden">
        {/* Photo Header */}
        <div className="relative">
          <ImageWithFallback 
            src={photo}
            alt={name}
            className="w-full h-80 object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Name & Age on Photo */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white mb-1">{name}, {age}</h2>
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={14} />
                <span>{occupation}</span>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={onViewDetails}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight size={20} className="text-[var(--flare-green)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Move-in Date */}
          <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
            <Calendar size={16} className="text-[var(--flare-green)]" />
            <div>
              <p className="text-xs text-muted-foreground">Looking to move in</p>
              <p className="text-sm">{moveInDate}</p>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <h4 className="mb-2">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {intro}
            </p>
          </div>

          {/* Interests */}
          <div>
            <h4 className="mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {interests.slice(0, 6).map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
              {interests.length > 6 && (
                <Badge variant="secondary">
                  +{interests.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <Button
            onClick={handleSwipeLeft}
            variant="outline"
            size="lg"
            className="flex-1 rounded-2xl border-2 hover:border-[var(--flare-brown)] hover:bg-[var(--flare-brown)]/5"
          >
            <X size={24} className="mr-2 text-[var(--flare-brown)]" />
            Dismiss
          </Button>
          <Button
            onClick={handleSwipeRight}
            size="lg"
            className="flex-1 rounded-2xl"
          >
            <MessageCircle size={24} className="mr-2" />
            Chat
          </Button>
        </div>

        {/* Swipe Hint */}
        <div className="px-6 pb-4 text-center">
          <p className="text-xs text-muted-foreground">
            Swipe left to dismiss • Swipe right to chat
          </p>
        </div>
      </div>
    </div>
  );
}
