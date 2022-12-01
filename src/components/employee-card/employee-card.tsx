import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { Employee } from "../home/Home"
import { Family } from "./family"
import { Education } from "./education"
import { GeneralInfo } from "./general-info"

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
        <ModalHeader></ModalHeader>
        <ModalCloseButton />

        <ModalBody px={10} minHeight="35rem">
          <Tabs>
            <TabList>
              <Tab>Общие данные</Tab>
              <Tab>Образование</Tab>
              <Tab>Семья</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
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

        <ModalFooter>
          <Flex align="center" flex={1} justify="flex-end">
            <Button leftIcon={<FontAwesomeIcon icon={faPrint} />}>Печать личной карточки</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}