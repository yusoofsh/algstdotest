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
import { SafeAreaProvider } from "react-native-safe-area-context"
export { ErrorBoundary } from "expo-router"

export default function RootLayout() {
  const router = useRouter()

  return (
    <SafeAreaProvider>
      <ThemeProvider value={LIGHT_THEME}>
        <StatusBar style="dark" />
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
                  <Button
                    variant="default"
                    className="text-background flex-row"
                  >
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
                <View
                  className="flex-row gap-4"
                  onTouchStart={() => router.back()}
                >
                  <ChevronLeft size={24} />
                  <Text className="text-xl font-bold">Add New Task</Text>
                </View>
              ),
            }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
