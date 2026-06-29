"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok && data.token) {
                login(data.token);
            } else {
                setError(data.error || "Authentication gate rejected options.");
            }
        } catch (err) {
            setError("Network barrier communication failure.");
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-white text-center">Admin Gate Verification</h2>
                {error && <p className="text-xs text-red-500 text-center bg-red-500/10 p-2 rounded-md">{error}</p>}
                <input
                    type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-fuchsia-500"
                />
                <input
                    type="password" placeholder="Security Signature Key" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-fuchsia-500"
                />
                <button type="submit" className="w-full py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium text-sm rounded-lg transition-colors">
                    Validate Credentials
                </button>
            </form>
        </div>
    );
}