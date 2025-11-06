import { X, ChevronLeft, ChevronRight, Heart, MapPin, Users, Euro, Home as HomeIcon, Calendar, MessageCircle, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sheet, SheetContent } from './ui/sheet';
import { MemberAvatar } from './MemberAvatar';
import { useState } from 'react';

interface WGMember {
  name: string;
  age: number;
  photo: string;
  occupation: string;
}

interface WGDetail {
  id: string;
  name: string;
  district: string;
  address: string;
  price: number;
  photos: string[];
  residents: number;
  vibe: string[];
  size: string;
  availableFrom: string;
  description: string;
  members: WGMember[];
  amenities: string[];
  rules: string[];
}

interface WGDetailSheetProps {
  wg: WGDetail | null;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}

export function WGDetailSheet({ wg, open, onClose, onApply }: WGDetailSheetProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!wg) return null;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % wg.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + wg.photos.length) % wg.photos.length);
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] rounded-t-3xl p-0 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Header with Photo Carousel */}
          <div className="relative">
            <ImageWithFallback 
              src={wg.photos[currentPhotoIndex]} 
              alt={wg.name}
              className="w-full h-64 object-cover"
            />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Like Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`absolute top-4 left-4 rounded-full p-2 backdrop-blur-sm shadow-lg transition-all ${
                isLiked 
                  ? 'bg-[var(--flare-green)] text-white' 
                  : 'bg-white/95 text-gray-600'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>

            {/* Share Button */}
            <button
              className="absolute top-4 left-16 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg"
            >
              <Share2 size={20} />
            </button>
            
            {/* Photo Navigation */}
            {wg.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Photo Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {wg.photos.map((_, index) => (
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

            {/* Price */}
            <div className="absolute bottom-4 right-4 bg-[var(--flare-brown)] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
              <Euro size={16} />
              <span>{wg.price}/mo</span>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Title & Location */}
              <div>
                <h2 className="mb-2">{wg.name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-[var(--flare-green)]" />
                    <span>{wg.district}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-[var(--flare-green)]" />
                    <span>{wg.residents} flatmates</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <HomeIcon size={16} className="text-[var(--flare-green)]" />
                    <span>Room Size</span>
                  </div>
                  <p>{wg.size}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar size={16} className="text-[var(--flare-green)]" />
                    <span>Available</span>
                  </div>
                  <p>{wg.availableFrom}</p>
                </div>
              </div>

              {/* Vibe Tags */}
              <div>
                <h3 className="mb-3">Vibe</h3>
                <div className="flex flex-wrap gap-2">
                  {wg.vibe.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-2">About this WG</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {wg.description}
                </p>
              </div>

              {/* Members */}
              <div>
                <h3 className="mb-3">Meet Your Flatmates ({wg.members.length})</h3>
                <div className="space-y-3">
                  {wg.members.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 bg-muted rounded-xl p-3">
                      <MemberAvatar 
                        name={member.name}
                        photo={member.photo}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm">{member.name}, {member.age}</h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {member.occupation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {wg.amenities.length > 0 && (
                <div>
                  <h3 className="mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {wg.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--flare-green)]" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* House Rules */}
              {wg.rules.length > 0 && (
                <div>
                  <h3 className="mb-3">House Rules</h3>
                  <div className="space-y-2">
                    {wg.rules.map((rule) => (
                      <div key={rule} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--flare-green)] mt-1.5 shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Spacing for Fixed Actions */}
              <div className="h-20" />
            </div>
          </div>

          {/* Fixed Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1"
              >
                <MessageCircle size={20} />
                Message
              </Button>
              <Button 
                onClick={onApply}
                size="lg"
                className="flex-1"
              >
                <Heart size={20} />
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
