# Agripals Operations Tracker

**Purpose:** Manual order tracking before automation  
**Format:** CSV (importable to Google Sheets / Excel)  
**Update:** Real-time via SMS confirmations

---

## Column Schema

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| order_id | Text | 10-digit unique ID | 2406200001 |
| order_date | Date | When order was placed | 2026-06-20 |
| chef_name | Text | Customer name | Rosa's Kitchen |
| chef_contact | Phone | Chef's mobile | +14155550123 |
| farmer_name | Text | Supplier name | Steve |
| farmer_contact | Phone | Farmer's mobile | +14155550456 |
| quantity | Number | Units ordered | 5 dozen |
| grade | Text | Quality grade | Grade A |
| pickup_location | Text | Farmer's location | Tomales Bay |
| pickup_time | DateTime | Scheduled pickup | 2026-06-20 07:00 |
| pickup_confirmed | Boolean | Farmer confirmed ready | TRUE |
| pickup_driver | Text | Driver name | John Doe |
| pickup_photo_url | Text | Photo proof link | https://... |
| depot_arrival_time | DateTime | Petaluma depot arrival | 2026-06-20 09:30 |
| depot_status | Enum | received / pending / shipped | received |
| final_driver | Text | SF delivery driver | Jane Smith |
| delivery_time | DateTime | Delivered to chef | 2026-06-20 14:00 |
| delivery_confirmed | Boolean | Chef confirmed receipt | TRUE |
| delivery_photo_url | Text | Photo proof link | https://... |
| issue_notes | Text | Any problems/delays | None |
| cost_farmer | Currency | Paid to farmer | $50 |
| cost_transport | Currency | Paid to logistics partner | $25 |
| price_chef | Currency | Charged to chef | $90 |
| margin | Currency | Profit per order | $15 |
| status | Enum | pending / in_transit / delivered / failed | delivered |

---

## Status Values

- **pending**: Order placed, waiting for farmer confirmation
- **confirmed**: Farmer confirmed, pickup scheduled
- **picked_up**: Driver collected from farmer
- **at_depot**: Arrived at Petaluma depot
- **out_for_delivery**: Final driver en route to San Francisco
- **delivered**: Chef received and confirmed
- **failed**: Delivery failed (log reason in issue_notes)

---

## Sample Row

```csv
order_id,order_date,chef_name,chef_contact,farmer_name,farmer_contact,quantity,grade,pickup_location,pickup_time,pickup_confirmed,pickup_driver,pickup_photo_url,depot_arrival_time,depot_status,final_driver,delivery_time,delivery_confirmed,delivery_photo_url,issue_notes,cost_farmer,cost_transport,price_chef,margin,status
2406200001,2026-06-20,Rosa's Kitchen,+14155550123,Steve,+14155550456,5 dozen,Grade A,Tomales Bay,2026-06-20 07:00,TRUE,John Doe,https://imgur.com/abc123,2026-06-20 09:30,received,Jane Smith,2026-06-20 14:00,TRUE,https://imgur.com/def456,None,$50,$25,$90,$15,delivered
```

---

## Usage Instructions

1. **Order Placement:**  
   - Add new row when chef texts order
   - Assign order_id (date-based: YYMMDD0001)
   - Fill chef details, quantity, grade

2. **Supply Confirmation:**  
   - Update pickup_confirmed when farmer replies "Confirmed"
   - Log pickup_time

3. **Pickup:**  
   - Update pickup_driver when assigned
   - Update pickup_photo_url when driver texts photo
   - Change status to "picked_up"

4. **Depot:**  
   - Update depot_arrival_time when depot texts confirmation
   - Set depot_status to "received"
   - Change status to "at_depot"

5. **Delivery:**  
   - Update final_driver when assigned
   - Update delivery_time when driver texts delivery
   - Set delivery_confirmed when chef confirms
   - Change status to "delivered"

6. **Issues:**  
   - Log any delays, missing items, quality issues in issue_notes
   - If delivery fails, set status to "failed" and log reason

---

## Metrics to Track (Weekly)

- **Success rate:** (delivered orders / total orders) × 100
- **Average delivery time:** Mean time from order to delivery
- **Average margin:** Mean profit per order
- **Failure rate:** (failed orders / total orders) × 100
- **Top failure reasons:** Most common issue_notes

---

## File Location

Save as: `/Users/rhys/Downloads/Projects/Agripals/ops/order-tracker.csv`  
Backup to GitHub: `git add ops/order-tracker.csv && git commit -m "Update tracker" && git push`

---

## Future Automation

When scaling:
- Import this CSV into a real database (PostgreSQL)
- Build SMS webhook to auto-update rows
- Generate real-time dashboard from database
- AI agent auto-assigns backup farmers when status stuck at "pending"
