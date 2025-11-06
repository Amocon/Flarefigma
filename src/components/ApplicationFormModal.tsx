import { X, Upload, FileText, User, Heart, Send, Edit, Eye, EyeOff, Check, Mail, Phone, Briefcase, Home as HomeIcon } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Separator } from './ui/separator';

interface ApplicationFormModalProps {
  wgName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationFormData) => void;
}

interface ApplicationFormData {
  intro: string;
  hobbies: string[];
  references: string;
  contactEmail: string;
  contactPhone: string;
  occupation: string;
  moveInDate: string;
  includePhoto: boolean;
  includeHobbies: boolean;
  includeReferences: boolean;
  includeIncome: boolean;
  includeDocuments: boolean;
  applyNow: boolean;
}

export function ApplicationFormModal({ wgName, open, onClose, onSubmit }: ApplicationFormModalProps) {
  const [applyNow, setApplyNow] = useState(true);
  
  // Editable fields (prefilled from profile)
  const [intro, setIntro] = useState('Outgoing and friendly marketing professional looking for a WG in Berlin. I love cooking, yoga, and exploring new cafes. I value cleanliness, respect, and good communication.');
  const [hobbiesText, setHobbiesText] = useState('Cooking, Yoga, Photography, Hiking, Coffee');
  const [references, setReferences] = useState('Previous landlord: Maria Schmidt (maria.schmidt@email.com)\nFormer flatmate: Tom Weber (tom.weber@email.com)');
  const [contactEmail, setContactEmail] = useState('anna.muller@email.com');
  const [contactPhone, setContactPhone] = useState('+49 157 12345678');
  const [occupation, setOccupation] = useState('Marketing Manager at TechCorp');
  const [moveInDate, setMoveInDate] = useState('2025-12-01');
  
  // Visibility toggles
  const [includePhoto, setIncludePhoto] = useState(true);
  const [includeHobbies, setIncludeHobbies] = useState(true);
  const [includeReferences, setIncludeReferences] = useState(false);
  const [includeIncome, setIncludeIncome] = useState(false);
  const [includeDocuments, setIncludeDocuments] = useState(false);

  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Mock profile data
  const profile = {
    name: 'Anna Müller',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHx8MTc2MTUyNzUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const hobbiesArray = hobbiesText.split(',').map(h => h.trim()).filter(h => h);

  const handleSubmit = () => {
    onSubmit({
      intro,
      hobbies: hobbiesArray,
      references,
      contactEmail,
      contactPhone,
      occupation,
      moveInDate,
      includePhoto,
      includeHobbies,
      includeReferences,
      includeIncome,
      includeDocuments,
      applyNow,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[92vh] overflow-hidden p-0 gap-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 py-5 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <FileText size={20} />
              </div>
              <h3 className="text-white">Application Form</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-white/90 text-sm">Applying to {wgName}</p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-180px)] px-6 py-6 space-y-6">
          {/* Apply Mode Toggle */}
          <div className="space-y-3">
            <Label>Application Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setApplyNow(true)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  applyNow
                    ? 'border-[var(--flare-green)] bg-[var(--flare-green)]/5'
                    : 'border-border bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Send size={18} className={applyNow ? 'text-[var(--flare-green)]' : 'text-muted-foreground'} />
                  <span className="text-sm">Apply Now</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Send immediately
                </p>
              </button>
              
              <button
                onClick={() => setApplyNow(false)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  !applyNow
                    ? 'border-[var(--flare-green)] bg-[var(--flare-green)]/5'
                    : 'border-border bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Heart size={18} className={!applyNow ? 'text-[var(--flare-green)]' : 'text-muted-foreground'} />
                  <span className="text-sm">Save Later</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Review before sending
                </p>
              </button>
            </div>
          </div>

          {applyNow && (
            <>
              {/* Profile Photo Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <User size={16} className="text-[var(--flare-green)]" />
                    Profile Photo
                  </Label>
                  <Switch 
                    checked={includePhoto}
                    onCheckedChange={setIncludePhoto}
                  />
                </div>
                {includePhoto && (
                  <div className="bg-muted rounded-xl p-4 flex items-center gap-4">
                    <ImageWithFallback 
                      src={profile.photo}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm">{profile.name}, {profile.age}</h4>
                      <p className="text-xs text-muted-foreground">Profile picture visible</p>
                    </div>
                    {includePhoto ? (
                      <Eye size={16} className="text-[var(--flare-green)]" />
                    ) : (
                      <EyeOff size={16} className="text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>

              <Separator />

              {/* Introduction Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <FileText size={16} className="text-[var(--flare-green)]" />
                    Personal Introduction
                  </Label>
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingSection(editingSection === 'intro' ? null : 'intro')}
                  >
                    <Edit size={14} />
                  </Button>
                </div>
                {editingSection === 'intro' ? (
                  <div className="space-y-2">
                    <Textarea 
                      value={intro}
                      onChange={(e) => setIntro(e.target.value)}
                      rows={5}
                      className="rounded-xl resize-none"
                      placeholder="Tell them about yourself..."
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setEditingSection(null)}
                        className="flex-1"
                      >
                        <Check size={14} className="mr-2" />
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">{intro}</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Hobbies & Interests */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Heart size={16} className="text-[var(--flare-green)]" />
                    Hobbies & Interests
                  </Label>
                  <Switch 
                    checked={includeHobbies}
                    onCheckedChange={setIncludeHobbies}
                  />
                </div>
                {includeHobbies && (
                  <>
                    {editingSection === 'hobbies' ? (
                      <div className="space-y-2">
                        <Input 
                          value={hobbiesText}
                          onChange={(e) => setHobbiesText(e.target.value)}
                          placeholder="Separate hobbies with commas"
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate each hobby with a comma
                        </p>
                        <Button 
                          size="sm" 
                          onClick={() => setEditingSection(null)}
                        >
                          <Check size={14} className="mr-2" />
                          Done
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-muted rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm">Your interests will be shown</p>
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSection('hobbies')}
                          >
                            <Edit size={14} />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hobbiesArray.map((hobby) => (
                            <Badge key={hobby} variant="secondary">
                              {hobby}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Mail size={16} className="text-[var(--flare-green)]" />
                  Contact Information
                </Label>
                {editingSection === 'contact' ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs mb-2 block">Email</Label>
                      <Input 
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-2 block">Phone</Label>
                      <Input 
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+49 XXX XXXXXXX"
                      />
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setEditingSection(null)}
                    >
                      <Check size={14} className="mr-2" />
                      Done
                    </Button>
                  </div>
                ) : (
                  <div className="bg-muted rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm">Contact details</p>
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingSection('contact')}
                      >
                        <Edit size={14} />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[var(--flare-green)]" />
                        <span className="text-muted-foreground">{contactEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[var(--flare-green)]" />
                        <span className="text-muted-foreground">{contactPhone}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Occupation & Move-in Date */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Briefcase size={16} className="text-[var(--flare-green)]" />
                  Professional Details
                </Label>
                {editingSection === 'professional' ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs mb-2 block">Occupation</Label>
                      <Input 
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        placeholder="Your job or studies"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-2 block">Preferred Move-in Date</Label>
                      <Input 
                        type="date"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                      />
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setEditingSection(null)}
                    >
                      <Check size={14} className="mr-2" />
                      Done
                    </Button>
                  </div>
                ) : (
                  <div className="bg-muted rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm">Professional info</p>
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingSection('professional')}
                      >
                        <Edit size={14} />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-[var(--flare-green)]" />
                        <span className="text-muted-foreground">{occupation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HomeIcon size={14} className="text-[var(--flare-green)]" />
                        <span className="text-muted-foreground">
                          Move-in: {new Date(moveInDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* References Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Check size={16} className="text-[var(--flare-green)]" />
                    References
                  </Label>
                  <Switch 
                    checked={includeReferences}
                    onCheckedChange={setIncludeReferences}
                  />
                </div>
                {includeReferences && (
                  <>
                    {editingSection === 'references' ? (
                      <div className="space-y-2">
                        <Textarea 
                          value={references}
                          onChange={(e) => setReferences(e.target.value)}
                          rows={4}
                          className="rounded-xl resize-none"
                          placeholder="Previous landlords or flatmates who can vouch for you..."
                        />
                        <Button 
                          size="sm" 
                          onClick={() => setEditingSection(null)}
                        >
                          <Check size={14} className="mr-2" />
                          Done
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-muted rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm">Reference contacts</p>
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSection('references')}
                          >
                            <Edit size={14} />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{references}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Separator />

              {/* Income Information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Briefcase size={16} className="text-[var(--flare-green)]" />
                    Income Proof
                  </Label>
                  <Switch 
                    checked={includeIncome}
                    onCheckedChange={setIncludeIncome}
                  />
                </div>
                {includeIncome && (
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm mb-3 text-muted-foreground">
                      Upload proof of income (salary slips, employment contract, etc.)
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Upload size={14} className="mr-2" />
                      Upload Income Documents
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Documents */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <FileText size={16} className="text-[var(--flare-green)]" />
                    Additional Documents
                  </Label>
                  <Switch 
                    checked={includeDocuments}
                    onCheckedChange={setIncludeDocuments}
                  />
                </div>
                {includeDocuments && (
                  <div className="bg-muted rounded-xl p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      ID, SCHUFA, certificates, or other documents
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Upload size={14} className="mr-2" />
                      Upload Documents
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Max 5 files, up to 10MB each
                    </p>
                  </div>
                )}
              </div>

              {/* Pro Tip */}
              <div className="bg-[var(--flare-highlight)]/30 rounded-xl p-4 border border-[var(--flare-highlight)]">
                <p className="text-sm">
                  💡 <span>Complete applications with references have 4x higher acceptance rates</span>
                </p>
              </div>
            </>
          )}

          {!applyNow && (
            <div className="bg-[var(--flare-highlight)]/30 rounded-xl p-6 text-center border border-[var(--flare-highlight)]">
              <Heart size={48} className="mx-auto mb-3 text-[var(--flare-green)]" />
              <h4 className="mb-2">Saved for Review</h4>
              <p className="text-sm text-muted-foreground">
                You can review and edit this application before sending from your Applications tab
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 bg-white sticky bottom-0 z-10">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1"
            >
              {applyNow ? (
                <>
                  <Send size={18} className="mr-2" />
                  Send Application
                </>
              ) : (
                <>
                  <Heart size={18} className="mr-2" />
                  Save Draft
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
