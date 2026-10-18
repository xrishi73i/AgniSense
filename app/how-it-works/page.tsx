import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Droplets,
  Zap,
  ShieldAlert,
  ChevronRight,
  CheckCircle2,
  Sliders,
  Layers,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "How It Works | AgriSense Smart Irrigation",
  description:
    "Comprehensive system architecture, separate power circuit topology, and automated closed-loop irrigation algorithm for AgriSense.",
};

const pythonCode = `import time
import RPi.GPIO as GPIO
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

# GPIO Pin Configuration
RELAY_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT)
GPIO.output(RELAY_PIN, GPIO.HIGH) # Relay is active-LOW (OFF)

# I2C and ADS1115 Setup
i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1115(i2c)
channel = AnalogIn(ads, ADS.P0)

# Calibrated ADC Thresholds (Sample for Loam Soil)
DRY_ADC_VALUE = 24500  # Raw reading in completely dry air
WET_ADC_VALUE = 11200  # Raw reading in saturated water

def get_moisture_percentage(raw_val):
    pct = ((DRY_ADC_VALUE - raw_val) / (DRY_ADC_VALUE - WET_ADC_VALUE)) * 100.0
    return max(0.0, min(100.0, pct))

def irrigation_loop(target_min_moisture=55.0, pump_run_seconds=6):
    print("AgriSense Monitoring Daemon Active...")
    while True:
        raw = channel.value
        moisture = get_moisture_percentage(raw)
        print(f"Current Soil Moisture: {moisture:.1f}% (ADC: {raw})")

        if moisture < target_min_moisture:
            print("Moisture below minimum threshold! Activating Relay...")
            GPIO.output(RELAY_PIN, GPIO.LOW)  # Engage Relay (Pump ON)
            time.sleep(pump_run_seconds)
            GPIO.output(RELAY_PIN, GPIO.HIGH) # Disengage Relay (Pump OFF)
            print("Pump interval complete. Waiting 10 minutes for water absorption...")
            time.sleep(600)  # Wait for soil matrix percolation
        else:
            time.sleep(15)   # Standard polling interval`;

export default function HowItWorks() {
  const workflowSteps = [
    {
      num: "01",
      title: "Read Soil Moisture",
      desc: "The capacitive probe creates an electrostatic field in the root zone. Changes in soil water permittivity modulate the analog voltage output (1.2V–3.0V) without galvanic metal oxidation.",
    },
    {
      num: "02",
      title: "Analog to Digital Conversion",
      desc: "The ADS1115 16-bit ADC samples the analog voltage and converts it into a high-precision 16-bit integer sent across the I2C bus (address 0x48) to the Raspberry Pi.",
    },
    {
      num: "03",
      title: "Python Controller Processing",
      desc: "The script converts raw ADC integer values into relative moisture percentages and evaluates against the specific crop's configured lower moisture threshold.",
    },
    {
      num: "04",
      title: "Relay Circuit Switching",
      desc: "If moisture is below the calibrated minimum threshold, Raspberry Pi sets GPIO 17 HIGH, triggering the relay's internal optocoupler and closing the COM to NO switch.",
    },
    {
      num: "05",
      title: "Metered Water Delivery",
      desc: "The 5V DC pump draws power from its independent external 5V power supply rail, pumping water through drip tubing for a predetermined pulse duration.",
    },
    {
      num: "06",
      title: "Stabilization Soak Period",
      desc: "The pump switches OFF and the script enters a 10–15 minute soak delay, allowing water to percolate through soil particles before re-evaluating root moisture.",
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
                System Architecture & Logic
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-[#39D98A]">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Architecture & Logic Flow</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          How the <span className="text-[#39D98A]">AgriSense System</span> Works
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From soil capacitive sensing to optoisolated relay activation, explore how AgriSense automates precision crop watering without risking hardware damage.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =========================================================================
            SECTION 1: ARCHITECTURE PIPELINE
        ========================================================================= */}
        <section
          aria-labelledby="pipeline-heading"
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 id="pipeline-heading" className="text-2xl sm:text-3xl font-bold text-white">
              System Signal Pipeline
            </h2>
            <p className="text-sm text-slate-300">
              Complete unidirectional signal and power flow from agricultural soil to pump actuation
            </p>
          </div>

          <ol className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center list-none p-0">
            <li className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">STAGE 1</span>
              <span className="font-semibold text-sm text-white">Soil Matrix</span>
              <span className="text-[11px] text-slate-400">Moist Root Zone</span>
            </li>
            <li aria-hidden="true" className="hidden md:flex items-center justify-center text-emerald-400/70 text-lg">
              →
            </li>

            <li className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">STAGE 2</span>
              <span className="font-semibold text-sm text-white">Capacitive Probe</span>
              <span className="text-[11px] text-slate-400">Analog Voltage</span>
            </li>
            <li aria-hidden="true" className="hidden md:flex items-center justify-center text-emerald-400/70 text-lg">
              →
            </li>

            <li className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">STAGE 3</span>
              <span className="font-semibold text-sm text-white">ADS1115 ADC</span>
              <span className="text-[11px] text-slate-400">16-Bit I2C Bus</span>
            </li>
            <li aria-hidden="true" className="hidden md:flex items-center justify-center text-emerald-400/70 text-lg">
              →
            </li>

            <li className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 col-span-2 md:col-span-1">
              <span className="text-xs font-mono text-emerald-400 font-semibold">STAGE 4</span>
              <span className="font-semibold text-sm text-white">Raspberry Pi 3B+</span>
              <span className="text-[11px] text-slate-400">Python Logic Loop</span>
            </li>
          </ol>

          <div aria-hidden="true" className="flex justify-center text-emerald-400/70 py-1 text-xl">
            ↓
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-4 space-y-1">
              <span className="text-xs font-mono text-amber-400 font-semibold">DECISION</span>
              <h3 className="font-semibold text-white text-sm">Moisture &lt; Threshold?</h3>
              <p className="text-[11px] text-slate-400">Evaluates against crop moisture target</p>
            </div>
            <div className="glass-card rounded-2xl p-4 space-y-1 border-amber-500/30">
              <span className="text-xs font-mono text-amber-400 font-semibold">SWITCHING</span>
              <h3 className="font-semibold text-white text-sm">5V Relay Module</h3>
              <p className="text-[11px] text-slate-400">COM & NO Contacts Close</p>
            </div>
            <div className="glass-card rounded-2xl p-4 space-y-1 border-blue-500/30">
              <span className="text-xs font-mono text-sky-400 font-semibold">ACTUATION</span>
              <h3 className="font-semibold text-white text-sm">5V DC Submersible Pump</h3>
              <p className="text-[11px] text-slate-400">Powered by separate 5V rail</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CRITICAL ARCHITECTURE — SEPARATE POWER CIRCUITS
        ========================================================================= */}
        <section
          aria-labelledby="power-circuits-heading"
          className="glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/30 bg-[#0d281c]/70 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Crucial Electrical Engineering Principle</span>
            </div>

            <h2 id="power-circuits-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Strictly Isolated Power Circuits: Why Raspberry Pi Doesn’t Power the Pump
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              A frequent vulnerability in college IoT implementations is attempting to power inductive DC motor loads directly from the Raspberry Pi’s 5V or GPIO header. Doing so creates severe voltage dropouts, brownouts, unexpected kernel crashes, or permanent microcontroller burnout from back-EMF inductive flyback spikes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#39D98A] font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Raspberry Pi Logic Circuit</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Powered independently by an official 5V 2.5A micro-USB power brick. Supplies low-power 3.3V to the ADS1115 ADC and sends a tiny 5mA trigger signal from GPIO 17 to the relay’s optocoupler.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                  <Droplets className="w-4 h-4" />
                  <span>Pump Actuation Circuit</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Powered by a distinct external 5V 1A DC adapter or USB power bank. The positive rail routes through the relay’s Normally Open (NO) and Common (COM) terminals to ensure complete galvanic isolation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: STEP-BY-STEP IRRIGATION WORKFLOW
        ========================================================================= */}
        <section aria-labelledby="workflow-heading" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 id="workflow-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Step-by-Step Irrigation Cycle
            </h2>
            <p className="text-sm text-slate-300">
              The closed-loop feedback algorithm executed continuously by the AgriSense Python daemon
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
            {workflowSteps.map((step) => (
              <li key={step.num} className="glass-card rounded-3xl p-6 space-y-3 flex flex-col">
                <div className="text-2xl font-black text-[#39D98A]/50 font-mono">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mt-auto">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* =========================================================================
            SECTION 4: PYTHON CONTROLLER PREVIEW (Interactive CodeBlock)
        ========================================================================= */}
        <section aria-labelledby="controller-heading" className="space-y-4">
          <h2 id="controller-heading" className="sr-only">
            Raspberry Pi Controller Source Code
          </h2>
          <CodeBlock
            filename="agrisense_controller.py"
            code={pythonCode}
            subtitle="Python 3 • RPi.GPIO & Adafruit_ADS1x15"
          />
        </section>

        {/* Bottom CTA Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl glass-card border border-white/15">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Explore Crop Specific Moisture Requirements</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Check out target moisture ranges, soil percolation timing, and growth stages in the Crop Guide.
            </p>
          </div>
          <Link
            href="/crops"
            className="focus-ring btn-primary-mint px-6 py-3 rounded-full text-sm font-semibold shrink-0 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Open Crop Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
