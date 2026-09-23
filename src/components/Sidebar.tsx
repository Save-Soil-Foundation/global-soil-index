"use client";

import {
  BarChart3,
  BookOpen,
  Braces,
  ChevronRight,
  Globe2,
  Handshake,
  Info,
  Layers3,
  LineChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Rankings", href: "/", icon: BarChart3 },
  { label: "Methodology", href: "/methodology", icon: Layers3 },
  { label: "Insights", href: "/insights", icon: LineChart },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Partnerships", href: "/partnerships", icon: Handshake },
  { label: "About", href: "/about", icon: Info },
];

function SoilIndexWordmark() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center"
      aria-label="Soil Index home"
    >
      <span className="leading-none">
        <span className="block text-[28px] font-light uppercase tracking-[0.025em] text-white sm:text-[31px]">
          <span className="font-extrabold">S</span>
          <span className="relative inline-flex w-[0.78em] translate-y-[0.045em] items-center justify-center">
            <span className="h-[0.72em] w-[0.72em] rounded-full border-[2.5px] border-white" />
            <span className="absolute left-[0.31em] top-[0.08em] h-[0.36em] w-[0.2em] rotate-45 rounded-[80%_0] bg-[#8cbf60]" />
          </span>
          <span className="font-extrabold">IL</span>{" "}
          <span className="font-light text-white/82">INDEX</span>
        </span>
        <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.22em] text-white/42 sm:text-[9px]">
          Global soil health intelligence
        </span>
      </span>
    </Link>
  );
}

function HamburgerGlyph() {
  return (
    <span className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
      <span className="h-px w-full bg-current" />
      <span className="h-px w-full bg-current" />
      <span className="h-px w-full bg-current" />
    </span>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={250}>
      <header className="sticky top-0 z-50 border-b border-white/[0.09] bg-[#0b1012]/98">
        <div className="flex h-[74px] items-center justify-between px-5 sm:h-[86px] sm:px-8 lg:h-[96px] lg:px-[34px]">
          <SoilIndexWordmark />

          <div className="flex items-center gap-2 sm:gap-4">
            <nav
              className="hidden items-center gap-4 xl:flex 2xl:gap-6"
              aria-label="Primary navigation"
            >
              {navItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-[0.05em] text-white/58 transition hover:text-white 2xl:text-[11px]",
                      active && "text-[#9ccb68]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/data-api"
                aria-current={pathname === "/data-api" ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-9 rounded-full border-[#8cbf60]/70 bg-transparent px-4 text-[10px] uppercase tracking-[0.06em] text-[#a7d87d] hover:bg-[#8cbf60]/10"
                )}
              >
                Data API
              </Link>
            </nav>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/map"
                  aria-label="Open soil health map"
                  aria-current={pathname === "/map" ? "page" : undefined}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-10 rounded-full text-white/66 hover:text-[#a7d87d]",
                    pathname === "/map" && "text-[#a7d87d]"
                  )}
                >
                  <Globe2 size={19} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Open soil health map</TooltipContent>
            </Tooltip>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full text-white/70 hover:text-white"
                  aria-label="Open navigation menu"
                >
                  <HamburgerGlyph />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate between Global Soil Index pages.
                </SheetDescription>

                <SheetClose asChild>
                  <div className="pr-12">
                    <SoilIndexWordmark />
                  </div>
                </SheetClose>

                <div className="mt-8 border-y border-white/10 py-4">
                  <div>
                    <div className="text-xl font-light tabular-nums text-white">196</div>
                    <div className="mt-1 text-[9px] font-semibold uppercase text-white/34">
                      Countries
                    </div>
                  </div>
                </div>

                <nav className="mt-6 space-y-1" aria-label="Navigation drawer">
                  {[
                    ...navItems,
                    { label: "Data API", href: "/data-api", icon: Braces },
                    { label: "Soil map", href: "/map", icon: Globe2 },
                  ].map((item) => {
                    const active = pathname === item.href;
                    const ItemIcon = item.icon;

                    return (
                      <SheetClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center gap-3 rounded-md px-3 text-sm font-semibold text-white/68 transition hover:bg-white/[0.05] hover:text-white",
                            active && "bg-[#8cbf60]/10 text-[#bce68a]"
                          )}
                        >
                          <ItemIcon
                            size={18}
                            className={active ? "text-[#9ccb68]" : "text-white/38"}
                          />
                          <span>{item.label}</span>
                          <ChevronRight size={16} className="ml-auto text-white/24" />
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                <SheetClose asChild>
                  <Link
                    href="/data-api"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "mt-auto w-full rounded-full"
                    )}
                  >
                    <Braces size={17} /> Explore Data API
                  </Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
