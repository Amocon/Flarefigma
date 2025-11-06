import { Heart, MapPin, Euro, Users, Home, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface WGListing {
  id: number;
  name: string;
  location: string;
  district: string;
  rent: number;
  availableFrom: string;
  roommates: number;
  totalRooms: number;
  size: number;
  image: string;
  matchScore: number;
}

interface WGListViewProps {
  listings: WGListing[];
  onSelectWG: (wg: WGListing) => void;
  onLike: (id: number) => void;
}

export function WGListView({ listings, onSelectWG, onLike }: WGListViewProps) {
  return (
    <div className="space-y-3">
      {listings.map((wg) => (
        <Card
          key={wg.id}
          onClick={() => onSelectWG(wg)}
          className="overflow-hidden rounded-2xl border-border hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
              <img
                src={wg.image}
                alt={wg.name}
                className="w-full h-full object-cover"
              />
              
              {/* Match Score */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-[var(--flare-green)] text-white rounded-full text-xs">
                {wg.matchScore}%
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-[var(--flare-text)] mb-1 truncate">{wg.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin size={14} />
                    <span className="truncate">{wg.district}</span>
                  </div>
                </div>

                {/* Like Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(wg.id);
                  }}
                  className="rounded-full hover:bg-[var(--flare-green)]/10 text-[var(--flare-green)] flex-shrink-0 -mt-1"
                >
                  <Heart size={20} />
                </Button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Euro size={12} />
                  <span>€{wg.rent}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users size={12} />
                  <span>{wg.roommates}/{wg.totalRooms}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Home size={12} />
                  <span>{wg.size}m²</span>
                </div>
              </div>

              {/* Available From */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} />
                <span>From {wg.availableFrom}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
