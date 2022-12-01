export const Tabs = {
  variants: {
    line: {
      tablist: {
        borderBottomWidth: 2,
      },
      tab: {
        borderBottomWidth: 2,
        borderBottomColor: "dark_sea_green",
        _active: {
          bg: "dark_sea_green",
        },
        _selected: {
          color: "dark_slate_gray",
          borderBottomColor: "dark_slate_gray",
        }
      }
    },
  },
  defaultProps: {
    variant: "line",
  }
}