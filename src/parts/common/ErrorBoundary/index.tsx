import { isUnauthenticatedError } from '@hn/utils/isUnauthenticatedError'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Component, FC, PropsWithChildren, ReactNode, useCallback } from 'react'

const isUnavailableError = (error: unknown) => isUnauthenticatedError(error)

type Props = PropsWithChildren<{
  onRetry?: () => void
  /**
   * Một react component, sẽ được hiển thị khi có lỗi xảy ra.
   *
   * @param props
   * @param props.error Lỗi đã xảy ra.
   * @param props.retry Hàm để thử lại (gọi lại render của children)
   *
   * @returns
   */
  renderFallback: (props: { error: unknown; retry: () => void }) => ReactNode
}>

type State = {
  /** Lỗi bắt được từ component con. */
  error: unknown
}

class ErrorBoundaryBase extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  handleRetry(): void {
    this.setState({ error: null })
    this.props.onRetry?.()
  }

  render() {
    const { error } = this.state
    const { children, renderFallback } = this.props

    if (!error) {
      return children
    }

    // Một số loại lỗi sẽ không thể bắt được trên UI mà sẽ đẩy ra ngoài
    if (isUnavailableError(error)) {
      throw error
    }

    const Component = renderFallback
    return <Component error={error} retry={this.handleRetry} />
  }
}

export const ErrorBoundary: FC<Props> = ({ onRetry, ...rest }) => {
  const { reset } = useQueryErrorResetBoundary()

  const handleRetry = useCallback(() => {
    reset()
    onRetry?.()
  }, [reset, onRetry])

  return <ErrorBoundaryBase {...rest} onRetry={handleRetry} />
}
