import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // This pulls your database URL straight from your backend/.env file
    url: process.env.DATABASE_URL!,
  },
});