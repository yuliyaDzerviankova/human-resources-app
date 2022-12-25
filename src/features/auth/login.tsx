import React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, AlertDescription, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Tooltip } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type User = {
  username: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()
  const loginSchema = z.object({
    username: z.string().nonempty({ message: "Пожалуйста введите логин" }),
    password: z.string().nonempty({ message: "Пожалуйста введите пароль" }),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(loginSchema)
  })

  const auth = (data: User) => {
    console.log(data)
    navigate("/home")
    // TODO: авторизация пользователя
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
        {/*<Alert variant="error" mb={4}>*/}
        {/*  <AlertDescription>Логин и/или пароль не совпадают</AlertDescription>*/}
        {/*</Alert>*/}

        <Stack spacing={5} direction="column" as="form" width="90%" onSubmit={handleSubmit(auth)} flex={1}>
          <FormControl>
            <Flex direction="column">
              <FormLabel>Логин</FormLabel>
              <Tooltip label={errors.username?.message} placement="left" hasArrow>
                <Input {...register("username")} placeholder="Введите логин" />
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