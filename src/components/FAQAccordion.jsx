'use client';

import { useState } from 'react';
import { Card, Reveal } from './ui';

export default function FAQAccordion({ items }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const isOpen = index === active;
        return (
          <Reveal key={item.q}>
            <Card className="p-0">
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setActive(isOpen ? -1 : index)}
              >
                <span className="font-medium text-text">{item.q}</span>
                <span className="text-lg text-muted">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen ? <p className="px-5 pb-5 text-sm text-muted">{item.a}</p> : null}
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
