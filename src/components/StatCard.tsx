import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  tone?: "default" | "success" | "danger" | "warning";
  className?: string;
};

const toneClass = {
  default: "text-white",
  success: "text-[#8cbf60]",
  danger: "text-[#e05d58]",
  warning: "text-[#d7be61]",
};

export function StatCard({
  label,
  value,
  detail,
  tone = "default",
  className,
}: StatCardProps) {
  return (
    <article
      className={cn(
        "gsi-animate-card gsi-hover-lift rounded-md border border-white/[0.08] bg-[#141d21] p-4",
        className
      )}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/34">
        {label}
      </p>
      <p className={cn("mt-2 text-2xl font-light tabular-nums", toneClass[tone])}>{value}</p>
      {detail ? <p className="mt-1 text-[10px] leading-4 text-white/32">{detail}</p> : null}
    </article>
  );
}
