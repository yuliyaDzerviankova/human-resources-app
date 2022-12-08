import React, { useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { Flex, useColorMode } from '@chakra-ui/react'
import { Login } from "./features/auth/login"
import { Home } from "./components/home/Home"
import { Register } from "./features/auth/register"
import { EmployeeChanges } from "./features/employees/EmployeeChanges"

const App = () => {
  const { setColorMode } = useColorMode()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setColorMode("light"), [])

  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/addEmployee", element: <EmployeeChanges /> },
    { path: "/editEmployee/:id", element: <EmployeeChanges /> },
  ])

  return (
    <Flex flex={1} height="100%" minH="100vh" width="100%" background="ash_gray">
      {routes}
    </Flex>
  )
}

export default App
