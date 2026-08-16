export interface Project {
  slug: string;
  number: string;
  name: string;
  tagline: { id: string; en: string };
  story: { id: string; en: string };
  tech: string[];
  links: { label: string; url: string; external?: boolean }[];
  layout: "tilt" | "data" | "terminal" | "image";
  image?: string;
  gallery?: string[];
  status?: { id: string; en: string };
  badges?: string[];
  metrics?: { label: string; value: string; note?: { id: string; en: string } }[];
  proof: { id: string; en: string }[];
}

export const projects: Project[] = [
  {
    slug: "safewallet",
    number: "01",
    name: "SafeWallet",
    tagline: {
      id: "AI Financial Wellness Platform, Indonesia",
      en: "AI Financial Wellness Platform, Indonesia",
    },
    story: {
      id: "Antitesis terhadap investasi bodong, predator pinjol, dan rendahnya literasi finansial · dibangun dengan prinsip zero-trust. OCR + LLM membedah mutasi rekening, RAG mencocokkan skema penipuan terhadap database ilegal OJK, dan state machine mengunci dashboard saat rasio utang melampaui batas aman.",
      en: "An antidote to investment fraud, predatory lending, and low financial literacy · built on zero-trust principles. OCR + LLM dissects bank statements, RAG matches scam patterns against OJK's illegal-entity database, and a state machine locks the dashboard when debt ratio exceeds safe limits.",
    },
    tech: [
      "Next.js 15",
      "Supabase / pgvector",
      "Groq",
      "OCR",
      "Redis",
      "Cloud Run",
      "Docker",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/kazanaruishere-max/SafeWallet", external: true },
      { label: "Live Demo", url: "https://safe-wallet-orpin.vercel.app/", external: true },
      { label: "Bot Telegram", url: "https://t.me/SakuSafeBot", external: true },
    ],
    layout: "tilt",
    image: "/projects/safewallet.png",
    gallery: [
      "/projects/safewallet.png",
      "/projects/safewallet-chatbot.png",
      "/projects/safewallet-leak-block.png",
      "/projects/safewallet-mutasi.png",
      "/projects/safewallet-proses-mutasi.png",
      "/projects/safewallet-scam-checker.png",
    ],
    badges: ["live demo"],
    proof: [
      { id: "OCR + LLM membedah mutasi, deteksi judol & langganan siluman", en: "OCR + LLM dissects statements, flags gambling & ghost subscriptions" },
      { id: "RAG vs database ilegal OJK untuk deteksi Ponzi", en: "RAG against OJK illegal-entity DB for Ponzi detection" },
      { id: "Zero-retention: file diproses di memori, PII di-strip", en: "Zero-retention: files processed in-memory, PII stripped" },
    ],
  },
  {
    slug: "xondra",
    number: "02",
    name: "Xondra",
    tagline: {
      id: "Quant AI Trading System · Production v1.0",
      en: "Quant AI Trading System · Production v1.0",
    },
    story: {
      id: "Sistem trading kuantitatif institusional: multi-agent AI (Bull, Bear, Judge, Devil's Advocate) bekerja di atas framework AMD dan ICT/SMC. Matematika advanced · Hurst, GARCH, Kelly Criterion, CVaR · ditulis ulang dalam Rust untuk performa 11-30x. Operasi $0/bulan.",
      en: "An institutional-grade quant trading system: multi-agent AI (Bull, Bear, Judge, Devil's Advocate) on top of the AMD framework and ICT/SMC. Advanced math · Hurst, GARCH, Kelly Criterion, CVaR · rewritten in Rust for 11-30x performance. $0/month operation.",
    },
    tech: ["Python", "Rust", "MQL5", "ChromaDB", "SQLite", "MT5"],
    links: [
      { label: "GitHub", url: "https://github.com/kazanaruishere-max/Xondra-Bot-Trading", external: true },
    ],
    layout: "data",
    image: "/projects/xondra-backtest.png",
    gallery: [
      "/projects/xondra-xauusd.png",
      "/projects/xondra-eurusd.png",
      "/projects/xondra-gbpusd.png",
      "/projects/xondra-usdjpy.png",
      "/projects/xondra-eurusd2.png",
      "/projects/xondra-firsttime.png",
      "/projects/xondra-usdcad.png",
      "/projects/xondra-usdchf.png",
      "/projects/xondra-drawdown.png",
      "/projects/xondra-performance.png",
      "/projects/xondra-pnl-win.png",
    ],
    metrics: [
      { label: "Pips", value: "30,332+", note: { id: "hasil backtest/hypothetical", en: "backtest/hypothetical results" } },
      { label: "Speed", value: "11–30x", note: { id: "Rust optimization", en: "Rust optimization" } },
      { label: "Cost", value: "$0/mo", note: { id: "100% free operation", en: "100% free operation" } },
    ],
    proof: [
      { id: "Multi-agent confluence: Bull vs Bear, Judge memutuskan", en: "Multi-agent confluence: Bull vs Bear, Judge decides" },
      { id: "Rust 11-30x: 11.29s → 0.37-1.03s", en: "Rust 11-30x: 11.29s → 0.37-1.03s" },
      { id: "Dual memory: SQLite + ChromaDB vector store", en: "Dual memory: SQLite + ChromaDB vector store" },
    ],
  },
  {
    slug: "seith",
    number: "03",
    name: "SEITH",
    tagline: {
      id: "Autonomous Multi-Instrument Trading Intelligence",
      en: "Autonomous Multi-Instrument Trading Intelligence",
    },
    story: {
      id: "Mesin trading otonom ber-inti Rust, CLI-only · tanpa GUI, disiplin murni. Empat lapis filter (Bayesian, CVaR, Market Compass, Orderflow) menyaring keputusan, News Sniper mendeteksi red folder, dan sistem self-learning menulis ulang strategi dari trade journal.",
      en: "An autonomous trading engine with a Rust core, CLI-only · no GUI, pure discipline. Four filter layers (Bayesian, CVaR, Market Compass, Orderflow) gate decisions, News Sniper detects red folders, and a self-learning loop rewrites strategy from the trade journal.",
    },
    tech: ["Rust", "Python", "Jupyter", "XAUUSD"],
    links: [
      { label: "GitHub", url: "https://github.com/kazanaruishere-max/SEITH", external: true },
    ],
    layout: "terminal",
    gallery: ["/projects/seith-signal1.png", "/projects/seith-signal2.png"],
    status: {
      id: "In development · signal generation live (2 signals), backtesting in progress",
      en: "In development · signal generation live (2 signals), backtesting in progress",
    },
    proof: [
      { id: "4-layer filter: Bayesian, CVaR, Market Compass, Orderflow", en: "4 filter layers: Bayesian, CVaR, Market Compass, Orderflow" },
      { id: "CLI-only · arsitektur tanpa distraksi UI", en: "CLI-only · architecture with no UI distraction" },
      { id: "Self-learning: trade journal → rekalibrasi → auto-kill", en: "Self-learning: trade journal → recalibration → auto-kill" },
    ],
  },
  {
    slug: "coralism",
    number: "04",
    name: "Coralism",
    tagline: {
      id: "2D Eco-System Game · GGJ Next 2026",
      en: "2D Eco-System Game · GGJ Next 2026",
    },
    story: {
      id: "Game 2D ekosistem yang dikerjakan di hackathon GGJ Next 2026 (Agate Academy, Bandung) sebagai Lead Backend Developer & Project Manager dalam tim 3 orang · gameplay logic di Godot/GDScript. Bukti breadth: game dev, kepemimpinan, dan kolaborasi tim.",
      en: "A 2D eco-system game built at the GGJ Next 2026 hackathon (Agate Academy, Bandung) as Lead Backend Developer & Project Manager in a 3-person team · gameplay logic in Godot/GDScript. Proof of breadth: game dev, leadership, and team collaboration.",
    },
    tech: ["Godot", "GDScript", "2D", "Hackathon"],
    links: [
      { label: "GitHub", url: "https://github.com/kazanaruishere-max/Coralism", external: true },
    ],
    layout: "image",
    image: "/projects/coralism-menu.png",
    gallery: ["/projects/coralism-menu.png", "/projects/coralism-gameplay.png"],
    badges: ["hackathon"],
    proof: [
      { id: "Lead backend & PM tim 3 orang", en: "Lead backend & PM of a 3-person team" },
      { id: "Gameplay logic di Godot/GDScript", en: "Gameplay logic in Godot/GDScript" },
      { id: "GGJ Next 2026 · Agate Academy", en: "GGJ Next 2026 · Agate Academy" },
    ],
  },
];
