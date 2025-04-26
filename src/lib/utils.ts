import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isYouTubeUrl } from "./validator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEmpty(data: string | Array<any>) {
  if (data === null || data === undefined) return true;

  if (typeof data === 'string') {
    return data.trim().length === 0;
  }

  if (Array.isArray(data)) {
    return data.length === 0;
  }
}
export function getYouTubeVideoId(url: string): string | null {
  if (!isYouTubeUrl(url)) return null;

  const parsedUrl = new URL(url);

  // Caso seja youtube.com/watch?v=ID
  if (parsedUrl.hostname.includes("youtube.com")) {
    return parsedUrl.searchParams.get("v");
  }

  // Caso seja encurtado youtu.be/ID
  if (parsedUrl.hostname.includes("youtu.be")) {
    return parsedUrl.pathname.substring(1);
  }

  return null;
}