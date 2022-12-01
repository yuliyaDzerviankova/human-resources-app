import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { Employee } from "../home/Home"

type EmployeeCardProps = {
  isOpen: boolean
  onClose: () => void
  employee: Employee
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ isOpen, onClose, employee }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="ash_gray" borderRadius={20}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />

        <ModalBody display="flex" justifyContent="space-between" px={10}>
          <Stack spacing={3} flex={1}>
            <Heading>Общие данные</Heading>
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
              <Text fontWeight="bold">Гражданство:</Text>
              <Text>Беларусь</Text>
            </Flex>

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
              <Text fontWeight="bold">Фактический адрес</Text>
              {/* <Text textAlign="right">{("г. Гомель, ул. Жемчужная 22/3").slice(0, 20)}</Text> */}
              <Text textAlign="right">г. Гомель, ул. Жемчужная 22/3</Text>
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

          <Stack spacing={8} flex={1} ml={10}>
            <Stack spacing={3}>
              <Heading>Образование</Heading>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Образование:</Text>
                <Text>Среднее специальное</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Название заведения:</Text>
                <Text>ГГАЭК</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Документ:</Text>
                <Text>Диплом</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Дата окончания:</Text>
                <Text>30/06/2020</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Специальность</Text>
                <Text>Техник-программист</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Отдел:</Text>
                <Text>Отдел кадров</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Должность:</Text>
                <Text>Директор</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Дата составления приказа</Text>
                <Text>01/01/2021</Text>
              </Flex>
            </Stack>

            <Stack spacing={3}>
              <Heading>Семья</Heading>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Фамилия:</Text>
                <Text>Шишкова</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Имя:</Text>
                <Text>Валентина</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Дата рождения:</Text>
                <Text>13/02/2001</Text>
              </Flex>

              <Flex flex={1} justify="space-between">
                <Text fontWeight="bold">Статус:</Text>
                <Text>Супруга</Text>
              </Flex>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Flex align="center" flex={1} justify="flex-end">
            <Button leftIcon={<FontAwesomeIcon icon={faPrint} />}>Печать личной карточки</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}