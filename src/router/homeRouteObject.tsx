import DefaultLayout from '@hn/layouts/DefaultLayout'
import HomePage from '@hn/pages/home'
import { RouteObject } from 'react-router-dom'

export const homeRouteObject: RouteObject = {
  path: '/',
  element: (
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  )
}
