import {
  Box,
  Flex,
  Button,
  Select,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  Stack
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "../../models"
import { faPen, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons"
import { EmployeeCardModal, Menu } from "../../components"
import { departments } from "../../mocks/departments"
import { positions } from "../../mocks/positions"
import { initEmployee } from "../../mocks/initialModels/initEmployee"
import axios from "axios"
import moment from "moment"

export const EmployeesView = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<Employee>(initEmployee)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isDepartmentFilter, setIsDepartmentFilter] = useState(false)
  const [isPositionFilter, setIsPositionFilter] = useState(false)
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [positionFilter, setPositionFilter] = useState("")
  const [search, setSearch] = useState("")
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeesArray, setEmployeesArray] = useState<Employee[]>([])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchArray = employees.filter((item) =>
        item.surname.toLocaleLowerCase().includes(search) ||
        item.firstName.toLocaleLowerCase().includes(search) ||
        item.patronymic.toLocaleLowerCase().includes(search) ||
        item.staffingTable.department.nameDepartment.toLocaleLowerCase().includes(search) ||
        item.staffingTable.positions.positionName.toLocaleLowerCase().includes(search) ||
        moment(item.dateOfReceipt).format("DD/MM/YYYY").toLocaleLowerCase().includes(search)
      )
      setEmployeesArray(searchArray)
    }
  }

  const filterDepartment = (e: ChangeEvent<HTMLSelectElement>) => setDepartmentFilter(e.target.value)
  const filterPosition = (e: ChangeEvent<HTMLSelectElement>) => setPositionFilter(e.target.value)

  const applyFilter = () => {
    const filterArray = employees.filter((item) => item.staffingTable.department.nameDepartment === departmentFilter)
    setEmployeesArray(filterArray)
    setIsDepartmentFilter(false)
  }

  const applyPositionFilter = () => {
    const filterArray = employees.filter((item) => item.staffingTable.positions.positionName === positionFilter)

    setEmployeesArray(filterArray)
    setIsPositionFilter(false)
  }

  const reset = () => {
    setEmployeesArray(employees)
    setIsDepartmentFilter(false)
  }

  const resetPosition = () => {
    setEmployeesArray(employees)
    setIsPositionFilter(false)
  }
  
  useEffect(() => {
    axios(
      "http://localhost:8080/employees",
      { headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      } }
    )
    .then((response) => {
      const resData = response.data._embedded.employeeList
      setEmployees(resData)
      setEmployeesArray(resData)
    })
    .catch((error) => console.log(error))
  }, [])

  return (
    <Stack height="100%">
      <Flex flex={1} align="center" justify="space-between">
        <Box width="40%">
          <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FontAwesomeIcon icon={faSearch} />}
          />
            <Input
              background="#e5e5e5"
              border="none"
              width="100%"
              onChange={({ target }: ChangeEvent<HTMLInputElement> ) => setSearch(target.value)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </InputGroup>
        </Box>
        {/*<Button leftIcon={<FontAwesomeIcon icon={faAdd} />} onClick={() => navigate("/addEmployee")}>Добавить сотрудника</Button>*/}
      </Flex>

      <Box p={4} />

      <TableContainer
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        fontSize="20px"
        maxHeight="60vh"
        overflowY="auto"
        height="100%"
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
              <Th borderColor="dark_sea_green" fontSize="18px" position="relative">
                <Flex width="100%">
                  <Text color="#4A5568" mr={2}>Отдел</Text>
                  <Box _hover={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      icon={faFilter}
                      onClick={() => setIsDepartmentFilter(!isDepartmentFilter)}
                    />
                  </Box>
                  {isDepartmentFilter && (
                    <Box
                      zIndex={10}
                      display="flex"
                      flexDirection="column"
                      borderRadius={4}
                      width="300px"
                      background="hookers_green"
                      position="absolute"
                      top={35}
                      left="100px"
                      p={4}
                    >
                      <FormControl mb={6}>
                        <FormLabel>Отдел</FormLabel>
                        <Select background="ash_gray" onChange={(e: ChangeEvent<HTMLSelectElement>) => filterDepartment(e)}>
                          <option value="" disabled>Выберите отдел</option>
                          {departments.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <Flex width="100%" display="flex" align="center" justify="space-between">
                        <Button onClick={reset}>Сбросить</Button>
                        <Button onClick={applyFilter}>
                          Применить
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </Flex>
              </Th>
              <Th borderColor="dark_sea_green" fontSize="18px" position="relative">
              <Flex width="100%">
                  <Text color="#4A5568" mr={2}>Должность</Text>
                  <Box _hover={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      icon={faFilter}
                      onClick={() => setIsPositionFilter(!isPositionFilter)}
                    />
                  </Box>
                  {isPositionFilter && (
                    <Box
                      zIndex={10}
                      display="flex"
                      flexDirection="column"
                      borderRadius={4}
                      width="300px"
                      background="hookers_green"
                      position="absolute"
                      top={35}
                      left="170px"
                      p={4}
                    >
                      <FormControl mb={6}>
                        <FormLabel>Должность</FormLabel>
                        <Select background="ash_gray" defaultValue={0} onChange={(e: ChangeEvent<HTMLSelectElement>) => filterPosition(e)}>
                          <option value={0} disabled>Выберите должность</option>
                          {positions.map((item) => (
                            <option key={item.id}>{item.name}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <Flex width="100%" display="flex" align="center" justify="space-between">
                        <Button onClick={resetPosition}>Сбросить</Button>
                        <Button onClick={applyPositionFilter}>
                          Применить
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </Flex>
              </Th>
              <Th borderColor="dark_sea_green" fontSize="18px">Дата приема на работу</Th>
              <Th borderColor="dark_sea_green" />
            </Tr>
          </Thead>
          <Tbody>
            {employeesArray.map((employee) => (
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
                <Td borderColor="dark_sea_green" fontSize="16px">{employee.staffingTable.department.nameDepartment}</Td>
                <Td borderColor="dark_sea_green" fontSize="16px">{employee.staffingTable.positions.positionName}</Td>
                <Td borderColor="dark_sea_green" fontSize="16px">{moment(employee.dateOfReceipt).format("DD/MM/YYYY")}</Td>
                <Td borderColor="dark_sea_green" onClick={(event) => event.stopPropagation}>
                  <Menu
                    menuItems={[
                      { name: "Изменить", icon: faPen, onClick: () => navigate(`/editEmployee/${employee.id}`) },
                    ]}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <EmployeeCardModal isOpen={isOpen} onClose={onClose} employee={employee} />
    </Stack>
  )
}