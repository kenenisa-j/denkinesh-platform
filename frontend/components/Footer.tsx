export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Identity Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-wider text-white">
              DENKINESH <span className="text-xs text-brand-teal block font-semibold mt-0.5">TECHNOLOGIES</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Building smart software solutions and automated cloud infrastructure layouts for modern enterprise operations.
            </p>
          </div>

          {/* Col 2: Navigation Mapping */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
            </ul>
          </div>

          {/* Col 3: Protected Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#admin-login" className="hover:text-brand-teal transition-colors font-medium flex items-center gap-1">
                  🛡️ Systems Admin Portal
                </a>
              </li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Charter</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Col 4: Rapid Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <p className="text-xs text-slate-400 mb-2">Addis Ababa, Ethiopia</p>
            <p className="text-xs text-slate-400">Email: info@denkinesh.com</p>
          </div>

        </div>

        {/* Core Copyright Attribution Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Denkinesh Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}