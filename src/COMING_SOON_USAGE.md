# Coming Soon Screen Component

A reusable placeholder screen template for features under development in the Flare app.

## Component Location
`/components/ComingSoonScreen.tsx`

## Design Specs
- **Background**: White (#ffffff)
- **Icon Color**: #93c47d (Flare green)
- **Button Color**: #38761d (Flare dark green)
- **Icon Size**: 48px in 96px circle with 10% green background
- **Default Icon**: Clock (if not specified)

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | string | Yes | - | Feature name (e.g., "Financial Plan") |
| `description` | string | No | "This feature will be part of the next version of Flare." | Custom description text |
| `icon` | LucideIcon | No | `Clock` | Lucide icon component |
| `onBackToDashboard` | () => void | No | - | Callback when "Back to Dashboard" is clicked |

## Usage Examples

### Basic Usage
```tsx
import { ComingSoonScreen } from './components/ComingSoonScreen';
import { Wallet } from 'lucide-react';

<ComingSoonScreen
  title="Financial Plan"
  icon={Wallet}
  onBackToDashboard={() => navigate('dashboard')}
/>
```

### With Custom Description
```tsx
<ComingSoonScreen
  title="Cleaning Schedule"
  description="Create and manage a fair cleaning rotation for all common areas in your WG. This feature will be part of the next version of Flare."
  icon={Brush}
  onBackToDashboard={() => setActiveScreen('dashboard')}
/>
```

### Minimal Usage (Uses Defaults)
```tsx
<ComingSoonScreen
  title="Shopping List"
  onBackToDashboard={() => goBack()}
/>
```

## Recommended Icons for Features

Based on Lucide icons:

- **Financial Plan**: `Wallet`
- **Cleaning Schedule**: `Brush` (or `Sparkles`)
- **Shopping List**: `ShoppingBag` (or `ShoppingCart`)
- **Shared Calendar**: `Calendar` (or `CalendarDays`)
- **Contract Archive**: `FileText` (or `FolderArchive`)
- **Notifications**: `Bell`
- **Messages**: `MessageCircle`
- **Settings**: `Settings`
- **Help/Support**: `HelpCircle`
- **Coming Soon (general)**: `Clock`, `Construction`, or `Hourglass`

## Visual Structure

```
┌─────────────────────────────────┐
│                                 │
│         ┌─────────┐             │
│         │  Icon   │             │  ← 96x96 circle with green bg
│         └─────────┘             │
│                                 │
│   Feature Name – Coming Soon    │  ← H1 title
│                                 │
│    Short description text       │  ← Body text
│    about the feature and        │
│    when it will be available    │
│                                 │
│   ┌──────────────────┐          │
│   │ Back to Dashboard│          │  ← Button (#38761d)
│   └──────────────────┘          │
│                                 │
│   We're working hard to bring   │  ← Small helper text
│   you this feature. Stay tuned! │
│                                 │
└─────────────────────────────────┘
```

## Integration in App.tsx

Example of integrating in a switch/case navigation:

```tsx
const renderContent = () => {
  switch (activeScreen) {
    case 'financial':
      return (
        <ComingSoonScreen
          title="Financial Plan"
          description="Track shared expenses, split bills, and manage rent payments."
          icon={Wallet}
          onBackToDashboard={() => setActiveScreen('dashboard')}
        />
      );
    case 'cleaning':
      return (
        <ComingSoonScreen
          title="Cleaning Schedule"
          icon={Brush}
          onBackToDashboard={() => setActiveScreen('dashboard')}
        />
      );
    // ... more cases
  }
};
```

## Customization

To modify the component's appearance globally:
1. Edit `/components/ComingSoonScreen.tsx`
2. Update the default description text
3. Change icon size or circle dimensions
4. Modify spacing or typography

## Accessibility
- Uses semantic HTML (h1, p, button)
- Button has clear action label
- Sufficient color contrast for text
- Icon is decorative (aria-hidden would be applied in production)
