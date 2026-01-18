import { Todo } from '@hn/models/todo'
import { listTodos } from '@hn/repositories/todo/listTodos'
import { isErr, unwrapErr, unwrapOk } from '@hn/utils/result'
import { useSuspenseQuery } from '@tanstack/react-query'

type ReturnValue = {
  todos: Todo[]
}

export const useListTodos = (): ReturnValue => {
  const { data } = useSuspenseQuery({
    queryKey: ['listTodos'],
    queryFn: async () => {
      const result = await listTodos()

      if (isErr(result)) {
        throw unwrapErr(result)
      }

      return unwrapOk(result)
    }
  })

  return {
    todos: data
  }
}
