import { Button, Flex, Input, Stack, VStack } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { FormField } from "../../../components/form-field/form-field"
import { PageHeader } from "../../../components/page-header/PageHeader"

export const AddEmployee = () => {
  const navigate = useNavigate()

  return (
    <VStack align="start" p={4} flex={1}>
      <PageHeader
        title="Добавить сотрудника"
      />
      <Stack flex={1} p={4} width="100%">
        <FormField
          label="Фамилия"
          name="surname"
          tootlipLabel=""
        >
          <Input width="50%" />
        </FormField>

        <FormField
          label="Имя"
          name="firstName"
          tootlipLabel=""
        >
          <Input width="50%" />
        </FormField>

        <FormField
          label="Отчество"
          name="patronymic"
          tootlipLabel=""
        >
          <Input width="50%" />
        </FormField>
      </Stack>

      <Flex align="center" gridGap="48px" justify="flex-start" p={4}>
        <Button>
          Добавить
        </Button>
        <Button onClick={() => navigate("/home")}>
          Отменить
        </Button>
      </Flex>
    </VStack>
  )
}