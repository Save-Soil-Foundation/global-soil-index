import { Beaker, CalendarDays } from "lucide-react";

export function PrototypeNotice() {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-lg border border-[#d9dfbd] bg-[#fbfdeb] px-4 py-3 text-[#394027] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Beaker className="mt-0.5 shrink-0 text-[#58741f]" size={18} />
        <p className="text-xs leading-5 sm:text-sm">
          <span className="font-bold">Prototype dataset.</span> Rankings are
          illustrative while the verified global dataset is under review.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 pl-7 text-xs font-semibold text-[#58741f] sm:pl-0">
        <CalendarDays size={15} /> Launching 5 Dec 2026
      </div>
    </div>
  );
}
