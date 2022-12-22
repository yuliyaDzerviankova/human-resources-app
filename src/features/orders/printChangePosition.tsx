import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react"
import React, { useCallback, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import { EmployeeContext } from "../providers/context"

export const PrintChangePosition = () => {
  const navigate = useNavigate()
  const componentRef = useRef<HTMLDivElement>(null)
  const { state: { globalState: { changePosition } } } = useContext(EmployeeContext)

  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const handlePrint = useReactToPrint({
    content: reactToPrintContent
  })

  return (
    <Stack p={2}>
      <Flex align="center" justify="flex-end" width="100%" p={4}>
        <Button onClick={handlePrint} mr={6}>Печать</Button>
        <Button onClick={() => navigate(-1)}>Назад</Button>
      </Flex>
      <Stack ref={componentRef} px={4} py={6} id="report">
        <Box p={4} />
        <Flex align="center" justify="space-between">
          <Text>Приказ</Text>
          <Text>г. Гомель</Text>
        </Flex>
        <Flex>
          <Text mr={4}>19/12/2022</Text>
          <Text>№12585</Text>
        </Flex>

        <Box p={6} />

        <Text>О смене должности</Text>

        <Box p={2} />

        <Text>Перевести на должность:</Text>

        <Box p={2} />

        <Text>{changePosition.employeeId} на должность {changePosition.positionId} в отдел {changePosition.departmentId} с {changePosition.orderDate} по назначению директора, ______________.</Text>

        <Box p={2} />

        <Text>Основание: назначение директора.</Text>

        <Box p={4} />

        <Flex>
          <Text>Директор</Text>
          <Flex mx={4} direction="column">
            <Text>____________________</Text>
            <Text textAlign="center">(подпись)</Text>
          </Flex>
          <Text>__________________________</Text>
        </Flex>

        <Box p={6} />

        <Text>С содержанием приказа ознакомлен.</Text>

        <Flex justify="space-around">
          <Flex mx={4} direction="column">
            <Text>________________</Text>
            <Text textAlign="center">(дата)</Text>
          </Flex>
          <Flex direction="column">
            <Text>________________</Text>
            <Text textAlign="center">(подпись)</Text>
          </Flex>
          <Text textAlign="center">{changePosition.employeeId}</Text>
        </Flex>
      </Stack>
    </Stack>
  )
}