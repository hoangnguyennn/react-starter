import axios from 'axios'
import { API_BASE_URL } from '../constants'
import store from '../store'
import { getToken } from '../store/reducers/auth.reducer'

const apiClient = axios.create({
  baseURL: API_BASE_URL
})

apiClient.interceptors.request.use(config => {
  const token = getToken()(store.getState())

  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default apiClient
