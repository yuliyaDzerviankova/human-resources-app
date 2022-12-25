import {Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure} from "@chakra-ui/react"
import {faAdd, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom"
import {Menu, RemoveModal} from "../../components"
import {initEmployee} from "../../mocks/initialModels/initEmployee"
import {ChangePositionModal} from "./change-position-modal"
import {NewStaffTableModal} from "./new-staff-table-modal"
import {useEffect, useState} from "react"
import axios from "axios"
import moment from "moment";
import {formatDate} from "../../constants"

export const OrdersView = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<{ id: string; type: string; dateOrder: string; info: string }[]>([])
  const { isOpen: isChangePositionOpen, onClose: onChangePositionClose, onOpen: onChangePositionOpen } = useDisclosure()
  const { isOpen: isNewStaffTableOpen, onOpen: onNewStaffTableOpen, onClose: onNewStaffTableClose } = useDisclosure()
  const { isOpen: isFiredOpen, onOpen: onFiredOpen, onClose: onFiredClose } = useDisclosure()

  useEffect(() => {
    axios(
      "http://localhost:8080/documents",
      { headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      } }
    )
    .then((response) => {
      const data = response.data._embedded.documentList
      // @ts-ignore
      let ordersArray = []
      // @ts-ignore
      const ordersData = data.map((item) => {
        // @ts-ignore
        return item.orders.map((subItem) => {
          return {
            id: `${item.id}-${subItem.id}`,
            type: item.documentName,
            dateOrder: subItem.dateOrder,
            info: subItem.info
          }
        })
      })
      // @ts-ignore
      ordersData.map((item) => item.map((itemId) => ordersArray.push(itemId)))
      // @ts-ignore
      setOrders(ordersArray)
    })
    .catch((error) => console.log(error))

  }, [])

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
                    _hover={{
                      bg: "hookers_green",
                      cursor: "pointer",
                    }}
                  >
                    <Td borderColor="dark_sea_green" fontSize="16px" whiteSpace="break-spaces">{order.type}</Td>
                    <Td borderColor="dark_sea_green" fontSize="16px">{moment(order.dateOrder).format(formatDate)}</Td>
                    <Td borderColor="dark_sea_green" fontSize="16px" whiteSpace="break-spaces">{order.info}</Td>
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
                    <Tr>
                      <Td borderColor="dark_sea_green">Приказ о принятии на работу нового сотрудника</Td>
                      <Td borderColor="dark_sea_green">
                        <Menu
                          menuButtonIcon={faEllipsisVertical}
                          menuItems={[
                            { name: "Создать приказ", icon: faAdd, onClick: () => navigate("/addEmployee") },
                          ]}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td borderColor="dark_sea_green">Приказ об увольнении сотрудника</Td>
                      <Td borderColor="dark_sea_green">
                        <Menu
                          menuButtonIcon={faEllipsisVertical}
                          menuItems={[
                            { name: "Создать приказ", icon: faAdd, onClick: () => onFiredOpen() },
                          ]}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td borderColor="dark_sea_green">Приказ о смене должности</Td>
                      <Td borderColor="dark_sea_green">
                        <Menu
                          menuButtonIcon={faEllipsisVertical}
                          menuItems={[
                            { name: "Создать приказ", icon: faAdd, onClick: () => onChangePositionOpen() },
                          ]}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td borderColor="dark_sea_green">Приказ о добавлении штатной единицы</Td>
                      <Td borderColor="dark_sea_green">
                        <Menu
                          menuButtonIcon={faEllipsisVertical}
                          menuItems={[
                            { name: "Создать приказ", icon: faAdd, onClick: () => onNewStaffTableOpen() },
                          ]}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
        </Stack>
      </Flex>
      <ChangePositionModal isOpen={isChangePositionOpen} onClose={onChangePositionClose} />
      <NewStaffTableModal isOpen={isNewStaffTableOpen} onClose={onNewStaffTableClose} />
      <RemoveModal isOpen={isFiredOpen} onClose={onFiredClose} isFromOrder={true} employee={initEmployee} />
    </>
  )
}