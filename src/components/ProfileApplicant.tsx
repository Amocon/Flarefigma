import { useState } from 'react';
import { User, MapPin, Euro, Home, Briefcase, Heart, Mail, Phone, Calendar, Edit, Eye, Lock, Check, Upload, FileText, X, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface Document {
  id: number;
  name: string;
  type: string;
  uploadedDate: string;
}

export function ProfileApplicant() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isProactiveVisible, setIsProactiveVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Profile data state
  const [name, setName] = useState('Anna Schmidt');
  const [email, setEmail] = useState('anna.schmidt@email.com');
  const [phone, setPhone] = useState('+49 170 123 4567');
  const [age, setAge] = useState('27');
  const [occupation, setOccupation] = useState("Master's Student - UdK Berlin");
  const [bio, setBio] = useState("Hi! I'm Anna, a 27-year-old master's student at UdK Berlin studying Design. I'm looking for a friendly WG where I can feel at home. I love cooking together, exploring the city, and having good conversations over coffee. I'm tidy, respectful, and believe in open communication. Looking forward to finding the perfect flatshare! 🌟");
  const [budget, setBudget] = useState('€400 - €650');
  const [moveInDate, setMoveInDate] = useState('December 1, 2024');
  
  const [districts, setDistricts] = useState(['Kreuzberg', 'Friedrichshain', 'Neukölln']);
  const [interests, setInterests] = useState(['🎨 Art', '🎵 Music', '🚴 Cycling', '🌱 Sustainability']);
  const [newDistrict, setNewDistrict] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Proof of Enrollment.pdf', type: 'enrollment', uploadedDate: 'Oct 15, 2024' },
    { id: 2, name: 'SCHUFA_AnnaSchmidt.pdf', type: 'schufa', uploadedDate: 'Oct 20, 2024' },
    { id: 3, name: 'Income_Statement.pdf', type: 'income', uploadedDate: 'Oct 22, 2024' },
  ]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 800);
  };

  const handleAddDistrict = () => {
    if (newDistrict.trim()) {
      setDistricts([...districts, newDistrict.trim()]);
      setNewDistrict('');
    }
  };

  const handleRemoveDistrict = (district: string) => {
    setDistricts(districts.filter(d => d !== district));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleRemoveDocument = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const handleUploadDocument = () => {
    // Simulate file upload
    const newDoc: Document = {
      id: documents.length + 1,
      name: 'New_Document.pdf',
      type: 'other',
      uploadedDate: 'Today'
    };
    setDocuments([...documents, newDoc]);
  };

  return (
    <div className="px-6 py-6 pb-20">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[var(--flare-text)] mb-2">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            {isEditing ? 'Edit your profile information' : 'Manage your profile and documents'}
          </p>
        </div>
        {!isEditing && (
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="rounded-full border-2"
          >
            <Edit size={18} />
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="p-4 rounded-2xl border-[var(--flare-green)] bg-[var(--flare-green)]/5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--flare-green)] flex items-center justify-center">
              <Edit size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--flare-text)]">Edit Mode Active</p>
              <p className="text-xs text-muted-foreground">Make changes and save when done</p>
            </div>
          </div>
        </Card>
      )}

      {/* Profile Card */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
            <User size={36} className="text-[var(--flare-green)]" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)] mb-2"
              />
            ) : (
              <h3 className="text-[var(--flare-text)] mb-1">{name}</h3>
            )}
            <p className="text-sm text-muted-foreground">Member since Jan 2024</p>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <h4 className="text-[var(--flare-text)] mb-4">Contact Information</h4>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-[var(--flare-green)]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)] mt-1"
                />
              ) : (
                <p className="text-sm text-[var(--flare-text)]">{email}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-[var(--flare-green)]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Phone</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)] mt-1"
                />
              ) : (
                <p className="text-sm text-[var(--flare-text)]">{phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-[var(--flare-green)]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Age</p>
              {isEditing ? (
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)] mt-1"
                />
              ) : (
                <p className="text-sm text-[var(--flare-text)]">{age} years old</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Briefcase size={18} className="text-[var(--flare-green)]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Occupation</p>
              {isEditing ? (
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)] mt-1"
                />
              ) : (
                <p className="text-sm text-[var(--flare-text)]">{occupation}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* My Preferences */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <h4 className="text-[var(--flare-text)] mb-4">My Preferences</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">Preferred Districts</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {districts.map((district, idx) => (
                <Badge 
                  key={idx}
                  className="bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full relative group"
                >
                  {district}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveDistrict(district)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddDistrict()}
                  placeholder="Add district..."
                  className="flex-1 px-3 py-2 text-sm bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)]"
                />
                <Button
                  size="sm"
                  onClick={handleAddDistrict}
                  className="rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Euro size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">Budget Range</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 text-sm text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)]"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{budget} per month</p>
            )}
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">Move-in Date</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full px-3 py-2 text-sm text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)]"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{moveInDate}</p>
            )}
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">Interests & Hobbies</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {interests.map((interest, idx) => (
                <Badge 
                  key={idx}
                  className="bg-muted text-[var(--flare-text)] border-0 rounded-full relative group"
                >
                  {interest}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                  placeholder="Add interest..."
                  className="flex-1 px-3 py-2 text-sm bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)]"
                />
                <Button
                  size="sm"
                  onClick={handleAddInterest}
                  className="rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* About Me */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <h4 className="text-[var(--flare-text)] mb-3">About Me</h4>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 text-sm text-[var(--flare-text)] bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--flare-green)] resize-none"
          />
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        )}
      </Card>

      {/* Documents */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[var(--flare-text)]">My Documents</h4>
          <Button
            size="sm"
            onClick={handleUploadDocument}
            className="rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
          >
            <Upload size={14} className="mr-2" />
            Upload
          </Button>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
              <FileText size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--flare-green)]/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-[var(--flare-green)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--flare-text)] truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">Uploaded {doc.uploadedDate}</p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Visibility Settings */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
              {isProactiveVisible ? <Eye size={18} className="text-[var(--flare-green)]" /> : <Lock size={18} className="text-muted-foreground" />}
            </div>
            <div>
              <Label htmlFor="proactive-mode" className="text-[var(--flare-text)]">
                Proactive Visibility
              </Label>
              <p className="text-xs text-muted-foreground">Allow WGs to find and contact you</p>
            </div>
          </div>
          <Switch
            id="proactive-mode"
            checked={isProactiveVisible}
            onCheckedChange={setIsProactiveVisible}
            className="data-[state=checked]:bg-[var(--flare-green)]"
          />
        </div>
        <Separator className="my-3" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isProactiveVisible 
            ? '✓ Your profile is visible to WG residents who are actively looking for flatmates. They can view your profile and send you messages.'
            : '⊘ Your profile is hidden from proactive searches. You can still browse and apply to WGs, but they won\'t find you first.'}
        </p>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)] h-12"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="w-full rounded-full border-2 h-12"
              disabled={isSaving}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setShowPreview(true)}
            variant="outline"
            className="w-full rounded-full border-2 h-12"
          >
            <Eye size={18} className="mr-2" />
            Preview as Seen by WGs
          </Button>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <ProfilePreviewModal
          name={name}
          age={age}
          occupation={occupation}
          bio={bio}
          districts={districts}
          interests={interests}
          budget={budget}
          moveInDate={moveInDate}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

function ProfilePreviewModal({
  name,
  age,
  occupation,
  bio,
  districts,
  interests,
  budget,
  moveInDate,
  onClose
}: {
  name: string;
  age: string;
  occupation: string;
  bio: string;
  districts: string[];
  interests: string[];
  budget: string;
  moveInDate: string;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[var(--flare-text)] flex items-center gap-2">
            <Eye size={20} className="text-[var(--flare-green)]" />
            Profile Preview
          </DialogTitle>
          <DialogDescription>
            This is how WG residents see your profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
              <User size={32} className="text-[var(--flare-green)]" />
            </div>
            <div>
              <h3 className="text-[var(--flare-text)]">{name}</h3>
              <p className="text-sm text-muted-foreground">{age} years old</p>
            </div>
          </div>

          {/* Occupation */}
          <Card className="p-4 rounded-xl border-border">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={14} className="text-[var(--flare-green)]" />
              <p className="text-xs text-muted-foreground">Occupation</p>
            </div>
            <p className="text-sm text-[var(--flare-text)]">{occupation}</p>
          </Card>

          {/* About */}
          <Card className="p-4 rounded-xl border-border">
            <p className="text-xs text-muted-foreground mb-2">About Me</p>
            <p className="text-sm text-[var(--flare-text)] leading-relaxed">{bio}</p>
          </Card>

          {/* Preferences Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 rounded-xl border-border">
              <p className="text-xs text-muted-foreground mb-1">Budget</p>
              <p className="text-sm text-[var(--flare-text)]">{budget}</p>
            </Card>
            <Card className="p-3 rounded-xl border-border">
              <p className="text-xs text-muted-foreground mb-1">Move-in</p>
              <p className="text-sm text-[var(--flare-text)]">{moveInDate}</p>
            </Card>
          </div>

          {/* Districts */}
          <Card className="p-4 rounded-xl border-border">
            <p className="text-xs text-muted-foreground mb-2">Preferred Districts</p>
            <div className="flex flex-wrap gap-2">
              {districts.map((district, idx) => (
                <Badge 
                  key={idx}
                  className="bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full"
                >
                  {district}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Interests */}
          <Card className="p-4 rounded-xl border-border">
            <p className="text-xs text-muted-foreground mb-2">Interests & Hobbies</p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, idx) => (
                <Badge 
                  key={idx}
                  className="bg-muted text-[var(--flare-text)] border-0 rounded-full"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]"
          >
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}