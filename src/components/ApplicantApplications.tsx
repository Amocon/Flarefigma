import { useState } from 'react';
import { MessageCircle, Calendar, Check, X, MapPin, Users, Euro, Clock, Home } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { ChatScreen } from './ChatScreen';

type TabValue = 'applications' | 'chats' | 'meetings';

interface Application {
  id: number;
  wgId: number;
  wgName: string;
  location: string;
  district: string;
  image: string;
  status: 'pending' | 'invited' | 'declined';
  appliedDate: string;
  rent: number;
  roommates: number;
  totalRooms: number;
  residents?: string[];
}

interface Chat {
  id: number;
  wgId: number;
  wgName: string;
  location: string;
  image: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  residents: string[];
}

interface Meeting {
  id: number;
  wgId: number;
  wgName: string;
  location: string;
  address: string;
  image: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  type: 'viewing' | 'interview';
}

export function ApplicantApplications() {
  const [activeTab, setActiveTab] = useState<TabValue>('applications');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      wgId: 1,
      wgName: 'Kreuzberg Dreamers',
      location: 'Kreuzberg, Berlin',
      district: 'Kreuzberg',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      status: 'invited',
      appliedDate: '3 days ago',
      rent: 550,
      roommates: 3,
      totalRooms: 4
    },
    {
      id: 2,
      wgId: 2,
      wgName: 'Mitte Modern Living',
      location: 'Mitte, Berlin',
      district: 'Mitte',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      status: 'pending',
      appliedDate: '1 day ago',
      rent: 600,
      roommates: 2,
      totalRooms: 3
    },
    {
      id: 3,
      wgId: 3,
      wgName: 'Prenzlauer Berg Family',
      location: 'Prenzlauer Berg, Berlin',
      district: 'Prenzlauer Berg',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80',
      status: 'declined',
      appliedDate: '5 days ago',
      rent: 620,
      roommates: 2,
      totalRooms: 3
    }
  ]);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      wgId: 1,
      wgName: 'Kreuzberg Dreamers',
      location: 'Kreuzberg, Berlin',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      lastMessage: 'Great! Looking forward to meeting you tomorrow at 6pm.',
      lastMessageTime: '2h ago',
      unreadCount: 2,
      residents: ['Anna', 'Max', 'Lisa']
    },
    {
      id: 2,
      wgId: 4,
      wgName: 'Friedrichshain Artists',
      location: 'Friedrichshain, Berlin',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      lastMessage: 'Thanks for your application! We would like to know more about you.',
      lastMessageTime: '1d ago',
      unreadCount: 0,
      residents: ['Charlie', 'David']
    }
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      wgId: 1,
      wgName: 'Kreuzberg Dreamers',
      location: 'Kreuzberg, Berlin',
      address: 'Skalitzer Str. 45, 10997 Berlin',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      date: 'Tomorrow',
      time: '18:00',
      status: 'confirmed',
      type: 'viewing'
    },
    {
      id: 2,
      wgId: 2,
      wgName: 'Mitte Modern Living',
      location: 'Mitte, Berlin',
      address: 'Torstraße 88, 10119 Berlin',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      date: 'Nov 10',
      time: '17:30',
      status: 'pending',
      type: 'interview'
    }
  ]);

  const handleConfirmMeeting = (meetingId: number) => {
    setMeetings(prev => prev.map(m => 
      m.id === meetingId ? { ...m, status: 'confirmed' as const } : m
    ));
  };

  const handleCancelMeeting = (meetingId: number) => {
    setMeetings(prev => prev.map(m => 
      m.id === meetingId ? { ...m, status: 'cancelled' as const } : m
    ));
  };

  // If a chat is selected, show the full chat screen
  if (selectedChat) {
    return (
      <ChatScreen
        wgName={selectedChat.wgName}
        wgImage={selectedChat.image}
        residents={selectedChat.residents}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'invited':
        return 'bg-[var(--flare-green)] text-white';
      case 'pending':
        return 'bg-[var(--flare-highlight)] text-[var(--flare-brown)]';
      case 'declined':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'invited':
        return 'Invited';
      case 'pending':
        return 'Pending';
      case 'declined':
        return 'Declined';
    }
  };

  return (
    <div className="pb-6">
      {/* Tabs */}
      <div className="sticky top-[72px] bg-white z-10 border-b border-border px-6 py-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-muted rounded-full p-1">
            <TabsTrigger 
              value="applications"
              className="rounded-full data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white"
            >
              <Home size={16} className="mr-2" />
              Applications
              {applications.filter(a => a.status === 'invited').length > 0 && (
                <Badge className="ml-2 h-5 min-w-5 px-1.5 bg-white text-[var(--flare-green)] border-0 text-xs">
                  {applications.filter(a => a.status === 'invited').length}
                </Badge>
              )}
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
              <Calendar size={16} className="mr-2" />
              Meetings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        <Tabs value={activeTab} className="w-full">
          {/* Applications Tab */}
          <TabsContent value="applications" className="mt-0">
            <ApplicationsView
              applications={applications}
              onSelectApplication={setSelectedApplication}
            />
          </TabsContent>

          {/* Chats Tab */}
          <TabsContent value="chats" className="mt-0">
            <ChatsView 
              chats={chats}
              onSelectChat={setSelectedChat}
            />
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="mt-0">
            <MeetingsView
              meetings={meetings}
              onConfirm={handleConfirmMeeting}
              onCancel={handleCancelMeeting}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}

function ApplicationsView({ 
  applications, 
  onSelectApplication 
}: { 
  applications: Application[];
  onSelectApplication: (app: Application) => void;
}) {
  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'invited':
        return 'bg-[var(--flare-green)] text-white';
      case 'pending':
        return 'bg-[var(--flare-highlight)] text-[var(--flare-brown)]';
      case 'declined':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'invited':
        return '✨ Invited';
      case 'pending':
        return '⏳ Pending';
      case 'declined':
        return '✕ Declined';
    }
  };

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center mb-4">
          <Home size={40} className="text-[var(--flare-green)]" />
        </div>
        <h3 className="text-[var(--flare-text)] mb-2">No Applications Yet</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Start browsing WGs and apply to find your perfect match!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <Card
          key={app.id}
          onClick={() => onSelectApplication(app)}
          className="overflow-hidden rounded-2xl border-border hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <img
                src={app.image}
                alt={app.wgName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-[var(--flare-text)] mb-1 truncate">{app.wgName}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin size={14} />
                    <span className="truncate">{app.location}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <Badge className={`${getStatusColor(app.status)} border-0 rounded-full mb-2`}>
                {getStatusLabel(app.status)}
              </Badge>

              {/* Details */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>Applied {app.appliedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Euro size={12} />
                  <span>€{app.rent}/mo</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ChatsView({ 
  chats,
  onSelectChat
}: { 
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}) {
  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center mb-4">
          <MessageCircle size={40} className="text-[var(--flare-green)]" />
        </div>
        <h3 className="text-[var(--flare-text)] mb-2">No Chats Yet</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Once you match with WGs, you can start chatting here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <Card
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className="overflow-hidden rounded-2xl border-border hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex gap-4 p-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex-shrink-0 relative">
              <img
                src={chat.image}
                alt={chat.wgName}
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
                <h4 className="text-[var(--flare-text)] truncate">{chat.wgName}</h4>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {chat.lastMessageTime}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {chat.location}
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
  onConfirm,
  onCancel
}: {
  meetings: Meeting[];
  onConfirm: (id: number) => void;
  onCancel: (id: number) => void;
}) {
  if (meetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center mb-4">
          <Calendar size={40} className="text-[var(--flare-green)]" />
        </div>
        <h3 className="text-[var(--flare-text)] mb-2">No Meetings Scheduled</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Your upcoming viewings and interviews will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {meetings.map((meeting) => (
        <Card
          key={meeting.id}
          className="overflow-hidden rounded-2xl border-border"
        >
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <img
                src={meeting.image}
                alt={meeting.wgName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <h4 className="text-[var(--flare-text)] mb-1 truncate">{meeting.wgName}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span className="truncate">{meeting.location}</span>
                </div>
              </div>

              {/* Date/Time */}
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1 text-[var(--flare-green)]">
                  <Calendar size={14} />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-1 text-[var(--flare-green)]">
                  <Clock size={14} />
                  <span>{meeting.time}</span>
                </div>
              </div>

              {/* Type Badge */}
              <Badge className="mb-3 bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full">
                {meeting.type === 'viewing' ? '🏠 Viewing' : '💬 Interview'}
              </Badge>

              {/* Actions */}
              {meeting.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onConfirm(meeting.id)}
                    className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] h-8 text-xs"
                  >
                    <Check size={14} className="mr-1" />
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCancel(meeting.id)}
                    className="flex-1 rounded-full border-2 h-8 text-xs"
                  >
                    <X size={14} className="mr-1" />
                    Cancel
                  </Button>
                </div>
              )}
              {meeting.status === 'confirmed' && (
                <div className="flex items-center gap-2 text-sm text-[var(--flare-green)]">
                  <Check size={16} />
                  <span>Confirmed</span>
                </div>
              )}
              {meeting.status === 'cancelled' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X size={16} />
                  <span>Cancelled</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ApplicationDetailModal({
  application,
  onClose
}: {
  application: Application;
  onClose: () => void;
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--flare-text)]">Application Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* WG Image */}
          <div className="w-full h-48 rounded-2xl overflow-hidden bg-muted">
            <img
              src={application.image}
              alt={application.wgName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* WG Info */}
          <div>
            <h3 className="text-[var(--flare-text)] mb-2">{application.wgName}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <MapPin size={16} />
              <span className="text-sm">{application.location}</span>
            </div>
          </div>

          {/* Status */}
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className={`${
                application.status === 'invited' 
                  ? 'bg-[var(--flare-green)] text-white' 
                  : application.status === 'pending'
                  ? 'bg-[var(--flare-highlight)] text-[var(--flare-brown)]'
                  : 'bg-muted text-muted-foreground'
              } border-0 rounded-full`}>
                {application.status === 'invited' ? '✨ Invited' : application.status === 'pending' ? '⏳ Pending' : '✕ Declined'}
              </Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Rent</p>
              <p className="text-[var(--flare-text)]">€{application.rent}/mo</p>
            </div>
            <div className="p-3 bg-muted rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Roommates</p>
              <p className="text-[var(--flare-text)]">{application.roommates}/{application.totalRooms}</p>
            </div>
          </div>

          {/* Applied Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>Applied {application.appliedDate}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-full border-2"
            >
              Close
            </Button>
            {application.status === 'invited' && (
              <Button
                className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
              >
                <MessageCircle size={18} className="mr-2" />
                Message
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}