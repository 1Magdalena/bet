# BET Owner Control Center

The Owner Control Center is the private operating view of BET. It is not a member dashboard and it is not a raw SQL console.

## Global date control
Every aggregate supports Today, 7 days, 30 days, calendar month, calendar year and a custom date range. Where meaningful, show comparison with the immediately preceding equivalent period.

## Filters
The owner can combine filters and decide which columns/metrics are visible. Filters apply to the member directory and, where meaningful, to aggregate cards/charts.

Core filters:
- date / signup cohort: Today, 7D, 30D, Month, Year, Custom
- signup country
- paying state: Paid / Free / Past due / Cancelled / All
- plan
- account status
- verification status
- activity state: active today / active 7D / active 30D / inactive
- business country and business status
- acquisition source / campaign when captured

The member directory should allow sorting and column visibility. Useful selectable columns include Member ID, joined date, signup country, business, business country, payment state, plan, last active, sessions, active time, active days, Experiences, Questions, qualified matches and conversations.

Country is deliberately coarse. BET stores a country code, not an exact signup IP, for this reporting purpose.

## Overview
- total / new / active / returning members
- members by signup country
- paying vs free members; later subscription status and plan mix
- active businesses and countries
- sessions, active time, active days and retention
- Experiences created/active, outcome observations
- Questions created/active/closed, qualified matches, zero-match questions
- Live Research requests and qualification rate
- problem-bound conversations started
- verification/support/failed-job/security items requiring attention
- later: active paid subscriptions, new/cancelled subscriptions, MRR, ARR, gross collected, refunds, provider fees and net collected

## Users
The directory is centered on Member ID. Show account/business facts and product-usage metadata useful to operating BET: joined, signup country, business, payment state, plan, last active, active days, sessions, active time, Experience counts, Question counts and match/conversation states. Do not put the text of a member's questions on the overview. A deliberate admin drill-down may retrieve product records by Member ID when there is an operational reason.

## Data / database
Show counts and growth of canonical product objects and operational health. Drill-downs are read-oriented. Destructive database actions remain outside the everyday Control Center and require stronger authorization.

## Revenue
Disabled until paid plans launch. Billing is event-ledger based so historical day/month/year/custom-range reporting remains correct. Distinguish subscription state, invoiced/gross amount, actually collected amount, refunds, provider fees and net collected. Do not label gross revenue as profit.

## Privacy boundary
Private Notes content is never visible to Owner/Admin and is never copied into telemetry. Do not collect keystrokes, draft text, raw page content or message content as analytics metadata. Admin detail access is authenticated, server-authorized and logged in `admin_access_events`.

## Active-time semantics
Count active time, not an open browser tab. Client heartbeat may accrue time only while the page is visible and recent user interaction is present; stop accrual after an idle threshold (default target: 5 minutes). Server-side product events remain available for operational counts independently of browser analytics where legally permitted.
