import { Button, Flex, Input, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Select, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageHeader, FormField } from "../../components"
import moment from "moment"
import { Employee } from "../../models"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EducationChangesModal } from "./EducationChangesModal"
import { Toaster } from "react-hot-toast"
import { initEmployee } from "../../mocks/initialModels/initEmployee"
import { PopToast } from "../../components/toaster/Toaster"
import { positions } from "../../mocks/positions"
import { departments } from "../../mocks/departments"
import { EmployeeContext } from "../providers/context"
import { Types } from "../providers/reducers"
import axios from "axios"
import { formatDate } from "../../constants"

type EmployeeType = {
  id: string
  surname: string
  firstName: string
  patronymic: string
  bDay: string
  mobPhone: string
  homePhone: string
  passportId: number
  actualAddress: string
  birthPlace: string
  dateReceipt: string
  nationality: string
  passportAddress: string
  passportNumber: string
  placeReceipt: string
  educationId: string
  educationKind: string
  institutionName: string
  documentName: string
  finishDate: string
  speciality: string
  department: string
  position: string
  offerDate: string
}

export const EmployeeChanges = () => {
  const params = useParams()
  const navigate = useNavigate()
  const format = "YYYY-MM-DD"
  const data = moment().format(format)
  const [isEdit, setIsEdit] = useState(false)
  const { isOpen: isEducationOpen, onOpen: onEducationOpen, onClose: onEducationClose } = useDisclosure()
  const [employee, setEmployee] = useState<Employee>(initEmployee)
  const { dispatch } = useContext(EmployeeContext)

  useEffect(() => {
    if (params.id) {
      axios(
        `http://localhost:8080/employees/${params.id}`,
        { headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          } }
      )
        .then((response) => {
          const data = response.data
          setEmployee(data)
          setIsEdit(true)
        })
        .catch((error) => console.log(error))
    }
  }, [params.id])

  const sendToPrint = () => {
    const object = getValues()
    // const position = positions.find((item) => item.id === object.position) as { id: string; name: string }
    // const department = departments.find((item) => item.id === object.department) as { id: string; name: string }
    const newEmployee = {
      employee: object.surname,
      // position: position.name,
      // department: department.name,
      date: data,
    }
    // @ts-ignore
    dispatch({ type: Types.SetNewEmployee, payload: { newEmployee } })
  }

  const schema = z.object({
    surname: z.string().nonempty(),
    firstName: z.string(),
    patronymic: z.string(),
    bDay: z.string().refine((val) => moment().diff(val, "years") >= 18 && moment().diff(val, "years") < 63, { message: "Возраст может быть от 18 до 63 лет" }),
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
    register,
    setValue,
    getValues,
  } = useForm<EmployeeType>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      surname: employee.surname ?? "",
      firstName: employee.firstName ?? "",
      patronymic: employee.patronymic ?? "",
      bDay: employee.bday ?? "",
      birthPlace: employee.passport.birthPlace ?? "",
      mobPhone: employee.mobPhone ?? "",
      homePhone:employee.homePhone ?? "",
      passportNumber: employee.passport.passportNumber ?? "",
      dateReceipt: employee.passport.dateReceipt ?? "",
      placeReceipt: employee.passport.placeReceipt ?? "",
      passportAddress: employee.passport.passportAddress ?? "",
      actualAddress: employee.passport.actualAddress ?? "",
      nationality: employee.passport.nationality ?? "",
      department: employee.department ?? "",
      position: employee.position ?? "",
      offerDate: employee.dateOfReceipt ?? "",
    },
  })

  const isInvalid = !isDirty || !isValid
  const formFieldProps = { errors, register }

  const addEmployee = () => {
    const object = getValues()
    const sendObject = {
      surname: object.surname,
      firstName: object.firstName,
      patronymic: object.patronymic,
      bday: object.bDay,
      mobPhone: object.mobPhone,
      homePhone: object.homePhone,
      passport: {
        actualAddress: object.actualAddress,
        birthPlace: object.birthPlace,
        dateReceipt: object.dateReceipt,
        nationality: object.nationality,
        passportAddress: object.passportAddress,
        passportNumber: object.passportNumber,
        placeReceipt: object.placeReceipt,
      },
      department: object.department,
      position: object.position,
      dateOfReceipt: data,
    }
    console.log(sendObject)
    axios.post("http://localhost:8080/employees/create", sendObject, { headers: {
        "Accept": "application/json, application/*+json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((res) => {
      PopToast("Сообщение", "Сотрудник добавлен", "success")
      sendToPrint()
      onEducationOpen()
    }).catch((err) => console.log(err))
    // TODO: добвление сотрудника
    // TODO: создание приказа (id = 1)
  }

  const editEmployee = () => {
    // TODO: редактирование сотрудника
    const object = getValues()
    const sendObject = {
      surname: object.surname,
      firstName: object.firstName,
      patronymic: object.patronymic,
      bday: object.bDay,
      mobPhone: object.mobPhone,
      homePhone: object.homePhone,
      passport: {
        actualAddress: object.actualAddress,
        birthPlace: object.birthPlace,
        dateReceipt: object.dateReceipt,
        nationality: object.nationality,
        passportAddress: object.passportAddress,
        passportNumber: object.passportNumber,
        placeReceipt: object.placeReceipt,
      }
    }
  }

  useEffect(() => {
    if (params.id && employee) {
      setIsEdit(true)
      setValue("firstName", employee.firstName)
      setValue("surname", employee.surname)
      setValue("patronymic", employee.patronymic)
      setValue("bDay", moment(employee.bday).format(format))
      setValue("birthPlace", employee.passport.birthPlace)
      setValue("mobPhone", employee.mobPhone)
      setValue("homePhone", employee.homePhone)
      setValue("passportNumber", employee.passport.passportNumber)
      setValue("dateReceipt", moment(employee.passport.dateReceipt).format(format))
      setValue("placeReceipt", employee.passport.placeReceipt)
      setValue("passportAddress", employee.passport.passportAddress)
      setValue("actualAddress", employee.passport.actualAddress)
      setValue("nationality", employee.passport.nationality)
      setValue("department", employee.department)
      setValue("position", employee.position)
      setValue("offerDate", moment(employee.dateOfReceipt).format(formatDate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee, params.id])
  
  return (
    <VStack align="start" p={4} flex={1}>
      <PageHeader
        title={!isEdit ? "Добавить сотрудника" : `Изменить сотрудника ${employee.surname}`}
      />
      <Flex width="100%" align="center" justify="flex-end" pr={4}>
        <Text fontWeight="bold" mr={4}>Дата приёма на работу: </Text>
        <Text>{isEdit ? moment(employee.dateOfReceipt).format(formatDate) : data}</Text>
      </Flex>
      <Flex flex={1} p={4} width="100%" justifyContent="space-between">
        <Stack spacing={4} width="45%">
          <FormField<EmployeeType>
            label="Фамилия"
            name="surname"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<EmployeeType>
            label="Имя"
            name="firstName"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<EmployeeType>
            label="Отчество"
            name="patronymic"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<EmployeeType>
            label="Дата Рождения"
            name="bDay"
            tootlipLabel={errors.bDay?.message || ""}
            {...formFieldProps}
          >
            <Input type="date" />
          </FormField>

          <FormField<EmployeeType>
            label="Место Рождения"
            name="birthPlace"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<EmployeeType>
            label="Мобильный номер"
            name="mobPhone"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<EmployeeType>
            label="Домашний номер"
            name="homePhone"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
        </Stack>

        <Stack spacing={4} width="45%">          
        <FormField<EmployeeType>
            label="Паспорт"
            name="passportNumber"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<EmployeeType>
            label="Когда выдан"
            name="dateReceipt"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input type="date" />
          </FormField>
          
          <FormField<EmployeeType>
            label="Кем выдан"
            name="placeReceipt"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
          
          <FormField<EmployeeType>
            label="Адреc прописки"
            name="passportAddress"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
          
          <FormField<EmployeeType>
            label="Адрес проживания"
            name="actualAddress"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>
          
          <FormField<EmployeeType>
            label="Гражданство"
            name="nationality"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<EmployeeType>
            label="Отдел"
            name="department"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Select disabled={isEdit} background="ash_grey" borderColor="#353535">
            <option value="" disabled>Выберите отдел</option>
              {departments.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Select>
          </FormField>

          <FormField<EmployeeType>
            label="Должность"
            name="position"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Select disabled={isEdit} background="ash_grey" borderColor="#353535">
              <option value="" disabled>Выберите должность</option>
              {positions.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Select>
          </FormField>
        </Stack>

      </Flex>

      <Flex align="center" justify="space-between" p={4} width="100%">
        <Button onClick={() => navigate("/home")}>
          Отменить
        </Button>
        {isEdit ? <Button onClick={editEmployee}>Изменить</Button> : (
          <Popover placement="left-start">
            <PopoverTrigger>
              {/*<Button disabled={isInvalid}>*/}
              <Button>Далее</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody display="flex" flexDirection="column">
                <Text mb={6}>Вы уверены, что хотите добавить сотрудника?</Text>
                <Flex flex={1} align="center" justify="space-between">
                  <Button onClick={() => navigate("/home")}>Нет</Button>
                  <Button onClick={() => addEmployee()}>Да</Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
      <EducationChangesModal
        employeeId={employee.id}
        isEducationOpen={isEducationOpen}
        onEducationClose={onEducationClose}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "green",
            color: "white",
          },
          success: {
            style: {
              background: "green",
              color: "white",
            }
          }
        }}
      />
    </VStack>
  )
}