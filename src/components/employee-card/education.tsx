import { Button, Flex, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "../../models"

type EducationProos = {
  employee: Employee
}

export const Education: React.FC<EducationProos> = ({employee}) => {
  const navigate = useNavigate()

  return (
    <Stack flex={1} height="100%">
      <TableContainer
        flex={1}
        sx={{
          "&::-webkit-scrollbar": {
            width: "10px",
            background: "transparent",
          },
          "::-webkit-scrollbar-corner": {
            background: "transparent",
            width: 0,
            height: 0,
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "dark_sea_green",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar:horizontal": {
            height: "10px",
          },
          "&::-webkit-scrollbar-thumb:horizontal": {
            background: "dark_sea_green",
            borderRadius: "10px",
          }
        }}
      >
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

      <Flex flex={1} align="flex-end" justify="space-between" width="100%">
        <Flex align="center">
          <Button mr={6} onClick={() => navigate("/educations")}>Учебные заведения</Button>
          <Button>Добавить образование</Button>
        </Flex>
      </Flex>
    </Stack>
  )
}