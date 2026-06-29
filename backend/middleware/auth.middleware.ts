import type { Request, Response } from 'express';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secure_fallback_secret_key_8899";

export interface AuthenticatedRequest extends Request {
    admin?: {
        adminId: string;
        email: string;
    };
}

/**
 * protectAdmin
 * Intercepts incoming network requests, decodes signatures, and blocks unauthorized tracking vectors.
 */
export const protectAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. Missing valid Bearer token signature." });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Parse cryptographic signature validation blocks
        const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string; email: string };

        // Attach credentials context safely straight to the request stream
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Session expired or invalid authentication signature." });
    }
};