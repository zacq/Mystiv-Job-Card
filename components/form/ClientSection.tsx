'use client'

import { useFormContext } from 'react-hook-form'
import { JobCardData } from '@/types/job-card'
import { SectionCard } from '@/components/ui/SectionCard'
import { FormField } from '@/components/ui/FormField'
import { InputText } from '@/components/ui/InputText'

export function ClientSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobCardData>()

  return (
    <SectionCard title="Client Details" icon="👤">
      <FormField label="Full Name" required error={errors.clientName?.message}>
        <InputText
          {...register('clientName')}
          placeholder="e.g. Sipho Mokoena"
          hasError={!!errors.clientName}
        />
      </FormField>

      <FormField label="Phone Number" required error={errors.clientPhone?.message}>
        <InputText
          {...register('clientPhone')}
          type="tel"
          placeholder="e.g. 082 555 1234"
          hasError={!!errors.clientPhone}
        />
      </FormField>

      <FormField label="Email Address" error={errors.clientEmail?.message}>
        <InputText
          {...register('clientEmail')}
          type="email"
          placeholder="e.g. sipho@email.com"
          hasError={!!errors.clientEmail}
        />
      </FormField>

      <FormField label="Address" error={errors.clientAddress?.message}>
        <InputText
          {...register('clientAddress')}
          placeholder="Street, suburb, city"
          hasError={!!errors.clientAddress}
        />
      </FormField>
    </SectionCard>
  )
}
