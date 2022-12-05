export const baseStyle = {
  field: {
    bg: "white",
    borderColor: "brown",
    height: "44px",
  }
}

const defaultProps = {
  variant: "outline",
}

export const Input = {
  variants: {
    outline: {
      field: {
        ...baseStyle.field,
        _hover: {
          borderColor: "black",
        },
        _disabled: {
          opacity: "0.5",
        },
      }
    },
  },
  defaultProps,
}