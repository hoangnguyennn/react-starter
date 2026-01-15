import { isUnauthenticatedError } from '@hn/utils/isUnauthenticatedError'
import { Component, PropsWithChildren } from 'react'
import { RequestLoginAgain } from '../RequestLoginAgain'
import { ServerError } from '../ServerError'

type Props = PropsWithChildren

type State = {
  /** Lỗi bắt được từ component con. */
  error: unknown
}

export class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (!error) {
      return children
    }

    if (isUnauthenticatedError(error)) {
      return <RequestLoginAgain />
    }

    return <ServerError />
  }
}
