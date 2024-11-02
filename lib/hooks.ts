import { useColorScheme as useNativewindColorScheme } from "nativewind"
import { create } from "zustand"
import { type StoreState, taskSchema } from "~/lib/schemas"

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme()
  return {
    colorScheme: colorScheme ?? "light",
    setColorScheme,
    toggleColorScheme,
  }
}

export const useTasksStore = create<StoreState>((set) => ({
  tasks: [],
  selectedTasks: [],
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, taskSchema.parse(task)] })),
}))
