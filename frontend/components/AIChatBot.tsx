"use client";

import React, { useState, useEffect, useRef } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! Welcome to Denkinesh Platform. I am your automated AI consultant. How can I assist you with your software development goals today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll mechanics to snap window to the absolute newest message text
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userText = input.trim();
        setInput(""); // Clear input bar instantly for fluid UI feel

        // Append user input directly to visual stream
        setMessages((prev) => [...prev, { role: "user", content: userText }]);
        setIsTyping(true);

        try {
            // Connects directly to the Express route handler we mapped in Step 2
            const response = await fetch("http://localhost:5000/api/v1/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: sessionId,
                    messageContent: userText,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.sessionId) setSessionId(data.sessionId);
                setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
            } else {
                // Render explicit backend validations (like the 500-char barrier) right in the chat panel
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.error || "System encountered an issue processing that input." },
                ]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Communication failure. Please verify backend service port states." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans text-left">

            {/* Floating Action Activation Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 group"
                >
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            )}

            {/* Main Conversational Chat Panel Drawer */}
            <div
                className={`w-[360px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden transition-all duration-300 transform original-bottom-right ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10 pointer-events-none"
                    }`}
            >
                {/* Panel Header */}
                <div className="bg-[#030712] text-white p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                        <div>
                            <h3 className="text-sm font-bold tracking-tight">Denkinesh AI Concierge</h3>
                            <p className="text-[11px] text-slate-400 font-medium">Enterprise Solutions Advisor</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors duration-150 focus:outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Message Rendering Display List */}
                <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 space-y-3 scrollbar-thin">
                    {messages.map((msg, index) => {
                        const isAI = msg.role === "assistant";
                        return (
                            <div key={index} className={`flex w-full ${isAI ? "justify-start" : "justify-end"}`}>
                                <div
                                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed font-medium tracking-tight shadow-xs border ${isAI
                                            ? "bg-white text-[#030712] border-slate-200/60 rounded-tl-none"
                                            : "bg-[#2563eb] text-white border-[#2563eb] rounded-tr-none"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })}

                    {/* Dynamic Typing State Loader Indicator */}
                    {isTyping && (
                        <div className="flex w-full justify-start">
                            <div className="bg-white text-slate-400 border border-slate-200/60 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Action Input Bar Controller Form */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        maxLength={520} // Defensive frontend buffer matching backend constraints
                        placeholder="Describe your operational bottleneck..."
                        className="flex-1 bg-slate-50 text-sm px-4 py-2.5 rounded-xl border border-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] focus:bg-white transition-all duration-150"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="p-2.5 bg-[#2563eb] text-white rounded-xl hover:bg-[#1d4ed8] transition-colors duration-150 disabled:opacity-40 disabled:hover:bg-[#2563eb] focus:outline-none shadow-sm"
                    >
                        <svg className="w-4 h-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>

        </div>
    );
}