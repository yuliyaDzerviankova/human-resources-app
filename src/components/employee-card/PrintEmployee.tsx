import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Employee } from "../../models"
import { useReactToPrint } from "react-to-print"
import { initEmployee } from "../../mocks/initialModels/initEmployee"
import axios from "axios"
import { formatDate } from "../../constants"
import moment from "moment"
// import JsPDF from "jspdf"

export const PrintEmployee = () => {
  const navigate = useNavigate()
  const params = useParams()
  const componentRef = useRef<HTMLDivElement>(null)
  const [employee, setEmployee] = useState<Employee>(initEmployee)

  const reactToPrintContent = useCallback(() => {
    return componentRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentRef.current])

  const handlePrint = useReactToPrint({
    content: reactToPrintContent
  })

  // const generatePDF = () => {
  //   const report = new JsPDF("portrait", "pt", "a4")
  //   report.addFileToVFS("Amiri-Regular.ttf", "amiri")
  //   report.addFont("Amiri-Regular.ttf", "Amiri", "normal")
  //   report.setFont("Amiri")
  //   const elementToPrint = document.querySelector("#report")
  //   // @ts-ignore
  //   report.html(elementToPrint).then(() => report.save("report.pdf"))
  // }

  useEffect(() => {
    axios(`http://localhost:8080/employees/${params.id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.log(error))
  }, [params.id])

  return (
    <Stack p={2}>
      <Flex align="center" justify="flex-end" width="100%" p={4}>
        <Button onClick={handlePrint} mr={6}>Печать</Button>
        {/* <Button onClick={generatePDF} mr={6}>Сохранить</Button> */}
        <Button onClick={() => navigate(-1)}>Назад</Button>
      </Flex>
      <Stack ref={componentRef} px={4} py={6} id="report">
        <Heading fontSize={24}>Личная карточка сотрудника</Heading>
        <Box width="100%" height="1px" background="black" />
        <Flex align="center" justify="space-between">
          <Stack>
            <Text textTransform="uppercase">Лицевая сторона</Text>
            <Text>_________________________________________</Text>
            <Text textAlign="center">название предприятия</Text>
          </Stack>
          <Stack>
            <Text textTransform="uppercase">Утверждено</Text>
            <Text>приказ директора</Text>
            <Text>________________________________________</Text>
            <Text>от _____________ № _____________</Text>
          </Stack>
        </Flex>

        <Text textTransform="uppercase">1. Общие сведения</Text>

        <Flex align="flex-start" justify="space-between">
          <Stack>
            <Flex>
              <Text mr={4}>1. Фамилия</Text>
              <Text textDecoration="underline">{employee.surname}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>Собственное имя</Text>
              <Text textDecoration="underline">{employee.firstName}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>Отчество</Text>
              <Text textDecoration="underline">{employee.patronymic}</Text>
            </Flex>

            <Flex>
              <Text mr={4}>2. Дата рождения</Text>
              <Text textDecoration="underline">{moment(employee.bday).format(formatDate)}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>3. Место рождения</Text>
              <Text textDecoration="underline">{employee.passport.birthPlace}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>4. Гражданство</Text>
              <Text textDecoration="underline">{employee.passport.nationality}</Text>
            </Flex>
            <Text mr={4}>5. Образование:</Text>
            <Flex>
              <Text mr={4}>А.</Text>
              <Flex direction="column">
                <Text textDecoration="underline">{employee.education.institutionName}</Text>
                <Text textAlign="center">название и год окончания</Text>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text>{moment(employee.education.finishDate).format(formatDate)}</Text>
              <Box height="1px" background="black" width="90%" />
              <Text textAlign="center" mr={4}>учебного заведения</Text>
            </Flex>
            <Flex>
              <Text mr={4}>Специальность</Text>
              <Text textDecoration="underline">{employee.education.speciality}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>Документ об образовании</Text>
              <Text textDecoration="underline">{employee.education.documentName}</Text>
            </Flex>
            {/*{employee.educations.map((item) => (*/}
            {/*  <>*/}
            {/*    <Flex>*/}
            {/*      <Text mr={4}>А.</Text>*/}
            {/*      <Flex direction="column">*/}
            {/*        <Text textDecoration="underline">{item.institutionName}</Text>*/}
            {/*        <Text textAlign="center">название и год окончания</Text>*/}
            {/*      </Flex>*/}
            {/*    </Flex>*/}
            {/*    <Flex direction="column">*/}
            {/*      <Text>{item.finishDate}</Text>*/}
            {/*      <Box height="1px" background="black" width="90%" />*/}
            {/*      <Text textAlign="center" mr={4}>учебного заведения</Text>*/}
            {/*    </Flex>*/}
            {/*    <Flex>*/}
            {/*      <Text mr={4}>Специальность</Text>*/}
            {/*      <Text textDecoration="underline">{item.speciality}</Text>*/}
            {/*    </Flex>*/}
            {/*    <Flex>*/}
            {/*      <Text mr={4}>Документ об образовании</Text>*/}
            {/*      <Text textDecoration="underline">{item.documentName}</Text>*/}
            {/*    </Flex>*/}
            {/*  </>*/}
            {/*))}*/}
            <Flex>
              <Text mr={4}>Б.</Text>
              <Flex direction="column">
                <Text>________________________________________________________</Text>
                <Text textAlign="center">название и год окончания</Text>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text>___________________________________________________________</Text>
              <Text textAlign="center" mr={4}>учебного заведения</Text>
            </Flex>
            <Text mr={4}>Специальность __________________________________________</Text>
            <Text mr={4}>Документ об образовании ______________________________</Text>
            <Flex>
              <Text mr={4}>В.</Text>
              <Flex direction="column">
                <Text>________________________________________________________</Text>
                <Text textAlign="center">название и год окончания</Text>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text>___________________________________________________________</Text>
              <Text textAlign="center" mr={4}>учебного заведения</Text>
            </Flex>
            <Text mr={4}>Специальность __________________________________________</Text>
            <Text mr={4}>Документ об образовании ______________________________</Text>
          </Stack>

          <Stack>
            <Flex direction="column">
              <Text mr={4}>6. Ученая степень ____________________________</Text>
              <Text>_______________________________________________</Text>
              <Text textAlign="center">специальность</Text>
            </Flex>
            <Flex direction="column">
              <Text mr={4}>Документ ____________________________________</Text>
              <Text>_______________________________________________</Text>
            </Flex>
            <Flex direction="column">
              <Text mr={4}>7. Ученое звание _____________________________</Text>
              <Text>_______________________________________________</Text>
            </Flex>
            <Text mr={4}>Специальность _______________________________</Text>
            <Flex direction="column">
              <Text mr={4}>Документ _______________________________</Text>
              <Text>_______________________________________________</Text>
            </Flex>
            <Flex direction="column">
              <Text mr={4}>8. Должность (профессия) ____________________</Text>
              <Text>_______________________________________________</Text>
            </Flex>
            <Text mr={4}>9. Семейное положение ______________________</Text>
            <Text mr={4}>10. Состав семьи</Text>
            <Flex direction="column">
              <Text>{employee.employeesFamily?.surname} {employee.employeesFamily?.firstName}</Text>
              <Box height="1px" background="black" />
              <Text textAlign="center">степень родства и дата рождения</Text>
              <Text textAlign="center">каждого члена семьи</Text>
            </Flex>
            <Flex direction="column">
              {/*<Text>{employee.employeesFamily.bDay} {employee.employeesFamily.relationDegree}</Text>*/}
              <Text>{employee?.employeesFamily?.bday ? moment(employee?.employeesFamily?.bday).format(formatDate) : ""}</Text>
              <Box height="1px" background="black" />
            </Flex>
            {/*{employee.family.map((item) => (*/}
            {/*  <>*/}
            {/*    <Flex direction="column">*/}
            {/*      <Text>{item.surname} {item.firstName}</Text>*/}
            {/*      <Box height="1px" background="black" />*/}
            {/*      <Text textAlign="center">степень родства и дата рождения</Text>*/}
            {/*      <Text textAlign="center">каждого члена семьи</Text>*/}
            {/*    </Flex>*/}
            {/*    <Flex direction="column">*/}
            {/*      <Text>{item.bDay} {item.relationDegree}</Text>*/}
            {/*      <Box height="1px" background="black" />*/}
            {/*    </Flex>*/}
            {/*  </>*/}
            {/*))}*/}
            <Text>11. Документ, удостоверяющий личность</Text>
            <Text textDecoration="underline">паспорт</Text>
            <Flex>
              <Text mr={4}>серия и номер</Text>
              <Text textDecoration="underline">{employee.passport.passportNumber}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>выдан</Text>
              <Text textDecoration="underline">{employee.passport.placeReceipt}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>дата выдачи</Text>
              <Text textDecoration="underline">{moment(employee.passport.dateReceipt).format(formatDate)}</Text>
            </Flex>
            <Flex direction="column">
              <Text>12. Адрес регистрации по месту жительства</Text>
              <Text textDecoration="underline">{employee.passport.passportAddress}</Text>
            </Flex>
            <Flex direction="column">
              <Text>13. Адрес фактического проживания</Text>
              <Text textDecoration="underline">{employee.passport.actualAddress}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>14. Телефон</Text>
              <Text textDecoration="underline">{employee.homePhone}</Text>
            </Flex>
            <Flex>
              <Text mr={4}>14. Мобильный телефон</Text>
              <Text textDecoration="underline">{employee.mobPhone}</Text>
            </Flex>
          </Stack>
        </Flex>
        <Text>Дата заполнения</Text>
        <Flex>
          <Flex mr={6}>
            <Text mr={4}>Работник</Text>
            <Text>___________________</Text>
          </Flex>
          <Flex>
            <Text mr={4}>Подпись</Text>
            <Text>___________________</Text>
          </Flex>
        </Flex>

        <Flex>
          <Text mr={4}>Основание прекращения трудового договора (увольнения)</Text>
          <Text>__________________________________</Text>
        </Flex>
        <Flex>
          <Text mr={4}>Дата увольнения</Text>
          <Text mr={4}>"____"</Text>
          <Text mr={4}>____________</Text>
          <Text mr={4}>20___ г.</Text>
        </Flex>
        <Text mr={4}>Приказ № _____ от "____" ____________ 20____ г.</Text>
        <Flex>
          <Text>Работник отдела кадров</Text>
          <Flex ml={4}>
            <Flex direction="column" mr={4}>
              <Text>_____________________</Text>
              <Text textAlign="center">должность</Text>
            </Flex>
            <Flex direction="column" mr={4}>
              <Text>_____________________</Text>
              <Text textAlign="center">инициалы, фамилия</Text>
            </Flex>            <Flex direction="column">
              <Text>_____________________</Text>
              <Text textAlign="center">личная подпись</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
        <Text>Работник</Text>
          <Flex ml={4} justify="space-between">
            <Flex direction="column" mr={4}>
              <Text>_____________________</Text>
              <Text textAlign="center">личная подпись</Text>
            </Flex>            <Flex direction="column">
              <Text>_______________________________</Text>
              <Text textAlign="center">инициалы, фамилия</Text>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  )
}