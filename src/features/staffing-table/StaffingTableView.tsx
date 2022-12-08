import React from "react"
import { Flex, Box, TableContainer, Button, Table, Thead, Tr, Th, Td, Tbody, Text, Stack } from "@chakra-ui/react"
import { faEllipsisVertical, faAdd, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { Staffing } from "../../models"
import { Menu } from "../../components"

export const StaffingTableView = () => {
  const navigate = useNavigate()
  const staffings: Staffing[] = [
    { id: "1", departemnt: "Тестирования", position: "Тестировщик", discharge: "3" , salary: "500" },
    { id: "2", departemnt: "Разработки", position: "Разработчик Back-End", discharge: "4" , salary: "700" },
  ]

  const positions = [
  { id: "1", name: "Директор" },
  { id: "2", name: "Тестировщик" },
  { id: "3", name: "Сорсер" },
  ]

  const departments = [
    { id: "1", name: "Тестирования" },
    { id: "2", name: "Разработки" },
    { id: "3", name: "Рекрутинга" },
    ]

  return (
    <>
      <Box p={4} />

      <Flex justify="space-between" align="flex-start">
        <Flex direction="column" width="55%">
          <Flex flex={1} align="center" justify="space-between">
            <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Штатное расписание</Text>
            <Button leftIcon={<FontAwesomeIcon icon={faAdd} />} onClick={() => navigate("/addEmployee")}>Добавить единицу штатного расписания</Button>
          </Flex>

          <TableContainer
            mt={10}
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
                  <Th borderColor="dark_sea_green" fontSize="17px">Отдел</Th>
                  <Th borderColor="dark_sea_green" fontSize="17px">Должность</Th>
                  <Th borderColor="dark_sea_green" fontSize="17px">Разряд</Th>
                  <Th borderColor="dark_sea_green" fontSize="17px">Оклад, byn</Th>
                  <Th borderColor="dark_sea_green" />
                </Tr>
              </Thead>
              <Tbody>
                {staffings.map((staffing) => {
                  return (
                    <Tr
                      key={staffing.id}
                      onClick={() => {
                        // setEmployee(employee)
                        // onOpen()
                      }}
                      _hover={{
                        bg: "hookers_green",
                        cursor: "pointer",
                      }}
                    >
                      <Td borderColor="dark_sea_green" fontSize="16px">{staffing.departemnt}</Td>
                      <Td borderColor="dark_sea_green" fontSize="16px">{staffing.position}</Td>
                      <Td borderColor="dark_sea_green" fontSize="16px">{staffing.discharge}</Td>
                      <Td borderColor="dark_sea_green" fontSize="16px">{staffing.salary}</Td>
                      <Td borderColor="dark_sea_green">
                        <Menu
                          menuButtonIcon={faEllipsisVertical}
                          menuItems={[
                            { name: "Изменить", icon: faPen, onClick: () => {} },
                            { name: "Удалить", icon: faTrash, onClick: () => {} },
                          ]}
                        />
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        <Stack spacing="5rem" width="35%">
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Должности</Text>
              <Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить должность</Button>
            </Flex>

            <TableContainer
              mt={10}
              maxHeight="25vh"
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
                }
              }}
            >
              <Table>
                <Tbody>
                  {positions.map((position) => (
                    <Tr key={position.id}>
                      <Td borderColor="dark_sea_green">{position.name}</Td>
                      <Td borderColor="dark_sea_green" textAlign="right">
                      <Menu
                        menuButtonIcon={faEllipsisVertical}
                        menuItems={[
                          { name: "Изменить", icon: faPen, onClick: () => {} },
                          { name: "Удалить", icon: faTrash, onClick: () => {} },
                        ]}
                      />
                    </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Отделы</Text>
              <Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить отдел</Button>
            </Flex>

            <TableContainer
              mt={10}
              maxHeight="25vh"
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
                }
              }}
            >
              <Table>
                <Tbody>
                  {departments.map((department) => (
                    <Tr key={department.id}>
                      <Td borderColor="dark_sea_green">{department.name}</Td>
                      <Td borderColor="dark_sea_green" textAlign="right">
                      <Menu
                        menuButtonIcon={faEllipsisVertical}
                        menuItems={[
                          { name: "Изменить", icon: faPen, onClick: () => {} },
                          { name: "Удалить", icon: faTrash, onClick: () => {} },
                        ]}
                      />
                    </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          
        </Stack>

      </Flex>
    </>
  )
}