# Remotion Teaser Video Prompt — Vivaaham

> Copy-paste this entire prompt into Claude when working inside a Remotion project.
> Adjust duration / fps / resolution as needed.

---

## Prompt

You are building a **Remotion (React) teaser video** for **Vivaaham** — India's #1 wedding management platform. The video should be **60–90 seconds**, 30 fps, 1920×1080.

---

### 🎨 Brand Identity & Design Tokens

Use these exact values everywhere:

| Token | Value |
|---|---|
| **Primary (Maroon)** | `#8B1A4A` |
| **Accent (Gold)** | `#D4A843` |
| **Background (Cream)** | `#FDFAF6` |
| **Background Alt** | `#F7F0E8` |
| **Card Background** | `#FFFFFF` |
| **Text** | `#2D1B14` |
| **Text Muted** | `#7A6B63` |
| **Border** | `#E8DDD4` |
| **Success** | `#2E7D32` |
| **Danger** | `#C8553D` |
| **Sidebar Dark** | `#2D1B14` |
| **Heading Font** | `Playfair Display`, serif |
| **Body Font** | `Inter`, sans-serif |
| **Gradient** | `linear-gradient(135deg, #8B1A4A, #D4A843)` |

The aesthetic is **warm, premium, and culturally Indian** — think royal maroon & gold, not generic SaaS blue. Use the gradient liberally for CTAs, progress bars, and highlights.

---

### 🪄 Animation Style Guidelines

- Prefer smooth **spring** animations and gentle easing (`easeInOut`, `easeOut`)
- UI elements should **slide in**, **fade up**, or **scale in** — never just pop
- Use staggered delays (100–200ms between siblings) for lists, cards, stat blocks
- Subtle **glow / shimmer** on gold elements
- Floating particles or subtle marigold petals drifting in the background for Indian wedding vibes
- Use **blurred depth-of-field** backgrounds and gentle parallax where possible
- Numbers and stats should **count up** (interpolate from 0 to target value)
- Progress bars should animate from 0% → target width

---

### 🎬 Scene-by-Scene Storyboard

#### Scene 1 — The Pain Point (0:00 – 0:08)

Dark/dim background. Flash quick text lines one by one, rapid-fire, each with a slight shake or glitch effect:

1. `"47 spreadsheets."` 
2. `"12 WhatsApp groups."`
3. `"800+ guests."`
4. `""I'll handle it" — that one cousin."`

Then smash-cut to black, brief pause.

#### Scene 2 — Logo Reveal (0:08 – 0:12)

Vivaaham logo fades in center-screen on the cream `#FDFAF6` background with a warm gold shimmer. The logo is two interlocking circles (white stroke + gold stroke) with "Vivaaham" in Playfair Display. Below it, a tagline fades in: **"India's #1 Wedding Command Centre"**. Subtle marigold petal particles drift in the background.

#### Scene 3 — Dashboard Overview (0:12 – 0:25)

Simulate the actual Vivaaham dashboard UI:

- **Left sidebar** (dark `#2D1B14`): Show the Vivaaham logo, then nav items slide in one by one with their icons — Dashboard, Guests & RSVP, Venues & Rooms, Vendors, Food & Catering, Décor & Themes, Budget Tracker, Travel & Logistics, Gift Registry, Tasks & Checklist, Digital Invites, Event Timeline, Ceremony Script, Activity Log, Export & Reports, Team Management.
- **Top bar**: "Welcome, Rahul 👋" with subtitle "The wedding of **Priya** & **Arjun**"
- **Countdown banner**: Bold gradient card (`#8B1A4A` → `#D4A843`) showing "**26 Days To Go! 🎊**" with the date "Sunday, 15 March 2026"
- **Stat cards** (count-up animation):
  - 👥 Total Guests: **847** (623 accepted)
  - ✅ Tasks Done: **78%** (50 of 64)
  - 💰 Budget Used: **₹18.2L** (of ₹24.5L)
  - 📋 Pending: **6** (2 overdue)
- **Upcoming Events** panel with Haldi (13 Feb), Sangeet (14 Feb), Wedding (15 Feb)
- **Recent Activity** feed showing live updates ("Mummy Ji finalized menu for Sangeet", "Papa Ji reviewed budget")

Camera should slowly **zoom into** individual sections as they animate in.

#### Scene 4 — Feature Showcase Montage (0:25 – 0:55)

Rapid but elegant transitions between mock dashboard screens. Each screen slides in from the right or scales up, holds for 3–4 seconds, then transitions. Overlay a small **feature label** badge in the top-right corner (pill-shaped, primary/gold gradient background, white text).

**Screen 4a — Guests & RSVP** (3–4s)
- Stats: 623 Accepted · 156 Pending · 68 Declined
- Table showing: Sharma Family (x8) → Accepted (green badge), Rajesh Kapoor → Pending (yellow), Vikram Singhania → Pending, Sunita Devi → Declined (red)
- Search bar + filter dropdowns (Bride/Groom side, RSVP status)
- Show bulk actions bar: "3 selected → Send Reminder, Remove"

**Screen 4b — Venues & Rooms** (3–4s)
- Taj Palace Jaipur → Wedding Ceremony → Confirmed ✅
- Royal Orchid Lawns → Mehendi & Sangeet → Confirmed ✅
- ITC Rajputana → Reception → Deposit Paid 🟡
- Room allocation: "25/30 rooms assigned" with a progress bar

**Screen 4c — Budget Tracker** (3–4s)
- Total: ₹24.5L · Spent: ₹18.2L · Remaining: ₹6.3L
- Animated bar chart showing category breakdown (Venue, Catering, Décor, Photography, Attire, Travel)
- Table: Venue ₹8L budget vs ₹7.5L actual → "Under" green, Décor ₹4L vs ₹4.7L → "Over ₹70K" red

**Screen 4d — Vendors** (3s)
- Rajan Photography ₹2.5L → Paid ✅
- Annapurna Caterers ₹4.8L → 50% Paid 🟡
- Blooms & Petals ₹1.2L → Unpaid 🔴
- Star ratings shown

**Screen 4e — Tasks & Checklist** (3s)
- Strikethrough completed tasks (Book mehendi artist ✓)
- Overdue alert: "Finalize reception menu — Overdue by 2 days" in red
- In-progress: "Send reminder to pending RSVPs — Due tomorrow"
- Progress bar at 78%

**Screen 4f — Food & Catering** (3s)
- Event menus: Mehendi → Chaat & Street Food (finalized), Wedding → Full Rajasthani Thali (tasting due)
- Dietary notes: "120 guests — Pure Vegetarian (Jain)", "8 guests — Gluten Free"

**Screen 4g — Digital Invitations** (3s)
- 3 invitation designs: Royal Rajputana (main), Sangeet Night (Bollywood theme), Haldi Ceremony
- Delivery stats: 580 sent via WhatsApp → 512 opened (88%)
- Multi-channel: WhatsApp, Email, SMS

**Screen 4h — Travel & Logistics** (3s)
- Sharma Family (x8) → Flight DEL→JAI → Pickup Arranged ✅
- Gupta Ji → Train from Mumbai → Pickup Pending 🟡
- Stats: 120 outstation guests, 18 pickups scheduled

**Screen 4i — Team / Family Collaboration** (3s)
- Rahul (Bride's Brother) → Admin → All sections
- Papa Ji → Viewer → Budget, Vendors
- Mummy Ji → Editor → Food, Décor, Guests
- Priya (Bride) → Editor → Décor, Invitations
- Show role-based access concept

#### Scene 5 — "How It Works" (0:55 – 1:05)

Three animated cards slide up one after another with numbered badges:

1. **Sign Up & Set Up** (UserPlus icon) — "Create your wedding workspace in 2 minutes"
2. **Plan & Manage** (LayoutGrid icon) — "Guests, vendors, budgets — all in one place"
3. **Celebrate** (PartyPopper icon) — "Sit back and enjoy the baraat 🎉"

Arrows or connecting lines animate between them.

#### Scene 6 — Emotional Hook (1:05 – 1:15)

Slow, warm transition. Display the "Built for Indian Families" messaging:

> *"Dear Bride's Brother, We See You."*

Then show the three quote cards stacking/sliding in:
- 💬 *"Bhaiya, pandit ji ka number bhejo"* — Every relative, ever
- 📵 *"12 missed calls from caterer"* — Your phone, daily
- ✅ *"Everything is on Vivaaham now!"* — You, after signing up *(highlighted with green border)*

#### Scene 7 — Pricing Flash (1:15 – 1:20)

Quick 3-column layout animating in:

| Shubh | Mangal ⭐ | Shahi |
|---|---|---|
| ₹4,999 | ₹9,999 | ₹19,999 |
| 300 guests | 1,000 guests | Unlimited |
| 3 events | Unlimited | Unlimited |

The "Mangal" column should have a "Most Popular" ribbon and a slight scale-up / glow.

#### Scene 8 — CTA & Close (1:20 – 1:30)

Cream background. The Vivaaham logo + tagline centered. A gradient CTA button pulses gently:

**"Book a Free Demo →"**

Below: *"From haldi to vidaai — we've got you covered."*

Subtle confetti / sparkle burst animation.

---

### 🎵 Audio / Music Notes

- Use upbeat, modern Indian-fusion background music (sitar + electronic beats)
- Consider a brief dhol hit or shehnai snippet on the logo reveal
- Whoosh sounds on slide transitions
- Gentle *ding* on stat count-ups completing

---

### 📦 Technical Notes for Remotion

- Use `@remotion/transitions` for slide/fade between scenes
- Use `interpolate()` for number count-ups and progress bar widths
- Use `spring()` for UI element entrances
- Load **Playfair Display** (700 weight) and **Inter** (400, 500, 600) via `@remotion/google-fonts`
- Keep all colors in a shared `theme.ts` constants file
- Structure: one `<Composition>` with `<Series>` of scene components
- Each scene = its own React component for maintainability

---

### 🌺 Key Personality Reminders

- This is NOT a generic SaaS tool — it's deeply Indian. Use Hindi terms naturally: *baraat, pandit ji, mehendi, haldi, sangeet, vidaai, shagun, muhurat*
- The humor and warmth matter: the "one cousin who says I'll handle it", "mausaji who needs AC not a cooler"
- Show real Indian wedding data (₹ prices, Indian names, Indian cities like Jaipur)
- The dark sidebar + cream content area + maroon/gold accents should feel **royal and premium**
- Think Taj Palace, not Silicon Valley
