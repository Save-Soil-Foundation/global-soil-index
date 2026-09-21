import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase leading-none",
  {
    variants: {
      variant: {
        default: "border-white/12 bg-white/[0.045] text-white/62",
        success: "border-[#79bd45]/30 bg-[#79bd45]/10 text-[#a9e275]",
        danger: "border-[#ef5959]/30 bg-[#ef5959]/10 text-[#ff8b84]",
        warning: "border-[#dfa25f]/30 bg-[#dfa25f]/10 text-[#edbc80]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
