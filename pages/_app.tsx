import "../styles/globals.css"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import "components/data/i18n"
import { ThemeProvider } from "theme-ui"

import { theme } from "../theme"

function CheckoutApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(CheckoutApp)
