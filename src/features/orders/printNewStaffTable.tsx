import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react"
import React, { useCallback, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import { EmployeeContext } from "../providers/context"
import moment from "moment"

export const PrintNewStaffTable = () => {
  const navigate = useNavigate()
  const componentRef = useRef<HTMLDivElement>(null)
  const { state: { globalState: { newStaffTable } } } = useContext(EmployeeContext)
  const format = "DD/MM/YYYY"

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
          <Text mr={4}>{moment(newStaffTable.staffDate).format(format)}</Text>
          <Text>№12585</Text>
        </Flex>

        <Box p={6} />

        <Text>О внесении изменений в штатное расписание</Text>

        <Box p={2} />

        <Text>ПРИКАЗЫВАЮ:</Text>
        <Text>Внести в штатное расписание следующие изменения:</Text>

        <Box p={2} />

        <Text>Наименование должности: {newStaffTable.positionId}</Text>
        <Text>Наименование отдела: {newStaffTable.departmentId}</Text>

        <Box p={2} />

        <Text>Основание: Необходимость в сотрудниках</Text>

        <Box p={2} />

        <Flex>
          <Text>Директор</Text>
          <Flex mx={4} direction="column">
            <Text>____________________</Text>
            <Text textAlign="center">(подпись)</Text>
          </Flex>
          <Text>__________________________</Text>
          <Flex mx={4} direction="column">
            <Text>____________________</Text>
            <Text textAlign="center">(дата)</Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  )
}