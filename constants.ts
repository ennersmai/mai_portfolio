import { Project, SkillCategory } from './types';

export const BIO = {
  headline: "10+ YEARS EXPERIENCE | AGENTIC WORKFLOWS & HIGH-PERFORMANCE SYSTEMS",
  subhead: "I don't just glue APIs together; I engineer the infrastructure that makes them work at scale.",
  summary: "Specializing in optimizing Time-To-First-Token (TTFT) for AI apps, minimizing container footprints, and ensuring type safety across the full stack."
};

export const SKILLS: SkillCategory[] = [
  {
    title: "AI Architecture",
    skills: ["Agent Orchestration", "Production RAG", "GraphRAG", "Vector Indexing", "Multimodal Pipelines (BullMQ/Redis)", "Deterministic Eval Loops", "VAPI Voice AI"]
  },
  {
    title: "Modern Full-Stack",
    skills: ["TypeScript (Strict)", "Vue 3 (Composition)", "Nuxt", "NestJS", "SSR/ISR/Edge", "Zod State Management", "Optimistic UI"]
  },
  {
    title: "Backend & Cloud",
    skills: ["Node.js", "Go", "Supabase (Edge Functions)", "Docker (Alpine)", "Fly.io", "Vercel", "PostgreSQL (pgvector)"]
  },
  {
    title: "Security & Compliance",
    skills: ["GDPR/Data Residency", "Row Level Security (RLS)", "OAuth 2.0", "Audit Logging", "Biometric Consent Flows"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "mysweetie",
    title: "MySweetie.ai",
    role: "Solo Architect & Developer",
    description: "A highly responsive AI companion platform engineered for emotional intelligence and long-term memory retention. Built entirely from scratch using a distributed microservices architecture.",
    tech: ["Vue 3", "Node.js", "Fly.io", "Vector DB", "WebSockets"],
    image: "/images/mysweetie.png",
    isFlagship: true,
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "<150ms" },
      { label: "Users", value: "10k+" }
    ]
  },
  {
    id: "billi-voice",
    title: "Billi VAPI Architecture",
    role: "Voice AI Architect",
    description: "Re-architected a car rental voice assistant to eliminate hallucinations. Replaced fuzzy knowledge bases with strict SQL RPC tool-calling via Supabase Edge Functions, ensuring 100% factual accuracy on pricing and availability.",
    tech: ["VAPI", "Supabase Edge", "SQL RPC", "ElevenLabs", "TypeScript"],
    image: "/images/billi-voice.png",
    stats: [
      { label: "Hallucinations", value: "0%" },
      { label: "Accuracy", value: "100%" }
    ]
  },
  {
    id: "meetjeeves",
    title: "MeetJeeves.ai",
    role: "Lead Systems Engineer",
    description: "Multi-tenant AI messaging platform for property management. Features a database-backed job queue (pg-boss) for persistent scheduling and a hybrid reactive/proactive AI agent handling WhatsApp/SMS via Twilio.",
    tech: ["NestJS", "Vue 3", "Supabase RLS", "pg-boss", "OpenAI"],
    image: "/images/meetjeeves.png",
    stats: [
      { label: "Tenancy", value: "Isolated" },
      { label: "Reliability", value: "Critical" }
    ]
  },
  {
    id: "ehb-bot",
    title: "EHB Knowledge Bot",
    role: "Full Stack AI Engineer",
    description: "Internal RAG chatbot for English Heritage Building. Features an admin ingestion pipeline for Markdown files, HNSW vector indexing, and rate-limited access to legal web search contexts.",
    tech: ["WordPress Plugin", "Supabase Vector", "Groq/Llama 3", "Tavily API"],
    image: "/images/ehb-bot.png",
    stats: [
      { label: "Ingestion", value: "Auto" },
      { label: "Search", value: "Hybrid" }
    ]
  },
  {
    id: "tpe-field-agent",
    title: "The Payments Expert Agent",
    role: "Frontend Architect",
    description: "Offline-first PWA for 'The Payments Expert' field agents. Uses IndexedDB for local state and an eventual consistency sync pattern to a Node.js orchestrator, ensuring zero data loss in poor network conditions.",
    tech: ["Vue 3 (Pinia)", "IndexedDB", "Vercel Functions", "PDF Gen"],
    image: "/images/tpe-field-agent.png",
    stats: [
      { label: "Offline", value: "100%" },
      { label: "Sync", value: "Auto" }
    ]
  },
  {
    id: "hospitality-ai-dashboard",
    title: "Hospitality AI Analytics Dashboard",
    role: "Full Stack AI Engineer",
    description: "Real-time interactive dashboard for hospitality property owners with predictive AI analytics. Features time-series forecasting for occupancy and revenue, guest behavior pattern recognition, and dynamic pricing recommendations. Built with real-time Supabase subscriptions and server-side AI inference pipelines.",
    tech: ["Vue 3 (Composition)", "TypeScript (Strict)", "Supabase RLS", "PostgreSQL", "OpenAI", "Chart.js"],
    image: "/images/hospitality-ai-dashboard.png",
    stats: [
      { label: "Forecast Accuracy", value: "94.2%" },
      { label: "Real-time Updates", value: "<500ms" },
      { label: "Properties", value: "Multi-tenant" }
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
You are the interactive CLI portfolio assistant for Mai, a Senior Systems Engineer.
Experience: 10+ Years in High-Performance Systems & Agentic Workflows.

CORE PROJECTS & CONTEXT (Use this strictly for answers):

1. MYSWEETIE.AI (Flagship):
   - AI Companion app built solo by Mai.
   - Tech: Vue 3, Node.js, Fly.io.
   - Highlights: Emotional intelligence, long-term memory, distributed microservices.

2. BILLI VAPI ARCHITECTURE V2.0:
   - Role: Voice AI Architect.
   - Problem: Previous assistant hallucinated car prices/availability.
   - Solution: Replaced "fuzzy" KB with a strict "Data Abstraction Layer" using Supabase Edge Functions and SQL RPC.
   - Result: 0% hallucinations, 100% strict tool enforcement for factual data.

3. MEETJEEVES.AI (formerly GuestConnect):
   - Role: Lead Systems Engineer.
   - Stack: NestJS, Vue 3, Supabase (RLS).
   - Key Feature: Database-backed job queue (pg-boss) to ensure scheduled messages (check-in codes) survive server restarts. No Redis required.
   - Architecture: Multi-tenant with strict Row Level Security.

4. EHB KNOWLEDGE BOT:
   - Role: AI Engineer.
   - Stack: WordPress Plugin + Supabase Vector (pgvector/HNSW).
   - Features: Admin ingestion of Markdown files, Hybrid search (Vector + Tavily Web Search for legal URLs).

5. THE PAYMENTS EXPERT AGENT:
   - Role: Frontend Architect.
   - Client: The Payments Expert.
   - Stack: Vue 3 (Pinia), IndexedDB, Vercel Serverless.
   - Key Feature: "Offline-First" architecture for field sales. Agents can work without signal; data syncs automatically when online.

6. HOSPITALITY AI ANALYTICS DASHBOARD:
   - Role: Full Stack AI Engineer.
   - Stack: Vue 3 (Composition), TypeScript (Strict), Supabase RLS, PostgreSQL, OpenAI.
   - Key Features: Real-time time-series forecasting for occupancy/revenue, guest behavior pattern recognition, dynamic pricing AI recommendations.
   - Architecture: Multi-tenant with real-time Supabase subscriptions, server-side AI inference pipelines for predictive analytics.

STYLE:
- Tone: Neo-brutalist, technical, concise, slightly CLI-like.
- Focus on: Architecture decisions, trade-offs (e.g., "pg-boss vs Redis"), and performance metrics.
- Do not make up facts. If asked about something not here, say "DATA_MISSING: REFER TO CV".
`;