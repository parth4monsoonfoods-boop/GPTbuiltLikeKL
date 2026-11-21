# Project memory

## Product intent & audience

- Contractor/renovation business website targeting homeowners in Kuala Lumpur & Selangor, Malaysia
- Goal: convert visitors into WhatsApp quote inquiries
- Trust signals emphasized: 100+ projects, 9+ years experience, CIDB certification

## Brand personality & voice

- Direct, practical, homeowner-friendly
- Pain-point framing ("stop chasing five contractors")
- Conversational with confidence; proof-forward messaging

## Visual design & UX direction

- Photo-driven hero with trust stats overlay
- Interactive "pick a part of the house" service picker (house diagram / clickable zones)
- Proof-of-work cards: before/after photos + starting prices
- Story section addressing contractor-chasing frustration
- KL/Selangor service-area map section
- FAQ section
- WhatsApp quote CTAs placed throughout the page
- Single-page combined home view (v3) consolidating prior layouts

## Decisions, constraints & rationale

- Framework: Next.js
- Dev server must use Webpack, not Turbopack — Turbopack cannot run in this preview environment; `package.json` dev script patched accordingly
- Version 3 of the home page is the canonical combined layout (merge of two prior versions)
- Build confirmed clean after rebuild
- Rollbacks can revert both the home page and the dev-script fix together; re-apply both in the same pass if it recurs

## Open questions & assumptions

- WhatsApp number / link format not yet confirmed
- Starting prices on proof-of-work cards: assumed placeholder unless real figures provided
- Service-area map: implementation method (embedded map vs. custom image) not confirmed
- Before/after photos: source assets not confirmed; may be placeholders