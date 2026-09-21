"use client";

import {
  BarChart3,
  Braces,
  ChevronRight,
  Globe2,
  Info,
  Layers3,
  Leaf,
  LineChart,
  Menu,
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
  { label: "About", href: "/about", icon: Info },
];

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Soil Index home">
      <div className="relative flex size-9 items-center justify-center rounded-full border border-[#79bd45]/55 bg-[#79bd45]/5 text-[#79bd45] shadow-[inset_0_0_18px_rgba(121,189,69,0.08)]">
        <Leaf size={19} />
      </div>
      <div>
        <div className="text-[19px] font-light uppercase leading-none tracking-[0.12em] text-white sm:text-[22px]">
          <span className="font-extrabold">Soil</span> Index
        </div>
        <div className="mt-1 hidden text-[8px] font-medium uppercase tracking-[0.18em] text-white/48 sm:block">
          Global soil health intelligence
        </div>
      </div>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={250}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060c0f]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Brand />

          <nav className="hidden h-full items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex h-full items-center px-0.5 text-xs font-semibold uppercase text-white/62 transition hover:text-white",
                    active && "text-[#a8df72]"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-center bg-[#79bd45] transition-transform",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}

            <Link
              href="/data-api"
              aria-current={pathname === "/data-api" ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: pathname === "/data-api" ? "secondary" : "outline", size: "sm" }),
                "ml-1 uppercase"
              )}
            >
              <Braces size={15} /> Data API
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/map"
                  aria-label="Open soil health map"
                  aria-current={pathname === "/map" ? "page" : undefined}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    pathname === "/map" && "bg-[#79bd45]/10 text-[#a8df72]"
                  )}
                >
                  <Globe2 size={19} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Open soil health map</TooltipContent>
            </Tooltip>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate between Soil Index data views.
              </SheetDescription>

              <SheetClose asChild>
                <div className="pr-12">
                  <Brand />
                </div>
              </SheetClose>

              <div className="mt-8 grid grid-cols-2 border-y border-white/10 py-4">
                <div>
                  <div className="text-xl font-light tabular-nums text-white">196</div>
                  <div className="mt-1 text-[9px] font-semibold uppercase text-white/34">Countries</div>
                </div>
                <div className="border-l border-white/10 pl-5">
                  <div className="flex items-center gap-2 text-xl font-light text-[#98d75d]">
                    <span className="size-2 rounded-full bg-[#79bd45]" /> Live
                  </div>
                  <div className="mt-1 text-[9px] font-semibold uppercase text-white/34">Market model</div>
                </div>
              </div>

              <nav className="mt-6 space-y-1" aria-label="Mobile navigation">
                {[...navItems, { label: "Soil map", href: "/map", icon: Globe2 }].map((item) => {
                  const active = pathname === item.href;
                  const ItemIcon = item.icon;

                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center gap-3 rounded-md px-3 text-sm font-semibold text-white/68 transition hover:bg-white/[0.05] hover:text-white",
                          active && "bg-[#79bd45]/10 text-[#b5e77f]"
                        )}
                      >
                        <ItemIcon size={18} className={active ? "text-[#8fd157]" : "text-white/38"} />
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
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-auto w-full")}
                >
                  <Braces size={17} /> Explore Data API
                </Link>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </TooltipProvider>
  );
}
