import {Stack, Flex, Text, Button} from "@chakra-ui/react"
import React from "react"
import { Employee } from "../../models"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

type GeneralInfoProps = {
  onOpen: () => void
  employee: Employee
}

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ employee, onOpen }) => {
  const navigate = useNavigate()

  return (
    <Stack flex={1} height="100%">
      <Stack spacing={3} flex={1} display="flex" justifyContent="space-between" direction="row" pt={10}>
        <Stack spacing={6} width="35%">
          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Фамилия:</Text>
            <Text>{employee.surname}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Имя:</Text>
            <Text>{employee.firstName}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Отчество:</Text>
            <Text>{employee.patronymic}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Дата рождения:</Text>
            <Text>{employee.bDay}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Место рождения:</Text>
            <Text>{employee.birthPlace}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Мобильный номер:</Text>
            <Text>{employee.mobPhone}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Домашний номер:</Text>
            <Text>{employee.homePhone}</Text>
          </Flex>
        </Stack>

        <Stack spacing={6} width="50%">
          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Паспорт:</Text>
            <Text>{employee.passportNumber}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Кем выдан:</Text>
            <Text>{employee.placeReceipt}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Когда выдан:</Text>
            <Text>{employee.dateReceipt}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Адрес прописки:</Text>
            <Text>{employee.passportAddress}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Адрес проживания:</Text>
            {/* <Text textAlign="right">{("г. Гомель, ул. Жемчужная 22/3").slice(0, 20)}</Text> */}
            <Text textAlign="right">{employee.actualAddress}</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Гражданство:</Text>
            <Text>{employee.nationality}</Text>
          </Flex>
        </Stack>
      </Stack>

      <Flex flex={1} align="flex-end" justify="space-between" width="100%">
        <Flex align="center">
          <Button mr={6} onClick={onOpen}>Уволить сотрудника</Button>
          <Button onClick={() => navigate(`/editEmployee/${employee.id}`)}>Изменить данные</Button>
        </Flex>
        <Button leftIcon={<FontAwesomeIcon icon={faPrint} />}>Печать личной карточки</Button>
      </Flex>
    </Stack>
  )
}