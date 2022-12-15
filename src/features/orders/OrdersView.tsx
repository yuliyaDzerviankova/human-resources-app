import {
  Box,
  Flex,
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  useDisclosure
} from "@chakra-ui/react"
import { faEllipsisVertical, faAdd } from "@fortawesome/free-solid-svg-icons"
import { Menu } from "../../components"
import { orders } from "../../mocks/orders"
import { ChangePositionModal } from "./change-position-modal"
import { NewEmployeeModal } from "./new-employee-modal"

export const OrdersView = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { isOpen: isNewEmployeeOpen, onClose: onNewEmployeeClose } = useDisclosure()
  const orderTypes = [
    { id: "1", type: "Приказ о принятии на работу нового сотрудника" },
    { id: "2", type: "Приказ об увольнения сотрудника" },
    { id: "3", type: "Приказ о смене должности" },
    { id: "4", type: "Приказ о добавлении штатной единицы" },
  ]

  return (
    <>
      <Box p={4} />
      <Flex align="flex-start" justify="space-between" flex={1}>
        <TableContainer
          mr={6}
          width="50&"
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
                <Th borderColor="dark_sea_green" fontSize="18px">Вид приказа</Th>
                <Th borderColor="dark_sea_green" fontSize="18px">Дата приказа</Th>
                <Th borderColor="dark_sea_green" fontSize="18px">Информация</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => {
                return (
                  <Tr
                    key={order.id}
                    onClick={() => {
                      // setEmployee(employee)
                      // onOpen()
                    }}
                    _hover={{
                      bg: "hookers_green",
                      cursor: "pointer",
                    }}
                  >
                    <Td borderColor="dark_sea_green" fontSize="16px">{order.type}</Td>
                    <Td borderColor="dark_sea_green" fontSize="16px">{order.dateOrder}</Td>
                    <Td borderColor="dark_sea_green" fontSize="16px">{order.info}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>

        <Stack width="40%">
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="18px" textTransform="uppercase" color="#4A5568">Виды приказов</Text>
            </Flex>

              <TableContainer
                mt={10}
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
                    {orderTypes.map(({ id, type }) => (
                      <Tr key={id}>
                        <Td borderColor="dark_sea_green">{type}</Td>
                        <Td borderColor="dark_sea_green" textAlign="right">
                        <Menu
                          menuButtonIcon={faEllipsisVertical}
                          menuItems={[
                            { name: "Создать приказ", icon: faAdd, onClick: () => onOpen() },
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
      <ChangePositionModal isOpen={isOpen} onClose={onClose} />
      <NewEmployeeModal isOpen={isNewEmployeeOpen} onClose={onNewEmployeeClose} />
    </>
  )
}