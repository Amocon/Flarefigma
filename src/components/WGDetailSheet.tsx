import { X, ChevronLeft, ChevronRight, Heart, MapPin, Users, Euro, Home as HomeIcon, Calendar, MessageCircle, Share2, User, Mail, Phone, Briefcase } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sheet, SheetContent } from './ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { MemberAvatar } from './MemberAvatar';
import { useState } from 'react';

interface WGMember {
  name: string;
  age: number;
  photo: string;
  occupation: string;
  gender: 'male' | 'female' | 'diverse';
  bio?: string;
  tags?: string[];
  email?: string;
  phone?: string;
  moveInDate?: string;
}

interface WGDetail {
  id: string | number;
  name: string;
  district: string;
  address?: string;
  location?: string;
  price?: number;
  rent?: number;
  photos: string[];
  images?: string[];
  residents: number;
  roommates?: number;
  vibe: string[];
  size: string | number;
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
  const [selectedMember, setSelectedMember] = useState<WGMember | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState(0);

  if (!wg) return null;

  // Normalize data (support both formats)
  const photos = wg.photos || wg.images || [];
  const price = wg.price || wg.rent || 0;
  const residents = wg.residents || wg.roommates || 0;
  const address = wg.address || wg.location || '';
  const size = typeof wg.size === 'number' ? `${wg.size}m²` : wg.size;
  const members = wg.members || [];
  const vibe = wg.vibe || [];
  const rules = wg.rules || [];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Calculate gender distribution
  const genderCounts = members.reduce((acc, member) => {
    acc[member.gender] = (acc[member.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getGenderIcon = (gender: 'male' | 'female' | 'diverse') => {
    switch (gender) {
      case 'male':
        return '♂';
      case 'female':
        return '♀';
      case 'diverse':
        return '⚥';
    }
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
              src={photos[currentPhotoIndex]} 
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
            {photos.length > 1 && (
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

            {/* Price */}
            <div className="absolute bottom-4 right-4 bg-[var(--flare-green)] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
              <Euro size={16} />
              <span>{price}/mo</span>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Title & Location */}
              <div>
                <h2 className="mb-2">{wg.name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-[var(--flare-green)]" />
                    <span>{wg.district}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-[var(--flare-green)]" />
                    <span>{residents} flatmates</span>
                  </div>
                  {/* Gender Indicators */}
                  <div className="flex items-center gap-1">
                    {Object.entries(genderCounts).map(([gender, count]) => (
                      <div 
                        key={gender}
                        className="flex items-center gap-0.5 px-2 py-0.5 bg-[var(--flare-highlight)]/30 rounded-full"
                      >
                        <span className="text-base leading-none">{getGenderIcon(gender as 'male' | 'female' | 'diverse')}</span>
                        <span className="text-xs">{count}</span>
                      </div>
                    ))}
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
                  <p>{size}</p>
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
                  {vibe.map((tag) => (
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
                <h3 className="mb-3">Meet Your Flatmates ({members.length})</h3>
                
                {/* Scrollable Tab Bar */}
                <div className="bg-white -mx-6 px-6 mb-4 border-b border-border">
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                    <User size={16} className="text-[var(--flare-green)] mr-2 shrink-0" />
                    {members.map((member, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveProfileTab(index)}
                        className="relative px-4 py-3 text-sm whitespace-nowrap transition-colors"
                        style={{
                          color: activeProfileTab === index 
                            ? '#040404' 
                            : 'rgba(4, 4, 4, 0.7)'
                        }}
                      >
                        {member.name}
                        {/* Active Tab Underline */}
                        {activeProfileTab === index && (
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--flare-green)] rounded-full transition-all"
                            style={{ borderRadius: '999px' }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Member Profile */}
                {members[activeProfileTab] && (
                  <div className="bg-muted rounded-xl p-4">
                    {/* Member Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <MemberAvatar 
                          name={members[activeProfileTab].name}
                          photo={members[activeProfileTab].photo}
                          size="lg"
                        />
                        {/* Gender Badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--flare-highlight)] border-2 border-muted flex items-center justify-center text-sm">
                          {getGenderIcon(members[activeProfileTab].gender)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{members[activeProfileTab].name}, {members[activeProfileTab].age}</h4>
                        <p className="text-sm text-muted-foreground">
                          {members[activeProfileTab].occupation}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    {members[activeProfileTab].bio && (
                      <div className="mb-4">
                        <Label className="text-xs text-muted-foreground mb-1 block">About</Label>
                        <p className="text-sm leading-relaxed">
                          {members[activeProfileTab].bio}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    {members[activeProfileTab].tags && members[activeProfileTab].tags!.length > 0 && (
                      <div className="mb-4">
                        <Label className="text-xs text-muted-foreground mb-2 block">Interests</Label>
                        <div className="flex flex-wrap gap-2">
                          {members[activeProfileTab].tags!.map((tag) => (
                            <Badge 
                              key={tag}
                              className="bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Move-in Date */}
                    {members[activeProfileTab].moveInDate && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} className="text-[var(--flare-green)]" />
                        <span>Member since {members[activeProfileTab].moveInDate}</span>
                      </div>
                    )}

                    {/* View Full Profile Button */}
                    {(members[activeProfileTab].email || members[activeProfileTab].phone) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMember(members[activeProfileTab])}
                        className="w-full rounded-full border-[var(--flare-green)] text-[var(--flare-green-dark)] hover:bg-[var(--flare-green)]/10 h-9 mt-4"
                      >
                        <User size={14} className="mr-1" />
                        View Full Profile
                      </Button>
                    )}
                  </div>
                )}
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
              {rules.length > 0 && (
                <div>
                  <h3 className="mb-3">House Rules</h3>
                  <div className="space-y-2">
                    {rules.map((rule) => (
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

      {/* Member Profile Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-md rounded-3xl">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[var(--flare-text)]">
                  {selectedMember.name}, {selectedMember.age}
                </DialogTitle>
                <DialogDescription>
                  View flatmate profile and details
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <Avatar className="w-16 h-16 border-2 border-[var(--flare-highlight)]">
                    <AvatarImage src={selectedMember.photo} />
                    <AvatarFallback>{selectedMember.name[0]}</AvatarFallback>
                  </Avatar>
                  {/* Gender Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--flare-highlight)] border-2 border-white flex items-center justify-center">
                    {getGenderIcon(selectedMember.gender)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{selectedMember.occupation}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Bio */}
                {selectedMember.bio && (
                  <div>
                    <Label className="text-xs text-muted-foreground">About</Label>
                    <p className="text-sm mt-1">{selectedMember.bio}</p>
                  </div>
                )}

                {/* Tags */}
                {selectedMember.tags && selectedMember.tags.length > 0 && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Interests</Label>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedMember.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          className="bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedMember.email || selectedMember.phone || selectedMember.moveInDate) && (
                  <>
                    <Separator className="bg-[var(--flare-highlight)]/30" />

                    {/* Contact Info */}
                    <div className="space-y-3">
                      {selectedMember.email && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-[var(--flare-highlight)]/30 flex items-center justify-center">
                            <Mail size={16} className="text-[var(--flare-green-dark)]" />
                          </div>
                          <span>{selectedMember.email}</span>
                        </div>
                      )}
                      {selectedMember.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-[var(--flare-highlight)]/30 flex items-center justify-center">
                            <Phone size={16} className="text-[var(--flare-green-dark)]" />
                          </div>
                          <span>{selectedMember.phone}</span>
                        </div>
                      )}
                      {selectedMember.moveInDate && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-[var(--flare-highlight)]/30 flex items-center justify-center">
                            <Calendar size={16} className="text-[var(--flare-green-dark)]" />
                          </div>
                          <span>Member since {selectedMember.moveInDate}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}