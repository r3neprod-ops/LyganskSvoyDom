import { ImageSlot } from './ui';

export default function MascotSlot() {
  return (
    <div className="relative h-20 w-full">
      {/* Hidden mascot slot reserved for future asset placement */}
      <ImageSlot slotKey="mascot-main" className="absolute inset-0 opacity-0" />
    </div>
  );
}
