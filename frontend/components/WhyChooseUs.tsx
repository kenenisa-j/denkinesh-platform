"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tag: "VELOCITY",
      title: "Rapid Market Injection",
      desc: "Endless development cycles kill market momentum. We architect production-ready enterprise modules in tight, highly focused milestone sprints—allowing you to secure early-mover advantage and generate market feedback before competitors can clear their staging servers.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      tag: "EFFICIENCY",
      title: "Leaking Overhead Elimination",
      desc: "We diagnose your team's most time-expensive, error-prone manual tasks and engineer centralized automation engines that run silently in the background. Every line of custom codebase we construct is laser-focused on reducing your processing costs and amplifying margin generation.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      tag: "SECURITY",
      title: "Fractional CTO Stewardship",
      desc: "We refuse to build and vanish. Denkinesh builds long-term digital growth alignment, treating your security posture and systems uptime as our shared operational liability. From initial systems mapping to continuous scaling, your software infrastructure is backed by absolute accountability.",
    },
  ];

  const stats = [
    { value: "100%", label: "Granular Source-Code Ownership" },
    { value: "3 Days", label: "To First Actionable Deliverable" },
    { value: "0.0%", label: "Scope-Creep Cost Slippage" },
  ];

  return (
    <section id="why-choose-us" className="py-28 bg-[#030712] border-b border-slate-900/60 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Modern Split-Hero Layout Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-20 w-full">

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/5 border border-brand-blue/10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-blue">
                THE DENKINESH OPERATING STANDARD
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Why Elite Engineering Teams and Enterprises Partner with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-indigo-400">
                Denkinesh
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal border-l-2 border-slate-800 pl-6 lg:pl-8">
              We eliminate technical debt and bridge the gap between volatile software assumptions and your balance sheet. Our digital architectures protect your operational capital, streamline human labor, and expand your technological horizons.
            </p>
          </div>

        </div>

        {/* Dynamic Alternating Stack Layout Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20 w-full">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group relative p-8 sm:p-10 rounded-2xl bg-[#090f1e]/80 border border-slate-900 flex flex-col justify-between items-start hover:bg-[#0f172a] hover:border-slate-800 transition-all duration-300 shadow-2xl overflow-hidden"
            >
              {/* Subtle top ambient indicator light */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/0 to-transparent group-hover:via-brand-blue/30 transition-all duration-500" />

              <div className="space-y-6 w-full">
                <div className="w-12 h-12 rounded-xl bg-[#131c31] text-brand-blue border border-slate-800/80 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-blue/30 group-hover:text-white group-hover:bg-brand-blue transition-all duration-300">
                  {pillar.icon}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-500 tracking-widest block uppercase">
                    {pillar.tag} // 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-brand-blue transition-colors duration-200">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed font-normal group-hover:text-slate-300 transition-colors duration-200">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clean, Asymmetric Metric Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 border-t border-slate-950/80 pt-16 gap-12 sm:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-start gap-2 pl-2 border-l border-slate-900">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 max-w-[200px] leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}