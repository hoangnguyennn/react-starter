import { useQuery } from '@tanstack/react-query'

import { getTodoList } from '@hn/repositories/todo/getList'

/** Màn hình danh sách todo */
const TodosPage = () => {
  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodoList
  })

  if (isLoading) return 'Loading...'

  if (isError) return 'Error'

  return (
    <ol>
      {data.map(todo => (
        <li
          key={todo.id}
          style={{
            color: todo.completed ? 'gray' : 'black',
            cursor: todo.completed ? 'not-allowed' : 'default',
            userSelect: todo.completed ? 'none' : 'auto'
          }}
        >
          {todo.title}
        </li>
      ))}
    </ol>
  )
}

export default TodosPage
