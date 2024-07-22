import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import 'bootstrap/dist/css/bootstrap.min.css'

import '@hn/assets/styles/main.scss'

import '@hn/locales'

import router from '@hn/router'
import store, { persistor } from '@hn/store'
import BxSnackbarList from '@hn/components/common/BxSnackbarList'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <BxSnackbarList />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
