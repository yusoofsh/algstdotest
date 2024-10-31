import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as z from "zod"
import { Button } from "~/lib/components/button"
import {
  Form,
  FormDatePicker,
  FormField,
  FormInput,
  FormSwitch,
  FormTextarea,
} from "~/lib/components/form"
import { Parent } from "~/lib/components/parent"
import { Text } from "~/lib/components/text"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a title.",
  }),
  description: z.string(),
  date: z.string().min(1, {
    message: "Please enter a date.",
  }),
  time: z.boolean(),
})

export default function NewScreen() {
  const insets = useSafeAreaInsets()
  const scrollRef = useRef<ScrollView>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", date: "", time: false },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(JSON.stringify(values, null, 2), [
      {
        text: "OK",
        onPress: () => {
          scrollRef.current?.scrollTo({ y: 0 })
          form.reset()
        },
      },
    ])
  }

  return (
    <Parent>
      <ScrollView
        contentContainerClassName="px-6"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
      >
        <Form {...form}>
          <View className="web:max-w-xs w-full gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormInput
                  {...field}
                  label="Title"
                  placeholder="Title Task"
                  autoCapitalize="words"
                />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormTextarea
                  {...field}
                  label="Description"
                  placeholder="Description Task"
                />
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormDatePicker
                  {...field}
                  label="Date"
                  maxDate={new Date().toDateString()}
                />
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => <FormSwitch {...field} label="Time" />}
            />
          </View>
        </Form>
      </ScrollView>

      <View className="flex-row justify-between items-center gap-4 px-6 w-full">
        <Button variant="outline" className="flex-1">
          <Text>Cancel</Text>
        </Button>
        <Button className="flex-1" onPress={form.handleSubmit(onSubmit)}>
          <Text>Save</Text>
        </Button>
      </View>
    </Parent>
  )
}
