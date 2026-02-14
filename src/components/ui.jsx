'use client';

import { useRef } from 'react';

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-muted">{description}</p> : null}
    </div>
  );
}

export function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-accent text-white hover:opacity-90 focus:ring-accent',
    secondary: 'bg-white text-text shadow-premium hover:bg-slate-50 focus:ring-slate-300',
    ghost: 'bg-transparent text-text border border-slate-300 hover:bg-slate-100 focus:ring-slate-300'
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return <article className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-premium ${className}`}>{children}</article>;
}

export function Badge({ children }) {
  return <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-medium text-teal-900">{children}</span>;
}

export function Input(props) {
  return (
    <input
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      {...props}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      {...props}
    />
  );
}

export function Modal({ children, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full border border-slate-300 px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
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
    const amount = Math.round(scrollerRef.current.clientWidth * 0.8);
    scrollerRef.current.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={() => scrollByCard(-1)}>
          Назад
        </Button>
        <Button variant="ghost" onClick={() => scrollByCard(1)}>
          Вперёд
        </Button>
      </div>
      <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {children}
      </div>
    </div>
  );
}

export function ImageSlot({ label = 'IMAGE SLOT', className = '' }) {
  return (
    <div
      className={`flex h-44 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 ${className}`}
    >
      {label}
    </div>
  );
}
