/**
 * Utility functions for managing class names and formatting dates.
 *
 * This file includes two helper functions:
 *
 * 1. `cn`: Combines multiple class names (strings or objects) into a single string, 
 *    and merges conflicting Tailwind CSS class names. It uses `clsx` for conditionally 
 *    joining class names and `twMerge` to merge conflicting Tailwind classes.
 *    This is particularly useful in React when dynamically applying classes.
 * 
 *    Example usage:
 *      const className = cn('bg-blue-500', isActive && 'text-white');
 *
 *    - `clsx` allows for conditional class names (e.g., adding or removing classes based on conditions).
 *    - `twMerge` ensures that only the valid Tailwind class name remains when conflicting classes are provided.
 * 
 * 2. `formatDate`: Converts an ISO date string into a localized date string in the Chinese date format.
 *    This function accepts a `Date` object (or ISO string) and returns a string formatted as:
 *      'YYYY-MM-DD HH:mm'.
 *    
 *    Example usage:
 *      const formattedDate = formatDate(new Date());
 *      console.log(formattedDate); // Outputs: '2025-04-28 14:45'
 * 
 *    The formatting used here is based on the Chinese locale (`zh-CN`), with the time displayed 
 *    in 24-hour format (no AM/PM).
 *
 *    - This function is particularly useful for displaying dates in Chinese formatted style (e.g., for apps targeting Chinese users).
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format date in Chinese locale (YYYY-MM-DD HH:mm)
export const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  return date
    .toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-");
};
