import { RequestHandler } from 'msw'
import { getTodoListHandlers } from '../../src/mocks/todo/listTodos/mock'

export const handlers: RequestHandler[] = [...getTodoListHandlers]
