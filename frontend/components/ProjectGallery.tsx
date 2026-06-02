"use client";

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  businessSummary: string;
  technicalSummary: string;
  thumbnailUrl: string;
  liveUrl: string | null;
  githubUrl: string | null;
  tags: string[];
  features: string[];
}

export default function ProjectGallery() {
  // Binary view state toggle ("business" | "technical")
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');

  // State hooks for inputs and API state
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'ERP System', 'Web App', 'Automation'];

  // Dynamic API data fetching pipeline
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        let url = 'http://localhost:5000/api/v1/projects?';
        const params = new URLSearchParams();

        if (activeCategory !== 'All') {
          params.append('category', activeCategory);
        }
        if (searchQuery.trim() !== '') {
          params.append('search', searchQuery);
        }

        url += params.toString();
        const response = await fetch(url);
        const json = await response.json();

        if (json.success) {
          setProjects(json.data);
        }
      } catch (error) {
        console.error('Failed fetching data from the backend engine:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchProjects();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategory]);

  return (
    /* Background: Pure White ($bg-light) */
    <section id="portfolio" className="py-28 bg-white text-slate-900 w-full min-h-screen border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Header Title Section - Rebalanced for both business & technical visitors */}
        <div className="mb-16 w-full text-center flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/5 border border-brand-blue/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              REAL-WORLD EVIDENCE VALIDATION
            </span>
          </div>

          {/* Title: Charcoal ($bg-dark) */}
          <h2 className="text-4xl sm:text-5xl font-black text-[#1e293b] tracking-tight max-w-3xl leading-[1.15]">
            Our Portfolio of Proven Business Transformations
          </h2>

          {/* Description: Gray ($text-gray) */}
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            We don't just write code; we build real tools that streamline operations and drive growth. See how we turn ambitious corporate goals into secure, everyday digital solutions.
          </p>
        </div>

        {/* Filters and Toggles Control Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-8 border-b border-slate-100 w-full">

          {/* Search & Category Filter UI Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Filter by tech, keyword, feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border border-slate-200/80 text-slate-900 placeholder-slate-400 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-brand-blue w-full transition-all"
              />
              <svg className="absolute right-3 top-3.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all uppercase whitespace-nowrap border ${activeCategory === cat
                      ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/10'
                      : 'bg-slate-50 text-slate-500 border-slate-200/60 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 flex items-center gap-1 shrink-0">
            <button
              onClick={() => setViewMode('business')}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${viewMode === 'business'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              💼 Client Metrics View
            </button>
            <button
              onClick={() => setViewMode('technical')}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${viewMode === 'technical'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              ⚡ Technical Blueprint
            </button>
          </div>

        </div>

        {/* Loading / Empty States */}
        {isLoading ? (
          <div className="text-center py-32 text-slate-400 text-sm font-semibold tracking-widest uppercase animate-pulse">
            Loading explicit case evidence logs...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32 text-slate-400 text-sm font-semibold tracking-widest uppercase">
            No matching active validation archives found.
          </div>
        ) : (
          /* Presentation Cards Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {projects.map((project) => (
              <div
                key={project.id}
                /* Card Background: Pure white with soft gray drop shadows and ultra-faint border */
                className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-slate-200/80 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300"
              >
                {/* Thumbnail Display Canvas */}
                <div className="relative h-52 w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-102 transition-all duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 text-brand-blue text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-md border border-slate-200/60 shadow-sm">
                    {project.category}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow gap-5">
                  {/* Title: Charcoal ($bg-dark) */}
                  <h3 className="text-xl font-bold tracking-tight text-[#1e293b]">
                    {project.title}
                  </h3>

                  {/* Summary Segment - Descriptions in Gray ($text-gray) */}
                  <div className="min-h-[110px] flex-grow">
                    {viewMode === 'business' ? (
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest block">
                          Measurable Capital Yield
                        </span>
                        <p className="text-sm text-slate-500 leading-relaxed font-normal">
                          {project.businessSummary}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-cyan-600 font-bold uppercase tracking-widest block">
                          Infrastructure Integration Mechanics
                        </span>
                        <p className="text-sm text-slate-500 leading-relaxed font-mono text-xs">
                          {project.technicalSummary}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tech Tags: Accent Teal text inside soft white/gray pill enclosures */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-md text-brand-teal uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Operational Anchors/Links Footer */}
                  <div className="flex gap-5 items-center pt-5 border-t border-slate-100 text-xs font-bold uppercase tracking-wider mt-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid triggering any higher-level card action card hooks if configured
                        }}
                        className="text-brand-blue hover:text-blue-600 transition-colors flex items-center gap-0.5"
                      >
                        Launch Live App <span>→</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid triggering any higher-level card action card hooks if configured
                        }}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        Review Source Architecture
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}