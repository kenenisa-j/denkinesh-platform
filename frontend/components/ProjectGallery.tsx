'use client';

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
  // Step 4: Binary view state toggle ("business" | "technical")
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');

  // Step 5: State hooks for inputs and API state
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'ERP System', 'Web App', 'Automation'];

  // Step 5: Dynamic API data fetching pipeline
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // Build dynamic query parameters safely
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

    // Debounce search input slightly to prevent aggressive multi-firing requests
    const delayDebounceFn = setTimeout(() => {
      fetchProjects();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategory]);

  return (
    <section className="py-24 bg-[#030712] text-white w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Title Section */}
        <div className="mb-12 w-full text-center flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-blue bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
            Engineered Masterpieces
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black text-white tracking-tight">
            Explore Our Project Vault
          </h2>
        </div>

        {/* Filters and State Toggles Control Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-8 border-b border-slate-900 w-full">
          
          {/* Step 5: Search & Category Filter UI Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
            <input
              type="text"
              placeholder="Search by tech, keyword, feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue w-full sm:w-64 transition-all"
            />
            
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all uppercase whitespace-nowrap border ${
                    activeCategory === cat
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: UI Mechanism for Binary View Mode Switcher */}
          <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-900 flex items-center gap-1 shrink-0">
            <button
              onClick={() => setViewMode('business')}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                viewMode === 'business'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              💼 Client View
            </button>
            <button
              onClick={() => setViewMode('technical')}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                viewMode === 'technical'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              ⚡ Technical View
            </button>
          </div>

        </div>

        {/* Loading / Empty States Layout handles */}
        {isLoading ? (
          <div className="text-center py-24 text-slate-500 font-medium">Synchronizing database nodes...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 text-slate-500 font-medium">No matching project archives found.</div>
        ) : (
          /* Presentation Cards Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col bg-slate-900/40 border border-slate-900 rounded-3xl overflow-hidden hover:border-slate-800 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail Display Canvas */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/90 text-brand-blue text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-slate-800">
                    {project.category}
                  </span>
                </div>

                {/* Content Area responding dynamically to viewMode toggles */}
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
                  
                  {/* Step 4 conditional binary view layout content rendering */}
                  <div className="min-h-[100px] flex-grow">
                    {viewMode === 'business' ? (
                      <div>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">Business Value Metrics</span>
                        <p className="text-sm text-slate-400 leading-relaxed font-normal">
                          {project.businessSummary}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1">Architecture Blueprint</span>
                        <p className="text-sm text-slate-400 leading-relaxed font-mono">
                          {project.technicalSummary}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Array Tag Mapping System */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-medium bg-slate-950 px-2.5 py-1 rounded-md text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Operational Anchors/Links Footer */}
                  <div className="flex gap-4 items-center pt-4 border-t border-slate-900 text-xs font-bold uppercase tracking-wider mt-auto">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-brand-blue hover:underline">
                        Launch App →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                        Source Code
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