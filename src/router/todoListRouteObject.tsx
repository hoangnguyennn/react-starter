import { ListTodosPage } from '@hn/pages/todos'
import DefaultLayout from '@hn/parts/layouts/DefaultLayout'
import { RouteObject } from 'react-router'

export const todoListRouteObject: RouteObject = {
  path: '/todos',
  element: (
    <DefaultLayout>
      <ListTodosPage />
    </DefaultLayout>
  )
}
