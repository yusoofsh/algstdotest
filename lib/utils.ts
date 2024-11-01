import { type ClassValue, clsx } from "clsx"
import * as NavigationBar from "expo-navigation-bar"
import type { LucideIcon } from "lucide-react-native"
import { cssInterop } from "nativewind"
import { Platform } from "react-native"
import { twMerge } from "tailwind-merge"
import { NAV_THEME } from "~/lib/constants"

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
