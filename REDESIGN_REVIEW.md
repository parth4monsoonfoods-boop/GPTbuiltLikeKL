# MYN Deco — KL Fix reference implementation

Updated locally on 18 November 2026. The homepage follows the inspected KL Fix reference (https://www.klfix.com/) rather than the previous cream/serif design.

## Implemented
- White, navy and orange palette; locally hosted Inter and Space Grotesk fonts.
- Fixed compact navigation, pill buttons, split hero and tall four-image slideshow.
- Numbered service rows with hover previews, tap/keyboard expansion and service-specific WhatsApp enquiries.
- Horizontal image gallery with arrow controls and native swipe/scroll.
- Coverage map for the existing Kampung Pandan address, four-column process, accordion FAQ, large closing contact section and multi-column footer.
- Persistent light/dark preference and responsive mobile menu with Escape support.
- Existing MYN phone, WhatsApp, address, hours and crew route retained.
- Imagery from the existing MYN source is explicitly illustrative. No KL Fix job photographs, testimonials, hours or business claims are represented as MYN's.

## Verification
- Next.js production build passed; build includes TypeScript checking.
- Browser checked at desktop and 390px mobile: no horizontal page overflow.
- Verified service expansion, correctly encoded MYN WhatsApp enquiry, gallery navigation, FAQ, theme toggle and mobile menu close-on-navigation.
- No messages were sent.
- Preview remains at http://127.0.0.1:5173/.
- Local changes only; not pushed or deployed.

## Multi-page completion
Added service directory and 10 service detail pages; coverage directory and KL/Selangor pages; three original planning guides and guide directory; work filters; consistent crew/about, contact and FAQ pages. Homepage and footer now link to detail pages.
Production build and TypeScript passed. All 24 intended routes returned HTTP 200 with one H1. Exported HTML internal-link audit found no broken local targets. Browser checked service search and detail page, mobile menu, work filter, and required enquiry fields at 390px with no horizontal overflow. The enquiry opens WhatsApp for review; no message was sent. Imagery remains illustrative and verified customer reviews have not been supplied. No push or deployment.
