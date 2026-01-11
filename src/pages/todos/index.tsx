import { ErrorBoundary } from '@hn/parts/common/ErrorBoundary'
import { Suspense } from 'react'
import { Presentation } from './presentation'

/** Màn hình danh sách todo */
export const ListTodosPage = () => {
  return (
    <ErrorBoundary renderFallback={() => null}>
      <Suspense fallback={null}>
        <Presentation />
      </Suspense>
    </ErrorBoundary>
  )
}
