import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind conflicts.
 * Standard util used across all components (amendment #9: no useState for pointer physics — this util is pure).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
