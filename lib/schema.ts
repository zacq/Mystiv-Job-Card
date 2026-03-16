import { z } from 'zod'
import { PRIORITY_LEVELS } from './constants'

export const JobCardSchema = z.object({
  // ── Client ──────────────────────────────────────────────────────────────
  clientName: z.string().min(2, 'Full name is required'),
  clientPhone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/, 'Enter a valid phone number'),
  clientEmail: z
    .string()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),
  clientAddress: z.string().optional(),

  // ── Vehicle ─────────────────────────────────────────────────────────────
  vehicleMake: z.string().min(1, 'Make is required'),
  vehicleModel: z.string().min(1, 'Model is required'),
  vehicleYear: z.coerce
    .number({ invalid_type_error: 'Enter a valid year' })
    .int()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, 'Year is too far in the future'),
  vehicleReg: z.string().min(1, 'Registration / plate number is required'),
  vehicleVIN: z.string().optional(),
  vehicleColour: z.string().optional(),
  vehicleMileage: z.coerce.number().nonnegative('Mileage cannot be negative').optional(),

  // ── Service ─────────────────────────────────────────────────────────────
  services: z
    .array(z.string())
    .min(1, 'Select at least one service type'),
  jobDescription: z.string().min(5, 'Please describe the job (min 5 chars)'),
  priority: z.enum(PRIORITY_LEVELS, {
    errorMap: () => ({ message: 'Select a priority level' }),
  }),
  estCompletionDate: z.string().optional(),
  notes: z.string().optional(),

  // ── Advisor ─────────────────────────────────────────────────────────────
  advisorName: z.string().min(1, 'Service advisor name is required'),
  technicianName: z.string().optional(),
  bayNumber: z.string().optional(),
})

export type JobCardData = z.infer<typeof JobCardSchema>
