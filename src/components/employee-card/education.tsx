import { Button, Flex, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Employee } from "../../models"
import moment from "moment"
import { formatDate } from "../../constants"
import { EducationChangesModal } from "../../features/employees/EducationChangesModal"

type EducationProps = {
  employee: Employee
}

export const Education: React.FC<EducationProps> = ({ employee }) => {
  const navigate = useNavigate()
  const { education } = employee
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Stack flex={1} height="100%">
      <TableContainer
        flex={1}
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
              <Th borderColor="dark_sea_green">Образование</Th>
              <Th borderColor="dark_sea_green" width="100px">Название заведения</Th>
              <Th borderColor="dark_sea_green">Документ</Th>
              <Th borderColor="dark_sea_green">Дата окончания</Th>
              <Th borderColor="dark_sea_green">Специальность</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td borderColor="dark_sea_green">{education.educationKind}</Td>
              <Td borderColor="dark_sea_green" width="100px" whiteSpace="break-spaces">{education.institutionName}</Td>
              <Td borderColor="dark_sea_green">{education.documentName}</Td>
              <Td borderColor="dark_sea_green">{moment(education.finishDate).format(formatDate)}</Td>
              <Td borderColor="dark_sea_green">{education.speciality}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <Flex flex={1} align="flex-end" justify="space-between" width="100%">
        <Flex align="center">
          <Link to="/educations" target="_blank">Учебные заведения</Link>
          <Button ml={6} onClick={onOpen}>Добавить образование</Button>
        </Flex>
      </Flex>
      <EducationChangesModal isEdit={true} employeeId={employee.id} isEducationOpen={isOpen} onEducationClose={onClose} />
    </Stack>
  )
}