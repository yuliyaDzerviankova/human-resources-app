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
import { EmployeeCardModal } from "../employee-card/employeeCardModal"
import { EmployeesView } from "../../features/employees/EmployeesView"
import { Employee } from "../../models"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { StaffingTableView } from "../../features/staffing-table/StaffingTableView"
import { FiredEmployeesView } from "../../features/fired-empoyees/FiredEmployeesView"
import { OrdersView } from "../../features/orders/OrdersView"
import { initEmployee } from "../../mocks/initialModels/initEmployee"

export const Home = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<Employee>(initEmployee)
  // const { isOpen, onClose, onOpen } = useDisclosure()

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
          Admin
        </Text>
        <Link
          _hover={{
            textDecoration: "underline",
            textDecorationColor: "ash_gray"
          }}
          onClick={() => navigate("/")}
          fontSize="14px"
          ml={5}
          display="flex"
          alignItems="center"
        >
          <FontAwesomeIcon icon={faSignOut} color="#CAD2C5" />
          <Text ml={2} color="ash_gray">Выйти</Text>
        </Link>
      </Flex>

      <Tabs width="90%" height="70%">
        <TabList mt={6} justifyContent="space-between" borderBottomColor="dark_sea_green">
          <Flex>
            <Tab fontSize="18px">Сотрудники</Tab>
            <Tab fontSize="18px">Приказы</Tab>
            <Tab fontSize="18px">Штатное расписание</Tab>
            <Tab fontSize="18px">Уволенные сотрудники</Tab>
          </Flex>
          <Tab fontSize="18px" justifySelf="flex-end">Админ</Tab>
        </TabList>

        {/* <EmployeeCardModal isOpen={isOpen} onClose={onClose} employee={employee} /> */}

        <TabPanels height="100%">
          <TabPanel mt={10} height="100%">
            <EmployeesView setEmployee={setEmployee} />
          </TabPanel>

          <TabPanel mt={10}>
            <OrdersView />
          </TabPanel>

          <TabPanel mt={10}>
            <StaffingTableView />
          </TabPanel>

          <TabPanel mt={10}>
            <FiredEmployeesView />
          </TabPanel>

          <TabPanel justifySelf="flex-end">
            <Text>Админы</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}