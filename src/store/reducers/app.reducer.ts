import { createSlice, createSelector } from '@reduxjs/toolkit'
import i18n from '~/locales'

const initialState: Store.IAppState = {
  isLoading: false,
  language: 'en'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoading(state, action: Store.IAction<boolean>) {
      state.isLoading = action.payload
    },
    setLanguage(state, action: Store.IAction<string>) {
      state.language = action.payload
      i18n.changeLanguage(action.payload)
    }
  }
})

// action
export const { setIsLoading, setLanguage } = appSlice.actions

// selector
const appState = (state: Store.IRootState) => state.app
const _createSelector = <T>(combiner: { (state: Store.IAppState): T }) => {
  return createSelector(appState, combiner)
}

export const getIsLoading = () => _createSelector(state => state.isLoading)

export const getLanguage = () => _createSelector(state => state.language)

// reducer
export default appSlice.reducer
