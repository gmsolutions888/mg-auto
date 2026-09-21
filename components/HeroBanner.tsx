"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CAR_TYPE_PILLS = ["SUV", "Sedan", "Pickup", "Van", "Hatchback"];

export default function HeroBanner() {
  const router = useRouter();

  function browseByType(type: string) {
    router.push(`/cars?carType=${encodeURIComponent(type)}`);
  }

  return (
    <section className="relative h-screen min-h-[680px] flex items-center overflow-hidden bg-white">
      {/* Subtle light grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Full-bleed centered car image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/hero.png"
          alt="Ford Mustang and Toyota GR86 — featured cars"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Left scrim so headline stays legible over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-lg relative z-10">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#cc1111] mb-5"
          >
            More Than Just a Car
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[80px] sm:text-[100px] lg:text-[110px] text-gray-900 leading-none mb-6 uppercase"
          >
            Buy With
            <br />
            <span className="text-[#cc1111]">Confidence.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-500 text-base max-w-sm mb-8 leading-relaxed"
          >
            Every unit inspected, roadworthy certified, and backed by full service history.
            No surprises — just a car you can trust.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link
              href="/cars"
              className="px-8 py-3.5 bg-[#cc1111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#aa0e0e] transition-colors"
            >
              Browse Cars →
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-gray-300 text-gray-600 text-xs font-bold tracking-widest uppercase hover:border-gray-800 hover:text-gray-900 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Quick browse by type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
              Browse by type
            </p>
            <div className="flex flex-wrap gap-2">
              {CAR_TYPE_PILLS.map((type) => (
                <button
                  key={type}
                  onClick={() => browseByType(type)}
                  className="px-4 py-2 border border-gray-200 bg-white text-[11px] font-bold tracking-widest uppercase text-gray-600 hover:border-[#cc1111] hover:text-[#cc1111] transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>


      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
      </motion.div>
    </section>
  );
}
