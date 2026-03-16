'use client'

interface StickySubmitBarProps {
  isSubmitting: boolean
  onReset: () => void
}

export function StickySubmitBar({ isSubmitting, onReset }: StickySubmitBarProps) {
  return (
    <div className="sticky bottom-0 z-10 bg-white/90 backdrop-blur border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700
            hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 transition-colors"
        >
          Clear Form
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white
            hover:bg-brand-700 active:bg-brand-900 disabled:opacity-60 transition-colors shadow-sm"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Submitting…
            </>
          ) : (
            'Submit Job Card'
          )}
        </button>
      </div>
    </div>
  )
}
