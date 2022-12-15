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
import React from "react"
import { useNavigate } from "react-router-dom"

import { fireReasons } from "../../mocks/fireReasons"
import { Employee } from "../../models"
import { FormField } from "../form-field/form-field"

type RemoveModalProps = {
  isOpen: boolean
  onClose: () => void
  done: () => void
  employee: Employee
}

export const RemoveModal: React.FC<RemoveModalProps> = ({
  done,
  isOpen,
  onClose,
  employee,
}) => {
  const navigate = useNavigate()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent background="ash_gray">
        <ModalHeader>Увольнение сотрудника</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            <FormField
              label="Сотрудник"
              name="employee"
              tootlipLabel=""
            >
              <Input disabled value={employee.surname} />
            </FormField>
            <FormField
              label="Дата составления приказа"
              name="date"
              tootlipLabel=""
            >
              <Input type="date" />
            </FormField>
            <FormField
              label="Причина увольнения"
              name="employee"
              tootlipLabel=""
            >
              <Select defaultValue="0" background="ash_grey" borderColor="#353535">
                <option value="0" disabled>Выберите причину</option>
                {fireReasons.map((item) => (
                  <option>{item.reason}</option>
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
                <Button>Да</Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}