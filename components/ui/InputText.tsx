'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

// clsx is a lightweight utility — if not installed, we use a simple ternary
function cx(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(' ')
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ hasError, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cx(
        'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
        'transition-colors duration-150',
        hasError
          ? 'border-red-400 bg-red-50 focus:ring-red-400'
          : 'border-gray-300 bg-white hover:border-gray-400',
        className
      )}
      {...props}
    />
  )
)

InputText.displayName = 'InputText'
