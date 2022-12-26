import React from "react"
import {
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { EmployeesView } from "../../features/employees/EmployeesView"
import { StaffingTableView } from "../../features/staffing-table/StaffingTableView"
import { FiredEmployeesView } from "../../features/fired-employees/FiredEmployeesView"
import { OrdersView } from "../../features/orders/OrdersView"

export const Home = () => (
  <Stack flex={1} alignItems="center">
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

      <TabPanels height="100%">
        <TabPanel mt={10} height="100%">
          <EmployeesView />
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