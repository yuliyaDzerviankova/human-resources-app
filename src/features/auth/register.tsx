import React, { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, AlertDescription, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Tooltip } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"

type User = {
  login: string
  password: string
}

export const Register = () => {
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState("")
  const loginSchema = z.object({
    login: z.string().nonempty({ message: "Пожалуйста введите логин" }),
    password: z.string().nonempty({ message: "Пожалуйста введите пароль" }),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(loginSchema)
  })

  const auth = (data: User) => {
    const user = {
      login: data.login,
      password: data.password,
      access: {
        id: 3,
        accessName: "Local"
      },
    }
    axios.post("http://localhost:8080/users/create", user)
    .then((res) => {
      if (res.status === 201) {
        setIsError(false)
        setMessage("Пользователь зарегистрирован")
        setTimeout(() => navigate("/"), 5000)
      }
    })
    .catch(() => {
      setIsError(true)
      setMessage("Пользователь с таким именем уже существует")
      setTimeout(() => setMessage(""), 3000)
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
        {message && (
          <Alert variant={isError ? "error" : "info"} mb={4}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Stack spacing={5} direction="column" as="form" width="90%" onSubmit={handleSubmit(auth)} flex={1}>
          <FormControl>
            <Flex direction="column">
              <FormLabel>Логин</FormLabel>
              <Tooltip label={errors.login?.message} placement="left" hasArrow>
                <Input placeholder="Введите логин" {...register("login")} />
              </Tooltip>
            </Flex>
          </FormControl>

          <FormControl mb={6}>
            <Flex direction="column">
              <FormLabel>Пароль</FormLabel>
              <Tooltip label={errors.password?.message} hasArrow placement="left">
                <Input placeholder="Введите пароль" {...register("password")} type="password" />
              </Tooltip>
            </Flex>
          </FormControl>

          <Flex align="center" justify="space-between">
            <Link onClick={() => navigate("/")} textDecoration="underline">Войти</Link>
            <Button type="submit" height="44px">Зарегистрироваться</Button>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  )
}