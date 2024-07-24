import apiClient from '@hn/apis/apiClient'

import { GetTodoListResponse } from './types'

export const getTodoList = (): Promise<GetTodoListResponse> => {
  return apiClient.get('todos')
}
