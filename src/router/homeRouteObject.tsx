import { HomePage } from '@hn/pages/home'
import DefaultLayout from '@hn/parts/layouts/DefaultLayout'
import { RouteObject } from 'react-router'

export const homeRouteObject: RouteObject = {
  path: '/',
  element: (
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  )
}
