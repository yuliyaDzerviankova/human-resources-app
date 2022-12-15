import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Tr, Text, Button } from "@chakra-ui/react"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const Educations = () => {
  const colleges = [
    "Гомельский государственный аграрно-экономический колледж",
    "Гомельский государственный профессионально-технический колледж народных художеств",
    "Гомельский торгово-экономический колледж",
    "Гомельский государственный колледж искусств им. Н.Ф. Соколовского"
  ]
  const institutions = [
    "Белорусский государственный университет информатики и радиоэлектроники",
    "Белорусский торгово-экономический университет потребительской кооперации",
    "Гомельский государственный университет им. Франциска Скорины",
    "Белорусский государственный университет транспорта",
  ]

  return (
    <>
    <Box p={4} />

    <Flex justify="space-between" align="flex-start" px={10}>
      <Flex direction="column" width="45%">
        <Flex flex={1} align="center" justify="space-between">
          <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Колледжи/Техникумы</Text>
          <Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить</Button>
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
            <Tbody>
              {colleges.map((item) => {
                return (
                  <Tr
                    key={item}
                    onClick={() => {
                      // setEmployee(employee)
                      // onOpen()
                    }}
                    _hover={{
                      bg: "hookers_green",
                      cursor: "pointer",
                    }}
                  >
                    <Td borderColor="dark_sea_green" fontSize="16px">{item}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      <Stack spacing="5rem" width="45%">
        <Flex direction="column">
          <Flex align="center" justify="space-between">
            <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Университеты</Text>
            <Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить</Button>
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
                {institutions.map((item) => (
                  <Tr key={item}>
                    <Td borderColor="dark_sea_green">{item}</Td>
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