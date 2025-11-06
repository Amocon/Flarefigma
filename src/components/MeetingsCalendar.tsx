import { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

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

interface TimeSlot {
  day: string;
  date: string;
  time: string;
  isAvailable: boolean;
  residentCount: number;
  totalResidents: number;
}

interface MeetingsCalendarProps {
  meetings: Meeting[];
  onConfirm: (meetingId: number) => void;
  onProposeMeeting: (timeSlot: TimeSlot) => void;
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export function MeetingsCalendar({ meetings, onConfirm, onProposeMeeting }: MeetingsCalendarProps) {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);

  // Generate mock availability data
  const generateAvailability = (): TimeSlot[] => {
    const availability: TimeSlot[] = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + currentWeek * 7);
    
    weekDays.forEach((day, dayIndex) => {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + dayIndex);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      
      timeSlots.forEach(time => {
        // Simulate resident availability (random for demo)
        const residentCount = Math.floor(Math.random() * 4);
        availability.push({
          day,
          date: dateStr,
          time,
          isAvailable: residentCount > 0,
          residentCount,
          totalResidents: 3
        });
      });
    });
    
    return availability;
  };

  const [availability] = useState(generateAvailability());

  const toggleSlot = (day: string, time: string) => {
    const slotKey = `${day}-${time}`;
    const newSlots = new Set(selectedSlots);
    
    if (newSlots.has(slotKey)) {
      newSlots.delete(slotKey);
    } else {
      newSlots.add(slotKey);
    }
    
    setSelectedSlots(newSlots);
  };

  const getSlotData = (day: string, time: string): TimeSlot | undefined => {
    return availability.find(slot => slot.day === day && slot.time === time);
  };

  const handleProposeTime = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    setShowProposeModal(true);
  };

  const handleConfirmProposal = () => {
    if (selectedTimeSlot) {
      onProposeMeeting(selectedTimeSlot);
      setShowProposeModal(false);
      setSelectedTimeSlot(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 p-1 bg-muted rounded-full">
          <Button
            size="sm"
            onClick={() => setView('list')}
            className={`rounded-full px-4 ${
              view === 'list'
                ? 'bg-[var(--flare-green)] text-white hover:bg-[var(--flare-green-dark)]'
                : 'bg-transparent text-[var(--flare-text)] hover:bg-background'
            }`}
          >
            List View
          </Button>
          <Button
            size="sm"
            onClick={() => setView('calendar')}
            className={`rounded-full px-4 ${
              view === 'calendar'
                ? 'bg-[var(--flare-green)] text-white hover:bg-[var(--flare-green-dark)]'
                : 'bg-transparent text-[var(--flare-text)] hover:bg-background'
            }`}
          >
            Calendar View
          </Button>
        </div>

        <Button
          size="sm"
          className="rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
          onClick={() => setShowProposeModal(true)}
        >
          <Plus size={16} className="mr-1" />
          Propose Time
        </Button>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-[var(--flare-text)] mb-2">Upcoming Meetings</h3>
            <p className="text-sm text-muted-foreground">
              {meetings.length} meeting{meetings.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>

          {/* Meetings List */}
          {meetings.length === 0 ? (
            <Card className="p-12 rounded-2xl shadow-sm border-border text-center">
              <Calendar size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No meetings scheduled</p>
              <p className="text-sm text-muted-foreground mt-2">
                Propose meeting times with approved applicants
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {meetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onConfirm={onConfirm}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="space-y-4">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <h3 className="text-[var(--flare-text)]">Team Availability</h3>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => setCurrentWeek(currentWeek - 1)}
              >
                <ChevronLeft size={18} />
              </Button>
              <span className="text-sm text-muted-foreground min-w-24 text-center">
                {currentWeek === 0 ? 'This Week' : `Week +${currentWeek}`}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => setCurrentWeek(currentWeek + 1)}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 p-3 bg-muted rounded-xl text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--flare-green)]" />
              <span className="text-muted-foreground">All available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--flare-green)]/40" />
              <span className="text-muted-foreground">Partially available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border border-border" />
              <span className="text-muted-foreground">Unavailable</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <Card className="p-4 rounded-2xl shadow-sm border-border overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header Row */}
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div className="text-sm text-muted-foreground"></div>
                {weekDays.map((day, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() + currentWeek * 7 + index);
                  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                  return (
                    <div key={day} className="text-center">
                      <p className="text-sm text-[var(--flare-text)] mb-1">{day}</p>
                      <p className="text-xs text-muted-foreground">{dateStr}</p>
                    </div>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="space-y-1">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 gap-2">
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">{time}</span>
                    </div>
                    {weekDays.map((day) => {
                      const slot = getSlotData(day, time);
                      const slotKey = `${day}-${time}`;
                      const isSelected = selectedSlots.has(slotKey);
                      
                      if (!slot) return <div key={`${day}-${time}`} />;
                      
                      const opacity = slot.residentCount === slot.totalResidents 
                        ? 1 
                        : slot.residentCount > 0 
                        ? 0.4 
                        : 0;
                      
                      return (
                        <button
                          key={`${day}-${time}`}
                          onClick={() => {
                            if (slot.isAvailable) {
                              handleProposeTime(slot);
                            }
                          }}
                          className={`h-10 rounded-lg transition-all border-2 ${
                            isSelected
                              ? 'border-[var(--flare-green-dark)] bg-[var(--flare-green)]'
                              : slot.residentCount === slot.totalResidents
                              ? 'border-transparent bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]'
                              : slot.isAvailable
                              ? 'border-transparent bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]'
                              : 'border-border bg-muted cursor-not-allowed'
                          }`}
                          style={{ opacity: slot.isAvailable ? opacity + 0.3 : 0.2 }}
                          disabled={!slot.isAvailable}
                        >
                          {slot.isAvailable && slot.residentCount === slot.totalResidents && (
                            <CheckCircle2 size={16} className="mx-auto text-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Info Text */}
          <p className="text-sm text-muted-foreground text-center">
            Tap on a green time slot to propose a meeting
          </p>
        </div>
      )}

      {/* Propose Meeting Modal */}
      <ProposeMeetingModal
        isOpen={showProposeModal}
        onClose={() => setShowProposeModal(false)}
        onConfirm={handleConfirmProposal}
        timeSlot={selectedTimeSlot}
      />
    </div>
  );
}

function MeetingCard({ meeting, onConfirm }: { meeting: Meeting; onConfirm: (id: number) => void }) {
  return (
    <Card className="p-5 rounded-2xl shadow-sm border-border hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <img 
            src={meeting.applicantImage} 
            alt={meeting.applicantName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-[var(--flare-text)]">{meeting.applicantName}</h4>
            {meeting.status === 'confirmed' ? (
              <Badge className="bg-[var(--flare-green)]/20 text-[var(--flare-green-dark)] border-0 rounded-full">
                <CheckCircle2 size={14} className="mr-1" />
                Confirmed
              </Badge>
            ) : meeting.status === 'pending' ? (
              <Badge className="bg-[var(--flare-highlight)]/30 text-[var(--flare-brown)] border-0 rounded-full">
                <Clock size={14} className="mr-1" />
                Pending ({meeting.confirmedBy}/{meeting.totalResidents})
              </Badge>
            ) : (
              <Badge className="bg-muted text-muted-foreground border-0 rounded-full">
                Proposed
              </Badge>
            )}
          </div>
          
          {/* Meeting Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} className="text-[var(--flare-green)]" />
              <span>{meeting.proposedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} className="text-[var(--flare-green)]" />
              <span>{meeting.proposedTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={16} className="text-[var(--flare-green)]" />
              <span>{meeting.location}</span>
            </div>
          </div>

          {/* Action Button */}
          {meeting.status !== 'confirmed' && (
            <Button
              size="sm"
              onClick={() => onConfirm(meeting.id)}
              className="rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
            >
              <CheckCircle2 size={16} className="mr-1" />
              Confirm Meeting
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function ProposeMeetingModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  timeSlot 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  timeSlot: TimeSlot | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--flare-text)]">Propose Meeting Time</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Selected Time Display */}
          {timeSlot && (
            <Card className="p-4 rounded-2xl bg-[var(--flare-green)]/10 border-[var(--flare-green)]/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--flare-green)]/20 flex items-center justify-center">
                  <Calendar size={24} className="text-[var(--flare-green-dark)]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selected Time</p>
                  <p className="text-[var(--flare-text)]">
                    {timeSlot.day}, {timeSlot.date} at {timeSlot.time}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Availability Info */}
          {timeSlot && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-xl">
              <Users size={18} className="text-[var(--flare-green-dark)]" />
              <span className="text-sm text-muted-foreground">
                {timeSlot.residentCount} of {timeSlot.totalResidents} residents available
              </span>
            </div>
          )}

          {/* Info Text */}
          <p className="text-sm text-muted-foreground">
            The applicant will receive an in-app notification with the proposed meeting time. 
            They can accept or suggest alternative times.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-full border-2"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
            >
              <CheckCircle2 size={18} className="mr-2" />
              Confirm & Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
