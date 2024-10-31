import "~/lib/globals.css"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ThemeProvider } from "@react-navigation/native"
import { Link, Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Button } from "~/lib/components/button"
import { Text } from "~/lib/components/text"
import { LIGHT_THEME } from "~/lib/constants"
import { ChevronLeft } from "~/lib/icons/chevron"
import { Plus } from "~/lib/icons/plus"

export { ErrorBoundary } from "expo-router"

export default function RootLayout() {
  const router = useRouter()

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <BottomSheetModalProvider>
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
                        size="sm"
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
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
