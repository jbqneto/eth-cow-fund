import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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