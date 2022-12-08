import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react"
import React from "react"

export const FiredEmployeesView = () => {
  const firedEmployees = [
    { id: "1", fio: "Иванов Петр Степанович", reason: "По истечению контракта" },
    { id: "2", fio: "Захарова Ангелина Вячеславовна", reason: "По собственному желанию" },
    { id: "3", fio: "Котов Михаил Александрович", reason: "По статье" },
    { id: "4", fio: "Михальчук Мария Павловна", reason: "За систему нарушений" },
    { id: "5", fio: "Орешкина Есения Аркадьевна", reason: "В связи с выходом нового работника" },
  ]

  return (
    <>
      <Box p={4} />

      <TableContainer
        display="flex"
        justifyContent="center"
        fontSize="20px"
        maxHeight="60vh"
        overflowY="auto"
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
              <Th borderColor="dark_sea_green" fontSize="18px">Фамилия Имя Отчество</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Причина увольнения</Th>
            </Tr>
          </Thead>
          <Tbody>
            {firedEmployees.map((employee) => {
              return (
                <Tr
                  key={employee.id}
                  // onClick={() => {
                  //   setEmployee(employee)
                  //   onOpen()
                  // }}
                  _hover={{
                    bg: "hookers_green",
                    cursor: "pointer",
                  }}
                >
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.fio}</Td>
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.reason}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}