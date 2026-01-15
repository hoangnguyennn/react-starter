import ExamplePage from '@hn/pages/example'
import BlankLayout from '@hn/parts/layouts/BlankLayout'
import { RouteObject } from 'react-router-dom'

export const ExampleRouteObject: RouteObject = {
  path: '/example',
  element: (
    <BlankLayout>
      <ExamplePage />
    </BlankLayout>
  )
}
