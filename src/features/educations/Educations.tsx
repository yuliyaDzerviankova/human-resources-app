import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Tr, Text, Button } from "@chakra-ui/react"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import axios from "axios"

export const Educations = () => {
  const [universities, setUniversities] = useState<{ id: string; universityName: string }[]>([])
  const [colleges, setColleges] = useState<{ id: string; collegeName: string }[]>([])

  useEffect(() => {
    axios(
      "http://localhost:8080/colleges",
      { headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
      }}
    )
      .then((res) => setColleges(res.data._embedded.collegesList))
      .catch((err) => console.log(err))
    axios(
      "http://localhost:8080/universities",
      { headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }}
    )
      .then((res) => setUniversities(res.data._embedded.universitiesList))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
    <Box p={4} />

    <Flex justify="space-between" align="flex-start" px={10}>
      <Flex direction="column" width="45%">
        <Flex flex={1} align="center" justify="space-between">
          <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Колледжи/Техникумы</Text>
          {/*<Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить</Button>*/}
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
                    key={item.id}
                    _hover={{
                      bg: "hookers_green",
                      cursor: "pointer",
                    }}
                  >
                    <Td borderColor="dark_sea_green" fontSize="16px" whiteSpace="break-spaces">{item.collegeName}</Td>
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
            {/*<Button leftIcon={<FontAwesomeIcon icon={faAdd} />}>Добавить</Button>*/}
          </Flex>

          <TableContainer
            mt={10}
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
              }
            }}
          >
            <Table>
              <Tbody>
                {universities.map((item) => (
                  <Tr
                    key={item.id}
                    _hover={{
                      bg: "hookers_green",
                      cursor: "pointer",
                    }}
                  >
                    <Td borderColor="dark_sea_green" whiteSpace="break-spaces">{item.universityName}</Td>
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