import { RouteErrorBoundary } from '@hn/parts/common/RouteErrorBoundary'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { ExampleRouteObject } from './exampleRouteObject'
import { homeRouteObject } from './homeRouteObject'
import { TodoListRouteObject } from './todoListRouteObject'

// TODO: Triển khai route login
export const routes: RouteObject[] = [
  {
    element: <RouteErrorBoundary />,
    children: [homeRouteObject, ExampleRouteObject, TodoListRouteObject]
  }
]

const router = createBrowserRouter(routes)

export default router
