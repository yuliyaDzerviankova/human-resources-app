export const Button = {
  baseStyle: {
    fontWeight: "normal",
    borderRadius: "base",
    lineHeight: "1.2",
    _disabled: {
      opacity: "0.5",
    }
  },
  variants: {
    primary: {
      bg: "dark_slate_gray",
      color: "ash_gray",
      _hover: {
        bg: "hookers_green",
      }
    },
  },
  defaultProps: {
    variant: "primary",
  }
}