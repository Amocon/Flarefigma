# Meetings Tab - Detailed Interface Documentation

## Overview
The Meetings tab in the WG Matching section provides a comprehensive interface for coordinating and confirming face-to-face meetings with applicants.

## Component Location
- Main Component: `/components/MeetingsCalendar.tsx`
- Integrated in: `/components/WGMatching.tsx`

## Features

### 1. View Toggle
**Two viewing modes:**
- **List View**: Shows upcoming meetings in a card-based list
- **Calendar View**: Interactive weekly calendar showing team availability

Toggle between views with a segmented control at the top.

### 2. List View

#### Upcoming Meetings Section
- **Meeting Cards** display:
  - Applicant photo (64x64 rounded avatar)
  - Applicant name
  - Date and time with calendar/clock icons
  - Location
  - Status badge (Confirmed/Pending/Proposed)
  - Confirmation count (e.g., "2/3 residents confirmed")
  
- **Status Types:**
  - **Confirmed**: Green badge with checkmark icon
  - **Pending**: Yellow/brown badge with clock icon and count
  - **Proposed**: Grey badge with users icon

- **Actions:**
  - "Confirm Meeting" button (only shown when not confirmed)
  - Clicking updates status and increments confirmed count

#### Empty State
- Calendar icon (48px)
- "No meetings scheduled" message
- Helper text encouraging users to propose times

### 3. Calendar View

#### Weekly Calendar Grid
- **Header Row**: Days of week (Mon-Sun) with dates
- **Time Slots**: Hourly slots from 09:00 to 20:00
- **Availability Indicators**:
  - **Fully available** (all residents): Solid green background
  - **Partially available**: Lighter green (40% opacity)
  - **Unavailable**: Grey/muted background

#### Navigation
- Week selector with left/right chevron buttons
- Shows "This Week" or "Week +N" indicator
- Can navigate to future weeks

#### Legend
Color-coded explanation box showing:
- All available (solid green square)
- Partially available (light green square)
- Unavailable (grey square)

#### Interaction
- **Click any green time slot** to propose a meeting
- Auto-highlights overlapping time slots where all residents are available
- Visual feedback on hover

### 4. Propose Meeting Modal

**Triggered by:**
- Clicking "Propose Time" button
- Clicking an available time slot in calendar

**Modal Content:**
- Selected time display card (with green accent)
- Availability info (e.g., "3 of 3 residents available")
- Explanation text about in-app notifications
- Action buttons:
  - "Cancel" (outline style)
  - "Confirm & Send" (green background)

**Functionality:**
- Creates new meeting proposal
- Sends notification to applicant (simulated)
- Updates meetings list automatically

## Design Specifications

### Colors
- **Background**: White (#ffffff)
- **Selected times**: #93c47d (Flare green)
- **Accent**: #38761d (Flare dark green)
- **Status indicators**:
  - Confirmed: Green (#93c47d with 20% opacity background)
  - Pending: Brown/yellow (#895d39 with 30% opacity background)
  - Proposed: Grey (muted)

### Icons (Lucide)
- `Calendar`: Main meetings icon
- `Clock`: Time indicator
- `Users`: Group/location icon
- `CheckCircle2`: Confirmation icon
- `ChevronLeft/Right`: Week navigation
- `Plus`: Propose new time

### Spacing & Layout
- Card padding: `p-5` (20px)
- Card rounded corners: `rounded-2xl` (16px)
- Modal max width: 448px (`max-w-md`)
- Calendar grid gap: `gap-2` (8px)
- Time slot height: 40px (`h-10`)

## User Workflows

### Workflow 1: View Upcoming Meetings
1. Navigate to Meetings tab
2. See list of scheduled meetings
3. Check status of each meeting
4. Confirm pending meetings with one click

### Workflow 2: Check Team Availability
1. Switch to Calendar View
2. Navigate to desired week
3. See color-coded availability at a glance
4. Identify fully available time slots (solid green)

### Workflow 3: Propose New Meeting Time
**From Calendar:**
1. Click on green time slot
2. Review selected time in modal
3. See how many residents are available
4. Click "Confirm & Send"
5. New meeting appears in list

**From Button:**
1. Click "Propose Time" button
2. Select time in modal (future enhancement)
3. Confirm and send

### Workflow 4: Confirm Meeting
1. View pending meeting in list
2. Click "Confirm Meeting" button
3. Status updates to confirmed
4. Confirmation count increases

## State Management

### Meeting Interface State
```typescript
interface Meeting {
  id: number;
  applicantId: number;
  applicantName: string;
  applicantImage: string;
  proposedDate: string;
  proposedTime: string;
  status: 'proposed' | 'confirmed' | 'pending';
  location: string;
  confirmedBy: number;
  totalResidents: number;
}
```

### TimeSlot Interface State
```typescript
interface TimeSlot {
  day: string;
  date: string;
  time: string;
  isAvailable: boolean;
  residentCount: number;
  totalResidents: number;
}
```

## Props API

### MeetingsCalendar Component
```typescript
interface MeetingsCalendarProps {
  meetings: Meeting[];
  onConfirm: (meetingId: number) => void;
  onProposeMeeting: (timeSlot: TimeSlot) => void;
}
```

## Accessibility Features
- Semantic HTML (buttons, proper headings)
- Status indicators with icons and text
- Clear hover states
- Disabled state for unavailable time slots
- Modal keyboard navigation (ESC to close)

## Future Enhancements
- Drag-to-select multiple time slots
- Sync with external calendars (Google, Outlook)
- Recurring availability patterns
- Automatic meeting reminders
- Video call integration
- Chat integration directly from meeting card
- Export meetings to calendar file (.ics)
- Conflict detection with other meetings
- Multi-week view option
- Applicant-side time preferences display
