import { FC } from 'react'

export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TextareaVariant = 'outline' | 'filled' | 'flushed' | 'unstyled'

export interface TextareaProps {
  placeholder?: string
  value?: string
  rows?: number
  cols?: number
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: TextareaSize
  variant?: TextareaVariant
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  className?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Textarea: FC<TextareaProps> = ({
  placeholder = '',
  value = '',
  rows = 3,
  cols,
  disabled = false,
  readonly = false,
  required = false,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  rounded = 'md',
  resize = 'vertical',
  className = '',
  onChange,
  onFocus,
  onBlur
}) => {
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
    xl: 'px-4 py-3 text-xl'
  }

  const variantClasses = {
    outline:
      'border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
    filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/20',
    flushed: 'border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0',
    unstyled: 'border-0 bg-transparent focus:ring-0'
  }

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  }

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  }

  const baseClasses = 'transition-all duration-200 outline-none'
  const widthClass = fullWidth ? 'w-full' : 'w-auto'
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    roundedClasses[rounded],
    resizeClasses[resize],
    widthClass,
    disabledClass,
    className
  ].join(' ')

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      rows={rows}
      cols={cols}
      disabled={disabled}
      readOnly={readonly}
      required={required}
      className={classes}
      onChange={e => onChange?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
