import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import { Employee } from "../../models"

type EducationProos = {
  employee: Employee
}

export const Education: React.FC<EducationProos> = ({employee}) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th borderColor="dark_sea_green">Образование</Th>
            <Th borderColor="dark_sea_green">Название заведения</Th>
            <Th borderColor="dark_sea_green">Документ</Th>
            <Th borderColor="dark_sea_green">Дата окончания</Th>
            <Th borderColor="dark_sea_green">Специальность</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td borderColor="dark_sea_green">Среднее специальное</Td>
            <Td borderColor="dark_sea_green">ГГАЭК</Td>
            <Td borderColor="dark_sea_green">Диплом</Td>
            <Td borderColor="dark_sea_green">30/06/2020</Td>
            <Td borderColor="dark_sea_green">Техник-программист</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}