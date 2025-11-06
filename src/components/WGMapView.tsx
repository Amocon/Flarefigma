import { useState } from 'react';
import { MapPin, Euro, Users, Home, Navigation } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface WGListing {
  id: number;
  name: string;
  location: string;
  district: string;
  rent: number;
  roommates: number;
  totalRooms: number;
  size: number;
  image: string;
  matchScore: number;
  latitude: number;
  longitude: number;
}

interface WGMapViewProps {
  listings: WGListing[];
  onSelectWG: (wg: WGListing) => void;
}

export function WGMapView({ listings, onSelectWG }: WGMapViewProps) {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  // Calculate map bounds
  const centerLat = listings.reduce((sum, wg) => sum + wg.latitude, 0) / listings.length;
  const centerLng = listings.reduce((sum, wg) => sum + wg.longitude, 0) / listings.length;

  const selectedWG = listings.find(wg => wg.id === selectedPin);

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <Card className="rounded-2xl overflow-hidden border-border shadow-sm">
        <div className="relative h-96 bg-muted">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--flare-green)]/5 to-[var(--flare-brown)]/5">
            {/* Grid Pattern */}
            <svg className="w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* WG Pins */}
          {listings.map((wg, index) => {
            // Simulate pin positions (in real app, would use actual map coordinates)
            const x = 20 + (index % 3) * 30 + Math.random() * 10;
            const y = 20 + Math.floor(index / 3) * 30 + Math.random() * 10;

            return (
              <button
                key={wg.id}
                onClick={() => setSelectedPin(wg.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                  selectedPin === wg.id ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {/* Pin */}
                <div className={`relative ${selectedPin === wg.id ? 'animate-bounce' : ''}`}>
                  <div className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${
                    selectedPin === wg.id
                      ? 'bg-[var(--flare-green)] ring-4 ring-[var(--flare-green)]/30'
                      : 'bg-[var(--flare-green-dark)]'
                  }`}>
                    <MapPin size={20} className="text-white" fill="white" />
                  </div>
                  
                  {/* Price Tag */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-full shadow-md text-xs">
                    €{wg.rent}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Center Button */}
          <Button
            size="icon"
            className="absolute bottom-4 right-4 rounded-full bg-white hover:bg-muted text-[var(--flare-text)] shadow-lg"
          >
            <Navigation size={20} />
          </Button>

          {/* Map Attribution */}
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
            Map View
          </div>
        </div>
      </Card>

      {/* Selected WG Card */}
      {selectedWG ? (
        <Card 
          onClick={() => onSelectWG(selectedWG)}
          className="rounded-2xl border-border shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
        >
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
              <img
                src={selectedWG.image}
                alt={selectedWG.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute bottom-1 right-1 bg-[var(--flare-green)] text-white border-0 text-xs px-1.5 py-0.5">
                {selectedWG.matchScore}%
              </Badge>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[var(--flare-text)] mb-1">{selectedWG.name}</h4>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin size={14} />
                <span className="truncate">{selectedWG.location}</span>
              </div>

              {/* Details */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Euro size={12} />
                  <span>€{selectedWG.rent}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  <span>{selectedWG.roommates}/{selectedWG.totalRooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home size={12} />
                  <span>{selectedWG.size}m²</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="text-center py-8">
          <MapPin size={32} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Tap a pin to view WG details
          </p>
        </div>
      )}

      {/* WG Count */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Showing {listings.length} WGs in this area
        </p>
      </div>
    </div>
  );
}
