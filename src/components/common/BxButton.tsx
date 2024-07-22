import classNames from 'classnames'
import { FC, PropsWithChildren, useMemo } from 'react'
import Button, { ButtonProps } from 'react-bootstrap/Button'

import { usePropsChange } from '@hn/hooks/usePropsChange'

export interface BxButtonProps extends ButtonProps {
  rounded?: boolean
}

const BxButton: FC<PropsWithChildren<BxButtonProps>> = props => {
  const { children, rounded = false, className, ...buttonProps } = props

  const buttonClassNames = useMemo(() => {
    const result: Types.Object = { 'btn-rounded': rounded }

    if (className) {
      result[className] = true
    }

    return classNames(result)
  }, [className, rounded])

  usePropsChange(props, 'BxButton: ')

  return (
    <Button className={buttonClassNames} {...buttonProps}>
      {children}
    </Button>
  )
}

export default BxButton
