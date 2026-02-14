import { ImageSlot } from './ui';

export default function MascotSlot() {
  return (
    <div className="relative h-64 w-full sm:h-72">
      <ImageSlot slotKey="mascot-main" hiddenVisual className="absolute inset-0" />
      <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="absolute left-4 top-4 h-24 w-24 rounded-full bg-cyan-200/20 blur-2xl" />
    </div>
  );
}
