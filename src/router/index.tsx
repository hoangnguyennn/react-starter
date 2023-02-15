import { createBrowserRouter, RouteObject } from 'react-router-dom'

import HomePage from '@hn/pages/HomePage'
import ExamplePage from '@hn/pages/ExamplePage'
import DefaultLayout from '@hn/layouts/DefaultLayout'
import BlankLayout from '@hn/layouts/BlankLayout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    )
  },
  {
    path: '/example',
    element: (
      <BlankLayout>
        <ExamplePage />
      </BlankLayout>
    )
  }
]

const router = createBrowserRouter(routes)

export default router
