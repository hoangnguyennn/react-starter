import { Provider } from 'react-redux'
import store, { persistor } from '@hn/store'
import React, { FC, PropsWithChildren } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import 'bootstrap/dist/css/bootstrap.min.css'

import '@hn/assets/styles/main.scss'

import '@hn/locales'

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}
