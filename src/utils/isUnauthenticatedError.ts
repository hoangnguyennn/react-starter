import { AxiosError } from 'axios'

export class UnauthenticatedError extends Error {
  static name = 'UnauthenticatedError'
}

export const isUnauthenticatedError = (error: unknown): error is AxiosError =>
  error instanceof AxiosError && error.response?.status === 401
