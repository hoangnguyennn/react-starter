import { useEffect, useState } from 'react'

export const useHandleClick = <T>(
  handleClick: Types.Callback<Types.Optional<T>>,
  handleDblClick: Types.Callback<Types.Optional<T>>
) => {
  const [clickTimes, setClickTimes] = useState(0)
  const [event, setEvent] = useState<Types.Optional<T>>(undefined)

  const handler = (event: T) => {
    setClickTimes(prev => prev + 1)
    setEvent(event)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (clickTimes === 1) {
        handleClick(event)
      }

      setClickTimes(0)
    }, 250)

    if (clickTimes === 2) {
      handleDblClick(event)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [clickTimes, event, handleClick, handleDblClick])

  return handler
}
