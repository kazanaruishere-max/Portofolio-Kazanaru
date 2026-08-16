export interface Tool {
  name: string;
  category: string;
  /** simple-icons slug jika tersedia; null → SVG custom self-host */
  icon?: string;
}

export const profile = {
  name: "AZKA SYAHIRULL",
  role: { id: "AI Developer · SMK Student", en: "AI Developer · SMK Student" },
  available: { id: "Open to internship (PKL)", en: "Open to internship (PKL)" },
  email: "azkasyahirull10@gmail.com",
  github: "kazanaruishere-max",
  githubUrl: "https://github.com/kazanaruishere-max",
  linkedin: "azka-syahirull",
  linkedinUrl: "https://www.linkedin.com/in/azka-syahirull-a647993b6/",
  verifierUrl: "https://certificate-verifier-1023611269119.asia-southeast1.run.app/",
  spline: "https://prod.spline.design/s9XUkatuYxJvmTmh/scene.splinecode",

  tagline: {
    id: "Membangun AI yang melindungi orang dari kerugian finansial · dan sistem kuantitatif yang mengeksekusi strategi dengan disiplin.",
    en: "Building AI that protects people from financial harm · and quantitative systems that execute strategies with discipline.",
  },

  story: {
    id: "Dari kelas 11, saya membangun sistem yang biasanya dibuat tim engineering: platform deteksi penipuan finansial berbasis LLM, sistem trading kuantitatif multi-agent dengan Rust, hingga game di hackathon nasional · semuanya self-directed.",
    en: "From grade 11, I build systems usually made by engineering teams: an LLM-based financial fraud detection platform, a multi-agent quant trading system in Rust, to a national hackathon game · all self-directed.",
  },
  bio: {
    id: "Saya Azka · siswa Software Engineering di SMK Cybermedia yang membangun AI untuk melindungi orang dari kerugian finansial, dan sistem kuantitatif yang mengeksekusi strategi dengan disiplin. Sedang mencari internship (PKL) untuk tumbuh di tim engineering profesional.",
    en: "I'm Azka · a Software Engineering student at SMK Cybermedia building AI that protects people from financial harm, and quantitative systems that execute strategies with discipline. Currently seeking an internship (PKL) to grow within a professional engineering team.",
  },
  now: {
    id: "Currently: mencari internship PKL (Jan–Mar 2027) · membangun SEITH · 34 repo · 560+ commits",
    en: "Currently: seeking internship (PKL, Jan–Mar 2027) · building SEITH · 34 repos · 560+ commits",
  },
  roles: ["AI Developer", "Quant Engineer", "Fullstack Builder"],
  facts: {
    id: [
      "Termotivasi keadilan finansial · AI yang melindungi, bukan mengeksploitasi",
      "Belajar mandiri & mendokumentasikan tiap langkah (PRD → audit → journal)",
      "Dari SMK ke sistem production · kode adalah bukti, bukan ijazah",
    ],
    en: [
      "Motivated by financial justice · AI that protects, not exploits",
      "Self-taught, documenting every step (PRD → audit → journal)",
      "From SMK to production systems · code is the proof, not the diploma",
    ],
  },
  builtIn: {
    id: "Dibangun dengan disiplin engineering di Indonesia",
    en: "Built with engineering discipline in Indonesia",
  },
  points: {
    id: [
      "AI untuk keadilan finansial",
      "Zero-trust mindset",
      "Builder end-to-end · PRD ke deploy",
    ],
    en: [
      "AI for financial justice",
      "Zero-trust mindset",
      "End-to-end builder · PRD to deploy",
    ],
  },
  quote: {
    id: "Code is a shield. Technology is a tool for justice.",
    en: "Code is a shield. Technology is a tool for justice.",
  },
  badge: "Top 100 · #JuaraVibeCoding 2026",
  stats: {
    id: [
      { value: "4", label: "proyek berdampak" },
      { value: "34", label: "repo publik" },
      { value: "560+", label: "commits setahun" },
    ],
    en: [
      { value: "4", label: "impactful projects" },
      { value: "34", label: "public repos" },
      { value: "560+", label: "commits this year" },
    ],
  },

  manifesto: {
    id: ["PRD dulu, code belakangan.", "Security by design, bukan tambahan.", "Verifikasi tiap langkah · jangan klaim, buktikan."],
    en: ["PRD first, code later.", "Security by design, not an afterthought.", "Verify every step · don't claim, prove."],
  },

  timeline: [
    { id: "Top 100 #JuaraVibeCoding · GDG Indonesia", en: "Top 100 #JuaraVibeCoding · GDG Indonesia" },
    { id: "AI Fluency Track · Anthropic (6 modul)", en: "AI Fluency Track · Anthropic (6 modules)" },
    { id: "Xondra v1.0 · Rust 11-30x · SEITH autonomous", en: "Xondra v1.0 · Rust 11-30x · SEITH autonomous" },
    { id: "Coralism · GGJ Next 2026 (game)", en: "Coralism · GGJ Next 2026 (game)" },
    { id: "SafeWallet live di Cloud Run + bot Telegram", en: "SafeWallet live on Cloud Run + Telegram bot" },
    { id: "34 repo · 560+ commits · 31 stars", en: "34 repos · 560+ commits · 31 stars" },
  ],

  marquee: [
    "Groq",
    "RAG",
    "Next.js",
    "Rust",
    "Go",
    "Python",
    "Supabase",
    "ChromaDB",
    "Docker",
    "Godot",
    "React",
    "TypeScript",
  ],

  certificate: {
    title: { id: "Certificate of Achievement · TOP 100", en: "Certificate of Achievement · TOP 100" },
    issuer: "#JuaraVibeCoding 2026 · Google Developer Groups",
    code: "JVC2605-JSVX-JYGR",
    note: {
      id: "Verifier ini saya bangun & deploy sendiri di Google Cloud Run",
      en: "I built & deployed this verifier myself on Google Cloud Run",
    },
  },

  certs: [
    {
      slug: "top-100",
      index: "01",
      title: { id: "TOP 100 #JuaraVibeCoding", en: "TOP 100 #JuaraVibeCoding" },
      issuer: "Google Developer Groups Indonesia · 2026",
      note: {
        id: "Top 100 dari ribuan submission proyek AI-assisted coding",
        en: "Top 100 out of thousands of AI-assisted coding submissions",
      },
      explanation: {
        id: "Diakui sebagai salah satu dari 100 besar dalam #JuaraVibeCoding, kompetisi AI-assisted coding oleh Google Developer Groups Indonesia (Mei 2026). Proyek yang diajukan adalah SafeWallet · platform AI untuk deteksi penipuan finansial. Verifier-nya saya bangun & deploy sendiri di Google Cloud Run.",
        en: "Recognized among the top 100 in #JuaraVibeCoding, Google Developer Groups Indonesia's AI-assisted coding competition (May 2026). The submitted project was SafeWallet · an AI platform for financial fraud detection. I built & deployed its verifier myself on Google Cloud Run.",
      },
      image: "/certificate.png",
      href: "https://certificate-verifier-1023611269119.asia-southeast1.run.app/",
      external: true,
    },
    {
      slug: "gemini-educator",
      index: "02",
      title: { id: "Gemini Certified Educator", en: "Gemini Certified Educator" },
      issuer: "Google for Education · 2025",
      note: {
        id: "AI, prompt engineering, dan teknologi pendidikan",
        en: "AI, prompt engineering, and education technology",
      },
      explanation: {
        id: "Sertifikasi dari Google for Education (2025) yang mencakup AI literacy, prompt engineering, dan integrasi teknologi pendidikan. Fondasi cara saya berpikir tentang AI sebagai alat · bukan sekadar API.",
        en: "Certification from Google for Education (2025) covering AI literacy, prompt engineering, and education technology integration. The foundation of how I think about AI as a tool · not just an API.",
      },
      pdfs: [{ name: "Sertifikat Gemini Educator", file: "/certs/gemini-educator.pdf" }],
      href: null,
      external: false,
    },
    {
      slug: "ai-fluency",
      index: "03",
      title: { id: "AI Fluency Certification Track", en: "AI Fluency Certification Track" },
      issuer: "Anthropic · 2026",
      note: {
        id: "6 modul · AI literacy, prompt engineering, responsible AI",
        en: "6 modules · AI literacy, prompt engineering, responsible AI",
      },
      explanation: {
        id: "Menyelesaikan seluruh 6 modul AI Fluency dari Anthropic (2026) · AI literacy, prompt engineering, dan responsible AI. Melengkapi praktik harian saya dengan fondasi penggunaan AI yang bertanggung jawab.",
        en: "Completed all 6 AI Fluency modules from Anthropic (2026) · AI literacy, prompt engineering, and responsible AI. Complements my daily practice with a foundation of responsible AI use.",
      },
      pdfs: [
        { name: "AI Fluency for Students", file: "/certs/ai-fluency-52tuswn9i3xb-1783079994.pdf" },
        { name: "AI Fluency for Educators", file: "/certs/ai-fluency-8cj35fmb6msx-1783080219.pdf" },
        { name: "AI Fluency: Framework & Foundations", file: "/certs/ai-fluency-aujjp5p3z3dj-1783079637.pdf" },
        { name: "AI Fluency for Small Businesses", file: "/certs/ai-fluency-fehmxfq8xf2j-1783080456.pdf" },
        { name: "AI Fluency for Developers", file: "/certs/ai-fluency-pqtkae3mooah-1783078952.pdf" },
        { name: "AI Fluency for Builders", file: "/certs/ai-fluency-xxvjyqf3n4md-1783080842.pdf" },
      ],
      href: null,
      external: false,
    },
    {
      slug: "dicoding-basic-ai",
      index: "04",
      title: { id: "Belajar Dasar AI", en: "Basic AI Course" },
      issuer: "Dicoding · 2025",
      note: {
        id: "Konsep dasar AI dan penerapannya",
        en: "Foundational AI concepts and applications",
      },
      explanation: {
        id: "Kelas 'Belajar Dasar AI' dari Dicoding (Sept 2025) · konsep dasar AI, machine learning, dan penerapannya. Titik awal perjalanan AI yang berlanjut ke LLM, RAG, dan sistem kuantitatif.",
        en: "Dicoding's 'Basic AI' course (Sept 2025) · core AI concepts, machine learning, and applications. The starting point of an AI journey that continues into LLMs, RAG, and quantitative systems.",
      },
      pdfs: [{ name: "Sertifikat Belajar Dasar AI", file: "/certs/dicoding-basic-ai.pdf" }],
      href: "https://dicoding.com/certificates/2VX35O6M3PYQ",
      external: true,
    },
  ],

  titles: {
    story: { id: "AI yang punya dampak nyata", en: "AI with real impact" },
    craft: { id: "Craft & Stack", en: "Craft & Stack" },
  },

  stackCategories: {
    id: ["AI/LLM", "Web", "AI Coding", "Backend/Infra", "Bahasa", "Data/Vector", "Game", "3D/Anim"],
    en: ["AI/LLM", "Web", "AI Coding", "Backend/Infra", "Languages", "Data/Vector", "Game", "3D/Anim"],
  },
};

export const tools: Tool[] = [
  { name: "Next.js", category: "Web", icon: "nextdotjs" },
  { name: "React", category: "Web", icon: "react" },
  { name: "TypeScript", category: "Web", icon: "typescript" },
  { name: "Tailwind CSS", category: "Web", icon: "tailwindcss" },
  { name: "Node.js", category: "Web", icon: "nodedotjs" },
  { name: "Express", category: "Web", icon: "express" },
  { name: "Groq", category: "AI/LLM" },
  { name: "Gemini", category: "AI/LLM", icon: "googlegemini" },
  { name: "Claude", category: "AI/LLM", icon: "anthropic" },
  { name: "ChromaDB", category: "AI/LLM" },
  { name: "Cursor", category: "AI Coding", icon: "cursor" },
  { name: "Claude Code", category: "AI Coding", icon: "anthropic" },
  { name: "Gemini CLI", category: "AI Coding" },
  { name: "OpenCode", category: "AI Coding" },
  { name: "Hermes Agent", category: "AI Coding" },
  { name: "Docker", category: "Backend/Infra", icon: "docker" },
  { name: "Git", category: "Backend/Infra", icon: "git" },
  { name: "Google Cloud", category: "Backend/Infra" },
  { name: "Supabase", category: "Backend/Infra", icon: "supabase" },
  { name: "PostgreSQL", category: "Backend/Infra", icon: "postgresql" },
  { name: "Redis", category: "Backend/Infra", icon: "redis" },
  { name: "GitHub Actions", category: "Backend/Infra", icon: "githubactions" },
  { name: "Sentry", category: "Backend/Infra", icon: "sentry" },
  { name: "Python", category: "Bahasa", icon: "python" },
  { name: "Rust", category: "Bahasa", icon: "rust" },
  { name: "JavaScript", category: "Bahasa", icon: "javascript" },
  { name: "Go", category: "Bahasa", icon: "go" },
  { name: "PHP", category: "Bahasa", icon: "php" },
  { name: "MQL5", category: "Bahasa" },
  { name: "SQLite", category: "Data/Vector", icon: "sqlite" },
  { name: "Jupyter", category: "Data/Vector", icon: "jupyter" },
  { name: "Godot Engine", category: "Game", icon: "godotengine" },
  { name: "GDScript", category: "Game" },
  { name: "GSAP", category: "3D/Anim" },
  { name: "Spline", category: "3D/Anim" },
];

export const contact = {
  cta: { id: "Mari bangun sesuatu", en: "Let's build something" },
  sub: {
    id: "AI Developer untuk proyek berdampak · fintech, agentic AI, quant trading. Terbuka untuk internship (PKL).",
    en: "AI Developer for impactful projects · fintech, agentic AI, quant trading. Open to internships (PKL).",
  },
};
