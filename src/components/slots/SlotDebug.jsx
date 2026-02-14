'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const SLOT_DEBUG = process.env.NEXT_PUBLIC_SLOT_DEBUG === 'true';

const SlotDebugContext = createContext({ enabled: false, setEnabled: () => {} });

export function SlotDebugProvider({ children }) {
  const [enabled, setEnabled] = useState(SLOT_DEBUG);
  const value = useMemo(() => ({ enabled, setEnabled }), [enabled]);

  return <SlotDebugContext.Provider value={value}>{children}</SlotDebugContext.Provider>;
}

export function useSlotDebug() {
  return useContext(SlotDebugContext);
}

export function SlotDebugToggle() {
  const { enabled, setEnabled } = useSlotDebug();

  if (!SLOT_DEBUG) return null;

  return (
    <button
      type="button"
      onClick={() => setEnabled((prev) => !prev)}
      className="fixed bottom-16 right-4 z-[90] rounded-lg border border-slate-400/60 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-soft"
    >
      Slot debug: {enabled ? 'ON' : 'OFF'}
    </button>
  );
}

export default function SlotDebug({ kind, slotKey, className = '', children }) {
  const { enabled } = useSlotDebug();

  return (
    <div className={`relative ${className}`} data-slot-kind={kind} data-slot-key={slotKey}>
      {children}
      {enabled ? (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-dashed border-slate-500/70" />
          <div className="pointer-events-none absolute left-1 top-1 rounded bg-slate-900/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
            {kind}: {slotKey}
          </div>
        </>
      ) : null}
    </div>
  );
}
