"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

type DashboardStats = {
    totalLeads: number;
    activeProjects: number;
    conversionRatio: number;
};

export default function AdminDashboard() {
    const { token, logout, isLoading } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({ totalLeads: 0, activeProjects: 0, conversionRatio: 0 });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/v1/admin/dashboard-stats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setStats(data);
                }
            } catch (err) {
                console.error("Failed fetching analytics metrics:", err);
            } finally {
                setLoadingStats(false);
            }
        };

        if (token) fetchAnalyticsData();
    }, [token]);

    if (isLoading || loadingStats) {
        return <div className="p-8 text-zinc-400 bg-[#09090b] min-h-screen">Loading system tracking profiles...</div>;
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-5 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Workspace Control Center</h1>
                    <p className="text-sm text-zinc-400">Denkinesh Platform Core Operational Management</p>
                </div>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-sm text-zinc-300 transition-colors"
                >
                    Terminate Session
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Inbound Leads</p>
                    <h3 className="text-3xl font-bold mt-2 text-fuchsia-500">{stats.totalLeads}</h3>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Active Portfolio Projects</p>
                    <h3 className="text-3xl font-bold mt-2 text-blue-500">{stats.activeProjects}</h3>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Conversion Efficiency</p>
                    <h3 className="text-3xl font-bold mt-2 text-emerald-500">{stats.conversionRatio}%</h3>
                </div>
            </div>
        </div>
    );
}