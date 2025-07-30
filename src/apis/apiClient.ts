import { API_BASE_URL } from '@hn/constants'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { OFFLINE_MESSAGE } from './apiErrors'

const apiClient = axios.create({
  baseURL: API_BASE_URL
})

apiClient.interceptors.request.use(config => {
  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    if (!error.response) {
      console.log(OFFLINE_MESSAGE)
      return
    }

    return Promise.reject(error)
  }
)

export default apiClient
