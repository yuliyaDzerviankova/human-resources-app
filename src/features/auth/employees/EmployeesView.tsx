import { Box, Flex, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "../../../components/home/Home"

type EmployeesViewProps = {
  onOpen:() => void
  onClose: () => void
  setEmployee: Dispatch<SetStateAction<Employee>>
}

export const EmployeesView: React.FC<EmployeesViewProps> = ({ onOpen, onClose, setEmployee }) => {
  const navigate = useNavigate()
  const employees: Employee[] = [
    { id: "1", surname: "Денисова", firstName: "Анастасия", patronymic: "Валерьевна" },
    { id: "2", surname: "Воробьева", firstName: "Светлана", patronymic: "Владимировна" },
    { id: "3", surname: "Игнатов", firstName: "Владислав", patronymic: "Сергеевич" },
    { id: "4", surname: "Коваленко", firstName: "Анастасия", patronymic: "Сергеевна" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна" },
  ]

  return (
    <>
      <Flex flex={1} align="center" justify="flex-end">
        <Button onClick={() => navigate("/addEmployee")}>Добавить сотрудника</Button>
      </Flex>

      <Box p={4} />

      <TableContainer display="flex" justifyContent="center" fontSize="20px">
        <Table>
          <Thead>
            <Tr>
              <Th borderColor="dark_sea_green" fontSize="20px">Фамилия</Th>
              <Th borderColor="dark_sea_green" fontSize="20px">Имя</Th>
              <Th borderColor="dark_sea_green" fontSize="20px">Отчество</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => {
              return (
                <Tr
                  key={employee.id}
                  onClick={() => {
                    setEmployee(employee)
                    onOpen()
                  }}
                  _hover={{
                    bg: "dark_sea_green",
                    cursor: "pointer",
                  }}
                >
                  <Td borderColor="dark_sea_green">{employee.surname}</Td>
                  <Td borderColor="dark_sea_green">{employee.firstName}</Td>
                  <Td borderColor="dark_sea_green">{employee.patronymic}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}