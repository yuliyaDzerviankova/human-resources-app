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
import { positions } from "../../mocks/positions"

type NewEmployeeModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent background="ash_gray">
        <ModalHeader>Добавление штатной единицы</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            <FormField
              label="Должность"
              name="position"
              tootlipLabel=""
            >
              <Select defaultValue="0" background="ash_grey" borderColor="#353535">
                <option value="0" disabled>Выберите должность</option>
                {positions.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Разряд"
              name="position"
              tootlipLabel=""
            >
              <Input min={1} max={27} step={1} type="number" />
            </FormField>
            <FormField
              label="Оклад"
              name="position"
              tootlipLabel=""
            >
              <Input />
            </FormField>
            <FormField
              label="Отдел"
              name="department"
              tootlipLabel=""
            >
              <Select defaultValue="0" background="ash_grey" borderColor="#353535">
                <option value="0" disabled>Выберите отдел</option>
                {departments.map((item) => (
                  <option key={item.id}>{item.name}</option>
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
          <Button onClick={onClose}>Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}