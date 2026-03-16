'use client'

interface CheckboxGroupProps {
  options: readonly string[]
  value: string[]
  onChange: (value: string[]) => void
  hasError?: boolean
}

export function CheckboxGroup({ options, value, onChange, hasError }: CheckboxGroupProps) {
  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-lg border ${
        hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      {options.map((option) => {
        const checked = value.includes(option)
        return (
          <label
            key={option}
            className={`flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors ${
              checked
                ? 'bg-brand-100 text-brand-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(option)}
              className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            {option}
          </label>
        )
      })}
    </div>
  )
}
