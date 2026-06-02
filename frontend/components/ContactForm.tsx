'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define structural client-side input safety expectations matching Phase 6 rules
const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid corporate email address.' }),
    subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
    message: z.string().min(10, { message: 'Message content must be at least 10 characters long.' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
    const [submissionStatus, setSubmissionStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    // Bind React Hook Form engine with Zod schema validation rules
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    // Handle validated form processing
    const onSubmit = async (data: ContactFormData) => {
        try {
            setSubmissionStatus({ type: null, message: '' });

            const response = await fetch('http://localhost:5000/api/v1/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setSubmissionStatus({
                    type: 'success',
                    message: 'Inquiry message logged successfully! Our team will contact you shortly.',
                });
                reset(); // Clear form inputs on success
            } else {
                setSubmissionStatus({
                    type: 'error',
                    message: result.message || 'Submission rejected by the security gateway.',
                });
            }
        } catch (err) {
            console.error('Contact processing pipeline error:', err);
            setSubmissionStatus({
                type: 'error',
                message: 'Network interface connection failure. Please try again later.',
            });
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#030712] text-white w-full border-t border-slate-900/40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">

                {/* Section Header */}
                <div className="mb-12 text-center flex flex-col items-center justify-center w-full">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-500 bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
                        Get In Touch
                    </span>
                    <h2 className="mt-6 text-4xl font-black text-white tracking-tight sm:text-5xl">
                        Let's Build Something Great
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-xl text-sm sm:text-base">
                        Have an inquiry or a scalable system architecture requirement? Drop us a message below.
                    </p>
                </div>

                {/* Core Submission Interface Container */}
                <div className="w-full bg-slate-950 p-8 sm:p-12 rounded-2xl border border-slate-900 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Row 1: Name and Email inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    {...register('name')}
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all duration-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 ${errors.name ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                        }`}
                                />
                                {errors.name && <span className="text-xs font-semibold text-rose-400 mt-0.5">{errors.name.message}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@company.com"
                                    {...register('email')}
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all duration-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 ${errors.email ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                        }`}
                                />
                                {errors.email && <span className="text-xs font-semibold text-rose-400 mt-0.5">{errors.email.message}</span>}
                            </div>
                        </div>

                        {/* Row 2: Subject input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject</label>
                            <input
                                type="text"
                                placeholder="Project Collaboration Opportunity"
                                {...register('subject')}
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all duration-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 ${errors.subject ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                    }`}
                            />
                            {errors.subject && <span className="text-xs font-semibold text-rose-400 mt-0.5">{errors.subject.message}</span>}
                        </div>

                        {/* Row 3: Message Content input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Message Content</label>
                            <textarea
                                rows={5}
                                placeholder="Detail your requirements or ideas here..."
                                {...register('message')}
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all duration-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 resize-none ${errors.message ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                    }`}
                            />
                            {errors.message && <span className="text-xs font-semibold text-rose-400 mt-0.5">{errors.message.message}</span>}
                        </div>

                        {/* Request Lifecycle Notification Banners */}
                        {submissionStatus.type && (
                            <div
                                className={`p-4 rounded-lg border text-sm text-center font-medium ${submissionStatus.type === 'success'
                                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                                    : 'bg-rose-500/5 border-rose-500/20 text-rose-400'
                                    }`}
                            >
                                {submissionStatus.message}
                            </div>
                        )}

                        {/* Submission Interactive Button */}
                        <div className="w-full flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-blue-600/10"
                            >
                                {isSubmitting ? 'Processing Dispatch...' : 'Send Inquiry Message'}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </section>
    );
}