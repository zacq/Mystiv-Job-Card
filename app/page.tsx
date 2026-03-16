import { IntakeForm } from '@/components/form/IntakeForm'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-brand-700 text-white px-4 py-4 shadow-md">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🔧</span>
          <div>
            <h1 className="text-lg font-bold leading-tight">Mystiv Workshop</h1>
            <p className="text-xs text-brand-100 leading-tight">
              Vehicle Service Job Card Intake
            </p>
          </div>
        </div>
      </header>

      {/* Form container */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-500 mb-6">
          Fields marked with <span className="text-red-500 font-medium">*</span> are
          required. All information is stored securely.
        </p>
        <IntakeForm />
      </div>
    </main>
  )
}
