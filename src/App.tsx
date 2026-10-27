/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ARTISANS,
  IMAGES,
  LOOKBOOK_ITEMS,
  SIGNATURE_SERVICES,
  ServiceItem,
  TESTIMONIALS,
} from "./data";
import { Header, NavTab } from "./components/Header";
import { Footer } from "./components/Footer";
import {
  BookingModal,
  ServiceDetailModal,
  VirtualTourModal,
} from "./components/Modals";

type LookbookFilter = "All" | "Hair" | "Skin" | "Grooming" | "Makeup";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [lookbookFilter, setLookbookFilter] = useState<LookbookFilter>("All");
  const [testimonialIdx, setTestimonialIdx] = useState<number>(0);
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(
    undefined
  );
  const [tourOpen, setTourOpen] = useState<boolean>(false);
  const [selectedServiceModal, setSelectedServiceModal] =
    useState<ServiceItem | null>(null);
  const [expandedAccordionId, setExpandedAccordionId] = useState<string | null>(
    null
  );

  const handleNavigate = (tab: NavTab, sectionId?: string) => {
    setActiveTab(tab);
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setBookingOpen(true);
  };

  const filteredLookbook =
    lookbookFilter === "All"
      ? LOOKBOOK_ITEMS.slice(0, 5)
      : LOOKBOOK_ITEMS.filter((item) => item.category === lookbookFilter);

  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  const handlePrevTestimonial = () => {
    setTestimonialIdx((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setTestimonialIdx((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const disciplineFolio = [
    { num: "01", name: "Cut & Sculpt", tag: "Hair", serviceId: "hair-sculpt" },
    { num: "02", name: "Color Atelier", tag: "Balayage", serviceId: "hair-sculpt" },
    { num: "03", name: "Dermal Therapy", tag: "Facial", serviceId: "dermal-glow" },
    { num: "04", name: "Bespoke Barbering", tag: "Grooming", serviceId: "bespoke-shave" },
    { num: "05", name: "Ritual Nails", tag: "Artisanal", serviceId: "ritual-nails" },
    { num: "06", name: "Bridal & Editorial", tag: "Event", serviceId: "artisanal-face" },
  ];

  return (
    <div id="top" className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      <main className="w-full pt-10 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          {/* =========================================================================
              SECTION 2: UNCONVENTIONAL CINEMATIC HERO
             ========================================================================= */}
          <section className="relative w-full bg-primary-container overflow-hidden pt-18 lg:pt-12 pb-0 lg:pb-24 text-on-surface">
            {/* Ambient atmospheric gold glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-tertiary/10 rounded-full blur-[140px] pointer-events-none"></div>

            {/* Vertical Social Rail (Left Edge - Desktop XL) */}
            <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-20">
              <span className="[writing-mode:vertical-rl] rotate-180 font-label-caps text-label-caps uppercase tracking-[0.35em] text-tertiary">
                VOGUE · ARCHITECTURAL DIGEST · BAZAAR · ELLE
              </span>
            </div>

            {/* Vertical Magazine Rail (Left Edge - Mobile/Tablet matching reference) */}
            <div className="flex lg:hidden absolute left-3 top-[52%] -translate-y-1/2 flex-col items-center gap-3 z-30 pointer-events-none">
              <div className="w-[1px] h-10 bg-tertiary/50"></div>
              <span className="[writing-mode:vertical-rl] rotate-180 font-label-caps text-[9px] uppercase tracking-[0.28em] text-tertiary/80">
                VOGUE &nbsp; ARCHITECTURAL DIGEST &nbsp; BAZAAR &nbsp; ELLE
              </span>
              <div className="w-[1px] h-10 bg-tertiary/50"></div>
            </div>

            {/* Main Hero Composition */}
            <div className="w-full px-4 sm:px-gutter max-w-[1600px] mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center lg:min-h-[760px]">
                {/* Left Editorial Portrait: Fluid Feminine Sculpting (Desktop Unchanged) */}
                <div className="hidden lg:block lg:col-span-3 relative h-[680px]">
                  <div className="relative w-full h-full overflow-hidden rounded-t-[140px] rounded-b-lg shadow-2xl">
                    <img
                      className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-110"
                      alt="Editorial close up high-fashion portrait of an elegant woman with sculptural, voluminous brunette waves, soft studio rim lighting against an obsidian black background"
                      src="/assets/aistudio/Lefthero.png"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary-container/80"></div>
                  </div>
                </div>

                {/* Center Typographic Column */}
                <div className="lg:col-span-6 flex flex-col items-center text-center px-2 sm:px-4 pt-2 lg:pt-0 z-20">
                  {/* Eyebrow Kicker */}
                  <p className="font-label-caps text-[10px] sm:text-label-caps tracking-[0.28em] sm:tracking-[0.3em] uppercase text-tertiary mb-4 lg:mb-6">
                    Hair · Skin · Grooming · Self-Care
                  </p>

                  {/* Oversized Editorial Title */}
                  <h1 className="font-display-xl text-[2.75rem] sm:text-[3.5rem] lg:text-display-xl uppercase tracking-[-0.03em] leading-[0.95] lg:leading-[0.92] text-secondary-fixed mb-5 lg:mb-6">
                    Beauty{" "}
                    <span className="font-editorial-italic italic font-normal tracking-tight text-tertiary">
                      Has <br />
                      No{" "}
                    </span>
                    Gender.
                  </h1>

                  {/* Editorial Manifesto Intro */}
                  <p className="font-body-lg text-sm sm:text-base lg:text-body-lg text-on-surface-variant max-w-md lg:max-w-xl mx-auto mb-7 lg:mb-10 font-light leading-relaxed">
                    A sanctuary where bespoke craft meets fluidity. Redefining haute beauty and precision grooming for every form of individuality.
                  </p>

                  {/* CTA Pair */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenBooking()}
                      className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center bg-tertiary lg:bg-secondary-fixed text-on-tertiary lg:text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-[0.2em] px-8 py-4 rounded-xl lg:rounded-lg shadow-xl hover:bg-tertiary transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      Book Your Appointment
                    </button>
                    <a
                      className="group inline-flex items-center gap-3 font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary-fixed hover:text-tertiary transition-colors"
                      href="#signature-services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate("services", "signature-services");
                      }}
                    >
                      <span>Explore Atelier</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1.5 transition-transform">
                        arrow_forward
                      </span>
                    </a>
                  </div>

                  {/* Mobile Dual Hero Portraits + Scroll Indicator (Visible only below lg) */}
                  <div className="relative w-screen -mx-4 mt-4 lg:hidden h-[430px] sm:h-[500px] overflow-hidden select-none">
                    {/* Subtle gold geometric diagonal accent lines behind models */}
                    <div className="absolute inset-0 pointer-events-none opacity-30">
                      <div className="absolute top-12 -left-10 w-64 h-[1px] bg-gradient-to-r from-transparent via-tertiary to-transparent -rotate-45"></div>
                      <div className="absolute bottom-24 -right-10 w-64 h-[1px] bg-gradient-to-r from-transparent via-tertiary to-transparent -rotate-45"></div>
                    </div>

                    {/* Left Female Model (Mobile) */}
                 {/* Left Female Model (Mobile) */}
<div className="absolute left-2 bottom-0 w-[54%] h-full z-10 overflow-hidden rounded-t-[100px] rounded-b-lg">
  <img
    className="w-full h-full object-cover object-top filter contrast-105"
    alt="Editorial close up high-fashion portrait of an elegant woman with sculptural, voluminous brunette waves"
    src="/assets/aistudio/Lefthero.png"
    referrerPolicy="no-referrer"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-primary-container/70"></div>
  <div className="absolute inset-0 bg-gradient-to-r from-primary-container/40 via-transparent to-primary-container/70"></div>
</div>

{/* Right Male Model (Mobile) */}
<div className="absolute right-2 bottom-0 w-[54%] h-[90%] z-20 overflow-hidden rounded-t-[100px] rounded-b-lg">
  <img
    className="w-full h-full object-cover object-top filter contrast-105"
    alt="Editorial portrait of a distinguished man with sharp textured modern hair architecture and pristine groomed beard"
    src="/assets/aistudio/Righthero.png"
    referrerPolicy="no-referrer"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-primary-container/60"></div>
  <div className="absolute inset-0 bg-gradient-to-l from-primary-container/30 via-transparent to-primary-container/80"></div>
</div>

                    {/* Bottom Dark Vignette Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-primary-container via-primary-container/70 to-transparent z-20 pointer-events-none"></div>

                    {/* Mobile Circular Scroll Indicator Centered at Bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                      <a
                        aria-label="Scroll to discover"
                        className="relative group w-24 h-24 flex items-center justify-center"
                        href="#atelier-philosophy"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate("about", "atelier-philosophy");
                        }}
                      >
                        <svg
                          className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite] text-tertiary"
                          viewBox="0 0 120 120"
                        >
                          <path
                            d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                            fill="transparent"
                            id="circleTextPathMobile"
                          ></path>
                          <text className="font-label-caps text-[9px] uppercase tracking-[0.3em] fill-current">
                            <textPath href="#circleTextPathMobile" startOffset="0%">
                              Scroll To Discover · Velora Atelier ·
                            </textPath>
                          </text>
                        </svg>
                        <div className="w-9 h-9 rounded-full bg-surface-container/80 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:bg-tertiary transition-colors">
                          <span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary text-base transition-colors">
                            arrow_downward
                          </span>
                        </div>
                      </a>
                      <div className="w-[1px] h-6 bg-tertiary/60 -mt-1"></div>
                    </div>
                  </div>

                  {/* Desktop Rotating / Pulsing Circular Scroll Indicator (Unchanged on Desktop) */}
                  <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2">
                    <a
                      aria-label="Scroll to discover"
                      className="relative group w-25 h-25 flex items-center justify-center"
                      href="#atelier-philosophy"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate("about", "atelier-philosophy");
                      }}
                    >
                      <svg
                        className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite] text-tertiary"
                        viewBox="0 0 120 120"
                      >
                        <path
                          d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                          fill="transparent"
                          id="circleTextPath"
                        ></path>
                        <text className="font-label-caps text-[9px] uppercase tracking-[0.3em] fill-current">
                          <textPath href="#circleTextPath" startOffset="0%">
                            Scroll To Discover · Velora Atelier ·
                          </textPath>
                        </text>
                      </svg>
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shadow-md group-hover:bg-tertiary transition-colors">
                        <span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary text-base transition-colors">
                          arrow_downward
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right Editorial Portrait: Modern Masculine Sculpting (Desktop Unchanged) */}
                <div className="hidden lg:block lg:col-span-3 relative h-[680px]">
                  <div className="relative w-full h-full overflow-hidden rounded-t-[140px] rounded-b-lg shadow-2xl">
                    <img
                      className="w-full h-full object-cover object-center filter grayscale-[10%] contrast-110"
                      alt="Editorial portrait of a distinguished man with sharp textured modern hair architecture and pristine groomed beard"
                      src="/assets/aistudio/Righthero.png"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary-container/80"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organic Arch Curve upward transition into Ivory Section */}
            <div className="w-full relative mt-0 lg:mt-16 -mb-1 leading-none text-secondary-fixed pointer-events-none">
              <svg
                className="w-full h-16 sm:h-24 md:h-32 fill-current"
                preserveAspectRatio="none"
                viewBox="0 0 1440 120"
              >
                <path d="M0,32 C360,120 1080,120 1440,32 L1440,120 L0,120 Z"></path>
              </svg>
            </div>
          </section>
          {/* =========================================================================
              SECTION 3: A SPACE FOR EVERY YOU
             ========================================================================= */}
          <section
            className="w-full bg-secondary-fixed text-on-secondary-fixed py-24 px-gutter relative overflow-hidden"
            id="atelier-philosophy"
          >
            <div className="max-w-[1600px] mx-auto">
              {/* Split Asymmetrical Layout with Taxonomy Rail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
                {/* Left Column: Manifesto & Action */}
                <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-6">
                  <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-on-tertiary-container mb-4">
                    Atelier Philosophy
                  </span>
                  <h2 className="font-display-lg text-display-lg uppercase tracking-tight text-on-secondary-fixed leading-[1.02] mb-6">
                    A Space For
                    <br />
                    <span className="font-editorial-italic italic font-normal text-on-tertiary-container lowercase">
                      every
                    </span>{" "}
                    You.
                  </h2>
                  <div className="w-16 h-[1px] bg-outline-variant mb-8"></div>
                  <p className="font-body-lg text-body-lg text-on-secondary leading-relaxed mb-6 font-light">
                    We abandon the outdated binary conventions of traditional salons. Velora was established as an architectural sanctuary designed around fluid identity, precision craft, and restorative wellness.
                  </p>
                  <p className="font-body-md text-body-md text-on-secondary leading-relaxed mb-10 font-light">
                    Whether sculpting an architectural silhouette, revitalizing stressed dermal layers, or curating a ritual hot towel shave, our masters honor your personal cadence with uncompromising discretion.
                  </p>
                  <a
                    className="inline-flex items-center gap-4 bg-primary-container text-on-background px-8 py-4 rounded-lg font-label-caps text-label-caps uppercase tracking-[0.2em] shadow-xl hover:bg-surface-container transition-all group"
                    href="#signature-services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate("services", "signature-services");
                    }}
                  >
                    <span>Our Services</span>
                    <span className="material-symbols-outlined text-sm text-tertiary group-hover:translate-x-1.5 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>

                {/* Center Visual Column: Interlocking Curved Imagery */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                
                

                  {/* Primary Architectural Salon Interior (Organic arched top) */}
                  <div className="relative w-full max-w-md h-[540px] rounded-t-[220px] rounded-b-2xl overflow-hidden shadow-2xl bg-surface-container">
                    <img
                      className="w-full h-full object-cover object-center"
                      alt="Sun-drenched luxury architectural minimalist salon interior with fluted natural white oak paneling, brushed brass circular mirrors, terrazzo flooring, curved boucle styling chairs"
                      src={IMAGES.philosophyArch}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 via-transparent to-transparent"></div>
                  </div>

                  {/* Overlapping Circular Detail Ritual Image */}
                  <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl bg-surface-container-low p-1.5">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img
                        className="w-full h-full object-cover"
                        alt="Macro close-up shot of skilled artisan hands using Japanese shears trimming damp glossy dark hair with botanical mist"
                        src={IMAGES.philosophyCircle}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Far Right Taxonomy Rail */}
                <div className="lg:col-span-2 flex flex-col gap-6 pt-8 lg:pt-0">
                  <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-on-tertiary-container pb-2">
                    Discipline Folio
                  </span>
                  <ol className="flex flex-col gap-5 font-label-meta text-label-meta">
                    {disciplineFolio.map((item) => {
                      const matchedService = SIGNATURE_SERVICES.find(
                        (s) => s.id === item.serviceId
                      );
                      return (
                        <li
                          key={item.num}
                          onClick={() =>
                            matchedService &&
                            setSelectedServiceModal(matchedService)
                          }
                          className="flex items-center justify-between pb-3 border-b border-outline-variant/25 cursor-pointer group hover:border-on-tertiary-container transition-colors"
                        >
                          <span className="text-on-secondary group-hover:text-on-secondary-fixed transition-colors">
                            {item.num} {item.name}
                          </span>
                          <span className="text-on-tertiary-container">
                            {item.tag}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 4: SIGNATURE SERVICES
             ========================================================================= */}
          <section
            className="w-full bg-primary-container text-on-surface py-28 px-gutter relative"
            id="signature-services"
          >
            <div className="max-w-[1600px] mx-auto">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-tertiary mb-3 block">
                    Curated Treatments
                  </span>
                  <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface">
                    Expert Care, Thoughtfully Curated
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-[0.2em] text-tertiary hover:text-tertiary-fixed transition-colors cursor-pointer"
                >
                  <span>View All Services &amp; Reserve</span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* 5 Editorial Asymmetric Treatment Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {SIGNATURE_SERVICES.map((service) => (
                  <article
                    key={service.id}
                    onClick={() => setSelectedServiceModal(service)}
                    className={`group relative h-[560px] ${service.roundedClass} overflow-hidden bg-surface-container flex flex-col justify-between p-6 shadow-xl transition-transform duration-500 hover:-translate-y-2 cursor-pointer`}
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                        alt={service.title}
                        src={service.image}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex justify-between items-start">
                      <span className="w-8 h-8 rounded-full bg-primary-container/80 backdrop-blur-md font-label-caps text-label-caps flex items-center justify-center text-tertiary">
                        {service.num}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-primary-container/70 flex items-center justify-center group-hover:bg-tertiary transition-colors shadow-md">
                        <span className="material-symbols-outlined text-base text-tertiary group-hover:text-on-tertiary transition-colors">
                          north_east
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10">
                      <span className="font-label-caps text-label-caps uppercase tracking-widest text-tertiary block mb-1">
                        {service.category}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-2">
                        {service.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4 font-light">
                        {service.shortDesc}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/25">
                        <span className="font-label-meta text-label-meta text-outline tabular-nums">
                          {service.duration}
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tabular-nums">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Service Menu Accordion (from Design Spec) */}
              <div className="mt-20 pt-12 border-t border-outline-variant/30">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary block mb-2">
                      Complete Atelier Tariff
                    </span>
                    <h3 className="font-headline-md text-headline-sm uppercase text-secondary-fixed">
                      Service Menu &amp; Artisan Pairings
                    </h3>
                  </div>
                  <span className="font-label-meta text-label-meta text-outline">
                    Gender-Neutral Pricing Based on Time &amp; Technical Complexity
                  </span>
                </div>

                <div className="divide-y divide-outline-variant/30 border-t border-b border-outline-variant/30">
                  {SIGNATURE_SERVICES.map((service) => {
                    const isOpen = expandedAccordionId === service.id;
                    return (
                      <div key={service.id} className="py-5">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedAccordionId(isOpen ? null : service.id)
                          }
                          className="w-full flex items-center justify-between text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-6">
                            <span className="font-label-caps text-label-caps text-tertiary tabular-nums">
                              {service.num}
                            </span>
                            <div>
                              <span className="font-headline-sm text-xl uppercase text-on-surface group-hover:text-tertiary transition-colors block">
                                {service.title}
                              </span>
                              <span className="font-label-meta text-label-meta text-outline">
                                {service.category} · {service.artisan}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="hidden sm:inline font-label-meta text-label-meta text-outline tabular-nums">
                              {service.duration}
                            </span>
                            <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tabular-nums">
                              {service.price}
                            </span>
                            <span className="material-symbols-outlined text-tertiary transition-transform duration-300">
                              {isOpen ? "remove" : "add"}
                            </span>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="pt-5 pl-0 sm:pl-12 pr-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-fadeIn">
                            <div className="lg:col-span-8">
                              <p className="font-body-md text-body-md text-on-surface-variant font-light mb-4">
                                {service.fullDesc}
                              </p>
                              <div className="flex flex-wrap gap-x-6 gap-y-2 font-label-meta text-label-meta text-tertiary">
                                {service.highlights.map((item, i) => (
                                  <span key={item}>
                                    {i > 0 && "· "}
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="lg:col-span-4 flex lg:justify-end">
                              <button
                                type="button"
                                onClick={() => handleOpenBooking(service.id)}
                                className="bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-[0.2em] px-6 py-3 rounded-lg hover:bg-tertiary transition-colors cursor-pointer"
                              >
                                Reserve {service.title}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 5: THE VELORA EXPERIENCE (360° TOUR & NARRATIVE)
             ========================================================================= */}
          <section
            className="w-full bg-surface-container-lowest text-on-surface py-28 px-gutter relative overflow-hidden"
            id="velora-experience"
          >
            <div className="max-w-[1600px] mx-auto">
              {/* Multiline Editorial Headline */}
              <div className="max-w-4xl mb-16">
                <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-tertiary mb-3 block">
                  Spatial Choreography
                </span>
                <h2 className="font-display-lg text-display-lg uppercase tracking-tight text-secondary-fixed leading-[0.98]">
                  A Salon
                  <br />
                  Experience
                  <br />
                  <span className="font-editorial-italic italic font-normal text-tertiary">
                    Like No Other.
                  </span>
                </h2>
              </div>

              {/* Architectural Magazine Layout with 360 Virtual Tour */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
                {/* Large Hero Interior Tour Frame */}
                <div className="lg:col-span-8 relative h-[520px] md:h-[600px] rounded-2xl overflow-hidden bg-surface-container shadow-2xl group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    alt="Wide panoramic interior photograph of the Velora private suite lounge with custom espresso curved velvet banquettes, fluted oak partitions, brushed gold architectural sconces"
                    src={IMAGES.tourMain}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary-container/30 backdrop-brightness-95"></div>

                  {/* Glassmorphic 360 Tour Interactive Center Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <button
                      aria-label="Play 360 Virtual Tour"
                      onClick={() => setTourOpen(true)}
                      className="group/tour flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-surface-container/80 backdrop-blur-xl shadow-2xl hover:bg-surface-container transition-all transform hover:scale-105 cursor-pointer"
                      type="button"
                    >
                      <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center shadow-lg group-hover/tour:bg-tertiary-fixed transition-colors">
                        <span
                          className="material-symbols-outlined text-3xl text-on-tertiary fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_arrow
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed">
                          Take A Virtual Tour (360°)
                        </span>
                        <span className="font-label-meta text-label-meta text-tertiary mt-1">
                          Private Walkthrough · 2:45 Min
                        </span>
                      </div>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTourOpen(true)}
                    className="absolute bottom-6 left-6 flex items-center gap-3 bg-surface-container-low/90 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer hover:bg-surface-container transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    <span className="font-label-caps text-label-caps uppercase text-secondary-fixed">
                      Soundscape by Velora Audio
                    </span>
                  </button>
                </div>

                {/* Overlapping Side Portraits & Detail Cards */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div
                    onClick={() => setTourOpen(true)}
                    className="relative h-[280px] rounded-2xl overflow-hidden bg-surface-container shadow-xl cursor-pointer group"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Luxury salon ritual shampoo lounge with ergonomic leather reclining basins, dark slate tiles, subtle amber under-counter glow"
                      src={IMAGES.tourHydro}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 bg-primary-container/80 backdrop-blur-md px-3 py-1.5 rounded-lg">
                      <span className="font-label-caps text-label-caps uppercase text-tertiary">
                        Hydrotherapy Lounge
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setTourOpen(true)}
                    className="relative h-[280px] rounded-2xl overflow-hidden bg-surface-container shadow-xl cursor-pointer group"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Close up of artisanal welcome tray at Velora featuring bespoke herbal botanical infusions, chilled hand towels, and cold-pressed botanical refreshments"
                      src={IMAGES.tourRefreshments}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 bg-primary-container/80 backdrop-blur-md px-3 py-1.5 rounded-lg">
                      <span className="font-label-caps text-label-caps uppercase text-tertiary">
                        Bespoke Refreshments
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-tertiary mb-3">
                    01 / The Prelude
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-secondary-fixed mb-3">
                    Bespoke Diagnostic Dialogue
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light">
                    Every appointment initiates in a quiet consulting alcove. We map facial bone structure, hair tensile behavior, skin moisture levels, and your daily lifestyle demands.
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-tertiary mb-3">
                    02 / The Isolation
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-secondary-fixed mb-3">
                    Acoustic Private Suites
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light">
                    No mirrors echoing crowded floors. Experience quiet luxury inside acoustically softened private suites equipped with tactile fluted woods and circadian light simulation.
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-tertiary mb-3">
                    03 / The Sustenance
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-secondary-fixed mb-3">
                    Olfactory &amp; Artisanal Bar
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light">
                    Sip rare ceremonial matcha or biodynamic champagne while custom santal and vetiver aroma blends elevate your sensory calm throughout your treatment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 6: WHY CHOOSE VELORA
             ========================================================================= */}
          <section className="w-full bg-secondary-fixed text-on-secondary-fixed py-28 px-gutter relative">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
                {/* Left Column: Proposition Manifesto */}
                <div className="lg:col-span-4 flex flex-col items-start">
                  <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-on-tertiary-container mb-3">
                    Why Choose Us
                  </span>
                  <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-secondary-fixed leading-tight mb-6">
                    Beauty In
                    <br />
                    Expert Hands.
                  </h2>
                  <div className="w-16 h-[1px] bg-outline-variant mb-8"></div>
                  <p className="font-body-md text-body-md text-on-secondary leading-relaxed mb-8 font-light">
                    We reject the churn of commercial salons. In our atelier, each client is granted expansive appointment windows, ensuring our master artisans never compromise on precision or patience.
                  </p>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-high/20">
                    <span className="font-display-lg text-display-lg text-on-tertiary-container leading-none tabular-nums">
                      99%
                    </span>
                    <span className="font-body-sm text-body-sm text-on-secondary font-light">
                      Client satisfaction rating across over 4,200 bespoke sessions.
                    </span>
                  </div>
                </div>

                {/* Right Column: 3 Benefit Pillars */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Pillar 1 */}
                  <div className="flex flex-col p-6 rounded-xl bg-surface-container-high/10">
                    <div className="w-12 h-12 rounded-full bg-on-secondary-fixed text-secondary-fixed flex items-center justify-center mb-6 shadow-md">
                      <span className="material-symbols-outlined text-xl text-tertiary">
                        workspace_premium
                      </span>
                    </div>
                    <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-container mb-2">
                      01 / Pedigree
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-secondary-fixed mb-4">
                      Trained Professionals
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-secondary leading-relaxed font-light">
                      Our roster includes former Vidal Sassoon Academy instructors, Paris Fashion Week master colorists, and licensed medical dermal aestheticians.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="flex flex-col p-6 rounded-xl bg-surface-container-high/10">
                    <div className="w-12 h-12 rounded-full bg-on-secondary-fixed text-secondary-fixed flex items-center justify-center mb-6 shadow-md">
                      <span className="material-symbols-outlined text-xl text-tertiary">
                        spa
                      </span>
                    </div>
                    <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-container mb-2">
                      02 / Formulation
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-secondary-fixed mb-4">
                      Premium Products
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-secondary leading-relaxed font-light">
                      We curate exclusively vegan, clean-certified, micro-batch apothecary lines including Davines Sustainable Beauty, Oribe, and Biologique Recherche.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="flex flex-col p-6 rounded-xl bg-surface-container-high/10">
                    <div className="w-12 h-12 rounded-full bg-on-secondary-fixed text-secondary-fixed flex items-center justify-center mb-6 shadow-md">
                      <span className="material-symbols-outlined text-xl text-tertiary">
                        verified_user
                      </span>
                    </div>
                    <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-container mb-2">
                      03 / Standard
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-secondary-fixed mb-4">
                      Hygiene First
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-secondary leading-relaxed font-light">
                      Hospital-grade autoclave sterilization, single-use organic Egyptian linens, and HEPA-filtered private suite airflow for ultimate peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 7: EDITORIAL LOOKBOOK (MOSAIC)
             ========================================================================= */}
          <section
            className="w-full bg-primary-container text-on-surface py-28 px-gutter relative"
            id="editorial-lookbook"
          >
            <div className="max-w-[1600px] mx-auto">
              {/* Lookbook Header & Filter Tabs */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                <div>
                  <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-tertiary mb-3 block">
                    Seasonal Folio
                  </span>
                  <h2 className="font-display-lg text-display-lg uppercase tracking-tight text-on-surface">
                    Editorial Monograph
                  </h2>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      { key: "All", label: "All (24)" },
                      { key: "Hair", label: "Hair (10)" },
                      { key: "Skin", label: "Skin (6)" },
                      { key: "Grooming", label: "Grooming (5)" },
                      { key: "Makeup", label: "Makeup (3)" },
                    ] as { key: LookbookFilter; label: string }[]
                  ).map((tab) => {
                    const isActive = lookbookFilter === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setLookbookFilter(tab.key)}
                        className={`px-5 py-2 rounded-full font-label-caps text-label-caps uppercase tracking-widest transition-colors cursor-pointer ${
                          isActive
                            ? "bg-tertiary text-on-tertiary shadow-md"
                            : "bg-surface-container text-on-surface-variant hover:text-tertiary"
                        }`}
                        type="button"
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Asymmetrical Editorial Mosaic Grid */}
              <div className="grid grid-cols-2  lg:grid-cols-12 gap-2">
                {filteredLookbook.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenBooking()}
                    className={`${
                      lookbookFilter === "All" ? item.colSpan : "lg:col-span-6"
                    } group relative ${
                      item.heightClass
                    } rounded-2xl overflow-hidden bg-surface-container shadow-2xl cursor-pointer max-h-[200px] lg:max-h-[600px]`}
                  >
                    <img
                      className="w-full h-full  object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      alt={item.alt}
                      src={item.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <span className="font-label-caps text-label-caps uppercase tracking-widest text-tertiary">
                          {item.tag}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                          {item.title}
                        </h3>
                      </div>
                      <span className="font-label-meta text-label-meta text-outline">
                        {item.credit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* =========================================================================
              SECTION 9: FINAL APPOINTMENT CAMPAIGN
             ========================================================================= */}
          <section
            className="w-full bg-primary-container text-on-surface py-28 px-gutter relative overflow-hidden"
            id="appointment-concierge"
          >
            <div className="max-w-[1600px] mx-auto">
              <div className="rounded-3xl bg-surface-container-high/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
                {/* Diffused internal glow */}
                <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-tertiary/15 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Master Artisan in Action */}
                  <div className="hidden lg:block lg:col-span-4 relative h-[460px] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      className="w-full h-full object-cover"
                      alt="Editorial portrait of a master salon stylist in a dark linen apron carefully crafting hair with fine shears"
                      src={IMAGES.campaignArtisan}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-surface-container-low/90 backdrop-blur-md px-4 py-2 rounded-lg">
                      <span className="font-label-caps text-label-caps uppercase text-tertiary">
                        Master Craft At Work
                      </span>
                    </div>
                  </div>

                  {/* Center Column: High Drama Invitation & Action */}
                  <div className="lg:col-span-5 flex flex-col items-start text-left">
                    <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-tertiary mb-3 block">
                      Private Reservation
                    </span>
                    <h2 className="font-display-lg text-display-lg uppercase tracking-tight text-secondary-fixed leading-tight mb-6">
                      Ready For A
                      <br />
                      <span className="font-editorial-italic italic font-normal text-tertiary">
                        Fresh Look?
                      </span>
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-8 max-w-md">
                      Step into the sanctuary where beauty knows no boundaries. Reserve your consultation with our master artisans and discover hair, skin, and grooming customized to your essence.
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleOpenBooking()}
                        className="inline-flex items-center justify-center bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-[0.2em] px-8 py-4 rounded-lg shadow-xl hover:bg-tertiary transition-colors cursor-pointer"
                      >
                        Book Your Slot
                      </button>
                      <a
                        className="inline-flex items-center justify-center gap-2 bg-surface-container text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest px-6 py-4 rounded-lg hover:bg-surface-container-high transition-colors"
                        href="tel:+1800835672"
                      >
                        <span className="material-symbols-outlined text-sm text-tertiary">
                          phone_in_talk
                        </span>
                        <span>(+1) 800-VELORA</span>
                      </a>
                    </div>
                    <div className="flex items-center gap-6 mt-8 font-label-meta text-label-meta text-outline">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-tertiary">
                          check_circle
                        </span>
                        <span>Zero Wait Times</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-tertiary">
                          check_circle
                        </span>
                        <span>Private Suites</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Oval Salon Atmosphere Architecture */}
                  <div className="lg:col-span-3 flex flex-col items-center justify-center">
                    <div className="relative w-56 h-80 rounded-[120px] overflow-hidden shadow-2xl bg-surface-container p-1">
                      <img
                        className="w-full h-full object-cover rounded-[116px]"
                        alt="Atmospheric warm illuminated reception lounge at Velora with ambient golden neon sign glowing 'GOOD HAIR, GOOD MOOD'"
                        src={IMAGES.campaignOval}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-editorial-italic text-editorial-italic italic text-tertiary mt-4 text-center">
                      “Good Hair, Good Mood.”
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenTour={() => setTourOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingOpen}
        initialServiceId={bookingServiceId}
        onClose={() => setBookingOpen(false)}
      />

      <VirtualTourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
        onBookFromTour={() => handleOpenBooking()}
      />

      <ServiceDetailModal
        service={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        onBookService={(serviceId) => handleOpenBooking(serviceId)}
      />
    </div>
  );
}
