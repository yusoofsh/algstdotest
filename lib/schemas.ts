import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title." }),
  description: z.string().min(1, { message: "Please enter a description." }),
  date: z.string().min(1, { message: "Please enter a date." }),
  time: z.object({
    enabled: z.boolean().optional(),
    value: z.string().optional(),
  }),
})

export type Task = z.infer<typeof taskSchema>

export interface StoreState {
  tasks: Task[]
  selectedTasks: Task[]
  addTask: (task: Task) => void
}

export type SectionData = {
  title: string
  data: Task[]
}
