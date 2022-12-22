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
  Stack,
  Text
} from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { FormField } from "../../components"
import { EducationKind, Employee, InstitutionName } from "../../models"

type EducationChangesModalProps = {
  employee: Employee
  isEducationOpen: boolean
  onEducationClose: () => void
}

export const EducationChangesModal: React.FC<EducationChangesModalProps> = ({
  isEducationOpen,
  onEducationClose,
  employee
}) => {
  const navigate = useNavigate()
  const educationKinds = [EducationKind.HIGH, EducationKind.MIDDLESRECIALITY, EducationKind.MIDDLE]
  const institutionNames = [InstitutionName.BSU, InstitutionName.BSUFK, InstitutionName.BSUIR, InstitutionName.GGAEK, InstitutionName.SKORINA]

  const addEducation = () => {
    onEducationClose()
  }

  return (
    <Modal isOpen={isEducationOpen} onClose={onEducationClose} size="3xl" isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="ash_gray" borderRadius={20} px={8}>
        <ModalHeader display="flex" alignItems="center" justifyContent="space-between" pr="3.5rem" fontSize="18px" pt={5}>
          <Text fontSize="24px" px={4}>Образование сотрудника</Text>
        </ModalHeader>
        <ModalBody px={10}>
          <Stack>
          <FormField
            label="Образование"
            name="nationality"
            tootlipLabel="Невозможно выбрать данное образование"
          >
            <Select background="ash_grey" borderColor="#353535">
              {educationKinds.map((kind) => (
                <option key={kind}>{kind}</option>
              ))}
            </Select>
          </FormField>
          
          <FormField
            label="Название заведения"
            name="nationality"
            tootlipLabel=""
          >
            <Select background="ash_grey" borderColor="#353535">
              {institutionNames.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </Select>
          </FormField>

          <FormField
            label="Документ"
            name="nationality"
            tootlipLabel=""
          >
            <Input disabled defaultValue="Диплом" />
          </FormField>

          <FormField
            label="Дата окончания"
            name="nationality"
            tootlipLabel=""
          >
            <Input type="date" />
          </FormField>

          <FormField
            label="Специальность"
            name="nationality"
            tootlipLabel=""
          >
            <Input />
          </FormField>

          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              addEducation()
              onEducationClose()
              navigate("/printNewEmployee")
            }}
          >Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}