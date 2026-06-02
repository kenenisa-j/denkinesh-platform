'use client';

import { useState, useEffect } from 'react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    bio: string;
    specialties: string[];
    githubUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
}

export default function TeamDirectory() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/v1/team');
                const json = await response.json();

                if (json.success) {
                    setTeam(json.data);
                } else {
                    setError('Could not establish synchronization with directory nodes.');
                }
            } catch (err: any) {
                console.error('API connection failed:', err);
                setError('Network pipeline connection error.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    return (
        /* Background: Pure White ($bg-light) */
        <section id="team-directory" className="py-28 bg-white text-slate-900 w-full border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Core Centered Presentation Header */}
                <div className="mb-20 w-full text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60">
                        THE SPECIALISTS
                    </span>
                    {/* Typography: Charcoal ($bg-dark) */}
                    <h2 className="mt-6 text-4xl sm:text-5xl font-black text-[#1e293b] tracking-tight">
                        Meet Our Delivery Experts
                    </h2>
                    {/* Typography: Gray ($text-gray) */}
                    <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto font-normal">
                        The architects, engineers, and product builders turning complex operational problems into reliable digital platforms.
                    </p>
                </div>

                {/* Loading and Error Pipeline Handlers */}
                {isLoading ? (
                    <div className="text-center py-16 text-slate-400 text-sm font-semibold uppercase tracking-wider animate-pulse">
                        Querying active personnel rosters...
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-rose-600 text-sm bg-rose-50 rounded-2xl border border-rose-100 max-w-md mx-auto">
                        {error}
                    </div>
                ) : team.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 text-sm">
                        No active corporate directory logs discovered.
                    </div>
                ) : (
                    /* Fluid Grid Container */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {team.map((member) => (
                            <div
                                key={member.id}
                                /* Light Card Styling: Pure white container, elegant thin borders, subtle shadow */
                                className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 flex flex-col gap-6 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-300"
                            >
                                {/* Profile Row */}
                                <div className="flex items-center gap-5 w-full">
                                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/60 shrink-0">
                                        <img
                                            src={member.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>

                                    <div className="flex flex-col min-w-0">
                                        {/* Name: Charcoal ($bg-dark) */}
                                        <h3 className="text-lg sm:text-xl font-bold text-[#1e293b] tracking-tight truncate">
                                            {member.name}
                                        </h3>
                                        {/* Role: Royal Blue ($accent-blue) */}
                                        <span className="text-xs font-bold text-brand-blue uppercase tracking-wide mt-1">
                                            {member.role}
                                        </span>
                                    </div>
                                </div>

                                {/* Bio Text: Gray ($text-gray) */}
                                <p className="text-sm text-slate-500 leading-relaxed font-normal min-h-[60px]">
                                    {member.bio}
                                </p>

                                {/* Specialties mapping */}
                                <div className="flex flex-wrap gap-1.5 w-full">
                                    {member.specialties.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[11px] font-bold tracking-wide bg-slate-50 text-slate-500 border border-slate-200/50 px-2.5 py-1 rounded-md uppercase"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Action link panel */}
                                <div className="flex gap-5 items-center pt-5 border-t border-slate-100 mt-auto w-full">
                                    {member.linkedinUrl && (
                                        <a
                                            href={member.linkedinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-brand-blue flex items-center gap-1.5 transition-colors"
                                        >
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            LinkedIn
                                        </a>
                                    )}

                                    {member.githubUrl && (
                                        <a
                                            href={member.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#1e293b] flex items-center gap-1.5 transition-colors"
                                        >
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}