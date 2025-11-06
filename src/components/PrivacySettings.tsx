import { Eye, Lock, User, Mail, Phone, Briefcase, Heart, FileText, Home as HomeIcon, Shield, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useState } from 'react';
import { PublicProfilePreview } from './PublicProfilePreview';

interface PrivacySettingsProps {
  onBack?: () => void;
}

export function PrivacySettings({ onBack }: PrivacySettingsProps) {
  // Proactive contact toggle
  const [allowProactiveContact, setAllowProactiveContact] = useState(true);
  
  // Visibility toggles for public profile
  const [showPhoto, setShowPhoto] = useState(true);
  const [showFullName, setShowFullName] = useState(false);
  const [showAge, setShowAge] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showOccupation, setShowOccupation] = useState(true);
  const [showAbout, setShowAbout] = useState(true);
  const [showHobbies, setShowHobbies] = useState(true);
  const [showLookingFor, setShowLookingFor] = useState(true);

  const [showPreview, setShowPreview] = useState(false);

  // Count visible fields
  const visibleFieldsCount = [
    showPhoto, showFullName, showAge, showEmail, showPhone, 
    showOccupation, showAbout, showHobbies, showLookingFor
  ].filter(Boolean).length;

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Shield size={24} />
            </div>
            <h1 className="text-white">Privacy Settings</h1>
          </div>
        </div>
        <p className="text-white/90 text-sm ml-14">
          Control how WGs can find and contact you
        </p>
      </div>

      <div className="px-6 space-y-6">
        {/* Proactive Contact Setting */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 mb-2">
                  <Eye size={20} className="text-[var(--flare-green)]" />
                  Profile Visibility
                </CardTitle>
                <CardDescription>
                  Let WG owners discover and contact you directly
                </CardDescription>
              </div>
              <Switch 
                checked={allowProactiveContact}
                onCheckedChange={setAllowProactiveContact}
              />
            </div>
          </CardHeader>
          
          {allowProactiveContact && (
            <CardContent>
              <div className="bg-[var(--flare-green)]/10 rounded-xl p-4 border border-[var(--flare-green)]/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[var(--flare-green)] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm">Your profile is discoverable</p>
                    <p className="text-xs text-muted-foreground">
                      WG owners can find your profile in their search and send you invitations to apply. 
                      You'll receive notifications when someone views your profile.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {!allowProactiveContact && (
            <CardContent>
              <div className="bg-muted rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lock size={20} className="text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm">Profile hidden from search</p>
                    <p className="text-xs text-muted-foreground">
                      WG owners won't be able to find or contact you. You can still browse and apply to WGs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Public Profile Visibility Settings */}
        {allowProactiveContact && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} className="text-[var(--flare-green)]" />
                What WGs Can See
              </CardTitle>
              <CardDescription>
                Choose which information appears in your public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visibility Status Badge */}
              <div className="bg-muted rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-[var(--flare-green)]" />
                  <span className="text-sm">Visible Information</span>
                </div>
                <Badge variant="secondary">
                  {visibleFieldsCount} of 9 fields
                </Badge>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-sm flex items-center gap-2">
                  <User size={16} className="text-[var(--flare-green)]" />
                  Basic Information
                </h4>

                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">Profile Photo</Label>
                      <p className="text-xs text-muted-foreground">Your profile picture</p>
                    </div>
                    <Switch 
                      checked={showPhoto}
                      onCheckedChange={setShowPhoto}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">Full Name</Label>
                      <p className="text-xs text-muted-foreground">Show complete name instead of first name only</p>
                    </div>
                    <Switch 
                      checked={showFullName}
                      onCheckedChange={setShowFullName}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">Age</Label>
                      <p className="text-xs text-muted-foreground">Your age will be visible</p>
                    </div>
                    <Switch 
                      checked={showAge}
                      onCheckedChange={setShowAge}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-sm flex items-center gap-2">
                  <Mail size={16} className="text-[var(--flare-green)]" />
                  Contact Information
                </h4>

                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">Email Address</Label>
                      <p className="text-xs text-muted-foreground">WGs can see your email</p>
                    </div>
                    <Switch 
                      checked={showEmail}
                      onCheckedChange={setShowEmail}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">Phone Number</Label>
                      <p className="text-xs text-muted-foreground">WGs can see your phone</p>
                    </div>
                    <Switch 
                      checked={showPhone}
                      onCheckedChange={setShowPhone}
                    />
                  </div>
                </div>

                {(showEmail || showPhone) && (
                  <div className="ml-6 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-900">
                      ⚠️ Sharing contact info publicly may result in unsolicited messages. 
                      Consider keeping this private and sharing only when applying.
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Professional & Lifestyle */}
              <div className="space-y-4">
                <h4 className="text-sm flex items-center gap-2">
                  <Briefcase size={16} className="text-[var(--flare-green)]" />
                  Professional & Lifestyle
                </h4>

                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">Occupation</Label>
                      <p className="text-xs text-muted-foreground">Job or studies information</p>
                    </div>
                    <Switch 
                      checked={showOccupation}
                      onCheckedChange={setShowOccupation}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">About Me</Label>
                      <p className="text-xs text-muted-foreground">Personal bio and description</p>
                    </div>
                    <Switch 
                      checked={showAbout}
                      onCheckedChange={setShowAbout}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">Hobbies & Interests</Label>
                      <p className="text-xs text-muted-foreground">Your interests and activities</p>
                    </div>
                    <Switch 
                      checked={showHobbies}
                      onCheckedChange={setShowHobbies}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm">What I'm Looking For</Label>
                      <p className="text-xs text-muted-foreground">Preferences and requirements</p>
                    </div>
                    <Switch 
                      checked={showLookingFor}
                      onCheckedChange={setShowLookingFor}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Preview Button */}
              <Button 
                onClick={() => setShowPreview(true)}
                variant="outline"
                className="w-full"
              >
                <Eye size={18} className="mr-2" />
                Preview My Public Profile
              </Button>

              {/* Privacy Tip */}
              <div className="bg-[var(--flare-highlight)]/30 rounded-xl p-4 border border-[var(--flare-highlight)]">
                <div className="flex items-start gap-2">
                  <Lock size={16} className="text-[var(--flare-green)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm mb-1">Privacy Tip</p>
                    <p className="text-xs text-muted-foreground">
                      You can always adjust these settings. Information you hide here won't be visible 
                      in search results, but you can still include it in individual applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Privacy Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} className="text-[var(--flare-green)]" />
              Data Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[var(--flare-green)] shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                Your data is encrypted and securely stored
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[var(--flare-green)] shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                Only verified WG owners can see your public profile
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[var(--flare-green)] shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                You can delete your account and all data at any time
              </p>
            </div>

            <Separator className="my-4" />

            <Button variant="link" className="text-[var(--flare-green-dark)] p-0 h-auto">
              Read our Privacy Policy
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Public Profile Preview Modal */}
      <PublicProfilePreview 
        open={showPreview}
        onClose={() => setShowPreview(false)}
        visibilitySettings={{
          showPhoto,
          showFullName,
          showAge,
          showEmail,
          showPhone,
          showOccupation,
          showAbout,
          showHobbies,
          showLookingFor,
        }}
      />
    </div>
  );
}
