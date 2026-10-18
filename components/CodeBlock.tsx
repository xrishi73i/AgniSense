"use client";

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";

interface CodeBlockProps {
  filename: string;
  code: string;
  subtitle?: string;
  language?: string;
}

export default function CodeBlock({
  filename,
  code,
  subtitle = "Python 3 • RPi.GPIO & Adafruit_ADS1x15",
  language = "python",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-white/15">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <Code2 className="w-5 h-5 text-[#39D98A]" />
          <h3 className="text-base font-semibold text-white tracking-wide font-mono">
            {filename}
          </h3>
        </div>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <span className="text-xs text-slate-400 font-mono">{subtitle}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 text-slate-200 transition-colors border border-white/10 cursor-pointer"
            aria-label={copied ? "Code copied to clipboard" : "Copy code snippet to clipboard"}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold" aria-live="polite">
                  Copied!
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre
        tabIndex={0}
        aria-label={`${filename} source code`}
        className="focus-ring p-4 rounded-2xl bg-black/70 text-emerald-300/90 font-mono text-xs overflow-x-auto leading-relaxed border border-white/5"
      >
        <code>{code}</code>
      </pre>

      <p className="text-xs text-slate-400 pt-1">
        * Note: Reference logic implemented on the AgriSense Raspberry Pi 3B+ testbench. Calibration constants (<code>DRY_ADC_VALUE</code> and <code>WET_ADC_VALUE</code>) must be calibrated according to specific field soil matrix conditions.
      </p>
    </div>
  );
}
