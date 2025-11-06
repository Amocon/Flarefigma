# WG-Bewohner Home Screen - Features

Comprehensive home screen for WG residents to manage their flat, review applicants, and coordinate with flatmates.

---

## 🏠 WG Overview Section

**Location**: Top of screen

### WG Header
- **WG Name**: "Cozy Kreuzberg WG" (editable)
- **Location**: District/City display
- **Status Badge**: Visual indicator of current search status
  - 🟢 **Searching** (green): Actively looking for flatmates
  - ⚪ **Full** (gray): Not accepting applications
  - ⚫ **Inactive** (gray): Paused/hidden from search

### Status Card
**Gradient Background**: White/10 backdrop with blur
- Current status message (e.g., "Looking for 1 new flatmate")
- **"Edit" Button**: Opens Search Parameters modal
  - Settings icon
  - Quick access to WG configuration

---

## ⚙️ Search Parameters Modal

**File**: `SearchParametersModal.tsx`

Complete control center for managing how the WG appears in search and handles applications.

### Settings Available

#### 1. Maximum Applications
- **Slider**: 5-100 applications
- **Live Counter**: Shows current number
- **Auto-hide**: When limit reached, WG automatically hidden from search
- **Description**: Clear explanation of behavior

#### 2. Auto-Hide When Full Toggle
- **Switch**: Enable/disable
- **Behavior**: Automatically hides WG when status set to "Full"
- **Use Case**: Prevents new applications when room is taken

#### 3. Auto-Reject Old Applications
- **Slider**: 7-30 days
- **Function**: Automatically decline applications older than X days
- **Benefit**: Keeps application queue fresh and manageable

#### 4. WG Description
- **Multi-line Textarea**: 500 character limit
- **Character Counter**: Live count display
- **Purpose**: Describe WG vibe, expectations, and ideal flatmate
- **Example**: Pre-filled with quality description

#### 5. WG Vibe Tags
**Tag Management System**:

**Selected Tags Display**:
- Green badges with "×" to remove
- Count display (e.g., "Selected Tags (4)")
- Muted card background

**Quick Select Tags**:
- Pre-defined tags with "+" icon
- Categories:
  - Lifestyle: Social, Quiet, Clean
  - Activities: Cooking, Party-friendly, Music-loving
  - Values: Open-minded, LGBTQ+ friendly, Pet-friendly
  - Dietary: Vegetarian, Vegan
  - Type: Professional, Students, Non-smoker
  - Interests: Sports, Gaming, Art

**Custom Tag Input**:
- Text input field
- "Add" button
- Press Enter to add
- No duplicates allowed

**Visual Design**:
- Gradient header (Flare green)
- Scrollable content area
- Pro tip banner at bottom
- Save/Cancel actions in sticky footer

---

## 👥 Applicants Section

**Two View Modes**: List and Swipe

### View Mode Toggle
**Styled Selector**:
- Muted background with rounded corners
- Two options:
  - 📋 **List**: Traditional card list view
  - 🎴 **Swipe**: Tinder-style swipe interface
- Active mode: White background with shadow
- Smooth transitions between modes

### List View

**File**: Uses `ApplicantCard.tsx`

**Each Card Shows**:
- Profile photo (avatar)
- Name and age
- Location and occupation
- Short bio/introduction
- Interest tags (badges)
- Application date

**Actions Per Card**:
- **View Profile**: Opens detailed modal
- **Chat**: Initiates conversation
- **Invite**: Send formal invitation

**Layout**:
- Vertical stack with spacing
- Hover effects for interactivity
- Clean card design with borders

### Swipe View

**File**: `ApplicantSwipeCard.tsx`

**Tinder-Style Interface**:

**Card Design**:
- Large photo header (80% height)
- Gradient overlay for text readability
- Name, age, location, occupation on photo
- "View Details" button (top-right)
- Photo navigation if multiple photos available

**Content Below Photo**:
1. **Move-in Date Card**
   - Muted background
   - Calendar icon
   - Clear date display

2. **About Section**
   - Full introduction text
   - Paragraph formatting
   - Easy to read

3. **Interests Display**
   - Badge chips for each interest
   - Shows first 6 interests
   - "+N more" if additional interests

**Action Buttons** (Large, Full Width):
- ❌ **Dismiss**: Left button, outline style, brown accent
- 💬 **Chat**: Right button, primary green, filled

**Swipe Gestures**:
- **Swipe Left**: Dismiss applicant
- **Swipe Right**: Start chat
- Minimum swipe distance: 50px
- Smooth animations on swipe
- Visual feedback during swipe

**Progress Tracking**:
- Counter: "Viewing X of Y"
- Progress bar (green)
- Updates as you swipe

**Undo Functionality**:
- Button appears after swiping
- Go back one applicant
- Restores previous state

**End State**:
- "All done!" message
- Celebration icon (users)
- "Review Again" button to restart

**Helper Text**:
- "Swipe left to dismiss • Swipe right to chat"
- Subtle, below buttons

---

## 📋 Applicant Detail Modal

**File**: `ApplicantDetailModal.tsx`

Full-screen modal showing complete applicant information.

### Header Section
**Photo Carousel**:
- Full-width photo display (h-72)
- Gradient overlay for name/info
- Photo navigation arrows (if multiple photos)
- Photo indicator dots
- Smooth transitions

**Close Button**: Top-right

**Overlay Info**:
- Name and age
- Location (with pin icon)
- Occupation (with briefcase icon)

### Content Sections (Scrollable)

1. **Application Date**
   - Muted card
   - "Applied on [date]"

2. **Move-in Date**
   - Calendar icon
   - Preferred move-in date

3. **About**
   - Full introduction text
   - Paragraph formatting

4. **Interests & Hobbies**
   - All interest badges
   - Secondary badge styling

5. **What I'm Looking For**
   - Applicant's preferences
   - Expectations for WG

6. **Contact Information** (if provided)
   - Email (clickable mailto:)
   - Phone (clickable tel:)
   - Icons for each

7. **References** (if provided)
   - Landlord/flatmate references
   - Contact information
   - Muted card display

### Fixed Bottom Actions
**Sticky Footer**:
- 💬 **Chat**: Outline button
- ✅ **Invite**: Primary button
- Equal width, large size
- Icons with text

---

## 📅 Availability Calendar

**File**: `AvailabilityCalendar.tsx`

Weekly scheduling grid for WG members to coordinate meeting times.

### Header
- Calendar icon with title
- **"Find Best Times" Button**: Toggles best time suggestions
- Description text

### Member Legend
**Muted Card Display**:
- All WG member avatars
- Names below each avatar
- "You" badge for current user
- Helps identify who's who in the grid

### Best Times Panel
**Toggleable Display** (when activated):
- Highlight background (Flare yellow/30)
- Sparkles icon
- Top 5 time slots with most overlap
- Format: "Day at HH:00"
- Shows member count (e.g., "3/4 available")
- Sorted by most to least overlap

### Calendar Grid

**Time Range**: 14:00 - 23:00 (2pm - 11pm)
**Days**: Monday - Sunday

**Grid Structure**:
- 8 columns (time label + 7 days)
- 10 rows (hour slots)
- Responsive with horizontal scroll on mobile

**Time Slot Styling**:

**Color Coding**:
1. **Not Available**: Gray muted background
2. **1 Person Available**: Light green (10% opacity)
3. **2+ People Available**: Medium green (30% opacity) + border
4. **Everyone Available**: Highlight color + thick green border

**Overlap Indicators**:
- Number displayed in cell when 2+ members
- Shows exact count of available members

**Current User Highlight**:
- Ring around selected slots (green-dark)
- Ring offset for visibility
- Distinguishes your slots from others'

**Interactions**:
- **Click to Toggle**: Add/remove your availability
- **Visual Feedback**: Immediate color change
- **Smooth Transitions**: All color changes animated

### Legend
**Color Guide Card**:
- Visual squares showing each state
- Text labels explaining colors
- Easy reference for users

### Helper Text
💡 "Click on time slots to mark when you're free. Overlapping times will be highlighted."

---

## 🎨 Design System Compliance

### Colors

**Primary Actions**:
- `#38761d` (Dark Green): Chat, Invite, Save
- Hover: Darker shade

**Secondary Actions**:
- `#93c47d` (Green): Borders, active states
- Outline buttons

**Warning/Dismiss**:
- `#895d39` (Brown): Dismiss buttons
- Subtle, not aggressive

**Highlights**:
- `#eacc90` (Highlight): Calendar overlaps, tips
- Warm, inviting

**Status Colors**:
- Green: Searching/Active
- Gray: Full/Inactive

### Icons (Lucide React)

**Navigation & Actions**:
- 🏠 `Home` - WG home
- ⚙️ `Settings` - Edit parameters
- 👥 `Users` - Members, applicants
- 💬 `MessageCircle` - Chat actions
- ✅ `UserCheck` - Invite action
- ❌ `X` - Close, dismiss
- ❤️ `Heart` - Like/favorite
- ↩️ `RotateCcw` - Undo

**Information**:
- 📍 `MapPin` - Location
- 💼 `Briefcase` - Occupation
- 📅 `Calendar` - Dates, scheduling
- 📧 `Mail` - Email
- 📞 `Phone` - Phone contact
- 📄 `FileText` - Description
- #️⃣ `Hash` - Tags
- ⚠️ `AlertCircle` - Warnings

**View Controls**:
- 📋 `LayoutList` - List view
- 🎴 `Layers` - Swipe view
- ◀️ `ChevronLeft` - Previous
- ▶️ `ChevronRight` - Next/Details
- ✨ `Sparkles` - Best times

### Layout Patterns

**Cards**:
- Border radius: 16-24px (rounded-2xl to rounded-3xl)
- Shadow: sm for regular, lg for modals
- Padding: 4-6 (p-4 to p-6)
- Border: 1px solid border color

**Modals**:
- Max width: 95vw mobile, lg desktop
- Max height: 92vh
- Gradient header (sticky)
- Scrollable content
- Sticky footer with actions

**Buttons**:
- Large size for primary actions
- Icon + text for clarity
- Rounded: 12-16px
- Min height: 44px (touch-friendly)

**Badges**:
- Rounded-full for tags
- Small text (text-sm)
- Consistent padding
- Click handlers when interactive

---

## 💡 User Experience Features

### Intelligent Defaults
- **Max Applications**: 20 (balanced)
- **Auto-hide**: Enabled (prevents spam)
- **Auto-reject**: 14 days (reasonable window)
- **Pre-filled Description**: Example text
- **Common Tags**: Pre-selected based on WG type

### Progressive Disclosure
- Simple view by default
- Detailed settings in modal
- Advanced options clearly labeled
- Help text for complex features

### Feedback & Confirmation
- **Save Actions**: Visual confirmation
- **Swipe Gestures**: Animation feedback
- **Slot Selection**: Immediate color change
- **Progress Tracking**: Always visible

### Error Prevention
- **No Duplicate Tags**: System prevents
- **Character Limits**: Live counter
- **Min/Max Values**: Slider constraints
- **Undo Option**: Available in swipe mode

### Mobile Optimization
- **Touch Targets**: 44px minimum
- **Swipe Gestures**: Native feel
- **Horizontal Scroll**: Calendar on mobile
- **Bottom Actions**: Thumb-reachable
- **Safe Areas**: Proper spacing

---

## 🔄 User Flows

### Editing WG Search Parameters
1. Click "Edit" button in header
2. Modal opens with current settings
3. Adjust sliders, text, tags
4. View character count, limits
5. Click "Save Changes"
6. Modal closes with confirmation

### Reviewing Applicants (List)
1. Browse applicant cards
2. Read short bio, see interests
3. Click "View Profile" for full details
4. Read complete information
5. Click "Chat" or "Invite"
6. Return to list or continue reviewing

### Reviewing Applicants (Swipe)
1. Switch to swipe mode
2. View full applicant card
3. Read information
4. Swipe left (dismiss) or right (chat)
5. Or use buttons at bottom
6. Progress updates
7. Undo if needed
8. Continue until all reviewed

### Coordinating Availability
1. Scroll to calendar section
2. View member legend
3. Click time slots to mark availability
4. See overlapping times highlighted
5. Click "Find Best Times"
6. View top 5 suggested meeting times
7. Share with flatmates

---

## 📊 Data Structures

### Search Parameters
```typescript
{
  maxApplications: number,        // 5-100
  wgDescription: string,           // 0-500 chars
  tags: string[],                  // Array of tags
  autoHideWhenFull: boolean,       // Toggle
  autoRejectAfterDays: number      // 7-30
}
```

### Applicant Data
```typescript
{
  id: string,
  name: string,
  age: number,
  photo: string,
  photos?: string[],               // Optional multiple
  location: string,
  occupation: string,
  intro: string,
  interests: string[],
  lookingFor: string,
  moveInDate: string,
  email?: string,                  // Optional
  phone?: string,                  // Optional
  references?: string,             // Optional
  applicationDate: string
}
```

### Availability Slot
```typescript
{
  day: number,        // 0-6 (Mon-Sun)
  hour: number,       // 0-23
  memberId: string    // Who's available
}
```

### WG Member
```typescript
{
  id: string,
  name: string,
  photo: string
}
```

---

## 🚀 Technical Implementation

### State Management

**HomeResident Component**:
- `wgStatus`: 'searching' | 'full' | 'inactive'
- `viewMode`: 'list' | 'swipe'
- `showSearchParams`: boolean
- `showApplicantDetail`: boolean
- `selectedApplicant`: Applicant | null
- `currentSwipeIndex`: number

**Calendar Component**:
- `selectedSlots`: TimeSlot[]
- `showBestTimes`: boolean
- Local slot management
- Overlap calculations

**Modals**:
- Controlled by parent
- `open` prop for visibility
- Callbacks for actions
- Local state for edits

### Performance Optimizations

**Image Loading**:
- `ImageWithFallback` component
- Lazy loading
- Proper sizing
- Optimized formats

**List Rendering**:
- Map with keys
- Conditional rendering
- Efficient re-renders

**Gesture Handling**:
- Touch event listeners
- Debouncing for smooth UX
- CSS transitions for animations

---

## 🎯 Success Metrics (Suggested)

**Applicant Review Efficiency**:
- Time to review all applicants
- Swipe mode vs List mode usage
- Undo button usage frequency

**WG Configuration**:
- % of WGs with custom descriptions
- Average number of tags selected
- Auto-hide adoption rate

**Coordination Features**:
- Calendar usage frequency
- Best times feature usage
- Meeting scheduling success rate

**Communication**:
- Chat initiation rate
- Invitation acceptance rate
- Response time to applicants

---

## 🔮 Future Enhancements

**Search Parameters**:
- [ ] Templates for different WG types
- [ ] A/B testing descriptions
- [ ] Tag suggestions based on description
- [ ] Preview how WG appears in search

**Applicant Review**:
- [ ] AI-powered matching scores
- [ ] Filter applicants by criteria
- [ ] Bulk actions (dismiss multiple)
- [ ] Notes on applicants
- [ ] Favorites/shortlist

**Calendar**:
- [ ] Export to Google Calendar
- [ ] Recurring availability
- [ ] Event scheduling integration
- [ ] Reminders for meetings
- [ ] Video call integration

**Analytics**:
- [ ] Application statistics
- [ ] View/application ratio
- [ ] Popular WG attributes
- [ ] Response rate tracking

---

**Status**: ✅ Complete and production-ready  
**Last Updated**: October 2025  
**Design System**: Flare v1.0.0  
**Components**: 4 new, 1 updated
