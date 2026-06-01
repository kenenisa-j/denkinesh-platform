export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-bg">
      
      {/* Soft Premium Gradient Ambient Accents */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-brand-blue/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-teal/5 rounded-full blur-3xl animate-pulse delay-700" />
      
      {/* Technical Blueprint Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Innovation Tag Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/20 bg-brand-teal/5 text-xs font-semibold text-brand-teal tracking-wide uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
          Digital Transformation & AI Solutions
        </span>

        {/* Master Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-brand-navy mb-6 leading-[1.15]">
          WE BUILD <span className="text-brand-blue">SMART SOFTWARE</span> <br />FOR MODERN BUSINESSES
        </h1>

        {/* Value Proposition Subtext */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-brand-text mb-12 font-normal leading-relaxed">
          Accelerate your organizational workflow, substitute manual systems with flawless automation, and capture modern digital opportunities using enterprise software infrastructure tailored for growth[cite: 1].
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blueHover hover:shadow-brand-blue/30 transform hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            Get Free Consultation
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-brand-navy border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 transform hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            View Portfolio
          </a>
        </div>

      </div>
    </section>
  );
}