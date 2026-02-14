'use client';

import { useEffect, useRef, useState } from 'react';

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`section-divider py-14 sm:py-16 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-muted">{description}</p> : null}
    </div>
  );
}

export function Badge({ children }) {
  return <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted">{children}</span>;
}

export function Button({ as = 'button', children, className = '', variant = 'primary', ...props }) {
  const Comp = as;
  const base =
    'inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'border border-cyan-800/10 bg-accent text-white shadow-[0_8px_22px_rgba(14,116,144,0.28)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,116,144,0.35)] focus:ring-accent',
    secondary: 'border border-line bg-white text-text shadow-soft hover:-translate-y-0.5 hover:shadow-lift focus:ring-slate-300',
    ghost: 'bg-transparent text-text hover:bg-white/70 focus:ring-slate-300'
  };

  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

export function IconButton({ as = 'a', children, className = '', ...props }) {
  const Comp = as;
  return (
    <Comp
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-[11px] font-bold shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Card({ children, className = '' }) {
  return (
    <article className={`rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${className}`}>
      {children}
    </article>
  );
}

export function Input(props) {
  return <input className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent" {...props} />;
}

export function Textarea(props) {
  return <textarea className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-accent" {...props} />;
}

export function Modal({ children, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.2)] sm:p-8">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg border border-line px-2 py-1 text-xs text-muted hover:text-text">
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
}

export function Carousel({ children }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (direction) => {
    if (!scrollerRef.current) return;
    const amount = Math.round(scrollerRef.current.clientWidth * 0.78);
    scrollerRef.current.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <Button variant="secondary" onClick={() => scrollByAmount(-1)}>
          Назад
        </Button>
        <Button variant="secondary" onClick={() => scrollByAmount(1)}>
          Вперёд
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
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-white ${className}`} data-background-key={backgroundKey}>
      {/* Insert hero/section background-image here by backgroundKey when assets are available. */}
      <div className="hero-glow -left-8 top-8 h-40 w-40 bg-cyan-200/80" />
      <div className="hero-glow -right-6 bottom-8 h-48 w-48 bg-sky-100/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/94 via-white/80 to-slate-50/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/35" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ImageSlot({ className = '', slotKey }) {
  return <div aria-label="image-slot" data-slot-key={slotKey} className={`pointer-events-none select-none ${className}`} />;
}

export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'revealed' : ''} ${className}`}>
      {children}
    </div>
  );
}
