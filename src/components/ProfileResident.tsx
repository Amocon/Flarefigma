import { User, MapPin, Home, Users, Mail, Phone, Calendar, Briefcase } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export function ProfileResident() {
  return (
    <div className="px-6 py-6 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[var(--flare-text)] mb-2">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and WG information
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-[var(--flare-green)]/10 flex items-center justify-center">
            <User size={36} className="text-[var(--flare-green)]" />
          </div>
          <div>
            <h3 className="text-[var(--flare-text)] mb-1">Max Müller</h3>
            <p className="text-sm text-muted-foreground">Member since Oct 2023</p>
            <Badge className="mt-1 bg-[var(--flare-green)]/10 text-[var(--flare-green-dark)] border-0 rounded-full">
              🏠 WG Admin
            </Badge>
          </div>
        </div>

        <Button className="w-full rounded-full bg-[var(--flare-green)] hover:bg-[var(--flare-green-dark)]">
          Edit Profile
        </Button>
      </Card>

      {/* Contact Information */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <h4 className="text-[var(--flare-text)] mb-4">Contact Information</h4>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Mail size={18} className="text-[var(--flare-green)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-[var(--flare-text)]">max.mueller@email.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Phone size={18} className="text-[var(--flare-green)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm text-[var(--flare-text)]">+49 170 987 6543</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Calendar size={18} className="text-[var(--flare-green)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Age</p>
              <p className="text-sm text-[var(--flare-text)]">29 years old</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Briefcase size={18} className="text-[var(--flare-green)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Occupation</p>
              <p className="text-sm text-[var(--flare-text)]">Software Engineer</p>
            </div>
          </div>
        </div>
      </Card>

      {/* WG Information */}
      <Card className="p-6 rounded-2xl border-border mb-6">
        <h4 className="text-[var(--flare-text)] mb-4">My WG</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">WG Name</p>
            </div>
            <p className="text-sm text-muted-foreground">Prenzlauer Berg Squad</p>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">Address</p>
            </div>
            <p className="text-sm text-muted-foreground">Stargarder Str. 45, 10437 Berlin</p>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">Flatmates</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="bg-[var(--flare-green)] text-white border-0 rounded-full">
                Max (You)
              </Badge>
              <Badge className="bg-muted text-[var(--flare-text)] border-0 rounded-full">
                Sarah
              </Badge>
              <Badge className="bg-muted text-[var(--flare-text)] border-0 rounded-full">
                Tom
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-[var(--flare-green)]" />
              <p className="text-sm text-[var(--flare-text)]">Move-in Date</p>
            </div>
            <p className="text-sm text-muted-foreground">October 15, 2023</p>
          </div>
        </div>
      </Card>

      {/* About Me */}
      <Card className="p-6 rounded-2xl border-border">
        <h4 className="text-[var(--flare-text)] mb-3">About Me</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hey there! I'm Max, a software engineer working remotely. I enjoy cooking, 
          playing guitar, and exploring Berlin's coffee scene. I believe in keeping 
          shared spaces clean and having regular WG meetings to keep everyone in sync. 
          Living with Sarah and Tom has been great, and we're always up for movie 
          nights or spontaneous adventures! 🎸☕
        </p>
      </Card>
    </div>
  );
}
