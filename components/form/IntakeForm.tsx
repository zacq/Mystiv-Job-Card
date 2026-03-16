'use client'

import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { JobCardSchema, JobCardData } from '@/lib/schema'
import { ClientSection } from './ClientSection'
import { VehicleSection } from './VehicleSection'
import { ServiceSection } from './ServiceSection'
import { AdvisorSection } from './AdvisorSection'
import { StickySubmitBar } from '@/components/ui/StickySubmitBar'

export function IntakeForm() {
  const router = useRouter()

  const methods = useForm<JobCardData>({
    resolver: zodResolver(JobCardSchema),
    defaultValues: {
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientAddress: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: new Date().getFullYear(),
      vehicleReg: '',
      vehicleVIN: '',
      vehicleColour: '',
      services: [],
      jobDescription: '',
      priority: 'Medium',
      estCompletionDate: '',
      notes: '',
      advisorName: '',
      technicianName: 'Unassigned',
      bayNumber: '',
    },
  })

  const { handleSubmit, reset, formState: { isSubmitting } } = methods

  async function onSubmit(data: JobCardData) {
    try {
      const response = await fetch('/api/submit-job-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message ?? `Server error ${response.status}`)
      }

      const { recordId } = await response.json()

      // Pass the full form data encoded for the success page PDF download
      const encoded = encodeURIComponent(JSON.stringify(data))
      router.push(`/success?id=${recordId}&data=${encoded}`)
    } catch (error) {
      alert(`Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6 pb-24">
          <ClientSection />
          <VehicleSection />
          <ServiceSection />
          <AdvisorSection />
        </div>
        <StickySubmitBar isSubmitting={isSubmitting} onReset={() => reset()} />
      </form>
    </FormProvider>
  )
}
