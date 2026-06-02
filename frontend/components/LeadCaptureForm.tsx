'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Form validation schema matching Phase 7 backend structures
const leadFormSchema = z.object({
    clientName: z.string().min(2, { message: 'Please provide a valid contact name.' }),
    email: z.string().email({ message: 'A valid corporate email address is required.' }),
    company: z.string().min(1, { message: 'Company or organization name is required.' }),
    budget: z.number().positive({ message: 'Project budget estimation must be a positive number.' }),
    projectDetails: z.string().min(10, { message: 'Please provide at least 10 characters detailing requirements.' }),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export default function LeadCaptureForm() {
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const [assignedPriority, setAssignedPriority] = useState<string | null>(null);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
    });

    const onSubmit = async (data: LeadFormData) => {
        try {
            setSubmissionError(null);
            const response = await fetch('http://localhost:5000/api/v1/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setAssignedPriority(result.priorityAssigned);
                setShowSuccessOverlay(true);
                reset();
            } else {
                setSubmissionError(result.message || 'The pipeline rejected this submission query.');
            }
        } catch (err) {
            console.error('Lead pipeline interface submission failure:', err);
            setSubmissionError('Network infrastructure connectivity bottleneck encountered.');
        }
    };

    return (
        <section id="partner-intake" className="py-24 bg-[#030712] text-white w-full relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Component Title Header */}
                <div className="mb-16 text-center flex flex-col items-center justify-center w-full">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-500 bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
                        Enterprise Inquiries
                    </span>
                    <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                        Request Project Scoping
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-xl text-sm sm:text-base">
                        Submit your structural platform criteria below. Our automated validation layer routes high-impact projects immediately to our senior architecture squad.
                    </p>
                </div>

                {/* Corporate Form Interface Sheet */}
                <div className="w-full bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Client Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Person</label>
                                <input
                                    type="text"
                                    placeholder="Kenenisa Jaleto"
                                    {...register('clientName')}
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 ${errors.clientName ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                        }`}
                                />
                                {errors.clientName && <span className="text-xs text-rose-400 font-medium">{errors.clientName.message}</span>}
                            </div>

                            {/* Corporate Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Corporate Email</label>
                                <input
                                    type="email"
                                    placeholder="partner@enterprise.com"
                                    {...register('email')}
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 ${errors.email ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                        }`}
                                />
                                {errors.email && <span className="text-xs text-rose-400 font-medium">{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Company Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Company / Organization</label>
                                <input
                                    type="text"
                                    placeholder="Denkinesh Tech Solutions"
                                    {...register('company')}
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 ${errors.company ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                        }`}
                                />
                                {errors.company && <span className="text-xs text-rose-400 font-medium">{errors.company.message}</span>}
                            </div>

                            {/* Budget Allocation */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Budget (USD)</label>
                                <input
                                    type="number"
                                    placeholder="15000"
                                    {...register('budget', { valueAsNumber: true })}
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 ${errors.budget ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                        }`}
                                />
                                {errors.budget && <span className="text-xs text-rose-400 font-medium">{errors.budget.message}</span>}
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Scope & Specifications</label>
                            <textarea
                                rows={5}
                                placeholder="Describe your architecture requirements, feature dependencies, and scalability goals..."
                                {...register('projectDetails')}
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 resize-none ${errors.projectDetails ? 'border-rose-500/50 focus:border-rose-500 focus:ring-0' : 'border-slate-800'
                                    }`}
                            />
                            {errors.projectDetails && <span className="text-xs text-rose-400 font-medium">{errors.projectDetails.message}</span>}
                        </div>

                        {/* General Submission Pipeline Errors */}
                        {submissionError && (
                            <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 text-rose-400 text-sm text-center font-medium">
                                {submissionError}
                            </div>
                        )}

                        {/* Action Trigger */}
                        <div className="w-full flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-blue-600/10"
                            >
                                {isSubmitting ? 'Evaluating Core Metrics...' : 'Initialize Pipeline Intake'}
                            </button>
                        </div>
                    </form>

                    {/* ================= SUCCESS FEEDBACK OVERLAY LAYER ================= */}
                    {showSuccessOverlay && (
                        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-50 animate-fadeIn">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30 mb-6">
                                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">Lead Secured & Priority Indexed</h3>
                            <p className="mt-3 text-slate-400 text-sm max-w-md leading-relaxed">
                                Your business criteria have been committed directly to our secure PostgreSQL records.
                                Our backend assigned your request a priority matrix signature of:{' '}
                                <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs tracking-wider ${assignedPriority === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                    assignedPriority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                        'bg-slate-900 text-slate-400 border border-slate-800'
                                    }`}>
                                    {assignedPriority} PRIORITY
                                </span>
                            </p>
                            <button
                                onClick={() => setShowSuccessOverlay(false)}
                                className="mt-8 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/50 px-6 py-2.5 rounded-lg transition-all"
                            >
                                Dismiss Window
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}