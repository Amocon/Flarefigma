import { useState } from 'react';
import { FloorPlanUpload } from './FloorPlanUpload';
import { Button } from './ui/button';
import { Home, CheckCircle, ChevronLeft } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  size: string;
  rent: string;
  type: 'private' | 'shared';
  position: { x: number; y: number; width: number; height: number };
}

export function FloorPlanDemo() {
  const [showUpload, setShowUpload] = useState(true);
  const [confirmedRooms, setConfirmedRooms] = useState<Room[]>([]);

  const handleComplete = (rooms: Room[]) => {
    setConfirmedRooms(rooms);
    setShowUpload(false);
  };

  const handleReset = () => {
    setConfirmedRooms([]);
    setShowUpload(true);
  };

  if (showUpload) {
    return <FloorPlanUpload onComplete={handleComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle size={48} className="text-white" />
        </div>
        <h2 className="text-white text-center mb-2">Layout Confirmed!</h2>
        <p className="text-sm text-white/80 text-center">
          Your WG structure has been saved
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-sm mx-auto space-y-6">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="mb-4">Your WG Layout</h3>
            
            <div className="space-y-3 mb-6">
              {confirmedRooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--flare-green)]/10 flex items-center justify-center">
                      <Home size={20} className="text-[var(--flare-green)]" />
                    </div>
                    <div>
                      <h4 className="text-sm">{room.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {room.size} m² {room.rent && `• €${room.rent}/mo`}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    room.type === 'private' 
                      ? 'bg-[var(--flare-green)]/10 text-[var(--flare-green)]'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {room.type}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--flare-green)]/5 border border-[var(--flare-green)] rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">
                  {confirmedRooms.filter(r => r.type === 'private').length}
                </p>
                <p className="text-xs text-muted-foreground">Private Rooms</p>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">
                  {confirmedRooms.filter(r => r.type === 'shared').length}
                </p>
                <p className="text-xs text-muted-foreground">Shared Spaces</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              className="w-full rounded-xl"
              size="lg"
            >
              Continue to Next Step
            </Button>
            
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={handleReset}
            >
              Upload Different Floor Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
