import { Router } from 'express';

import { getTeamMembers } from '../controllers/team.controller.js';

const router = Router();

// Public data retrieval portal
router.get('/team', getTeamMembers);

export default router;