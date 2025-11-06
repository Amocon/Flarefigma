# Flare Design System

A comprehensive design system for the Flare WG-finding mobile application.

## Color Palette

### Primary Colors
- **Green** (`#93c47d`): Main brand color, used for active states and positive actions
- **Dark Green** (`#38761d`): Primary button fills, accents, and important CTAs
- **Brown** (`#895d39`): Danger/warning actions, alternative CTAs
- **Highlight** (`#eacc90`): Background highlights, soft accents, tags
- **Text** (`#040404`): Primary text color

### Usage Guidelines
```css
--flare-green: #93c47d;         /* Active states, highlights */
--flare-green-dark: #38761d;    /* Primary buttons */
--flare-brown: #895d39;         /* Danger/Important actions */
--flare-highlight: #eacc90;     /* Soft backgrounds, badges */
--flare-text: #040404;          /* Primary text */
```

## Typography

### Font Family
- **Primary**: Inter
- **Fallback**: SF Pro, system-ui, sans-serif

### Font Weights
- **Headings**: Semi-bold (600)
- **Body**: Regular (400)
- **Labels & Buttons**: Medium (500)

### Type Scale
```css
h1: 2xl (24px) - Semi-bold
h2: xl (20px) - Semi-bold  
h3: lg (18px) - Semi-bold
h4: base (16px) - Medium
p: base (16px) - Regular
label: base (16px) - Medium
button: base (16px) - Medium
```

## Buttons

### Primary Button
- **Background**: `#38761d` (Dark Green)
- **Text**: White (`#ffffff`)
- **Hover**: `#2d5d16` (Darker green)
- **Border Radius**: 12px (rounded-xl)
- **Shadow**: Subtle depth (0 2px 4px rgba(0,0,0,0.08))
- **Usage**: Main CTAs, important actions

```tsx
<Button variant="default">Primary Action</Button>
```

### Secondary Button (Outline)
- **Border**: 2px solid `#93c47d` (Green)
- **Text**: `#040404` (Text color)
- **Background**: Transparent
- **Hover**: Light green background (`#93c47d` at 10% opacity)
- **Border Radius**: 12px (rounded-xl)
- **Usage**: Secondary actions, alternative options

```tsx
<Button variant="outline">Secondary Action</Button>
```

### Danger Button
- **Background**: `#895d39` (Brown)
- **Text**: White (`#ffffff`)
- **Hover**: `#6d4a2e` (Darker brown)
- **Border Radius**: 12px (rounded-xl)
- **Usage**: Delete, decline, important warnings

```tsx
<Button variant="destructive">Danger Action</Button>
```

### Button Sizes
- **Small**: h-9 (36px) - Compact actions
- **Default**: h-11 (44px) - Standard touch target
- **Large**: h-12 (48px) - Prominent CTAs

## Cards

### Card Styling
- **Border Radius**: 16px (`--flare-card-radius`)
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.08)` (Depth 2)
- **Border**: 1px solid `rgba(0, 0, 0, 0.08)`
- **Background**: White (`#ffffff`)
- **Padding**: 24px (p-6)

### Card Variants
```tsx
// Standard card
<div className="rounded-2xl shadow-sm border border-border bg-white p-6">
  {/* Content */}
</div>

// Card with highlight
<div className="rounded-2xl shadow-sm border border-border bg-[var(--flare-highlight)] p-6">
  {/* Content */}
</div>
```

## Icons

### Guidelines
- **Library**: Lucide React only
- **Standard Size**: 24px (`size={24}`)
- **Small Size**: 16-20px for inline icons
- **Color**: Inherits from parent or uses theme colors
- **Stroke Width**: 2 (default), 2.5 (active/bold)

### Common Icons
```tsx
import { 
  Home,           // Navigation - Home
  User,           // Navigation - Profile
  MessageCircle,  // Navigation - Messages
  Heart,          // Like/Favorite
  X,              // Close/Skip
  Check,          // Confirm/Success
  Calendar,       // Schedule/Date
  MapPin,         // Location
  Euro,           // Price
  Users,          // Group/Flatmates
} from 'lucide-react';
```

## Navigation

### Bottom Tab Bar
- **Height**: Auto with padding
- **Background**: White with top border
- **Shadow**: Subtle upward shadow `0 -2px 8px rgba(0, 0, 0, 0.04)`
- **Active Color**: `#93c47d` (Green)
- **Inactive Color**: `#6b6b6b` (Muted)
- **Icon Size**: 24px standard
- **Active State**: 
  - Colored background bubble (`#93c47d` at 10% opacity)
  - Bolder stroke weight (2.5)
  - Slight scale animation (1.05)

```tsx
// Active tab
<div className="bg-[var(--flare-nav-active)]/10 p-2 rounded-2xl">
  <Icon className="text-[var(--flare-nav-active)]" strokeWidth={2.5} />
</div>

// Inactive tab
<Icon className="text-[var(--flare-nav-inactive)]" strokeWidth={2} />
```

### Top App Bar
- **Minimal design**: Only essential information
- **Display**: WG name or User name
- **Background**: Gradient from brand colors
- **Text**: White with good contrast
- **Padding**: 24px (px-6)

## Spacing System

### Standard Spacing
```css
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Component Spacing
- **Card padding**: 24px (p-6)
- **Section spacing**: 24px (space-y-6)
- **List item gap**: 12px (gap-3)
- **Button gap**: 8px (gap-2)

## Shadows

### Elevation Levels
```css
/* Level 1 - Subtle */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)

/* Level 2 - Standard (Cards) */
shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

/* Level 3 - Elevated */
shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1)

/* Level 4 - Prominent (Modals) */
shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.12)
```

## Border Radius

### Standard Radii
```css
rounded-xl: 12px      /* Buttons, inputs */
rounded-2xl: 16px     /* Cards, containers */
rounded-3xl: 24px     /* Large cards, modals */
rounded-full: 9999px  /* Pills, avatars */
```

## Interactive States

### Hover States
- **Buttons**: Darken by ~15%
- **Cards**: Subtle shadow increase
- **Icons**: Color transition

### Active States
- **Navigation**: Background bubble + color change
- **Buttons**: Slight scale down (0.98)
- **Tabs**: Color change + weight increase

### Disabled States
- **Opacity**: 50%
- **Cursor**: not-allowed
- **Interactions**: Disabled

## Badges & Tags

### Interest/Vibe Tags
- **Background**: `#eacc90` (Highlight)
- **Text**: `#040404` (Text)
- **Border Radius**: Full (rounded-full)
- **Padding**: px-3 py-1
- **Font Size**: text-sm or text-xs

### Status Badges
```tsx
// Pending
<Badge className="bg-[var(--flare-highlight)] text-[var(--flare-text)]">
  Pending
</Badge>

// Active/Success
<Badge className="bg-[var(--flare-green)] text-white">
  Active
</Badge>

// Invited/Important
<Badge className="bg-[var(--flare-green-dark)] text-white">
  Invited
</Badge>

// Warning
<Badge className="bg-[var(--flare-brown)] text-white">
  Warning
</Badge>
```

## Form Elements

### Inputs
- **Border Radius**: 12px (rounded-xl)
- **Border**: 1px solid border color
- **Height**: 48px (h-12) for good touch targets
- **Background**: Subtle off-white (`#f9f9f9`)
- **Padding**: px-4
- **Focus**: Ring in brand green

### Sliders
- **Track**: Muted background
- **Thumb**: Brand green (`#93c47d`)
- **Height**: Standard touch-friendly size

### Switches
- **Active**: Brand green (`#93c47d`)
- **Inactive**: Muted gray
- **Border Radius**: Full

## Gradients

### Header Gradient
```css
background: linear-gradient(to bottom right, #93c47d, #38761d);
```

### Usage
- Top navigation bars
- Hero sections
- Important headers

## Accessibility

### Touch Targets
- **Minimum**: 44px × 44px (iOS/Android standard)
- **Recommended**: 48px × 48px for primary actions

### Color Contrast
- **Text on white**: Minimum 4.5:1 ratio
- **White on brand colors**: All combinations meet WCAG AA standards

### Focus States
- **Visible focus ring**: 3px with brand color
- **Keyboard navigation**: Fully supported

## Animation

### Transitions
```css
transition-all duration-200 ease-out  /* Standard */
transition-colors duration-200        /* Color changes */
```

### Common Animations
- **Tab switching**: Scale + color transition (200ms)
- **Button press**: Scale down slightly
- **Card hover**: Shadow increase
- **Page transitions**: Slide/fade

## Mobile Considerations

### Safe Areas
- **Bottom padding**: Account for iOS home indicator
- **Top padding**: Account for notch/status bar
- **Use**: `safe-area-inset-*` classes where needed

### Responsive Breakpoints
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop (not primary focus) */
```

### Mobile-First
- All designs optimized for mobile (320px+)
- Touch-friendly interactions
- Thumb-zone optimization for primary actions

## Usage Examples

### Complete Button Example
```tsx
import { Button } from './components/ui/button';
import { Heart } from 'lucide-react';

// Primary CTA
<Button>
  <Heart size={20} />
  Like WG
</Button>

// Secondary Action
<Button variant="outline">
  View Details
</Button>

// Danger Action
<Button variant="destructive">
  Decline
</Button>
```

### Complete Card Example
```tsx
<div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-4">
  <div className="flex items-center justify-between">
    <h3>WG Name</h3>
    <Badge className="bg-[var(--flare-green)] text-white">Active</Badge>
  </div>
  
  <p className="text-sm text-muted-foreground">
    Description text goes here
  </p>
  
  <div className="flex gap-2">
    <Button variant="outline" className="flex-1">Skip</Button>
    <Button className="flex-1">Like</Button>
  </div>
</div>
```

## Design Principles

1. **Clean & Minimal**: Plenty of white space, avoid clutter
2. **Touch-Friendly**: Large touch targets, gesture-friendly
3. **Consistent**: Use design tokens throughout
4. **Accessible**: Meet WCAG AA standards minimum
5. **Delightful**: Smooth animations, thoughtful micro-interactions
6. **Brand-Forward**: Green as primary, warm and welcoming

---

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Maintained by**: Flare Design Team
