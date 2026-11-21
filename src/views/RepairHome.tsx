'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, House, Mail, MapPin, Menu, MessageCircle, Moon, Phone, Plus, Sun, Wrench, X } from 'lucide-react';
import { servicePages, guides } from '@/content/pages';
import { company } from '@/content/site';
import './reference-fonts.css';
import './repair-home.css';

const services = [
  { name: 'Door & Window Repair', short: 'Doors, hinges, rollers, window frames', tags: ['Door alignment', 'Sliding door rollers', 'Hinges & handles', 'Window frame repairs'], image: '/images/door-repair.jpg' },
  { name: 'Plumbing', short: 'Leaks, blocked drains, taps & pipes', tags: ['Leaking taps & pipes', 'Blocked sinks', 'Blocked toilets', 'Drain repairs'] },
  { name: 'Electrical', short: 'Faults, switches, sockets & lighting', tags: ['Power tripping', 'Switches & sockets', 'Lighting installation', 'Wiring assessment'] },
  { name: 'Painting', short: 'Interior, exterior & wall repairs', tags: ['Interior repainting', 'Exterior repainting', 'Peeling walls', 'Surface preparation'] },
  { name: 'Carpentry', short: 'Cabinets, woodwork & door frames', tags: ['Cabinet repairs', 'Door frames', 'Timber fittings', 'Custom installation'], image: '/images/kitchen-renovation.jpg' },
  { name: 'Tiling & Flooring', short: 'Repair, replacement & new finishes', tags: ['Broken tiles', 'Lifting tiles', 'Floor repairs', 'Bathroom & kitchen tiling'] },
  { name: 'Ceiling Repairs', short: 'Stains, damaged boards & replacement', tags: ['Ceiling boards', 'Water damage assessment', 'Replacement panels', 'Finishing & repainting'] },
  { name: 'Roofing & Waterproofing', short: 'Roof leaks, gutters & bathroom leaks', tags: ['Roof leak assessment', 'Gutter repairs', 'Bathroom waterproofing', 'Recurring water ingress'] },
  { name: 'Water Heaters', short: 'Faults, installation & replacement', tags: ['Heater assessment', 'Leaks', 'New installation', 'Replacement'] },
  { name: 'Home & Office Renovation', short: 'A room refresh to a complete renovation', tags: ['Home improvements', 'Office & shop renovation', 'Carpentry & finishes', 'Coordinated trades'], image: '/images/home-refresh.jpg' },
];
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
const wa = (service = 'a repair or renovation') => `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi MYN Deco, I need help with ${service}.\nLocation / postcode: \nWhat needs doing: \nPreferred timing: \nI can share photos here.`)}`;
const phone = `tel:${company.phone.replace(/[^+\d]/g, '')}`;
const mapArea = 'Kampung Pandan, Kuala Lumpur, Malaysia';
const mapQuery = 'Lot 16613-2, Lorong C6, Kampung Pandan, 55100 Kuala Lumpur';
function ChatLink({ service, children, className = 'myn-button' }: { service?: string; children: ReactNode; className?: string }) {
  return <a className={className} href={wa(service)} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function Logo() {
  return <a className="myn-logo" href="/" aria-label="MYN Deco home"><span className="myn-logo-icon"><House size={34} strokeWidth={1.8} /><Wrench size={12} /></span><span>MYN<span className="myn-logo-slash">/</span>deco<small>Renovation · Construction · Repair</small></span></a>;
}
export function RepairHome() {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [faq, setFaq] = useState<number | null>(0);
  const [galleryPosition, setGalleryPosition] = useState({ start: true, end: false });
  const gallery = useRef<HTMLDivElement>(null);
  useEffect(() => { try { setDark(localStorage.getItem('myn-theme') === 'dark'); } catch { /* storage unavailable */ } }, []);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setSlide(value => (value + 1) % photos.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);
  function toggleTheme() { setDark(value => { try { localStorage.setItem('myn-theme', value ? 'light' : 'dark'); } catch { /* storage unavailable */ } return !value; }); }
  function moveGallery(direction: number) {
    const rail = gallery.current;
    if (rail) rail.scrollBy({ left: direction * ((rail.firstElementChild?.getBoundingClientRect().width || 330) + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  return <div className={`myn-site${dark ? ' myn-dark' : ''}`}>
    <a className="myn-skip" href="#main">Skip to content</a>
    <header className="myn-header"><div className="myn-wrap myn-navigation">
      <Logo />
      <nav className={`myn-links${menu ? ' is-open' : ''}`} id="myn-menu" aria-label="Main navigation" onClick={() => setMenu(false)}>
        <a href="/services">Services</a><a href="/areas">Areas</a><a href="/work">Work</a><a href="/blog">Guides</a><a href="/our-crew">Our crew</a><a href="/contact">Contact</a>
      </nav>
      <div className="myn-nav-actions"><button className="myn-icon-button" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={toggleTheme}>{dark ? <Moon size={18} /> : <Sun size={18} />}</button><a className="myn-button myn-call" href={phone}><Phone size={15} /> Call us</a><button className="myn-icon-button myn-menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} aria-controls="myn-menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div></header>
    <main id="main">
      <section className="myn-hero">
        <div className="myn-wrap myn-hero-grid">
          <div className="myn-hero-copy">
            <p className="myn-eyebrow">Renovation · Repairs · Kuala Lumpur</p>
            <h1>Your Local<br />Home Repair &<br /><span>Renovation</span><br />Team<small>in Kuala Lumpur.</small></h1>
            <p className="myn-intro">One team for your home and office — plumbing, electrical, painting, carpentry, tiling, roof leaks and more. From small repairs to full renovations across KL and Selangor.</p>
            <div className="myn-actions"><ChatLink><MessageCircle size={19} /> Get a quote <ArrowUpRight size={18} /></ChatLink><a className="myn-button myn-button-outline" href="#what-we-do">See services <ArrowDown size={17} /></a></div>
            <p className="myn-hero-note">Based in <strong>Kampung Pandan</strong><i>/</i>Quotes on <strong>WhatsApp</strong><i>/</i>Mon–Sat</p>
          </div>
          <div className="myn-slideshow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }} aria-label="Renovation and repair examples">
            <div className="myn-hero-image">
              {photos.map((photo, index) => <img key={photo.src} src={photo.src} alt={photo.alt} className={slide === index ? 'is-active' : ''} aria-hidden={slide !== index} style={{ objectPosition: photo.position }} fetchPriority={index === 0 ? 'high' : 'auto'} />)}
              <div className="myn-photo-caption"><span className="myn-photo-label">Illustrative service imagery</span><strong>{photos[slide].title}</strong><span>{photos[slide].type} <b>·</b> MYN Deco</span></div>
              <div className="myn-slide-controls">{photos.map((photo, index) => <button key={photo.src} aria-label={`Show photo ${index + 1}: ${photo.title}`} aria-pressed={slide === index} onClick={() => { setSlide(index); setPaused(true); }} />)}</div>
            </div>
            <p className="myn-image-footnote">For the love of building.</p>
          </div>
        </div>
        <div className="myn-wrap myn-hero-bottom"><p>Renovation, construction & repair.<br className="myn-mobile-only" /> <strong>One team, start to finish.</strong></p><span>MYN Deco Enterprise</span></div>
      </section>
      <section className="myn-section myn-wrap" id="what-we-do">
        <div className="myn-section-heading"><div><p className="myn-eyebrow">Home & office services</p><h2>Every Repair.<br /><span>One Reliable Team.</span></h2></div><p>From a single leak to a complete renovation. Tell us what needs doing — we bring the equipment, the crew and the skills.</p></div>
        <div className="myn-service-list" onMouseLeave={() => setHovered(null)}>{services.map((service,index) => {
          const open = expanded === index || hovered === index;
          return <article className={`myn-service${open ? ' is-expanded' : ''}`} key={service.name} onMouseEnter={() => setHovered(index)}>
            <button className="myn-service-row" aria-expanded={open} aria-controls={`service-detail-${index}`} onClick={() => { setExpanded(expanded === index ? null : index); setHovered(null); }}>
              <span className="myn-service-number">{String(index + 1).padStart(2,'0')}</span><h3>{service.name}</h3><span className="myn-service-short">{service.short}</span><ArrowUpRight size={22} />
            </button>
            <div className="myn-service-detail" id={`service-detail-${index}`} hidden={!open}><div className="myn-service-description"><div className="myn-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={'/services/'+servicePages[index].slug} className="myn-text-link">View {service.name.toLowerCase()} <ArrowRight size={17} /></a></div>{service.image ? <figure><img src={service.image} alt={`Illustrative ${service.name.toLowerCase()} example`} loading="lazy" /><figcaption>Illustrative service photo</figcaption></figure> : <div className="myn-service-prompt"><MessageCircle size={27} /><strong>Show us what needs fixing.</strong><p>A photo and your postcode help us get started.</p></div>}</div>
          </article>;
        })}</div>
      </section>
      <section className="myn-work myn-section" id="our-work"><div className="myn-wrap">
        <div className="myn-section-heading"><div><p className="myn-eyebrow">Renovation & repair possibilities</p><h2>Small Repairs.<br /><span>Bigger Possibilities.</span></h2></div><div className="myn-gallery-intro"><p>Explore the work we can help with.<br />Illustrative images from our existing site.</p><div className="myn-gallery-controls"><button className="myn-icon-button" aria-label="Previous project" disabled={galleryPosition.start} onClick={() => moveGallery(-1)}><ArrowLeft size={21} /></button><button className="myn-icon-button" aria-label="Next project" disabled={galleryPosition.end} onClick={() => moveGallery(1)}><ArrowRight size={21} /></button></div></div></div>
        <div className="myn-gallery" ref={gallery} tabIndex={0} aria-label="Service examples — scroll for more" onScroll={e => { const rail=e.currentTarget; setGalleryPosition({start:rail.scrollLeft < 4,end:rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4}); }}>{photos.map((photo, index) => <article className="myn-project" key={photo.src}><div className="myn-project-image"><img src={photo.src} alt={photo.alt} loading="lazy" style={{objectPosition: photo.position}} /><div><span>{photo.type}</span><span>{String(index+1).padStart(2,'0')}</span></div></div><h3>{photo.title}</h3><p>Repairs · Renovation · Construction</p><ChatLink service={photo.type} className="myn-project-link">Planning something similar? Talk to us. <ArrowUpRight size={16} /></ChatLink></article>)}</div>
      </div></section>
      <section className="myn-section myn-wrap" id="areas">
        <div className="myn-section-heading"><div><p className="myn-eyebrow">Our service area</p><h2>Kuala Lumpur.<br /><span>And Selangor.</span></h2></div><p>Based in Kampung Pandan. Send us your postcode and the work you need — we’ll confirm availability for your location.</p></div>
        <div className="myn-map"><iframe title="Kampung Pandan service area in Kuala Lumpur" src={`https://maps.google.com/maps?q=${encodeURIComponent(mapArea)}&z=12&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="myn-map-caption"><span><MapPin size={16} /> Kampung Pandan · Kuala Lumpur</span><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapArea)}`} target="_blank" rel="noopener noreferrer">View on Google Maps <ArrowUpRight size={16} /></a></div></div>
        <p className="myn-address">Lot 16613-2, Lorong C6, Kampung Pandan, 55100 Kuala Lumpur <span><Clock3 size={15} /> Monday–Saturday · 8am–6pm</span></p>
      </section>
      <section className="myn-about myn-section" id="how-it-works"><div className="myn-wrap">
        <div className="myn-section-heading"><div><p className="myn-eyebrow">The MYN way</p><h2>One Team.<br /><span>From Start to Finish.</span></h2></div><p>You bring the plan — or the problem.<br />We bring the crew, equipment and skill.</p></div>
        <div className="myn-values">{[
          [MessageCircle, 'Start with a photo', 'Send a few clear photos, a short description and your postcode on WhatsApp.'],
          [Wrench, 'Understand the job', 'We discuss the repair, the scope and whether a site assessment is needed.'],
          [Check, 'Agree before we begin', 'Review the proposed work, price and timing before arranging the job.'],
          [House, 'One point of contact', 'Small fixes, renovation or construction — one team to coordinate the work.'],
        ].map(([Icon,title,body]) => { const ValueIcon=Icon as typeof House; return <article key={String(title)}><ValueIcon size={25} strokeWidth={1.5} /><h3>{String(title)}</h3><p>{String(body)}</p></article>; })}</div>
        <a href="/our-crew" className="myn-text-link myn-crew-link">Meet our crew <ArrowRight size={17} /></a>
      </div></section>
      <section className="myn-section myn-wrap"><div className="myn-section-heading"><div><p className="myn-eyebrow">From the guides</p><h2>A Better Start.<br /><span>A Clearer Plan.</span></h2></div><a href="/blog" className="myn-text-link">All guides <ArrowRight size={17}/></a></div><div className="myn-values">{guides.map(g=><article key={g.slug}><p className="myn-eyebrow">{g.category}</p><h3><a href={'/blog/'+g.slug}>{g.title}</a></h3><p>{g.intro}</p><a className="myn-text-link myn-crew-link" href={'/blog/'+g.slug}>Read guide <ArrowRight size={17}/></a></article>)}</div></section><section className="myn-faq myn-section myn-wrap" id="faq"><div><p className="myn-eyebrow">Your questions</p><h2>Before We<br /><span>Get Started.</span></h2></div><div className="myn-questions">{faqs.map(([question,answer],index) => <div className="myn-question" key={question}><h3><button onClick={() => setFaq(faq===index ? null : index)} aria-expanded={faq===index} aria-controls={`faq-answer-${index}`}>{question}<Plus size={21} className={faq===index ? 'is-open' : ''} /></button></h3><p id={`faq-answer-${index}`} hidden={faq!==index}>{answer}</p></div>)}</div></section>
      <section className="myn-contact" id="contact"><div className="myn-wrap"><p className="myn-eyebrow">For the love of building.</p><h2>Your Place.<br /><span>Our Hands.</span></h2><div className="myn-actions"><ChatLink><MessageCircle size={20} /> Open WhatsApp <ArrowUpRight size={18} /></ChatLink><a className="myn-button myn-button-outline" href={phone}><Phone size={18} /> Call {company.phone}</a></div><p>Tell us what needs doing. We’ll take it from there.</p></div></section>
    </main>
    <footer className="myn-footer"><div className="myn-wrap"><div className="myn-footer-grid"><div className="myn-footer-company"><Logo /><p>{company.description}</p><ChatLink className="myn-footer-contact"><MessageCircle size={17} /> {company.phone} (WhatsApp)</ChatLink><a className="myn-footer-contact" href={`mailto:${company.email}`}><Mail size={17} /> {company.email}</a><p>{mapQuery}<br />{company.hours}</p></div><div><p className="myn-eyebrow">Services</p><ul>{services.slice(0,5).map(service => <li key={service.name}><a className="myn-footer-link" href={'/services/'+servicePages.find(s=>s.name===service.name)?.slug}>{service.name}</a></li>)}</ul></div><div><p className="myn-eyebrow">More ways we help</p><ul>{services.slice(5).map(service => <li key={service.name}><a className="myn-footer-link" href={'/services/'+servicePages.find(s=>s.name===service.name)?.slug}>{service.name}</a></li>)}</ul></div><div><p className="myn-eyebrow">MYN Deco</p><ul><li><a href="/areas">Areas we cover</a></li><li><a href="/work">Renovation & repairs</a></li><li><a href="/our-crew">Our crew</a></li><li><a href="/faq">Common questions</a></li><li><a href="https://www.facebook.com/myndecoenterprise/" target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight size={14} /></a></li></ul></div></div><div className="myn-footer-bottom"><span>© {new Date().getFullYear()} MYN Deco Enterprise. Kuala Lumpur / Selangor.</span><span>For the love of building.</span></div></div></footer>
    <ChatLink className="myn-floating-chat"><MessageCircle size={23} /><span>Chat on WhatsApp</span></ChatLink>
  </div>;
}
