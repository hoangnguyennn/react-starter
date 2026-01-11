import BlankLayout from '@hn/layouts/BlankLayout'
import ExamplePage from '@hn/pages/example'
import { RouteObject } from 'react-router-dom'

export const ExampleRouteObject: RouteObject = {
  path: '/example',
  element: (
    <BlankLayout>
      <ExamplePage />
    </BlankLayout>
  )
}
