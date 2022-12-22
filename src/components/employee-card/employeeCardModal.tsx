import React from "react"
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
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { Family } from "./family"
import { Education } from "./education"
import { GeneralInfo } from "./general-info"
import { Employee } from "../../models"
import { RemoveModal } from "../remove-modal/remove-modal"

type EmployeeCardModalProps = {
  isOpen: boolean
  onClose: () => void
  employee: Employee
}

export const EmployeeCardModal: React.FC<EmployeeCardModalProps> = ({ isOpen, onClose, employee }) => {
  const { isOpen: isRemoveOpen, onClose: onRemoveClose, onOpen: onRemoveOpen } = useDisclosure()

  const deleteEmployee = () => {}

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="ash_gray" borderRadius={20}>
          <ModalHeader display="flex" alignItems="center" justifyContent="space-between" pr="3.5rem" fontSize="18px" pt={5}>
            <Text fontWeight="normal" px={6}>Личный номер сотрудника: {employee.id}</Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody px={10} minHeight="35rem">
            <Tabs>
              <TabList borderBottomColor="dark_sea_green">
                <Tab fontSize="20px">Общие данные</Tab>
                <Tab fontSize="20px">Образование</Tab>
                <Tab fontSize="20px">Состав семьи</Tab>
              </TabList>

              <TabPanels>
                <TabPanel height="54vh">
                  <GeneralInfo employee={employee} onOpen={onRemoveOpen} />
                </TabPanel>

                <TabPanel height="54vh">
                  <Education employee={employee} />
                </TabPanel>

                <TabPanel height="54vh">
                  <Family employee={employee} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
      <RemoveModal
        employee={employee}
        isOpen={isRemoveOpen}
        onClose={onRemoveClose}
      />
    </>
  )
}