import { Info } from "lucide-react";

export function PrototypeNotice() {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-lg border border-yellow-400/25 bg-yellow-400/10 px-4 py-3 text-xs text-yellow-100">
      <Info className="mt-0.5 shrink-0 text-yellow-300" size={16} />

      <p className="leading-relaxed">
        <span className="font-semibold text-yellow-200">Prototype Data — </span>
        This dashboard currently uses demonstration data for proof of concept.
        Real-time dataset will be released with the official
        launch of our Global Save Soil Index portal on World Soil Day - Dec 5 2026.
      </p>
    </div>
  );
}