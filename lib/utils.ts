import * as NavigationBar from "expo-navigation-bar"
import { clsx, type ClassValue } from "clsx"
import { Platform } from "react-native"
import { twMerge } from "tailwind-merge"
import { NAV_THEME } from "~/lib/constants"
import { cssInterop } from "nativewind"
import type { LucideIcon } from "lucide-react-native"

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

export async function setAndroidNavigationBar(theme: "light" | "dark") {
  if (Platform.OS !== "android") return
  await NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark")
  await NavigationBar.setBackgroundColorAsync(
    theme === "dark" ? NAV_THEME.dark.background : NAV_THEME.light.background
  )
}
