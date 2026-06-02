import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getActiveTestimonials = async (req: Request, res: Response): Promise<void> => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: 'asc',
            },
        });

        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve testimonial records from database pipelines.',
            error: error.message,
        });
    }
};