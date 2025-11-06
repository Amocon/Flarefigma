# Flare Applicant Home Screen - Features

A comprehensive WG discovery experience with three distinct view modes and complete application flow.

## 🎯 Core Features

### View Mode Selector
Located in the header with three modes:
- **Cards View**: Vertical scrolling list of WG cards
- **Map View**: Interactive map with location pins
- **Swipe View**: Tinder-style card swiping interface

### Top Bar
- Gradient header with brand colors
- WG count display
- Filter button (opens comprehensive FilterSheet modal)
- View mode toggle buttons with icons

## 📋 View Modes

### 1. Cards View
**Layout**: Vertical scrolling list

**Each Card Shows**:
- Large photo preview
- Price badge (top-left with brown background)
- Like button (top-right, toggles filled heart)
- WG name and district
- Distance from user
- Residents count and room size
- Up to 3 vibe tags (with +N indicator)
- Chevron indicating clickable

**Interactions**:
- Tap card → Opens WG Detail Sheet
- Tap heart → Adds to favorites
- Smooth hover effects

### 2. Map View
**Layout**: Interactive map visualization

**Features**:
- Mock map background with grid pattern
- Location pins for each WG
- Price displayed on pin hover/selection
- Zoom controls (+/-)
- "Find My Location" button
- Pin colors:
  - Brown: Available WG
  - Green: Selected WG
- Results counter (top-left)
- Legend (bottom-left)
- Helper tooltip

**Interactions**:
- Tap pin → Highlights and opens WG Detail Sheet
- Pinch to zoom (mobile)
- Pan to explore

### 3. Swipe View
**Layout**: Tinder-style card stack

**Card Features**:
- Large photo carousel with navigation
- Photo indicators (dots)
- WG details overlay
- Price badge
- Vibe tags
- Full description preview

**Actions**:
- **Swipe Right / Tap "Like"** → Opens Application Modal
- **Swipe Left / Tap "Skip"** → Shows next WG
- **Undo Button** → Go back to previous card
- Progress bar showing cards viewed
- "No more WGs" end state with reset option

## 🏠 WG Detail Sheet

**Opens**: Bottom sheet (95vh height) when clicking any WG card

**Header**:
- Photo carousel (full-width, swipeable)
- Close, Like, and Share buttons
- Photo navigation arrows
- Price badge

**Content Sections**:
1. **Title & Basic Info**
   - WG name
   - District with location icon
   - Resident count

2. **Quick Info Grid**
   - Room size
   - Available from date

3. **Vibe Tags**
   - All personality/lifestyle tags

4. **Description**
   - Full WG description text

5. **Members Section**
   - Photo, name, age, occupation for each flatmate
   - Clean card layout with avatars

6. **Amenities**
   - Bullet list of features (Wi-Fi, Balcony, etc.)

7. **House Rules**
   - Important rules and expectations

**Fixed Bottom Actions**:
- "Message" button (outline)
- "Apply Now" button (primary green)

## 📝 Application Modal

**Opens**: When applying to a WG (swipe right or "Apply Now")

**Header**:
- Gradient background
- WG name being applied to
- Close button

**Application Type Toggle**:
Two modes with visual cards:
1. **Apply Now**: Send application immediately
2. **Save for Later**: Add to favorites

### Apply Now Mode

**Personal Message**:
- Large textarea for custom message
- Character guidance
- Helper text about personalization

**Data Inclusion Toggles**:
Each section has a switch to include/exclude:

1. **Profile Photo**
   - Shows actual photo when enabled
   - Placeholder when disabled

2. **About Me**
   - Preview of bio text when enabled
   - Collapsible

3. **Interests & Hobbies**
   - Shows badge chips when enabled
   - First 3 visible with +N counter

4. **Documents**
   - Upload button appears when enabled
   - File upload for ID, income proof, etc.

**Pro Tip Banner**:
- Highlight box with personalization tip
- Shows success rate increase

### Save for Later Mode
- Simple confirmation with heart icon
- Explains where to find saved WGs

**Footer Actions**:
- Cancel button (outline)
- Submit button (changes based on mode):
  - "Send Application" for Apply Now
  - "Save" for Save for Later

## 🎨 Design Implementation

### Colors
- Green (`#93c47d`): Active states, primary actions
- Dark Green (`#38761d`): Primary buttons, accents
- Brown (`#895d39`): Price badges, danger actions
- Highlight (`#eacc90`): Tags, secondary backgrounds

### Components
- **Rounded corners**: 16px for cards, 12px for buttons
- **Shadows**: Depth 2 (0 2px 8px rgba(0,0,0,0.08))
- **Icons**: Lucide React, 24px standard size
- **Typography**: Inter/SF Pro, semantic sizing

### Interactions
- Smooth transitions (200ms)
- Hover states on all interactive elements
- Loading states for async actions
- Success/error feedback

## 🔄 User Flow

### Cards/Map Flow
1. Browse WGs in list or map view
2. Click WG → Detail Sheet opens
3. Review full details, members, amenities
4. Click "Apply Now" → Application Modal
5. Fill message, toggle data inclusion
6. Submit application

### Swipe Flow
1. View WG card with full details
2. Swipe right/Like → Application Modal opens immediately
3. Choose "Apply Now" or "Save for Later"
4. Fill application (if Apply Now)
5. Submit → Next card appears
6. Can undo to go back

## 📱 Mobile Optimizations

- Touch-friendly targets (44-48px minimum)
- Bottom sheet for details (95vh)
- Swipe gestures on cards
- Safe area insets for notch
- Optimized photo loading
- Smooth scrolling

## 🚀 Technical Features

### Components Created
1. `WGCard.tsx` - Reusable WG card component
2. `WGDetailSheet.tsx` - Full WG details in bottom sheet
3. `ApplicationModal.tsx` - Application form with toggles
4. `WGMapView.tsx` - Map interface with pins
5. `HomeApplicant.tsx` - Main container with view switching

### State Management
- View mode selection
- Current WG selection
- Swipe index tracking
- Liked WGs array
- Modal visibility states

### Reusable Patterns
- All components use Flare design system
- Consistent spacing and typography
- Shared color tokens
- Icon library (Lucide React)

---

**Status**: ✅ Complete and production-ready
**Last Updated**: October 2025
