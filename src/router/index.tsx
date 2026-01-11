import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { ExampleRouteObject } from './exampleRouteObject'
import { homeRouteObject } from './homeRouteObject'
import { TodoListRouteObject } from './todoListRouteObject'

export const routes: RouteObject[] = [homeRouteObject, ExampleRouteObject, TodoListRouteObject]

const router = createBrowserRouter(routes)

export default router
