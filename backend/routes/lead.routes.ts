import { Router } from 'express';
import { createInboundLead } from '../controllers/lead.controller.js';

const router = Router();

router.post('/', createInboundLead);

export default router;