import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text
} from "@chakra-ui/react"
import React from "react"
import { FormField } from "../../components"
import { Employee } from "../../models"

type FamilyChangesModalProps = {
  isFamilyOpen: boolean
  onFamilyClose: () => void
  employee: Employee
}

export const FamilyChangesModal: React.FC<FamilyChangesModalProps> = ({ isFamilyOpen, onFamilyClose, employee }) => {

  const addFamily = () => {}

  return (
    <Modal isOpen={isFamilyOpen} onClose={onFamilyClose} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="ash_gray" borderRadius={20} px={8}>
        <ModalHeader display="flex" alignItems="center" justifyContent="space-between" pr="3.5rem" fontSize="18px" pt={5}>
          <Text fontSize="24px" px={4}>Член семьи</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={10}>
          <Stack>
          <FormField
            label="Степень родства"
            name="nationality"
            tootlipLabel=""
          >
            <Select background="ash_grey" borderColor="#353535">
              <option>Иждевенец/ка</option>
              <option>Супруг</option>
              <option>Супруга</option>
            </Select>
          </FormField>
          
          <FormField
            label="Фамилия"
            name="nationality"
            tootlipLabel=""
          >
            <Input />
          </FormField>

          <FormField
            label="Имя"
            name="nationality"
            tootlipLabel=""
          >
            <Input />
          </FormField>

          <FormField
            label="Год рождения"
            name="nationality"
            tootlipLabel=""
          >
            <Input type="date" />
          </FormField>

          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => addFamily()}>Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}