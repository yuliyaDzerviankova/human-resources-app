import {
  Button,
  Input,
  Modal,
  ModalBody, ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text
} from "@chakra-ui/react"
import React, { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { FormField } from "../../components"
import { EducationKind } from "../../models"
import axios from "axios"
import * as z from "zod"
import { useForm } from "react-hook-form"
import moment from "moment"
import { zodResolver } from "@hookform/resolvers/zod/dist/zod"
import { formatDateForInput } from "../../constants"

type EducationChangesModalProps = {
  employeeId: number
  isEdit?: boolean
  isEducationOpen: boolean
  onEducationClose: () => void
}

type EducationType = {
  educationKind: string
  institutionName: string
  documentName: string
  finishDate: string
  speciality: string
}

export const EducationChangesModal: React.FC<EducationChangesModalProps> = ({
  isEdit = false,
  employeeId,
  isEducationOpen,
  onEducationClose,
}) => {
  const navigate = useNavigate()
  const [establishments, setEstablishments] = useState<{ id: string; name: string }[]>([])
  const educationKinds = [EducationKind.HIGH, EducationKind.MIDDLESRECIALITY, EducationKind.PROFESSIONAL]

  const schema = z.object({
    educationKind: z.string(),
    institutionName: z.string(),
    documentName: z.string(),
    finishDate: z.string(),
    speciality: z.string(),
  })

  const {
    formState: { errors, isDirty, isValid },
    watch,
    register,
    setValue,
    getValues,
  } = useForm<EducationType>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      educationKind: "",
      institutionName: "",
      documentName: "Диплом",
      finishDate: "",
      speciality: "",
    },
  })

  const watchEducation = watch("educationKind")
  const isInvalid = !isDirty || !isValid
  const formFieldProps = { errors, register }

  const addEducation = () => {
    const education = {
      employeeId: employeeId,
      ...getValues(),
    }
    console.log(education)
    if (isEdit) {
      onEducationClose()
    } else {
      onEducationClose()
      navigate("/printNewEmployee")
    }
    // TODO: добавление образование
  }

  useEffect(() => {
    setValue("finishDate", moment().format(formatDateForInput))
  }, [])

  useEffect(() => {
    if (watchEducation === EducationKind.HIGH) {
      axios(
        "http://localhost:8080/universities",
        { headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          } }
      )
        .then((response) => {
          const data = response.data._embedded.universitiesList
          setEstablishments(data.map((item: { id: string, universityName: string }) => ({ id: item.id, name: item.universityName })))
        })
        .catch((error) => console.log(error))
    } else {
      axios(
        "http://localhost:8080/colleges",
        { headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          } }
      )
        .then((response) => {
          const data = response.data._embedded.collegesList
          setEstablishments(data.map((item: { id: string, collegeName: string }) => ({ id: item.id, name: item.collegeName })))
        })
        .catch((error) => console.log(error))
    }
  }, [watchEducation])

  return (
    <Modal isOpen={isEducationOpen} onClose={onEducationClose} size="3xl" isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="ash_gray" borderRadius={20} px={8}>
        {isEdit && <ModalCloseButton />}
        <ModalHeader display="flex" alignItems="center" justifyContent="space-between" pr="3.5rem" fontSize="18px" pt={5}>
          <Text fontSize="24px" px={4}>Образование сотрудника</Text>
        </ModalHeader>
        <ModalBody px={10}>
          <Stack>
          <FormField<EducationType>
            label="Образование"
            name="educationKind"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Select background="ash_grey" borderColor="#353535">
              <option value="" disabled>Выберите образование</option>
              {educationKinds.map((kind) => (
                <option key={kind} onClick={() => console.log(kind)}>{kind}</option>
              ))}
            </Select>
          </FormField>
          
          <FormField<EducationType>
            label="Название заведения"
            name="institutionName"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Select background="ash_grey" defaultValue="" borderColor="#353535">
              <option value="" disabled>Выберите заведение</option>
              {establishments.map((item) => (
                <option key={item.name} value={item.id}>{item.name}</option>
              ))}
            </Select>
          </FormField>

          <FormField<EducationType>
            label="Документ"
            name="documentName"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input disabled defaultValue="Диплом" />
          </FormField>

          <FormField<EducationType>
            label="Дата окончания"
            name="finishDate"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input type="date" />
          </FormField>

          <FormField<EducationType>
            label="Специальность"
            name="speciality"
            tootlipLabel=""
            {...formFieldProps}
          >
            <Input />
          </FormField>

          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={addEducation}
          >Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}