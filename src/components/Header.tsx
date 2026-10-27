import React, { useState } from "react";
import { IMAGES } from "../data";

export type NavTab = "home" | "services" | "experience" | "gallery" | "about" | "contact";

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab, sectionId?: string) => void;
  onOpenBooking: (preselectedService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; sectionId?: string }[] = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services", sectionId: "signature-services" },
    { id: "experience", label: "Experience", sectionId: "velora-experience" },
    { id: "gallery", label: "Gallery", sectionId: "editorial-lookbook" },
    { id: "about", label: "About", sectionId: "atelier-philosophy" },
    { id: "contact", label: "Contact", sectionId: "appointment-concierge" },
  ];

  const handleNavClick = (e: React.MouseEvent, item: { id: NavTab; sectionId?: string }) => {
    e.preventDefault();
    onNavigate(item.id, item.sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-primary-container/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="h-20 w-full px-gutter flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
          className="flex items-center gap-space-sm text-left group"
        >
         
          <div className="flex flex-col ml-space-xs">
            <span className="font-display-lg text-headline-sm uppercase tracking-widest text-on-surface leading-none group-hover:text-tertiary transition-colors">
              Velora
            </span>
           
          </div>
        </a>

        <nav
          className="hidden lg:flex items-center gap-space-lg"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item)}
                className={`font-label-caps text-label-caps uppercase transition-colors tracking-widest py-space-xs whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-tertiary border-b border-tertiary"
                    : "text-on-surface-variant hover:text-tertiary"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-md">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center justify-center bg-tertiary text-on-tertiary font-label-caps text-label-caps uppercase px-space-md py-space-sm rounded-lg hover:bg-tertiary-fixed transition-colors tracking-widest shadow-[0_12px_40px_rgba(184,149,104,0.08)] cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Appointment
          </button>
          <div className="flex items-center gap-space-sm pl-space-xs">
            <button
              type="button"
              onClick={() => onNavigate("about", "atelier-philosophy")}
              title="Atelier Patron Profile"
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-tertiary cursor-pointer"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-tertiary/40"
                src={IMAGES.profile}
                referrerPolicy="no-referrer"
              />
            </button>
            <button
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-headline-sm">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-down Atelier Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="w-full bg-primary-container/95 backdrop-blur-2xl border-b border-outline-variant/40 px-gutter py-8 animate-fadeIn">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 flex flex-col gap-4">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-tertiary">
                Atelier Directory
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                {navItems.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`group flex flex-col p-4 rounded-xl border transition-all ${
                      activeTab === item.id
                        ? "border-tertiary bg-surface-container text-on-surface"
                        : "border-outline-variant/30 bg-surface-container-low/60 text-on-surface-variant hover:border-tertiary/60 hover:text-on-surface"
                    }`}
                  >
                    <span className="font-label-meta text-label-meta text-tertiary mb-1">
                      0{idx + 1}
                    </span>
                    <span className="font-headline-sm text-lg uppercase tracking-wider">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-surface-container border border-outline-variant/30">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary mb-2">
                Private Residence Suites
              </span>
              <p className="font-display-lg text-editorial-italic italic text-secondary-fixed mb-2">
                “Look Good · Feel Good · Everyday”
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                480 Haute Boulevard, Suite 100 · New York, NY 10012
              </p>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-[0.2em] hover:bg-tertiary transition-colors cursor-pointer"
              >
                Reserve Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
