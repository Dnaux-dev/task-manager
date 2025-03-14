import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const diffInDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} days ago`
  } else if (diffInDays === 0) {
    return "today"
  } else if (diffInDays === 1) {
    return "tomorrow"
  } else {
    return `in ${diffInDays} days`
  }
}

