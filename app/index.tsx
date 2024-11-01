import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { SectionList, View } from "react-native"
import { z } from "zod"
import { Card, CardContent } from "~/lib/components/card"
import { Form, FormCheckbox, FormField } from "~/lib/components/form"
import { Parent } from "~/lib/components/parent"
import { Text } from "~/lib/components/text"
import { useTasksStore } from "~/lib/hooks"
import type { SectionData } from "~/lib/schemas"
import { groupTasksByDate } from "~/lib/utils"

const DATA = [
  {
    date: "2023-01-01",
    tasks: [{ title: "task1", description: "description1" }],
  },
  {
    date: "2023-01-02",
    tasks: [{ title: "task1", description: "description1" }],
  },
]

const formSchema = z.object({
  fields: z.record(z.boolean()),
})

export default function Index() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fields: {} },
  })

  const [taskSections, setTaskSections] = useState<SectionData[]>([]) // Correct type for SectionList

  // Subscribe to the tasks store and update taskSections
  useEffect(() => {
    const unsubscribe = useTasksStore.subscribe((state) => {
      const groupedTasks = groupTasksByDate(state.tasks)
      setTaskSections(groupedTasks)
    })
    return () => unsubscribe()
  }, [])

  return (
    <Parent>
      <Form {...form}>
        <SectionList
          sections={taskSections}
          contentContainerClassName="bg-[#F9F9F9]"
          stickySectionHeadersEnabled={true}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index, section }) => {
            const fieldName = `section-${section.title}-item-${index}`
            return (
              <Card
                className={`mx-8 ${index === 0 && "mt-2"} ${index === section.data.length - 1 && "mb-2"}`}
              >
                <CardContent>
                  <View className="flex-row items-center">
                    <FormField
                      control={form.control}
                      name={`fields.${fieldName}`}
                      render={({ field }) => <FormCheckbox {...field} />}
                    />
                    <View className="flex-col">
                      <Text>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            )
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="bg-[#F1F1F1] px-5 py-4 text-lg">{title}</Text>
          )}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </Form>
    </Parent>
  )
}
