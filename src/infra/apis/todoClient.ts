import { AxiosResponse } from 'axios'
import { apiClient } from './apiClient'
import { ListTodosResponse } from './types/todoResponse'

class TodoClient {
  listTodos(): Promise<AxiosResponse<ListTodosResponse>> {
    return apiClient.get('todos')
  }
}

export const todoClient = new TodoClient()
