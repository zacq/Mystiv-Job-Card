'use client'

import { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
}

function cx(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(' ')
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ hasError, options, placeholder, className, ...props }, ref) => (
    <select
      ref={ref}
      className={cx(
        'w-full rounded-lg border px-3 py-2 text-sm text-gray-900',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
        'transition-colors duration-150 bg-white',
        hasError
          ? 'border-red-400 bg-red-50 focus:ring-red-400'
          : 'border-gray-300 hover:border-gray-400',
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
)

SelectField.displayName = 'SelectField'
