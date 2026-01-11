import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { isNetworkError } from './isNetworkError'
import { isUnauthenticatedError, UnauthenticatedError } from './isUnauthenticatedError'
import { err, ok, Result } from './result'

export const createConnectTo =
  <Req, Res>(
    clientFunction: (requestParams: Req, config?: AxiosRequestConfig) => Promise<AxiosResponse<Res>>
  ): ((...args: Parameters<typeof clientFunction>) => Promise<Result<Res, Error>>) =>
  async (...args) => {
    try {
      const response = await clientFunction(...args)
      return ok(response.data)
    } catch (error) {
      if (isNetworkError(error)) {
        return err(error)
      }

      // Unauthenticated error will be handled by ErrorBoundary
      if (isUnauthenticatedError(error)) {
        throw new UnauthenticatedError('Unauthenticated error', { cause: error })
      }

      if (error instanceof AxiosError) {
        return err(error)
      }

      return err(new Error('Unknown error', { cause: error }))
    }
  }
