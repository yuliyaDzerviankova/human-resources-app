import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"

export const Family = () => {
  return (
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
  )
}