import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';
export const metadata: Metadata = {
  title: 'MYN Deco | Home Repairs & Renovation in KL and Selangor',
  description: 'Painting, roof and bathroom leaks, plumbing, electrical faults, ceilings, doors and renovation in Kuala Lumpur and Selangor. Enquire on WhatsApp.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" /></head><body>{children}</body></html>;
}
