"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBasket } from "@/context/BasketContext";
import { Heart, Trash2, CheckCircle, ArrowLeft } from "lucide-react";
import { submitInquiry } from "@/lib/inquiries";

function formatPrice(p: number) {
  return "₱ " + p.toLocaleString("en-PH");
}

export default function MyInterestPage() {
  const { item, removeFromBasket, updateCustomization } = useBasket();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill in all contact fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const parts = ["I'm interested in this car."];
      if (item.customization.financingInterest) parts.push("I'm interested in financing.");
      else parts.push("Cash purchase.");
      if (item.customization.notes) parts.push(item.customization.notes);

      await submitInquiry({
        carId: item.car.id,
        carTitle: `${item.car.year} ${item.car.brand} ${item.car.model}`,
        carSlug: item.car.slug,
        name,
        phone,
        email,
        message: parts.join(" "),
      });
      setSubmitted(true);
      removeFromBasket();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 pb-20 flex items-center justify-center">
        <div className="bg-white border border-gray-200 p-12 text-center max-w-md w-full mx-4">
          <CheckCircle size={40} className="text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Interest Submitted!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            We've received your interest. Our team will reach out to you within 24 hours.
          </p>
          <Link href="/cars" className="inline-block px-8 py-3 bg-[#cc1111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#aa0e0e] transition-colors">
            Browse More Cars
          </Link>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <Heart size={40} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No car selected yet</h2>
          <p className="text-gray-400 text-sm mb-6">Browse our listings and click "I'm Interested" on any car.</p>
          <Link href="/cars" className="inline-block px-8 py-3 bg-[#cc1111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#aa0e0e] transition-colors">
            Browse Cars
          </Link>
        </div>
      </main>
    );
  }

  const { car, customization } = item;

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <Link href="/cars" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#cc1111] transition-colors mb-4">
            <ArrowLeft size={13} /> Back to listings
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">I'm Interested in This Car</h1>
          <p className="text-gray-400 text-sm mt-1">Tell us your preferences and we'll get in touch within 24 hours.</p>
        </div>

        {/* Car card */}
        <div className="bg-white border border-gray-200 p-5 mb-5 flex gap-5 items-start">
          {car.photoUrl && (
            <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden bg-gray-100">
              <Image src={car.photoUrl} alt={`${car.brand} ${car.model}`} fill className="object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#cc1111]">{car.brand}</p>
            <p className="text-lg font-semibold text-gray-900">{car.model}</p>
            <p className="text-gray-400 text-sm">{car.year}</p>
            <p className="text-[#cc1111] font-bold mt-1">{formatPrice(car.sellingPrice)}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link href={`/cars/${car.slug}`} className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#cc1111] transition-colors">
              View →
            </Link>
            <button onClick={removeFromBasket} className="text-gray-300 hover:text-red-500 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white border border-gray-200 p-6 mb-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">Your Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Financing Interest</label>
              <div className="flex gap-3">
                {[{ label: "Yes, I'm interested", value: true }, { label: "No, cash purchase", value: false }].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => updateCustomization({ financingInterest: opt.value })}
                    className={`flex-1 py-2.5 text-xs font-bold tracking-widest uppercase border transition-colors ${
                      customization.financingInterest === opt.value
                        ? "border-[#cc1111] text-[#cc1111] bg-red-50"
                        : "border-gray-200 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Notes <span className="text-gray-300 normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <textarea
                value={customization.notes}
                onChange={(e) => updateCustomization({ notes: e.target.value })}
                rows={3}
                placeholder="Special requests, questions, preferred viewing schedule…"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc1111] transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact + Submit */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">Your Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan dela Cruz"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc1111] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone / Viber</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09XX XXX XXXX"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc1111] transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc1111] transition-colors" />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button type="submit" disabled={submitting}
            className="w-full py-3.5 bg-[#cc1111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#aa0e0e] transition-colors disabled:opacity-60">
            {submitting ? "Sending…" : "Submit My Interest"}
          </button>
          <p className="text-center text-gray-400 text-xs mt-3">We'll reach out within 24 hours via Viber or email.</p>
        </form>

      </div>
    </main>
  );
}
