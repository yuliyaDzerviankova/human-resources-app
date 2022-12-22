import { Button, Flex, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { FamilyChangesModal } from "../../features/employees/FamilyChangesModal"
import { Employee } from "../../models"

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
              <Td borderColor="dark_sea_green">Шишкова</Td>
              <Td borderColor="dark_sea_green">Валентина</Td>
              <Td borderColor="dark_sea_green">13/02/2001</Td>
              <Td borderColor="dark_sea_green">Супруга</Td>
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