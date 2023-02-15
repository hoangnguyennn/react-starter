import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/styles/main.scss'

import './locales'

import router from './router'
import store from './store'
import BxSnackbarList from './components/common/BxSnackbarList'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <BxSnackbarList />
    </Provider>
  </React.StrictMode>
)
