import { Router } from "express";
import { adminLogin } from "../controllers/auth.controller";

const router = Router();

router.post("/auth/login", adminLogin);

export default router;