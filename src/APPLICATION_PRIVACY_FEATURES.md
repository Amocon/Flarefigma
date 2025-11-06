# Application Form & Privacy Settings - WG-Suchende

Complete implementation of the comprehensive application form and privacy settings for applicants.

---

## 📝 Application Form Modal

**File**: `ApplicationFormModal.tsx`

A fully-featured application form that allows applicants to customize and send their applications to WGs.

### Core Features

#### Application Type Toggle
Two distinct modes:
1. **Apply Now**: Send application immediately
2. **Save for Later**: Save draft to review and send later

Visual card selection with icons and descriptions.

#### Prefilled Editable Fields

All fields are pre-populated from the user's profile and can be edited inline:

1. **Personal Introduction**
   - Multi-line textarea
   - Edit button to toggle editing mode
   - Character guidance
   - Preview when not editing

2. **Hobbies & Interests**
   - Comma-separated input when editing
   - Badge display when viewing
   - Toggle to include/exclude from application
   - Live preview of hobby badges

3. **Contact Information**
   - Email address (editable)
   - Phone number (editable)
   - Inline edit mode
   - Always included (no toggle)

4. **Professional Details**
   - Current occupation/studies
   - Preferred move-in date (date picker)
   - Edit mode with save button

5. **References**
   - Free-text field for previous landlords/flatmates
   - Contact information for references
   - Toggle to include/exclude
   - Multi-line textarea editor

6. **Income Proof**
   - Upload button for salary slips, contracts
   - Toggle to include/exclude
   - File upload placeholder

7. **Additional Documents**
   - ID, SCHUFA, certificates
   - Upload button with file limits (5 files, 10MB each)
   - Toggle to include/exclude

### Visibility Controls

Each section (except contact) has a **Switch toggle** to include/exclude:
- ✅ Profile Photo
- ✅ Hobbies & Interests  
- ✅ References
- ✅ Income Proof
- ✅ Additional Documents

When toggled off, the section is hidden from the preview and won't be sent.

### Edit Functionality

**Inline Editing System**:
- Click "Edit" button next to any section
- Section expands to show editable fields
- "Done" or "Save" button to confirm changes
- Clean transition between view and edit modes

### Visual Design

**Header**:
- Gradient background (Flare green colors)
- Form icon with circular background
- WG name being applied to
- Close button

**Content Area**:
- Scrollable with max-height
- Organized sections with separators
- Muted background cards for each field
- Icon indicators for each section type

**Pro Tip Banner**:
- Highlight background color
- Statistics about application success rates
- Encourages complete applications

**Footer**:
- Sticky at bottom
- Cancel and Submit buttons
- Button text changes based on mode
- Icons for visual clarity

---

## 🔒 Privacy Settings

**File**: `PrivacySettings.tsx`

Comprehensive privacy controls for applicants to manage their visibility and data sharing.

### Main Toggle: Profile Visibility

**"Allow WGs to find and contact me proactively"**

When **Enabled**:
- Profile appears in WG owner searches
- WG owners can view public profile
- Can receive direct invitations
- Green checkmark confirmation card
- Shows detailed visibility settings

When **Disabled**:
- Profile hidden from all searches
- No proactive contact possible
- Can still browse and apply to WGs
- Lock icon information card
- Visibility settings are hidden

### Granular Visibility Controls

When profile visibility is enabled, applicants can control exactly what information is public:

#### Basic Information
- ☑️ **Profile Photo**: Show/hide profile picture
- ☑️ **Full Name**: Toggle between "Anna" vs "Anna Müller"
- ☑️ **Age**: Show/hide age number

#### Contact Information
- ☑️ **Email Address**: Make email visible to all
- ☑️ **Phone Number**: Make phone visible to all
- ⚠️ **Warning Banner**: Appears when contact info is public, warns about unsolicited messages

#### Professional & Lifestyle
- ☑️ **Occupation**: Job/studies information
- ☑️ **About Me**: Personal bio and description
- ☑️ **Hobbies & Interests**: Interest tags
- ☑️ **What I'm Looking For**: Preferences and requirements

### Visibility Status

**Live Counter Badge**: Shows "X of 9 fields" visible
- Updates in real-time as toggles change
- Quick visual indicator of profile completeness

### Preview Feature

**"Preview My Public Profile" Button**:
- Opens `PublicProfilePreview` modal
- Shows exactly what WG owners see
- Respects all visibility settings
- Hidden fields are marked with notice
- Full-screen modal with scrolling

### Data Privacy Information

**Privacy Assurance Card**:
- ✅ Data encryption notice
- ✅ Verified WG owners only
- ✅ Account deletion rights
- Link to full Privacy Policy

### Navigation

**Back Button**:
- Arrow icon in header
- Returns to main profile
- Only shown when `onBack` prop provided

---

## 👁️ Public Profile Preview

**File**: `PublicProfilePreview.tsx`

A modal that shows exactly how the applicant's profile appears to WG owners.

### Features

**Dynamic Content Display**:
- Only shows fields that are toggled as "visible"
- Real-time reflection of privacy settings
- Conditional rendering for each section

**Profile Sections** (conditionally shown):
1. **Header**
   - Profile photo or placeholder
   - Name (full or first only)
   - Age (if enabled)
   - Location (always shown)

2. **Contact Information**
   - Email (if enabled)
   - Phone (if enabled)
   - Icon indicators for each

3. **Occupation**
   - Job/studies details
   - Muted card design

4. **About Me**
   - Personal bio text
   - Paragraph formatting

5. **Hobbies & Interests**
   - Badge chips for each hobby
   - Secondary badge styling

6. **What I'm Looking For**
   - Preferences description
   - Requirements text

7. **Availability**
   - Move-in date (always shown)
   - Calendar icon

**Hidden Fields Notice**:
- Amber warning card
- Appears when any field is hidden
- Explains that hidden info can still be included in applications
- Eye-off icon indicator

---

## 🎨 Design System Compliance

### Colors

**Primary Actions** (Apply/Send/Save):
- Background: `#38761d` (Dark Green)
- Text: White
- Hover: Darker shade

**Secondary Actions** (Cancel/Outline):
- Border: `#93c47d` (Green)
- Background: Transparent
- Text: Dark

**Danger/Warning**:
- Background: `#895d39` (Brown)
- Used sparingly for important notices

**Highlights**:
- Background: `#eacc90` (Highlight)
- For tips, badges, and soft emphasis

### Icons (Lucide React)

All icons at 16-20px size:
- ✏️ `Edit` - Edit functionality
- 👁️ `Eye` - Visibility/preview
- 👁️‍🗨️ `EyeOff` - Hidden content
- 🔒 `Lock` - Privacy/security
- ✅ `Check` / `CheckCircle2` - Confirmations
- 📧 `Mail` - Email
- 📞 `Phone` - Phone contact
- 💼 `Briefcase` - Occupation
- ❤️ `Heart` - Interests/save
- 📄 `FileText` - Documents
- 🏠 `Home` - Move-in details
- 🛡️ `Shield` - Privacy/security
- 👤 `User` - Profile

### Layout Patterns

**Modal Structure**:
1. Gradient header (sticky)
2. Scrollable content area
3. Sticky footer with actions

**Card Sections**:
- Rounded-xl borders (12px)
- Muted backgrounds for read-only
- White backgrounds for interactive
- Consistent padding (p-4 or p-6)

**Separators**:
- Used between major sections
- Subtle gray color
- Proper spacing

**Toggle Switches**:
- Flare green when active
- Gray when inactive
- Smooth transitions

---

## 💡 User Experience Features

### Application Form

**Smart Defaults**:
- All fields prefilled from profile
- Common toggles enabled by default
- Sensible suggestions for what to include

**Inline Editing**:
- No need to navigate away
- Edit mode clearly indicated
- Save/cancel options always visible

**Progress Indicators**:
- Shows what's included/excluded
- Visual feedback for actions
- Pro tips for success

**Validation** (implementable):
- Required field checking
- Format validation (email, phone)
- File size/type validation

### Privacy Settings

**Clear Communication**:
- Explains what each toggle does
- Shows consequences of choices
- Visual indicators (icons, colors)

**Warning Systems**:
- Alerts for sensitive data sharing
- Recommendations for privacy
- Explanation text for complex options

**Live Preview**:
- See changes instantly
- No guessing about visibility
- Confidence in privacy choices

### Accessibility

**Keyboard Navigation**:
- All interactive elements focusable
- Tab order makes sense
- Enter/Space for activation

**Screen Reader Support**:
- Semantic HTML structure
- ARIA labels where needed
- Descriptive button text

**Touch Targets**:
- Minimum 44px for buttons
- Adequate spacing between controls
- Large switch toggles

---

## 🔄 Integration Points

### ProfileApplicant Integration

The Privacy Settings is accessed from the main profile:
1. Click Settings icon in profile header
2. Shows PrivacySettings component
3. Back button returns to profile
4. State managed in ProfileApplicant

### Application Flow

1. **User swipes right on WG** → `ApplicationFormModal` opens
2. **User clicks "Apply Now" on WG detail** → `ApplicationFormModal` opens
3. **User edits fields** → Changes saved locally
4. **User toggles sections** → Preview updates
5. **User submits** → Data sent to backend
6. **"Save for Later"** → Draft saved to applications tab

### Data Flow

**Profile → Form**:
```typescript
{
  intro: string,
  hobbies: string[],
  references: string,
  contactEmail: string,
  contactPhone: string,
  occupation: string,
  moveInDate: string,
  // Plus toggles
  includePhoto: boolean,
  includeHobbies: boolean,
  includeReferences: boolean,
  includeIncome: boolean,
  includeDocuments: boolean,
  applyNow: boolean
}
```

**Privacy Settings → Backend**:
```typescript
{
  allowProactiveContact: boolean,
  visibility: {
    showPhoto: boolean,
    showFullName: boolean,
    showAge: boolean,
    showEmail: boolean,
    showPhone: boolean,
    showOccupation: boolean,
    showAbout: boolean,
    showHobbies: boolean,
    showLookingFor: boolean
  }
}
```

---

## 📱 Mobile Optimizations

**Modal Sizing**:
- 95vw width on mobile
- 92vh max height
- Proper overflow handling
- Safe area insets

**Touch Interactions**:
- Large tap targets
- Swipe-friendly scrolling
- No hover dependencies
- Smooth transitions

**Performance**:
- Lazy loading for modals
- Efficient re-renders
- Optimized images
- Minimal animations

---

## 🎯 Success Metrics (Suggested)

**Application Quality**:
- % of applications with complete information
- Average fields included per application
- Response rate correlation with completeness

**Privacy Adoption**:
- % of users with proactive contact enabled
- Average fields shown publicly
- Profile view to application ratio

**User Satisfaction**:
- Time to complete application
- Edit frequency before submission
- Privacy setting adjustment frequency

---

## 🚀 Future Enhancements

**Application Form**:
- [ ] Auto-save drafts periodically
- [ ] Application templates for different WG types
- [ ] AI suggestions for improving bio
- [ ] Video introduction option
- [ ] Multiple document uploads with preview
- [ ] Character counter on text fields

**Privacy Settings**:
- [ ] Privacy presets (Minimal, Balanced, Open)
- [ ] Activity log (who viewed profile)
- [ ] Block specific users/WGs
- [ ] Temporary visibility boost
- [ ] Privacy score with recommendations

**Profile Preview**:
- [ ] Share link to public profile
- [ ] QR code for profile
- [ ] Profile strength meter
- [ ] A/B testing profile variations

---

**Status**: ✅ Complete and production-ready  
**Last Updated**: October 2025  
**Design System**: Flare v1.0.0
