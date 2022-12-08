import { Button, Flex, Input, Select, Stack, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FormField } from "../../components/form-field/form-field"
import { PageHeader } from "../../components/page-header/PageHeader"
import moment from "moment"
import { employees } from "../../mocks/employees"
import { Employee } from "../../models"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const EmployeeChanges = () => {
  const params = useParams()
  const navigate = useNavigate()
  const data = moment().format("DD/MM/YYYY")
  const [employee, setEmployee] = useState<Employee>({
    id: "",
    surname: "",
    firstName: "",
    patronymic: "",
    bDay: "",
    birthPlace: "",
    mobPhone: "",
    homePhone: "",
    passportNumber: "",
    dateReceipt: "",
    placeReceipt: "",
    passportAddress: "",
    actualAddress: "",
    nationality: "",
    department: "",
    position: "",
    offerDate: "",
  })

  useEffect(() => {
    const employee = employees.find((employee) => employee.id === params.id) as Employee
    setEmployee(employee)
  }, [params.id])

  console.log(employee)

  const schema = z.object({
    surname: z.string(),
    firstName: z.string(),
    patronymic: z.string(),
    bDay: z.string(),
    birthPlace: z.string(),
    mobPhone: z.string(),
    homePhone: z.string(),
    passportNumber: z.string(),
    dateReceipt: z.string(),
    placeReceipt: z.string(),
    passportAddress: z.string(),
    actualAddress: z.string(),
    nationality: z.string(),
    department: z.string(),
    position: z.string(),
    offerDate: z.string(),
  })

  const {
    formState: { errors, isDirty, isValid },
    getValues,
    register,
    setValue,
  } = useForm<Employee>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      surname: employee.surname ?? "",
      firstName: employee.firstName ?? "",
      patronymic: employee.patronymic ?? "",
      bDay: employee.bDay ?? "",
      birthPlace: employee.birthPlace ?? "",
      mobPhone: employee.mobPhone ?? "",
      homePhone:employee.homePhone ?? "",
      passportNumber: employee.passportNumber ?? "",
      dateReceipt: employee.dateReceipt ?? "",
      placeReceipt: employee.placeReceipt ?? "",
      passportAddress: employee.passportAddress ?? "",
      actualAddress: employee.actualAddress ?? "",
      nationality: employee.nationality ?? "",
      department: employee.department ?? "",
      position: employee.position ?? "",
      offerDate: employee.offerDate ?? "",
    },
  })

  const isInvalid = !isDirty || !isValid
  const formFieldProps = { errors, register }

  useEffect(() => {
    if (params.id && employee) {
      setValue("firstName", employee.firstName)
      setValue("surname", employee.surname)
      setValue("patronymic", employee.patronymic)
      setValue("bDay", employee.bDay)
      setValue("birthPlace", employee.birthPlace)
      setValue("mobPhone", employee.mobPhone)
      setValue("homePhone", employee.homePhone)
      setValue("passportNumber", employee.passportNumber)
      setValue("dateReceipt", employee.dateReceipt)
      setValue("placeReceipt", employee.placeReceipt)
      setValue("passportAddress", employee.passportAddress)
      setValue("actualAddress", employee.actualAddress)
      setValue("nationality", employee.nationality)
      setValue("department", employee.department)
      setValue("position", employee.position)
      setValue("offerDate", employee.offerDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee, params.id])
  
  return (
    <VStack align="start" p={4} flex={1}>
      <PageHeader
      title="Изменить сотрудника"
        // title={`${params.id ? "Добавить" : "Изменить"} сотрудника`}
      />
      <Flex width="100%" align="center" justify="flex-end" pr={4}>
        <Text fontWeight="bold" mr={4}>Дата приёма на работу: </Text>
        <Text>{params.id ? employee.offerDate : data}</Text>
      </Flex>
      <Flex flex={1} p={4} width="100%" justifyContent="space-between">
        <Stack spacing={4} width="45%">
          <FormField<Employee>
            label="Фамилия"
            name="surname"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Имя"
            name="firstName"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Отчество"
            name="patronymic"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Дата Рождения"
            name="bDay"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Место Рождения"
            name="bDay"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Мобильный номер"
            name="mobPhone"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Домашний номер"
            name="homePhone"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
        </Stack>

        <Stack spacing={4} width="45%">          
        <FormField<Employee>
            label="Паспорт"
            name="passportNumber"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Когда выдан"
            name="dateReceipt"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
          
          <FormField<Employee>
            label="Кем выдан"
            name="placeReceipt"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
          
          <FormField<Employee>
            label="Адреc прописки"
            name="passportAddress"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
          
          <FormField<Employee>
            label="Адрес проживания"
            name="actualAddress"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
          
          <FormField<Employee>
            label="Гражданство"
            name="nationality"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Employee>
            label="Отдел"
            name="department"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Select disabled background="ash_grey" borderColor="#353535">
              <option>Тестирования</option>
              <option>Разработки</option>
            </Select>
          </FormField>

          <FormField<Employee>
            label="Должность"
            name="position"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Select background="ash_grey" borderColor="#353535">
              <option selected>Тестировщик</option>
              <option>Разработчик</option>
            </Select>
          </FormField>
        </Stack>

      </Flex>

      <Flex align="center" gridGap="48px" justify="flex-start" p={4}>
        <Button disabled={isInvalid}>
          Далее
        </Button>
        <Button onClick={() => navigate("/home")}>
          Отменить
        </Button>
      </Flex>
    </VStack>
  )
}