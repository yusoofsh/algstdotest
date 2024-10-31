import type { FC, ReactNode } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export const Parent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView
      className="flex-1 mx-auto w-full max-w-xl"
      edges={["right", "bottom", "left"]}
    >
      {children}
    </SafeAreaView>
  )
}
