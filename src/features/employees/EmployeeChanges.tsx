import {
  Button,
  Flex,
  Input,
  InputGroup, InputLeftAddon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
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
import { EmployeeContext } from "../providers/context"
import { Types } from "../providers/reducers"
import axios from "axios"
import { formatDate, newEmployeeOrder } from "../../constants"
import { EmployeeType, getEmployeeObject, sendToPrint } from "./employeeChangesUtils"

export const EmployeeChanges = () => {
  const params = useParams()
  const navigate = useNavigate()
  const format = "YYYY-MM-DD"
  const data = moment().format(format)
  const [isEdit, setIsEdit] = useState(false)
  const { isOpen: isEducationOpen, onOpen: onEducationOpen, onClose: onEducationClose } = useDisclosure()
  const [employee, setEmployee] = useState<Employee>(initEmployee)
  const { dispatch } = useContext(EmployeeContext)
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([])
  const [positions, setPositions] = useState<{ id: string; name: string }[]>([])
  const [document, setDocument] = useState<{ id: string; documentName: string }>({
    id: "",
    documentName: "",
  })

  useEffect(() => {
    if (params.id) {
      axios(`http://localhost:8080/employees/${params.id}`)
        .then((response) => {
          setEmployee(response.data)
          setIsEdit(true)
        })
        .catch((error) => console.log(error))
    }
  }, [params.id])

  const sendPrint = () => {
    const object = getValues()
    const newEmployee = sendToPrint(object, positions, departments)
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
    watch,
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
      department: employee.staffingTable.department.nameDepartment ?? "",
      position: employee.staffingTable.positions.positionName ?? "",
      offerDate: employee.dateOfReceipt ?? "",
    },
  })

  const watchDepartment = watch("department")
  const watchMobPhone = watch("mobPhone")
  const isInvalid = !isDirty || !isValid
  const formFieldProps = { errors, register }

  console.log(watchMobPhone)

  useEffect(() => {
    if (watchDepartment) {
      axios(`http://localhost:8080/positions/filter_by_department/${watchDepartment}`,)
        .then((res) => {
          const positions = res.data._embedded.positionsList
          // @ts-ignore
          const arr = positions.map((item) => ({ id: item.id, name: item.positionName }))
          setPositions(arr)
        })
        .catch((err) => console.log(err))
    }
  }, [watchDepartment])

  useEffect(() => {
    axios("http://localhost:8080/departments")
      .then((res) => {
        const departments = res.data._embedded.departmentList
        // @ts-ignore
        const arr = departments.map((item) => ({ id: item.id, name: item.nameDepartment }))
        setDepartments(arr)
      })
      .catch((err) => console.log(err))
    axios("http://localhost:8080/documents/1")
      .then((res) => {
        const document = {
          id: res.data.id,
          documentName: res.data.documentName,
        }
        setDocument(document)
      })
  }, [])

  const addEmployee = async () => {
    const object = getValues()
    const sendObject = await getEmployeeObject(object)

    const position = positions.find((item) => +item.id === +object.position) as { id: string; name: string }
    const department = departments.find((item) => +item.id === +object.department) as { id: string; name: string }
    const fio = `${sendObject.surname} ${sendObject.firstName.slice(0, 1)}.${sendObject.patronymic.slice(0, 1)}`
    const order = {
      dateOrder: data,
      info: newEmployeeOrder(fio, department.name, position.name),
      documents: document,
    }
    axios.post("http://localhost:8080/employees/create", sendObject).then((res) => {
      PopToast("Сообщение", "Сотрудник добавлен", "success")
      onEducationOpen()
      sendPrint()
      axios.post("http://localhost:8080/orders/create", order)
        .then((res) => console.log(res))
    }).catch((err) => {
      PopToast(err.message, err.response.data.error, "error")
    })
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
      setValue("department", employee.staffingTable.department.nameDepartment)
      setValue("position", employee.staffingTable.positions.positionName)
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
        <Text>{isEdit ? moment(employee.dateOfReceipt).format(formatDate) : moment(data).format(formatDate)}</Text>
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
            <InputGroup>
              <InputLeftAddon
                children="+375"
                background="white"
                borderWidth={1}
                borderColor="brown"
                height="44px"
              />
              <Input type="tel" maxLength={9} />
            </InputGroup>
          </FormField>

          <FormField<EmployeeType>
            label="Домашний номер"
            name="homePhone"
            tootlipLabel=""
            {...formFieldProps}
          >
            <InputGroup>
              <InputLeftAddon
                children="+375232"
                background="white"
                borderWidth={1}
                borderColor="brown"
                height="44px"
              />
              <Input type="tel" maxLength={6} />
            </InputGroup>
          </FormField>
        </Stack>

        <Stack spacing={4} width="45%">          
        <FormField<EmployeeType>
            label="Паспорт"
            name="passportNumber"
            tootlipLabel=""
            {...formFieldProps}
          >
          <InputGroup>
            <InputLeftAddon
              children="HB"
              background="white"
              borderWidth={1}
              borderColor="brown"
              height="44px"
            />
            <Input maxLength={7} />
          </InputGroup>
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
            <Select defaultValue="" disabled={isEdit} background="ash_grey" borderColor="#353535">
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
              <Button disabled={isInvalid}>Далее</Button>
              {/* <Button>Далее</Button> */}
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