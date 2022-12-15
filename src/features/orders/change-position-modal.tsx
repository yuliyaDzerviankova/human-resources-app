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
import React from "react"
import { FormField } from "../../components"
import { departments } from "../../mocks/departments"
import { employees } from "../../mocks/employees"
import { positions } from "../../mocks/positions"

type ChangePositionModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ChangePositionModal: React.FC<ChangePositionModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent background="ash_gray">
        <ModalHeader>Смена должности</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            <FormField
              label="Сотрудник"
              name="employee"
              tootlipLabel=""
            >
              <Select defaultValue="0" background="ash_grey" borderColor="#353535">
                <option value="0" disabled>Выберите сотрудника</option>
                {employees.map((item) => (
                  <option>{item.surname}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Отдел"
              name="department"
              tootlipLabel=""
            >
              <Select defaultValue="0" background="ash_grey" borderColor="#353535">
                <option value="0" disabled>Выберите отдел</option>
                {departments.map((item) => (
                  <option>{item.name}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Должность"
              name="position"
              tootlipLabel="Новая должность совпадает с текущей"
            >
              <Select defaultValue="0" background="ash_grey" borderColor="#353535">
                <option value="0" disabled>Выберите должность</option>
                {positions.map((item) => (
                  <option>{item.name}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Дата составления приказа"
              name="date"
              tootlipLabel=""
            >
              <Input type="date" />
            </FormField>
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" justifyContent="flex-end">
          <Button onClick={onClose}>Изменить должность</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}