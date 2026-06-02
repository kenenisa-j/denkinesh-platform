"use client";

import React, { useState } from "react";

type FAQItem = {
    question: string;
    answer: string;
    tags: string[];
};

type FAQCategories = {
    [key: string]: FAQItem[];
};

export default function FAQSection() {
    const [activeTab, setActiveTab] = useState<string>("business");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setOpenIndex(0); // Reset accordion to first item on tab switch
    };

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData: FAQCategories = {
        business: [
            {
                question: "How will this custom software directly improve our daily business profitability?",
                answer: "By automating your repetitive manual operational processes, we eliminate human data-entry errors and bottleneck friction. This drastically reduces administrative overhead hours, accelerates task fulfillment times, and allows your team to scale output without linearly increasing staff costs.",
                tags: ["ROI Automation", "Process Optimization", "Resource Allocation"],
            },
            {
                question: "We have non-technical employees. How difficult will it be for our team to adopt this new system?",
                answer: "We purposefully engineer our user interfaces to be straightforward and highly intuitive. We prioritize layout clarity so that any employee can navigate workflows with minimal friction. Additionally, we provide interactive onboarding support and training parameters to ensure a clean operational transition.",
                tags: ["User-Centric UI", "Team Onboarding", "Operational Ease"],
            },
            {
                question: "What happens if our operational model changes or shifts in the next few years?",
                answer: "We construct software using modular, adaptable foundations. We do not build rigid structures that lock you in. As your enterprise scales, alters its workflow parameters, or launches new business channels, your software architecture can be easily adjusted and scaled to accommodate those shifts.",
                tags: ["Modular Architecture", "Future Scaling", "Business Agility"],
            },
        ],
        technical: [
            {
                question: "What specific technologies do you use to guarantee enterprise application scalability?",
                answer: "We develop solutions utilizing highly structured frameworks capable of supporting massive operational expansion. By combining rapid frontend layers with high-performance automated cloud backend routing, your system remains lightning fast even during high concurrent user traffic spikes.",
                tags: ["React / Next.js", "Node.js", "AWS Cloud", "PostgreSQL"],
            },
            {
                question: "How do you ensure our corporate database records remain secure during a system migration?",
                answer: "Security is non-negotiable. We implement multi-layered cryptographic protocols and end-to-end data encryption pipelines. Before migrating old records into your new central ecosystem, we sandbox the transition environment, sanitize duplicate data sets, and run strict validation scripts.",
                tags: ["AES-256 Encryption", "SSL/TLS Security", "Database Sandbox", "Sanitization"],
            },
            {
                question: "Can your custom business software integrate directly with our existing internal tools?",
                answer: "Absolutely. We build modular software applications equipped with custom API integration layers. Whether your organization relies on external payment gateways, SMS alert systems, or legacy databases, we consolidate them into a singular dashboard operations center.",
                tags: ["RESTful APIs", "Webhooks", "Third-Party Gateways", "System Sync"],
            },
        ],
        logistics: [
            {
                question: "What is your typical timeline for delivering a completed custom software solution?",
                answer: "A standard mid-to-enterprise level system deployment moves systematically through our framework phases over a standard delivery timeline. This careful pacing guarantees that your system is completely stable, comprehensively tested, and ready for deployment without rushed architectural gaps.",
                tags: ["Milestone Tracking", "Phased Delivery", "Sprint Timelines"],
            },
            {
                question: "How involved does our corporate team need to be throughout the development cycle?",
                answer: "We value your strategic input but respect your time. We establish straightforward checkpoints where you can review interactive visual layouts and live progress demonstrations. This structure ensures that the build completely matches your vision while allowing your team to stay focused on running your business.",
                tags: ["Transparent Updates", "Review Milestones", "Collaborative Sync"],
            },
            {
                question: "What level of ongoing operational technical support do you provide after product launch?",
                answer: "We don't just deploy code and disappear. Following live production launch, we provide continuous health updates, proactive security patches, server optimization, and iterative scaling adjustments as your day-to-day business demands expand.",
                tags: ["DevOps Lifecycle", "SLA Agreements", "Patch Deployments", "Monitoring"],
            },
        ],
    };

    return (
        <section className="w-full bg-white py-28 border-t border-b border-slate-200/80 block left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] bg-teal-50 px-3.5 py-2 rounded-md border border-teal-100">
                        Frequently Asked Questions
                    </span>
                    <h2 className="mt-5 text-4xl font-black text-[#030712] tracking-tight sm:text-5xl">
                        Addressing Your Vital Project Queries
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-[#4b5563] max-w-2xl mx-auto font-medium">
                        Clear, explicit answers structured by category regarding business impact, technical infrastructure, and our project delivery logistics.
                    </p>
                </div>

                {/* Interactive Category Filter Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-100 pb-6">
                    <button
                        onClick={() => handleTabChange("business")}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all duration-200 focus:outline-none border ${activeTab === "business"
                                ? "bg-[#030712] text-white border-[#030712] shadow-sm"
                                : "bg-slate-50 text-[#4b5563] border-slate-200/60 hover:bg-slate-100"
                            }`}
                    >
                        Business & Operations
                    </button>
                    <button
                        onClick={() => handleTabChange("technical")}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all duration-200 focus:outline-none border ${activeTab === "technical"
                                ? "bg-[#030712] text-white border-[#030712] shadow-sm"
                                : "bg-slate-50 text-[#4b5563] border-slate-200/60 hover:bg-slate-100"
                            }`}
                    >
                        Technical & Infrastructure
                    </button>
                    <button
                        onClick={() => handleTabChange("logistics")}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all duration-200 focus:outline-none border ${activeTab === "logistics"
                                ? "bg-[#030712] text-white border-[#030712] shadow-sm"
                                : "bg-slate-50 text-[#4b5563] border-slate-200/60 hover:bg-slate-100"
                            }`}
                    >
                        Delivery & Logistics
                    </button>
                </div>

                {/* FAQ Accordion List Layout */}
                <div className="space-y-4 w-full">
                    {faqData[activeTab].map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="w-full bg-white border border-slate-200/60 rounded-xl shadow-sm hover:shadow-md/50 transition-all duration-200 overflow-hidden"
                            >
                                {/* Accordion Trigger Header */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none gap-4"
                                >
                                    <span className="text-lg sm:text-xl font-bold text-[#030712] tracking-tight leading-snug">
                                        {faq.question}
                                    </span>

                                    {/* Interactive Status Indicator Toggle Icon */}
                                    <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#030712] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                        }`}>
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Smooth Expandable Content Panel */}
                                <div
                                    className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 border-t border-slate-100" : "max-h-0 opacity-0 pointer-events-none"
                                        }`}
                                >
                                    <div className="p-6 bg-slate-50/40">
                                        {/* Answer Body Description */}
                                        <p className="text-base text-[#4b5563] leading-relaxed font-medium">
                                            {faq.answer}
                                        </p>

                                        {/* Horizontal Separation Divider Line */}
                                        <div className="my-5 border-t border-slate-200/60" />

                                        {/* Tech / Framework Tags Row Container */}
                                        <div className="flex flex-wrap gap-2 items-center">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                                                Focus Parameters:
                                            </span>
                                            {faq.tags.map((tag, tagIdx) => (
                                                <span
                                                    key={tagIdx}
                                                    className="text-xs font-semibold text-[#0d9488] bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}