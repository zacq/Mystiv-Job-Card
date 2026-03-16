'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import type { JobCardData } from '@/types/job-card'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const recordId = searchParams.get('id') ?? 'unknown'
  const rawData = searchParams.get('data')

  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  let data: JobCardData | null = null
  try {
    if (rawData) data = JSON.parse(decodeURIComponent(rawData)) as JobCardData
  } catch {
    // silently ignore parse errors
  }

  async function handleDownloadPDF() {
    if (!data) return
    setDownloading(true)
    setDownloadError('')
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId, data }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message ?? 'PDF generation failed')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `job-card-${data.vehicleReg?.replace(/\s+/g, '-') ?? recordId}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : 'Download failed')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Success card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Card Created</h1>
        <p className="text-gray-500 text-sm mb-6">
          The job card has been submitted and saved to Airtable.
        </p>

        {/* Record ref */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 mb-6 text-left">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Reference ID
          </p>
          <p className="font-mono text-sm font-semibold text-brand-700 break-all">
            {recordId}
          </p>
        </div>

        {/* Summary */}
        {data && (
          <div className="text-left text-sm text-gray-600 mb-6 space-y-1 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Client</span>
              <span className="font-medium">{data.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Vehicle</span>
              <span className="font-medium">
                {data.vehicleYear} {data.vehicleMake} {data.vehicleModel}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Registration</span>
              <span className="font-medium">{data.vehicleReg}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Priority</span>
              <span className="font-medium">{data.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Advisor</span>
              <span className="font-medium">{data.advisorName}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadPDF}
            disabled={downloading || !data}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5
              text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60 transition-colors"
          >
            {downloading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                </svg>
                Generating…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </>
            )}
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium
              text-gray-700 hover:bg-gray-50 transition-colors"
          >
            New Job Card
          </button>
        </div>

        {downloadError && (
          <p className="mt-3 text-xs text-red-500">{downloadError}</p>
        )}
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
