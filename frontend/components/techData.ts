export interface TechItem {
  name: string;
  level: string; // To showcase mastery tier
  category: string;
}

export interface DomainCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon identifier or abstract SVG marker placeholder
  items: TechItem[];
}

export const techDomains: DomainCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Building responsive, highly accessible, and pixel-perfect corporate user interfaces with absolute speed.",
    icon: "Layers",
    items: [
      { name: "Next.js", level: "Expert", category: "Framework" },
      { name: "React", level: "Expert", category: "Library" },
      { name: "TypeScript", level: "Advanced", category: "Language" },
      { name: "Tailwind CSS", level: "Expert", category: "Styling" }
    ]
  },
  {
    id: "backend",
    title: "Backend Systems",
    description: "Architecting reliable server environments, high-throughput REST/GraphQL APIs, and transactional route safety.",
    icon: "Server",
    items: [
      { name: "Node.js", level: "Advanced", category: "Runtime" },
      { name: "Express", level: "Advanced", category: "Framework" },
      { name: "Prisma ORM", level: "Expert", category: "Data Access" },
      { name: "JWT / OAuth2", level: "Advanced", category: "Security" }
    ]
  },
  {
    id: "database",
    title: "Database Architecture",
    description: "Designing optimized relational schemas, secure connection pooling, and complex transactional data rules.",
    icon: "Database",
    items: [
      { name: "PostgreSQL", level: "Advanced", category: "Relational" },
      { name: "Neon Serverless", level: "Advanced", category: "Cloud DB" },
      { name: "MongoDB", level: "Intermediate", category: "NoSQL" },
      { name: "Redis", level: "Intermediate", category: "Caching" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Configuring continuous delivery pipelines, global asset distribution, and automated environment failovers.",
    icon: "Cloud",
    items: [
      { name: "Vercel / Netlify", level: "Expert", category: "Hosting" },
      { name: "AWS", level: "Intermediate", category: "Infrastructure" },
      { name: "Docker", level: "Intermediate", category: "Containerization" },
      { name: "GitHub Actions", level: "Advanced", category: "CI/CD" }
    ]
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "Embedding large language models, structured output parsers, and custom intelligent automation workflows.",
    icon: "Brain",
    items: [
      { name: "OpenAI API", level: "Advanced", category: "LLM" },
      { name: "LangChain", level: "Intermediate", category: "Orchestration" },
      { name: "Vector Databases", level: "Intermediate", category: "RAG Systems" },
      { name: "Cron Automation", level: "Advanced", category: "Pipelines" }
    ]
  }
];