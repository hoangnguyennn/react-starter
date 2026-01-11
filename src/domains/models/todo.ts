import z from 'zod'

/** Schema của todo */
export const todoSchema = z.object({
  /** Todo ID */
  id: z.number(),
  /** Tiêu đề của todo */
  title: z.string().min(1).max(255),
  /** Trạng thái hoàn thành của todo */
  completed: z.boolean().default(false),
  /** ID người tạo todo */
  userId: z.number()
})

/** Type của todo */
export type Todo = z.infer<typeof todoSchema>
