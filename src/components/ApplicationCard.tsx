import { MessageCircle, Calendar, Clock } from 'lucide-react';
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

interface ApplicationCardProps {
  id: string;
  wgName: string;
  district: string;
  photo: string;
  lastMessage: string;
  time: string;
  unread?: number;
  status: 'pending' | 'invited' | 'declined' | 'meeting-scheduled';
  meetingDate?: string;
  onChat?: () => void;
}

export function ApplicationCard({ 
  wgName,
  district,
  photo, 
  lastMessage, 
  time,
  unread = 0,
  status,
  meetingDate,
  onChat,
}: ApplicationCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-[var(--flare-highlight)] text-[var(--flare-text)] border-0">Pending</Badge>;
      case 'invited':
        return <Badge className="bg-[var(--flare-green)] text-white border-0">Invited</Badge>;
      case 'declined':
        return <Badge variant="secondary" className="bg-gray-200 text-gray-600 border-0">Declined</Badge>;
      case 'meeting-scheduled':
        return <Badge className="bg-[var(--flare-brown)] text-white border-0">Meeting Set</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Main Info */}
      <div className="p-4 flex items-start gap-3">
        <div className="relative">
          <ImageWithFallback 
            src={photo} 
            alt={wgName}
            className="w-14 h-14 rounded-2xl object-cover"
          />
          {unread > 0 && (
            <div className="absolute -top-1 -right-1 bg-[var(--flare-green)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unread}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h4 className="truncate">{wgName}</h4>
              <p className="text-xs text-muted-foreground">{district}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
              {getStatusBadge(status)}
            </div>
          </div>
          
          {lastMessage && (
            <p className="text-sm text-muted-foreground line-clamp-1 mt-2">{lastMessage}</p>
          )}
        </div>
      </div>
      
      {/* Meeting Scheduled Info */}
      {status === 'meeting-scheduled' && meetingDate && (
        <div className="px-4 pb-4 pt-2 border-t border-border">
          <div className="bg-[var(--flare-highlight)] rounded-xl p-3 flex items-center gap-3">
            <div className="bg-[var(--flare-brown)] rounded-full p-2">
              <Calendar size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm">Meeting Scheduled</p>
              <p className="text-xs text-muted-foreground">{meetingDate}</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl">
              View Details
            </Button>
          </div>
        </div>
      )}
      
      {/* Invited - Choose Meeting Time */}
      {status === 'invited' && (
        <div className="px-4 pb-4 pt-2 border-t border-border">
          <div className="bg-green-50 rounded-xl p-3 mb-3">
            <p className="text-sm text-green-900 mb-1">🎉 You've been invited!</p>
            <p className="text-xs text-green-700">The WG would like to meet you. Choose a meeting time.</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-[var(--flare-brown)] hover:bg-[#6d4a2e] text-white rounded-xl"
                size="sm"
              >
                <Calendar size={16} className="mr-2" />
                Choose Meeting Time
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Choose Meeting Time</DialogTitle>
                <DialogDescription>
                  Pick a date to meet the {wgName} team
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
      
      {/* Pending - Chat Action */}
      {status === 'pending' && (
        <div className="px-4 pb-4 pt-2 border-t border-border">
          <Button 
            onClick={onChat}
            variant="outline"
            className="w-full rounded-xl"
            size="sm"
          >
            <MessageCircle size={16} className="mr-2" />
            Open Chat
          </Button>
        </div>
      )}
      
      {/* Declined */}
      {status === 'declined' && (
        <div className="px-4 pb-4 pt-2 border-t border-border">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-sm text-gray-600">This application was declined</p>
          </div>
        </div>
      )}
    </div>
  );
}
