import { API_BASE_URL } from '@hn/constants'
import axios from 'axios'

export const apiClient = axios.create({ baseURL: API_BASE_URL })
