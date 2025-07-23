import React from 'react'

interface ImageProps {
  src: string
  alt: string
  className?: string
  width?: number | string
  height?: number | string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  loading?: 'lazy' | 'eager'
  onClick?: () => void
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  rounded = 'none',
  shadow = 'none',
  loading = 'lazy',
  onClick
}) => {
  const baseClasses = 'inline-block'

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  }

  const classes = [
    baseClasses,
    objectFitClasses[objectFit],
    roundedClasses[rounded],
    shadowClasses[shadow],
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      src={src}
      alt={alt}
      className={classes}
      width={width}
      height={height}
      loading={loading}
      onClick={onClick}
    />
  )
}

export default Image
