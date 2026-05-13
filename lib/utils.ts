import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

/**
 * Validates a URL to ensure it uses safe protocols or is a safe relative path.
 * Prevents Cross-Site Scripting (XSS) via javascript:, data:, or vbscript: URIs.
 */
export function validateSafeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  const normalized = url.trim();

  // Allow safe relative paths (starting with / but not //) or fragment identifiers
  if ((normalized.startsWith("/") && !normalized.startsWith("//")) || normalized.startsWith("#")) {
    return normalized;
  }

  // Allow common safe protocols
  const safeProtocols = /^(https?|mailto|tel):/i;
  if (safeProtocols.test(normalized)) {
    return normalized;
  }

  return undefined;
}

/**
 * Simple obfuscation to prevent basic scrapers from finding strings in the source.
 * This is not secure encryption, just a deterrent for simple automated bots.
 */
export function obfuscate(str: string): string {
  return str
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
    .join("");
}

/**
 * Deobfuscates a string that was obfuscated with the obfuscate function.
 */
export function deobfuscate(str: string): string {
  return str
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");
}
