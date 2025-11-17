import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Calendar, Users, Video, MapPin, CheckCircle, XCircle, Clock, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';

interface ChatMessage {
  id: number;
  sender: 'applicant' | 'resident';
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'meeting-proposal';
  meetingData?: MeetingProposal;
}

interface MeetingProposal {
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

interface ChatScreenProps {
  wgName: string;
  wgImage: string;
  residents: string[];
  onBack: () => void;
}

export function ChatScreen({ wgName, wgImage, residents, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'resident',
      senderName: 'Anna',
      content: 'Hey! Thanks for your application. We loved your answer about community living! 😊',
      timestamp: '2024-11-05T14:30:00',
      type: 'text'
    },
    {
      id: 2,
      sender: 'applicant',
      senderName: 'You',
      content: 'Thank you so much! I\'m really excited about the possibility of joining your WG.',
      timestamp: '2024-11-05T15:45:00',
      type: 'text'
    },
    {
      id: 3,
      sender: 'resident',
      senderName: 'Max',
      content: 'We\'d love to meet you! Here are some time slots that work for all of us:',
      timestamp: '2024-11-05T16:20:00',
      type: 'text'
    },
    {
      id: 4,
      sender: 'resident',
      senderName: 'Anna',
      content: 'Meeting proposal',
      timestamp: '2024-11-05T16:22:00',
      type: 'meeting-proposal',
      meetingData: {
        id: 1,
        date: '2024-11-12',
        time: '18:00',
        duration: '1 hour',
        format: 'face-to-face',
        location: 'Skalitzer Str. 45, Kreuzberg',
        status: 'pending',
        proposedBy: 'Anna'
      }
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAutoSlots, setShowAutoSlots] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock time slots for automatic scheduling
  const availableSlots: TimeSlot[] = [
    {
      id: 1,
      date: '2024-11-12',
      time: '18:00 - 19:00',
      dayOfWeek: 'Tuesday',
      availableResidents: ['Anna', 'Max', 'Lisa'],
      totalResidents: 3
    },
    {
      id: 2,
      date: '2024-11-14',
      time: '19:30 - 20:30',
      dayOfWeek: 'Thursday',
      availableResidents: ['Anna', 'Max'],
      totalResidents: 3
    },
    {
      id: 3,
      date: '2024-11-16',
      time: '17:00 - 18:00',
      dayOfWeek: 'Saturday',
      availableResidents: ['Anna', 'Max', 'Lisa'],
      totalResidents: 3
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: messages.length + 1,
      sender: 'applicant',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConfirmMeeting = (meetingId: number) => {
    setMessages(messages.map(msg => {
      if (msg.meetingData?.id === meetingId) {
        return {
          ...msg,
          meetingData: {
            ...msg.meetingData,
            status: 'confirmed'
          }
        };
      }
      return msg;
    }));

    // Add confirmation message
    const confirmMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'applicant',
      senderName: 'You',
      content: '✅ Meeting confirmed! Looking forward to it!',
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  const handleRequestChange = (meetingId: number) => {
    const requestMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'applicant',
      senderName: 'You',
      content: 'Could we possibly reschedule? I have a conflict at that time.',
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    setMessages([...messages, requestMessage]);
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    const meetingMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'applicant',
      senderName: 'You',
      content: 'Meeting confirmation',
      timestamp: new Date().toISOString(),
      type: 'meeting-proposal',
      meetingData: {
        id: messages.length + 1,
        date: slot.date,
        time: slot.time.split(' - ')[0],
        duration: '1 hour',
        format: 'face-to-face',
        location: 'Skalitzer Str. 45, Kreuzberg',
        status: 'confirmed',
        proposedBy: 'You'
      }
    };

    setMessages([...messages, meetingMessage]);
    setShowAutoSlots(false);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft size={20} />
        </Button>

        <img
          src={wgImage}
          alt={wgName}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="text-[var(--flare-text)]">{wgName}</h3>
          <p className="text-xs text-muted-foreground">
            {residents.join(', ')}
          </p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
        >
          <MoreVertical size={20} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'text' ? (
              <div
                className={`flex ${
                  message.sender === 'applicant' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] ${
                    message.sender === 'applicant' ? 'order-2' : 'order-1'
                  }`}
                >
                  {message.sender === 'resident' && (
                    <p className="text-xs text-muted-foreground mb-1 ml-2">
                      {message.senderName}
                    </p>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 ${
                      message.sender === 'applicant'
                        ? 'bg-[var(--flare-green-light)] text-[var(--flare-text)]'
                        : 'bg-[var(--flare-green)] text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-2">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ) : (
              <MeetingCard
                meeting={message.meetingData!}
                sender={message.sender}
                senderName={message.senderName}
                onConfirm={() => handleConfirmMeeting(message.meetingData!.id)}
                onRequestChange={() => handleRequestChange(message.meetingData!.id)}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Schedule Meeting Button */}
      <div className="px-4 py-2 bg-white border-t border-border">
        <Button
          onClick={() => setShowAutoSlots(true)}
          variant="outline"
          className="w-full rounded-full border-2 border-[var(--flare-green)] text-[var(--flare-green)] hover:bg-[var(--flare-green)]/10"
        >
          <Calendar size={18} className="mr-2" />
          View Available Time Slots
        </Button>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-border px-4 py-3 flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-[var(--flare-green)]"
        />
        <Button
          size="icon"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="rounded-full bg-[var(--flare-brown)] hover:bg-[#6d4a2d] text-white disabled:opacity-50"
        >
          <Send size={18} />
        </Button>
      </div>

      {/* Auto Slots Modal */}
      <AutoSlotsModal
        isOpen={showAutoSlots}
        onClose={() => setShowAutoSlots(false)}
        slots={availableSlots}
        onSelectSlot={handleSelectSlot}
        wgName={wgName}
      />
    </div>
  );
}

function MeetingCard({
  meeting,
  sender,
  senderName,
  onConfirm,
  onRequestChange
}: {
  meeting: MeetingProposal;
  sender: 'applicant' | 'resident';
  senderName: string;
  onConfirm: () => void;
  onRequestChange: () => void;
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
    <div className={`flex ${sender === 'applicant' ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[85%]">
        {sender === 'resident' && (
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
              <Badge className="bg-[var(--flare-highlight)] text-[var(--flare-brown)] border-0 rounded-full">
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

            {/* Actions */}
            {!isConfirmed && sender === 'resident' && (
              <>
                <Separator />
                <div className="flex gap-2">
                  <Button
                    onClick={onConfirm}
                    className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] h-9"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Confirm
                  </Button>
                  <Button
                    onClick={onRequestChange}
                    variant="outline"
                    className="flex-1 rounded-full border-2 h-9"
                  >
                    <XCircle size={16} className="mr-2" />
                    Request Change
                  </Button>
                </div>
              </>
            )}

            {isConfirmed && (
              <div className="bg-[var(--flare-green)]/5 border border-[var(--flare-green)]/20 rounded-xl p-3">
                <p className="text-xs text-[var(--flare-text)] text-center">
                  ✅ This meeting has been added to your calendar
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AutoSlotsModal({
  isOpen,
  onClose,
  slots,
  onSelectSlot,
  wgName
}: {
  isOpen: boolean;
  onClose: () => void;
  slots: TimeSlot[];
  onSelectSlot: (slot: TimeSlot) => void;
  wgName: string;
}) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const handleConfirmSlot = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
      setSelectedSlot(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--flare-text)] flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
              <Calendar size={18} className="text-[var(--flare-green)]" />
            </div>
            Available Time Slots
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            {wgName} has shared these available meeting times. Select one that works for you:
          </p>

          {/* Slots */}
          <div className="space-y-3">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const allAvailable = slot.availableResidents.length === slot.totalResidents;

              return (
                <Card
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-2xl p-4 cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'border-[var(--flare-green)] bg-[var(--flare-green)]/5'
                      : 'border-border hover:border-[var(--flare-green)]/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[var(--flare-text)]">{slot.dayOfWeek}</p>
                        {allAvailable && (
                          <Badge className="bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full text-xs">
                            All available
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatDate(slot.date)} • {slot.time}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {slot.availableResidents.join(', ')}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[var(--flare-green)] flex items-center justify-center">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Info */}
          <div className="bg-[var(--flare-green)]/5 border border-[var(--flare-green)]/20 rounded-xl p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 These time slots are automatically generated based on residents' shared availability.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-full border-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSlot}
              disabled={!selectedSlot}
              className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] disabled:opacity-50"
            >
              <CheckCircle size={16} className="mr-2" />
              Confirm Slot
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}