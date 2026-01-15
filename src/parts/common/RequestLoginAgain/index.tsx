import { FC } from 'react'
import { useRequestLoginAgain } from './hooks/useRequestLoginAgain'

export const RequestLoginAgain: FC = () => {
  const { handleClickBackToLogin } = useRequestLoginAgain()

  return (
    <div>
      <p>Bạn sẽ bị đăng xuất khỏi hệ thống do đã hết thời gian đăng nhập</p>
      <button onClick={handleClickBackToLogin}>Quay lại màn hình đăng nhập</button>
    </div>
  )
}
