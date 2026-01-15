import { useCallback, useEffect, useState } from 'react'

type Args<T> = {
  /** Được gọi khi người dùng click chuột */
  handleClick?: (event?: T) => void
  /** Được gọi khi người dùng double click chuột */
  handleDblClick?: (event?: T) => void
}

type ReturnType<T> = (event?: T) => void

/**
 * Một custom hook được sử dụng để khai báo handler khi click chuột
 *
 * @param argument Xem {@link Args} để biết thêm
 * @returns Một handler chung cho việc click chuột
 */
export const useHandleClick = <T>({ handleClick, handleDblClick }: Args<T>): ReturnType<T> => {
  const [clickTimes, setClickTimes] = useState(0)
  const [event, setEvent] = useState<T>()

  const handler = useCallback(
    (event?: T) => {
      setClickTimes(prev => prev + 1)
      setEvent(event)
    },
    [setClickTimes, setEvent]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      if (clickTimes === 1) {
        handleClick?.(event)
      }

      setClickTimes(0)
    }, 250)

    if (clickTimes === 2) {
      handleDblClick?.(event)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [clickTimes, event, handleClick, handleDblClick])

  return handler
}
