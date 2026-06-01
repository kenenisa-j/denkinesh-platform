import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clean sweep old data to avoid unique constraints collision errors
  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        title: "CandyFlow ERP Platform",
        slug: "candyflow-erp",
        category: "ERP System",
        businessSummary: "A comprehensive cloud operations system crafted to minimize operational overhead, remove spreadsheet clutter, and automate back-office inventory monitoring for fast-scaling enterprises.",
        technicalSummary: "Full-stack decoupled architecture backed by a robust Prisma ORM layer interacting with a PostgreSQL transactional database layer. Optimized with compound indexing strategies on categorical metrics.",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        liveUrl: "https://candyflow.netlify.app",
        githubUrl: "https://github.com/kenenisa/candyflow",
        tags: ["React", "Node.js", "Prisma", "PostgreSQL"],
        features: ["Automated Inventory Triggers", "Real-time Auditing Logs", "Multi-tenant Access Controls"],
        isFeatured: true
      },
      {
        title: "ShegerEvent Matrix",
        slug: "shegerevent-matrix",
        category: "Web App",
        businessSummary: "An integrated ticket purchasing network built to protect event hosts from scalper tracking loops and introduce bulletproof QR entrance authorization gates for large venues.",
        technicalSummary: "Engineered using highly responsive Next.js client mechanics. Incorporates automated cryptographically signed layout patterns using custom system keys and instant client lookup indexes.",
        thumbnailUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
        liveUrl: "https://shegerevent.com",
        githubUrl: null,
        tags: ["Next.js", "Tailwind CSS", "TypeScript", "Express"],
        features: ["Encrypted QR Checking", "Live Gate Status Analytics Dashboard", "Stripe Checkout Integrations"],
        isFeatured: false
      }
    ]
  });

  console.log("🌱 Database successfully hydrated with mock verification records.");
}

main().catch((e) => console.error(e)).finally(() => prisma.$disconnect());