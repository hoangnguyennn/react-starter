import { useCallback } from 'react'
import { useNavigate } from 'react-router'

export const useRequestLoginAgain = () => {
  const navigate = useNavigate()

  const handleClickBackToLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  return { handleClickBackToLogin }
}
