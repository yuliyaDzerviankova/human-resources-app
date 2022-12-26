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
import { Types } from "./features/providers/reducers"
import { EmployeeContext } from "./features/providers/context"

const App = () => {
  const { setColorMode } = useColorMode()
  const navigate = useNavigate()
  const location = useLocation()
  const { dispatch } = useContext(EmployeeContext)
  const [user, setUser] = useState<{ id: string; access: string; login: string }>({
    id: "",
    access: "",
    login: "",
  })

  useEffect(() => {    
    const storage = sessionStorage.getItem("userId") || ""
    const id = storage && JSON.parse(storage)
    if (id) {
      axios(`http://localhost:8080/users/${id}`)
      .then((res) => {
        const resData: { id: string; access: string; login: string } = res.data
        const obj: { id: string; access: string; login: string } = {
          id: id,
          access: resData.id, 
          login: resData.login
        }
        setUser(obj)
        // @ts-ignore
        dispatch({ type: Types.SetUser, payload: { obj } })
      })
      .catch((err) => console.log(err)) 
    }
  }, [location])
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setColorMode("light"), [])

  const logout = () => {
    sessionStorage.clear()
    navigate("/")
  }

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
              {user.login}
            </Text>
            <Link
              _hover={{
                textDecoration: "underline",
                textDecorationColor: "ash_gray"
              }}
              onClick={logout}
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
