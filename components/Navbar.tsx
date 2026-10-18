"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, Mail, MapPin, CheckCircle2, Loader2, Send } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Reviewer Feedback",
    message: "",
  });

  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Handle background scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && contactModalOpen) {
        setContactModalOpen(false);
      }
    };
    if (contactModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Auto-focus first input
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contactModalOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Hardware", href: "/#hardware" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Crops", href: "/crops" },
    { name: "Future Scope", href: "/future-scope" },
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate responsive submission feedback
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactModalOpen(false);
      setFormData({
        name: "",
        email: "",
        inquiryType: "Reviewer Feedback",
        message: "",
      });
    }, 2200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav-scrolled py-3" : "glass-nav py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-ring rounded-xl p-1"
              aria-label="AgriSense Smart Irrigation Home"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[#39D98A] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(57,217,138,0.3)]">
                <Leaf className="w-5 h-5 fill-[#39D98A]/30 text-[#39D98A]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                  AgriSense
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-300/80 font-medium -mt-1">
                  Smart Irrigation System
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-[#39D98A] focus-ring rounded-lg px-2 py-1 ${
                      isActive ? "text-[#39D98A] font-semibold" : "text-slate-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Contact Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setContactModalOpen(true)}
                className="glass-pill px-5 py-2 text-sm font-medium text-white rounded-full hover:bg-white/15 transition-all duration-200 shadow-sm focus-ring cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus-ring min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden glass-panel border-t border-white/10 mt-3 px-6 py-5 space-y-4 animate-in fade-in duration-200"
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-200 hover:text-[#39D98A] py-2 px-2 rounded-lg hover:bg-white/5 focus-ring"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
                className="w-full glass-pill py-3 text-center text-sm font-medium text-white rounded-full focus-ring cursor-pointer"
              >
                Contact Project Team
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Accessible Contact Project Modal */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setContactModalOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 relative shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus-ring min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close contact dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[#39D98A]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 id="contact-modal-title" className="text-xl font-bold text-white">
                  AgriSense Project Team
                </h3>
                <p className="text-xs text-emerald-300/80">College Capstone • IoT Smart Irrigation</p>
              </div>
            </div>

            <div aria-live="polite">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-400 text-[#39D98A] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Message Received!</h4>
                  <p className="text-sm text-slate-300">
                    Thank you for your feedback. The AgriSense project team will review your comments.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="text-sm text-slate-300">
                    Have questions, faculty evaluation feedback, or suggestions about our Raspberry Pi irrigation system? Reach out below.
                  </p>

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-emerald-200 mb-1">
                      Your Name <span className="text-[#39D98A]" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      id="contact-name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Prof. Sharma / Reviewer"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus-ring"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-emerald-200 mb-1">
                      Email Address <span className="text-[#39D98A]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@college.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus-ring"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-inquiry-type" className="block text-xs font-medium text-emerald-200 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-inquiry-type"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#091710] border border-white/15 text-white text-sm focus-ring cursor-pointer"
                    >
                      <option value="Reviewer Feedback">Academic Reviewer Feedback</option>
                      <option value="Technical Question">Technical / Hardware Question</option>
                      <option value="Calibration Suggestions">Soil Sensor Calibration Advice</option>
                      <option value="General Inquiry">General Capstone Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-emerald-200 mb-1">
                      Feedback or Question <span className="text-[#39D98A]" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share feedback on calibration, relay circuits, or demo schedule..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus-ring"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setContactModalOpen(false)}
                      className="w-1/2 py-2.5 rounded-xl text-sm font-medium glass-pill text-slate-300 focus-ring cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-1/2 py-2.5 rounded-xl text-sm font-semibold btn-primary-mint focus-ring flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Department of Computer Science & IoT Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>agrisense.project@college.edu</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
