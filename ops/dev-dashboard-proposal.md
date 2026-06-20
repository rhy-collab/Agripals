# Agripals Dev Server / Dashboard Proposal

**Purpose:** Simple operations dashboard for real-time order tracking  
**Stack:** Next.js + Tailwind + Supabase (or just JSON files initially)  
**Timeline:** Post-MVP (after first 10 deliveries prove model works)

---

## Phase 1: Static Dashboard (MVP)

**Tech:** Plain HTML + CSV import  
**Features:**
- Single-page dashboard
- Upload `order-tracker.csv`
- Display orders in table
- Color-coded status badges
- Simple filters (status, date range)

**Why:** No backend needed, Rhys can run locally, no hosting costs.

---

## Phase 2: Live Dashboard (Post-Seed)

**Tech:** Next.js + Vercel + Supabase (PostgreSQL)  
**Features:**
- Real-time order updates via SMS webhook
- Auto-assign backup farmers when supply fails
- SMS template generator
- Photo upload storage
- Analytics dashboard (success rate, margin, delivery time)

**Why:** Scalable, handles 100+ orders/week, enables automation.

---

## Proposed Routes

### `/` - Dashboard Home
- Live order table
- Status overview cards (pending / in_transit / delivered / failed)
- Today's deliveries count
- Next actions list

### `/orders` - All Orders
- Searchable, filterable table
- Export to CSV
- Bulk status updates

### `/orders/[id]` - Order Detail
- Full timeline (placed → confirmed → picked up → delivered)
- SMS history
- Photo proofs
- Issue log

### `/farmers` - Farmer Network
- List of farmers with availability status
- Weekly availability check sent via SMS
- Backup farmer assignment

### `/analytics` - Metrics
- Success rate chart
- Average delivery time trend
- Margin analysis
- Failure reasons breakdown

### `/sms` - SMS Templates
- Pre-written templates for:
  - Order confirmation
  - Pickup reminder
  - Delivery confirmation
- Quick send via Twilio integration

---

## Tech Stack Details

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Recharts** for analytics visualizations

### Backend
- **Supabase** (PostgreSQL + Auth + Storage)
- **Vercel** for deployment
- **Twilio** for SMS webhooks

### Database Schema

#### `orders` table
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  order_date TIMESTAMP,
  chef_name TEXT,
  chef_contact TEXT,
  farmer_name TEXT,
  farmer_contact TEXT,
  quantity TEXT,
  grade TEXT,
  pickup_location TEXT,
  pickup_time TIMESTAMP,
  pickup_confirmed BOOLEAN,
  pickup_driver TEXT,
  pickup_photo_url TEXT,
  depot_arrival_time TIMESTAMP,
  depot_status TEXT,
  final_driver TEXT,
  delivery_time TIMESTAMP,
  delivery_confirmed BOOLEAN,
  delivery_photo_url TEXT,
  issue_notes TEXT,
  cost_farmer DECIMAL,
  cost_transport DECIMAL,
  price_chef DECIMAL,
  margin DECIMAL,
  status TEXT
);
```

#### `farmers` table
```sql
CREATE TABLE farmers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  contact TEXT,
  location TEXT,
  grade_available TEXT[],
  weekly_capacity INT,
  available_this_week BOOLEAN,
  last_contacted TIMESTAMP
);
```

#### `sms_log` table
```sql
CREATE TABLE sms_log (
  id SERIAL PRIMARY KEY,
  order_id TEXT REFERENCES orders(id),
  sent_at TIMESTAMP,
  recipient TEXT,
  message TEXT,
  status TEXT
);
```

---

## MVP Implementation Plan (Post-Seed)

1. **Week 1:** Set up Next.js + Supabase, migrate CSV to database
2. **Week 2:** Build dashboard UI, order detail pages
3. **Week 3:** Integrate Twilio SMS webhooks
4. **Week 4:** Add farmer network management
5. **Week 5:** Build analytics dashboard
6. **Week 6:** Deploy to Vercel, stress test

---

## Cost Estimate (Post-Seed)

- **Vercel:** Free tier (hobbyist)
- **Supabase:** Free tier (up to 500MB database)
- **Twilio:** ~$1/month (SMS costs scale with volume)
- **Total:** ~$1-5/month until significant scale

---

## What to Build Now vs Later

### Now (Pre-Funding):
- ❌ Nothing — focus on manual CSV tracking
- ✅ Keep structure proposals ready for when funding arrives

### Later (Post-$300K Seed):
- ✅ Build full dashboard
- ✅ Hire part-time dev to maintain
- ✅ Integrate SMS automation

---

## Related Files

- [Tracking Spreadsheet Spec](tracking-spreadsheet-spec.md)
- [Order Tracker CSV](order-tracker.csv)
- [SMS Templates](../prompts/) (to be created)
