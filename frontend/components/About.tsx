export default function About() {
  const problems = [
    "Manual paperwork and scattered data sheets",
    "Slow, disconnected workflow bottlenecks",
    "Complete lack of modern system automation",
    "Inefficient client and customer interaction channels",
    "Outdated, legacy business software architecture"
  ];

  return (
    <section id="about" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
            Who We Are
          </h2>
          <div className="w-12 h-1 bg-brand-blue mx-auto rounded" />
        </div>

        {/* Grid: Story + Mission/Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

          {/* Left: Our Story */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-navy">Our Story</h3>
            <p className="text-brand-text leading-relaxed">
              Denkinesh Technologies was founded to bridge the digital gap for growing enterprises. We realize that modern businesses cannot scale efficiently while relying on legacy operational methods. We deliver premium engineering craftsmanship that helps organizations substitute complex, unoptimized routines with high-performing cloud automation systems.
            </p>
          </div>

          {/* Right: Mission & Vision Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <span className="text-2xl mb-3 block">🎯</span>
              <h4 className="text-lg font-bold text-brand-navy mb-2">Our Mission</h4>
              <p className="text-sm text-brand-text leading-relaxed">
                To help businesses modernize their operations using scalable software, automation systems, and intelligent digital solutions.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <span className="text-2xl mb-3 block">👁️</span>
              <h4 className="text-lg font-bold text-brand-navy mb-2">Our Vision</h4>
              <p className="text-sm text-brand-text leading-relaxed">
                To become one of Africa's leading software outsourcing and business automation companies.
              </p>
            </div>
          </div>

        </div>

        {/* Problems We Solve Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
          <h3 className="text-xl sm:text-2xl font-bold text-brand-navy text-center mb-8">
            Operational Hardships We Eliminate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                {/* Fixed marker to match our active Tech Teal brand token rule */}
                <span className="text-brand-teal font-bold text-lg">✕</span>
                <p className="text-sm font-medium text-brand-text">{problem}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}