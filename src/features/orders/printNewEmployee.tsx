import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react"
import React, { useCallback, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import { EmployeeContext } from "../providers/context"

export const PrintNewEmployee = () => {
  const navigate = useNavigate()
  const componentRef = useRef<HTMLDivElement>(null)
  const { state: { globalState: { newEmployee } } } = useContext(EmployeeContext)

  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  // eslint-disable-next-line
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
          <Text mr={4}>{newEmployee.date}</Text>
          <Text>№12585</Text>
        </Flex>

        <Box p={6} />

        <Text>О приеме на работу</Text>

        <Box p={6} />

        <Text>ПРИНЯТЬ:</Text>

        <Box p={2} />

        <Text>{newEmployee.employee} на должность {newEmployee.position} в отдел {newEmployee.department} с {newEmployee.date} с заработной платой согласно штатному расписанию.</Text>

        <Box p={4} />

        <Flex>
          <Text>Основание:</Text>  
          <Flex direction="column" ml={4}>
            <Text>заявление {newEmployee.employee} от {newEmployee.date}</Text>
            <Text>трудовой контракт № ____________ от ___________</Text>
          </Flex>
        </Flex>

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

        <Flex>
          <Text>С приказом ознакомлен</Text>
          <Flex mx={4} direction="column">
            <Text>________________</Text>
            <Text textAlign="center">(подпись)</Text>
          </Flex>
          <Text>{newEmployee.employee}</Text>
        </Flex>

        <Flex width="100%" justify="flex-end" pr={6}>
          <Flex direction="column">
            <Text>________________</Text>
            <Text textAlign="center">(дата)</Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  )
}