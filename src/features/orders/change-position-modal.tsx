import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack
} from "@chakra-ui/react"
import React, {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { FormField } from "../../components"
import { EmployeeContext } from "../providers/context"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Types } from "../providers/reducers"
import { Employee } from "../../models";
import { initEmployee } from "../../mocks/initialModels/initEmployee"
import axios from "axios"
import moment from "moment/moment"
import { changePositionOrder } from "../../constants"

type ChangePositionModalProps = {
  isOpen: boolean
  onClose: () => void
}

type ChangePosition = {
  employeeId: string
  departmentId: string
  positionId: string
  orderDate: string
}

export const ChangePositionModal: React.FC<ChangePositionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { dispatch } = useContext(EmployeeContext)
  const [employees, setEmployees] = useState<{ id: string; surname: string }[]>([])
  const [employee, setEmployee] = useState<Employee>(initEmployee)
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([])
  const [positions, setPositions] = useState<{ id: string; name: string }[]>([])
  const [document, setDocument] = useState<{ id: string; documentName: string }>({
    id: "",
    documentName: "",
  })

  const schema = z.object({
    employeeId: z.string(),
    departmentId: z.string(),
    positionId: z.string(),
    orderDate: z.string()
  })

  const {
    formState: { errors },
    register,
    getValues,
    watch,
  } = useForm<ChangePosition>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      employeeId: "",
      departmentId: "",
      positionId: "",
      orderDate: "",
    }
  })

  const watchDepartment = watch("departmentId")
  const watchEmployee = watch("employeeId")
  const formFieldProps = { errors, register }

  useEffect(() => {
    axios("http://localhost:8080/employees")
      .then((res) => {
        const employees = res.data._embedded.employeeList.map((item: Employee) => ({ id: item.id, surname: item.surname }))
        setEmployees(employees)
      })
    axios("http://localhost:8080/documents/3")
      .then((res) => {
        const document = {
          id: res.data.id,
          documentName: res.data.documentName,
        }
        setDocument(document)
      })
    axios("http://localhost:8080/departments")
      .then((res) => {
        const departments = res.data._embedded.departmentList
        // @ts-ignore
        const arr = departments.map((item) => ({ id: item.id, name: item.nameDepartment }))
        setDepartments(arr)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (watchEmployee) {
      axios(`http://localhost:8080/employees/${watchEmployee}`)
        .then((res) => setEmployee(res.data))
    }
  }, [watchEmployee])

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

  const changedPosition = () => {
    const position = positions.find((item) => +item.id === +getValues().positionId) as { id: string; name: string }
    const department = departments.find((item) => +item.id === +getValues().departmentId) as { id: string; name: string }
    const fio = `${employee.surname} ${employee.firstName.slice(0, 1)}.${employee.patronymic.slice(0, 1)}.`
    const order = {
      dateOrder: moment(getValues().orderDate).format("YYYY-MM-DD"),
      info: changePositionOrder(fio, department.name, position.name),
      documents: document,
    }
    axios.post("http://localhost:8080/orders/create", order)
      .then((res) => printOrder())
  }

  const printOrder = () => {
    const position = positions.find((item) => +item.id === +getValues().positionId) as { id: string; name: string }
    const department = departments.find((item) => +item.id === +getValues().departmentId) as { id: string; name: string }
    const changePosition = {
      ...getValues(),
      employeeId: `${employee.surname} ${employee.firstName.slice(0, 1)}.${employee.patronymic.slice(0, 1)}.`,
      departmentId: department.name,
      positionId: position.name,
    }
    // @ts-ignore
    dispatch({ type: Types.SetChangePosition, payload: { changePosition } })
    navigate("/printChangePosition")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent background="ash_gray">
        <ModalHeader>Смена должности</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            <FormField
              label="Сотрудник"
              name="employeeId"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Select background="ash_grey" borderColor="#353535">
                <option value="" disabled>Выберите сотрудника</option>
                {employees.map((item) => (
                  <option key={item.id} value={item.id}>{item.surname}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Отдел"
              name="departmentId"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Select background="ash_grey" borderColor="#353535">
                <option value="" disabled>Выберите отдел</option>
                {departments.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Должность"
              name="positionId"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Select background="ash_grey" borderColor="#353535">
                <option value="" disabled>Выберите должность</option>
                {positions.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Дата составления приказа"
              name="orderDate"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Input type="date" />
            </FormField>
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" justifyContent="flex-end">
          <Button onClick={changedPosition}>Изменить должность</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}