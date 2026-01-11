import DefaultLayout from '@hn/layouts/DefaultLayout'
import { ListTodosPage } from '@hn/pages/todos'
import { RouteObject } from 'react-router-dom'

export const TodoListRouteObject: RouteObject = {
  path: '/todos',
  element: (
    <DefaultLayout>
      <ListTodosPage />
    </DefaultLayout>
  )
}
