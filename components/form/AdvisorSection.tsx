'use client'

import { useFormContext } from 'react-hook-form'
import { JobCardData } from '@/types/job-card'
import { SectionCard } from '@/components/ui/SectionCard'
import { FormField } from '@/components/ui/FormField'
import { InputText } from '@/components/ui/InputText'
import { SelectField } from '@/components/ui/SelectField'
import { TECHNICIANS } from '@/lib/constants'

const techOptions = TECHNICIANS.map((t) => ({ value: t, label: t }))

export function AdvisorSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobCardData>()

  return (
    <SectionCard title="Advisor / Technician" icon="🪪">
      <FormField
        label="Service Advisor"
        required
        error={errors.advisorName?.message}
      >
        <InputText
          {...register('advisorName')}
          placeholder="Advisor's full name"
          hasError={!!errors.advisorName}
        />
      </FormField>

      <FormField label="Assigned Technician" error={errors.technicianName?.message}>
        <SelectField
          {...register('technicianName')}
          options={techOptions}
          placeholder="Select technician…"
          hasError={!!errors.technicianName}
        />
      </FormField>

      <FormField label="Bay Number" error={errors.bayNumber?.message}>
        <InputText
          {...register('bayNumber')}
          placeholder="e.g. Bay 3"
          hasError={!!errors.bayNumber}
        />
      </FormField>
    </SectionCard>
  )
}
