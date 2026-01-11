export type RepositoryErrorCode =
  /** Tham số không hợp lệ */
  | 'INVALID_ARGUMENT'
  /** Chưa đăng nhập */
  | 'UNAUTHENTICATED'
  /** Không có quyền thao tác */
  | 'PERMISSION_DENIED'
  /** Không thoả điều kiện tiên quyết */
  | 'FAILED_PRECONDITION'
  /** Không tìm thấy tài nguyên */
  | 'NOT_FOUND'
  /** Tài nguyên đã tồn tại */
  | 'ALREADY_EXISTS'
  /** Lỗi hệ thống */
  | 'INTERNAL'
  /** Dịch vụ không khả dụng */
  | 'UNAVAILABLE'
  /** Lỗi không xác định */
  | 'UNKNOWN'

export class RepositoryError extends Error {
  static name = 'RepositoryError'
  code: RepositoryErrorCode

  constructor(code: RepositoryErrorCode, options?: ErrorOptions) {
    super(`RepositoryError: ${code} error`, options)
    this.code = code
  }
}
