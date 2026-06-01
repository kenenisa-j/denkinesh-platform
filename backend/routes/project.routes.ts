import { Router } from 'express';
import { getProjects } from '../controllers/project.controller.js';

const router = Router();

// Exposed public gateway route
router.get('/projects', getProjects);

export default router;