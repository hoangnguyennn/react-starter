import { useListTodos } from '@hn/domains/interactors/useListTodos'

export const Presentation = () => {
  const { todos } = useListTodos()
  return (
    <ol>
      {todos.map(todo => (
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
