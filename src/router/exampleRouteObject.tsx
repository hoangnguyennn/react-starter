import { ExamplePage } from '@hn/pages/example'
import BlankLayout from '@hn/parts/layouts/BlankLayout'
import { RouteObject } from 'react-router'

export const exampleRouteObject: RouteObject = {
  path: '/example',
  element: (
    <BlankLayout>
      <ExamplePage />
    </BlankLayout>
  )
}
