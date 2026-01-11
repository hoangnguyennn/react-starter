import { ListTodosResponse } from '@hn/infra/repositories/todo/listTodos/types'
import { createMockHandlerFactory } from '@hn/mocks/utils/createMockHandlerFactory'
import { HttpHandler } from 'msw'

const mockData: ListTodosResponse = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  }
]

export const getTodoListHandlerFactory: ReturnType<typeof createMockHandlerFactory> =
  createMockHandlerFactory({
    apiPath: '/todos',
    successResponse: mockData,
    method: 'get'
  })

export const getTodoListHandlers: HttpHandler[] = [getTodoListHandlerFactory.success()].filter(
  (argument): argument is HttpHandler => argument !== undefined
)
