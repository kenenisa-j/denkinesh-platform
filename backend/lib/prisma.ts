import 'dotenv/config';
import { PrismaClient } from '../prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

// Initialize the native PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the Prisma 7 driver adapter bridge
const adapter = new PrismaPg(pool);

// Export a singleton PrismaClient instance with the required adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
