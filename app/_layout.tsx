import "~/lib/globals.css"

import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ThemeProvider } from "@react-navigation/native"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { DARK_THEME, LIGHT_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/hooks"
import { Text } from "~/lib/components/text"
import { Button } from "~/lib/components/button"
import { Plus } from "~/lib/icons/plus"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem("theme")
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }
      const colorTheme = theme === "dark" ? "dark" : "light"
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme)
        setIsColorSchemeLoaded(true)
        return
      }
      setIsColorSchemeLoaded(true)
    })().finally(() => {
      SplashScreen.hideAsync()
    })
  }, [])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerTitle: "",
          headerLeft() {
            return <Text className="text-xl font-bold">To Do List</Text>
          },
          headerRight: () => (
            <Button variant="default" className="flex-row text-background">
              <Plus className="text-background" size={18} />
              <Text>New Task</Text>
            </Button>
          ),
        }}
      />
    </ThemeProvider>
  )
}
