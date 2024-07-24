import { HttpHandler } from 'msw'

import { createMockHandlerFactory } from '@hn/mocks/utils/createMockHandlerFactory'

import { GetTodoListResponse } from '../../../repositories/todo/getList/types'

const mockData: GetTodoListResponse = [
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
