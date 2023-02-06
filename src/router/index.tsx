import { createBrowserRouter, RouteObject } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import ExamplePage from '../pages/ExamplePage'
import DefaultLayout from '../layouts/DefaultLayout'
import BlankLayout from '../layouts/BlankLayout'

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
