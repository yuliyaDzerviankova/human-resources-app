import React from "react"
import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type MenuProps = {
  menuButtonIcon: IconProp
  menuItems: { name: string, icon: IconProp, onClick: () => void }[]
}

export const Menu: React.FC<MenuProps> = ({ menuButtonIcon, menuItems }) => {
  return (
    <ChakraMenu placement="bottom-end">
      <MenuButton as={IconButton} _hover={{ background: "charcoal" }} background="dark_sea_green" icon={<FontAwesomeIcon icon={menuButtonIcon} />} onClick={(event) => event.stopPropagation()} />
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem key={item.name} onClick={item.onClick} icon={<FontAwesomeIcon icon={item.icon} />} px={5} py={4}>{item.name}</MenuItem>
        ))}
      </MenuList>
    </ChakraMenu>
  )
}