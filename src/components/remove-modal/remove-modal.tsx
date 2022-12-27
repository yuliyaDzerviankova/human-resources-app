import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Text
} from "@chakra-ui/react"
import React, {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { EmployeeContext } from "../../features/providers/context"

import { fireReasons } from "../../mocks/fireReasons"
import { Employee } from "../../models"
import { FormField } from "../form-field/form-field"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Types } from "../../features/providers/reducers"
import { firedEmployeeOrder, formatDateForInput } from "../../constants"
import axios from "axios"
import { initEmployee } from "../../mocks/initialModels/initEmployee"
import moment from "moment";

type RemoveModalProps = {
  isOpen: boolean
  onClose: () => void
  isFromOrder?: boolean
}

type FiredEmployee = {
  employeeId: string
  fireDate: string
  reasonId: string
}

export const RemoveModal: React.FC<RemoveModalProps> = ({
  isOpen,
  onClose,
  isFromOrder = false,
}) => {
  const navigate = useNavigate()
  const { dispatch } = useContext(EmployeeContext)
  const [employees, setEmployees] = useState<{ id: string; surname: string }[]>([])
  const [employee, setEmployee] = useState<Employee>(initEmployee)
  const [document, setDocument] = useState<{ id: string; documentName: string }>({
    id: "",
    documentName: "",
  })

  const schema = z.object({
    employeeId: z.string(),
    fireDate: z.string(),
    reasonId: z.string()
  })

  const {
    formState: { errors },
    register,
    getValues,
    watch,
    setValue,
  } = useForm<FiredEmployee>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      employeeId: "",
      fireDate: "",
      reasonId: "",
    }
  })

  useEffect(() => {
    setValue("fireDate", moment().format(formatDateForInput))
  }, [])

  const watchEmployee = watch("employeeId")
  const formFieldProps = { errors, register }

  useEffect(() => {
    axios("http://localhost:8080/employees")
      .then((res) => {
        const employees = res.data._embedded.employeeList.map((item: Employee) => ({ id: item.id, surname: item.surname }))
        setEmployees(employees)
      })
    axios("http://localhost:8080/documents/2")
      .then((res) => {
        const document = {
          id: res.data.id,
          documentName: res.data.documentName,
        }
        setDocument(document)
      })
  }, [])

  useEffect(() => {
    if (watchEmployee) {
      axios(`http://localhost:8080/employees/${watchEmployee}`)
        .then((res) => setEmployee(res.data))
    }
  }, [watchEmployee])

  const firedEmployee = () => {
    const fio = `${employee.surname} ${employee.firstName.slice(0, 1)}.${employee.patronymic.slice(0, 1)}.`
    const order = {
      dateOrder: moment(getValues().fireDate).format("YYYY-MM-DD"),
      info: firedEmployeeOrder(fio, getValues().reasonId),
      documents: document,
    }
    axios.delete(`http://localhost:8080/employees/delete/${employee.id}`)
      .then(() => {
        axios.post(
          "http://localhost:8080/firedEmployees/create",
          {
            fio,
            info: getValues().reasonId,
          }
        ).then(() => {
          axios.post("http://localhost:8080/orders/create", order)
            .then(() => printOrder())
        })
      })
  }

  const printOrder = () => {
    const firedEmployee = {
      ...getValues(),
      employeeId: `${employee.surname} ${employee.firstName.slice(0, 1)}.${employee.patronymic.slice(0, 1)}.`,
    }
    // @ts-ignore
    dispatch({ type: Types.SetFiredEmployee, payload: { firedEmployee } })
    navigate("/printFiredEmployee")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent background="ash_gray">
        <ModalHeader>Увольнение сотрудника</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            <FormField
              label="Сотрудник"
              name="employeeId"
              tootlipLabel=""
              {...formFieldProps}
            >
              {isFromOrder ? (
                <Select background="ash_grey" borderColor="#353535">
                  <option value="" disabled>Выберите сотрудника</option>
                  {employees.map((item) => (
                    <option key={item.id} value={item.id}>{item.surname}</option>
                  ))}
                </Select>
                ) : (
                  <Input disabled value={employee.surname} />
                )
              }
            </FormField>
            <FormField
              label="Дата составления приказа"
              name="fireDate"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Input type="date" />
            </FormField>
            <FormField
              label="Причина увольнения"
              name="reasonId"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Select background="ash_grey" borderColor="#353535">
                <option value="" disabled>Выберите причину</option>
                {fireReasons.map((item) => (
                  <option key={item.id}>{item.reason}</option>
                ))}
              </Select>
            </FormField>
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" justifyContent="space-between">
          <Button onClick={onClose}>Отменить</Button>
          <Popover placement="left">
          <PopoverTrigger>
            <Button>
              Уволить
          </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody display="flex" flexDirection="column">
              <Text mb={6}>Вы уверены, что хотите уволить этого сотрудника?</Text>
              <Flex flex={1} align="center" justify="space-between">
                <Button
                  onClick={() => {
                    navigate("/home")
                    onClose()
                  }}
                >
                  Нет
                </Button>
                <Button onClick={firedEmployee}>Да</Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}