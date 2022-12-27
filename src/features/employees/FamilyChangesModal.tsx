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
import React, { useEffect } from "react"
import { FormField } from "../../components"
import { Employee } from "../../models"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "moment"
import { formatDateForInput } from "../../constants"

type FamilyChangesModalProps = {
  isFamilyOpen: boolean
  onFamilyClose: () => void
  employee: Employee
}

type Family = {
  relationDegree: string
  surname: string
  firstName: string
  bDay: string
}

export const FamilyChangesModal: React.FC<FamilyChangesModalProps> = ({ isFamilyOpen, onFamilyClose, employee }) => {
  const schema = z.object({
    relationDegree: z.string(),
    surname: z.string(),
    firstName: z.string(),
    bDay: z.string()
  })

  const {
    formState: { errors },
    register,
    setValue,
  } = useForm<Family>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      relationDegree: "",
      surname: "",
      firstName: "",
      bDay: "",
    }
  })

  useEffect(() => {
    setValue("bDay", moment().format(formatDateForInput))
  }, [])

  const formFieldProps = { errors, register }

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
          <FormField<Family>
            label="Степень родства"
            name="relationDegree"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Select background="ash_grey" borderColor="#353535">
              <option>Иждевенец/ка</option>
              <option>Супруг</option>
              <option>Супруга</option>
            </Select>
          </FormField>
          
          <FormField<Family>
            label="Фамилия"
            name="surname"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Family>
            label="Имя"
            name="firstName"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          <FormField<Family>
            label="Год рождения"
            name="bDay"
            tootlipLabel={errors.bDay?.message || ""}
            {...formFieldProps}
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