import React, { useState } from "react";
import {
  ARTISANS,
  SIGNATURE_SERVICES,
  ServiceItem,
  VIRTUAL_TOUR_SPACES,
} from "../data";

interface BookingModalProps {
  isOpen: boolean;
  initialServiceId?: string;
  onClose: () => void;
}

const TIME_SLOTS = [
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
];

const DATES = [
  { day: "TUE", date: "28", month: "OCT" },
  { day: "WED", date: "29", month: "OCT" },
  { day: "THU", date: "30", month: "OCT" },
  { day: "FRI", date: "31", month: "OCT" },
  { day: "SAT", date: "01", month: "NOV" },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialServiceId,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    initialServiceId || SIGNATURE_SERVICES[0].id
  );
  const [selectedArtisan, setSelectedArtisan] = useState<string>(
    ARTISANS[0].name
  );
  const [selectedDate, setSelectedDate] = useState<string>("29");
  const [selectedTime, setSelectedTime] = useState<string>("14:30");
  const [suitePreference, setSuitePreference] = useState<boolean>(true);
  const [silentSession, setSilentSession] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialServiceId) {
      setSelectedService(initialServiceId);
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  const activeServiceObj =
    SIGNATURE_SERVICES.find((s) => s.id === selectedService) ||
    SIGNATURE_SERVICES[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `VLR-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedCode(randomCode);
  };

  const resetAndClose = () => {
    setConfirmedCode(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-primary-container/85 backdrop-blur-xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-4xl rounded-2xl bg-surface-container border border-outline-variant/40 shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-6 border-b border-outline-variant/30 bg-primary-container/60">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-tertiary block mb-1">
              Private Concierge · Suite Reservation
            </span>
            <h2
              id="booking-modal-title"
              className="font-display-lg text-headline-md uppercase tracking-tight text-secondary-fixed"
            >
              Reserve Your <span className="font-editorial-italic italic text-tertiary lowercase">Atelier</span> Session
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close reservation modal"
            className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:border-tertiary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {confirmedCode ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-tertiary/15 border border-tertiary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl text-tertiary">
                verified
              </span>
            </div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-tertiary mb-2">
              Reservation Confirmed · {confirmedCode}
            </span>
            <h3 className="font-display-lg text-headline-lg text-secondary-fixed mb-4">
              We Await Your Arrival
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-8 font-light">
              A private suite dossier has been dispatched to{" "}
              <span className="text-secondary-fixed">
                {clientEmail || "your personal inbox"}
              </span>
              . Your ceremonial beverage and acoustic preferences will be prepared prior to entry.
            </p>

            <div className="w-full max-w-lg rounded-xl bg-primary-container/80 border border-outline-variant/40 p-6 text-left mb-8 grid grid-cols-2 gap-4">
              <div>
                <span className="font-label-meta text-label-meta text-outline block">
                  Ritual Discipline
                </span>
                <span className="font-headline-sm text-lg text-secondary-fixed">
                  {activeServiceObj.title}
                </span>
              </div>
              <div>
                <span className="font-label-meta text-label-meta text-outline block">
                  Investment &amp; Duration
                </span>
                <span className="font-label-caps text-label-caps text-tertiary">
                  {activeServiceObj.price} · {activeServiceObj.duration}
                </span>
              </div>
              <div>
                <span className="font-label-meta text-label-meta text-outline block">
                  Master Artisan
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  {selectedArtisan}
                </span>
              </div>
              <div>
                <span className="font-label-meta text-label-meta text-outline block">
                  Date &amp; Watch Dial Slot
                </span>
                <span className="font-body-sm text-body-sm text-on-surface tabular-nums">
                  Oct {selectedDate}, 2026 at {selectedTime}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-[0.2em] px-10 py-4 rounded-lg hover:bg-tertiary transition-colors cursor-pointer"
            >
              Return To Monograph
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 sm:p-10 space-y-8">
            {/* Step 1: Select Ritual */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary">
                  01. Select Treatment Folio
                </span>
                <span className="font-label-meta text-label-meta text-outline">
                  {activeServiceObj.duration} · {activeServiceObj.price}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {SIGNATURE_SERVICES.map((service) => {
                  const active = service.id === selectedService;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        active
                          ? "border-tertiary bg-primary-container text-secondary-fixed shadow-[0_12px_40px_rgba(184,149,104,0.08)]"
                          : "border-outline-variant/30 bg-surface-container-low/60 text-on-surface-variant hover:border-outline"
                      }`}
                    >
                      <span className="font-label-meta text-label-meta text-tertiary mb-2 block">
                        {service.num} · {service.category}
                      </span>
                      <span className="font-headline-sm text-base uppercase text-on-surface block mb-1">
                        {service.title}
                      </span>
                      <span className="font-label-caps text-[11px] text-secondary-fixed">
                        {service.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Editorial Booking Stepper (Watch Dial Rule) */}
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary block mb-4">
                02. Editorial Watch-Dial Time Stepper
              </span>

              {/* Date Selector */}
              <div className="flex flex-wrap gap-3 mb-6">
                {DATES.map((d) => {
                  const isSel = selectedDate === d.date;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setSelectedDate(d.date)}
                      className={`px-4 py-2.5 rounded-lg border font-label-caps text-label-caps uppercase tracking-widest transition-all cursor-pointer tabular-nums ${
                        isSel
                          ? "border-tertiary bg-secondary-fixed text-on-secondary-fixed"
                          : "border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:text-tertiary"
                      }`}
                    >
                      {d.day} · {d.month} {d.date}
                    </button>
                  );
                })}
              </div>

              {/* Horizontal Watch-Dial Time Interval Rule */}
              <div className="relative bg-primary-container/90 border border-outline-variant/40 rounded-xl p-6">
                <div className="hidden sm:block absolute left-8 right-8 top-1/2 h-[1px] bg-outline-variant/50 -translate-y-1/2 pointer-events-none"></div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 relative z-10">
                  {TIME_SLOTS.map((slot) => {
                    const active = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                      >
                        <span
                          className={`w-3 h-3 rounded-full transition-all ${
                            active
                              ? "bg-tertiary ring-4 ring-tertiary/30 scale-125"
                              : "bg-surface-container-highest border border-outline group-hover:border-tertiary"
                          }`}
                        />
                        <span
                          className={`px-3 py-1.5 rounded font-label-caps text-label-caps tabular-nums transition-colors ${
                            active
                              ? "bg-secondary-fixed text-on-secondary-fixed shadow-md"
                              : "text-on-surface-variant group-hover:text-secondary-fixed"
                          }`}
                        >
                          {slot}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Artisan & Architectural Selection Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary block mb-3">
                  03. Master Artisan Pairing
                </span>
                <div className="space-y-2.5">
                  {ARTISANS.map((art) => {
                    const isSelected = selectedArtisan === art.name;
                    return (
                      <label
                        key={art.name}
                        onClick={() => setSelectedArtisan(art.name)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? "border-tertiary bg-primary-container/80"
                            : "border-outline-variant/30 bg-surface-container-low/40 hover:border-outline-variant"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Architectural 16px circle encased in 1px Antique Gold border */}
                          <span className="w-4 h-4 rounded-full border border-tertiary flex items-center justify-center p-[2px]">
                            {isSelected && (
                              <span className="w-full h-full rounded-full bg-tertiary" />
                            )}
                          </span>
                          <div>
                            <span className="font-body-sm text-body-sm text-on-surface block">
                              {art.name}
                            </span>
                            <span className="font-label-meta text-[11px] text-outline block">
                              {art.role}
                            </span>
                          </div>
                        </div>
                        <span className="font-display-lg text-xs text-tertiary border border-tertiary/40 px-2 py-0.5 rounded">
                          {art.monogram}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Client Details & Suite Checkboxes */}
              <div className="flex flex-col justify-between space-y-4">
                <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary block">
                  04. Patron Credentials &amp; Discretion
                </span>

                <div className="space-y-4">
                  <div>
                    <label className="font-label-meta text-label-meta text-outline block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Julian Vane"
                      className="w-full bg-transparent border-b border-outline text-on-surface font-body-sm py-2 focus:outline-none focus:border-tertiary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-label-meta text-label-meta text-outline block mb-1">
                        Private Email
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="patron@domain.com"
                        className="w-full bg-transparent border-b border-outline text-on-surface font-body-sm py-2 focus:outline-none focus:border-tertiary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-label-meta text-label-meta text-outline block mb-1">
                        Direct Telephone
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (212) 000-0000"
                        className="w-full bg-transparent border-b border-outline text-on-surface font-body-sm py-2 focus:outline-none focus:border-tertiary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Architectural 16px square checkboxes */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setSuitePreference(!suitePreference)}
                    className="flex items-center gap-3 text-left cursor-pointer"
                  >
                    <span className="w-4 h-4 border border-tertiary flex items-center justify-center p-[2px] shrink-0">
                      {suitePreference && (
                        <span className="w-full h-full bg-tertiary" />
                      )}
                    </span>
                    <span className="font-label-meta text-label-meta text-on-surface-variant">
                      Request Acoustic Private Residence Suite (Complimentary)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSilentSession(!silentSession)}
                    className="flex items-center gap-3 text-left cursor-pointer"
                  >
                    <span className="w-4 h-4 border border-tertiary flex items-center justify-center p-[2px] shrink-0">
                      {silentSession && (
                        <span className="w-full h-full bg-tertiary" />
                      )}
                    </span>
                    <span className="font-label-meta text-label-meta text-on-surface-variant">
                      Quiet Ritual Protocol (Minimal conversation after diagnostic)
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="font-label-meta text-label-meta text-outline block">
                  Selected Session Summary
                </span>
                <span className="font-body-sm text-body-sm text-secondary-fixed">
                  {activeServiceObj.title} · Oct {selectedDate} at {selectedTime} ({activeServiceObj.price})
                </span>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-4 rounded-lg border border-outline-variant/50 text-on-surface-variant hover:text-tertiary hover:border-tertiary font-label-caps text-label-caps uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-[0.2em] px-8 py-4 rounded-lg hover:bg-tertiary transition-colors shadow-[0_12px_40px_rgba(184,149,104,0.08)] cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookFromTour: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  isOpen,
  onClose,
  onBookFromTour,
}) => {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<number>(0);
  const [audioPlaying, setAudioPlaying] = useState(true);

  if (!isOpen) return null;

  const currentSpace = VIRTUAL_TOUR_SPACES[activeSpaceIdx];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-primary-container/90 backdrop-blur-2xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="360 Virtual Tour"
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-surface-container border border-outline-variant/40 shadow-2xl overflow-hidden my-8">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-outline-variant/30 bg-primary-container/80">
          <div className="flex items-center gap-4">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary">
              360° Spatial Walkthrough
            </span>
            <span className="text-outline">·</span>
            <span className="font-label-meta text-label-meta text-secondary-fixed">
              {currentSpace.duration}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setAudioPlaying(!audioPlaying)}
              className="px-4 py-1.5 rounded-full border border-outline-variant/50 text-label-caps font-label-caps uppercase text-secondary-fixed hover:border-tertiary flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm text-tertiary">
                {audioPlaying ? "graphic_eq" : "volume_off"}
              </span>
              <span>
                Velora Soundscape: {audioPlaying ? "Santal & Ambient Cello" : "Muted"}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Virtual Tour"
              className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-tertiary cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Interactive Viewport */}
        <div className="relative h-[440px] sm:h-[520px] w-full overflow-hidden bg-primary-container">
          <img
            src={currentSpace.image}
            alt={currentSpace.title}
            className="w-full h-full object-cover transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-primary-container/30" />

          {/* Interactive Spatial Hotspots */}
          {currentSpace.hotspots.map((spot, idx) => {
            const isSelected = selectedHotspot === idx;
            return (
              <button
                key={spot.label}
                type="button"
                style={{ left: spot.x, top: spot.y }}
                onClick={() => setSelectedHotspot(idx)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                  isSelected
                    ? "bg-tertiary text-on-tertiary shadow-xl scale-105"
                    : "bg-primary-container/80 text-secondary-fixed border border-tertiary/50 hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {isSelected ? "visibility" : "add_circle"}
                </span>
                <span className="font-label-caps text-[11px] uppercase tracking-wider whitespace-nowrap">
                  {spot.label}
                </span>
              </button>
            );
          })}

          {/* Bottom Architectural Note Card */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="bg-primary-container/85 backdrop-blur-xl border border-outline-variant/40 p-5 rounded-xl max-w-xl">
              <span className="font-label-caps text-label-caps uppercase text-tertiary block mb-1">
                {currentSpace.subtitle}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-secondary-fixed mb-2">
                {currentSpace.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                {currentSpace.description}
              </p>
              {currentSpace.hotspots[selectedHotspot] && (
                <div className="pt-2 border-t border-outline-variant/30 flex items-center gap-2 text-tertiary font-label-meta text-label-meta">
                  <span className="material-symbols-outlined text-sm">architecture</span>
                  <span>
                    <strong>{currentSpace.hotspots[selectedHotspot].label}:</strong>{" "}
                    {currentSpace.hotspots[selectedHotspot].detail}
                  </span>
                </div>
              )}
            </div>

            {/* Suite Switcher Controls */}
            <div className="flex items-center gap-2 bg-primary-container/85 backdrop-blur-xl p-2 rounded-xl border border-outline-variant/40">
              {VIRTUAL_TOUR_SPACES.map((space, idx) => (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => {
                    setActiveSpaceIdx(idx);
                    setSelectedHotspot(0);
                  }}
                  className={`px-4 py-2.5 rounded-lg font-label-caps text-label-caps uppercase tracking-widest transition-colors cursor-pointer ${
                    activeSpaceIdx === idx
                      ? "bg-tertiary text-on-tertiary"
                      : "text-on-surface-variant hover:text-secondary-fixed"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookFromTour();
                }}
                className="ml-2 px-5 py-2.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest hover:bg-tertiary transition-colors cursor-pointer"
              >
                Reserve Suite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-primary-container/85 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-surface-container border border-outline-variant/40 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 relative h-64 md:h-auto">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-primary-container/80 backdrop-blur-md font-label-caps text-label-caps flex items-center justify-center text-tertiary">
            {service.num}
          </span>
        </div>

        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-tertiary">
                {service.category} Monograph
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close service dossier"
                className="w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-tertiary cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <h3 className="font-display-lg text-headline-md uppercase text-secondary-fixed mb-2">
              {service.title}
            </h3>
            <p className="font-label-meta text-label-meta text-tertiary mb-4">
              {service.artisan}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-6 font-light">
              {service.fullDesc}
            </p>

            <div className="border-t border-outline-variant/30 pt-4 mb-6">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-outline block mb-3">
                Treatment Protocol Includes
              </span>
              <ul className="space-y-2">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
            <div>
              <span className="font-label-meta text-label-meta text-outline block">
                {service.duration}
              </span>
              <span className="font-headline-sm text-xl text-secondary-fixed">
                {service.price}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase tracking-[0.2em] px-6 py-3.5 rounded-lg hover:bg-tertiary transition-colors cursor-pointer"
            >
              Reserve This Ritual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
