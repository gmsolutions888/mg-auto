"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { submitSellInquiry } from "@/lib/sellInquiries";

const schema = z.object({
  name: z.string().min(2, "Required"),
  phone: z.string().min(7, "Required"),
  email: z.string().email("Valid email required"),
  brand: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.string().min(4, "Required"),
  mileage: z.string().min(1, "Required"),
  transmission: z.string().min(1, "Required"),
  condition: z.string().min(1, "Required"),
  askingPrice: z.string().min(1, "Required"),
  notes: z.string().optional(),
});
type SellForm = z.infer<typeof schema>;

const inputClass =
  "w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#cc1111] transition-colors bg-white";

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<SellForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: SellForm) => {
    await submitSellInquiry(data);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#cc1111] mb-2">
            Consign &amp; Sell
          </p>
          <h1 className="font-display text-3xl sm:text-4xl uppercase text-gray-900 mb-2">
            Sell Your Unit to Us
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Fill out the details below and we'll reach out with an offer within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-gray-200 p-10 text-center">
            <CheckCircle size={36} className="text-emerald-500 mx-auto mb-4" />
            <h2 className="font-display text-xl uppercase text-gray-900 mb-2">Submission Received</h2>
            <p className="text-gray-500 text-sm">
              We'll review your unit and get back to you within 24 hours via Viber or the contact info you provided.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 p-8 space-y-5">

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Full Name</label>
                <input {...register("name")} placeholder="Juan dela Cruz" className={inputClass} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Phone / Viber</label>
                <input {...register("phone")} placeholder="09XX XXX XXXX" className={inputClass} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Email</label>
                <input {...register("email")} type="email" placeholder="you@email.com" className={inputClass} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Vehicle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Brand</label>
                <input {...register("brand")} placeholder="Toyota, Ford…" className={inputClass} />
                {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Model</label>
                <input {...register("model")} placeholder="Vios, Ranger…" className={inputClass} />
                {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Year</label>
                <input {...register("year")} placeholder="2019" className={inputClass} />
                {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Mileage (km)</label>
                <input {...register("mileage")} placeholder="75,000" className={inputClass} />
                {errors.mileage && <p className="text-red-500 text-xs mt-1">{errors.mileage.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Transmission</label>
                <select {...register("transmission")} className={inputClass}>
                  <option value="">Select</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                  <option>CVT</option>
                </select>
                {errors.transmission && <p className="text-red-500 text-xs mt-1">{errors.transmission.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Overall Condition</label>
                <select {...register("condition")} className={inputClass}>
                  <option value="">Select</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
                {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Asking Price (₱)</label>
                <input {...register("askingPrice")} placeholder="e.g. 650,000" className={inputClass} />
                {errors.askingPrice && <p className="text-red-500 text-xs mt-1">{errors.askingPrice.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                  Notes <span className="text-gray-400 normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Recent repairs, modifications, reason for selling…"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#cc1111] text-white text-[11px] font-bold tracking-widest uppercase hover:bg-[#aa0e0e] transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit My Unit"}
            </button>

          </form>
        )}
      </div>
    </main>
  );
}
