import { Router } from 'express';
import { getActiveTestimonials } from '../controllers/testimonial.controller.js';

const router = Router();

// Publicly accessible resource gateway
router.get('/', getActiveTestimonials);

export default router;