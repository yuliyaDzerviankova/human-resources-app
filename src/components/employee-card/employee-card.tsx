import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react"
import React from "react"
import { Family } from "./family"
import { Education } from "./education"
import { GeneralInfo } from "./general-info"
import { Employee } from "../../models"

type EmployeeCardProps = {
  isOpen: boolean
  onClose: () => void
  employee: Employee
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ isOpen, onClose, employee }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="ash_gray" borderRadius={20}>
        <ModalHeader display="flex" alignItems="center" justifyContent="space-between" pr="3.5rem" fontSize="18px" pt={5}>
          <Text fontWeight="normal" px={6}>Личный номер сотрудника: {employee.id}</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody px={10} minHeight="35rem">
          <Tabs>
            <TabList>
              <Tab fontSize="20px">Общие данные</Tab>
              <Tab fontSize="20px">Образование</Tab>
              <Tab fontSize="20px">Состав семьи</Tab>
            </TabList>

            <TabPanels>
              <TabPanel height="54vh">
                <GeneralInfo employee={employee} />
              </TabPanel>

              <TabPanel>
                <Education employee={employee} />
              </TabPanel>

              <TabPanel>
                <Family />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}