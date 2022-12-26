import React, { useState, useEffect, useContext } from "react"
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
import { PrintNewEmployee } from "./features/orders/printNewEmployee"
import { PrintChangePosition } from "./features/orders/printChangePosition"
import { PrintFiredEmployee } from "./features/orders/printFiredEmployee"
import { PrintNewStaffTable } from "./features/orders/printNewStaffTable"
import axios from "axios"
import { EmployeeContext } from "./features/providers/context"
import { Types } from "./features/providers/reducers"

const App = () => {
  const { setColorMode } = useColorMode()
  const navigate = useNavigate()
  const location = useLocation()
  const { state: { globalState: { user } }, dispatch } = useContext(EmployeeContext)

  const [login, setLogin] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    if (user.id) {
      setLogin(user.login)
    } else {
      axios("http://localhost:8080/users/last")
      .then((res) => {
        setLogin(res.data.login)
        setId(res.data.id)
      })
      .catch((err) => console.log(err))
    }
  }, [])
  

  useEffect(() => {
    if (id) {
      axios(`http://localhost:8080/users/${id}`)
      .then((res) => {
        const resData = res.data
        const obj = {
          id: id,
          accessId: resData.id, 
          login: resData.login
        }

        // @ts-ignore
        dispatch({ type: Types.SetUser, payload: { obj } })
      })
      .catch((err) => console.log(err))
    }
  }, [id]) 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setColorMode("light"), [])

  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/addEmployee", element: <EmployeeChanges /> },
    { path: "/editEmployee/:id", element: <EmployeeChanges /> },
    { path: "/educations", element: <Educations /> },
    { path: "/printEmployee/:id", element: <PrintEmployee /> },
    { path: "/printNewEmployee", element: <PrintNewEmployee /> },
    { path: "/printChangePosition", element: <PrintChangePosition /> },
    { path: "/printFiredEmployee", element: <PrintFiredEmployee /> },
    { path: "/printStaffTable", element: <PrintNewStaffTable /> },
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
              {login}
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
