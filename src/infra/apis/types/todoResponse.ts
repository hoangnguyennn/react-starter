export type Todo = {
  id: number
  title: string
  completed: boolean
  userId: number
}

/** Response type của listTodos. */
export type ListTodosResponse = Todo[]
