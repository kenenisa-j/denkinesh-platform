import type { Request, Response } from 'express';
import { z } from 'zod';
import xss from 'xss';
import prisma from '../lib/prisma.js';
import { sendAdminNotificationEmail } from '../utils/email.util.js';

// 1. Enforce strict type validation schemas via Zod
const contactSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
    email: z.string().email({ message: 'A valid email address is required.' }),
    subject: z.string().min(3, { message: 'Subject must be at least 3 characters long.' }),
    message: z.string().min(10, { message: 'Message content must be at least 10 characters long.' }),
});

export const handleContactSubmission = async (req: Request, res: Response): Promise<void> => {
    try {
        // 2. Validate request body elements against Zod expectations
        const validatedBody = contactSchema.parse(req.body);

        // 3. Escape malicious script inputs to cleanly prevent XSS exploits
        const sanitizedData = {
            name: xss(validatedBody.name),
            email: xss(validatedBody.email),
            subject: xss(validatedBody.subject),
            message: xss(validatedBody.message),
        };

        // 4. Commit records safely to PostgreSQL using Prisma Client
        const newMessage = await prisma.contactMessage.create({
            data: sanitizedData,
        });

        // 5. Trigger an asynchronous Nodemailer admin notification email alert
        try {
            await sendAdminNotificationEmail(sanitizedData);
        } catch (mailError) {
            console.error('Email alert pipeline bottleneck caught:', mailError);
            // We don't crash the request if only the email notification fails
        }

        res.status(201).json({
            success: true,
            message: 'Inquiry message logged successfully. Our team will contact you shortly.',
            data: { id: newMessage.id },
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Input validation rejected.',
                errors: error.issues.map((e: any) => ({ field: e.path[0], message: e.message })),
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Internal communication channel database failure.',
            error: error.message,
        });
    }
};