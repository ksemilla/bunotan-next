// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { verifyToken } from "@/api";
import { useAuthStore } from "@/stores";

export default function App(props: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const setIsLogged = useAuthStore((state) => state.setIsLogged);
  const { Component, pageProps } = props;

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      verifyToken(accessToken)
        .then((res) => {
          setIsLogged(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        {isLoading ? "Loading..." : <Component {...pageProps} />}
      </MantineProvider>
    </>
  );
}
