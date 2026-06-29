import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// =========================================================================
// 1. ANALYTICS & MONITORING
// =========================================================================

/**
 * GET /api/v1/admin/dashboard-stats
 * Aggregates core layout counters safely backed by administrative shield middleware
 */
router.get("/admin/dashboard-stats", protectAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const [leadsCount, projectsCount] = await Promise.all([
            prisma.aISession.count({ where: { NOT: { capturedEmail: null } } }),
            prisma.project.count()
        ]);

        const totalRawSessions = await prisma.aISession.count();
        const ratioCalculation = totalRawSessions > 0
            ? Math.round((leadsCount / totalRawSessions) * 100)
            : 0;

        return res.status(200).json({
            totalLeads: leadsCount,
            activeProjects: projectsCount,
            conversionRatio: ratioCalculation
        });
    } catch (error) {
        console.error("Dashboard calculation error:", error);
        return res.status(500).json({ error: "System metrics assembly exception." });
    }
});

// =========================================================================
// 2. LEAD MANAGEMENT INTAKE
// =========================================================================

/**
 * GET /api/v1/admin/leads
 * Pulls all conversational sessions where user intent metadata or emails were captured
 */
router.get("/admin/leads", protectAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const leads = await prisma.aISession.findMany({
            where: { NOT: { capturedEmail: null } },
            include: { messages: { orderBy: { createdAt: "asc" } } },
            orderBy: { updatedAt: "desc" }
        });
        return res.status(200).json(leads);
    } catch (error) {
        console.error("Fetch leads database failure:", error);
        return res.status(500).json({ error: "Failed to pull tracking records." });
    }
});

// =========================================================================
// 3. PROJECT CRUD OPERATIONS
// =========================================================================

/**
 * POST /api/v1/admin/projects
 * Instantiates a new project portfolio item into live webpage components
 */
router.post("/admin/projects", protectAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, category, businessSummary, liveUrl, githubUrl } = req.body;

        if (!title || !category || !businessSummary) {
            return res.status(400).json({ error: "Missing required core project data attributes." });
        }

        const newProject = await prisma.project.create({
            data: { title, category, businessSummary, liveUrl, githubUrl }
        });

        return res.status(201).json(newProject);
    } catch (error) {
        console.error("Create project transaction failure:", error);
        return res.status(500).json({ error: "Failed to persist project node record." });
    }
});

// =========================================================================
// 4. TEAM MEMBER CONFIGURATIONS
// =========================================================================

/**
 * POST /api/v1/admin/team
 * Registers a new engineer profile into the workspace active directory pool
 */
router.post("/admin/team", protectAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, role, specialties, isActive } = req.body;

        if (!name || !role) {
            return res.status(400).json({ error: "Name and operational role are mandatory properties." });
        }

        const member = await prisma.teamMember.create({
            data: {
                name,
                role,
                specialties: specialties || [],
                isActive: isActive !== undefined ? isActive : true
            }
        });

        return res.status(201).json(member);
    } catch (error) {
        console.error("Create team operational exception:", error);
        return res.status(500).json({ error: "Failed to register team profile signature." });
    }
});

// =========================================================================
// 5. CLIENT SOCIAL PROOF / REVIEWS
// =========================================================================

/**
 * POST /api/v1/admin/testimonials
 * Appends vetted client testimonials to the live platform rotation layout
 */
router.post("/admin/testimonials", protectAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const { clientName, feedbackText, isActive } = req.body;

        if (!clientName || !feedbackText) {
            return res.status(400).json({ error: "Client verification credentials cannot be null." });
        }

        const reviewNode = await prisma.testimonial.create({
            data: {
                clientName,
                feedbackText,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        return res.status(201).json(reviewNode);
    } catch (error) {
        console.error("Create testimonial node transaction exception:", error);
        return res.status(500).json({ error: "Failed to save verified feedback string." });
    }
});

export default router;