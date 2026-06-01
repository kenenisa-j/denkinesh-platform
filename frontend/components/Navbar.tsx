"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Technologies", href: "#technologies" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Identity */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="text-xl font-bold tracking-wider text-brand-navy flex items-center gap-2">
              <span className="text-brand-blue">
                DENKINESH
              </span>
              <span className="text-xs font-semibold text-brand-teal hidden sm:inline">TECHNOLOGIES</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-brand-text hover:text-brand-blue transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-brand-blue text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-blueHover shadow-md shadow-brand-blue/10 transition-all duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-text hover:text-brand-navy hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-b border-slate-200 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-brand-text hover:text-brand-navy hover:bg-slate-50 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 px-3">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg text-base font-semibold shadow-md shadow-brand-blue/20"
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}