import { Heart, X, MessageCircle, Home, User, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

/**
 * DesignShowcase Component
 * 
 * This component demonstrates the Flare design system in action.
 * It showcases buttons, cards, badges, inputs, icons, and typography.
 */
export function DesignShowcase() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 py-8 rounded-3xl">
        <h1 className="text-white mb-2">Flare Design System</h1>
        <p className="text-white/90 text-sm">A comprehensive guide to Flare's UI components</p>
      </div>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Brand colors and their usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--flare-green)] shadow-sm" />
            <div>
              <p className="text-sm">Flare Green</p>
              <p className="text-xs text-muted-foreground">#93c47d</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--flare-green-dark)] shadow-sm" />
            <div>
              <p className="text-sm">Dark Green</p>
              <p className="text-xs text-muted-foreground">#38761d</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--flare-brown)] shadow-sm" />
            <div>
              <p className="text-sm">Brown</p>
              <p className="text-xs text-muted-foreground">#895d39</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--flare-highlight)] shadow-sm" />
            <div>
              <p className="text-sm">Highlight</p>
              <p className="text-xs text-muted-foreground">#eacc90</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Primary, Secondary, and Danger variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm mb-2">Primary (Default)</p>
            <div className="flex flex-wrap gap-2">
              <Button>
                <Heart size={20} />
                Primary Button
              </Button>
              <Button size="sm">Small Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </div>

          <div>
            <p className="text-sm mb-2">Secondary (Outline)</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <X size={20} />
                Outline Button
              </Button>
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p className="text-sm mb-2">Danger</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="destructive">
                Danger Button
              </Button>
              <Button variant="destructive" size="sm">Small</Button>
              <Button variant="destructive" size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p className="text-sm mb-2">Ghost & Link</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status and category indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Active</Badge>
            <Badge variant="secondary">Pending</Badge>
            <Badge variant="destructive">Declined</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-[var(--flare-green-dark)] text-white">Invited</Badge>
            <Badge className="bg-[var(--flare-highlight)] text-[var(--flare-text)]">Highlight</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Card Components</CardTitle>
          <CardDescription>Standard cards with 16px radius and shadow depth 2</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-2xl shadow-sm border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4>Example Card</h4>
                <p className="text-sm text-muted-foreground">With rounded corners</p>
              </div>
              <Badge>New</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              This is an example of a card component with the Flare design system applied.
            </p>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1">
                <X size={16} />
                Skip
              </Button>
              <Button className="flex-1">
                <Heart size={16} />
                Like
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Icons</CardTitle>
          <CardDescription>Lucide icons at 24px standard size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Home size={24} className="text-[var(--flare-green)]" />
              <span className="text-xs text-center">Home</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <User size={24} className="text-[var(--flare-green)]" />
              <span className="text-xs text-center">User</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MessageCircle size={24} className="text-[var(--flare-green)]" />
              <span className="text-xs text-center">Chat</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart size={24} className="text-[var(--flare-green)]" />
              <span className="text-xs text-center">Like</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Calendar size={24} className="text-[var(--flare-green)]" />
              <span className="text-xs text-center">Calendar</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin size={24} className="text-[var(--flare-green)]" />
              <span className="text-xs text-center">Location</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>Inputs and form controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm mb-2 block">Standard Input</label>
            <Input placeholder="Enter your name..." />
          </div>
          <div>
            <label className="text-sm mb-2 block">Search Input</label>
            <div className="relative">
              <Input placeholder="Search WGs..." className="pl-10" />
              <Home size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Font styles and hierarchy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h1>Heading 1 - Semi-bold 2xl</h1>
          </div>
          <div>
            <h2>Heading 2 - Semi-bold xl</h2>
          </div>
          <div>
            <h3>Heading 3 - Semi-bold lg</h3>
          </div>
          <div>
            <h4>Heading 4 - Medium base</h4>
          </div>
          <div>
            <p>Paragraph - Regular base with proper line height for readability.</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Small text in muted color for secondary information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
