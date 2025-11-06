import { useState } from 'react';
import { MessageSquare, Send, Bookmark, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

interface WGListing {
  id: number;
  name: string;
  location: string;
  district: string;
  rent: number;
  image: string;
  description: string;
  question?: string;
}

interface ApplicationModalProps {
  wg: WGListing | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (wgId: number, answer: string) => void;
  onSaveForLater: (wgId: number) => void;
}

export function ApplicationModal({
  wg,
  isOpen,
  onClose,
  onSubmit,
  onSaveForLater
}: ApplicationModalProps) {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxChars = 100;

  if (!wg) return null;

  const handleSubmit = () => {
    if (answer.trim().length === 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(wg.id, answer);
      setAnswer('');
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  const handleSaveForLater = () => {
    onSaveForLater(wg.id);
    setAnswer('');
    onClose();
  };

  const handleClose = () => {
    setAnswer('');
    onClose();
  };

  // Default question if none provided
  const question = wg.question || "Tell us why you'd be a great fit for our WG!";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-3xl max-w-md p-0 overflow-hidden">
        {/* Header with WG Image */}
        <div className="relative h-40 bg-muted">
          <img
            src={wg.image}
            alt={wg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* WG Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-white mb-1">{wg.name}</h3>
            <p className="text-sm text-white/90">{wg.location}, {wg.district}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Title with Icon */}
          <DialogHeader>
            <DialogTitle className="text-[var(--flare-text)] flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
                <MessageSquare size={18} className="text-[var(--flare-green)]" />
              </div>
              Confirm Application
            </DialogTitle>
          </DialogHeader>

          {/* Short Description */}
          <div className="bg-muted p-3 rounded-xl">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {wg.description}
            </p>
          </div>

          {/* Question from Residents */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full">
                Question from residents
              </Badge>
            </div>
            <p className="text-sm text-[var(--flare-text)] mb-3">
              {question}
            </p>

            {/* Answer Input */}
            <div className="space-y-2">
              <Textarea
                value={answer}
                onChange={(e) => {
                  const text = e.target.value;
                  if (text.length <= maxChars) {
                    setAnswer(text);
                  }
                }}
                placeholder="Write your answer here..."
                className="min-h-[100px] resize-none rounded-xl bg-muted border-border focus:border-[var(--flare-green)] focus:ring-[var(--flare-green)]"
                maxLength={maxChars}
              />
              
              {/* Character Counter */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Keep it short and friendly
                </p>
                <p className={`text-xs transition-colors ${
                  answer.length >= maxChars 
                    ? 'text-[var(--flare-brown)]' 
                    : answer.length >= maxChars * 0.8
                    ? 'text-[var(--flare-highlight)]'
                    : 'text-muted-foreground'
                }`}>
                  {answer.length}/{maxChars}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleSubmit}
              disabled={answer.trim().length === 0 || isSubmitting}
              className="w-full rounded-full bg-[var(--flare-brown)] hover:bg-[#6d4a2d] text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Application
                </>
              )}
            </Button>

            <Button
              onClick={handleSaveForLater}
              variant="outline"
              className="w-full rounded-full border-2 border-[var(--flare-green)] text-[var(--flare-green-dark)] hover:bg-[var(--flare-green)]/10 h-12"
            >
              <Bookmark size={18} className="mr-2" />
              Save for Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}