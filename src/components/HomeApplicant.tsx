import { SlidersHorizontal, LayoutGrid, Map, Layers, Heart, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { FilterSheet } from './FilterSheet';
import { WGCard } from './WGCard';
import { WGMapView } from './WGMapView';
import { SwipeableWGCard } from './SwipeableWGCard';
import { WGDetailSheet } from './WGDetailSheet';
import { ApplicationModal } from './ApplicationModal';
import { useState } from 'react';

type ViewMode = 'cards' | 'map' | 'swipe';

export function HomeApplicant() {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selectedWG, setSelectedWG] = useState<string | null>(null);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  const [likedWGs, setLikedWGs] = useState<string[]>([]);

  // Mock WG data
  const wgListings = [
    {
      id: '1',
      name: 'Cozy Kreuzberg WG',
      district: 'Kreuzberg',
      address: 'Oranienstraße 45, 10969 Berlin',
      price: 450,
      photos: [
        'https://images.unsplash.com/photo-1662454419622-a41092ecd245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MTU0NzYxNHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1616418928117-4e6d19be2df1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTU5MTE2NXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1593853761096-d0423b545cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBraXRjaGVuJTIwYXBhcnRtZW50fGVufDF8fHx8MTc2MTU5NTc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      residents: 3,
      vibe: ['Open-minded', 'Social', 'Clean', 'Cooking'],
      size: '15m²',
      availableFrom: 'Dec 1, 2025',
      distance: '2.3 km away',
      description: 'We are a friendly WG of 3 people looking for a fourth flatmate. We love cooking together and occasional movie nights. The apartment is bright, recently renovated, and perfectly located in the heart of Kreuzberg. We value cleanliness, respect, and good vibes. Non-smokers preferred.',
      members: [
        {
          name: 'Sophie',
          age: 27,
          photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHx8MTc2MTUyNzUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Graphic Designer',
        },
        {
          name: 'Max',
          age: 29,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE1Mjc1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Software Engineer',
        },
        {
          name: 'Lena',
          age: 25,
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTUyNzUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Teacher',
        },
      ],
      amenities: ['Wi-Fi', 'Washing Machine', 'Dishwasher', 'Balcony', 'Furnished', 'Central Heating'],
      rules: ['No smoking inside', 'Shared cleaning schedule', 'Quiet hours after 10 PM', 'Guests welcome with notice'],
      lat: 52.5,
      lng: 13.4,
    },
    {
      id: '2',
      name: 'Bright Mitte Apartment',
      district: 'Mitte',
      address: 'Torstraße 89, 10119 Berlin',
      price: 580,
      photos: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1Mjc1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1616418928117-4e6d19be2df1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTU5MTE2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      residents: 2,
      vibe: ['Quiet', 'Professional', 'Respectful'],
      size: '18m²',
      availableFrom: 'Jan 15, 2026',
      distance: '3.8 km away',
      description: 'Modern WG with two working professionals. We value quiet time but enjoy occasional dinners together. Perfect for focused individuals.',
      members: [
        {
          name: 'Tom',
          age: 31,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE1Mjc1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Architect',
        },
        {
          name: 'Julia',
          age: 28,
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTUyNzUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Marketing Manager',
        },
      ],
      amenities: ['Wi-Fi', 'Balcony', 'Furnished', 'Bike Storage'],
      rules: ['No smoking', 'Quiet after 10 PM', 'Clean common areas weekly'],
      lat: 52.52,
      lng: 13.39,
    },
    {
      id: '3',
      name: 'Friedrichshain Family',
      district: 'Friedrichshain',
      address: 'Warschauer Straße 23, 10243 Berlin',
      price: 520,
      photos: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjE1Mjc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1597497522150-2f50bffea452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmbGF0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxNjYxODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      residents: 4,
      vibe: ['Fun', 'Active', 'Music-loving', 'Creative'],
      size: '16m²',
      availableFrom: 'Nov 20, 2025',
      distance: '1.5 km away',
      description: 'Lively WG with music and art enthusiasts. We host regular jam sessions and art nights. Looking for someone creative and sociable!',
      members: [
        {
          name: 'Alex',
          age: 26,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE1Mjc1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Musician',
        },
        {
          name: 'Emma',
          age: 24,
          photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHx8MTc2MTUyNzUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Artist',
        },
        {
          name: 'David',
          age: 27,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE1Mjc1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'DJ',
        },
        {
          name: 'Sarah',
          age: 25,
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTUyNzUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
          occupation: 'Photographer',
        },
      ],
      amenities: ['Music Room', 'Wi-Fi', 'Rooftop Access', 'Pet-Friendly'],
      rules: ['Respectful noise levels', 'Pet-friendly', 'Shared groceries optional'],
      lat: 52.51,
      lng: 13.45,
    },
  ];

  const handleWGClick = (id: string) => {
    setSelectedWG(id);
    setShowDetailSheet(true);
  };

  const handleApply = () => {
    setShowDetailSheet(false);
    setShowApplicationModal(true);
  };

  const handleSwipeLike = () => {
    if (currentSwipeIndex < wgListings.length) {
      setLikedWGs([...likedWGs, wgListings[currentSwipeIndex].id]);
      setSelectedWG(wgListings[currentSwipeIndex].id);
      setShowApplicationModal(true);
    }
  };

  const handleSwipeSkip = () => {
    if (currentSwipeIndex < wgListings.length) {
      setCurrentSwipeIndex(currentSwipeIndex + 1);
    }
  };

  const handleUndo = () => {
    if (currentSwipeIndex > 0) {
      setCurrentSwipeIndex(currentSwipeIndex - 1);
      setLikedWGs(likedWGs.slice(0, -1));
    }
  };

  const currentSwipeWG = wgListings[currentSwipeIndex];
  const selectedWGDetail = wgListings.find(wg => wg.id === selectedWG);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white mb-1">Find Your WG</h1>
            <p className="text-white/90 text-sm">
              {wgListings.length} available in Berlin
            </p>
          </div>
          
          <FilterSheet onApplyFilters={(filters) => console.log('Filters:', filters)} />
        </div>

        {/* View Mode Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 flex gap-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-[var(--flare-green-dark)]'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <LayoutGrid size={18} />
            <span className="text-sm">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
              viewMode === 'map'
                ? 'bg-white text-[var(--flare-green-dark)]'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Map size={18} />
            <span className="text-sm">Map</span>
          </button>
          <button
            onClick={() => setViewMode('swipe')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
              viewMode === 'swipe'
                ? 'bg-white text-[var(--flare-green-dark)]'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Layers size={18} />
            <span className="text-sm">Swipe</span>
          </button>
        </div>
      </div>

      {/* Content based on view mode */}
      <div className="px-6 mt-6">
        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="space-y-4">
            {wgListings.map((wg) => (
              <WGCard
                key={wg.id}
                {...wg}
                onClick={() => handleWGClick(wg.id)}
              />
            ))}
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <WGMapView 
            listings={wgListings}
            onSelectWG={handleWGClick}
          />
        )}

        {/* Swipe View */}
        {viewMode === 'swipe' && (
          <div className="space-y-4">
            {currentSwipeWG ? (
              <>
                <SwipeableWGCard
                  {...currentSwipeWG}
                  onLike={handleSwipeLike}
                  onSkip={handleSwipeSkip}
                />
                
                {/* Undo Button */}
                {currentSwipeIndex > 0 && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleUndo}
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <RotateCcw size={16} className="mr-2" />
                      Undo
                    </Button>
                  </div>
                )}

                {/* Progress */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Viewing {currentSwipeIndex + 1} of {wgListings.length}
                  </p>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--flare-green)] transition-all duration-300"
                      style={{ width: `${((currentSwipeIndex + 1) / wgListings.length) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl border border-border p-12 text-center">
                <div className="bg-[var(--flare-highlight)] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Heart size={40} className="text-[var(--flare-green)]" />
                </div>
                <h2 className="mb-2">No more WGs to show</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  You've viewed all available WGs.
                  <br />
                  Try adjusting your filters or check back later.
                </p>
                <Button
                  onClick={() => setCurrentSwipeIndex(0)}
                  className="bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] text-white rounded-2xl"
                >
                  View Again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* WG Detail Sheet */}
      {selectedWGDetail && (
        <WGDetailSheet
          wg={selectedWGDetail}
          open={showDetailSheet}
          onClose={() => setShowDetailSheet(false)}
          onApply={handleApply}
        />
      )}

      {/* Application Modal */}
      <ApplicationModal
        wgName={selectedWGDetail?.name || ''}
        open={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={(data) => {
          console.log('Application submitted:', data);
          setShowApplicationModal(false);
          if (viewMode === 'swipe') {
            setCurrentSwipeIndex(currentSwipeIndex + 1);
          }
        }}
      />
    </div>
  );
}
