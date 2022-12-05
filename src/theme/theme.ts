import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { colors } from "./colors"
import { fonts } from "./fonts"
import { components } from "./components"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors,
  fonts,
  components
})

export default theme