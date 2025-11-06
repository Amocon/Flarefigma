import { Heart, MapPin, Home, Calendar, Euro, Users, TrendingUp, Star, MessageCircle, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ApplicantDashboardProps {
  onNavigate?: (screen: string) => void;
}

export function ApplicantDashboard({ onNavigate }: ApplicantDashboardProps = {}) {
  // Mock data for applicant
  const applicantData = {
    name: 'Alex M.',
    activeSearches: 5,
    savedWGs: 3,
    upcomingViewings: 1,
    matches: 2
  };

  const savedWGs = [
    {
      id: 1,
      name: 'Kreuzberg Dreamers',
      location: 'Kreuzberg, Berlin',
      rent: 550,
      availableFrom: 'Jan 1, 2025',
      roommates: 3,
      totalRooms: 4,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      matchScore: 92,
      status: 'matched'
    },
    {
      id: 2,
      name: 'Mitte Modern Living',
      location: 'Mitte, Berlin',
      rent: 600,
      availableFrom: 'Dec 15, 2024',
      roommates: 2,
      totalRooms: 3,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      matchScore: 87,
      status: 'pending'
    }
  ];

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Welcome back, {applicantData.name}!</h1>
        <p className="text-muted-foreground">Find your perfect WG match</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 rounded-2xl shadow-sm border-border bg-gradient-to-br from-white to-[var(--flare-green)]/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
              <Heart size={20} className="text-[var(--flare-green)]" />
            </div>
            <div>
              <p className="text-2xl text-[var(--flare-text)]">{applicantData.matches}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Matches</p>
        </Card>

        <Card className="p-4 rounded-2xl shadow-sm border-border bg-gradient-to-br from-white to-[var(--flare-brown)]/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--flare-brown)]/10 flex items-center justify-center">
              <Calendar size={20} className="text-[var(--flare-brown)]" />
            </div>
            <div>
              <p className="text-2xl text-[var(--flare-text)]">{applicantData.upcomingViewings}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Viewings</p>
        </Card>

        <Card className="p-4 rounded-2xl shadow-sm border-border bg-gradient-to-br from-white to-[var(--flare-green-dark)]/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--flare-green-dark)]/10 flex items-center justify-center">
              <Star size={20} className="text-[var(--flare-green-dark)]" />
            </div>
            <div>
              <p className="text-2xl text-[var(--flare-text)]">{applicantData.savedWGs}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Saved WGs</p>
        </Card>

        <Card className="p-4 rounded-2xl shadow-sm border-border bg-gradient-to-br from-white to-[var(--flare-highlight)]/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--flare-highlight)]/20 flex items-center justify-center">
              <TrendingUp size={20} className="text-[var(--flare-brown)]" />
            </div>
            <div>
              <p className="text-2xl text-[var(--flare-text)]">{applicantData.activeSearches}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Active Searches</p>
        </Card>
      </div>

      {/* CTA Card */}
      <Card className="p-6 rounded-3xl shadow-lg border-border bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Home size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-white">Start Swiping</h3>
            <p className="text-sm text-white/90 mb-4">
              Discover WGs that match your preferences and lifestyle
            </p>
            <Button 
              className="rounded-full bg-white text-[var(--flare-green)] hover:bg-white/90"
            >
              Browse WGs
            </Button>
          </div>
        </div>
      </Card>

      {/* Saved WGs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[var(--flare-text)]">Saved WGs</h3>
          <Button variant="ghost" size="sm" className="rounded-full text-[var(--flare-green)]">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {savedWGs.map((wg) => (
            <Card key={wg.id} className="overflow-hidden rounded-2xl shadow-sm border-border hover:shadow-md transition-shadow">
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
                  <img 
                    src={wg.image} 
                    alt={wg.name}
                    className="w-full h-full object-cover"
                  />
                  {wg.status === 'matched' && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--flare-green)] flex items-center justify-center">
                      <Heart size={14} fill="white" className="text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-[var(--flare-text)] mb-1">{wg.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin size={14} />
                        <span className="truncate">{wg.location}</span>
                      </div>
                    </div>
                    <Badge className="ml-2 bg-[var(--flare-green)]/20 text-[var(--flare-green-dark)] border-0 rounded-full flex-shrink-0">
                      {wg.matchScore}% Match
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Euro size={12} />
                      <span>€{wg.rent}/mo</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{wg.roommates}/{wg.totalRooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{wg.availableFrom}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {wg.status === 'matched' && (
                    <Button 
                      size="sm" 
                      className="rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] h-8 text-xs"
                    >
                      <MessageCircle size={14} className="mr-1" />
                      Message
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips Card */}
      <Card className="p-5 rounded-2xl shadow-sm border-border bg-[var(--flare-highlight)]/10 border-[var(--flare-highlight)]/20">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--flare-brown)]/10 flex items-center justify-center flex-shrink-0">
            <Star size={20} className="text-[var(--flare-brown)]" />
          </div>
          <div>
            <h4 className="text-[var(--flare-text)] mb-1">Profile Tips</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Complete your profile to increase your match rate by up to 60%
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-2 border-[var(--flare-brown)] text-[var(--flare-brown)] hover:bg-[var(--flare-brown)]/10"
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Upcoming Viewing */}
      {applicantData.upcomingViewings > 0 && (
        <div>
          <h3 className="mb-3 text-[var(--flare-text)]">Upcoming Viewing</h3>
          <Card className="p-5 rounded-2xl shadow-sm border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center flex-shrink-0">
                <Calendar size={24} className="text-[var(--flare-green)]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[var(--flare-text)] mb-1">Kreuzberg Dreamers</h4>
                <p className="text-sm text-muted-foreground mb-1">Tomorrow at 18:00</p>
                <p className="text-sm text-muted-foreground">Kreuzberg, Berlin</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full border-2"
              >
                Details
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}