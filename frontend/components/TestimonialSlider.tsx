'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface Testimonial {
    id: string;
    clientName: string;
    companyName: string | null;
    role: string | null;
    avatarUrl: string | null;
    feedbackText: string;
    ratingValue: number;
}

export default function TestimonialSlider() {
    // Step 3: Initialize Embla Carousel with clean looping configurations
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    // Step 4: Component Data-binding States
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch verified testimonials from the Phase 5 backend API layer
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/v1/testimonials');
                const json = await response.json();

                if (json.success) {
                    setTestimonials(json.data);
                } else {
                    setError('Failed to sync client feedback data.');
                }
            } catch (err) {
                console.error('Testimonials sync pipeline error:', err);
                setError('Network interface connection failure.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Configure dot-navigation slide updates 
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    // Step 4: Functional Utility Mapping numbers directly into groups of SVG rating stars
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`}
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <section id="testimonials" className="py-24 bg-white text-slate-900 w-full border-t border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Section Header */}
                <div className="mb-16 text-center flex flex-col items-center justify-center w-full">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                        Valued feedback from our clients
                    </span>
                    <h2 className="mt-6 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        Trusted by Modern Enterprises
                    </h2>
                    <p className="mt-4 text-slate-600 max-w-2xl text-base sm:text-lg">
                        Don't just take our word for it, hear the experiences of our clients. As a dedicated engineering partner, we ensure our clients receive high-performance software.
                    </p>
                </div>

                {/* Dynamic Fallback Conditions */}
                {isLoading ? (
                    <div className="text-center py-12 text-slate-400 tracking-wider text-sm animate-pulse">
                        Querying corporate feedback ledgers...
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-rose-500 bg-rose-500/5 rounded-2xl border border-rose-500/10 max-w-md mx-auto text-sm">
                        {error}
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm">
                        No dynamic client testimonials found in the production database.
                    </div>
                ) : (
                    /* Step 3: Embla Viewport Wrapper Component Container */
                    <div className="relative w-full flex flex-col items-center">

                        <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
                            <div className="flex w-full select-none">
                                {testimonials.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex-[0_0_100%] min-w-0 px-4 md:px-12 lg:px-20 flex flex-col items-center text-center"
                                    >
                                        {/* Dynamic Graphic Stars Mapping Array Output */}
                                        <div className="flex gap-1 mb-8 justify-center">
                                            {renderStars(item.ratingValue)}
                                        </div>

                                        {/* Feedback Core Quote Blocks */}
                                        <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-slate-600 tracking-tight max-w-3xl">
                                            "{item.feedbackText}"
                                        </blockquote>

                                        {/* Client Presentation Row Details */}
                                        <div className="mt-8 flex items-center justify-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                                                <img
                                                    src={item.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
                                                    alt={item.clientName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-base font-bold text-slate-900 tracking-tight">{item.clientName}</div>
                                                <div className="text-xs font-semibold text-blue-600 tracking-wide mt-0.5">
                                                    {item.role}{item.companyName ? ` @ ${item.companyName}` : ''}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slider Dots Navigation Triggers */}
                        <div className="flex justify-center gap-2.5 mt-12 w-full">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                                        }`}
                                    aria-label={`Maps to slide panel number ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}