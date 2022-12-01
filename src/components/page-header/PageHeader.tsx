import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Flex, Heading, Button } from "@chakra-ui/react"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

type PageHeaderProps = {
  title: string
  marginBottom?: string
  isArrow?: boolean
  link?: string
  isGoBack?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  marginBottom = "0",
  isArrow = false,
  link = "",
  isGoBack = false,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <Flex align="center" data-testid="page-header" justify="space-between" mb={marginBottom} px={4} py={8} width="90%">
      <Heading
        _hover={{ textDecoration: isArrow ? "underline" : "none", cursor: isArrow ? "pointer" : "auto" }}
        alignItems="center"
        data-testid="header-title"
        display="flex"
        fontWeight="bold"
        fontSize="25px"
        size="md"
        onClick={() => (isGoBack ? navigate(-1) : navigate(link || location.pathname))}
      >
        {isArrow && <ChevronLeftIcon mr={3} width="20px" />}
        {title}
      </Heading>
    </Flex>
  )
}