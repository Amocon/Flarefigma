import { X, MapPin, Briefcase, Calendar, Mail, Phone, FileText, Heart, MessageCircle, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ApplicantDetail {
  id: string;
  name: string;
  age: number;
  photo: string;
  photos?: string[];
  location: string;
  occupation: string;
  intro: string;
  interests: string[];
  lookingFor: string;
  moveInDate: string;
  email?: string;
  phone?: string;
  references?: string;
  applicationDate: string;
}

interface ApplicantDetailModalProps {
  applicant: ApplicantDetail | null;
  open: boolean;
  onClose: () => void;
  onChat: () => void;
  onInvite: () => void;
}

export function ApplicantDetailModal({ 
  applicant, 
  open, 
  onClose, 
  onChat, 
  onInvite 
}: ApplicantDetailModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!applicant) return null;

  const photos = applicant.photos || [applicant.photo];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[92vh] overflow-hidden p-0 gap-0">
        {/* Header with Photo */}
        <div className="relative">
          <ImageWithFallback 
            src={photos[currentPhotoIndex]}
            alt={applicant.name}
            className="w-full h-72 object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg"
          >
            <X size={20} />
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

          {/* Name & Basic Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white mb-1">{applicant.name}, {applicant.age}</h2>
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{applicant.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={14} />
                <span>{applicant.occupation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-380px)] px-6 py-6 space-y-6">
          {/* Application Date */}
          <div className="bg-muted rounded-xl p-3 text-sm">
            <span className="text-muted-foreground">Applied on </span>
            <span>{applicant.applicationDate}</span>
          </div>

          {/* Move-in Date */}
          <div className="bg-muted rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm">Looking to move in</p>
            </div>
            <p>{applicant.moveInDate}</p>
          </div>

          {/* Introduction */}
          <div>
            <h4 className="mb-2">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {applicant.intro}
            </p>
          </div>

          <Separator />

          {/* Interests */}
          <div>
            <h4 className="mb-3">Interests & Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {applicant.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* What They're Looking For */}
          {applicant.lookingFor && (
            <>
              <div>
                <h4 className="mb-2">What I'm Looking For</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {applicant.lookingFor}
                </p>
              </div>
              <Separator />
            </>
          )}

          {/* Contact Information */}
          {(applicant.email || applicant.phone) && (
            <>
              <div>
                <h4 className="mb-3">Contact Information</h4>
                <div className="space-y-2">
                  {applicant.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} className="text-[var(--flare-green)]" />
                      <a 
                        href={`mailto:${applicant.email}`}
                        className="text-[var(--flare-green-dark)] hover:underline"
                      >
                        {applicant.email}
                      </a>
                    </div>
                  )}
                  {applicant.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-[var(--flare-green)]" />
                      <a 
                        href={`tel:${applicant.phone}`}
                        className="text-[var(--flare-green-dark)] hover:underline"
                      >
                        {applicant.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* References */}
          {applicant.references && (
            <>
              <div>
                <h4 className="mb-2">References</h4>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {applicant.references}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Bottom Spacing */}
          <div className="h-20" />
        </div>

        {/* Fixed Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg"
              onClick={onChat}
              className="flex-1"
            >
              <MessageCircle size={20} />
              Chat
            </Button>
            <Button 
              onClick={onInvite}
              size="lg"
              className="flex-1"
            >
              <UserCheck size={20} />
              Invite
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
