export default function PartnersPage() {
  const categories = [
    {
      name: "Accessories",
      description: "Trusted brands for car accessories, styling, and upgrades.",
      partners: [
        { name: "3M", description: "Paint protection film, window tint, and car care products." },
        { name: "Meguiar's", description: "Premium car care and detailing products." },
        { name: "Thule", description: "Roof racks, cargo carriers, and bike mounts." },
        { name: "AutoGlym", description: "Professional-grade car cleaning and polishing." },
      ],
    },
    {
      name: "Parts & Service",
      description: "Reliable suppliers for genuine and aftermarket parts.",
      partners: [
        { name: "Bosch", description: "Automotive parts, tools, and diagnostics." },
        { name: "NGK", description: "Spark plugs, sensors, and ignition components." },
        { name: "Monroe", description: "Shock absorbers and suspension components." },
        { name: "Gates", description: "Belts, hoses, and fluid power products." },
      ],
    },
    {
      name: "Tires",
      description: "Performance and all-weather tire brands we trust.",
      partners: [
        { name: "Bridgestone", description: "High-performance and all-season tires." },
        { name: "Michelin", description: "Premium tires for all vehicle types." },
        { name: "Yokohama", description: "Sport and touring tire solutions." },
        { name: "Goodyear", description: "Durable, reliable tires for every road." },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#cc1111] mb-2">
            Trusted Partners
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Partners</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            We work with trusted brands in accessories, parts, and tires to keep your vehicle
            in top condition long after purchase.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">{cat.name}</h2>
                <p className="text-gray-400 text-sm mt-0.5">{cat.description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cat.partners.map((p) => (
                  <div
                    key={p.name}
                    className="bg-white border border-gray-200 p-6 flex flex-col items-center text-center gap-3 hover:border-[#cc1111]/40 hover:shadow-sm transition-all"
                  >
                    {/* Logo placeholder */}
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-400 tracking-wide">{p.name}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to Partner With Us?</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed max-w-md mx-auto">
            If you represent a brand in automotive accessories, parts, or services and want to be featured, get in touch with us.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#cc1111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#aa0e0e] transition-colors"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </main>
  );
}
