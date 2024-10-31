// This project uses code from shadcn/ui.
// The code is licensed under the MIT License.
// https://github.com/shadcn-ui/ui

import * as React from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type Noop,
  useFormContext,
} from "react-hook-form"
import { View } from "react-native"
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated"
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from "~/lib/components/bottom-sheet"
import { Button, buttonTextVariants } from "~/lib/components/button"
import { Calendar } from "~/lib/components/calendar"
import { Checkbox } from "~/lib/components/checkbox"
import { Input } from "~/lib/components/input"
import { Label } from "~/lib/components/label"
import { Switch } from "~/lib/components/switch"
import { Textarea } from "~/lib/components/textarea"
import { Calendar as CalendarIcon } from "~/lib/icons/calendar"
import { X } from "~/lib/icons/x"
import { cn } from "~/lib/utils"
import { Text } from "./text"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState, handleSubmit } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { nativeID } = itemContext

  return {
    nativeID,
    name: fieldContext.name,
    formItemNativeID: `${nativeID}-form-item`,
    formDescriptionNativeID: `${nativeID}-form-item-description`,
    formMessageNativeID: `${nativeID}-form-item-message`,
    handleSubmit,
    ...fieldState,
  }
}

type FormItemContextValue = {
  nativeID: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

const FormItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const nativeID = React.useId()

  return (
    <FormItemContext.Provider value={{ nativeID }}>
      <View ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  Omit<React.ComponentPropsWithoutRef<typeof Label>, "children"> & {
    children: string
  }
>(({ className, nativeID: _nativeID, ...props }, ref) => {
  const { error, formItemNativeID } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(
        "pb-1 native:pb-2 px-px",
        error && "text-destructive",
        className,
      )}
      nativeID={formItemNativeID}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { formDescriptionNativeID } = useFormField()

  return (
    <Text
      ref={ref}
      nativeID={formDescriptionNativeID}
      className={cn("text-sm text-muted-foreground pt-1", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  React.ElementRef<typeof Animated.Text>,
  React.ComponentPropsWithoutRef<typeof Animated.Text>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageNativeID } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      ref={ref}
      nativeID={formMessageNativeID}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </Animated.Text>
  )
})
FormMessage.displayName = "FormMessage"

type Override<T, U> = Omit<T, keyof U> & U

interface FormFieldFieldProps<T> {
  name: string
  onBlur: Noop
  onChange: (val: T) => void
  value: T
  disabled?: boolean
}

type FormItemProps<T extends React.ElementType, U> = Override<
  React.ComponentPropsWithoutRef<T>,
  FormFieldFieldProps<U>
> & {
  label?: string
  description?: string
}

const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  FormItemProps<typeof Input, string>
>(({ label, description, onChange, ...props }, ref) => {
  const inputRef = React.useRef<React.ComponentRef<typeof Input>>(null)
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField()

  React.useImperativeHandle(
    ref,
    () => {
      if (!inputRef.current) {
        return {} as React.ComponentRef<typeof Input>
      }
      return inputRef.current
    },
    [],
  )

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur()
    } else {
      inputRef.current?.focus()
    }
  }

  return (
    <FormItem>
      {!!label && (
        <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
          {label}
        </FormLabel>
      )}

      <Input
        ref={inputRef}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onChangeText={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
})

FormInput.displayName = "FormInput"

const FormTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  FormItemProps<typeof Textarea, string>
>(({ label, description, onChange, ...props }, ref) => {
  const textareaRef = React.useRef<React.ComponentRef<typeof Textarea>>(null)
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField()

  React.useImperativeHandle(
    ref,
    () => {
      if (!textareaRef.current) {
        return {} as React.ComponentRef<typeof Textarea>
      }
      return textareaRef.current
    },
    [],
  )

  function handleOnLabelPress() {
    if (!textareaRef.current) {
      return
    }
    if (textareaRef.current.isFocused()) {
      textareaRef.current?.blur()
    } else {
      textareaRef.current?.focus()
    }
  }

  return (
    <FormItem>
      {!!label && (
        <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
          {label}
        </FormLabel>
      )}

      <Textarea
        ref={textareaRef}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onChangeText={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
})

FormTextarea.displayName = "FormTextarea"

const FormDatePicker = React.forwardRef<
  React.ElementRef<typeof Button>,
  FormItemProps<typeof Calendar, string>
>(({ label, description, value, onChange, ...props }, ref) => {
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField()

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <Button
            variant="outline"
            className="flex-row gap-3 justify-start px-3 relative"
            ref={ref}
            aria-labelledby={formItemNativeID}
            aria-describedby={
              !error
                ? `${formDescriptionNativeID}`
                : `${formDescriptionNativeID} ${formMessageNativeID}`
            }
            aria-invalid={!!error}
          >
            {({ pressed }) => (
              <>
                <CalendarIcon
                  className={buttonTextVariants({
                    variant: "outline",
                    className: cn(
                      !value && "opacity-80",
                      pressed && "opacity-60",
                    ),
                  })}
                  size={18}
                />
                <Text
                  className={buttonTextVariants({
                    variant: "outline",
                    className: cn(
                      "font-normal",
                      !value && "opacity-70",
                      pressed && "opacity-50",
                    ),
                  })}
                >
                  {value ? value : "Pick a date"}
                </Text>
                {!!value && (
                  <Button
                    className="absolute right-0 active:opacity-70 native:pr-3"
                    variant="ghost"
                    onPress={() => {
                      onChange?.("")
                    }}
                  >
                    <X size={18} className="text-muted-foreground text-xs" />
                  </Button>
                )}
              </>
            )}
          </Button>
        </BottomSheetOpenTrigger>
        <BottomSheetContent>
          <BottomSheetView hadHeader={false} className="pt-2">
            <Calendar
              style={{ height: 358 }}
              onDayPress={(day) => {
                onChange?.(day.dateString === value ? "" : day.dateString)
              }}
              markedDates={{
                [value ?? ""]: {
                  selected: true,
                },
              }}
              current={value}
              {...props}
            />
            <View className="flex-row justify-between items-center gap-4 w-full">
              {/* <BottomSheetCloseTrigger asChild> */}
              <Button variant="outline" className="flex-1">
                <Text>Cancel</Text>
              </Button>
              <Button className="flex-1">
                <Text>Save</Text>
              </Button>
              {/* </BottomSheetCloseTrigger> */}
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
})

FormDatePicker.displayName = "FormDatePicker"

const FormSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  Omit<FormItemProps<typeof Switch, boolean>, "checked" | "onCheckedChange">
>(({ label, description, value, onChange, ...props }, ref) => {
  const switchRef = React.useRef<React.ComponentRef<typeof Switch>>(null)
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField()

  React.useImperativeHandle(
    ref,
    () => {
      if (!switchRef.current) {
        return {} as React.ComponentRef<typeof Switch>
      }
      return switchRef.current
    },
    [],
  )

  function handleOnLabelPress() {
    onChange?.(!value)
  }

  return (
    <FormItem className="px-1">
      <View className="flex-row gap-3 items-center">
        <Switch
          ref={switchRef}
          aria-labelledby={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          onCheckedChange={onChange}
          checked={value}
          {...props}
        />
        {!!label && (
          <FormLabel
            className="pb-0"
            nativeID={formItemNativeID}
            onPress={handleOnLabelPress}
          >
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
})

FormSwitch.displayName = "FormSwitch"

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  Omit<FormItemProps<typeof Checkbox, boolean>, "checked" | "onCheckedChange">
>(({ label, description, value, onChange, ...props }, ref) => {
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField()

  function handleOnLabelPress() {
    onChange?.(!value)
  }

  return (
    <FormItem>
      <View className="flex-row gap-3">
        <Checkbox
          ref={ref}
          aria-labelledby={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          onChange={onChange}
          value={value}
          {...props}
        />
        {!!label && (
          <FormLabel
            className="pt-0.5"
            nativeID={formItemNativeID}
            onPress={handleOnLabelPress}
          >
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
})

FormCheckbox.displayName = "FormCheckbox"

export {
  Form,
  FormDatePicker,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormTextarea,
  FormSwitch,
  FormCheckbox,
  useFormField,
}
