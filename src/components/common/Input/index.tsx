import { FC } from 'react'

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

export interface InputProps {
  type?: InputType
  placeholder?: string
  value?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: InputSize
  variant?: InputVariant
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  className?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Input: FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value = '',
  disabled = false,
  readonly = false,
  required = false,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  rounded = 'md',
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

  const baseClasses = 'transition-all duration-200 outline-none'
  const widthClass = fullWidth ? 'w-full' : 'w-auto'
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    roundedClasses[rounded],
    widthClass,
    disabledClass,
    className
  ].join(' ')

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
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
