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
  siJavascript,
  siJupyter,
  siNextdotjs,
  siNodedotjs,
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
  anthropic: siAnthropic,
  cursor: siCursor,
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

/**
 * Icon brand untuk tools grid (PRD §6.8.1).
 * - slug di ICONS → render path resmi simple-icons (monokrom, hover invert)
 * - tidak tersedia → fallback monogram font display (konsisten bahasa mono)
 */
export function ToolIcon({ tool, className }: { tool: Tool; className?: string }) {
  const icon = tool.icon ? ICONS[tool.icon] : undefined;

  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="img"
        className={cn("h-6 w-6 fill-current", className)}
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
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
