'use client'

import { useFormContext } from 'react-hook-form'
import { JobCardData } from '@/types/job-card'
import { SectionCard } from '@/components/ui/SectionCard'
import { FormField } from '@/components/ui/FormField'
import { InputText } from '@/components/ui/InputText'

export function VehicleSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobCardData>()

  const currentYear = new Date().getFullYear()

  return (
    <SectionCard title="Vehicle Details" icon="🚗">
      <FormField label="Make" required error={errors.vehicleMake?.message}>
        <InputText
          {...register('vehicleMake')}
          placeholder="e.g. Toyota"
          hasError={!!errors.vehicleMake}
        />
      </FormField>

      <FormField label="Model" required error={errors.vehicleModel?.message}>
        <InputText
          {...register('vehicleModel')}
          placeholder="e.g. Corolla"
          hasError={!!errors.vehicleModel}
        />
      </FormField>

      <FormField label="Year" required error={errors.vehicleYear?.message}>
        <InputText
          {...register('vehicleYear')}
          type="number"
          placeholder={String(currentYear)}
          min={1900}
          max={currentYear + 1}
          hasError={!!errors.vehicleYear}
        />
      </FormField>

      <FormField
        label="Registration / Plate"
        required
        error={errors.vehicleReg?.message}
      >
        <InputText
          {...register('vehicleReg')}
          placeholder="e.g. GP 123 456"
          hasError={!!errors.vehicleReg}
          className="uppercase"
        />
      </FormField>

      <FormField label="VIN Number" error={errors.vehicleVIN?.message}>
        <InputText
          {...register('vehicleVIN')}
          placeholder="17-character VIN (optional)"
          hasError={!!errors.vehicleVIN}
          maxLength={17}
          className="uppercase tracking-wider"
        />
      </FormField>

      <FormField label="Colour" error={errors.vehicleColour?.message}>
        <InputText
          {...register('vehicleColour')}
          placeholder="e.g. Silver"
          hasError={!!errors.vehicleColour}
        />
      </FormField>

      <FormField
        label="Mileage (km)"
        error={errors.vehicleMileage?.message}
        hint="Current odometer reading"
      >
        <InputText
          {...register('vehicleMileage')}
          type="number"
          placeholder="e.g. 85000"
          min={0}
          hasError={!!errors.vehicleMileage}
        />
      </FormField>
    </SectionCard>
  )
}
