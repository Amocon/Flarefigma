import { useState } from 'react';
import { ChevronLeft, Link as LinkIcon, CheckCircle, Home, Users, MapPin, Euro } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MemberAvatar } from '../MemberAvatar';

interface JoinFlatFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

export function JoinFlatFlow({ onComplete, onBack }: JoinFlatFlowProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [step, setStep] = useState<'enter-code' | 'preview'>('enter-code');

  // Mock WG data that would be fetched based on invite code
  const mockWG = {
    name: 'Cozy Kreuzberg WG',
    photo: 'https://images.unsplash.com/photo-1758548157747-285c7012db5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZ3xlbnwxfHx8fDE3NjE4MjA5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: 'Oranienstraße 45, 10969 Berlin',
    district: 'Kreuzberg',
    rent: 520,
    roomSize: '18 m²',
    vibe: ['Social', 'Eco-friendly', 'Cooking'],
    members: [
      {
        name: 'Lisa',
        age: 28,
        photo: 'https://images.unsplash.com/photo-1635159784579-18905cf0124f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2MTczNTc5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        occupation: 'Software Engineer',
      },
      {
        name: 'Tom',
        age: 26,
        photo: 'https://images.unsplash.com/photo-1611695434398-4f4b330623e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU2MTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        occupation: 'Graphic Designer',
      },
    ],
  };

  const handleVerifyCode = () => {
    // Verify the invite code
    if (inviteCode.trim() !== '') {
      setStep('preview');
    }
  };

  const handleJoinWG = () => {
    onComplete();
  };

  const handleBack = () => {
    if (step === 'preview') {
      setStep('enter-code');
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleBack} className="text-white">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-white">Join a Flat</h2>
          <div className="w-6" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Step 1: Enter Invite Code */}
        {step === 'enter-code' && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <LinkIcon size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Enter Invite Code</h3>
              <p className="text-sm text-muted-foreground">
                Your flatmates should have shared an invite code with you
              </p>
            </div>

            <div>
              <Label htmlFor="invite-code" className="text-sm mb-2 block">
                Invite Code
              </Label>
              <Input
                id="invite-code"
                placeholder="FLARE-XXXXXX"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="rounded-xl text-center tracking-wider text-lg"
                maxLength={12}
              />
            </div>

            <div className="p-4 rounded-xl bg-[var(--flare-highlight)]/30 border border-[var(--flare-highlight)]">
              <p className="text-xs text-muted-foreground text-center">
                💡 Ask your future flatmates for the invite code they received when creating the WG
              </p>
            </div>

            <Button
              className="w-full rounded-xl"
              size="lg"
              onClick={handleVerifyCode}
              disabled={inviteCode.length < 6}
            >
              Verify Code
            </Button>
          </div>
        )}

        {/* Step 2: WG Preview */}
        {step === 'preview' && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <CheckCircle size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Preview Your WG</h3>
              <p className="text-sm text-muted-foreground">
                Review the details before joining
              </p>
            </div>

            {/* WG Card */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="relative">
                <ImageWithFallback 
                  src={mockWG.photo} 
                  alt={mockWG.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Price Badge */}
                <div className="absolute top-3 left-3 bg-[var(--flare-brown)] text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Euro size={14} />
                  <span className="text-sm">{mockWG.rent}</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Title & Location */}
                <div>
                  <h2 className="mb-2">{mockWG.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-[var(--flare-green)]" />
                    <span>{mockWG.district}</span>
                  </div>
                </div>

                {/* Room Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted rounded-xl p-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Home size={16} className="text-[var(--flare-green)]" />
                      <span>Room Size</span>
                    </div>
                    <p className="text-sm">{mockWG.roomSize}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Users size={16} className="text-[var(--flare-green)]" />
                      <span>Flatmates</span>
                    </div>
                    <p className="text-sm">{mockWG.members.length} people</p>
                  </div>
                </div>

                {/* Vibe */}
                <div>
                  <h4 className="text-sm mb-2">Vibe</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockWG.vibe.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Members */}
                <div>
                  <h4 className="text-sm mb-3">Your Future Flatmates</h4>
                  <div className="space-y-3">
                    {mockWG.members.map((member, index) => (
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
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--flare-green)]/10 border border-[var(--flare-green)]">
              <p className="text-sm text-center">
                ✓ You'll be added to this WG after joining
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {step === 'preview' && (
        <div className="p-6 border-t border-border bg-white">
          <Button
            className="w-full rounded-xl"
            size="lg"
            onClick={handleJoinWG}
          >
            Join WG
          </Button>
        </div>
      )}
    </div>
  );
}
