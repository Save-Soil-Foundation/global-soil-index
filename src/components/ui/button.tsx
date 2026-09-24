import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98d75d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060c0f] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "border border-[#79bd45] bg-[#79bd45] text-[#071006] hover:border-[#91d25b] hover:bg-[#91d25b]",
        outline:
          "border border-white/15 bg-[#0b1519] text-white/76 hover:border-[#79bd45]/60 hover:bg-[#101e23] hover:text-[#b5e77f]",
        secondary:
          "border border-[#79bd45]/30 bg-[#79bd45]/10 text-[#a7df70] hover:border-[#79bd45]/50 hover:bg-[#79bd45]/16",
        ghost: "text-white/62 hover:bg-white/[0.06] hover:text-white",
        danger:
          "border border-[#ef5959]/30 bg-[#ef5959]/10 text-[#ff8b84] hover:border-[#ef5959]/50 hover:bg-[#ef5959]/16",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5",
        icon: "size-10 p-0",
        "icon-sm": "size-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";
