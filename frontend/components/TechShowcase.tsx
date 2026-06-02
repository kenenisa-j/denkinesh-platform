"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techDomains, DomainCategory } from "./techData";

export default function TechShowcase() {
  const [activeTab, setActiveTab] = useState<string>("frontend");

  const IconMarker = ({ id }: { id: string }) => {
    const props = { className: "w-6 h-6 transition-colors duration-300" };
    switch (id) {
      case "frontend":
        return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>;
      case "backend":
        return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
      case "database":
        return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" /></svg>;
      case "cloud":
        return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
      case "ai":
        return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
      default:
        return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    }
  };

  const selectedDomain = techDomains.find((d) => d.id === activeTab) || techDomains[0];

  return (
    /* Completely dropped the negative margin breakout hacks to fix the offset crash */
    <section
      id="technologies"
      className="w-full py-24 bg-[#030712] border-b border-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Production Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-4">
            Our Core Technical Competencies
          </h2>
          <div className="w-12 h-1 bg-brand-blue mx-auto rounded" />
        </div>

        {/* Tabbed Filtering Panel */}
        <div className="flex justify-start lg:justify-center items-center overflow-x-auto pb-4 mb-12 scrollbar-none gap-2 px-1">
          {techDomains.map((domain) => {
            const isSelected = activeTab === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveTab(domain.id)}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 outline-none ${isSelected
                    ? "text-brand-blue border border-slate-800"
                    : "text-gray-400 hover:text-white hover:bg-slate-900/50 border border-transparent"
                  }`}
              >
                <div className={isSelected ? "text-brand-blue" : "text-slate-500"}>
                  <IconMarker id={domain.id} />
                </div>
                {domain.title.split(" ")[0]}

                {isSelected && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-brand-blue/5 rounded-xl -z-10 border border-brand-blue/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Layout Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start min-h-[320px]">

          {/* Domain Description Panel */}
          <motion.div
            key={`desc-${selectedDomain.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1 space-y-4 lg:sticky lg:top-28"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <IconMarker id={selectedDomain.id} />
            </div>
            <h3 className="text-2xl font-bold text-white">{selectedDomain.title}</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedDomain.description}
            </p>
          </motion.div>

          {/* Interactive Stack Cards Grid */}
          <div className="lg:col-span-2">
            <motion.div
              key={`grid-${selectedDomain.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {selectedDomain.items.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)" }}
                    className="p-5 rounded-xl bg-[#0f172a] border border-slate-800 flex items-center justify-between transition-all"
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-teal block mb-1">
                        {tech.category}
                      </span>
                      <h4 className="text-base font-bold text-white">{tech.name}</h4>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#1e293b] border border-slate-700 text-gray-300">
                      {tech.level}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}