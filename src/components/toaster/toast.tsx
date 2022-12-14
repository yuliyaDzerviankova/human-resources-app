import React from "react"
import { IconButton, Flex, Text } from "@chakra-ui/react"
import { ToastStatus } from "./notification-status"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icons } from "./icons"

export type ToastProps = {
  description: string
  title: string
  status: ToastStatus
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({description, title, status, onClose }) => {
  const backgroundColors: { [key in ToastStatus]: string } = {
    error: "#fdedeb",
    success: "#e8f1e1",
  }

  const borderColors: { [key in ToastStatus]: string } = {
    error: "#f5b7b1",
    success: "#b8d99b",
  }
  

  return (
    <Flex
      bg={backgroundColors[status]}
      borderColor={borderColors[status]}
      borderRadius="md"
      borderWidth="1px"
      boxShadow="box"
      minH="20"
      minW="80"
      w="fit-content"
    >
      <Flex pl="4" pt="4">
        {icons[status]}
      </Flex>
      <Flex direction="column" p="3" w="full">
        <Text alignSelf="stretch" fontWeight="semibold" color="text">
          {title}
        </Text>
        <Text variant="#2f2f2f">{description}</Text>
      </Flex>
      <IconButton
        _hover={{ background: "transparent", color: "#000000" }}
        alignItems="flex-start"
        aria-label="close"
        pt="3"
        variant="ghost"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faClose} color="#2f2f2f" />
      </IconButton>
    </Flex>
  )
}
