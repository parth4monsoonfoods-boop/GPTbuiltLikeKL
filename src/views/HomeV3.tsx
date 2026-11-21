'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock3, MapPin, MessageCircle, Plus } from 'lucide-react';
import { company } from '@/content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { Capabilities } from '@/components/Capabilities';
import { ProofOfWork } from '@/components/ProofOfWork';
import { About } from '@/components/About';
import { ContactSection } from '@/components/ContactSection';

const photos = [
  { src: '/images/crew-at-work.png', title: 'Renovation, from the ground up', type: 'Renovation & construction', alt: 'Illustration of a renovation team working inside a home', position: '65% center' },
  { src: '/images/kitchen-renovation.jpg', title: 'A fresh start for your kitchen', type: 'Kitchens & interiors', alt: 'Illustrative kitchen renovation photograph', position: 'center' },
  { src: '/images/door-repair.jpg', title: 'Care for the everyday details', type: 'Repairs & installation', alt: 'Illustrative photograph of a tradesperson fitting a door', position: 'center' },
  { src: '/images/home-refresh.jpg', title: 'Spaces that work for your business', type: 'Commercial renovation', alt: 'Illustrative renovated commercial interior', position: 'center' },
];

const faqs = [
  ['Do you handle small repairs?', 'Yes. From a leaking tap to a damaged door, send us a few photos and your location. We will discuss what needs doing and the next step.'],
  ['Can you quote from a photo?', 'Photos help us understand the job. Hidden leaks, electrical faults and larger renovations may need a site assessment before a firm quotation. Confirm any assessment charges when arranging a visit.'],
  ['Where do you work?', 'MYN Deco serves Kuala Lumpur and Selangor from Kampung Pandan. Send your postcode so we can confirm coverage and availability for your address.'],
  ['When can I book a visit?', 'Our business hours are Monday to Saturday, 8:00 AM to 6:00 PM. Share your preferred timing on WhatsApp and we will confirm a suitable appointment.'],
  ['Can you manage a full renovation?', 'Yes. We handle renovation, construction and repair work, with one point of contact for the crew, equipment and trades. Send your plans or photos so we can discuss the scope.'],
];

const stats = [
  { value: '100+', label: 'Projects completed' },
  { value: '9+', label: 'Years of experience' },
  { value: '1', label: 'Team, start to finish' },
];

const wa = (service = 'a repair or renovation') =>
  `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hi MYN Deco, I need help with ${service}.\nLocation / postcode: \nWhat needs doing: \nPreferred timing: \nI can share photos here.`,
  )}`;
const mapQuery = 'Lot 16613-2, Lorong C6, Kampung Pandan, 55100 Kuala Lumpur';

function WhatsAppButton({ service, children, className = '' }: { service?: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={wa(service)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-marigold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-300 hover:bg-marigold-400 hover:shadow-lg hover:shadow-marigold-500/20 active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}

function HeroSlideshow() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setSlide((v) => (v + 1) % photos.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false); }}
      aria-label="Renovation and repair examples"
    >
      <div className="relative h-[340px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-3xl border border-cream-300 shadow-lg shadow-ink-900/10">
        {photos.map((photo, index) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${slide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ objectPosition: photo.position }}
            aria-hidden={slide !== index}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-900/80 via-ink-900/40 to-transparent p-5 sm:p-6">
          <div className="text-cream-50">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-50/80">Illustrative service imagery</span>
            <strong className="mt-1 block font-display text-lg sm:text-xl font-medium">{photos[slide].title}</strong>
            <span className="text-xs sm:text-sm text-cream-50/85">{photos[slide].type} · MYN Deco</span>
          </div>
          <div className="flex shrink-0 gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                aria-label={`Show photo ${index + 1}: ${photo.title}`}
                aria-pressed={slide === index}
                onClick={() => { setSlide(index); setPaused(true); }}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${slide === index ? 'scale-125 bg-cream-50' : 'bg-cream-50/50 hover:bg-cream-50/80'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-right text-sm italic text-ink-500">For the love of building.</p>
    </div>
  );
}

function AreasSection() {
  return (
    <section id="areas" className="scroll-mt-20 border-t border-cream-300 bg-cream-100 py-16 sm:py-20 lg:py-24">
      <div className="section-container">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Our service area</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-[1.1] text-ink-900">
            Kuala Lumpur. <span className="text-marigold-600">And Selangor.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Based in Kampung Pandan. Send us your postcode and the work you need — we will confirm availability for your location.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-cream-300 bg-cream-50 shadow-xs">
          <iframe
            title="Kampung Pandan service area in Kuala Lumpur"
            src={`https://maps.google.com/maps?q=${encodeURIComponent('Kampung Pandan, Kuala Lumpur, Malaysia')}&z=12&output=embed`}
            className="h-[320px] w-full sm:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-col gap-4 border-t border-cream-300 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <span className="inline-flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} className="text-marigold-600" /> Kampung Pandan · Kuala Lumpur</span>
            <span className="inline-flex items-center gap-2 text-sm text-ink-700"><Clock3 size={16} className="text-marigold-600" /> {company.hours}</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-ink-900 underline-offset-4 hover:text-marigold-600 hover:underline"
            >
              View on Google Maps <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-ink-600">{mapQuery}</p>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 border-t border-cream-300 bg-cream-50 py-16 sm:py-20 lg:py-24">
      <div className="section-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Your questions</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-[1.1] text-ink-900">
            Before we <span className="text-marigold-600">get started.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            A clear answer now beats a surprise later. Anything else — ask us on WhatsApp.
          </p>
          <WhatsAppButton className="mt-8" service="a repair or renovation">
            <MessageCircle size={18} /> Ask a question
          </WhatsAppButton>
        </div>
        <div className="lg:col-span-7">
          {faqs.map(([question, answer], index) => (
            <div key={question} className="border-b border-cream-300">
              <h3>
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg sm:text-xl font-medium text-ink-900 transition-colors hover:text-marigold-600"
                  onClick={() => setOpen(open === index ? null : index)}
                  aria-expanded={open === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {question}
                  <Plus size={20} className={`shrink-0 text-marigold-600 transition-transform duration-300 ${open === index ? 'rotate-45' : ''}`} />
                </button>
              </h3>
              <p id={`faq-answer-${index}`} hidden={open !== index} className="pb-5 pr-8 leading-relaxed text-ink-600">
                {answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeV3() {
  return (
    <>
      <Header />
      <main id="main">
        <section id="top" className="relative overflow-hidden bg-cream-50 pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(to right, #2B2B2B 1px, transparent 1px), linear-gradient(to bottom, #2B2B2B 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="section-container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">Renovation · Construction · Repair — Kuala Lumpur</p>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-ink-900">
                One team for repairs, <span className="text-marigold-600">renovation</span> and construction.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600">
                You bring the plan — or the problem. We bring the crew, the equipment and the skill, from a leaking bathroom to a whole house, across KL and Selangor.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <WhatsAppButton service="a repair or renovation">
                  <MessageCircle size={18} /> Get a quote on WhatsApp <ArrowUpRight size={17} />
                </WhatsAppButton>
                <a
                  href="#our-work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-transparent px-7 py-3.5 text-sm font-semibold text-ink-800 transition-all duration-300 hover:border-ink-900/30 hover:bg-ink-900/[0.03] active:scale-[0.98]"
                >
                  See our work
                </a>
              </div>
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 sm:gap-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-display text-3xl sm:text-4xl font-medium text-ink-900">{stat.value}</dd>
                    <dt className="mt-1 text-xs sm:text-sm leading-snug text-ink-600">{stat.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-snug text-ink-600">
                G2 · CIDB registered contractor · Quotes on WhatsApp · Mon–Sat
              </p>
            </div>
            <HeroSlideshow />
          </div>
        </section>

        <Capabilities />
        <ProofOfWork />
        <About />
        <AreasSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomBar />
      <a
        href={wa()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-40 hidden items-center gap-2 rounded-full bg-marigold-500 px-5 py-3 text-sm font-semibold text-ink-900 shadow-lg shadow-ink-900/20 transition-all duration-300 hover:bg-marigold-400 md:bottom-6 md:inline-flex"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} /> Chat on WhatsApp
      </a>
    </>
  );
}

export default HomeV3;
