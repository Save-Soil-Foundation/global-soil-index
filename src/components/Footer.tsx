import Image from "next/image";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t gsi-border bg-[#061f3a]/70 px-5 py-4 xl:py-3">
      <div className="grid gap-5 lg:grid-cols-[300px_1fr_520px_260px] lg:items-center xl:gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase text-white/70">
            Powered by
          </span>

          <Image
            src="/assets/save-soil-logo.png"
            alt="Save Soil Movement"
            width={52}
            height={52}
            className="h-auto shrink-0"
          />

          <span className="text-sm font-bold uppercase text-white">
            Movement
          </span>
        </div>

        <div className="border-l gsi-border pl-6 text-sm leading-relaxed text-white/75 xl:text-xs">
          A volunteer-driven initiative for transparent and accountable soil
          action.
        </div>

        <div className="border-l gsi-border pl-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-xs font-bold uppercase text-white/70">
              Data Partners
            </span>

            <span className="text-2xl font-bold text-white xl:text-xl">
              pixxel
            </span>
            <span className="text-xl font-bold text-white/80 xl:text-lg">
              NASA
            </span>
            <span className="text-xl font-bold text-white/80 xl:text-lg">
              ISRO
            </span>
            <span className="text-xl font-bold text-white/80 xl:text-lg">
              BHU
            </span>
            <span className="text-sm text-white/60 xl:text-xs">and more</span>
          </div>
        </div>

        <div className="border-l gsi-border pl-6">
          <div className="flex items-center gap-3">
            <span className="mr-1 text-xs font-bold uppercase leading-tight text-white/70">
              Follow
              <br />
              Us
            </span>

            <button className="rounded-full border gsi-border p-2 text-white/70 transition hover:border-[#1DA1F2] hover:text-[#1DA1F2]">
              <FaXTwitter size={14} />
            </button>

            <button className="rounded-full border gsi-border p-2 text-white/70 transition hover:border-[#E1306C] hover:text-[#E1306C]">
              <FaInstagram size={14} />
            </button>

            <button className="rounded-full border gsi-border p-2 text-white/70 transition hover:border-[#FF0000] hover:text-[#FF0000]">
              <FaYoutube size={14} />
            </button>

            <button className="rounded-full border gsi-border p-2 text-white/70 transition hover:border-[#0A66C2] hover:text-[#0A66C2]">
              <FaLinkedin size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}