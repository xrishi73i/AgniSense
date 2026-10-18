"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Droplets,
  Sprout,
  Layers,
  Info,
  ArrowRight,
  X,
  Compass,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface CropData {
  id: string;
  name: string;
  category: "Vegetables" | "Grains" | "Cash Crops";
  moistureRange: string;
  image: string;
  waterNeed: "High" | "Moderate" | "Low to Moderate";
  criticalStages: string;
  soilType: string;
  irrigationFrequency: string;
  sensorBenefit: string;
  overview: string;
}

export default function CropGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCrop) {
        setSelectedCrop(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCrop]);

  const cropDatabase: CropData[] = [
    {
      id: "tomato",
      name: "Tomato",
      category: "Vegetables",
      moistureRange: "50% - 70%",
      image: "/images/crop-tomato.jpg",
      waterNeed: "Moderate",
      criticalStages: "Flowering, fruit set, and early fruit enlargement.",
      soilType: "Deep, well-drained sandy loam or clay loam with high organic matter (pH 6.0–6.8).",
      irrigationFrequency: "Every 2–3 days during peak fruiting; avoid overhead wetting.",
      sensorBenefit:
        "Prevents blossom-end rot by maintaining steady calcium uptake via uniform root zone moisture without waterlogging.",
      overview:
        "Tomatoes have deep taproots but draw majority moisture from the top 30cm of soil. Irregular irrigation cycles cause fruit splitting and blossom drop.",
    },
    {
      id: "lettuce",
      name: "Lettuce",
      category: "Vegetables",
      moistureRange: "60% - 80%",
      image: "/images/crop-lettuce.jpg",
      waterNeed: "High",
      criticalStages: "Rapid vegetative heading phase; sensitive to drought stress throughout.",
      soilType: "Loose, humus-rich loamy soil with excellent water retention and aeration.",
      irrigationFrequency: "Daily light micro-drips during warm sunshine.",
      sensorBenefit:
        "Shallow rooting (top 15cm) means topsoil desiccates quickly; capacitive probe alerts before leaf tips scorch and turn bitter.",
      overview:
        "Crisp leafy greens require sustained high moisture. Even brief dry spells trigger premature bolting (flowering) which spoils crop marketability.",
    },
    {
      id: "chili",
      name: "Chili Pepper",
      category: "Vegetables",
      moistureRange: "60% - 70%",
      image: "/images/crop-chili.jpg",
      waterNeed: "Moderate",
      criticalStages: "Flower bud initiation, anthesis, and pod elongation.",
      soilType: "Well-drained light loam or sandy loam soil (pH 6.5–7.5). Susceptible to root asphyxiation.",
      irrigationFrequency: "Every 4–5 days; reduce slightly prior to harvest to increase capsaicin pungency.",
      sensorBenefit:
        "Prevents damping-off and Phytophthora root rot caused by saturated, unoxygenated soil beds.",
      overview:
        "Chili crops demand moist soil without ponding. Moisture stress during flowering induces premature flower abortion and stunting.",
    },
    {
      id: "cucumber",
      name: "Cucumber",
      category: "Vegetables",
      moistureRange: "60% - 75%",
      image: "/images/crop-cucumber.jpg",
      waterNeed: "High",
      criticalStages: "Flowering and rapid fruit development.",
      soilType: "Warm, fertile sandy to silty loam rich in compost with pH 6.0–7.0.",
      irrigationFrequency: "Regular drip application; moisture swings create hollow or bitter fruit.",
      sensorBenefit:
        "Continuous automated telemetry maintains even hydration, ensuring crisp cylindrical fruit development.",
      overview:
        "Cucumbers are over 95% water by weight. Moisture deficits during fruiting immediately generate deformed, bitter, or hollow cucumbers.",
    },
    {
      id: "spinach",
      name: "Spinach",
      category: "Vegetables",
      moistureRange: "60% - 80%",
      image: "/images/crop-spinach.jpg",
      waterNeed: "High",
      criticalStages: "Seed germination and juvenile rosette foliage expansion.",
      soilType: "Cool, moist sandy loam or silt loam with high nitrogen content.",
      irrigationFrequency: "Frequent short drip pulses to prevent topsoil crusted dryness.",
      sensorBenefit:
        "Eliminates water stress that accelerates bolting in hot weather while preventing mildew from waterlogged mulch.",
      overview:
        "Spinach thrives in moist, cool root temperatures. Automated drip ensures uniform foliage growth with minimal foliage splashing.",
    },
    {
      id: "rice",
      name: "Paddy Rice",
      category: "Grains",
      moistureRange: "70% - 90%",
      image: "/images/crop-rice.jpg",
      waterNeed: "High",
      criticalStages: "Tillering, panicle initiation, and flowering heading.",
      soilType: "Heavy clay or clay-loam soils with low percolation rate (hardpan layer).",
      irrigationFrequency: "Alternate Wetting and Drying (AWD) cycles to save up to 30% water vs flood irrigation.",
      sensorBenefit:
        "Allows smart AWD scheduling by detecting exact threshold when water table drops 15cm below soil surface before re-flooding.",
      overview:
        "Traditional rice involves continuous ponding. AgriSense enables precision Alternate Wetting and Drying to conserve precious aquifer water without reducing grain yield.",
    },
    {
      id: "wheat",
      name: "Wheat",
      category: "Grains",
      moistureRange: "45% - 65%",
      image: "/images/crop-wheat.jpg",
      waterNeed: "Moderate",
      criticalStages: "Crown root initiation (CRI), tillering, jointing, flowering, and milk stage.",
      soilType: "Well-aerated fertile loam to clay loam soils with neutral pH.",
      irrigationFrequency: "Typically 4–6 timed deep irrigations corresponding to phenological growth milestones.",
      sensorBenefit:
        "Tracks subsoil moisture reserves and avoids over-irrigating late in the season which causes crop lodging (falling over).",
      overview:
        "Wheat root systems reach 1 meter in depth. Crown Root Initiation (21 days post-sowing) is the single most critical moisture window.",
    },
    {
      id: "potato",
      name: "Potato",
      category: "Vegetables",
      moistureRange: "65% - 75%",
      image: "/images/crop-potato.jpg",
      waterNeed: "Moderate",
      criticalStages: "Stolon emergence, tuber initiation, and tuber bulking.",
      soilType: "Friable, stone-free loose sandy loam preventing misshapen tubers.",
      irrigationFrequency: "Consistent, moderate irrigation; dry periods followed by heavy water cause tuber knobbiness and hollow heart.",
      sensorBenefit:
        "Maintains uniform moisture through the tuber bulking phase to prevent growth cracks and late blight spread.",
      overview:
        "Potato tubers require steady soil hydration without saturation. Water stress during bulking severely impairs yield and grade size.",
    },
    {
      id: "maize",
      name: "Maize (Corn)",
      category: "Grains",
      moistureRange: "50% - 70%",
      image: "/images/crop-maize.jpg",
      waterNeed: "Moderate",
      criticalStages: "Tasseling, silking, and kernel blister to dough stage.",
      soilType: "Deep, fertile loam or silt loam with good drainage and high water-holding capacity.",
      irrigationFrequency: "Deep watering every 5–7 days during vegetative; intensive during silking.",
      sensorBenefit:
        "Moisture stress during 2 weeks before and after silking causes up to 50% kernel yield loss; sensors prevent missed irrigation cycles.",
      overview:
        "Corn consumes significant water during tassel emergence. AgriSense ensures continuous hydration during critical pollination windows.",
    },
  ];

  const categories = ["All", "Vegetables", "Grains", "Cash Crops"];

  const filteredCrops = cropDatabase.filter((crop) => {
    const matchesCategory =
      selectedCategory === "All" || crop.category === selectedCategory;
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.soilType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0b1a13] text-white pt-24 pb-20">
      {/* Wayfinding Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-[#39D98A] transition-colors focus-ring rounded">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
          <span className="text-emerald-300 font-medium" aria-current="page">
            Crop Moisture Guide
          </span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-[#39D98A]">
          <Sprout className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Agricultural Moisture Telemetry & Agronomy</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Crop Moisture <span className="text-[#39D98A]">Guide & Intelligence</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Optimal soil moisture thresholds vary drastically across crop types, growth stages, and soil textures. Explore precision irrigation metrics below.
        </p>

        {/* Agricultural Disclaimer */}
        <div className="max-w-xl mx-auto p-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-400 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-[#39D98A] shrink-0" aria-hidden="true" />
          <span>
            Ranges represent general agricultural benchmarks; actual field requirements depend on microclimate, canopy cover, and soil type.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search and Filters Bar */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/15">
          {/* Accessible Search Field */}
          <div className="relative w-full md:w-96">
            <label htmlFor="crop-search-input" className="sr-only">
              Search crops by name, soil type, or growth stage
            </label>
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="crop-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crop, soil type, or stages..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-400 text-sm focus-ring"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear crop search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-full focus-ring cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto" role="tablist" aria-label="Crop Categories">
            <span className="text-xs text-slate-400 hidden sm:inline mr-1">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all focus-ring cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#39D98A] text-[#0b1a13] font-semibold shadow-md"
                    : "glass-pill text-slate-300 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredCrops.length}</strong> of{" "}
            <strong>{cropDatabase.length}</strong> agricultural crops
          </span>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-[#39D98A] hover:underline flex items-center gap-1 focus-ring rounded"
            >
              <RefreshCw className="w-3 h-3" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Crops Grid or Empty State */}
        {filteredCrops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                role="button"
                tabIndex={0}
                aria-label={`View full agricultural details for ${crop.name}`}
                onClick={() => setSelectedCrop(crop)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCrop(crop);
                  }
                }}
                className="glass-card rounded-3xl overflow-hidden p-5 space-y-4 cursor-pointer group flex flex-col justify-between focus-ring"
              >
                <div className="space-y-4">
                  {/* Image and Moisture Badge */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/40">
                    <Image
                      src={crop.image}
                      alt={`Photograph of fresh agricultural ${crop.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 glass-pill px-3 py-1 rounded-full text-xs font-semibold text-[#39D98A] shadow-md">
                      {crop.moistureRange}
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-black/60 text-[11px] font-medium text-slate-200 border border-white/10">
                      {crop.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#39D98A] transition-colors">
                        {crop.name}
                      </h3>
                      <span className="text-xs text-slate-300">
                        Water Need:{" "}
                        <span className="text-emerald-300 font-semibold">{crop.waterNeed}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {crop.overview}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span>View Moisture & Soil Specs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-white/10 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-[#39D98A] mx-auto">
              <Sprout className="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-white">No Matching Crops Found</h3>
            <p className="text-sm text-slate-300">
              No crops matched your query &ldquo;{searchQuery}&rdquo;. Try searching for general terms like &ldquo;loam&rdquo;, &ldquo;vegetable&rdquo;, or reset the active filters.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn-primary-mint px-6 py-2.5 rounded-full text-xs font-semibold focus-ring cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Accessible Modal for Detailed Crop Info */}
        {selectedCrop && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="crop-modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedCrop(null);
            }}
          >
            <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 relative border border-white/20 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedCrop(null)}
                aria-label="Close crop details dialog"
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 focus-ring cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/15">
                  <Image
                    src={selectedCrop.image}
                    alt={`Crop ${selectedCrop.name}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="crop-modal-title" className="text-2xl font-bold text-white">
                      {selectedCrop.name}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#39D98A]/20 text-[#39D98A] border border-[#39D98A]/30 font-semibold">
                      {selectedCrop.moistureRange} Target
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">Category: {selectedCrop.category}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-200">
                <p className="leading-relaxed text-slate-300">{selectedCrop.overview}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Critical Phenological Stages</span>
                    </div>
                    <p className="text-xs text-slate-300">{selectedCrop.criticalStages}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <div className="text-xs text-sky-400 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Ideal Soil & Drainage</span>
                    </div>
                    <p className="text-xs text-slate-300">{selectedCrop.soilType}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <div className="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Irrigation Frequency Factors</span>
                    </div>
                    <p className="text-xs text-slate-300">{selectedCrop.irrigationFrequency}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <div className="text-xs text-[#39D98A] font-semibold flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>AgriSense Sensor Role</span>
                    </div>
                    <p className="text-xs text-slate-300">{selectedCrop.sensorBenefit}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCrop(null)}
                  className="px-6 py-2.5 rounded-xl btn-primary-mint text-sm font-semibold focus-ring cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
