import { type ClassValue, clsx } from "clsx"
import * as NavigationBar from "expo-navigation-bar"
import type { LucideIcon } from "lucide-react-native"
import { cssInterop } from "nativewind"
import { Platform } from "react-native"
import { twMerge } from "tailwind-merge"
import { NAV_THEME } from "~/lib/constants"
import type { SectionData, Task } from "~/lib/schemas"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })
}

export async function setAndroidNavigationBar() {
  if (Platform.OS !== "android") return
  await NavigationBar.setButtonStyleAsync("light")
  await NavigationBar.setBackgroundColorAsync(NAV_THEME.light.background)
}

export function groupTasksByDate(tasks: Task[]): SectionData[] {
  const groupedTasks: Record<string, Task[]> = {}

  for (const task of tasks) {
    const { date } = task

    if (!groupedTasks[date]) {
      groupedTasks[date] = []
    }
    groupedTasks[date].push(task) // Add the full task object
  }

  // Convert the map to the required structure
  return Object.keys(groupedTasks).map((date) => ({
    title: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date)),
    data: groupedTasks[date],
  }))
}
