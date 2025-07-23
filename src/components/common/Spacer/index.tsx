import React from 'react'

interface SpacerProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  axis?: 'horizontal' | 'vertical' | 'both'
  inline?: boolean
}

const Spacer: React.FC<SpacerProps> = ({
  className = '',
  size = 'md',
  axis = 'vertical',
  inline = false
}) => {
  const sizeClasses = {
    xs: '4',
    sm: '8',
    md: '16',
    lg: '24',
    xl: '32',
    '2xl': '48',
    '3xl': '64',
    '4xl': '80',
    '5xl': '96'
  }

  const axisClasses = {
    horizontal: `w-${sizeClasses[size]}`,
    vertical: `h-${sizeClasses[size]}`,
    both: `w-${sizeClasses[size]} h-${sizeClasses[size]}`
  }

  const displayClasses = inline ? 'inline-block' : 'block'

  const classes = [displayClasses, axisClasses[axis], className].filter(Boolean).join(' ')

  return <div className={classes} />
}

export default Spacer
