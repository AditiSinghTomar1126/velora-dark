import React, { useState } from "react";
import { IMAGES } from "../data";
import { NavTab } from "./Header";

interface FooterProps {
  onNavigate: (tab: NavTab, sectionId?: string) => void;
  onOpenTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTour }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-primary-container border-t border-outline-variant/30">
      <div className="w-full px-gutter py-space-xl max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg mb-space-xl">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4 flex flex-col gap-space-md pr-space-md">
            <div className="flex items-center gap-space-sm">
            
              <span className="font-display-lg text-headline-sm uppercase tracking-widest text-on-surface">
                Velora
              </span>
            </div>
            <p className="font-display-lg text-editorial-italic italic text-tertiary tracking-wide">
              Beauty has no gender.
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              An avant-garde sanctuary crafting bespoke hair, skin, and sculptural grooming rituals. Architecture of style tailored for every individual.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <button
                type="button"
                aria-label="Instagram"
                onClick={() => onNavigate("gallery", "editorial-lookbook")}
                className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </button>
              <button
                type="button"
                aria-label="Editorial Lookbook"
                onClick={() => onNavigate("gallery", "editorial-lookbook")}
                className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">auto_stories</span>
              </button>
              <button
                type="button"
                aria-label="Atelier Virtual Tour"
                onClick={onOpenTour}
                className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">pin_drop</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <span className="font-label-caps text-label-caps uppercase text-tertiary tracking-widest mb-space-xs">
              Navigation
            </span>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home");
              }}
            >
              Home Atelier
            </a>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("services", "signature-services");
              }}
            >
              Service Folio
            </a>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("experience", "velora-experience");
              }}
            >
              The Experience
            </a>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("gallery", "editorial-lookbook");
              }}
            >
              Editorial Monograph
            </a>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("about", "atelier-philosophy");
              }}
            >
              Our Artisans
            </a>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact", "appointment-concierge");
              }}
            >
              Private Concierge
            </a>
          </div>

          {/* Column 3: Atelier & Hours */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <span className="font-label-caps text-label-caps uppercase text-tertiary tracking-widest mb-space-xs">
              Atelier &amp; Hours
            </span>
            <div className="flex flex-col text-on-surface-variant font-body-sm text-body-sm gap-space-xs">
              <p className="text-on-surface">480 Haute Boulevard, Suite 100</p>
              <p>New York, NY 10012</p>
              <p className="text-tertiary pt-space-xs">+1 (212) 840-9200</p>
              <p>concierge@velora-salon.com</p>
            </div>
            <div className="border-t border-outline-variant/20 pt-space-sm mt-space-xs flex flex-col gap-1 font-label-meta text-label-meta text-on-surface-variant">
              <div className="flex justify-between">
                <span>Tuesday — Saturday</span>
                <span className="text-on-surface tabular-nums">10:00 — 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-on-surface tabular-nums">11:00 — 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Monday</span>
                <span className="text-tertiary">By Private Request</span>
              </div>
            </div>
          </div>

          {/* Column 4: Private Dispatch */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <span className="font-label-caps text-label-caps uppercase text-tertiary tracking-widest mb-space-xs">
              Private Dispatch
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Receive exclusive seasonal lookbooks, salon residencies, and artisanal launches.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-space-sm mt-space-xs">
              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (subscribed) setSubscribed(false);
                  }}
                  className="w-full bg-surface-container-low border-b border-outline text-on-surface font-body-sm text-body-sm px-3 py-space-sm placeholder:text-outline-variant focus:outline-none focus:border-tertiary transition-colors"
                  placeholder="Your email address"
                  type="email"
                  required
                />
                <button
                  aria-label="Subscribe"
                  className="absolute right-2 bottom-space-sm text-tertiary hover:text-tertiary-fixed transition-colors cursor-pointer"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              {subscribed ? (
                <span className="font-label-meta text-label-meta text-tertiary">
                  Dispatched. Welcome to the Velora Monograph Patron Circle.
                </span>
              ) : (
                <span className="font-label-meta text-label-meta text-outline-variant">
                  Strict discretion observed. Zero spam.
                </span>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-outline-variant/20 pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-md font-label-meta text-label-meta text-outline">
            <p>© 2025 VELORA ATELIER. All rights reserved.</p>
            <a
              className="hover:text-on-surface transition-colors"
              href="https://www.atnexus.in"
            >
              Made & Managed by ATNexus.
            </a>
           
          </div>
          <a
            aria-label="Scroll to top"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-all cursor-pointer"
            href="#top"
          >
            <span className="material-symbols-outlined text-sm">arrow_upward</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
