import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme/theme"
import { EmployeesProvider } from "./features/providers/context"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  // @ts-ignore
  <EmployeesProvider>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
    </BrowserRouter>
  </EmployeesProvider>
)