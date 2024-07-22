import { useDispatch } from 'react-redux'

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

export const useAppDispatch = () => {
  return useDispatch<ThunkDispatch<Store.IRootState, null, AnyAction>>()
}
