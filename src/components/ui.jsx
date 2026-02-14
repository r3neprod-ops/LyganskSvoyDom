'use client';

import { useEffect, useRef, useState } from 'react';

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-muted">{description}</p> : null}
    </div>
  );
}

export function Button({ as = 'button', children, className = '', variant = 'primary', ...props }) {
  const Comp = as;
  const base =
    'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-accent text-white shadow-soft hover:-translate-y-0.5 hover:shadow-glow focus:ring-accent',
    secondary: 'bg-white/85 text-text backdrop-blur hover:bg-white hover:-translate-y-0.5 border border-white/50 focus:ring-slate-300',
    ghost: 'bg-transparent text-text hover:bg-white/70 focus:ring-slate-300'
  };

  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

export function Card({ children, className = '' }) {
  return <article className={`rounded-2xl bg-white/70 p-6 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}>{children}</article>;
}

export function Badge({ children }) {
  return <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-text shadow-soft">{children}</span>;
}

export function Input(props) {
  return <input className="w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-text shadow-soft outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-accent/40" {...props} />;
}

export function Textarea(props) {
  return <textarea className="w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-text shadow-soft outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-accent/40" {...props} />;
}

export function Modal({ children, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[linear-gradient(145deg,rgba(255,255,255,.98),rgba(246,250,255,.92))] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-8">
        <button
          type="button"
          className="absolute right-4 top-4 rounded-xl bg-white/85 px-3 py-1.5 text-xs text-muted shadow-soft transition hover:text-text"
          onClick={onClose}
        >
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
}

export function Carousel({ children }) {
  const scrollerRef = useRef(null);

  const scrollByCard = (direction) => {
    if (!scrollerRef.current) return;
    const amount = Math.round(scrollerRef.current.clientWidth * 0.82);
    scrollerRef.current.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={() => scrollByCard(-1)}>
          Prev
        </Button>
        <Button variant="secondary" onClick={() => scrollByCard(1)}>
          Next
        </Button>
      </div>
      <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {children}
      </div>
    </div>
  );
}

export function BackgroundSlot({ backgroundKey, className = '', children }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`} data-background-key={backgroundKey}>
      {/* Background image will be set here later for key: backgroundKey */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(15,118,110,.22),transparent_55%),radial-gradient(100%_90%_at_0%_100%,rgba(186,230,253,.55),transparent_60%),linear-gradient(130deg,#fefefe,#eef5ff_55%,#f6fbff)]" />
      <div className="noise-layer absolute inset-0 opacity-[0.08]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/40" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ImageSlot({ className = '', slotKey, hiddenVisual = false }) {
  const hiddenClasses = hiddenVisual ? 'opacity-0 pointer-events-none select-none' : 'bg-slate-100/80';
  return <div aria-label="image-slot" data-slot-key={slotKey} className={`w-full rounded-2xl ${hiddenClasses} ${className}`} />;
}

export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'revealed' : ''} ${className}`}>
      {children}
    </div>
  );
}
