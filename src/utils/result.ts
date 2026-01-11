const OK = 'OK'
const ERR = 'ERR'

type OK = typeof OK
type ERR = typeof ERR

/** Kiểu dữ liệu của response thành công */
export type Ok<T> = {
  /** @private */
  _type: OK
  /** @deprecated sử dụng `unwrapOk` thay thế */
  _value: T
}

/** Kiểu dữ liệu của response thất bại */
export type Err<T extends Error> = {
  /** @private */
  _type: ERR
  /** @deprecated sử dụng `unwrapErr` thay thế */
  _error: T
}

/** Kiểu dữ liệu của response */
export type Result<T, E extends Error = Error> = Ok<T> | Err<E>

/** Wrap kết quả với tag thành công */
export const ok = <T>(value: T): Ok<T> => ({ _type: OK, _value: value })

/** Wrap kết quả với tag thất bại */
export const err = <E extends Error>(error: E): Err<E> => ({ _type: ERR, _error: error })

/** Kiểm tra liệu kết quả có thành công không */
export const isOk = <T, E extends Error>(result: Result<T, E>): result is Ok<T> =>
  result._type === OK

/** Kiểm tra liệu kết quả có thất bại không */
export const isErr = <T, E extends Error>(result: Result<T, E>): result is Err<E> =>
  result._type === ERR

/** Unwrap kết quả thành công */
export const unwrapOk = <T>(ok: Ok<T>): T => ok._value

/** Unwrap kết quả thất bại */
export const unwrapErr = <E extends Error>(err: Err<E>): E => err._error
