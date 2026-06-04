import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
// Update this line to import from 'groq-sdk' instead of '@groq/groq-sdk'
import { Groq } from "groq-sdk";

const router = Router();

// Initialize the free Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

/**
 * POST /api/v1/chat/message
 * Handles conversational UI interactions, enforces safety length barriers,
 * and tracks real-time customer intent metrics.
 */
router.post("/chat/message", async (req: Request, res: Response): Promise<any> => {
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

        // Capture explicit regex matches directly into database metadata fields before hitting AI
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

        // =========================================================================
        // NEW: LIVE DATABASE DATA ACCUMULATION FOR WEB PAGE KNOWLEDGE
        // =========================================================================
        // Fetch real-time web context entries across your system collections
        const [dbProjects, dbTeam, dbTestimonials] = await Promise.all([
            prisma.project.findMany({ take: 5, select: { title: true, category: true, businessSummary: true } }),
            prisma.teamMember.findMany({ select: { name: true, role: true, specialties: true } }),
            prisma.testimonial.findMany({ take: 3, select: { clientName: true, feedbackText: true } })
        ]);

        // Transform collection arrays to highly structured readable markdown context strings
        const dynamicProjectsContext = dbProjects.map(p => `- ${p.title} (${p.category}): ${p.businessSummary}`).join("\n");
        const dynamicTeamContext = dbTeam.map(t => `- ${t.name}, ${t.role} (Specialties: ${t.specialties ? t.specialties.join(", ") : "Full-Stack Development"})`).join("\n");
        const dynamicTestimonialsContext = dbTestimonials.map(t => `- "${t.feedbackText}" — ${t.clientName}`).join("\n");

        // System Guidelines - Formulating constraints using the dynamic context variables
        const systemPromptGuidelines = {
            role: "system" as const,
            content: `You are the expert conversational AI assistant for Denkinesh Platform. Your core objective is to answer questions accurately by referencing our real website data.

      LIVE KNOWLEDGE BASE FROM OUR WEBPAGES:
      [REAL TIME PROJECTS & PORTFOLIO]
      ${dynamicProjectsContext || "We design high-performance full-stack custom web applications and ERP enterprise networks."}

      [OUR PROFESSIONAL TEAM WORKFORCE]
      ${dynamicTeamContext || "Our roster includes specialized software architects, automation engineers, and full-stack developers."}

      [CLIENT SUCCESS REVIEWS & TESTIMONIALS]
      ${dynamicTestimonialsContext || "Clients value our fast deployment speeds, custom software delivery, and direct platform architecture."}

      OUR 5-STEP WORKFLOW METHODOLOGY:
      1. Discovery & Strategy, 2. Planning & Design, 3. Full-Stack Development, 4. Testing & Refinement, 5. Launch & Ongoing Support.

      CONVERSATION STYLE & DISCIPLINE RULES:
      - Read the user's message carefully. Do NOT talk about the 5-step process unless they explicitly ask how we build projects, our workflow, or our development process.
      - If they ask what we have built, our past work, or what is on our pages, use the exact items under [REAL TIME PROJECTS].
      - If they ask who works here, about your developers, or the team, use the exact info under [OUR PROFESSIONAL TEAM WORKFORCE].
      - Sound natural, technical, professional, and clear. 
      - Keep responses strictly under 3 sentences. Never dump paragraphs on the user.`,
        };

        // =========================================================================

        // Re-fetch message logs to keep absolute memory accuracy for the model context
        const completeMessageLogs = await prisma.aIMessage.findMany({
            where: { sessionId: session.id },
            orderBy: { createdAt: "asc" },
        });

        // Format histories array to pass cleanly straight to Groq completion arrays
        const completionHistoryContext = completeMessageLogs.map((log: any) => ({
            role: log.role as "user" | "assistant" | "system",
            content: log.content,
        }));

        // Dispatch payload context cleanly to Groq completion endpoint using your model
        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [systemPromptGuidelines, ...completionHistoryContext],
        });

        const runtimeResponse = chatCompletion.choices?.[0]?.message?.content || "I encountered a processing transmission delay. Could you please resend that input?";

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