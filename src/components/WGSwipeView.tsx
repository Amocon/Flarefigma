import { useState } from 'react';
import { Heart, X, MapPin, Euro, Users, Home, Calendar, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface WGListing {
  id: number;
  name: string;
  location: string;
  district: string;
  rent: number;
  availableFrom: string;
  roommates: number;
  totalRooms: number;
  size: number;
  image: string;
  matchScore: number;
  description: string;
}

interface WGSwipeViewProps {
  listings: WGListing[];
  onLike: (id: number) => void;
  onPass: (id: number) => void;
  onViewDetails: (wg: WGListing) => void;
}

export function WGSwipeView({ listings, onLike, onPass, onViewDetails }: WGSwipeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const currentWG = listings[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === 'right') {
        onLike(currentWG.id);
      } else {
        onPass(currentWG.id);
      }
      
      if (currentIndex < listings.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      setSwipeDirection(null);
    }, 300);
  };

  if (!currentWG) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center mb-4">
          <Home size={40} className="text-[var(--flare-green)]" />
        </div>
        <h3 className="text-[var(--flare-text)] mb-2">No more WGs</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          You've seen all available WGs. Adjust your filters to see more options.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Card Stack */}
      <div className="relative" style={{ height: '500px' }}>
        {/* Preview Cards (behind) */}
        {listings.slice(currentIndex + 1, currentIndex + 3).map((wg, index) => (
          <Card
            key={wg.id}
            className="absolute inset-x-0 rounded-3xl overflow-hidden shadow-lg border-border"
            style={{
              top: `${(index + 1) * 8}px`,
              transform: `scale(${1 - (index + 1) * 0.05})`,
              opacity: 1 - (index + 1) * 0.3,
              zIndex: 10 - index
            }}
          >
            <div className="h-80 bg-muted" />
          </Card>
        ))}

        {/* Current Card */}
        <Card
          className={`absolute inset-x-0 rounded-3xl overflow-hidden shadow-xl border-border transition-all duration-300 ${
            swipeDirection === 'left' 
              ? '-translate-x-full opacity-0 -rotate-12' 
              : swipeDirection === 'right'
              ? 'translate-x-full opacity-0 rotate-12'
              : ''
          }`}
          style={{ zIndex: 20 }}
        >
          {/* Image */}
          <div className="relative h-80 bg-muted">
            <img
              src={currentWG.image}
              alt={currentWG.name}
              className="w-full h-full object-cover"
            />
            
            {/* Match Score Badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-[var(--flare-green)] text-white rounded-full shadow-lg backdrop-blur-sm">
              <span className="text-sm">{currentWG.matchScore}% Match</span>
            </div>

            {/* Info Button */}
            <Button
              size="icon"
              onClick={() => onViewDetails(currentWG)}
              className="absolute top-4 left-4 rounded-full bg-white/90 hover:bg-white text-[var(--flare-text)] backdrop-blur-sm"
            >
              <Info size={20} />
            </Button>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-white mb-2">{currentWG.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} />
              <span className="text-sm">{currentWG.location}, {currentWG.district}</span>
            </div>

            {/* Quick Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Euro size={16} />
                <span className="text-sm">€{currentWG.rent}/mo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={16} />
                <span className="text-sm">{currentWG.roommates}/{currentWG.totalRooms} roommates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Home size={16} />
                <span className="text-sm">{currentWG.size}m²</span>
              </div>
            </div>

            {/* Available From */}
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} />
              <span>Available from {currentWG.availableFrom}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <Button
          size="icon"
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-white border-2 border-border hover:bg-muted text-[var(--flare-text)] shadow-lg"
        >
          <X size={32} />
        </Button>

        <Button
          size="icon"
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] text-white shadow-xl"
        >
          <Heart size={36} />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} of {listings.length} WGs
        </p>
      </div>
    </div>
  );
}
