import { Heart, X, Users, MapPin, Euro, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface SwipeableWGCardProps {
  id: string;
  name: string;
  district: string;
  price: number;
  photos: string[];
  residents: number;
  vibe: string[];
  size: string;
  availableFrom: string;
  description: string;
  onLike: () => void;
  onSkip: () => void;
}

export function SwipeableWGCard({ 
  name,
  district,
  price,
  photos,
  residents,
  vibe,
  size,
  availableFrom,
  description,
  onLike,
  onSkip
}: SwipeableWGCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-border">
      {/* Photo Carousel */}
      <div className="relative h-[400px]">
        <ImageWithFallback 
          src={photos[currentPhotoIndex]} 
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Photo Navigation */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft size={24} className="text-[var(--flare-text)]" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight size={24} className="text-[var(--flare-text)]" />
            </button>
            
            {/* Photo Indicators */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all ${
                    index === currentPhotoIndex 
                      ? 'w-8 bg-white' 
                      : 'w-1 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-[var(--flare-brown)] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
          <Euro size={16} />
          <span>{price}/mo</span>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-6 space-y-4">
        <div>
          <h2 className="mb-2">{name}</h2>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-[var(--flare-green)]" />
              <span>{district}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="text-[var(--flare-green)]" />
              <span>{residents} flatmates</span>
            </div>
          </div>
        </div>
        
        {/* Vibe Tags */}
        <div className="flex flex-wrap gap-2">
          {vibe.map((tag) => (
            <Badge 
              key={tag}
              className="bg-[var(--flare-highlight)] text-[var(--flare-text)] border-0 rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Details */}
        <div className="pt-2 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Room Size</span>
            <span>{size}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Available From</span>
            <span>{availableFrom}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 pt-2">
          {description}
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="p-6 pt-0 flex gap-4">
        <Button
          onClick={onSkip}
          variant="outline"
          size="lg"
          className="flex-1 rounded-2xl h-14 border-2"
        >
          <X size={24} className="mr-2" />
          Skip
        </Button>
        <Button
          onClick={onLike}
          size="lg"
          className="flex-1 bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] text-white rounded-2xl h-14"
        >
          <Heart size={24} className="mr-2" />
          Like
        </Button>
      </div>
    </div>
  );
}
