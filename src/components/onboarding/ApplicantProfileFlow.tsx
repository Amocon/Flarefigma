import { useState } from 'react';
import { ChevronLeft, Camera, User, MapPin, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ApplicantProfileFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type Step = 1 | 2 | 3 | 4;

export function ApplicantProfileFlow({ onComplete, onBack }: ApplicantProfileFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const allInterests = [
    'Cooking', 'Running', 'Board Games', 'Photography', 'Coffee', 'Music', 
    'Sports', 'Reading', 'Gaming', 'Art', 'Travel', 'Dancing', 'Yoga', 
    'Hiking', 'Movies', 'Cycling'
  ];

  const cities = [
    'Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 
    'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dresden'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return name.trim() !== '' && age.trim() !== '' && occupation.trim() !== '';
      case 2:
        return true; // Photo is optional
      case 3:
        return selectedInterests.length > 0;
      case 4:
        return city.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleBack} className="text-white">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-white">Create Your Profile</h2>
          <div className="w-6" /> {/* Spacer */}
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/80">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <User size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">About You</h3>
              <p className="text-sm text-muted-foreground">
                Let's start with the basics
              </p>
            </div>

            <div>
              <Label htmlFor="name" className="text-sm mb-2 block">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Anna Müller"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age" className="text-sm mb-2 block">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="occupation" className="text-sm mb-2 block">
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  placeholder="Student"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm mb-2 block">
                About Me
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell potential flatmates a bit about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="rounded-xl min-h-[100px]"
              />
            </div>
          </div>
        )}

        {/* Step 2: Photo Upload */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <Camera size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Add a Photo</h3>
              <p className="text-sm text-muted-foreground">
                Help flatmates get to know you
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* Photo Upload */}
              <div className="relative">
                <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-border bg-muted hover:bg-muted/80 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <Camera size={32} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload Photo</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  💡 You can add more photos later in your profile
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Interests & Tags */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="mb-2">Your Interests</h3>
              <p className="text-sm text-muted-foreground">
                Select what you're passionate about
              </p>
            </div>

            <div>
              <Label className="text-sm mb-3 block">
                Choose at least 3 interests ({selectedInterests.length} selected)
              </Label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map((interest) => (
                  <Badge
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`cursor-pointer transition-colors rounded-full ${
                      selectedInterests.includes(interest)
                        ? 'bg-[var(--flare-green)] text-white hover:bg-[var(--flare-green-dark)]'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--flare-highlight)]/30 border border-[var(--flare-highlight)]">
              <p className="text-xs text-muted-foreground text-center">
                💡 These help WGs find flatmates with similar interests
              </p>
            </div>
          </div>
        )}

        {/* Step 4: City & Visibility */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <MapPin size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Where Are You Looking?</h3>
              <p className="text-sm text-muted-foreground">
                Choose your preferred city
              </p>
            </div>

            <div>
              <Label htmlFor="city" className="text-sm mb-2 block">
                City
              </Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((cityOption) => (
                    <SelectItem key={cityOption} value={cityOption}>
                      {cityOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Visibility Toggle */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {isVisible ? (
                    <Eye size={20} className="text-[var(--flare-green)] shrink-0 mt-0.5" />
                  ) : (
                    <EyeOff size={20} className="text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div>
                    <Label className="text-sm">Profile Visibility</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isVisible 
                        ? 'WGs can discover your profile' 
                        : 'Only you can search for WGs'
                      }
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={isVisible}
                  onCheckedChange={setIsVisible}
                  className="data-[state=checked]:bg-[var(--flare-green)]"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--flare-green)]/10 border border-[var(--flare-green)]">
              <p className="text-sm text-center">
                ✓ You can change these settings anytime
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-border bg-white">
        <Button
          className="w-full rounded-xl"
          size="lg"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === 4 ? 'Start Searching' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
