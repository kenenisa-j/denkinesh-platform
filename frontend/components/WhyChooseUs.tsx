export default function WhyChooseUs() {
  const pillars = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Rapid Market Deployment",
      desc: "We don't get bogged down in endless development cycles. We structure our projects to deliver fully functional, production-ready modules quickly, letting your team capitalize on market opportunities immediately.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Direct ROI & Automation",
      desc: "Every line of software we draft has a single purpose: lowering your overhead. We target your team's most time-consuming manual processes and convert them into automated operations that execute automatically.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Full-Cycle Accountability",
      desc: "We operate as your long-term digital growth partner. From initial consultation to post-launch optimization, our team assumes complete responsibility for keeping your business systems secure and fully functional.",
    },
  ];

  const stats = [
    { value: "100%", label: "Operational Transparency" },
    { value: "3 Days", label: "To First Deliverable" },
    { value: "0", label: "Hidden Agency Fees" },
  ];

  return (
    // Section background dark matching your layout theme
    <section id="why-choose-us" className="py-24 bg-[#030712] border-b border-slate-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Centered Heading Layout Block */}
        <div className="mb-16 w-full text-center flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-blue bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
            The Denkinesh Advantage
          </span>
          
          {/* Changed text color to white to contrast perfectly with the dark background */}
          <h2 className="mt-6 text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] w-full max-w-4xl mx-auto">
            Why Forward-Thinking Companies Partner with <span className="text-brand-blue block sm:inline">Denkinesh</span>
          </h2>
          
          {/* Lightened body description text for clean readability on dark background */}
          <p className="mt-5 text-slate-400 text-lg sm:text-xl leading-relaxed font-normal w-full max-w-3xl mx-auto">
            We bridge the gap between complex digital transformation and your bottom line. We design systems that protect your time, scale your reach, and modernize your company's workflow.
          </p>
        </div>

        {/* Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              // Changed card background to dark slate slate-900/60 and updated text to white/slate-400
              className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm flex flex-col gap-5 hover:bg-[#0f172a] hover:border-brand-blue/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                {pillar.icon}
              </div>
              
              <div>
                <span className="text-xs font-bold text-slate-500 tracking-widest group-hover:text-brand-blue transition-colors block mb-1">
                  CORE PILLAR 0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-brand-blue transition-colors duration-200">
                  {pillar.title}
                </h3>
              </div>
              
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics Inset Row */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800 shadow-inner grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center gap-1 bg-[#030712] p-6 rounded-xl border border-slate-800 shadow-sm w-full group hover:border-brand-blue/30 transition-all duration-200">
              <span className="text-3xl sm:text-4xl font-black text-brand-blue tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}