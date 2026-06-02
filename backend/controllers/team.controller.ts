import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getTeamMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve active staff listings matching operational layout definitions
    const team = await prisma.teamMember.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: 'asc', // Keeps chronological structure intact
      },
    });

    res.status(200).json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to synchronize corporate directory assets.',
      error: error.message,
    });
  }
};