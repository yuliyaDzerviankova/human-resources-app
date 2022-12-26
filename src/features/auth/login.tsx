import React, { useContext, useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, AlertDescription, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Tooltip } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { EmployeeContext } from "../providers/context"
import { Types } from "../providers/reducers"

type User = {
  login: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)
  const { dispatch } = useContext(EmployeeContext)
  const loginSchema = z.object({
    login: z.string().nonempty({ message: "Пожалуйста введите логин" }),
    password: z.string().nonempty({ message: "Пожалуйста введите пароль" }),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(loginSchema)
  })

  const auth = (data: User) => {
    axios.post("http://localhost:8080/users/login", data)
    .then((res) => {
      if (res.status === 200) {
        const userData = {
          id: res.data.id,
          login: res.data.login,
          accessId: res.data.access
        }
        // @ts-ignore
        dispatch({ type: Types.SetUser, payload: { ...userData } })
        navigate("/home")
      }
    })
    .catch(() => {
      setIsError(true)
      setTimeout(() => setIsError(false), 3000)
    })
  }

  return (
    <Stack flex={1} p={4} justifyContent="start" align="center">
      <Flex height="40vh" align="center" justify="center">
        <Heading textAlign="center" my={14} fontSize="60px">Human Resource</Heading>
      </Flex>

      <Flex
        align="center"
        justify="center"
        direction="column"
        bg="hookers_green"
        borderRadius={10}
        py={10}
        px={10}
        width="25rem"
      >
        {isError && (
          <Alert variant="error" mb={4}>
            <AlertDescription>Логин и/или пароль не совпадают</AlertDescription>
          </Alert>
        )}

        <Stack spacing={5} direction="column" as="form" width="90%" onSubmit={handleSubmit(auth)} flex={1}>
          <FormControl>
            <Flex direction="column">
              <FormLabel>Логин</FormLabel>
              <Tooltip label={errors.login?.message} placement="left" hasArrow>
                <Input {...register("login")} placeholder="Введите логин" />
              </Tooltip>
            </Flex>
          </FormControl>

          <FormControl mb={6}>
            <Flex direction="column">
              <FormLabel>Пароль</FormLabel>
              <Tooltip label={errors.password?.message} hasArrow placement="left">
                <Input {...register("password")} placeholder="Введите пароль" type="password" />
              </Tooltip>
            </Flex>
          </FormControl>
          
          <Flex align="center" justify="space-between">
            <Link onClick={() => navigate("/register")} textDecoration="underline">Зарегистрироваться</Link>
            <Button type="submit" height="44px">Войти</Button>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  )
}