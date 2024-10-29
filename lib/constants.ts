import { Theme, DefaultTheme as defaultTheme } from "@react-navigation/native"

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // --background
    border: "hsl(214.3 31.8% 91.4%)", // --border
    card: "hsl(0 0% 100%)", // --card
    notification: "hsl(0 84.2% 60.2%)", // --destructive
    primary: "hsl(216.12 91.59% 58.04%)", // --primary
    text: "hsl(222.2 84% 4.9%)", // --foreground
  },
  dark: {
    background: "hsl(222.2 84% 4.9%)", // --background
    border: "hsl(217.2 32.6% 17.5%)", // --border
    card: "hsl(222.2 84% 4.9%)", // --card
    notification: "hsl(0 62.8% 30.6%)", // --destructive
    primary: "hsl(217.2 91.2% 59.8%)", // --primary
    text: "hsl(210 40% 98%)", // --foreground
  },
}

export const LIGHT_THEME: Theme = {
  ...defaultTheme,
  dark: false,
  colors: NAV_THEME.light,
}

export const DARK_THEME: Theme = {
  ...defaultTheme,
  dark: true,
  colors: NAV_THEME.dark,
}
