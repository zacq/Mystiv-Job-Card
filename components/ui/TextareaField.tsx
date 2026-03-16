'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

function cx(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(' ')
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ hasError, className, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={3}
      className={cx(
        'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 resize-y',
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

TextareaField.displayName = 'TextareaField'
