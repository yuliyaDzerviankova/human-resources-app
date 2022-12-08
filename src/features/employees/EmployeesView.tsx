import {
  Box,
  Flex,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "../../models"
import { faEllipsisVertical, faAdd, faPen } from "@fortawesome/free-solid-svg-icons"
import { employees } from "../../mocks/employees"
import { Menu } from "../../components"

type EmployeesViewProps = {
  onOpen:() => void
  onClose: () => void
  setEmployee: Dispatch<SetStateAction<Employee>>
}

export const EmployeesView: React.FC<EmployeesViewProps> = ({ onOpen, onClose, setEmployee }) => {
  const navigate = useNavigate()

  return (
    <>
      <Flex flex={1} align="center" justify="flex-end">
        <Button leftIcon={<FontAwesomeIcon icon={faAdd} />} onClick={() => navigate("/addEmployee")}>Добавить сотрудника</Button>
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
              <Th borderColor="dark_sea_green" fontSize="18px">Фамилия</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Имя</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Отчество</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Отдел</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Должность</Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Дата приема на работу</Th>
              <Th borderColor="dark_sea_green" />
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
                  <Td borderColor="dark_sea_green">
                    <Menu
                      menuButtonIcon={faEllipsisVertical}
                      menuItems={[
                        { name: "Изменить", icon: faPen, onClick: () => navigate(`/editEmployee/${employee.id}`) },
                        { name: "Удалить", icon: faPen, onClick: () => {} }
                      ]}
                    />
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}