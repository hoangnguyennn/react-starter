import { FC } from 'react'

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SelectVariant = 'outline' | 'filled' | 'flushed' | 'unstyled'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  disabled?: boolean

  required?: boolean
  size?: SelectSize
  variant?: SelectVariant
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  multiple?: boolean
  className?: string
  onChange?: (value: string | string[]) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Select: FC<SelectProps> = ({
  options,
  value = '',
  placeholder = 'Select an option',
  disabled = false,

  required = false,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  rounded = 'md',
  multiple = false,
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

  const baseClasses =
    'transition-all duration-200 outline-none appearance-none bg-no-repeat bg-right'
  const widthClass = fullWidth ? 'w-full' : 'w-auto'
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    roundedClasses[rounded],
    widthClass,
    disabledClass,
    className
  ].join(' ')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value)
      onChange?.(selectedOptions)
    } else {
      onChange?.(e.target.value)
    }
  }

  return (
    <select
      value={value}
      disabled={disabled}
      required={required}
      multiple={multiple}
      className={classes}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1.5em 1.5em'
      }}
    >
      {!multiple && <option value="">{placeholder}</option>}
      {options.map(option => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
