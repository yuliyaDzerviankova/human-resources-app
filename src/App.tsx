import React, { useEffect } from "react"
import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import { Flex, useColorMode, Text, Link, Stack } from '@chakra-ui/react'
import { Login } from "./features/auth/login"
import { Home } from "./components/home/Home"
import { Register } from "./features/auth/register"
import { EmployeeChanges } from "./features/employees/EmployeeChanges"
import { Educations } from "./features/educations/Educations"
import { faUser, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PrintEmployee } from "./components/employee-card/PrintEmployee"

const App = () => {
  const { setColorMode } = useColorMode()
  const navigate = useNavigate()
  const location = useLocation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setColorMode("light"), [])

  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/addEmployee", element: <EmployeeChanges /> },
    { path: "/editEmployee/:id", element: <EmployeeChanges /> },
    { path: "/educations", element: <Educations /> },
    { path: "/printEmployee/:id", element: <PrintEmployee /> }
  ])
  

  return (
    <Flex flex={1} height="100%" minH="100vh" width="100%" background="ash_gray">
      <Stack width="100%">
        {(location.pathname !== "/" && !location.pathname.includes("/register")) &&
          <Flex align="center" justify="flex-end" width="100%" p={4} bg="charcoal">
            <FontAwesomeIcon icon={faUser} color="#CAD2C5" />
            <Text
              display="flex"
              alignItems="center"
              ml={2}
              color="ash_gray"
              fontSize="14px"
              pr={5}
            >
              Admin
            </Text>
            <Link
              _hover={{
                textDecoration: "underline",
                textDecorationColor: "ash_gray"
              }}
              onClick={() => navigate("/")}
              fontSize="14px"
              ml={5}
              display="flex"
              alignItems="center"
            >
              <FontAwesomeIcon icon={faSignOut} color="#CAD2C5" />
              <Text ml={2} color="ash_gray">Выйти</Text>
            </Link>
          </Flex>
        }
        {routes}
      </Stack>
    </Flex>
  )
}

export default App
