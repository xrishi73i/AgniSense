import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Droplets,
  Sun,
  AlertTriangle,
  ArrowRight,
  Sprout,
  BatteryCharging,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Benefits & Future Scope | AgriSense Smart Irrigation",
  description:
    "Explore agricultural water conservation benefits, scalable edge deployment models, current prototype technical limitations, and the solar-powered future roadmap for AgriSense.",
};

export default function FutureScope() {
  const applications = [
    {
      title: "Greenhouses & Polyhouses",
      desc: "Microclimate optimization with precision drip watering, ensuring delicate seedlings never experience root dry-out or fungal mildew.",
      icon: Layers,
    },
    {
      title: "Commercial Orchards & Vineyards",
      desc: "Targeted root-zone deficit irrigation during key grape ripening periods to maximize sugar concentration and yield grade.",
      icon: Sprout,
    },
    {
      title: "Urban Rooftop Gardens & Nurseries",
      desc: "Compact automated watering where manual hose management is impractical and shallow container soil dries out rapidly.",
      icon: Droplets,
    },
    {
      title: "Semi-Arid Farmland Irrigation",
      desc: "Substantial groundwater and aquifer conservation by replacing wasteful flood irrigation with sensor-driven pulses.",
      icon: Sun,
    },
  ];

  const technicalLimitations = [
    {
      title: "Single-Point Sensor Representation",
      current: "One probe reads an immediate 10cm radius.",
      solution: "Multiplexing an array of 8–16 capacitive sensors across multi-depth soil strata using I2C multiplexers (TCA9548A).",
    },
    {
      title: "Soil Composition Calibration Dependency",
      current: "ADC voltage differs between sandy vs clay soils.",
      solution: "Adding an automated calibration wizard in the web app where farmers select their local soil texture profile.",
    },
    {
      title: "AC Grid Power Dependence",
      current: "Raspberry Pi requires a continuous 5V USB wall adapter.",
      solution: "Migrating to a low-power ESP32 micro-controller edge node with deep sleep and 20W solar panel battery backup.",
    },
    {
      title: "Weather Unawareness",
      current: "Irrigates purely based on real-time soil moisture.",
      solution: "Integrating OpenWeatherMap API to withhold pumping if heavy precipitation is forecast within the next 4 hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1a13] text-white pt-28 pb-20">
      {/* Wayfinding Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-[#39D98A] transition-colors focus-ring rounded">
                Home
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span className="text-emerald-400 font-medium" aria-current="page">
                Benefits & Future Scope
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-[#39D98A]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Agricultural Impact & Technology Roadmap</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Benefits & <span className="text-[#39D98A]">Future Scope</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Discover how sensor-based precision irrigation conserves vital freshwater resources, optimizes farmer labor, and maps into scalable commercial smart agriculture.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =========================================================================
            SECTION 1: CORE IMPACT METRICS
        ========================================================================= */}
        <section aria-labelledby="metrics-heading" className="space-y-4">
          <h2 id="metrics-heading" className="sr-only">Core Impact Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-7 space-y-3 border-emerald-500/20">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-[#39D98A] flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-white">30%–45%</p>
              <h3 className="text-base font-semibold text-white">Water Resource Conservation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminates surface runoff and evaporation losses caused by traditional manual hose watering and fixed timer routines.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-7 space-y-3 border-emerald-500/20">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-white">15%–25%</p>
              <h3 className="text-base font-semibold text-white">Enhanced Crop Yield</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uniform root moisture levels prevent stress-induced blossom drop, fruit splitting, and root asphyxiation.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-7 space-y-3 border-emerald-500/20">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-white">70% Less</p>
              <h3 className="text-base font-semibold text-white">Manual Field Monitoring</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated closed-loop logic frees agriculturalists from physical soil probes and manual valve adjustments.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: REAL-WORLD APPLICATIONS
        ========================================================================= */}
        <section aria-labelledby="applications-heading" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 id="applications-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Potential Real-World Applications
            </h2>
            <p className="text-sm text-slate-300">
              Adapting the AgriSense IoT architecture across diverse agricultural domains
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
            {applications.map((app) => {
              const Icon = app.icon;
              return (
                <li key={app.title} className="glass-card rounded-3xl p-6 space-y-3 flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-[#39D98A] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{app.title}</h3>
                  <p className="text-xs text-slate-300/80 leading-relaxed mt-auto">{app.desc}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* =========================================================================
            SECTION 3: CURRENT TECHNICAL LIMITATIONS & RESOLUTIONS
        ========================================================================= */}
        <section aria-labelledby="limitations-heading" className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Transparent Capstone Engineering Review</span>
            </div>
            <h2 id="limitations-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Current Prototype Limitations & Engineering Resolutions
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              As part of our academic engineering presentation, we identify technical constraints in our physical testbench and plan iterative commercial improvements.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
            {technicalLimitations.map((item) => (
              <li key={item.title} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200">
                    <span className="font-semibold block text-amber-300 mb-0.5">Current Constraint:</span>
                    <span className="text-slate-300 font-normal">{item.current}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                    <span className="font-semibold block text-emerald-300 mb-0.5">Engineering Solution:</span>
                    <span className="text-slate-300 font-normal">{item.solution}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* =========================================================================
            SECTION 4: FUTURE ROADMAP HORIZONS
        ========================================================================= */}
        <section aria-labelledby="roadmap-heading" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 id="roadmap-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Future Development Phases
            </h2>
            <p className="text-sm text-slate-300">
              Scaling AgriSense from a benchtop prototype into a field-ready agricultural product
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
            <li className="glass-card rounded-3xl p-6 space-y-4 flex flex-col">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 w-fit">
                PHASE 1 • Q3
              </span>
              <h3 className="text-lg font-bold text-white">Cloud Telemetry & Web Dashboard</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-auto">
                Connect the Raspberry Pi to an MQTT broker and cloud time-series database (InfluxDB) for 24/7 web-based telemetry graphs and historical moisture trends.
              </p>
            </li>

            <li className="glass-card rounded-3xl p-6 space-y-4 flex flex-col">
              <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20 w-fit">
                PHASE 2 • Q4
              </span>
              <h3 className="text-lg font-bold text-white">Weather Forecast Integration</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-auto">
                Incorporate real-time local rainfall radar APIs. The controller temporarily delays irrigation cycles if precipitation is projected within 4 hours.
              </p>
            </li>

            <li className="glass-card rounded-3xl p-6 space-y-4 flex flex-col">
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 w-fit">
                PHASE 3 • NEXT YEAR
              </span>
              <h3 className="text-lg font-bold text-white">Off-Grid Solar & LoRaWAN Edge</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-auto">
                Transition to low-power ultra-sleep ESP32 nodes powered by small solar PV panels, communicating across kilometers using long-range LoRaWAN radio.
              </p>
            </li>
          </ol>
        </section>

        {/* Back to Home CTA */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="focus-ring btn-primary-mint inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold cursor-pointer"
          >
            <span>Return to AgriSense Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
