import { ListTodosPage } from '@hn/pages/todos'
import DefaultLayout from '@hn/parts/layouts/DefaultLayout'
import { RouteObject } from 'react-router-dom'

export const TodoListRouteObject: RouteObject = {
  path: '/todos',
  element: (
    <DefaultLayout>
      <ListTodosPage />
    </DefaultLayout>
  )
}
