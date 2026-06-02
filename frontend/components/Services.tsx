export default function Services() {
  const serviceList = [
    { title: "Custom Software Development", icon: "💻", desc: "Tailored enterprise solutions built from scratch to streamline workflows and scale business capability." },
    { title: "Business Automation", icon: "⚙️", desc: "Eliminate manual paperwork and repetitive task bottlenecks with custom intelligent systems workflows." },
    { title: "AI Integration", icon: "🧠", desc: "Embed state-of-the-art LLMs, automated business chatbots, and cognitive data agents straight into your product." },
    { title: "Web Application Development", icon: "🌐", desc: "Highly secure, hyper-responsive, and pixel-perfect web systems customized for heavy transactional volumes." },
    { title: "Cloud Solutions", icon: "☁️", desc: "Migrate infrastructure cleanly to modern cloud hosts ensuring absolute uptime, failovers, and backup cycles." },
    { title: "DevOps Services", icon: "🚀", desc: "Setup production-ready automated continuous delivery streams (CI/CD) and cluster architectures flawlessly." },
    { title: "UI/UX Design", icon: "🎨", desc: "High-conversion product design layouts that ensure client interfaces are simple, high contrast, and accessible." },
  ];

  return (
    <section id="services" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
            Our Enterprise Capabilities
          </h2>
          <p className="max-w-2xl mx-auto text-brand-text">
            We build secure digital foundations designed to substitute manual organizational systems with robust cloud tech layouts.
          </p>
          <div className="w-12 h-1 bg-brand-blue mx-auto rounded mt-4" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl bg-white border border-slate-200/60 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-brand-blue/5 transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-brand-text text-sm leading-relaxed mb-6">
                {service.desc}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue group-hover:text-brand-teal transition-colors"
              >
                Learn More <span>→</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}