import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;

    // Dynamically build filtering rules based on request parameters
    const whereClause: any = {};

    // 1. Exact matching Category Filter
    if (category && typeof category === 'string') {
      whereClause.category = category;
    }

    // 2. Multi-field Keyword Query Engine
    if (search && typeof search === 'string') {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { businessSummary: { contains: search, mode: 'insensitive' } },
        { technicalSummary: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } } // Match search terms against string arrays directly
      ];
    }

    // Fetch matching datasets from PostgreSQL ordered by newest release
    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project archives',
      error: error.message,
    });
  }
};