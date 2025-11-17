import { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  X, 
  MapPin, 
  Users, 
  Calendar, 
  Home,
  Filter,
  CalendarCheck,
  MessageCircle,
  User,
  Send,
  Clock,
  CheckCircle2,
  MoreVertical,
  Quote,
  Mail,
  Phone,
  Briefcase,
  ArrowLeft,
  Video,
  CheckCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { MeetingsCalendar } from './MeetingsCalendar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Separator } from './ui/separator';

interface Applicant {
  id: number;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  location: string;
  budget: number;
  moveInDate: string;
  interests: string[];
  image: string;
  distance: string;
  compatibility: number;
  customQuestion: string;
  customAnswer: string;
  email?: string;
  phone?: string;
  approved?: boolean;
}

interface ChatMessage {
  id: number;
  applicantId: number;
  applicantName: string;
  applicantImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Meeting {
  id: number;
  applicantId: number;
  applicantName: string;
  applicantImage: string;
  proposedDate: string;
  proposedTime: string;
  status: 'proposed' | 'confirmed' | 'pending';
  location: string;
  confirmedBy: number;
  totalResidents: number;
}

const mockApplicants: Applicant[] = [
  {
    id: 1,
    name: 'Sarah M.',
    age: 26,
    occupation: 'Software Developer',
    bio: 'Looking for a friendly WG in Kreuzberg. I love cooking, yoga, and movie nights!',
    location: 'Currently in Mitte',
    budget: 550,
    moveInDate: 'Jan 1, 2025',
    interests: ['Cooking', 'Yoga', 'Movies', 'Tech'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    distance: '2.1 km',
    compatibility: 92,
    customQuestion: 'What does community living mean to you?',
    customAnswer: 'For me, community living is about finding the right balance between personal space and shared experiences. I love the idea of coming home to people who are more than just roommates – people you can cook dinner with, have deep conversations with, or simply enjoy a quiet evening alongside. It\'s about mutual respect, open communication, and creating a home environment where everyone feels comfortable and valued.',
    email: 'sarah.m@example.com',
    phone: '+49 157 1234 5678'
  },
  {
    id: 2,
    name: 'Max K.',
    age: 24,
    occupation: 'Graphic Designer',
    bio: 'Creative professional seeking a chill WG. I\'m tidy, social, and love hosting dinner parties.',
    location: 'Currently in Prenzlauer Berg',
    budget: 500,
    moveInDate: 'Dec 15, 2024',
    interests: ['Design', 'Photography', 'Cycling', 'Cooking'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    distance: '3.5 km',
    compatibility: 87,
    customQuestion: 'What does community living mean to you?',
    customAnswer: 'Community living means having people around who inspire and support each other. I believe in creating a welcoming space where creativity flows, whether that\'s through shared meals, spontaneous movie nights, or just being there for one another. I value cleanliness, respect for boundaries, and the kind of friendships that make a house feel like a home.',
    email: 'max.k@example.com',
    phone: '+49 162 9876 5432'
  },
  {
    id: 3,
    name: 'Lisa W.',
    age: 28,
    occupation: 'Marketing Manager',
    bio: 'Professional and friendly. Looking for a long-term WG with great vibes and mutual respect.',
    location: 'Currently in Charlottenburg',
    budget: 600,
    moveInDate: 'Jan 15, 2025',
    interests: ['Running', 'Reading', 'Wine', 'Travel'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    distance: '4.2 km',
    compatibility: 85,
    customQuestion: 'What does community living mean to you?',
    customAnswer: 'To me, community living is about building genuine connections while maintaining independence. I appreciate having flatmates who are considerate, communicative, and enjoy both social gatherings and quiet time. It\'s important to me that we can rely on each other, share responsibilities fairly, and create a positive, drama-free living environment together.',
    email: 'lisa.w@example.com',
    phone: '+49 173 5555 1234'
  }
];

const mockChats: ChatMessage[] = [
  {
    id: 1,
    applicantId: 1,
    applicantName: 'Sarah M.',
    applicantImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    lastMessage: 'Sounds great! When would be a good time to visit?',
    timestamp: '2 min ago',
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 2,
    applicantId: 4,
    applicantName: 'Tom R.',
    applicantImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    lastMessage: 'Thanks for the info about the neighborhood!',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 3,
    applicantId: 2,
    applicantName: 'Max K.',
    applicantImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    lastMessage: 'I\'d love to meet the other flatmates too',
    timestamp: '3 hours ago',
    unreadCount: 1,
    isOnline: true
  }
];

const mockMeetings: Meeting[] = [
  {
    id: 1,
    applicantId: 1,
    applicantName: 'Sarah M.',
    applicantImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    proposedDate: 'Dec 8, 2024',
    proposedTime: '18:00',
    status: 'confirmed',
    location: 'At the WG',
    confirmedBy: 3,
    totalResidents: 3
  },
  {
    id: 2,
    applicantId: 2,
    applicantName: 'Max K.',
    applicantImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    proposedDate: 'Dec 10, 2024',
    proposedTime: '19:30',
    status: 'pending',
    location: 'At the WG',
    confirmedBy: 1,
    totalResidents: 3
  }
];

export function WGMatching() {
  const [activeTab, setActiveTab] = useState('applicants');
  const [applicants, setApplicants] = useState(mockApplicants);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chats, setChats] = useState(mockChats);
  const [meetings, setMeetings] = useState(mockMeetings);

  const handleApprove = () => {
    const currentApplicant = applicants[currentIndex];
    // Add to chats
    const newChat: ChatMessage = {
      id: chats.length + 1,
      applicantId: currentApplicant.id,
      applicantName: currentApplicant.name,
      applicantImage: currentApplicant.image,
      lastMessage: 'You matched! Say hello 👋',
      timestamp: 'Just now',
      unreadCount: 0,
      isOnline: true
    };
    setChats([newChat, ...chats]);
    
    // Move to next applicant
    if (currentIndex < applicants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSkip = () => {
    if (currentIndex < applicants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="pb-6">
      {/* Segmented Control */}
      <div className="sticky top-[72px] bg-white z-10 border-b border-border px-6 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-muted rounded-full p-1">
            <TabsTrigger 
              value="applicants"
              className="rounded-full data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white"
            >
              <User size={16} className="mr-2" />
              Applicants
            </TabsTrigger>
            <TabsTrigger 
              value="chats"
              className="rounded-full data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white relative"
            >
              <MessageCircle size={16} className="mr-2" />
              Chats
              {chats.filter(c => c.unreadCount > 0).length > 0 && (
                <Badge className="ml-2 h-5 min-w-5 px-1.5 bg-white text-[var(--flare-green)] border-0 text-xs">
                  {chats.filter(c => c.unreadCount > 0).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="meetings"
              className="rounded-full data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white"
            >
              <CalendarCheck size={16} className="mr-2" />
              Meetings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        <Tabs value={activeTab} className="w-full">
          {/* Applicants Tab */}
          <TabsContent value="applicants" className="mt-0">
            <ApplicantsView
              applicants={applicants}
              currentIndex={currentIndex}
              onApprove={handleApprove}
              onSkip={handleSkip}
            />
          </TabsContent>

          {/* Chats Tab */}
          <TabsContent value="chats" className="mt-0">
            <ChatsView chats={chats} />
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="mt-0">
            <MeetingsView meetings={meetings} setMeetings={setMeetings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ApplicantsView({ 
  applicants, 
  currentIndex, 
  onApprove, 
  onSkip 
}: { 
  applicants: Applicant[]; 
  currentIndex: number; 
  onApprove: () => void; 
  onSkip: () => void;
}) {
  const [showDetailSheet, setShowDetailSheet] = useState(false);

  if (applicants.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">No more applicants available</p>
        </div>
      </div>
    );
  }

  const currentApplicant = applicants[currentIndex];

  return (
    <>
      <div className="space-y-4">
        {/* Progress Indicator */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Applicant {currentIndex + 1} of {applicants.length}
          </p>
        </div>

        {/* Swipe Card */}
        <Card 
          className="overflow-hidden rounded-3xl shadow-lg border-border cursor-pointer transition-all hover:shadow-xl"
          onClick={() => setShowDetailSheet(true)}
        >
          {/* Image with Compatibility Badge */}
          <div className="relative h-80 bg-muted">
            <img 
              src={currentApplicant.image} 
              alt={currentApplicant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[var(--flare-green)] text-white px-3 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-1">
                <Heart size={16} fill="white" />
                <span className="text-sm">{currentApplicant.compatibility}%</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <h2>{currentApplicant.name}</h2>
                <span className="text-muted-foreground">{currentApplicant.age}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {currentApplicant.occupation}
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} />
                <span className="text-sm">{currentApplicant.location}</span>
                <span className="text-sm">• {currentApplicant.distance}</span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-sm text-[var(--flare-text)]">{currentApplicant.bio}</p>
            </div>

            {/* Custom Question Answer - Quote */}
            <div className="bg-[var(--flare-green-light)] border-l-4 border-[var(--flare-green)] rounded-r-2xl p-4">
              <div className="flex gap-3">
                <Quote size={20} className="text-[var(--flare-green)] flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-xs text-[var(--flare-green-dark)]">{currentApplicant.customQuestion}</p>
                  <p className="text-sm text-[var(--flare-text)] leading-relaxed italic">
                    {currentApplicant.customAnswer.length > 150 
                      ? `${currentApplicant.customAnswer.substring(0, 150)}...` 
                      : currentApplicant.customAnswer}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Budget</p>
                <p className="text-[var(--flare-green-dark)]">€{currentApplicant.budget}/mo</p>
              </div>
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Move-in Date</p>
                <p className="text-[var(--flare-text)] text-sm">{currentApplicant.moveInDate}</p>
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="text-sm mb-2 text-muted-foreground">Interests</p>
              <div className="flex flex-wrap gap-2">
                {currentApplicant.interests.map((interest) => (
                  <Badge 
                    key={interest}
                    variant="secondary"
                    className="rounded-full bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onSkip();
            }}
            className="flex-1 rounded-full border-2 hover:bg-muted h-14"
          >
            <X size={24} className="mr-2" />
            Skip
          </Button>
          <Button
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onApprove();
            }}
            className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] h-14"
          >
            <Heart size={24} className="mr-2" />
            Approve
          </Button>
        </div>
      </div>

      {/* Applicant Detail Sheet */}
      <ApplicantDetailSheet
        applicant={currentApplicant}
        isOpen={showDetailSheet}
        onClose={() => setShowDetailSheet(false)}
        onApprove={() => {
          setShowDetailSheet(false);
          onApprove();
        }}
        onSkip={() => {
          setShowDetailSheet(false);
          onSkip();
        }}
      />
    </>
  );
}

function ChatsView({ chats }: { chats: ChatMessage[] }) {
  const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null);

  if (chats.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No chats yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Approve applicants to start chatting
          </p>
        </div>
      </div>
    );
  }

  if (selectedChat) {
    return (
      <ResidentGroupChat 
        chat={selectedChat} 
        onBack={() => setSelectedChat(null)} 
      />
    );
  }

  return (
    <div className="space-y-3">
      {chats.map((chat) => (
        <Card 
          key={chat.id} 
          className="rounded-2xl shadow-sm border-border hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex gap-4 p-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex-shrink-0 relative">
              <img 
                src={chat.applicantImage} 
                alt={chat.applicantName}
                className="w-full h-full object-cover"
              />
              {chat.unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--flare-green)] rounded-full flex items-center justify-center text-white text-xs">
                  {chat.unreadCount}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-[var(--flare-text)] truncate">{chat.applicantName}</h4>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {chat.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Group chat with all residents
              </p>
              <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-[var(--flare-text)]' : 'text-muted-foreground'}`}>
                {chat.lastMessage}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MeetingsView({ 
  meetings, 
  setMeetings 
}: { 
  meetings: Meeting[]; 
  setMeetings: (meetings: Meeting[]) => void;
}) {
  const handleConfirm = (meetingId: number) => {
    const updatedMeetings = meetings.map(m => {
      if (m.id === meetingId) {
        return {
          ...m,
          status: 'confirmed' as const,
          confirmedBy: m.totalResidents
        };
      }
      return m;
    });
    setMeetings(updatedMeetings);
  };

  const handleProposeMeeting = (timeSlot: any) => {
    // Create a new meeting from the time slot
    const newMeeting: Meeting = {
      id: meetings.length + 1,
      applicantId: 99, // Placeholder
      applicantName: 'New Applicant',
      applicantImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      proposedDate: `${timeSlot.day}, ${timeSlot.date}`,
      proposedTime: timeSlot.time,
      status: 'proposed',
      location: 'At the WG',
      confirmedBy: 0,
      totalResidents: 3
    };
    setMeetings([...meetings, newMeeting]);
  };

  return (
    <MeetingsCalendar 
      meetings={meetings}
      onConfirm={handleConfirm}
      onProposeMeeting={handleProposeMeeting}
    />
  );
}

function ApplicantDetailSheet({ 
  applicant, 
  isOpen, 
  onClose, 
  onApprove, 
  onSkip 
}: { 
  applicant: Applicant; 
  isOpen: boolean; 
  onClose: () => void; 
  onApprove: () => void; 
  onSkip: () => void;
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-border">
          <SheetTitle>Applicant Profile</SheetTitle>
        </div>

        <div className="p-6 space-y-6">
          {/* Image with Compatibility Badge */}
          <div className="relative h-96 bg-muted rounded-3xl overflow-hidden">
            <img 
              src={applicant.image} 
              alt={applicant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[var(--flare-green)] text-white px-3 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-1">
                <Heart size={16} fill="white" />
                <span className="text-sm">{applicant.compatibility}% Match</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <h2>{applicant.name}</h2>
              <span className="text-muted-foreground">{applicant.age}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Briefcase size={16} />
              <span className="text-sm">{applicant.occupation}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={16} />
              <span className="text-sm">{applicant.location}</span>
              <span className="text-sm">• {applicant.distance}</span>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div>
            <h3 className="mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{applicant.bio}</p>
          </div>

          {/* Custom Question Answer - Full Quote */}
          <div>
            <h3 className="mb-3">Application Question</h3>
            <div className="bg-[var(--flare-green-light)] border-l-4 border-[var(--flare-green)] rounded-r-2xl p-4">
              <div className="flex gap-3">
                <Quote size={20} className="text-[var(--flare-green)] flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-xs text-[var(--flare-green-dark)]">{applicant.customQuestion}</p>
                  <p className="text-sm text-[var(--flare-text)] leading-relaxed italic">
                    {applicant.customAnswer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Key Details */}
          <div>
            <h3 className="mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Budget</p>
                <p className="text-[var(--flare-green-dark)]">€{applicant.budget}/mo</p>
              </div>
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Move-in Date</p>
                <p className="text-[var(--flare-text)] text-sm">{applicant.moveInDate}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {applicant.email && (
            <div>
              <h3 className="mb-3">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Mail size={18} className="text-[var(--flare-green)]" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm text-[var(--flare-text)]">{applicant.email}</p>
                  </div>
                </div>
                {applicant.phone && (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <Phone size={18} className="text-[var(--flare-green)]" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm text-[var(--flare-text)]">{applicant.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interests */}
          <div>
            <h3 className="mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.interests.map((interest) => (
                <Badge 
                  key={interest}
                  variant="secondary"
                  className="rounded-full bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="sticky bottom-0 bg-white border-t border-border p-6 space-y-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={onSkip}
              className="flex-1 rounded-full border-2 hover:bg-muted h-14"
            >
              <X size={24} className="mr-2" />
              Skip
            </Button>
            <Button
              size="lg"
              onClick={onApprove}
              className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] h-14"
            >
              <Heart size={24} className="mr-2" />
              Approve
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Resident Group Chat Component
interface GroupChatMessage {
  id: number;
  sender: 'applicant' | 'resident';
  senderName: string;
  senderImage?: string;
  content: string;
  timestamp: string;
  type?: 'text' | 'meeting-proposal';
  meetingData?: MeetingProposalData;
}

interface MeetingProposalData {
  id: number;
  date: string;
  time: string;
  duration: string;
  format: 'face-to-face' | 'video';
  location?: string;
  status: 'pending' | 'confirmed' | 'declined';
  proposedBy: string;
}

interface TimeSlot {
  id: number;
  date: string;
  time: string;
  dayOfWeek: string;
  availableResidents: string[];
  totalResidents: number;
}

function ResidentGroupChat({ 
  chat, 
  onBack 
}: { 
  chat: ChatMessage; 
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<GroupChatMessage[]>([
    {
      id: 1,
      sender: 'resident',
      senderName: 'Anna K.',
      senderImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
      content: 'Hey! Thanks for your application. We loved your answer about community living! 😊',
      timestamp: '14:30',
      type: 'text'
    },
    {
      id: 2,
      sender: 'applicant',
      senderName: chat.applicantName,
      senderImage: chat.applicantImage,
      content: 'Thank you so much! I\'m really excited about the possibility of joining your WG.',
      timestamp: '15:45',
      type: 'text'
    },
    {
      id: 3,
      sender: 'resident',
      senderName: 'Max R.',
      senderImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      content: 'We\'d love to meet you! Are you free this weekend for a visit?',
      timestamp: '16:20',
      type: 'text'
    },
    {
      id: 4,
      sender: 'applicant',
      senderName: chat.applicantName,
      senderImage: chat.applicantImage,
      content: 'Yes! Saturday or Sunday would work great for me. What time works best for you all?',
      timestamp: '16:45',
      type: 'text'
    },
    {
      id: 5,
      sender: 'resident',
      senderName: 'You',
      content: 'Meeting proposal',
      timestamp: '17:10',
      type: 'meeting-proposal',
      meetingData: {
        id: 1,
        date: '2024-12-08',
        time: '18:00',
        duration: '1 hour',
        format: 'face-to-face',
        location: 'At the WG - Skalitzer Str. 45, Kreuzberg',
        status: 'pending',
        proposedBy: 'You'
      }
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock time slots for automatic scheduling
  const availableSlots: TimeSlot[] = [
    {
      id: 1,
      date: '2024-12-08',
      time: '18:00 - 19:00',
      dayOfWeek: 'Sunday',
      availableResidents: ['Anna', 'Max', 'You'],
      totalResidents: 3
    },
    {
      id: 2,
      date: '2024-12-10',
      time: '19:30 - 20:30',
      dayOfWeek: 'Tuesday',
      availableResidents: ['Anna', 'You'],
      totalResidents: 3
    },
    {
      id: 3,
      date: '2024-12-14',
      time: '17:00 - 18:00',
      dayOfWeek: 'Saturday',
      availableResidents: ['Anna', 'Max', 'You'],
      totalResidents: 3
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: GroupChatMessage = {
      id: messages.length + 1,
      sender: 'resident',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    const meetingMessage: GroupChatMessage = {
      id: messages.length + 1,
      sender: 'resident',
      senderName: 'You',
      content: 'Meeting proposal',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      type: 'meeting-proposal',
      meetingData: {
        id: messages.length + 1,
        date: slot.date,
        time: slot.time.split(' - ')[0],
        duration: '1 hour',
        format: 'face-to-face',
        location: 'At the WG - Skalitzer Str. 45, Kreuzberg',
        status: 'pending',
        proposedBy: 'You'
      }
    };

    setMessages([...messages, meetingMessage]);
    setShowScheduleModal(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-200px)]">
        {/* Chat Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <img 
                src={chat.applicantImage} 
                alt={chat.applicantName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-[var(--flare-text)]">{chat.applicantName}</h4>
              <p className="text-xs text-muted-foreground">Group chat with all residents</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <MoreVertical size={20} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'text' ? (
                <div
                  className={`flex gap-3 ${
                    message.sender === 'resident' && message.senderName === 'You'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  {/* Avatar for others' messages */}
                  {!(message.sender === 'resident' && message.senderName === 'You') && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      {message.senderImage ? (
                        <img 
                          src={message.senderImage} 
                          alt={message.senderName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--flare-green)]/10 text-[var(--flare-green)]">
                          {message.senderName.charAt(0)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`flex flex-col max-w-[75%] ${
                      message.sender === 'resident' && message.senderName === 'You'
                        ? 'items-end'
                        : 'items-start'
                    }`}
                  >
                    {/* Sender name for others */}
                    {!(message.sender === 'resident' && message.senderName === 'You') && (
                      <span className={`text-xs mb-1 ${
                        message.sender === 'applicant'
                          ? 'text-[var(--flare-peach)] font-medium'
                          : 'text-muted-foreground'
                      }`}>
                        {message.senderName}
                      </span>
                    )}

                    {/* Message content */}
                    <div
                      className={`rounded-2xl px-4 py-2.5 ${
                        message.sender === 'applicant'
                          ? 'bg-[var(--flare-peach)] text-[var(--flare-text)] border-2 border-[var(--flare-peach)] shadow-sm'
                          : message.sender === 'resident' && message.senderName === 'You'
                          ? 'bg-[var(--flare-green)] text-white'
                          : 'bg-[var(--flare-green-light)] text-[var(--flare-text)]'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-muted-foreground mt-1">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ) : (
                <ResidentMeetingCard
                  meeting={message.meetingData!}
                  sender={message.sender}
                  senderName={message.senderName}
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Schedule Meeting Button */}
        <div className="py-2">
          <Button
            onClick={() => setShowScheduleModal(true)}
            variant="outline"
            className="w-full rounded-full border-2 border-[var(--flare-green)] text-[var(--flare-green)] hover:bg-[var(--flare-green)]/10"
          >
            <Calendar size={18} className="mr-2" />
            Propose Meeting Time
          </Button>
        </div>

        {/* Message Input */}
        <div className="pt-4 border-t border-border">
          <div className="flex gap-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-full border-2 px-4 h-12"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className="rounded-full h-12 w-12 bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        slots={availableSlots}
        onSelectSlot={handleSelectSlot}
        applicantName={chat.applicantName}
      />
    </>
  );
}

// Resident Meeting Card Component
function ResidentMeetingCard({ 
  meeting, 
  sender, 
  senderName 
}: { 
  meeting: MeetingProposalData; 
  sender: 'applicant' | 'resident'; 
  senderName: string;
}) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };

  const isConfirmed = meeting.status === 'confirmed';
  const isPending = meeting.status === 'pending';

  return (
    <div className={`flex ${sender === 'resident' && senderName === 'You' ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[85%]">
        {!(sender === 'resident' && senderName === 'You') && (
          <p className="text-xs text-muted-foreground mb-1 ml-2">
            {senderName}
          </p>
        )}
        <Card className="rounded-2xl overflow-hidden border-2 border-[var(--flare-green)]/30 bg-white">
          {/* Header */}
          <div className="bg-[var(--flare-green)]/10 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--flare-green)]/20 flex items-center justify-center">
                <Calendar size={16} className="text-[var(--flare-green-dark)]" />
              </div>
              <span className="text-sm text-[var(--flare-text)]">Meeting Proposal</span>
            </div>
            {isConfirmed && (
              <Badge className="bg-[var(--flare-green)] text-white border-0 rounded-full">
                <CheckCircle size={12} className="mr-1" />
                Confirmed
              </Badge>
            )}
            {isPending && (
              <Badge className="bg-[var(--flare-peach)] text-[var(--flare-text)] border-0 rounded-full">
                <Clock size={12} className="mr-1" />
                Pending
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--flare-green)]/10 flex items-center justify-center flex-shrink-0">
                <Calendar size={18} className="text-[var(--flare-green)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--flare-text)]">{formatDate(meeting.date)}</p>
                <p className="text-xs text-muted-foreground">
                  {meeting.time} • {meeting.duration}
                </p>
              </div>
            </div>

            {/* Format & Location */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--flare-green)]/10 flex items-center justify-center flex-shrink-0">
                {meeting.format === 'video' ? (
                  <Video size={18} className="text-[var(--flare-green)]" />
                ) : (
                  <MapPin size={18} className="text-[var(--flare-green)]" />
                )}
              </div>
              <div>
                <p className="text-sm text-[var(--flare-text)]">
                  {meeting.format === 'video' ? 'Video Call' : 'Face-to-Face'}
                </p>
                {meeting.location && (
                  <p className="text-xs text-muted-foreground">{meeting.location}</p>
                )}
              </div>
            </div>

            {/* Participants */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--flare-green)]/10 flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-[var(--flare-green)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--flare-text)]">All residents will attend</p>
                <p className="text-xs text-muted-foreground">Anna, Max, Lisa</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Schedule Meeting Modal Component
function ScheduleMeetingModal({ 
  isOpen, 
  onClose, 
  slots, 
  onSelectSlot, 
  applicantName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  slots: TimeSlot[]; 
  onSelectSlot: (slot: TimeSlot) => void; 
  applicantName: string;
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-border">
          <SheetTitle>Schedule Meeting with {applicantName}</SheetTitle>
        </div>

        <div className="p-6 space-y-6">
          {/* Time Slots */}
          <div className="space-y-3">
            {slots.map(slot => (
              <Card 
                key={slot.id} 
                className="p-4 rounded-2xl shadow-sm border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onSelectSlot(slot)}
              >
                <div className="flex items-center gap-4">
                  {/* Day and Time */}
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">{slot.dayOfWeek}</p>
                    <p className="text-sm text-[var(--flare-text)]">{slot.time}</p>
                  </div>

                  {/* Available Residents */}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Available Residents:</p>
                    <p className="text-sm text-[var(--flare-text)]">
                      {slot.availableResidents.join(', ')}
                    </p>
                  </div>

                  {/* Total Residents */}
                  <div className="text-sm text-muted-foreground">
                    Total: {slot.totalResidents}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="sticky bottom-0 bg-white border-t border-border p-6 space-y-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="flex-1 rounded-full border-2 hover:bg-muted h-14"
          >
            <X size={24} className="mr-2" />
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}