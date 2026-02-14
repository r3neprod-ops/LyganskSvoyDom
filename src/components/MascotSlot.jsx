import { Card, ImageSlot } from './ui';

export default function MascotSlot() {
  return (
    <Card>
      <ImageSlot label="MASCOT SLOT" className="h-56" />
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-slate-100 px-3 py-1">normal</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">thinking</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">waving</span>
      </div>
      <p className="mt-3 text-sm text-muted">Здесь можно разместить маскота для сценариев подсказок и коммуникации.</p>
    </Card>
  );
}
