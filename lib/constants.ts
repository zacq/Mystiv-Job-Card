export const SERVICE_TYPES = [
  'Oil & Filter Change',
  'Brake Service',
  'Tyre Rotation / Balance',
  'Wheel Alignment',
  'Battery Replacement',
  'Air Filter Replacement',
  'Spark Plug Replacement',
  'Coolant Flush',
  'Transmission Service',
  'AC Service',
  'Suspension / Shock Absorbers',
  'Clutch Repair',
  'Engine Diagnostics',
  'Electrical / Auto-Electrical',
  'Body & Panel Work',
  'Other',
] as const

export const PRIORITY_LEVELS = ['Low', 'Medium', 'High', 'Urgent'] as const

export const TECHNICIANS = [
  'Unassigned',
  'Technician 1',
  'Technician 2',
  'Technician 3',
  'Technician 4',
] as const

export const JOB_STATUS_DEFAULT = 'Open'
