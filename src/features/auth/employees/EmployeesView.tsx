import { Box, Flex, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "../../../models"

type EmployeesViewProps = {
  onOpen:() => void
  onClose: () => void
  setEmployee: Dispatch<SetStateAction<Employee>>
}

export const EmployeesView: React.FC<EmployeesViewProps> = ({ onOpen, onClose, setEmployee }) => {
  const navigate = useNavigate()
  const employees: Employee[] = [
    { id: "1", surname: "Денисова", firstName: "Анастасия", patronymic: "Валерьевна" , department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2020" },
    { id: "2", surname: "Воробьева", firstName: "Светлана", patronymic: "Владимировна", department: "Разработки", position: "Фронтенд разработчик", offerDate: "23.02.2019" },
    { id: "3", surname: "Игнатов", firstName: "Владислав", patronymic: "Сергеевич", department: "Рекрутинга", position: "Рекрутер", offerDate: "02.03.2018" },
    { id: "4", surname: "Коваленко", firstName: "Анастасия", patronymic: "Сергеевна",department: "Кадров", position: "Проектный менеджер", offerDate: "02.01.2021" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
    { id: "5", surname: "Северик", firstName: "Инга", patronymic: "Игоревна", department: "Тестирования", position: "Тестировщик ПО", offerDate: "02.12.2019" },
  ]

  return (
    <>
      <Flex flex={1} align="center" justify="flex-end">
        <Button onClick={() => navigate("/addEmployee")}>Добавить сотрудника</Button>
      </Flex>

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
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "dark_sea_green",
            background: "dark_sea_green",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar:horizontal": {
            height: "10px",
          },
          "::-webkit-scrollbar-thumb:horizontal": {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "dark_sea_green",
            background: "dark_sea_green",
            borderRadius: "10px",
          }
        }}
        // css=
      >
        <Table>
          <Thead>
            <Tr>
              <Th borderColor="dark_sea_green" fontSize="18px">Фамилия</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Имя</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Отчество</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Отдел</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Должность</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Дата приема на работу</Th>
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
                    bg: "hookers_green",
                    cursor: "pointer",
                  }}
                >
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.surname}</Td>
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.firstName}</Td>
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.patronymic}</Td>
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.department}</Td>
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.position}</Td>
                  <Td borderColor="dark_sea_green" fontSize="16px">{employee.offerDate}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}