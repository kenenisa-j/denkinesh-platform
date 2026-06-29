import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secure_fallback_secret_key_8899";

/**
 * POST /api/v1/auth/login
 * Performs cryptographic matching and issues signed 8-hour session tokens
 */
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required parameters." });
        }

        // Locate admin account entity
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return res.status(401).json({ error: "Invalid administrative credentials." });
        }

        // Cryptographic signature evaluation using bcrypt
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid administrative credentials." });
        }

        // Issue token containing an explicit 8-hour session lifetime constraint
        const token = jwt.sign(
            { adminId: admin.id, email: admin.email },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        return res.status(200).json({
            message: "Authentication successful.",
            token,
            admin: { id: admin.id, email: admin.email }
        });
    } catch (error) {
        console.error("Auth controller verification exception:", error);
        return res.status(500).json({ error: "Internal security gateway communication failure." });
    }
};