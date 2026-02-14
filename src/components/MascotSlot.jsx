import SlotDebug from './slots/SlotDebug';
import { ImageSlot } from './ui';

export default function MascotSlot() {
  return (
    <div className="relative h-20 w-full">
      {/* Hidden mascot slot reserved for future asset placement */}
      <SlotDebug kind="mascot" slotKey="mascot-hero" className="absolute inset-0">
        <ImageSlot slotKey="mascot-hero" className="h-full w-full opacity-0" />
      </SlotDebug>
    </div>
  );
}
