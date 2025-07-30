import { FC } from 'react'

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type RadioVariant = 'default' | 'filled' | 'outline'

export interface RadioProps {
  checked?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  size?: RadioSize
  variant?: RadioVariant
  label?: string
  className?: string
  onChange?: (checked: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Radio: FC<RadioProps> = ({
  checked = false,
  disabled = false,
  required = false,
  name,
  value,
  size = 'md',
  variant = 'default',
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

  const baseClasses = 'transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2'
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabledClass,
    className
  ].join(' ')

  const radioElement = (
    <input
      type="radio"
      checked={checked}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      className={classes}
      onChange={e => onChange?.(e.target.checked)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )

  if (label) {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        {radioElement}
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    )
  }

  return radioElement
}
