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
import axios from "axios"
import moment from "moment";
import { formatDate, newStaffTableOrder } from "../../constants"

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
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([])
  const [positions, setPositions] = useState<{ id: string; name: string }[]>([])
  const [document, setDocument] = useState<{ id: string; documentName: string }>({
    id: "",
    documentName: "",
  })

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
      staffDate: moment().format("MM/DD/YYYY"),
    }
  })

  const formFieldProps = { errors, register }

  useEffect(() => {
    axios("http://localhost:8080/documents/4")
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
    axios("http://localhost:8080/positions")
      .then((res) => {
        const positions = res.data._embedded.positionsList
        // @ts-ignore
        const arr = positions.map((item) => ({ id: item.id, name: item.positionName }))
        setPositions(arr)
      })
      .catch((err) => console.log(err))
  }, [])

  const newStaffTable = () => {
    const position = positions.find((item) => +item.id === +getValues().positionId) as { id: string; name: string }
    const department = departments.find((item) => +item.id === +getValues().departmentId) as { id: string; name: string }
    const order = {
      dateOrder: moment(getValues().staffDate).format("YYYY-MM-DD"),
      info: newStaffTableOrder(department.name, position.name),
      documents: document,
    }
    axios.post("http://localhost:8080/orders/create", order)
      .then((res) => printOrder())
  }

  const printOrder = () => {
    const position = positions.find((item) => +item.id === +getValues().positionId) as { id: string; name: string }
    const department = departments.find((item) => +item.id === +getValues().departmentId) as { id: string; name: string }
    const newStaffTable = {
      ...getValues(),
      positionId: position.name,
      departmentId: department.name,
    }
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
                  <option key={item.id} value={item.id}>{item.name}</option>
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
                  <option key={item.id} value={item.id}>{item.name}</option>
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
          <Button onClick={newStaffTable}>Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}