import type { Request, Response } from 'express';
import { z } from 'zod';
import xss from 'xss';
import prisma from '../lib/prisma.js';

// Define data validation expectations
const leadValidationSchema = z.object({
    clientName: z.string().min(2),
    email: z.string().email(),
    company: z.string().min(1),
    budget: z.number().positive(),
    projectDetails: z.string().min(10),
});

export const createInboundLead = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Validate payload attributes via Zod
        const validatedData = leadValidationSchema.parse(req.body);

        // 2. Specialized Processing Loop: Compute Priority Index String
        let automatedPriority = 'LOW';
        if (validatedData.budget >= 10000) {
            automatedPriority = 'HIGH';
        } else if (validatedData.budget >= 4000) {
            automatedPriority = 'MEDIUM';
        }

        // 3. Escape malicious input values
        const sanitizedData = {
            clientName: xss(validatedData.clientName),
            email: xss(validatedData.email),
            company: xss(validatedData.company),
            budget: validatedData.budget,
            projectDetails: xss(validatedData.projectDetails),
            aiScore: automatedPriority, // Inject computed score string
        };

        // 4. Save to database using Prisma Client
        const savedLead = await prisma.lead.create({
            data: sanitizedData,
        });

        res.status(201).json({
            success: true,
            message: 'Inbound business lead pipeline initiated.',
            leadId: savedLead.id,
            priorityAssigned: savedLead.aiScore,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                errors: error.issues.map((e: any) => ({ field: e.path[0], message: e.message })),
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: 'Failed to process lead metadata inside pipeline system.',
            error: error.message,
        });
    }
};