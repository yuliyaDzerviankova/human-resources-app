import React, { useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { Flex, useColorMode } from '@chakra-ui/react'
import { Login } from "./features/auth/login"
import { Home } from "./components/home/Home"
import { Register } from "./features/auth/register"
import { AddEmployee } from "./features/auth/employees/AddEmployee"

const App = () => {
  const { setColorMode } = useColorMode()

  useEffect(() => setColorMode("light"), [])

  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/addEmployee", element: <AddEmployee /> },
  ])

  return (
    <Flex flex={1} maxH="100vh" minH="100vh" width="100%" background="ash_gray">
      {routes}
    </Flex>
  )
}

export default App
