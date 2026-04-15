import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates a URL to ensure it uses safe protocols or is a safe relative path.
 * Prevents Cross-Site Scripting (XSS) via javascript:, data:, or vbscript: URIs.
 */
export function validateSafeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  const normalized = url.trim();

  // Allow safe relative paths (starting with / but not //)
  if (normalized.startsWith("/") && !normalized.startsWith("//")) {
    return normalized;
  }

  // Allow common safe protocols
  const safeProtocols = /^(https?|mailto|tel):/i;
  if (safeProtocols.test(normalized)) {
    return normalized;
  }

  return undefined;
}
