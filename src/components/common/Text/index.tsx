import React from 'react'

interface TextProps {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black'
  color?:
    | 'inherit'
    | 'current'
    | 'transparent'
    | 'black'
    | 'white'
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink'
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  noWrap?: boolean
  breakWords?: boolean
  breakAll?: boolean
  onClick?: () => void
}

const Text: React.FC<TextProps> = ({
  children,
  className = '',
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'inherit',
  align = 'left',
  truncate = false,
  noWrap = false,
  breakWords = false,
  breakAll = false,
  onClick
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl'
  }

  const weightClasses = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black'
  }

  const colorClasses = {
    inherit: 'text-inherit',
    current: 'text-current',
    transparent: 'text-transparent',
    black: 'text-black',
    white: 'text-white',
    gray: 'text-gray-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    indigo: 'text-indigo-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    truncate && 'truncate',
    noWrap && 'whitespace-nowrap',
    breakWords && 'break-words',
    breakAll && 'break-all',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  )
}

export default Text
