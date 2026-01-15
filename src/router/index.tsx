import { RouteErrorBoundary } from '@hn/parts/common/RouteErrorBoundary'
import { Outlet, RouteObject, createBrowserRouter } from 'react-router'
import { exampleRouteObject } from './exampleRouteObject'
import { homeRouteObject } from './homeRouteObject'
import { todoListRouteObject } from './todoListRouteObject'

// TODO: Triển khai route login
export const routes: RouteObject[] = [
  {
    element: (
      <RouteErrorBoundary>
        <Outlet />
      </RouteErrorBoundary>
    ),
    children: [homeRouteObject, exampleRouteObject, todoListRouteObject]
  }
]

const router = createBrowserRouter(routes)

export default router
