import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Component, FC, PropsWithChildren, ReactNode, useCallback } from 'react'

type Props = PropsWithChildren<{
  onRetry?: () => void
  /**
   * Một react component, sẽ được hiển thị khi có lỗi xảy ra
   *
   * @param props
   * @param props.error Lỗi đã xảy ra
   * @param props.retry Hàm để thử lại (gọi lại render của children)
   * @returns
   */
  renderFallback: (props: { error: unknown; retry: () => void }) => ReactNode
}>

type State = {
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

  render() {
    const { children } = this.props

    if (!this.state.error) {
      return children
    }

    return
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
