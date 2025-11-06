import { useState } from 'react';
import { Home, MapPin, List, Filter, Heart, X, Users, Euro, Calendar, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { WGSwipeView } from './WGSwipeView';
import { WGMapView } from './WGMapView';
import { WGListView } from './WGListView';
import { ApplicationModal } from './ApplicationModal';

type ViewMode = 'swipe' | 'map' | 'list';

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
  images: string[];
  matchScore: number;
  description: string;
  amenities: string[];
  latitude: number;
  longitude: number;
  question?: string;
}

export function ApplicantHome() {
  const [viewMode, setViewMode] = useState<ViewMode>('swipe');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWG, setSelectedWG] = useState<WGListing | null>(null);
  const [applyingToWG, setApplyingToWG] = useState<WGListing | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState({
    maxRent: 800,
    minRooms: 1,
    districts: [] as string[],
    availableFrom: ''
  });

  // Mock WG data
  const wgListings: WGListing[] = [
    {
      id: 1,
      name: 'Kreuzberg Dreamers',
      location: 'Skalitzer Str. 45',
      district: 'Kreuzberg',
      rent: 550,
      availableFrom: 'Jan 1, 2025',
      roommates: 3,
      totalRooms: 4,
      size: 85,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
      ],
      matchScore: 92,
      description: 'Cozy WG in the heart of Kreuzberg. We are looking for a friendly, open-minded person to join our community. We love cooking together and occasional game nights!',
      amenities: ['Balcony', 'Dishwasher', 'WiFi', 'Washing Machine'],
      latitude: 52.4995,
      longitude: 13.4241,
      question: 'What do you enjoy most about living in a shared flat?'
    },
    {
      id: 2,
      name: 'Mitte Modern Living',
      location: 'Torstraße 88',
      district: 'Mitte',
      rent: 600,
      availableFrom: 'Dec 15, 2024',
      roommates: 2,
      totalRooms: 3,
      size: 75,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
      ],
      matchScore: 87,
      description: 'Modern apartment in central Mitte. Perfect for young professionals. Close to public transport and great nightlife.',
      amenities: ['Elevator', 'Balcony', 'WiFi'],
      latitude: 52.5289,
      longitude: 13.3989,
      question: 'Tell us about your daily routine and work schedule.'
    },
    {
      id: 3,
      name: 'Neukölln Creative Hub',
      location: 'Weserstraße 12',
      district: 'Neukölln',
      rent: 480,
      availableFrom: 'Jan 15, 2025',
      roommates: 4,
      totalRooms: 5,
      size: 95,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
      ],
      matchScore: 85,
      description: 'Artistic community in vibrant Neukölln. We are musicians, artists, and creatives. Looking for someone who appreciates a bohemian lifestyle.',
      amenities: ['Garden', 'WiFi', 'Washing Machine', 'Bike Storage'],
      latitude: 52.4826,
      longitude: 13.4379,
      question: 'What creative projects are you currently working on?'
    },
    {
      id: 4,
      name: 'Prenzlauer Berg Family',
      location: 'Kollwitzstraße 34',
      district: 'Prenzlauer Berg',
      rent: 620,
      availableFrom: 'Feb 1, 2025',
      roommates: 2,
      totalRooms: 3,
      size: 80,
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80'
      ],
      matchScore: 78,
      description: 'Quiet and cozy WG in beautiful Prenzlauer Berg. We value a calm atmosphere and mutual respect.',
      amenities: ['Balcony', 'Dishwasher', 'WiFi'],
      latitude: 52.5320,
      longitude: 13.4197,
      question: 'How do you contribute to a peaceful living environment?'
    }
  ];

  const handleLike = (wgId: number) => {
    const wg = wgListings.find(w => w.id === wgId);
    if (wg) {
      setApplyingToWG(wg);
    }
  };

  const handlePass = (wgId: number) => {
    console.log('Passed on WG:', wgId);
    // Handle pass action
  };

  const handleSubmitApplication = (wgId: number, answer: string) => {
    console.log('Application submitted to WG:', wgId, 'with answer:', answer);
    // Move to Active Applications
  };

  const handleSaveForLater = (wgId: number) => {
    console.log('Saved WG for later:', wgId);
    // Add to Saved WGs list
  };

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-2 text-[var(--flare-text)]">Find a WG</h1>
            <p className="text-sm text-muted-foreground">
              {wgListings.length} WGs match your preferences
            </p>
          </div>
          
          {/* Filter Button */}
          <Button
            size="icon"
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="rounded-full border-2 hover:bg-muted relative"
          >
            <Filter size={20} className="text-[var(--flare-text)]" />
            {(filters.maxRent < 800 || filters.minRooms > 1) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--flare-green)] rounded-full border-2 border-white" />
            )}
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 p-1 bg-muted rounded-full">
          <button
            onClick={() => setViewMode('swipe')}
            className={`flex-1 py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
              viewMode === 'swipe'
                ? 'bg-[var(--flare-green)] text-white shadow-sm'
                : 'text-[var(--flare-text)] hover:bg-background'
            }`}
          >
            <Home size={18} />
            <span className="text-sm">Swipe</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
              viewMode === 'map'
                ? 'bg-[var(--flare-green)] text-white shadow-sm'
                : 'text-[var(--flare-text)] hover:bg-background'
            }`}
          >
            <MapPin size={18} />
            <span className="text-sm">Map</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
              viewMode === 'list'
                ? 'bg-[var(--flare-green)] text-white shadow-sm'
                : 'text-[var(--flare-text)] hover:bg-background'
            }`}
          >
            <List size={18} />
            <span className="text-sm">List</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6">
        {viewMode === 'swipe' && (
          <WGSwipeView
            listings={wgListings}
            onLike={handleLike}
            onPass={handlePass}
            onViewDetails={setSelectedWG}
          />
        )}
        {viewMode === 'map' && (
          <WGMapView
            listings={wgListings}
            onSelectWG={setSelectedWG}
          />
        )}
        {viewMode === 'list' && (
          <WGListView
            listings={wgListings}
            onSelectWG={setSelectedWG}
            onLike={handleLike}
          />
        )}
      </div>

      {/* Filter Modal */}
      <FiltersModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />

      {/* WG Detail Modal */}
      {selectedWG && (
        <WGDetailModal
          wg={selectedWG}
          onClose={() => setSelectedWG(null)}
          onLike={() => handleLike(selectedWG.id)}
        />
      )}

      {/* Application Modal */}
      {applyingToWG && (
        <ApplicationModal
          wg={applyingToWG}
          isOpen={!!applyingToWG}
          onClose={() => setApplyingToWG(null)}
          onSubmit={handleSubmitApplication}
          onSaveForLater={handleSaveForLater}
        />
      )}
    </div>
  );
}

function FiltersModal({
  isOpen,
  onClose,
  filters,
  setFilters
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  setFilters: any;
}) {
  const districts = ['Kreuzberg', 'Mitte', 'Neukölln', 'Prenzlauer Berg', 'Friedrichshain', 'Charlottenburg'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--flare-text)]">Filter WGs</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Max Rent */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Max Rent</Label>
              <span className="text-sm text-[var(--flare-green)]">€{filters.maxRent}</span>
            </div>
            <Slider
              value={[filters.maxRent]}
              onValueChange={(value) => setFilters({ ...filters, maxRent: value[0] })}
              max={1000}
              min={300}
              step={50}
              className="w-full"
            />
          </div>

          {/* Min Rooms */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Minimum Rooms</Label>
              <span className="text-sm text-[var(--flare-green)]">{filters.minRooms}</span>
            </div>
            <Slider
              value={[filters.minRooms]}
              onValueChange={(value) => setFilters({ ...filters, minRooms: value[0] })}
              max={6}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Districts */}
          <div className="space-y-3">
            <Label>Districts</Label>
            <div className="flex flex-wrap gap-2">
              {districts.map((district) => (
                <Badge
                  key={district}
                  onClick={() => {
                    const current = filters.districts;
                    const updated = current.includes(district)
                      ? current.filter((d: string) => d !== district)
                      : [...current, district];
                    setFilters({ ...filters, districts: updated });
                  }}
                  className={`cursor-pointer rounded-full border-2 transition-all ${
                    filters.districts.includes(district)
                      ? 'bg-[var(--flare-green)] text-white border-[var(--flare-green)]'
                      : 'bg-white text-[var(--flare-text)] border-border hover:bg-muted'
                  }`}
                >
                  {district}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setFilters({ maxRent: 800, minRooms: 1, districts: [], availableFrom: '' })}
              className="flex-1 rounded-full border-2"
            >
              Reset
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WGDetailModal({
  wg,
  onClose,
  onLike
}: {
  wg: WGListing;
  onClose: () => void;
  onLike: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md p-0 overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-64 bg-muted">
          <img
            src={wg.images[currentImageIndex]}
            alt={wg.name}
            className="w-full h-full object-cover"
          />
          
          {/* Image Indicators */}
          {wg.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {wg.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-6'
                      : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Match Score Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-[var(--flare-green)] text-white rounded-full shadow-lg">
            <span className="text-sm">{wg.matchScore}% Match</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div>
            <h2 className="text-[var(--flare-text)] mb-2">{wg.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={16} />
              <span className="text-sm">{wg.location}, {wg.district}</span>
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 rounded-xl border-border text-center">
              <Euro size={20} className="mx-auto mb-1 text-[var(--flare-green)]" />
              <p className="text-sm text-muted-foreground mb-1">Rent</p>
              <p className="text-[var(--flare-text)]">€{wg.rent}</p>
            </Card>
            <Card className="p-3 rounded-xl border-border text-center">
              <Users size={20} className="mx-auto mb-1 text-[var(--flare-green)]" />
              <p className="text-sm text-muted-foreground mb-1">Roommates</p>
              <p className="text-[var(--flare-text)]">{wg.roommates}/{wg.totalRooms}</p>
            </Card>
            <Card className="p-3 rounded-xl border-border text-center">
              <Home size={20} className="mx-auto mb-1 text-[var(--flare-green)]" />
              <p className="text-sm text-muted-foreground mb-1">Size</p>
              <p className="text-[var(--flare-text)]">{wg.size}m²</p>
            </Card>
          </div>

          {/* Available From */}
          <div className="flex items-center gap-2 p-3 bg-[var(--flare-green)]/10 rounded-xl">
            <Calendar size={18} className="text-[var(--flare-green-dark)]" />
            <span className="text-sm text-[var(--flare-text)]">
              Available from {wg.availableFrom}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[var(--flare-text)] mb-2">About this WG</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {wg.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-[var(--flare-text)] mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {wg.amenities.map((amenity) => (
                <Badge
                  key={amenity}
                  className="bg-muted text-[var(--flare-text)] border-0 rounded-full"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
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
            <Button
              onClick={() => {
                onLike();
                onClose();
              }}
              className="flex-1 rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
            >
              <Heart size={18} className="mr-2" />
              Like WG
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}