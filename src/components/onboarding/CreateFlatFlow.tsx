import { useState } from 'react';
import { ChevronLeft, Home, MapPin, Euro, Camera, Plus, CheckCircle, Link as LinkIcon, Copy, Layout, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CreateFlatFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

export function CreateFlatFlow({ onComplete, onBack }: CreateFlatFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [flatName, setFlatName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Berlin');
  const [rooms, setRooms] = useState([{ size: '', rent: '' }]);
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [inviteCode, setInviteCode] = useState('FLARE-' + Math.random().toString(36).substr(2, 6).toUpperCase());

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < 5) {
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

  const addRoom = () => {
    setRooms([...rooms, { size: '', rent: '' }]);
  };

  const removeRoom = (index: number) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const updateRoom = (index: number, field: 'size' | 'rent', value: string) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return flatName.trim() !== '' && address.trim() !== '';
      case 2:
        return rooms.every(room => room.size && room.rent);
      case 3:
        return true; // Photos are optional
      case 4:
        return true; // Description and rules are optional
      case 5:
        return true;
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
          <h2 className="text-white">Create Your Flat</h2>
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
        {/* Step 1: Flat Name & Address */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <Home size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Flat Details</h3>
              <p className="text-sm text-muted-foreground">
                Let's start with the basics
              </p>
            </div>

            <div>
              <Label htmlFor="flat-name" className="text-sm mb-2 block">
                Flat Name
              </Label>
              <Input
                id="flat-name"
                placeholder="e.g., Cozy Kreuzberg WG"
                value={flatName}
                onChange={(e) => setFlatName(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-sm mb-2 block">
                Address
              </Label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="Street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="city" className="text-sm mb-2 block">
                City
              </Label>
              <Input
                id="city"
                placeholder="Berlin"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Step 2: Add Rooms */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <Home size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Room Details</h3>
              <p className="text-sm text-muted-foreground">
                Add information about available rooms
              </p>
            </div>

            {/* Smart Upload Option */}
            <div className="bg-gradient-to-br from-[var(--flare-green)]/10 to-[var(--flare-highlight)]/30 border border-[var(--flare-green)] rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--flare-green)] flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm mb-1">Smart Floor Plan Upload</h4>
                  <p className="text-xs text-muted-foreground">
                    Upload your floor plan and let AI detect rooms automatically
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-xl bg-white"
                onClick={() => {
                  // This would trigger floor plan upload flow
                  alert('Floor Plan Upload feature - See dedicated Floor Plan Demo!');
                }}
              >
                <Layout size={16} className="mr-2" />
                Upload Floor Plan
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#fafafa] px-2 text-muted-foreground">
                  Or add manually
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {rooms.map((room, index) => (
                <div key={index} className="bg-white rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm">Room {index + 1}</h4>
                    {rooms.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRoom(index)}
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs mb-1 block">Size (m²)</Label>
                      <Input
                        placeholder="18"
                        value={room.size}
                        onChange={(e) => updateRoom(index, 'size', e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Rent (€/mo)</Label>
                      <div className="relative">
                        <Euro size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="450"
                          value={room.rent}
                          onChange={(e) => updateRoom(index, 'rent', e.target.value)}
                          className="pl-7 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={addRoom}
            >
              <Plus size={18} className="mr-2" />
              Add Another Room
            </Button>
          </div>
        )}

        {/* Step 3: Upload Photos */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <Camera size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Add Photos</h3>
              <p className="text-sm text-muted-foreground">
                Show off your flat with some great pictures
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Photo Upload Placeholders */}
              <button className="aspect-square rounded-2xl border-2 border-dashed border-border bg-muted hover:bg-muted/80 transition-colors flex flex-col items-center justify-center gap-2">
                <Camera size={24} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add Photo</span>
              </button>
              <button className="aspect-square rounded-2xl border-2 border-dashed border-border bg-muted hover:bg-muted/80 transition-colors flex flex-col items-center justify-center gap-2">
                <Plus size={24} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add More</span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                💡 You can add photos later in your profile
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Description & Rules */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <CheckCircle size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">Tell Your Story</h3>
              <p className="text-sm text-muted-foreground">
                Help applicants understand your flat
              </p>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Tell potential flatmates about your WG, the atmosphere, and what you're looking for..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="rules" className="text-sm mb-2 block">
                House Rules (Optional)
              </Label>
              <Textarea
                id="rules"
                placeholder="e.g., Quiet hours after 10pm, No smoking indoors..."
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                className="rounded-xl min-h-[100px]"
              />
            </div>
          </div>
        )}

        {/* Step 5: Invite Code */}
        {currentStep === 5 && (
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--flare-green)]/10 mb-4">
                <LinkIcon size={32} className="text-[var(--flare-green)]" />
              </div>
              <h3 className="mb-2">You're All Set! 🎉</h3>
              <p className="text-sm text-muted-foreground">
                Share this invite code with your flatmates
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
              <Label className="text-sm mb-3 block text-center">
                Invite Code
              </Label>
              <div className="bg-muted rounded-xl p-4 mb-4">
                <p className="text-center text-2xl tracking-wider">
                  {inviteCode}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={copyInviteCode}
              >
                <Copy size={18} className="mr-2" />
                Copy Code
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--flare-highlight)]/30 border border-[var(--flare-highlight)]">
              <p className="text-xs text-muted-foreground text-center">
                💡 Your flatmates can use this code to join your WG
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
          {currentStep === 5 ? 'Get Started' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
