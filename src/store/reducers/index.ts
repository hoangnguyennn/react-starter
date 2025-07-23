import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './app.reducer'
import authReducer from './auth.reducer'
import pageBuilderReducer from './pageBuilder.reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  pageBuilder: pageBuilderReducer
})

export default rootReducer
