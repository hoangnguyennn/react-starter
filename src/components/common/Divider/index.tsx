import React from 'react'

interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  color?: 'gray' | 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  dashed?: boolean
  dotted?: boolean
}

const Divider: React.FC<DividerProps> = ({
  className = '',
  orientation = 'horizontal',
  color = 'gray',
  size = 'md',
  spacing = 'md',
  dashed = false,
  dotted = false
}) => {
  const baseClasses = 'border-solid'

  const orientationClasses = {
    horizontal: 'w-full border-t',
    vertical: 'h-full border-l'
  }

  const colorClasses = {
    gray: 'border-gray-200',
    blue: 'border-blue-200',
    red: 'border-red-200',
    green: 'border-green-200',
    yellow: 'border-yellow-200',
    purple: 'border-purple-200',
    pink: 'border-pink-200',
    indigo: 'border-indigo-200'
  }

  const sizeClasses = {
    xs: 'border-t-px',
    sm: 'border-t-0.5',
    md: 'border-t',
    lg: 'border-t-2',
    xl: 'border-t-4'
  }

  const spacingClasses = {
    xs: 'my-1',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
    xl: 'my-8',
    '2xl': 'my-12'
  }

  const styleClasses = {
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  }

  const classes = [
    baseClasses,
    orientationClasses[orientation],
    colorClasses[color],
    sizeClasses[size],
    orientation === 'horizontal' && spacingClasses[spacing],
    dashed && styleClasses.dashed,
    dotted && styleClasses.dotted,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} />
}

export default Divider
