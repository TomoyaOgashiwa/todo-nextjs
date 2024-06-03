import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, MantineProvider } from '@mantine/core'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'
import { useEffect } from 'react'

const theme = createTheme({})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // trueの場合はデフォルトでデータの取得に失敗した場合は3回まで再取得を試みる
      refetchOnWindowFocus: false, // trueだとユーザーがウィンドウをフォーカスした際にフェッチが走る
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`,
      )
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
