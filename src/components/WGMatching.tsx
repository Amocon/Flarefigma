import { useState } from 'react';
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
  MoreVertical
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { MeetingsCalendar } from './MeetingsCalendar';

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
    compatibility: 92
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
    compatibility: 87
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
    compatibility: 85
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
    <div className="space-y-4">
      {/* Progress Indicator */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Applicant {currentIndex + 1} of {applicants.length}
        </p>
      </div>

      {/* Swipe Card */}
      <Card className="overflow-hidden rounded-3xl shadow-lg border-border">
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
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

          {/* Additional Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="ghost"
              className="flex-1 rounded-full"
            >
              <MessageCircle size={18} className="mr-2" />
              Chat
            </Button>
            <Button
              variant="ghost"
              className="flex-1 rounded-full"
            >
              <User size={18} className="mr-2" />
              View Profile
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ChatsView({ chats }: { chats: ChatMessage[] }) {
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

  return (
    <div className="space-y-3">
      {chats.map((chat) => (
        <Card 
          key={chat.id} 
          className="p-4 rounded-2xl shadow-sm border-border hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                <img 
                  src={chat.applicantImage} 
                  alt={chat.applicantName}
                  className="w-full h-full object-cover"
                />
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--flare-green)] rounded-full border-2 border-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-1">
                <h4 className="text-[var(--flare-text)] truncate">{chat.applicantName}</h4>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {chat.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {chat.unreadCount > 0 && (
                <Badge className="h-6 min-w-6 px-2 bg-[var(--flare-green)] text-white border-0 rounded-full flex items-center justify-center">
                  {chat.unreadCount}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-background"
              >
                <MoreVertical size={18} />
              </Button>
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