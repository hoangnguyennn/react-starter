import HomePage from '@hn/pages/home'
import DefaultLayout from '@hn/parts/layouts/DefaultLayout'
import { RouteObject } from 'react-router-dom'

export const homeRouteObject: RouteObject = {
  path: '/',
  element: (
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  )
}
