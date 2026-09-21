export function Hero() {
  return (
    <section className="flex flex-col gap-5 pb-7 pt-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="gsi-display text-[1.65rem] leading-tight text-white sm:text-3xl lg:text-[2.1rem]">
          Explore <span className="text-[#79bd45]">the world&apos;s soil health</span>
        </h1>
        <p className="mt-2 text-sm text-white/52 sm:text-base">
          196 countries. One transparent global index.
        </p>
      </div>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-white/42">
        <span className="size-2 rounded-full bg-[#79bd45]" />
        2026 prototype edition
      </div>
    </section>
  );
}
