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
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FormField } from "../../components"
import { departments } from "../../mocks/departments"
import { positions } from "../../mocks/positions"
import { EmployeeContext } from "../providers/context"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Types } from "../providers/reducers"

type NewStaffTableModalProps = {
  isOpen: boolean
  onClose: () => void
}

type NewStaffTable = {
  positionId: string
  rank: string
  salary: string
  departmentId: string
  staffDate: string
}

export const NewStaffTableModal: React.FC<NewStaffTableModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { dispatch } = useContext(EmployeeContext)

  const schema = z.object({
    positionId: z.string(),
    rank: z.string(),
    salary: z.string(),
    departmentId: z.string(),
    staffDate: z.string(),
  })

  const {
    formState: { errors },
    register,
    getValues,
  } = useForm<NewStaffTable>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      positionId: "",
      rank: "",
      salary: "",
      departmentId: "",
      staffDate: "",
    }
  })

  const formFieldProps = { errors, register }

  const printOrder = () => {
    const newStaffTable = getValues()
    // @ts-ignore
    dispatch({ type: Types.SetNewStaffTable, payload: { newStaffTable } })
    navigate("/printStaffTable")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent background="ash_gray">
        <ModalHeader>Добавление штатной единицы</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            <FormField
              label="Должность"
              name="positionId"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Select background="ash_grey" borderColor="#353535">
                <option value="" disabled>Выберите должность</option>
                {positions.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Разряд"
              name="rank"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Input min={1} max={27} step={1} type="number" />
            </FormField>
            <FormField
              label="Оклад"
              name="salary"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Input />
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
                  <option key={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Дата составления приказа"
              name="staffDate"
              tootlipLabel=""
              {...formFieldProps}
            >
              <Input type="date" />
            </FormField>
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" justifyContent="flex-end">
          <Button onClick={printOrder}>Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}