import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCustomDate(dateString: string): Date {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
