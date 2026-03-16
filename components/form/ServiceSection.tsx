'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { JobCardData } from '@/types/job-card'
import { SectionCard } from '@/components/ui/SectionCard'
import { FormField } from '@/components/ui/FormField'
import { SelectField } from '@/components/ui/SelectField'
import { TextareaField } from '@/components/ui/TextareaField'
import { CheckboxGroup } from '@/components/ui/CheckboxGroup'
import { InputText } from '@/components/ui/InputText'
import { SERVICE_TYPES, PRIORITY_LEVELS } from '@/lib/constants'

const priorityOptions = PRIORITY_LEVELS.map((p) => ({ value: p, label: p }))

export function ServiceSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<JobCardData>()

  return (
    <SectionCard title="Service / Job Details" icon="🔧">
      {/* Services spans full width */}
      <div className="sm:col-span-2">
        <FormField
          label="Services Required"
          required
          error={errors.services?.message}
        >
          <Controller
            control={control}
            name="services"
            defaultValue={[]}
            render={({ field }) => (
              <CheckboxGroup
                options={SERVICE_TYPES}
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.services}
              />
            )}
          />
        </FormField>
      </div>

      <div className="sm:col-span-2">
        <FormField
          label="Job Description"
          required
          error={errors.jobDescription?.message}
        >
          <TextareaField
            {...register('jobDescription')}
            placeholder="Describe the fault, complaint, or work requested…"
            hasError={!!errors.jobDescription}
            rows={4}
          />
        </FormField>
      </div>

      <FormField label="Priority" required error={errors.priority?.message}>
        <SelectField
          {...register('priority')}
          options={priorityOptions}
          placeholder="Select priority…"
          hasError={!!errors.priority}
        />
      </FormField>

      <FormField label="Est. Completion Date" error={errors.estCompletionDate?.message}>
        <InputText
          {...register('estCompletionDate')}
          type="date"
          hasError={!!errors.estCompletionDate}
        />
      </FormField>

      <div className="sm:col-span-2">
        <FormField label="Additional Notes" error={errors.notes?.message}>
          <TextareaField
            {...register('notes')}
            placeholder="Any other instructions or parts required…"
            hasError={!!errors.notes}
          />
        </FormField>
      </div>
    </SectionCard>
  )
}
