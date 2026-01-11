import { AxiosError } from 'axios'

export const isNetworkError = (error: unknown): error is AxiosError =>
  error instanceof AxiosError && !error.response
