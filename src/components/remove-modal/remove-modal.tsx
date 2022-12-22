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
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { EmployeeContext } from "../../features/providers/context"
import { employees } from "../../mocks/employees"

import { fireReasons } from "../../mocks/fireReasons"
import { Employee } from "../../models"
import { FormField } from "../form-field/form-field"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Types } from "../../features/providers/reducers"

type RemoveModalProps = {
  isOpen: boolean
  onClose: () => void
  employee: Employee
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
  employee,
  isFromOrder = false,
}) => {
  const navigate = useNavigate()
  const { dispatch } = useContext(EmployeeContext)

  const schema = z.object({
    employeeId: z.string(),
    fireDate: z.string(),
    reasonId: z.string()
  })

  const {
    formState: { errors },
    register,
    getValues,
  } = useForm<FiredEmployee>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      employeeId: "",
      fireDate: "",
      reasonId: "",
    }
  })

  const formFieldProps = { errors, register }

  const printOrder = () => {
    const firedEmployee = getValues()
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
                    <option key={item.id}>{item.surname}</option>
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
              <Select defaultValue="0" background="ash_grey" borderColor="#353535">
                <option value="0" disabled>Выберите причину</option>
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
                <Button onClick={printOrder}>Да</Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}