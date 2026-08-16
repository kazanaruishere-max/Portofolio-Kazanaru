import {
  siAnthropic,
  siCursor,
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siGo,
  siGodotengine,
  siGooglegemini,
  siGooglecloud,
  siHermes,
  siJavascript,
  siJupyter,
  siNextdotjs,
  siNodedotjs,
  siOpencode,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRust,
  siSentry,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
} from "simple-icons";
import { BRAND_ICONS } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";
import type { Tool } from "@/content/profile";

/** Map slug → simple-icons (named import statis → tree-shaking, tidak bundle semua). */
const ICONS: Record<string, { title: string; path: string }> = {
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  nodedotjs: siNodedotjs,
  express: siExpress,
  googlegemini: siGooglegemini,
  googlecloud: siGooglecloud,
  anthropic: siAnthropic,
  cursor: siCursor,
  opencode: siOpencode,
  hermes: siHermes,
  docker: siDocker,
  git: siGit,
  supabase: siSupabase,
  postgresql: siPostgresql,
  redis: siRedis,
  githubactions: siGithubactions,
  sentry: siSentry,
  python: siPython,
  rust: siRust,
  javascript: siJavascript,
  go: siGo,
  php: siPhp,
  sqlite: siSqlite,
  jupyter: siJupyter,
  godotengine: siGodotengine,
  threedotjs: siThreedotjs,
};

interface ResolvedIcon {
  title: string;
  path: string;
  fillRule?: "evenodd";
}

/** Resolve logo: simple-icons dulu, lalu custom mono (brand-icons). */
function resolveIcon(tool: Tool): ResolvedIcon | undefined {
  if (!tool.icon) return undefined;
  return (ICONS[tool.icon] as ResolvedIcon | undefined) ?? BRAND_ICONS[tool.icon];
}

/**
 * Icon brand untuk tools grid (PRD §6.8.1).
 * - slug di ICONS/BRAND_ICONS → render path logo (monokrom, hover invert)
 * - tidak tersedia → fallback monogram font display (konsisten bahasa mono)
 */
export function ToolIcon({ tool, className }: { tool: Tool; className?: string }) {
  const icon = resolveIcon(tool);

  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="img"
        className={cn("h-6 w-6 fill-current", className)}
      >
        <title>{icon.title}</title>
        <path d={icon.path} fillRule={icon.fillRule} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid h-6 w-6 place-items-center border border-current font-display text-[11px] font-semibold",
        className
      )}
    >
      {tool.name.charAt(0)}
    </span>
  );
}
