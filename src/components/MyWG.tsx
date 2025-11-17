import { useState } from 'react';
import { Home, Layout, Users, Edit, Calendar, LogOut, ArrowRightCircle, ZoomIn, X, Mail, Phone, MapPin, Briefcase, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface Room {
  id: string;
  name: string;
  size: number;
  occupant: {
    id: string;
    name: string;
    avatar: string;
  } | null;
  rent: number;
}

interface WGMember {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  tags: string[];
  email: string;
  phone: string;
  profession: string;
  moveInDate: string;
  isAdmin: boolean;
}

interface WGData {
  id: string;
  name: string;
  address: string;
  status: 'Active' | 'Searching' | 'Full';
  floorPlanImage: string;
  rooms: Room[];
  members: WGMember[];
  currentUserId: string;
  isCurrentUserAdmin: boolean;
}

interface MyWGProps {
  onNavigate?: (view: string) => void;
}

// Mock data
const mockWGData: WGData = {
  id: 'wg-1',
  name: 'Sonnige 4er-WG',
  address: 'Schönhauser Allee 142, 10437 Berlin',
  status: 'Searching',
  floorPlanImage: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&h=600&fit=crop',
  rooms: [
    {
      id: 'room-1',
      name: 'Room 1',
      size: 16,
      occupant: {
        id: 'user-1',
        name: 'Sophie Meyer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie'
      },
      rent: 420
    },
    {
      id: 'room-2',
      name: 'Room 2',
      size: 14,
      occupant: {
        id: 'user-2',
        name: 'Max Schmidt',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max'
      },
      rent: 380
    },
    {
      id: 'room-3',
      name: 'Room 3',
      size: 18,
      occupant: {
        id: 'user-3',
        name: 'Laura Klein',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura'
      },
      rent: 450
    },
    {
      id: 'room-4',
      name: 'Room 4',
      size: 15,
      occupant: null,
      rent: 400
    }
  ],
  members: [
    {
      id: 'user-1',
      name: 'Sophie Meyer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
      bio: 'Medical student and yoga enthusiast. Love cooking for the WG and hosting movie nights!',
      tags: ['Medicine', 'Yoga', 'Cooking', 'Movies'],
      email: 'sophie.m@example.com',
      phone: '+49 176 1234 5678',
      profession: 'Medical Student',
      moveInDate: 'Jan 2023',
      isAdmin: true
    },
    {
      id: 'user-2',
      name: 'Max Schmidt',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
      bio: 'Software engineer working remotely. Guitar player and coffee nerd.',
      tags: ['Tech', 'Guitar', 'Coffee', 'Gaming'],
      email: 'max.schmidt@example.com',
      phone: '+49 176 2345 6789',
      profession: 'Software Engineer',
      moveInDate: 'Mar 2023',
      isAdmin: false
    },
    {
      id: 'user-3',
      name: 'Laura Klein',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      bio: 'Architecture student with a passion for sustainable living and urban gardening.',
      tags: ['Architecture', 'Gardening', 'Sustainability', 'Art'],
      email: 'laura.klein@example.com',
      phone: '+49 176 3456 7890',
      profession: 'Architecture Student',
      moveInDate: 'Sep 2022',
      isAdmin: false
    }
  ],
  currentUserId: 'user-2',
  isCurrentUserAdmin: false
};

export function MyWG({ onNavigate }: MyWGProps) {
  const [wgData] = useState<WGData>(mockWGData);
  const [activeTab, setActiveTab] = useState<'overview' | 'members'>('overview');
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WGMember | null>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveMessage, setLeaveMessage] = useState('');
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const handleLeaveWG = () => {
    setShowLeaveModal(false);
    setShowLeaveConfirmation(true);
  };

  const handleStartSearch = () => {
    setShowLeaveConfirmation(false);
    onNavigate?.('matching');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[var(--flare-green)] text-white';
      case 'Searching':
        return 'bg-[var(--flare-highlight)] text-[var(--flare-brown)]';
      case 'Full':
        return 'bg-[var(--flare-green-dark)] text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--flare-bg-neutral)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[var(--flare-highlight)]/30">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--flare-brown)]/10 flex items-center justify-center">
                <Home size={24} className="text-[var(--flare-brown)]" />
              </div>
              <div>
                <h1 className="text-[var(--flare-text)]">{wgData.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <MapPin size={14} />
                  <span>{wgData.address}</span>
                </div>
              </div>
            </div>
            {wgData.isCurrentUserAdmin && (
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-[var(--flare-highlight)]/20"
              >
                <Edit size={18} className="text-[var(--flare-brown)]" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(wgData.status)} border-0 rounded-full`}>
              {wgData.status}
            </Badge>
            {wgData.status === 'Searching' && (
              <span className="text-xs text-muted-foreground">
                1 room available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'overview' | 'members')}>
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-2xl p-1 h-auto">
            <TabsTrigger 
              value="overview" 
              className="rounded-xl data-[state=active]:bg-[var(--flare-brown)] data-[state=active]:text-white"
            >
              <Layout size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="members"
              className="rounded-xl data-[state=active]:bg-[var(--flare-brown)] data-[state=active]:text-white"
            >
              <Users size={16} className="mr-2" />
              Members
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* Floor Plan Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--flare-highlight)]/30">
              <div className="relative">
                <img 
                  src={wgData.floorPlanImage} 
                  alt="Floor Plan"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <h3 className="text-white">Floor Plan</h3>
                  <Button
                    size="sm"
                    onClick={() => setShowFloorPlanModal(true)}
                    className="rounded-full bg-white/90 hover:bg-white text-[var(--flare-brown)] h-8"
                  >
                    <ZoomIn size={14} className="mr-1" />
                    View Details
                  </Button>
                </div>
              </div>

              {/* Rooms List */}
              <div className="p-4">
                <h4 className="text-sm text-muted-foreground mb-3">Rooms</h4>
                <div className="space-y-2">
                  {wgData.rooms.map((room, index) => (
                    <div key={room.id}>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          {room.occupant ? (
                            <Avatar className="w-10 h-10 border-2 border-[var(--flare-highlight)]">
                              <AvatarImage src={room.occupant.avatar} />
                              <AvatarFallback>{room.occupant.name[0]}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <Home size={18} className="text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm">{room.name} – {room.size} m²</p>
                            <p className="text-xs text-muted-foreground">
                              {room.occupant ? room.occupant.name : 'Available'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[var(--flare-brown)]">€{room.rent}</p>
                          <p className="text-xs text-muted-foreground">/month</p>
                        </div>
                      </div>
                      {index < wgData.rooms.length - 1 && (
                        <Separator className="bg-[var(--flare-highlight)]/20" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Rent Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--flare-highlight)]/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Monthly Rent</p>
                  <p className="text-xs text-muted-foreground mt-0.5">All rooms combined</p>
                </div>
                <p className="text-[var(--flare-brown)]">
                  €{wgData.rooms.reduce((sum, room) => sum + room.rent, 0)}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-4 space-y-4">
            {wgData.members.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--flare-highlight)]/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-14 h-14 border-2 border-[var(--flare-highlight)]">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-[var(--flare-text)]">{member.name}</h4>
                        <p className="text-xs text-muted-foreground">{member.profession}</p>
                      </div>
                      {member.isAdmin && (
                        <Badge className="bg-[var(--flare-brown)]/10 text-[var(--flare-brown)] border-0 rounded-full text-xs">
                          Admin
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {member.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary"
                      className="bg-[var(--flare-highlight)]/30 text-[var(--flare-text)] border-0 rounded-full text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setSelectedMember(member)}
                  className="w-full rounded-full border-2 border-[var(--flare-green)] text-[var(--flare-green-dark)] hover:bg-[var(--flare-green)]/10 h-10"
                >
                  View Profile
                  <ArrowRightCircle size={16} className="ml-2" />
                </Button>
              </div>
            ))}

            {/* Admin Actions */}
            {wgData.isCurrentUserAdmin && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--flare-highlight)]/30">
                <Button
                  className="w-full rounded-full bg-[var(--flare-brown)] hover:bg-[#6d4a2d] text-white h-12"
                  onClick={() => onNavigate?.('matching')}
                >
                  <Users size={18} className="mr-2" />
                  Invite New Resident
                </Button>
              </div>
            )}

            {/* Leave WG */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--flare-highlight)]/30">
              <div className="text-center mb-3">
                <p className="text-sm text-muted-foreground">
                  Planning to move out?
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowLeaveModal(true)}
                className="w-full rounded-full border-2 border-destructive text-destructive hover:bg-destructive/10 h-12"
              >
                <LogOut size={18} className="mr-2" />
                Leave WG
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floor Plan Detail Modal */}
      <Dialog open={showFloorPlanModal} onOpenChange={setShowFloorPlanModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden rounded-3xl">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-[var(--flare-text)] flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[var(--flare-brown)]/10 flex items-center justify-center">
                <Layout size={18} className="text-[var(--flare-brown)]" />
              </div>
              Floor Plan Details
            </DialogTitle>
            <DialogDescription>
              {wgData.name} – Interactive floor plan
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--flare-highlight)]/30">
              <img 
                src={wgData.floorPlanImage} 
                alt="Floor Plan"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {wgData.rooms.map((room) => (
                <div 
                  key={room.id}
                  className="bg-[var(--flare-bg-neutral)] rounded-xl p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{room.name}</p>
                      <p className="text-xs text-muted-foreground">{room.size} m²</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${room.occupant ? 'bg-[var(--flare-green)]' : 'bg-muted'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Member Profile Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-md rounded-3xl">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-2 border-[var(--flare-highlight)]">
                    <AvatarImage src={selectedMember.avatar} />
                    <AvatarFallback>{selectedMember.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-[var(--flare-text)]">
                      {selectedMember.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">{selectedMember.profession}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                {/* Bio */}
                <div>
                  <Label className="text-xs text-muted-foreground">About</Label>
                  <p className="text-sm mt-1">{selectedMember.bio}</p>
                </div>

                {/* Tags */}
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

                <Separator className="bg-[var(--flare-highlight)]/30" />

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[var(--flare-highlight)]/30 flex items-center justify-center">
                      <Mail size={16} className="text-[var(--flare-brown)]" />
                    </div>
                    <span>{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[var(--flare-highlight)]/30 flex items-center justify-center">
                      <Phone size={16} className="text-[var(--flare-brown)]" />
                    </div>
                    <span>{selectedMember.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[var(--flare-highlight)]/30 flex items-center justify-center">
                      <Calendar size={16} className="text-[var(--flare-brown)]" />
                    </div>
                    <span>Moved in {selectedMember.moveInDate}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Leave WG Modal */}
      <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--flare-text)] flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                <LogOut size={18} className="text-destructive" />
              </div>
              Leave WG
            </DialogTitle>
            <DialogDescription>
              Let your flatmates know when you're planning to move out
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-sm mb-2 block">Planned move-out date</Label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--flare-highlight)]/30 bg-[var(--flare-bg-neutral)] focus:outline-none focus:ring-2 focus:ring-[var(--flare-brown)] text-sm"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm mb-2 block">Message to WG (optional)</Label>
              <Textarea
                placeholder="Let your flatmates know why you're leaving or share any important details..."
                value={leaveMessage}
                onChange={(e) => setLeaveMessage(e.target.value)}
                className="min-h-24 rounded-xl border-[var(--flare-highlight)]/30 bg-[var(--flare-bg-neutral)] resize-none focus:ring-[var(--flare-brown)]"
              />
            </div>

            <div className="bg-[var(--flare-highlight)]/20 rounded-xl p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your WG will be notified of your departure. This helps them start looking for a new flatmate in time.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 rounded-full border-2 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLeaveWG}
                disabled={!leaveDate}
                className="flex-1 rounded-full bg-destructive hover:bg-destructive/90 text-white h-12 disabled:opacity-50"
              >
                <LogOut size={18} className="mr-2" />
                Confirm Departure
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Confirmation & Next Steps Modal */}
      <Dialog open={showLeaveConfirmation} onOpenChange={setShowLeaveConfirmation}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <div className="w-16 h-16 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-[var(--flare-green)]" />
            </div>
            <DialogTitle className="text-[var(--flare-text)] text-center">
              Departure Confirmed
            </DialogTitle>
            <DialogDescription className="text-center">
              Your WG has been notified about your planned move-out on {leaveDate}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-[var(--flare-bg-neutral)] rounded-2xl p-4 text-center">
              <p className="text-sm text-[var(--flare-text)] mb-4">
                Do you want to start searching for a new WG?
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleStartSearch}
                  className="w-full rounded-full bg-[var(--flare-brown)] hover:bg-[#6d4a2d] text-white h-12"
                >
                  <ArrowRightCircle size={18} className="mr-2" />
                  Start Search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowLeaveConfirmation(false)}
                  className="w-full rounded-full border-2 h-12"
                >
                  Later
                </Button>
              </div>
            </div>

            <div className="bg-[var(--flare-highlight)]/20 rounded-xl p-3">
              <p className="text-xs text-muted-foreground leading-relaxed text-center">
                You can switch to Applicant mode anytime to browse available WGs in your area
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
