const baseStyle = {
  table: {
    border: 0,
    borderRadius: 0,
    boxShadow: "none",
    textAlign: "left",
  },
  thead: {
    // color: "text.02",
    textTransform: "uppercase",
  },
  tbody: {
    tr: {
      _hover: {
        // bg: "hover.ui.01",
      },
    },
  },
  th: {
    // bg: "ui.01",
    fontWeight: "bold",
    "& svg.icon--sorted": {
      visibility: "hidden",
    },
    "&:hover svg.icon--sorted": {
      visibility: "visible",
    },
  },
  tr: {
    bg: "ui.background",
    borderBottomWidth: "1px",
    borderColor: "ui.02",
    borderTopWidth: 0,
    height: "tableRow",
  },
}

export const Table = {
  baseStyle
}
