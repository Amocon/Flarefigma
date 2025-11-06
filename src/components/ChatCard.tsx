import { Check, X, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Calendar as CalendarComponent } from './ui/calendar';

interface ChatCardProps {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  time: string;
  unread?: number;
  status: 'pending' | 'voting' | 'accepted' | 'declined';
  votes?: { yes: number; no: number; total: number };
  onVoteInvite?: () => void;
  onVoteDecline?: () => void;
  userVoted?: boolean;
}

export function ChatCard({ 
  name, 
  photo, 
  lastMessage, 
  time,
  unread = 0,
  status,
  votes,
  onVoteInvite,
  onVoteDecline,
  userVoted = false
}: ChatCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-[var(--flare-highlight)] text-[var(--flare-text)] border-0">Pending</Badge>;
      case 'voting':
        return <Badge className="bg-blue-500 text-white border-0">Voting</Badge>;
      case 'accepted':
        return <Badge className="bg-[var(--flare-green-dark)] text-white border-0">Accepted</Badge>;
      case 'declined':
        return <Badge variant="secondary" className="bg-gray-200 text-gray-600 border-0">Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Main Chat Info */}
      <div className="p-4 flex items-start gap-3">
        <div className="relative">
          <ImageWithFallback 
            src={photo} 
            alt={name}
            className="w-14 h-14 rounded-full object-cover"
          />
          {unread > 0 && (
            <div className="absolute -top-1 -right-1 bg-[var(--flare-green)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unread}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="truncate">{name}</h4>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
              {getStatusBadge(status)}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1">{lastMessage}</p>
        </div>
      </div>
      
      {/* Voting Section */}
      {status === 'voting' && votes && (
        <div className="px-4 pb-4 pt-2 border-t border-border">
          <div className="bg-muted rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Team Decision</span>
              <span className="text-xs text-muted-foreground">{votes.yes + votes.no}/{votes.total} voted</span>
            </div>
            <div className="flex gap-2 h-2 rounded-full overflow-hidden bg-gray-200">
              <div 
                className="bg-[var(--flare-green)]" 
                style={{ width: `${(votes.yes / votes.total) * 100}%` }}
              />
              <div 
                className="bg-red-500" 
                style={{ width: `${(votes.no / votes.total) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-[var(--flare-green)]">{votes.yes} Invite</span>
              <span className="text-red-500">{votes.no} Decline</span>
            </div>
          </div>
          
          {!userVoted && (
            <div className="flex gap-2">
              <Button
                onClick={onVoteDecline}
                variant="outline"
                className="flex-1 rounded-xl"
                size="sm"
              >
                <X size={16} className="mr-2" />
                Decline
              </Button>
              <Button
                onClick={onVoteInvite}
                className="flex-1 bg-[var(--flare-brown)] hover:bg-[#6d4a2e] text-white rounded-xl"
                size="sm"
              >
                <Check size={16} className="mr-2" />
                Invite
              </Button>
            </div>
          )}
          
          {userVoted && (
            <div className="text-center text-sm text-muted-foreground">
              You voted • Waiting for other flatmates
            </div>
          )}
        </div>
      )}
      
      {/* Accepted - Schedule Meeting */}
      {status === 'accepted' && (
        <div className="px-4 pb-4 pt-2 border-t border-border">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-[var(--flare-brown)] hover:bg-[#6d4a2e] text-white rounded-xl"
                size="sm"
              >
                <Calendar size={16} className="mr-2" />
                Schedule Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule a Meeting</DialogTitle>
                <DialogDescription>
                  Pick a date to meet {name}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center py-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl border"
                />
              </div>
              <Button 
                className="w-full bg-[var(--flare-brown)] hover:bg-[#6d4a2e] text-white rounded-xl"
                disabled={!selectedDate}
              >
                Confirm Meeting
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
