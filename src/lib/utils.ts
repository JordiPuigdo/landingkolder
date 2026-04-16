/**
 * Merge class names, filtering falsy values.
 * Lightweight alternative to clsx for this project.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Encode form data as URLSearchParams for API calls.
 */
export function encodeFormData(data: Record<string, string>): string {
  return new URLSearchParams(data).toString();
}
