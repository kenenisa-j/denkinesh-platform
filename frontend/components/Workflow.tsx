"use client";

import React from "react";

export default function WorkflowSection() {
    const steps = [
        {
            title: "Discovery & Strategy",
            desc: "We start by deep-diving into your business operations, challenges, and long-term goals. Together, we identify the exact bottlenecks your custom software needs to eliminate and define a clear roadmap before a single line of code is written.",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            title: "Planning & Design",
            desc: "We engineer the architecture, user flows, and interface designs for your system. You will review these interactive visual layouts and provide feedback, ensuring the look and feel completely match your vision before programming begins.",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            title: "Full-Stack Development",
            desc: "Our engineering team constructs your solution using modern engineering principles and highly secure technologies. Throughout this development phase, we keep you informed with regular updates and live progress demonstrations.",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
        },
        {
            title: "Testing & Refinement",
            desc: "Before your platform goes live, we thoroughly stress-test every feature, patch security vulnerabilities, optimize database speeds, and ensure your application runs flawlessly across all mobile devices and desktop browsers.",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: "Launch & Ongoing Support",
            desc: "Once fully approved, we securely deploy your software to cloud production servers and onboard your team. We remain actively available for server maintenance, security upgrades, adjustments, and future scaling as your company expands.",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="w-full bg-[#030712] py-28 border-t border-b border-slate-900 block left-0 right-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Client-Facing Section Header */}
                <div className="mb-24 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-3.5 py-2 rounded-md border border-[#2563eb]/20">
                        Our Execution Framework
                    </span>
                    <h2 className="mt-5 text-4xl font-black text-white tracking-tight sm:text-5xl">
                        How We Turn Your Challenges Into Live Software
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-[#9ca3af] max-w-2xl mx-auto font-medium">
                        A fully transparent, end-to-end engineered protocol designed to guide your project smoothly from concept to production deployment.
                    </p>
                </div>

                {/* Top-Down Vertical Flow Stream */}
                <div className="relative w-full pl-8 sm:pl-0">

                    {/* Active Downward Flow Line Container */}
                    <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-0.5 bg-slate-800 -translate-x-1/2">
                        {/* Downward Arrow Head Anchor at the bottom of the line */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-slate-700" />
                    </div>

                    {/* Steps Loop */}
                    <div className="space-y-20 w-full relative">
                        {steps.map((item, idx) => {
                            const isEven = idx % 2 === 0;

                            return (
                                <div
                                    key={idx}
                                    className={`w-full flex flex-col sm:flex-row items-start justify-between relative ${isEven ? "sm:flex-row-reverse" : ""
                                        }`}
                                >

                                    {/* Timeline Icon Marker Centerpiece */}
                                    <div className="absolute left-4 sm:left-1/2 top-1.5 w-10 h-10 rounded-md bg-[#2563eb] text-white border-4 border-[#030712] shadow-md flex items-center justify-center -translate-x-1/2 z-10">
                                        {item.icon}
                                    </div>

                                    {/* Content Panel Box */}
                                    <div className={`w-full sm:w-[44%] pl-6 sm:pl-0 ${isEven ? "sm:text-left" : "sm:text-right"
                                        }`}>
                                        <h3 className="text-2xl font-black text-white tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 text-base text-[#9ca3af] leading-relaxed font-medium">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Spacer Panel for Desktop Center Symmetry */}
                                    <div className="hidden sm:block sm:w-[44%]" />

                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}