import { ErrorBoundary } from '@hn/parts/common/ErrorBoundary'
import { Suspense } from 'react'
import { Presentation } from './presentation'

/** Màn hình danh sách todo. */
export const ListTodosPage = () => (
  <ErrorBoundary renderFallback={() => null}>
    <Suspense fallback={null}>
      <Presentation />
    </Suspense>
  </ErrorBoundary>
)
