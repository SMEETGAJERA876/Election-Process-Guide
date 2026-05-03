import { useAppStore } from '../store';
import { regions } from '../data/content';
import { MapPin, ChevronDown } from 'lucide-react';

export default function RegionSelector() {
  const { region, setRegion } = useAppStore();

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-2xl px-4 py-2 hover:border-primary/50 transition-all cursor-pointer">
        <MapPin className="w-4 h-4 text-primary" />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-transparent text-xs font-bold text-foreground appearance-none focus:outline-none cursor-pointer pr-6"
          aria-label="Select Region"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id} className="bg-card text-foreground">
              {r.name} ({r.id})
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-3 pointer-events-none group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
}
