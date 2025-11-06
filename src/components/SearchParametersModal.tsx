import { X, Settings, Users, FileText, Hash, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface SearchParametersModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (params: SearchParameters) => void;
  currentParams?: SearchParameters;
}

export interface SearchParameters {
  maxApplications: number;
  wgDescription: string;
  tags: string[];
  autoHideWhenFull: boolean;
  autoRejectAfterDays: number;
}

export function SearchParametersModal({ 
  open, 
  onClose, 
  onSave,
  currentParams 
}: SearchParametersModalProps) {
  const [maxApplications, setMaxApplications] = useState(
    currentParams?.maxApplications || 20
  );
  const [description, setDescription] = useState(
    currentParams?.wgDescription || 'Friendly WG with 3 people looking for a fourth flatmate. We love cooking together and occasional movie nights.'
  );
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(
    currentParams?.tags || ['Social', 'Clean', 'Cooking', 'Open-minded']
  );
  const [autoHide, setAutoHide] = useState(
    currentParams?.autoHideWhenFull ?? true
  );
  const [autoRejectDays, setAutoRejectDays] = useState(
    currentParams?.autoRejectAfterDays || 14
  );

  const allAvailableTags = [
    'Social', 'Quiet', 'Clean', 'Cooking', 'Open-minded', 
    'Party-friendly', 'LGBTQ+ friendly', 'Pet-friendly', 
    'Vegetarian', 'Vegan', 'Non-smoker', 'Music-loving',
    'Sports', 'Gaming', 'Art', 'Professional', 'Students'
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      handleRemoveTag(tag);
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSave = () => {
    onSave({
      maxApplications,
      wgDescription: description,
      tags,
      autoHideWhenFull: autoHide,
      autoRejectAfterDays: autoRejectDays,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[92vh] overflow-hidden p-0 gap-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 py-5 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Settings size={20} />
              </div>
              <h3 className="text-white">Search Parameters</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-white/90 text-sm">Control how applicants find your WG</p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-180px)] px-6 py-6 space-y-6">
          {/* Max Applications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Users size={16} className="text-[var(--flare-green)]" />
                Maximum Applications
              </Label>
              <span className="text-2xl">{maxApplications}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              After reaching this number, your WG will be automatically hidden from search results
            </p>
            <Slider
              value={[maxApplications]}
              onValueChange={(value) => setMaxApplications(value[0])}
              min={5}
              max={100}
              step={5}
              className="[&_[role=slider]]:bg-[var(--flare-green)] [&_[role=slider]]:border-[var(--flare-green)]"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 applications</span>
              <span>100 applications</span>
            </div>
          </div>

          <Separator />

          {/* Auto-hide Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="text-sm">Auto-hide when full</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically hide WG from search when you mark status as "Full"
                </p>
              </div>
              <Switch 
                checked={autoHide}
                onCheckedChange={setAutoHide}
              />
            </div>
          </div>

          <Separator />

          {/* Auto-reject after days */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <AlertCircle size={16} className="text-[var(--flare-green)]" />
              Auto-reject old applications
            </Label>
            <p className="text-xs text-muted-foreground">
              Automatically decline applications older than {autoRejectDays} days
            </p>
            <Slider
              value={[autoRejectDays]}
              onValueChange={(value) => setAutoRejectDays(value[0])}
              min={7}
              max={30}
              step={1}
              className="[&_[role=slider]]:bg-[var(--flare-green)] [&_[role=slider]]:border-[var(--flare-green)]"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>7 days</span>
              <span>30 days</span>
            </div>
          </div>

          <Separator />

          {/* WG Description */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <FileText size={16} className="text-[var(--flare-green)]" />
              WG Description
            </Label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="rounded-xl resize-none"
              placeholder="Describe your WG, the vibe, and what you're looking for in a flatmate..."
            />
            <p className="text-xs text-muted-foreground">
              {description.length} / 500 characters
            </p>
          </div>

          <Separator />

          {/* Tags */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Hash size={16} className="text-[var(--flare-green)]" />
              WG Vibe Tags
            </Label>
            <p className="text-xs text-muted-foreground">
              Help applicants understand your WG's personality and lifestyle
            </p>

            {/* Selected Tags */}
            {tags.length > 0 && (
              <div className="bg-muted rounded-xl p-4">
                <p className="text-xs mb-2">Selected Tags ({tags.length})</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-[var(--flare-green)] text-white border-0 cursor-pointer hover:bg-[var(--flare-green-dark)]"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Select Tags */}
            <div>
              <p className="text-xs mb-2">Quick Select</p>
              <div className="flex flex-wrap gap-2">
                {allAvailableTags
                  .filter(tag => !tags.includes(tag))
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => toggleTag(tag)}
                    >
                      + {tag}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Custom Tag Input */}
            <div className="space-y-2">
              <p className="text-xs">Add Custom Tag</p>
              <div className="flex gap-2">
                <Input 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Type a custom tag..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddTag}
                  variant="outline"
                  disabled={!tagInput.trim()}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-[var(--flare-highlight)]/30 rounded-xl p-4 border border-[var(--flare-highlight)]">
            <p className="text-sm">
              💡 <span>Detailed descriptions and accurate tags increase quality applications by 60%</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 bg-white sticky bottom-0">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
