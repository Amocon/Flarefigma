import { useState } from 'react';
import { Bookmark, Home, XCircle, MapPin, Euro, Users, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ApplicationModal } from './ApplicationModal';

interface SavedWG {
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
  description: string;
  matchScore: number;
  savedDate: string;
  question?: string;
}

export function SavedWGs() {
  const [applyingToWG, setApplyingToWG] = useState<SavedWG | null>(null);
  const [savedWGs, setSavedWGs] = useState<SavedWG[]>([
    {
      id: 2,
      name: 'Mitte Modern Living',
      location: 'Torstraße 88',
      district: 'Mitte',
      rent: 600,
      availableFrom: 'Dec 15, 2024',
      roommates: 2,
      totalRooms: 3,
      size: 75,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      description: 'Modern apartment in central Mitte. Perfect for young professionals. Close to public transport and great nightlife.',
      matchScore: 87,
      savedDate: '2024-11-05',
      question: 'Tell us about your daily routine and work schedule.'
    },
    {
      id: 4,
      name: 'Prenzlauer Berg Family',
      location: 'Kollwitzstraße 34',
      district: 'Prenzlauer Berg',
      rent: 620,
      availableFrom: 'Feb 1, 2025',
      roommates: 2,
      totalRooms: 3,
      size: 80,
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80',
      description: 'Quiet and cozy WG in beautiful Prenzlauer Berg. We value a calm atmosphere and mutual respect.',
      matchScore: 78,
      savedDate: '2024-11-04',
      question: 'How do you contribute to a peaceful living environment?'
    },
    {
      id: 3,
      name: 'Neukölln Creative Hub',
      location: 'Weserstraße 12',
      district: 'Neukölln',
      rent: 480,
      availableFrom: 'Jan 15, 2025',
      roommates: 4,
      totalRooms: 5,
      size: 95,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      description: 'Artistic community in vibrant Neukölln. We are musicians, artists, and creatives. Looking for someone who appreciates a bohemian lifestyle.',
      matchScore: 85,
      savedDate: '2024-11-02',
      question: 'What creative projects are you currently working on?'
    }
  ]);

  const handleRemove = (wgId: number) => {
    setSavedWGs(savedWGs.filter(wg => wg.id !== wgId));
  };

  const handleApply = (wg: SavedWG) => {
    setApplyingToWG(wg);
  };

  const handleSubmitApplication = (wgId: number, answer: string) => {
    console.log('Application submitted to WG:', wgId, 'with answer:', answer);
    // Remove from saved list after applying
    setSavedWGs(savedWGs.filter(wg => wg.id !== wgId));
  };

  const handleSaveForLater = (wgId: number) => {
    // Already saved, just close modal
    console.log('WG already in saved list:', wgId);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="px-6 py-6 pb-20">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
            <Bookmark size={20} className="text-[var(--flare-green)]" />
          </div>
          <h1 className="text-[var(--flare-text)]">Saved WGs</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {savedWGs.length} {savedWGs.length === 1 ? 'WG' : 'WGs'} saved for later
        </p>
      </div>

      {/* Empty State */}
      {savedWGs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Bookmark size={36} className="text-muted-foreground" />
          </div>
          <h3 className="text-[var(--flare-text)] mb-2">No Saved WGs</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            When you find a WG you like but aren't ready to apply, save it here for later.
          </p>
        </div>
      )}

      {/* Saved WGs List */}
      <div className="space-y-4">
        {savedWGs.map((wg) => (
          <Card key={wg.id} className="rounded-2xl overflow-hidden border-border">
            {/* Image Section */}
            <div className="relative h-48">
              <img
                src={wg.image}
                alt={wg.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Match Score Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-[var(--flare-green)] text-white rounded-full shadow-lg">
                <span className="text-xs">{wg.matchScore}% Match</span>
              </div>

              {/* Saved Date Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow">
                <span className="text-xs text-[var(--flare-text)]">Saved {formatDate(wg.savedDate)}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-3">
              {/* Header */}
              <div>
                <h3 className="text-[var(--flare-text)] mb-1">{wg.name}</h3>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin size={14} />
                  <span className="text-sm">{wg.location}, {wg.district}</span>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-muted rounded-lg p-2 text-center">
                  <Euro size={16} className="mx-auto mb-1 text-[var(--flare-green)]" />
                  <p className="text-xs text-muted-foreground mb-0.5">Rent</p>
                  <p className="text-sm text-[var(--flare-text)]">€{wg.rent}</p>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <Users size={16} className="mx-auto mb-1 text-[var(--flare-green)]" />
                  <p className="text-xs text-muted-foreground mb-0.5">Roommates</p>
                  <p className="text-sm text-[var(--flare-text)]">{wg.roommates}/{wg.totalRooms}</p>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <Home size={16} className="mx-auto mb-1 text-[var(--flare-green)]" />
                  <p className="text-xs text-muted-foreground mb-0.5">Size</p>
                  <p className="text-sm text-[var(--flare-text)]">{wg.size}m²</p>
                </div>
              </div>

              {/* Available From */}
              <div className="flex items-center gap-2 p-2 bg-[var(--flare-green)]/5 rounded-lg">
                <Calendar size={14} className="text-[var(--flare-green)]" />
                <span className="text-xs text-[var(--flare-text)]">
                  Available from {wg.availableFrom}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {wg.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleApply(wg)}
                  className="flex-1 rounded-full bg-[var(--flare-brown)] hover:bg-[#6d4a2d] text-white h-10"
                >
                  <Home size={16} className="mr-2" />
                  Apply Now
                </Button>
                <Button
                  onClick={() => handleRemove(wg.id)}
                  variant="outline"
                  className="rounded-full border-2 px-4 h-10 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                >
                  <XCircle size={16} className="mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tip Card */}
      {savedWGs.length > 0 && (
        <Card className="mt-6 p-4 rounded-2xl bg-[var(--flare-green)]/5 border-[var(--flare-green)]/20">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--flare-green)]/20 flex items-center justify-center flex-shrink-0">
              <Bookmark size={16} className="text-[var(--flare-green)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--flare-text)] mb-1">💡 Pro Tip</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                WGs get many applications. Don't wait too long to apply to your saved favorites!
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Application Modal */}
      {applyingToWG && (
        <ApplicationModal
          wg={applyingToWG}
          isOpen={!!applyingToWG}
          onClose={() => setApplyingToWG(null)}
          onSubmit={handleSubmitApplication}
          onSaveForLater={handleSaveForLater}
        />
      )}
    </div>
  );
}