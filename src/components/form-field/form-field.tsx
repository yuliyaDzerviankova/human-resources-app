import { Flex, FormControl, FormLabel, Tooltip } from "@chakra-ui/react"
import React, { cloneElement, PropsWithChildren, ReactElement } from "react"
import { Path, UseFormRegister } from "react-hook-form"

export type FormFieldProps<FieldValues = any> = {
  label: string
  tootlipLabel: string
  name: Path<FieldValues> | null
  // @ts-ignore
  register?: UseFormRegister<FieldValues>
  controlWidth?: string
}

export const FormField = <T, > ({
  name,
  label,
  tootlipLabel,
  register,
  children,
  controlWidth = "100%",
}: PropsWithChildren<FormFieldProps<T>>) => {
  return (
    <FormControl width={controlWidth}>
    <Flex direction="column">
      <FormLabel mb={2} color="charcoal">{label}</FormLabel>
      <Tooltip label={tootlipLabel} placement="left" hasArrow>
        {cloneElement(children as ReactElement, name && register ? register(name) : {})}
      </Tooltip>
    </Flex>
  </FormControl>
  )
}