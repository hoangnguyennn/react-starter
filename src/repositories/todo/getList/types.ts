/** Type của todo */
export type Todo = {
  /** ID của người tạo todo */
  userId: number
  /** ID của todo */
  id: number
  /** Nội dung của todo */
  title: string
  /** Kiểm tra xem todo có hoàn thành hay không */
  completed: boolean
}

/** Response của API lấy danh sách todo */
export type GetTodoListResponse = Todo[]
