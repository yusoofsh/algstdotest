import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { ScrollView, View } from "react-native"
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormDatePicker,
  FormField,
  FormInput,
  FormSwitch,
  FormTextarea,
} from "~/lib/components/form"
import { Button } from "~/lib/components/button"
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
    <ScrollView
      ref={scrollRef}
      contentContainerClassName="p-6 mx-auto w-full max-w-xl"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
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
          <View className="flex-row justify-between items-center gap-4 w-full">
            <Button variant="outline" className="flex-1">
              <Text>Cancel</Text>
            </Button>
            <Button className="flex-1" onPress={form.handleSubmit(onSubmit)}>
              <Text>Save</Text>
            </Button>
          </View>
        </View>
      </Form>
    </ScrollView>
  )
}
