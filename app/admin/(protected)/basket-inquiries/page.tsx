"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, X, Heart } from "lucide-react";

interface BasketInquiry {
  id: string;
  car: { brand: string; model: string; year: number; sellingPrice: number; slug: string };
  customization: { colorPreference: string; financingInterest: boolean; notes: string };
  contact: { name: string; phone: string; email: string };
  status: "new" | "read" | "responded";
  createdAt: string;
}

const STATUS_STYLE: Record<string, string> = {
  new: "border-[#cc1111] text-[#cc1111]",
  read: "border-gray-300 text-gray-400",
  responded: "border-[#2a7a2a] text-[#4caf50]",
};

function fmt(iso: string) {
  const d = new Date(iso);
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
}

type Filter = "all" | "new" | "read" | "responded";

export default function BasketInquiriesPage() {
  const [items, setItems] = useState<BasketInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "basketInquiries"), orderBy("createdAt", "desc"));
    getDocs(q)
      .then((snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as BasketInquiry))))
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id: string, status: BasketInquiry["status"]) => {
    setUpdating(id);
    try {
      await updateDoc(doc(db, "basketInquiries", id), { status });
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } finally {
      setUpdating(null);
    }
  };

  const byStatus = filter === "all" ? items : items.filter((i) => i.status === filter);
  const filtered = search
    ? byStatus.filter((i) => {
        const q = search.toLowerCase();
        return (
          i.contact.name.toLowerCase().includes(q) ||
          i.contact.email.toLowerCase().includes(q) ||
          i.contact.phone.includes(q) ||
          `${i.car.brand} ${i.car.model}`.toLowerCase().includes(q)
        );
      })
    : byStatus;

  const tabCount = (t: Filter) => (t === "all" ? items : items.filter((i) => i.status === t)).length;
  const tabs: Filter[] = ["all", "new", "read", "responded"];

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#cc1111] mb-1">I Want This Car</p>
        <h1 className="font-display text-4xl text-gray-900 tracking-wide">Basket Inquiries</h1>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 p-4 mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone, car…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 focus:border-[#cc1111] outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
        {search && (
          <button onClick={() => setSearch("")} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-[#cc1111]">
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-3 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors border-b-2 -mb-px ${
              filter === tab ? "border-[#cc1111] text-[#cc1111]" : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab} ({tabCount(tab)})
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#cc1111] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No basket inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {["Name", "Contact", "Vehicle", "Price", "Financing", "Date", "Status", "Action"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <>
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{item.contact.name}</td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">{item.contact.phone}</p>
                        <p className="text-xs text-gray-400">{item.contact.email}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {item.car.year} {item.car.brand} {item.car.model}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                        ₱ {item.car.sellingPrice.toLocaleString("en-PH")}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[9px] font-bold tracking-wider uppercase ${item.customization.financingInterest ? "text-blue-500" : "text-gray-300"}`}>
                          {item.customization.financingInterest ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400 whitespace-nowrap">{fmt(item.createdAt)}</td>
                      <td className="px-4 py-4">
                        <span className={`border text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 ${STATUS_STYLE[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          {item.status === "new" && (
                            <button
                              disabled={updating === item.id}
                              onClick={() => handleStatus(item.id, "read")}
                              className="border border-gray-300 text-gray-500 px-2 py-1 text-[9px] font-bold tracking-widest uppercase hover:border-gray-800 hover:text-gray-900 transition-colors disabled:opacity-40"
                            >
                              Mark Read
                            </button>
                          )}
                          {item.status !== "responded" && (
                            <button
                              disabled={updating === item.id}
                              onClick={() => handleStatus(item.id, "responded")}
                              className="border border-[#2a7a2a] text-[#4caf50] px-2 py-1 text-[9px] font-bold tracking-widest uppercase hover:bg-[#2a7a2a] hover:text-white transition-colors disabled:opacity-40"
                            >
                              Responded
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expanded === item.id && (
                      <tr key={`${item.id}-exp`} className="bg-gray-50 border-b border-gray-100">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-600">
                            <div>
                              <span className="font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Color Preference</span>
                              {item.customization.colorPreference || <span className="text-gray-300">Not specified</span>}
                            </div>
                            <div>
                              <span className="font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Financing</span>
                              {item.customization.financingInterest ? "Interested" : "Cash purchase"}
                            </div>
                            {item.customization.notes && (
                              <div className="sm:col-span-1">
                                <span className="font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Notes</span>
                                {item.customization.notes}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
