import '@hn/locales'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, PropsWithChildren } from 'react'

const queryClient = new QueryClient()

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </React.StrictMode>
  )
}
