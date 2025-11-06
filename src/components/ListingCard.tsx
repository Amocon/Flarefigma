import { MapPin, Users, Euro, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ListingCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  roommates: number;
  availableFrom: string;
  size?: string;
}

export function ListingCard({ 
  id, 
  image, 
  title, 
  location, 
  price, 
  roommates, 
  availableFrom,
  size 
}: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
      <div className="relative">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-[var(--flare-text)] mb-1">{title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={14} />
            <span className="text-sm">{location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Euro size={16} className="text-[var(--flare-green)]" />
            <span>{price}/mo</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} className="text-[var(--flare-green)]" />
            <span>{roommates} flatmates</span>
          </div>
          {size && <span className="text-muted-foreground">{size}</span>}
        </div>
        
        <div className="pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Available from {availableFrom}
          </span>
        </div>
      </div>
    </div>
  );
}
