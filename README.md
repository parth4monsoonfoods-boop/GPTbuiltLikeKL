# MYN Deco — Next.js

Next.js App Router, TypeScript and Tailwind CSS. Local development only unless publication is explicitly requested.

## Commands

- npm install
- npm run dev — http://127.0.0.1:5173/
- npm run build — prerendered static site in out/
- npm run typecheck

## Structure

- src/app/layout.tsx: shared styles and page metadata
- src/app/page.tsx: homepage route
- src/app/our-crew/page.tsx: crew route
- src/views/: interactive page components
- src/content/: business details and content
- public/: images and static assets

Next.js replaces the previous Vite entry point and custom history router. Firebase configuration targets out/ with clean URLs. No deployment is performed by building locally. REBUILD_GUIDE.md describes the historical Vite version and is retained for reference only.
