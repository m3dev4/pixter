import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(from: Date): string {
  const currentDate = new Date()
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(from, { addSuffix: true })
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return format(from, "MMM d")
    } else {
      return format(from, "MMM d, yyyy")
    }
  }
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n)
}