import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { SectionList, View } from "react-native"
import { z } from "zod"
import { Button } from "~/lib/components/button"
import { Card, CardContent } from "~/lib/components/card"
import { Form, FormCheckbox, FormField } from "~/lib/components/form"
import { Parent } from "~/lib/components/parent"
import { Text } from "~/lib/components/text"
import { useTasksStore } from "~/lib/hooks"
import type { SectionData } from "~/lib/schemas"
import { groupTasksByDate } from "~/lib/utils"

const formSchema = z.object({
  fields: z.record(z.boolean()),
})

export default function Index() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fields: {} },
  })

  const [taskSections, setTaskSections] = useState<SectionData[]>([])

  useEffect(() => {
    const unsubscribe = useTasksStore.subscribe((state) => {
      const groupedTasks = groupTasksByDate(state.tasks)
      setTaskSections(groupedTasks)
    })
    return () => unsubscribe()
  }, [])

  const handleCheckboxChange = (fieldName: string, isChecked: boolean) => {
    form.setValue(`fields.${fieldName}`, isChecked)

    const selectedTasks = Object.entries(form.getValues("fields"))
      .filter(([_, isChecked]) => isChecked)
      .map(([key]) => key)

    useTasksStore.setState((state) => ({
      ...state,
      selectedTasks: [...(state.selectedTasks || []), ...selectedTasks],
    }))
  }

  const handleDelete = () => {
    // Add delete logic here
    console.log("Delete task")
  }

  return (
    <Parent>
      <Form {...form}>
        <View>
          <SectionList
            sections={taskSections}
            contentContainerClassName="bg-[#F9F9F9]"
            stickySectionHeadersEnabled={true}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({ item, index, section }) => {
              const fieldName = `section-${section.title}-item-${index}`
              return (
                <Card
                  className={`mx-8 p-2 ${index === 0 && "mt-2"} ${index === section.data.length - 1 && "mb-2"}`}
                >
                  <CardContent>
                    <View className="flex-row items-center gap-4">
                      <FormField
                        control={form.control}
                        name={`fields.${fieldName}`}
                        render={({ field }) => <FormCheckbox {...field} />}
                      />
                      <View className="flex-col">
                        <Text className="font-bold">{item.title}</Text>
                        {item.time.enabled && (
                          <Text className="text-primary font-medium">
                            {item.time.value}
                          </Text>
                        )}
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
        </View>
      </Form>

      <Button
        className="absolute right-5 bottom-20 z-10 bg-white rounded-xl px-20 shadow-inner w-40"
        size="xl"
        onPress={handleDelete}
      >
        {/* Uncomment if you want to add an icon */}
        {/* <Ionicons name="trash" size={24} color="red" /> */}
        <Text className="text-red-500">Delete task</Text>
      </Button>
    </Parent>
  )
}
