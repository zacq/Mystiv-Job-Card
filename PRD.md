# Product Requirements Document
## Mystiv Workshop — Vehicle Service Job Card Intake System

**Version:** 1.0
**Date:** 2026-03-16
**Status:** 🟢 MVP Complete — Pending Live Airtable Configuration
**Repo:** https://github.com/zacq/Mystiv-Job-Card

---

## 1. Overview

A web-based vehicle service job card intake system for Mystiv Workshop. It captures walk-in client and vehicle details via a structured form, stores records in Airtable, and generates a printable/downloadable PDF job card upon submission.

---

## 2. Problem Statement

Workshop staff currently capture job card information manually (paper-based or ad hoc). This leads to:
- Incomplete or illegible records
- No centralised job tracking
- No digital audit trail per vehicle/client
- Delays in assigning work to technicians

---

## 3. Goals

| Goal | Metric |
|---|---|
| Capture complete job card data digitally | All required fields validated before submission |
| Store records in Airtable for tracking | Every submission creates an Airtable record |
| Generate a printable job card | PDF downloadable from the success page |
| Zero server management overhead | Deployed on Netlify (serverless) |

---

## 4. Users

| User | Role |
|---|---|
| **Service Advisor** | Primary user — fills in the form at the front desk during walk-in |
| **Workshop Manager** | Reviews Airtable records, monitors job status |
| **Technician** | Referenced on job card; not a system user |

---

## 5. Scope

### In Scope (v1.0)
- Walk-in client intake form (web)
- Four-section single-page form with inline validation
- Airtable record creation via REST API
- PDF job card generation and download
- Netlify deployment

### Out of Scope (v1.0 — future)
- Client-facing job status tracking portal
- Invoicing / billing integration
- SMS / email notifications to clients
- Technician mobile view
- Multi-branch support
- Edit / update existing job cards from the web app
- Image/photo attachments (e.g. pre-existing damage)

---

## 6. Form Sections & Fields

### 6.1 Client Details
| Field | Type | Required |
|---|---|---|
| Full Name | Text | ✅ |
| Phone Number | Tel | ✅ |
| Email Address | Email | ❌ |
| Address | Text | ❌ |

### 6.2 Vehicle Details
| Field | Type | Required |
|---|---|---|
| Make | Text | ✅ |
| Model | Text | ✅ |
| Year | Number (1900 – current+1) | ✅ |
| Registration / Plate | Text | ✅ |
| VIN | Text (max 17 chars) | ❌ |
| Colour | Text | ❌ |
| Mileage (km) | Number | ❌ |

### 6.3 Service / Job Details
| Field | Type | Required |
|---|---|---|
| Services Required | Multi-select checkbox (16 options) | ✅ (min 1) |
| Job Description | Textarea | ✅ (min 5 chars) |
| Priority | Select: Low / Medium / High / Urgent | ✅ |
| Est. Completion Date | Date picker | ❌ |
| Additional Notes | Textarea | ❌ |

### 6.4 Advisor / Technician
| Field | Type | Required |
|---|---|---|
| Service Advisor | Text | ✅ |
| Assigned Technician | Select (roster) | ❌ |
| Bay Number | Text | ❌ |

---

## 7. Technical Architecture

### Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | TailwindCSS 3 |
| Form state | React Hook Form v7 |
| Validation | Zod v3 (client + server) |
| Database | Airtable (via REST API, no SDK) |
| PDF | @react-pdf/renderer v3 (server-rendered) |
| Hosting | Netlify + @netlify/plugin-nextjs |
| Node runtime | v22 |

### Data Flow
```
User fills form
  → RHF + Zod validates client-side
    → POST /api/submit-job-card
      → Zod re-validates server-side
        → Airtable REST API (POST record)
          → Returns { recordId }
            → Redirect /success?id=&data=
              → "Download PDF" → POST /api/generate-pdf
                → @react-pdf/renderer (server)
                  → PDF blob → browser download
```

### Project Structure
```
mystiv_intake/
├── app/
│   ├── page.tsx                  # Home / intake form
│   ├── success/page.tsx          # Post-submit success + PDF download
│   └── api/
│       ├── submit-job-card/      # Airtable write
│       └── generate-pdf/         # PDF render
├── components/
│   ├── form/                     # ClientSection, VehicleSection, ServiceSection, AdvisorSection
│   ├── ui/                       # FormField, InputText, SelectField, CheckboxGroup, etc.
│   └── pdf/JobCardDocument.tsx   # PDF template
├── lib/
│   ├── schema.ts                 # Zod schema (single source of truth)
│   ├── airtable.ts               # Typed Airtable fetch helper
│   └── constants.ts              # SERVICE_TYPES, PRIORITY_LEVELS, TECHNICIANS
└── netlify.toml                  # Netlify build + plugin config
```

---

## 8. Airtable Schema

**Base:** Mystiv Workshop
**Table:** Job Cards

| Field Name | Airtable Type | Notes |
|---|---|---|
| Client Name | Single line text | Primary field |
| Phone | Phone number | |
| Email | Email | |
| Address | Single line text | |
| Make | Single line text | |
| Model | Single line text | |
| Year | Number | Integer |
| Registration | Single line text | |
| VIN | Single line text | |
| Colour | Single line text | |
| Mileage (km) | Number | Integer |
| Services | Long text | Comma-separated |
| Job Description | Long text | |
| Priority | Single select | Low / Medium / High / Urgent |
| Est. Completion Date | Date | |
| Notes | Long text | |
| Advisor | Single line text | |
| Technician | Single line text | |
| Bay | Single line text | |
| Status | Single select | Open / In Progress / Awaiting Parts / Complete / Invoiced / Cancelled |
| Date Received | Date (with time) | Set server-side on submission |

---

## 9. Environment Variables

| Variable | Description |
|---|---|
| `AIRTABLE_PAT` | Personal Access Token (starts with `pat...`) |
| `AIRTABLE_BASE_ID` | Base ID (starts with `app...`) |
| `AIRTABLE_TABLE_ID` | Table name or ID (e.g. `Job Cards`) |

Set in `.env.local` locally and in **Netlify → Site configuration → Environment variables** for production.

---

## 10. Project Status

### ✅ Completed

| Item | Detail |
|---|---|
| Project scaffolded | Next.js 14, TailwindCSS, RHF, Zod, TypeScript |
| Form UI | Single-page, 4-section, sticky submit bar, inline errors |
| Zod validation | Client-side + server-side re-validation |
| Airtable integration | REST API helper (`lib/airtable.ts`) wired to API route |
| PDF generation | Server-rendered A4 job card via `@react-pdf/renderer` |
| Success page | Record ID display, field summary, PDF download button |
| Netlify config | `netlify.toml` + `@netlify/plugin-nextjs` + Node 22 |
| Build passing | `npm run build` exits clean — no type errors |
| GitHub | Pushed to `github.com/zacq/Mystiv-Job-Card` (main) |

### 🟡 Pending (Blockers before go-live)

| Item | Owner | Notes |
|---|---|---|
| Airtable base setup | Workshop manager | Create base + all fields per §8 above |
| Environment variables | Dev / Netlify admin | Add PAT, Base ID, Table ID to Netlify dashboard |
| Netlify site connection | Dev | Connect repo → trigger first deploy |
| End-to-end test | Service advisor | Submit a test job card, verify Airtable record + PDF |

### 🔵 Backlog (Post v1.0)

| Feature | Priority |
|---|---|
| Email confirmation to client on submission | Medium |
| SMS notification to technician when assigned | Medium |
| Edit existing job card (by record ID) | Medium |
| Job status update flow (advisor marks In Progress / Complete) | High |
| Dashboard / reporting view (jobs by day, by technician) | Medium |
| Pre-existing damage photo upload | Low |
| Multi-branch / location support | Low |
| Client self-service job status lookup | Low |

---

## 11. Deployment Checklist

- [x] `npm run build` passes locally
- [x] `netlify.toml` committed
- [x] `.env.local` excluded from git (`.gitignore`)
- [x] `.env.example` committed with placeholder values
- [ ] Airtable base created with correct field names
- [ ] Environment variables set in Netlify dashboard
- [ ] Netlify site connected to `zacq/Mystiv-Job-Card`
- [ ] First production deploy successful
- [ ] Test submission creates Airtable record
- [ ] PDF download works in production
- [ ] Custom domain configured (optional)

---

## 12. Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-03-16 | Claude + Zacq | Initial PRD — MVP scaffolded, build passing, pushed to GitHub |
