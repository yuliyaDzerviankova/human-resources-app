import { Button, Flex, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { FamilyChangesModal } from "../../features/employees/FamilyChangesModal"
import { Employee } from "../../models"
import moment from "moment";
import {formatDate} from "../../constants";

type FamilyProps = {
  employee: Employee
}

export const Family: React.FC<FamilyProps> = ({ employee }) => {
  const { isOpen: isFamilyOpen, onOpen: onFamilyOpen, onClose: onFamilyClose } = useDisclosure()

  return (
    <Stack flex={1} height="100%">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th borderColor="dark_sea_green">Фамилия</Th>
              <Th borderColor="dark_sea_green">Имя</Th>
              <Th borderColor="dark_sea_green">Дата рождения</Th>
              <Th borderColor="dark_sea_green">Статус</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td borderColor="dark_sea_green">{employee?.employeesFamily?.surname}</Td>
              <Td borderColor="dark_sea_green">{employee?.employeesFamily?.firstName}</Td>
              <Td borderColor="dark_sea_green">{employee?.employeesFamily?.bday ? moment(employee?.employeesFamily?.bday).format(formatDate) : ""}</Td>
              <Td borderColor="dark_sea_green"></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <Flex flex={1} align="flex-end" justify="space-between" width="100%">
        <Flex align="center">
          <Button onClick={onFamilyOpen}>Добавить члена семьи</Button>
        </Flex>
      </Flex>
      <FamilyChangesModal
        employee={employee}
        isFamilyOpen={isFamilyOpen}
        onFamilyClose={onFamilyClose}
      />
    </Stack>
  )
}