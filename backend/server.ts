import express from 'express';
import cors from 'cors';
// 1. Import your newly created project routing file
import projectRoutes from './routes/project.routes.js';
import teamRoutes from './routes/team.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import contactRoutes from './routes/contact.routes.js';
import chatRouter from './routes/chat.routes.js';
import authRoutes from "./routes/auth.routes.js";


const app = express();

// Standard middleware stack
app.use(cors());
app.use(express.json());

// Register API route pipelines
app.use('/api/v1', projectRoutes);
app.use('/api/v1', teamRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1', chatRouter);
app.use("/api/v1", authRoutes);

// Base health check routing option
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running smoothly on port ${PORT}`);
});