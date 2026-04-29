import Image from "next/image";

export function RightPanel() {
  return (
    <aside className="space-y-4">
      <section className="gsi-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="gsi-heading text-lg">Global Snapshot</h3>
          <span className="text-xs font-semibold text-lime-300">View More →</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] uppercase text-white/55">
              Global Average Score
            </p>
            <p className="mt-1 text-4xl font-black text-lime-400">52.1</p>
            <p className="text-xs text-white/60">out of 100</p>
          </div>

          <div>
            <p className="text-[11px] uppercase text-white/55">
              Average Change (1Y)
            </p>
            <p className="mt-1 text-4xl font-black text-lime-400">+0.7 ↑</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 xl:grid-cols-4">
          {["Top 5 Countries", "Bottom 5 Countries", "Most Improved", "Most Declined"].map(
            (item) => (
              <button
                key={item}
                className="rounded-lg border gsi-border p-3 text-left text-[11px] font-semibold uppercase"
              >
                {item}
                <div className="mt-3 text-xs normal-case text-lime-300">View →</div>
              </button>
            )
          )}
        </div>
      </section>

      <section className="gsi-card p-4">
        <h3 className="gsi-heading text-lg">Soil Health Map</h3>
        <p className="mt-1 text-sm text-white/65">
          Explore global soil health conditions.
        </p>

        <div className="relative mt-4 overflow-hidden rounded-lg">
          <Image
            src="/assets/soil-map.jpg"
            alt="Global soil health map"
            width={420}
            height={250}
            className="w-full object-cover"
          />
        </div>

        <button className="mt-4 w-full rounded-md border gsi-border py-2 text-sm font-semibold text-lime-300">
          Explore Interactive Map →
        </button>
      </section>

      <section className="gsi-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="gsi-heading text-lg">Latest Updates</h3>
          <span className="text-xs font-semibold text-lime-300">View All →</span>
        </div>

        <div className="mt-4 space-y-5">
          <article className="flex gap-3">
            <Image
              src="/assets/update-1.jpg"
              alt="Global Soil Index report"
              width={92}
              height={76}
              className="h-[76px] w-[92px] rounded-lg object-cover"
            />

            <div>
              <h4 className="text-sm font-bold leading-snug">
                Global Soil Index 2024 Report Released
              </h4>
              <p className="mt-1 text-xs text-white/65">
                Key insights on soil health trends and policy progress.
              </p>
              <p className="mt-1 text-xs text-lime-300">May 20, 2024</p>
            </div>
          </article>

          <article className="flex gap-3">
            <Image
              src="/assets/update-2.jpg"
              alt="New data partnership"
              width={92}
              height={76}
              className="h-[76px] w-[92px] rounded-lg object-cover"
            />

            <div>
              <h4 className="text-sm font-bold leading-snug">
                New Data Partnership
              </h4>
              <p className="mt-1 text-xs text-white/65">
                Collaboration with institutions to strengthen data collection.
              </p>
              <p className="mt-1 text-xs text-lime-300">May 15, 2024</p>
            </div>
          </article>
        </div>
      </section>
    </aside>
  );
}