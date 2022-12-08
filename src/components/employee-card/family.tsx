import { Button, Flex, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const Family = () => {
  return (
    <Stack flex={1} height="100%">
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

      <Flex flex={1} align="flex-end" justify="space-between" width="100%">
        <Flex align="center">
          <Button>Добавить члена семьи</Button>
        </Flex>
        <Button leftIcon={<FontAwesomeIcon icon={faPrint} />}>Печать личной карточки</Button>
      </Flex>
    </Stack>
  )
}