import '@hn/locales'
import store, { persistor } from '@hn/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient()

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
