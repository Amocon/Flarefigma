import { Home as HomeIcon, Settings, Users, LayoutList, Layers, RotateCcw } from 'lucide-react';
import { ApplicantCard } from './ApplicantCard';
import { ApplicantSwipeCard } from './ApplicantSwipeCard';
import { ApplicantDetailModal } from './ApplicantDetailModal';
import { SearchParametersModal, SearchParameters } from './SearchParametersModal';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState } from 'react';

type ViewMode = 'list' | 'swipe';

export function HomeResident() {
  const [wgStatus, setWgStatus] = useState<'searching' | 'full' | 'inactive'>('searching');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showSearchParams, setShowSearchParams] = useState(false);
  const [showApplicantDetail, setShowApplicantDetail] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);

  const wgMembers = [
    {
      id: '1',
      name: 'Sophie',
      photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHx8MTc2MTUyNzUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'Max',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE1Mjc1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'Lena',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTUyNzUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];
  
  const applicants = [
    {
      id: '1',
      name: 'Sarah Weber',
      age: 26,
      photo: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU4Njk3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      photos: [
        'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU4Njk3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHx8MTc2MTUyNzUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      location: 'Berlin Mitte',
      occupation: 'Software Engineer',
      intro: 'Software engineer who loves cooking and hiking. Non-smoker, clean, and sociable! Looking for a friendly WG where people respect each other and enjoy hanging out together.',
      interests: ['Cooking', 'Hiking', 'Board Games', 'Reading', 'Yoga'],
      lookingFor: 'Looking for a clean, social WG with people who enjoy cooking together and occasional hangouts. I value respect and open communication.',
      moveInDate: 'December 15, 2025',
      email: 'sarah.weber@email.com',
      phone: '+49 157 98765432',
      references: 'Previous landlord: Anna Schmidt (anna@email.com)\nFormer flatmate: Tom Meyer (tom@email.com)',
      applicationDate: 'October 25, 2025',
    },
    {
      id: '2',
      name: 'Max Schmidt',
      age: 24,
      photo: 'https://images.unsplash.com/photo-1611695434398-4f4b330623e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU2MTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Berlin Kreuzberg',
      occupation: 'Architecture Student',
      intro: 'Architecture student, quiet and organized. Looking for a relaxed WG to focus on studies. I enjoy photography and cycling in my free time.',
      interests: ['Photography', 'Coffee', 'Architecture', 'Cycling'],
      lookingFor: 'Seeking a quiet, organized WG with respectful flatmates who understand the need for study time.',
      moveInDate: 'January 1, 2026',
      applicationDate: 'October 26, 2025',
    },
    {
      id: '3',
      name: 'Emma Fischer',
      age: 27,
      photo: 'https://images.unsplash.com/photo-1714994632322-596ae9ba4bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNTQwNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Berlin Friedrichshain',
      occupation: 'Graphic Designer',
      intro: 'Graphic designer who loves plants and indie music. Enjoys cooking together and game nights! Non-smoker, LGBTQ+ friendly, and very clean.',
      interests: ['Design', 'Music', 'Plants', 'Cooking', 'Gaming', 'Art'],
      lookingFor: 'Looking for a creative, open-minded WG with people who love good vibes, music, and occasional game nights.',
      moveInDate: 'November 30, 2025',
      email: 'emma.fischer@email.com',
      applicationDate: 'October 27, 2025',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'searching':
        return <Badge className="bg-[var(--flare-green)] text-white border-0">Searching</Badge>;
      case 'full':
        return <Badge className="bg-muted text-muted-foreground border-0">Full</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-200 text-gray-600 border-0">Inactive</Badge>;
      default:
        return null;
    }
  };

  const handleViewApplicant = (applicant: any) => {
    setSelectedApplicant(applicant);
    setShowApplicantDetail(true);
  };

  const handleChat = (applicantId: string) => {
    console.log('Start chat with', applicantId);
    setShowApplicantDetail(false);
  };

  const handleInvite = (applicantId: string) => {
    console.log('Invite applicant', applicantId);
  };

  const handleSwipeDismiss = () => {
    if (currentSwipeIndex < applicants.length - 1) {
      setCurrentSwipeIndex(currentSwipeIndex + 1);
    }
  };

  const handleSwipeChat = () => {
    const applicant = applicants[currentSwipeIndex];
    handleChat(applicant.id);
    if (currentSwipeIndex < applicants.length - 1) {
      setCurrentSwipeIndex(currentSwipeIndex + 1);
    }
  };

  const handleUndo = () => {
    if (currentSwipeIndex > 0) {
      setCurrentSwipeIndex(currentSwipeIndex - 1);
    }
  };

  const handleSaveSearchParams = (params: SearchParameters) => {
    console.log('Saved search parameters:', params);
  };

  const currentSwipeApplicant = applicants[currentSwipeIndex];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <HomeIcon size={24} />
            </div>
            <div>
              <h1 className="text-white mb-1">Cozy Kreuzberg WG</h1>
              <p className="text-white/90 text-sm">Kreuzberg, Berlin</p>
            </div>
          </div>
          {getStatusBadge(wgStatus)}
        </div>
        
        {/* Status Info & Edit Button */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm mb-1">Current Status</p>
              <p className="text-white">Looking for 1 new flatmate</p>
            </div>
            <button
              onClick={() => setShowSearchParams(true)}
              className="text-white bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <Settings size={16} />
              <span className="text-sm">Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applicants Section */}
      <div className="px-6 mt-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2>Applicants</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {applicants.length} people interested
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="bg-muted rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutList size={16} />
              <span className="text-sm">List</span>
            </button>
            <button
              onClick={() => {
                setViewMode('swipe');
                setCurrentSwipeIndex(0);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                viewMode === 'swipe'
                  ? 'bg-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Layers size={16} />
              <span className="text-sm">Swipe</span>
            </button>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <ApplicantCard 
                key={applicant.id} 
                {...applicant}
                onViewProfile={() => handleViewApplicant(applicant)}
                onChat={() => handleChat(applicant.id)}
                onInvite={() => handleInvite(applicant.id)}
              />
            ))}
          </div>
        )}

        {/* Swipe View */}
        {viewMode === 'swipe' && (
          <div className="space-y-4">
            {currentSwipeApplicant ? (
              <>
                <ApplicantSwipeCard
                  {...currentSwipeApplicant}
                  onChat={handleSwipeChat}
                  onDismiss={handleSwipeDismiss}
                  onViewDetails={() => handleViewApplicant(currentSwipeApplicant)}
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
                    Viewing {currentSwipeIndex + 1} of {applicants.length}
                  </p>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--flare-green)] transition-all duration-300"
                      style={{ width: `${((currentSwipeIndex + 1) / applicants.length) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl border border-border p-12 text-center">
                <div className="bg-[var(--flare-highlight)] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users size={40} className="text-[var(--flare-green)]" />
                </div>
                <h2 className="mb-2">All done!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  You've reviewed all applicants.
                  <br />
                  Check back later for new applications.
                </p>
                <Button
                  onClick={() => setCurrentSwipeIndex(0)}
                  className="bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] text-white rounded-2xl"
                >
                  Review Again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Availability Calendar */}
      <div className="px-6 mt-8">
        <AvailabilityCalendar 
          members={wgMembers}
          currentUserId="1" // Sophie is the current user
        />
      </div>

      {/* Search Parameters Modal */}
      <SearchParametersModal
        open={showSearchParams}
        onClose={() => setShowSearchParams(false)}
        onSave={handleSaveSearchParams}
      />

      {/* Applicant Detail Modal */}
      <ApplicantDetailModal
        applicant={selectedApplicant}
        open={showApplicantDetail}
        onClose={() => setShowApplicantDetail(false)}
        onChat={() => selectedApplicant && handleChat(selectedApplicant.id)}
        onInvite={() => selectedApplicant && handleInvite(selectedApplicant.id)}
      />
    </div>
  );
}
