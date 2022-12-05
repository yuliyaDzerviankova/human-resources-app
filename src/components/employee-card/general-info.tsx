import {Stack, Flex, Text, Button} from "@chakra-ui/react"
import React from "react"
import { Employee } from "../../models"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";

type GeneralInfoProps = {
  employee: Employee
}

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ employee }) => {
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
            <Text>16/09/2000</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Место рождения:</Text>
            <Text>г. Гомель</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Мобильный номер:</Text>
            <Text>+375447282024</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Домашний номер:</Text>
            <Text>+375232311779</Text>
          </Flex>
        </Stack>

        <Stack spacing={6} width="50%">
          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Паспорт:</Text>
            <Text>HB2589765</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Кем выдан:</Text>
            <Text>Железнодорожное РОВД</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Когда выдан:</Text>
            <Text>16/09/2016</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Адрес прописки:</Text>
            <Text>г. Гомель, ул. Жемчужная 22/3</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Фактический адрес:</Text>
            {/* <Text textAlign="right">{("г. Гомель, ул. Жемчужная 22/3").slice(0, 20)}</Text> */}
            <Text textAlign="right">г. Гомель, ул. Жемчужная 22/3</Text>
          </Flex>

          <Flex flex={1} justify="space-between">
            <Text fontWeight="bold">Гражданство:</Text>
            <Text>Беларусь</Text>
          </Flex>
        </Stack>
      </Stack>

      <Flex flex={1} align="flex-end" justify="space-between" width="100%">
        <Flex align="center">
          <Button mr={6}>Уволить сотрудника</Button>
          <Button>Изменить данные</Button>
        </Flex>
        <Button leftIcon={<FontAwesomeIcon icon={faPrint} />}>Печать личной карточки</Button>
      </Flex>
    </Stack>
  )
}