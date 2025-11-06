import { Calendar, Users, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MemberAvatar } from './MemberAvatar';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Member {
  id: string;
  name: string;
  photo: string;
}

interface TimeSlot {
  day: number; // 0-6 (Mon-Sun)
  hour: number; // 0-23
  memberId: string;
}

interface AvailabilityCalendarProps {
  members: Member[];
  currentUserId: string;
}

export function AvailabilityCalendar({ members, currentUserId }: AvailabilityCalendarProps) {
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([
    // Mock data - some pre-selected slots
    { day: 0, hour: 18, memberId: members[0]?.id },
    { day: 0, hour: 19, memberId: members[0]?.id },
    { day: 1, hour: 18, memberId: members[0]?.id },
    { day: 2, hour: 19, memberId: members[1]?.id },
    { day: 2, hour: 20, memberId: members[1]?.id },
    { day: 3, hour: 18, memberId: members[0]?.id },
    { day: 3, hour: 19, memberId: members[0]?.id },
    { day: 3, hour: 19, memberId: members[1]?.id },
    { day: 4, hour: 19, memberId: members[2]?.id },
    { day: 5, hour: 15, memberId: members[0]?.id },
    { day: 5, hour: 15, memberId: members[1]?.id },
    { day: 5, hour: 15, memberId: members[2]?.id },
  ]);

  const [showBestTimes, setShowBestTimes] = useState(false);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 10 }, (_, i) => i + 14); // 14:00 to 23:00

  const toggleSlot = (day: number, hour: number) => {
    const slotExists = selectedSlots.some(
      slot => slot.day === day && slot.hour === hour && slot.memberId === currentUserId
    );

    if (slotExists) {
      // Remove slot
      setSelectedSlots(selectedSlots.filter(
        slot => !(slot.day === day && slot.hour === hour && slot.memberId === currentUserId)
      ));
    } else {
      // Add slot
      setSelectedSlots([...selectedSlots, { day, hour, memberId: currentUserId }]);
    }
  };

  const getSlotData = (day: number, hour: number) => {
    const slotsAtTime = selectedSlots.filter(
      slot => slot.day === day && slot.hour === hour
    );
    return slotsAtTime;
  };

  const isCurrentUserSlot = (day: number, hour: number) => {
    return selectedSlots.some(
      slot => slot.day === day && slot.hour === hour && slot.memberId === currentUserId
    );
  };

  const getOverlapCount = (day: number, hour: number) => {
    const slots = getSlotData(day, hour);
    return slots.length;
  };

  const getBestTimes = () => {
    // Find time slots where all members are available
    const bestSlots: { day: number; hour: number; count: number }[] = [];
    
    for (let day = 0; day < 7; day++) {
      for (let hour of hours) {
        const overlapCount = getOverlapCount(day, hour);
        if (overlapCount >= 2) { // At least 2 members available
          bestSlots.push({ day, hour, count: overlapCount });
        }
      }
    }

    // Sort by most overlap
    return bestSlots.sort((a, b) => b.count - a.count).slice(0, 5);
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const bestTimes = getBestTimes();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} className="text-[var(--flare-green)]" />
            Group Availability
          </CardTitle>
          <Button 
            onClick={() => setShowBestTimes(!showBestTimes)}
            size="sm"
            variant={showBestTimes ? "default" : "outline"}
          >
            <Sparkles size={16} className="mr-2" />
            Best Times
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Click time slots to mark your availability for meetings or hangouts
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Member Legend */}
        <div className="bg-muted rounded-xl p-4">
          <p className="text-xs mb-3">WG Members</p>
          <div className="flex flex-wrap gap-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-2">
                <MemberAvatar 
                  name={member.name}
                  photo={member.photo}
                  size="sm"
                />
                <span className="text-sm">{member.name}</span>
                {member.id === currentUserId && (
                  <Badge variant="secondary" className="text-xs">You</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best Times Display */}
        {showBestTimes && bestTimes.length > 0 && (
          <div className="bg-[var(--flare-highlight)]/30 rounded-xl p-4 border border-[var(--flare-highlight)]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[var(--flare-green)]" />
              <h4 className="text-sm">Best Meeting Times</h4>
            </div>
            <div className="space-y-2">
              {bestTimes.map((slot, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>
                    {daysOfWeek[slot.day]} at {formatHour(slot.hour)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-[var(--flare-green)]" />
                    <span className="text-xs text-muted-foreground">
                      {slot.count}/{members.length} available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 gap-1 mb-1">
              <div className="text-xs text-center p-2">Time</div>
              {daysOfWeek.map((day) => (
                <div key={day} className="text-xs text-center p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Time Rows */}
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
                {/* Hour Label */}
                <div className="text-xs text-muted-foreground text-center p-2 flex items-center justify-center">
                  {formatHour(hour)}
                </div>

                {/* Day Cells */}
                {daysOfWeek.map((_, dayIndex) => {
                  const overlapCount = getOverlapCount(dayIndex, hour);
                  const isUserSelected = isCurrentUserSlot(dayIndex, hour);
                  const slots = getSlotData(dayIndex, hour);
                  
                  let bgColor = 'bg-muted hover:bg-muted/80';
                  
                  if (overlapCount > 0) {
                    if (overlapCount === members.length) {
                      // All members available - highlight color
                      bgColor = 'bg-[var(--flare-highlight)] hover:bg-[var(--flare-highlight)]/80 border-2 border-[var(--flare-green)]';
                    } else if (overlapCount >= 2) {
                      // Multiple members - green
                      bgColor = 'bg-[var(--flare-green)]/30 hover:bg-[var(--flare-green)]/40 border border-[var(--flare-green)]';
                    } else {
                      // Single member - light green
                      bgColor = 'bg-[var(--flare-green)]/10 hover:bg-[var(--flare-green)]/20';
                    }
                  }

                  return (
                    <button
                      key={`${dayIndex}-${hour}`}
                      onClick={() => toggleSlot(dayIndex, hour)}
                      className={`
                        aspect-square rounded-lg transition-all cursor-pointer relative
                        ${bgColor}
                        ${isUserSelected ? 'ring-2 ring-[var(--flare-green-dark)] ring-offset-1' : ''}
                      `}
                    >
                      {overlapCount > 1 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs">{overlapCount}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-muted rounded-xl p-4">
          <p className="text-xs mb-3">Color Legend</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border border-border" />
              <span>Not available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--flare-green)]/10" />
              <span>1 person</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--flare-green)]/30 border border-[var(--flare-green)]" />
              <span>2+ people</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--flare-highlight)] border-2 border-[var(--flare-green)]" />
              <span>Everyone!</span>
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-muted-foreground text-center">
          💡 Click on time slots to mark when you're free. Overlapping times will be highlighted.
        </p>
      </CardContent>
    </Card>
  );
}
