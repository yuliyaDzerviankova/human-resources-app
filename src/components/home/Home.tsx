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

export type Employee = {
  id: string
  surname: string
  firstName: string
  patronymic: string
}

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
        <Text
          color="ash_gray"
          fontSize="20px"
          pr={5}
          borderRightWidth={1}
          borderRightColor="ahs_gray"
        >
          Test
        </Text>
        <Link onClick={() => navigate("/")} color="ash_gray" fontSize="20px" ml={5}>Выйти</Link>
      </Flex>

      <Tabs width="70%">
        <TabList mt={6}>
          <Tab fontSize="20px">Сотрудники</Tab>
          <Tab fontSize="20px">Приказы</Tab>
          <Tab fontSize="20px">Штатное расписание</Tab>
          <Tab fontSize="20px">Уволенные сотрудники</Tab>
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