import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and dedupe conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&#038;": "&",
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8211;": "–",
  "&#8212;": "—",
  "&#8243;": "″",
  "&#8242;": "′",
  "&nbsp;": " ",
  "&lt;": "<",
  "&gt;": ">",
};

/** Decode the handful of HTML entities present in scraped product copy
 *  (names, highlights, specs, overview text) so they render as real
 *  characters instead of literal "&#8243;"-style escape codes. */
export function decodeHtmlEntities(text: string): string {
  return text.replace(/&#?\w+;/g, (m) => HTML_ENTITIES[m] ?? m);
}
