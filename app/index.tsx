import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SectionList, View } from "react-native"
import { z } from "zod"
import { Card, CardContent } from "~/lib/components/card"
import { Form, FormCheckbox, FormField } from "~/lib/components/form"
import { Parent } from "~/lib/components/parent"
import { Text } from "~/lib/components/text"

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
]

const formSchema = z.object({
  fields: z.record(z.boolean()), // Use z.record for flexible key structure
})

export default function Index() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fields: {} },
  })

  return (
    <Parent>
      <Form {...form}>
        <SectionList
          sections={DATA.map((section, index) => ({ ...section, index }))}
          contentContainerClassName="bg-[#F9F9F9]"
          stickySectionHeadersEnabled={true}
          keyExtractor={(item, index) => item + index}
          renderItem={({ section, item, index }) => {
            const fieldName = `section-${section.index}-item-${index}`
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
                      <Text>asaaaa</Text>
                      <Text>asa</Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            )
          }}
          renderSectionHeader={({ section: { title, index } }) => (
            <Text className="bg-[#F1F1F1] px-5 py-4 text-lg">{title}</Text>
          )}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </Form>
    </Parent>
  )
}
