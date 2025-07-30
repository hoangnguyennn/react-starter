import { FC } from 'react'

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type CheckboxVariant = 'default' | 'filled' | 'outline'

export interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  required?: boolean
  size?: CheckboxSize
  variant?: CheckboxVariant
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  label?: string
  className?: string
  onChange?: (checked: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  disabled = false,
  required = false,
  size = 'md',
  variant = 'default',
  rounded = 'md',
  label,
  className = '',
  onChange,
  onFocus,
  onBlur
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }

  const variantClasses = {
    default: 'border-gray-300 bg-white text-blue-600 focus:ring-blue-500',
    filled: 'border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500',
    outline: 'border-2 border-gray-300 bg-transparent text-blue-600 focus:ring-blue-500'
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

  const baseClasses = 'transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2'
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    roundedClasses[rounded],
    disabledClass,
    className
  ].join(' ')

  const checkboxElement = (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      required={required}
      className={classes}
      onChange={e => onChange?.(e.target.checked)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )

  if (label) {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        {checkboxElement}
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    )
  }

  return checkboxElement
}
