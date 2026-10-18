import Link from "next/link";
import { Leaf, Cpu, GitBranch, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#06140d] border-t border-white/10 text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[#39D98A]">
                <Leaf className="w-5 h-5 fill-[#39D98A]/30 text-[#39D98A]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  AgriSense
                </span>
                <span className="text-[11px] uppercase tracking-wider text-emerald-300/80 font-medium">
                  Smart Irrigation System
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300/80 max-w-md leading-relaxed">
              An intelligent soil moisture monitoring and irrigation concept engineered to prevent unnecessary watering through precision sensor telemetry, Raspberry Pi compute, and automated relay control.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Academic Engineering Presentation • Prototype Development Phase</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Project Navigation</h4>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-[#39D98A] transition-colors focus-ring rounded inline-block">
                    Home Landing
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-[#39D98A] transition-colors focus-ring rounded inline-block">
                    Why Smart Irrigation
                  </Link>
                </li>
                <li>
                  <Link href="/#hardware" className="hover:text-[#39D98A] transition-colors focus-ring rounded inline-block">
                    Hardware Components
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-[#39D98A] transition-colors focus-ring rounded inline-block">
                    System Architecture & Logic
                  </Link>
                </li>
                <li>
                  <Link href="/crops" className="hover:text-[#39D98A] transition-colors focus-ring rounded inline-block">
                    Crop Moisture Guide
                  </Link>
                </li>
                <li>
                  <Link href="/future-scope" className="hover:text-[#39D98A] transition-colors focus-ring rounded inline-block">
                    Benefits & Future Roadmap
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Hardware & Verification */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Hardware Stack</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Raspberry Pi 3 Model B+ (Linux OS)</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ADS1115 16-Bit I2C ADC Module</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Capacitive Soil Sensor (Corrosion-resistant)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Isolated 5V Relay + DC Submersible Pump</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AgriSense — Smart Agriculture IoT. College Capstone Presentation.</p>
          <p className="text-center sm:text-right text-slate-400">
            Sensor data shown in UI are for conceptual demonstration while prototype calibration is under testing.
          </p>
        </div>
      </div>
    </footer>
  );
}
