// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import Head from "next/head"
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { verifyToken } from "@/api"
import { useAuthStore } from "@/stores"
import { AppPropsWithLayout } from "@/types/utils"
import { useLocalStorage } from "@mantine/hooks"

export default function App(props: AppPropsWithLayout) {
  const [isLoading, setIsLoading] = useState(true)
  const setIsLogged = useAuthStore((state) => state.setIsLogged)
  const { Component, pageProps } = props

  const getLayout = Component.getLayout || ((page) => page)

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  useEffect(() => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
      verifyToken(accessToken)
        .then((res) => {
          setIsLogged(true)
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
          }}
        >
          {isLoading ? "Loading..." : getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
