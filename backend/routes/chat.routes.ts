import type { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { OpenAI } from "openai";

const router = Router();
const prisma = new PrismaClient();

// Initialize OpenAI client (requires the OPENAI_API_KEY inside your .env)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /api/v1/chat/message
 * Handles conversational UI interactions, enforces safety length barriers,
 * and tracks real-time customer intent metrics.
 */
router.post("/message", async (req: Request, res: Response): Promise<any> => {
    try {
        const { sessionId, messageContent } = req.body;

        // =========================================================================
        // STEP 3: BACKEND VALIDATION RULES & PATTERN MATCHING
        // =========================================================================

        // 1. Enforce strict 500-character content limit barrier defensively
        if (!messageContent || messageContent.trim().length === 0) {
            return res.status(400).json({ error: "Message input cannot be empty." });
        }

        if (messageContent.length > 500) {
            return res.status(400).json({
                error: `Message exceeds the strict security limit of 500 characters (Current length: ${messageContent.length} chars).`
            });
        }

        // 2. Pattern Matching Mechanics: Pre-scan input string for quick email/phone extraction
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const phoneRegex = /(?:\+?([\d]{1,3}))?[-. (]*([\d]{3})[-. )]*([\d]{3})[-. ]*([\d]{4})/g;

        const matchedEmails = messageContent.match(emailRegex);
        const matchedPhones = messageContent.match(phoneRegex);

        // =========================================================================
        // STEP 2: ESTABLISH ROUTE HANDLERS & SYSTEM KNOWLEDGE CONTEXT
        // =========================================================================

        let session;

        // Find existing conversation thread history or instantiate a new tracking hub
        if (sessionId) {
            session = await prisma.aISession.findUnique({
                where: { id: sessionId },
                include: { messages: true },
            });
        }

        if (!session) {
            session = await prisma.aISession.create({
                data: {},
                include: { messages: true },
            });
        }

        // Capture explicit regex matches directly into database metadata fields before hitting OpenAI
        const initialPayload: Record<string, string> = {};
        if (matchedEmails && matchedEmails.length > 0) {
            initialPayload.capturedEmail = matchedEmails[0];
        }
        // If you add a capturedPhone field to your model later, you would map matchedPhones[0] here.

        if (Object.keys(initialPayload).length > 0) {
            session = await prisma.aISession.update({
                where: { id: session.id },
                data: initialPayload,
                include: { messages: true },
            });
        }

        // Save user's current valid input message to database log
        await prisma.aIMessage.create({
            data: {
                sessionId: session.id,
                role: "user",
                content: messageContent,
            },
        });

        // Re-fetch message logs to keep absolute memory accuracy for the model context
        const completeMessageLogs = await prisma.aIMessage.findMany({
            where: { sessionId: session.id },
            orderBy: { createdAt: "asc" },
        });

        // System Guidelines - Embedding your company details, 5-step framework, and pricing baselines
        const systemPromptGuidelines = {
            role: "system" as const,
            content: `You are the expert conversational AI assistant for Denkinesh Platform. Your core objective is to guide potential business buyers and capture clear lead insights.

      CRITICAL PLATFORM DETAILS & RULES:
      - SERVICE SCOPE: We design high-performance full-stack custom applications, enterprise ERP networks, and intelligent software automations.
      - PROVEN 5-STEP PROCESS: 1. Discovery & Strategy, 2. Planning & Design, 3. Full-Stack Development, 4. Testing & Refinement, 5. Launch & Ongoing Support. Always confidently emphasize this workflow structure if clients ask how we build.
      - PRICING BASELINES: Project tiers span from Custom Single-Portal Systems up to complex, deep Enterprise Systems. Exact figures depend directly on the features mapped in Discovery.
      
      CONVERSATION STYLE:
      - Sound professional, strategic, and highly technical yet clear.
      - Keep responses under 3 short sentences. Never overwhelm the client.
      - If they share project issues or budget preferences, keep track of them naturally.`,
        };

        // Format histories array to pass cleanly straight to OpenAI completion arrays
        const completionHistoryContext = completeMessageLogs.map((log) => ({
            role: log.role as "user" | "assistant" | "system",
            content: log.content,
        }));

        // Dispatch payload context cleanly to OpenAI completion endpoint
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [systemPromptGuidelines, ...completionHistoryContext],
        });

        const runtimeResponse = chatCompletion.choices[0].message.content || "I encountered a processing transmission delay. Could you please resend that input?";

        // Save AI assistant reply securely into the database
        await prisma.aIMessage.create({
            data: {
                sessionId: session.id,
                role: "assistant",
                content: runtimeResponse,
            },
        });

        // Return the updated state seamlessly back to the UI interface layer
        return res.status(200).json({
            sessionId: session.id,
            response: runtimeResponse,
        });

    } catch (error) {
        console.error("Internal Chat Route Exception Logged:", error);
        return res.status(500).json({ error: "System gateway communication failure." });
    }
});

export default router;