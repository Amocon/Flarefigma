import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Badge } from './ui/badge';

interface FilterSheetProps {
  onApplyFilters?: (filters: FilterState) => void;
}

interface FilterState {
  priceRange: number[];
  location: string[];
  genderMix: string;
  petsAllowed: boolean;
  wgSize: number[];
}

export function FilterSheet({ onApplyFilters }: FilterSheetProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [300, 800],
    location: [],
    genderMix: 'any',
    petsAllowed: false,
    wgSize: [2, 5],
  });

  const locations = [
    'Kreuzberg', 'Friedrichshain', 'Mitte', 'Neukölln', 
    'Prenzlauer Berg', 'Charlottenburg', 'Schöneberg'
  ];

  const genderOptions = [
    { value: 'any', label: 'Any' },
    { value: 'mixed', label: 'Mixed' },
    { value: 'female', label: 'Female Only' },
    { value: 'male', label: 'Male Only' },
  ];

  const toggleLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter(l => l !== location)
        : [...prev.location, location]
    }));
  };

  const handleApply = () => {
    onApplyFilters?.(filters);
  };

  const handleReset = () => {
    setFilters({
      priceRange: [300, 800],
      location: [],
      genderMix: 'any',
      petsAllowed: false,
      wgSize: [2, 5],
    });
  };

  const activeFiltersCount = 
    (filters.location.length > 0 ? 1 : 0) +
    (filters.genderMix !== 'any' ? 1 : 0) +
    (filters.petsAllowed ? 1 : 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-2xl relative"
          size="lg"
        >
          <SlidersHorizontal size={20} className="mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-[var(--flare-green)] text-white border-0 rounded-full px-2 py-0 h-5">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="mb-6">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Customize your WG search preferences
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto h-[calc(85vh-180px)] pb-6">
          {/* Price Range */}
          <div>
            <Label className="mb-3 block">
              Budget: €{filters.priceRange[0]} - €{filters.priceRange[1]}/month
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
              min={200}
              max={1500}
              step={50}
              className="[&_[role=slider]]:bg-[var(--flare-green)] [&_[role=slider]]:border-[var(--flare-green)]"
            />
          </div>

          {/* Location */}
          <div>
            <Label className="mb-3 block">Districts</Label>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Badge
                  key={location}
                  onClick={() => toggleLocation(location)}
                  className={`cursor-pointer transition-colors rounded-full ${
                    filters.location.includes(location)
                      ? 'bg-[var(--flare-green)] text-white hover:bg-[var(--flare-green-dark)]'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          {/* WG Size */}
          <div>
            <Label className="mb-3 block">
              WG Size: {filters.wgSize[0]} - {filters.wgSize[1]} people
            </Label>
            <Slider
              value={filters.wgSize}
              onValueChange={(value) => setFilters(prev => ({ ...prev, wgSize: value }))}
              min={2}
              max={8}
              step={1}
              className="[&_[role=slider]]:bg-[var(--flare-green)] [&_[role=slider]]:border-[var(--flare-green)]"
            />
          </div>

          {/* Gender Mix */}
          <div>
            <Label className="mb-3 block">Gender Mix</Label>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((option) => (
                <Badge
                  key={option.value}
                  onClick={() => setFilters(prev => ({ ...prev, genderMix: option.value }))}
                  className={`cursor-pointer transition-colors rounded-full ${
                    filters.genderMix === option.value
                      ? 'bg-[var(--flare-green)] text-white hover:bg-[var(--flare-green-dark)]'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pets Allowed */}
          <div className="flex items-center justify-between bg-muted rounded-2xl p-4">
            <Label>Pets Allowed</Label>
            <Switch
              checked={filters.petsAllowed}
              onCheckedChange={(checked) => setFilters(prev => ({ ...prev, petsAllowed: checked }))}
              className="data-[state=checked]:bg-[var(--flare-green)]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t flex gap-3">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 rounded-2xl h-12"
          >
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] text-white rounded-2xl h-12"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
