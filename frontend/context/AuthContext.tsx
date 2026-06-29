"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedToken = localStorage.getItem("denkinesh_admin_token");
        if (storedToken) {
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    // Soft client-side router guard redirecting out of /admin routes if unauthenticated
    useEffect(() => {
        if (!isLoading) {
            const isDashboardRoute = pathname?.startsWith("/admin");
            if (isDashboardRoute && !token) {
                router.push("/login");
            }
        }
    }, [token, pathname, isLoading, router]);

    const login = (newToken: string) => {
        localStorage.setItem("denkinesh_admin_token", newToken);
        setToken(newToken);
        router.push("/admin/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("denkinesh_admin_token");
        setToken(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be wrapped within an AuthProvider");
    return context;
};