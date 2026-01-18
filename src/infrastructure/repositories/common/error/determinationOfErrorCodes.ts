import { err, Err } from '@hn/utils/result'
import { AxiosError } from 'axios'
import { RepositoryError } from './repositoryError'

/**
 * Hàm chuyển AxiosError thành RepositoryError với mã lỗi tương ứng.
 *
 * @todo Khi số lượng mã lỗi tăng lên, có thể sẽ phải sử dụng error code trong body để phân biệt chi
 *   tiết hơn.
 */
export const determinationOfErrorCodes = (error: AxiosError | Error): Err<RepositoryError> => {
  if (!(error instanceof AxiosError)) {
    return err(new RepositoryError('UNKNOWN', { cause: error }))
  }

  switch (error.status) {
    case 400:
      return err(new RepositoryError('INVALID_ARGUMENT', { cause: error }))
    case 401:
      return err(new RepositoryError('UNAUTHENTICATED', { cause: error }))
    case 403:
      return err(new RepositoryError('PERMISSION_DENIED', { cause: error }))
    case 404:
      return err(new RepositoryError('NOT_FOUND', { cause: error }))
    case 409:
      return err(new RepositoryError('ALREADY_EXISTS', { cause: error }))
    case 412:
      return err(new RepositoryError('FAILED_PRECONDITION', { cause: error }))
    case 500:
      return err(new RepositoryError('INTERNAL', { cause: error }))
    case 503:
      return err(new RepositoryError('UNAVAILABLE', { cause: error }))
    default:
      return err(new RepositoryError('UNKNOWN', { cause: error }))
  }
}
