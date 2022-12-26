import React, { useEffect, useState } from "react"
import { Flex, Box, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Text, Stack } from "@chakra-ui/react"
import axios from "axios"

export const StaffingTableView = () => {
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([])
  const [positions, setPositions] = useState<{ id: string; name: string }[]>([])
  const [staffings, setStaffings] = useState<{
    id: string;
    position: string;
    discharge: string;
    salary: string;
  }[]>([])

  useEffect(() => {
    axios(
      "http://localhost:8080/departments",
      { headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        } }
    )
      .then((response) => {
        const data = response.data._embedded.departmentList
        // @ts-ignore
        const departments = data.map((item) => ({ id: item.id, name: item.nameDepartment }))
        setDepartments(departments)
      })
      .catch((error) => console.log(error))
    axios(
      "http://localhost:8080/positions",
      { headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        } }
    )
      .then((response) => {
        const data = response.data._embedded.positionsList
        // @ts-ignore
        const positions = data.map((item) => ({ id: item.id, name: item.positionName }))
        setPositions(positions)

        let staffingsArray: { id: string; position: string; discharge: string; salary: string }[] = []
        // @ts-ignore
        const staffingsData = data.map((item) => {
          // @ts-ignore
          return item.staffingTables.map((subItem) => ({
              id: `${item.id}-${subItem.id}`,
              position: item.positionName,
              discharge: subItem.discharge,
              salary: subItem.salary
            }
          ))
        })
        // @ts-ignore
        staffingsData.map((item) => item.map((itemId) => staffingsArray.push(itemId)))
        setStaffings(staffingsArray)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <Box p={2} />

      <Flex justify="space-between" align="flex-start">
        <Flex direction="column" width="55%">
          <Flex flex={1} align="center" justify="space-between">
            <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Штатное расписание</Text>
            {/*<Button leftIcon={<FontAwesomeIcon icon={faAdd} />} onClick={() => navigate("")}>Добавить единицу штатного расписания</Button>*/}
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
                  {/*<Th borderColor="dark_sea_green" fontSize="17px">Отдел</Th>*/}
                  <Th borderColor="dark_sea_green" fontSize="17px">Должность</Th>
                  <Th borderColor="dark_sea_green" fontSize="17px">Разряд</Th>
                  <Th borderColor="dark_sea_green" fontSize="17px">Оклад, byn</Th>
                  {/*<Th borderColor="dark_sea_green" />*/}
                </Tr>
              </Thead>
              <Tbody>
                {staffings.map((staffing) => {
                  return (
                    <Tr
                      key={staffing.id}
                      _hover={{
                        bg: "hookers_green",
                        cursor: "pointer",
                      }}
                    >
                      {/*<Td borderColor="dark_sea_green" fontSize="16px">{staffing.departemnt}</Td>*/}
                      <Td borderColor="dark_sea_green" fontSize="16px">{staffing.position}</Td>
                      <Td borderColor="dark_sea_green" fontSize="16px">{staffing.discharge}</Td>
                      <Td borderColor="dark_sea_green" fontSize="16px">{staffing.salary}</Td>
                      {/*<Td borderColor="dark_sea_green">*/}
                      {/*  <Menu*/}
                      {/*    menuItems={[*/}
                      {/*      { name: "Изменить", icon: faPen, onClick: () => {} },*/}
                      {/*      { name: "Удалить", icon: faTrash, onClick: () => {} },*/}
                      {/*    ]}*/}
                      {/*  />*/}
                      {/*</Td>*/}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        <Stack spacing="3rem" width="35%">
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Должности</Text>
              {/*<Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить должность</Button>*/}
            </Flex>

            <TableContainer
              mt={7}
              maxHeight="28vh"
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
                      {/*<Td borderColor="dark_sea_green" textAlign="right">*/}
                      {/*  <Menu*/}
                      {/*    menuItems={[*/}
                      {/*      { name: "Изменить", icon: faPen, onClick: () => {} },*/}
                      {/*      { name: "Удалить", icon: faTrash, onClick: () => {} },*/}
                      {/*    ]}*/}
                      {/*  />*/}
                      {/*</Td>*/}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Отделы</Text>
              {/*<Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить отдел</Button>*/}
            </Flex>

            <TableContainer
              mt={7}
              maxHeight="28vh"
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
                  {departments.map((department: { id: string; name: string }) => (
                    <Tr key={department.id}>
                      <Td borderColor="dark_sea_green">{department.name}</Td>
                      {/*<Td borderColor="dark_sea_green" textAlign="right">*/}
                      {/*  <Menu*/}
                      {/*    menuItems={[*/}
                      {/*      { name: "Изменить", icon: faPen, onClick: () => {} },*/}
                      {/*      { name: "Удалить", icon: faTrash, onClick: () => {} },*/}
                      {/*    ]}*/}
                      {/*  />*/}
                      {/*</Td>*/}
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