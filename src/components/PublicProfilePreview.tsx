import { X, MapPin, Briefcase, Heart, Mail, Phone, Calendar, User, Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface PublicProfilePreviewProps {
  open: boolean;
  onClose: () => void;
  visibilitySettings: {
    showPhoto: boolean;
    showFullName: boolean;
    showAge: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showOccupation: boolean;
    showAbout: boolean;
    showHobbies: boolean;
    showLookingFor: boolean;
  };
}

export function PublicProfilePreview({ open, onClose, visibilitySettings }: PublicProfilePreviewProps) {
  // Mock profile data
  const profile = {
    firstName: 'Anna',
    lastName: 'Müller',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHx8MTc2MTUyNzUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Berlin, Germany',
    occupation: 'Marketing Manager at TechCorp',
    about: 'Outgoing and friendly marketing professional looking for a WG in Berlin. I love cooking, yoga, and exploring new cafes. I value cleanliness, respect, and good communication. Non-smoker, LGBTQ+ friendly.',
    hobbies: ['Cooking', 'Yoga', 'Photography', 'Hiking', 'Coffee', 'Reading'],
    lookingFor: 'Friendly WG with 2-3 flatmates, clean and organized, social but respectful of quiet time. Pet-friendly preferred. Budget: €400-600/month.',
    email: 'anna.muller@email.com',
    phone: '+49 157 12345678',
    moveInDate: 'December 2025',
  };

  const displayName = visibilitySettings.showFullName 
    ? `${profile.firstName} ${profile.lastName}`
    : profile.firstName;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-hidden p-0 gap-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 py-5 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Eye size={20} />
              </div>
              <h3 className="text-white">Profile Preview</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-white/90 text-sm">How WG owners see your profile</p>
        </div>

        {/* Profile Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            {visibilitySettings.showPhoto ? (
              <ImageWithFallback 
                src={profile.photo}
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <User size={40} className="text-muted-foreground" />
              </div>
            )}
            
            <h2 className="mb-1">
              {displayName}
              {visibilitySettings.showAge && `, ${profile.age}`}
            </h2>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} className="text-[var(--flare-green)]" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Contact Info - Only if visible */}
          {(visibilitySettings.showEmail || visibilitySettings.showPhone) && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm flex items-center gap-2">
                  <Mail size={16} className="text-[var(--flare-green)]" />
                  Contact Information
                </h4>
                <div className="space-y-2 ml-6">
                  {visibilitySettings.showEmail && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{profile.email}</span>
                    </div>
                  )}
                  {visibilitySettings.showPhone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Occupation */}
          {visibilitySettings.showOccupation && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm flex items-center gap-2">
                  <Briefcase size={16} className="text-[var(--flare-green)]" />
                  Occupation
                </h4>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm">{profile.occupation}</p>
                </div>
              </div>
            </>
          )}

          {/* About Me */}
          {visibilitySettings.showAbout && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm flex items-center gap-2">
                  <User size={16} className="text-[var(--flare-green)]" />
                  About Me
                </h4>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profile.about}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Hobbies & Interests */}
          {visibilitySettings.showHobbies && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm flex items-center gap-2">
                  <Heart size={16} className="text-[var(--flare-green)]" />
                  Hobbies & Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((hobby) => (
                    <Badge key={hobby} variant="secondary">
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* What I'm Looking For */}
          {visibilitySettings.showLookingFor && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-[var(--flare-green)]" />
                  What I'm Looking For
                </h4>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profile.lookingFor}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Move-in Date */}
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm flex items-center gap-2">
              <Calendar size={16} className="text-[var(--flare-green)]" />
              Availability
            </h4>
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm">Available from {profile.moveInDate}</p>
            </div>
          </div>

          {/* Hidden Fields Notice */}
          {!Object.values(visibilitySettings).every(v => v) && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <EyeOff size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-900 mb-1">Some information is hidden</p>
                  <p className="text-xs text-amber-700">
                    Fields you've marked as private won't appear in your public profile. 
                    You can still include them when applying to specific WGs.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 bg-white sticky bottom-0">
          <Button 
            onClick={onClose}
            className="w-full"
          >
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
