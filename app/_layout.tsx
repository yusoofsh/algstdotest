import "~/lib/globals.css"

import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ThemeProvider } from "@react-navigation/native"
import { Link, SplashScreen, Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { DARK_THEME, LIGHT_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/hooks"
import { Text } from "~/lib/components/text"
import { Button } from "~/lib/components/button"
import { Plus } from "~/lib/icons/plus"
import { ChevronLeft } from "~/lib/icons/chevron"
import { View } from "react-native"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const router = useRouter()
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
          headerShadowVisible: false,
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "",
            headerLeft: () => (
              <Text className="text-xl font-bold">To Do List</Text>
            ),
            headerRight: () => (
              <Link href="/new" asChild>
                <Button variant="default" className="text-background flex-row">
                  <Plus className="text-background" size={18} />
                  <Text>New Task</Text>
                </Button>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="new/index"
          options={{
            headerTitle: "",
            headerLeft: () => (
              <View className="flex-row gap-4" onTouchStart={() => router.back()}>
                <ChevronLeft size={24} />
                <Text className="text-xl font-bold">Add New Task</Text>
              </View>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
