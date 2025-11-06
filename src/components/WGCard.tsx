import { Heart, MapPin, Users, Euro, Home as HomeIcon, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState } from 'react';

interface WGCardProps {
  id: string;
  name: string;
  district: string;
  price: number;
  photos: string[];
  residents: number;
  vibe: string[];
  size: string;
  availableFrom: string;
  distance?: string;
  description: string;
  compact?: boolean;
  onLike?: () => void;
  onClick?: () => void;
}

export function WGCard({ 
  name,
  district,
  price,
  photos,
  residents,
  vibe,
  size,
  distance,
  compact = false,
  onClick,
  onLike,
}: WGCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer ${
        compact ? '' : ''
      }`}
    >
      {/* Photo */}
      <div className="relative">
        <ImageWithFallback 
          src={photos[0]} 
          alt={name}
          className={`w-full object-cover ${compact ? 'h-40' : 'h-48'}`}
        />
        
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className={`absolute top-3 right-3 rounded-full p-2 backdrop-blur-sm transition-all ${
            isLiked 
              ? 'bg-[var(--flare-green)] text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart 
            size={20} 
            fill={isLiked ? 'currentColor' : 'none'}
          />
        </button>
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3 bg-[var(--flare-brown)] text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <Euro size={14} />
          <span className="text-sm">{price}</span>
        </div>

        {/* Distance Badge */}
        {distance && (
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs">
            {distance}
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className={compact ? 'p-3' : 'p-4'}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="truncate mb-1">{name}</h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} className="text-[var(--flare-green)] shrink-0" />
              <span className="truncate">{district}</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-muted-foreground shrink-0 ml-2" />
        </div>
        
        {/* Details */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{residents} people</span>
          </div>
          <div className="flex items-center gap-1">
            <HomeIcon size={14} />
            <span>{size}</span>
          </div>
        </div>
        
        {/* Vibe Tags */}
        {!compact && (
          <div className="flex flex-wrap gap-1.5">
            {vibe.slice(0, 3).map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
            {vibe.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{vibe.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
