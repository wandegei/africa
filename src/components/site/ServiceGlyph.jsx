import { Compass, Building2, Scale, CalendarCheck2 } from "lucide-react";

const GLYPHS = {
  compass: Compass,
  building: Building2,
  scale: Scale,
  calendar: CalendarCheck2,
};

export default function ServiceGlyph({ icon, className = "h-5 w-5" }) {
  const Glyph = GLYPHS[icon] ?? Compass;
  return <Glyph className={className} aria-hidden="true" />;
}