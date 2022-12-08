export const Alert = {
    parts: ["container"],
    baseStyle: {
      container: {
        borderRadius: ".25rem",
        color: "#2f2f2f",
        px: 3,
        py: 2,
        fontSize: "14px",
      },
    },
    variants: {
      error: {
        container: {
          background: "#fdedeb",
          border: "1px solid",
          borderColor: "#f5b7b1",
        },
      },
      info: {
        container: {
          background: "#e5f2f8",
          border: "1px solid",
          borderColor: "#99cae5",
        },
      },
      warning: {
        container: {
          background: "#fef6e9",
          border: "1px solid",
          borderColor: "#f7c99f",
        },
      },
    },
  }
  