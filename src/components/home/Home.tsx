import React, { useState } from "react"
import {
  Flex,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { EmployeeCard } from "../employee-card/employee-card"
import { EmployeesView } from "../../features/auth/employees/EmployeesView"
import { Employee } from "../../models"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faSignOut } from "@fortawesome/free-solid-svg-icons"

export const Home = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<Employee>({
    id: "",
    surname: "",
    firstName: "",
    patronymic: "",
  })
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Stack flex={1} alignItems="center">
      <Flex align="center" justify="flex-end" width="100%" p={4} bg="charcoal">
        <FontAwesomeIcon icon={faUser} color="#CAD2C5" />
        <Text
          display="flex"
          alignItems="center"
          ml={2}
          color="ash_gray"
          fontSize="14px"
          pr={5}
        >
          Test
        </Text>
        <Link onClick={() => navigate("/")} fontSize="14px" ml={5} display="flex" alignItems="center">
          <FontAwesomeIcon icon={faSignOut} color="#CAD2C5" />
          <Text ml={2} color="ash_gray">Выйти</Text>
        </Link>
      </Flex>

      <Tabs width="80%">
        <TabList mt={6}>
          <Tab fontSize="18px">Сотрудники</Tab>
          <Tab fontSize="18px">Приказы</Tab>
          <Tab fontSize="18px">Штатное расписание</Tab>
          <Tab fontSize="18px">Уволенные сотрудники</Tab>
        </TabList>

        <TabPanels>
          <TabPanel mt={10}>
            <EmployeesView onOpen={onOpen} onClose={onClose} setEmployee={setEmployee} />
          </TabPanel>

          <TabPanel mt={10}>
            <Text>Приказы</Text>
          </TabPanel>

          <TabPanel mt={10}>
            <Text>Штатное расписание</Text>
          </TabPanel>

          <TabPanel mt={10}>
            <Text>Уволенные сотрудники</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <EmployeeCard isOpen={isOpen} onClose={onClose} employee={employee} />
    </Stack>
  )
}